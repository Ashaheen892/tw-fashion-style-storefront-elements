import { normalizeCollection } from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import type { MeasureStep, SizeRow } from './types.js';

export function parseSteps(raw: unknown): MeasureStep[] {
  return normalizeCollection(raw)
    .map((item, index) => ({
      id: localizedString(item.id as string) || `step-${index + 1}`,
      title: localizedString(item.title as string),
      desc: localizedString(item.desc as string),
      image: String(item.image || '').trim(),
      tip: localizedString(item.tip as string),
    }))
    .filter((s) => s.title || s.desc || s.image);
}

export function parseSizeRows(raw: unknown): SizeRow[] {
  return normalizeCollection(raw)
    .map((item, index) => ({
      id: localizedString(item.id as string) || `size-${index + 1}`,
      size_label: localizedString(item.size_label as string),
      bust: localizedString(item.bust as string),
      waist: localizedString(item.waist as string),
      hips: localizedString(item.hips as string),
      length: localizedString(item.length as string),
      note: localizedString(item.note as string),
    }))
    .filter((r) => r.size_label);
}
