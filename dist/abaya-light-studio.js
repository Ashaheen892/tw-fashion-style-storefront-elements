var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, nothing, html } from "lit";
import { property, state, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { n as normalizeCollection, e as extractImageUrl, l as localizedString, d as extractLink, q as getUnitValue, i as isTruthy, f as toNumber, o as getRadioValue, s as sharedSectionCss, r as readSectionTheme, a as themeStyleMap, t, v as isValidHref, p as prefersReducedMotion, b as renderCommerceOutcome } from "./sharedStyles-Q5qADHV9.js";
const componentStyles = css`
  .als-shell {
    display: grid;
    gap: 1.5rem;
  }

  @media (min-width: 960px) {
    .als-shell {
      grid-template-columns: minmax(0, 1.35fr) minmax(280px, 0.75fr);
      align-items: start;
      gap: 2rem;
    }
  }

  .als-viewer {
    display: grid;
    gap: 0.9rem;
    min-width: 0;
  }

  .als-stage-wrap {
    position: relative;
    width: 100%;
    max-width: var(--als-max-width, 720px);
    margin-inline: auto;
  }

  .als-stage {
    position: relative;
    width: 100%;
    aspect-ratio: var(--als-aspect, 3 / 4);
    max-height: min(40rem, 76vh);
    overflow: hidden;
    border-radius: var(--section-radius, 16px);
    border: 1px solid var(--border-color, #e8ddd6);
    background: var(--als-stage-bg, #1a1614);
    box-shadow: var(--als-shadow, 0 12px 36px rgba(43, 33, 28, 0.1));
    touch-action: pan-y;
    user-select: none;
    cursor: crosshair;
  }

  .als-stage--panning {
    cursor: grab;
    touch-action: none;
  }

  .als-stage--panning.als-stage--dragging {
    cursor: grabbing;
  }

  .als-stage__img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
    transform-origin: center center;
    transition: opacity 0.28s ease;
    will-change: transform;
  }

  .als-stage__img--fade {
    opacity: 0.35;
  }

  .als-lens {
    position: absolute;
    z-index: 4;
    width: 9rem;
    height: 9rem;
    border-radius: 50%;
    border: 2px solid color-mix(in srgb, #fff 80%, transparent);
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.35);
    pointer-events: none;
    background-repeat: no-repeat;
    display: none;
  }

  .als-lens--on {
    display: block;
  }

  .als-caption {
    display: grid;
    gap: 0.75rem;
    padding: 0.85rem 1rem;
    border-radius: calc(var(--section-radius, 16px) * 0.75);
    border: 1px solid var(--border-color, #e8ddd6);
    background: color-mix(in srgb, var(--card-bg, #fff) 92%, var(--section-bg, #faf7f5));
  }

  @media (min-width: 640px) {
    .als-caption {
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: center;
      gap: 1rem;
    }
  }

  .als-caption__text {
    min-width: 0;
  }

  .als-caption__name {
    margin: 0 0 0.2rem;
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--text-color, #2b211c);
    line-height: 1.35;
  }

  .als-caption__desc {
    margin: 0;
    font-size: 0.86rem;
    line-height: 1.6;
    color: var(--muted-color, #7a6a62);
  }

  .als-tools {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    align-items: center;
    justify-content: flex-end;
  }

  .als-tools__group {
    display: inline-flex;
    gap: 0.3rem;
    padding: 0.2rem;
    border-radius: calc(var(--section-radius, 16px) * 0.45);
    background: color-mix(in srgb, var(--border-color, #e8ddd6) 35%, transparent);
  }

  .als-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    min-width: 44px;
    min-height: 44px;
    padding: 0.45rem 0.95rem;
    border: 1.5px solid var(--border-color, #e8ddd6);
    border-radius: 999px;
    background: var(--card-bg, #fff);
    color: var(--text-color, #2b211c);
    font: inherit;
    font-size: 0.9rem;
    font-weight: 700;
    line-height: 1.2;
    cursor: pointer;
    text-decoration: none;
    transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease, filter 0.2s ease, box-shadow 0.2s ease;
  }

  .als-btn:hover {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, var(--border-color, #e8ddd6));
    transform: translateY(-1px);
  }

  .als-btn:focus-visible {
    outline: 2px solid var(--accent-color, var(--fs-store-primary));
    outline-offset: 2px;
  }

  .als-btn--primary {
    background: var(--button-bg, var(--fs-store-primary));
    color: var(--button-color, #fff);
    border-color: transparent;
    box-shadow: 0 6px 16px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 24%, transparent);
  }

  .als-btn--accent {
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, #fff);
    color: var(--accent-color, var(--fs-store-primary));
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 35%, var(--border-color, #e8ddd6));
  }

  .als-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .als-panel {
    display: grid;
    gap: 1.15rem;
    padding: 1.2rem 1.1rem 1.3rem;
    border-radius: var(--section-radius, 16px);
    border: 1px solid var(--border-color, #e8ddd6);
    background: var(--als-panel-bg, var(--card-bg, #fff));
    box-shadow: 0 8px 24px rgba(43, 33, 28, 0.04);
    min-width: 0;
  }

  .als-block {
    display: grid;
    gap: 0.7rem;
  }

  .als-block__title {
    margin: 0;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--muted-color, #7a6a62);
  }

  .als-modes {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(5.75rem, 1fr));
    gap: 0.6rem;
  }

  .als-mode {
    display: grid;
    gap: 0.4rem;
    justify-items: center;
    padding: 0.4rem;
    border: 1px solid var(--als-thumb-border, var(--border-color, #e8ddd6));
    border-radius: calc(var(--section-radius, 16px) * 0.45);
    background: color-mix(in srgb, var(--section-bg, #faf7f5) 65%, #fff);
    color: inherit;
    font: inherit;
    cursor: pointer;
    text-align: center;
    min-height: 44px;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
  }

  .als-mode:hover {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 40%, var(--border-color, #e8ddd6));
  }

  .als-mode--active,
  .als-mode[aria-pressed='true'] {
    border-color: var(--accent-color, var(--fs-store-primary));
    box-shadow: 0 0 0 1px var(--accent-color, var(--fs-store-primary));
    background: var(--fs-surface, var(--card-bg, #f0f0f0));
  }

  .als-mode__thumb {
    width: 100%;
    aspect-ratio: 3 / 4;
    object-fit: cover;
    border-radius: calc(var(--section-radius, 16px) * 0.32);
    display: block;
    background: #ddd;
  }

  .als-mode__name {
    font-size: 0.72rem;
    font-weight: 700;
    line-height: 1.3;
    color: var(--text-color, #2b211c);
  }

  .als-info {
    display: grid;
    gap: 1rem;
  }

  .als-info__meta {
    display: grid;
    gap: 0.75rem;
  }

  .als-info__label {
    display: block;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--muted-color, #7a6a62);
    margin-bottom: 0.2rem;
  }

  .als-info__value {
    margin: 0;
    font-size: 0.92rem;
    font-weight: 600;
    color: var(--text-color, #2b211c);
    line-height: 1.6;
  }

  .als-info__cta {
    width: 100%;
    justify-content: center;
  }

  .als-metrics {
    display: grid;
    gap: 0.7rem;
  }

  .als-metric__head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 0.5rem;
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 0.3rem;
    color: var(--text-color, #2b211c);
  }

  .als-metric__val {
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  .als-metric__bar {
    height: 0.35rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #e8ddd6) 80%, transparent);
    overflow: hidden;
  }

  .als-metric__bar > span {
    display: block;
    height: 100%;
    width: 0;
    background: linear-gradient(
      90deg,
      color-mix(in srgb, var(--als-meter-color, var(--accent-color, var(--fs-store-primary))) 75%, #fff),
      var(--als-meter-color, var(--accent-color, var(--fs-store-primary)))
    );
    border-radius: inherit;
    transition: width 0.45s ease;
  }

  .als-metric__level {
    margin-inline-start: 0.35rem;
    color: var(--muted-color, #7a6a62);
    font-weight: 500;
    font-size: 0.72rem;
  }

  .als-panel .fs-btn {
    width: 100%;
    justify-content: center;
  }

  .als-accordion {
    border: 1px solid var(--border-color, #e8ddd6);
    border-radius: calc(var(--section-radius, 16px) * 0.5);
    overflow: hidden;
  }

  .als-accordion__trigger {
    width: 100%;
    min-height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.75rem 0.95rem;
    border: none;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 7%, var(--card-bg, #fff));
    color: var(--text-color, #2b211c);
    font: inherit;
    font-weight: 700;
    font-size: 0.9rem;
    cursor: pointer;
    text-align: start;
  }

  .als-accordion__body {
    padding: 0.85rem 0.95rem 1rem;
    display: grid;
    gap: 0.75rem;
    border-top: 1px solid var(--border-color, #e8ddd6);
  }

  .als-compare-bar {
    display: grid;
    gap: 0.65rem;
  }

  @media (min-width: 640px) {
    .als-compare-bar {
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: end;
      gap: 0.75rem;
    }
  }

  .als-compare-pick {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.6rem;
  }

  .als-compare-pick label {
    display: grid;
    gap: 0.35rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--muted-color, #7a6a62);
  }

  .als-compare-pick select {
    min-height: 44px;
    padding: 0.5rem 0.7rem;
    border-radius: calc(var(--section-radius, 16px) * 0.4);
    border: 1px solid var(--border-color, #e8ddd6);
    background: var(--card-bg, #fff);
    color: var(--text-color, #2b211c);
    font: inherit;
    font-weight: 600;
  }

  .als-compare {
    position: relative;
    width: 100%;
    aspect-ratio: var(--als-aspect, 3 / 4);
    max-height: min(40rem, 76vh);
    overflow: hidden;
    border-radius: var(--section-radius, 16px);
    border: 1px solid var(--border-color, #e8ddd6);
    background: #111;
    touch-action: none;
    user-select: none;
    -webkit-user-select: none;
    cursor: col-resize;
    direction: ltr;
    box-shadow: var(--als-shadow, 0 12px 36px rgba(43, 33, 28, 0.1));
  }

  .als-compare--dragging {
    cursor: grabbing;
  }

  .als-compare__layer {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    pointer-events: none;
    -webkit-user-drag: none;
  }

  .als-compare__top {
    clip-path: inset(0 calc(100% - var(--als-compare, 50%)) 0 0);
  }

  .als-compare__label {
    position: absolute;
    top: 0.75rem;
    z-index: 3;
    padding: 0.35rem 0.65rem;
    border-radius: 999px;
    background: color-mix(in srgb, #000 52%, transparent);
    color: #fff;
    font-size: 0.72rem;
    font-weight: 700;
    pointer-events: none;
    backdrop-filter: blur(4px);
  }

  .als-compare__label--a {
    left: 0.75rem;
  }

  .als-compare__label--b {
    right: 0.75rem;
  }

  .als-compare__handle {
    position: absolute;
    top: 0;
    bottom: 0;
    left: var(--als-compare, 50%);
    width: 2px;
    transform: translateX(-50%);
    background: var(--als-handle-color, #fff);
    z-index: 4;
    pointer-events: none;
  }

  .als-compare__hit {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 48px;
    transform: translateX(-50%);
    pointer-events: none;
  }

  .als-compare__knob {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2.75rem;
    height: 2.75rem;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    border: 2px solid #fff;
    background: var(--als-handle-color, var(--accent-color, var(--fs-store-primary)));
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
    pointer-events: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .als-stage__img,
    .als-metric__bar > span,
    .als-mode {
      transition: none;
    }
  }

  @media (max-width: 959px) {
    .als-shell {
      grid-template-columns: 1fr;
      gap: 1.15rem;
    }

    .als-stage,
    .als-compare {
      max-height: min(26rem, 58vh);
    }

    .als-modes {
      display: flex;
      flex-wrap: nowrap;
      overflow-x: auto;
      gap: 0.55rem;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior-x: contain;
      padding-bottom: 0.25rem;
      scroll-snap-type: x proximity;
    }

    .als-mode {
      flex: 0 0 5.5rem;
      scroll-snap-align: start;
    }

    .als-caption {
      padding: 0.8rem 0.85rem;
    }

    .als-tools {
      justify-content: stretch;
    }

    .als-tools__group {
      flex: 1;
      justify-content: space-between;
    }

    .als-btn {
      flex: 1;
      min-width: 0;
    }

    .als-lens {
      display: none !important;
    }

    .als-desktop-only {
      display: none !important;
    }

    .als-panel {
      padding: 1rem 0.9rem 1.1rem;
    }
  }

  @media (min-width: 960px) {
    .als-mobile-only {
      display: none !important;
    }
  }
`, ZOOM_LEVELS = [1.5, 2, 2.5, 3];
function parseAspectRatio(raw) {
  const val = getRadioValue(raw, "3/4").replace(/\s/g, "");
  return val === "1/1" || val === "4/5" || val === "16/9" || val === "3/4" ? val : "3/4";
}
__name(parseAspectRatio, "parseAspectRatio");
function parseZoomLevel(raw) {
  const n = toNumber(getRadioValue(raw, "2") || raw, 2);
  return ZOOM_LEVELS.includes(n) ? n : 2;
}
__name(parseZoomLevel, "parseZoomLevel");
function clampPct(n) {
  return Math.max(0, Math.min(100, n));
}
__name(clampPct, "clampPct");
function parseLightModes(raw) {
  return normalizeCollection(raw).map((item, index) => {
    const image = extractImageUrl(item.image) || String(item.image || "").trim(), thumb = extractImageUrl(item.thumb) || extractImageUrl(item.thumbnail) || image, name = localizedString(item.name).trim();
    return {
      index,
      name: name || `Mode ${index + 1}`,
      desc: localizedString(item.desc).trim(),
      image,
      thumb,
      alt: localizedString(item.alt).trim() || name || `Lighting mode ${index + 1}`,
      is_default: isTruthy(item.is_default, !1),
      shine: clampPct(getUnitValue(item.shine, 50)),
      embroidery: clampPct(getUnitValue(item.embroidery, 50)),
      color_depth: clampPct(getUnitValue(item.color_depth, 50)),
      flow: clampPct(getUnitValue(item.flow, 50)),
      transparency: clampPct(getUnitValue(item.transparency, 20)),
      day_fit: clampPct(getUnitValue(item.day_fit, 50)),
      night_fit: clampPct(getUnitValue(item.night_fit, 50)),
      color_name: localizedString(item.color_name).trim(),
      notes: localizedString(item.notes).trim(),
      product_url: extractLink(item.product_url),
      btn_text: localizedString(item.btn_text).trim()
    };
  }).filter((m) => !!m.image);
}
__name(parseLightModes, "parseLightModes");
function resolveDefaultIndex(modes) {
  if (!modes.length) return 0;
  const flagged = modes.find((m) => m.is_default);
  return flagged ? flagged.index : modes[0].index;
}
__name(resolveDefaultIndex, "resolveDefaultIndex");
function metricsForMode(mode) {
  return [
    { key: "shine", labelAr: "اللمعان", labelEn: "Shine", value: mode.shine },
    {
      key: "embroidery",
      labelAr: "وضوح التطريز",
      labelEn: "Embroidery clarity",
      value: mode.embroidery
    },
    {
      key: "color_depth",
      labelAr: "عمق اللون",
      labelEn: "Color depth",
      value: mode.color_depth
    },
    { key: "flow", labelAr: "الانسيابية", labelEn: "Flow", value: mode.flow },
    {
      key: "transparency",
      labelAr: "الشفافية",
      labelEn: "Transparency",
      value: mode.transparency
    },
    {
      key: "day_fit",
      labelAr: "ملاءمة النهار",
      labelEn: "Day suitability",
      value: mode.day_fit
    },
    {
      key: "night_fit",
      labelAr: "ملاءمة المساء",
      labelEn: "Evening suitability",
      value: mode.night_fit
    }
  ];
}
__name(metricsForMode, "metricsForMode");
function levelLabel(value) {
  return value < 34 ? { ar: "منخفض", en: "Low" } : value < 67 ? { ar: "متوسط", en: "Medium" } : { ar: "مرتفع", en: "High" };
}
__name(levelLabel, "levelLabel");
async function loadImageDecoded(src) {
  return src ? new Promise((resolve) => {
    const img = new Image();
    img.decoding = "async", img.onload = () => {
      typeof img.decode == "function" ? img.decode().then(() => resolve(!0)).catch(() => resolve(!0)) : resolve(!0);
    }, img.onerror = () => resolve(!1), img.src = src;
  }) : !1;
}
__name(loadImageDecoded, "loadImageDecoded");
function clampPan(value, scale, containerSize, imageSize) {
  if (scale <= 1) return 0;
  const max = (imageSize * scale - containerSize) / 2;
  return Math.max(-max, Math.min(max, value));
}
__name(clampPan, "clampPan");
function nextModeIndex(modes, currentIndex, delta) {
  if (modes.length < 2) return currentIndex;
  const positions = modes.map((m) => m.index), next = (positions.indexOf(currentIndex) + delta + positions.length) % positions.length;
  return positions[next];
}
__name(nextModeIndex, "nextModeIndex");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const _AbayaLightStudio = class _AbayaLightStudio extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.activeIndex = 0, this.displaySrc = "", this.fading = !1, this.zoom = 1, this.panX = 0, this.panY = 0, this.lensOn = !1, this.lensStyle = {}, this.compareOn = !1, this.compareA = 0, this.compareB = 1, this.comparePct = 50, this.notesOpen = !1, this.panning = !1, this.loadToken = 0, this.boundLang = () => this.requestUpdate(), this.pointerId = null, this.panStartX = 0, this.panStartY = 0, this.panOriginX = 0, this.panOriginY = 0, this.compareDragging = !1, this.isCoarse = !1, this.prefetchCache = /* @__PURE__ */ new Set(), this.onPanMove = (e) => {
      if (!this.panning || e.pointerId !== this.pointerId) return;
      const stage = this.stageEl;
      if (!stage) return;
      const rect = stage.getBoundingClientRect(), dx = e.clientX - this.panStartX, dy = e.clientY - this.panStartY;
      this.panX = clampPan(
        this.panOriginX + dx,
        this.zoom,
        rect.width,
        rect.width
      ), this.panY = clampPan(
        this.panOriginY + dy,
        this.zoom,
        rect.height,
        rect.height
      );
    }, this.onPanUp = (e) => {
      e.pointerId === this.pointerId && (this.panning = !1, this.pointerId = null, this.teardownPointers());
    }, this.onCompareMove = (e) => {
      !this.compareDragging || e.pointerId !== this.pointerId || (e.preventDefault(), this.updateCompareFromClientX(e.clientX));
    }, this.onCompareUp = (e) => {
      var _a;
      if (this.pointerId != null && e.pointerId !== this.pointerId) return;
      this.compareDragging = !1;
      const el = this.compareEl;
      if (this.pointerId != null)
        try {
          (_a = el == null ? void 0 : el.releasePointerCapture) == null || _a.call(el, this.pointerId);
        } catch {
        }
      this.pointerId = null, el == null || el.removeEventListener("pointermove", this.onCompareMove), el == null || el.removeEventListener("pointerup", this.onCompareUp), el == null || el.removeEventListener("pointercancel", this.onCompareUp), this.teardownPointers();
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLang), this.isCoarse = typeof window < "u" && window.matchMedia("(pointer: coarse)").matches, this.resetFromConfig();
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLang), this.teardownPointers(), super.disconnectedCallback();
  }
  updated(changed) {
    changed.has("config") && this.resetFromConfig(), this.style.display = this.modes.length ? "" : "none";
  }
  get modes() {
    var _a;
    return parseLightModes((_a = this.config) == null ? void 0 : _a.als_modes);
  }
  get active() {
    return this.modes.find((m) => m.index === this.activeIndex) || this.modes[0] || null;
  }
  get enableLens() {
    var _a;
    return isTruthy((_a = this.config) == null ? void 0 : _a.als_enable_lens, !0) && !this.isCoarse;
  }
  get enableZoomBtns() {
    var _a;
    return isTruthy((_a = this.config) == null ? void 0 : _a.als_enable_zoom_btns, !0);
  }
  get enableCompare() {
    var _a;
    return isTruthy((_a = this.config) == null ? void 0 : _a.als_enable_compare, !0) && this.modes.length >= 2;
  }
  get showMetrics() {
    var _a;
    return isTruthy((_a = this.config) == null ? void 0 : _a.als_show_metrics, !0);
  }
  get showColor() {
    var _a;
    return isTruthy((_a = this.config) == null ? void 0 : _a.als_show_color, !0);
  }
  get showNotes() {
    var _a;
    return isTruthy((_a = this.config) == null ? void 0 : _a.als_show_notes, !0);
  }
  get showProduct() {
    var _a;
    return isTruthy((_a = this.config) == null ? void 0 : _a.als_show_product, !0);
  }
  get lensZoom() {
    var _a;
    return parseZoomLevel((_a = this.config) == null ? void 0 : _a.als_lens_zoom);
  }
  get placeholder() {
    var _a;
    return String(((_a = this.config) == null ? void 0 : _a.als_placeholder) || "").trim();
  }
  resetFromConfig() {
    var _a;
    const modes = this.modes;
    if (!modes.length) {
      this.displaySrc = "";
      return;
    }
    const def = resolveDefaultIndex(modes);
    this.activeIndex = def, this.compareA = def, this.compareB = ((_a = modes.find((m) => m.index !== def)) == null ? void 0 : _a.index) ?? def, this.compareOn = !1, this.zoom = 1, this.panX = 0, this.panY = 0;
    const mode = modes.find((m) => m.index === def) || modes[0];
    this.displaySrc = mode.image, this.ensureImage(mode.image, !0);
    const next = nextModeIndex(modes, def, 1), nextMode = modes.find((m) => m.index === next);
    nextMode && this.prefetch(nextMode.image);
  }
  async prefetch(src) {
    !src || this.prefetchCache.has(src) || (this.prefetchCache.add(src), await loadImageDecoded(src));
  }
  async ensureImage(src, immediate = !1) {
    const token = ++this.loadToken;
    immediate || (this.fading = !0);
    const ok = await loadImageDecoded(src);
    return token !== this.loadToken ? !1 : ok ? (this.displaySrc = src, this.fading = !1, !0) : (this.fading = !1, this.placeholder && !this.displaySrc && (this.displaySrc = this.placeholder), !1);
  }
  async selectMode(index) {
    const mode = this.modes.find((m) => m.index === index);
    if (!mode || mode.index === this.activeIndex) return;
    this.activeIndex = index, this.zoom = 1, this.panX = 0, this.panY = 0, this.lensOn = !1, !await this.ensureImage(mode.image) && this.displaySrc;
    const next = nextModeIndex(this.modes, index, 1), nextMode = this.modes.find((m) => m.index === next);
    nextMode && this.prefetch(nextMode.image);
  }
  zoomIn() {
    this.zoom = Math.min(3, Number((this.zoom + 0.5).toFixed(1)));
  }
  zoomOut() {
    this.zoom = Math.max(1, Number((this.zoom - 0.5).toFixed(1))), this.zoom === 1 && (this.panX = 0, this.panY = 0);
  }
  resetZoom() {
    this.zoom = 1, this.panX = 0, this.panY = 0;
  }
  /* —— Lens (desktop) —— */
  onStageMove(e) {
    if (!this.enableLens || this.zoom > 1 || this.compareOn) {
      this.lensOn = !1;
      return;
    }
    const stage = this.stageEl, src = this.displaySrc;
    if (!stage || !src) return;
    const rect = stage.getBoundingClientRect(), x = e.clientX - rect.left, y = e.clientY - rect.top;
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
      this.lensOn = !1;
      return;
    }
    const size = 144, half = size / 2, left = Math.max(0, Math.min(rect.width - size, x - half)), top = Math.max(0, Math.min(rect.height - size, y - half)), zx = this.lensZoom, bgX = -(x * zx - half), bgY = -(y * zx - half);
    this.lensOn = !0, this.lensStyle = {
      left: `${left}px`,
      top: `${top}px`,
      backgroundImage: `url("${src}")`,
      backgroundSize: `${rect.width * zx}px ${rect.height * zx}px`,
      backgroundPosition: `${bgX}px ${bgY}px`
    };
  }
  onStageLeave() {
    this.lensOn = !1;
  }
  /* —— Mobile pan when zoomed —— */
  onPanDown(e) {
    var _a, _b;
    this.compareOn || this.zoom <= 1 || e.pointerType === "mouse" && this.enableLens || (this.panning = !0, this.pointerId = e.pointerId, this.panStartX = e.clientX, this.panStartY = e.clientY, this.panOriginX = this.panX, this.panOriginY = this.panY, (_b = (_a = this.stageEl) == null ? void 0 : _a.setPointerCapture) == null || _b.call(_a, e.pointerId), window.addEventListener("pointermove", this.onPanMove), window.addEventListener("pointerup", this.onPanUp), window.addEventListener("pointercancel", this.onPanUp));
  }
  teardownPointers() {
    window.removeEventListener("pointermove", this.onPanMove), window.removeEventListener("pointerup", this.onPanUp), window.removeEventListener("pointercancel", this.onPanUp), window.removeEventListener("pointermove", this.onCompareMove), window.removeEventListener("pointerup", this.onCompareUp), window.removeEventListener("pointercancel", this.onCompareUp);
  }
  /* —— Compare —— */
  enterCompare() {
    var _a;
    if (!this.enableCompare) return;
    const modes = this.modes;
    this.compareA = this.activeIndex, this.compareB = ((_a = modes.find((m) => m.index !== this.compareA)) == null ? void 0 : _a.index) ?? this.compareA, this.comparePct = 50, this.compareOn = !0, this.resetZoom();
    const a = modes.find((m) => m.index === this.compareA), b = modes.find((m) => m.index === this.compareB);
    a && this.prefetch(a.image), b && this.prefetch(b.image);
  }
  exitCompare() {
    this.compareOn = !1, this.compareDragging = !1, this.teardownPointers();
  }
  setCompareSide(side, index) {
    if (side === "a") {
      if (index === this.compareB) return;
      this.compareA = index;
    } else {
      if (index === this.compareA) return;
      this.compareB = index;
    }
  }
  onCompareDown(e) {
    var _a;
    if (e.button != null && e.button !== 0) return;
    e.preventDefault(), e.stopPropagation(), this.compareDragging = !0, this.pointerId = e.pointerId, this.updateCompareFromClientX(e.clientX);
    const el = this.compareEl;
    try {
      (_a = el == null ? void 0 : el.setPointerCapture) == null || _a.call(el, e.pointerId);
    } catch {
    }
    el == null || el.addEventListener("pointermove", this.onCompareMove), el == null || el.addEventListener("pointerup", this.onCompareUp), el == null || el.addEventListener("pointercancel", this.onCompareUp), window.addEventListener("pointermove", this.onCompareMove), window.addEventListener("pointerup", this.onCompareUp), window.addEventListener("pointercancel", this.onCompareUp);
  }
  /** Physical left→right mapping (matches clip-path / handle `left`). No RTL flip. */
  updateCompareFromClientX(clientX) {
    const el = this.compareEl;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (!rect.width) return;
    const ratio = (clientX - rect.left) / rect.width;
    this.comparePct = Math.max(0, Math.min(100, Math.round(ratio * 100)));
  }
  onCompareKey(e) {
    e.key === "ArrowRight" || e.key === "ArrowUp" ? (e.preventDefault(), this.comparePct = Math.min(100, this.comparePct + 2)) : e.key === "ArrowLeft" || e.key === "ArrowDown" ? (e.preventDefault(), this.comparePct = Math.max(0, this.comparePct - 2)) : e.key === "Home" ? (e.preventDefault(), this.comparePct = 0) : e.key === "End" && (e.preventDefault(), this.comparePct = 100);
  }
  designVars() {
    const c = this.config || {}, theme = readSectionTheme(c, "als_"), shadowLevel = Math.max(0, Math.min(3, getUnitValue(c.als_shadow, 1))), shadows = [
      "none",
      "0 10px 28px rgba(43, 33, 28, 0.08)",
      "0 16px 40px rgba(43, 33, 28, 0.12)",
      "0 22px 56px rgba(43, 33, 28, 0.18)"
    ];
    return {
      ...themeStyleMap(theme),
      "--als-stage-bg": String(c.als_stage_bg || "#1a1614"),
      "--als-panel-bg": String(c.als_panel_bg || theme.card),
      "--als-meter-color": String(c.als_meter_color || theme.accent),
      "--als-handle-color": String(c.als_handle_color || "#ffffff"),
      "--als-thumb-border": String(c.als_thumb_border || theme.border),
      "--als-shadow": shadows[shadowLevel] || shadows[1],
      "--als-aspect": parseAspectRatio(c.als_aspect),
      "--als-max-width": `${getUnitValue(c.als_max_width, 720)}px`,
      "--als-compare": `${this.comparePct}%`
    };
  }
  productUrl(mode) {
    var _a;
    return mode ? mode.product_url || extractLink((_a = this.config) == null ? void 0 : _a.als_product_url) : "";
  }
  productBtn(mode) {
    var _a;
    return (mode == null ? void 0 : mode.btn_text) || localizedString((_a = this.config) == null ? void 0 : _a.als_default_btn) || t("مشاهدة المنتج", "View product");
  }
  renderMetrics(mode) {
    return this.showMetrics ? html`
      <div class="als-metrics" aria-label=${t("مؤشرات الخامة", "Fabric metrics")}>
        ${metricsForMode(mode).map((m) => {
      const level = levelLabel(m.value);
      return html`
            <div class="als-metric">
              <div class="als-metric__head">
                <span>${t(m.labelAr, m.labelEn)}</span>
                <span class="als-metric__val">
                  ${Math.round(m.value)}
                  <span class="als-metric__level">${t(level.ar, level.en)}</span>
                </span>
              </div>
              <div class="als-metric__bar" aria-hidden="true">
                <span style=${styleMap({ width: `${m.value}%` })}></span>
              </div>
            </div>
          `;
    })}
      </div>
    ` : nothing;
  }
  renderModeButtons() {
    return html`
      <div class="als-block">
        <h3 class="als-block__title">
          ${t("أوضاع الإضاءة", "Lighting modes")}
        </h3>
        <div
          class="als-modes"
          role="listbox"
          aria-label=${t("أوضاع الإضاءة", "Lighting modes")}
        >
          ${this.modes.map((mode, i) => {
      const pressed = mode.index === this.activeIndex;
      return html`
              <button
                type="button"
                class=${classMap({
        "als-mode": !0,
        "als-mode--active": pressed
      })}
                role="option"
                aria-selected=${pressed ? "true" : "false"}
                aria-pressed=${pressed ? "true" : "false"}
                @click=${() => {
        this.compareOn && this.exitCompare(), this.selectMode(mode.index);
      }}
              >
                <img
                  class="als-mode__thumb"
                  src=${mode.thumb || mode.image}
                  alt=${mode.alt}
                  loading=${i === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
                <span class="als-mode__name">${mode.name}</span>
              </button>
            `;
    })}
        </div>
      </div>
    `;
  }
  renderInfoCard(mode) {
    const url = this.productUrl(mode), colorBlock = this.showColor && mode.color_name ? html`<div>
            <span class="als-info__label">${t("اللون", "Color")}</span>
            <p class="als-info__value">${mode.color_name}</p>
          </div>` : nothing, notesBlock = this.showNotes && mode.notes ? html`<div>
            <span class="als-info__label">${t("ملاحظات", "Notes")}</span>
            <p class="als-info__value">${mode.notes}</p>
          </div>` : nothing;
    return html`
      <div class="als-info">
        ${colorBlock || notesBlock ? html`<div class="als-info__meta">
              ${colorBlock}${notesBlock}
            </div>` : nothing}
        ${this.showMetrics ? html`<div class="als-block">
              <h3 class="als-block__title">
                ${t("مؤشرات الخامة", "Fabric metrics")}
              </h3>
              ${this.renderMetrics(mode)}
            </div>` : nothing}
        ${this.showProduct && isValidHref(url) ? html`<a class="fs-btn als-info__cta" href=${url}
              >${this.productBtn(mode)}</a
            >` : nothing}
      </div>
    `;
  }
  renderViewer(mode) {
    if (this.compareOn) {
      const a = this.modes.find((m) => m.index === this.compareA) || mode, b = this.modes.find((m) => m.index === this.compareB) || mode;
      return html`
        <div class="als-viewer">
          <div class="als-compare-bar">
            <div class="als-compare-pick">
              <label>
                <span>${t("الوضع الأول", "First mode")}</span>
                <select
                  .value=${String(this.compareA)}
                  @change=${(e) => this.setCompareSide(
        "a",
        Number(e.target.value)
      )}
                >
                  ${this.modes.map(
        (m) => html`<option
                      value=${m.index}
                      ?disabled=${m.index === this.compareB}
                    >
                      ${m.name}
                    </option>`
      )}
                </select>
              </label>
              <label>
                <span>${t("الوضع الثاني", "Second mode")}</span>
                <select
                  .value=${String(this.compareB)}
                  @change=${(e) => this.setCompareSide(
        "b",
        Number(e.target.value)
      )}
                >
                  ${this.modes.map(
        (m) => html`<option
                      value=${m.index}
                      ?disabled=${m.index === this.compareA}
                    >
                      ${m.name}
                    </option>`
      )}
                </select>
              </label>
            </div>
            <button
              type="button"
              class="als-btn"
              aria-label=${t("الخروج من المقارنة", "Exit compare")}
              @click=${() => this.exitCompare()}
            >
              ${t("إنهاء المقارنة", "End compare")}
            </button>
          </div>

          <div class="als-stage-wrap">
            <div
              class=${classMap({
        "als-compare": !0,
        "als-compare--dragging": this.compareDragging
      })}
              dir="ltr"
              role="slider"
              tabindex="0"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow=${this.comparePct}
              aria-label=${t("شريط المقارنة", "Compare slider")}
              style=${styleMap({ "--als-compare": `${this.comparePct}%` })}
              @pointerdown=${this.onCompareDown}
              @keydown=${this.onCompareKey}
            >
              <img
                class="als-compare__layer"
                src=${b.image}
                alt=${b.alt}
                draggable="false"
              />
              <img
                class="als-compare__layer als-compare__top"
                src=${a.image}
                alt=${a.alt}
                draggable="false"
              />
              <span class="als-compare__label als-compare__label--a"
                >${a.name}</span
              >
              <span class="als-compare__label als-compare__label--b"
                >${b.name}</span
              >
              <div class="als-compare__handle" aria-hidden="true">
                <span class="als-compare__hit"></span>
                <span class="als-compare__knob"></span>
              </div>
            </div>
          </div>
        </div>
      `;
    }
    const imgStyle = {
      transform: `translate(${this.panX}px, ${this.panY}px) scale(${this.zoom})`
    };
    return html`
      <div class="als-viewer">
        <div class="als-stage-wrap">
          <div
            class=${classMap({
      "als-stage": !0,
      "als-stage--panning": this.zoom > 1,
      "als-stage--dragging": this.panning
    })}
            @pointermove=${(e) => this.onStageMove(e)}
            @pointerleave=${() => this.onStageLeave()}
            @pointerdown=${this.onPanDown}
          >
            ${this.displaySrc ? html`<img
                  class=${classMap({
      "als-stage__img": !0,
      "als-stage__img--fade": this.fading && !prefersReducedMotion()
    })}
                  style=${styleMap(imgStyle)}
                  src=${this.displaySrc}
                  alt=${mode.alt}
                  decoding="async"
                />` : nothing}
            ${this.enableLens ? html`<div
                  class=${classMap({
      "als-lens": !0,
      "als-lens--on": this.lensOn,
      "als-desktop-only": !0
    })}
                  style=${styleMap(this.lensStyle)}
                  aria-hidden="true"
                ></div>` : nothing}
          </div>
        </div>

        <div class="als-caption" aria-live="polite">
          <div class="als-caption__text">
            <p class="als-caption__name">${mode.name}</p>
            ${mode.desc ? html`<p class="als-caption__desc">${mode.desc}</p>` : nothing}
          </div>
          <div class="als-tools">
            ${this.enableZoomBtns ? html`
                  <div class="als-tools__group" role="group" aria-label=${t("التكبير", "Zoom")}>
                    <button
                      type="button"
                      class="als-btn"
                      aria-label=${t("تكبير", "Zoom in")}
                      @click=${() => this.zoomIn()}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      class="als-btn"
                      aria-label=${t("تصغير", "Zoom out")}
                      ?disabled=${this.zoom <= 1}
                      @click=${() => this.zoomOut()}
                    >
                      −
                    </button>
                    <button
                      type="button"
                      class="als-btn"
                      aria-label=${t("إعادة ضبط التكبير", "Reset zoom")}
                      @click=${() => this.resetZoom()}
                    >
                      ${t("ضبط", "Reset")}
                    </button>
                  </div>
                ` : nothing}
            ${this.enableCompare ? html`<button
                  type="button"
                  class="als-btn als-btn--primary"
                  aria-label=${t("وضع المقارنة", "Compare mode")}
                  @click=${() => this.enterCompare()}
                >
                  ${t("مقارنة", "Compare")}
                </button>` : nothing}
            ${this.showProduct && isValidHref(this.productUrl(mode)) ? html`<a
                  class="als-btn als-btn--accent"
                  href=${this.productUrl(mode)}
                >
                  ${this.productBtn(mode)}
                </a>` : nothing}
          </div>
        </div>
      </div>
    `;
  }
  renderPanel(mode) {
    return html`
      <aside
        class="als-panel"
        aria-label=${t("لوحة التحكم", "Control panel")}
      >
        ${this.renderModeButtons()}

        <div class="als-mobile-only">
          <div class="als-accordion">
            <button
              type="button"
              class="als-accordion__trigger"
              aria-expanded=${this.notesOpen ? "true" : "false"}
              @click=${() => {
      this.notesOpen = !this.notesOpen;
    }}
            >
              <span>${t("التفاصيل والملاحظات", "Details & notes")}</span>
              <span aria-hidden="true">${this.notesOpen ? "−" : "+"}</span>
            </button>
            ${this.notesOpen ? html`<div class="als-accordion__body">
                  ${this.renderInfoCard(mode)}
                </div>` : nothing}
          </div>
        </div>

        <div class="als-desktop-only">${this.renderInfoCard(mode)}</div>
      </aside>
    `;
  }
  render() {
    if (!this.modes.length) return nothing;
    const mode = this.active;
    if (!mode) return nothing;
    const c = this.config || {}, animate = readSectionTheme(c, "als_").animate && !prefersReducedMotion(), full = isTruthy(c.als_full_width, !1), title = localizedString(c.als_title), desc = localizedString(c.als_desc);
    return html`
      <section
        class=${classMap({
      "fs-section": !0,
      "fs-section--full": full,
      "fs-animate": animate
    })}
        style=${styleMap(this.designVars())}
        aria-label=${title || t("استوديو الإضاءة والخامة", "Light & fabric studio")}
      >
        <div class="fs-container">
          ${title || desc ? html`<header class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </header>` : nothing}

          <div class="als-shell">
            ${this.renderViewer(mode)}
            ${this.renderPanel(mode)}
          </div>
        </div>
        ${renderCommerceOutcome(this.config || {}, "als_")}
      </section>
    `;
  }
};
__name(_AbayaLightStudio, "AbayaLightStudio"), _AbayaLightStudio.styles = [
  sharedSectionCss,
  componentStyles,
  css`
      :host {
        direction: inherit;
      }
    `
];
let AbayaLightStudio = _AbayaLightStudio;
__decorateClass([
  property({ type: Object })
], AbayaLightStudio.prototype, "config");
__decorateClass([
  state()
], AbayaLightStudio.prototype, "activeIndex");
__decorateClass([
  state()
], AbayaLightStudio.prototype, "displaySrc");
__decorateClass([
  state()
], AbayaLightStudio.prototype, "fading");
__decorateClass([
  state()
], AbayaLightStudio.prototype, "zoom");
__decorateClass([
  state()
], AbayaLightStudio.prototype, "panX");
__decorateClass([
  state()
], AbayaLightStudio.prototype, "panY");
__decorateClass([
  state()
], AbayaLightStudio.prototype, "lensOn");
__decorateClass([
  state()
], AbayaLightStudio.prototype, "lensStyle");
__decorateClass([
  state()
], AbayaLightStudio.prototype, "compareOn");
__decorateClass([
  state()
], AbayaLightStudio.prototype, "compareA");
__decorateClass([
  state()
], AbayaLightStudio.prototype, "compareB");
__decorateClass([
  state()
], AbayaLightStudio.prototype, "comparePct");
__decorateClass([
  state()
], AbayaLightStudio.prototype, "notesOpen");
__decorateClass([
  state()
], AbayaLightStudio.prototype, "panning");
__decorateClass([
  query(".als-stage")
], AbayaLightStudio.prototype, "stageEl");
__decorateClass([
  query(".als-compare")
], AbayaLightStudio.prototype, "compareEl");
typeof AbayaLightStudio < "u" && AbayaLightStudio.registerSallaComponent("salla-abaya-light-studio");
export {
  AbayaLightStudio as default
};
