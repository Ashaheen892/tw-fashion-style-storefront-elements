var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, nothing, html } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { t, n as normalizeCollection, l as localizedString, s as sharedSectionCss, r as readSectionTheme, p as prefersReducedMotion, i as isTruthy, a as themeStyleMap, b as renderCommerceOutcome } from "./sharedStyles-Q5qADHV9.js";
const componentStyles = css`
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
    background: color-mix(in srgb, var(--card-bg, #ffffff) 92%, var(--fs-surface, #f0f0f0));
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
    background: color-mix(in srgb, var(--card-bg, #ffffff) 92%, var(--fs-surface, #f0f0f0));
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
    background: var(--fs-surface, var(--card-bg, #f0f0f0));
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
`, DEFAULTS = [
  {
    id: "drape",
    beforeImage: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80",
    afterImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
    beforeLabel: t("قبل", "Before"),
    afterLabel: t("بعد", "After"),
    caption: t("فرق القصة والوقع", "Cut & drape difference")
  },
  {
    id: "fabric",
    beforeImage: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=80",
    afterImage: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80",
    beforeLabel: t("خامة خفيفة", "Light fabric"),
    afterLabel: t("خامة فاخرة", "Luxe fabric"),
    caption: t("مقارنة القماش", "Fabric comparison")
  }
];
function parseBeforeAfterPairs(raw) {
  const parsed = normalizeCollection(raw).map((item, index) => {
    const beforeImage = String(item.before_image || item.image_before || "").trim(), afterImage = String(item.after_image || item.image_after || "").trim();
    return {
      id: String(item.id || `stba-${index}`),
      beforeImage,
      afterImage,
      beforeLabel: localizedString(item.before_label) || "",
      afterLabel: localizedString(item.after_label) || "",
      caption: localizedString(item.caption) || ""
    };
  }).filter((v) => v.beforeImage || v.afterImage || v.caption);
  return parsed.length ? parsed.map((item, i) => {
    const d = DEFAULTS[i % DEFAULTS.length];
    return {
      ...item,
      beforeImage: item.beforeImage || d.beforeImage,
      afterImage: item.afterImage || d.afterImage,
      beforeLabel: item.beforeLabel || d.beforeLabel,
      afterLabel: item.afterLabel || d.afterLabel,
      caption: item.caption || d.caption
    };
  }) : DEFAULTS.map((d) => ({ ...d }));
}
__name(parseBeforeAfterPairs, "parseBeforeAfterPairs");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const _StyleBeforeAfter = class _StyleBeforeAfter extends LitElement {
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
    var _a;
    return parseBeforeAfterPairs((_a = this.config) == null ? void 0 : _a.stba_items);
  }
  revealFor(id) {
    const v = this.reveals[id];
    return typeof v == "number" ? v : 50;
  }
  setReveal(id, value) {
    const next = Math.min(95, Math.max(5, value));
    this.reveals = { ...this.reveals, [id]: next };
  }
  onPointerDown(id, e) {
    var _a, _b;
    this.dragId = id, (_b = (_a = e.currentTarget).setPointerCapture) == null || _b.call(_a, e.pointerId), this.updateFromEvent(id, e);
  }
  onPointerMove(id, e) {
    this.dragId === id && this.updateFromEvent(id, e);
  }
  updateFromEvent(id, e) {
    const el = this.renderRoot.querySelector(`[data-compare="${id}"]`);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (!rect.width) return;
    const rtl = getComputedStyle(this).direction === "rtl", raw = (e.clientX - rect.left) / rect.width * 100;
    this.setReveal(id, rtl ? 100 - raw : raw);
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "stba_"), animate = theme.animate && !prefersReducedMotion(), title = localizedString(c.stba_title) || t("قبل وبعد", "Before & After"), desc = localizedString(c.stba_desc), showTitle = isTruthy(c.stba_show_title, !0), pairs = this.pairs;
    return html`
      <section
        class=${classMap({ "fs-section": !0, "fs-animate": animate, "stba-shell": !0 })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title}
      >
        <div class="fs-container">
          ${showTitle ? html`<header class="fs-header fs-header--editorial">
                <p class="fs-eyebrow">${t("تحوّل الإطلالة", "Style transformation")}</p>
                <h2 class="fs-title">${title}</h2>
                <span class="fs-title-line" aria-hidden="true"></span>
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </header>` : nothing}

          ${pairs.length ? html`
                <div class="stba-pairs">
                  ${pairs.map((pair) => {
      const pos = this.revealFor(pair.id);
      return html`
                      <article class="stba-compare" aria-label=${pair.caption || t("مقارنة", "Comparison")}>
                        <div
                          class="stba-slider"
                          data-compare=${pair.id}
                          @pointerdown=${(e) => this.onPointerDown(pair.id, e)}
                          @pointermove=${(e) => this.onPointerMove(pair.id, e)}
                        >
                          <img
                            class="stba-slider__img stba-slider__img--after"
                            src=${pair.afterImage}
                            alt=${pair.afterLabel || t("بعد", "After")}
                            loading="lazy"
                            draggable="false"
                          />
                          <div
                            class="stba-slider__before"
                            style=${styleMap({ width: `${pos}%` })}
                          >
                            <img
                              class="stba-slider__img"
                              src=${pair.beforeImage}
                              alt=${pair.beforeLabel || t("قبل", "Before")}
                              loading="lazy"
                              draggable="false"
                            />
                          </div>
                          <span class="stba-slider__label stba-slider__label--before">
                            ${pair.beforeLabel || t("قبل", "Before")}
                          </span>
                          <span class="stba-slider__label stba-slider__label--after">
                            ${pair.afterLabel || t("بعد", "After")}
                          </span>
                          <div
                            class="stba-handle"
                            style=${styleMap({ insetInlineStart: `${pos}%` })}
                            role="slider"
                            tabindex="0"
                            aria-valuemin="5"
                            aria-valuemax="95"
                            aria-valuenow=${Math.round(pos)}
                            aria-label=${t("اسحب للمقارنة", "Drag to compare")}
                            @keydown=${(e) => {
        e.key === "ArrowLeft" ? (e.preventDefault(), this.setReveal(pair.id, pos + (getComputedStyle(this).direction === "rtl" ? 4 : -4))) : e.key === "ArrowRight" && (e.preventDefault(), this.setReveal(pair.id, pos + (getComputedStyle(this).direction === "rtl" ? -4 : 4)));
      }}
                          >
                            <span class="stba-handle__line" aria-hidden="true"></span>
                            <span class="stba-handle__knob" aria-hidden="true">
                              <i class="sicon-arrow-left-right"></i>
                            </span>
                          </div>
                        </div>
                        ${pair.caption ? html`<p class="stba-caption">${pair.caption}</p>` : nothing}
                      </article>
                    `;
    })}
                </div>
              ` : html`<div class="fs-empty">${t("أضف مقارنات قبل وبعد من إعدادات العنصر", "Add before & after pairs from element settings")}</div>`}
          ${renderCommerceOutcome(this.config || {}, "stba_")}
        </div>
      </section>
    `;
  }
};
__name(_StyleBeforeAfter, "StyleBeforeAfter"), _StyleBeforeAfter.styles = [
  sharedSectionCss,
  componentStyles,
  css`
      :host {
        direction: inherit;
      }
    `
];
let StyleBeforeAfter = _StyleBeforeAfter;
__decorateClass([
  property({ type: Object })
], StyleBeforeAfter.prototype, "config");
__decorateClass([
  state()
], StyleBeforeAfter.prototype, "reveals");
typeof StyleBeforeAfter < "u" && StyleBeforeAfter.registerSallaComponent("salla-style-before-after");
export {
  StyleBeforeAfter as default
};
