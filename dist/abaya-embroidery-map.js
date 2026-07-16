import { css as C, LitElement as R, html as o, nothing as s } from "lit";
import { property as N, state as b, query as E } from "lit/decorators.js";
import { classMap as x } from "lit/directives/class-map.js";
import { ifDefined as _ } from "lit/directives/if-defined.js";
import { styleMap as $ } from "lit/directives/style-map.js";
import { n as H, l as u, u as S, i as f, b as O, e as T, q as w, v as q, d as P, s as Z, p as k, r as I, a as j, t as c, w as z } from "./sharedStyles-C1vUkqEN.js";
const V = C`
  .aem-shell {
    display: grid;
    gap: 1.25rem;
  }

  .aem-cta {
    display: flex;
    justify-content: center;
  }

  .aem-desk {
    position: relative;
    display: grid;
    grid-template-columns: minmax(180px, 1fr) minmax(240px, var(--aem-max-width, 420px)) minmax(180px, 1fr);
    gap: 1.25rem 1.5rem;
    align-items: start;
  }

  .aem-desk--compact {
    grid-template-columns: minmax(160px, 0.85fr) minmax(260px, var(--aem-max-width, 420px)) minmax(160px, 0.85fr);
    gap: 1rem;
  }

  .aem-stage-stack {
    display: grid;
    gap: 0.65rem;
    min-width: 0;
  }

  .aem-col {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    min-width: 0;
    justify-content: center;
    padding-block: 0.35rem;
    min-height: 8rem;
  }

  .aem-col__placeholder {
    min-height: 1px;
  }

  .aem-card-slot {
    min-width: 0;
  }

  .aem-card-slot--in {
    animation: aem-card-in 0.35s ease both;
  }

  .aem-col--left .aem-card-slot--in {
    animation: aem-slide-left 0.35s ease both;
  }

  .aem-col--right .aem-card-slot--in {
    animation: aem-slide-right 0.35s ease both;
  }

  .aem-pick-hint {
    margin: 0;
    min-height: 2.6rem;
    text-align: center;
    font-size: 0.88rem;
    font-weight: 600;
    color: var(--muted-color, #7a6a62);
    line-height: 1.55;
  }

  .aem-pick-hint--hidden {
    visibility: hidden;
    pointer-events: none;
  }

  .aem-clear-wrap {
    text-align: center;
  }

  .aem-mobile {
    display: grid;
    gap: 0.85rem;
    min-width: 0;
  }

  .aem-mobile__card {
    max-width: 22rem;
    margin-inline: auto;
    width: 100%;
  }

  .aem-stage-wrap {
    position: relative;
    width: 100%;
    max-width: var(--aem-max-width, 420px);
    margin-inline: auto;
  }

  .aem-stage {
    position: relative;
    width: 100%;
    aspect-ratio: var(--aem-aspect, 3 / 4);
    border-radius: var(--section-radius, 16px);
    background: var(--aem-stage-bg, #f3ece7);
    border: 1px solid var(--border-color, #e8ddd6);
    box-shadow: var(--aem-shadow, 0 10px 28px rgba(43, 33, 28, 0.08));
    overflow: hidden;
  }

  .aem-stage__ornament {
    position: absolute;
    inset: 8%;
    border: 1px solid color-mix(in srgb, var(--accent-color, #8b5e4b) 22%, transparent);
    border-radius: calc(var(--section-radius, 16px) * 0.7);
    pointer-events: none;
    opacity: 0.55;
  }

  .aem-stage__img-wrap {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
  }

  .aem-stage__img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
    display: block;
    user-select: none;
    -webkit-user-drag: none;
  }

  .aem-stage__img[hidden] {
    display: none !important;
  }

  .aem-spots {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .aem-spot {
    position: absolute;
    transform: translate(-50%, -50%);
    width: 44px;
    height: 44px;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    pointer-events: auto;
    z-index: 2;
    display: grid;
    place-items: center;
    color: var(--aem-spot-color, var(--accent-color, #8b5e4b));
  }

  .aem-spot:focus {
    outline: none;
  }

  .aem-spot:focus-visible .aem-spot__ring {
    outline: 2px solid var(--aem-active, var(--accent-color, #8b5e4b));
    outline-offset: 3px;
  }

  .aem-spot__ring {
    position: relative;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 2px solid currentColor;
    background: color-mix(in srgb, var(--card-bg, #fff) 88%, transparent);
    display: grid;
    place-items: center;
    box-shadow: 0 4px 14px rgba(43, 33, 28, 0.16);
    transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
  }

  .aem-spot__core {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: currentColor;
  }

  .aem-spot__num {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--text-color, #2b211c);
    line-height: 1;
  }

  .aem-spot__num + .aem-spot__core {
    display: none;
  }

  .aem-spot--pulse .aem-spot__ring::after {
    content: '';
    position: absolute;
    inset: -5px;
    border-radius: 50%;
    border: 1px solid currentColor;
    opacity: 0.35;
    animation: aem-pulse 1.8s ease-out infinite;
  }

  .aem-spot--active .aem-spot__ring,
  .aem-spot--hover .aem-spot__ring {
    transform: scale(1.12);
    border-color: var(--aem-active, var(--accent-color, #8b5e4b));
    box-shadow: 0 6px 18px color-mix(in srgb, var(--aem-active, #8b5e4b) 35%, transparent);
    color: var(--aem-active, var(--accent-color, #8b5e4b));
  }

  .aem-spot--featured .aem-spot__ring {
    width: 32px;
    height: 32px;
    border-width: 2.5px;
  }

  .aem-spot__tip {
    position: absolute;
    left: 50%;
    bottom: calc(100% + 6px);
    transform: translateX(-50%);
    white-space: nowrap;
    max-width: 10rem;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0.28rem 0.55rem;
    border-radius: 999px;
    background: var(--card-bg, #fff);
    color: var(--text-color, #2b211c);
    border: 1px solid var(--border-color, #e8ddd6);
    font-size: 0.72rem;
    font-weight: 600;
    box-shadow: 0 6px 16px rgba(43, 33, 28, 0.1);
    pointer-events: none;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.18s ease;
    z-index: 3;
  }

  .aem-spot__tip--show,
  .aem-spot--hover .aem-spot__tip,
  .aem-spot--active .aem-spot__tip {
    opacity: 1;
    visibility: visible;
  }

  .aem-lines {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: visible;
    z-index: 1;
  }

  .aem-line {
    fill: none;
    stroke: var(--aem-line-color, #c4a99a);
    stroke-width: 1.35;
    stroke-linecap: round;
    stroke-linejoin: round;
    opacity: 0.72;
    transition: stroke 0.2s ease, stroke-width 0.2s ease, opacity 0.2s ease;
  }

  .aem-desk--dim .aem-line {
    opacity: 0.22;
  }

  .aem-line--active,
  .aem-line--hover {
    stroke: var(--aem-active, var(--accent-color, #8b5e4b));
    stroke-width: 2.1;
    opacity: 1;
  }

  .aem-desk--dim .aem-line--active,
  .aem-desk--dim .aem-line--hover {
    opacity: 1;
  }

  .aem-card {
    position: relative;
    background: var(--card-bg, #fff);
    border: 1px solid var(--aem-card-border, var(--border-color, #e8ddd6));
    border-radius: var(--section-radius, 16px);
    box-shadow: var(--aem-shadow, 0 10px 28px rgba(43, 33, 28, 0.08));
    padding: 0.75rem;
    display: grid;
    gap: 0.55rem;
    min-width: 0;
    cursor: pointer;
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease,
      transform 0.22s ease,
      opacity 0.28s ease;
    text-align: start;
  }

  .aem-card:focus {
    outline: none;
  }

  .aem-card:focus-visible {
    outline: 2px solid var(--aem-active, var(--accent-color, #8b5e4b));
    outline-offset: 2px;
  }

  .aem-card--active,
  .aem-card--hover {
    border-color: var(--aem-active, var(--accent-color, #8b5e4b));
    box-shadow: 0 12px 32px color-mix(in srgb, var(--aem-active, #8b5e4b) 18%, transparent);
  }

  .aem-card--featured {
    padding: 0.9rem;
    transform: scale(1.02);
  }

  .aem-card__media {
    position: relative;
    width: 100%;
    aspect-ratio: 4 / 3;
    border-radius: calc(var(--section-radius, 16px) * 0.65);
    overflow: hidden;
    background: color-mix(in srgb, var(--aem-stage-bg, #f3ece7) 70%, #fff);
  }

  .aem-card__media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.35s ease;
  }

  .aem-card__media img[hidden] {
    display: none !important;
  }

  .aem-card--hover .aem-card__media img,
  .aem-card--active .aem-card__media img {
    transform: scale(1.06);
  }

  .aem-card__zoom {
    position: absolute;
    inset: 0;
    border: none;
    background: transparent;
    cursor: zoom-in;
    padding: 0;
  }

  .aem-card__zoom:focus-visible {
    outline: 2px solid var(--aem-active, #8b5e4b);
    outline-offset: -2px;
  }

  .aem-badge {
    display: inline-flex;
    align-self: start;
    padding: 0.2rem 0.55rem;
    border-radius: 999px;
    font-size: 0.7rem;
    font-weight: 700;
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 14%, #fff);
    color: var(--accent-color, #8b5e4b);
  }

  .aem-card__title {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 700;
    line-height: 1.35;
    color: var(--text-color, #2b211c);
  }

  .aem-card__desc {
    margin: 0;
    font-size: 0.82rem;
    line-height: 1.55;
    color: var(--muted-color, #7a6a62);
  }

  .aem-meta {
    display: grid;
    gap: 0.25rem;
    font-size: 0.78rem;
    color: var(--muted-color, #7a6a62);
  }

  .aem-meta strong {
    color: var(--text-color, #2b211c);
    font-weight: 600;
  }

  .aem-card__link {
    justify-self: start;
    min-height: 40px;
    padding: 0.45rem 0.9rem;
    font-size: 0.82rem;
  }

  .aem-clear {
    display: inline-flex;
    margin-inline: auto;
    min-height: 40px;
    padding: 0.4rem 0.9rem;
    border: 1px solid var(--border-color, #e8ddd6);
    border-radius: calc(var(--section-radius, 16px) * 0.55);
    background: transparent;
    color: var(--muted-color, #7a6a62);
    font: inherit;
    font-size: 0.85rem;
    cursor: pointer;
  }

  .aem-clear:focus-visible {
    outline: 2px solid var(--aem-active, #8b5e4b);
    outline-offset: 2px;
  }

  .aem-mobile__live {
    min-height: 1.25rem;
    text-align: center;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-color, #2b211c);
  }

  .aem-nav {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
  }

  .aem-nav button {
    min-width: 44px;
    min-height: 44px;
    border-radius: 50%;
    border: 1px solid var(--border-color, #e8ddd6);
    background: var(--card-bg, #fff);
    color: var(--text-color, #2b211c);
    font: inherit;
    cursor: pointer;
  }

  .aem-nav button:focus-visible {
    outline: 2px solid var(--aem-active, #8b5e4b);
    outline-offset: 2px;
  }

  .aem-nav button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  /* Dialog */
  .aem-dialog {
    border: none;
    padding: 0;
    max-width: min(92vw, 520px);
    width: 100%;
    background: transparent;
  }

  .aem-dialog::backdrop {
    background: rgba(24, 18, 15, 0.55);
  }

  .aem-dialog__inner {
    background: var(--card-bg, #fff);
    border-radius: var(--section-radius, 16px);
    padding: 1rem;
    display: grid;
    gap: 0.75rem;
    color: var(--text-color, #2b211c);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.28);
  }

  .aem-dialog__close {
    justify-self: end;
    min-width: 40px;
    min-height: 40px;
    border: none;
    border-radius: 50%;
    background: color-mix(in srgb, var(--muted-color, #7a6a62) 12%, #fff);
    color: var(--text-color, #2b211c);
    font: inherit;
    cursor: pointer;
  }

  .aem-dialog__close:focus-visible {
    outline: 2px solid var(--aem-active, #8b5e4b);
    outline-offset: 2px;
  }

  .aem-dialog__img {
    width: 100%;
    max-height: min(60vh, 420px);
    object-fit: contain;
    border-radius: calc(var(--section-radius, 16px) * 0.65);
    background: var(--aem-stage-bg, #f3ece7);
  }

  .aem-dialog__title {
    margin: 0;
    font-size: 1.15rem;
  }

  .aem-dialog__desc {
    margin: 0;
    color: var(--muted-color, #7a6a62);
    line-height: 1.6;
  }

  .aem-fs-fallback {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: grid;
    place-items: center;
    padding: 1rem;
    background: rgba(24, 18, 15, 0.55);
  }

  /* Entrance */
  .aem--enter .aem-stage {
    animation: aem-fade-up 0.35s ease both;
  }

  .aem--enter .aem-spot {
    opacity: 0;
    animation: aem-fade-up 0.3s ease both;
  }

  .aem--enter .aem-line {
    stroke-dasharray: 240;
    stroke-dashoffset: 240;
    animation: aem-draw 0.35s ease forwards;
    animation-delay: 0.35s;
  }

  .aem--enter .aem-col--left .aem-card {
    animation: aem-slide-left 0.35s ease both;
    animation-delay: 0.45s;
  }

  .aem--enter .aem-col--right .aem-card {
    animation: aem-slide-right 0.35s ease both;
    animation-delay: 0.45s;
  }

  .aem--enter .aem-mobile .aem-card {
    animation: aem-fade-up 0.35s ease both;
    animation-delay: 0.4s;
  }

  @keyframes aem-pulse {
    0% {
      transform: scale(0.85);
      opacity: 0.45;
    }
    100% {
      transform: scale(1.35);
      opacity: 0;
    }
  }

  @keyframes aem-fade-up {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @keyframes aem-card-in {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @keyframes aem-slide-left {
    from {
      opacity: 0;
      transform: translateX(-16px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @keyframes aem-slide-right {
    from {
      opacity: 0;
      transform: translateX(16px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @keyframes aem-draw {
    to {
      stroke-dashoffset: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .aem-spot--pulse .aem-spot__ring::after,
    .aem--enter .aem-stage,
    .aem--enter .aem-spot,
    .aem--enter .aem-line,
    .aem--enter .aem-card,
    .aem-card-slot--in,
    .aem-card__media img {
      animation: none !important;
      transition: none !important;
      opacity: 1;
      transform: none;
      stroke-dasharray: none;
      stroke-dashoffset: 0;
    }
  }

  @media (max-width: 959px) {
    .aem-desk {
      grid-template-columns: 1fr;
      gap: 0.85rem;
    }

    .aem-spot {
      width: 48px;
      height: 48px;
    }

    .aem-spot__ring {
      width: 30px;
      height: 30px;
    }

    .aem-lines {
      display: none;
    }
  }
`;
function L(r, e = 50) {
  const t = P(r, Number.NaN);
  return Number.isFinite(t) ? q(t, 0, 100) : e;
}
function B(r) {
  const e = w(r, "auto").toLowerCase();
  return e === "right" || e === "left" || e === "auto" ? e : "auto";
}
function K(r) {
  const e = w(r, "3/4").replace(/\s/g, "").replace(":", "/");
  return e === "2/3" || e === "4/5" || e === "1/1" || e === "3/4" ? e : "3/4";
}
function U(r) {
  const e = w(r, "").toLowerCase();
  return e === "hand" || e === "machine" || e === "both" ? e : "";
}
function M(r) {
  return r === "hand" ? { ar: "يدوي", en: "Hand" } : r === "machine" ? { ar: "آلي", en: "Machine" } : r === "both" ? { ar: "يدوي وآلي", en: "Hand & machine" } : { ar: "", en: "" };
}
function X(r) {
  return H(r).map((e, t) => {
    const i = u(e.name).trim(), a = S(e.sort_order, t + 1);
    return {
      index: t,
      sort: a,
      name: i || `Detail ${t + 1}`,
      desc: u(e.desc).trim(),
      image: T(e.image) || String(e.image || "").trim(),
      alt: u(e.alt).trim() || i || `Embroidery detail ${t + 1}`,
      pos_x: L(e.pos_x ?? e.x, 50),
      pos_y: L(e.pos_y ?? e.y, 50),
      card_side: B(e.card_side),
      stitch_type: u(e.stitch_type).trim(),
      thread: u(e.thread).trim(),
      method: U(e.method),
      duration: u(e.duration).trim(),
      extra: u(e.extra).trim(),
      product_url: O(e.product_url),
      btn_text: u(e.btn_text).trim(),
      show_number: f(e.show_number, !0),
      spot_color: String(e.spot_color || "").trim(),
      is_featured: f(e.is_featured, !1),
      badge: u(e.badge).trim()
    };
  }).sort((e, t) => e.sort - t.sort || e.index - t.index).map((e, t) => ({
    index: t,
    name: e.name,
    desc: e.desc,
    image: e.image,
    alt: e.alt,
    pos_x: e.pos_x,
    pos_y: e.pos_y,
    card_side: e.card_side,
    stitch_type: e.stitch_type,
    thread: e.thread,
    method: e.method,
    duration: e.duration,
    extra: e.extra,
    product_url: e.product_url,
    btn_text: e.btn_text,
    show_number: e.show_number,
    spot_color: e.spot_color,
    is_featured: e.is_featured,
    badge: e.badge
  }));
}
function F(r) {
  return r.card_side === "left" || r.card_side === "right" ? r.card_side : r.pos_x >= 50 ? "right" : "left";
}
function Y(r) {
  const e = /* @__PURE__ */ new Set();
  for (const t of r)
    if (t.is_featured && (e.add(t.index), e.size >= 2))
      break;
  return e;
}
function G(r, e, t, i) {
  const a = r.left + r.width / 2 - t.left, l = r.top + r.height / 2 - t.top, d = e.top + e.height / 2 - t.top, m = 14;
  let n, p;
  i === "right" ? (n = e.left - t.left, p = n - m) : (n = e.right - t.left, p = n + m);
  const v = (a + p) / 2;
  return `M ${a.toFixed(1)} ${l.toFixed(1)} L ${v.toFixed(1)} ${l.toFixed(1)} L ${p.toFixed(1)} ${l.toFixed(1)} L ${p.toFixed(1)} ${d.toFixed(1)} L ${n.toFixed(1)} ${d.toFixed(1)}`;
}
function J(r, e, t, i) {
  const a = e.getBoundingClientRect();
  if (!a.width || !a.height) return [];
  const l = [];
  for (const d of r)
    try {
      const m = t(d.index), n = i(d.index);
      if (!m || !n) continue;
      const p = m.getBoundingClientRect(), v = n.getBoundingClientRect();
      if (!p.width || !v.width) continue;
      const y = F(d);
      l.push({
        index: d.index,
        d: G(p, v, a, y)
      });
    } catch {
    }
  return l;
}
function Q(r) {
  const e = [
    "none",
    "0 10px 28px rgba(43, 33, 28, 0.08)",
    "0 16px 40px rgba(43, 33, 28, 0.12)",
    "0 22px 56px rgba(43, 33, 28, 0.18)"
  ];
  return e[q(r, 0, 3)] || e[1];
}
var W = Object.defineProperty, g = (r, e, t, i) => {
  for (var a = void 0, l = r.length - 1, d; l >= 0; l--)
    (d = r[l]) && (a = d(e, t, a) || a);
  return a && W(e, t, a), a;
};
const D = class D extends R {
  constructor() {
    super(...arguments), this.config = {}, this.activeIndex = null, this.hoverIndex = null, this.lines = [], this.entered = !1, this.zoomOpen = !1, this.zoomIndex = null, this.useFallbackDialog = !1, this.brokenMain = !1, this.brokenDetail = /* @__PURE__ */ new Set(), this.isDesktop = !0, this.boundLang = () => this.requestUpdate(), this.resizeObs = null, this.io = null, this.mq = null, this.lineRaf = 0, this.enterOnce = !1, this.zoomTrigger = null, this.boundMq = () => this.onMqChange(), this.boundKeydown = (e) => this.onGlobalKey(e);
  }
  connectedCallback() {
    var e, t, i, a;
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLang), this.mq = window.matchMedia("(min-width: 960px)"), this.isDesktop = this.mq.matches, (t = (e = this.mq).addEventListener) == null || t.call(e, "change", this.boundMq), (a = (i = this.mq).addListener) == null || a.call(i, this.boundMq);
  }
  disconnectedCallback() {
    var e, t, i, a;
    window.removeEventListener("language-changed", this.boundLang), (t = (e = this.mq) == null ? void 0 : e.removeEventListener) == null || t.call(e, "change", this.boundMq), (a = (i = this.mq) == null ? void 0 : i.removeListener) == null || a.call(i, this.boundMq), this.teardownObservers(), this.unlockPageScroll(), document.removeEventListener("keydown", this.boundKeydown), this.lineRaf && cancelAnimationFrame(this.lineRaf), super.disconnectedCallback();
  }
  firstUpdated() {
    this.setupObservers(), this.scheduleLines();
  }
  updated(e) {
    e.has("config") && (this.brokenMain = !1, this.brokenDetail = /* @__PURE__ */ new Set(), this.activeIndex != null && this.activeIndex >= this.details.length && (this.activeIndex = null)), this.style.display = this.mainImage ? "" : "none", this.scheduleLines();
  }
  get details() {
    var e;
    return X((e = this.config) == null ? void 0 : e.aem_details);
  }
  get mainImage() {
    const e = this.config || {};
    return T(e.aem_image) || String(e.aem_image || "").trim();
  }
  get featuredSet() {
    return Y(this.details);
  }
  get enableLines() {
    var e;
    return f((e = this.config) == null ? void 0 : e.aem_enable_lines, !0);
  }
  get enablePulse() {
    var e;
    return f((e = this.config) == null ? void 0 : e.aem_enable_pulse, !0) && !k();
  }
  get showNumbers() {
    var e;
    return f((e = this.config) == null ? void 0 : e.aem_show_numbers, !0);
  }
  get enableDetailImages() {
    var e;
    return f((e = this.config) == null ? void 0 : e.aem_enable_detail_images, !0);
  }
  get enableZoom() {
    var e;
    return f((e = this.config) == null ? void 0 : e.aem_enable_zoom, !0);
  }
  get openNewTab() {
    var e;
    return f((e = this.config) == null ? void 0 : e.aem_open_new_tab, !0);
  }
  teardownObservers() {
    var e, t;
    (e = this.resizeObs) == null || e.disconnect(), this.resizeObs = null, (t = this.io) == null || t.disconnect(), this.io = null;
  }
  setupObservers() {
    this.teardownObservers(), typeof ResizeObserver < "u" && (this.resizeObs = new ResizeObserver(() => this.scheduleLines()), this.deskEl && this.resizeObs.observe(this.deskEl), this.resizeObs.observe(this)), typeof IntersectionObserver < "u" ? (this.io = new IntersectionObserver(
      (e) => {
        e.some((t) => t.isIntersecting) && this.triggerEnter();
      },
      { threshold: 0.2 }
    ), this.io.observe(this)) : this.triggerEnter();
  }
  onMqChange() {
    var e;
    this.isDesktop = !!((e = this.mq) != null && e.matches), requestAnimationFrame(() => {
      this.setupObservers(), this.scheduleLines();
    });
  }
  /** Card + connector lines follow click only — hover just highlights the spot. */
  focusIndex() {
    return this.activeIndex;
  }
  triggerEnter() {
    if (this.enterOnce) return;
    if (this.enterOnce = !0, !I(this.config, "aem_").animate || k()) {
      this.entered = !1;
      return;
    }
    this.entered = !0, window.setTimeout(() => {
      this.entered = !1;
    }, 900);
  }
  scheduleLines() {
    this.lineRaf && cancelAnimationFrame(this.lineRaf), this.lineRaf = requestAnimationFrame(() => {
      this.lineRaf = 0, this.recalcLines();
    });
  }
  recalcLines() {
    if (!this.isDesktop || !this.enableLines || !this.deskEl) {
      this.lines.length && (this.lines = []);
      return;
    }
    const e = this.focusIndex(), t = e == null ? [] : this.details.filter((a) => a.index === e), i = J(
      t,
      this.deskEl,
      (a) => this.renderRoot.querySelector(
        `.aem-spot[data-index="${a}"]`
      ),
      (a) => this.renderRoot.querySelector(
        `.aem-desk .aem-card[data-index="${a}"]`
      )
    );
    this.lines = i;
  }
  setHover(e) {
    this.hoverIndex !== e && (this.hoverIndex = e);
  }
  setActive(e) {
    if (this.activeIndex === e) {
      this.scheduleLines();
      return;
    }
    this.activeIndex = e, this.scheduleLines();
  }
  toggleActive(e) {
    this.setActive(this.activeIndex === e ? null : e);
  }
  clearActive() {
    this.setActive(null), this.hoverIndex = null;
  }
  onSpotKeydown(e, t) {
    const i = this.details.length;
    if (!i) return;
    let a = t;
    if (e.key === "ArrowRight" || e.key === "ArrowDown")
      e.preventDefault(), a = (t + 1) % i;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp")
      e.preventDefault(), a = (t - 1 + i) % i;
    else if (e.key === "Home")
      e.preventDefault(), a = 0;
    else if (e.key === "End")
      e.preventDefault(), a = i - 1;
    else
      return;
    this.setActive(a);
    const l = this.renderRoot.querySelector(
      `.aem-spot[data-index="${a}"]`
    );
    l == null || l.focus();
  }
  openZoom(e, t) {
    if (!this.enableZoom) return;
    const i = this.details[e];
    !(i != null && i.image) || this.brokenDetail.has(e) || (this.zoomTrigger = t instanceof HTMLElement ? t : null, this.zoomIndex = e, this.zoomOpen = !0, this.lockPageScroll(), document.addEventListener("keydown", this.boundKeydown), requestAnimationFrame(() => {
      const a = this.dialogEl;
      a && typeof a.showModal == "function" ? (this.useFallbackDialog = !1, a.open || a.showModal()) : this.useFallbackDialog = !0;
    }));
  }
  closeZoom() {
    var t, i;
    const e = this.dialogEl;
    e != null && e.open && e.close(), this.zoomOpen = !1, this.useFallbackDialog = !1, this.zoomIndex = null, this.unlockPageScroll(), document.removeEventListener("keydown", this.boundKeydown), (i = (t = this.zoomTrigger) == null ? void 0 : t.focus) == null || i.call(t), this.zoomTrigger = null;
  }
  onGlobalKey(e) {
    e.key === "Escape" && this.zoomOpen && (e.preventDefault(), this.closeZoom());
  }
  lockPageScroll() {
    document.documentElement.style.overflow = "hidden";
  }
  unlockPageScroll() {
    document.documentElement.style.overflow = "";
  }
  markBrokenDetail(e) {
    const t = new Set(this.brokenDetail);
    t.add(e), this.brokenDetail = t;
  }
  designVars() {
    const e = this.config || {}, t = I(e, "aem_"), i = Math.max(0, Math.min(3, S(e.aem_shadow, 1)));
    return {
      ...j(t),
      "--aem-stage-bg": String(e.aem_stage_bg || "#f3ece7"),
      "--aem-spot-color": String(e.aem_spot_color || t.accent),
      "--aem-line-color": String(e.aem_line_color || "#c4a99a"),
      "--aem-active": String(e.aem_active_color || t.accent),
      "--aem-card-border": String(e.aem_card_border || t.border),
      "--aem-shadow": Q(i),
      "--aem-aspect": K(e.aem_aspect).replace("/", " / "),
      "--aem-max-width": `${S(e.aem_max_width, 420)}px`
    };
  }
  highlightIndex() {
    return this.hoverIndex ?? this.activeIndex;
  }
  renderSpot(e) {
    const t = this.highlightIndex(), i = this.featuredSet.has(e.index), a = this.showNumbers && e.show_number, l = e.spot_color || void 0;
    return o`
      <button
        type="button"
        class=${x({
      "aem-spot": !0,
      "aem-spot--pulse": this.enablePulse,
      "aem-spot--active": this.activeIndex === e.index,
      "aem-spot--hover": this.hoverIndex === e.index,
      "aem-spot--featured": i
    })}
        style=${$({
      left: `${e.pos_x}%`,
      top: `${e.pos_y}%`,
      ...l ? { color: l } : {},
      ...this.entered ? { animationDelay: `${80 + e.index * 55}ms` } : {}
    })}
        data-index=${e.index}
        aria-label=${e.name}
        aria-pressed=${this.activeIndex === e.index ? "true" : "false"}
        @pointerenter=${() => this.setHover(e.index)}
        @pointerleave=${() => this.setHover(null)}
        @focus=${() => this.setHover(e.index)}
        @blur=${(d) => {
      const m = d.relatedTarget;
      m && this.renderRoot.contains(m) || this.setHover(null);
    }}
        @click=${() => this.toggleActive(e.index)}
        @keydown=${(d) => this.onSpotKeydown(d, e.index)}
      >
        <span class="aem-spot__ring">
          ${a ? o`<span class="aem-spot__num">${e.index + 1}</span>` : o`<span class="aem-spot__core" aria-hidden="true"></span>`}
        </span>
        <span
          class=${x({
      "aem-spot__tip": !0,
      "aem-spot__tip--show": t === e.index
    })}
          >${e.name}</span
        >
      </button>
    `;
  }
  renderCard(e) {
    const t = this.featuredSet.has(e.index), i = this.enableDetailImages && e.image && !this.brokenDetail.has(e.index), a = M(e.method), l = a.ar ? c(a.ar, a.en) : "", d = e.btn_text || c("عرض المنتج", "View product"), m = z(e.product_url) ? e.product_url : "";
    return o`
      <article
        class=${x({
      "aem-card": !0,
      "aem-card--active": this.activeIndex === e.index,
      "aem-card--hover": this.hoverIndex === e.index,
      "aem-card--featured": t
    })}
        data-index=${e.index}
        tabindex="0"
        role="button"
        aria-pressed=${this.activeIndex === e.index ? "true" : "false"}
        @pointerenter=${() => this.setHover(e.index)}
        @pointerleave=${() => this.setHover(null)}
        @focus=${() => this.setHover(e.index)}
        @blur=${(n) => {
      const p = n.relatedTarget;
      p && this.renderRoot.contains(p) || this.setHover(null);
    }}
        @click=${(n) => {
      n.target.closest("a, .aem-card__zoom") || this.toggleActive(e.index);
    }}
        @keydown=${(n) => {
      (n.key === "Enter" || n.key === " ") && (n.preventDefault(), this.toggleActive(e.index));
    }}
      >
        ${t && e.badge ? o`<span class="aem-badge">${e.badge}</span>` : s}
        ${i ? o`<div class="aem-card__media">
              <img
                src=${e.image}
                alt=${e.alt || e.name}
                loading="lazy"
                decoding="async"
                @error=${() => this.markBrokenDetail(e.index)}
              />
              ${this.enableZoom ? o`<button
                    type="button"
                    class="aem-card__zoom"
                    aria-label=${c("تكبير التفصيلة", "Zoom detail")}
                    @click=${(n) => {
      n.stopPropagation(), this.openZoom(e.index, n.currentTarget);
    }}
                  ></button>` : s}
            </div>` : s}
        <h3 class="aem-card__title">${e.name}</h3>
        ${e.desc ? o`<p class="aem-card__desc">${e.desc}</p>` : s}
        ${e.stitch_type || e.thread || l || e.duration || e.extra ? o`<div class="aem-meta">
              ${e.stitch_type ? o`<div>
                    <strong>${c("التطريز", "Stitch")}:</strong> ${e.stitch_type}
                  </div>` : s}
              ${e.thread ? o`<div>
                    <strong>${c("الخيط / الخامة", "Thread / material")}:</strong>
                    ${e.thread}
                  </div>` : s}
              ${l ? o`<div>
                    <strong>${c("التنفيذ", "Method")}:</strong> ${l}
                  </div>` : s}
              ${e.duration ? o`<div>
                    <strong>${c("المدة", "Duration")}:</strong> ${e.duration}
                  </div>` : s}
              ${e.extra ? o`<div>${e.extra}</div>` : s}
            </div>` : s}
        ${m ? o`<a
              class="fs-btn aem-card__link"
              href=${m}
              target=${_(this.openNewTab ? "_blank" : void 0)}
              rel=${_(this.openNewTab ? "noopener noreferrer" : void 0)}
              @click=${(n) => n.stopPropagation()}
              >${d}</a
            >` : s}
      </article>
    `;
  }
  renderLines() {
    return !this.isDesktop || !this.enableLines || !this.lines.length ? s : (this.highlightIndex(), o`
      <svg class="aem-lines" aria-hidden="true" focusable="false">
        ${this.lines.map(
      (e) => o`<path
            class=${x({
        "aem-line": !0,
        "aem-line--active": this.activeIndex === e.index,
        "aem-line--hover": this.hoverIndex === e.index
      })}
            d=${e.d}
            style=${this.entered ? $({
        animationDelay: `${350 + e.index * 40}ms`
      }) : s}
          />`
    )}
      </svg>
    `);
  }
  renderStage() {
    const e = this.config || {}, t = u(e.aem_image_alt).trim() || c("عباية", "Abaya");
    return o`
      <div class="aem-stage-wrap">
        <div class="aem-stage">
          <div class="aem-stage__ornament" aria-hidden="true"></div>
          <div class="aem-stage__img-wrap">
            ${this.brokenMain ? s : o`<img
                  class="aem-stage__img"
                  src=${this.mainImage}
                  alt=${t}
                  decoding="async"
                  @error=${() => {
      this.brokenMain = !0;
    }}
                />`}
          </div>
          <div class="aem-spots">
            ${this.details.map((i) => this.renderSpot(i))}
          </div>
        </div>
      </div>
    `;
  }
  renderColSlot(e, t) {
    const i = t && F(t) === e;
    return o`
      <div class="aem-col aem-col--${e}">
        ${i && t ? o`<div class="aem-card-slot aem-card-slot--in">
              ${this.renderCard(t)}
            </div>` : o`<div class="aem-col__placeholder" aria-hidden="true"></div>`}
      </div>
    `;
  }
  renderDesktop() {
    var a;
    const e = this.focusIndex(), t = e != null && this.details[e] || null, i = this.highlightIndex();
    return o`
      <div
        class=${x({
      "aem-desk": !0,
      "aem-desk--dim": i != null,
      "aem-desk--compact": w((a = this.config) == null ? void 0 : a.aem_layout, "map") === "compact",
      "aem-desk--focus": t != null
    })}
      >
        ${this.renderColSlot("left", t)}
        <div class="aem-stage-stack">
          ${this.renderStage()}
          <p
            class=${x({
      "aem-pick-hint": !0,
      "aem-pick-hint--hidden": t != null
    })}
            aria-live="polite"
            aria-hidden=${t != null ? "true" : "false"}
          >
            ${c(
      "اضغطي على رقم التفصيلة لعرض تفاصيلها",
      "Tap a detail number to view it"
    )}
          </p>
        </div>
        ${this.renderColSlot("right", t)}
        ${t ? this.renderLines() : s}
      </div>
    `;
  }
  renderMobile() {
    const e = this.activeIndex != null ? this.details[this.activeIndex] : null, t = this.details.length > 1;
    return o`
      <div class="aem-mobile">
        ${this.renderStage()}
        <div class="aem-mobile__live" aria-live="polite">
          ${e ? e.name : c(
      "اضغطي على رقم التفصيلة",
      "Tap a detail number"
    )}
        </div>
        ${e ? o`<div class="aem-mobile__card aem-card-slot aem-card-slot--in">
              ${this.renderCard(e)}
            </div>` : o`<p class="aem-pick-hint">
              ${c(
      "اختاري تفصيلة من الأرقام على الصورة",
      "Choose a detail from the numbers on the image"
    )}
            </p>`}
        ${t && e ? o`<div class="aem-nav">
              <button
                type="button"
                aria-label=${c("السابق", "Previous")}
                ?disabled=${e.index <= 0}
                @click=${() => this.setActive(Math.max(0, e.index - 1))}
              >
                ‹
              </button>
              <button
                type="button"
                aria-label=${c("التالي", "Next")}
                ?disabled=${e.index >= this.details.length - 1}
                @click=${() => this.setActive(
      Math.min(this.details.length - 1, e.index + 1)
    )}
              >
                ›
              </button>
            </div>` : s}
      </div>
    `;
  }
  renderZoom() {
    if (!this.zoomOpen || this.zoomIndex == null) return s;
    const e = this.details[this.zoomIndex];
    if (!e) return s;
    const t = M(e.method), i = t.ar ? c(t.ar, t.en) : "", a = z(e.product_url) ? e.product_url : "", l = e.btn_text || c("عرض المنتج", "View product"), d = o`
      <div class="aem-dialog__inner">
        <button
          type="button"
          class="aem-dialog__close"
          aria-label=${c("إغلاق", "Close")}
          @click=${() => this.closeZoom()}
        >
          ✕
        </button>
        <img class="aem-dialog__img" src=${e.image} alt=${e.alt || e.name} />
        <h3 class="aem-dialog__title">${e.name}</h3>
        ${e.desc ? o`<p class="aem-dialog__desc">${e.desc}</p>` : s}
        ${e.stitch_type || i ? o`<div class="aem-meta">
              ${e.stitch_type ? o`<div>
                    <strong>${c("التطريز", "Stitch")}:</strong> ${e.stitch_type}
                  </div>` : s}
              ${i ? o`<div>
                    <strong>${c("التنفيذ", "Method")}:</strong> ${i}
                  </div>` : s}
            </div>` : s}
        ${a ? o`<a
              class="fs-btn"
              href=${a}
              target=${_(this.openNewTab ? "_blank" : void 0)}
              rel=${_(this.openNewTab ? "noopener noreferrer" : void 0)}
              >${l}</a
            >` : s}
      </div>
    `;
    return this.useFallbackDialog ? o`<div
        class="aem-fs-fallback"
        @click=${(m) => {
      m.target === m.currentTarget && this.closeZoom();
    }}
      >
        ${d}
      </div>` : o`<dialog
      class="aem-dialog"
      @click=${(m) => {
      m.target === this.dialogEl && this.closeZoom();
    }}
      @close=${() => {
      this.zoomOpen && this.closeZoom();
    }}
    >
      ${d}
    </dialog>`;
  }
  render() {
    if (!this.mainImage) return s;
    const e = this.config || {}, i = I(e, "aem_").animate && !k(), a = f(e.aem_full_width, !1), l = f(e.aem_show_title, !0), d = f(e.aem_show_desc, !0), m = f(e.aem_show_btn, !0), n = l ? u(e.aem_title).trim() : "", p = d ? u(e.aem_desc).trim() : "", v = O(e.aem_product_url), y = u(e.aem_btn_text).trim() || c("عرض العباية", "View abaya"), A = m && z(v);
    return o`
      <section
        class=${x({
      "fs-section": !0,
      "fs-section--full": a,
      "fs-animate": i,
      "aem--enter": this.entered
    })}
        style=${$(this.designVars())}
        aria-label=${n || c("خريطة تطريز العباية", "Abaya embroidery map")}
      >
        <div class="fs-container">
          ${n || p ? o`<header class="fs-header">
                ${n ? o`<h2 class="fs-title">${n}</h2>` : s}
                ${p ? o`<p class="fs-desc">${p}</p>` : s}
              </header>` : s}

          <div class="aem-shell">
            ${this.isDesktop ? this.renderDesktop() : this.renderMobile()}
            ${this.activeIndex != null ? o`<div class="aem-clear-wrap">
                  <button
                    type="button"
                    class="aem-clear"
                    @click=${() => this.clearActive()}
                  >
                    ${c("مسح التحديد", "Clear selection")}
                  </button>
                </div>` : s}
            ${A ? o`<div class="aem-cta">
                  <a
                    class="fs-btn"
                    href=${v}
                    target=${_(this.openNewTab ? "_blank" : void 0)}
                    rel=${_(
      this.openNewTab ? "noopener noreferrer" : void 0
    )}
                    >${y}</a
                  >
                </div>` : s}
          </div>
        </div>
        ${this.renderZoom()}
      </section>
    `;
  }
};
D.styles = [
  Z,
  V,
  C`
      :host {
        direction: inherit;
      }
    `
];
let h = D;
g([
  N({ type: Object })
], h.prototype, "config");
g([
  b()
], h.prototype, "activeIndex");
g([
  b()
], h.prototype, "hoverIndex");
g([
  b()
], h.prototype, "lines");
g([
  b()
], h.prototype, "entered");
g([
  b()
], h.prototype, "zoomOpen");
g([
  b()
], h.prototype, "zoomIndex");
g([
  b()
], h.prototype, "useFallbackDialog");
g([
  b()
], h.prototype, "brokenMain");
g([
  b()
], h.prototype, "brokenDetail");
g([
  b()
], h.prototype, "isDesktop");
g([
  E(".aem-desk")
], h.prototype, "deskEl");
g([
  E("dialog.aem-dialog")
], h.prototype, "dialogEl");
typeof h < "u" && h.registerSallaComponent("salla-abaya-embroidery-map");
export {
  h as default
};
