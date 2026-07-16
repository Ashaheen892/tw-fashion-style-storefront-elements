import {
  clamp,
  extractLink,
  getUnitValue,
  isTruthy,
  normalizeCollection,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import type {
  CalculationResult,
  CutOption,
  LengthRange,
  NearbySuggestion,
  Preference,
  ShoeType,
} from './types.js';

export function parseRanges(raw: unknown): LengthRange[] {
  return normalizeCollection<Record<string, unknown>>(raw)
    .map((item) => ({
      min_height: getUnitValue(item.min_height),
      max_height: getUnitValue(item.max_height),
      flat_length: getUnitValue(item.flat_length),
      mid_heel_length: getUnitValue(item.mid_heel_length),
      high_heel_length: getUnitValue(item.high_heel_length),
      alt_size: localizedString(item.alt_size as string),
      note: localizedString(item.note as string),
      products_url: extractLink(item.products_url),
      range_label: localizedString(item.range_label as string),
    }))
    .filter(
      (r) =>
        r.min_height > 0 &&
        r.max_height >= r.min_height &&
        (r.flat_length > 0 || r.mid_heel_length > 0 || r.high_heel_length > 0)
    )
    .sort((a, b) => a.min_height - b.min_height);
}

export function parseCuts(raw: unknown): CutOption[] {
  return normalizeCollection<Record<string, unknown>>(raw)
    .map((item, index) => ({
      cut_id:
        localizedString(item.cut_id as string) ||
        localizedString(item.cut_name as string) ||
        `cut-${index}`,
      cut_name: localizedString(item.cut_name as string),
      cut_desc: localizedString(item.cut_desc as string),
      length_delta: getUnitValue(item.length_delta, 0),
      is_default: isTruthy(item.is_default),
    }))
    .filter((c) => c.cut_name.trim() !== '');
}

export function findRange(
  ranges: LengthRange[],
  height: number
): LengthRange | null {
  return (
    ranges.find((r) => height >= r.min_height && height <= r.max_height) ?? null
  );
}

export function getBaseLength(range: LengthRange, shoe: ShoeType): number {
  if (shoe === 'mid') return range.mid_heel_length || range.flat_length;
  if (shoe === 'high') {
    return range.high_heel_length || range.mid_heel_length || range.flat_length;
  }
  return range.flat_length;
}

export function computeConfidence(height: number, range: LengthRange): number {
  const span = range.max_height - range.min_height;
  if (span <= 0) return 100;
  const mid = (range.min_height + range.max_height) / 2;
  const distance = Math.abs(height - mid);
  const edgeRatio = clamp(distance / (span / 2), 0, 1);
  return Math.round((1 - edgeRatio) * 100);
}

export function findNearby(
  ranges: LengthRange[],
  current: LengthRange,
  shoe: ShoeType,
  preference: Preference,
  shorterOffset: number,
  longerOffset: number,
  cutDelta: number,
  scarfDelta: number
): NearbySuggestion[] {
  const index = ranges.findIndex(
    (r) =>
      r.min_height === current.min_height && r.max_height === current.max_height
  );
  if (index < 0) return [];

  const out: NearbySuggestion[] = [];
  const build = (range: LengthRange, relation: 'lower' | 'higher') => {
    const base = getBaseLength(range, shoe);
    let prefDelta = 0;
    if (preference === 'shorter') prefDelta = -shorterOffset;
    if (preference === 'longer') prefDelta = longerOffset;
    out.push({
      alt_size: range.alt_size,
      suggestedLength: clamp(base + prefDelta + cutDelta + scarfDelta, 0, 999),
      note: range.note,
      products_url: range.products_url,
      relation,
    });
  };

  if (index > 0) build(ranges[index - 1], 'lower');
  if (index < ranges.length - 1) build(ranges[index + 1], 'higher');
  return out;
}

export function calculateLength(params: {
  ranges: LengthRange[];
  height: number;
  shoe: ShoeType;
  preference: Preference;
  shorterOffset: number;
  longerOffset: number;
  cutDelta: number;
  scarfDelta: number;
  reasonParts: string[];
}): CalculationResult | null {
  const range = findRange(params.ranges, params.height);
  if (!range) return null;

  const baseLength = getBaseLength(range, params.shoe);
  let preferenceDelta = 0;
  if (params.preference === 'shorter') preferenceDelta = -params.shorterOffset;
  if (params.preference === 'longer') preferenceDelta = params.longerOffset;

  const suggestedLength = clamp(
    baseLength + preferenceDelta + params.cutDelta + params.scarfDelta,
    0,
    999
  );

  return {
    range,
    baseLength,
    suggestedLength,
    cutDelta: params.cutDelta,
    scarfDelta: params.scarfDelta,
    preferenceDelta,
    confidence: computeConfidence(params.height, range),
    reason: params.reasonParts.filter(Boolean).join(' · '),
    nearby: findNearby(
      params.ranges,
      range,
      params.shoe,
      params.preference,
      params.shorterOffset,
      params.longerOffset,
      params.cutDelta,
      params.scarfDelta
    ),
  };
}

/** Guide bounds follow actual size ranges only (do not stretch to input min/max). */
export function overallBounds(
  ranges: LengthRange[],
  fallbackMin: number,
  fallbackMax: number
) {
  if (!ranges.length) return { min: fallbackMin, max: fallbackMax };
  return {
    min: Math.min(...ranges.map((r) => r.min_height)),
    max: Math.max(...ranges.map((r) => r.max_height)),
  };
}

export function heightToPercent(height: number, min: number, max: number): number {
  if (max <= min) return 0;
  return clamp(((height - min) / (max - min)) * 100, 0, 100);
}

/** Inclusive range width as % of the guide track (handles adjacent sizes without gaps). */
export function rangeSegmentStyle(
  range: LengthRange,
  boundsMin: number,
  boundsMax: number
): { start: number; width: number } {
  const span = Math.max(boundsMax - boundsMin, 1);
  // Use next unit after max so adjacent ranges [150-158][159-168] meet cleanly
  const start = ((range.min_height - boundsMin) / span) * 100;
  const end = ((range.max_height + 1 - boundsMin) / span) * 100;
  const width = Math.max(end - start, 0.5);
  return {
    start: clamp(start, 0, 100),
    width: clamp(width, 0.5, 100 - clamp(start, 0, 100)),
  };
}
