import { LitElement, css, html, nothing, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { localizedString, type LocaleValue } from '../../utils/localizedString.js';

/* ---- inlined: utils/fsTheme.ts ---- */
/**
 * Reliable light/dark + store-primary tokens for Lit shadow roots.
 * `:host-context()` is fragile (iframe demos / Firefox), so we also push
 * CSS variables onto hosts and `.fs-section` nodes when the document theme changes.
 */

type FsThemeMode = 'light' | 'dark';

const PRIMARY =
  'var(--color-primary, var(--primary-color, var(--color-main, #64748b)))';

function detectFsTheme(): FsThemeMode {
  if (typeof document === 'undefined') return 'light';
  const root = document.documentElement;
  const attr = (
    root.getAttribute('data-theme') ||
    root.getAttribute('data-mode') ||
    ''
  ).toLowerCase();
  if (attr === 'dark') return 'dark';
  if (attr === 'light') return 'light';
  if (root.classList.contains('dark') || document.body?.classList.contains('dark')) {
    return 'dark';
  }
  try {
    const stored = localStorage.getItem('salla_demo_theme');
    if (stored === 'dark' || stored === 'light') return stored;
  } catch {
    /* ignore */
  }
  return 'light';
}

/** CSS variables that must win inside component trees. */
function fsThemeVars(mode: FsThemeMode = detectFsTheme()): Record<string, string> {
  const dark = mode === 'dark';
  return {
    '--fs-store-primary': PRIMARY,
    '--accent-color': PRIMARY,
    '--button-bg': PRIMARY,
    '--button-color': '#ffffff',
    '--text-color': dark ? '#ffffff' : '#000000',
    '--muted-color': dark ? '#aaaaaa' : '#666666',
    '--card-bg': dark ? '#141414' : '#ffffff',
    '--fs-surface': dark ? '#1a1a1a' : '#f3f4f6',
    '--border-color': dark ? 'rgba(255, 255, 255, 0.14)' : '#e5e7eb',
    '--section-bg': 'transparent',
    colorScheme: dark ? 'dark' : 'light',
  };
}

function applyVars(el: HTMLElement, vars: Record<string, string>, mode: FsThemeMode): void {
  for (const [key, value] of Object.entries(vars)) {
    if (key === 'colorScheme') {
      el.style.colorScheme = value;
      continue;
    }
    el.style.setProperty(key, value);
  }
  el.setAttribute('data-fs-theme', mode);
}

function walkAndApply(root: Document | ShadowRoot, vars: Record<string, string>, mode: FsThemeMode): void {
  root.querySelectorAll('.fs-section').forEach((node) => {
    applyVars(node as HTMLElement, vars, mode);
  });
}

function refreshLitHosts(): void {
  document.querySelectorAll('*').forEach((node) => {
    const el = node as HTMLElement & { requestUpdate?: () => void };
    const shadow = el.shadowRoot;
    if (!shadow?.querySelector('.fs-section')) return;
    if (typeof el.requestUpdate === 'function') el.requestUpdate();
  });
}

/** Push theme tokens onto every mounted kit host / section. */
function applyFsThemeToDocument(mode: FsThemeMode = detectFsTheme()): void {
  if (typeof document === 'undefined') return;
  const vars = fsThemeVars(mode);
  document.documentElement.setAttribute('data-fs-theme', mode);
  walkAndApply(document, vars, mode);

  document.querySelectorAll('*').forEach((node) => {
    const el = node as HTMLElement;
    const shadow = el.shadowRoot;
    if (!shadow) return;
    if (shadow.querySelector('.fs-section')) {
      applyVars(el, vars, mode);
      walkAndApply(shadow, vars, mode);
    }
  });

  try {
    window.dispatchEvent(
      new CustomEvent('fs-theme-changed', { detail: { mode } })
    );
  } catch {
    /* ignore */
  }
}

let watching = false;
let syncTimer: ReturnType<typeof setTimeout> | null = null;
let lastMode: FsThemeMode | null = null;

function scheduleSync(): void {
  if (syncTimer) clearTimeout(syncTimer);
  syncTimer = setTimeout(() => {
    syncTimer = null;
    const mode = detectFsTheme();
    applyFsThemeToDocument(mode);
    if (lastMode !== mode) {
      lastMode = mode;
      refreshLitHosts();
    }
  }, 40);
}

/** Start a single document-level theme observer (idempotent). */
function ensureFsThemeWatch(): void {
  if (watching || typeof document === 'undefined') return;
  watching = true;

  lastMode = detectFsTheme();
  scheduleSync();

  try {
    new MutationObserver(scheduleSync).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'data-mode', 'class'],
    });
    if (document.body) {
      new MutationObserver(scheduleSync).observe(document.body, {
        attributes: true,
        attributeFilter: ['class', 'data-theme', 'data-mode'],
      });
    }
  } catch {
    /* ignore */
  }

  window.addEventListener('storage', (event) => {
    if (event.key === 'salla_demo_theme') scheduleSync();
  });

  // Catch late-mounted custom elements in the Salla demo grid.
  try {
    new MutationObserver((records) => {
      if (records.some((r) => r.addedNodes.length)) scheduleSync();
    }).observe(document.documentElement, { childList: true, subtree: true });
  } catch {
    /* ignore */
  }
}

/** Accent-tinted swatch that tracks store primary in light and dark. */
function fsAccentTone(index: number, steps = 5): string {
  const stops = [28, 40, 52, 64, 78];
  const pct = stops[index % Math.max(steps, stops.length)] ?? 45;
  return `color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) ${pct}%, var(--fs-surface, #f3f4f6))`;
}

/* ---- inlined: utils/helpers.ts ---- */
type ConfigValue = Record<string, unknown> | null | undefined;

function normalizeItem<T extends Record<string, unknown> = Record<string, unknown>>(
  item: Record<string, unknown> | null | undefined
): T {
  return Object.entries(item || {}).reduce((acc, [key, value]) => {
    const normalizedKey = key.includes('.') ? key.split('.').pop()! : key;
    acc[normalizedKey] = value;
    return acc;
  }, {} as Record<string, unknown>) as T;
}

/** Stable id from label when merchant UI has no internal-id field (Raed add-on UX). */
function slugifyId(value: unknown, fallback = ''): string {
  const raw =
    typeof value === 'string' || typeof value === 'number'
      ? String(value).trim()
      : localizedString(value as LocaleValue, '').trim();
  if (!raw) return fallback;
  const slug = raw
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
  return slug || fallback;
}

function resolveItemId(
  item: Record<string, unknown>,
  index: number,
  prefix = 'item'
): string {
  const keys = [
    'id',
    'value',
    'key',
    'zone_id',
    'family_id',
    'character_id',
    'note_id',
    'active_id',
    'tex_id',
    'light_id',
    'pt_id',
    'cond_id',
    'color_id',
    'step_id',
    'recipe_id',
    'strength_id',
    'time_id',
    'result_id',
  ];
  for (const key of keys) {
    const s = String(item[key] ?? '').trim();
    if (s) return s;
  }
  return (
    slugifyId(item.name ?? item.title ?? item.label, '') || `${prefix}-${index + 1}`
  );
}

function normalizeCollection<T extends Record<string, unknown> = Record<string, unknown>>(
  items: unknown
): T[] {
  if (!Array.isArray(items)) return [];
  return items
    .filter((item): item is Record<string, unknown> => !!item && typeof item === 'object')
    .map((item, index) => {
      const normalized = normalizeItem<T>(item);
      const row = normalized as Record<string, unknown>;
      if (!String(row.id ?? '').trim()) {
        row.id = resolveItemId(row, index);
      }
      return normalized;
    });
}

function getUnitValue(val: unknown, fallback = 0): number {
  if (typeof val === 'number' && Number.isFinite(val)) return val;
  if (typeof val === 'string' && val.trim() !== '' && Number.isFinite(Number(val))) {
    return Number(val);
  }
  if (val && typeof val === 'object' && 'value' in (val as object)) {
    return getUnitValue((val as { value: unknown }).value, fallback);
  }
  return fallback;
}

function toNumber(val: unknown, fallback = 0): number {
  if (typeof val === 'number' && Number.isFinite(val)) return val;
  if (typeof val === 'string' && val.trim() !== '') {
    const n = Number(val.replace(',', '.'));
    return Number.isFinite(n) ? n : fallback;
  }
  return fallback;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function isTruthy(val: unknown, fallback = false): boolean {
  if (typeof val === 'boolean') return val;
  if (typeof val === 'string') {
    const v = val.toLowerCase().trim();
    if (['true', '1', 'yes', 'on'].includes(v)) return true;
    if (['false', '0', 'no', 'off', ''].includes(v)) return false;
  }
  if (typeof val === 'number') return val !== 0;
  return fallback;
}

function extractLink(value: unknown): string {
  if (!value) return '';

  if (typeof value === 'string') {
    const trimmed = value.trim();
    return isValidHref(trimmed) ? trimmed : '';
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const link = extractLink(item);
      if (link) return link;
    }
    return '';
  }

  if (typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    const candidates = [
      obj.url,
      obj.href,
      obj.link,
      obj.value,
      obj.custom,
      obj.path,
    ];

    for (const candidate of candidates) {
      const link = extractLink(candidate);
      if (link) return link;
    }
  }

  return '';
}

