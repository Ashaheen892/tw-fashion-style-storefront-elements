import { css, html, LitElement, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import {
  formatPrice,
  prefersReducedMotion,
  readSectionTheme,
  t,
  themeStyleMap,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import { renderCommerceOutcome } from '../../utils/commerceOutcome.js';
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { componentStyles } from './styles.js';
import {
  buildCompareRows,
  getAttributeValue,
  getDiscountPercent,
  parseCriteria,
  peekCompareProducts,
  resolveCompareProducts,
  rowHighlights,
} from './utils.js';
import type { CompareProduct } from './types.js';

const MAX_COMPARE = 3;
const MIN_COMPARE = 2;

export default class AbayaComparisonArena extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private products: CompareProduct[] = [];
  @state() private productsLoading = false;
  @state() private selectedIds: string[] = [];
  @state() private showTable = false;

  private loadToken = 0;
  private boundLangHandler = () => this.requestUpdate();

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
    window.addEventListener('language-changed', this.boundLangHandler);
    void this.loadProducts();
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLangHandler);
    super.disconnectedCallback();
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config')) {
      this.selectedIds = [];
      this.showTable = false;
      void this.loadProducts();
    }
  }

  private get criteria() {
    return parseCriteria(this.config?.acm_criteria, this.products);
  }

  private get selected(): CompareProduct[] {
    return this.selectedIds
      .map((id) => this.products.find((p) => p.id === id))
      .filter((p): p is CompareProduct => !!p);
  }

  private get currency(): string {
    return String(this.config?.acm_currency || 'ر.س').trim() || 'ر.س';
  }

  private async loadProducts(): Promise<void> {
    const token = ++this.loadToken;
    const instant = peekCompareProducts(this.config?.acm_products);
    if (instant.length) {
      this.products = instant;
      this.productsLoading = false;
    } else {
      this.productsLoading = true;
    }

    const list = await resolveCompareProducts(this.config?.acm_products);
    if (token !== this.loadToken) return;

    this.products = list;
    this.productsLoading = false;
    this.selectedIds = this.selectedIds.filter((id) =>
      list.some((p) => p.id === id)
    );
    if (this.selectedIds.length < MIN_COMPARE) this.showTable = false;
  }

  private toggleProduct(id: string): void {
    if (this.selectedIds.includes(id)) {
      this.selectedIds = this.selectedIds.filter((x) => x !== id);
      if (this.selectedIds.length < MIN_COMPARE) this.showTable = false;
      return;
    }
    if (this.selectedIds.length >= MAX_COMPARE) return;
    this.selectedIds = [...this.selectedIds, id];
  }

  private removeProduct(id: string): void {
    this.selectedIds = this.selectedIds.filter((x) => x !== id);
    if (this.selectedIds.length < MIN_COMPARE) this.showTable = false;
  }

  private clearAll(): void {
    this.selectedIds = [];
    this.showTable = false;
  }

  private renderChoiceCard(product: CompareProduct, isSelected: boolean, disabled: boolean) {
    return html`
      <article
        class=${classMap({
          'acm-pick-slot': true,
          'is-disabled': disabled,
          'acm-pick-slot--selected': isSelected,
        })}
      >
        ${product.image
          ? html`<img
              class="acm-product-head__img"
              src=${product.image}
              alt=${product.name}
              loading="lazy"
              decoding="async"
            />`
          : nothing}
        <div class="acm-product-head">
          <span class="acm-product-head__name">${product.name || t('عنصر', 'Item')}</span>
          ${product.price > 0
            ? html`<strong>${formatPrice(product.price, this.currency)}</strong>`
            : nothing}
          ${product.old_price > product.price && product.price > 0
            ? html`<span class="acm-slot__empty">
                ${formatPrice(product.old_price, this.currency)}
              </span>`
            : nothing}
        </div>
        <div class="acm-actions">
          <button
            type="button"
            class="fs-btn ${isSelected ? 'fs-btn--ghost' : ''}"
            ?disabled=${disabled}
            @click=${() => {
              if (!disabled) this.toggleProduct(product.id);
            }}
          >
            ${isSelected ? t('إزالة من المقارنة', 'Remove') : t('اختيار للمقارنة', 'Compare')}
          </button>
          ${product.url
            ? html`<a class="fs-btn fs-btn--ghost" href=${product.url}>
                ${product.btn_text || t('عرض', 'View')}
              </a>`
            : nothing}
        </div>
      </article>
    `;
  }

  private formatCellValue(
    rowKey: string,
    product: CompareProduct,
    criterionKey?: string
  ): string {
    if (rowKey === 'price') {
      return product.price > 0 ? formatPrice(product.price, this.currency) : '—';
    }
    if (rowKey === 'discount') {
      const pct = getDiscountPercent(product.price, product.old_price);
      return pct > 0 ? `${pct}%` : '—';
    }
    if (criterionKey) {
      const criterion = this.criteria.find((c) => c.key === criterionKey);
      if (criterion) {
        return getAttributeValue(product, criterion) || '—';
      }
    }
    return '—';
  }

  private _renderSlots(selected: CompareProduct[]) {
    return html`
      <div class="acm-slots" aria-label=${t('خانات المقارنة', 'Comparison slots')}>
        ${Array.from({ length: MAX_COMPARE }, (_, i) => {
          const product = selected[i];
          return html`
            <div
              class=${classMap({
                'acm-slot': true,
                'acm-slot--filled': !!product,
              })}
            >
              <span class="acm-slot__num" aria-hidden="true">${i + 1}</span>
              ${product
                ? html`
                    ${product.image
                      ? html`<img
                          class="acm-slot__thumb"
                          src=${product.image}
                          alt=""
                          loading="lazy"
                          decoding="async"
                        />`
                      : nothing}
                    <span class="acm-slot__meta">
                      <span class="acm-slot__name">${product.name}</span>
                    </span>
                    <button
                      type="button"
                      class="acm-slot__remove"
                      aria-label=${t('إزالة', 'Remove') + ' ' + product.name}
                      @click=${() => this.removeProduct(product.id)}
                    >
                      ×
                    </button>
                  `
                : html`<span class="acm-slot__empty">
                    ${t('فارغة', 'Empty')}
                  </span>`}
            </div>
          `;
        })}
      </div>
    `;
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'acm_');
    const animate = theme.animate && !prefersReducedMotion();
    const products = this.products;
    const selected = this.selected;
    const currency = this.currency;
    const atMax = this.selectedIds.length >= MAX_COMPARE;
    const canCompare = selected.length >= MIN_COMPARE;
    const title = localizedString(c.acm_title as string);
    const desc = localizedString(c.acm_desc as string);
    const criteria = this.criteria;
    const rows = buildCompareRows(criteria);

    return html`
      <section
        class=${classMap({
          'fs-section': true,
          'fs-animate': animate,
        })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('مقارنة العبايات', 'Compare abayas')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<div class="fs-header fs-header--editorial">
                <p class="fs-eyebrow">${t('مقارنة ذكية', 'Smart compare')}</p>
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                <span class="fs-title-line" aria-hidden="true"></span>
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>`
            : nothing}

          ${this.productsLoading
            ? html`<div class="fs-empty" role="status">
                ${t('جاري تحميل المنتجات...', 'Loading products...')}
              </div>`
            : !products.length
              ? html`<div class="fs-empty" role="status">
                  ${t(
                    'أضف منتجات المقارنة من إعدادات العنصر لعرضها هنا.',
                    'Add comparison products from the element settings to show them here.'
                  )}
                </div>`
              : html`<div class="acm-studio">
                  <div class="acm-toolbar">
                    <p class="acm-hint">
                      ${localizedString(c.acm_select_hint as string) ||
                      t(
                        'اختر من 2 إلى 3 عبايات ثم اضغط قارن',
                        'Pick 2 to 3 abayas, then tap Compare'
                      )}
                    </p>
                    <span class="acm-count" aria-live="polite">
                      ${selected.length} / ${MAX_COMPARE}
                      ${t('مختارة', 'selected')}
                    </span>
                  </div>

                  ${this._renderSlots(selected)}

                  <div class="acm-picker" role="list">
                    ${products.map((p) => {
                      const isSelected = this.selectedIds.includes(p.id);
                      const disabled = !isSelected && atMax;
                      return html`
                        <div role="listitem">
                          ${this.renderChoiceCard(p, isSelected, disabled)}
                        </div>
                      `;
                    })}
                  </div>

                  <div class="acm-actions">
                    <button
                      type="button"
                      class="fs-btn"
                      ?disabled=${!canCompare}
                      @click=${() => {
                        this.showTable = true;
                      }}
                    >
                      ${localizedString(c.acm_compare_btn as string) ||
                      t('قارني', 'Compare')}
                    </button>
                    <button
                      type="button"
                      class="fs-btn fs-btn--ghost"
                      ?disabled=${!selected.length}
                      @click=${this.clearAll}
                    >
                      ${localizedString(c.acm_clear_btn as string) ||
                      t('مسح الكل', 'Clear all')}
                    </button>
                  </div>

                  ${this.showTable && canCompare
                    ? html`
                        <div class="acm-table-wrap">
                          <p class="acm-user-hint">
                            ${localizedString(c.acm_user_hint as string) ||
                            t(
                              'السعر من المتجر تلقائيًا — وبقية المقارنة من إعدادات كل منتج',
                              'Price comes from the store — other rows come from each product’s settings'
                            )}
                          </p>
                          <div class="acm-legend" aria-hidden="true">
                            <span class="acm-legend__item">
                              <span class="acm-legend__swatch acm-legend__swatch--best"></span>
                              ${t('أفضل قيمة', 'Best value')}
                            </span>
                            <span class="acm-legend__item">
                              <span class="acm-legend__swatch acm-legend__swatch--same"></span>
                              ${t('متطابق', 'Identical')}
                            </span>
                          </div>
                          <table class="acm-table">
                            <thead>
                              <tr>
                                <th class="acm-table__label">${t('الخاصية', 'Attribute')}</th>
                                ${selected.map(
                                  (p) => html`
                                    <th>
                                      <div class="acm-product-head">
                                        ${p.image
                                          ? html`<img
                                              class="acm-product-head__img"
                                              src=${p.image}
                                              alt=${p.name}
                                              loading="lazy"
                                              decoding="async"
                                            />`
                                          : nothing}
                                        <span class="acm-product-head__name">${p.name}</span>
                                        ${p.url
                                          ? html`<a class="fs-btn fs-btn--ghost" href=${p.url}>
                                              ${p.btn_text || t('عرض', 'View')}
                                            </a>`
                                          : nothing}
                                      </div>
                                    </th>
                                  `
                                )}
                              </tr>
                            </thead>
                            <tbody>
                              ${rows.map((row) => {
                                const hl = rowHighlights(row, selected, criteria);
                                return html`
                                  <tr>
                                    <th class="acm-table__label" scope="row">
                                      ${t(row.labelAr, row.labelEn)}
                                    </th>
                                    ${selected.map((p) => {
                                      const same = hl.identical.has(p.id);
                                      const best =
                                        hl.bestPriceId === p.id ||
                                        hl.bestDiscountId === p.id;
                                      const value = this.formatCellValue(
                                        row.key,
                                        p,
                                        row.criterionKey
                                      );
                                      return html`
                                        <td
                                          class=${classMap({
                                            'acm-cell--same': same,
                                            'acm-cell--best': best,
                                          })}
                                        >
                                          ${value}
                                          ${best
                                            ? html`<span class="acm-cell__badge">
                                                ${t('الأفضل', 'Best')}
                                              </span>`
                                            : nothing}
                                        </td>
                                      `;
                                    })}
                                  </tr>
                                `;
                              })}
                            </tbody>
                          </table>
                        </div>
                      `
                    : nothing}
                </div>`}
        </div>
        ${renderCommerceOutcome(this.config || {}, 'acm_')}
      </section>
    `;
  }
}
