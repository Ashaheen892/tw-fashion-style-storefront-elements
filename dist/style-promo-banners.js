import { css as u, LitElement as _, nothing as c, html as r } from "lit";
import { property as v } from "lit/decorators.js";
import { classMap as w } from "lit/directives/class-map.js";
import { styleMap as y } from "lit/directives/style-map.js";
import { t as s, n as x, d as g, l as i, s as $, r as k, p as L, i as z, a as S, A as C, b as U } from "./sharedStyles-BYm1OK6w.js";
const E = u`
  .stpb-shell {
    position: relative;
  }

  /* Banners stack */
  .stpb-banners {
    display: grid;
    gap: 1.35rem;
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
    gap: 0.4rem;
    padding: 0;
    border: 0;
    background: none;
    color: #fff;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    transition: opacity 0.2s ease;
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    padding-bottom: 0.2rem;
  }

  .stpb-banner__cta:hover {
    opacity: 0.75;
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
`, m = [
  {
    id: "collection",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1400&q=80",
    headline: s("مجموعة الموسم", "Season collection"),
    subtitle: s("قصّات هادئة بتفاصيل فاخرة", "Quiet cuts with refined detail"),
    ctaLabel: s("تسوّقي الآن", "Shop now"),
    ctaUrl: ""
  },
  {
    id: "lookbook",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=80",
    headline: s("لوكبوك جديد", "New lookbook"),
    subtitle: s("إطلالات جاهزة من المحل", "Ready looks from the boutique"),
    ctaLabel: s("شاهدي اللوكبوك", "View lookbook"),
    ctaUrl: ""
  }
];
function T(p) {
  const a = x(p).map((e, o) => {
    const t = String(e.image || e.poster || "").trim();
    return {
      id: String(e.id || `stpb-${o}`),
      image: t,
      headline: i(e.headline) || i(e.title) || "",
      subtitle: i(e.subtitle) || i(e.desc) || "",
      ctaLabel: i(e.cta_label) || "",
      ctaUrl: g(e.cta_link) || g(e.link) || String(e.link || "").trim()
    };
  }).filter((e) => e.image || e.headline);
  return a.length ? a.map((e, o) => {
    const t = m[o % m.length];
    return {
      ...e,
      image: e.image || t.image,
      headline: e.headline || t.headline,
      subtitle: e.subtitle || t.subtitle,
      ctaLabel: e.ctaLabel || t.ctaLabel
    };
  }) : m.map((e) => ({ ...e }));
}
var q = Object.defineProperty, M = (p, a, e, o) => {
  for (var t = void 0, l = p.length - 1, d; l >= 0; l--)
    (d = p[l]) && (t = d(a, e, t) || t);
  return t && q(a, e, t), t;
};
const h = class h extends _ {
  constructor() {
    super(...arguments), this.config = {}, this.boundLang = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLang);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLang), super.disconnectedCallback();
  }
  get banners() {
    var a;
    return T((a = this.config) == null ? void 0 : a.stpb_items);
  }
  render() {
    const a = this.config || {}, e = k(a, "stpb_"), o = e.animate && !L(), t = i(a.stpb_title) || s("عروض مميزة", "Featured Promotions"), l = i(a.stpb_desc), d = z(a.stpb_show_title, !0), f = this.banners;
    return r`
      <section
        class=${w({ "fs-section": !0, "fs-animate": o, "stpb-shell": !0 })}
        style=${y(S(e))}
        aria-label=${t}
      >
        <div class="fs-container">
          ${d ? r`<header class="fs-header fs-header--editorial">
                <p class="fs-eyebrow">${s("حصريًا", "Exclusive")}</p>
                <h2 class="fs-title">${t}</h2>
                <span class="fs-title-line" aria-hidden="true"></span>
                ${l ? r`<p class="fs-desc">${l}</p>` : c}
              </header>` : c}

          ${f.length ? r`
                <div class="stpb-banners">
                  ${f.map(
      (n) => r`
                      <article class="stpb-banner" aria-label=${n.headline || s("عرض", "Promo")}>
                        <img class="stpb-banner__img" src=${n.image} alt=${n.headline || ""} loading="lazy" />
                        <div class="stpb-banner__shade" aria-hidden="true"></div>
                        <div class="stpb-banner__content">
                          ${n.headline ? r`<h3 class="stpb-banner__headline">${n.headline}</h3>` : c}
                          ${n.subtitle ? r`<p class="stpb-banner__subtitle">${n.subtitle}</p>` : c}
                          ${C(n.ctaUrl) && n.ctaLabel ? r`<a
                                class="stpb-banner__cta"
                                href=${n.ctaUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >${n.ctaLabel}<span class="stpb-banner__cta-arrow" aria-hidden="true">←</span></a>` : c}
                        </div>
                      </article>
                    `
    )}
                </div>
              ` : r`<div class="fs-empty">${s("أضف بانرات ترويجية من إعدادات العنصر", "Add promo banners from element settings")}</div>`}
          ${U(this.config || {}, "stpb_")}
        </div>
      </section>
    `;
  }
};
h.styles = [
  $,
  E,
  u`
      :host {
        direction: inherit;
      }
    `
];
let b = h;
M([
  v({ type: Object })
], b.prototype, "config");
typeof b < "u" && b.registerSallaComponent("salla-style-promo-banners");
export {
  b as default
};
