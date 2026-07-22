var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, nothing, html } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { n as normalizeCollection, l as localizedString, d as extractLink, u as clamp, q as getUnitValue, s as sharedSectionCss, v as isValidHref, r as readSectionTheme, p as prefersReducedMotion, t, i as isTruthy, a as themeStyleMap, b as renderCommerceOutcome } from "./sharedStyles-Cmm0noVj.js";
import { f as fsSwiperCss, d as destroyFsSwiper, m as mountFsSwiper } from "./fsSwiper-CvtD0NsZ.js";
const componentStyles = css`
  .nal-shell {
    position: relative;
  }

  .nal-header {
    text-align: center;
    margin-bottom: 1.55rem;
  }

  .nal-eyebrow {
    display: inline-block;
    margin: 0 0 0.55rem;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--accent-color, var(--fs-store-primary));
  }

  .nal-title {
    margin: 0;
    font-size: clamp(1.75rem, 3.4vw, 2.55rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.15;
    color: var(--text-color, #000000);
  }

  .nal-title-line {
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

  .nal-desc {
    margin: 0.9rem auto 0;
    max-width: 34rem;
    color: var(--muted-color, #666666);
    font-size: 0.95rem;
    line-height: 1.75;
  }

  .nal-swiper {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    overflow: hidden;
  }

  .nal-slide {
    width: 18%;
    height: min(68vw, 460px);
    max-height: 560px;
    transition: width 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .nal-slide.is-active,
  .nal-slide.swiper-slide-active {
    width: 42%;
  }

  .nal-item {
    position: relative;
    width: 100%;
    height: 100%;
    min-width: 0;
    border: 0;
    padding: 0;
    border-radius: calc(var(--section-radius, 16px) * 0.95);
    overflow: hidden;
    cursor: pointer;
    background: #1a1210;
    transition:
      flex 0.55s cubic-bezier(0.22, 1, 0.36, 1),
      box-shadow 0.4s ease,
      filter 0.4s ease;
    box-shadow: 0 14px 30px color-mix(in srgb, var(--text-color, #000) 12%, transparent);
    filter: saturate(0.92) brightness(0.94);
    outline: none;
  }

  .fs-animate .nal-item {
    animation: nal-rise 0.75s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .fs-animate .nal-item:nth-child(1) { animation-delay: 0.04s; }
  .fs-animate .nal-item:nth-child(2) { animation-delay: 0.12s; }
  .fs-animate .nal-item:nth-child(3) { animation-delay: 0.2s; }
  .fs-animate .nal-item:nth-child(4) { animation-delay: 0.28s; }
  .fs-animate .nal-item:nth-child(5) { animation-delay: 0.36s; }

  @keyframes nal-rise {
    from {
      opacity: 0;
      transform: translateY(24px) scale(0.97);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  .nal-item.is-active {
    filter: none;
    box-shadow:
      0 0 0 1px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 35%, transparent),
      0 22px 48px color-mix(in srgb, var(--text-color, #000) 20%, transparent);
  }

  .nal-item:focus-visible {
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, transparent);
  }

  .nal-item__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transform: scale(1.04);
    transition: transform 1.1s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .nal-item.is-active .nal-item__img {
    animation: nal-ken 8s ease-in-out infinite alternate;
  }

  @keyframes nal-ken {
    from { transform: scale(1.02) translate(0, 0); }
    to { transform: scale(1.1) translate(-1.5%, -1%); }
  }

  .nal-item__shade {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.05), transparent 28%),
      linear-gradient(180deg, transparent 42%, rgba(14, 9, 7, 0.78));
    pointer-events: none;
    transition: opacity 0.35s ease;
  }

  .nal-item:not(.is-active) .nal-item__shade {
    background: linear-gradient(
      90deg,
      rgba(14, 9, 7, 0.28),
      rgba(14, 9, 7, 0.08) 45%,
      rgba(14, 9, 7, 0.28)
    );
  }

  .nal-badge {
    position: absolute;
    top: 0.85rem;
    inset-inline-start: 0.85rem;
    padding: 0.28rem 0.65rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 92%, #1a1210);
    color: #fff;
    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    opacity: 0;
    transform: translateY(-6px);
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  .nal-item.is-active .nal-badge {
    opacity: 1;
    transform: none;
  }

  .nal-item__label {
    position: absolute;
    inset-inline-start: 1rem;
    bottom: 1rem;
    margin: 0;
    max-width: calc(100% - 5rem);
    color: #fff;
    font-size: clamp(0.9rem, 1.8vw, 1.35rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    text-shadow: 0 3px 14px rgba(0, 0, 0, 0.4);
    opacity: 0.55;
    transform: translateY(4px);
    transition: opacity 0.3s ease, transform 0.35s ease;
    writing-mode: horizontal-tb;
  }

  .nal-item:not(.is-active) .nal-item__label {
    writing-mode: vertical-rl;
    inset-inline-start: 50%;
    bottom: auto;
    top: 50%;
    transform: translate(-50%, -50%);
    max-width: none;
    opacity: 0.9;
    font-size: clamp(0.78rem, 1.2vw, 0.95rem);
    letter-spacing: 0.08em;
  }

  :host([dir='rtl']) .nal-item:not(.is-active) .nal-item__label,
  :host(:dir(rtl)) .nal-item:not(.is-active) .nal-item__label {
    transform: translate(50%, -50%) rotate(180deg);
  }

  .nal-item.is-active .nal-item__label {
    opacity: 1;
    transform: translateY(0);
  }

  .nal-spot {
    position: absolute;
    z-index: 2;
    transform: translate(-50%, -50%);
    width: 2.55rem;
    height: 2.55rem;
    border: 0;
    border-radius: 999px;
    display: grid;
    place-items: center;
    background: var(--button-bg, var(--accent-color, var(--fs-store-primary)));
    color: var(--button-color, #fff);
    cursor: pointer;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease, transform 0.25s ease;
  }

  .nal-spot::before,
  .nal-spot::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: inherit;
    border: 1.5px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 70%, #fff);
    animation: nal-ring 2.2s ease-out infinite;
  }

  .nal-spot::after {
    animation-delay: 0.7s;
  }

  .nal-item.is-active .nal-spot {
    opacity: 1;
    pointer-events: auto;
  }

  .nal-spot:hover {
    transform: translate(-50%, -50%) scale(1.1);
  }

  @keyframes nal-ring {
    0% {
      transform: scale(0.9);
      opacity: 0.75;
    }
    100% {
      transform: scale(1.55);
      opacity: 0;
    }
  }

  .nal-spot i {
    font-size: 1.05rem;
    position: relative;
    z-index: 1;
  }

  .nal-tip {
    position: absolute;
    z-index: 2;
    transform: translate(-50%, calc(-100% - 0.85rem));
    padding: 0.35rem 0.65rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--card-bg, #ffffff) 92%, var(--fs-surface, #f0f0f0));
    color: var(--text-color, #000000);
    font-size: 0.72rem;
    font-weight: 700;
    white-space: nowrap;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s ease, transform 0.25s ease;
  }

  .nal-item.is-active .nal-tip {
    opacity: 1;
    transform: translate(-50%, calc(-100% - 1.05rem));
  }

  .nal-dock {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.85rem 1.25rem;
    margin-top: 1.15rem;
    padding: 1rem 1.15rem;
    border-radius: calc(var(--section-radius, 16px) * 0.85);
    border: 1px solid var(--border-color, #e5e7eb);
    background:
      linear-gradient(
        120deg,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, var(--card-bg, #ffffff)),
        var(--card-bg, #ffffff) 55%
      );
    box-shadow: 0 12px 28px color-mix(in srgb, var(--text-color, #000) 8%, transparent);
    animation: nal-dock-in 0.35s ease;
  }

  @keyframes nal-dock-in {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  .nal-dock__meta {
    display: grid;
    gap: 0.2rem;
    min-width: 0;
  }

  .nal-dock__kicker {
    margin: 0;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--accent-color, var(--fs-store-primary));
  }

  .nal-dock__title {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 800;
    color: var(--text-color, #000000);
  }

  .nal-dock__hint {
    margin: 0;
    font-size: 0.82rem;
    color: var(--muted-color, #666666);
  }

  .nal-dock__cta {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.7rem 1.15rem;
    border: 0;
    border-radius: 999px;
    background: var(--button-bg, var(--accent-color, var(--fs-store-primary)));
    color: var(--button-color, #fff);
    font-size: 0.88rem;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 10px 22px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 28%, transparent);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .nal-dock__cta:hover {
    transform: translateY(-2px);
  }

  .nal-dock__cta:disabled {
    opacity: 0.45;
    cursor: default;
    transform: none;
    box-shadow: none;
  }

  .nal-steps {
    display: flex;
    justify-content: center;
    gap: 0.4rem;
    margin-top: 0.95rem;
  }

  .nal-step {
    width: 0.45rem;
    height: 0.45rem;
    border: 0;
    padding: 0;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 28%, #ddd);
    cursor: pointer;
    transition: width 0.25s ease, background 0.25s ease;
  }

  .nal-step.is-active {
    width: 1.35rem;
    background: var(--button-bg, var(--accent-color, var(--fs-store-primary)));
  }

  .nal-empty {
    padding: 2.25rem 1rem;
    text-align: center;
    color: var(--muted-color, #666666);
    border: 1px dashed var(--border-color, #e5e7eb);
    border-radius: var(--section-radius, 16px);
  }

  @media (max-width: 767px) {
    .nal-slide,
    .nal-slide.is-active,
    .nal-slide.swiper-slide-active {
      width: 82%;
      height: 400px;
    }

    .nal-item:not(.is-active) .nal-item__label {
      writing-mode: horizontal-tb;
      inset-inline-start: 1rem;
      bottom: 1rem;
      top: auto;
      transform: none;
      opacity: 0.9;
      font-size: 1rem;
    }

    .nal-spot,
    .nal-tip,
    .nal-badge {
      opacity: 1;
      pointer-events: auto;
      transform: none;
    }

    .nal-spot {
      transform: translate(-50%, -50%);
    }

    .nal-tip {
      transform: translate(-50%, calc(-100% - 1.05rem));
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .nal-item,
    .nal-item__img,
    .nal-spot,
    .nal-tip,
    .nal-badge,
    .nal-dock,
    .nal-step {
      animation: none !important;
      transition: none !important;
    }

    .nal-spot::before,
    .nal-spot::after {
      display: none;
    }

    .nal-item.is-active .nal-item__img {
      animation: none;
      transform: scale(1.03);
    }
  }
`;
function parseLookbookItems(raw) {
  return normalizeCollection(raw).map((item, index) => {
    const image = String(item.image || item.poster || "").trim(), label = localizedString(item.label) || localizedString(item.title), url = extractLink(item.link) || extractLink(item.url) || String(item.link || "").trim();
    return image ? {
      id: String(item.id || `nal-${index}`),
      image,
      label,
      url,
      spotX: clamp(getUnitValue(item.spot_x, 50), 5, 95),
      spotY: clamp(getUnitValue(item.spot_y, 50), 5, 95)
    } : null;
  }).filter((v) => !!v);
}
__name(parseLookbookItems, "parseLookbookItems");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const _NewArrivalsLookbook = class _NewArrivalsLookbook extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.activeId = "", this.remountTimer = null, this.boundLang = () => {
      this.requestUpdate(), this.scheduleRemount();
    }, this.boundResize = () => this.scheduleRemount();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLang), window.addEventListener("resize", this.boundResize), this.ensureActive();
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLang), window.removeEventListener("resize", this.boundResize), this.remountTimer && clearTimeout(this.remountTimer), destroyFsSwiper(this.swiper), this.swiper = void 0, super.disconnectedCallback();
  }
  firstUpdated() {
    this.remountSwiper();
  }
  updated(changed) {
    changed.has("config") && (this.ensureActive(), this.scheduleRemount()), changed.has("activeId") && this.updateComplete.then(() => {
      !this.isConnected || !this.swiper || this.swiper.destroyed || this.swiper.update();
    });
  }
  get items() {
    var _a;
    return parseLookbookItems((_a = this.config) == null ? void 0 : _a.nal_items);
  }
  get activeItem() {
    return this.items.find((i) => i.id === this.activeId) || this.items[0] || null;
  }
  ensureActive() {
    const list = this.items;
    if (!list.length) {
      this.activeId = "";
      return;
    }
    list.some((i) => i.id === this.activeId) || (this.activeId = list[0].id);
  }
  scheduleRemount() {
    this.remountTimer && clearTimeout(this.remountTimer), this.remountTimer = setTimeout(() => this.remountSwiper(), 0);
  }
  remountSwiper() {
    destroyFsSwiper(this.swiper), this.swiper = void 0;
    const root = this.renderRoot.querySelector(".nal-swiper"), items = this.items;
    if (!root || !items.length) return;
    const start = Math.max(0, items.findIndex((i) => i.id === this.activeId));
    this.swiper = mountFsSwiper(root, {
      slidesPerView: "auto",
      spaceBetween: 10,
      centeredSlides: window.matchMedia("(max-width: 767px)").matches,
      initialSlide: start,
      on: {
        slideChange: /* @__PURE__ */ __name((sw) => {
          const item = items[sw.activeIndex];
          item && (this.activeId = item.id);
        }, "slideChange")
      }
    });
  }
  selectItem(item) {
    var _a;
    this.activeId = item.id;
    const idx = this.items.findIndex((i) => i.id === item.id);
    idx >= 0 && ((_a = this.swiper) == null || _a.slideTo(idx));
  }
  shift(delta) {
    const list = this.items;
    if (!list.length) return;
    const idx = Math.max(0, list.findIndex((i) => i.id === this.activeId)), next = Math.min(list.length - 1, Math.max(0, idx + delta));
    this.selectItem(list[next]);
  }
  openLink(item, e) {
    e == null || e.stopPropagation(), isValidHref(item.url) && window.open(item.url, "_blank", "noopener,noreferrer");
  }
  onGalleryKey(e) {
    e.key === "ArrowRight" ? (e.preventDefault(), this.shift(-1)) : e.key === "ArrowLeft" && (e.preventDefault(), this.shift(1));
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "nal_"), animate = theme.animate && !prefersReducedMotion(), title = localizedString(c.nal_title) || t("وصل حديثا", "New Arrivals"), desc = localizedString(c.nal_desc), showTitle = isTruthy(c.nal_show_title, !0), items = this.items, active = this.activeItem;
    return html`
      <section
        class=${classMap({ "fs-section": !0, "fs-animate": animate, "nal-shell": !0 })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title}
      >
        <div class="fs-container">
          ${showTitle ? html`<header class="fs-header fs-header--editorial">
                <p class="fs-eyebrow">${t("تشكيلة الموسم", "Season edit")}</p>
                <h2 class="fs-title">${title}</h2>
                <span class="fs-title-line" aria-hidden="true"></span>
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </header>` : nothing}

          ${items.length ? html`
                <div
                  class="swiper nal-swiper"
                  aria-roledescription="carousel"
                  tabindex="0"
                  aria-label=${t("معرض الوصل حديثاً — استخدم الأسهم للتنقل", "New arrivals gallery — use arrow keys")}
                  @keydown=${(e) => this.onGalleryKey(e)}
                >
                  <div class="swiper-wrapper">
                    ${items.map((item) => {
      const isActive = item.id === this.activeId;
      return html`
                        <div
                          class=${classMap({
        "swiper-slide": !0,
        "nal-slide": !0,
        "is-active": isActive
      })}
                        >
                          <article
                            class=${classMap({ "nal-item": !0, "is-active": isActive })}
                            data-id=${item.id}
                            tabindex="0"
                            aria-current=${isActive ? "true" : "false"}
                            aria-label=${item.label || t("قطعة جديدة", "New piece")}
                            @click=${() => this.selectItem(item)}
                            @mouseenter=${() => this.selectItem(item)}
                            @focus=${() => this.selectItem(item)}
                            @keydown=${(e) => {
        (e.key === "Enter" || e.key === " ") && (e.preventDefault(), this.selectItem(item), isValidHref(item.url) && this.openLink(item));
      }}
                          >
                            <img
                              class="nal-item__img"
                              src=${item.image}
                              alt=${item.label || ""}
                              loading="lazy"
                              draggable="false"
                            />
                            <div class="nal-item__shade" aria-hidden="true"></div>
                            <span class="nal-badge">${t("جديد", "New")}</span>
                            ${item.label ? html`<h3 class="nal-item__label">${item.label}</h3>` : nothing}
                            ${isValidHref(item.url) ? html`
                                  <span
                                    class="nal-tip"
                                    style=${styleMap({ left: `${item.spotX}%`, top: `${item.spotY}%` })}
                                  >
                                    ${t("اكتشف التفاصيل", "Discover details")}
                                  </span>
                                  <button
                                    type="button"
                                    class="nal-spot"
                                    style=${styleMap({ left: `${item.spotX}%`, top: `${item.spotY}%` })}
                                    aria-label=${t("عرض المنتج", "View product")}
                                    @click=${(e) => this.openLink(item, e)}
                                  >
                                    <i class="sicon-add" aria-hidden="true"></i>
                                  </button>
                                ` : nothing}
                          </article>
                        </div>
                      `;
    })}
                  </div>
                </div>

                ${active ? html`<div class="nal-dock">
                      <div class="nal-dock__meta">
                        <p class="nal-dock__kicker">${t("القطعة المختارة", "Selected look")}</p>
                        <h3 class="nal-dock__title">${active.label || t("قطعة جديدة", "New piece")}</h3>
                        <p class="nal-dock__hint">
                          ${t("مرّر على اللوحات أو استخدم الأسهم لاستكشاف التشكيلة", "Hover panels or use arrows to explore the edit")}
                        </p>
                      </div>
                      <button
                        type="button"
                        class="nal-dock__cta"
                        ?disabled=${!isValidHref(active.url)}
                        @click=${() => this.openLink(active)}
                      >
                        ${t("تسوق الآن", "Shop now")}
                        <span aria-hidden="true">→</span>
                      </button>
                    </div>` : nothing}

                <div class="nal-steps" role="tablist" aria-label=${t("قطع التشكيلة", "Looks")}>
                  ${items.map(
      (item, i) => html`
                      <button
                        type="button"
                        class=${classMap({ "nal-step": !0, "is-active": item.id === this.activeId })}
                        aria-label=${item.label || t(`قطعة ${i + 1}`, `Look ${i + 1}`)}
                        @click=${() => this.selectItem(item)}
                      ></button>
                    `
    )}
                </div>
              ` : html`<div class="fs-empty">${t("أضف قطع «وصل حديثا» من إعدادات العنصر", "Add new-arrival looks from the element settings")}</div>`}
          ${renderCommerceOutcome(this.config || {}, "nal_")}
        </div>
      </section>
    `;
  }
};
__name(_NewArrivalsLookbook, "NewArrivalsLookbook"), _NewArrivalsLookbook.styles = [
  sharedSectionCss,
  fsSwiperCss,
  componentStyles,
  css`
      :host {
        direction: inherit;
      }
    `
];
let NewArrivalsLookbook = _NewArrivalsLookbook;
__decorateClass([
  property({ type: Object })
], NewArrivalsLookbook.prototype, "config");
__decorateClass([
  state()
], NewArrivalsLookbook.prototype, "activeId");
typeof NewArrivalsLookbook < "u" && NewArrivalsLookbook.registerSallaComponent("salla-new-arrivals-lookbook");
export {
  NewArrivalsLookbook as default
};
