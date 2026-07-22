import { css as b, LitElement as x, nothing as i, html as r } from "lit";
import { property as w, state as z } from "lit/decorators.js";
import { classMap as f } from "lit/directives/class-map.js";
import { styleMap as g } from "lit/directives/style-map.js";
import { n as v, l as a, s as S, t as n, r as k, p as I, a as C, b as L } from "./sharedStyles-Cd7RKVf-.js";
const M = b`
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
    padding: 1.2rem;
    border-radius: var(--section-radius, 18px);
    border: 1px solid var(--border-color, #e8ddd6);
    background: var(--card-bg, #fff);
    box-shadow: 0 14px 34px rgba(43, 33, 28, 0.06);
  }

  .fs-animate .sfr-panel {
    animation: sfr-rise 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .fs-animate .sfr-panel:nth-child(2) { animation-delay: 0.08s; }
  .fs-animate .sfr-panel--preview { animation-delay: 0.14s; }

  @keyframes sfr-rise {
    from {
      opacity: 0;
      transform: translateY(14px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  .sfr-panel__title {
    margin: 0 0 0.95rem;
    font-size: 1.05rem;
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  .sfr-steps {
    display: grid;
    gap: 0.55rem;
  }

  .sfr-step-btn {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.75rem;
    align-items: center;
    min-height: 52px;
    padding: 0.8rem 0.9rem;
    border-radius: calc(var(--section-radius, 16px) * 0.65);
    border: 1px solid var(--border-color, #e8ddd6);
    background: transparent;
    color: inherit;
    font: inherit;
    text-align: start;
    cursor: pointer;
    transition: border-color 0.22s ease, background 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease;
  }

  .sfr-step-btn:hover {
    transform: translateY(-1px);
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 40%, var(--border-color, #e8ddd6));
  }

  .sfr-step-btn--active {
    border-color: var(--accent-color, var(--fs-store-primary));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 9%, var(--card-bg, #fff));
    box-shadow: 0 10px 22px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, transparent);
  }

  .sfr-step-btn__num {
    width: 2.15rem;
    height: 2.15rem;
    min-width: 2.15rem;
    display: inline-grid;
    place-items: center;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 14%, transparent);
    color: var(--accent-color, var(--fs-store-primary));
    font-size: 0.82rem;
    font-weight: 800;
    line-height: 1;
    transition: background 0.2s ease, color 0.2s ease;
  }

  .sfr-step-btn--active .sfr-step-btn__num {
    background: var(--accent-color, var(--fs-store-primary));
    color: #fff;
  }

  .sfr-step-btn__copy {
    min-width: 0;
  }

  .sfr-step-btn__copy strong {
    display: block;
    font-size: 0.92rem;
  }

  .sfr-step-btn__copy span {
    display: block;
    margin-top: 0.18rem;
    font-size: 0.76rem;
    color: var(--muted-color, #7a6a62);
    line-height: 1.45;
  }

  .sfr-panel--preview {
    display: grid;
    gap: 0.9rem;
    background:
      radial-gradient(circle at 90% 0%, color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, transparent), transparent 40%),
      var(--card-bg, #fff);
  }

  .sfr-detail__media {
    position: relative;
    border-radius: calc(var(--section-radius, 16px) * 0.75);
    overflow: hidden;
    aspect-ratio: 4 / 3;
    background:
      linear-gradient(145deg, color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 22%, #2b211c), #1c1613);
  }

  .sfr-detail__media--empty {
    min-height: 11rem;
    display: grid;
    place-items: center;
  }

  .sfr-detail__media--empty::after {
    content: attr(data-label);
    color: rgba(255, 255, 255, 0.72);
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.06em;
  }

  .sfr-detail__media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    animation: sfr-fade 0.35s ease;
  }

  @keyframes sfr-fade {
    from { opacity: 0.4; transform: scale(1.02); }
    to { opacity: 1; transform: none; }
  }

  .sfr-detail__title {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  .sfr-detail__desc {
    margin: 0;
    color: var(--muted-color, #7a6a62);
    line-height: 1.7;
    font-size: 0.92rem;
  }

  .sfr-tip {
    margin: 0;
    padding: 0.8rem 0.95rem;
    border-radius: calc(var(--section-radius, 16px) * 0.55);
    border-inline-start: 3px solid var(--accent-color, var(--fs-store-primary));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 7%, var(--card-bg, #fff));
    font-size: 0.85rem;
    line-height: 1.6;
    color: var(--text-color, #2b211c);
  }

  .sfr-table-wrap {
    overflow-x: auto;
    border-radius: calc(var(--section-radius, 16px) * 0.55);
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
    padding: 0.75rem 0.8rem;
    text-align: start;
    border-bottom: 1px solid color-mix(in srgb, var(--border-color, #e8ddd6) 88%, transparent);
  }

  .sfr-table thead th {
    font-size: 0.74rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--muted-color, #7a6a62);
    background: color-mix(in srgb, var(--section-bg, #faf7f5) 70%, var(--card-bg, #fff));
  }

  .sfr-table tbody tr {
    transition: background 0.2s ease;
  }

  .sfr-table tbody tr:hover td {
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 6%, transparent);
  }

  .sfr-table__size {
    font-weight: 800;
    color: var(--accent-color, var(--fs-store-primary));
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

  @media (max-width: 639px) {
    .sfr-panel {
      padding: 0.95rem 0.85rem;
    }

    .sfr-table {
      min-width: 20rem;
      font-size: 0.78rem;
    }

    .sfr-detail__media {
      aspect-ratio: 1 / 1;
      max-height: 14.5rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .sfr-panel,
    .sfr-step-btn,
    .sfr-detail__media img {
      animation: none !important;
      transition: none !important;
      transform: none !important;
    }
  }
`;
function P(l) {
  return v(l).map((e, s) => ({
    id: a(e.id) || `step-${s + 1}`,
    title: a(e.title),
    desc: a(e.desc),
    image: String(e.image || "").trim(),
    tip: a(e.tip)
  })).filter((e) => e.title || e.desc || e.image);
}
function j(l) {
  return v(l).map((e, s) => ({
    id: a(e.id) || `size-${s + 1}`,
    size_label: a(e.size_label),
    bust: a(e.bust),
    waist: a(e.waist),
    hips: a(e.hips),
    length: a(e.length),
    note: a(e.note)
  })).filter((e) => e.size_label);
}
var E = Object.defineProperty, u = (l, e, s, o) => {
  for (var t = void 0, c = l.length - 1, d; c >= 0; c--)
    (d = l[c]) && (t = d(e, s, t) || t);
  return t && E(e, s, t), t;
};
const m = class m extends x {
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
    return P((e = this.config) == null ? void 0 : e.sfr_steps);
  }
  get sizes() {
    var e;
    return j((e = this.config) == null ? void 0 : e.sfr_sizes);
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
    e.some((s) => s.id === this.activeStepId) || (this.activeStepId = e[0].id);
  }
  renderPreview() {
    const e = this.activeStep;
    return e ? r`
      <div class="sfr-panel sfr-panel--preview" aria-live="polite">
        ${e.image ? r`<div class="sfr-detail__media">
              <img
                src=${e.image}
                alt=${e.title}
                loading="lazy"
                decoding="async"
              />
            </div>` : r`<div
              class="sfr-detail__media sfr-detail__media--empty"
              data-label=${n("معاينة الخطوة", "Step preview")}
              aria-hidden="true"
            ></div>`}
        <h4 class="sfr-detail__title">${e.title}</h4>
        ${e.desc ? r`<p class="sfr-detail__desc">${e.desc}</p>` : i}
        ${e.tip ? r`<p class="sfr-tip">
              <strong>${n("نصيحة", "Tip")}:</strong> ${e.tip}
            </p>` : i}
      </div>
    ` : i;
  }
  renderChart() {
    const e = this.config || {}, s = this.sizes, o = a(e.sfr_chart_note);
    return s.length ? r`
      <div class="sfr-panel">
        <h3 class="sfr-panel__title">
          ${a(e.sfr_chart_title) || n("دليل المقاسات", "Size chart")}
        </h3>
        <div class="sfr-table-wrap">
          <table class="sfr-table">
            <thead>
              <tr>
                <th>${n("المقاس", "Size")}</th>
                <th>${n("الصدر", "Bust")}</th>
                <th>${n("الخصر", "Waist")}</th>
                <th>${n("الورك", "Hips")}</th>
                <th>${n("الطول", "Length")}</th>
              </tr>
            </thead>
            <tbody>
              ${s.map(
      (t) => r`
                  <tr>
                    <td class="sfr-table__size">
                      ${t.size_label}
                      ${t.note ? r`<div class="sfr-table__note">${t.note}</div>` : i}
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
        ${o ? r`<p class="sfr-note">${o}</p>` : i}
      </div>
    ` : i;
  }
  renderSteps() {
    const e = this.config || {}, s = this.steps;
    return s.length ? r`
      <div class="sfr-panel">
        <h3 class="sfr-panel__title">
          ${a(e.sfr_steps_title) || n("كيف تأخذ مقاساتك", "How to take your measurements")}
        </h3>
        <div class="sfr-steps" role="tablist">
          ${s.map(
      (o, t) => r`
              <button
                type="button"
                class=${f({
        "sfr-step-btn": !0,
        "sfr-step-btn--active": o.id === this.activeStepId
      })}
                role="tab"
                aria-selected=${o.id === this.activeStepId ? "true" : "false"}
                @click=${() => {
        this.activeStepId = o.id;
      }}
              >
                <span class="sfr-step-btn__num">${t + 1}</span>
                <span class="sfr-step-btn__copy">
                  <strong>${o.title}</strong>
                  ${o.desc ? r`<span>${o.desc}</span>` : i}
                </span>
              </button>
            `
    )}
        </div>
      </div>
    ` : i;
  }
  render() {
    const e = this.config || {}, s = k(e, "sfr_"), o = s.animate && !I(), t = a(e.sfr_title), c = a(e.sfr_desc), d = this.steps, _ = this.sizes;
    if (!d.length && !_.length)
      return r`<div class="fs-empty" role="status">
        ${n("أضف خطوات القياس أو جدول المقاسات", "Add measure steps or a size chart")}
      </div>`;
    const h = Math.max(0, d.findIndex(($) => $.id === this.activeStepId)), y = d.length ? Math.round((h + 1) / d.length * 100) : 0;
    return r`
      <section
        class=${f({
      "fs-section": !0,
      "fs-animate": o
    })}
        style=${g(C(s))}
        aria-label=${t || n("طقوس القياس", "Silhouette Fit Ritual")}
      >
        <div class="fs-container">
          ${t || c ? r`<header class="fs-header fs-header--editorial">
                <p class="fs-eyebrow">${n("دليل المقاس", "Fit guide")}</p>
                ${t ? r`<h2 class="fs-title">${t}</h2>` : i}
                <span class="fs-title-line" aria-hidden="true"></span>
                ${c ? r`<p class="fs-desc">${c}</p>` : i}
              </header>` : i}

          ${d.length ? r`<div class="fs-progress" aria-hidden="true">
                <span class="fs-progress__label">${n("الخطوة", "Step")} ${h + 1} / ${d.length}</span>
                <div class="fs-progress__track">
                  <div class="fs-progress__bar" style=${g({ width: `${y}%` })}></div>
                </div>
              </div>` : i}

          <div
            class=${f({
      "sfr-layout": !0,
      "sfr-layout--with-preview": d.length > 0
    })}
          >
            <div class="sfr-main">
              ${this.renderChart()}
              ${this.renderSteps()}
            </div>
            ${d.length ? this.renderPreview() : i}
          </div>
        </div>
        ${L(this.config || {}, "sfr_")}
      </section>
    `;
  }
};
m.styles = [
  S,
  M,
  b`
      :host {
        direction: inherit;
      }
    `
];
let p = m;
u([
  w({ type: Object })
], p.prototype, "config");
u([
  z()
], p.prototype, "activeStepId");
typeof p < "u" && p.registerSallaComponent("salla-silhouette-fit-ritual");
export {
  p as default
};