function isValidHref(url: string): boolean {
  if (!url || url === '#') return false;
  if (url.startsWith('/') || url.startsWith('#') || url.startsWith('?')) return true;
  if (url.startsWith('mailto:') || url.startsWith('tel:') || url.startsWith('whatsapp:')) {
    return true;
  }
  try {
    const parsed = new URL(url, window.location.origin);
    return ['http:', 'https:', 'mailto:', 'tel:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

function isExternalUrl(url: string): boolean {
  try {
    const parsed = new URL(url, window.location.origin);
    return parsed.origin !== window.location.origin;
  } catch {
    return false;
  }
}

function isDirectMediaUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  try {
    const parsed = new URL(url, window.location.origin);
    if (!['http:', 'https:'].includes(parsed.protocol)) return false;
    return true;
  } catch {
    return false;
  }
}

function formatPrice(amount: number, currency = 'ر.س'): string {
  if (!Number.isFinite(amount)) return '';
  const formatted = amount.toLocaleString(undefined, {
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  });
  return `${formatted} ${currency}`.trim();
}

/** Store currency from Salla when available — no merchant currency field needed. */
function getStoreCurrency(fallback = 'ر.س'): string {
  try {
    const w = window as unknown as {
      Salla?: {
        config?: { currency?: { symbol?: string; code?: string } };
        currency?: { symbol?: string; code?: string };
      };
      salla?: {
        config?: { currency?: { symbol?: string; code?: string } };
        currency?: { symbol?: string; code?: string };
      };
    };
    const salla = w.Salla || w.salla;
    const fromConfig =
      salla?.config?.currency?.symbol ||
      salla?.config?.currency?.code ||
      salla?.currency?.symbol ||
      salla?.currency?.code;
    if (typeof fromConfig === 'string' && fromConfig.trim()) {
      return fromConfig.trim();
    }
    const attr = document.documentElement.getAttribute('data-currency');
    if (attr?.trim()) return attr.trim();
  } catch {
    // ignore
  }
  return fallback;
}

function groupByKey<T extends object>(
  items: T[],
  key: keyof T | string
): Map<string, T[]> {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const group = String((item as Record<string, unknown>)[key as string] ?? '').trim();
    if (!group) continue;
    const list = map.get(group) || [];
    list.push(item);
    map.set(group, list);
  }
  return map;
}

function sortByOrder<T extends object>(
  items: T[],
  orderKey: keyof T | string = 'group_order'
): T[] {
  return [...items].sort(
    (a, b) =>
      toNumber((a as Record<string, unknown>)[orderKey as string], 0) -
      toNumber((b as Record<string, unknown>)[orderKey as string], 0)
  );
}

function t(
  ar: string,
  en: string,
  value?: LocaleValue,
  fallbackAr?: string
): string {
  if (value != null) {
    const localized = localizedString(value, '');
    if (localized) return localized;
  }
  const locale = (
    typeof document !== 'undefined'
      ? document.documentElement.lang?.split(/[-_]/)[0]
      : 'ar'
  )?.toLowerCase();
  if (locale === 'en') return en;
  return fallbackAr || ar;
}

function safeStorageGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeStorageSet(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota / private mode
  }
}

function safeStorageRemove(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

function buildWhatsAppUrl(phone: string, message: string): string {
  const digits = String(phone || '').replace(/\D+/g, '');
  if (!digits || digits.length < 8) return '';
  const text = encodeURIComponent(message || '');
  return `https://wa.me/${digits}${text ? `?text=${text}` : ''}`;
}

async function copyText(text: string): Promise<boolean> {
  if (!text) return false;
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fallback below
  }

  try {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(area);
    return ok;
  } catch {
    return false;
  }
}

