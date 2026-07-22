import { extractLink, extractImageUrl, normalizeCollection, toNumber } from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import type {
  CompareAttribute,
  CompareCriterion,
  CompareProduct,
  CompareRow,
} from './types.js';

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

/** Instant list from picker/hydration — no network. */
export function peekCompareProducts(raw: unknown): CompareProduct[] {
  return normalizeCollection(raw)
    .map((item, index) => ({
      id:
        localizedString(item.id as string).trim() ||
        localizedString(item.name as string).trim() ||
        `item-${index}`,
      name: localizedString(item.name as string).trim(),
      image: extractImageUrl(item.image),
      price: toNumber(item.price, 0),
      old_price: toNumber(item.old_price, 0),
      url: extractLink(item.url),
      btn_text: localizedString(item.btn_text as string).trim(),
      attributes: parseAttributes(item.attributes),
    }))
    .filter((item) => item.name || item.image || item.url || item.attributes.length);
}

export async function resolveCompareProducts(raw: unknown): Promise<CompareProduct[]> {
  return peekCompareProducts(raw);
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
