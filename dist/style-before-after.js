import { css as _, LitElement as x, nothing as m, html as d } from "lit";
import { property as y, state as $ } from "lit/decorators.js";
import { classMap as L } from "lit/directives/class-map.js";
import { styleMap as h } from "lit/directives/style-map.js";
import { t as s, n as I, l as p, s as k, r as C, p as z, i as S, a as D, b as E } from "./sharedStyles-BYm1OK6w.js";
const M = _`
  .stba-shell {
    position: relative;
  }

  .stba-pairs {
    display: grid;
    gap: 1.75rem;
  }

  .stba-compare {
    border-radius: calc(var(--section-radius, 16px) * 0.95);
    overflow: hidden;
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #e8ddd6);
    box-shadow: 0 14px 34px rgba(43, 33, 28, 0.07);
  }

  .fs-animate .stba-compare {
    animation: stba-rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .fs-animate .stba-compare:nth-child(2) { animation-delay: 0.1s; }
  .fs-animate .stba-compare:nth-child(3) { animation-delay: 0.18s; }

  @keyframes stba-rise {
    from {
      opacity: 0;
      transform: translateY(18px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  .stba-slider {
    position: relative;
    aspect-ratio: 16 / 10;
    min-height: 240px;
    overflow: hidden;
    touch-action: none;
    cursor: ew-resize;
    user-select: none;
    background: #1a1210;
  }

  .stba-slider__img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
  }

  .stba-slider__img--after {
    position: absolute;
    inset: 0;
  }

  .stba-slider__before {
    position: absolute;
    inset-block: 0;
    inset-inline-start: 0;
    overflow: hidden;
    z-index: 1;
  }

  .stba-slider__before .stba-slider__img {
    position: absolute;
    inset-block: 0;
    inset-inline-start: 0;
    width: var(--stba-full, 100cqw);
    max-width: none;
    height: 100%;
  }

  .stba-slider {
    container-type: inline-size;
  }

  .stba-slider__before .stba-slider__img {
    width: 100cqw;
  }

  .stba-slider__label {
    position: absolute;
    z-index: 2;
    bottom: 0.85rem;
    padding: 0.3rem 0.7rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.92);
    color: var(--text-color, #2b211c);
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    pointer-events: none;
  }

  .stba-slider__label--before {
    inset-inline-start: 0.85rem;
  }

  .stba-slider__label--after {
    inset-inline-end: 0.85rem;
  }

  .stba-handle {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 3;
    width: 2.75rem;
    margin-inline-start: -1.375rem;
    display: grid;
    place-items: center;
    cursor: grab;
    touch-action: none;
  }

  .stba-handle:active {
    cursor: grabbing;
  }

  .stba-handle__line {
    position: absolute;
    inset-block: 0;
    width: 2px;
    background: rgba(255, 255, 255, 0.92);
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.25);
  }

  .stba-handle__knob {
    position: relative;
    z-index: 1;
    width: 2.55rem;
    height: 2.55rem;
    border-radius: 999px;
    display: grid;
    place-items: center;
    background: #fff;
    color: var(--accent-color, var(--fs-store-primary));
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.22);
    font-size: 0.85rem;
  }

  .stba-caption {
    margin: 0;
    padding: 0.9rem 1.15rem;
    text-align: center;
    font-size: 0.9rem;
    color: var(--muted-color, #7a6a62);
    border-top: 1px solid var(--border-color, #e8ddd6);
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 5%, var(--card-bg, #fff));
  }

  @media (max-width: 639px) {
    .stba-slider {
      aspect-ratio: 4 / 5;
      min-height: 280px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .stba-compare {
      animation: none !important;
    }
  }
`, g = [
  {
    id: "drape",
    beforeImage: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80",
    afterImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
    beforeLabel: s("قبل", "Before"),
    afterLabel: s("بعد", "After"),
    caption: s("فرق القصة والوقع", "Cut & drape difference")
  },
  {
    id: "fabric",
    beforeImage: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=80",
    afterImage: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80",
    beforeLabel: s("خامة خفيفة", "Light fabric"),
    afterLabel: s("خامة فاخرة", "Luxe fabric"),
    caption: s("مقارنة القماش", "Fabric comparison")
  }
];
function q(f) {
  const t = I(f).map((e, i) => {
    const a = String(e.before_image || e.image_before || "").trim(), o = String(e.after_image || e.image_after || "").trim();
    return {
      id: String(e.id || `stba-${i}`),
      beforeImage: a,
      afterImage: o,
      beforeLabel: p(e.before_label) || "",
      afterLabel: p(e.after_label) || "",
      caption: p(e.caption) || ""
    };
  }).filter((e) => e.beforeImage || e.afterImage || e.caption);
  return t.length ? t.map((e, i) => {
    const a = g[i % g.length];
    return {
      ...e,
      beforeImage: e.beforeImage || a.beforeImage,
      afterImage: e.afterImage || a.afterImage,
      beforeLabel: e.beforeLabel || a.beforeLabel,
      afterLabel: e.afterLabel || a.afterLabel,
      caption: e.caption || a.caption
    };
  }) : g.map((e) => ({ ...e }));
}
var P = Object.defineProperty, w = (f, t, e, i) => {
  for (var a = void 0, o = f.length - 1, l; o >= 0; o--)
    (l = f[o]) && (a = l(t, e, a) || a);
  return a && P(t, e, a), a;
};
const u = class u extends x {
  constructor() {
    super(...arguments), this.config = {}, this.reveals = {}, this.boundLang = () => this.requestUpdate(), this.dragId = "", this.endDrag = () => {
      this.dragId = "";
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLang), window.addEventListener("pointerup", this.endDrag), window.addEventListener("pointercancel", this.endDrag);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLang), window.removeEventListener("pointerup", this.endDrag), window.removeEventListener("pointercancel", this.endDrag), super.disconnectedCallback();
  }
  get pairs() {
    var t;
    return q((t = this.config) == null ? void 0 : t.stba_items);
  }
  revealFor(t) {
    const e = this.reveals[t];
    return typeof e == "number" ? e : 50;
  }
  setReveal(t, e) {
    const i = Math.min(95, Math.max(5, e));
    this.reveals = { ...this.reveals, [t]: i };
  }
  onPointerDown(t, e) {
    var i, a;
    this.dragId = t, (a = (i = e.currentTarget).setPointerCapture) == null || a.call(i, e.pointerId), this.updateFromEvent(t, e);
  }
  onPointerMove(t, e) {
    this.dragId === t && this.updateFromEvent(t, e);
  }
  updateFromEvent(t, e) {
    const i = this.renderRoot.querySelector(`[data-compare="${t}"]`);
    if (!i) return;
    const a = i.getBoundingClientRect();
    if (!a.width) return;
    const o = getComputedStyle(this).direction === "rtl", l = (e.clientX - a.left) / a.width * 100;
    this.setReveal(t, o ? 100 - l : l);
  }
  render() {
    const t = this.config || {}, e = C(t, "stba_"), i = e.animate && !z(), a = p(t.stba_title) || s("قبل وبعد", "Before & After"), o = p(t.stba_desc), l = S(t.stba_show_title, !0), v = this.pairs;
    return d`
      <section
        class=${L({ "fs-section": !0, "fs-animate": i, "stba-shell": !0 })}
        style=${h(D(e))}
        aria-label=${a}
      >
        <div class="fs-container">
          ${l ? d`<header class="fs-header fs-header--editorial">
                <p class="fs-eyebrow">${s("تحوّل الإطلالة", "Style transformation")}</p>
                <h2 class="fs-title">${a}</h2>
                <span class="fs-title-line" aria-hidden="true"></span>
                ${o ? d`<p class="fs-desc">${o}</p>` : m}
              </header>` : m}

          ${v.length ? d`
                <div class="stba-pairs">
                  ${v.map((r) => {
      const b = this.revealFor(r.id);
      return d`
                      <article class="stba-compare" aria-label=${r.caption || s("مقارنة", "Comparison")}>
                        <div
                          class="stba-slider"
                          data-compare=${r.id}
                          @pointerdown=${(n) => this.onPointerDown(r.id, n)}
                          @pointermove=${(n) => this.onPointerMove(r.id, n)}
                        >
                          <img
                            class="stba-slider__img stba-slider__img--after"
                            src=${r.afterImage}
                            alt=${r.afterLabel || s("بعد", "After")}
                            loading="lazy"
                            draggable="false"
                          />
                          <div
                            class="stba-slider__before"
                            style=${h({ width: `${b}%` })}
                          >
                            <img
                              class="stba-slider__img"
                              src=${r.beforeImage}
                              alt=${r.beforeLabel || s("قبل", "Before")}
                              loading="lazy"
                              draggable="false"
                            />
                          </div>
                          <span class="stba-slider__label stba-slider__label--before">
                            ${r.beforeLabel || s("قبل", "Before")}
                          </span>
                          <span class="stba-slider__label stba-slider__label--after">
                            ${r.afterLabel || s("بعد", "After")}
                          </span>
                          <div
                            class="stba-handle"
                            style=${h({ insetInlineStart: `${b}%` })}
                            role="slider"
                            tabindex="0"
                            aria-valuemin="5"
                            aria-valuemax="95"
                            aria-valuenow=${Math.round(b)}
                            aria-label=${s("اسحب للمقارنة", "Drag to compare")}
                            @keydown=${(n) => {
        n.key === "ArrowLeft" ? (n.preventDefault(), this.setReveal(r.id, b + (getComputedStyle(this).direction === "rtl" ? 4 : -4))) : n.key === "ArrowRight" && (n.preventDefault(), this.setReveal(r.id, b + (getComputedStyle(this).direction === "rtl" ? -4 : 4)));
      }}
                          >
                            <span class="stba-handle__line" aria-hidden="true"></span>
                            <span class="stba-handle__knob" aria-hidden="true">
                              <i class="sicon-arrow-left-right"></i>
                            </span>
                          </div>
                        </div>
                        ${r.caption ? d`<p class="stba-caption">${r.caption}</p>` : m}
                      </article>
                    `;
    })}
                </div>
              ` : d`<div class="fs-empty">${s("أضف مقارنات قبل وبعد من إعدادات العنصر", "Add before & after pairs from element settings")}</div>`}
          ${E(this.config || {}, "stba_")}
        </div>
      </section>
    `;
  }
};
u.styles = [
  k,
  M,
  _`
      :host {
        direction: inherit;
      }
    `
];
let c = u;
w([
  y({ type: Object })
], c.prototype, "config");
w([
  $()
], c.prototype, "reveals");
typeof c < "u" && c.registerSallaComponent("salla-style-before-after");
export {
  c as default
};
