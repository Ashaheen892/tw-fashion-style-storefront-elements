import { css, html, LitElement, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { localizedString } from '../../utils/localizedString.js';
import {
  getUnitValue,
  isTruthy,
  isValidHref,
  readSectionTheme,
  t,
  themeStyleMap,
} from '../../utils/helpers.js';
import { renderCommerceOutcome } from '../../utils/commerceOutcome.js';
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { componentStyles } from './styles.js';
import {
  calculateLength,
  heightToPercent,
  overallBounds,
  parseCuts,
  parseRanges,
  rangeSegmentStyle,
} from './utils.js';
import type {
  CalculationResult,
  CutOption,
  Preference,
  ShoeType,
} from './types.js';
import { fsAccentTone } from '../../utils/fsTheme.js';

export default class AbayaLengthCalculator extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private heightInput = '';
  @state() private shoeType: ShoeType = 'flat';
  @state() private preference: Preference = 'exact';
  @state() private cutId = '';
  @state() private withScarf = false;
  @state() private result: CalculationResult | null = null;
  @state() private error = '';
  @state() private initialized = false;

  private _onLangChange = () => this.requestUpdate();
  private _liveTimer: ReturnType<typeof setTimeout> | null = null;

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
    document.addEventListener('language-changed', this._onLangChange);
    this._ensureDefaults();
    this._syncVisibility();
    if (this.liveCalc) this._scheduleCalc();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('language-changed', this._onLangChange);
    if (this._liveTimer) clearTimeout(this._liveTimer);
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config')) {
      this.initialized = false;
      this._ensureDefaults();
      if (this.liveCalc) this._scheduleCalc();
    }
    this._syncVisibility();
  }

  private get ranges() {
    return parseRanges(this.config?.alc_ranges);
  }

  private get cuts(): CutOption[] {
    return parseCuts(this.config?.alc_cuts);
  }

  private get theme() {
    return readSectionTheme(this.config, 'alc_');
  }

  private get minHeight() {
    return getUnitValue(this.config?.alc_min_height, 150);
  }

  private get maxHeight() {
    return getUnitValue(this.config?.alc_max_height, 200);
  }

  private get shorterOffset() {
    return getUnitValue(this.config?.alc_shorter_offset, 2);
  }

  private get longerOffset() {
    return getUnitValue(this.config?.alc_longer_offset, 2);
  }

  private get scarfDelta() {
    return this.withScarf ? getUnitValue(this.config?.alc_scarf_delta, 1) : 0;
  }

  private get liveCalc() {
    return isTruthy(this.config?.alc_live_calc, true);
  }

  private get showSlider() {
    return isTruthy(this.config?.alc_show_slider, true);
  }

  private get showGuide() {
    return isTruthy(this.config?.alc_show_guide, true);
  }

  private get showCut() {
    return isTruthy(this.config?.alc_show_cut, true) && this.cuts.length > 0;
  }

  private get showScarf() {
    return isTruthy(this.config?.alc_show_scarf, true);
  }

  private get selectedCut(): CutOption | null {
    return this.cuts.find((c) => c.cut_id === this.cutId) || this.cuts[0] || null;
  }

  private _syncVisibility(): void {
    this.style.display = this.ranges.length ? '' : 'none';
  }

  private _ensureDefaults(): void {
    if (this.initialized) return;

    const midFallback = Math.round((this.minHeight + this.maxHeight) / 2) || 165;
    const defaultHeight = getUnitValue(this.config?.alc_default_height, midFallback);
    if (!this.heightInput.trim()) {
      const clamped = Math.min(
        this.maxHeight,
        Math.max(this.minHeight, defaultHeight > 0 ? defaultHeight : midFallback)
      );
      this.heightInput = String(clamped);
    }

    if (this.cuts.length) {
      const def = this.cuts.find((c) => c.is_default) || this.cuts[0];
      this.cutId = def.cut_id;
    }

    const defaultShoe = localizedString(this.config?.alc_default_shoe as string, 'flat');
    if (defaultShoe === 'mid' || defaultShoe === 'high' || defaultShoe === 'flat') {
      this.shoeType = defaultShoe;
    }

    const defaultPref = localizedString(this.config?.alc_default_preference as string, 'exact');
    if (
      defaultPref === 'shorter' ||
      defaultPref === 'exact' ||
      defaultPref === 'longer'
    ) {
      this.preference = defaultPref;
    }

    this.withScarf = isTruthy(this.config?.alc_scarf_default, false);
    this.initialized = true;
  }

  private _label(key: string, ar: string, en: string): string {
    return localizedString(this.config?.[key] as string, '') || t(ar, en);
  }

  private _scheduleCalc(): void {
    if (this._liveTimer) clearTimeout(this._liveTimer);
    this._liveTimer = setTimeout(() => {
      this._calculate(true);
    }, 120);
  }

  private _onHeightInput(e: Event): void {
    this.heightInput = (e.target as HTMLInputElement).value;
    this.error = '';
    if (this.liveCalc) this._scheduleCalc();
  }

  private _onSliderInput(e: Event): void {
    this.heightInput = (e.target as HTMLInputElement).value;
    this.error = '';
    if (this.liveCalc) this._scheduleCalc();
  }

  private _jumpToRange(minHeight: number, maxHeight: number): void {
    const mid = Math.round((minHeight + maxHeight) / 2);
    this.heightInput = String(mid);
    this.error = '';
    if (this.liveCalc) this._scheduleCalc();
  }

  private _setShoe(shoe: ShoeType): void {
    this.shoeType = shoe;
    if (this.liveCalc) this._scheduleCalc();
  }

  private _setPreference(pref: Preference): void {
    this.preference = pref;
    if (this.liveCalc) this._scheduleCalc();
  }

  private _setCut(cutId: string): void {
    this.cutId = cutId;
    if (this.liveCalc) this._scheduleCalc();
  }

  private _setScarf(value: boolean): void {
    this.withScarf = value;
    if (this.liveCalc) this._scheduleCalc();
  }

  private _buildReasonParts(cut: CutOption | null): string[] {
    const shoeLabel =
      this.shoeType === 'flat'
        ? this._label('alc_shoe_flat', 'مسطح', 'Flat')
        : this.shoeType === 'mid'
          ? this._label('alc_shoe_mid', 'كعب متوسط', 'Mid heel')
          : this._label('alc_shoe_high', 'كعب عالي', 'High heel');

    const prefLabel =
      this.preference === 'shorter'
        ? this._label('alc_pref_shorter', 'أقصر قليلًا', 'Slightly shorter')
        : this.preference === 'longer'
          ? this._label('alc_pref_longer', 'أطول قليلًا', 'Slightly longer')
          : this._label('alc_pref_exact', 'طول مضبوط', 'Exact length');

    const parts = [
      `${this._label('alc_shoe_label', 'الحذاء', 'Shoe')}: ${shoeLabel}`,
      `${this._label('alc_pref_label', 'التفضيل', 'Preference')}: ${prefLabel}`,
    ];

    if (cut) {
      parts.push(
        `${this._label('alc_cut_label', 'القصة', 'Silhouette')}: ${cut.cut_name}`
      );
    }

    if (this.showScarf && this.withScarf) {
      parts.push(this._label('alc_scarf_yes', 'مع طرحة', 'With scarf'));
    }

    return parts;
  }

  private _calculate(silent = false): void {
    const height = Number(this.heightInput);

    if (!this.heightInput.trim()) {
      this.result = null;
      this.error = silent
        ? ''
        : t('يرجى إدخال طولك بالسنتيمتر', 'Please enter your height in centimeters');
      return;
    }

    if (!Number.isFinite(height) || height <= 0) {
      this.result = null;
      this.error = t(
        'يرجى إدخال طول صحيح بالسنتيمتر',
        'Please enter a valid height in centimeters'
      );
      return;
    }

    if (height < this.minHeight || height > this.maxHeight) {
      this.result = null;
      this.error = t(
        `الطول يجب أن يكون بين ${this.minHeight} و ${this.maxHeight} سم`,
        `Height must be between ${this.minHeight} and ${this.maxHeight} cm`
      );
      return;
    }

    const cut = this.selectedCut;
    const result = calculateLength({
      ranges: this.ranges,
      height,
      shoe: this.shoeType,
      preference: this.preference,
      shorterOffset: this.shorterOffset,
      longerOffset: this.longerOffset,
      cutDelta: cut?.length_delta || 0,
      scarfDelta: this.scarfDelta,
      reasonParts: this._buildReasonParts(cut),
    });

    if (!result) {
      this.result = null;
      this.error = this._label(
        'alc_no_match',
        'لا يوجد مقاس مناسب لطولك — تواصلي معنا للمساعدة',
        'No matching size for your height — contact us for help'
      );
      return;
    }

    this.error = '';
    this.result = result;
  }

  private _reset(): void {
    this.initialized = false;
    this.heightInput = '';
    this.shoeType = 'flat';
    this.preference = 'exact';
    this.cutId = '';
    this.withScarf = false;
    this.result = null;
    this.error = '';
    this._ensureDefaults();
    if (this.liveCalc) this._scheduleCalc();
  }

  private _formatDelta(value: number): string {
    if (!value) return '0';
    return value > 0 ? `+${value}` : String(value);
  }

  render() {
    if (!this.ranges.length) {
      return html`<div class="fs-empty" role="status">
        ${t('لا توجد بيانات مقاسات متاحة', 'No size data available')}
      </div>`;
    }

    const theme = this.theme;
    const animateClass = theme.animate ? 'fs-animate' : '';
    const title = localizedString(this.config?.alc_title as string);
    const desc = localizedString(this.config?.alc_desc as string);
    const disclaimer = localizedString(this.config?.alc_disclaimer as string);
    const calcBtn =
      this._label('alc_calc_btn', 'احسبي الطول', 'Calculate');
    const resetBtn =
      this._label('alc_reset_btn', 'إعادة الحساب', 'Recalculate');
    const shopBtn =
      this._label('alc_shop_btn', 'تسوّقي هذا المقاس', 'Shop this size');
    const heightLabel =
      this._label('alc_height_label', 'طولك (سم)', 'Your height (cm)');

    // Guide + slider share the same bounds from actual size ranges
    const bounds = overallBounds(this.ranges, this.minHeight, this.maxHeight);
    const inputMin = bounds.min;
    const inputMax = bounds.max;
    const heightNum = Number(this.heightInput);
    const markerPct = Number.isFinite(heightNum)
      ? heightToPercent(heightNum, bounds.min, bounds.max)
      : 0;
    const sliderValue = Number.isFinite(heightNum)
      ? String(Math.min(inputMax, Math.max(inputMin, heightNum)))
      : String(inputMin);

    return html`
      <section
        class="fs-section ${animateClass}"
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('حاسبة طول العباية', 'Abaya length calculator')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<header class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </header>`
            : nothing}

          <div class="alc-layout">
            <div class="alc-form fs-card">
              <div class="alc-field">
                <label for="alc-height">${heightLabel}</label>
                <div class="alc-height-row">
                  <input
                    id="alc-height"
                    class="alc-input"
                    type="number"
                    inputmode="decimal"
                    min=${inputMin}
                    max=${inputMax}
                    step="1"
                    .value=${this.heightInput}
                    @input=${this._onHeightInput}
                    aria-describedby=${this.error ? 'alc-error' : 'alc-guide-text'}
                  />
                  <span class="alc-height-unit">${t('سم', 'cm')}</span>
                </div>

                ${this.showSlider
                  ? html`<input
                      class="alc-slider"
                      type="range"
                      min=${inputMin}
                      max=${inputMax}
                      step="1"
                      .value=${sliderValue}
                      @input=${this._onSliderInput}
                      aria-label=${heightLabel}
                    />`
                  : nothing}
              </div>

              ${this.showGuide
                ? html`<div class="alc-guide" id="alc-guide-text">
                    <div
                      class="alc-guide__track"
                      role="img"
                      aria-label=${t('دليل نطاقات المقاسات', 'Size range guide')}
                    >
                      ${this.ranges.map((range, index) => {
                        const seg = rangeSegmentStyle(range, bounds.min, bounds.max);
                        const active =
                          Number.isFinite(heightNum) &&
                          heightNum >= range.min_height &&
                          heightNum <= range.max_height;
                        return html`<div
                          class="alc-guide__segment ${active ? 'alc-guide__segment--active' : ''}"
                          style=${styleMap({
                            insetInlineStart: `${seg.start}%`,
                            width: `${seg.width}%`,
                            background: fsAccentTone(index),
                          })}
                          title=${`${range.alt_size || range.range_label || ''} (${range.min_height}–${range.max_height} ${t('سم', 'cm')})`.trim()}
                        ></div>`;
                      })}
                      ${Number.isFinite(heightNum) &&
                      heightNum >= bounds.min &&
                      heightNum <= bounds.max
                        ? html`<span
                            class="alc-guide__marker"
                            style=${styleMap({ insetInlineStart: `${markerPct}%` })}
                          ></span>`
                        : nothing}
                    </div>
                    <div class="alc-guide__labels">
                      <span>${bounds.min} ${t('سم', 'cm')}</span>
                      <span>${bounds.max} ${t('سم', 'cm')}</span>
                    </div>
                    <div class="alc-guide__chips" role="group" aria-label=${t('المقاسات', 'Sizes')}>
                      ${this.ranges.map((range, index) => {
                        const active =
                          Number.isFinite(heightNum) &&
                          heightNum >= range.min_height &&
                          heightNum <= range.max_height;
                        const label =
                          range.alt_size ||
                          range.range_label ||
                          `${range.min_height}-${range.max_height}`;
                        return html`<button
                          type="button"
                          class="alc-chip ${active ? 'alc-chip--active' : ''}"
                          style=${styleMap({
                            color: fsAccentTone(index),
                          })}
                          aria-pressed=${active ? 'true' : 'false'}
                          title=${`${range.min_height}–${range.max_height} ${t('سم', 'cm')}`}
                          @click=${() =>
                            this._jumpToRange(range.min_height, range.max_height)}
                        >
                          <span class="alc-chip__swatch" aria-hidden="true"></span>
                          <span class="alc-chip__text">
                            <span class="alc-chip__name">${label}</span>
                            <span class="alc-chip__range"
                              >${range.min_height}–${range.max_height}</span
                            >
                          </span>
                        </button>`;
                      })}
                    </div>
                  </div>`
                : nothing}

              <fieldset class="alc-field" style="border:none;margin:0;padding:0;">
                <legend>${this._label('alc_shoe_label', 'نوع الحذاء', 'Shoe type')}</legend>
                <div class="alc-options" role="group">
                  ${this._renderOption(
                    'flat',
                    this._label('alc_shoe_flat', 'مسطح', 'Flat'),
                    this.shoeType,
                    () => this._setShoe('flat')
                  )}
                  ${this._renderOption(
                    'mid',
                    this._label('alc_shoe_mid', 'كعب متوسط', 'Mid heel'),
                    this.shoeType,
                    () => this._setShoe('mid')
                  )}
                  ${this._renderOption(
                    'high',
                    this._label('alc_shoe_high', 'كعب عالي', 'High heel'),
                    this.shoeType,
                    () => this._setShoe('high')
                  )}
                </div>
              </fieldset>

              <fieldset class="alc-field" style="border:none;margin:0;padding:0;">
                <legend>${this._label('alc_pref_label', 'التفضيل', 'Preference')}</legend>
                <div class="alc-options" role="group">
                  ${this._renderOption(
                    'shorter',
                    this._label('alc_pref_shorter', 'أقصر قليلًا', 'Slightly shorter'),
                    this.preference,
                    () => this._setPreference('shorter')
                  )}
                  ${this._renderOption(
                    'exact',
                    this._label('alc_pref_exact', 'طول مضبوط', 'Exact length'),
                    this.preference,
                    () => this._setPreference('exact')
                  )}
                  ${this._renderOption(
                    'longer',
                    this._label('alc_pref_longer', 'أطول قليلًا', 'Slightly longer'),
                    this.preference,
                    () => this._setPreference('longer')
                  )}
                </div>
              </fieldset>

              ${this.showCut
                ? html`<fieldset class="alc-field" style="border:none;margin:0;padding:0;">
                    <legend>${this._label('alc_cut_label', 'قصة العباية', 'Abaya silhouette')}</legend>
                    <div class="alc-options" role="group">
                      ${this.cuts.map(
                        (cut) => html`
                          <button
                            type="button"
                            class="alc-option"
                            aria-pressed=${this.cutId === cut.cut_id ? 'true' : 'false'}
                            @click=${() => this._setCut(cut.cut_id)}
                          >
                            ${cut.cut_name}
                            ${cut.cut_desc
                              ? html`<small>${cut.cut_desc}</small>`
                              : cut.length_delta
                                ? html`<small>${this._formatDelta(cut.length_delta)} ${t('سم', 'cm')}</small>`
                                : nothing}
                          </button>
                        `
                      )}
                    </div>
                  </fieldset>`
                : nothing}

              ${this.showScarf
                ? html`<fieldset class="alc-field" style="border:none;margin:0;padding:0;">
                    <legend>${this._label('alc_scarf_label', 'هل ستلبسين طرحة؟', 'Will you wear a scarf?')}</legend>
                    <div class="alc-options" role="group">
                      ${this._renderOption(
                        'no',
                        this._label('alc_scarf_no', 'بدون طرحة', 'Without scarf'),
                        this.withScarf ? 'yes' : 'no',
                        () => this._setScarf(false)
                      )}
                      ${this._renderOption(
                        'yes',
                        this._label('alc_scarf_yes', 'مع طرحة', 'With scarf'),
                        this.withScarf ? 'yes' : 'no',
                        () => this._setScarf(true)
                      )}
                    </div>
                  </fieldset>`
                : nothing}

              ${this.error
                ? html`<p id="alc-error" class="alc-error" role="alert">${this.error}</p>`
                : nothing}

              <div class="alc-actions">
                ${!this.liveCalc
                  ? html`<button type="button" class="fs-btn" @click=${() => this._calculate(false)}>
                      ${calcBtn}
                    </button>`
                  : nothing}
                <button type="button" class="fs-btn fs-btn--ghost" @click=${this._reset}>
                  ${resetBtn}
                </button>
              </div>

              ${this.liveCalc
                ? html`<p class="alc-live-hint">
                    ${this._label(
                      'alc_live_hint',
                      'النتيجة تتحدث تلقائيًا مع كل اختيار',
                      'The result updates automatically with every choice'
                    )}
                  </p>`
                : nothing}
            </div>

            ${this.result ? this._renderResult(shopBtn, animateClass) : nothing}
          </div>

          ${disclaimer
            ? html`<p class="alc-disclaimer">${disclaimer}</p>`
            : nothing}
        </div>
        ${renderCommerceOutcome(this.config || {}, 'alc_')}
      </section>
    `;
  }

  private _renderResult(shopBtn: string, animateClass: string) {
    const result = this.result!;
    const confidenceLabel = this._label(
      'alc_confidence_label',
      'مدى ملاءمة النطاق',
      'Range fit confidence'
    );

    return html`
      <div class="alc-result fs-card ${animateClass}" aria-live="polite">
        <div class="alc-result__top">
          ${result.range.alt_size
            ? html`<span class="alc-badge">${result.range.alt_size}</span>`
            : nothing}
          ${result.range.range_label
            ? html`<span class="alc-badge">${result.range.range_label}</span>`
            : nothing}
        </div>

        <p class="alc-result__length">
          ${result.suggestedLength}
          <span class="alc-result__unit">${t('سم', 'cm')}</span>
        </p>

        <div class="alc-confidence">
          <div class="alc-confidence__label">
            <span>${confidenceLabel}</span>
            <strong>${result.confidence}%</strong>
          </div>
          <div
            class="alc-confidence__bar"
            role="meter"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow=${result.confidence}
            aria-label=${confidenceLabel}
          >
            <span style=${styleMap({ width: `${result.confidence}%` })}></span>
          </div>
        </div>

        ${result.reason
          ? html`<p class="alc-result__reason">${result.reason}</p>`
          : nothing}

        <div class="alc-breakdown" aria-label=${t('تفاصيل الحساب', 'Calculation details')}>
          <div class="alc-breakdown__row">
            <span>${this._label('alc_base_label', 'الطول الأساسي', 'Base length')}</span>
            <strong>${result.baseLength} ${t('سم', 'cm')}</strong>
          </div>
          <div class="alc-breakdown__row">
            <span>${this._label('alc_pref_label', 'التفضيل', 'Preference')}</span>
            <strong>${this._formatDelta(result.preferenceDelta)} ${t('سم', 'cm')}</strong>
          </div>
          ${this.showCut
            ? html`<div class="alc-breakdown__row">
                <span>${this._label('alc_cut_label', 'القصة', 'Silhouette')}</span>
                <strong>${this._formatDelta(result.cutDelta)} ${t('سم', 'cm')}</strong>
              </div>`
            : nothing}
          ${this.showScarf
            ? html`<div class="alc-breakdown__row">
                <span>${this._label('alc_scarf_label', 'الطرحة', 'Scarf')}</span>
                <strong>${this._formatDelta(result.scarfDelta)} ${t('سم', 'cm')}</strong>
              </div>`
            : nothing}
        </div>

        ${result.range.note
          ? html`<p class="alc-result__note">${result.range.note}</p>`
          : nothing}

        ${isValidHref(result.range.products_url)
          ? html`<div class="alc-actions">
              <a
                class="fs-btn"
                href=${result.range.products_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                ${shopBtn}
              </a>
            </div>`
          : nothing}

        ${result.nearby.length
          ? html`<div class="alc-nearby">
              <p class="alc-nearby__title">
                ${this._label(
                  'alc_nearby_title',
                  'اقتراحات قريبة أيضًا',
                  'Nearby suggestions'
                )}
              </p>
              <div class="alc-nearby__list">
                ${result.nearby.map((item) => {
                  const content = html`
                    <span>
                      ${item.relation === 'lower'
                        ? this._label('alc_nearby_lower', 'أقصر قليلًا', 'Slightly smaller')
                        : this._label('alc_nearby_higher', 'أطول قليلًا', 'Slightly larger')}
                    </span>
                    <strong>
                      ${item.alt_size || `${item.suggestedLength} ${t('سم', 'cm')}`}
                    </strong>
                    <span>${item.suggestedLength} ${t('سم', 'cm')}</span>
                  `;
                  return isValidHref(item.products_url)
                    ? html`<a
                        class="alc-nearby__card"
                        href=${item.products_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        ${content}
                      </a>`
                    : html`<div class="alc-nearby__card">${content}</div>`;
                })}
              </div>
            </div>`
          : nothing}
      </div>
    `;
  }

  private _renderOption<T extends string>(
    value: T,
    label: string,
    current: T,
    onSelect: () => void
  ) {
    return html`
      <button
        type="button"
        class="alc-option"
        aria-pressed=${current === value ? 'true' : 'false'}
        @click=${onSelect}
      >
        ${label}
      </button>
    `;
  }
}
