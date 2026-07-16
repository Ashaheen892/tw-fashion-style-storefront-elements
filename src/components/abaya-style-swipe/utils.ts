import {
  extractLink,
  normalizeCollection,
  parseTags,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import type { SwipeCard, SwipeResult } from './types.js';

export function parseCards(raw: unknown): SwipeCard[] {
  return normalizeCollection<Record<string, unknown>>(raw)
    .map((item, index) => ({
      id: `card-${index}`,
      image: localizedString(item.image as string),
      look_name: localizedString(item.look_name as string),
      look_desc: localizedString(item.look_desc as string),
      tags: parseTags(item.tags),
      url: extractLink(item.url),
      btn_text: localizedString(item.btn_text as string),
    }))
    .filter((c: SwipeCard) => c.look_name.trim() !== '' || c.image.trim() !== '');
}

export function parseResults(raw: unknown): SwipeResult[] {
  return normalizeCollection<Record<string, unknown>>(raw)
    .map((item) => ({
      tag_name: localizedString(item.tag_name as string).toLowerCase(),
      result_title: localizedString(item.result_title as string),
      result_desc: localizedString(item.result_desc as string),
      result_image: localizedString(item.result_image as string),
      result_url: extractLink(item.result_url),
      result_btn: localizedString(item.result_btn as string),
    }))
    .filter((r: SwipeResult) => r.tag_name.trim() !== '');
}

export function computeWinningTag(
  likedCards: SwipeCard[]
): { tag: string; count: number } | null {
  const counts = new Map<string, number>();
  const firstSeen = new Map<string, number>();

  likedCards.forEach((card, cardIndex) => {
    card.tags.forEach((tag: string) => {
      const key = tag.toLowerCase();
      counts.set(key, (counts.get(key) ?? 0) + 1);
      if (!firstSeen.has(key)) firstSeen.set(key, cardIndex);
    });
  });

  let best: { tag: string; count: number; order: number } | null = null;

  for (const [tag, count] of counts) {
    const order = firstSeen.get(tag) ?? 0;
    if (
      !best ||
      count > best.count ||
      (count === best.count && order < best.order)
    ) {
      best = { tag, count, order };
    }
  }

  return best ? { tag: best.tag, count: best.count } : null;
}

export function findMatchingResult(
  results: SwipeResult[],
  tag: string
): SwipeResult | null {
  const key = tag.toLowerCase();
  return results.find((r) => r.tag_name === key) ?? null;
}

export function getStorageKey(configKey: unknown, fallback: string): string {
  const key = localizedString(configKey as string, fallback);
  return key.trim() || fallback;
}
