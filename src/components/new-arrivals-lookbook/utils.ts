import {
  clamp,
  extractLink,
  getUnitValue,
  normalizeCollection,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import type { LookbookItem } from './types.js';

export function parseLookbookItems(raw: unknown): LookbookItem[] {
  return normalizeCollection(raw)
    .map((item, index) => {
      const image = String(item.image || item.poster || '').trim();
      const label = localizedString(item.label as never) || localizedString(item.title as never);
      const url = extractLink(item.link) || extractLink(item.url) || String(item.link || '').trim();
      if (!image) return null;
      return {
        id: String(item.id || `nal-${index}`),
        image,
        label,
        url,
        spotX: clamp(getUnitValue(item.spot_x, 50), 5, 95),
        spotY: clamp(getUnitValue(item.spot_y, 50), 5, 95),
      } satisfies LookbookItem;
    })
    .filter((v): v is LookbookItem => Boolean(v));
}
