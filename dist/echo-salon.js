import { css as b, LitElement as _, html as a, nothing as o } from "lit";
import { property as y, state as $ } from "lit/decorators.js";
import { classMap as f } from "lit/directives/class-map.js";
import { styleMap as w } from "lit/directives/style-map.js";
import { n as k, l as d, v as A, d as z, s as I, i as q, p as v, r as T, t as u, a as C } from "./sharedStyles-C1vUkqEN.js";
const S = b`
  .es-shell {
    display: grid;
    gap: 1.5rem;
  }

  .es-featured {
    position: relative;
    padding: clamp(1.5rem, 4vw, 2.5rem);
    border-radius: var(--section-radius, 18px);
    border: 1px solid var(--border-color, #e8ddd6);
    background:
      radial-gradient(circle at 8% 0%, color-mix(in srgb, var(--accent-color, #8b5e4b) 14%, transparent), transparent 42%),
      linear-gradient(165deg, color-mix(in srgb, var(--card-bg, #fff) 92%, #f3ebe4), var(--card-bg, #fff));
    box-shadow: 0 18px 40px rgba(43, 33, 28, 0.07);
    overflow: hidden;
  }

  .es-featured__mark {
    position: absolute;
    top: 0.6rem;
    inset-inline-end: 1rem;
    font-size: clamp(4rem, 12vw, 7rem);
    line-height: 1;
    color: color-mix(in srgb, var(--accent-color, #8b5e4b) 16%, transparent);
    font-family: Georgia, 'Times New Roman', serif;
    pointer-events: none;
    user-select: none;
  }

  .es-featured__quote {
    margin: 0 0 1.25rem;
    max-width: 40rem;
    font-size: clamp(1.15rem, 2.4vw, 1.55rem);
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
    width: 3.25rem;
    height: 3.25rem;
    border-radius: 10px;
    object-fit: cover;
    background: color-mix(in srgb, var(--border-color, #e8ddd6) 70%, transparent);
  }

  .es-avatar--placeholder {
    display: grid;
    place-items: center;
    font-weight: 700;
    color: var(--accent-color, #8b5e4b);
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 12%, var(--card-bg, #fff));
  }

  .es-person {
    display: grid;
    gap: 0.15rem;
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
    gap: 0.15rem;
    color: var(--accent-color, #8b5e4b);
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
    font-size: 0.82rem;
    color: var(--muted-color, #7a6a62);
  }

  .es-score strong {
    font-size: 1.35rem;
    color: var(--accent-color, #8b5e4b);
  }

  .es-rail {
    display: flex;
    gap: 0.85rem;
    overflow-x: auto;
    padding: 0.15rem 0.1rem 0.55rem;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
  }

  .es-rail::-webkit-scrollbar {
    height: 4px;
  }

  .es-rail::-webkit-scrollbar-thumb {
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 40%, transparent);
    border-radius: 999px;
  }

  .es-card {
    flex: 0 0 min(17.5rem, 78vw);
    scroll-snap-align: start;
    display: grid;
    gap: 0.75rem;
    padding: 1rem;
    border-radius: calc(var(--section-radius, 18px) * 0.7);
    border: 1px solid var(--border-color, #e8ddd6);
    background: var(--card-bg, #fff);
    text-align: start;
    color: inherit;
    font: inherit;
    cursor: pointer;
    transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
  }

  .es-card:hover {
    transform: translateY(-2px);
    border-color: color-mix(in srgb, var(--accent-color, #8b5e4b) 40%, var(--border-color, #e8ddd6));
  }

  .es-card--active {
    border-color: var(--accent-color, #8b5e4b);
    box-shadow: 0 12px 28px rgba(43, 33, 28, 0.1);
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 6%, var(--card-bg, #fff));
  }

  .es-card__quote {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.65;
    color: var(--text-color, #2b211c);
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .es-card__note {
    margin: 0;
    font-size: 0.72rem;
    color: var(--muted-color, #7a6a62);
  }

  .es-card__foot {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    margin-top: auto;
  }

  .es-card__foot .es-avatar {
    width: 2.35rem;
    height: 2.35rem;
    border-radius: 8px;
  }

  @media (max-width: 959px) {
    .es-shell {
      gap: 1.2rem;
    }

    .es-featured {
      padding: 1.25rem 1.1rem;
    }

    .es-rail {
      margin-inline: -16px;
      padding-inline: 16px;
    }
  }

  @media (max-width: 639px) {
    .es-shell {
      gap: 1rem;
    }

    .es-featured {
      padding: 1.05rem 0.9rem;
    }

    .es-featured__mark {
      font-size: 3.1rem;
      top: 0.2rem;
      inset-inline-end: 0.55rem;
    }

    .es-featured__quote {
      margin-bottom: 0.9rem;
      font-size: 1rem;
      line-height: 1.65;
    }

    .es-rail {
      margin-inline: -12px;
      padding-inline: 12px;
      gap: 0.65rem;
    }

    .es-card {
      flex-basis: min(15.5rem, 84vw);
      padding: 0.85rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .es-card,
    .es-card:hover {
      transition: none;
      transform: none;
    }
  }
`;
function L(n) {
  return k(n).map((e, r) => ({
    id: d(e.id) || `echo-${r + 1}`,
    name: d(e.name),
    role: d(e.role),
    avatar: String(e.avatar || "").trim(),
    rating: A(z(e.rating, 5), 1, 5),
    quote: d(e.quote),
    product_note: d(e.product_note)
  })).filter((e) => e.name || e.quote);
}
function M(n) {
  if (!n.length) return 0;
  const e = n.reduce((r, c) => r + c.rating, 0);
  return Math.round(e / n.length * 10) / 10;
}
var R = Object.defineProperty, x = (n, e, r, c) => {
  for (var t = void 0, s = n.length - 1, l; s >= 0; s--)
    (l = n[s]) && (t = l(e, r, t) || t);
  return t && R(e, r, t), t;
};
const g = class g extends _ {
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
    return L((e = this.config) == null ? void 0 : e.es_reviews);
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
    const e = this.config || {}, r = T(e, "es_"), c = r.animate && !v(), t = this.reviews, s = this.active, l = d(e.es_title), m = d(e.es_desc), h = M(t);
    return t.length ? a`
      <section
        class=${f({
      "fs-section": !0,
      "fs-animate": c
    })}
        style=${w(C(r))}
        aria-label=${l || u("رواق الشهادات", "Testimony Arcade")}
      >
        <div class="fs-container">
          ${l || m ? a`<header class="fs-header">
                ${l ? a`<h2 class="fs-title">${l}</h2>` : o}
                ${m ? a`<p class="fs-desc">${m}</p>` : o}
              </header>` : o}

          <div class="es-shell">
            ${s ? a`<article class="es-featured" aria-live="polite">
                  <span class="es-featured__mark" aria-hidden="true">”</span>
                  <p class="es-featured__quote">${s.quote}</p>
                  <div class="es-featured__meta">
                    ${this.renderAvatar(s, !0)}
                    <div class="es-person">
                      <strong>${s.name}</strong>
                      ${s.role ? a`<span>${s.role}</span>` : o}
                      ${s.product_note ? a`<span>${s.product_note}</span>` : o}
                    </div>
                    ${this.renderStars(s.rating)}
                    ${h > 0 ? a`<div class="es-score">
                          <strong>${h}</strong>
                          <span>/ 5 · ${t.length} ${u("صدى", "echoes")}</span>
                        </div>` : o}
                  </div>
                </article>` : o}

            <div class="es-rail" role="list">
              ${t.map(
      (i) => a`
                  <button
                    type="button"
                    class=${f({
        "es-card": !0,
        "es-card--active": i.id === this.activeId
      })}
                    role="listitem"
                    aria-pressed=${i.id === this.activeId ? "true" : "false"}
                    @click=${() => this.select(i.id)}
                  >
                    ${this.renderStars(i.rating)}
                    <p class="es-card__quote">${i.quote}</p>
                    ${i.product_note ? a`<p class="es-card__note">${i.product_note}</p>` : o}
                    <div class="es-card__foot">
                      ${this.renderAvatar(i)}
                      <div class="es-person">
                        <strong>${i.name}</strong>
                        ${i.role ? a`<span>${i.role}</span>` : o}
                      </div>
                    </div>
                  </button>
                `
    )}
            </div>
          </div>
        </div>
      </section>
    ` : a`<div class="fs-empty" role="status">
        ${u("أضيفي شهادات الزبونات في الإعدادات", "Add customer echoes in settings")}
      </div>`;
  }
};
g.styles = [
  I,
  S,
  b`
      :host {
        direction: inherit;
      }
    `
];
let p = g;
x([
  y({ type: Object })
], p.prototype, "config");
x([
  $()
], p.prototype, "activeId");
typeof p < "u" && p.registerSallaComponent("salla-echo-salon");
export {
  p as default
};
