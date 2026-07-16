import { css, html, LitElement, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import {
  prefersReducedMotion,
  readSectionTheme,
  t,
  themeStyleMap,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { componentStyles } from './styles.js';
import { parseSizeRows, parseSteps } from './utils.js';

export default class SilhouetteFitRitual extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private activeStepId = '';

  private boundLang = () => this.requestUpdate();

  static styles = [
    sharedSectionCss,
    componentStyles,
    css`
      :host {
        direction: inherit;
      }
    `,
  ];

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('language-changed', this.boundLang);
    this.ensureStep();
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLang);
    super.disconnectedCallback();
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config')) this.ensureStep();
  }

  private get steps() {
    return parseSteps(this.config?.sfr_steps);
  }

  private get sizes() {
    return parseSizeRows(this.config?.sfr_sizes);
  }

  private get activeStep() {
    return this.steps.find((s) => s.id === this.activeStepId) || this.steps[0] || null;
  }

  private ensureStep(): void {
    const list = this.steps;
    if (!list.length) {
      this.activeStepId = '';
      return;
    }
    if (!list.some((s) => s.id === this.activeStepId)) {
      this.activeStepId = list[0].id;
    }
  }

  private renderPreview() {
    const active = this.activeStep;
    if (!active) return nothing;

    return html`
      <div class="sfr-panel sfr-panel--preview" aria-live="polite">
        ${active.image
          ? html`<div class="sfr-detail__media">
              <img
                src=${active.image}
                alt=${active.title}
                loading="lazy"
                decoding="async"
              />
            </div>`
          : html`<div class="sfr-detail__media sfr-detail__media--empty" aria-hidden="true"></div>`}
        <h4 class="sfr-detail__title">${active.title}</h4>
        ${active.desc
          ? html`<p class="sfr-detail__desc">${active.desc}</p>`
          : nothing}
        ${active.tip
          ? html`<p class="sfr-tip">
              <strong>${t('نصيحة', 'Tip')}:</strong> ${active.tip}
            </p>`
          : nothing}
      </div>
    `;
  }

  private renderChart() {
    const c = this.config || {};
    const sizes = this.sizes;
    const chartNote = localizedString(c.sfr_chart_note as string);
    if (!sizes.length) return nothing;

    return html`
      <div class="sfr-panel">
        <h3 class="sfr-panel__title">
          ${localizedString(c.sfr_chart_title as string) ||
          t('دليل المقاسات', 'Size chart')}
        </h3>
        <div class="sfr-table-wrap">
          <table class="sfr-table">
            <thead>
              <tr>
                <th>${t('المقاس', 'Size')}</th>
                <th>${t('الصدر', 'Bust')}</th>
                <th>${t('الخصر', 'Waist')}</th>
                <th>${t('الورك', 'Hips')}</th>
                <th>${t('الطول', 'Length')}</th>
              </tr>
            </thead>
            <tbody>
              ${sizes.map(
                (row) => html`
                  <tr>
                    <td class="sfr-table__size">
                      ${row.size_label}
                      ${row.note
                        ? html`<div class="sfr-table__note">${row.note}</div>`
                        : nothing}
                    </td>
                    <td>${row.bust || '—'}</td>
                    <td>${row.waist || '—'}</td>
                    <td>${row.hips || '—'}</td>
                    <td>${row.length || '—'}</td>
                  </tr>
                `
              )}
            </tbody>
          </table>
        </div>
        ${chartNote ? html`<p class="sfr-note">${chartNote}</p>` : nothing}
      </div>
    `;
  }

  private renderSteps() {
    const c = this.config || {};
    const steps = this.steps;
    if (!steps.length) return nothing;

    return html`
      <div class="sfr-panel">
        <h3 class="sfr-panel__title">
          ${localizedString(c.sfr_steps_title as string) ||
          t('كيف تأخذين مقاساتك', 'How to take your measurements')}
        </h3>
        <div class="sfr-steps" role="tablist">
          ${steps.map(
            (step, index) => html`
              <button
                type="button"
                class=${classMap({
                  'sfr-step-btn': true,
                  'sfr-step-btn--active': step.id === this.activeStepId,
                })}
                role="tab"
                aria-selected=${step.id === this.activeStepId ? 'true' : 'false'}
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
    `;
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'sfr_');
    const animate = theme.animate && !prefersReducedMotion();
    const title = localizedString(c.sfr_title as string);
    const desc = localizedString(c.sfr_desc as string);
    const steps = this.steps;
    const sizes = this.sizes;

    if (!steps.length && !sizes.length) {
      return html`<div class="fs-empty" role="status">
        ${t('أضيفي خطوات القياس أو جدول المقاسات', 'Add measure steps or a size chart')}
      </div>`;
    }

    return html`
      <section
        class=${classMap({
          'fs-section': true,
          'fs-animate': animate,
        })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('طقوس القياس', 'Silhouette Fit Ritual')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<header class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </header>`
            : nothing}

          <div
            class=${classMap({
              'sfr-layout': true,
              'sfr-layout--with-preview': steps.length > 0,
            })}
          >
            <div class="sfr-main">
              ${this.renderChart()}
              ${this.renderSteps()}
            </div>
            ${steps.length ? this.renderPreview() : nothing}
          </div>
        </div>
      </section>
    `;
  }
}
