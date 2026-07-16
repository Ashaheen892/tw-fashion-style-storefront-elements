import {
  extractLink,
  getUnitValue,
  normalizeCollection,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import type { DuelChoice, DuelRound } from './types.js';

export function parseRounds(raw: unknown): DuelRound[] {
  return normalizeCollection<Record<string, unknown>>(raw)
    .map((item, index) => ({
      id: `round-${index}`,
      question: localizedString(item.question as string),
      img_a: localizedString(item.img_a as string),
      name_a: localizedString(item.name_a as string),
      url_a: extractLink(item.url_a),
      votes_a: getUnitValue(item.votes_a),
      votes_b: getUnitValue(item.votes_b),
      img_b: localizedString(item.img_b as string),
      name_b: localizedString(item.name_b as string),
      url_b: extractLink(item.url_b),
      result_desc: localizedString(item.result_desc as string),
      enable_next: item.enable_next !== false && item.enable_next !== 'false',
    }))
    .filter(
      (r: DuelRound) =>
        r.question.trim() !== '' &&
        (r.name_a.trim() !== '' || r.img_a.trim() !== '') &&
        (r.name_b.trim() !== '' || r.img_b.trim() !== '')
    );
}

export function computePercentages(
  round: DuelRound,
  choice: DuelChoice | null,
  useSeed: boolean
): { pctA: number; pctB: number; total: number } {
  let votesA = useSeed ? round.votes_a : 0;
  let votesB = useSeed ? round.votes_b : 0;

  if (choice === 'a') votesA += 1;
  if (choice === 'b') votesB += 1;

  const total = votesA + votesB;
  if (total === 0) return { pctA: 50, pctB: 50, total: 0 };

  return {
    pctA: Math.round((votesA / total) * 100),
    pctB: Math.round((votesB / total) * 100),
    total,
  };
}

export function getStorageKey(configKey: unknown, fallback: string): string {
  const key = localizedString(configKey as string, fallback);
  return key.trim() || fallback;
}
