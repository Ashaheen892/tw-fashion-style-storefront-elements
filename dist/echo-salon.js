var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { n as normalizeCollection, l as localizedString, u as clamp, f as toNumber, s as sharedSectionCss, i as isTruthy, p as prefersReducedMotion, r as readSectionTheme, t, a as themeStyleMap, b as renderCommerceOutcome } from "./sharedStyles-Cmm0noVj.js";
import { f as fsSwiperCss, d as destroyFsSwiper, m as mountFsSwiper, A as Autoplay } from "./fsSwiper-CvtD0NsZ.js";
const componentStyles = css`
  .es-shell {
    display: grid;
    gap: 1.35rem;
  }

  .es-featured {
    position: relative;
    padding: clamp(1.6rem, 4vw, 2.65rem);
    border-radius: var(--section-radius, 18px);
    border: 1px solid var(--border-color, #e5e7eb);
    background:
      radial-gradient(circle at 8% 0%, color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 16%, transparent), transparent 42%),
      linear-gradient(165deg, color-mix(in srgb, var(--card-bg, #ffffff) 92%, var(--fs-surface, #f3f4f6)), var(--card-bg, #ffffff));
    box-shadow: 0 18px 42px color-mix(in srgb, var(--text-color, #000) 9%, transparent);
    overflow: hidden;
    animation: es-swap 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }

  @keyframes es-swap {
    from {
      opacity: 0.35;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  .es-featured__mark {
    position: absolute;
    top: 0.4rem;
    inset-inline-end: 1rem;
    font-size: clamp(4.5rem, 14vw, 8rem);
    line-height: 1;
    color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 18%, transparent);
    font-family: Georgia, 'Times New Roman', serif;
    pointer-events: none;
    user-select: none;
  }

  .es-featured__quote {
    margin: 0 0 1.35rem;
    max-width: 40rem;
    font-size: clamp(1.2rem, 2.5vw, 1.65rem);
    line-height: 1.75;
    font-weight: 500;
    color: var(--text-color, #000000);
  }

  .es-featured__meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.85rem;
  }

  .es-avatar {
    width: 3.35rem;
    height: 3.35rem;
    border-radius: 999px;
    object-fit: cover;
    border: 2px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 25%, #fff);
    background: color-mix(in srgb, var(--border-color, #e5e7eb) 70%, transparent);
    box-shadow: 0 8px 18px color-mix(in srgb, var(--text-color, #000) 12%, transparent);
  }

  .es-avatar--placeholder {
    display: grid;
    place-items: center;
    font-weight: 800;
    color: var(--accent-color, var(--fs-store-primary));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #ffffff));
  }

  .es-person {
    display: grid;
    gap: 0.12rem;
  }

  .es-person strong {
    font-size: 0.98rem;
  }

  .es-person span {
    font-size: 0.8rem;
    color: var(--muted-color, #666666);
  }

  .es-stars {
    display: inline-flex;
    gap: 0.12rem;
    color: var(--accent-color, var(--fs-store-primary));
    font-size: 0.95rem;
    letter-spacing: 0.04em;
  }

  .es-stars--muted {
    opacity: 0.28;
  }

  .es-score {
    display: inline-flex;
    align-items: baseline;
    gap: 0.4rem;
    margin-inline-start: auto;
    padding: 0.35rem 0.7rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, transparent);
    font-size: 0.8rem;
    color: var(--muted-color, #666666);
  }

  .es-score strong {
    font-size: 1.25rem;
    color: var(--accent-color, var(--fs-store-primary));
  }

  .es-swiper {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    overflow: hidden;
    padding: 0.2rem 0 0.35rem;
  }

  .es-slide {
    width: min(78vw, 17.5rem);
    height: auto;
  }

  .es-card {

    width: 100%;
    display: grid;
    gap: 0.65rem;
    min-height: 11.5rem;
    padding: 1rem 1.05rem;
    border-radius: calc(var(--section-radius, 16px) * 0.85);
    border: 1px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #ffffff);
    color: inherit;
    font: inherit;
    text-align: start;
    cursor: pointer;
    box-shadow: 0 10px 24px rgba(43, 33, 28, 0.05);
    transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
  }

  .fs-animate .es-card {
    animation: es-rise 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .fs-animate .es-card:nth-child(1) { animation-delay: 0.05s; }
  .fs-animate .es-card:nth-child(2) { animation-delay: 0.12s; }
  .fs-animate .es-card:nth-child(3) { animation-delay: 0.19s; }
  .fs-animate .es-card:nth-child(4) { animation-delay: 0.26s; }

  @keyframes es-rise {
    from {
      opacity: 0;
      transform: translateY(14px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  .es-card:hover {
    transform: translateY(-3px);
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 40%, var(--border-color, #e5e7eb));
  }

  .es-card--active {
    border-color: var(--accent-color, var(--fs-store-primary));
    box-shadow:
      0 0 0 1px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 35%, transparent),
      0 16px 34px color-mix(in srgb, var(--text-color, #000) 12%, transparent);
    background:
      linear-gradient(
        160deg,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, var(--card-bg, #ffffff)),
        var(--card-bg, #ffffff)
      );
  }

  .es-card__quote {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.6;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .es-card__note {
    margin: 0;
    font-size: 0.75rem;
    color: var(--accent-color, var(--fs-store-primary));
    font-weight: 700;
  }

  .es-card__foot {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    margin-top: auto;
  }

  .es-card .es-avatar {
    width: 2.35rem;
    height: 2.35rem;
  }

  @media (prefers-reduced-motion: reduce) {
    .es-featured,
    .es-card {
      animation: none !important;
      transition: none !important;
      transform: none !important;
    }
  }
`;
function parseReviews(raw) {
  return normalizeCollection(raw).map((item, index) => ({
    id: localizedString(item.id) || `echo-${index + 1}`,
    name: localizedString(item.name),
    role: localizedString(item.role),
    avatar: String(item.avatar || "").trim(),
    rating: clamp(toNumber(item.rating, 5), 1, 5),
    quote: localizedString(item.quote),
    product_note: localizedString(item.product_note)
  })).filter((r) => r.name || r.quote);
}
__name(parseReviews, "parseReviews");
function averageRating(reviews) {
  if (!reviews.length) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round(sum / reviews.length * 10) / 10;
}
__name(averageRating, "averageRating");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const _EchoSalon = class _EchoSalon extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.activeId = "", this.remountTimer = null, this.boundLang = () => {
      this.requestUpdate(), this.scheduleRemount();
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLang), this.ensureActive();
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLang), this.remountTimer && clearTimeout(this.remountTimer), destroyFsSwiper(this.swiper), this.swiper = void 0, super.disconnectedCallback();
  }
  firstUpdated() {
    this.remountSwiper();
  }
  updated(changed) {
    changed.has("config") && (this.ensureActive(), this.scheduleRemount());
  }
  get reviews() {
    var _a;
    return parseReviews((_a = this.config) == null ? void 0 : _a.es_reviews);
  }
  get active() {
    return this.reviews.find((r) => r.id === this.activeId) || this.reviews[0] || null;
  }
  ensureActive() {
    const list = this.reviews;
    if (!list.length) {
      this.activeId = "";
      return;
    }
    list.some((r) => r.id === this.activeId) || (this.activeId = list[0].id);
  }
  scheduleRemount() {
    this.remountTimer && clearTimeout(this.remountTimer), this.remountTimer = setTimeout(() => this.remountSwiper(), 0);
  }
  remountSwiper() {
    var _a;
    destroyFsSwiper(this.swiper), this.swiper = void 0;
    const root = this.renderRoot.querySelector(".es-swiper"), reviews = this.reviews;
    if (!root || reviews.length < 1) return;
    const auto = isTruthy((_a = this.config) == null ? void 0 : _a.es_autoplay, !0) && !prefersReducedMotion() && reviews.length > 1, start = Math.max(0, reviews.findIndex((r) => r.id === this.activeId));
    this.swiper = mountFsSwiper(root, {
      modules: auto ? [Autoplay] : [],
      slidesPerView: "auto",
      spaceBetween: 14,
      initialSlide: start,
      ...auto ? {
        autoplay: {
          delay: 5500,
          disableOnInteraction: !1,
          pauseOnMouseEnter: !0
        }
      } : {},
      on: {
        slideChange: /* @__PURE__ */ __name((sw) => {
          const item = reviews[sw.activeIndex];
          item && (this.activeId = item.id);
        }, "slideChange")
      }
    });
  }
  select(id) {
    var _a;
    this.activeId = id;
    const idx = this.reviews.findIndex((r) => r.id === id);
    idx >= 0 && ((_a = this.swiper) == null || _a.slideTo(idx));
  }
  renderStars(rating) {
    return html`
      <span class="es-stars" aria-label=${`${rating} / 5`}>
        ${[1, 2, 3, 4, 5].map(
      (n) => html`<span class=${n <= rating ? "" : "es-stars--muted"}>★</span>`
    )}
      </span>
    `;
  }
  renderAvatar(review) {
    if (review.avatar)
      return html`<img class="es-avatar" src=${review.avatar} alt="" loading="lazy" decoding="async" draggable="false" />`;
    const initial = (review.name || "?").trim().charAt(0);
    return html`<span class="es-avatar es-avatar--placeholder" aria-hidden="true">${initial}</span>`;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "es_"), animate = theme.animate && !prefersReducedMotion(), reviews = this.reviews, active = this.active, title = localizedString(c.es_title), desc = localizedString(c.es_desc), avg = averageRating(reviews);
    return reviews.length ? html`
      <section
        class=${classMap({
      "fs-section": !0,
      "fs-animate": animate
    })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("رواق الشهادات", "Testimony Arcade")}
      >
        <div class="fs-container">
          ${title || desc ? html`<header class="fs-header fs-header--editorial">
                <p class="fs-eyebrow">${t("آراء العملاء", "Customer voices")}</p>
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                <span class="fs-title-line" aria-hidden="true"></span>
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </header>` : nothing}

          <div class="es-shell">
            ${active ? html`<article class="es-featured" aria-live="polite">
                  <span class="es-featured__mark" aria-hidden="true">”</span>
                  <p class="es-featured__quote">${active.quote}</p>
                  <div class="es-featured__meta">
                    ${this.renderAvatar(active)}
                    <div class="es-person">
                      <strong>${active.name}</strong>
                      ${active.role ? html`<span>${active.role}</span>` : nothing}
                      ${active.product_note ? html`<span>${active.product_note}</span>` : nothing}
                    </div>
                    ${this.renderStars(active.rating)}
                    ${avg > 0 ? html`<div class="es-score">
                          <strong>${avg}</strong>
                          <span>/ 5 · ${reviews.length} ${t("صدى", "echoes")}</span>
                        </div>` : nothing}
                  </div>
                </article>` : nothing}

            <div class="swiper es-swiper" aria-roledescription="carousel">
              <div class="swiper-wrapper">
                ${reviews.map(
      (review) => html`
                    <div class="swiper-slide es-slide">
                      <button
                        type="button"
                        class=${classMap({
        "es-card": !0,
        "es-card--active": review.id === this.activeId
      })}
                        aria-pressed=${review.id === this.activeId ? "true" : "false"}
                        @click=${() => this.select(review.id)}
                      >
                        ${this.renderStars(review.rating)}
                        <p class="es-card__quote">${review.quote}</p>
                        ${review.product_note ? html`<p class="es-card__note">${review.product_note}</p>` : nothing}
                        <div class="es-card__foot">
                          ${this.renderAvatar(review)}
                          <div class="es-person">
                            <strong>${review.name}</strong>
                            ${review.role ? html`<span>${review.role}</span>` : nothing}
                          </div>
                        </div>
                      </button>
                    </div>
                  `
    )}
              </div>
            </div>
          </div>
        </div>
        ${renderCommerceOutcome(this.config || {}, "es_")}
      </section>
    ` : html`<div class="fs-empty" role="status">
        ${t("أضف شهادات العملاء في الإعدادات", "Add customer echoes in settings")}
      </div>`;
  }
};
__name(_EchoSalon, "EchoSalon"), _EchoSalon.styles = [
  sharedSectionCss,
  fsSwiperCss,
  componentStyles,
  css`
      :host {
        direction: inherit;
      }
    `
];
let EchoSalon = _EchoSalon;
__decorateClass([
  property({ type: Object })
], EchoSalon.prototype, "config");
__decorateClass([
  state()
], EchoSalon.prototype, "activeId");
typeof EchoSalon < "u" && EchoSalon.registerSallaComponent("salla-echo-salon");
export {
  EchoSalon as default
};
