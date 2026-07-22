import { css as x, LitElement as w, html as t, nothing as s } from "lit";
import { property as $, state as h } from "lit/decorators.js";
import { classMap as y } from "lit/directives/class-map.js";
import { styleMap as q } from "lit/directives/style-map.js";
import { n as _, l, s as k, r as C, p as z, i as L, t as n, a as S, b as I } from "./sharedStyles-Cd7RKVf-.js";
const E = x`
  .ip-shell {
    display: grid;
    gap: 1.25rem;
    max-width: 48rem;
    margin: 0 auto;
  }

  .ip-toolbar {
    display: grid;
    gap: 0.75rem;
    padding: 0.95rem 1rem;
    border-radius: calc(var(--section-radius, 16px) * 0.85);
    border: 1px solid var(--border-color, #e8ddd6);
    background:
      linear-gradient(
        135deg,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 7%, var(--card-bg, #fff)),
        var(--card-bg, #fff) 55%
      );
    box-shadow: 0 10px 26px rgba(43, 33, 28, 0.04);
  }

  @media (min-width: 720px) {
    .ip-toolbar {
      grid-template-columns: 1fr auto;
      align-items: center;
    }
  }

  .ip-search {
    width: 100%;
    min-height: 46px;
    box-sizing: border-box;
    padding: 0.7rem 1rem;
    border: 1px solid var(--border-color, #e8ddd6);
    border-radius: 999px;
    background: var(--card-bg, #fff);
    color: var(--text-color, #2b211c);
    font: inherit;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .ip-search:focus {
    outline: none;
    border-color: var(--accent-color, var(--fs-store-primary));
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 18%, transparent);
  }

  .ip-cats {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .ip-cat {
    min-height: 40px;
    padding: 0.4rem 0.9rem;
    border-radius: 999px;
    border: 1px solid var(--border-color, #e8ddd6);
    background: var(--card-bg, #fff);
    color: var(--muted-color, #7a6a62);
    font: inherit;
    font-size: 0.8rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
  }

  .ip-cat:hover {
    transform: translateY(-1px);
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 40%, var(--border-color, #e8ddd6));
  }

  .ip-cat[aria-pressed='true'] {
    border-color: var(--accent-color, var(--fs-store-primary));
    color: #fff;
    background: var(--button-bg, var(--accent-color, var(--fs-store-primary)));
  }

  .ip-list {
    display: grid;
    gap: 0.65rem;
  }

  .fs-animate .ip-item {
    animation: ip-rise 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .fs-animate .ip-item:nth-child(1) { animation-delay: 0.04s; }
  .fs-animate .ip-item:nth-child(2) { animation-delay: 0.1s; }
  .fs-animate .ip-item:nth-child(3) { animation-delay: 0.16s; }
  .fs-animate .ip-item:nth-child(4) { animation-delay: 0.22s; }
  .fs-animate .ip-item:nth-child(5) { animation-delay: 0.28s; }

  @keyframes ip-rise {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  .ip-item {
    border: 1px solid var(--border-color, #e8ddd6);
    border-radius: calc(var(--section-radius, 16px) * 0.75);
    background: var(--card-bg, #fff);
    overflow: hidden;
    box-shadow: 0 8px 22px rgba(43, 33, 28, 0.04);
    transition: border-color 0.25s ease, box-shadow 0.25s ease;
  }

  .ip-item--open {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 42%, var(--border-color, #e8ddd6));
    box-shadow: 0 14px 32px rgba(43, 33, 28, 0.09);
  }

  .ip-q {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0.85rem;
    align-items: center;
    min-height: 52px;
    padding: 1.05rem 1.1rem;
    border: none;
    background: transparent;
    color: inherit;
    font: inherit;
    text-align: start;
    cursor: pointer;
  }

  .ip-q:hover .ip-q__text {
    color: var(--accent-color, var(--fs-store-primary));
  }

  .ip-q__text {
    font-size: 0.98rem;
    font-weight: 750;
    line-height: 1.45;
    transition: color 0.2s ease;
  }

  .ip-q__meta {
    display: inline-flex;
    margin-top: 0.35rem;
    padding: 0.15rem 0.55rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, transparent);
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--accent-color, var(--fs-store-primary));
  }

  .ip-q__icon {
    width: 2rem;
    height: 2rem;
    display: grid;
    place-items: center;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, transparent);
    color: var(--accent-color, var(--fs-store-primary));
    font-size: 1.15rem;
    font-weight: 700;
    transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), background 0.2s ease;
  }

  .ip-item--open .ip-q__icon {
    transform: rotate(45deg);
    background: var(--accent-color, var(--fs-store-primary));
    color: #fff;
  }

  .ip-a {
    padding: 0 1.1rem 1.15rem;
    color: var(--muted-color, #7a6a62);
    font-size: 0.92rem;
    line-height: 1.8;
    animation: ip-reveal 0.3s ease;
  }

  .ip-a p {
    margin: 0;
    padding-top: 0.15rem;
    border-top: 1px solid color-mix(in srgb, var(--border-color, #e8ddd6) 80%, transparent);
  }

  @keyframes ip-reveal {
    from {
      opacity: 0;
      transform: translateY(-6px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @media (max-width: 959px) {
    .ip-cats {
      flex-wrap: nowrap;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior-x: contain;
      padding-bottom: 0.1rem;
    }

    .ip-cat {
      flex: 0 0 auto;
      white-space: nowrap;
    }
  }

  @media (max-width: 639px) {
    .ip-toolbar {
      padding: 0.8rem;
    }

    .ip-q {
      padding: 0.9rem 0.85rem;
    }

    .ip-a {
      padding: 0 0.85rem 0.95rem;
      font-size: 0.88rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .ip-item,
    .ip-a,
    .ip-q__icon,
    .ip-cat {
      animation: none !important;
      transition: none !important;
      transform: none !important;
    }
  }
`;
function M(o) {
  return _(o).map((r, i) => ({
    id: l(r.id) || `ask-${i + 1}`,
    question: l(r.question),
    answer: l(r.answer),
    category: l(r.category) || ""
  })).filter((r) => r.question && r.answer);
}
function A(o) {
  const r = /* @__PURE__ */ new Set();
  return o.forEach((i) => {
    i.category.trim() && r.add(i.category.trim());
  }), [...r];
}
function O(o, r, i) {
  const d = r.trim().toLowerCase();
  return o.filter((e) => i && e.category !== i ? !1 : d ? e.question.toLowerCase().includes(d) || e.answer.toLowerCase().includes(d) || e.category.toLowerCase().includes(d) : !0);
}
var Y = Object.defineProperty, f = (o, r, i, d) => {
  for (var e = void 0, p = o.length - 1, m; p >= 0; p--)
    (m = o[p]) && (e = m(r, i, e) || e);
  return e && Y(r, i, e), e;
};
const u = class u extends w {
  constructor() {
    super(...arguments), this.config = {}, this.openId = "", this.query = "", this.category = "", this.boundLang = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLang);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLang), super.disconnectedCallback();
  }
  get items() {
    var r;
    return M((r = this.config) == null ? void 0 : r.ip_items);
  }
  get filtered() {
    return O(this.items, this.query, this.category);
  }
  toggle(r) {
    this.openId = this.openId === r ? "" : r;
  }
  render() {
    const r = this.config || {}, i = C(r, "ip_"), d = i.animate && !z(), e = l(r.ip_title), p = l(r.ip_desc), m = L(r.ip_show_search, !0), b = this.items, v = this.filtered, g = A(b);
    return b.length ? t`
      <section
        class=${y({
      "fs-section": !0,
      "fs-animate": d
    })}
        style=${q(S(i))}
        aria-label=${e || n("ديوان الأسئلة", "Questions Diwan")}
      >
        <div class="fs-container">
          ${e || p ? t`<header class="fs-header fs-header--editorial">
                <p class="fs-eyebrow">${n("أسئلة شائعة", "FAQ")}</p>
                ${e ? t`<h2 class="fs-title">${e}</h2>` : s}
                <span class="fs-title-line" aria-hidden="true"></span>
                ${p ? t`<p class="fs-desc">${p}</p>` : s}
              </header>` : s}

          <div class="ip-shell">
            ${m || g.length ? t`<div class="ip-toolbar">
                  ${m ? t`<input
                        class="ip-search"
                        type="search"
                        .value=${this.query}
                        placeholder=${n("ابحث في الأسئلة…", "Search questions…")}
                        aria-label=${n("بحث", "Search")}
                        @input=${(a) => {
      this.query = a.target.value;
    }}
                      />` : s}
                  ${g.length ? t`<div class="ip-cats" role="group" aria-label=${n("التصنيفات", "Categories")}>
                        <button
                          type="button"
                          class="ip-cat"
                          aria-pressed=${this.category === "" ? "true" : "false"}
                          @click=${() => {
      this.category = "";
    }}
                        >
                          ${n("الكل", "All")}
                        </button>
                        ${g.map(
      (a) => t`
                            <button
                              type="button"
                              class="ip-cat"
                              aria-pressed=${this.category === a ? "true" : "false"}
                              @click=${() => {
        this.category = a;
      }}
                            >
                              ${a}
                            </button>
                          `
    )}
                      </div>` : s}
                </div>` : s}

            ${v.length ? t`<div class="ip-list">
                  ${v.map(
      (a) => t`
                      <article
                        class=${y({
        "ip-item": !0,
        "ip-item--open": this.openId === a.id
      })}
                      >
                        <button
                          type="button"
                          class="ip-q"
                          aria-expanded=${this.openId === a.id ? "true" : "false"}
                          @click=${() => this.toggle(a.id)}
                        >
                          <span>
                            <span class="ip-q__text">${a.question}</span>
                            ${a.category ? t`<span class="ip-q__meta">${a.category}</span>` : s}
                          </span>
                          <span class="ip-q__icon" aria-hidden="true">+</span>
                        </button>
                        ${this.openId === a.id ? t`<div class="ip-a">
                              <p>${a.answer}</p>
                            </div>` : s}
                      </article>
                    `
    )}
                </div>` : t`<div class="fs-empty" role="status">
                  ${n("لا توجد نتائج مطابقة", "No matching results")}
                </div>`}
          </div>
        </div>
        ${I(this.config || {}, "ip_")}
      </section>
    ` : t`<div class="fs-empty" role="status">
        ${n("أضف أسئلة وأجوبة في الإعدادات", "Add questions and answers in settings")}
      </div>`;
  }
};
u.styles = [
  k,
  E,
  x`
      :host {
        direction: inherit;
      }
    `
];
let c = u;
f([
  $({ type: Object })
], c.prototype, "config");
f([
  h()
], c.prototype, "openId");
f([
  h()
], c.prototype, "query");
f([
  h()
], c.prototype, "category");
typeof c < "u" && c.registerSallaComponent("salla-inquiry-parlour");
export {
  c as default
};
