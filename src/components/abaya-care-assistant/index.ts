import { html, LitElement, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { getPageLocale, localizedString } from '../../utils/localizedString.js';
import {
  copyText,
  prefersReducedMotion,
  readSectionTheme,
  t,
  themeStyleMap,
} from '../../utils/helpers.js';
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { componentStyles } from './styles.js';
import {
  buildCareSteps,
  buildCareText,
  filterFabrics,
  parseFabrics,
} from './utils.js';
import type { CareStep, FabricCare } from './types.js';

export default class AbayaCareAssistant extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private searchQuery = '';
  @state() private selectedKey = '';
  @state() private showToast = false;

  private _onLangChange = () => this.requestUpdate();
  private _toastTimer: ReturnType<typeof setTimeout> | null = null;
  private static fontsReady = false;

  static styles = [sharedSectionCss, componentStyles];

  connectedCallback(): void {
    super.connectedCallback();
    this._ensureFonts();
    document.addEventListener('language-changed', this._onLangChange);
    this._ensureSelection();
    this._syncVisibility();
  }

  private _ensureFonts(): void {
    if (AbayaCareAssistant.fontsReady || typeof document === 'undefined') return;
    const id = 'aca-luxury-fonts';
    if (document.getElementById(id)) {
      AbayaCareAssistant.fontsReady = true;
      return;
    }
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;500;600;700&display=swap';
    document.head.appendChild(link);
    AbayaCareAssistant.fontsReady = true;
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('language-changed', this._onLangChange);
    if (this._toastTimer) {
      clearTimeout(this._toastTimer);
      this._toastTimer = null;
    }
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config')) this._ensureSelection();
    this._syncVisibility();
  }

  private get fabrics(): FabricCare[] {
    return parseFabrics(this.config?.aca_fabrics);
  }

  private get filteredFabrics(): FabricCare[] {
    return filterFabrics(this.fabrics, this.searchQuery);
  }

  private get theme() {
    return readSectionTheme(this.config, 'aca_');
  }

  private get selected(): FabricCare | null {
    return (
      this.filteredFabrics.find((f) => f.fabric_name === this.selectedKey) ||
      this.filteredFabrics[0] ||
      null
    );
  }

  private _syncVisibility(): void {
    this.style.display = this.fabrics.length ? '' : 'none';
  }

  private _ensureSelection(): void {
    const list = this.filteredFabrics;
    if (!list.length) {
      this.selectedKey = '';
      return;
    }
    if (!list.some((f) => f.fabric_name === this.selectedKey)) {
      this.selectedKey = list[0].fabric_name;
    }
  }

  private _onSearch(e: Event): void {
    this.searchQuery = (e.target as HTMLInputElement).value;
    this._ensureSelection();
  }

  private _selectFabric(name: string): void {
    this.selectedKey = name;
  }

  private async _copyCare(): Promise<void> {
    const fabric = this.selected;
    if (!fabric) return;
    const localeEn = getPageLocale() === 'en';
    const ok = await copyText(buildCareText(fabric, localeEn));
    if (ok) this._showCopiedToast();
  }

  private _printCare(): void {
    window.print();
  }

  private _showCopiedToast(): void {
    this.showToast = true;
    if (this._toastTimer) clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      this.showToast = false;
      this._toastTimer = null;
    }, 2400);
  }

  private _label(key: string, ar: string, en: string): string {
    return localizedString(this.config?.[key] as string, '') || t(ar, en);
  }

  render() {
    if (!this.fabrics.length) {
      return html`<div class="fs-empty" role="status">
        ${t('لا توجد أقمشة متاحة', 'No fabrics available')}
      </div>`;
    }

    const theme = this.theme;
    const animate = theme.animate && !prefersReducedMotion();
    const fabric = this.selected;
    const title = localizedString(this.config?.aca_title as string);
    const desc = localizedString(this.config?.aca_desc as string);
    const searchPh =
      this._label('aca_search_placeholder', 'ابحثي عن الخامة...', 'Search fabrics...');
    const copyBtn = this._label('aca_copy_btn', 'نسخ التعليمات', 'Copy instructions');
    const printBtn = this._label('aca_print_btn', 'طباعة البطاقة', 'Print card');
    const copiedMsg = this._label('aca_copied_msg', 'تم النسخ بنجاح', 'Copied successfully');
    const steps = fabric ? buildCareSteps(fabric) : [];

    return html`
      <section
        class=${classMap({
          'fs-section': true,
          'fs-animate': animate,
        })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('مساعد العناية بالعباية', 'Abaya care assistant')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<header class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </header>`
            : nothing}

          <div class="aca-layout">
            <aside class="aca-sidebar">
              <label class="aca-sidebar__label" for="aca-search">
                ${t('اختاري الخامة', 'Choose a fabric')}
              </label>
              <input
                id="aca-search"
                class="aca-search"
                type="search"
                .value=${this.searchQuery}
                placeholder=${searchPh}
                @input=${this._onSearch}
                aria-label=${searchPh}
              />
              <ul class="aca-list" role="listbox" aria-label=${t('قائمة الأقمشة', 'Fabric list')}>
                ${this.filteredFabrics.map(
                  (f) => html`
                    <li>
                      <button
                        type="button"
                        class="aca-list__item"
                        role="option"
                        aria-current=${f.fabric_name === fabric?.fabric_name ? 'true' : 'false'}
                        @click=${() => this._selectFabric(f.fabric_name)}
                      >
                        ${f.fabric_image
                          ? html`<img
                              class="aca-list__thumb"
                              src=${f.fabric_image}
                              alt=""
                              loading="lazy"
                              width="48"
                              height="48"
                            />`
                          : html`<span class="aca-list__thumb" aria-hidden="true"></span>`}
                        <span class="aca-list__meta">
                          <span class="aca-list__name">${f.fabric_name}</span>
                          ${f.fabric_summary
                            ? html`<span class="aca-list__hint">${f.fabric_summary}</span>`
                            : nothing}
                        </span>
                        <span class="aca-list__check" aria-hidden="true">✓</span>
                      </button>
                    </li>
                  `
                )}
              </ul>
              ${!this.filteredFabrics.length
                ? html`<p class="aca-empty-inline">${t('لا توجد نتائج', 'No results')}</p>`
                : nothing}
            </aside>

            ${fabric
              ? html`<article class="aca-panel" aria-live="polite">
                  <div class="aca-panel__hero">
                    ${fabric.fabric_image
                      ? html`<img
                          class="aca-panel__hero-bg"
                          src=${fabric.fabric_image}
                          alt=""
                          loading="eager"
                          decoding="async"
                        />`
                      : nothing}
                    <div class="aca-panel__hero-content">
                      <span class="aca-kicker">${t('أتيليه العناية', 'Care atelier')}</span>
                      <h3 class="aca-panel__title">${fabric.fabric_name}</h3>
                      ${fabric.fabric_summary
                        ? html`<p class="aca-panel__summary">${fabric.fabric_summary}</p>`
                        : nothing}
                    </div>
                  </div>

                  <div class="aca-panel__body">
                    <section class="aca-block aca-block--ritual">
                      <h4 class="aca-section-title">
                        ${t('طقوس العناية بأناقة', 'An elegant care ritual')}
                      </h4>
                      ${steps.length
                        ? html`<div class="aca-journey" aria-label=${t('خطوات العناية', 'Care steps')}>
                            ${steps.map(
                              (step: CareStep, i: number) => html`
                                <div class="aca-step">
                                  <span class="aca-step__num" aria-hidden="true">${i + 1}</span>
                                  <p class="aca-step__title">${t(step.labelAr, step.labelEn)}</p>
                                  <p class="aca-step__text">${step.value}</p>
                                </div>
                              `
                            )}
                          </div>`
                        : html`<p class="aca-empty-inline">
                            ${t('لا توجد خطوات عناية لهذه الخامة', 'No care steps for this fabric')}
                          </p>`}
                    </section>

                    <section
                      class="aca-block aca-block--allows"
                      aria-labelledby="aca-allows-title"
                    >
                      <h4 class="aca-section-title" id="aca-allows-title">
                        ${t('ما المسموح؟', 'What is allowed?')}
                      </h4>
                      <div class="aca-allows" aria-label=${t('الأجهزة المسموحة', 'Allowed appliances')}>
                        ${this._renderAllow(t('غسالة', 'Washer'), fabric.allow_washer)}
                        ${this._renderAllow(t('مجفف', 'Dryer'), fabric.allow_dryer)}
                        ${this._renderAllow(t('بخار', 'Steam'), fabric.allow_steam)}
                      </div>
                    </section>

                    ${fabric.wash_temp || fabric.stain || fabric.embroidery_warn
                      ? html`<section class="aca-block aca-block--notes">
                          <h4 class="aca-section-title">
                            ${t('ملاحظات إضافية', 'Extra notes')}
                          </h4>
                          <div class="aca-notes">
                            ${fabric.wash_temp
                              ? html`<p class="aca-extra">
                                  <strong>${t('حرارة الغسيل:', 'Wash temp:')}</strong>
                                  ${fabric.wash_temp}
                                </p>`
                              : nothing}
                            ${fabric.stain
                              ? html`<p class="aca-extra">
                                  <strong>${t('إزالة البقع:', 'Stain removal:')}</strong>
                                  ${fabric.stain}
                                </p>`
                              : nothing}
                            ${fabric.embroidery_warn
                              ? html`<p class="aca-extra">
                                  <strong>${t('تنبيه التطريز:', 'Embroidery note:')}</strong>
                                  ${fabric.embroidery_warn}
                                </p>`
                              : nothing}
                          </div>
                        </section>`
                      : nothing}

                    <div class="aca-actions">
                      <button type="button" class="fs-btn" @click=${this._copyCare}>
                        ${copyBtn}
                      </button>
                      <button type="button" class="fs-btn fs-btn--ghost" @click=${this._printCare}>
                        ${printBtn}
                      </button>
                    </div>
                  </div>
                </article>`
              : nothing}
          </div>
        </div>

        ${this.showToast
          ? html`<div class="aca-toast" role="status" aria-live="polite">${copiedMsg}</div>`
          : nothing}

        ${fabric ? this._renderPrintCard(fabric) : nothing}
      </section>
    `;
  }

  private _renderAllow(label: string, allowed: boolean) {
    return html`
      <div class="aca-allow ${allowed ? 'aca-allow--yes' : 'aca-allow--no'}">
        <span class="aca-allow__icon" aria-hidden="true">${allowed ? '✓' : '✕'}</span>
        <span class="aca-allow__label">
          <strong>${label}</strong>
          <span>${allowed ? t('مسموح', 'Allowed') : t('غير مسموح', 'Not allowed')}</span>
        </span>
      </div>
    `;
  }

  private _renderPrintCard(fabric: FabricCare) {
    const steps = buildCareSteps(fabric);
    return html`
      <div class="aca-print-card" aria-hidden="true">
        <h1>${fabric.fabric_name}</h1>
        ${fabric.fabric_summary ? html`<p>${fabric.fabric_summary}</p>` : nothing}
        <ol>
          ${steps.map(
            (s: CareStep) =>
              html`<li><strong>${t(s.labelAr, s.labelEn)}:</strong> ${s.value}</li>`
          )}
        </ol>
        ${fabric.wash_temp
          ? html`<p>${t('حرارة الغسيل', 'Wash temp')}: ${fabric.wash_temp}</p>`
          : nothing}
        ${fabric.stain ? html`<p>${t('إزالة البقع', 'Stain')}: ${fabric.stain}</p>` : nothing}
        ${fabric.embroidery_warn
          ? html`<p>${t('تنبيه التطريز', 'Embroidery')}: ${fabric.embroidery_warn}</p>`
          : nothing}
      </div>
    `;
  }
}
