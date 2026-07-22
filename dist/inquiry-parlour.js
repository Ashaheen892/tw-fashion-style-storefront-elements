var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { n as normalizeCollection, l as localizedString, s as sharedSectionCss, r as readSectionTheme, p as prefersReducedMotion, i as isTruthy, t, a as themeStyleMap, b as renderCommerceOutcome } from "./sharedStyles-Cmm0noVj.js";
const componentStyles = css`
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
    border: 1px solid var(--border-color, #e5e7eb);
    background:
      linear-gradient(
        135deg,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 7%, var(--card-bg, #ffffff)),
        var(--card-bg, #ffffff) 55%
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
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: 999px;
    background: var(--card-bg, #ffffff);
    color: var(--text-color, #000000);
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
    border: 1px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #ffffff);
    color: var(--muted-color, #666666);
    font: inherit;
    font-size: 0.8rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
  }

  .ip-cat:hover {
    transform: translateY(-1px);
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 40%, var(--border-color, #e5e7eb));
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
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: calc(var(--section-radius, 16px) * 0.75);
    background: var(--card-bg, #ffffff);
    overflow: hidden;
    box-shadow: 0 8px 22px rgba(43, 33, 28, 0.04);
    transition: border-color 0.25s ease, box-shadow 0.25s ease;
  }

  .ip-item--open {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 42%, var(--border-color, #e5e7eb));
    box-shadow: 0 14px 32px color-mix(in srgb, var(--text-color, #000) 11%, transparent);
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
    color: var(--muted-color, #666666);
    font-size: 0.92rem;
    line-height: 1.8;
    animation: ip-reveal 0.3s ease;
  }

  .ip-a p {
    margin: 0;
    padding-top: 0.15rem;
    border-top: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 80%, transparent);
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
function parseInquiries(raw) {
  return normalizeCollection(raw).map((item, index) => ({
    id: localizedString(item.id) || `ask-${index + 1}`,
    question: localizedString(item.question),
    answer: localizedString(item.answer),
    category: localizedString(item.category) || ""
  })).filter((i) => i.question && i.answer);
}
__name(parseInquiries, "parseInquiries");
function uniqueCategories(items) {
  const set = /* @__PURE__ */ new Set();
  return items.forEach((i) => {
    i.category.trim() && set.add(i.category.trim());
  }), [...set];
}
__name(uniqueCategories, "uniqueCategories");
function filterInquiries(items, query, category) {
  const q = query.trim().toLowerCase();
  return items.filter((item) => category && item.category !== category ? !1 : q ? item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q) || item.category.toLowerCase().includes(q) : !0);
}
__name(filterInquiries, "filterInquiries");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const _InquiryParlour = class _InquiryParlour extends LitElement {
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
    var _a;
    return parseInquiries((_a = this.config) == null ? void 0 : _a.ip_items);
  }
  get filtered() {
    return filterInquiries(this.items, this.query, this.category);
  }
  toggle(id) {
    this.openId = this.openId === id ? "" : id;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "ip_"), animate = theme.animate && !prefersReducedMotion(), title = localizedString(c.ip_title), desc = localizedString(c.ip_desc), showSearch = isTruthy(c.ip_show_search, !0), items = this.items, filtered = this.filtered, cats = uniqueCategories(items);
    return items.length ? html`
      <section
        class=${classMap({
      "fs-section": !0,
      "fs-animate": animate
    })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("ديوان الأسئلة", "Questions Diwan")}
      >
        <div class="fs-container">
          ${title || desc ? html`<header class="fs-header fs-header--editorial">
                <p class="fs-eyebrow">${t("أسئلة شائعة", "FAQ")}</p>
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                <span class="fs-title-line" aria-hidden="true"></span>
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </header>` : nothing}

          <div class="ip-shell">
            ${showSearch || cats.length ? html`<div class="ip-toolbar">
                  ${showSearch ? html`<input
                        class="ip-search"
                        type="search"
                        .value=${this.query}
                        placeholder=${t("ابحث في الأسئلة…", "Search questions…")}
                        aria-label=${t("بحث", "Search")}
                        @input=${(e) => {
      this.query = e.target.value;
    }}
                      />` : nothing}
                  ${cats.length ? html`<div class="ip-cats" role="group" aria-label=${t("التصنيفات", "Categories")}>
                        <button
                          type="button"
                          class="ip-cat"
                          aria-pressed=${this.category === "" ? "true" : "false"}
                          @click=${() => {
      this.category = "";
    }}
                        >
                          ${t("الكل", "All")}
                        </button>
                        ${cats.map(
      (cat) => html`
                            <button
                              type="button"
                              class="ip-cat"
                              aria-pressed=${this.category === cat ? "true" : "false"}
                              @click=${() => {
        this.category = cat;
      }}
                            >
                              ${cat}
                            </button>
                          `
    )}
                      </div>` : nothing}
                </div>` : nothing}

            ${filtered.length ? html`<div class="ip-list">
                  ${filtered.map(
      (item) => html`
                      <article
                        class=${classMap({
        "ip-item": !0,
        "ip-item--open": this.openId === item.id
      })}
                      >
                        <button
                          type="button"
                          class="ip-q"
                          aria-expanded=${this.openId === item.id ? "true" : "false"}
                          @click=${() => this.toggle(item.id)}
                        >
                          <span>
                            <span class="ip-q__text">${item.question}</span>
                            ${item.category ? html`<span class="ip-q__meta">${item.category}</span>` : nothing}
                          </span>
                          <span class="ip-q__icon" aria-hidden="true">+</span>
                        </button>
                        ${this.openId === item.id ? html`<div class="ip-a">
                              <p>${item.answer}</p>
                            </div>` : nothing}
                      </article>
                    `
    )}
                </div>` : html`<div class="fs-empty" role="status">
                  ${t("لا توجد نتائج مطابقة", "No matching results")}
                </div>`}
          </div>
        </div>
        ${renderCommerceOutcome(this.config || {}, "ip_")}
      </section>
    ` : html`<div class="fs-empty" role="status">
        ${t("أضف أسئلة وأجوبة في الإعدادات", "Add questions and answers in settings")}
      </div>`;
  }
};
__name(_InquiryParlour, "InquiryParlour"), _InquiryParlour.styles = [
  sharedSectionCss,
  componentStyles,
  css`
      :host {
        direction: inherit;
      }
    `
];
let InquiryParlour = _InquiryParlour;
__decorateClass([
  property({ type: Object })
], InquiryParlour.prototype, "config");
__decorateClass([
  state()
], InquiryParlour.prototype, "openId");
__decorateClass([
  state()
], InquiryParlour.prototype, "query");
__decorateClass([
  state()
], InquiryParlour.prototype, "category");
typeof InquiryParlour < "u" && InquiryParlour.registerSallaComponent("salla-inquiry-parlour");
export {
  InquiryParlour as default
};
