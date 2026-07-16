import {
  buildWhatsAppUrl,
  extractImageUrl,
  groupByKey,
  isTruthy,
  normalizeCollection,
  sortByOrder,
  toNumber,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import type { ConfigOption, OptionGroup } from './types.js';

export function parseConfigOptions(raw: unknown): ConfigOption[] {
  return normalizeCollection(raw)
    .map((item, index) => {
      const groupName = localizedString(item.group_name as string);
      const optionName = localizedString(item.option_name as string);
      const groupKey =
        localizedString(item.group_key as string) || groupName || 'default';
      return {
        group_key: groupKey,
        group_name: groupName || groupKey,
        group_order: toNumber(item.group_order, 0),
        option_id:
          localizedString(item.option_id as string) ||
          optionName ||
          `opt-${index + 1}`,
        option_name: optionName,
        overlay_image: extractImageUrl(item.overlay_image),
        price_delta: toNumber(item.price_delta, 0),
        is_default: isTruthy(item.is_default),
        option_desc: localizedString(item.option_desc as string),
        thumb_image: extractImageUrl(item.thumb_image),
        swatch_color: localizedString(item.swatch_color as string),
      };
    })
    .filter((o) => o.option_name);
}

export function buildOptionGroups(options: ConfigOption[]): OptionGroup[] {
  const map = groupByKey(options, 'group_key');
  const groups: OptionGroup[] = [];

  for (const [key, list] of map) {
    const sorted = sortByOrder(list, 'group_order');
    const first = sorted[0];
    groups.push({
      key,
      name: first.group_name || key,
      order: first.group_order,
      options: sorted,
    });
  }

  return groups.sort((a, b) => a.order - b.order);
}

export function defaultOptionSelections(groups: OptionGroup[]): Record<string, string> {
  const selections: Record<string, string> = {};
  for (const group of groups) {
    const def = group.options.find((o) => o.is_default) || group.options[0];
    if (def) selections[group.key] = def.option_id;
  }
  return selections;
}

export function calcFinalPrice(
  basePrice: number,
  groups: OptionGroup[],
  selections: Record<string, string>
): number {
  let total = basePrice;
  for (const group of groups) {
    const id = selections[group.key];
    const opt = group.options.find((o) => o.option_id === id);
    if (opt) total += opt.price_delta;
  }
  return total;
}

export function buildDesignSummary(
  groups: OptionGroup[],
  selections: Record<string, string>,
  basePrice: number,
  currency: string
): string {
  const lines: string[] = [];
  lines.push(`${currency}`);
  lines.push(`Base: ${basePrice}`);

  for (const group of groups) {
    const id = selections[group.key];
    const opt = group.options.find((o) => o.option_id === id);
    if (!opt) continue;
    lines.push(`${group.name}: ${opt.option_name}`);
    if (opt.price_delta) lines.push(`  +${opt.price_delta}`);
    if (opt.option_desc) lines.push(`  ${opt.option_desc}`);
  }

  lines.push(`Total: ${calcFinalPrice(basePrice, groups, selections)} ${currency}`);
  return lines.join('\n');
}

export function whatsAppLink(phone: string, message: string): string {
  return buildWhatsAppUrl(phone, message);
}
