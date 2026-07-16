import {
  clamp,
  extractImageUrl,
  getUnitValue,
  isDirectMediaUrl,
  normalizeCollection,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import type { FabricLabItem } from './types.js';

/** Editor field labels that must never appear as fabric content. */
const JUNK_VALUES = [
  'رابط المنتجات',
  'نص الزر',
  'product link',
  'products link',
  'button text',
  'products url',
  'btn text',
];

function isJunkLine(line: string): boolean {
  const normalized = line.replace(/[:：]\s*$/, '').trim().toLowerCase();
  if (!normalized) return true;
  return JUNK_VALUES.some((junk) => normalized === junk.toLowerCase());
}

function cleanText(raw: unknown): string {
  const text = localizedString(raw as string).trim();
  if (!text) return '';

  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !isJunkLine(line));

  let cleaned = lines.join('\n').trim();
  if (!cleaned) return '';

  for (const junk of JUNK_VALUES) {
    const pattern = new RegExp(
      `(?:^|[\\s،,])${junk.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[:：]?`,
      'gi'
    );
    cleaned = cleaned.replace(pattern, ' ').replace(/\s{2,}/g, ' ').trim();
  }

  return isJunkLine(cleaned) ? '' : cleaned;
}

export function parseFabrics(raw: unknown): FabricLabItem[] {
  return normalizeCollection<Record<string, unknown>>(raw)
    .map((item, index) => ({
      id: `fabric-${index}`,
      fabric_name: cleanText(item.fabric_name),
      fabric_desc: cleanText(item.fabric_desc),
      macro_image: extractImageUrl(item.macro_image),
      video_url: localizedString(item.video_url as string).trim(),
      flow: clamp(getUnitValue(item.flow), 0, 100),
      thickness: clamp(getUnitValue(item.thickness), 0, 100),
      shine: clamp(getUnitValue(item.shine), 0, 100),
      summer: clamp(getUnitValue(item.summer), 0, 100),
      wrinkle: clamp(getUnitValue(item.wrinkle), 0, 100),
      transparency: clamp(getUnitValue(item.transparency), 0, 100),
      wash_care: cleanText(item.wash_care),
      iron_care: cleanText(item.iron_care),
      best_use: cleanText(item.best_use),
    }))
    .filter((f: FabricLabItem) => f.fabric_name.trim() !== '');
}

export function isPlayableVideo(url: string): boolean {
  return isDirectMediaUrl(url) && /\.(mp4|webm|ogg)(\?|$)/i.test(url);
}
