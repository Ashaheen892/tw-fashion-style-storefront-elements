var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, nothing, html } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { t, n as normalizeCollection, d as extractLink, l as localizedString, s as sharedSectionCss, i as isTruthy, v as isValidHref, r as readSectionTheme, p as prefersReducedMotion, a as themeStyleMap, b as renderCommerceOutcome } from "./sharedStyles-Q5qADHV9.js";
const componentStyles = css`
  .stpb-shell {
    position: relative;
  }

  /* Banners stack */
  .stpb-banners {
    display: grid;
    gap: 1.35rem;
  }

  /* Autoplay carousel mode */
  .stpb-carousel {
    position: relative;
    overflow: hidden;
    border-radius: calc(var(--section-radius, 16px) * 0.95);
    touch-action: pan-y;
    cursor: grab;
    user-select: none;
    -webkit-user-select: none;
  }

  .stpb-carousel:active {
    cursor: grabbing;
  }

  .stpb-carousel__track {
    display: flex;
    transition: transform 0.32s ease;
  }

  .stpb-carousel__slide {
    flex: 0 0 100%;
    min-width: 0;
  }

  .stpb-dots {
    position: absolute;
    inset-inline: 0;
    bottom: 0.85rem;
    display: flex;
    justify-content: center;
    gap: 0.45rem;
    z-index: 2;
  }

  .stpb-dot {
    width: 0.55rem;
    height: 0.55rem;
    border-radius: 999px;
    border: 0;
    padding: 0;
    background: rgba(255, 255, 255, 0.45);
    cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease;
  }

  .stpb-dot.is-active {
    background: var(--fs-surface, var(--card-bg, #f0f0f0));
    transform: scale(1.25);
  }

  @media (prefers-reduced-motion: reduce) {
    .stpb-carousel__track {
      transition: none;
    }
  }

  /* Single banner — full-bleed magazine style */
  .stpb-banner {
    position: relative;
    display: flex;
    align-items: flex-end;
    min-height: min(55vw, 420px);
    border-radius: calc(var(--section-radius, 16px) * 0.95);
    overflow: hidden;
    background: #1a1210;
    box-shadow: 0 14px 32px rgba(43, 33, 28, 0.1);
  }

  .fs-animate .stpb-banner {
    animation: stpb-rise 0.65s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .fs-animate .stpb-banner:nth-child(2) { animation-delay: 0.12s; }
  .fs-animate .stpb-banner:nth-child(3) { animation-delay: 0.2s; }

  @keyframes stpb-rise {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  .stpb-banner__img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .stpb-banner:hover .stpb-banner__img {
    transform: scale(1.04);
  }

  .stpb-banner__shade {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(180deg, rgba(14, 9, 7, 0.05) 0%, rgba(14, 9, 7, 0.55) 60%, rgba(14, 9, 7, 0.82) 100%);
    pointer-events: none;
  }

  .stpb-banner__content {
    position: relative;
    z-index: 1;
    padding: 2rem 2.25rem;
    max-width: 38rem;
  }

  .stpb-banner__headline {
    margin: 0 0 0.45rem;
    font-size: clamp(1.55rem, 3.2vw, 2.85rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1.15;
    color: #fff;
    font-family: Georgia, 'Times New Roman', serif;
  }

  .stpb-banner__subtitle {
    margin: 0 0 1rem;
    font-size: clamp(0.85rem, 1.5vw, 1.05rem);
    color: rgba(255, 255, 255, 0.82);
    line-height: 1.6;
    letter-spacing: 0.01em;
  }

  .stpb-banner__cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    min-height: 46px;
    padding: 0.7rem 1.35rem;
    border: 1.5px solid transparent;
    border-radius: 999px;
    background: var(--button-bg, var(--fs-store-primary));
    color: var(--button-color, #fff);
    font-size: 0.92rem;
    font-weight: 700;
    letter-spacing: 0.01em;
    line-height: 1.2;
    text-decoration: none;
    text-transform: none;
    cursor: pointer;
    box-shadow: 0 8px 20px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 28%, transparent);
    transition: filter 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  }

  .stpb-banner__cta:hover {
    filter: brightness(1.05);
    transform: translateY(-1px);
    opacity: 1;
  }

  .stpb-banner__cta-arrow {
    font-size: 1rem;
    transition: transform 0.2s ease;
  }

  .stpb-banner__cta:hover .stpb-banner__cta-arrow {
    transform: translateX(-3px);
  }

  :host([dir='rtl']) .stpb-banner__cta:hover .stpb-banner__cta-arrow,
  :host(:dir(rtl)) .stpb-banner__cta:hover .stpb-banner__cta-arrow {
    transform: translateX(3px);
  }

  @media (max-width: 639px) {
    .stpb-banner {
      min-height: 320px;
    }

    .stpb-banner__content {
      padding: 1.35rem 1.25rem;
    }

    .stpb-banner__headline {
      font-size: 1.45rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .stpb-banner,
    .stpb-banner__img {
      animation: none !important;
      transition: none !important;
    }
  }
`, DEFAULTS = [
  {
    id: "collection",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1400&q=80",
    headline: t("مجموعة الموسم", "Season collection"),
    subtitle: t("قصّات هادئة بتفاصيل فاخرة", "Quiet cuts with refined detail"),
    ctaLabel: t("تسوّقي الآن", "Shop now"),
    ctaUrl: ""
  },
  {
    id: "lookbook",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=80",
    headline: t("لوكبوك جديد", "New lookbook"),
    subtitle: t("إطلالات جاهزة من المحل", "Ready looks from the boutique"),
    ctaLabel: t("شاهدي اللوكبوك", "View lookbook"),
    ctaUrl: ""
  }
];
function parsePromoBanners(raw) {
  const parsed = normalizeCollection(raw).map((item, index) => {
    const image = String(item.image || item.poster || "").trim();
    return {
      id: String(item.id || `stpb-${index}`),
      image,
      headline: localizedString(item.headline) || localizedString(item.title) || "",
      subtitle: localizedString(item.subtitle) || localizedString(item.desc) || "",
      ctaLabel: localizedString(item.cta_label) || "",
      ctaUrl: extractLink(item.cta_link) || extractLink(item.link) || String(item.link || "").trim()
    };
  }).filter((v) => v.image || v.headline);
  return parsed.length ? parsed.map((item, i) => {
    const d = DEFAULTS[i % DEFAULTS.length];
    return {
      ...item,
      image: item.image || d.image,
      headline: item.headline || d.headline,
      subtitle: item.subtitle || d.subtitle,
      ctaLabel: item.ctaLabel || d.ctaLabel
    };
  }) : DEFAULTS.map((d) => ({ ...d }));
}
__name(parsePromoBanners, "parsePromoBanners");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const AUTOPLAY_MS = 5e3, _StylePromoBanners = class _StylePromoBanners extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.activeIndex = 0, this.boundLang = () => this.requestUpdate(), this.autoTimer = null, this.swipeStartX = null, this.onPointerDown = (e) => {
      e.pointerType === "mouse" && e.button !== 0 || (this.swipeStartX = e.clientX, this.clearAutoplay());
    }, this.onPointerUp = (e) => {
      const startX = this.swipeStartX;
      if (this.swipeStartX = null, this.syncAutoplay(), startX == null) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) < 40) return;
      (getComputedStyle(this).direction === "rtl" ? dx > 0 : dx < 0) ? this.next() : this.prev();
    }, this.onPointerCancel = () => {
      this.swipeStartX = null, this.syncAutoplay();
    }, this.onDragStart = (e) => e.preventDefault();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLang), this.syncAutoplay();
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLang), this.clearAutoplay(), super.disconnectedCallback();
  }
  updated(changed) {
    if (changed.has("config")) {
      const banners = this.banners;
      this.activeIndex >= banners.length && (this.activeIndex = 0), this.syncAutoplay();
    }
  }
  get banners() {
    var _a;
    return parsePromoBanners((_a = this.config) == null ? void 0 : _a.stpb_items);
  }
  get carouselMode() {
    var _a;
    return isTruthy((_a = this.config) == null ? void 0 : _a.stpb_autoplay, !0) && this.banners.length > 1;
  }
  clearAutoplay() {
    this.autoTimer && (clearInterval(this.autoTimer), this.autoTimer = null);
  }
  syncAutoplay() {
    this.clearAutoplay(), this.carouselMode && (this.autoTimer = setInterval(() => this.next(), AUTOPLAY_MS));
  }
  goTo(index) {
    const len = this.banners.length;
    len && (this.activeIndex = (index % len + len) % len, this.syncAutoplay());
  }
  prev() {
    this.goTo(this.activeIndex - 1);
  }
  next() {
    this.goTo(this.activeIndex + 1);
  }
  renderBanner(banner) {
    return html`
      <article class="stpb-banner" aria-label=${banner.headline || t("عرض", "Promo")}>
        <img class="stpb-banner__img" src=${banner.image} alt=${banner.headline || ""} loading="lazy" />
        <div class="stpb-banner__shade" aria-hidden="true"></div>
        <div class="stpb-banner__content">
          ${banner.headline ? html`<h3 class="stpb-banner__headline">${banner.headline}</h3>` : nothing}
          ${banner.subtitle ? html`<p class="stpb-banner__subtitle">${banner.subtitle}</p>` : nothing}
          ${isValidHref(banner.ctaUrl) && banner.ctaLabel ? html`<a
                class="stpb-banner__cta"
                href=${banner.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
              >${banner.ctaLabel}<span class="stpb-banner__cta-arrow" aria-hidden="true">←</span></a>` : nothing}
        </div>
      </article>
    `;
  }
  renderCarousel(banners) {
    const rtl = (getComputedStyle(this).direction || "ltr") === "rtl", offset = this.activeIndex * 100 * (rtl ? 1 : -1);
    return html`
      <div
        class="stpb-carousel"
        role="region"
        aria-roledescription="carousel"
        @pointerdown=${this.onPointerDown}
        @pointerup=${this.onPointerUp}
        @pointercancel=${this.onPointerCancel}
        @dragstart=${this.onDragStart}
      >
        <div class="stpb-carousel__track" style=${styleMap({ transform: `translateX(${offset}%)` })}>
          ${banners.map(
      (banner, i) => html`<div
              class="stpb-carousel__slide"
              aria-hidden=${i === this.activeIndex ? "false" : "true"}
            >${this.renderBanner(banner)}</div>`
    )}
        </div>
        <div class="stpb-dots" role="tablist">
          ${banners.map(
      (_b, i) => html`<button
              type="button"
              role="tab"
              class=${classMap({ "stpb-dot": !0, "is-active": i === this.activeIndex })}
              aria-selected=${i === this.activeIndex ? "true" : "false"}
              aria-label=${`${i + 1}`}
              @click=${() => this.goTo(i)}
            ></button>`
    )}
        </div>
      </div>
    `;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "stpb_"), animate = theme.animate && !prefersReducedMotion(), title = localizedString(c.stpb_title) || t("عروض مميزة", "Featured Promotions"), desc = localizedString(c.stpb_desc), showTitle = isTruthy(c.stpb_show_title, !0), banners = this.banners;
    return html`
      <section
        class=${classMap({ "fs-section": !0, "fs-animate": animate, "stpb-shell": !0 })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title}
      >
        <div class="fs-container">
          ${showTitle ? html`<header class="fs-header fs-header--editorial">
                <p class="fs-eyebrow">${t("حصريًا", "Exclusive")}</p>
                <h2 class="fs-title">${title}</h2>
                <span class="fs-title-line" aria-hidden="true"></span>
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </header>` : nothing}

          ${banners.length ? this.carouselMode ? this.renderCarousel(banners) : html`<div class="stpb-banners">${banners.map((banner) => this.renderBanner(banner))}</div>` : html`<div class="fs-empty">${t("أضف بانرات ترويجية من إعدادات العنصر", "Add promo banners from element settings")}</div>`}
          ${renderCommerceOutcome(this.config || {}, "stpb_")}
        </div>
      </section>
    `;
  }
};
__name(_StylePromoBanners, "StylePromoBanners"), _StylePromoBanners.styles = [
  sharedSectionCss,
  componentStyles,
  css`
      :host {
        direction: inherit;
      }
    `
];
let StylePromoBanners = _StylePromoBanners;
__decorateClass([
  property({ type: Object })
], StylePromoBanners.prototype, "config");
__decorateClass([
  state()
], StylePromoBanners.prototype, "activeIndex");
typeof StylePromoBanners < "u" && StylePromoBanners.registerSallaComponent("salla-style-promo-banners");
export {
  StylePromoBanners as default
};
