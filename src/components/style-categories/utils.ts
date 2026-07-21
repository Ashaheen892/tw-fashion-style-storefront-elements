import { extractLink, normalizeCollection, t } from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import type { CategoryTile } from './types.js';

const DEFAULTS: CategoryTile[] = [
  {
    id: 'evening',
    image:
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
    title: t('سهرة', 'Evening'),
    url: '',
  },
  {
    id: 'daily',
    image:
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80',
    title: t('يومي', 'Daily'),
    url: '',
  },
  {
    id: 'occasion',
    image:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    title: t('مناسبات', 'Occasions'),
    url: '',
  },
  {
    id: 'new',
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
    title: t('وصل حديثاً', 'New in'),
    url: '',
  },
];

export function parseCategoryTiles(raw: unknown): CategoryTile[] {
  const parsed = normalizeCollection(raw)
    .map((item, index) => {
      const image = String(item.image || item.poster || '').trim();
      const title =
        localizedString(item.title as never) || localizedString(item.label as never);
      const url = extractLink(item.link) || extractLink(item.url) || String(item.link || '').trim();
      return {
        id: String(item.id || `stc-${index}`),
        image,
        title,
        url,
      } satisfies CategoryTile;
    })
    .filter((v) => v.image || v.title);

  if (!parsed.length) return DEFAULTS.map((d) => ({ ...d }));
  return parsed.map((item, i) => {
    const d = DEFAULTS[i % DEFAULTS.length];
    return {
      ...item,
      image: item.image || d.image,
      title: item.title || d.title,
    };
  });
}
