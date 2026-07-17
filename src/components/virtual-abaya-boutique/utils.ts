import {
  clamp,
  extractLink,
  extractMoneyAmount,
  extractImageUrl,
  extractSallaProduct,
  getRadioValue,
  getUnitValue,
  normalizeCollection,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import {
  extractEntityId,
  unwrapPickerEntries,
} from '../../utils/productPicker.js';
import {
  fetchSallaProducts,
  fetchSelectedProductsMap,
  toSourceIds,
} from '../../utils/sallaApi.js';
import type {
  BoutiqueProduct,
  CardDirection,
  Hotspot,
  ProductSource,
} from './types.js';

const SOURCE_VALUES = new Set(['none', 'categories', 'sales', 'latest', 'selected']);

export function unwrapEntries(raw: unknown): unknown[] {
  return unwrapPickerEntries(raw);
}

export { extractEntityId };

function looksLikeFullProduct(obj: Record<string, unknown>): boolean {
  const hasName = Boolean(
    localizedString(obj.name as string).trim() ||
      localizedString(obj.label as string).trim()
  );
  const hasImage = Boolean(
    extractImageUrl(obj.image) ||
      extractImageUrl(obj.thumbnail) ||
      extractImageUrl(obj.main_image) ||
      (obj.value && typeof obj.value === 'object'
        ? extractImageUrl((obj.value as Record<string, unknown>).image)
        : '')
  );
  const hasUrl = Boolean(extractLink(obj.url || obj.permalink || obj.link));
  const hasPrice =
    extractMoneyAmount(obj.price) > 0 ||
    extractMoneyAmount(obj.sale_price) > 0 ||
    extractMoneyAmount(obj.regular_price) > 0;
  return hasName && (hasImage || hasUrl || hasPrice);
}

function isSourceOptionEntry(entry: unknown): boolean {
  if (!entry || typeof entry !== 'object') return false;
  const obj = entry as Record<string, unknown>;
  const val = String(obj.value ?? obj.key ?? '').toLowerCase().trim();
  return SOURCE_VALUES.has(val) && !obj.id && !obj.product_id;
}

/** True when raw looks like a products picker list (not the source-type dropdown). */
function looksLikeProductList(raw: unknown): boolean {
  const entries = unwrapEntries(raw);
  if (!entries.length) return false;
  if (entries.length === 1 && isSourceOptionEntry(entries[0])) return false;

  return entries.some((entry) => {
    if (entry == null) return false;
    if (typeof entry === 'number' || typeof entry === 'string') {
      const id = String(entry).trim();
      return Boolean(id) && !SOURCE_VALUES.has(id.toLowerCase());
    }
    if (typeof entry !== 'object') return false;
    if (isSourceOptionEntry(entry)) return false;
    const obj = entry as Record<string, unknown>;
    if (looksLikeFullProduct(obj)) return true;
    const id = extractEntityId(obj);
    return Boolean(id) && !SOURCE_VALUES.has(id.toLowerCase());
  });
}

function normalizeProductSource(raw: unknown): ProductSource {
  // If the field actually holds picked products, treat as selected
  if (looksLikeProductList(raw)) return 'selected';

  const val = getRadioValue(raw, '').toLowerCase();
  if (!val || val === 'none') return '';
  if (['categories', 'sales', 'latest', 'selected'].includes(val)) {
    return val as ProductSource;
  }
  return '';
}

function normalizeCardDir(raw: unknown): CardDirection {
  const fromRadio = getRadioValue(raw, '').toLowerCase();
  const val = fromRadio || localizedString(raw as string).toLowerCase();
  if (['left', 'right', 'top', 'bottom'].includes(val)) {
    return val as CardDirection;
  }
  return '';
}

/** Resolve chosen products from several Twilight field shapes. */
function readChosenProducts(item: Record<string, unknown>): unknown {
  const candidates = [
    item.chosen_products,
    item.selected_products,
    item.product_ids,
    item.products_list,
    item['chosen_products.selected'],
  ];

  for (const candidate of candidates) {
    if (unwrapEntries(candidate).length || looksLikeProductList(candidate)) {
      return candidate;
    }
  }

  // Sometimes the products picker overwrites / reuses the `products` field
  if (looksLikeProductList(item.products)) {
    return item.products;
  }

  return item.chosen_products ?? null;
}

export function toBoutiqueProduct(raw: unknown): BoutiqueProduct | null {
  if (raw == null) return null;

  if (typeof raw === 'number' || typeof raw === 'string') {
    const id = String(raw).trim();
    if (!id || SOURCE_VALUES.has(id.toLowerCase())) return null;
    return { id, name: '', image: '', url: '', price: 0, old_price: 0 };
  }

  if (typeof raw !== 'object') return null;
  if (isSourceOptionEntry(raw)) return null;

  const snap = extractSallaProduct(raw);
  if (snap && (snap.name || snap.image || snap.url || snap.id)) {
    if (snap.id && SOURCE_VALUES.has(snap.id.toLowerCase()) && !snap.name && !snap.image) {
      return null;
    }
    return {
      id: snap.id,
      name: snap.name,
      image: snap.image,
      url: snap.url,
      price: snap.price,
      old_price: snap.old_price,
    };
  }

  const item = raw as Record<string, unknown>;
  const nested =
    item.value && typeof item.value === 'object' && !Array.isArray(item.value)
      ? (item.value as Record<string, unknown>)
      : null;

  const name =
    localizedString(item.name as string).trim() ||
    localizedString(item.label as string).trim() ||
    localizedString(item.title as string).trim() ||
    (nested
      ? localizedString(nested.name as string).trim() ||
        localizedString(nested.label as string).trim()
      : '');

  const image =
    extractImageUrl(item.image) ||
    extractImageUrl(item.thumbnail) ||
    extractImageUrl(item.main_image) ||
    (nested ? extractImageUrl(nested.image) : '');

  const url = extractLink(
    item.url || item.permalink || item.link || nested?.url || nested?.permalink
  );
  const id = extractEntityId(item);

  const priceSource = nested || item;
  const onSale = Boolean(priceSource.on_sale || priceSource.is_on_sale);
  const sale = extractMoneyAmount(priceSource.sale_price);
  const regular = extractMoneyAmount(priceSource.regular_price);
  const base = extractMoneyAmount(priceSource.price);

  let price = base;
  let old_price = 0;
  if (onSale && sale > 0) {
    price = sale;
    old_price = regular > sale ? regular : 0;
  } else if (regular > base && base > 0) {
    price = base;
    old_price = regular;
  }

  if (!name && !image && !url && !id) return null;
  if (id && SOURCE_VALUES.has(id.toLowerCase()) && !name && !image) return null;

  return { id, name, image, url, price, old_price };
}

export function parseDemoProducts(raw: unknown): BoutiqueProduct[] {
  return normalizeCollection(raw)
    .map((item) => toBoutiqueProduct(item))
    .filter((p): p is BoutiqueProduct => !!p);
}

export function parseHotspots(raw: unknown): Hotspot[] {
  return normalizeCollection(raw)
    .map((item, index) => {
      const spotName = localizedString(item.spot_name as string);
      const spotId =
        localizedString(item.spot_id as string) ||
        spotName ||
        `zone-${index + 1}`;

      const chosen = readChosenProducts(item);
      let products_source = normalizeProductSource(item.products);

      // Picked products present but source missing/none → selected
      if (!products_source && looksLikeProductList(chosen)) {
        products_source = 'selected';
      }

      return {
        spot_id: spotId,
        spot_name: spotName,
        spot_desc: localizedString(item.spot_desc as string),
        pos_x: clamp(getUnitValue(item.pos_x, 50), 0, 100),
        pos_y: clamp(getUnitValue(item.pos_y, 50), 0, 100),
        spot_image: String(item.spot_image || '').trim(),
        spot_url: extractLink(item.spot_url),
        spot_btn: localizedString(item.spot_btn as string),
        spot_color: String(item.spot_color || '').trim() || '#8b5e4b',
        card_dir: normalizeCardDir(item.card_dir),
        products_source,
        chosen_products: chosen,
        category: item.category,
        products_limit: clamp(getUnitValue(item.products_limit, 6) || 6, 1, 24),
        demo_products: parseDemoProducts(item.demo_products),
      };
    })
    .filter((h) => h.spot_name.trim() !== '' || h.spot_image !== '');
}

function mapFetchList(raw: unknown[]): BoutiqueProduct[] {
  return raw
    .map((item) => toBoutiqueProduct(item))
    .filter((p): p is BoutiqueProduct => !!p && Boolean(p.name || p.image || p.id));
}

async function callProductFetch(
  params: Record<string, unknown>
): Promise<BoutiqueProduct[]> {
  return mapFetchList(await fetchSallaProducts(params));
}

async function fetchSelectedByIds(
  ids: string[],
  limit: number
): Promise<BoutiqueProduct[]> {
  const unique = [...new Set(ids.filter(Boolean))].slice(0, limit);
  if (!unique.length) return [];

  const map = await fetchSelectedProductsMap(unique);
  return unique
    .map((id) => toBoutiqueProduct(map.get(id) ?? id))
    .filter((p): p is BoutiqueProduct => !!p && Boolean(p.name || p.image || p.id))
    .slice(0, limit);
}

/** Build displayable products from picker entries (editor hydration / IDs). */
function productsFromPicker(raw: unknown, limit: number): BoutiqueProduct[] {
  const entries = unwrapEntries(raw);
  const out: BoutiqueProduct[] = [];
  const seen = new Set<string>();

  for (const entry of entries) {
    if (out.length >= limit) break;
    const product = toBoutiqueProduct(entry);
    if (!product) continue;
    if (!product.name && !product.image && !product.id) continue;
    const key = product.id || `${product.name}|${product.image}`;
    if (key && seen.has(key)) continue;
    if (key) seen.add(key);
    out.push(product);
  }

  return out;
}

function pickerIds(raw: unknown): string[] {
  return unwrapEntries(raw)
    .map((entry) => extractEntityId(entry))
    .filter((id) => Boolean(id) && !SOURCE_VALUES.has(id.toLowerCase()));
}

async function fetchByProductSource(
  source: Exclude<ProductSource, ''>,
  spot: Hotspot,
  limit: number
): Promise<BoutiqueProduct[]> {
  if (source === 'latest') {
    return callProductFetch({ source: 'latest', limit });
  }

  if (source === 'sales') {
    // Salla sources for best-selling: `sales`, with `top-rated`/`offers` as
    // graceful fallbacks. `source_value` is unused here but Salla's validator
    // is happier with an explicit empty array.
    const attempts: Record<string, unknown>[] = [
      { source: 'sales', source_value: [], limit },
      { source: 'sales', limit },
      { source: 'top-rated', source_value: [], limit },
      { source: 'offers', source_value: [], limit },
    ];
    for (const params of attempts) {
      const list = await callProductFetch(params);
      if (list.length) return list;
    }
    return [];
  }

  if (source === 'categories') {
    const catIds = toSourceIds(
      unwrapEntries(spot.category)
        .map((entry) => extractEntityId(entry))
        .filter((id) => Boolean(id) && !SOURCE_VALUES.has(id.toLowerCase()))
    );
    // Never call API without a real category — triggers «حقل التصنيفات مطلوب»
    if (!catIds.length) return [];
    // Salla requires an ARRAY of category ids for the `categories` source,
    // even when only one category is picked.
    return callProductFetch({
      source: 'categories',
      source_value: catIds,
      limit,
    });
  }

  if (source === 'selected') {
    const fromPicker = productsFromPicker(spot.chosen_products, limit);

    // Prefer hydrated picker cards immediately (works in theme editor / demo)
    if (fromPicker.some((p) => p.name || p.image)) {
      const ids = pickerIds(spot.chosen_products);
      if (ids.length && !fromPicker.every((p) => p.image || p.price > 0)) {
        const fetched = await fetchSelectedByIds(ids, limit);
        if (fetched.some((p) => p.name || p.image)) {
          return fetched;
        }
      }
      return fromPicker;
    }

    const ids = pickerIds(spot.chosen_products);
    if (ids.length) {
      const fetched = await fetchSelectedByIds(ids, limit);
      if (fetched.some((p) => p.name || p.image)) return fetched;
      if (fromPicker.length) return fromPicker;
      // Last resort: show id stubs so the rail is not empty
      return ids.slice(0, limit).map((id) => ({
        id,
        name: '',
        image: '',
        url: '',
        price: 0,
        old_price: 0,
      }));
    }

    return fromPicker;
  }

  return [];
}

/**
 * Raed / Saji style product loading:
 * latest | sales | categories | selected → salla.product.fetch
 * Falls back to picker hydration, then demo_products for local preview only.
 */
export async function resolveSpotProducts(
  spot: Hotspot
): Promise<BoutiqueProduct[]> {
  const limit = spot.products_limit || 6;
  let source = spot.products_source;

  if (!source && pickerIds(spot.chosen_products).length) {
    source = 'selected';
  }

  const categoryIds = unwrapEntries(spot.category)
    .map((e) => extractEntityId(e))
    .filter((id) => Boolean(id) && !SOURCE_VALUES.has(id.toLowerCase()));

  if (!source && categoryIds.length) {
    source = 'categories';
  }

  if (!source) {
    return spot.demo_products.slice(0, limit);
  }

  // Categories chosen in the editor but no classification picked yet
  if (source === 'categories' && !categoryIds.length) {
    return spot.demo_products.slice(0, limit);
  }

  const list = await fetchByProductSource(source, spot, limit);
  if (list.length) return list.slice(0, limit);

  if (source === 'selected') {
    const fromPicker = productsFromPicker(spot.chosen_products, limit);
    if (fromPicker.length) return fromPicker;
  }

  return spot.demo_products.slice(0, limit);
}

export function formatPrice(amount: number, currency: string): string {
  if (!(amount > 0)) return '';
  const formatted = Number.isInteger(amount)
    ? String(amount)
    : amount.toFixed(2).replace(/\.00$/, '');
  return currency ? `${formatted} ${currency}` : formatted;
}

export function ensureConfig(config: unknown): Record<string, unknown> {
  return config && typeof config === 'object'
    ? (config as Record<string, unknown>)
    : {};
}

/** Stable cache fingerprint for a spot's product selection. */
export function spotProductsCacheKey(spot: Hotspot): string {
  const chosen = pickerIds(spot.chosen_products).join(',');
  const cats = unwrapEntries(spot.category)
    .map((e) => extractEntityId(e))
    .filter(Boolean)
    .join(',');
  const chosenCount = unwrapEntries(spot.chosen_products).length;
  return [
    spot.spot_id,
    spot.products_source || 'none',
    spot.products_limit,
    cats,
    chosen,
    chosenCount,
  ].join('|');
}
