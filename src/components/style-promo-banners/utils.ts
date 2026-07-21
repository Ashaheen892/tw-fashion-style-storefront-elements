import { extractLink, normalizeCollection, t } from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import type { PromoBanner } from './types.js';

const DEFAULTS: PromoBanner[] = [
  {
    id: 'collection',
    image:
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1400&q=80',
    headline: t('مجموعة الموسم', 'Season collection'),
    subtitle: t('قصّات هادئة بتفاصيل فاخرة', 'Quiet cuts with refined detail'),
    ctaLabel: t('تسوّقي الآن', 'Shop now'),
    ctaUrl: '',
  },
  {
    id: 'lookbook',
    image:
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=80',
    headline: t('لوكبوك جديد', 'New lookbook'),
    subtitle: t('إطلالات جاهزة من المحل', 'Ready looks from the boutique'),
    ctaLabel: t('شاهدي اللوكبوك', 'View lookbook'),
    ctaUrl: '',
  },
];

export function parsePromoBanners(raw: unknown): PromoBanner[] {
  const parsed = normalizeCollection(raw)
    .map((item, index) => {
      const image = String(item.image || item.poster || '').trim();
      return {
        id: String(item.id || `stpb-${index}`),
        image,
        headline:
          localizedString(item.headline as never) ||
          localizedString(item.title as never) ||
          '',
        subtitle:
          localizedString(item.subtitle as never) ||
          localizedString(item.desc as never) ||
          '',
        ctaLabel: localizedString(item.cta_label as never) || '',
        ctaUrl:
          extractLink(item.cta_link) ||
          extractLink(item.link) ||
          String(item.link || '').trim(),
      } satisfies PromoBanner;
    })
    .filter((v) => v.image || v.headline);

  if (!parsed.length) return DEFAULTS.map((d) => ({ ...d }));
  return parsed.map((item, i) => {
    const d = DEFAULTS[i % DEFAULTS.length];
    return {
      ...item,
      image: item.image || d.image,
      headline: item.headline || d.headline,
      subtitle: item.subtitle || d.subtitle,
      ctaLabel: item.ctaLabel || d.ctaLabel,
    };
  });
}
