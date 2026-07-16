import {
  extractLink,
  extractMoneyAmount,
  extractImageUrl,
  extractSallaProduct,
  isTruthy,
  normalizeCollection,
  toNumber,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import {
  extractEntityId,
  unwrapPickerEntries,
} from '../../utils/productPicker.js';
import { fetchSelectedProductsMap } from '../../utils/sallaApi.js';
import type {
  CompareAttribute,
  CompareCriterion,
  CompareProduct,
  CompareRow,
} from './types.js';

function unwrapProductList(raw: unknown): unknown[] {
  return unwrapPickerEntries(raw);
}

function extractProductId(entry: unknown): string {
  return extractEntityId(entry);
}

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

function extractProductRef(raw: unknown): {
  id: string;
  label: string;
  hydrated: Record<string, unknown> | null;
} | null {
  for (const entry of unwrapProductList(raw)) {
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
          id: id || String(hydrated?.id ?? '').trim(),
          label,
          hydrated,
        };
      }
    }
  }
  const snap = extractSallaProduct(raw);
  if (snap?.id) {
    return {
      id: snap.id,
      label: snap.name,
      hydrated:
        raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : null,
    };
  }
  return null;
}

function criterionKeyFromLabel(label: string, index: number): string {
  const normalized = label.trim().toLowerCase().replace(/\s+/g, '-');
  return normalized || `criterion-${index + 1}`;
}

export function parseAttributes(raw: unknown): CompareAttribute[] {
  return normalizeCollection(raw)
    .map((item, index) => {
      const label = localizedString(item.label as string).trim();
      const value = localizedString(item.value as string).trim();
      const key =
        localizedString(item.key as string).trim() ||
        criterionKeyFromLabel(label, index);
      return { key, label: label || key, value };
    })
    .filter((a) => a.label && a.value);
}

interface ProductDraft {
  id: string;
  product_id: string;
  product_label: string;
  hydrated: Record<string, unknown> | null;
  name: string;
  image: string;
  price: number;
  old_price: number;
  url: string;
  btn_text: string;
  attributes: CompareAttribute[];
}

function parseDrafts(raw: unknown): ProductDraft[] {
  return normalizeCollection(raw)
    .map((item, index) => {
      const ref = extractProductRef(
        item.product ?? item.products ?? item.selected_product
      );
      const product_id = ref?.id || '';
      return {
        id: product_id ? `product-${product_id}` : `item-${index}`,
        product_id,
        product_label: ref?.label || '',
        hydrated: ref?.hydrated || null,
        name: localizedString(item.name as string),
        image: extractImageUrl(item.image),
        price: toNumber(item.price, 0),
        old_price: toNumber(item.old_price, 0),
        url: extractLink(item.url),
        btn_text: localizedString(item.btn_text as string),
        attributes: parseAttributes(item.attributes),
      };
    })
    .filter((d) => d.product_id || d.name || d.image || d.hydrated || d.attributes.length);
}

function draftLooksComplete(draft: ProductDraft): boolean {
  if (draft.hydrated) return true;
  return Boolean(draft.name && (draft.image || draft.url || draft.price > 0));
}

function mergeProduct(draft: ProductDraft, apiRaw?: unknown | null): CompareProduct {
  const snap = apiRaw ? extractSallaProduct(apiRaw) : null;
  const api =
    apiRaw && typeof apiRaw === 'object'
      ? (apiRaw as Record<string, unknown>)
      : null;

  const name =
    draft.name ||
    snap?.name ||
    (api ? localizedString(api.name as string) : '') ||
    draft.product_label;
  const image =
    draft.image ||
    snap?.image ||
    (api
      ? extractImageUrl(api.image) ||
        extractImageUrl(api.thumbnail) ||
        extractImageUrl(api.main_image)
      : '');
  const url =
    draft.url || snap?.url || (api ? extractLink(api.url || api.permalink) : '');

  let price = draft.price > 0 ? draft.price : snap?.price || 0;
  let old_price = draft.old_price > 0 ? draft.old_price : snap?.old_price || 0;

  if (!(draft.price > 0) && api) {
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
    product_id: draft.product_id || snap?.id || '',
    name,
    image,
    price,
    old_price,
    url,
    btn_text: draft.btn_text,
    attributes: draft.attributes,
  };
}

function draftToProduct(draft: ProductDraft, apiRaw?: unknown | null): CompareProduct {
  if (apiRaw) return mergeProduct(draft, apiRaw);
  if (draft.hydrated) return mergeProduct(draft, draft.hydrated);
  return mergeProduct(draft);
}

