var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, nothing, html } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { l as localizedString, n as normalizeCollection, d as extractLink, u as clamp, q as getUnitValue, s as sharedSectionCss, p as prefersReducedMotion, i as isTruthy, t, r as readSectionTheme, a as themeStyleMap, b as renderCommerceOutcome } from "./sharedStyles-Cmm0noVj.js";
const componentStyles = css`
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
    box-shadow: 0 12px 36px color-mix(in srgb, var(--text-color, #000) 20%, transparent);
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
    color: color-mix(in srgb, #fff 88%, var(--muted-color, #666666));
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
    background: color-mix(in srgb, var(--card-bg, #ffffff) 88%, transparent);
    border: 1px solid var(--border-color, #e5e7eb);
  }

  .cr-timer__value {
    display: block;
    font-size: 1.65rem;
    font-weight: 700;
    line-height: 1.1;
    color: var(--timer-color, var(--accent-color, var(--fs-store-primary)));
  }

  .cr-timer__label {
    display: block;
    margin-top: 0.2rem;
    font-size: 0.72rem;
    color: var(--muted-color, #666666);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .cr-curtain {
    position: absolute;
    inset: 0;
    z-index: 5;
    background: linear-gradient(
      180deg,
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 92%, #000) 0%,
      color-mix(in srgb, var(--text-color, #000000) 88%, #000) 100%
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
    color: var(--muted-color, #666666);
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
function parseLaunchDate(raw) {
  const str = localizedString(raw, "").trim();
  if (!str) return null;
  const parsed = new Date(str);
  return Number.isFinite(parsed.getTime()) ? parsed : null;
}
__name(parseLaunchDate, "parseLaunchDate");
function getCountdown(target, now = /* @__PURE__ */ new Date()) {
  const totalMs = Math.max(0, target.getTime() - now.getTime()), totalSec = Math.floor(totalMs / 1e3), days = Math.floor(totalSec / 86400), hours = Math.floor(totalSec % 86400 / 3600), minutes = Math.floor(totalSec % 3600 / 60), seconds = totalSec % 60;
  return { days, hours, minutes, seconds, totalMs };
}
__name(getCountdown, "getCountdown");
function parseRevealProducts(raw) {
  return normalizeCollection(raw).map((item) => ({
    image: localizedString(item.image),
    name: localizedString(item.name),
    desc: localizedString(item.desc),
    url: extractLink(item.url),
    btn_text: localizedString(item.btn_text)
  })).filter((p) => p.name || p.image);
}
__name(parseRevealProducts, "parseRevealProducts");
function isVideoUrl(url) {
  return url ? /\.(mp4|webm|ogg)(\?|$)/i.test(url) || url.includes("video") : !1;
}
__name(isVideoUrl, "isVideoUrl");
function overlayOpacity(raw) {
  return clamp(getUnitValue(raw, 0), 0, 100) / 100;
}
__name(overlayOpacity, "overlayOpacity");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const _CollectionReveal = class _CollectionReveal extends LitElement {
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
    var _a;
    window.removeEventListener("language-changed", this.boundLangHandler), (_a = this.motionQuery) == null || _a.removeEventListener("change", this.boundMotionHandler), this.clearTimer(), this.curtainTimer && clearTimeout(this.curtainTimer), super.disconnectedCallback();
  }
  clearTimer() {
    this.timerId != null && (clearInterval(this.timerId), this.timerId = null);
  }
  get cfg() {
    const value = this.config;
    return value && typeof value == "object" ? value : {};
  }
  syncTimer() {
    this.clearTimer();
    const launchAt = parseLaunchDate(this.cfg.cr_launch_at);
    if (!launchAt) {
      this.phase = "post";
      return;
    }
    const tick = /* @__PURE__ */ __name(() => {
      const parts = getCountdown(launchAt);
      this.countdown = parts, parts.totalMs <= 0 && (this.clearTimer(), this.phase === "pre" && this.beginLaunchReveal());
    }, "tick");
    tick(), this.phase === "pre" && (this.timerId = setInterval(tick, 1e3));
  }
  beginLaunchReveal() {
    if (!prefersReducedMotion() && isTruthy(this.cfg.cr_animate, !0)) {
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
  updated(changed) {
    changed.has("config") && (this.phase = "pre", this.curtainOpen = !1, this.curtainTimer && clearTimeout(this.curtainTimer), this.syncTimer());
  }
  renderTimerUnit(value, labelAr, labelEn, show) {
    return show ? html`
      <div class="cr-timer__unit" role="listitem">
        <span class="cr-timer__value" aria-hidden="true">${String(value).padStart(2, "0")}</span>
        <span class="cr-timer__label">${t(labelAr, labelEn)}</span>
      </div>
    ` : nothing;
  }
  render() {
    const c = this.cfg, theme = readSectionTheme(c, "cr_"), animate = theme.animate && !prefersReducedMotion(), products = parseRevealProducts(c.cr_products), ctaUrl = extractLink(c.cr_cta_url), launchMedia = localizedString(c.cr_launch_media), overlayAlpha = overlayOpacity(c.cr_overlay_opacity), timerColor = String(c.cr_timer_color || theme.accent), overlayColor = String(c.cr_overlay_color || "#2b211c"), showDays = isTruthy(c.cr_show_days, !0), showHours = isTruthy(c.cr_show_hours, !0), showMinutes = isTruthy(c.cr_show_minutes, !0), showSeconds = isTruthy(c.cr_show_seconds, !0);
    return html`
      <section
        class=${classMap({
      "fs-section": !0,
      "fs-animate": animate
    })}
        style=${styleMap({
      ...themeStyleMap(theme),
      "--timer-color": timerColor
    })}
        aria-live=${this.phase === "post" ? "polite" : "off"}
      >
        <div class="fs-container">
          ${this.phase !== "post" ? html`
                <div class="fs-header">
                  <h2 class="fs-title">${localizedString(c.cr_tease_title)}</h2>
                  <p class="fs-desc">${localizedString(c.cr_tease_desc)}</p>
                </div>
                <div class="cr-stage fs-card">
                  ${localizedString(c.cr_bg_image) ? html`<img
                        class="cr-bg"
                        src=${localizedString(c.cr_bg_image)}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />` : nothing}
                  <div
                    class="cr-overlay"
                    style=${styleMap({
      background: overlayColor,
      opacity: String(overlayAlpha)
    })}
                  ></div>
                  <div class="cr-pre">
                    ${localizedString(c.cr_pre_text) ? html`<p class="cr-pre-text">${localizedString(c.cr_pre_text)}</p>` : nothing}
                    ${localizedString(c.cr_mystery_image) ? html`<img
                          class=${classMap({
      "cr-mystery": !0,
      "cr-mystery--breath": isTruthy(c.cr_breath_effect) && animate
    })}
                          src=${localizedString(c.cr_mystery_image)}
                          alt=${localizedString(c.cr_tease_title) || t("صورة المجموعة", "Collection preview")}
                          loading="eager"
                          decoding="async"
                        />` : nothing}
                    <div class="cr-timer" role="timer" aria-label=${t("العد التنازلي", "Countdown")}>
                      ${this.renderTimerUnit(this.countdown.days, "يوم", "Days", showDays)}
                      ${this.renderTimerUnit(this.countdown.hours, "ساعة", "Hours", showHours)}
                      ${this.renderTimerUnit(this.countdown.minutes, "دقيقة", "Minutes", showMinutes)}
                      ${this.renderTimerUnit(this.countdown.seconds, "ثانية", "Seconds", showSeconds)}
                    </div>
                  </div>
                  ${this.phase === "curtain" ? html`<div
                        class=${classMap({
      "cr-curtain": !0,
      "cr-curtain--open": this.curtainOpen
    })}
                        aria-hidden="true"
                      ></div>` : nothing}
                </div>
              ` : html`
                <div class="cr-post ${animate ? "fs-animate" : ""}">
                  <div class="fs-header">
                    <h2 class="fs-title">${localizedString(c.cr_launch_title)}</h2>
                    <p class="fs-desc">${localizedString(c.cr_launch_desc)}</p>
                  </div>
                  ${launchMedia ? isVideoUrl(launchMedia) ? html`<video
                          class="cr-media"
                          src=${launchMedia}
                          controls
                          muted
                          playsinline
                          preload="metadata"
                          aria-label=${localizedString(c.cr_launch_title) || t("فيديو الإطلاق", "Launch video")}
                        ></video>` : html`<img
                          class="cr-media"
                          src=${launchMedia}
                          alt=${localizedString(c.cr_launch_title) || t("وسائط الإطلاق", "Launch media")}
                          loading="eager"
                          decoding="async"
                        />` : nothing}
                  ${ctaUrl ? html`<div class="cr-cta-wrap">
                        <a class="fs-btn" href=${ctaUrl}>
                          ${localizedString(c.cr_cta_text) || t("اكتشفي المجموعة", "Explore collection")}
                        </a>
                      </div>` : nothing}
                  ${products.length ? html`<div class="cr-products">
                        ${products.map(
      (p) => html`
                            <article class="cr-product fs-card">
                              ${p.image ? html`<img
                                    class="cr-product__img"
                                    src=${p.image}
                                    alt=${p.name || t("منتج", "Product")}
                                    loading="lazy"
                                    decoding="async"
                                  />` : nothing}
                              <h3 class="cr-product__name">${p.name}</h3>
                              ${p.desc ? html`<p class="cr-product__desc">${p.desc}</p>` : nothing}
                              ${p.url ? html`<a class="fs-btn" href=${p.url}>
                                    ${p.btn_text || t("تسوقي الآن", "Shop now")}
                                  </a>` : nothing}
                            </article>
                          `
    )}
                      </div>` : nothing}
                </div>
              `}
        </div>
        ${renderCommerceOutcome(this.config || {}, "cr_")}
      </section>
    `;
  }
};
__name(_CollectionReveal, "CollectionReveal"), _CollectionReveal.styles = [sharedSectionCss, componentStyles, css`
    :host {
      direction: inherit;
    }
  `];
let CollectionReveal = _CollectionReveal;
__decorateClass([
  property({ type: Object })
], CollectionReveal.prototype, "config");
__decorateClass([
  state()
], CollectionReveal.prototype, "phase");
__decorateClass([
  state()
], CollectionReveal.prototype, "curtainOpen");
__decorateClass([
  state()
], CollectionReveal.prototype, "countdown");
typeof CollectionReveal < "u" && CollectionReveal.registerSallaComponent("salla-collection-reveal");
export {
  CollectionReveal as default
};
