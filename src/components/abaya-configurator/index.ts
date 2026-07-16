import { css, html, LitElement, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import {
  copyText,
  extractImageUrl,
  extractLink,
  formatPrice,
  getRadioValue,
  isTruthy,
  prefersReducedMotion,
  readSectionTheme,
  t,
  themeStyleMap,
  toNumber,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { componentStyles } from './styles.js';
import {
  buildDesignSummary,
  buildOptionGroups,
  calcFinalPrice,
  defaultOptionSelections,
  parseConfigOptions,
  whatsAppLink,
} from './utils.js';

export default class AbayaConfigurator extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private selections: Record<string, string> = {};
  @state() private copyMsg = '';
  @state() private recommendFlash = false;
  @state() private previewPulse = false;

  private boundLangHandler = () => this.requestUpdate();
  private copyTimer: ReturnType<typeof setTimeout> | null = null;
  private recommendTimer: ReturnType<typeof setTimeout> | null = null;
  private pulseTimer: ReturnType<typeof setTimeout> | null = null;
  private static fontsReady = false;

  static styles = [sharedSectionCss, componentStyles, css`
    :host {
      direction: inherit;
    }
  `];

  connectedCallback(): void {
    super.connectedCallback();
    this._ensureFonts();
    window.addEventListener('language-changed', this.boundLangHandler);
    this.initSelections();
  }

  private _ensureFonts(): void {
    if (AbayaConfigurator.fontsReady || typeof document === 'undefined') return;
    const id = 'acfg-luxury-fonts';
    if (document.getElementById(id)) {
      AbayaConfigurator.fontsReady = true;
      return;
    }
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;500;600;700&display=swap';
    document.head.appendChild(link);
    AbayaConfigurator.fontsReady = true;
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLangHandler);
    if (this.copyTimer) clearTimeout(this.copyTimer);
    if (this.recommendTimer) clearTimeout(this.recommendTimer);
    if (this.pulseTimer) clearTimeout(this.pulseTimer);
    super.disconnectedCallback();
  }

  private get groups() {
    return buildOptionGroups(parseConfigOptions(this.config.acfg_options));
  }

  private initSelections(): void {
    const groups = this.groups;
    if (!groups.length) return;
    this.selections = defaultOptionSelections(groups);
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config')) this.initSelections();
  }

  private selectOption(groupKey: string, optionId: string): void {
    if (this.selections[groupKey] === optionId) return;
    this.selections = { ...this.selections, [groupKey]: optionId };
    this.pulsePreview();
  }

  private pulsePreview(): void {
    if (prefersReducedMotion()) return;
    this.previewPulse = true;
    if (this.pulseTimer) clearTimeout(this.pulseTimer);
    this.pulseTimer = setTimeout(() => {
      this.previewPulse = false;
    }, 420);
  }

  private applyRecommended(): void {
    const next = defaultOptionSelections(this.groups);
    this.selections = next;
    this.recommendFlash = true;
    this.pulsePreview();
    if (this.recommendTimer) clearTimeout(this.recommendTimer);
    this.recommendTimer = setTimeout(() => {
      this.recommendFlash = false;
    }, 1600);
  }

  private hasRecommended(): boolean {
    return this.groups.some((g) => g.options.some((o) => o.is_default));
  }

  private async handleCopy(): Promise<void> {
    const currency = localizedString(this.config.acfg_currency as string) || 'ر.س';
    const basePrice = toNumber(this.config.acfg_base_price, 0);
    const text = buildDesignSummary(this.groups, this.selections, basePrice, currency);
    const ok = await copyText(text);
    this.copyMsg = ok
      ? t('تم نسخ التصميم', 'Design copied')
      : t('تعذر النسخ', 'Could not copy');
    if (this.copyTimer) clearTimeout(this.copyTimer);
    this.copyTimer = setTimeout(() => {
      this.copyMsg = '';
    }, 2400);
  }

  private getOverlayImages(): { groupKey: string; src: string; z: number }[] {
    return this.groups
      .map((g, index) => {
        const id = this.selections[g.key];
        const opt = g.options.find((o) => o.option_id === id);
        const src = opt?.overlay_image || '';
        return src ? { groupKey: g.key, src, z: index + 1 } : null;
      })
      .filter((x): x is { groupKey: string; src: string; z: number } => !!x);
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'acfg_');
    const animate = theme.animate && !prefersReducedMotion();
    const groups = this.groups;
    const currency = localizedString(c.acfg_currency as string) || 'ر.س';
    const basePrice = toNumber(c.acfg_base_price, 0);
    const finalPrice = calcFinalPrice(basePrice, groups, this.selections);
    const showPrice = isTruthy(c.acfg_show_price, true);
    const baseImage = extractImageUrl(c.acfg_base_image);
    const productUrl = extractLink(c.acfg_product_url);
    const previewSide = getRadioValue(c.acfg_preview_side, 'right');
    const waPhone = localizedString(c.acfg_whatsapp as string);
    const waMsg =
      localizedString(c.acfg_whatsapp_msg as string) ||
      t('أرغب في هذا التصميم', 'I would like this design');
    const waUrl = whatsAppLink(waPhone, waMsg);
    const overlays = this.getOverlayImages();
    const title = localizedString(c.acfg_title as string);
    const desc = localizedString(c.acfg_desc as string);
    const recommendLabel =
      localizedString(c.acfg_recommend_btn as string) ||
      t('الموصى به', 'Recommended');

    return html`
      <section
        class=${classMap({
          'fs-section': true,
          'fs-animate': animate,
        })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('مصممة العباية', 'Abaya configurator')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>`
            : nothing}

          ${groups.length
            ? html`<div class="acfg-studio">
                <div
                  class=${classMap({
                    'acfg-layout': true,
                    'acfg-layout--preview-left': previewSide === 'left',
                  })}
                >
                  <div class="acfg-controls">
                    ${this.hasRecommended()
                      ? html`<div class="acfg-toolbar">
                          <button
                            type="button"
                            class="acfg-recommend"
                            @click=${this.applyRecommended}
                          >
                            ${recommendLabel}
                          </button>
                          ${this.recommendFlash
                            ? html`<span class="acfg-flash" role="status">
                                ${t('تم التطبيق', 'Applied')}
                              </span>`
                            : nothing}
                        </div>`
                      : nothing}

                    ${groups.map((group) => {
                      const selected = group.options.find(
                        (o) => o.option_id === this.selections[group.key]
                      );
                      return html`
                        <div class="acfg-group">
                          <div class="acfg-group__head">
                            <h3 class="acfg-group__title">${group.name}</h3>
                            ${selected
                              ? html`<span class="acfg-group__pick">${selected.option_name}</span>`
                              : nothing}
                          </div>
                          <div class="acfg-options" role="list">
                            ${group.options.map((opt) => {
                              const pressed =
                                this.selections[group.key] === opt.option_id;
                              return html`
                                <button
                                  type="button"
                                  class="acfg-option"
                                  role="listitem"
                                  aria-pressed=${pressed ? 'true' : 'false'}
                                  aria-label=${opt.option_name}
                                  title=${opt.option_desc
                                    ? `${opt.option_name} — ${opt.option_desc}`
                                    : opt.option_name}
                                  @click=${() =>
                                    this.selectOption(group.key, opt.option_id)}
                                >
                                  ${opt.thumb_image
                                    ? html`<img
                                        class="acfg-option__media"
                                        src=${opt.thumb_image}
                                        alt=""
                                        loading="lazy"
                                        decoding="async"
                                      />`
                                    : html`<span
                                        class="acfg-option__media acfg-option__swatch"
                                        style=${opt.swatch_color
                                          ? styleMap({ background: opt.swatch_color })
                                          : nothing}
                                        aria-hidden="true"
                                      ></span>`}
                                  <span class="acfg-option__name">${opt.option_name}</span>
                                  ${opt.price_delta
                                    ? html`<span class="acfg-option__delta">
                                        +${formatPrice(opt.price_delta, currency)}
                                      </span>`
                                    : nothing}
                                </button>
                              `;
                            })}
                          </div>
                        </div>
                      `;
                    })}

                    <div class="acfg-summary">
                      ${showPrice
                        ? html`<p class="acfg-price">
                            <span>${t('السعر', 'Price')}</span>
                            ${formatPrice(finalPrice, currency)}
                          </p>`
                        : nothing}

                      <ul class="acfg-summary__list">
                        ${groups.map((g) => {
                          const id = this.selections[g.key];
                          const opt = g.options.find((o) => o.option_id === id);
                          return html`<li>
                            <span>${g.name}</span>
                            <strong>${opt?.option_name || '—'}</strong>
                          </li>`;
                        })}
                      </ul>

                      <div class="acfg-actions">
                        ${productUrl
                          ? html`<a class="fs-btn" href=${productUrl}>
                              ${localizedString(c.acfg_finish_btn as string) ||
                              t('فتح المنتج', 'Open product')}
                            </a>`
                          : nothing}
                        <button
                          type="button"
                          class="fs-btn fs-btn--ghost"
                          @click=${this.handleCopy}
                        >
                          ${t('نسخ التصميم', 'Copy design')}
                        </button>
                        ${waUrl
                          ? html`<a
                              class="fs-btn fs-btn--ghost"
                              href=${waUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              ${t('واتساب', 'WhatsApp')}
                            </a>`
                          : nothing}
                      </div>
                      ${this.copyMsg
                        ? html`<p class="acfg-copy-msg" role="status">${this.copyMsg}</p>`
                        : nothing}
                    </div>
                  </div>

                  <div class="acfg-preview-wrap">
                    <div
                      class=${classMap({
                        'acfg-preview': true,
                        'acfg-preview--pulse': this.previewPulse && animate,
                      })}
                      aria-label=${t('معاينة التصميم', 'Design preview')}
                    >
                      ${baseImage
                        ? html`<img
                            class="acfg-preview__base"
                            src=${baseImage}
                            alt=${title || t('عباءة أساسية', 'Base abaya')}
                            loading="eager"
                            decoding="async"
                          />`
                        : html`<div class="acfg-preview__empty">
                            ${t('أضيفي الصورة الأساسية', 'Add base image')}
                          </div>`}
                      ${overlays.map(
                        (o) => html`<img
                          class="acfg-preview__overlay"
                          style=${styleMap({ zIndex: String(o.z) })}
                          src=${o.src}
                          alt=""
                          loading="lazy"
                          decoding="async"
                        />`
                      )}
                    </div>
                  </div>
                </div>
              </div>`
            : nothing}
        </div>
      </section>
    `;
  }
}
