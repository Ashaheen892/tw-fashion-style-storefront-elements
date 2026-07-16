import {
  clamp,
  normalizeCollection,
  toNumber,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import type { EchoReview } from './types.js';

export function parseReviews(raw: unknown): EchoReview[] {
  return normalizeCollection(raw)
    .map((item, index) => ({
      id: localizedString(item.id as string) || `echo-${index + 1}`,
      name: localizedString(item.name as string),
      role: localizedString(item.role as string),
      avatar: String(item.avatar || '').trim(),
      rating: clamp(toNumber(item.rating, 5), 1, 5),
      quote: localizedString(item.quote as string),
      product_note: localizedString(item.product_note as string),
    }))
    .filter((r) => r.name || r.quote);
}

export function averageRating(reviews: EchoReview[]): number {
  if (!reviews.length) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}
