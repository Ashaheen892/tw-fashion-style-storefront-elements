import { css as x, LitElement as w, nothing as l, html as o } from "lit";
import { property as k, state as _, query as $ } from "lit/decorators.js";
import { classMap as b } from "lit/directives/class-map.js";
import { styleMap as I } from "lit/directives/style-map.js";
import { n as z, d as M, l as u, s as S, p as y, t as n, r as C, i as E, a as L, b as Y } from "./sharedStyles-Cd7RKVf-.js";
const O = x`
  .sv-shell {
    position: relative;
    isolation: isolate;
  }

  .sv-shell::before {
    content: '';
    position: absolute;
    inset: 8% 5% auto;
    height: 55%;
    z-index: -1;
    border-radius: 50%;
    background: radial-gradient(
      ellipse at center,
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 22%, transparent),
      transparent 70%
    );
    filter: blur(28px);
    pointer-events: none;
  }

  .sv-header {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .sv-eyebrow {
    display: inline-block;
    margin: 0 0 0.55rem;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--accent-color, var(--fs-store-primary));
  }

  .sv-title {
    margin: 0;
    font-size: clamp(1.75rem, 3.4vw, 2.55rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.15;
    color: var(--text-color, #2b211c);
  }

  .sv-title-line {
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

  .sv-desc {
    margin: 0.9rem auto 0;
    max-width: 34rem;
    color: var(--muted-color, #7a6a62);
    font-size: 0.95rem;
    line-height: 1.75;
  }

  .sv-stage {
    position: relative;
  }

  .sv-nav {
    position: absolute;
    top: 42%;
    z-index: 3;
    transform: translateY(-50%);
    width: 2.6rem;
    height: 2.6rem;
    border: 1px solid color-mix(in srgb, var(--border-color, #e8ddd6) 80%, transparent);
    border-radius: 999px;
    display: grid;
    place-items: center;
    background: color-mix(in srgb, var(--card-bg, #fff) 92%, transparent);
    color: var(--text-color, #2b211c);
    box-shadow: 0 10px 24px rgba(43, 33, 28, 0.1);
    cursor: pointer;
    backdrop-filter: blur(8px);
    transition: transform 0.2s ease, background 0.2s ease, opacity 0.2s ease;
  }

  .sv-nav:hover {
    transform: translateY(-50%) scale(1.06);
    background: var(--card-bg, #fff);
  }

  .sv-nav:disabled {
    opacity: 0.35;
    cursor: default;
    transform: translateY(-50%);
  }

  .sv-nav--prev {
    inset-inline-start: -0.35rem;
  }

  .sv-nav--next {
    inset-inline-end: -0.35rem;
  }

  .sv-track {
    display: flex;
    gap: 0.85rem;
    overflow-x: auto;
    padding: 1.1rem 0.35rem 1.35rem;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }

  .sv-track::-webkit-scrollbar {
    display: none;
  }

  .sv-card {
    --sv-tilt: 0deg;
    flex: 0 0 clamp(148px, 30vw, 210px);
    scroll-snap-align: center;
    transform: perspective(900px) rotateY(var(--sv-tilt));
    transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease;
    opacity: 0.72;
  }

  .sv-card.is-focus {
    --sv-tilt: 0deg;
    opacity: 1;
    z-index: 1;
  }

  .sv-card:not(.is-focus) {
    --sv-tilt: -4deg;
  }

  .sv-card:nth-child(even):not(.is-focus) {
    --sv-tilt: 4deg;
  }

  .fs-animate .sv-card {
    animation: sv-rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .fs-animate .sv-card:nth-child(1) { animation-delay: 0.05s; }
  .fs-animate .sv-card:nth-child(2) { animation-delay: 0.12s; }
  .fs-animate .sv-card:nth-child(3) { animation-delay: 0.19s; }
  .fs-animate .sv-card:nth-child(4) { animation-delay: 0.26s; }
  .fs-animate .sv-card:nth-child(5) { animation-delay: 0.33s; }
  .fs-animate .sv-card:nth-child(6) { animation-delay: 0.4s; }

  @keyframes sv-rise {
    from {
      opacity: 0;
      transform: translateY(28px) scale(0.94);
    }
    to {
      opacity: 0.72;
      transform: perspective(900px) rotateY(var(--sv-tilt));
    }
  }

  .sv-thumb {
    position: relative;
    display: block;
    width: 100%;
    aspect-ratio: 9 / 16;
    border: 0;
    padding: 0;
    border-radius: calc(var(--section-radius, 16px) * 0.95);
    overflow: hidden;
    cursor: pointer;
    background: #1a1210;
    box-shadow: 0 16px 34px rgba(43, 33, 28, 0.14);
    transition: box-shadow 0.35s ease, transform 0.35s ease;
  }

  .sv-card.is-focus .sv-thumb {
    transform: translateY(-6px) scale(1.03);
    box-shadow:
      0 0 0 2px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 55%, transparent),
      0 22px 44px rgba(43, 33, 28, 0.22);
  }

  .sv-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .sv-thumb:hover img,
  .sv-thumb:focus-visible img,
  .sv-card.is-focus .sv-thumb img {
    transform: scale(1.06);
  }

  .sv-film {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.08), transparent 22%),
      linear-gradient(180deg, transparent 55%, rgba(12, 8, 6, 0.72));
  }

  .sv-film::after {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0;
    background: linear-gradient(
      115deg,
      transparent 35%,
      rgba(255, 255, 255, 0.18) 48%,
      transparent 62%
    );
    transform: translateX(-40%);
    transition: opacity 0.2s ease;
  }

  .sv-thumb:hover .sv-film::after,
  .sv-card.is-focus .sv-film::after {
    opacity: 1;
    animation: sv-shine 1.4s ease;
  }

  @keyframes sv-shine {
    from { transform: translateX(-55%); }
    to { transform: translateX(55%); }
  }

  .sv-play {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    pointer-events: none;
  }

  .sv-play__btn {
    position: relative;
    width: 3.15rem;
    height: 3.15rem;
    border-radius: 999px;
    display: grid;
    place-items: center;
    background: color-mix(in srgb, var(--card-bg, #ffffff) 92%, var(--fs-surface, #f0f0f0));
    color: var(--accent-color, var(--fs-store-primary));
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.22);
    transition: transform 0.25s ease;
  }

  .sv-play__btn::before,
  .sv-play__btn::after {
    content: '';
    position: absolute;
    inset: -6px;
    border-radius: inherit;
    border: 1.5px solid rgba(255, 255, 255, 0.55);
    animation: sv-pulse 2.4s ease-out infinite;
  }

  .sv-play__btn::after {
    animation-delay: 0.8s;
  }

  .sv-card.is-focus .sv-play__btn {
    transform: scale(1.08);
  }

  .sv-thumb:hover .sv-play__btn {
    transform: scale(1.12);
  }

  @keyframes sv-pulse {
    0% {
      transform: scale(0.92);
      opacity: 0.7;
    }
    100% {
      transform: scale(1.35);
      opacity: 0;
    }
  }

  .sv-play__btn i {
    font-size: 1.15rem;
    margin-inline-start: 2px;
  }

  .sv-index {
    position: absolute;
    top: 0.65rem;
    inset-inline-start: 0.65rem;
    padding: 0.2rem 0.5rem;
    border-radius: 999px;
    background: rgba(18, 12, 10, 0.45);
    color: #fff;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    backdrop-filter: blur(6px);
  }

  .sv-caption {
    margin: 0.7rem 0 0;
    font-size: 0.88rem;
    font-weight: 700;
    text-align: center;
    color: var(--text-color, #2b211c);
    line-height: 1.35;
    transition: color 0.25s ease;
  }

  .sv-card.is-focus .sv-caption {
    color: var(--accent-color, var(--fs-store-primary));
  }

  .sv-dots {
    display: flex;
    justify-content: center;
    gap: 0.4rem;
    margin-top: 0.15rem;
  }

  .sv-dot {
    width: 0.45rem;
    height: 0.45rem;
    border: 0;
    padding: 0;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 28%, #ddd);
    cursor: pointer;
    transition: width 0.25s ease, background 0.25s ease;
  }

  .sv-dot.is-active {
    width: 1.35rem;
    background: var(--button-bg, var(--accent-color, var(--fs-store-primary)));
  }

  .sv-empty {
    padding: 2.25rem 1rem;
    text-align: center;
    color: var(--muted-color, #7a6a62);
    border: 1px dashed var(--border-color, #e8ddd6);
    border-radius: var(--section-radius, 16px);
    background: color-mix(in srgb, var(--card-bg, #fff) 70%, transparent);
  }

  .sv-modal {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: grid;
    place-items: center;
    padding: 1rem;
    background: rgba(12, 8, 6, 0.82);
    backdrop-filter: blur(8px);
    animation: sv-fade 0.22s ease;
  }

  @keyframes sv-fade {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .sv-modal__panel {
    position: relative;
    width: min(420px, 100%);
    aspect-ratio: 9 / 16;
    max-height: min(88vh, 760px);
    background: #000;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 28px 70px rgba(0, 0, 0, 0.5);
    animation: sv-pop 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  }

  @keyframes sv-pop {
    from {
      opacity: 0;
      transform: translateY(18px) scale(0.94);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  .sv-modal__panel iframe,
  .sv-modal__panel video,
  .sv-modal__panel img {
    width: 100%;
    height: 100%;
    border: 0;
    display: block;
    object-fit: cover;
  }

  .sv-modal__close {
    position: absolute;
    top: 0.7rem;
    inset-inline-end: 0.7rem;
    z-index: 2;
    width: 2.35rem;
    height: 2.35rem;
    border: 0;
    border-radius: 999px;
    background: color-mix(in srgb, var(--card-bg, #ffffff) 92%, var(--fs-surface, #f0f0f0));
    color: #2b211c;
    cursor: pointer;
    font-size: 1.15rem;
    line-height: 1;
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.2);
  }

  .sv-modal__cap {
    position: absolute;
    inset-inline: 0;
    bottom: 0;
    z-index: 2;
    margin: 0;
    padding: 1.4rem 1rem 1rem;
    color: #fff;
    font-size: 0.95rem;
    font-weight: 700;
    background: linear-gradient(180deg, transparent, rgba(10, 6, 4, 0.78));
  }

  .sv-modal__nav {
    position: absolute;
    top: 50%;
    z-index: 2;
    transform: translateY(-50%);
    width: 2.2rem;
    height: 2.2rem;
    border: 0;
    border-radius: 999px;
    display: grid;
    place-items: center;
    background: color-mix(in srgb, var(--card-bg, #ffffff) 92%, var(--fs-surface, #f0f0f0));
    color: #2b211c;
    cursor: pointer;
  }

  .sv-modal__nav--prev {
    inset-inline-start: 0.55rem;
  }

  .sv-modal__nav--next {
    inset-inline-end: 0.55rem;
  }

  @media (max-width: 767px) {
    .sv-nav {
      display: none;
    }

    .sv-card {
      flex-basis: clamp(150px, 58vw, 210px);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .sv-card,
    .sv-thumb,
    .sv-thumb img,
    .sv-play__btn,
    .sv-modal,
    .sv-modal__panel,
    .sv-dot {
      animation: none !important;
      transition: none !important;
    }

    .sv-card {
      opacity: 1;
      transform: none;
    }

    .sv-play__btn::before,
    .sv-play__btn::after,
    .sv-film::after {
      display: none;
    }
  }
`;
function P(c) {
  var t, e;
  if (!c) return "";
  try {
    const s = new URL(c);
    return s.hostname.includes("youtu.be") ? s.pathname.replace("/", "").split("/")[0] || "" : s.pathname.includes("/shorts/") ? ((t = s.pathname.split("/shorts/")[1]) == null ? void 0 : t.split(/[/?#]/)[0]) || "" : s.pathname.includes("/embed/") ? ((e = s.pathname.split("/embed/")[1]) == null ? void 0 : e.split(/[/?#]/)[0]) || "" : s.searchParams.get("v") || "";
  } catch {
    return "";
  }
}
function T(c) {
  const t = P(c);
  return t ? `https://www.youtube.com/embed/${t}?autoplay=1&rel=0` : "";
}
function U(c) {
  return z(c).map((t, e) => {
    const s = String(t.poster || t.image || "").trim(), a = M(t.video_url) || String(t.video_url || t.youtube || "").trim(), r = u(t.caption) || u(t.title);
    return !s && !a ? null : {
      id: String(t.id || `sv-${e}`),
      poster: s,
      videoUrl: a,
      caption: r
    };
  }).filter((t) => !!t);
}
var F = Object.defineProperty, h = (c, t, e, s) => {
  for (var a = void 0, r = c.length - 1, p; r >= 0; r--)
    (p = c[r]) && (a = p(t, e, a) || a);
  return a && F(t, e, a), a;
};
const g = class g extends w {
  constructor() {
    super(...arguments), this.config = {}, this.active = null, this.focusId = "", this.boundLang = () => this.requestUpdate(), this.boundKey = (t) => {
      this.active && (t.key === "Escape" && this.closeModal(), t.key === "ArrowRight" && this.shiftModal(-1), t.key === "ArrowLeft" && this.shiftModal(1));
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLang), window.addEventListener("keydown", this.boundKey);
  }
  disconnectedCallback() {
    var t;
    window.removeEventListener("language-changed", this.boundLang), window.removeEventListener("keydown", this.boundKey), (t = this.observer) == null || t.disconnect(), super.disconnectedCallback();
  }
  firstUpdated() {
    this.setupObserver(), this.ensureFocus();
  }
  updated(t) {
    t.has("config") && (this.ensureFocus(), this.setupObserver());
  }
  get videos() {
    var t;
    return U((t = this.config) == null ? void 0 : t.sv_videos);
  }
  ensureFocus() {
    const t = this.videos;
    if (!t.length) {
      this.focusId = "";
      return;
    }
    t.some((e) => e.id === this.focusId) || (this.focusId = t[0].id);
  }
  setupObserver() {
    var e;
    (e = this.observer) == null || e.disconnect();
    const t = this.trackEl;
    t && (this.observer = new IntersectionObserver(
      (s) => {
        var p, v;
        const a = s.filter((m) => m.isIntersecting).sort((m, i) => i.intersectionRatio - m.intersectionRatio)[0], r = (v = (p = a == null ? void 0 : a.target) == null ? void 0 : p.dataset) == null ? void 0 : v.id;
        r && (this.focusId = r);
      },
      { root: t, threshold: [0.45, 0.7, 0.9] }
    ), t.querySelectorAll(".sv-card").forEach((s) => {
      var a;
      return (a = this.observer) == null ? void 0 : a.observe(s);
    }));
  }
  scrollToIndex(t) {
    const e = this.trackEl, s = e == null ? void 0 : e.querySelectorAll(".sv-card")[t];
    s == null || s.scrollIntoView({ behavior: y() ? "auto" : "smooth", inline: "center", block: "nearest" });
  }
  focusIndex() {
    return Math.max(0, this.videos.findIndex((t) => t.id === this.focusId));
  }
  shiftFocus(t) {
    const e = this.videos;
    if (!e.length) return;
    const s = Math.min(e.length - 1, Math.max(0, this.focusIndex() + t));
    this.focusId = e[s].id, this.scrollToIndex(s);
  }
  openModal(t) {
    !t.videoUrl && !t.poster || (this.active = t, this.focusId = t.id);
  }
  closeModal() {
    this.active = null;
  }
  shiftModal(t) {
    const e = this.videos;
    if (!this.active || e.length < 2) return;
    const a = (e.findIndex((r) => r.id === this.active.id) + t + e.length) % e.length;
    this.active = e[a], this.focusId = e[a].id, this.scrollToIndex(a);
  }
  renderModal() {
    if (!this.active) return l;
    const t = this.active.videoUrl, e = T(t), a = this.videos.length > 1;
    return o`
      <div class="sv-modal" role="dialog" aria-modal="true" @click=${() => this.closeModal()}>
        <div class="sv-modal__panel" @click=${(r) => r.stopPropagation()}>
          <button
            type="button"
            class="sv-modal__close"
            aria-label=${n("إغلاق", "Close")}
            @click=${() => this.closeModal()}
          >
            ×
          </button>
          ${a ? o`
                <button
                  type="button"
                  class="sv-modal__nav sv-modal__nav--prev"
                  aria-label=${n("السابق", "Previous")}
                  @click=${() => this.shiftModal(1)}
                >
                  ‹
                </button>
                <button
                  type="button"
                  class="sv-modal__nav sv-modal__nav--next"
                  aria-label=${n("التالي", "Next")}
                  @click=${() => this.shiftModal(-1)}
                >
                  ›
                </button>
              ` : l}
          ${e ? o`<iframe
                src=${e}
                title=${this.active.caption || n("فيديو", "Video")}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>` : t ? o`<video src=${t} controls autoplay playsinline></video>` : this.active.poster ? o`<img src=${this.active.poster} alt=${this.active.caption || ""} />` : l}
          ${this.active.caption ? o`<p class="sv-modal__cap">${this.active.caption}</p>` : l}
        </div>
      </div>
    `;
  }
  render() {
    const t = this.config || {}, e = C(t, "sv_"), s = e.animate && !y(), a = u(t.sv_title) || n("تألقي", "Shine"), r = u(t.sv_desc), p = E(t.sv_show_title, !0), v = this.videos, m = this.focusIndex();
    return o`
      <section
        class=${b({ "fs-section": !0, "fs-animate": s, "sv-shell": !0 })}
        style=${I(L(e))}
        aria-label=${a}
      >
        <div class="fs-container">
          ${p ? o`<header class="sv-header">
                <p class="sv-eyebrow">${n("لحظات الأناقة", "Style moments")}</p>
                <h2 class="sv-title">${a}</h2>
                <span class="sv-title-line" aria-hidden="true"></span>
                ${r ? o`<p class="sv-desc">${r}</p>` : l}
              </header>` : l}

          ${v.length ? o`<div class="sv-stage">
                <button
                  type="button"
                  class="sv-nav sv-nav--prev"
                  aria-label=${n("السابق", "Previous")}
                  ?disabled=${m <= 0}
                  @click=${() => this.shiftFocus(-1)}
                >
                  ‹
                </button>
                <button
                  type="button"
                  class="sv-nav sv-nav--next"
                  aria-label=${n("التالي", "Next")}
                  ?disabled=${m >= v.length - 1}
                  @click=${() => this.shiftFocus(1)}
                >
                  ›
                </button>

                <div class="sv-track" role="list">
                  ${v.map(
      (i, f) => o`
                      <article
                        class=${b({ "sv-card": !0, "is-focus": i.id === this.focusId })}
                        role="listitem"
                        data-id=${i.id}
                      >
                        <button
                          type="button"
                          class="sv-thumb"
                          aria-label=${i.caption || n("تشغيل الفيديو", "Play video")}
                          @click=${() => this.openModal(i)}
                          @focus=${() => {
        this.focusId = i.id;
      }}
                        >
                          ${i.poster ? o`<img src=${i.poster} alt=${i.caption || ""} loading="lazy" />` : l}
                          <span class="sv-film" aria-hidden="true"></span>
                          <span class="sv-index">${String(f + 1).padStart(2, "0")}</span>
                          <span class="sv-play" aria-hidden="true">
                            <span class="sv-play__btn"><i class="sicon-play"></i></span>
                          </span>
                        </button>
                        ${i.caption ? o`<p class="sv-caption">${i.caption}</p>` : l}
                      </article>
                    `
    )}
                </div>

                <div class="sv-dots" role="tablist" aria-label=${n("التنقل بين المقاطع", "Browse clips")}>
                  ${v.map(
      (i, f) => o`
                      <button
                        type="button"
                        class=${b({ "sv-dot": !0, "is-active": i.id === this.focusId })}
                        aria-label=${n(`مقطع ${f + 1}`, `Clip ${f + 1}`)}
                        @click=${() => {
        this.focusId = i.id, this.scrollToIndex(f);
      }}
                      ></button>
                    `
    )}
                </div>
              </div>` : o`<div class="sv-empty">${n("أضف مقاطع فيديو من إعدادات العنصر", "Add videos from the element settings")}</div>`}
        </div>
        ${Y(this.config || {}, "sv_")}
        ${this.renderModal()}
      </section>
    `;
  }
};
g.styles = [
  S,
  O,
  x`
      :host {
        direction: inherit;
      }
    `
];
let d = g;
h([
  k({ type: Object })
], d.prototype, "config");
h([
  _()
], d.prototype, "active");
h([
  _()
], d.prototype, "focusId");
h([
  $(".sv-track")
], d.prototype, "trackEl");
typeof d < "u" && d.registerSallaComponent("salla-shine-videos");
export {
  d as default
};
