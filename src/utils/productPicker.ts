/**
 * Shared Twilight / Saji / Raed product-picker helpers.
 * Matches how theme editors store selected products and how
 * `<salla-products-slider source source-value limit>` expects them.
 */

import { getRadioValue } from './helpers.js';
import { toSourceIds } from './sallaApi.js';

export type ProductSourceType =
  | 'categories'
  | 'sales'
  | 'latest'
  | 'selected'
  | '';

const SOURCE_VALUES = new Set([
  'none',
  'categories',
  'sales',
  'latest',
  'selected',
]);

/** Unwrap picker / dropdown payloads — never prefer empty `selected` over `value`. */
export function unwrapPickerEntries(raw: unknown): unknown[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  if (typeof raw === 'object') {
    const obj = raw as Record<string, unknown>;
    if (Array.isArray(obj.selected) && obj.selected.length) return obj.selected;
    if (Array.isArray(obj.value) && obj.value.length) return obj.value;
    if (Array.isArray(obj.data) && obj.data.length) return obj.data;
    if (Array.isArray(obj.items) && obj.items.length) return obj.items;
    if (Array.isArray(obj.products) && obj.products.length) return obj.products;
    if ('id' in obj || 'value' in obj || 'name' in obj || 'label' in obj) {
      return [obj];
    }
  }
  if (typeof raw === 'number' || typeof raw === 'string') return [raw];
  return [];
}

export function extractEntityId(entry: unknown): string {
  if (entry == null) return '';
  if (typeof entry === 'number' || typeof entry === 'string') {
    return String(entry).trim();
  }
  if (typeof entry !== 'object') return '';
  const obj = entry as Record<string, unknown>;
  const direct =
    obj.id ?? obj.value ?? obj.product_id ?? obj.category_id ?? obj.key;
  if (Array.isArray(direct)) return extractEntityId(direct[0]);
  if (direct != null && typeof direct !== 'object') return String(direct).trim();
  if (direct && typeof direct === 'object') return extractEntityId(direct);
  return '';
}

export function extractPickerIds(raw: unknown): string[] {
  const ids: string[] = [];
  const seen = new Set<string>();
  for (const entry of unwrapPickerEntries(raw)) {
    const id = extractEntityId(entry);
    if (!id || SOURCE_VALUES.has(id.toLowerCase()) || seen.has(id)) continue;
    seen.add(id);
    ids.push(id);
  }
  return ids;
}

export function normalizeProductSource(raw: unknown): ProductSourceType {
  const val = getRadioValue(raw, '').toLowerCase().trim();
  if (!val || val === 'none') return '';
  if (
    val === 'categories' ||
    val === 'sales' ||
    val === 'latest' ||
    val === 'selected'
  ) {
    return val;
  }
  return '';
}

export interface ProductsSliderAttrs {
  source: Exclude<ProductSourceType, ''>;
  /** Attribute value for `source-value` (JSON ids, category id, or "sales"). */
  sourceValue: string;
  limit: number;
}

/**
 * Build attrs for `<salla-products-slider>` the same way Raed / Saji / reference zip do.
 * Returns null when there is nothing meaningful to load.
 */
export function resolveProductsSliderAttrs(input: {
  source: unknown;
  chosen?: unknown;
  category?: unknown;
  limit?: number;
  fallbackSelectedWhenChosen?: boolean;
}): ProductsSliderAttrs | null {
  let source = normalizeProductSource(input.source);
  const chosenIds = extractPickerIds(input.chosen);
  const categoryIds = extractPickerIds(input.category);
  const limit = Math.max(1, Math.min(40, Number(input.limit) || 6));

  if (
    !source &&
    input.fallbackSelectedWhenChosen !== false &&
    chosenIds.length
  ) {
    source = 'selected';
  }
  if (!source && categoryIds.length) {
    source = 'categories';
  }
  if (!source) return null;

  if (source === 'selected') {
    if (!chosenIds.length) return null;
    return {
      source,
      sourceValue: JSON.stringify(toSourceIds(chosenIds)),
      limit: Math.min(limit, chosenIds.length) || limit,
    };
  }

  if (source === 'categories') {
    if (!categoryIds.length) return null;
    const ids = toSourceIds(categoryIds);
    return {
      source,
      // Saji uses a single category id string; multi → JSON array
      sourceValue: ids.length === 1 ? String(ids[0]) : JSON.stringify(ids),
      limit,
    };
  }

  if (source === 'sales') {
    return { source, sourceValue: 'sales', limit };
  }

  // latest
  return { source: 'latest', sourceValue: '[]', limit };
}