function prefersReducedMotion(): boolean {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

interface SectionTheme {
  bg: string;
  text: string;
  muted: string;
  accent: string;
  card: string;
  border: string;
  buttonBg: string;
  buttonColor: string;
  radius: string;
  spaceDesktop: number;
  spaceMobile: number;
  animate: boolean;
  fullWidth: boolean;
  noBottomMargin: boolean;
  hasContainer: boolean;
}

function readSectionTheme(
  config: ConfigValue,
  prefix: string,
  defaults?: Partial<SectionTheme>
): SectionTheme {
  const c = config || {};
  // Colors come from the store theme (primary + light/dark), not merchant pickers.
  return {
    bg: 'transparent',
    text: '#000000',
    muted: '#666666',
    accent: 'var(--color-primary, var(--primary-color, var(--color-main, #64748b)))',
    card: 'var(--color-white, var(--bg-color, #ffffff))',
    border: 'var(--color-border, #e5e7eb)',
    buttonBg: 'var(--color-primary, var(--primary-color, var(--color-main, #64748b)))',
    buttonColor: '#ffffff',
    radius: `${getUnitValue(c[`${prefix}radius`], defaults?.radius ? Number(String(defaults.radius).replace('px', '')) : 20)}px`,
    spaceDesktop: getUnitValue(
      c[`${prefix}space_desktop`],
      defaults?.spaceDesktop ?? 48
    ),
    spaceMobile: getUnitValue(
      c[`${prefix}space_mobile`],
      defaults?.spaceMobile ?? 28
    ),
    animate: isTruthy(c[`${prefix}animate`], defaults?.animate ?? true),
    fullWidth: isTruthy(c[`${prefix}full_width`], defaults?.fullWidth ?? false),
    noBottomMargin: false,
    hasContainer: true,
  };
}

function themeStyleMap(theme: SectionTheme): Record<string, string> {
  const useContainer = theme.hasContainer !== false;
  ensureFsThemeWatch();
  const mode = detectFsTheme();
  const vars = fsThemeVars(mode);
  const { colorScheme, ...cssVars } = vars as Record<string, string> & {
    colorScheme?: string;
  };
  return {
    ...cssVars,
    ...(colorScheme ? { 'color-scheme': colorScheme } : {}),
    '--section-radius': theme.radius,
    '--space-desktop': `${theme.spaceDesktop}px`,
    '--space-mobile': `${theme.spaceMobile}px`,
    '--space-desktop-bottom': theme.noBottomMargin ? '0px' : `${theme.spaceDesktop}px`,
    '--space-mobile-bottom': theme.noBottomMargin ? '0px' : `${theme.spaceMobile}px`,
    '--section-container-max': useContainer ? '1440px' : 'none',
    '--section-container-pad': useContainer ? '16px' : '0px',
    '--section-container-pad-sm': useContainer ? '12px' : '0px',
  };
}

function getRadioValue(value: unknown, fallback = ''): string {
  if (typeof value === 'string' && value.trim()) return value.trim();
  if (Array.isArray(value) && value[0]) {
    const first = value[0];
    if (typeof first === 'string') return first;
    if (first && typeof first === 'object' && 'value' in first) {
      return String((first as { value: unknown }).value ?? fallback);
    }
    if (first && typeof first === 'object' && 'key' in first) {
      return String((first as { key: unknown }).key ?? fallback);
    }
  }
  if (value && typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    // Twilight dropdown-list: { selected: [{ value | key }], options, ... }
    if (Array.isArray(obj.selected) && obj.selected[0]) {
      return getRadioValue(obj.selected, fallback);
    }
    if ('value' in obj && obj.value != null && !Array.isArray(obj.value)) {
      return String(obj.value ?? fallback);
    }
    if (Array.isArray(obj.value) && obj.value[0]) {
      return getRadioValue(obj.value, fallback);
    }
  }
  return fallback;
}

function parseTags(raw: unknown): string[] {
  const text = localizedString(raw as LocaleValue, '');
  if (!text) return [];
  return text
    .split(/[,،|/]/)
    .map((part: string) => part.trim())
    .filter(Boolean);
}

function extractMoneyAmount(val: unknown): number {
  if (typeof val === 'number' && Number.isFinite(val)) return val;
  if (typeof val === 'string' && val.trim() !== '') return toNumber(val, 0);
  if (val && typeof val === 'object') {
    const obj = val as Record<string, unknown>;
    if ('amount' in obj) return extractMoneyAmount(obj.amount);
    if ('value' in obj) return extractMoneyAmount(obj.value);
  }
  return 0;
}

function extractImageUrl(val: unknown): string {
  if (!val) return '';
  if (typeof val === 'string') {
    const trimmed = val.trim();
    return isDirectMediaUrl(trimmed) || trimmed.startsWith('/') ? trimmed : '';
  }
  if (Array.isArray(val)) {
    for (const item of val) {
      const url = extractImageUrl(item);
      if (url) return url;
    }
    return '';
  }
  if (typeof val === 'object') {
    const obj = val as Record<string, unknown>;
    const candidates = [obj.url, obj.src, obj.image, obj.thumbnail, obj.original];
    for (const candidate of candidates) {
      const url = extractImageUrl(candidate);
      if (url) return url;
    }
  }
  return '';
}

interface SallaProductSnapshot {
  id: string;
  name: string;
  image: string;
  url: string;
  price: number;
  old_price: number;
  rating: number;
}

/** Read a 0–5 rating from varied Salla shapes (rating.stars, rating, rate...). */
function extractRating(val: unknown): number {
  if (val == null) return 0;
  if (typeof val === 'number' && Number.isFinite(val)) {
    return Math.max(0, Math.min(5, val));
  }
  if (typeof val === 'string') return extractRating(toNumber(val, 0));
  if (typeof val === 'object') {
    const obj = val as Record<string, unknown>;
    const candidate =
      obj.stars ?? obj.rate ?? obj.rating ?? obj.average ?? obj.value;
    if (candidate != null && candidate !== val) return extractRating(candidate);
  }
  return 0;
}

/** Normalize Salla Products dropdown values (object, array, or selected wrapper). */
function extractSallaProduct(raw: unknown): SallaProductSnapshot | null {
  if (!raw) return null;

  let candidate: unknown = raw;

  if (Array.isArray(raw)) {
    candidate = raw[0];
  } else if (typeof raw === 'object') {
    const obj = raw as Record<string, unknown>;
    const selected = Array.isArray(obj.selected) ? obj.selected : [];
    const values = Array.isArray(obj.value) ? obj.value : [];

    // Prefer non-empty selected; otherwise fall through to value (Twilight quirk)
    if (selected.length) {
      candidate = selected[0];
    } else if (values.length) {
      candidate = typeof values[0] === 'object' && values[0] ? values[0] : values[0];
    } else if (obj.product && typeof obj.product === 'object') {
      candidate = obj.product;
    } else if (obj.value && typeof obj.value === 'object' && !Array.isArray(obj.value)) {
      // Twilight picker: { label, value: { id, name, image, ... } }
      candidate = obj.value;
    }
  }

  if (candidate != null && (typeof candidate === 'string' || typeof candidate === 'number')) {
    const id = String(candidate).trim();
    return id ? { id, name: '', image: '', url: '', price: 0, old_price: 0, rating: 0 } : null;
  }

  if (!candidate || typeof candidate !== 'object') return null;

  const product = candidate as Record<string, unknown>;
  let id = String(product.id ?? product.product_id ?? '').trim();
  if (!id && product.value != null && typeof product.value !== 'object') {
    id = String(product.value).trim();
  }
  if (!id && product.value && typeof product.value === 'object') {
    const nested = product.value as Record<string, unknown>;
    id = String(nested.id ?? nested.product_id ?? nested.value ?? '').trim();
  }

  const name =
    localizedString(product.name as LocaleValue, '').trim() ||
    localizedString(product.label as LocaleValue, '').trim() ||
    localizedString(product.title as LocaleValue, '').trim();
  const image =
    extractImageUrl(product.image) ||
    extractImageUrl(product.main_image) ||
    extractImageUrl(product.thumbnail) ||
    extractImageUrl(product.images) ||
    (product.value && typeof product.value === 'object'
      ? extractImageUrl((product.value as Record<string, unknown>).image)
      : '');
  const url = extractLink(
    product.url ||
      product.permalink ||
      product.link ||
      (product.value && typeof product.value === 'object'
        ? (product.value as Record<string, unknown>).url
        : '')
  );

  const onSale = isTruthy(product.on_sale) || isTruthy(product.is_on_sale);
  const salePrice = extractMoneyAmount(
    product.sale_price ?? product.sale_price_amount ?? product.discounted_price
  );
  const regularPrice = extractMoneyAmount(
    product.regular_price ?? product.regular_price_amount ?? product.price_before
  );
  const basePrice = extractMoneyAmount(product.price ?? product.price_amount);

  let price = basePrice;
  let old_price = 0;

  if (onSale && salePrice > 0) {
    price = salePrice;
    old_price = regularPrice > salePrice ? regularPrice : 0;
  } else if (regularPrice > basePrice && basePrice > 0) {
    price = basePrice;
    old_price = regularPrice;
  } else if (salePrice > 0 && regularPrice > salePrice) {
    price = salePrice;
    old_price = regularPrice;
  }

  const rating = extractRating(product.rating ?? product.rate ?? product.rating_stars);

  if (!id && !name && !image && !url) return null;

  return { id, name, image, url, price, old_price, rating };
}

/* ---- inlined: utils/commerceOutcome.ts ---- */
type CommerceCtaOptions = {
  className?: string;
  /** Per-item link. Falls back to the merchant's configured CTA link. */
  href?: string;
};

type CommerceRenderOptions = CommerceCtaOptions & {
  config?: Record<string, unknown>;
  prefix?: string;
  /** Retained for existing call sites. */
  matchTags?: string[];
  /** Retained for existing call sites. */
  ready?: boolean;
  /** Retained for existing call sites. */
  sliderOverride?: unknown;
  /** Retained for existing call sites. */
  dynamicOnly?: boolean;
  /** Retained for existing call sites. */
  selection?: unknown;
  /** Retained for existing call sites. */
  defaultProductsTitle?: { ar: string; en: string };
};

function normalizeArgs(
  optionsOrConfig: CommerceRenderOptions | Record<string, unknown>,
  legacyPrefix?: string,
  legacyOptions?: CommerceRenderOptions | string[]
): Required<
  Pick<CommerceRenderOptions, 'config' | 'prefix'>
> &
  CommerceRenderOptions {
  if (
    optionsOrConfig &&
    typeof optionsOrConfig === 'object' &&
    'config' in optionsOrConfig &&
    'prefix' in optionsOrConfig
  ) {
    const o = optionsOrConfig as CommerceRenderOptions;
    return {
      ...o,
      config: o.config || {},
      prefix: o.prefix || '',
    };
  }

  const extra: CommerceRenderOptions =
    legacyOptions && !Array.isArray(legacyOptions) ? legacyOptions : {};
  return {
    ...extra,
    config: (optionsOrConfig as Record<string, unknown>) || {},
    prefix: legacyPrefix || '',
  };
}

function renderCommerceCtaButton(
  config: Record<string, unknown>,
  prefix: string,
  options: CommerceCtaOptions = {}
): TemplateResult {
  const ctaLink =
    (options.href || '').trim() ||
    extractLink(config[`${prefix}result_link`] ?? config[`${prefix}cta_link`]) ||
    '/';
  const ctaLabel =
    localizedString(config[`${prefix}cta_label`] as LocaleValue, '').trim() ||
    t('تسوق الآن', 'Shop now');
  const className = ['fs-btn', 'fs-tap', options.className || '']
    .filter(Boolean)
    .join(' ');

  return html`<a
    class=${className}
    href=${ctaLink}
    target=${isExternalUrl(ctaLink) ? '_blank' : nothing}
    rel=${isExternalUrl(ctaLink) ? 'noopener noreferrer' : nothing}
  >
    ${ctaLabel}
  </a>`;
}

function renderCommerceOutcome(
  options: CommerceRenderOptions
): TemplateResult | typeof nothing;
function renderCommerceOutcome(
  config: Record<string, unknown>,
  prefix: string,
  options?: CommerceRenderOptions | string[]
): TemplateResult | typeof nothing;
function renderCommerceOutcome(
  optionsOrConfig: CommerceRenderOptions | Record<string, unknown>,
  legacyPrefix?: string,
  legacyOptions?: CommerceRenderOptions | string[]
): TemplateResult | typeof nothing {
  const opts = normalizeArgs(optionsOrConfig, legacyPrefix, legacyOptions);
  const c = opts.config || {};
  const prefix = opts.prefix || '';
  if (opts.ready === false) return nothing;

  const ctaLink =
    (opts.href || '').trim() ||
    extractLink(c[`${prefix}result_link`] ?? c[`${prefix}cta_link`]);
  const showCta =
    isTruthy(c[`${prefix}show_cta`], Boolean(ctaLink)) && Boolean(ctaLink);
  if (!showCta) return nothing;

  return html`
    <aside class="fs-commerce" aria-label=${t('التسوق', 'Shopping')}>
      <div class="fs-commerce__actions">
        ${renderCommerceCtaButton(c, prefix, {
          className: 'fs-commerce__cta',
          href: ctaLink,
        })}
      </div>
    </aside>
  `;
}

/* ---- inlined: utils/sharedStyles.ts ---- */
/**
 * Shared section chrome + mobile/tablet baselines.
 * Breakpoints: phone ≤639 · tablet ≤959 · desktop ≥960
 */
const sharedSectionCss = css`
  :host {
    direction: inherit;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    display: block;
    overflow-x: clip;
    /* Store primary + light/dark text defaults */
    --fs-store-primary: var(--color-primary, var(--primary-color, var(--color-main, #64748b)));
    --accent-color: var(--fs-store-primary);
    --button-bg: var(--fs-store-primary);
    --button-color: #ffffff;
    /* Light: titles black · subtitle/desc muted */
    --text-color: #000000;
    --muted-color: #666666;
    --card-bg: #ffffff;
    --border-color: #e5e7eb;
    --section-bg: transparent;
    --fs-surface: #f3f4f6;
    --fs-success: #2f9e63;
    --fs-caution: #e0a100;
    --fs-danger: #cf4b4b;
    --fs-unknown: #8f7a86;
  }

  :host-context(:root:not([data-theme='dark']):not(.dark)),
  :host-context(html:not([data-theme='dark']):not(.dark)) {
    --text-color: #000000;
    --muted-color: #666666;
    --card-bg: #ffffff;
    --border-color: #e5e7eb;
    --section-bg: transparent;
    --fs-surface: #f3f4f6;
    --button-bg: var(--fs-store-primary);
    --button-color: #ffffff;
  }

  :host-context([data-theme='dark']),
  :host-context(.dark),
  :host-context([data-mode='dark']) {
    /* Dark: titles white · subtitle/desc muted · secondary surfaces darker */
    --text-color: #ffffff;
    --muted-color: #aaaaaa;
    --card-bg: #141414;
    --border-color: rgba(255, 255, 255, 0.14);
    --section-bg: transparent;
    --fs-surface: #1a1a1a;
    --button-bg: var(--fs-store-primary);
    --button-color: #ffffff;
  }

  .fs-section {
    background:
      radial-gradient(
        130% 90% at 100% 0%,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, transparent),
        transparent 58%
      ),
      radial-gradient(
        120% 80% at 0% 100%,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 5%, transparent),
        transparent 55%
      ),
      var(--section-bg, transparent);
    color: var(--text-color, #000000);
    padding: var(--space-mobile, 28px) 0
      var(--space-mobile-bottom, var(--space-mobile, 28px));
    overflow-x: clip;
  }

  @media (min-width: 960px) {
    .fs-section {
      padding: var(--space-desktop, 48px) 0;
    }
  }

  .fs-container {
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 16px;
    box-sizing: border-box;
    min-width: 0;
    overflow-x: clip;
  }

  .fs-section--full .fs-container {
    max-width: none;
  }

  .fs-header {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .fs-header--editorial {
    margin-bottom: 1.55rem;
  }

  .fs-eyebrow {
    display: inline-block;
    margin: 0 0 0.55rem;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--accent-color, var(--fs-store-primary));
  }

  .fs-title {
    margin: 0 0 0.6rem;
    font-size: clamp(1.4rem, 2.6vw, 1.95rem);
    font-weight: 800;
    line-height: 1.3;
    letter-spacing: -0.01em;
    color: var(--text-color, #000000);
  }

  .fs-header--editorial .fs-title,
  .fs-title--editorial {
    margin: 0;
    font-size: clamp(1.75rem, 3.4vw, 2.55rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.15;
  }

  .fs-title-line {
    display: block;
    width: 4.5rem;
    height: 2px;
    margin: 0.85rem auto 0;
    border-radius: 999px;
    background: linear-gradient(
      90deg,
      transparent,
      var(--accent-color, var(--fs-store-primary)),
      transparent
    );
  }

  .fs-subtitle {
    margin: 0 0 0.45rem;
    color: var(--muted-color, #666666);
    font-size: 1.05rem;
    font-weight: 600;
    line-height: 1.5;
  }

  .fs-desc {
    margin: 0.85rem auto 0;
    max-width: 36rem;
    color: var(--muted-color, #666666);
    font-size: 0.95rem;
    line-height: 1.75;
  }

  .fs-title,
  .fs-commerce__title {
    color: var(--text-color, #000000);
  }

  .fs-desc,
  .fs-subtitle,
  .fs-empty {
    color: var(--muted-color, #666666);
  }

  :host([data-fs-theme='dark']) .fs-title,
  :host([data-fs-theme='dark']) .fs-commerce__title {
    color: #ffffff;
  }

  :host([data-fs-theme='dark']) .fs-desc,
  :host([data-fs-theme='dark']) .fs-subtitle,
  :host([data-fs-theme='dark']) .fs-empty {
    color: #aaaaaa;
  }

  :host([data-fs-theme='light']) .fs-title,
  :host([data-fs-theme='light']) .fs-commerce__title {
    color: #000000;
  }

  :host([data-fs-theme='light']) .fs-desc,
  :host([data-fs-theme='light']) .fs-subtitle,
  :host([data-fs-theme='light']) .fs-empty {
    color: #666666;
  }

  /* Tip / notice surfaces — follow light/dark tokens (never hard-mix with #fff) */
  .fs-hint,
  .fs-notice {
    margin: 0;
    padding: 0.7rem 0.85rem;
    border-radius: 12px;
    font-size: 0.88rem;
    line-height: 1.55;
    color: var(--text-color, #000000);
    background: color-mix(
      in srgb,
      var(--accent-color, var(--fs-store-primary)) 14%,
      var(--fs-surface, var(--card-bg, #f0f0f0))
    );
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 80%, transparent);
    border-inline-start: 3px solid var(--accent-color, var(--fs-store-primary));
  }

  :host([data-fs-theme='dark']) .fs-hint,
  :host([data-fs-theme='dark']) .fs-notice {
    color: #ffffff;
    background: color-mix(
      in srgb,
      var(--accent-color, var(--fs-store-primary)) 18%,
      var(--fs-surface, #0a0a0a)
    );
    border-color: rgba(255, 255, 255, 0.12);
  }

  :host([data-fs-theme='light']) .fs-hint,
  :host([data-fs-theme='light']) .fs-notice {
    color: #000000;
  }

  :host([data-fs-theme='dark']) .bsf-question__hint,
  :host([data-fs-theme='dark']) .bsg-step__hint,
  :host([data-fs-theme='dark']) .bsg-notice,
  :host([data-fs-theme='dark']) .bac-tip,
  :host([data-fs-theme='dark']) .bac-tip__text,
  :host([data-fs-theme='dark']) .bac-notice,
  :host([data-fs-theme='dark']) .bil-note,
  :host([data-fs-theme='dark']) .brl-step__note,
  :host([data-fs-theme='dark']) .bpa-tips,
  :host([data-fs-theme='dark']) .bpa-notice,
  :host([data-fs-theme='dark']) .bff-notice,
  :host([data-fs-theme='dark']) .bff-note,
  :host([data-fs-theme='dark']) .bfz-notice,
  :host([data-fs-theme='dark']) .bch-notice,
  :host([data-fs-theme='dark']) .bwp-notice,
  :host([data-fs-theme='dark']) .srg-zone-tip,
  :host([data-fs-theme='dark']) .pql-callout,
  :host([data-fs-theme='dark']) .fll-note,
  :host([data-fs-theme='dark']) .inp-note,
  :host([data-fs-theme='dark']) .sfr-tip,
  :host([data-fs-theme='dark']) .nal-tip,
  :host([data-fs-theme='dark']) .pcc-notice,
  :host([data-fs-theme='dark']) .pcc-tips,
  :host([data-fs-theme='dark']) .icpm-tip,
  :host([data-fs-theme='dark']) .mmt-note,
  :host([data-fs-theme='dark']) .csdg-alert,
  :host([data-fs-theme='dark']) .tbsg-notes {
    color: #ffffff;
    background: color-mix(
      in srgb,
      var(--accent-color, var(--fs-store-primary)) 18%,
      var(--fs-surface, #0a0a0a)
    );
    border-color: rgba(255, 255, 255, 0.12);
  }

  :host([data-fs-theme='dark']) .bac-tip__text,
  :host([data-fs-theme='dark']) .pcc-notice__text,
  :host([data-fs-theme='dark']) .pcc-tips__text,
  :host([data-fs-theme='dark']) .icpm-tip__text,
  :host([data-fs-theme='dark']) .pcc-tips__title {
    color: #ffffff;
    background: transparent;
    border: none;
  }

  :host-context([data-theme='dark']) .fs-section,
  :host-context(.dark) .fs-section,
  :host-context([data-mode='dark']) .fs-section {
    color: #ffffff;
    background:
      radial-gradient(
        130% 90% at 100% 0%,
        color-mix(in srgb, var(--fs-store-primary) 14%, transparent),
        transparent 58%
      ),
      radial-gradient(
        120% 80% at 0% 100%,
        color-mix(in srgb, var(--fs-store-primary) 8%, transparent),
        transparent 55%
      ),
      var(--section-bg, transparent);
  }

  :host-context([data-theme='dark']) .fs-card,
  :host-context(.dark) .fs-card,
  :host-context([data-mode='dark']) .fs-card,
  :host-context([data-theme='dark']) .fs-stage,
  :host-context(.dark) .fs-stage,
  :host-context([data-mode='dark']) .fs-stage,
  :host([data-fs-theme='dark']) .fs-card,
  :host([data-fs-theme='dark']) .fs-stage {
    background: var(--card-bg, #141414);
    border-color: var(--border-color, rgba(255, 255, 255, 0.14));
    color: var(--text-color, #ffffff);
  }

  :host-context([data-theme='dark']) .fs-commerce,
  :host-context(.dark) .fs-commerce,
  :host-context([data-mode='dark']) .fs-commerce {
    border-color: var(--border-color, rgba(255, 255, 255, 0.14));
  }

  .fs-header:not(.fs-header--editorial) .fs-desc {
    margin-top: 0;
  }

  .fs-card {
    background: var(--card-bg, #ffffff);
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: var(--section-radius, 16px);
    box-shadow: 0 12px 32px color-mix(in srgb, var(--text-color, #000000) 8%, transparent);
    color: var(--text-color, #000000);
    transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
  }

  :host([data-fs-theme='dark']) .fs-card {
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
  }

  .fs-stage {
    position: relative;
    isolation: isolate;
    border-radius: var(--section-radius, 16px);
    overflow: hidden;
  }

  /* —— Unified buttons (size + primary fill) —— */
  .fs-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    min-height: 44px;
    min-width: 44px;
    padding: 0.65rem 1.25rem;
    border: 1.5px solid transparent;
    border-radius: 999px;
    background: var(--button-bg, var(--fs-store-primary));
    color: var(--button-color, #ffffff);
    font: inherit;
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.01em;
    line-height: 1.2;
    cursor: pointer;
    text-decoration: none;
    white-space: nowrap;
    box-shadow: 0 6px 16px color-mix(in srgb, var(--fs-store-primary) 22%, transparent);
    transition:
      box-shadow 0.2s ease,
      transform 0.2s ease,
      filter 0.2s ease,
      background 0.2s ease,
      border-color 0.2s ease,
      color 0.2s ease,
      opacity 0.2s ease;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  .fs-btn:hover {
    filter: brightness(1.05);
    transform: translateY(-1px);
    box-shadow: 0 10px 22px color-mix(in srgb, var(--fs-store-primary) 30%, transparent);
  }

  .fs-btn:active {
    transform: translateY(0);
    filter: brightness(0.98);
  }

  .fs-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    filter: none;
  }

  .fs-btn--ghost {
    background: transparent;
    color: var(--accent-color, var(--fs-store-primary));
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 50%, var(--border-color, #e5e7eb));
    box-shadow: none;
  }

  .fs-btn--ghost:hover {
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, transparent);
    filter: none;
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 70%, var(--border-color, #e5e7eb));
  }

  :host([data-fs-theme='dark']) .fs-btn--ghost {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 55%, rgba(255, 255, 255, 0.2));
  }

  .fs-btn--compact,
  .fs-btn--icon {
    min-width: 44px;
    min-height: 44px;
    padding: 0.5rem 1rem;
    font-size: 0.86rem;
    box-shadow: 0 4px 12px color-mix(in srgb, var(--fs-store-primary) 18%, transparent);
  }

  .fs-btn--icon {
    width: 44px;
    padding: 0;
  }

  .fs-btn--ghost.fs-btn--compact,
  .fs-btn--ghost.fs-btn--icon {
    box-shadow: none;
  }

  /* Choice chips — same height/radius as primary buttons */
  .fs-chip {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    min-height: 44px;
    min-width: 44px;
    padding: 0.55rem 1.1rem;
    border-radius: 999px;
    border: 1.5px solid var(--border-color, #e5e7eb);
    background: var(--fs-surface, var(--card-bg, #f0f0f0));
    color: var(--text-color, #000000);
    font: inherit;
    font-size: 0.9rem;
    font-weight: 600;
    line-height: 1.2;
    cursor: pointer;
    text-decoration: none;
    box-sizing: border-box;
    transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
  }

  .fs-chip:hover {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, var(--border-color, #e5e7eb));
  }

  .fs-chip[aria-pressed='true'],
  .fs-chip.is-active,
  .fs-chip[aria-selected='true'] {
    background: var(--button-bg, var(--fs-store-primary));
    border-color: transparent;
    color: #ffffff;
    transform: translateY(-1px);
  }

  :host([data-fs-theme='dark']) .fs-chip {
    background: var(--fs-surface, #0a0a0a);
    border-color: rgba(255, 255, 255, 0.14);
    color: #ffffff;
  }

  :host([data-fs-theme='dark']) .fs-chip[aria-pressed='true'],
  :host([data-fs-theme='dark']) .fs-chip.is-active,
  :host([data-fs-theme='dark']) .fs-chip[aria-selected='true'] {
    background: var(--button-bg, var(--fs-store-primary));
    border-color: transparent;
    color: #ffffff;
  }

  /* Align pill CTAs / choice chips only — NOT card-style chips (spa-chip, ffm-chip, …) */
  .bpb-card__cta,
  .spb-card__cta,
  .gpb-card__cta,
  .spb-cta,
  .bsf-chip,
  .bsg-option,
  .brb-option,
  .bca-answer,
  .bch-type,
  .bff-chip,
  .bac-chip {
    min-height: 44px;
    border-radius: 999px;
    box-sizing: border-box;
  }

  .bpb-card__cta,
  .spb-card__cta,
  .gpb-card__cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 0.65rem 1.25rem;
    border: 1.5px solid transparent;
    background: var(--button-bg, var(--fs-store-primary));
    color: var(--button-color, #ffffff);
    font-size: 0.9rem;
    font-weight: 700;
    line-height: 1.2;
    text-decoration: none;
    box-shadow: 0 6px 16px color-mix(in srgb, var(--fs-store-primary) 22%, transparent);
  }

  .fs-tap {
    min-width: 44px;
    min-height: 44px;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }

  .fs-actions,
  .fs-nav {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.55rem;
  }

  .fs-nav {
    justify-content: center;
    margin-top: 0.35rem;
  }

  .fs-nav .fs-btn {
    min-width: 7.5rem;
  }

  .fs-btn:focus-visible,
  button:focus-visible,
  a:focus-visible,
  input:focus-visible,
  select:focus-visible,
  [tabindex]:focus-visible {
    outline: 2px solid var(--accent-color, var(--fs-store-primary));
    outline-offset: 2px;
  }

  .fs-empty {
    padding: 2.25rem 1.15rem;
    text-align: center;
    color: var(--muted-color, #7a6a62);
    border: 1px dashed var(--border-color, #e8ddd6);
    border-radius: var(--section-radius, 16px);
    background: color-mix(in srgb, var(--card-bg, #fff) 70%, transparent);
    font-size: 0.92rem;
    line-height: 1.6;
  }

  .fs-pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
    min-height: 36px;
    padding: 0.35rem 0.85rem;
    border-radius: 999px;
    border: 1px solid var(--border-color, #e8ddd6);
    background: var(--card-bg, #fff);
    color: var(--muted-color, #7a6a62);
    font: inherit;
    font-size: 0.8rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
  }

  .fs-pill:hover {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 40%, var(--border-color, #e8ddd6));
  }

  .fs-pill[aria-pressed='true'],
  .fs-pill.is-active,
  .fs-pill--active {
    border-color: var(--accent-color, var(--fs-store-primary));
    color: var(--accent-color, var(--fs-store-primary));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, var(--card-bg, #fff));
  }

  .fs-coach {
    display: grid;
    gap: 0.35rem;
    padding: 0.85rem 1rem;
    border-radius: calc(var(--section-radius, 16px) * 0.7);
    border-inline-start: 3px solid var(--accent-color, var(--fs-store-primary));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 7%, var(--card-bg, #fff));
    color: var(--text-color, #2b211c);
    font-size: 0.88rem;
    line-height: 1.6;
  }

  :host([data-fs-theme='dark']) .fs-coach {
    color: #ffffff;
    background: color-mix(
      in srgb,
      var(--accent-color, var(--fs-store-primary)) 16%,
      var(--fs-surface, #0a0a0a)
    );
    border-color: rgba(255, 255, 255, 0.12);
  }

  .fs-coach__mark {
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--accent-color, var(--fs-store-primary));
  }

  .fs-progress {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.55rem;
    margin-bottom: 1rem;
  }

  .fs-progress__label {
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--muted-color, #7a6a62);
  }

  .fs-progress__track {
    flex: 1;
    min-width: 7rem;
    height: 0.35rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #e8ddd6) 75%, transparent);
    overflow: hidden;
  }

  .fs-progress__bar {
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(
      90deg,
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 70%, #c4a484),
      var(--accent-color, var(--fs-store-primary))
    );
    transition: width 0.35s ease;
  }

  .fs-dots {
    display: flex;
    justify-content: center;
    gap: 0.4rem;
    margin-top: 0.85rem;
  }

  .fs-dot {
    width: 0.45rem;
    height: 0.45rem;
    border: 0;
    padding: 0;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 28%, #ddd);
    cursor: pointer;
    transition: width 0.25s ease, background 0.25s ease;
  }

  .fs-dot.is-active,
  .fs-dot[aria-current='true'] {
    width: 1.35rem;
    background: var(--accent-color, var(--fs-store-primary));
  }

  .fs-meter {
    width: 100%;
    height: 6px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #e8ddd6) 80%, transparent);
    overflow: hidden;
  }

  .fs-meter > span {
    display: block;
    height: 100%;
    background: linear-gradient(
      90deg,
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 75%, #c4a484),
      var(--accent-color, var(--fs-store-primary))
    );
    border-radius: inherit;
    transition: width 0.45s ease;
  }

  .fs-scroll-x {
    display: flex;
    gap: 0.65rem;
    max-width: 100%;
    min-width: 0;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-x: contain;
    scroll-snap-type: x proximity;
    scrollbar-width: thin;
    padding-bottom: 0.25rem;
  }

  .fs-scroll-x > * {
    flex: 0 0 auto;
    scroll-snap-align: start;
  }

  
  /* Entrance motion when theme.animate is on */
  .fs-animate .fs-header,
  .fs-animate .fs-header--editorial {
    animation: fs-rise 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .fs-fade {
    animation: fs-fade 0.35s ease both;
  }

  .fs-pulse {
    animation: fs-pulse 2.2s ease-out infinite;
  }

  @keyframes fs-rise {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @keyframes fs-fade {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes fs-pulse {
    0% {
      transform: scale(0.92);
      opacity: 0.7;
    }
    100% {
      transform: scale(1.28);
      opacity: 0;
    }
  }

  /* —— Merchant commercial outcome (real Salla products slider) —— */
  .fs-commerce {
    margin-top: clamp(1.5rem, 4vw, 3rem);
    padding-top: clamp(1.25rem, 3vw, 2rem);
    border-top: 1px solid var(--border-color, #e8ddd6);
    display: grid;
    gap: 1rem;
  }

  .fs-commerce__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    margin: 0;
  }

  .fs-commerce__title,
  .fs-commerce__head h3 {
    margin: 0;
    color: var(--text-color, #2b211c);
    font-size: 1.1rem;
    font-weight: 800;
    text-align: start;
    line-height: 1.35;
  }

  .fs-commerce__view-all {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    min-height: 40px;
    padding: 0.4rem 0.8rem;
    border: 1px solid color-mix(
      in srgb,
      var(--accent-color, var(--fs-store-primary)) 35%,
      var(--border-color, #e8ddd6)
    );
    border-radius: 999px;
    color: var(--accent-color, var(--fs-store-primary));
    background: var(--card-bg, #fff);
    font-size: 0.82rem;
    font-weight: 800;
    line-height: 1;
    text-decoration: none;
    white-space: nowrap;
    transition: color 180ms ease, background-color 180ms ease,
      border-color 180ms ease;
  }

  .fs-commerce__view-all:hover {
    border-color: var(--accent-color, var(--fs-store-primary));
    color: var(--button-color, #fff);
    background: var(--accent-color, var(--fs-store-primary));
  }

  .fs-commerce__view-all-arrow {
    font-size: 1rem;
    transition: transform 180ms ease;
  }

  .fs-commerce__view-all:hover .fs-commerce__view-all-arrow {
    transform: translateX(-2px);
  }

  :host-context([dir='ltr']) .fs-commerce__view-all-arrow,
  :host([dir='ltr']) .fs-commerce__view-all-arrow {
    transform: rotate(180deg);
  }

  @media (max-width: 479px) {
    .fs-commerce__head {
      align-items: flex-start;
    }

    .fs-commerce__view-all {
      min-height: 38px;
      padding-inline: 0.7rem;
      font-size: 0.78rem;
    }
  }

  .fs-commerce__head p {
    margin: 0.35rem 0 0;
    color: var(--muted-color, #7a6a62);
    font-size: 0.9rem;
    text-align: center;
  }

  .fs-commerce__slider {
    min-width: 0;
    width: 100%;
  }

  .fs-commerce__slider salla-products-slider {
    display: block;
    width: 100%;
    margin-bottom: 0 !important;
  }

  .fs-commerce__actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.65rem;
  }

  .fs-commerce__cta {
    min-width: min(100%, 16rem);
  }

  .fs-commerce__hint {
    margin: 0;
    text-align: center;
    color: var(--muted-color, #7a6a62);
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .fs-commerce__slider[data-hide-add='1'] .s-product-card-content-footer,
  .fs-commerce__slider[data-hide-add='1'] .s-add-product-button,
  .fs-commerce__slider[data-hide-add='1'] salla-add-product-button {
    display: none !important;
  }

  /* —— Salla product cards (Theme Raed look) —— */
  .fs-commerce__slider .s-slider-block__title {
    display: none;
  }

  .fs-commerce__slider .swiper,
  .fs-commerce__slider .s-slider-container {
    overflow: hidden;
    padding: 0.35rem 0.2rem 1.1rem;
  }

  .fs-commerce__slider .swiper-wrapper {
    align-items: stretch;
  }

  .fs-commerce__slider .swiper-slide,
  .fs-commerce__slider .s-products-slider-card {
    height: auto;
    /* Swiper sets slide width — forcing it breaks drag/translate */
    box-sizing: border-box;
  }

  .fs-commerce__slider salla-product-card,
  .fs-commerce__slider .s-product-card-entry {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    overflow: hidden;
    text-align: start;
    color: #1f2937;
    background: #fff;
    border: 0;
    border-radius: 15px;
    box-shadow: none;
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .fs-commerce__slider .s-product-card-vertical {
    flex-direction: column;
  }

  .fs-commerce__slider--shadow .s-product-card-entry:hover,
  .fs-commerce__slider--shadow .s-product-card-shadow:hover {
    box-shadow: 5px 10px 30px rgba(43, 45, 52, 0.051);
  }

  .fs-commerce__slider .s-product-card-image {
    position: relative;
    display: block;
    flex: 1 1 0%;
    overflow: hidden;
    width: 100%;
    min-height: 11rem;
    max-height: 15rem;
    aspect-ratio: 1 / 1;
    background: #f3f4f6;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }

  .fs-commerce__slider .s-product-card-image::before,
  .fs-commerce__slider .s-product-card-image a::before {
    content: none !important;
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
  }

  .fs-commerce__slider .s-product-card-image:hover {
    opacity: 1;
  }

  .fs-commerce__slider .s-product-card-image a {
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
  }

  .fs-commerce__slider .s-product-card-image img,
  .fs-commerce__slider .s-product-card-image-cover,
  .fs-commerce__slider .s-product-card-image-contain {
    display: block;
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    transition: transform 400ms cubic-bezier(0.4, 0, 0.2, 1),
      opacity 500ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .fs-commerce__slider .s-product-card-image-contain {
    object-fit: contain;
  }

  .fs-commerce__slider .s-product-card-wishlist-btn {
    position: absolute;
    top: 0.5rem;
    inset-inline-end: 0.5rem;
    z-index: 2;
    opacity: 0.75;
  }

  .fs-commerce__slider .s-product-card-wishlist-btn:hover {
    opacity: 1;
  }

  .fs-commerce__slider .s-product-card-wishlist-btn button,
  .fs-commerce__slider .s-product-card-wishlist-btn .s-button-element {
    display: inline-flex !important;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    margin: 0 !important;
    padding: 0 !important;
    border: 0 !important;
    border-radius: 999px !important;
    background: #fff !important;
    box-shadow: none;
    cursor: pointer;
  }

  .fs-commerce__slider .s-product-card-wishlist-btn svg {
    width: 1rem;
    height: 1rem;
    fill: #6b7280;
  }

  .fs-commerce__slider .s-product-card-wishlist-btn button:hover svg {
    fill: #4b5563;
  }

  .fs-commerce__slider .s-product-card-wishlist-added svg,
  .fs-commerce__slider .s-product-card-wishlist-added i {
    fill: #ef4444;
    color: #ef4444;
  }

  .fs-commerce__slider .s-product-card-promotion-title {
    position: absolute;
    top: 1rem;
    left: 0;
    z-index: 2;
    max-width: calc(100% - 60px);
    padding: 0.375rem 0.625rem;
    border-radius: 0 15px 15px 0;
    background: #991b1b;
    color: #fff;
    font-size: 0.75rem;
    font-weight: 700;
    line-height: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  :host([dir='rtl']) .fs-commerce__slider .s-product-card-promotion-title,
  [dir='rtl'] .fs-commerce__slider .s-product-card-promotion-title {
    right: 0;
    left: auto;
    border-radius: 15px 0 0 15px;
  }

  .fs-commerce__slider .s-product-card-quantity {
    position: absolute;
    bottom: 0.25rem;
    left: 50%;
    z-index: 2;
    max-width: calc(100% - 60px);
    transform: translateX(-50%);
    padding: 0.375rem 0.625rem;
    border-radius: 15px;
    background: #f87171;
    color: #fff;
    font-size: 0.75rem;
    font-weight: 700;
    line-height: 1rem;
  }

  .fs-commerce__slider .s-product-card-out-badge {
    position: absolute;
    bottom: 0.5rem;
    left: 50%;
    z-index: 2;
    max-width: calc(100% - 60px);
    transform: translateX(-50%);
    padding: 0.375rem 0.625rem;
    border-radius: 0.375rem;
    background: #f3f4f6;
    color: #999;
    font-size: 0.75rem;
    font-weight: 700;
    line-height: 1rem;
  }

  .fs-commerce__slider .s-product-card-out-of-stock img {
    filter: grayscale(100%);
  }

  .fs-commerce__slider .s-product-card-content {
    position: relative;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    padding: 0.75rem;
    min-width: 0;
  }

  @media (min-width: 640px) {
    .fs-commerce__slider .s-product-card-content {
      padding: 1.25rem;
    }
  }

  .fs-commerce__slider .s-product-card-content-title {
    margin: 0 0 0.625rem;
    max-width: 100%;
    line-height: 1.5rem;
    word-break: break-word;
  }

  .fs-commerce__slider .s-product-card-content-title a {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    color: #1f2937;
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 1.25rem;
    text-decoration: none;
  }

  .fs-commerce__slider .s-product-card-content-title a:hover {
    color: var(--color-primary, var(--accent-color, var(--fs-store-primary)));
  }

  .fs-commerce__slider .s-product-card-content-subtitle {
    margin: 0 0 0.625rem;
    color: #4b5563;
    font-size: 0.875rem;
    line-height: 1.5rem;
  }

  .fs-commerce__slider .s-product-card-content-sub {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: flex-start;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
  }

  .fs-commerce__slider .s-product-card-content-footer {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: stretch;
    gap: 0.65rem;
    margin-top: auto;
  }

  .fs-commerce__slider .s-product-card-price {
    margin: 0;
    color: #1f2937;
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 1.25rem;
  }

  .fs-commerce__slider .s-product-card-sale-price {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.25rem;
  }

  .fs-commerce__slider .s-product-card-sale-price h4 {
    margin: 0;
    display: inline-block;
    color: #991b1b !important;
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 1.25rem;
  }

  .fs-commerce__slider .s-product-card-sale-price span {
    color: #9ca3af;
    font-size: 0.875rem;
    line-height: 1.25rem;
    text-decoration: line-through;
  }

  .fs-commerce__slider .s-product-card-starting-price {
    display: flex;
    width: auto;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    gap: 0.625rem;
  }

  .fs-commerce__slider .s-product-card-starting-price h4 {
    margin: 0;
    display: inline-block;
    color: #991b1b;
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 1.25rem;
  }

  .fs-commerce__slider .s-product-card-starting-price p {
    margin: 0;
    color: #6b7280;
    font-size: 0.75rem;
  }

  .fs-commerce__slider .s-product-card-rating {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    color: #9ca3af;
    font-size: 0.875rem;
  }

  .fs-commerce__slider .s-product-card-rating span svg {
    width: 1rem;
    height: 1rem;
    margin-bottom: 3px;
    fill: #fbbf24;
  }

  .fs-commerce__slider .s-add-product-button,
  .fs-commerce__slider .s-add-product-button-main {
    display: block;
    width: 100%;
    margin-top: 0;
  }

  .fs-commerce__slider .s-add-product-button .s-button-btn,
  .fs-commerce__slider .s-add-product-button-main .s-button-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    width: 100%;
    min-height: 2.55rem;
    padding: 0.55rem 1.1rem;
    border-radius: 999px;
    border: 1px solid var(--color-primary, var(--accent-color, var(--fs-store-primary)));
    background: var(--color-primary, var(--accent-color, var(--fs-store-primary)));
    color: var(--color-primary-reverse, #fff);
    font-size: 0.8125rem;
    font-weight: 700;
    white-space: nowrap;
    box-shadow: 0 8px 18px color-mix(in srgb, var(--color-primary, #21636d) 22%, transparent);
    transition: transform 180ms ease, opacity 180ms ease;
  }

  .fs-commerce__slider .s-add-product-button .s-button-btn:hover,
  .fs-commerce__slider .s-add-product-button-main .s-button-btn:hover {
    opacity: 0.92;
    transform: translateY(-1px);
  }

  @media (prefers-reduced-motion: reduce) {
    .fs-commerce__slider .s-product-card-entry,
    .fs-commerce__slider .s-product-card-image img {
      transition: none;
    }
  }

  /* —— Salla theme-raed style product card —— */
  .fs-product-card {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    text-align: start;
    color: #1f2937;
    background: #fff;
    border: 0;
    border-radius: 15px;
    box-shadow: none;
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .fs-product-card:hover {
    box-shadow: 5px 10px 30px rgba(43, 45, 52, 0.051);
  }

  .fs-product-card--selectable {
    cursor: pointer;
  }

  .fs-product-card--selectable:focus-visible {
    outline: 2px solid var(--accent-color, var(--fs-store-primary));
    outline-offset: 2px;
  }

  .fs-product-card.is-selected {
    border-color: var(--accent-color, var(--fs-store-primary));
    box-shadow:
      0 0 0 2px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 32%, transparent),
      0 16px 34px rgba(43, 33, 28, 0.12);
  }

  .fs-product-card__media {
    position: relative;
    aspect-ratio: 1 / 1;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    overflow: hidden;
    background: color-mix(in srgb, var(--border-color, #e8ddd6) 45%, #fff);
  }

  .fs-product-card__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: opacity 500ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .fs-product-card__img--empty {
    background: linear-gradient(145deg, #3a2c26, #1c1613);
  }

  /* fs-product-card__badge--rtl-fix */
  .fs-product-card__badge {
    position: absolute;
    top: 1rem;
    inset-inline-start: 0;
    z-index: 2;
    padding: 0.375rem 0.625rem;
    border-radius: 0 15px 15px 0;
    background: #991b1b;
    color: #fff;
    font-size: 0.66rem;
    font-weight: 800;
    letter-spacing: 0.02em;
      }

  :host([dir='rtl']) .fs-product-card__badge,
  [dir='rtl'] .fs-product-card__badge {
    border-radius: 15px 0 0 15px;
  }

  .fs-product-card__wishlist {
    position: absolute;
    top: 0.6rem;
    inset-inline-end: 0.6rem;
    z-index: 3;
    width: 2.15rem;
    height: 2.15rem;
    display: grid;
    place-items: center;
    padding: 0;
    border: 1px solid color-mix(in srgb, var(--border-color, #e8ddd6) 70%, transparent);
    border-radius: 50%;
    background: color-mix(in srgb, var(--card-bg, #fff) 82%, transparent);
    color: var(--muted-color, #7a6a62);
    font-size: 0.98rem;
    line-height: 1;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(43, 33, 28, 0.12);
    -webkit-backdrop-filter: blur(6px);
    backdrop-filter: blur(6px);
    transition:
      color 0.2s ease,
      background 0.2s ease,
      border-color 0.2s ease,
      transform 0.2s ease;
  }

  .fs-product-card__wishlist:hover {
    transform: scale(1.1);
    color: #d1495b;
    border-color: color-mix(in srgb, #d1495b 35%, var(--border-color, #e8ddd6));
  }

  .fs-product-card__wishlist:active {
    transform: scale(0.94);
  }

  .fs-product-card__wishlist.is-active {
    color: #fff;
    border-color: transparent;
    background: linear-gradient(135deg, #d1495b, #b23a4a);
    animation: fs-heart-pop 0.32s ease;
  }

  @keyframes fs-heart-pop {
    0% {
      transform: scale(0.8);
    }
    55% {
      transform: scale(1.18);
    }
    100% {
      transform: scale(1);
    }
  }

  .fs-product-card__check {
    position: absolute;
    top: 0.6rem;
    inset-inline-start: 0.6rem;
    z-index: 3;
    width: 1.65rem;
    height: 1.65rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: var(--accent-color, var(--fs-store-primary));
    color: #fff;
    font-size: 0.75rem;
    font-weight: 700;
    box-shadow: 0 6px 14px rgba(43, 33, 28, 0.22);
    opacity: 0;
    transform: scale(0.8);
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  .fs-product-card.is-selected .fs-product-card__check {
    opacity: 1;
    transform: scale(1);
  }

  .fs-product-card__body {
    display: flex;
    flex-direction: column;
    gap: 0.42rem;
    padding: 0.8rem 0.85rem 0.9rem;
    flex: 1 1 auto;
  }

  .fs-product-card__title {
    margin: 0;
    font-size: 0.92rem;
    font-weight: 700;
    line-height: 1.45;
    color: var(--text-color, #2b211c);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .fs-product-card__title a {
    color: inherit;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .fs-product-card:hover .fs-product-card__title a {
    color: var(--accent-color, var(--fs-store-primary));
  }

  .fs-product-card__subtitle {
    margin: 0;
    font-size: 0.76rem;
    color: var(--muted-color, #7a6a62);
    line-height: 1.45;
  }

  .fs-product-card__meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.35rem 0.6rem;
    margin-top: auto;
    padding-top: 0.15rem;
  }

  .fs-product-card__price {
    display: inline-flex;
    align-items: baseline;
    gap: 0.4rem;
    flex-wrap: wrap;
  }

  .fs-product-card__price-now {
    font-size: 1rem;
    font-weight: 700;
    color: #991b1b;
    letter-spacing: -0.01em;
  }

  .fs-product-card__price-old {
    font-size: 0.76rem;
    font-weight: 500;
    color: var(--muted-color, #7a6a62);
    text-decoration: line-through;
  }

  .fs-product-card__rating {
    display: inline-flex;
    align-items: center;
    gap: 0.22rem;
    padding: 0.15rem 0.45rem;
    border-radius: 999px;
    background: color-mix(in srgb, #f4a940 16%, var(--card-bg, #fff));
    font-size: 0.76rem;
    font-weight: 700;
    color: var(--text-color, #2b211c);
  }

  .fs-product-card__rating .sicon-star2 {
    color: #f4a940;
  }

  .fs-product-card__add {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 2.25rem;
    padding: 0.5rem 1.25rem 0.625rem;
    border-radius: 0.375rem;
    border: 1px solid var(--color-primary, var(--accent-color, var(--fs-store-primary)));
    background: var(--color-primary, var(--accent-color, var(--fs-store-primary)));
    color: var(--color-primary-reverse, #fff);
    font-size: 0.875rem;
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;
    transition: opacity 300ms;
  }

  .fs-product-card__add:hover {
    opacity: 0.8;
  }

  .fs-product-card__add:active {
    opacity: 0.9;
  }

  .fs-product-card__link {
    margin-top: 0.2rem;
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--accent-color, var(--fs-store-primary));
    text-decoration: none;
  }

  .fs-product-card__link:hover {
    text-decoration: underline;
  }

  /* —— Tablet —— */
  @media (max-width: 959px) {
    .fs-header {
      margin-bottom: 1.25rem;
    }

    .fs-title {
      font-size: clamp(1.3rem, 4vw, 1.75rem);
      line-height: 1.3;
    }

    .fs-desc {
      font-size: 0.92rem;
      line-height: 1.65;
    }

    
    .fs-actions .fs-btn {
      width: 100%;
    }
  }

  /* —— Phone —— */
  @media (max-width: 639px) {
    .fs-section {
      padding: var(--space-mobile, 22px) 0;
    }

    .fs-container {
      padding: 0 12px;
    }

    .fs-header {
      margin-bottom: 1rem;
    }

    .fs-title {
      font-size: clamp(1.2rem, 6.2vw, 1.55rem);
      line-height: 1.28;
    }

    .fs-desc {
      font-size: 0.88rem;
      line-height: 1.6;
    }

    .fs-empty {
      padding: 1.35rem 0.85rem;
      font-size: 0.88rem;
    }

    .fs-product-card__body {
      padding: 0.65rem 0.65rem 0.75rem;
      gap: 0.35rem;
    }

    .fs-product-card__title {
      font-size: 0.86rem;
    }

    .fs-product-card__price-now {
      font-size: 0.92rem;
    }

    .fs-product-card__wishlist {
      width: 1.95rem;
      height: 1.95rem;
      font-size: 0.9rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .fs-btn,
    .fs-meter > span,
    * {
      scroll-behavior: auto !important;
    }

    .fs-animate,
    .fs-animate .fs-header,
    .fs-animate .fs-header--editorial,
    .fs-pulse,
    .fs-fade,
    .fs-curtain,
    .fs-celebrate,
    .fs-pill,
    .fs-dot,
    .fs-progress__bar,
    .fs-product-card,
    .fs-product-card__img,
    .fs-product-card__media::after,
    .fs-product-card__wishlist,
    .fs-product-card__check,
    .fs-product-card__add {
      transition: none !important;
      animation: none !important;
    }

    .fs-product-card:hover {
      transform: none;
    }

    .fs-product-card:hover .fs-product-card__img {
      transform: none;
    }
  }
`;

/* ---- inlined: components/collection-reveal/styles.ts ---- */
const componentStyles = css`
  .cr-stage {
    position: relative;
    overflow: hidden;
    border-radius: var(--section-radius, 16px);
    min-height: 22rem;
  }

  .cr-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .cr-overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .cr-pre {
    position: relative;
    z-index: 2;
    display: grid;
    gap: 1.25rem;
    padding: clamp(1.5rem, 4vw, 2.5rem);
    text-align: center;
    align-content: center;
    min-height: 22rem;
  }

  .cr-mystery {
    width: min(12rem, 55vw);
    margin: 0 auto;
    border-radius: calc(var(--section-radius, 16px) * 0.75);
    box-shadow: 0 12px 36px color-mix(in srgb, var(--text-color, #000) 20%, transparent);
  }

  .cr-mystery--breath.fs-animate {
    animation: cr-breath 3.2s ease-in-out infinite;
  }

  @keyframes cr-breath {
    0%,
    100% {
      transform: scale(1);
      opacity: 0.92;
    }
    50% {
      transform: scale(1.03);
      opacity: 1;
    }
  }

  .cr-pre-text {
    margin: 0;
    font-size: 0.88rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: color-mix(in srgb, #fff 88%, var(--muted-color, #666666));
  }

  .cr-timer {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.65rem;
  }

  .cr-timer__unit {
    min-width: 4.5rem;
    padding: 0.75rem 0.5rem;
    border-radius: calc(var(--section-radius, 16px) * 0.55);
    background: color-mix(in srgb, var(--card-bg, #ffffff) 88%, transparent);
    border: 1px solid var(--border-color, #e5e7eb);
  }

  .cr-timer__value {
    display: block;
    font-size: 1.65rem;
    font-weight: 700;
    line-height: 1.1;
    color: var(--timer-color, var(--accent-color, var(--fs-store-primary)));
  }

  .cr-timer__label {
    display: block;
    margin-top: 0.2rem;
    font-size: 0.72rem;
    color: var(--muted-color, #666666);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .cr-curtain {
    position: absolute;
    inset: 0;
    z-index: 5;
    background: linear-gradient(
      180deg,
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 92%, #000) 0%,
      color-mix(in srgb, var(--text-color, #000000) 88%, #000) 100%
    );
    transform: translateY(0);
    transition: transform 0.9s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
  }

  .cr-curtain--open {
    transform: translateY(-102%);
  }

  .cr-post {
    display: grid;
    gap: 1.5rem;
  }

  .cr-post.fs-animate {
    animation: cr-reveal 0.65s ease;
  }

  @keyframes cr-reveal {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .cr-media {
    width: 100%;
    max-height: 28rem;
    object-fit: cover;
    border-radius: var(--section-radius, 16px);
  }

  .cr-products {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }

  .cr-product {
    display: grid;
    gap: 0.65rem;
    padding: 1rem;
    overflow: hidden;
  }

  .cr-product__img {
    width: 100%;
    aspect-ratio: 3 / 4;
    object-fit: cover;
    border-radius: calc(var(--section-radius, 16px) * 0.55);
  }

  .cr-product__name {
    margin: 0;
    font-weight: 700;
    font-size: 1rem;
  }

  .cr-product__desc {
    margin: 0;
    font-size: 0.88rem;
    color: var(--muted-color, #666666);
    line-height: 1.55;
  }

  .cr-cta-wrap {
    text-align: center;
  }

  @media (max-width: 959px) {
    .cr-products {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.85rem;
    }

    .cr-cta-wrap .fs-btn {
      width: 100%;
      max-width: 22rem;
    }
  }

  @media (max-width: 639px) {
    .cr-stage,
    .cr-pre {
      min-height: 15rem;
    }

    .cr-pre {
      padding: 1rem 0.85rem;
      gap: 0.9rem;
    }

    .cr-media {
      max-height: 16rem;
    }

    .cr-products {
      grid-template-columns: 1fr;
      gap: 0.75rem;
    }

    .cr-product {
      padding: 0.8rem;
    }

    .cr-product__name {
      font-size: 0.95rem;
    }

    .cr-timer {
      gap: 0.4rem;
      flex-wrap: wrap;
      justify-content: center;
    }

    .cr-timer__unit {
      min-width: 3.4rem;
      padding: 0.5rem 0.3rem;
    }

    .cr-timer__value {
      font-size: 1.25rem;
    }

    .cr-cta-wrap .fs-btn {
      width: 100%;
      max-width: none;
    }
  }
`;

/* ---- inlined: components/collection-reveal/types.ts ---- */
interface RevealProduct {
  image: string;
  name: string;
  desc: string;
  url: string;
  btn_text: string;
}

interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
}

