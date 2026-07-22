import { css as v, LitElement as w, nothing as c, html as r } from "lit";
import { property as $, state as k } from "lit/decorators.js";
import { classMap as m } from "lit/directives/class-map.js";
import { styleMap as f } from "lit/directives/style-map.js";
import { t as i, n as S, d as g, l as o, s as L, i as _, v as T, r as A, p as C, a as z, b as I } from "./sharedStyles-Cd7RKVf-.js";
const X = v`
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
`, h = [
  {
    id: "collection",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1400&q=80",
    headline: i("مجموعة الموسم", "Season collection"),
    subtitle: i("قصّات هادئة بتفاصيل فاخرة", "Quiet cuts with refined detail"),
    ctaLabel: i("تسوّقي الآن", "Shop now"),
    ctaUrl: ""
  },
  {
    id: "lookbook",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=80",
    headline: i("لوكبوك جديد", "New lookbook"),
    subtitle: i("إطلالات جاهزة من المحل", "Ready looks from the boutique"),
    ctaLabel: i("شاهدي اللوكبوك", "View lookbook"),
    ctaUrl: ""
  }
];
function P(p) {
  const t = S(p).map((e, n) => {
    const a = String(e.image || e.poster || "").trim();
    return {
      id: String(e.id || `stpb-${n}`),
      image: a,
      headline: o(e.headline) || o(e.title) || "",
      subtitle: o(e.subtitle) || o(e.desc) || "",
      ctaLabel: o(e.cta_label) || "",
      ctaUrl: g(e.cta_link) || g(e.link) || String(e.link || "").trim()
    };
  }).filter((e) => e.image || e.headline);
  return t.length ? t.map((e, n) => {
    const a = h[n % h.length];
    return {
      ...e,
      image: e.image || a.image,
      headline: e.headline || a.headline,
      subtitle: e.subtitle || a.subtitle,
      ctaLabel: e.ctaLabel || a.ctaLabel
    };
  }) : h.map((e) => ({ ...e }));
}
var U = Object.defineProperty, y = (p, t, e, n) => {
  for (var a = void 0, s = p.length - 1, d; s >= 0; s--)
    (d = p[s]) && (a = d(t, e, a) || a);
  return a && U(t, e, a), a;
};
const M = 5e3, u = class u extends w {
  constructor() {
    super(...arguments), this.config = {}, this.activeIndex = 0, this.boundLang = () => this.requestUpdate(), this.autoTimer = null, this.swipeStartX = null, this.onPointerDown = (t) => {
      t.pointerType === "mouse" && t.button !== 0 || (this.swipeStartX = t.clientX, this.clearAutoplay());
    }, this.onPointerUp = (t) => {
      const e = this.swipeStartX;
      if (this.swipeStartX = null, this.syncAutoplay(), e == null) return;
      const n = t.clientX - e;
      if (Math.abs(n) < 40) return;
      (getComputedStyle(this).direction === "rtl" ? n > 0 : n < 0) ? this.next() : this.prev();
    }, this.onPointerCancel = () => {
      this.swipeStartX = null, this.syncAutoplay();
    }, this.onDragStart = (t) => t.preventDefault();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLang), this.syncAutoplay();
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLang), this.clearAutoplay(), super.disconnectedCallback();
  }
  updated(t) {
    if (t.has("config")) {
      const e = this.banners;
      this.activeIndex >= e.length && (this.activeIndex = 0), this.syncAutoplay();
    }
  }
  get banners() {
    var t;
    return P((t = this.config) == null ? void 0 : t.stpb_items);
  }
  get carouselMode() {
    var t;
    return _((t = this.config) == null ? void 0 : t.stpb_autoplay, !0) && this.banners.length > 1;
  }
  clearAutoplay() {
    this.autoTimer && (clearInterval(this.autoTimer), this.autoTimer = null);
  }
  syncAutoplay() {
    this.clearAutoplay(), this.carouselMode && (this.autoTimer = setInterval(() => this.next(), M));
  }
  goTo(t) {
    const e = this.banners.length;
    e && (this.activeIndex = (t % e + e) % e, this.syncAutoplay());
  }
  prev() {
    this.goTo(this.activeIndex - 1);
  }
  next() {
    this.goTo(this.activeIndex + 1);
  }
  renderBanner(t) {
    return r`
      <article class="stpb-banner" aria-label=${t.headline || i("عرض", "Promo")}>
        <img class="stpb-banner__img" src=${t.image} alt=${t.headline || ""} loading="lazy" />
        <div class="stpb-banner__shade" aria-hidden="true"></div>
        <div class="stpb-banner__content">
          ${t.headline ? r`<h3 class="stpb-banner__headline">${t.headline}</h3>` : c}
          ${t.subtitle ? r`<p class="stpb-banner__subtitle">${t.subtitle}</p>` : c}
          ${T(t.ctaUrl) && t.ctaLabel ? r`<a
                class="stpb-banner__cta"
                href=${t.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
              >${t.ctaLabel}<span class="stpb-banner__cta-arrow" aria-hidden="true">←</span></a>` : c}
        </div>
      </article>
    `;
  }
  renderCarousel(t) {
    const e = (getComputedStyle(this).direction || "ltr") === "rtl", n = this.activeIndex * 100 * (e ? 1 : -1);
    return r`
      <div
        class="stpb-carousel"
        role="region"
        aria-roledescription="carousel"
        @pointerdown=${this.onPointerDown}
        @pointerup=${this.onPointerUp}
        @pointercancel=${this.onPointerCancel}
        @dragstart=${this.onDragStart}
      >
        <div class="stpb-carousel__track" style=${f({ transform: `translateX(${n}%)` })}>
          ${t.map(
      (a, s) => r`<div
              class="stpb-carousel__slide"
              aria-hidden=${s === this.activeIndex ? "false" : "true"}
            >${this.renderBanner(a)}</div>`
    )}
        </div>
        <div class="stpb-dots" role="tablist">
          ${t.map(
      (a, s) => r`<button
              type="button"
              role="tab"
              class=${m({ "stpb-dot": !0, "is-active": s === this.activeIndex })}
              aria-selected=${s === this.activeIndex ? "true" : "false"}
              aria-label=${`${s + 1}`}
              @click=${() => this.goTo(s)}
            ></button>`
    )}
        </div>
      </div>
    `;
  }
  render() {
    const t = this.config || {}, e = A(t, "stpb_"), n = e.animate && !C(), a = o(t.stpb_title) || i("عروض مميزة", "Featured Promotions"), s = o(t.stpb_desc), d = _(t.stpb_show_title, !0), b = this.banners;
    return r`
      <section
        class=${m({ "fs-section": !0, "fs-animate": n, "stpb-shell": !0 })}
        style=${f(z(e))}
        aria-label=${a}
      >
        <div class="fs-container">
          ${d ? r`<header class="fs-header fs-header--editorial">
                <p class="fs-eyebrow">${i("حصريًا", "Exclusive")}</p>
                <h2 class="fs-title">${a}</h2>
                <span class="fs-title-line" aria-hidden="true"></span>
                ${s ? r`<p class="fs-desc">${s}</p>` : c}
              </header>` : c}

          ${b.length ? this.carouselMode ? this.renderCarousel(b) : r`<div class="stpb-banners">${b.map((x) => this.renderBanner(x))}</div>` : r`<div class="fs-empty">${i("أضف بانرات ترويجية من إعدادات العنصر", "Add promo banners from element settings")}</div>`}
          ${I(this.config || {}, "stpb_")}
        </div>
      </section>
    `;
  }
};
u.styles = [
  L,
  X,
  v`
      :host {
        direction: inherit;
      }
    `
];
let l = u;
y([
  $({ type: Object })
], l.prototype, "config");
y([
  k()
], l.prototype, "activeIndex");
typeof l < "u" && l.registerSallaComponent("salla-style-promo-banners");
export {
  l as default
};
