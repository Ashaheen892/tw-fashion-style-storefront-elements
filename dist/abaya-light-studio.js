import { css as P, LitElement as D, nothing as d, html as i } from "lit";
import { property as Y, state as m, query as I } from "lit/decorators.js";
import { classMap as _ } from "lit/directives/class-map.js";
import { styleMap as x } from "lit/directives/style-map.js";
import { n as j, e as w, l as u, d as L, q as f, i as g, f as F, o as O, s as Z, r as k, a as R, t as n, v as C, p as M, b as V } from "./sharedStyles-Cd7RKVf-.js";
const N = P`
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
`, T = [1.5, 2, 2.5, 3];
function q(o) {
  const e = O(o, "3/4").replace(/\s/g, "");
  return e === "1/1" || e === "4/5" || e === "16/9" || e === "3/4" ? e : "3/4";
}
function H(o) {
  const e = F(O(o, "2") || o, 2);
  return T.includes(e) ? e : 2;
}
function v(o) {
  return Math.max(0, Math.min(100, o));
}
function K(o) {
  return j(o).map((e, t) => {
    const a = w(e.image) || String(e.image || "").trim(), r = w(e.thumb) || w(e.thumbnail) || a, s = u(e.name).trim();
    return {
      index: t,
      name: s || `Mode ${t + 1}`,
      desc: u(e.desc).trim(),
      image: a,
      thumb: r,
      alt: u(e.alt).trim() || s || `Lighting mode ${t + 1}`,
      is_default: g(e.is_default, !1),
      shine: v(f(e.shine, 50)),
      embroidery: v(f(e.embroidery, 50)),
      color_depth: v(f(e.color_depth, 50)),
      flow: v(f(e.flow, 50)),
      transparency: v(f(e.transparency, 20)),
      day_fit: v(f(e.day_fit, 50)),
      night_fit: v(f(e.night_fit, 50)),
      color_name: u(e.color_name).trim(),
      notes: u(e.notes).trim(),
      product_url: L(e.product_url),
      btn_text: u(e.btn_text).trim()
    };
  }).filter((e) => !!e.image);
}
function G(o) {
  if (!o.length) return 0;
  const e = o.find((t) => t.is_default);
  return e ? e.index : o[0].index;
}
function J(o) {
  return [
    { key: "shine", labelAr: "اللمعان", labelEn: "Shine", value: o.shine },
    {
      key: "embroidery",
      labelAr: "وضوح التطريز",
      labelEn: "Embroidery clarity",
      value: o.embroidery
    },
    {
      key: "color_depth",
      labelAr: "عمق اللون",
      labelEn: "Color depth",
      value: o.color_depth
    },
    { key: "flow", labelAr: "الانسيابية", labelEn: "Flow", value: o.flow },
    {
      key: "transparency",
      labelAr: "الشفافية",
      labelEn: "Transparency",
      value: o.transparency
    },
    {
      key: "day_fit",
      labelAr: "ملاءمة النهار",
      labelEn: "Day suitability",
      value: o.day_fit
    },
    {
      key: "night_fit",
      labelAr: "ملاءمة المساء",
      labelEn: "Evening suitability",
      value: o.night_fit
    }
  ];
}
function Q(o) {
  return o < 34 ? { ar: "منخفض", en: "Low" } : o < 67 ? { ar: "متوسط", en: "Medium" } : { ar: "مرتفع", en: "High" };
}
async function S(o) {
  return o ? new Promise((e) => {
    const t = new Image();
    t.decoding = "async", t.onload = () => {
      typeof t.decode == "function" ? t.decode().then(() => e(!0)).catch(() => e(!0)) : e(!0);
    }, t.onerror = () => e(!1), t.src = o;
  }) : !1;
}
function z(o, e, t, a) {
  if (e <= 1) return 0;
  const r = (a * e - t) / 2;
  return Math.max(-r, Math.min(r, o));
}
function E(o, e, t) {
  if (o.length < 2) return e;
  const a = o.map((c) => c.index), s = (a.indexOf(e) + t + a.length) % a.length;
  return a[s];
}
var W = Object.defineProperty, p = (o, e, t, a) => {
  for (var r = void 0, s = o.length - 1, c; s >= 0; s--)
    (c = o[s]) && (r = c(e, t, r) || r);
  return r && W(e, t, r), r;
};
const $ = class $ extends D {
  constructor() {
    super(...arguments), this.config = {}, this.activeIndex = 0, this.displaySrc = "", this.fading = !1, this.zoom = 1, this.panX = 0, this.panY = 0, this.lensOn = !1, this.lensStyle = {}, this.compareOn = !1, this.compareA = 0, this.compareB = 1, this.comparePct = 50, this.notesOpen = !1, this.panning = !1, this.loadToken = 0, this.boundLang = () => this.requestUpdate(), this.pointerId = null, this.panStartX = 0, this.panStartY = 0, this.panOriginX = 0, this.panOriginY = 0, this.compareDragging = !1, this.isCoarse = !1, this.prefetchCache = /* @__PURE__ */ new Set(), this.onPanMove = (e) => {
      if (!this.panning || e.pointerId !== this.pointerId) return;
      const t = this.stageEl;
      if (!t) return;
      const a = t.getBoundingClientRect(), r = e.clientX - this.panStartX, s = e.clientY - this.panStartY;
      this.panX = z(
        this.panOriginX + r,
        this.zoom,
        a.width,
        a.width
      ), this.panY = z(
        this.panOriginY + s,
        this.zoom,
        a.height,
        a.height
      );
    }, this.onPanUp = (e) => {
      e.pointerId === this.pointerId && (this.panning = !1, this.pointerId = null, this.teardownPointers());
    }, this.onCompareMove = (e) => {
      !this.compareDragging || e.pointerId !== this.pointerId || (e.preventDefault(), this.updateCompareFromClientX(e.clientX));
    }, this.onCompareUp = (e) => {
      var a;
      if (this.pointerId != null && e.pointerId !== this.pointerId) return;
      this.compareDragging = !1;
      const t = this.compareEl;
      if (this.pointerId != null)
        try {
          (a = t == null ? void 0 : t.releasePointerCapture) == null || a.call(t, this.pointerId);
        } catch {
        }
      this.pointerId = null, t == null || t.removeEventListener("pointermove", this.onCompareMove), t == null || t.removeEventListener("pointerup", this.onCompareUp), t == null || t.removeEventListener("pointercancel", this.onCompareUp), this.teardownPointers();
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLang), this.isCoarse = typeof window < "u" && window.matchMedia("(pointer: coarse)").matches, this.resetFromConfig();
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLang), this.teardownPointers(), super.disconnectedCallback();
  }
  updated(e) {
    e.has("config") && this.resetFromConfig(), this.style.display = this.modes.length ? "" : "none";
  }
  get modes() {
    var e;
    return K((e = this.config) == null ? void 0 : e.als_modes);
  }
  get active() {
    return this.modes.find((e) => e.index === this.activeIndex) || this.modes[0] || null;
  }
  get enableLens() {
    var e;
    return g((e = this.config) == null ? void 0 : e.als_enable_lens, !0) && !this.isCoarse;
  }
  get enableZoomBtns() {
    var e;
    return g((e = this.config) == null ? void 0 : e.als_enable_zoom_btns, !0);
  }
  get enableCompare() {
    var e;
    return g((e = this.config) == null ? void 0 : e.als_enable_compare, !0) && this.modes.length >= 2;
  }
  get showMetrics() {
    var e;
    return g((e = this.config) == null ? void 0 : e.als_show_metrics, !0);
  }
  get showColor() {
    var e;
    return g((e = this.config) == null ? void 0 : e.als_show_color, !0);
  }
  get showNotes() {
    var e;
    return g((e = this.config) == null ? void 0 : e.als_show_notes, !0);
  }
  get showProduct() {
    var e;
    return g((e = this.config) == null ? void 0 : e.als_show_product, !0);
  }
  get lensZoom() {
    var e;
    return H((e = this.config) == null ? void 0 : e.als_lens_zoom);
  }
  get placeholder() {
    var e;
    return String(((e = this.config) == null ? void 0 : e.als_placeholder) || "").trim();
  }
  resetFromConfig() {
    var c;
    const e = this.modes;
    if (!e.length) {
      this.displaySrc = "";
      return;
    }
    const t = G(e);
    this.activeIndex = t, this.compareA = t, this.compareB = ((c = e.find((h) => h.index !== t)) == null ? void 0 : c.index) ?? t, this.compareOn = !1, this.zoom = 1, this.panX = 0, this.panY = 0;
    const a = e.find((h) => h.index === t) || e[0];
    this.displaySrc = a.image, this.ensureImage(a.image, !0);
    const r = E(e, t, 1), s = e.find((h) => h.index === r);
    s && this.prefetch(s.image);
  }
  async prefetch(e) {
    !e || this.prefetchCache.has(e) || (this.prefetchCache.add(e), await S(e));
  }
  async ensureImage(e, t = !1) {
    const a = ++this.loadToken;
    t || (this.fading = !0);
    const r = await S(e);
    return a !== this.loadToken ? !1 : r ? (this.displaySrc = e, this.fading = !1, !0) : (this.fading = !1, this.placeholder && !this.displaySrc && (this.displaySrc = this.placeholder), !1);
  }
  async selectMode(e) {
    const t = this.modes.find((c) => c.index === e);
    if (!t || t.index === this.activeIndex) return;
    this.activeIndex = e, this.zoom = 1, this.panX = 0, this.panY = 0, this.lensOn = !1, !await this.ensureImage(t.image) && this.displaySrc;
    const r = E(this.modes, e, 1), s = this.modes.find((c) => c.index === r);
    s && this.prefetch(s.image);
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
    const t = this.stageEl, a = this.displaySrc;
    if (!t || !a) return;
    const r = t.getBoundingClientRect(), s = e.clientX - r.left, c = e.clientY - r.top;
    if (s < 0 || c < 0 || s > r.width || c > r.height) {
      this.lensOn = !1;
      return;
    }
    const h = 144, b = h / 2, X = Math.max(0, Math.min(r.width - h, s - b)), A = Math.max(0, Math.min(r.height - h, c - b)), y = this.lensZoom, B = -(s * y - b), U = -(c * y - b);
    this.lensOn = !0, this.lensStyle = {
      left: `${X}px`,
      top: `${A}px`,
      backgroundImage: `url("${a}")`,
      backgroundSize: `${r.width * y}px ${r.height * y}px`,
      backgroundPosition: `${B}px ${U}px`
    };
  }
  onStageLeave() {
    this.lensOn = !1;
  }
  /* —— Mobile pan when zoomed —— */
  onPanDown(e) {
    var t, a;
    this.compareOn || this.zoom <= 1 || e.pointerType === "mouse" && this.enableLens || (this.panning = !0, this.pointerId = e.pointerId, this.panStartX = e.clientX, this.panStartY = e.clientY, this.panOriginX = this.panX, this.panOriginY = this.panY, (a = (t = this.stageEl) == null ? void 0 : t.setPointerCapture) == null || a.call(t, e.pointerId), window.addEventListener("pointermove", this.onPanMove), window.addEventListener("pointerup", this.onPanUp), window.addEventListener("pointercancel", this.onPanUp));
  }
  teardownPointers() {
    window.removeEventListener("pointermove", this.onPanMove), window.removeEventListener("pointerup", this.onPanUp), window.removeEventListener("pointercancel", this.onPanUp), window.removeEventListener("pointermove", this.onCompareMove), window.removeEventListener("pointerup", this.onCompareUp), window.removeEventListener("pointercancel", this.onCompareUp);
  }
  /* —— Compare —— */
  enterCompare() {
    var r;
    if (!this.enableCompare) return;
    const e = this.modes;
    this.compareA = this.activeIndex, this.compareB = ((r = e.find((s) => s.index !== this.compareA)) == null ? void 0 : r.index) ?? this.compareA, this.comparePct = 50, this.compareOn = !0, this.resetZoom();
    const t = e.find((s) => s.index === this.compareA), a = e.find((s) => s.index === this.compareB);
    t && this.prefetch(t.image), a && this.prefetch(a.image);
  }
  exitCompare() {
    this.compareOn = !1, this.compareDragging = !1, this.teardownPointers();
  }
  setCompareSide(e, t) {
    if (e === "a") {
      if (t === this.compareB) return;
      this.compareA = t;
    } else {
      if (t === this.compareA) return;
      this.compareB = t;
    }
  }
  onCompareDown(e) {
    var a;
    if (e.button != null && e.button !== 0) return;
    e.preventDefault(), e.stopPropagation(), this.compareDragging = !0, this.pointerId = e.pointerId, this.updateCompareFromClientX(e.clientX);
    const t = this.compareEl;
    try {
      (a = t == null ? void 0 : t.setPointerCapture) == null || a.call(t, e.pointerId);
    } catch {
    }
    t == null || t.addEventListener("pointermove", this.onCompareMove), t == null || t.addEventListener("pointerup", this.onCompareUp), t == null || t.addEventListener("pointercancel", this.onCompareUp), window.addEventListener("pointermove", this.onCompareMove), window.addEventListener("pointerup", this.onCompareUp), window.addEventListener("pointercancel", this.onCompareUp);
  }
  /** Physical left→right mapping (matches clip-path / handle `left`). No RTL flip. */
  updateCompareFromClientX(e) {
    const t = this.compareEl;
    if (!t) return;
    const a = t.getBoundingClientRect();
    if (!a.width) return;
    const r = (e - a.left) / a.width;
    this.comparePct = Math.max(0, Math.min(100, Math.round(r * 100)));
  }
  onCompareKey(e) {
    e.key === "ArrowRight" || e.key === "ArrowUp" ? (e.preventDefault(), this.comparePct = Math.min(100, this.comparePct + 2)) : e.key === "ArrowLeft" || e.key === "ArrowDown" ? (e.preventDefault(), this.comparePct = Math.max(0, this.comparePct - 2)) : e.key === "Home" ? (e.preventDefault(), this.comparePct = 0) : e.key === "End" && (e.preventDefault(), this.comparePct = 100);
  }
  designVars() {
    const e = this.config || {}, t = k(e, "als_"), a = Math.max(0, Math.min(3, f(e.als_shadow, 1))), r = [
      "none",
      "0 10px 28px rgba(43, 33, 28, 0.08)",
      "0 16px 40px rgba(43, 33, 28, 0.12)",
      "0 22px 56px rgba(43, 33, 28, 0.18)"
    ];
    return {
      ...R(t),
      "--als-stage-bg": String(e.als_stage_bg || "#1a1614"),
      "--als-panel-bg": String(e.als_panel_bg || t.card),
      "--als-meter-color": String(e.als_meter_color || t.accent),
      "--als-handle-color": String(e.als_handle_color || "#ffffff"),
      "--als-thumb-border": String(e.als_thumb_border || t.border),
      "--als-shadow": r[a] || r[1],
      "--als-aspect": q(e.als_aspect),
      "--als-max-width": `${f(e.als_max_width, 720)}px`,
      "--als-compare": `${this.comparePct}%`
    };
  }
  productUrl(e) {
    var t;
    return e ? e.product_url || L((t = this.config) == null ? void 0 : t.als_product_url) : "";
  }
  productBtn(e) {
    var t;
    return (e == null ? void 0 : e.btn_text) || u((t = this.config) == null ? void 0 : t.als_default_btn) || n("مشاهدة المنتج", "View product");
  }
  renderMetrics(e) {
    return this.showMetrics ? i`
      <div class="als-metrics" aria-label=${n("مؤشرات الخامة", "Fabric metrics")}>
        ${J(e).map((t) => {
      const a = Q(t.value);
      return i`
            <div class="als-metric">
              <div class="als-metric__head">
                <span>${n(t.labelAr, t.labelEn)}</span>
                <span class="als-metric__val">
                  ${Math.round(t.value)}
                  <span class="als-metric__level">${n(a.ar, a.en)}</span>
                </span>
              </div>
              <div class="als-metric__bar" aria-hidden="true">
                <span style=${x({ width: `${t.value}%` })}></span>
              </div>
            </div>
          `;
    })}
      </div>
    ` : d;
  }
  renderModeButtons() {
    return i`
      <div class="als-block">
        <h3 class="als-block__title">
          ${n("أوضاع الإضاءة", "Lighting modes")}
        </h3>
        <div
          class="als-modes"
          role="listbox"
          aria-label=${n("أوضاع الإضاءة", "Lighting modes")}
        >
          ${this.modes.map((e, t) => {
      const a = e.index === this.activeIndex;
      return i`
              <button
                type="button"
                class=${_({
        "als-mode": !0,
        "als-mode--active": a
      })}
                role="option"
                aria-selected=${a ? "true" : "false"}
                aria-pressed=${a ? "true" : "false"}
                @click=${() => {
        this.compareOn && this.exitCompare(), this.selectMode(e.index);
      }}
              >
                <img
                  class="als-mode__thumb"
                  src=${e.thumb || e.image}
                  alt=${e.alt}
                  loading=${t === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
                <span class="als-mode__name">${e.name}</span>
              </button>
            `;
    })}
        </div>
      </div>
    `;
  }
  renderInfoCard(e) {
    const t = this.productUrl(e), a = this.showColor && e.color_name ? i`<div>
            <span class="als-info__label">${n("اللون", "Color")}</span>
            <p class="als-info__value">${e.color_name}</p>
          </div>` : d, r = this.showNotes && e.notes ? i`<div>
            <span class="als-info__label">${n("ملاحظات", "Notes")}</span>
            <p class="als-info__value">${e.notes}</p>
          </div>` : d;
    return i`
      <div class="als-info">
        ${a || r ? i`<div class="als-info__meta">
              ${a}${r}
            </div>` : d}
        ${this.showMetrics ? i`<div class="als-block">
              <h3 class="als-block__title">
                ${n("مؤشرات الخامة", "Fabric metrics")}
              </h3>
              ${this.renderMetrics(e)}
            </div>` : d}
        ${this.showProduct && C(t) ? i`<a class="fs-btn als-info__cta" href=${t}
              >${this.productBtn(e)}</a
            >` : d}
      </div>
    `;
  }
  renderViewer(e) {
    if (this.compareOn) {
      const a = this.modes.find((s) => s.index === this.compareA) || e, r = this.modes.find((s) => s.index === this.compareB) || e;
      return i`
        <div class="als-viewer">
          <div class="als-compare-bar">
            <div class="als-compare-pick">
              <label>
                <span>${n("الوضع الأول", "First mode")}</span>
                <select
                  .value=${String(this.compareA)}
                  @change=${(s) => this.setCompareSide(
        "a",
        Number(s.target.value)
      )}
                >
                  ${this.modes.map(
        (s) => i`<option
                      value=${s.index}
                      ?disabled=${s.index === this.compareB}
                    >
                      ${s.name}
                    </option>`
      )}
                </select>
              </label>
              <label>
                <span>${n("الوضع الثاني", "Second mode")}</span>
                <select
                  .value=${String(this.compareB)}
                  @change=${(s) => this.setCompareSide(
        "b",
        Number(s.target.value)
      )}
                >
                  ${this.modes.map(
        (s) => i`<option
                      value=${s.index}
                      ?disabled=${s.index === this.compareA}
                    >
                      ${s.name}
                    </option>`
      )}
                </select>
              </label>
            </div>
            <button
              type="button"
              class="als-btn"
              aria-label=${n("الخروج من المقارنة", "Exit compare")}
              @click=${() => this.exitCompare()}
            >
              ${n("إنهاء المقارنة", "End compare")}
            </button>
          </div>

          <div class="als-stage-wrap">
            <div
              class=${_({
        "als-compare": !0,
        "als-compare--dragging": this.compareDragging
      })}
              dir="ltr"
              role="slider"
              tabindex="0"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow=${this.comparePct}
              aria-label=${n("شريط المقارنة", "Compare slider")}
              style=${x({ "--als-compare": `${this.comparePct}%` })}
              @pointerdown=${this.onCompareDown}
              @keydown=${this.onCompareKey}
            >
              <img
                class="als-compare__layer"
                src=${r.image}
                alt=${r.alt}
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
                >${r.name}</span
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
    const t = {
      transform: `translate(${this.panX}px, ${this.panY}px) scale(${this.zoom})`
    };
    return i`
      <div class="als-viewer">
        <div class="als-stage-wrap">
          <div
            class=${_({
      "als-stage": !0,
      "als-stage--panning": this.zoom > 1,
      "als-stage--dragging": this.panning
    })}
            @pointermove=${(a) => this.onStageMove(a)}
            @pointerleave=${() => this.onStageLeave()}
            @pointerdown=${this.onPanDown}
          >
            ${this.displaySrc ? i`<img
                  class=${_({
      "als-stage__img": !0,
      "als-stage__img--fade": this.fading && !M()
    })}
                  style=${x(t)}
                  src=${this.displaySrc}
                  alt=${e.alt}
                  decoding="async"
                />` : d}
            ${this.enableLens ? i`<div
                  class=${_({
      "als-lens": !0,
      "als-lens--on": this.lensOn,
      "als-desktop-only": !0
    })}
                  style=${x(this.lensStyle)}
                  aria-hidden="true"
                ></div>` : d}
          </div>
        </div>

        <div class="als-caption" aria-live="polite">
          <div class="als-caption__text">
            <p class="als-caption__name">${e.name}</p>
            ${e.desc ? i`<p class="als-caption__desc">${e.desc}</p>` : d}
          </div>
          <div class="als-tools">
            ${this.enableZoomBtns ? i`
                  <div class="als-tools__group" role="group" aria-label=${n("التكبير", "Zoom")}>
                    <button
                      type="button"
                      class="als-btn"
                      aria-label=${n("تكبير", "Zoom in")}
                      @click=${() => this.zoomIn()}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      class="als-btn"
                      aria-label=${n("تصغير", "Zoom out")}
                      ?disabled=${this.zoom <= 1}
                      @click=${() => this.zoomOut()}
                    >
                      −
                    </button>
                    <button
                      type="button"
                      class="als-btn"
                      aria-label=${n("إعادة ضبط التكبير", "Reset zoom")}
                      @click=${() => this.resetZoom()}
                    >
                      ${n("ضبط", "Reset")}
                    </button>
                  </div>
                ` : d}
            ${this.enableCompare ? i`<button
                  type="button"
                  class="als-btn als-btn--primary"
                  aria-label=${n("وضع المقارنة", "Compare mode")}
                  @click=${() => this.enterCompare()}
                >
                  ${n("مقارنة", "Compare")}
                </button>` : d}
            ${this.showProduct && C(this.productUrl(e)) ? i`<a
                  class="als-btn als-btn--accent"
                  href=${this.productUrl(e)}
                >
                  ${this.productBtn(e)}
                </a>` : d}
          </div>
        </div>
      </div>
    `;
  }
  renderPanel(e) {
    return i`
      <aside
        class="als-panel"
        aria-label=${n("لوحة التحكم", "Control panel")}
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
              <span>${n("التفاصيل والملاحظات", "Details & notes")}</span>
              <span aria-hidden="true">${this.notesOpen ? "−" : "+"}</span>
            </button>
            ${this.notesOpen ? i`<div class="als-accordion__body">
                  ${this.renderInfoCard(e)}
                </div>` : d}
          </div>
        </div>

        <div class="als-desktop-only">${this.renderInfoCard(e)}</div>
      </aside>
    `;
  }
  render() {
    if (!this.modes.length) return d;
    const t = this.active;
    if (!t) return d;
    const a = this.config || {}, s = k(a, "als_").animate && !M(), c = g(a.als_full_width, !1), h = u(a.als_title), b = u(a.als_desc);
    return i`
      <section
        class=${_({
      "fs-section": !0,
      "fs-section--full": c,
      "fs-animate": s
    })}
        style=${x(this.designVars())}
        aria-label=${h || n("استوديو الإضاءة والخامة", "Light & fabric studio")}
      >
        <div class="fs-container">
          ${h || b ? i`<header class="fs-header">
                ${h ? i`<h2 class="fs-title">${h}</h2>` : d}
                ${b ? i`<p class="fs-desc">${b}</p>` : d}
              </header>` : d}

          <div class="als-shell">
            ${this.renderViewer(t)}
            ${this.renderPanel(t)}
          </div>
        </div>
        ${V(this.config || {}, "als_")}
      </section>
    `;
  }
};
$.styles = [
  Z,
  N,
  P`
      :host {
        direction: inherit;
      }
    `
];
let l = $;
p([
  Y({ type: Object })
], l.prototype, "config");
p([
  m()
], l.prototype, "activeIndex");
p([
  m()
], l.prototype, "displaySrc");
p([
  m()
], l.prototype, "fading");
p([
  m()
], l.prototype, "zoom");
p([
  m()
], l.prototype, "panX");
p([
  m()
], l.prototype, "panY");
p([
  m()
], l.prototype, "lensOn");
p([
  m()
], l.prototype, "lensStyle");
p([
  m()
], l.prototype, "compareOn");
p([
  m()
], l.prototype, "compareA");
p([
  m()
], l.prototype, "compareB");
p([
  m()
], l.prototype, "comparePct");
p([
  m()
], l.prototype, "notesOpen");
p([
  m()
], l.prototype, "panning");
p([
  I(".als-stage")
], l.prototype, "stageEl");
p([
  I(".als-compare")
], l.prototype, "compareEl");
typeof l < "u" && l.registerSallaComponent("salla-abaya-light-studio");
export {
  l as default
};
