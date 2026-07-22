import { css as $, LitElement as E, nothing as b, html as p } from "lit";
import { property as S } from "lit/decorators.js";
import { classMap as _ } from "lit/directives/class-map.js";
import { ref as C } from "lit/directives/ref.js";
import { styleMap as D } from "lit/directives/style-map.js";
import { t as l, n as T, l as h, d as L, s as z, v, r as P, p as M, i as O, a as q, b as A } from "./sharedStyles-Cd7RKVf-.js";
const k = "__fsDragScrollCleanup", H = 6;
function I(c) {
  var f;
  if (!c) return;
  const e = c;
  (f = e[k]) == null || f.call(e);
  let t = null, n = 0, r = 0, i = !1;
  const o = (s) => {
    s.pointerType !== "mouse" || s.button !== 0 || e.scrollWidth <= e.clientWidth || (t = s.pointerId, n = s.clientX, r = e.scrollLeft, i = !1, e.style.scrollSnapType = "none", e.style.cursor = "grabbing");
  }, m = (s) => {
    if (t === null || s.pointerId !== t) return;
    const u = s.clientX - n;
    if (!i && Math.abs(u) > H) {
      i = !0;
      try {
        e.setPointerCapture(t);
      } catch {
      }
    }
    i && (s.preventDefault(), e.scrollLeft = r - u);
  }, d = (s) => {
    if (!(t === null || s.pointerId !== t)) {
      if (i)
        try {
          e.releasePointerCapture(t);
        } catch {
        }
      if (t = null, e.style.scrollSnapType = "", e.style.cursor = "", i) {
        const u = (w) => {
          w.preventDefault(), w.stopPropagation();
        };
        e.addEventListener("click", u, { capture: !0, once: !0 }), window.setTimeout(() => {
          e.removeEventListener("click", u, { capture: !0 });
        }, 0);
      }
      i = !1;
    }
  }, a = (s) => {
    s.preventDefault();
  };
  e.addEventListener("pointerdown", o), e.addEventListener("pointermove", m), e.addEventListener("pointerup", d), e.addEventListener("pointercancel", d), e.addEventListener("dragstart", a, { capture: !0 }), e.style.touchAction = "pan-x pan-y", e.scrollWidth > e.clientWidth && (e.style.cursor = "grab"), e[k] = () => {
    e.removeEventListener("pointerdown", o), e.removeEventListener("pointermove", m), e.removeEventListener("pointerup", d), e.removeEventListener("pointercancel", d), e.removeEventListener("dragstart", a, { capture: !0 });
  };
}
const W = $`
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
`, y = [
  {
    id: "evening",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
    title: l("سهرة", "Evening"),
    url: ""
  },
  {
    id: "daily",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80",
    title: l("يومي", "Daily"),
    url: ""
  },
  {
    id: "occasion",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
    title: l("مناسبات", "Occasions"),
    url: ""
  },
  {
    id: "new",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
    title: l("وصل حديثاً", "New in"),
    url: ""
  }
];
function X(c) {
  const e = T(c).map((t, n) => {
    const r = String(t.image || t.poster || "").trim(), i = h(t.title) || h(t.label), o = L(t.link) || L(t.url) || String(t.link || "").trim();
    return {
      id: String(t.id || `stc-${n}`),
      image: r,
      title: i,
      url: o
    };
  }).filter((t) => t.image || t.title);
  return e.length ? e.map((t, n) => {
    const r = y[n % y.length];
    return {
      ...t,
      image: t.image || r.image,
      title: t.title || r.title
    };
  }) : y.map((t) => ({ ...t }));
}
var j = Object.defineProperty, R = (c, e, t, n) => {
  for (var r = void 0, i = c.length - 1, o; i >= 0; i--)
    (o = c[i]) && (r = o(e, t, r) || r);
  return r && j(e, t, r), r;
};
const x = class x extends E {
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
    var e;
    return X((e = this.config) == null ? void 0 : e.stc_items);
  }
  openTile(e) {
    v(e) && window.open(e, "_blank", "noopener,noreferrer");
  }
  render() {
    const e = this.config || {}, t = P(e, "stc_"), n = t.animate && !M(), r = h(e.stc_title) || l("تصنيفات الأزياء", "Style Categories"), i = h(e.stc_desc), o = O(e.stc_show_title, !0), m = String(e.stc_layout || "grid"), d = this.tiles;
    return p`
      <section
        class=${_({ "fs-section": !0, "fs-animate": n, "stc-shell": !0 })}
        style=${D(q(t))}
        aria-label=${r}
      >
        <div class="fs-container">
          ${o ? p`<header class="stc-header">
                <p class="stc-eyebrow">${l("تشكيلتنا", "Our collection")}</p>
                <h2 class="stc-title">${r}</h2>
                <span class="stc-title-line" aria-hidden="true"></span>
                ${i ? p`<p class="stc-desc">${i}</p>` : b}
              </header>` : b}

          ${d.length ? p`
                <div
                  class=${_({ "stc-grid": m === "grid", "stc-slider": m === "slider" })}
                  role="list"
                  ${C((a) => {
      a instanceof HTMLElement && a.classList.contains("stc-slider") && I(a);
    })}
                >
                  ${d.map(
      (a) => p`
                      <a
                        class="stc-tile"
                        role="listitem"
                        href=${v(a.url) ? a.url : b}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabindex="0"
                        aria-label=${a.title || l("تصنيف", "Category")}
                        @click=${(f) => {
        v(a.url) || f.preventDefault();
      }}
                      >
                        <img class="stc-tile__img" src=${a.image} alt=${a.title || ""} loading="lazy" />
                        <div class="stc-tile__shade" aria-hidden="true"></div>
                        <div class="stc-tile__label">
                          ${a.title}
                          <span class="stc-tile__rule" aria-hidden="true"></span>
                        </div>
                      </a>
                    `
    )}
                </div>
              ` : p`<div class="stc-empty">${l("أضف تصنيفات من إعدادات العنصر", "Add categories from element settings")}</div>`}
          ${A(this.config || {}, "stc_")}
        </div>
      </section>
    `;
  }
};
x.styles = [
  z,
  W,
  $`
      :host {
        direction: inherit;
      }
    `
];
let g = x;
R([
  S({ type: Object })
], g.prototype, "config");
typeof g < "u" && g.registerSallaComponent("salla-style-categories");
export {
  g as default
};
