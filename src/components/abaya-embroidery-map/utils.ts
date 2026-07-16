import {
  clamp,
  extractImageUrl,
  extractLink,
  getRadioValue,
  getUnitValue,
  isTruthy,
  normalizeCollection,
  toNumber,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import type {
  AspectRatio,
  CardSide,
  CraftMethod,
  EmbroideryDetail,
  LineGeom,
} from './types.js';

export function clampPct(value: unknown, fallback = 50): number {
  const n = toNumber(value, Number.NaN);
  if (!Number.isFinite(n)) return fallback;
  return clamp(n, 0, 100);
}

export function parseCardSide(raw: unknown): CardSide {
  const val = getRadioValue(raw, 'auto').toLowerCase();
  if (val === 'right' || val === 'left' || val === 'auto') return val;
  return 'auto';
}

export function parseAspectRatio(raw: unknown): AspectRatio {
  const val = getRadioValue(raw, '3/4').replace(/\s/g, '').replace(':', '/');
  if (val === '2/3' || val === '4/5' || val === '1/1' || val === '3/4') return val;
  return '3/4';
}

export function parseCraftMethod(raw: unknown): CraftMethod {
  const val = getRadioValue(raw, '').toLowerCase();
  if (val === 'hand' || val === 'machine' || val === 'both') return val;
  return '';
}

export function resolveMethodText(method: CraftMethod): { ar: string; en: string } {
  if (method === 'hand') return { ar: 'يدوي', en: 'Hand' };
  if (method === 'machine') return { ar: 'آلي', en: 'Machine' };
  if (method === 'both') return { ar: 'يدوي وآلي', en: 'Hand & machine' };
  return { ar: '', en: '' };
}

/** Collection order = display order. No merchant detail IDs. */
export function parseDetails(raw: unknown): EmbroideryDetail[] {
  return normalizeCollection(raw)
    .map((item, index) => {
      const name = localizedString(item.name as string).trim();
      const order = getUnitValue(item.sort_order, index + 1);
      return {
        index,
        sort: order,
        name: name || `Detail ${index + 1}`,
        desc: localizedString(item.desc as string).trim(),
        image: extractImageUrl(item.image) || String(item.image || '').trim(),
        alt:
          localizedString(item.alt as string).trim() ||
          name ||
          `Embroidery detail ${index + 1}`,
        pos_x: clampPct(item.pos_x ?? item.x, 50),
        pos_y: clampPct(item.pos_y ?? item.y, 50),
        card_side: parseCardSide(item.card_side),
        stitch_type: localizedString(item.stitch_type as string).trim(),
        thread: localizedString(item.thread as string).trim(),
        method: parseCraftMethod(item.method),
        duration: localizedString(item.duration as string).trim(),
        extra: localizedString(item.extra as string).trim(),
        product_url: extractLink(item.product_url),
        btn_text: localizedString(item.btn_text as string).trim(),
        show_number: isTruthy(item.show_number, true),
        spot_color: String(item.spot_color || '').trim(),
        is_featured: isTruthy(item.is_featured, false),
        badge: localizedString(item.badge as string).trim(),
      };
    })
    .sort((a, b) => a.sort - b.sort || a.index - b.index)
    .map((item, index) => ({
      index,
      name: item.name,
      desc: item.desc,
      image: item.image,
      alt: item.alt,
      pos_x: item.pos_x,
      pos_y: item.pos_y,
      card_side: item.card_side,
      stitch_type: item.stitch_type,
      thread: item.thread,
      method: item.method,
      duration: item.duration,
      extra: item.extra,
      product_url: item.product_url,
      btn_text: item.btn_text,
      show_number: item.show_number,
      spot_color: item.spot_color,
      is_featured: item.is_featured,
      badge: item.badge,
    }));
}

export function resolveSide(detail: EmbroideryDetail): 'left' | 'right' {
  if (detail.card_side === 'left' || detail.card_side === 'right') {
    return detail.card_side;
  }
  return detail.pos_x >= 50 ? 'right' : 'left';
}

export function splitBySide(details: EmbroideryDetail[]): {
  left: EmbroideryDetail[];
  right: EmbroideryDetail[];
} {
  const left: EmbroideryDetail[] = [];
  const right: EmbroideryDetail[] = [];
  for (const d of details) {
    if (resolveSide(d) === 'left') left.push(d);
    else right.push(d);
  }
  left.sort((a, b) => a.pos_y - b.pos_y || a.index - b.index);
  right.sort((a, b) => a.pos_y - b.pos_y || a.index - b.index);
  return { left, right };
}

/** First two featured details (by collection order) get elevated styling. */
export function featuredVisualSet(details: EmbroideryDetail[]): Set<number> {
  const set = new Set<number>();
  for (const d of details) {
    if (!d.is_featured) continue;
    set.add(d.index);
    if (set.size >= 2) break;
  }
  return set;
}

export function buildLinePath(
  spot: DOMRect,
  card: DOMRect,
  root: DOMRect,
  side: 'left' | 'right'
): string {
  const sx = spot.left + spot.width / 2 - root.left;
  const sy = spot.top + spot.height / 2 - root.top;
  const cardMidY = card.top + card.height / 2 - root.top;
  const stub = 14;

  let edgeX: number;
  let elbowX: number;

  if (side === 'right') {
    edgeX = card.left - root.left;
    elbowX = edgeX - stub;
  } else {
    edgeX = card.right - root.left;
    elbowX = edgeX + stub;
  }

  const midX = (sx + elbowX) / 2;
  return `M ${sx.toFixed(1)} ${sy.toFixed(1)} L ${midX.toFixed(1)} ${sy.toFixed(1)} L ${elbowX.toFixed(1)} ${sy.toFixed(1)} L ${elbowX.toFixed(1)} ${cardMidY.toFixed(1)} L ${edgeX.toFixed(1)} ${cardMidY.toFixed(1)}`;
}

export function computeLines(
  details: EmbroideryDetail[],
  rootEl: HTMLElement,
  getSpot: (index: number) => HTMLElement | null | undefined,
  getCard: (index: number) => HTMLElement | null | undefined
): LineGeom[] {
  const root = rootEl.getBoundingClientRect();
  if (!root.width || !root.height) return [];

  const lines: LineGeom[] = [];
  for (const d of details) {
    try {
      const spotEl = getSpot(d.index);
      const cardEl = getCard(d.index);
      if (!spotEl || !cardEl) continue;
      const spot = spotEl.getBoundingClientRect();
      const card = cardEl.getBoundingClientRect();
      if (!spot.width || !card.width) continue;
      const side = resolveSide(d);
      lines.push({
        index: d.index,
        d: buildLinePath(spot, card, root, side),
      });
    } catch {
      /* keep spot/card even if one line fails */
    }
  }
  return lines;
}

export function shadowForLevel(level: number): string {
  const shadows = [
    'none',
    '0 10px 28px rgba(43, 33, 28, 0.08)',
    '0 16px 40px rgba(43, 33, 28, 0.12)',
    '0 22px 56px rgba(43, 33, 28, 0.18)',
  ];
  return shadows[clamp(level, 0, 3)] || shadows[1];
}
