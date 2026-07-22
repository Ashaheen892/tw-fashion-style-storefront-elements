import { css as b, LitElement as x, html as a, nothing as o } from "lit";
import { property as $, state as _ } from "lit/decorators.js";
import { classMap as u } from "lit/directives/class-map.js";
import { styleMap as w } from "lit/directives/style-map.js";
import { n as k, l as d, u as A, f as I, s as z, i as q, p as v, r as C, t as p, a as T, b as S } from "./sharedStyles-Cd7RKVf-.js";
const L = b`
  .es-shell {
    display: grid;
    gap: 1.35rem;
  }

  .es-featured {
    position: relative;
    padding: clamp(1.6rem, 4vw, 2.65rem);
    border-radius: var(--section-radius, 18px);
    border: 1px solid var(--border-color, #e8ddd6);
    background:
      radial-gradient(circle at 8% 0%, color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 16%, transparent), transparent 42%),
      linear-gradient(165deg, color-mix(in srgb, var(--card-bg, #fff) 92%, #f3ebe4), var(--card-bg, #fff));
    box-shadow: 0 18px 42px rgba(43, 33, 28, 0.07);
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
    color: var(--text-color, #2b211c);
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
    background: color-mix(in srgb, var(--border-color, #e8ddd6) 70%, transparent);
    box-shadow: 0 8px 18px rgba(43, 33, 28, 0.1);
  }

  .es-avatar--placeholder {
    display: grid;
    place-items: center;
    font-weight: 800;
    color: var(--accent-color, var(--fs-store-primary));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
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
    color: var(--muted-color, #7a6a62);
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
    color: var(--muted-color, #7a6a62);
  }

  .es-score strong {
    font-size: 1.25rem;
    color: var(--accent-color, var(--fs-store-primary));
  }

  .es-rail {
    display: flex;
    gap: 0.85rem;
    overflow-x: auto;
    padding: 0.2rem 0.1rem 0.65rem;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
  }

  .es-rail::-webkit-scrollbar {
    height: 4px;
  }

  .es-rail::-webkit-scrollbar-thumb {
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 40%, transparent);
    border-radius: 999px;
  }

  .es-card {
    flex: 0 0 min(78vw, 17.5rem);
    scroll-snap-align: start;
    display: grid;
    gap: 0.65rem;
    min-height: 11.5rem;
    padding: 1rem 1.05rem;
    border-radius: calc(var(--section-radius, 16px) * 0.85);
    border: 1px solid var(--border-color, #e8ddd6);
    background: var(--card-bg, #fff);
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
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 40%, var(--border-color, #e8ddd6));
  }

  .es-card--active {
    border-color: var(--accent-color, var(--fs-store-primary));
    box-shadow:
      0 0 0 1px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 35%, transparent),
      0 16px 34px rgba(43, 33, 28, 0.1);
    background:
      linear-gradient(
        160deg,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, var(--card-bg, #fff)),
        var(--card-bg, #fff)
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
function M(n) {
  return k(n).map((e, r) => ({
    id: d(e.id) || `echo-${r + 1}`,
    name: d(e.name),
    role: d(e.role),
    avatar: String(e.avatar || "").trim(),
    rating: A(I(e.rating, 5), 1, 5),
    quote: d(e.quote),
    product_note: d(e.product_note)
  })).filter((e) => e.name || e.quote);
}
function R(n) {
  if (!n.length) return 0;
  const e = n.reduce((r, c) => r + c.rating, 0);
  return Math.round(e / n.length * 10) / 10;
}
var j = Object.defineProperty, y = (n, e, r, c) => {
  for (var t = void 0, i = n.length - 1, l; i >= 0; i--)
    (l = n[i]) && (t = l(e, r, t) || t);
  return t && j(e, r, t), t;
};
const h = class h extends x {
  constructor() {
    super(...arguments), this.config = {}, this.activeId = "", this.boundLang = () => this.requestUpdate(), this.autoTimer = null;
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLang), this.ensureActive(), this.syncAutoplay();
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLang), this.clearAutoplay(), super.disconnectedCallback();
  }
  updated(e) {
    e.has("config") && (this.ensureActive(), this.syncAutoplay());
  }
  get reviews() {
    var e;
    return M((e = this.config) == null ? void 0 : e.es_reviews);
  }
  get active() {
    return this.reviews.find((e) => e.id === this.activeId) || this.reviews[0] || null;
  }
  ensureActive() {
    const e = this.reviews;
    if (!e.length) {
      this.activeId = "";
      return;
    }
    e.some((r) => r.id === this.activeId) || (this.activeId = e[0].id);
  }
  clearAutoplay() {
    this.autoTimer && (clearInterval(this.autoTimer), this.autoTimer = null);
  }
  syncAutoplay() {
    var r;
    this.clearAutoplay(), !(!(q((r = this.config) == null ? void 0 : r.es_autoplay, !0) && !v()) || this.reviews.length < 2) && (this.autoTimer = setInterval(() => this.next(), 5500));
  }
  next() {
    const e = this.reviews;
    if (e.length < 2) return;
    const r = e.findIndex((t) => t.id === this.activeId), c = e[(r + 1) % e.length];
    this.activeId = c.id;
  }
  select(e) {
    this.activeId = e, this.syncAutoplay();
  }
  renderStars(e) {
    return a`
      <span class="es-stars" aria-label=${`${e} / 5`}>
        ${[1, 2, 3, 4, 5].map(
      (r) => a`<span class=${r <= e ? "" : "es-stars--muted"}>★</span>`
    )}
      </span>
    `;
  }
  renderAvatar(e, r = !1) {
    const c = "es-avatar";
    if (e.avatar)
      return a`<img class=${c} src=${e.avatar} alt="" loading="lazy" decoding="async" />`;
    const t = (e.name || "?").trim().charAt(0);
    return a`<span class="es-avatar es-avatar--placeholder" aria-hidden="true">${t}</span>`;
  }
  render() {
    const e = this.config || {}, r = C(e, "es_"), c = r.animate && !v(), t = this.reviews, i = this.active, l = d(e.es_title), f = d(e.es_desc), g = R(t);
    return t.length ? a`
      <section
        class=${u({
      "fs-section": !0,
      "fs-animate": c
    })}
        style=${w(T(r))}
        aria-label=${l || p("رواق الشهادات", "Testimony Arcade")}
      >
        <div class="fs-container">
          ${l || f ? a`<header class="fs-header fs-header--editorial">
                <p class="fs-eyebrow">${p("آراء العملاء", "Customer voices")}</p>
                ${l ? a`<h2 class="fs-title">${l}</h2>` : o}
                <span class="fs-title-line" aria-hidden="true"></span>
                ${f ? a`<p class="fs-desc">${f}</p>` : o}
              </header>` : o}

          <div class="es-shell">
            ${i ? a`<article class="es-featured" aria-live="polite">
                  <span class="es-featured__mark" aria-hidden="true">”</span>
                  <p class="es-featured__quote">${i.quote}</p>
                  <div class="es-featured__meta">
                    ${this.renderAvatar(i, !0)}
                    <div class="es-person">
                      <strong>${i.name}</strong>
                      ${i.role ? a`<span>${i.role}</span>` : o}
                      ${i.product_note ? a`<span>${i.product_note}</span>` : o}
                    </div>
                    ${this.renderStars(i.rating)}
                    ${g > 0 ? a`<div class="es-score">
                          <strong>${g}</strong>
                          <span>/ 5 · ${t.length} ${p("صدى", "echoes")}</span>
                        </div>` : o}
                  </div>
                </article>` : o}

            <div class="es-rail" role="list">
              ${t.map(
      (s) => a`
                  <button
                    type="button"
                    class=${u({
        "es-card": !0,
        "es-card--active": s.id === this.activeId
      })}
                    role="listitem"
                    aria-pressed=${s.id === this.activeId ? "true" : "false"}
                    @click=${() => this.select(s.id)}
                  >
                    ${this.renderStars(s.rating)}
                    <p class="es-card__quote">${s.quote}</p>
                    ${s.product_note ? a`<p class="es-card__note">${s.product_note}</p>` : o}
                    <div class="es-card__foot">
                      ${this.renderAvatar(s)}
                      <div class="es-person">
                        <strong>${s.name}</strong>
                        ${s.role ? a`<span>${s.role}</span>` : o}
                      </div>
                    </div>
                  </button>
                `
    )}
            </div>

            ${t.length > 1 ? a`<div class="fs-dots" role="tablist" aria-label=${p("التنقل بين الشهادات", "Browse reviews")}>
                  ${t.map(
      (s) => a`
                      <button
                        type="button"
                        class=${u({ "fs-dot": !0, "is-active": s.id === this.activeId })}
                        aria-label=${s.name || p("شهادة", "Review")}
                        @click=${() => this.select(s.id)}
                      ></button>
                    `
    )}
                </div>` : o}
          </div>
        </div>
        ${S(this.config || {}, "es_")}
      </section>
    ` : a`<div class="fs-empty" role="status">
        ${p("أضف شهادات العملاء في الإعدادات", "Add customer echoes in settings")}
      </div>`;
  }
};
h.styles = [
  z,
  L,
  b`
      :host {
        direction: inherit;
      }
    `
];
let m = h;
y([
  $({ type: Object })
], m.prototype, "config");
y([
  _()
], m.prototype, "activeId");
typeof m < "u" && m.registerSallaComponent("salla-echo-salon");
export {
  m as default
};
