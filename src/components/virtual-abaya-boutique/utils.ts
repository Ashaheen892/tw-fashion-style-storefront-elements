import {
  clamp,
  extractLink,
  getRadioValue,
  getUnitValue,
  normalizeCollection,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import type { CardDirection, Hotspot } from './types.js';

function normalizeCardDir(raw: unknown): CardDirection {
  const fromRadio = getRadioValue(raw, '').toLowerCase();
  const val = fromRadio || localizedString(raw as string).toLowerCase();
  if (['left', 'right', 'top', 'bottom'].includes(val)) {
    return val as CardDirection;
  }
  return '';
}

export function parseHotspots(raw: unknown): Hotspot[] {
  return normalizeCollection(raw)
    .map((item, index) => {
      const spotName = localizedString(item.spot_name as string);
      const spotId =
        localizedString(item.spot_id as string) ||
        spotName ||
        `zone-${index + 1}`;

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
      };
    })
    .filter((h) => h.spot_name.trim() !== '' || h.spot_image !== '');
}

export function ensureConfig(config: unknown): Record<string, unknown> {
  return config && typeof config === 'object'
    ? (config as Record<string, unknown>)
    : {};
}
