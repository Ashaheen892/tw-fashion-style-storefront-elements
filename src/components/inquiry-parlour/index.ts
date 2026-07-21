import { css, html, LitElement, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import {
  isTruthy,
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
  filterInquiries,
  parseInquiries,
  uniqueCategories,
} from './utils.js';

export default class InquiryParlour extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private openId = '';
  @state() private query = '';
  @state() private category = '';

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
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLang);
    super.disconnectedCallback();
  }

  private get items() {
    return parseInquiries(this.config?.ip_items);
  }

  private get filtered() {
    return filterInquiries(this.items, this.query, this.category);
  }

  private toggle(id: string): void {
    this.openId = this.openId === id ? '' : id;
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'ip_');
    const animate = theme.animate && !prefersReducedMotion();
    const title = localizedString(c.ip_title as string);
    const desc = localizedString(c.ip_desc as string);
    const showSearch = isTruthy(c.ip_show_search, true);
    const items = this.items;
    const filtered = this.filtered;
    const cats = uniqueCategories(items);

    if (!items.length) {
      return html`<div class="fs-empty" role="status">
        ${t('أضف أسئلة وأجوبة في الإعدادات', 'Add questions and answers in settings')}
      </div>`;
    }

    return html`
      <section
        class=${classMap({
          'fs-section': true,
          'fs-animate': animate,
        })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('ديوان الأسئلة', 'Questions Diwan')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<header class="fs-header fs-header--editorial">
                <p class="fs-eyebrow">${t('أسئلة شائعة', 'FAQ')}</p>
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                <span class="fs-title-line" aria-hidden="true"></span>
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </header>`
            : nothing}

          <div class="ip-shell">
            ${showSearch || cats.length
              ? html`<div class="ip-toolbar">
                  ${showSearch
                    ? html`<input
                        class="ip-search"
                        type="search"
                        .value=${this.query}
                        placeholder=${t('ابحث في الأسئلة…', 'Search questions…')}
                        aria-label=${t('بحث', 'Search')}
                        @input=${(e: Event) => {
                          this.query = (e.target as HTMLInputElement).value;
                        }}
                      />`
                    : nothing}
                  ${cats.length
                    ? html`<div class="ip-cats" role="group" aria-label=${t('التصنيفات', 'Categories')}>
                        <button
                          type="button"
                          class="ip-cat"
                          aria-pressed=${this.category === '' ? 'true' : 'false'}
                          @click=${() => {
                            this.category = '';
                          }}
                        >
                          ${t('الكل', 'All')}
                        </button>
                        ${cats.map(
                          (cat) => html`
                            <button
                              type="button"
                              class="ip-cat"
                              aria-pressed=${this.category === cat ? 'true' : 'false'}
                              @click=${() => {
                                this.category = cat;
                              }}
                            >
                              ${cat}
                            </button>
                          `
                        )}
                      </div>`
                    : nothing}
                </div>`
              : nothing}

            ${filtered.length
              ? html`<div class="ip-list">
                  ${filtered.map(
                    (item) => html`
                      <article
                        class=${classMap({
                          'ip-item': true,
                          'ip-item--open': this.openId === item.id,
                        })}
                      >
                        <button
                          type="button"
                          class="ip-q"
                          aria-expanded=${this.openId === item.id ? 'true' : 'false'}
                          @click=${() => this.toggle(item.id)}
                        >
                          <span>
                            <span class="ip-q__text">${item.question}</span>
                            ${item.category
                              ? html`<span class="ip-q__meta">${item.category}</span>`
                              : nothing}
                          </span>
                          <span class="ip-q__icon" aria-hidden="true">+</span>
                        </button>
                        ${this.openId === item.id
                          ? html`<div class="ip-a">
                              <p>${item.answer}</p>
                            </div>`
                          : nothing}
                      </article>
                    `
                  )}
                </div>`
              : html`<div class="fs-empty" role="status">
                  ${t('لا توجد نتائج مطابقة', 'No matching results')}
                </div>`}
          </div>
        </div>
        ${renderCommerceOutcome(this.config || {}, 'ip_')}
      </section>
    `;
  }
}
