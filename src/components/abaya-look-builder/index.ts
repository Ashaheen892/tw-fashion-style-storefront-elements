import { css, html, LitElement, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import {
  copyText,
  formatPrice,
  getStoreCurrency,
  prefersReducedMotion,
  readSectionTheme,
  t,
  themeStyleMap,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import { addProductsToCart } from '../../utils/sallaApi.js';
import { renderCommerceOutcome } from '../../utils/commerceOutcome.js';
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { renderProductCard } from '../../utils/productCard.js';
import { componentStyles } from './styles.js';
import {
  buildLookGroups,
  buildLookSummary,
  defaultSelections,
  peekLookItems,
  resolveLookFromConfig,
} from './utils.js';
import type { LookGroup, LookItem } from './types.js';

export default class AbayaLookBuilder extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private activeGroup = '';
  @state() private selections: Record<string, string> = {};
  @state() private statusMsg = '';
  @state() private statusError = false;
  @state() private items: LookItem[] = [];
  @state() private loading = true;
  @state() private addingToCart = false;

  private boundLangHandler = () => this.requestUpdate();
  private statusTimer: ReturnType<typeof setTimeout> | null = null;
  private loadToken = 0;

  static styles = [sharedSectionCss, componentStyles, css`
    :host {
      direction: inherit;
    }

    .alb-loading {
      display: grid;
      place-items: center;
      min-height: 12rem;
      color: var(--muted-color, #7a6a62);
      font-size: 0.92rem;
    }

    .alb-actions .fs-btn:disabled {
      opacity: 0.65;
      cursor: wait;
    }

    .alb-copy-msg--error {
      background: color-mix(in srgb, #8f4a45 10%, #fff);
      color: #8f4a45;
    }
  `];

  private get currency(): string {
    return getStoreCurrency('ر.س');
  }

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('language-changed', this.boundLangHandler);
    void this.loadItems();
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLangHandler);
    if (this.statusTimer) clearTimeout(this.statusTimer);
    super.disconnectedCallback();
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config')) void this.loadItems();
  }

  private get groups(): LookGroup[] {
    return buildLookGroups(this.items);
  }

  private applyItems(resolved: LookItem[]): void {
    this.items = resolved;
    const groups = buildLookGroups(resolved);
    this.selections = defaultSelections(groups);
    if (!this.activeGroup || !groups.some((g) => g.key === this.activeGroup)) {
      this.activeGroup = groups[0]?.key || '';
    }
  }

  private async loadItems(): Promise<void> {
    const token = ++this.loadToken;
    const instant = peekLookItems(this.config || {});
    if (instant.length) {
      this.applyItems(instant);
      this.loading = false;
    } else {
      this.loading = true;
    }

    const resolved = await resolveLookFromConfig(this.config);
    if (token !== this.loadToken) return;

    this.applyItems(resolved);
    this.loading = false;
  }

  private selectItem(groupKey: string, itemId: string): void {
    this.selections = { ...this.selections, [groupKey]: itemId };
  }

  private getSelectedItems(): Array<{ group: LookGroup; item: LookItem }> {
    return this.groups
      .map((g) => {
        const id = this.selections[g.key];
        const item = g.items.find((i) => i.id === id);
        return item ? { group: g, item } : null;
      })
      .filter((x): x is { group: LookGroup; item: LookItem } => !!x);
  }

  private setStatus(msg: string, isError = false): void {
    this.statusMsg = msg;
    this.statusError = isError;
    if (this.statusTimer) clearTimeout(this.statusTimer);
    this.statusTimer = setTimeout(() => {
      this.statusMsg = '';
      this.statusError = false;
    }, 4200);
  }

  private async handleCopy(): Promise<void> {
    const currency = this.currency;
    const summary = buildLookSummary(this.groups, this.selections, currency);
    const text = [
      localizedString(this.config.alb_title as string) || t('إطلالة مختارة', 'Selected look'),
      '',
      ...summary.lines,
      '',
      `${t('الإجمالي', 'Total')}: ${formatPrice(summary.total, currency)}`,
      `${t('عدد القطع', 'Pieces')}: ${summary.count}`,
      summary.savings > 0
        ? `${t('التوفير', 'Savings')}: ${formatPrice(summary.savings, currency)}`
        : '',
    ]
      .filter(Boolean)
      .join('\n');

    const ok = await copyText(text);
    this.setStatus(
      ok
        ? t('تم نسخ التفاصيل', 'Details copied')
        : t('تعذر النسخ', 'Could not copy'),
      !ok
    );
  }

  private async handleAddToCart(): Promise<void> {
    if (this.addingToCart) return;

    const selected = this.getSelectedItems();
    const productIds = selected.map(({ item }) => item.product_id).filter(Boolean);

    if (!productIds.length) {
      this.setStatus(
        t('اختاري قطعاً من المتجر أولاً', 'Select store pieces first'),
        true
      );
      return;
    }

    this.addingToCart = true;
    const result = await addProductsToCart(productIds);
    this.addingToCart = false;

    if (result.ok) {
      this.setStatus(
        result.error === 'partial'
          ? t(
              'أُضيفت بعض القطع إلى السلة. تأكدي من السلة قبل الدفع.',
              'Some pieces were added. Check the cart before checkout.'
            )
          : t(
              `تمت إضافة ${result.added} قطعة إلى السلة`,
              `Added ${result.added} piece(s) to cart`
            )
      );
      return;
    }

    if (result.error === 'unavailable') {
      this.setStatus(
        t(
          'السلة غير متاحة في المعاينة. افتحي صفحة المنتج للإضافة من المتجر.',
          'Cart is unavailable in preview. Open the product page to add it in the store.'
        ),
        true
      );
      const url = selected.map(({ item }) => item.url).find(Boolean);
      if (url) window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }

    if (result.added > 0 || result.error === 'partial') {
      this.setStatus(
        t(
          `أُضيفت ${result.added} قطعة، وتعذّر إكمال الباقي`,
          `Added ${result.added} piece(s); some could not be added`
        ),
        true
      );
      return;
    }

    this.setStatus(
      t(
        'تعذّرت الإضافة. جرّبي فتح صفحة المنتج أو اختيار مقاس إن وُجد.',
        'Could not add. Try opening the product page or choosing a size if required.'
      ),
      true
    );
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'alb_');
    const animate = theme.animate && !prefersReducedMotion();
    const groups = this.groups;
    const currency = this.currency;
    const current = groups.find((g) => g.key === this.activeGroup) || groups[0];
    const selectedPairs = this.getSelectedItems();
    const selectedItems = selectedPairs.map((p) => p.item);
    const summary = buildLookSummary(groups, this.selections, currency);
    const title = localizedString(c.alb_title as string);
    const desc = localizedString(c.alb_desc as string);
    const firstUrl = selectedItems.find((i) => i.url)?.url;
    const canAddToCart = selectedItems.some((i) => i.product_id);

    return html`
      <section
        class=${classMap({
          'fs-section': true,
          'fs-animate': animate,
        })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('منسقة الإطلالة', 'Look builder')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>`
            : nothing}

          ${this.loading
            ? html`<div class="alb-studio">
                <div class="alb-loading" role="status">
                  ${t('جاري تحميل منتجات الإطلالة…', 'Loading look products…')}
                </div>
              </div>`
            : groups.length
              ? html`<div class="alb-studio">
                  <div class="alb-layout">
                    <div class="alb-picker">
                      <div
                        class="alb-tabs"
                        role="tablist"
                        aria-label=${t('تبويبات الإطلالة', 'Look tabs')}
                      >
                        ${groups.map(
                          (g) => html`
                            <button
                              type="button"
                              class="alb-tab"
                              role="tab"
                              aria-selected=${this.activeGroup === g.key ? 'true' : 'false'}
                              @click=${() => {
                                this.activeGroup = g.key;
                              }}
                            >
                              ${g.name}${this.selections[g.key] ? ' · ✓' : ''}
                            </button>
                          `
                        )}
                      </div>

                      ${current
                        ? html`
                            <p class="alb-panel-label">
                              ${t('اختاري من', 'Choose from')} ${current.name}
                            </p>
                            <div class="alb-grid" role="list">
                              ${current.items.map((item) => {
                                const selected = this.selections[current.key] === item.id;
                                return html`<div class="alb-slot" role="listitem">
                                  ${renderProductCard(
                                    {
                                      id: item.product_id,
                                      name: item.piece_name,
                                      image: item.image,
                                      url: item.url,
                                      price: item.price,
                                      old_price: item.old_price,
                                      rating: item.rating,
                                      subtitle: item.color_note,
                                    },
                                    {
                                      currency,
                                      selectable: true,
                                      selected,
                                      wishlist: true,
                                      viewLink: true,
                                      onSelect: () => this.selectItem(current.key, item.id),
                                    }
                                  )}
                                </div>`;
                              })}
                            </div>
                          `
                        : nothing}
                    </div>

                    <aside
                      class="alb-summary"
                      aria-label=${t('ملخص الإطلالة', 'Look summary')}
                    >
                      <div class="alb-summary__head">
                        <h3 class="alb-summary__title">
                          ${t('ملخص الإطلالة', 'Look summary')}
                        </h3>
                        <span class="alb-summary__badge">
                          ${summary.count}
                          ${t('قطع', 'pieces')}
                        </span>
                      </div>

                      ${selectedPairs.length
                        ? html`<div class="alb-pieces">
                            ${selectedPairs.map(
                              ({ group, item }) => html`
                                <div class="alb-piece">
                                  ${item.image
                                    ? html`<img
                                        class="alb-piece__thumb"
                                        src=${item.image}
                                        alt=""
                                        loading="lazy"
                                        decoding="async"
                                      />`
                                    : html`<span class="alb-piece__thumb" aria-hidden="true"></span>`}
                                  <span class="alb-piece__meta">
                                    <span class="alb-piece__group">${group.name}</span>
                                    <span class="alb-piece__name">${item.piece_name}</span>
                                  </span>
                                  ${item.price > 0
                                    ? html`<span class="alb-piece__price">
                                        ${formatPrice(item.price, currency)}
                                      </span>`
                                    : nothing}
                                  ${item.url
                                    ? html`<a
                                        class="alb-piece__link"
                                        href=${item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        ${t('عرض القطعة', 'View piece')}
                                      </a>`
                                    : nothing}
                                </div>
                              `
                            )}
                          </div>`
                        : html`<p class="alb-summary__empty">
                            ${t(
                              'اختاري قطعاً لبناء إطلالتك',
                              'Select pieces to build your look'
                            )}
                          </p>`}

                      <div class="alb-stats">
                        <div class="alb-stat">
                          <span class="alb-stat__label">${t('عدد القطع', 'Pieces')}</span>
                          <span class="alb-stat__value">${summary.count}</span>
                        </div>
                        <div class="alb-stat alb-stat--accent">
                          <span class="alb-stat__label">${t('الإجمالي', 'Total')}</span>
                          <span class="alb-stat__value">
                            ${formatPrice(summary.total, currency)}
                          </span>
                        </div>
                        ${summary.savings > 0
                          ? html`<div class="alb-stat alb-stat--wide alb-stat--accent">
                              <span class="alb-stat__label">${t('التوفير', 'Savings')}</span>
                              <span class="alb-stat__value">
                                ${formatPrice(summary.savings, currency)}
                              </span>
                            </div>`
                          : nothing}
                      </div>

                      <div class="alb-actions">
                        <button
                          type="button"
                          class="fs-btn"
                          ?disabled=${this.addingToCart || !canAddToCart}
                          @click=${this.handleAddToCart}
                        >
                          ${this.addingToCart
                            ? t('جاري الإضافة…', 'Adding…')
                            : localizedString(c.alb_cart_btn as string) ||
                              t('أضيفي إلى السلة', 'Add to cart')}
                        </button>
                        <button type="button" class="fs-btn fs-btn--ghost" @click=${this.handleCopy}>
                          ${localizedString(c.alb_copy_btn as string) ||
                          t('نسخ التفاصيل', 'Copy details')}
                        </button>
                        ${firstUrl
                          ? html`<a
                              class="fs-btn fs-btn--ghost"
                              href=${firstUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              ${localizedString(c.alb_view_btn as string) ||
                              t('عرض المختار', 'View selected')}
                            </a>`
                          : nothing}
                      </div>
                      ${this.statusMsg
                        ? html`<p
                            class=${classMap({
                              'alb-copy-msg': true,
                              'alb-copy-msg--error': this.statusError,
                            })}
                            role="status"
                          >
                            ${this.statusMsg}
                          </p>`
                        : nothing}
                    </aside>
                  </div>
                </div>`
              : html`<div class="fs-empty">
                  ${t(
                    'أضيفي تبويبات من إعدادات العنصر واختاري منتجات لكل تبويب',
                    'Add tabs in the element settings and pick products for each tab'
                  )}
                </div>`}
        </div>
        ${renderCommerceOutcome(this.config || {}, 'alb_')}
      </section>
    `;
  }
}
