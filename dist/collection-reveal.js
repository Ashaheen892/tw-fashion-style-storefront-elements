import { css as w, LitElement as k, nothing as c, html as i } from "lit";
import { property as C, state as _ } from "lit/decorators.js";
import { classMap as f } from "lit/directives/class-map.js";
import { styleMap as y } from "lit/directives/style-map.js";
import { l as t, n as O, b as x, v as U, u as j, s as H, p as b, i as p, t as m, r as I, a as E } from "./sharedStyles-BGb_aVO_.js";
const D = w`
  .cr-stage {
    position: relative;
    overflow: hidden;
    border-radius: var(--section-radius, 16px);
    min-height: 22rem;
  }

  .cr-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .cr-overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .cr-pre {
    position: relative;
    z-index: 2;
    display: grid;
    gap: 1.25rem;
    padding: clamp(1.5rem, 4vw, 2.5rem);
    text-align: center;
    align-content: center;
    min-height: 22rem;
  }

  .cr-mystery {
    width: min(12rem, 55vw);
    margin: 0 auto;
    border-radius: calc(var(--section-radius, 16px) * 0.75);
    box-shadow: 0 12px 36px rgba(43, 33, 28, 0.18);
  }

  .cr-mystery--breath.fs-animate {
    animation: cr-breath 3.2s ease-in-out infinite;
  }

  @keyframes cr-breath {
    0%,
    100% {
      transform: scale(1);
      opacity: 0.92;
    }
    50% {
      transform: scale(1.03);
      opacity: 1;
    }
  }

  .cr-pre-text {
    margin: 0;
    font-size: 0.88rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: color-mix(in srgb, #fff 88%, var(--muted-color, #7a6a62));
  }

  .cr-timer {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.65rem;
  }

  .cr-timer__unit {
    min-width: 4.5rem;
    padding: 0.75rem 0.5rem;
    border-radius: calc(var(--section-radius, 16px) * 0.55);
    background: color-mix(in srgb, var(--card-bg, #fff) 88%, transparent);
    border: 1px solid var(--border-color, #e8ddd6);
  }

  .cr-timer__value {
    display: block;
    font-size: 1.65rem;
    font-weight: 700;
    line-height: 1.1;
    color: var(--timer-color, var(--accent-color, #8b5e4b));
  }

  .cr-timer__label {
    display: block;
    margin-top: 0.2rem;
    font-size: 0.72rem;
    color: var(--muted-color, #7a6a62);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .cr-curtain {
    position: absolute;
    inset: 0;
    z-index: 5;
    background: linear-gradient(
      180deg,
      color-mix(in srgb, var(--accent-color, #8b5e4b) 92%, #000) 0%,
      color-mix(in srgb, var(--text-color, #2b211c) 88%, #000) 100%
    );
    transform: translateY(0);
    transition: transform 0.9s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
  }

  .cr-curtain--open {
    transform: translateY(-102%);
  }

  .cr-post {
    display: grid;
    gap: 1.5rem;
  }

  .cr-post.fs-animate {
    animation: cr-reveal 0.65s ease;
  }

  @keyframes cr-reveal {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .cr-media {
    width: 100%;
    max-height: 28rem;
    object-fit: cover;
    border-radius: var(--section-radius, 16px);
  }

  .cr-products {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }

  .cr-product {
    display: grid;
    gap: 0.65rem;
    padding: 1rem;
    overflow: hidden;
  }

  .cr-product__img {
    width: 100%;
    aspect-ratio: 3 / 4;
    object-fit: cover;
    border-radius: calc(var(--section-radius, 16px) * 0.55);
  }

  .cr-product__name {
    margin: 0;
    font-weight: 700;
    font-size: 1rem;
  }

  .cr-product__desc {
    margin: 0;
    font-size: 0.88rem;
    color: var(--muted-color, #7a6a62);
    line-height: 1.55;
  }

  .cr-cta-wrap {
    text-align: center;
  }

  @media (max-width: 959px) {
    .cr-products {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.85rem;
    }

    .cr-cta-wrap .fs-btn {
      width: 100%;
      max-width: 22rem;
    }
  }

  @media (max-width: 639px) {
    .cr-stage,
    .cr-pre {
      min-height: 15rem;
    }

    .cr-pre {
      padding: 1rem 0.85rem;
      gap: 0.9rem;
    }

    .cr-media {
      max-height: 16rem;
    }

    .cr-products {
      grid-template-columns: 1fr;
      gap: 0.75rem;
    }

    .cr-product {
      padding: 0.8rem;
    }

    .cr-product__name {
      font-size: 0.95rem;
    }

    .cr-timer {
      gap: 0.4rem;
      flex-wrap: wrap;
      justify-content: center;
    }

    .cr-timer__unit {
      min-width: 3.4rem;
      padding: 0.5rem 0.3rem;
    }

    .cr-timer__value {
      font-size: 1.25rem;
    }

    .cr-cta-wrap .fs-btn {
      width: 100%;
      max-width: none;
    }
  }
`;
function P(a) {
  const e = t(a, "").trim();
  if (!e) return null;
  const r = new Date(e);
  return Number.isFinite(r.getTime()) ? r : null;
}
function Q(a, e = /* @__PURE__ */ new Date()) {
  const r = Math.max(0, a.getTime() - e.getTime()), s = Math.floor(r / 1e3), n = Math.floor(s / 86400), d = Math.floor(s % 86400 / 3600), o = Math.floor(s % 3600 / 60), g = s % 60;
  return { days: n, hours: d, minutes: o, seconds: g, totalMs: r };
}
function Y(a) {
  return O(a).map((e) => ({
    image: t(e.image),
    name: t(e.name),
    desc: t(e.desc),
    url: x(e.url),
    btn_text: t(e.btn_text)
  })).filter((e) => e.name || e.image);
}
function q(a) {
  return a ? /\.(mp4|webm|ogg)(\?|$)/i.test(a) || a.includes("video") : !1;
}
function A(a) {
  return U(j(a, 0), 0, 100) / 100;
}
var F = Object.defineProperty, h = (a, e, r, s) => {
  for (var n = void 0, d = a.length - 1, o; d >= 0; d--)
    (o = a[d]) && (n = o(e, r, n) || n);
  return n && F(e, r, n), n;
};
const v = class v extends k {
  constructor() {
    super(...arguments), this.config = {}, this.phase = "pre", this.curtainOpen = !1, this.countdown = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalMs: 0
    }, this.timerId = null, this.curtainTimer = null, this.boundLangHandler = () => this.requestUpdate(), this.boundMotionHandler = () => this.requestUpdate(), this.motionQuery = null;
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler), this.motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)"), this.motionQuery.addEventListener("change", this.boundMotionHandler), this.syncTimer();
  }
  disconnectedCallback() {
    var e;
    window.removeEventListener("language-changed", this.boundLangHandler), (e = this.motionQuery) == null || e.removeEventListener("change", this.boundMotionHandler), this.clearTimer(), this.curtainTimer && clearTimeout(this.curtainTimer), super.disconnectedCallback();
  }
  clearTimer() {
    this.timerId != null && (clearInterval(this.timerId), this.timerId = null);
  }
  get cfg() {
    const e = this.config;
    return e && typeof e == "object" ? e : {};
  }
  syncTimer() {
    this.clearTimer();
    const e = P(this.cfg.cr_launch_at);
    if (!e) {
      this.phase = "post";
      return;
    }
    const r = () => {
      const s = Q(e);
      this.countdown = s, s.totalMs <= 0 && (this.clearTimer(), this.phase === "pre" && this.beginLaunchReveal());
    };
    r(), this.phase === "pre" && (this.timerId = setInterval(r, 1e3));
  }
  beginLaunchReveal() {
    if (!b() && p(this.cfg.cr_animate, !0)) {
      this.phase = "curtain", this.curtainOpen = !1, this.curtainTimer && clearTimeout(this.curtainTimer), this.updateComplete.then(() => {
        requestAnimationFrame(() => {
          this.curtainOpen = !0;
        });
      }), this.curtainTimer = setTimeout(() => {
        this.phase = "post", this.curtainOpen = !1;
      }, 950);
      return;
    }
    this.phase = "post";
  }
  updated(e) {
    e.has("config") && (this.phase = "pre", this.curtainOpen = !1, this.curtainTimer && clearTimeout(this.curtainTimer), this.syncTimer());
  }
  renderTimerUnit(e, r, s, n) {
    return n ? i`
      <div class="cr-timer__unit" role="listitem">
        <span class="cr-timer__value" aria-hidden="true">${String(e).padStart(2, "0")}</span>
        <span class="cr-timer__label">${m(r, s)}</span>
      </div>
    ` : c;
  }
  render() {
    const e = this.cfg, r = I(e, "cr_"), s = r.animate && !b(), n = Y(e.cr_products), d = x(e.cr_cta_url), o = t(e.cr_launch_media), g = A(e.cr_overlay_opacity), $ = String(e.cr_timer_color || r.accent), T = String(e.cr_overlay_color || "#2b211c"), M = p(e.cr_show_days, !0), S = p(e.cr_show_hours, !0), z = p(e.cr_show_minutes, !0), L = p(e.cr_show_seconds, !0);
    return i`
      <section
        class=${f({
      "fs-section": !0,
      "fs-animate": s
    })}
        style=${y({
      ...E(r),
      "--timer-color": $
    })}
        aria-live=${this.phase === "post" ? "polite" : "off"}
      >
        <div class="fs-container">
          ${this.phase !== "post" ? i`
                <div class="fs-header">
                  <h2 class="fs-title">${t(e.cr_tease_title)}</h2>
                  <p class="fs-desc">${t(e.cr_tease_desc)}</p>
                </div>
                <div class="cr-stage fs-card">
                  ${t(e.cr_bg_image) ? i`<img
                        class="cr-bg"
                        src=${t(e.cr_bg_image)}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />` : c}
                  <div
                    class="cr-overlay"
                    style=${y({
      background: T,
      opacity: String(g)
    })}
                  ></div>
                  <div class="cr-pre">
                    ${t(e.cr_pre_text) ? i`<p class="cr-pre-text">${t(e.cr_pre_text)}</p>` : c}
                    ${t(e.cr_mystery_image) ? i`<img
                          class=${f({
      "cr-mystery": !0,
      "cr-mystery--breath": p(e.cr_breath_effect) && s
    })}
                          src=${t(e.cr_mystery_image)}
                          alt=${t(e.cr_tease_title) || m("صورة المجموعة", "Collection preview")}
                          loading="eager"
                          decoding="async"
                        />` : c}
                    <div class="cr-timer" role="timer" aria-label=${m("العد التنازلي", "Countdown")}>
                      ${this.renderTimerUnit(this.countdown.days, "يوم", "Days", M)}
                      ${this.renderTimerUnit(this.countdown.hours, "ساعة", "Hours", S)}
                      ${this.renderTimerUnit(this.countdown.minutes, "دقيقة", "Minutes", z)}
                      ${this.renderTimerUnit(this.countdown.seconds, "ثانية", "Seconds", L)}
                    </div>
                  </div>
                  ${this.phase === "curtain" ? i`<div
                        class=${f({
      "cr-curtain": !0,
      "cr-curtain--open": this.curtainOpen
    })}
                        aria-hidden="true"
                      ></div>` : c}
                </div>
              ` : i`
                <div class="cr-post ${s ? "fs-animate" : ""}">
                  <div class="fs-header">
                    <h2 class="fs-title">${t(e.cr_launch_title)}</h2>
                    <p class="fs-desc">${t(e.cr_launch_desc)}</p>
                  </div>
                  ${o ? q(o) ? i`<video
                          class="cr-media"
                          src=${o}
                          controls
                          muted
                          playsinline
                          preload="metadata"
                          aria-label=${t(e.cr_launch_title) || m("فيديو الإطلاق", "Launch video")}
                        ></video>` : i`<img
                          class="cr-media"
                          src=${o}
                          alt=${t(e.cr_launch_title) || m("وسائط الإطلاق", "Launch media")}
                          loading="eager"
                          decoding="async"
                        />` : c}
                  ${d ? i`<div class="cr-cta-wrap">
                        <a class="fs-btn" href=${d}>
                          ${t(e.cr_cta_text) || m("اكتشفي المجموعة", "Explore collection")}
                        </a>
                      </div>` : c}
                  ${n.length ? i`<div class="cr-products">
                        ${n.map(
      (l) => i`
                            <article class="cr-product fs-card">
                              ${l.image ? i`<img
                                    class="cr-product__img"
                                    src=${l.image}
                                    alt=${l.name || m("منتج", "Product")}
                                    loading="lazy"
                                    decoding="async"
                                  />` : c}
                              <h3 class="cr-product__name">${l.name}</h3>
                              ${l.desc ? i`<p class="cr-product__desc">${l.desc}</p>` : c}
                              ${l.url ? i`<a class="fs-btn" href=${l.url}>
                                    ${l.btn_text || m("تسوقي الآن", "Shop now")}
                                  </a>` : c}
                            </article>
                          `
    )}
                      </div>` : c}
                </div>
              `}
        </div>
      </section>
    `;
  }
};
v.styles = [H, D, w`
    :host {
      direction: inherit;
    }
  `];
let u = v;
h([
  C({ type: Object })
], u.prototype, "config");
h([
  _()
], u.prototype, "phase");
h([
  _()
], u.prototype, "curtainOpen");
h([
  _()
], u.prototype, "countdown");
typeof u < "u" && u.registerSallaComponent("salla-collection-reveal");
export {
  u as default
};
