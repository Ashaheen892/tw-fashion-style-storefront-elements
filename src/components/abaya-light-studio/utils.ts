import {
  extractImageUrl,
  extractLink,
  getRadioValue,
  getUnitValue,
  isTruthy,
  normalizeCollection,
  toNumber,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import type { AspectRatio, LightMetric, LightMode, ZoomLevel } from './types.js';

const ZOOM_LEVELS: ZoomLevel[] = [1.5, 2, 2.5, 3];

export function parseAspectRatio(raw: unknown): AspectRatio {
  const val = getRadioValue(raw, '3/4').replace(/\s/g, '');
  if (val === '1/1' || val === '4/5' || val === '16/9' || val === '3/4') return val;
  return '3/4';
}

export function parseZoomLevel(raw: unknown): ZoomLevel {
  const n = toNumber(getRadioValue(raw, '2') || raw, 2);
  return (ZOOM_LEVELS.includes(n as ZoomLevel) ? n : 2) as ZoomLevel;
}

function clampPct(n: number): number {
  return Math.max(0, Math.min(100, n));
}

/** Collection order = display order. No merchant mode IDs. */
export function parseLightModes(raw: unknown): LightMode[] {
  return normalizeCollection(raw)
    .map((item, index) => {
      const image =
        extractImageUrl(item.image) || String(item.image || '').trim();
      const thumb =
        extractImageUrl(item.thumb) ||
        extractImageUrl(item.thumbnail) ||
        image;
      const name = localizedString(item.name as string).trim();
      return {
        index,
        name: name || `Mode ${index + 1}`,
        desc: localizedString(item.desc as string).trim(),
        image,
        thumb,
        alt:
          localizedString(item.alt as string).trim() ||
          name ||
          `Lighting mode ${index + 1}`,
        is_default: isTruthy(item.is_default, false),
        shine: clampPct(getUnitValue(item.shine, 50)),
        embroidery: clampPct(getUnitValue(item.embroidery, 50)),
        color_depth: clampPct(getUnitValue(item.color_depth, 50)),
        flow: clampPct(getUnitValue(item.flow, 50)),
        transparency: clampPct(getUnitValue(item.transparency, 20)),
        day_fit: clampPct(getUnitValue(item.day_fit, 50)),
        night_fit: clampPct(getUnitValue(item.night_fit, 50)),
        color_name: localizedString(item.color_name as string).trim(),
        notes: localizedString(item.notes as string).trim(),
        product_url: extractLink(item.product_url),
        btn_text: localizedString(item.btn_text as string).trim(),
      };
    })
    .filter((m) => Boolean(m.image));
}

export function resolveDefaultIndex(modes: LightMode[]): number {
  if (!modes.length) return 0;
  const flagged = modes.find((m) => m.is_default);
  return flagged ? flagged.index : modes[0].index;
}

export function metricsForMode(mode: LightMode): LightMetric[] {
  return [
    { key: 'shine', labelAr: 'اللمعان', labelEn: 'Shine', value: mode.shine },
    {
      key: 'embroidery',
      labelAr: 'وضوح التطريز',
      labelEn: 'Embroidery clarity',
      value: mode.embroidery,
    },
    {
      key: 'color_depth',
      labelAr: 'عمق اللون',
      labelEn: 'Color depth',
      value: mode.color_depth,
    },
    { key: 'flow', labelAr: 'الانسيابية', labelEn: 'Flow', value: mode.flow },
    {
      key: 'transparency',
      labelAr: 'الشفافية',
      labelEn: 'Transparency',
      value: mode.transparency,
    },
    {
      key: 'day_fit',
      labelAr: 'ملاءمة النهار',
      labelEn: 'Day suitability',
      value: mode.day_fit,
    },
    {
      key: 'night_fit',
      labelAr: 'ملاءمة المساء',
      labelEn: 'Evening suitability',
      value: mode.night_fit,
    },
  ];
}

export function levelLabel(value: number): { ar: string; en: string } {
  if (value < 34) return { ar: 'منخفض', en: 'Low' };
  if (value < 67) return { ar: 'متوسط', en: 'Medium' };
  return { ar: 'مرتفع', en: 'High' };
}

export async function loadImageDecoded(src: string): Promise<boolean> {
  if (!src) return false;
  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => {
      if (typeof img.decode === 'function') {
        img
          .decode()
          .then(() => resolve(true))
          .catch(() => resolve(true));
      } else {
        resolve(true);
      }
    };
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

export function clampPan(
  value: number,
  scale: number,
  containerSize: number,
  imageSize: number
): number {
  if (scale <= 1) return 0;
  const max = ((imageSize * scale) - containerSize) / 2;
  return Math.max(-max, Math.min(max, value));
}

export function nextModeIndex(
  modes: LightMode[],
  currentIndex: number,
  delta: number
): number {
  if (modes.length < 2) return currentIndex;
  const positions = modes.map((m) => m.index);
  const at = positions.indexOf(currentIndex);
  const next = (at + delta + positions.length) % positions.length;
  return positions[next];
}
