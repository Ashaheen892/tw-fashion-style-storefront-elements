import { extractLink, normalizeCollection } from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import type { ShineVideoItem } from './types.js';

function youtubeId(url: string): string {
  if (!url) return '';
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtu.be')) return u.pathname.replace('/', '').split('/')[0] || '';
    if (u.pathname.includes('/shorts/')) return u.pathname.split('/shorts/')[1]?.split(/[/?#]/)[0] || '';
    if (u.pathname.includes('/embed/')) return u.pathname.split('/embed/')[1]?.split(/[/?#]/)[0] || '';
    return u.searchParams.get('v') || '';
  } catch {
    return '';
  }
}

export function isYoutubeUrl(url: string): boolean {
  return Boolean(youtubeId(url));
}

export function youtubeEmbedUrl(url: string): string {
  const id = youtubeId(url);
  return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : '';
}

export function parseVideos(raw: unknown): ShineVideoItem[] {
  return normalizeCollection(raw)
    .map((item, index) => {
      const poster = String(item.poster || item.image || '').trim();
      const videoUrl = extractLink(item.video_url) || String(item.video_url || item.youtube || '').trim();
      const caption = localizedString(item.caption as never) || localizedString(item.title as never);
      if (!poster && !videoUrl) return null;
      return {
        id: String(item.id || `sv-${index}`),
        poster,
        videoUrl,
        caption,
      } satisfies ShineVideoItem;
    })
    .filter((v): v is ShineVideoItem => Boolean(v));
}