/* ---- inlined: components/collection-reveal/utils.ts ---- */
function parseLaunchDate(raw: unknown): Date | null {
  const str = localizedString(raw as string, '').trim();
  if (!str) return null;
  const parsed = new Date(str);
  return Number.isFinite(parsed.getTime()) ? parsed : null;
}

function getCountdown(target: Date, now = new Date()): CountdownParts {
  const totalMs = Math.max(0, target.getTime() - now.getTime());
  const totalSec = Math.floor(totalMs / 1000);
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;
  return { days, hours, minutes, seconds, totalMs };
}

function parseRevealProducts(raw: unknown): RevealProduct[] {
  return normalizeCollection(raw)
    .map((item) => ({
      image: localizedString(item.image as string),
      name: localizedString(item.name as string),
      desc: localizedString(item.desc as string),
      url: extractLink(item.url),
      btn_text: localizedString(item.btn_text as string),
    }))
    .filter((p) => p.name || p.image);
}

function isVideoUrl(url: string): boolean {
  if (!url) return false;
  return /\.(mp4|webm|ogg)(\?|$)/i.test(url) || url.includes('video');
}

function overlayOpacity(raw: unknown): number {
  return clamp(getUnitValue(raw, 0), 0, 100) / 100;
}

/* ---- inlined: components/collection-reveal/index.ts ---- */
export default class CollectionReveal extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private phase: 'pre' | 'curtain' | 'post' = 'pre';
  @state() private curtainOpen = false;
  @state() private countdown: CountdownParts = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalMs: 0,
  };

  private timerId: ReturnType<typeof setInterval> | null = null;
  private curtainTimer: ReturnType<typeof setTimeout> | null = null;
  private boundLangHandler = () => this.requestUpdate();
  private boundMotionHandler = () => this.requestUpdate();

  static styles = [sharedSectionCss, componentStyles, css`
    :host {
      direction: inherit;
    }
  `];

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('language-changed', this.boundLangHandler);
    this.motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.motionQuery.addEventListener('change', this.boundMotionHandler);
    this.syncTimer();
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLangHandler);
    this.motionQuery?.removeEventListener('change', this.boundMotionHandler);
    this.clearTimer();
    if (this.curtainTimer) clearTimeout(this.curtainTimer);
    super.disconnectedCallback();
  }

  private motionQuery: MediaQueryList | null = null;

  private clearTimer(): void {
    if (this.timerId != null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  private get cfg(): Record<string, unknown> {
    const value = this.config;
    return value && typeof value === 'object' ? value : {};
  }

  private syncTimer(): void {
    this.clearTimer();
    const launchAt = parseLaunchDate(this.cfg.cr_launch_at);
    if (!launchAt) {
      this.phase = 'post';
      return;
    }

    const tick = () => {
      const parts = getCountdown(launchAt);
      this.countdown = parts;
      if (parts.totalMs <= 0) {
        this.clearTimer();
        if (this.phase === 'pre') this.beginLaunchReveal();
      }
    };

    tick();
    if (this.phase === 'pre') {
      this.timerId = setInterval(tick, 1000);
    }
  }

  private beginLaunchReveal(): void {
    const animate = !prefersReducedMotion() && isTruthy(this.cfg.cr_animate, true);
    if (animate) {
      this.phase = 'curtain';
      this.curtainOpen = false;
      if (this.curtainTimer) clearTimeout(this.curtainTimer);
      // Paint closed curtain first, then open so the slide-up animation runs.
      void this.updateComplete.then(() => {
        requestAnimationFrame(() => {
          this.curtainOpen = true;
        });
      });
      this.curtainTimer = setTimeout(() => {
        this.phase = 'post';
        this.curtainOpen = false;
      }, 950);
      return;
    }
    this.phase = 'post';
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config')) {
      this.phase = 'pre';
      this.curtainOpen = false;
      if (this.curtainTimer) clearTimeout(this.curtainTimer);
      this.syncTimer();
    }
  }

  private renderTimerUnit(
    value: number,
    labelAr: string,
    labelEn: string,
    show: boolean
  ) {
    if (!show) return nothing;
    return html`
      <div class="cr-timer__unit" role="listitem">
        <span class="cr-timer__value" aria-hidden="true">${String(value).padStart(2, '0')}</span>
        <span class="cr-timer__label">${t(labelAr, labelEn)}</span>
      </div>
    `;
  }

  render() {
    const c = this.cfg;
    const theme = readSectionTheme(c, 'cr_');
    const animate = theme.animate && !prefersReducedMotion();
    const products = parseRevealProducts(c.cr_products);
    const ctaUrl = extractLink(c.cr_cta_url);
    const launchMedia = localizedString(c.cr_launch_media as string);
    const overlayAlpha = overlayOpacity(c.cr_overlay_opacity);
    const timerColor = String(c.cr_timer_color || theme.accent);
    const overlayColor = String(c.cr_overlay_color || '#2b211c');

    const showDays = isTruthy(c.cr_show_days, true);
    const showHours = isTruthy(c.cr_show_hours, true);
    const showMinutes = isTruthy(c.cr_show_minutes, true);
    const showSeconds = isTruthy(c.cr_show_seconds, true);

    return html`
      <section
        class=${classMap({
          'fs-section': true,
          'fs-animate': animate,
        })}
        style=${styleMap({
          ...themeStyleMap(theme),
          '--timer-color': timerColor,
        })}
        aria-live=${this.phase === 'post' ? 'polite' : 'off'}
      >
        <div class="fs-container">
          ${this.phase !== 'post'
            ? html`
                <div class="fs-header">
                  <h2 class="fs-title">${localizedString(c.cr_tease_title as string)}</h2>
                  <p class="fs-desc">${localizedString(c.cr_tease_desc as string)}</p>
                </div>
                <div class="cr-stage fs-card">
                  ${localizedString(c.cr_bg_image as string)
                    ? html`<img
                        class="cr-bg"
                        src=${localizedString(c.cr_bg_image as string)}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />`
                    : nothing}
                  <div
                    class="cr-overlay"
                    style=${styleMap({
                      background: overlayColor,
                      opacity: String(overlayAlpha),
                    })}
                  ></div>
                  <div class="cr-pre">
                    ${localizedString(c.cr_pre_text as string)
                      ? html`<p class="cr-pre-text">${localizedString(c.cr_pre_text as string)}</p>`
                      : nothing}
                    ${localizedString(c.cr_mystery_image as string)
                      ? html`<img
                          class=${classMap({
                            'cr-mystery': true,
                            'cr-mystery--breath': isTruthy(c.cr_breath_effect) && animate,
                          })}
                          src=${localizedString(c.cr_mystery_image as string)}
                          alt=${localizedString(c.cr_tease_title as string) || t('صورة المجموعة', 'Collection preview')}
                          loading="eager"
                          decoding="async"
                        />`
                      : nothing}
                    <div class="cr-timer" role="timer" aria-label=${t('العد التنازلي', 'Countdown')}>
                      ${this.renderTimerUnit(this.countdown.days, 'يوم', 'Days', showDays)}
                      ${this.renderTimerUnit(this.countdown.hours, 'ساعة', 'Hours', showHours)}
                      ${this.renderTimerUnit(this.countdown.minutes, 'دقيقة', 'Minutes', showMinutes)}
                      ${this.renderTimerUnit(this.countdown.seconds, 'ثانية', 'Seconds', showSeconds)}
                    </div>
                  </div>
                  ${this.phase === 'curtain'
                    ? html`<div
                        class=${classMap({
                          'cr-curtain': true,
                          'cr-curtain--open': this.curtainOpen,
                        })}
                        aria-hidden="true"
                      ></div>`
                    : nothing}
                </div>
              `
            : html`
                <div class="cr-post ${animate ? 'fs-animate' : ''}">
                  <div class="fs-header">
                    <h2 class="fs-title">${localizedString(c.cr_launch_title as string)}</h2>
                    <p class="fs-desc">${localizedString(c.cr_launch_desc as string)}</p>
                  </div>
                  ${launchMedia
                    ? isVideoUrl(launchMedia)
                      ? html`<video
                          class="cr-media"
                          src=${launchMedia}
                          controls
                          muted
                          playsinline
                          preload="metadata"
                          aria-label=${localizedString(c.cr_launch_title as string) || t('فيديو الإطلاق', 'Launch video')}
                        ></video>`
                      : html`<img
                          class="cr-media"
                          src=${launchMedia}
                          alt=${localizedString(c.cr_launch_title as string) || t('وسائط الإطلاق', 'Launch media')}
                          loading="eager"
                          decoding="async"
                        />`
                    : nothing}
                  ${ctaUrl
                    ? html`<div class="cr-cta-wrap">
                        <a class="fs-btn" href=${ctaUrl}>
                          ${localizedString(c.cr_cta_text as string) || t('اكتشفي المجموعة', 'Explore collection')}
                        </a>
                      </div>`
                    : nothing}
                  ${products.length
                    ? html`<div class="cr-products">
                        ${products.map(
                          (p) => html`
                            <article class="cr-product fs-card">
                              ${p.image
                                ? html`<img
                                    class="cr-product__img"
                                    src=${p.image}
                                    alt=${p.name || t('منتج', 'Product')}
                                    loading="lazy"
                                    decoding="async"
                                  />`
                                : nothing}
                              <h3 class="cr-product__name">${p.name}</h3>
                              ${p.desc ? html`<p class="cr-product__desc">${p.desc}</p>` : nothing}
                              ${p.url
                                ? html`<a class="fs-btn" href=${p.url}>
                                    ${p.btn_text || t('تسوقي الآن', 'Shop now')}
                                  </a>`
                                : nothing}
                            </article>
                          `
                        )}
                      </div>`
                    : nothing}
                </div>
              `}
        </div>
        ${renderCommerceOutcome(this.config || {}, 'cr_')}
      </section>
    `;
  }
}

