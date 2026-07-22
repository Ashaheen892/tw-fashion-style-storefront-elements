var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, html, nothing } from "lit";
import { property, state, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { o as getRadioValue, n as normalizeCollection, e as extractImageUrl, l as localizedString, d as extractLink, i as isTruthy, f as toNumber, q as getUnitValue, s as sharedSectionCss, p as prefersReducedMotion, r as readSectionTheme, a as themeStyleMap, v as isValidHref, t, b as renderCommerceOutcome } from "./sharedStyles-Cmm0noVj.js";
const componentStyles = css`
  .amm-shell {
    display: grid;
    gap: 1.35rem;
  }

  @media (min-width: 960px) {
    .amm-shell--side {
      grid-template-columns: minmax(0, 1.15fr) minmax(240px, 0.85fr);
      align-items: start;
      gap: 1.75rem;
    }

    .amm-shell--side-left .amm-panel {
      order: -1;
    }

    .amm-shell--side-left {
      grid-template-columns: minmax(240px, 0.85fr) minmax(0, 1.15fr);
    }
  }

  .amm-viewer {
    position: relative;
    display: grid;
    gap: 0.75rem;
    min-width: 0;
  }

  .amm-stage {
    position: relative;
    width: 100%;
    aspect-ratio: var(--amm-aspect, 3 / 4);
    max-height: min(42rem, 78vh);
    overflow: hidden;
    border-radius: var(--section-radius, 16px);
    border: 1px solid var(--amm-viewer-border, var(--border-color, #e5e7eb));
    background: var(--amm-viewer-bg, #1a1614);
    box-shadow: var(--amm-shadow, 0 12px 36px color-mix(in srgb, var(--text-color, #000) 12%, transparent));
    touch-action: pan-y;
    user-select: none;
    -webkit-user-select: none;
    cursor: grab;
  }

  .amm-stage--dragging {
    cursor: grabbing;
  }

  .amm-stage--static {
    cursor: default;
  }

  .amm-stage__media {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
    pointer-events: none;
  }

  .amm-stage__media--layer {
    transition: opacity 0.55s ease;
    will-change: opacity;
  }

  .amm-stage__media--front {
    opacity: 1;
    z-index: 2;
  }

  .amm-stage__media--back {
    opacity: 0;
    z-index: 1;
  }

  .amm-stage--playing .amm-stage__media--front {
    animation: amm-play-soft 0.55s ease;
  }

  .amm-stage video.amm-stage__media {
    pointer-events: none;
    background: #000;
  }

  .amm-stage:fullscreen,
  .amm-stage:-webkit-full-screen,
  .amm-stage--fs {
    position: fixed !important;
    inset: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    max-height: none !important;
    aspect-ratio: auto !important;
    border-radius: 0 !important;
    z-index: 99999;
    background: #0d0b0a;
  }

  .amm-stage:fullscreen .amm-fs-trigger,
  .amm-stage:-webkit-full-screen .amm-fs-trigger,
  .amm-stage--fs .amm-fs-trigger {
    top: 1rem;
    left: 1rem;
  }

  .amm-fs-trigger {
    position: absolute;
    top: 0.75rem;
    left: 0.75rem;
    z-index: 5;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: color-mix(in srgb, #000 48%, transparent);
    color: #fff;
    cursor: pointer;
    backdrop-filter: blur(4px);
    transition: background 0.2s ease, transform 0.2s ease;
  }

  .amm-fs-trigger:hover {
    background: color-mix(in srgb, #000 62%, transparent);
  }

  .amm-fs-trigger:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 2px;
  }

  .amm-stage-nav {
    position: absolute;
    left: 50%;
    bottom: 0.85rem;
    transform: translateX(-50%);
    z-index: 5;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    gap: 0.45rem;
    padding: 0.3rem 0.4rem;
    border-radius: 999px;
    background: color-mix(in srgb, #000 48%, transparent);
    backdrop-filter: blur(4px);
    color: #fff;
    direction: ltr;
  }

  .amm-arrow {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: color-mix(in srgb, #fff 14%, transparent);
    color: #fff;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  .amm-arrow:hover {
    background: color-mix(in srgb, #fff 26%, transparent);
  }

  .amm-arrow:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 2px;
  }

  .amm-stage-nav__count {
    min-width: 4.25rem;
    text-align: center;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    font-variant-numeric: tabular-nums;
  }

  .amm-hint {
    position: absolute;
    left: 50%;
    top: 0.85rem;
    transform: translateX(-50%);
    z-index: 3;
    margin: 0;
    padding: 0.45rem 0.85rem;
    border-radius: 999px;
    background: color-mix(in srgb, #000 45%, transparent);
    color: #fff;
    font-size: 0.78rem;
    font-weight: 600;
    white-space: nowrap;
    pointer-events: none;
    transition: opacity 0.35s ease;
  }

  .amm-hint--hidden {
    opacity: 0;
  }

  .amm-caption {
    position: absolute;
    inset-inline: 0.75rem;
    bottom: 0.75rem;
    z-index: 3;
    max-width: min(20rem, calc(100% - 1.5rem));
    padding: 0.7rem 0.85rem;
    border-radius: calc(var(--section-radius, 16px) * 0.55);
    background: var(--amm-info-bg, color-mix(in srgb, var(--card-bg, #ffffff) 92%, transparent));
    color: var(--text-color, #000000);
    box-shadow: 0 10px 24px color-mix(in srgb, var(--text-color, #000) 16%, transparent);
    animation: amm-fade 0.28s ease both;
  }

  .amm-caption__title {
    margin: 0 0 0.2rem;
    font-size: 0.9rem;
    font-weight: 700;
  }

  .amm-caption__desc {
    margin: 0;
    font-size: 0.78rem;
    line-height: 1.55;
    color: var(--muted-color, #666666);
  }

  .amm-caption__link {
    display: inline-flex;
    margin-top: 0.45rem;
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--accent-color, var(--fs-store-primary));
    text-decoration: none;
  }

  .amm-caption__link:hover {
    text-decoration: underline;
  }

  @media (min-width: 960px) {
    .amm-caption {
      inset-inline-start: 1rem;
      inset-inline-end: auto;
      bottom: 1rem;
    }
  }

  .amm-controls {
    display: grid;
    gap: 0.65rem;
  }

  .amm-progress-wrap {
    display: grid;
    gap: 0.35rem;
  }

  .amm-progress {
    position: relative;
    width: 100%;
    height: 2.75rem;
    display: grid;
    align-items: center;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    touch-action: none;
  }

  .amm-progress__track {
    position: relative;
    height: 0.35rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #e5e7eb) 85%, transparent);
    overflow: hidden;
  }

  .amm-progress__fill {
    display: block;
    height: 100%;
    width: var(--amm-progress, 0%);
    background: var(--amm-progress-color, var(--accent-color, var(--fs-store-primary)));
    border-radius: inherit;
  }

  .amm-progress__meta {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--muted-color, #666666);
  }

  .amm-toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
  }

  .amm-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 44px;
    min-height: 44px;
    padding: 0.45rem 0.75rem;
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: calc(var(--section-radius, 16px) * 0.45);
    background: var(--amm-control-bg, var(--card-bg, #ffffff));
    color: var(--text-color, #000000);
    font: inherit;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease;
  }

  .amm-btn:hover {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, var(--border-color, #e5e7eb));
  }

  .amm-btn--primary {
    background: var(--button-bg, var(--accent-color, var(--fs-store-primary)));
    color: var(--button-color, #fff);
    border-color: transparent;
  }

  .amm-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .amm-panel {
    display: grid;
    gap: 0.85rem;
    padding: 1.15rem 1.1rem 1.25rem;
    border-radius: var(--section-radius, 16px);
    border: 1px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #ffffff);
    min-width: 0;
  }

  .amm-panel__name {
    margin: 0;
    font-size: clamp(1.35rem, 2.5vw, 1.75rem);
    font-weight: 700;
    line-height: 1.3;
    color: var(--text-color, #000000);
  }

  .amm-panel__desc {
    margin: 0;
    font-size: 0.92rem;
    line-height: 1.7;
    color: var(--muted-color, #666666);
  }

  .amm-meta {
    display: grid;
    gap: 0.55rem;
  }

  .amm-meta__row {
    display: grid;
    gap: 0.2rem;
  }

  .amm-meta__label {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--muted-color, #666666);
  }

  .amm-meta__value {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-color, #000000);
  }

  .amm-meters {
    display: grid;
    gap: 0.75rem;
  }

  .amm-meter {
    display: grid;
    gap: 0.3rem;
  }

  .amm-meter__head {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .amm-meter__bar {
    height: 0.4rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #e5e7eb) 80%, transparent);
    overflow: hidden;
  }

  .amm-meter__bar > span {
    display: block;
    height: 100%;
    background: var(--accent-color, var(--fs-store-primary));
    border-radius: inherit;
  }

  .amm-panel .fs-btn {
    width: 100%;
    justify-content: center;
  }

  @keyframes amm-fade {
    from {
      opacity: 0;
      transform: translateY(0.35rem);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @keyframes amm-play-soft {
    0% {
      opacity: 0.72;
      transform: scale(1.012);
    }
    100% {
      opacity: 1;
      transform: none;
    }
  }

  @media (max-width: 959px) {
    .amm-shell {
      gap: 1.1rem;
    }

    .amm-stage {
      max-height: min(26rem, 58vh);
      border-radius: calc(var(--section-radius, 16px) * 0.75);
    }

    .amm-caption {
      position: static;
      max-width: none;
      margin-top: 0.15rem;
      box-shadow: none;
      border: 1px solid var(--border-color, #e5e7eb);
    }

    .amm-stage-nav {
      bottom: 0.65rem;
    }

    .amm-toolbar {
      display: flex;
      justify-content: center;
    }

    .amm-btn {
      min-width: 7.5rem;
    }

    .amm-panel {
      padding: 1rem 0.9rem 1.1rem;
    }
  }

  @media (max-width: 639px) {
    .amm-hint {
      top: 3.4rem;
      font-size: 0.72rem;
      padding: 0.4rem 0.7rem;
      max-width: calc(100% - 5.5rem);
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .amm-stage-nav__count {
      min-width: 3.6rem;
      font-size: 0.76rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .amm-caption,
    .amm-hint,
    .amm-btn,
    .amm-progress__fill,
    .amm-stage__media--layer,
    .amm-stage--playing .amm-stage__media--front {
      transition: none !important;
      animation: none !important;
    }
  }
`, FPS_OPTIONS = [1, 2, 3, 4], SPEED_OPTIONS = [0.5, 0.75, 1], LEGACY_FPS = {
  6: 2,
  8: 1,
  12: 2,
  15: 2
};
function parseViewerMode(raw) {
  return getRadioValue(raw, "sequence").toLowerCase() === "video" ? "video" : "sequence";
}
__name(parseViewerMode, "parseViewerMode");
function parseFps(raw) {
  const n = toNumber(getRadioValue(raw, "1") || raw, 1);
  return FPS_OPTIONS.includes(n) ? n : LEGACY_FPS[n] ? LEGACY_FPS[n] : 1;
}
__name(parseFps, "parseFps");
function parseVideoSpeed(raw) {
  const n = toNumber(getRadioValue(raw, "1") || raw, 1);
  return SPEED_OPTIONS.includes(n) ? n : 1;
}
__name(parseVideoSpeed, "parseVideoSpeed");
function parsePanelSide(raw) {
  const val = getRadioValue(raw, "right").toLowerCase();
  return val === "left" || val === "bottom" ? val : "right";
}
__name(parsePanelSide, "parsePanelSide");
function parseAspectRatio(raw) {
  const val = getRadioValue(raw, "3/4").replace(/\s/g, "");
  return val === "1/1" || val === "4/5" || val === "16/9" || val === "3/4" ? val : "3/4";
}
__name(parseAspectRatio, "parseAspectRatio");
function parseFrames(raw) {
  return normalizeCollection(raw).map((item, index) => {
    const image = extractImageUrl(item.image) || String(item.image || "").trim(), title = localizedString(item.title).trim(), desc = localizedString(item.desc).trim(), alt = localizedString(item.alt).trim() || title || `Frame ${index + 1}`;
    return {
      index,
      image,
      alt,
      title,
      desc,
      show_info: isTruthy(item.show_info, !!(title || desc)),
      url: extractLink(item.url),
      btn_text: localizedString(item.btn_text).trim()
    };
  }).filter((f) => !!f.image);
}
__name(parseFrames, "parseFrames");
function parseMeters(raw) {
  return normalizeCollection(raw).map((item) => {
    const name = localizedString(item.name).trim(), value = Math.max(
      0,
      Math.min(100, getUnitValue(item.value ?? item.grade ?? item.degree, 0))
    );
    return { name, value };
  }).filter((m) => !!m.name).slice(0, 10);
}
__name(parseMeters, "parseMeters");
function legacyMeters(config) {
  const meters = [];
  return config.amm_flow != null && config.amm_flow !== "" && meters.push({
    name: "الانسيابية",
    value: Math.max(0, Math.min(100, getUnitValue(config.amm_flow, 70)))
  }), config.amm_width != null && config.amm_width !== "" && meters.push({
    name: "الاتساع",
    value: Math.max(0, Math.min(100, getUnitValue(config.amm_width, 55)))
  }), meters;
}
__name(legacyMeters, "legacyMeters");
function parseMotionInfo(config) {
  const meters = parseMeters(config.amm_meters);
  return {
    name: localizedString(config.amm_name).trim(),
    desc: localizedString(config.amm_desc).trim(),
    fabric: localizedString(config.amm_fabric).trim(),
    cut: localizedString(config.amm_cut).trim(),
    meters: meters.length ? meters : legacyMeters(config),
    sleeves: localizedString(config.amm_sleeves).trim(),
    product_url: extractLink(config.amm_product_url),
    product_btn: localizedString(config.amm_product_btn).trim()
  };
}
__name(parseMotionInfo, "parseMotionInfo");
function isDirectVideoUrl(url) {
  if (!url) return !1;
  const lower = url.toLowerCase();
  return lower.includes("youtube.com") || lower.includes("youtu.be") || lower.includes("vimeo.com/") ? !1 : /\.(mp4|webm|ogg|mov)(\?|$)/i.test(url) || lower.startsWith("blob:") || lower.startsWith("data:video") || lower.includes("/video") || lower.startsWith("https://") || lower.startsWith("http://") || lower.startsWith("/");
}
__name(isDirectVideoUrl, "isDirectVideoUrl");
function clampIndex(index, length, loop) {
  return length <= 0 ? 0 : loop ? (index % length + length) % length : Math.max(0, Math.min(length - 1, index));
}
__name(clampIndex, "clampIndex");
function preloadImage(src) {
  return src ? new Promise((resolve) => {
    const img = new Image();
    img.decoding = "async", img.onload = () => resolve(!0), img.onerror = () => resolve(!1), img.src = src;
  }) : Promise.resolve(!1);
}
__name(preloadImage, "preloadImage");
const _FrameLoader = class _FrameLoader {
  constructor() {
    this.ready = /* @__PURE__ */ new Set(), this.failed = /* @__PURE__ */ new Set(), this.inflight = /* @__PURE__ */ new Map();
  }
  isReady(src) {
    return this.ready.has(src);
  }
  isFailed(src) {
    return this.failed.has(src);
  }
  async load(src) {
    if (!src) return !1;
    if (this.ready.has(src)) return !0;
    if (this.failed.has(src)) return !1;
    const existing = this.inflight.get(src);
    if (existing) return existing;
    const promise = preloadImage(src).then((ok) => (this.inflight.delete(src), ok ? this.ready.add(src) : this.failed.add(src), ok));
    return this.inflight.set(src, promise), promise;
  }
  async loadMany(srcs) {
    await Promise.all(srcs.filter(Boolean).map((s) => this.load(s)));
  }
  firstReady(frames) {
    for (const f of frames)
      if ((this.ready.has(f.image) || !this.failed.has(f.image)) && this.ready.has(f.image))
        return f;
    for (const f of frames)
      if (!this.failed.has(f.image)) return f;
    return null;
  }
  failureRatio(frames) {
    return frames.length ? frames.filter((f) => this.failed.has(f.image)).length / frames.length : 1;
  }
};
__name(_FrameLoader, "FrameLoader");
let FrameLoader = _FrameLoader;
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const DRAG_PX_PER_FRAME = 18, _AbayaMotionMirror = class _AbayaMotionMirror extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.frameIndex = 0, this.displaySrc = "", this.playing = !1, this.dragging = !1, this.hintHidden = !1, this.inView = !1, this.videoTime = 0, this.videoDuration = 0, this.fullscreenOpen = !1, this.framesReady = !1, this.mediaFront = "", this.mediaBack = "", this.frontIsA = !0, this.loader = new FrameLoader(), this.boundLang = () => this.requestUpdate(), this.io = null, this.playRaf = 0, this.dragRaf = 0, this.lastPlayTs = 0, this.playBusy = !1, this.boundFsChange = () => this.syncFullscreenState(), this.pointerId = null, this.dragStartX = 0, this.dragStartIndex = 0, this.dragStartVideoTime = 0, this.wasPlayingBeforeDrag = !1, this.userStopped = !1, this.pendingIndex = null, this.preloadStarted = !1, this.boundVisibility = () => this.onVisibilityChange(), this.boundKeydown = (e) => this.onGlobalKey(e), this.onPointerMove = (e) => {
      !this.dragging || e.pointerId !== this.pointerId || this.dragRaf || (this.dragRaf = requestAnimationFrame(() => {
        this.dragRaf = 0;
        const dx = e.clientX - this.dragStartX, dir = getComputedStyle(this).direction === "rtl" ? -1 : 1, signed = dx * dir;
        if (this.mode === "sequence") {
          const deltaFrames = Math.round(signed / DRAG_PX_PER_FRAME);
          if (Math.abs(signed) < DRAG_PX_PER_FRAME) return;
          this.goToFrame(this.dragStartIndex + deltaFrames);
        } else {
          const stage = this.stageEl, video = this.videoEl;
          if (!stage || !video || !this.videoDuration) return;
          const rect = stage.getBoundingClientRect(), ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)), start = this.videoStartSec(), end = this.videoEndSec(), span = Math.max(0.01, end - start);
          video.currentTime = start + ratio * span, this.videoTime = video.currentTime;
        }
      }));
    }, this.onPointerUp = (e) => {
      e.pointerId === this.pointerId && (this.teardownPointer(), this.dragging = !1, this.wasPlayingBeforeDrag && !this.userStopped && (this.mode === "sequence" ? this.startPlayback() : this.playVideo()), this.wasPlayingBeforeDrag = !1);
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLang), document.addEventListener("visibilitychange", this.boundVisibility), document.addEventListener("fullscreenchange", this.boundFsChange), document.addEventListener("webkitfullscreenchange", this.boundFsChange), this.setupObserver();
  }
  disconnectedCallback() {
    var _a;
    window.removeEventListener("language-changed", this.boundLang), document.removeEventListener("visibilitychange", this.boundVisibility), document.removeEventListener("fullscreenchange", this.boundFsChange), document.removeEventListener("webkitfullscreenchange", this.boundFsChange), document.removeEventListener("keydown", this.boundKeydown), this.teardownPointer(), this.stopPlaybackLoop(), (_a = this.io) == null || _a.disconnect(), this.io = null, this.pauseVideo(), this.fullscreenOpen && this.exitNativeFullscreen(), this.unlockPageScroll(), super.disconnectedCallback();
  }
  firstUpdated() {
    this.bootstrapFrames(), this.observeHost();
  }
  updated(changed) {
    changed.has("config") && (this.loader = new FrameLoader(), this.preloadStarted = !1, this.frameIndex = 0, this.displaySrc = "", this.mediaFront = "", this.mediaBack = "", this.frontIsA = !0, this.playing = !1, this.userStopped = !1, this.hintHidden = !1, this.bootstrapFrames()), this.syncHostVisibility();
  }
  get mode() {
    var _a;
    return parseViewerMode((_a = this.config) == null ? void 0 : _a.amm_mode);
  }
  get frames() {
    var _a;
    return parseFrames((_a = this.config) == null ? void 0 : _a.amm_frames);
  }
  get info() {
    return parseMotionInfo(this.config || {});
  }
  get loop() {
    var _a;
    return isTruthy((_a = this.config) == null ? void 0 : _a.amm_loop, !0);
  }
  get fps() {
    var _a;
    return parseFps((_a = this.config) == null ? void 0 : _a.amm_fps);
  }
  get autoplay() {
    var _a, _b;
    return (this.mode === "video" ? isTruthy((_a = this.config) == null ? void 0 : _a.amm_video_autoplay, !1) : isTruthy((_b = this.config) == null ? void 0 : _b.amm_autoplay, !1)) && !prefersReducedMotion();
  }
  get stopOnInteract() {
    var _a;
    return isTruthy((_a = this.config) == null ? void 0 : _a.amm_stop_on_interact, !0);
  }
  get showProgress() {
    var _a;
    return isTruthy((_a = this.config) == null ? void 0 : _a.amm_show_progress, !0);
  }
  get showControls() {
    var _a;
    return isTruthy((_a = this.config) == null ? void 0 : _a.amm_show_controls, !0);
  }
  get showFrameNum() {
    var _a;
    return isTruthy((_a = this.config) == null ? void 0 : _a.amm_show_frame_num, !0);
  }
  get showPanel() {
    var _a;
    return isTruthy((_a = this.config) == null ? void 0 : _a.amm_show_panel, !0);
  }
  get showHint() {
    var _a;
    return isTruthy((_a = this.config) == null ? void 0 : _a.amm_show_hint, !0);
  }
  get enableCaptions() {
    var _a;
    return isTruthy((_a = this.config) == null ? void 0 : _a.amm_enable_captions, !0);
  }
  get enableFs() {
    var _a;
    return isTruthy((_a = this.config) == null ? void 0 : _a.amm_enable_fs, !0);
  }
  get videoUrl() {
    var _a;
    const url = String(((_a = this.config) == null ? void 0 : _a.amm_video_url) || "").trim();
    return isDirectVideoUrl(url) ? url : "";
  }
  get poster() {
    var _a;
    return String(((_a = this.config) == null ? void 0 : _a.amm_poster) || "").trim();
  }
  get placeholder() {
    var _a;
    return String(((_a = this.config) == null ? void 0 : _a.amm_placeholder) || "").trim();
  }
  get hasContent() {
    return this.mode === "video" ? !!(this.videoUrl || this.poster) : this.frames.length > 0;
  }
  get interactiveSequence() {
    return this.mode === "sequence" && this.frames.length > 1;
  }
  get currentFrame() {
    return this.frames[this.frameIndex] || null;
  }
  syncHostVisibility() {
    this.style.display = this.hasContent ? "" : "none";
  }
  setupObserver() {
    this.io || typeof IntersectionObserver > "u" || (this.io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0], was = this.inView;
        this.inView = !!(entry != null && entry.isIntersecting), this.inView && !was && this.onEnterView(), this.inView || this.pauseAll("offscreen");
      },
      { threshold: 0.2 }
    ));
  }
  observeHost() {
    var _a;
    (_a = this.io) == null || _a.observe(this);
  }
  async bootstrapFrames() {
    var _a;
    if (this.mode !== "sequence") {
      this.framesReady = !0;
      return;
    }
    const frames = this.frames;
    if (!frames.length) {
      this.framesReady = !1;
      return;
    }
    const first = frames[0], src = await this.loader.load(first.image) ? first.image : this.placeholder || ((_a = frames.find((f) => f.image)) == null ? void 0 : _a.image) || "";
    this.displaySrc = src, this.mediaFront = src, this.mediaBack = "", this.frontIsA = !0, this.frameIndex = 0, this.framesReady = !!this.displaySrc, this.loader.loadMany(
      frames.slice(1, 3).map((f) => f.image)
    ), this.inView && this.onEnterView();
  }
  async onEnterView() {
    this.mode === "sequence" ? (this.preloadStarted || (this.preloadStarted = !0, this.progressivePreload()), this.autoplay && !this.userStopped && this.interactiveSequence && this.startPlayback()) : this.mode === "video" && (this.setupVideo(), this.autoplay && !this.userStopped && this.playVideo());
  }
  async progressivePreload() {
    const frames = this.frames;
    for (let i = 3; i < frames.length; i += 2) {
      if (!this.isConnected) return;
      await this.loader.loadMany(
        frames.slice(i, i + 2).map((f) => f.image)
      ), await new Promise((r) => setTimeout(r, 16));
    }
    if (this.loader.failureRatio(frames) > 0.6) {
      const fallback = this.loader.firstReady(frames);
      fallback && (this.setDisplayImage(fallback.image, !1), this.frameIndex = fallback.index, this.playing = !1);
    }
  }
  onVisibilityChange() {
    document.hidden && this.pauseAll("hidden");
  }
  pauseAll(_reason) {
    this.stopPlaybackLoop(), this.playing = !1, this.pauseVideo();
  }
  startPlayback() {
    if (!this.interactiveSequence || prefersReducedMotion()) return;
    this.playing = !0, this.userStopped = !1, this.lastPlayTs = 0, this.playBusy = !1, this.stopPlaybackLoop();
    const tick = /* @__PURE__ */ __name((ts) => {
      if (!this.playing || !this.inView || document.hidden) {
        this.playRaf = 0;
        return;
      }
      if (this.playBusy) {
        this.playRaf = requestAnimationFrame(tick);
        return;
      }
      this.lastPlayTs || (this.lastPlayTs = ts);
      const interval = Math.max(900, Math.round(1e3 / this.fps));
      ts - this.lastPlayTs >= interval && (this.lastPlayTs = ts, this.playBusy = !0, this.goToFrame(this.frameIndex + 1, { fromPlay: !0 }).then(
        () => {
          this.playBusy = !1;
        },
        () => {
          this.playBusy = !1;
        }
      )), this.playRaf = requestAnimationFrame(tick);
    }, "tick");
    this.playRaf = requestAnimationFrame(tick);
  }
  stopPlaybackLoop() {
    this.playRaf && (cancelAnimationFrame(this.playRaf), this.playRaf = 0), this.lastPlayTs = 0, this.playBusy = !1;
  }
  togglePlay() {
    if (this.hideHint(), this.mode === "video") {
      this.playing ? (this.userStopped = !0, this.pauseAll("user")) : (this.userStopped = !1, this.playVideo());
      return;
    }
    this.playing ? (this.userStopped = !0, this.pauseAll("user")) : (this.userStopped = !1, this.startPlayback());
  }
  async goToFrame(next, opts = {}) {
    const frames = this.frames;
    if (!frames.length) return;
    let target = clampIndex(next, frames.length, this.loop);
    if (!this.loop && opts.fromPlay && next >= frames.length) {
      this.playing = !1, this.stopPlaybackLoop();
      return;
    }
    let guard = 0;
    for (; guard < frames.length && this.loader.isFailed(frames[target].image); )
      target = clampIndex(target + 1, frames.length, this.loop), guard += 1;
    const frame = frames[target];
    if (!frame) return;
    this.pendingIndex = target;
    const ok = await this.loader.load(frame.image);
    if (this.pendingIndex === target) {
      if (!ok)
        return opts.force ? void 0 : this.goToFrame(target + 1, opts);
      this.frameIndex = target, this.setDisplayImage(frame.image, !prefersReducedMotion());
    }
  }
  setDisplayImage(src, soft = !1) {
    if (!src || src === this.displaySrc) {
      this.displaySrc = src;
      return;
    }
    const prev = this.displaySrc;
    this.displaySrc = src, soft && prev && !prefersReducedMotion() ? this.frontIsA ? (this.mediaBack = src, this.frontIsA = !1) : (this.mediaFront = src, this.frontIsA = !0) : (this.mediaFront = src, this.mediaBack = "", this.frontIsA = !0);
  }
  resetToStart() {
    if (this.hideHint(), this.mode === "video") {
      const video = this.videoEl;
      video && (video.currentTime = this.videoStartSec(), this.videoTime = video.currentTime);
      return;
    }
    this.goToFrame(0, { force: !0 });
  }
  step(delta) {
    if (this.hideHint(), this.stopOnInteract && (this.userStopped = !0, this.pauseAll("user")), this.mode === "video") {
      const video = this.videoEl;
      if (!video || !this.videoDuration) return;
      const next = Math.max(
        this.videoStartSec(),
        Math.min(this.videoEndSec(), video.currentTime + delta * 0.5)
      );
      video.currentTime = next, this.videoTime = next;
      return;
    }
    this.goToFrame(this.frameIndex + delta);
  }
  /* —— Pointer / drag —— */
  onPointerDown(e) {
    var _a, _b, _c, _d;
    e.button !== 0 && e.pointerType === "mouse" || this.mode === "sequence" && !this.interactiveSequence || this.mode === "video" && !isTruthy((_a = this.config) == null ? void 0 : _a.amm_video_scrub, !0) || this.mode === "video" && !this.videoDuration || (this.hideHint(), this.wasPlayingBeforeDrag = this.playing, this.stopOnInteract, this.pauseAll("drag"), this.dragging = !0, this.pointerId = e.pointerId, this.dragStartX = e.clientX, this.dragStartIndex = this.frameIndex, this.dragStartVideoTime = ((_b = this.videoEl) == null ? void 0 : _b.currentTime) || 0, (_d = (_c = this.stageEl) == null ? void 0 : _c.setPointerCapture) == null || _d.call(_c, e.pointerId), window.addEventListener("pointermove", this.onPointerMove), window.addEventListener("pointerup", this.onPointerUp), window.addEventListener("pointercancel", this.onPointerUp));
  }
  teardownPointer() {
    window.removeEventListener("pointermove", this.onPointerMove), window.removeEventListener("pointerup", this.onPointerUp), window.removeEventListener("pointercancel", this.onPointerUp), this.pointerId = null, this.dragRaf && (cancelAnimationFrame(this.dragRaf), this.dragRaf = 0);
  }
  hideHint() {
    this.hintHidden = !0;
  }
  /* —— Video —— */
  videoStartSec() {
    var _a;
    return Math.max(0, toNumber((_a = this.config) == null ? void 0 : _a.amm_video_start, 0));
  }
  videoEndSec() {
    var _a;
    const end = toNumber((_a = this.config) == null ? void 0 : _a.amm_video_end, 0);
    return end > 0 ? end : this.videoDuration || 0;
  }
  setupVideo() {
    var _a, _b, _c;
    const video = this.videoEl;
    video && (video.playsInline = !0, video.muted = isTruthy((_a = this.config) == null ? void 0 : _a.amm_video_muted, !0) || this.autoplay, video.loop = isTruthy((_b = this.config) == null ? void 0 : _b.amm_video_loop, !0), video.playbackRate = parseVideoSpeed((_c = this.config) == null ? void 0 : _c.amm_video_speed), this.poster && (video.poster = this.poster));
  }
  async playVideo() {
    const video = this.videoEl;
    if (!(!video || !this.videoUrl)) {
      this.setupVideo();
      try {
        video.currentTime < this.videoStartSec() && (video.currentTime = this.videoStartSec()), await video.play(), this.playing = !0, this.userStopped = !1;
      } catch {
        this.playing = !1;
      }
    }
  }
  pauseVideo() {
    const video = this.videoEl;
    video && !video.paused && video.pause(), this.playing = !1;
  }
  onVideoMeta() {
    const video = this.videoEl;
    video && (this.videoDuration = video.duration || 0, this.videoStartSec() > 0 && (video.currentTime = this.videoStartSec(), this.videoTime = video.currentTime));
  }
  onVideoTime() {
    var _a;
    const video = this.videoEl;
    if (!video) return;
    this.videoTime = video.currentTime;
    const end = this.videoEndSec();
    end > 0 && video.currentTime >= end && (isTruthy((_a = this.config) == null ? void 0 : _a.amm_video_loop, !0) ? video.currentTime = this.videoStartSec() : (this.pauseVideo(), this.userStopped = !0));
  }
  /* —— Progress keyboard / click —— */
  progressMax() {
    return this.mode === "video" ? Math.max(1, Math.floor((this.videoEndSec() - this.videoStartSec()) * 10)) : Math.max(1, this.frames.length - 1);
  }
  progressNow() {
    if (this.mode === "video") {
      const start = this.videoStartSec();
      return Math.max(0, Math.floor((this.videoTime - start) * 10));
    }
    return this.frameIndex;
  }
  progressPercent() {
    if (this.mode === "video") {
      const start = this.videoStartSec(), end = this.videoEndSec() || this.videoDuration;
      return !end || end <= start ? 0 : (this.videoTime - start) / (end - start) * 100;
    }
    return this.frames.length <= 1 ? 0 : this.frameIndex / (this.frames.length - 1) * 100;
  }
  onProgressKey(e) {
    e.key === "ArrowRight" ? (e.preventDefault(), this.step(1)) : e.key === "ArrowLeft" ? (e.preventDefault(), this.step(-1)) : e.key === "Home" ? (e.preventDefault(), this.resetToStart()) : e.key === "End" ? (e.preventDefault(), this.mode === "sequence" ? this.goToFrame(this.frames.length - 1) : this.videoEl && (this.videoEl.currentTime = this.videoEndSec() || this.videoDuration, this.videoTime = this.videoEl.currentTime)) : (e.key === " " || e.code === "Space") && (e.preventDefault(), this.togglePlay());
  }
  onProgressPointer(e) {
    const rect = e.currentTarget.getBoundingClientRect(), ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    if (this.hideHint(), this.stopOnInteract && (this.userStopped = !0, this.pauseAll("user")), this.mode === "sequence") {
      const idx = Math.round(ratio * Math.max(0, this.frames.length - 1));
      this.goToFrame(idx);
    } else if (this.videoEl && this.videoDuration) {
      const start = this.videoStartSec(), end = this.videoEndSec();
      this.videoEl.currentTime = start + ratio * Math.max(0.01, end - start), this.videoTime = this.videoEl.currentTime;
    }
  }
  /* —— Fullscreen (native on the stage — not a nested popup) —— */
  syncFullscreenState() {
    var _a, _b, _c, _d, _e;
    const fsEl = document.fullscreenElement || document.webkitFullscreenElement, open = !!(fsEl && (fsEl === this.stageEl || (_a = this.stageEl) != null && _a.contains(fsEl))), was = this.fullscreenOpen;
    this.fullscreenOpen = open || (((_b = this.stageEl) == null ? void 0 : _b.classList.contains("amm-stage--fs")) ?? !1), was && !this.fullscreenOpen && ((_c = this.stageEl) == null || _c.classList.remove("amm-stage--fs"), this.unlockPageScroll(), document.removeEventListener("keydown", this.boundKeydown), (_e = (_d = this.fsTrigger) == null ? void 0 : _d.focus) == null || _e.call(_d));
  }
  async openFullscreen() {
    var _a, _b;
    const stage = this.stageEl;
    if (!stage) return;
    document.addEventListener("keydown", this.boundKeydown);
    const req = ((_a = stage.requestFullscreen) == null ? void 0 : _a.bind(stage)) || ((_b = stage.webkitRequestFullscreen) == null ? void 0 : _b.bind(stage));
    if (typeof req == "function")
      try {
        await req(), this.fullscreenOpen = !0;
        return;
      } catch {
      }
    stage.classList.add("amm-stage--fs"), this.fullscreenOpen = !0, this.lockPageScroll();
  }
  async exitNativeFullscreen() {
    var _a;
    const doc = document;
    if (document.fullscreenElement)
      try {
        await document.exitFullscreen();
      } catch {
      }
    else if (typeof doc.webkitExitFullscreen == "function")
      try {
        await doc.webkitExitFullscreen();
      } catch {
      }
    (_a = this.stageEl) == null || _a.classList.remove("amm-stage--fs"), this.fullscreenOpen = !1, this.unlockPageScroll();
  }
  closeFullscreen() {
    this.exitNativeFullscreen().then(() => {
      var _a, _b;
      document.removeEventListener("keydown", this.boundKeydown), (_b = (_a = this.fsTrigger) == null ? void 0 : _a.focus) == null || _b.call(_a);
    });
  }
  onGlobalKey(e) {
    e.key === "Escape" && this.fullscreenOpen && (e.preventDefault(), this.closeFullscreen());
  }
  lockPageScroll() {
    document.documentElement.style.overflow = "hidden";
  }
  unlockPageScroll() {
    document.documentElement.style.overflow = "";
  }
  designVars() {
    const c = this.config || {}, theme = readSectionTheme(c, "amm_"), shadowLevel = Math.max(0, Math.min(3, getUnitValue(c.amm_shadow, 1))), shadows = [
      "none",
      "0 10px 28px rgba(43, 33, 28, 0.08)",
      "0 16px 40px rgba(43, 33, 28, 0.12)",
      "0 22px 56px rgba(43, 33, 28, 0.18)"
    ];
    return {
      ...themeStyleMap(theme),
      "--amm-viewer-bg": String(c.amm_viewer_bg || "#1a1614"),
      "--amm-progress-color": String(c.amm_progress_color || theme.accent),
      "--amm-control-bg": String(c.amm_control_bg || theme.card),
      "--amm-info-bg": String(c.amm_info_bg || theme.card),
      "--amm-viewer-border": String(c.amm_viewer_border || theme.border),
      "--amm-shadow": shadows[shadowLevel] || shadows[1],
      "--amm-aspect": parseAspectRatio(c.amm_aspect),
      "--amm-progress": `${this.progressPercent()}%`
    };
  }
  renderMeter(label, value) {
    const safe = Math.max(0, Math.min(100, value));
    return html`
      <div
        class="amm-meter"
        role="meter"
        aria-label=${label}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${Math.round(safe)}
      >
        <div class="amm-meter__head">
          <span>${label}</span>
          <span>${Math.round(safe)}</span>
        </div>
        <div class="amm-meter__bar" aria-hidden="true">
          <span style=${styleMap({ width: `${safe}%` })}></span>
        </div>
      </div>
    `;
  }
  renderCaption(frame) {
    return !this.enableCaptions || !(frame != null && frame.show_info) ? nothing : !frame.title && !frame.desc ? nothing : html`
      <div class="amm-caption" aria-live="polite">
        ${frame.title ? html`<p class="amm-caption__title">${frame.title}</p>` : nothing}
        ${frame.desc ? html`<p class="amm-caption__desc">${frame.desc}</p>` : nothing}
        ${isValidHref(frame.url) ? html`<a class="amm-caption__link" href=${frame.url}>
              ${frame.btn_text || t("اكتشفي المزيد", "Learn more")}
            </a>` : nothing}
      </div>
    `;
  }
  renderStage() {
    var _a, _b, _c, _d, _e, _f;
    const mode = this.mode, interactive = mode === "sequence" && this.interactiveSequence || mode === "video" && isTruthy((_a = this.config) == null ? void 0 : _a.amm_video_scrub, !0) && this.videoDuration > 0, hint = localizedString((_b = this.config) == null ? void 0 : _b.amm_hint) || t("اسحبي لرؤية الحركة", "Drag to explore the motion"), alt = ((_c = this.currentFrame) == null ? void 0 : _c.alt) || this.info.name || t("حركة العباية", "Abaya motion"), frontSrc = this.mediaFront || this.displaySrc || this.placeholder || ((_d = this.frames[0]) == null ? void 0 : _d.image) || "", backSrc = this.mediaBack;
    return html`
      <div
        class=${classMap({
      "amm-stage": !0,
      "amm-stage--dragging": this.dragging,
      "amm-stage--static": !interactive,
      "amm-stage--playing": this.playing && mode === "sequence"
    })}
        @pointerdown=${this.onPointerDown}
      >
        ${mode === "video" && this.videoUrl ? html`<video
              class="amm-stage__media"
              src=${this.videoUrl}
              playsinline
              ?muted=${isTruthy((_e = this.config) == null ? void 0 : _e.amm_video_muted, !0) || this.autoplay}
              ?loop=${isTruthy((_f = this.config) == null ? void 0 : _f.amm_video_loop, !0)}
              poster=${this.poster || ""}
              preload="metadata"
              @loadedmetadata=${() => this.onVideoMeta()}
              @timeupdate=${() => this.onVideoTime()}
              @play=${() => {
      this.playing = !0;
    }}
              @pause=${() => {
      this.dragging || (this.playing = !1);
    }}
            ></video>` : html`
              ${backSrc ? html`<img
                    class=${classMap({
      "amm-stage__media": !0,
      "amm-stage__media--layer": !0,
      "amm-stage__media--front": !this.frontIsA,
      "amm-stage__media--back": this.frontIsA
    })}
                    src=${backSrc}
                    alt=""
                    aria-hidden="true"
                    decoding="async"
                  />` : nothing}
              <img
                class=${classMap({
      "amm-stage__media": !0,
      "amm-stage__media--layer": !0,
      "amm-stage__media--front": this.frontIsA,
      "amm-stage__media--back": !this.frontIsA
    })}
                src=${frontSrc}
                alt=${alt}
                decoding="async"
              />
            `}
        ${this.enableFs ? html`<button
              type="button"
              class="amm-fs-trigger"
              aria-label=${this.fullscreenOpen ? t("إنهاء ملء الشاشة", "Exit fullscreen") : t("ملء الشاشة", "Fullscreen")}
              @click=${(e) => {
      e.stopPropagation(), this.fullscreenOpen ? this.closeFullscreen() : this.openFullscreen();
    }}
              @pointerdown=${(e) => e.stopPropagation()}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                ${this.fullscreenOpen ? html`<path
                      fill="currentColor"
                      d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"
                    />` : html`<path
                      fill="currentColor"
                      d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
                    />`}
              </svg>
            </button>` : nothing}

        ${this.showHint && !this.hintHidden && interactive ? html`<p
              class=${classMap({
      "amm-hint": !0,
      "amm-hint--hidden": this.hintHidden
    })}
            >
              ${hint}
            </p>` : nothing}

        ${interactive ? this.renderStageNav() : nothing}

        ${mode === "sequence" ? this.renderCaption(this.currentFrame) : nothing}
      </div>
    `;
  }
  renderStageNav() {
    if (!this.showControls) return nothing;
    const label = this.mode === "sequence" ? `${this.frameIndex + 1} / ${this.frames.length}` : `${Math.floor(this.videoTime)}s / ${Math.floor(this.videoDuration || 0)}s`;
    return html`
      <div
        class="amm-stage-nav"
        dir="ltr"
        @pointerdown=${(e) => e.stopPropagation()}
      >
        <button
          type="button"
          class="amm-arrow"
          aria-label=${t("السابق", "Previous")}
          @click=${() => this.step(-1)}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
              fill="currentColor"
              d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"
            />
          </svg>
        </button>
        ${this.showFrameNum ? html`<span class="amm-stage-nav__count" aria-live="polite"
              >${label}</span
            >` : nothing}
        <button
          type="button"
          class="amm-arrow"
          aria-label=${t("التالي", "Next")}
          @click=${() => this.step(1)}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
              fill="currentColor"
              d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z"
            />
          </svg>
        </button>
      </div>
    `;
  }
  renderControls() {
    return this.showProgress ? (this.mode === "sequence" ? this.interactiveSequence : !!this.videoDuration) ? html`
      <div class="amm-controls">
        <div class="amm-progress-wrap">
          <div
            class="amm-progress"
            role="slider"
            tabindex="0"
            aria-valuemin="0"
            aria-valuemax=${this.progressMax()}
            aria-valuenow=${this.progressNow()}
            aria-label=${t("شريط التقدم", "Progress")}
            @keydown=${this.onProgressKey}
            @pointerdown=${this.onProgressPointer}
          >
            <div class="amm-progress__track">
              <span class="amm-progress__fill"></span>
            </div>
          </div>
        </div>
      </div>
    ` : nothing : nothing;
  }
  renderPanel() {
    if (!this.showPanel) return nothing;
    const info = this.info;
    return !(info.name || info.desc || info.fabric || info.cut || info.sleeves || info.product_url) && !info.meters.length ? nothing : html`
      <aside class="amm-panel" aria-label=${t("معلومات العباية", "Abaya details")}>
        ${info.name ? html`<h3 class="amm-panel__name">${info.name}</h3>` : nothing}
        ${info.desc ? html`<p class="amm-panel__desc">${info.desc}</p>` : nothing}
        <div class="amm-meta">
          ${info.fabric ? html`<div class="amm-meta__row">
                <span class="amm-meta__label">${t("الخامة", "Fabric")}</span>
                <span class="amm-meta__value">${info.fabric}</span>
              </div>` : nothing}
          ${info.cut ? html`<div class="amm-meta__row">
                <span class="amm-meta__label">${t("القصة", "Cut")}</span>
                <span class="amm-meta__value">${info.cut}</span>
              </div>` : nothing}
          ${info.sleeves ? html`<div class="amm-meta__row">
                <span class="amm-meta__label">${t("الأكمام", "Sleeves")}</span>
                <span class="amm-meta__value">${info.sleeves}</span>
              </div>` : nothing}
        </div>
        ${info.meters.length ? html`<div
              class="amm-meters"
              aria-label=${t("مستويات الخصائص", "Characteristic levels")}
            >
              ${info.meters.map((m) => this.renderMeter(m.name, m.value))}
            </div>` : nothing}
        ${isValidHref(info.product_url) ? html`<a class="fs-btn" href=${info.product_url}>
              ${info.product_btn || t("عرض المنتج", "View product")}
            </a>` : nothing}
      </aside>
    `;
  }
  renderViewerBlock() {
    return html`
      <div class="amm-viewer">
        ${this.renderStage()}
        ${this.renderControls()}
      </div>
    `;
  }
  render() {
    if (!this.hasContent) return nothing;
    const c = this.config || {}, animate = readSectionTheme(c, "amm_").animate && !prefersReducedMotion(), panelSide = parsePanelSide(c.amm_panel_side), title = localizedString(c.amm_title), sectionDesc = localizedString(c.amm_section_desc), shellClass = {
      "amm-shell": !0,
      "amm-shell--side": this.showPanel && panelSide !== "bottom",
      "amm-shell--side-left": this.showPanel && panelSide === "left"
    }, body = html`
      <div class=${classMap(shellClass)}>
        ${this.renderViewerBlock()}
        ${this.renderPanel()}
      </div>
    `;
    return html`
      <section
        class=${classMap({
      "fs-section": !0,
      "fs-animate": animate
    })}
        style=${styleMap(this.designVars())}
        aria-label=${title || t("مرآة حركة العباية", "Abaya motion mirror")}
      >
        <div class="fs-container">
          ${title || sectionDesc ? html`<header class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${sectionDesc ? html`<p class="fs-desc">${sectionDesc}</p>` : nothing}
              </header>` : nothing}
          ${body}
        </div>
        ${renderCommerceOutcome(this.config || {}, "amm_")}
      </section>
    `;
  }
};
__name(_AbayaMotionMirror, "AbayaMotionMirror"), _AbayaMotionMirror.styles = [
  sharedSectionCss,
  componentStyles,
  css`
      :host {
        direction: inherit;
      }
    `
];
let AbayaMotionMirror = _AbayaMotionMirror;
__decorateClass([
  property({ type: Object })
], AbayaMotionMirror.prototype, "config");
__decorateClass([
  state()
], AbayaMotionMirror.prototype, "frameIndex");
__decorateClass([
  state()
], AbayaMotionMirror.prototype, "displaySrc");
__decorateClass([
  state()
], AbayaMotionMirror.prototype, "playing");
__decorateClass([
  state()
], AbayaMotionMirror.prototype, "dragging");
__decorateClass([
  state()
], AbayaMotionMirror.prototype, "hintHidden");
__decorateClass([
  state()
], AbayaMotionMirror.prototype, "inView");
__decorateClass([
  state()
], AbayaMotionMirror.prototype, "videoTime");
__decorateClass([
  state()
], AbayaMotionMirror.prototype, "videoDuration");
__decorateClass([
  state()
], AbayaMotionMirror.prototype, "fullscreenOpen");
__decorateClass([
  state()
], AbayaMotionMirror.prototype, "framesReady");
__decorateClass([
  state()
], AbayaMotionMirror.prototype, "mediaFront");
__decorateClass([
  state()
], AbayaMotionMirror.prototype, "mediaBack");
__decorateClass([
  state()
], AbayaMotionMirror.prototype, "frontIsA");
__decorateClass([
  query(".amm-stage")
], AbayaMotionMirror.prototype, "stageEl");
__decorateClass([
  query("video.amm-stage__media")
], AbayaMotionMirror.prototype, "videoEl");
__decorateClass([
  query(".amm-fs-trigger")
], AbayaMotionMirror.prototype, "fsTrigger");
typeof AbayaMotionMirror < "u" && AbayaMotionMirror.registerSallaComponent("salla-abaya-motion-mirror");
export {
  AbayaMotionMirror as default
};
