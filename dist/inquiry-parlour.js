import { css as x, LitElement as w, html as a, nothing as s } from "lit";
import { property as $, state as h } from "lit/decorators.js";
import { classMap as y } from "lit/directives/class-map.js";
import { styleMap as q } from "lit/directives/style-map.js";
import { n as _, l, s as k, r as C, p as z, i as L, t as d, a as S } from "./sharedStyles-BGb_aVO_.js";
const I = x`
  .ip-shell {
    display: grid;
    gap: 1.15rem;
    max-width: 48rem;
    margin: 0 auto;
  }

  .ip-toolbar {
    display: grid;
    gap: 0.65rem;
  }

  @media (min-width: 720px) {
    .ip-toolbar {
      grid-template-columns: 1fr auto;
      align-items: center;
    }
  }

  .ip-search {
    width: 100%;
    min-height: 44px;
    box-sizing: border-box;
    padding: 0.65rem 0.9rem;
    border: 1px solid var(--border-color, #e8ddd6);
    border-radius: 10px;
    background: var(--card-bg, #fff);
    color: var(--text-color, #2b211c);
    font: inherit;
  }

  .ip-search:focus {
    outline: 2px solid color-mix(in srgb, var(--accent-color, #8b5e4b) 40%, transparent);
    outline-offset: 1px;
    border-color: var(--accent-color, #8b5e4b);
  }

  .ip-cats {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    justify-content: flex-start;
  }

  .ip-cat {
    min-height: 44px;
    padding: 0.45rem 0.85rem;
    border-radius: 8px;
    border: 1px solid var(--border-color, #e8ddd6);
    background: var(--card-bg, #fff);
    color: var(--muted-color, #7a6a62);
    font: inherit;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
  }

  .ip-cat[aria-pressed='true'] {
    border-color: var(--accent-color, #8b5e4b);
    color: var(--accent-color, #8b5e4b);
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 10%, var(--card-bg, #fff));
  }

  .ip-list {
    display: grid;
    gap: 0.55rem;
  }

  .ip-item {
    border: 1px solid var(--border-color, #e8ddd6);
    border-radius: 12px;
    background: var(--card-bg, #fff);
    overflow: hidden;
    box-shadow: 0 8px 22px rgba(43, 33, 28, 0.04);
  }

  .ip-item--open {
    border-color: color-mix(in srgb, var(--accent-color, #8b5e4b) 40%, var(--border-color, #e8ddd6));
    box-shadow: 0 12px 28px rgba(43, 33, 28, 0.08);
  }

  .ip-q {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0.75rem;
    align-items: center;
    padding: 1rem 1.05rem;
    border: none;
    background: transparent;
    color: inherit;
    font: inherit;
    text-align: start;
    cursor: pointer;
  }

  .ip-q__text {
    font-size: 0.98rem;
    font-weight: 700;
    line-height: 1.45;
  }

  .ip-q__meta {
    display: block;
    margin-top: 0.25rem;
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--muted-color, #7a6a62);
  }

  .ip-q__icon {
    width: 1.75rem;
    height: 1.75rem;
    display: grid;
    place-items: center;
    border-radius: 8px;
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 12%, transparent);
    color: var(--accent-color, #8b5e4b);
    font-size: 1.1rem;
    font-weight: 700;
    transition: transform 0.2s ease;
  }

  .ip-item--open .ip-q__icon {
    transform: rotate(45deg);
  }

  .ip-a {
    padding: 0 1.05rem 1.05rem;
    color: var(--muted-color, #7a6a62);
    font-size: 0.92rem;
    line-height: 1.75;
    animation: ip-reveal 0.28s ease;
  }

  .ip-a p {
    margin: 0;
  }

  .ip-empty {
    text-align: center;
    padding: 1.5rem 1rem;
    color: var(--muted-color, #7a6a62);
    font-size: 0.9rem;
  }

  @keyframes ip-reveal {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 959px) {
    .ip-toolbar {
      gap: 0.75rem;
    }

    .ip-cats {
      flex-wrap: nowrap;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior-x: contain;
      padding-bottom: 0.15rem;
      gap: 0.4rem;
    }

    .ip-cat {
      flex: 0 0 auto;
      white-space: nowrap;
    }
  }

  @media (max-width: 639px) {
    .ip-toolbar {
      gap: 0.65rem;
    }

    .ip-cat {
      font-size: 0.76rem;
      padding-inline: 0.75rem;
    }

    .ip-q {
      padding: 0.85rem 0.8rem;
      gap: 0.6rem;
      min-height: 48px;
    }

    .ip-a {
      padding: 0 0.8rem 0.9rem;
      font-size: 0.86rem;
      line-height: 1.65;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .ip-a,
    .ip-q__icon {
      animation: none !important;
      transition: none !important;
      transform: none !important;
    }
  }
`;
function E(o) {
  return _(o).map((e, i) => ({
    id: l(e.id) || `ask-${i + 1}`,
    question: l(e.question),
    answer: l(e.answer),
    category: l(e.category) || ""
  })).filter((e) => e.question && e.answer);
}
function M(o) {
  const e = /* @__PURE__ */ new Set();
  return o.forEach((i) => {
    i.category.trim() && e.add(i.category.trim());
  }), [...e];
}
function j(o, e, i) {
  const c = e.trim().toLowerCase();
  return o.filter((r) => i && r.category !== i ? !1 : c ? r.question.toLowerCase().includes(c) || r.answer.toLowerCase().includes(c) || r.category.toLowerCase().includes(c) : !0);
}
var A = Object.defineProperty, g = (o, e, i, c) => {
  for (var r = void 0, p = o.length - 1, m; p >= 0; p--)
    (m = o[p]) && (r = m(e, i, r) || r);
  return r && A(e, i, r), r;
};
const f = class f extends w {
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
    var e;
    return E((e = this.config) == null ? void 0 : e.ip_items);
  }
  get filtered() {
    return j(this.items, this.query, this.category);
  }
  toggle(e) {
    this.openId = this.openId === e ? "" : e;
  }
  render() {
    const e = this.config || {}, i = C(e, "ip_"), c = i.animate && !z(), r = l(e.ip_title), p = l(e.ip_desc), m = L(e.ip_show_search, !0), b = this.items, v = this.filtered, u = M(b);
    return b.length ? a`
      <section
        class=${y({
      "fs-section": !0,
      "fs-animate": c
    })}
        style=${q(S(i))}
        aria-label=${r || d("ديوان الأسئلة", "Questions Diwan")}
      >
        <div class="fs-container">
          ${r || p ? a`<header class="fs-header">
                ${r ? a`<h2 class="fs-title">${r}</h2>` : s}
                ${p ? a`<p class="fs-desc">${p}</p>` : s}
              </header>` : s}

          <div class="ip-shell">
            ${m || u.length ? a`<div class="ip-toolbar">
                  ${m ? a`<input
                        class="ip-search"
                        type="search"
                        .value=${this.query}
                        placeholder=${d("ابحثي في الأسئلة…", "Search questions…")}
                        aria-label=${d("بحث", "Search")}
                        @input=${(t) => {
      this.query = t.target.value;
    }}
                      />` : s}
                  ${u.length ? a`<div class="ip-cats" role="group" aria-label=${d("التصنيفات", "Categories")}>
                        <button
                          type="button"
                          class="ip-cat"
                          aria-pressed=${this.category === "" ? "true" : "false"}
                          @click=${() => {
      this.category = "";
    }}
                        >
                          ${d("الكل", "All")}
                        </button>
                        ${u.map(
      (t) => a`
                            <button
                              type="button"
                              class="ip-cat"
                              aria-pressed=${this.category === t ? "true" : "false"}
                              @click=${() => {
        this.category = t;
      }}
                            >
                              ${t}
                            </button>
                          `
    )}
                      </div>` : s}
                </div>` : s}

            ${v.length ? a`<div class="ip-list">
                  ${v.map(
      (t) => a`
                      <article
                        class=${y({
        "ip-item": !0,
        "ip-item--open": this.openId === t.id
      })}
                      >
                        <button
                          type="button"
                          class="ip-q"
                          aria-expanded=${this.openId === t.id ? "true" : "false"}
                          @click=${() => this.toggle(t.id)}
                        >
                          <span>
                            <span class="ip-q__text">${t.question}</span>
                            ${t.category ? a`<span class="ip-q__meta">${t.category}</span>` : s}
                          </span>
                          <span class="ip-q__icon" aria-hidden="true">+</span>
                        </button>
                        ${this.openId === t.id ? a`<div class="ip-a">
                              <p>${t.answer}</p>
                            </div>` : s}
                      </article>
                    `
    )}
                </div>` : a`<div class="ip-empty" role="status">
                  ${d("لا توجد نتائج مطابقة", "No matching results")}
                </div>`}
          </div>
        </div>
      </section>
    ` : a`<div class="fs-empty" role="status">
        ${d("أضيفي أسئلة وأجوبة في الإعدادات", "Add questions and answers in settings")}
      </div>`;
  }
};
f.styles = [
  k,
  I,
  x`
      :host {
        direction: inherit;
      }
    `
];
let n = f;
g([
  $({ type: Object })
], n.prototype, "config");
g([
  h()
], n.prototype, "openId");
g([
  h()
], n.prototype, "query");
g([
  h()
], n.prototype, "category");
typeof n < "u" && n.registerSallaComponent("salla-inquiry-parlour");
export {
  n as default
};
