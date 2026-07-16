import { normalizeCollection } from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import type { InquiryItem } from './types.js';

export function parseInquiries(raw: unknown): InquiryItem[] {
  return normalizeCollection(raw)
    .map((item, index) => ({
      id: localizedString(item.id as string) || `ask-${index + 1}`,
      question: localizedString(item.question as string),
      answer: localizedString(item.answer as string),
      category: localizedString(item.category as string) || '',
    }))
    .filter((i) => i.question && i.answer);
}

export function uniqueCategories(items: InquiryItem[]): string[] {
  const set = new Set<string>();
  items.forEach((i) => {
    if (i.category.trim()) set.add(i.category.trim());
  });
  return [...set];
}

export function filterInquiries(
  items: InquiryItem[],
  query: string,
  category: string
): InquiryItem[] {
  const q = query.trim().toLowerCase();
  return items.filter((item) => {
    if (category && item.category !== category) return false;
    if (!q) return true;
    return (
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });
}
