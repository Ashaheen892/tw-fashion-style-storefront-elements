import {
  extractImageUrl,
  extractLink,
  getRadioValue,
  getUnitValue,
  isTruthy,
  normalizeCollection,
  toNumber,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import type {
  AspectRatio,
  FpsOption,
  MotionFrame,
  MotionInfo,
  MotionMeter,
  PanelSide,
  VideoSpeed,
  ViewerMode,
} from './types.js';

const FPS_OPTIONS: FpsOption[] = [1, 2, 3, 4];
const SPEED_OPTIONS: VideoSpeed[] = [0.5, 0.75, 1];

/** Map legacy fast presets down to a calmer pace. */
const LEGACY_FPS: Record<number, FpsOption> = {
  6: 2,
  8: 1,
  12: 2,
  15: 2,
};

export function parseViewerMode(raw: unknown): ViewerMode {
  const val = getRadioValue(raw, 'sequence').toLowerCase();
  return val === 'video' ? 'video' : 'sequence';
}

export function parseFps(raw: unknown): FpsOption {
  const n = toNumber(getRadioValue(raw, '1') || raw, 1);
  if (FPS_OPTIONS.includes(n as FpsOption)) return n as FpsOption;
  if (LEGACY_FPS[n]) return LEGACY_FPS[n];
  return 1;
}

export function parseVideoSpeed(raw: unknown): VideoSpeed {
  const n = toNumber(getRadioValue(raw, '1') || raw, 1);
  return (SPEED_OPTIONS.includes(n as VideoSpeed) ? n : 1) as VideoSpeed;
}

export function parsePanelSide(raw: unknown): PanelSide {
  const val = getRadioValue(raw, 'right').toLowerCase();
  if (val === 'left' || val === 'bottom') return val;
  return 'right';
}

export function parseAspectRatio(raw: unknown): AspectRatio {
  const val = getRadioValue(raw, '3/4').replace(/\s/g, '');
  if (val === '1/1' || val === '4/5' || val === '16/9' || val === '3/4') {
    return val;
  }
  return '3/4';
}

/** Collection order = frame order. No merchant frame IDs. */
export function parseFrames(raw: unknown): MotionFrame[] {
  return normalizeCollection(raw)
    .map((item, index) => {
      const image = extractImageUrl(item.image) || String(item.image || '').trim();
      const title = localizedString(item.title as string).trim();
      const desc = localizedString(item.desc as string).trim();
      const alt =
        localizedString(item.alt as string).trim() ||
        title ||
        `Frame ${index + 1}`;
      return {
        index,
        image,
        alt,
        title,
        desc,
        show_info: isTruthy(item.show_info, Boolean(title || desc)),
        url: extractLink(item.url),
        btn_text: localizedString(item.btn_text as string).trim(),
      };
    })
    .filter((f) => Boolean(f.image));
}

/** Merchant-defined meters: name + grade (0–100), up to 10. */
export function parseMeters(raw: unknown): MotionMeter[] {
  return normalizeCollection(raw)
    .map((item) => {
      const name = localizedString(item.name as string).trim();
      const value = Math.max(
        0,
        Math.min(100, getUnitValue(item.value ?? item.grade ?? item.degree, 0))
      );
      return { name, value };
    })
    .filter((m) => Boolean(m.name))
    .slice(0, 10);
}

function legacyMeters(config: Record<string, unknown>): MotionMeter[] {
  const meters: MotionMeter[] = [];
  if (config.amm_flow != null && config.amm_flow !== '') {
    meters.push({
      name: 'الانسيابية',
      value: Math.max(0, Math.min(100, getUnitValue(config.amm_flow, 70))),
    });
  }
  if (config.amm_width != null && config.amm_width !== '') {
    meters.push({
      name: 'الاتساع',
      value: Math.max(0, Math.min(100, getUnitValue(config.amm_width, 55))),
    });
  }
  return meters;
}

export function parseMotionInfo(config: Record<string, unknown>): MotionInfo {
  const meters = parseMeters(config.amm_meters);
  return {
    name: localizedString(config.amm_name as string).trim(),
    desc: localizedString(config.amm_desc as string).trim(),
    fabric: localizedString(config.amm_fabric as string).trim(),
    cut: localizedString(config.amm_cut as string).trim(),
    meters: meters.length ? meters : legacyMeters(config),
    sleeves: localizedString(config.amm_sleeves as string).trim(),
    product_url: extractLink(config.amm_product_url),
    product_btn: localizedString(config.amm_product_btn as string).trim(),
  };
}

export function isDirectVideoUrl(url: string): boolean {
  if (!url) return false;
  const lower = url.toLowerCase();
  if (lower.includes('youtube.com') || lower.includes('youtu.be')) return false;
  if (lower.includes('vimeo.com/')) return false;
  return (
    /\.(mp4|webm|ogg|mov)(\?|$)/i.test(url) ||
    lower.startsWith('blob:') ||
    lower.startsWith('data:video') ||
    lower.includes('/video') ||
    lower.startsWith('https://') ||
    lower.startsWith('http://') ||
    lower.startsWith('/')
  );
}

export function clampIndex(index: number, length: number, loop: boolean): number {
  if (length <= 0) return 0;
  if (loop) {
    return ((index % length) + length) % length;
  }
  return Math.max(0, Math.min(length - 1, index));
}

/** Prefetch a single image URL; resolves true on success. */
export function preloadImage(src: string): Promise<boolean> {
  if (!src) return Promise.resolve(false);
  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

export class FrameLoader {
  private ready = new Set<string>();
  private failed = new Set<string>();
  private inflight = new Map<string, Promise<boolean>>();

  isReady(src: string): boolean {
    return this.ready.has(src);
  }

  isFailed(src: string): boolean {
    return this.failed.has(src);
  }

  async load(src: string): Promise<boolean> {
    if (!src) return false;
    if (this.ready.has(src)) return true;
    if (this.failed.has(src)) return false;
    const existing = this.inflight.get(src);
    if (existing) return existing;

    const promise = preloadImage(src).then((ok) => {
      this.inflight.delete(src);
      if (ok) this.ready.add(src);
      else this.failed.add(src);
      return ok;
    });
    this.inflight.set(src, promise);
    return promise;
  }

  async loadMany(srcs: string[]): Promise<void> {
    await Promise.all(srcs.filter(Boolean).map((s) => this.load(s)));
  }

  firstReady(frames: MotionFrame[]): MotionFrame | null {
    for (const f of frames) {
      if (this.ready.has(f.image) || !this.failed.has(f.image)) {
        if (this.ready.has(f.image)) return f;
      }
    }
    for (const f of frames) {
      if (!this.failed.has(f.image)) return f;
    }
    return null;
  }

  failureRatio(frames: MotionFrame[]): number {
    if (!frames.length) return 1;
    const failed = frames.filter((f) => this.failed.has(f.image)).length;
    return failed / frames.length;
  }
}
