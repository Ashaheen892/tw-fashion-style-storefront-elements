import {
  clamp,
  extractLink,
  getUnitValue,
  normalizeCollection,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import type { CountdownParts, RevealProduct } from './types.js';

export function parseLaunchDate(raw: unknown): Date | null {
  const str = localizedString(raw as string, '').trim();
  if (!str) return null;
  const parsed = new Date(str);
  return Number.isFinite(parsed.getTime()) ? parsed : null;
}

export function getCountdown(target: Date, now = new Date()): CountdownParts {
  const totalMs = Math.max(0, target.getTime() - now.getTime());
  const totalSec = Math.floor(totalMs / 1000);
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;
  return { days, hours, minutes, seconds, totalMs };
}

export function parseRevealProducts(raw: unknown): RevealProduct[] {
  return normalizeCollection(raw)
    .map((item) => ({
      image: localizedString(item.image as string),
      name: localizedString(item.name as string),
      desc: localizedString(item.desc as string),
      url: extractLink(item.url),
      btn_text: localizedString(item.btn_text as string),
    }))
    .filter((p) => p.name || p.image);
}

export function isVideoUrl(url: string): boolean {
  if (!url) return false;
  return /\.(mp4|webm|ogg)(\?|$)/i.test(url) || url.includes('video');
}

export function overlayOpacity(raw: unknown): number {
  return clamp(getUnitValue(raw, 0), 0, 100) / 100;
}
