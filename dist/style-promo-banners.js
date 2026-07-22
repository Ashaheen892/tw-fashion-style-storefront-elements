var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, nothing, html } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { t, n as normalizeCollection, d as extractLink, l as localizedString, s as sharedSectionCss, i as isTruthy, p as prefersReducedMotion, v as isValidHref, r as readSectionTheme, a as themeStyleMap, b as renderCommerceOutcome } from "./sharedStyles-Q5qADHV9.js";
import { f as fsSwiperCss, d as destroyFsSwiper, m as mountFsSwiper, A as Autoplay } from "./fsSwiper-BQLtGSuN.js";
const componentStyles = css`
  :host {
    direction: inherit;
  }

  .stpb-shell {
    position: relative;
  }

  /* Swiper carousel wrapper */
  .stpb-carousel {
    position: relative;
  }

  .stpb-swiper {
    position: relative;
    overflow: hidden;
    border-radius: calc(var(--section-radius, 16px) * 0.95);
  }

  .stpb-slide {
    height: auto;
  }

  /* Single banner — full-bleed magazine style */
  .stpb-banner {
    position: relative;
    display: flex;
    align-items: flex-end;
    min-height: min(55vw, 420px);
    overflow: hidden;
    background: #1a1210;
    box-shadow: 0 14px 32px rgba(43, 33, 28, 0.1);
  }

  .fs-animate .stpb-banner {
    animation: stpb-rise 0.65s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .fs-animate .stpb-banner:nth-child(2) {
    animation-delay: 0.12s;
  }
  .fs-animate .stpb-banner:nth-child(3) {
    animation-delay: 0.2s;
  }

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
    pointer-events: none;
  }

  .stpb-banner:hover .stpb-banner__img {
    transform: scale(1.04);
  }

  .stpb-banner__shade {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(14, 9, 7, 0.05) 0%,
      rgba(14, 9, 7, 0.55) 60%,
      rgba(14, 9, 7, 0.82) 100%
    );
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
    box-shadow: 0 8px 20px
      color-mix(
        in srgb,
        var(--accent-color, var(--fs-store-primary)) 28%,
        transparent
      );
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

  /* Pagination dots below carousel */
  .stpb-dots {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.4rem;
    margin-top: 0.75rem;
  }

  .stpb-dot {
    display: inline-block;
    width: 0.5rem;
    height: 0.5rem;
    min-width: 0;
    min-height: 0;
    padding: 0;
    margin: 0 !important;
    border: 0;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.45);
    cursor: pointer;
    opacity: 1;
    transition: width 0.2s ease, background 0.2s ease, transform 0.2s ease;
  }

  .stpb-dot.is-active {
    width: 1.1rem;
    background: var(--fs-surface, var(--card-bg, #f0f0f0));
    transform: scale(1.1);
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

    .stpb-dots {
      margin-top: 0.6rem;
      gap: 0.3rem;
    }

    .stpb-dot {
      width: 0.4rem;
      height: 0.4rem;
    }

    .stpb-dot.is-active {
      width: 0.85rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .stpb-banner,
    .stpb-banner__img,
    .stpb-banner__cta,
    .stpb-dot {
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
    super(...arguments), this.config = {}, this.swiperReady = !1, this.boundLang = () => {
      this.requestUpdate(), queueMicrotask(() => this.remountSwiper());
    }, this.swiper = null, this.remountTimer = null;
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLang);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLang), this.remountTimer && clearTimeout(this.remountTimer), destroyFsSwiper(this.swiper), this.swiper = null, super.disconnectedCallback();
  }
  firstUpdated() {
    this.remountSwiper();
  }
  updated(changed) {
    changed.has("config") && this.scheduleRemount();
  }
  scheduleRemount() {
    this.remountTimer && clearTimeout(this.remountTimer), this.remountTimer = setTimeout(() => this.remountSwiper(), 0);
  }
  remountSwiper() {
    var _a;
    destroyFsSwiper(this.swiper), this.swiper = null, this.swiperReady = !1;
    const banners = this.banners, root = this.renderRoot.querySelector(".stpb-swiper");
    if (!root || banners.length < 1) return;
    const multi = banners.length > 1, autoplayOn = multi && isTruthy((_a = this.config) == null ? void 0 : _a.stpb_autoplay, !0) && !prefersReducedMotion(), pagEl = this.renderRoot.querySelector(".stpb-dots"), rtl = getComputedStyle(this).direction !== "ltr";
    this.swiper = mountFsSwiper(root, {
      rtl,
      modules: autoplayOn ? [Autoplay] : [],
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 480,
      loop: multi,
      watchOverflow: !0,
      pagination: multi && pagEl ? {
        el: pagEl,
        clickable: !0,
        bulletClass: "stpb-dot",
        bulletActiveClass: "is-active"
      } : void 0,
      autoplay: autoplayOn ? {
        delay: AUTOPLAY_MS,
        disableOnInteraction: !1,
        pauseOnMouseEnter: !0
      } : !1
    }), this.swiperReady = !0;
  }
  get banners() {
    var _a;
    return parsePromoBanners((_a = this.config) == null ? void 0 : _a.stpb_items);
  }
  renderBanner(banner, index) {
    return html`
      <article class="stpb-banner" aria-label=${banner.headline || t("عرض", "Promo")}>
        <img
          class="stpb-banner__img"
          src=${banner.image}
          alt=${banner.headline || ""}
          loading=${index === 0 ? "eager" : "lazy"}
          decoding="async"
          draggable="false"
        />
        <div class="stpb-banner__shade" aria-hidden="true"></div>
        <div class="stpb-banner__content">
          ${banner.headline ? html`<h3 class="stpb-banner__headline">${banner.headline}</h3>` : nothing}
          ${banner.subtitle ? html`<p class="stpb-banner__subtitle">${banner.subtitle}</p>` : nothing}
          ${isValidHref(banner.ctaUrl) && banner.ctaLabel ? html`<a
                class="stpb-banner__cta"
                href=${banner.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                draggable="false"
              >${banner.ctaLabel}<span class="stpb-banner__cta-arrow" aria-hidden="true">←</span></a>` : nothing}
        </div>
      </article>
    `;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "stpb_"), animate = theme.animate && !prefersReducedMotion(), title = localizedString(c.stpb_title) || t("عروض مميزة", "Featured Promotions"), desc = localizedString(c.stpb_desc), showTitle = isTruthy(c.stpb_show_title, !0), banners = this.banners, multi = banners.length > 1;
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

          ${banners.length ? html`
                <div class="stpb-carousel">
                  <div
                    class=${classMap({
      swiper: !0,
      "stpb-swiper": !0,
      "is-ready": this.swiperReady
    })}
                    role="region"
                    aria-roledescription="carousel"
                    aria-label=${title}
                  >
                    <div class="swiper-wrapper">
                      ${banners.map(
      (banner, i) => html`
                          <div class="swiper-slide stpb-slide">
                            ${this.renderBanner(banner, i)}
                          </div>
                        `
    )}
                    </div>
                  </div>

                  ${multi ? html`<div
                        class="stpb-dots"
                        aria-label=${t("شرائح العرض", "Promo slides")}
                      ></div>` : nothing}
                </div>
              ` : html`<div class="fs-empty">
                ${t(
      "أضف بانرات ترويجية من إعدادات العنصر",
      "Add promo banners from element settings"
    )}
              </div>`}

          ${renderCommerceOutcome(this.config || {}, "stpb_")}
        </div>
      </section>
    `;
  }
};
__name(_StylePromoBanners, "StylePromoBanners"), _StylePromoBanners.styles = [sharedSectionCss, fsSwiperCss, componentStyles];
let StylePromoBanners = _StylePromoBanners;
__decorateClass([
  property({ type: Object })
], StylePromoBanners.prototype, "config");
__decorateClass([
  state()
], StylePromoBanners.prototype, "swiperReady");
typeof StylePromoBanners < "u" && StylePromoBanners.registerSallaComponent("salla-style-promo-banners");
export {
  StylePromoBanners as default
};
