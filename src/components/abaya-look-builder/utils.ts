import {
  extractLink,
  extractMoneyAmount,
  extractImageUrl,
  extractSallaProduct,
  getRadioValue,
  getUnitValue,
  groupByKey,
  isTruthy,
  normalizeCollection,
  sortByOrder,
  toNumber,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import {
  extractEntityId,
  extractPickerIds,
  unwrapPickerEntries,
} from '../../utils/productPicker.js';
import {
  fetchSallaProducts,
  fetchSelectedProductsMap,
  toSourceIds,
} from '../../utils/sallaApi.js';
import type { LookGroup, LookItem, LookItemDraft } from './types.js';

type ProductSource = 'categories' | 'sales' | 'latest' | 'selected' | '';

function looksLikeFullProduct(obj: Record<string, unknown>): boolean {
  const hasName = Boolean(localizedString(obj.name as string).trim());
  const hasImage = Boolean(
    extractImageUrl(obj.image) ||
      extractImageUrl(obj.thumbnail) ||
      extractImageUrl(obj.main_image)
  );
  const hasUrl = Boolean(extractLink(obj.url || obj.permalink));
  const hasPrice =
    extractMoneyAmount(obj.price) > 0 ||
    extractMoneyAmount(obj.sale_price) > 0 ||
    extractMoneyAmount(obj.regular_price) > 0;
  return hasName && (hasImage || hasUrl || hasPrice);
}

/** Unwrap product picker values the same way Saji does. */
export function unwrapProductList(raw: unknown): unknown[] {
  return unwrapPickerEntries(raw);
}

export function extractProductId(entry: unknown): string {
  return extractEntityId(entry);
}

export function extractProductRef(raw: unknown): {
  id: string;
  label: string;
  hydrated: unknown | null;
} | null {
  const list = unwrapProductList(raw);

  for (const entry of list) {
    if (entry == null) continue;

    if (typeof entry === 'number' || typeof entry === 'string') {
      const id = String(entry).trim();
      if (id) return { id, label: '', hydrated: null };
    }

    if (typeof entry === 'object') {
      const obj = entry as Record<string, unknown>;
      const id = extractProductId(obj);
      const label = localizedString((obj.label ?? obj.name) as string).trim();
      const hydrated = looksLikeFullProduct(obj) ? obj : null;

      if (id || hydrated) {
        return {
          id: id || String((hydrated as { id?: unknown })?.id ?? '').trim(),
          label,
          hydrated,
        };
      }
    }
  }

  const snap = extractSallaProduct(raw);
  if (snap?.id) {
    return { id: snap.id, label: snap.name, hydrated: raw };
  }
  return null;
}

function readProductField(item: Record<string, unknown>): unknown {
  return (
    item.product ??
    item.products ??
    item.selected_product ??
    item.chosen_products ??
    item['alb_items.product'] ??
    item['alb_tabs.products']
  );
}

/** Expand tab collection rows (multi-product) into look-item drafts. */
export function parseTabDrafts(raw: unknown): LookItemDraft[] {
  const rows = normalizeCollection(raw);
  const drafts: LookItemDraft[] = [];

  rows.forEach((row, tabIndex) => {
    const group_name =
      localizedString(row.group_name as string) ||
      localizedString(row.group_key as string) ||
      `تبويب ${tabIndex + 1}`;
    const group_key =
      localizedString(row.group_key as string) || group_name || `tab-${tabIndex}`;
    const group_order = toNumber(row.group_order, tabIndex + 1);
    const productsRaw =
      row.products ??
      row.product ??
      row.chosen_products ??
      row['alb_tabs.products'];
    const entries = unwrapProductList(productsRaw);

    if (!entries.length) return;

    entries.forEach((entry, productIndex) => {
      const ref = extractProductRef(entry);
      if (!ref?.id && !ref?.hydrated) return;
      const product_id = ref?.id || '';
      drafts.push({
        id: product_id
          ? `tab-${tabIndex}-product-${product_id}`
          : `tab-${tabIndex}-item-${productIndex}`,
        group_key,
        group_name,
        group_order,
        product_id,
        product_label: ref?.label || '',
        hydrated: ref?.hydrated || null,
        piece_name: '',
        image: '',
        price: 0,
        old_price: 0,
        url: '',
        is_default: productIndex === 0,
        color_note: '',
      });
    });
  });

  return drafts;
}

function readImage(raw: unknown): string {
  return (
    extractImageUrl(raw) ||
    (typeof raw === 'string' ? raw.trim() : localizedString(raw as string))
  );
}

export function parseLookItemDrafts(raw: unknown): LookItemDraft[] {
  return normalizeCollection(raw)
    .map((item, index) => {
      const ref = extractProductRef(readProductField(item));
      const product_id = ref?.id || '';
      const id = product_id ? `product-${product_id}` : `item-${index}`;

      return {
        id,
        group_key:
          localizedString(item.group_key as string) ||
          localizedString(item.group_name as string) ||
          'default',
        group_name:
          localizedString(item.group_name as string) ||
          localizedString(item.group_key as string) ||
          'default',
        group_order: toNumber(item.group_order, 0),
        product_id,
        product_label: ref?.label || '',
        hydrated: ref?.hydrated || null,
        piece_name: localizedString(item.piece_name as string),
        image: readImage(item.image),
        price: toNumber(item.price, 0),
        old_price: toNumber(item.old_price, 0),
        url: extractLink(item.url),
        is_default: isTruthy(item.is_default),
        color_note: localizedString(item.color_note as string),
      };
    })
    .filter((d) => d.product_id || d.piece_name || d.image || d.hydrated);
}

export function draftToLookItem(draft: LookItemDraft): LookItem {
  return {
    id: draft.id,
    group_key: draft.group_key,
    group_name: draft.group_name,
    group_order: draft.group_order,
    piece_name: draft.piece_name || draft.product_label,
    image: draft.image,
    price: draft.price,
    old_price: draft.old_price,
    url: draft.url,
    product_id: draft.product_id,
    is_default: draft.is_default,
    color_note: draft.color_note,
    rating: 0,
  };
}

export function mergeApiProduct(draft: LookItemDraft, apiRaw: unknown): LookItem {
  const snap = extractSallaProduct(apiRaw);
  const api = (apiRaw && typeof apiRaw === 'object'
    ? (apiRaw as Record<string, unknown>)
    : {}) as Record<string, unknown>;

  const name =
    draft.piece_name ||
    snap?.name ||
    localizedString(api.name as string) ||
    draft.product_label;
  const image =
    draft.image ||
    snap?.image ||
    extractImageUrl(api.image) ||
    extractImageUrl(api.thumbnail) ||
    extractImageUrl(api.main_image);
  const url =
    draft.url || snap?.url || extractLink(api.url || api.permalink || api.link);

  let price = draft.price > 0 ? draft.price : snap?.price || 0;
  let old_price = draft.old_price > 0 ? draft.old_price : snap?.old_price || 0;

  if (!(draft.price > 0)) {
    const onSale = isTruthy(api.is_on_sale) || isTruthy(api.on_sale);
    const sale = extractMoneyAmount(api.sale_price);
    const regular = extractMoneyAmount(api.regular_price);
    const base = extractMoneyAmount(api.price);
    if (onSale && sale > 0) {
      price = sale;
      old_price = regular > sale ? regular : 0;
    } else if (base > 0) {
      price = base;
      if (regular > base) old_price = regular;
    }
  }

  return {
    id: draft.id,
    group_key: draft.group_key,
    group_name: draft.group_name,
    group_order: draft.group_order,
    piece_name: name,
    image,
    price,
    old_price,
    url,
    product_id: draft.product_id || snap?.id || '',
    is_default: draft.is_default,
    color_note: draft.color_note,
    rating: snap?.rating || 0,
  };
}

async function fetchSelectedProducts(ids: string[]): Promise<Map<string, unknown>> {
  return fetchSelectedProductsMap(ids);
}

function normalizeProductSource(raw: unknown): ProductSource {
  const val = getRadioValue(raw, '').toLowerCase();
  if (!val || val === 'none') return '';
  if (['categories', 'sales', 'latest', 'selected'].includes(val)) {
    return val as ProductSource;
  }
  return '';
}

function apiToLookItem(
  apiRaw: unknown,
  group: { key: string; name: string; order: number },
  index: number
): LookItem | null {
  const snap = extractSallaProduct(apiRaw);
  if (!snap && (!apiRaw || typeof apiRaw !== 'object')) return null;

  const draft: LookItemDraft = {
    id: `product-${snap?.id || index}`,
    group_key: group.key,
    group_name: group.name,
    group_order: group.order,
    product_id: snap?.id || extractProductId(apiRaw),
    product_label: snap?.name || '',
    hydrated: null,
    piece_name: '',
    image: '',
    price: 0,
    old_price: 0,
    url: '',
    is_default: index === 0,
    color_note: '',
  };

  return mergeApiProduct(draft, apiRaw || snap);
}

/** Raed / Saji style: latest | sales | categories | selected */
async function fetchSourceProducts(
  config: Record<string, unknown>
): Promise<LookItem[]> {
  const source = normalizeProductSource(config.alb_products);
  if (!source) return [];

  const limit = Math.max(1, Math.min(40, getUnitValue(config.alb_products_limit, 12)));
  const importName =
    localizedString(config.alb_import_group_name as string) || 'المنتجات';
  const group = {
    key:
      localizedString(config.alb_import_group_key as string) || importName || 'products',
    name: importName,
    order: toNumber(config.alb_import_group_order, 0),
  };

  let list: unknown[] = [];

  if (source === 'latest') {
    list = await fetchSallaProducts({ source: 'latest', limit });
  } else if (source === 'sales') {
    // Saji slider: source=sales; SDK also accepts offers
    for (const params of [
      { source: 'sales', source_value: 'sales', limit },
      { source: 'sales', limit },
      { source: 'offers', limit },
    ] as Record<string, unknown>[]) {
      list = await fetchSallaProducts(params);
      if (list.length) break;
    }
  } else if (source === 'categories') {
    const catIds = toSourceIds(
      unwrapProductList(config.alb_category)
        .map((entry) => extractProductId(entry))
        .filter(Boolean)
    );
    // Skip empty categories — Salla alerts «حقل التصنيفات مطلوب»
    if (catIds.length) {
      list = await fetchSallaProducts({
        source: 'categories',
        source_value: catIds.length === 1 ? catIds[0] : catIds,
        limit,
      });
    }
  } else if (source === 'selected') {
    const entries = unwrapProductList(config.alb_chosen_products);
    const ids = extractPickerIds(config.alb_chosen_products).slice(0, limit);
    const hydratedById = new Map<string, unknown>();

    for (const entry of entries) {
      if (!entry || typeof entry !== 'object') continue;
      const obj = entry as Record<string, unknown>;
      if (!looksLikeFullProduct(obj)) continue;
      const id = extractProductId(obj);
      if (id) hydratedById.set(id, obj);
    }

    const missing = ids.filter((id) => !hydratedById.has(id));
    if (missing.length) {
      const map = await fetchSelectedProducts(missing);
      for (const [id, raw] of map) hydratedById.set(id, raw);
    }

    // Preserve merchant order; include hydrated-only entries without ids
    if (ids.length) {
      list = ids.map((id) => hydratedById.get(id)).filter(Boolean) as unknown[];
    } else {
      list = [...hydratedById.values()];
    }
  }

  return list
    .slice(0, limit)
    .map((item, index) => apiToLookItem(item, group, index))
    .filter(
      (item): item is LookItem =>
        !!item && Boolean(item.product_id) && Boolean(item.piece_name || item.image)
    );
}

function draftLooksComplete(draft: LookItemDraft): boolean {
  if (draft.hydrated) return true;
  return Boolean(
    (draft.piece_name || draft.product_label) &&
      (draft.image || draft.url || draft.price > 0)
  );
}

function draftToResolvedItem(draft: LookItemDraft, apiRaw?: unknown): LookItem {
  if (apiRaw) return mergeApiProduct(draft, apiRaw);
  if (draft.hydrated) return mergeApiProduct(draft, draft.hydrated);
  return draftToLookItem({
    ...draft,
    piece_name: draft.piece_name || draft.product_label,
  });
}

function isStoreProduct(item: LookItem): boolean {
  return Boolean(item.product_id);
}

function collectLookDrafts(config: Record<string, unknown>): LookItemDraft[] {
  const fromTabs = parseTabDrafts(config.alb_tabs);
  const fromItems = parseLookItemDrafts(config.alb_items);
  // Prefer tab collection; keep legacy alb_items as fallback
  return fromTabs.length ? fromTabs : fromItems;
}

/** Sync preview from picker/hydration — no network. */
export function peekLookItems(raw: unknown): LookItem[] {
  // Accept either a raw collection or a full config object
  const drafts =
    raw && typeof raw === 'object' && !Array.isArray(raw) && ('alb_tabs' in (raw as object) || 'alb_items' in (raw as object))
      ? collectLookDrafts(raw as Record<string, unknown>)
      : [...parseTabDrafts(raw), ...parseLookItemDrafts(raw)];

  return drafts
    .filter((d) => d.product_id)
    .map((draft) => draftToResolvedItem(draft))
    .filter(isStoreProduct);
}

export async function resolveLookItems(raw: unknown): Promise<LookItem[]> {
  const drafts = (
    raw && typeof raw === 'object' && !Array.isArray(raw) && ('alb_tabs' in (raw as object) || 'alb_items' in (raw as object))
      ? collectLookDrafts(raw as Record<string, unknown>)
      : [...parseTabDrafts(raw), ...parseLookItemDrafts(raw)]
  ).filter((d) => d.product_id);

  const ids = drafts
    .filter((d) => d.product_id && !draftLooksComplete(d))
    .map((d) => d.product_id);

  const detailsMap = ids.length ? await fetchSelectedProducts(ids) : new Map();

  return drafts
    .map((draft) => {
      if (draft.product_id && detailsMap.has(draft.product_id)) {
        return draftToResolvedItem(draft, detailsMap.get(draft.product_id));
      }
      return draftToResolvedItem(draft);
    })
    .filter(isStoreProduct);
}

/** Resolve tab/collection pieces + optional product source (in parallel). */
export async function resolveLookFromConfig(
  config: Record<string, unknown> | null | undefined
): Promise<LookItem[]> {
  const c = config && typeof config === 'object' ? config : {};
  const [fromItems, fromSource] = await Promise.all([
    resolveLookItems(c),
    fetchSourceProducts(c),
  ]);

  const source = fromSource.filter(isStoreProduct);
  const items = fromItems.filter(isStoreProduct);

  if (!source.length) return items;
  if (!items.length) return source;

  const seen = new Set(items.map((i) => i.product_id).filter(Boolean));
  const merged = [...items];
  for (const item of source) {
    if (seen.has(item.product_id)) continue;
    seen.add(item.product_id);
    merged.push(item);
  }
  return merged;
}

export function buildLookGroups(items: LookItem[]): LookGroup[] {
  const map = groupByKey(items, 'group_key');
  const groups: LookGroup[] = [];

  for (const [key, list] of map) {
    const sorted = sortByOrder(list, 'group_order');
    const first = sorted[0];
    groups.push({
      key,
      name: first.group_name || key,
      order: first.group_order,
      items: sorted,
    });
  }

  return groups.sort((a, b) => a.order - b.order);
}

export function defaultSelections(groups: LookGroup[]): Record<string, string> {
  const selections: Record<string, string> = {};
  for (const group of groups) {
    const def = group.items.find((i) => i.is_default) || group.items[0];
    if (def) selections[group.key] = def.id;
  }
  return selections;
}

export function buildLookSummary(
  groups: LookGroup[],
  selections: Record<string, string>,
  currency: string
): { lines: string[]; total: number; count: number; savings: number } {
  const lines: string[] = [];
  let total = 0;
  let savings = 0;
  let count = 0;

  for (const group of groups) {
    const selectedId = selections[group.key];
    const item = group.items.find((i) => i.id === selectedId);
    if (!item) continue;
    count += 1;
    total += item.price;
    if (item.old_price > item.price) savings += item.old_price - item.price;
    const note = item.color_note ? ` (${item.color_note})` : '';
    lines.push(`${group.name}: ${item.piece_name}${note}`);
    if (item.url) lines.push(`  ${item.url}`);
    if (item.price > 0) lines.push(`  ${item.price} ${currency}`);
  }

  return { lines, total, count, savings };
}