/** Instant list from picker/hydration — no network. */
export function peekCompareProducts(raw: unknown): CompareProduct[] {
  return parseDrafts(raw)
    .map((draft) => draftToProduct(draft))
    .filter((p) => p.name || p.image || p.product_id || p.attributes.length);
}

async function fetchSelectedBatch(ids: string[]): Promise<Map<string, unknown>> {
  return fetchSelectedProductsMap(ids);
}

/** Resolve merchant-selected products (batch fetch only when needed). */
export async function resolveCompareProducts(raw: unknown): Promise<CompareProduct[]> {
  const drafts = parseDrafts(raw);
  const needIds = drafts
    .filter((d) => d.product_id && !draftLooksComplete(d))
    .map((d) => d.product_id);

  const detailsMap = needIds.length
    ? await fetchSelectedBatch(needIds)
    : new Map<string, unknown>();

  return drafts
    .map((draft) => {
      if (draft.product_id && detailsMap.has(draft.product_id)) {
        return draftToProduct(draft, detailsMap.get(draft.product_id));
      }
      return draftToProduct(draft);
    })
    .filter((p) => p.name || p.image || p.product_id || p.attributes.length);
}

export function parseCriteria(
  raw: unknown,
  products: CompareProduct[] = []
): CompareCriterion[] {
  const fromConfig = normalizeCollection(raw)
    .map((item, index) => {
      const label = localizedString(item.label as string).trim();
      const key =
        localizedString(item.key as string).trim() ||
        criterionKeyFromLabel(label, index);
      return { key, label: label || key };
    })
    .filter((c) => c.label);

  if (fromConfig.length) return fromConfig;

  // Derive row order from merchant attributes on products
  const seen = new Set<string>();
  const fromProducts: CompareCriterion[] = [];
  for (const product of products) {
    for (const attr of product.attributes) {
      const mark = attr.key || attr.label;
      if (!mark || seen.has(mark)) continue;
      seen.add(mark);
      fromProducts.push({ key: attr.key, label: attr.label });
    }
  }
  return fromProducts;
}

export function getAttributeValue(
  product: CompareProduct,
  criterion: CompareCriterion
): string {
  const byKey = product.attributes.find((a) => a.key === criterion.key);
  if (byKey?.value) return byKey.value;

  const labelNorm = criterion.label.trim().toLowerCase();
  const byLabel = product.attributes.find(
    (a) => a.label.trim().toLowerCase() === labelNorm
  );
  return byLabel?.value || '';
}

export function getDiscountPercent(price: number, oldPrice: number): number {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

export function buildCompareRows(criteria: CompareCriterion[]): CompareRow[] {
  return [
    {
      key: 'price',
      labelAr: 'السعر',
      labelEn: 'Price',
      kind: 'price',
      isPrice: true,
    },
    {
      key: 'discount',
      labelAr: 'الخصم',
      labelEn: 'Discount',
      kind: 'discount',
      isDiscount: true,
    },
    ...criteria.map((c) => ({
      key: `attr:${c.key}`,
      labelAr: c.label,
      labelEn: c.label,
      kind: 'attr' as const,
      criterionKey: c.key,
      highlightIdentical: true,
    })),
  ];
}

export function rowHighlights(
  row: CompareRow,
  selected: CompareProduct[],
  criteria: CompareCriterion[]
): { identical: Set<string>; bestPriceId: string | null; bestDiscountId: string | null } {
  const identical = new Set<string>();
  let bestPriceId: string | null = null;
  let bestDiscountId: string | null = null;

  if (row.highlightIdentical && row.criterionKey && selected.length > 1) {
    const criterion = criteria.find((c) => c.key === row.criterionKey);
    if (criterion) {
      const values = selected
        .map((p) => getAttributeValue(p, criterion).trim().toLowerCase())
        .filter(Boolean);
      if (values.length === selected.length && values.every((v) => v === values[0])) {
        selected.forEach((p) => identical.add(p.id));
      }
    }
  }

  if (row.isPrice) {
    const priced = selected.filter((p) => p.price > 0);
    if (priced.length) {
      const min = Math.min(...priced.map((p) => p.price));
      const winners = priced.filter((p) => p.price === min);
      if (winners.length === 1) bestPriceId = winners[0].id;
    }
  }

  if (row.isDiscount) {
    const discounted = selected
      .map((p) => ({
        id: p.id,
        pct: getDiscountPercent(p.price, p.old_price),
      }))
      .filter((d) => d.pct > 0);
    if (discounted.length) {
      const max = Math.max(...discounted.map((d) => d.pct));
      const winners = discounted.filter((d) => d.pct === max);
      if (winners.length === 1) bestDiscountId = winners[0].id;
    }
  }

  return { identical, bestPriceId, bestDiscountId };
}
