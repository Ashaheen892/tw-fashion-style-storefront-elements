var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, nothing, html } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ref } from "lit/directives/ref.js";
import { styleMap } from "lit/directives/style-map.js";
import { t, n as normalizeCollection, l as localizedString, d as extractLink, s as sharedSectionCss, v as isValidHref, r as readSectionTheme, p as prefersReducedMotion, i as isTruthy, a as themeStyleMap, b as renderCommerceOutcome } from "./sharedStyles-Q5qADHV9.js";
const CLEANUP_KEY = "__fsDragScrollCleanup", DRAG_THRESHOLD_PX = 6;
function enableDragScroll(el) {
  var _a;
  if (!el) return;
  const host = el;
  (_a = host[CLEANUP_KEY]) == null || _a.call(host);
  let pointerId = null, startX = 0, startScrollLeft = 0, dragged = !1;
  const onPointerDown = /* @__PURE__ */ __name((event) => {
    event.pointerType !== "mouse" || event.button !== 0 || host.scrollWidth <= host.clientWidth || (pointerId = event.pointerId, startX = event.clientX, startScrollLeft = host.scrollLeft, dragged = !1, host.style.scrollSnapType = "none", host.style.cursor = "grabbing");
  }, "onPointerDown"), onPointerMove = /* @__PURE__ */ __name((event) => {
    if (pointerId === null || event.pointerId !== pointerId) return;
    const dx = event.clientX - startX;
    if (!dragged && Math.abs(dx) > DRAG_THRESHOLD_PX) {
      dragged = !0;
      try {
        host.setPointerCapture(pointerId);
      } catch {
      }
    }
    dragged && (event.preventDefault(), host.scrollLeft = startScrollLeft - dx);
  }, "onPointerMove"), endDrag = /* @__PURE__ */ __name((event) => {
    if (!(pointerId === null || event.pointerId !== pointerId)) {
      if (dragged)
        try {
          host.releasePointerCapture(pointerId);
        } catch {
        }
      if (pointerId = null, host.style.scrollSnapType = "", host.style.cursor = "", dragged) {
        const suppressClick = /* @__PURE__ */ __name((clickEvent) => {
          clickEvent.preventDefault(), clickEvent.stopPropagation();
        }, "suppressClick");
        host.addEventListener("click", suppressClick, { capture: !0, once: !0 }), window.setTimeout(() => {
          host.removeEventListener("click", suppressClick, { capture: !0 });
        }, 0);
      }
      dragged = !1;
    }
  }, "endDrag"), onDragStart = /* @__PURE__ */ __name((event) => {
    event.preventDefault();
  }, "onDragStart");
  host.addEventListener("pointerdown", onPointerDown), host.addEventListener("pointermove", onPointerMove), host.addEventListener("pointerup", endDrag), host.addEventListener("pointercancel", endDrag), host.addEventListener("dragstart", onDragStart, { capture: !0 }), host.style.touchAction = "pan-x pan-y", host.scrollWidth > host.clientWidth && (host.style.cursor = "grab"), host[CLEANUP_KEY] = () => {
    host.removeEventListener("pointerdown", onPointerDown), host.removeEventListener("pointermove", onPointerMove), host.removeEventListener("pointerup", endDrag), host.removeEventListener("pointercancel", endDrag), host.removeEventListener("dragstart", onDragStart, { capture: !0 });
  };
}
__name(enableDragScroll, "enableDragScroll");
const componentStyles = css`
  .stc-shell {
    position: relative;
  }

  .stc-header {
    text-align: center;
    margin-bottom: 1.55rem;
  }

  .stc-eyebrow {
    display: inline-block;
    margin: 0 0 0.55rem;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--accent-color, var(--fs-store-primary));
  }

  .stc-title {
    margin: 0;
    font-size: clamp(1.75rem, 3.4vw, 2.55rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.15;
    color: var(--text-color, #2b211c);
  }

  .stc-title-line {
    display: block;
    width: 4.5rem;
    height: 2px;
    margin: 0.85rem auto 0;
    background: linear-gradient(
      90deg,
      transparent,
      var(--accent-color, var(--fs-store-primary)),
      transparent
    );
  }

  .stc-desc {
    margin: 0.9rem auto 0;
    max-width: 34rem;
    color: var(--muted-color, #7a6a62);
    font-size: 0.95rem;
    line-height: 1.75;
  }

  /* Grid layout */
  .stc-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1.15rem;
  }

  /* Slider layout */
  .stc-slider {
    display: flex;
    gap: 0.85rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    padding: 0.2rem 0.1rem 0.55rem;
    scrollbar-width: none;
  }

  .stc-slider::-webkit-scrollbar {
    display: none;
  }

  .stc-slider .stc-tile {
    flex: 0 0 min(72vw, 280px);
    scroll-snap-align: start;
  }

  /* Tile */
  .stc-tile {
    position: relative;
    display: block;
    overflow: hidden;
    border-radius: calc(var(--section-radius, 16px) * 0.95);
    aspect-ratio: 3 / 4;
    text-decoration: none;
    cursor: pointer;
    background: #1a1210;
    box-shadow: 0 12px 28px rgba(43, 33, 28, 0.08);
    transition:
      transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
      box-shadow 0.35s ease;
    outline: none;
  }

  .fs-animate .stc-tile {
    animation: stc-rise 0.65s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .fs-animate .stc-tile:nth-child(1) { animation-delay: 0.04s; }
  .fs-animate .stc-tile:nth-child(2) { animation-delay: 0.1s; }
  .fs-animate .stc-tile:nth-child(3) { animation-delay: 0.16s; }
  .fs-animate .stc-tile:nth-child(4) { animation-delay: 0.22s; }
  .fs-animate .stc-tile:nth-child(5) { animation-delay: 0.28s; }
  .fs-animate .stc-tile:nth-child(6) { animation-delay: 0.34s; }

  @keyframes stc-rise {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.97);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  .stc-tile:hover,
  .stc-tile:focus-visible {
    transform: translateY(-4px);
    box-shadow:
      0 0 0 2px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 30%, transparent),
      0 20px 44px rgba(43, 33, 28, 0.14);
  }

  .stc-tile:focus-visible {
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, transparent);
  }

  .stc-tile__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .stc-tile:hover .stc-tile__img {
    transform: scale(1.06);
  }

  .stc-tile__shade {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 45%, rgba(14, 9, 7, 0.72));
    pointer-events: none;
  }

  .stc-tile__label {
    position: absolute;
    inset-inline-start: 1.15rem;
    inset-inline-end: 1.15rem;
    bottom: 1.15rem;
    margin: 0;
    color: #fff;
    font-size: clamp(0.95rem, 1.8vw, 1.25rem);
    font-weight: 700;
    letter-spacing: -0.01em;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.35);
    line-height: 1.3;
  }

  .stc-tile__rule {
    display: block;
    width: 2.8rem;
    height: 1.5px;
    margin-top: 0.55rem;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 85%, #fff);
    border: 0;
    border-radius: 1px;
  }

  .stc-empty {
    padding: 2.25rem 1rem;
    text-align: center;
    color: var(--muted-color, #7a6a62);
    border: 1px dashed var(--border-color, #e8ddd6);
    border-radius: var(--section-radius, 16px);
  }

  @media (max-width: 639px) {
    .stc-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 0.75rem;
    }

    .stc-tile__label {
      font-size: 0.88rem;
      inset-inline-start: 0.85rem;
      bottom: 0.85rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .stc-tile,
    .stc-tile__img {
      animation: none !important;
      transition: none !important;
    }
  }
`, DEFAULTS = [
  {
    id: "evening",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
    title: t("سهرة", "Evening"),
    url: ""
  },
  {
    id: "daily",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80",
    title: t("يومي", "Daily"),
    url: ""
  },
  {
    id: "occasion",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
    title: t("مناسبات", "Occasions"),
    url: ""
  },
  {
    id: "new",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
    title: t("وصل حديثاً", "New in"),
    url: ""
  }
];
function parseCategoryTiles(raw) {
  const parsed = normalizeCollection(raw).map((item, index) => {
    const image = String(item.image || item.poster || "").trim(), title = localizedString(item.title) || localizedString(item.label), url = extractLink(item.link) || extractLink(item.url) || String(item.link || "").trim();
    return {
      id: String(item.id || `stc-${index}`),
      image,
      title,
      url
    };
  }).filter((v) => v.image || v.title);
  return parsed.length ? parsed.map((item, i) => {
    const d = DEFAULTS[i % DEFAULTS.length];
    return {
      ...item,
      image: item.image || d.image,
      title: item.title || d.title
    };
  }) : DEFAULTS.map((d) => ({ ...d }));
}
__name(parseCategoryTiles, "parseCategoryTiles");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const _StyleCategories = class _StyleCategories extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.boundLang = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLang);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLang), super.disconnectedCallback();
  }
  get tiles() {
    var _a;
    return parseCategoryTiles((_a = this.config) == null ? void 0 : _a.stc_items);
  }
  openTile(url) {
    isValidHref(url) && window.open(url, "_blank", "noopener,noreferrer");
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "stc_"), animate = theme.animate && !prefersReducedMotion(), title = localizedString(c.stc_title) || t("تصنيفات الأزياء", "Style Categories"), desc = localizedString(c.stc_desc), showTitle = isTruthy(c.stc_show_title, !0), layout = String(c.stc_layout || "grid"), tiles = this.tiles;
    return html`
      <section
        class=${classMap({ "fs-section": !0, "fs-animate": animate, "stc-shell": !0 })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title}
      >
        <div class="fs-container">
          ${showTitle ? html`<header class="stc-header">
                <p class="stc-eyebrow">${t("تشكيلتنا", "Our collection")}</p>
                <h2 class="stc-title">${title}</h2>
                <span class="stc-title-line" aria-hidden="true"></span>
                ${desc ? html`<p class="stc-desc">${desc}</p>` : nothing}
              </header>` : nothing}

          ${tiles.length ? html`
                <div
                  class=${classMap({ "stc-grid": layout === "grid", "stc-slider": layout === "slider" })}
                  role="list"
                  ${ref((el) => {
      el instanceof HTMLElement && el.classList.contains("stc-slider") && enableDragScroll(el);
    })}
                >
                  ${tiles.map(
      (tile) => html`
                      <a
                        class="stc-tile"
                        role="listitem"
                        href=${isValidHref(tile.url) ? tile.url : nothing}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabindex="0"
                        aria-label=${tile.title || t("تصنيف", "Category")}
                        @click=${(e) => {
        isValidHref(tile.url) || e.preventDefault();
      }}
                      >
                        <img class="stc-tile__img" src=${tile.image} alt=${tile.title || ""} loading="lazy" />
                        <div class="stc-tile__shade" aria-hidden="true"></div>
                        <div class="stc-tile__label">
                          ${tile.title}
                          <span class="stc-tile__rule" aria-hidden="true"></span>
                        </div>
                      </a>
                    `
    )}
                </div>
              ` : html`<div class="stc-empty">${t("أضف تصنيفات من إعدادات العنصر", "Add categories from element settings")}</div>`}
          ${renderCommerceOutcome(this.config || {}, "stc_")}
        </div>
      </section>
    `;
  }
};
__name(_StyleCategories, "StyleCategories"), _StyleCategories.styles = [
  sharedSectionCss,
  componentStyles,
  css`
      :host {
        direction: inherit;
      }
    `
];
let StyleCategories = _StyleCategories;
__decorateClass([
  property({ type: Object })
], StyleCategories.prototype, "config");
typeof StyleCategories < "u" && StyleCategories.registerSallaComponent("salla-style-categories");
export {
  StyleCategories as default
};
