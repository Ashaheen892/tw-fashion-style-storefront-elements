import {
  extractImageUrl,
  isTruthy,
  normalizeCollection,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import type { CareStep, FabricCare } from './types.js';

/** Field labels that must never appear as care-step content. */
const JUNK_STEP_VALUES = [
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
  return JUNK_STEP_VALUES.some((junk) => normalized === junk.toLowerCase());
}

function cleanCareText(raw: unknown): string {
  const text = localizedString(raw as string).trim();
  if (!text) return '';

  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !isJunkLine(line));

  let cleaned = lines.join('\n').trim();
  if (!cleaned) return '';

  for (const junk of JUNK_STEP_VALUES) {
    const pattern = new RegExp(`(?:^|[\\s،,])${junk.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[:：]?`, 'gi');
    cleaned = cleaned.replace(pattern, ' ').replace(/\s{2,}/g, ' ').trim();
  }

  return isJunkLine(cleaned) ? '' : cleaned;
}

export function parseFabrics(raw: unknown): FabricCare[] {
  return normalizeCollection<Record<string, unknown>>(raw)
    .map((item) => ({
      fabric_name: localizedString(item.fabric_name as string),
      fabric_image: extractImageUrl(item.fabric_image),
      fabric_summary: localizedString(item.fabric_summary as string),
      pre_wash: cleanCareText(item.pre_wash),
      wash: cleanCareText(item.wash),
      dry: cleanCareText(item.dry),
      iron: cleanCareText(item.iron),
      store: cleanCareText(item.store),
      stain: cleanCareText(item.stain),
      embroidery_warn: cleanCareText(item.embroidery_warn),
      wash_temp: cleanCareText(item.wash_temp),
      allow_washer: isTruthy(item.allow_washer),
      allow_dryer: isTruthy(item.allow_dryer),
      allow_steam: isTruthy(item.allow_steam),
    }))
    .filter((f: FabricCare) => f.fabric_name.trim() !== '');
}

export function buildCareSteps(fabric: FabricCare): CareStep[] {
  const steps: CareStep[] = [
    { key: 'pre_wash', labelAr: 'قبل الغسيل', labelEn: 'Pre-wash', value: fabric.pre_wash },
    { key: 'wash', labelAr: 'الغسيل', labelEn: 'Wash', value: fabric.wash },
    { key: 'dry', labelAr: 'التجفيف', labelEn: 'Dry', value: fabric.dry },
    { key: 'iron', labelAr: 'الكي', labelEn: 'Iron', value: fabric.iron },
    { key: 'store', labelAr: 'التخزين', labelEn: 'Storage', value: fabric.store },
  ];
  return steps.filter((s) => s.value.trim() !== '');
}

export function buildCareText(fabric: FabricCare, localeEn: boolean): string {
  const lines: string[] = [fabric.fabric_name];
  if (fabric.fabric_summary) lines.push(fabric.fabric_summary);

  for (const step of buildCareSteps(fabric)) {
    lines.push(`${localeEn ? step.labelEn : step.labelAr}: ${step.value}`);
  }

  if (fabric.stain) {
    lines.push(`${localeEn ? 'Stain removal' : 'إزالة البقع'}: ${fabric.stain}`);
  }
  if (fabric.embroidery_warn) {
    lines.push(
      `${localeEn ? 'Embroidery note' : 'تنبيه التطريز'}: ${fabric.embroidery_warn}`
    );
  }
  if (fabric.wash_temp) {
    lines.push(
      `${localeEn ? 'Wash temperature' : 'حرارة الغسيل'}: ${fabric.wash_temp}`
    );
  }

  return lines.join('\n');
}

export function filterFabrics(fabrics: FabricCare[], query: string): FabricCare[] {
  const q = query.trim().toLowerCase();
  if (!q) return fabrics;
  return fabrics.filter(
    (f) =>
      f.fabric_name.toLowerCase().includes(q) ||
      f.fabric_summary.toLowerCase().includes(q)
  );
}
