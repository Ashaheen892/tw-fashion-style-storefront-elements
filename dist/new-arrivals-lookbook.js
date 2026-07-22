import { css as z, LitElement as S, nothing as h, html as o } from "lit";
import { property as L, state as M, query as C } from "lit/decorators.js";
import { classMap as v } from "lit/directives/class-map.js";
import { styleMap as y } from "lit/directives/style-map.js";
import { n as E, l as u, d as k, u as _, q as $, s as Y, p as I, v as g, r as A, t as i, i as O, a as j, b as q } from "./sharedStyles-Cd7RKVf-.js";
const D = z`
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
    color: var(--text-color, #2b211c);
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
    color: var(--muted-color, #7a6a62);
    font-size: 0.95rem;
    line-height: 1.75;
  }

  .nal-gallery {
    display: flex;
    gap: 0.65rem;
    height: min(68vw, 460px);
    max-height: 560px;
  }

  .nal-item {
    position: relative;
    flex: 1 1 0;
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
    box-shadow: 0 14px 30px rgba(43, 33, 28, 0.1);
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
    flex: 3.2 1 0;
    filter: none;
    box-shadow:
      0 0 0 1px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 35%, transparent),
      0 22px 48px rgba(43, 33, 28, 0.18);
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
    color: var(--text-color, #2b211c);
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
    border: 1px solid var(--border-color, #e8ddd6);
    background:
      linear-gradient(
        120deg,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, var(--card-bg, #fff)),
        var(--card-bg, #fff) 55%
      );
    box-shadow: 0 12px 28px rgba(43, 33, 28, 0.06);
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
    color: var(--text-color, #2b211c);
  }

  .nal-dock__hint {
    margin: 0;
    font-size: 0.82rem;
    color: var(--muted-color, #7a6a62);
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
    color: var(--muted-color, #7a6a62);
    border: 1px dashed var(--border-color, #e8ddd6);
    border-radius: var(--section-radius, 16px);
  }

  @media (max-width: 767px) {
    .nal-gallery {
      height: auto;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scroll-behavior: smooth;
      padding: 0.2rem 0.1rem 0.45rem;
      scrollbar-width: none;
    }

    .nal-gallery::-webkit-scrollbar {
      display: none;
    }

    .nal-item,
    .nal-item.is-active {
      flex: 0 0 82%;
      height: 400px;
      scroll-snap-align: center;
      filter: none;
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
function R(b) {
  return E(b).map((e, a) => {
    const n = String(e.image || e.poster || "").trim(), r = u(e.label) || u(e.title), s = k(e.link) || k(e.url) || String(e.link || "").trim();
    return n ? {
      id: String(e.id || `nal-${a}`),
      image: n,
      label: r,
      url: s,
      spotX: _($(e.spot_x, 50), 5, 95),
      spotY: _($(e.spot_y, 50), 5, 95)
    } : null;
  }).filter((e) => !!e);
}
var V = Object.defineProperty, x = (b, e, a, n) => {
  for (var r = void 0, s = b.length - 1, c; s >= 0; s--)
    (c = b[s]) && (r = c(e, a, r) || r);
  return r && V(e, a, r), r;
};
const w = class w extends S {
  constructor() {
    super(...arguments), this.config = {}, this.activeId = "", this.boundLang = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLang), this.ensureActive();
  }
  disconnectedCallback() {
    var e;
    window.removeEventListener("language-changed", this.boundLang), (e = this.observer) == null || e.disconnect(), super.disconnectedCallback();
  }
  firstUpdated() {
    this.setupMobileObserver();
  }
  updated(e) {
    e.has("config") && (this.ensureActive(), this.setupMobileObserver());
  }
  get items() {
    var e;
    return R((e = this.config) == null ? void 0 : e.nal_items);
  }
  get activeItem() {
    return this.items.find((e) => e.id === this.activeId) || this.items[0] || null;
  }
  ensureActive() {
    const e = this.items;
    if (!e.length) {
      this.activeId = "";
      return;
    }
    e.some((a) => a.id === this.activeId) || (this.activeId = e[0].id);
  }
  setupMobileObserver() {
    var a;
    (a = this.observer) == null || a.disconnect();
    const e = this.galleryEl;
    !e || window.matchMedia("(min-width: 768px)").matches || (this.observer = new IntersectionObserver(
      (n) => {
        var c, m;
        const r = n.filter((l) => l.isIntersecting).sort((l, t) => t.intersectionRatio - l.intersectionRatio)[0], s = (m = (c = r == null ? void 0 : r.target) == null ? void 0 : c.dataset) == null ? void 0 : m.id;
        s && (this.activeId = s);
      },
      { root: e, threshold: [0.55, 0.75] }
    ), e.querySelectorAll(".nal-item").forEach((n) => {
      var r;
      return (r = this.observer) == null ? void 0 : r.observe(n);
    }));
  }
  selectItem(e, a = !1) {
    if (this.activeId = e.id, !a || !this.galleryEl) return;
    const n = this.galleryEl.querySelector(`[data-id="${e.id}"]`);
    n == null || n.scrollIntoView({
      behavior: I() ? "auto" : "smooth",
      inline: "center",
      block: "nearest"
    });
  }
  shift(e) {
    const a = this.items;
    if (!a.length) return;
    const n = Math.max(0, a.findIndex((s) => s.id === this.activeId)), r = Math.min(a.length - 1, Math.max(0, n + e));
    this.selectItem(a[r], !0);
  }
  openLink(e, a) {
    a == null || a.stopPropagation(), g(e.url) && window.open(e.url, "_blank", "noopener,noreferrer");
  }
  onGalleryKey(e) {
    e.key === "ArrowRight" ? (e.preventDefault(), this.shift(-1)) : e.key === "ArrowLeft" && (e.preventDefault(), this.shift(1));
  }
  render() {
    const e = this.config || {}, a = A(e, "nal_"), n = a.animate && !I(), r = u(e.nal_title) || i("وصل حديثا", "New Arrivals"), s = u(e.nal_desc), c = O(e.nal_show_title, !0), m = this.items, l = this.activeItem;
    return o`
      <section
        class=${v({ "fs-section": !0, "fs-animate": n, "nal-shell": !0 })}
        style=${y(j(a))}
        aria-label=${r}
      >
        <div class="fs-container">
          ${c ? o`<header class="nal-header">
                <p class="nal-eyebrow">${i("تشكيلة الموسم", "Season edit")}</p>
                <h2 class="nal-title">${r}</h2>
                <span class="nal-title-line" aria-hidden="true"></span>
                ${s ? o`<p class="nal-desc">${s}</p>` : h}
              </header>` : h}

          ${m.length ? o`
                <div
                  class="nal-gallery"
                  role="list"
                  tabindex="0"
                  aria-label=${i("معرض الوصل حديثاً — استخدم الأسهم للتنقل", "New arrivals gallery — use arrow keys")}
                  @keydown=${(t) => this.onGalleryKey(t)}
                >
                  ${m.map((t) => {
      const p = t.id === this.activeId;
      return o`
                      <article
                        class=${v({ "nal-item": !0, "is-active": p })}
                        role="listitem"
                        tabindex="0"
                        data-id=${t.id}
                        aria-current=${p ? "true" : "false"}
                        aria-label=${t.label || i("قطعة جديدة", "New piece")}
                        @click=${() => this.selectItem(t)}
                        @mouseenter=${() => this.selectItem(t)}
                        @focus=${() => this.selectItem(t)}
                        @keydown=${(f) => {
        (f.key === "Enter" || f.key === " ") && (f.preventDefault(), this.selectItem(t), g(t.url) && this.openLink(t));
      }}
                      >
                        <img class="nal-item__img" src=${t.image} alt=${t.label || ""} loading="lazy" />
                        <div class="nal-item__shade" aria-hidden="true"></div>
                        <span class="nal-badge">${i("جديد", "New")}</span>
                        ${t.label ? o`<h3 class="nal-item__label">${t.label}</h3>` : h}
                        ${g(t.url) ? o`
                              <span
                                class="nal-tip"
                                style=${y({ left: `${t.spotX}%`, top: `${t.spotY}%` })}
                              >
                                ${i("اكتشف التفاصيل", "Discover details")}
                              </span>
                              <button
                                type="button"
                                class="nal-spot"
                                style=${y({ left: `${t.spotX}%`, top: `${t.spotY}%` })}
                                aria-label=${i("عرض المنتج", "View product")}
                                @click=${(f) => this.openLink(t, f)}
                              >
                                <i class="sicon-add" aria-hidden="true"></i>
                              </button>
                            ` : h}
                      </article>
                    `;
    })}
                </div>

                ${l ? o`<div class="nal-dock">
                      <div class="nal-dock__meta">
                        <p class="nal-dock__kicker">${i("القطعة المختارة", "Selected look")}</p>
                        <h3 class="nal-dock__title">${l.label || i("قطعة جديدة", "New piece")}</h3>
                        <p class="nal-dock__hint">
                          ${i("مرّر على اللوحات أو استخدم الأسهم لاستكشاف التشكيلة", "Hover panels or use arrows to explore the edit")}
                        </p>
                      </div>
                      <button
                        type="button"
                        class="nal-dock__cta"
                        ?disabled=${!g(l.url)}
                        @click=${() => this.openLink(l)}
                      >
                        ${i("تسوق الآن", "Shop now")}
                        <span aria-hidden="true">→</span>
                      </button>
                    </div>` : h}

                <div class="nal-steps" role="tablist" aria-label=${i("قطع التشكيلة", "Looks")}>
                  ${m.map(
      (t, p) => o`
                      <button
                        type="button"
                        class=${v({ "nal-step": !0, "is-active": t.id === this.activeId })}
                        aria-label=${t.label || i(`قطعة ${p + 1}`, `Look ${p + 1}`)}
                        @click=${() => this.selectItem(t, !0)}
                      ></button>
                    `
    )}
                </div>
              ` : o`<div class="nal-empty">${i("أضف قطع «وصل حديثا» من إعدادات العنصر", "Add new-arrival looks from the element settings")}</div>`}
          ${q(this.config || {}, "nal_")}
        </div>
      </section>
    `;
  }
};
w.styles = [
  Y,
  D,
  z`
      :host {
        direction: inherit;
      }
    `
];
let d = w;
x([
  L({ type: Object })
], d.prototype, "config");
x([
  M()
], d.prototype, "activeId");
x([
  C(".nal-gallery")
], d.prototype, "galleryEl");
typeof d < "u" && d.registerSallaComponent("salla-new-arrivals-lookbook");
export {
  d as default
};
