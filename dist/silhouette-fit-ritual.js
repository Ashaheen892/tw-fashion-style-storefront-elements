var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, nothing, html } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { n as normalizeCollection, l as localizedString, s as sharedSectionCss, t, r as readSectionTheme, p as prefersReducedMotion, a as themeStyleMap, b as renderCommerceOutcome } from "./sharedStyles-Cmm0noVj.js";
const componentStyles = css`
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
    border: 1px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #ffffff);
    box-shadow: 0 14px 34px color-mix(in srgb, var(--text-color, #000) 8%, transparent);
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
    border: 1px solid var(--border-color, #e5e7eb);
    background: transparent;
    color: inherit;
    font: inherit;
    text-align: start;
    cursor: pointer;
    transition: border-color 0.22s ease, background 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease;
  }

  .sfr-step-btn:hover {
    transform: translateY(-1px);
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 40%, var(--border-color, #e5e7eb));
  }

  .sfr-step-btn--active {
    border-color: var(--accent-color, var(--fs-store-primary));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 9%, var(--card-bg, #ffffff));
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
    color: var(--muted-color, #666666);
    line-height: 1.45;
  }

  .sfr-panel--preview {
    display: grid;
    gap: 0.9rem;
    background:
      radial-gradient(circle at 90% 0%, color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, transparent), transparent 40%),
      var(--card-bg, #ffffff);
  }

  .sfr-detail__media {
    position: relative;
    border-radius: calc(var(--section-radius, 16px) * 0.75);
    overflow: hidden;
    aspect-ratio: 4 / 3;
    background:
      linear-gradient(145deg, color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 22%, #000000), #1c1613);
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
    color: var(--muted-color, #666666);
    line-height: 1.7;
    font-size: 0.92rem;
  }

  .sfr-tip {
    margin: 0;
    padding: 0.8rem 0.95rem;
    border-radius: calc(var(--section-radius, 16px) * 0.55);
    border-inline-start: 3px solid var(--accent-color, var(--fs-store-primary));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 7%, var(--card-bg, #ffffff));
    font-size: 0.85rem;
    line-height: 1.6;
    color: var(--text-color, #000000);
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
    border-bottom: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 88%, transparent);
  }

  .sfr-table thead th {
    font-size: 0.74rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--muted-color, #666666);
    background: color-mix(in srgb, var(--section-bg, var(--fs-surface, #f3f4f6)) 70%, var(--card-bg, #ffffff));
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
    color: var(--muted-color, #666666);
  }

  .sfr-note {
    margin: 0.85rem 0 0;
    font-size: 0.8rem;
    color: var(--muted-color, #666666);
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
function parseSteps(raw) {
  return normalizeCollection(raw).map((item, index) => ({
    id: localizedString(item.id) || `step-${index + 1}`,
    title: localizedString(item.title),
    desc: localizedString(item.desc),
    image: String(item.image || "").trim(),
    tip: localizedString(item.tip)
  })).filter((s) => s.title || s.desc || s.image);
}
__name(parseSteps, "parseSteps");
function parseSizeRows(raw) {
  return normalizeCollection(raw).map((item, index) => ({
    id: localizedString(item.id) || `size-${index + 1}`,
    size_label: localizedString(item.size_label),
    bust: localizedString(item.bust),
    waist: localizedString(item.waist),
    hips: localizedString(item.hips),
    length: localizedString(item.length),
    note: localizedString(item.note)
  })).filter((r) => r.size_label);
}
__name(parseSizeRows, "parseSizeRows");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const _SilhouetteFitRitual = class _SilhouetteFitRitual extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.activeStepId = "", this.boundLang = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLang), this.ensureStep();
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLang), super.disconnectedCallback();
  }
  updated(changed) {
    changed.has("config") && this.ensureStep();
  }
  get steps() {
    var _a;
    return parseSteps((_a = this.config) == null ? void 0 : _a.sfr_steps);
  }
  get sizes() {
    var _a;
    return parseSizeRows((_a = this.config) == null ? void 0 : _a.sfr_sizes);
  }
  get activeStep() {
    return this.steps.find((s) => s.id === this.activeStepId) || this.steps[0] || null;
  }
  ensureStep() {
    const list = this.steps;
    if (!list.length) {
      this.activeStepId = "";
      return;
    }
    list.some((s) => s.id === this.activeStepId) || (this.activeStepId = list[0].id);
  }
  renderPreview() {
    const active = this.activeStep;
    return active ? html`
      <div class="sfr-panel sfr-panel--preview" aria-live="polite">
        ${active.image ? html`<div class="sfr-detail__media">
              <img
                src=${active.image}
                alt=${active.title}
                loading="lazy"
                decoding="async"
              />
            </div>` : html`<div
              class="sfr-detail__media sfr-detail__media--empty"
              data-label=${t("معاينة الخطوة", "Step preview")}
              aria-hidden="true"
            ></div>`}
        <h4 class="sfr-detail__title">${active.title}</h4>
        ${active.desc ? html`<p class="sfr-detail__desc">${active.desc}</p>` : nothing}
        ${active.tip ? html`<p class="sfr-tip">
              <strong>${t("نصيحة", "Tip")}:</strong> ${active.tip}
            </p>` : nothing}
      </div>
    ` : nothing;
  }
  renderChart() {
    const c = this.config || {}, sizes = this.sizes, chartNote = localizedString(c.sfr_chart_note);
    return sizes.length ? html`
      <div class="sfr-panel">
        <h3 class="sfr-panel__title">
          ${localizedString(c.sfr_chart_title) || t("دليل المقاسات", "Size chart")}
        </h3>
        <div class="sfr-table-wrap">
          <table class="sfr-table">
            <thead>
              <tr>
                <th>${t("المقاس", "Size")}</th>
                <th>${t("الصدر", "Bust")}</th>
                <th>${t("الخصر", "Waist")}</th>
                <th>${t("الورك", "Hips")}</th>
                <th>${t("الطول", "Length")}</th>
              </tr>
            </thead>
            <tbody>
              ${sizes.map(
      (row) => html`
                  <tr>
                    <td class="sfr-table__size">
                      ${row.size_label}
                      ${row.note ? html`<div class="sfr-table__note">${row.note}</div>` : nothing}
                    </td>
                    <td>${row.bust || "—"}</td>
                    <td>${row.waist || "—"}</td>
                    <td>${row.hips || "—"}</td>
                    <td>${row.length || "—"}</td>
                  </tr>
                `
    )}
            </tbody>
          </table>
        </div>
        ${chartNote ? html`<p class="sfr-note">${chartNote}</p>` : nothing}
      </div>
    ` : nothing;
  }
  renderSteps() {
    const c = this.config || {}, steps = this.steps;
    return steps.length ? html`
      <div class="sfr-panel">
        <h3 class="sfr-panel__title">
          ${localizedString(c.sfr_steps_title) || t("كيف تأخذ مقاساتك", "How to take your measurements")}
        </h3>
        <div class="sfr-steps" role="tablist">
          ${steps.map(
      (step, index) => html`
              <button
                type="button"
                class=${classMap({
        "sfr-step-btn": !0,
        "sfr-step-btn--active": step.id === this.activeStepId
      })}
                role="tab"
                aria-selected=${step.id === this.activeStepId ? "true" : "false"}
                @click=${() => {
        this.activeStepId = step.id;
      }}
              >
                <span class="sfr-step-btn__num">${index + 1}</span>
                <span class="sfr-step-btn__copy">
                  <strong>${step.title}</strong>
                  ${step.desc ? html`<span>${step.desc}</span>` : nothing}
                </span>
              </button>
            `
    )}
        </div>
      </div>
    ` : nothing;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "sfr_"), animate = theme.animate && !prefersReducedMotion(), title = localizedString(c.sfr_title), desc = localizedString(c.sfr_desc), steps = this.steps, sizes = this.sizes;
    if (!steps.length && !sizes.length)
      return html`<div class="fs-empty" role="status">
        ${t("أضف خطوات القياس أو جدول المقاسات", "Add measure steps or a size chart")}
      </div>`;
    const stepIndex = Math.max(0, steps.findIndex((s) => s.id === this.activeStepId)), stepPct = steps.length ? Math.round((stepIndex + 1) / steps.length * 100) : 0;
    return html`
      <section
        class=${classMap({
      "fs-section": !0,
      "fs-animate": animate
    })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("طقوس القياس", "Silhouette Fit Ritual")}
      >
        <div class="fs-container">
          ${title || desc ? html`<header class="fs-header fs-header--editorial">
                <p class="fs-eyebrow">${t("دليل المقاس", "Fit guide")}</p>
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                <span class="fs-title-line" aria-hidden="true"></span>
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </header>` : nothing}

          ${steps.length ? html`<div class="fs-progress" aria-hidden="true">
                <span class="fs-progress__label">${t("الخطوة", "Step")} ${stepIndex + 1} / ${steps.length}</span>
                <div class="fs-progress__track">
                  <div class="fs-progress__bar" style=${styleMap({ width: `${stepPct}%` })}></div>
                </div>
              </div>` : nothing}

          <div
            class=${classMap({
      "sfr-layout": !0,
      "sfr-layout--with-preview": steps.length > 0
    })}
          >
            <div class="sfr-main">
              ${this.renderChart()}
              ${this.renderSteps()}
            </div>
            ${steps.length ? this.renderPreview() : nothing}
          </div>
        </div>
        ${renderCommerceOutcome(this.config || {}, "sfr_")}
      </section>
    `;
  }
};
__name(_SilhouetteFitRitual, "SilhouetteFitRitual"), _SilhouetteFitRitual.styles = [
  sharedSectionCss,
  componentStyles,
  css`
      :host {
        direction: inherit;
      }
    `
];
let SilhouetteFitRitual = _SilhouetteFitRitual;
__decorateClass([
  property({ type: Object })
], SilhouetteFitRitual.prototype, "config");
__decorateClass([
  state()
], SilhouetteFitRitual.prototype, "activeStepId");
typeof SilhouetteFitRitual < "u" && SilhouetteFitRitual.registerSallaComponent("salla-silhouette-fit-ritual");
export {
  SilhouetteFitRitual as default
};
