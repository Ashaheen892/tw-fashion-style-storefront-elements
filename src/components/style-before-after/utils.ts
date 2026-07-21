import { normalizeCollection, t } from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import type { BeforeAfterPair } from './types.js';

const DEFAULTS: BeforeAfterPair[] = [
  {
    id: 'drape',
    beforeImage:
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80',
    afterImage:
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
    beforeLabel: t('قبل', 'Before'),
    afterLabel: t('بعد', 'After'),
    caption: t('فرق القصة والوقع', 'Cut & drape difference'),
  },
  {
    id: 'fabric',
    beforeImage:
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=80',
    afterImage:
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80',
    beforeLabel: t('خامة خفيفة', 'Light fabric'),
    afterLabel: t('خامة فاخرة', 'Luxe fabric'),
    caption: t('مقارنة القماش', 'Fabric comparison'),
  },
];

export function parseBeforeAfterPairs(raw: unknown): BeforeAfterPair[] {
  const parsed = normalizeCollection(raw)
    .map((item, index) => {
      const beforeImage = String(item.before_image || item.image_before || '').trim();
      const afterImage = String(item.after_image || item.image_after || '').trim();
      return {
        id: String(item.id || `stba-${index}`),
        beforeImage,
        afterImage,
        beforeLabel: localizedString(item.before_label as never) || '',
        afterLabel: localizedString(item.after_label as never) || '',
        caption: localizedString(item.caption as never) || '',
      } satisfies BeforeAfterPair;
    })
    .filter((v) => v.beforeImage || v.afterImage || v.caption);

  if (!parsed.length) return DEFAULTS.map((d) => ({ ...d }));
  return parsed.map((item, i) => {
    const d = DEFAULTS[i % DEFAULTS.length];
    return {
      ...item,
      beforeImage: item.beforeImage || d.beforeImage,
      afterImage: item.afterImage || d.afterImage,
      beforeLabel: item.beforeLabel || d.beforeLabel,
      afterLabel: item.afterLabel || d.afterLabel,
      caption: item.caption || d.caption,
    };
  });
}
