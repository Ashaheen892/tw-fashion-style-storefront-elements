import { css as m, LitElement as v, nothing as n, html as s } from "lit";
import { property as _, state as $ } from "lit/decorators.js";
import { classMap as f } from "lit/directives/class-map.js";
import { styleMap as x } from "lit/directives/style-map.js";
import { n as g, l as i, s as y, t as o, r as w, p as z, a as S } from "./sharedStyles-BGb_aVO_.js";
const k = m`
  .sfr-layout {
    display: grid;
    gap: 1.35rem;
  }

  .sfr-main {
    display: grid;
    gap: 1.35rem;
  }

  @media (min-width: 960px) {
    .sfr-layout--with-preview {
      grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
      align-items: start;
    }

    .sfr-panel--preview {
      position: sticky;
      top: 1rem;
    }
  }

  .sfr-panel {
    padding: 1.15rem;
    border-radius: var(--section-radius, 18px);
    border: 1px solid var(--border-color, #e8ddd6);
    background: var(--card-bg, #fff);
    box-shadow: 0 14px 34px rgba(43, 33, 28, 0.06);
  }

  .sfr-panel__title {
    margin: 0 0 0.85rem;
    font-size: 1.05rem;
    font-weight: 700;
  }

  .sfr-steps {
    display: grid;
    gap: 0.55rem;
  }

  .sfr-step-btn {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.7rem;
    align-items: center;
    min-height: 44px;
    padding: 0.75rem 0.85rem;
    border-radius: 10px;
    border: 1px solid var(--border-color, #e8ddd6);
    background: transparent;
    color: inherit;
    font: inherit;
    text-align: start;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
  }

  .sfr-step-btn:hover {
    border-color: color-mix(in srgb, var(--accent-color, #8b5e4b) 40%, var(--border-color, #e8ddd6));
  }

  .sfr-step-btn--active {
    border-color: var(--accent-color, #8b5e4b);
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 8%, var(--card-bg, #fff));
  }

  .sfr-step-btn__num {
    width: 2rem;
    height: 2rem;
    min-width: 2rem;
    min-height: 2rem;
    flex: 0 0 auto;
    display: inline-grid;
    place-items: center;
    box-sizing: border-box;
    border-radius: 8px;
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 14%, transparent);
    color: var(--accent-color, #8b5e4b);
    font-size: 0.8rem;
    font-weight: 700;
    line-height: 1;
    margin: 0;
    padding: 0;
  }

  .sfr-step-btn__copy {
    min-width: 0;
  }

  .sfr-step-btn__copy strong {
    display: block;
    font-size: 0.9rem;
  }

  .sfr-step-btn__copy span {
    display: block;
    margin-top: 0.15rem;
    font-size: 0.75rem;
    color: var(--muted-color, #7a6a62);
    line-height: 1.45;
  }

  .sfr-panel--preview {
    display: grid;
    gap: 0.85rem;
  }

  .sfr-detail__media {
    border-radius: 12px;
    overflow: hidden;
    aspect-ratio: 4 / 3;
    background:
      linear-gradient(145deg, color-mix(in srgb, var(--accent-color, #8b5e4b) 18%, #2b211c), #1c1613);
  }

  .sfr-detail__media--empty {
    min-height: 10rem;
  }

  .sfr-detail__media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .sfr-detail__title {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 700;
  }

  .sfr-detail__desc {
    margin: 0;
    color: var(--muted-color, #7a6a62);
    line-height: 1.7;
    font-size: 0.92rem;
  }

  .sfr-tip {
    margin: 0;
    padding: 0.75rem 0.9rem;
    border-radius: 10px;
    border-inline-start: 3px solid var(--accent-color, #8b5e4b);
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 7%, var(--card-bg, #fff));
    font-size: 0.85rem;
    line-height: 1.6;
    color: var(--text-color, #2b211c);
  }

  .sfr-table-wrap {
    overflow-x: auto;
  }

  .sfr-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    min-width: 28rem;
    font-size: 0.88rem;
  }

  .sfr-table th,
  .sfr-table td {
    padding: 0.7rem 0.75rem;
    text-align: start;
    border-bottom: 1px solid color-mix(in srgb, var(--border-color, #e8ddd6) 88%, transparent);
  }

  .sfr-table thead th {
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--muted-color, #7a6a62);
    background: color-mix(in srgb, var(--section-bg, #faf7f5) 70%, var(--card-bg, #fff));
  }

  .sfr-table tbody tr:hover td {
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 5%, transparent);
  }

  .sfr-table__size {
    font-weight: 700;
    color: var(--accent-color, #8b5e4b);
  }

  .sfr-table__note {
    font-size: 0.7rem;
    font-weight: 500;
    color: var(--muted-color, #7a6a62);
  }

  .sfr-note {
    margin: 0.85rem 0 0;
    font-size: 0.8rem;
    color: var(--muted-color, #7a6a62);
    line-height: 1.55;
  }

  @media (max-width: 959px) {
    .sfr-layout {
      gap: 1.1rem;
    }

    .sfr-panel {
      padding: 1rem 0.95rem;
    }

    .sfr-steps {
      gap: 0.45rem;
    }

    .sfr-step-btn {
      min-height: 44px;
    }
  }

  @media (max-width: 639px) {
    .sfr-panel {
      padding: 0.9rem 0.8rem;
    }

    .sfr-layout {
      gap: 0.95rem;
    }

    .sfr-main {
      gap: 0.95rem;
    }

    .sfr-table-wrap {
      margin-inline: -0.15rem;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }

    .sfr-table {
      min-width: 20rem;
      font-size: 0.78rem;
    }

    .sfr-table th,
    .sfr-table td {
      padding: 0.5rem 0.45rem;
      white-space: nowrap;
    }

    .sfr-detail__media {
      aspect-ratio: 1 / 1;
      max-height: 14.5rem;
    }

    .sfr-note {
      font-size: 0.76rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .sfr-step-btn {
      transition: none;
    }
  }
`;
function C(l) {
  return g(l).map((e, r) => ({
    id: i(e.id) || `step-${r + 1}`,
    title: i(e.title),
    desc: i(e.desc),
    image: String(e.image || "").trim(),
    tip: i(e.tip)
  })).filter((e) => e.title || e.desc || e.image);
}
function I(l) {
  return g(l).map((e, r) => ({
    id: i(e.id) || `size-${r + 1}`,
    size_label: i(e.size_label),
    bust: i(e.bust),
    waist: i(e.waist),
    hips: i(e.hips),
    length: i(e.length),
    note: i(e.note)
  })).filter((e) => e.size_label);
}
var L = Object.defineProperty, b = (l, e, r, a) => {
  for (var t = void 0, d = l.length - 1, c; d >= 0; d--)
    (c = l[d]) && (t = c(e, r, t) || t);
  return t && L(e, r, t), t;
};
const h = class h extends v {
  constructor() {
    super(...arguments), this.config = {}, this.activeStepId = "", this.boundLang = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLang), this.ensureStep();
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLang), super.disconnectedCallback();
  }
  updated(e) {
    e.has("config") && this.ensureStep();
  }
  get steps() {
    var e;
    return C((e = this.config) == null ? void 0 : e.sfr_steps);
  }
  get sizes() {
    var e;
    return I((e = this.config) == null ? void 0 : e.sfr_sizes);
  }
  get activeStep() {
    return this.steps.find((e) => e.id === this.activeStepId) || this.steps[0] || null;
  }
  ensureStep() {
    const e = this.steps;
    if (!e.length) {
      this.activeStepId = "";
      return;
    }
    e.some((r) => r.id === this.activeStepId) || (this.activeStepId = e[0].id);
  }
  renderPreview() {
    const e = this.activeStep;
    return e ? s`
      <div class="sfr-panel sfr-panel--preview" aria-live="polite">
        ${e.image ? s`<div class="sfr-detail__media">
              <img
                src=${e.image}
                alt=${e.title}
                loading="lazy"
                decoding="async"
              />
            </div>` : s`<div class="sfr-detail__media sfr-detail__media--empty" aria-hidden="true"></div>`}
        <h4 class="sfr-detail__title">${e.title}</h4>
        ${e.desc ? s`<p class="sfr-detail__desc">${e.desc}</p>` : n}
        ${e.tip ? s`<p class="sfr-tip">
              <strong>${o("نصيحة", "Tip")}:</strong> ${e.tip}
            </p>` : n}
      </div>
    ` : n;
  }
  renderChart() {
    const e = this.config || {}, r = this.sizes, a = i(e.sfr_chart_note);
    return r.length ? s`
      <div class="sfr-panel">
        <h3 class="sfr-panel__title">
          ${i(e.sfr_chart_title) || o("دليل المقاسات", "Size chart")}
        </h3>
        <div class="sfr-table-wrap">
          <table class="sfr-table">
            <thead>
              <tr>
                <th>${o("المقاس", "Size")}</th>
                <th>${o("الصدر", "Bust")}</th>
                <th>${o("الخصر", "Waist")}</th>
                <th>${o("الورك", "Hips")}</th>
                <th>${o("الطول", "Length")}</th>
              </tr>
            </thead>
            <tbody>
              ${r.map(
      (t) => s`
                  <tr>
                    <td class="sfr-table__size">
                      ${t.size_label}
                      ${t.note ? s`<div class="sfr-table__note">${t.note}</div>` : n}
                    </td>
                    <td>${t.bust || "—"}</td>
                    <td>${t.waist || "—"}</td>
                    <td>${t.hips || "—"}</td>
                    <td>${t.length || "—"}</td>
                  </tr>
                `
    )}
            </tbody>
          </table>
        </div>
        ${a ? s`<p class="sfr-note">${a}</p>` : n}
      </div>
    ` : n;
  }
  renderSteps() {
    const e = this.config || {}, r = this.steps;
    return r.length ? s`
      <div class="sfr-panel">
        <h3 class="sfr-panel__title">
          ${i(e.sfr_steps_title) || o("كيف تأخذين مقاساتك", "How to take your measurements")}
        </h3>
        <div class="sfr-steps" role="tablist">
          ${r.map(
      (a, t) => s`
              <button
                type="button"
                class=${f({
        "sfr-step-btn": !0,
        "sfr-step-btn--active": a.id === this.activeStepId
      })}
                role="tab"
                aria-selected=${a.id === this.activeStepId ? "true" : "false"}
                @click=${() => {
        this.activeStepId = a.id;
      }}
              >
                <span class="sfr-step-btn__num">${t + 1}</span>
                <span class="sfr-step-btn__copy">
                  <strong>${a.title}</strong>
                  ${a.desc ? s`<span>${a.desc}</span>` : n}
                </span>
              </button>
            `
    )}
        </div>
      </div>
    ` : n;
  }
  render() {
    const e = this.config || {}, r = w(e, "sfr_"), a = r.animate && !z(), t = i(e.sfr_title), d = i(e.sfr_desc), c = this.steps, u = this.sizes;
    return !c.length && !u.length ? s`<div class="fs-empty" role="status">
        ${o("أضيفي خطوات القياس أو جدول المقاسات", "Add measure steps or a size chart")}
      </div>` : s`
      <section
        class=${f({
      "fs-section": !0,
      "fs-animate": a
    })}
        style=${x(S(r))}
        aria-label=${t || o("طقوس القياس", "Silhouette Fit Ritual")}
      >
        <div class="fs-container">
          ${t || d ? s`<header class="fs-header">
                ${t ? s`<h2 class="fs-title">${t}</h2>` : n}
                ${d ? s`<p class="fs-desc">${d}</p>` : n}
              </header>` : n}

          <div
            class=${f({
      "sfr-layout": !0,
      "sfr-layout--with-preview": c.length > 0
    })}
          >
            <div class="sfr-main">
              ${this.renderChart()}
              ${this.renderSteps()}
            </div>
            ${c.length ? this.renderPreview() : n}
          </div>
        </div>
      </section>
    `;
  }
};
h.styles = [
  y,
  k,
  m`
      :host {
        direction: inherit;
      }
    `
];
let p = h;
b([
  _({ type: Object })
], p.prototype, "config");
b([
  $()
], p.prototype, "activeStepId");
typeof p < "u" && p.registerSallaComponent("salla-silhouette-fit-ritual");
export {
  p as default
};
