import {
  extractLink,
  extractImageUrl,
  groupByKey,
  isTruthy,
  normalizeCollection,
  sortByOrder,
  toNumber,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import type { LookGroup, LookItem, LookItemDraft } from './types.js';

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
    const entries = normalizeCollection(
      row.items ?? row.pieces ?? row.products ?? row['alb_tabs.items']
    );

    if (!entries.length) return;

    entries.forEach((entry, productIndex) => {
      const pieceName = localizedString(entry.piece_name as string).trim();
      const image = readImage(entry.image);
      const url = extractLink(entry.url);
      const id =
        localizedString(entry.id as string).trim() ||
        pieceName ||
        `${group_key}-${productIndex + 1}`;
      if (!pieceName && !image && !url) return;
      drafts.push({
        id,
        group_key,
        group_name,
        group_order,
        piece_name: pieceName,
        image,
        price: toNumber(entry.price, 0),
        old_price: toNumber(entry.old_price, 0),
        url,
        is_default: productIndex === 0 || isTruthy(entry.is_default),
        color_note: localizedString(entry.color_note as string),
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
      const pieceName = localizedString(item.piece_name as string).trim();
      const image = readImage(item.image);
      const url = extractLink(item.url);
      const id =
        localizedString(item.id as string).trim() ||
        pieceName ||
        `item-${index}`;

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
        piece_name: pieceName,
        image,
        price: toNumber(item.price, 0),
        old_price: toNumber(item.old_price, 0),
        url,
        is_default: isTruthy(item.is_default),
        color_note: localizedString(item.color_note as string),
      };
    })
    .filter((d) => d.piece_name || d.image || d.url);
}

export function draftToLookItem(draft: LookItemDraft): LookItem {
  return {
    id: draft.id,
    group_key: draft.group_key,
    group_name: draft.group_name,
    group_order: draft.group_order,
    piece_name: draft.piece_name,
    image: draft.image,
    price: draft.price,
    old_price: draft.old_price,
    url: draft.url,
    is_default: draft.is_default,
    color_note: draft.color_note,
  };
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

  return drafts.map((draft) => draftToLookItem(draft));
}

export async function resolveLookItems(raw: unknown): Promise<LookItem[]> {
  return peekLookItems(raw);
}

export async function resolveLookFromConfig(
  config: Record<string, unknown> | null | undefined
): Promise<LookItem[]> {
  const c = config && typeof config === 'object' ? config : {};
  return resolveLookItems(c);
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
