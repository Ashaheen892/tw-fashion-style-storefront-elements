import { css, html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ref } from 'lit/directives/ref.js';
import { styleMap } from 'lit/directives/style-map.js';
import { enableDragScroll } from '../../utils/dragScroll.js';
import {
  isTruthy,
  isValidHref,
  prefersReducedMotion,
  readSectionTheme,
  t,
  themeStyleMap,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import { renderCommerceOutcome } from '../../utils/commerceOutcome.js';
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { componentStyles } from './styles.js';
import { parseCategoryTiles } from './utils.js';

export default class StyleCategories extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

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

  private get tiles() {
    return parseCategoryTiles(this.config?.stc_items);
  }

  private openTile(url: string): void {
    if (!isValidHref(url)) return;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'stc_');
    const animate = theme.animate && !prefersReducedMotion();
    const title = localizedString(c.stc_title as never) || t('تصنيفات الأزياء', 'Style Categories');
    const desc = localizedString(c.stc_desc as never);
    const showTitle = isTruthy(c.stc_show_title, true);
    const layout = String(c.stc_layout || 'grid');
    const tiles = this.tiles;

    return html`
      <section
        class=${classMap({ 'fs-section': true, 'fs-animate': animate, 'stc-shell': true })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title}
      >
        <div class="fs-container">
          ${showTitle
            ? html`<header class="stc-header">
                <p class="stc-eyebrow">${t('تشكيلتنا', 'Our collection')}</p>
                <h2 class="stc-title">${title}</h2>
                <span class="stc-title-line" aria-hidden="true"></span>
                ${desc ? html`<p class="stc-desc">${desc}</p>` : nothing}
              </header>`
            : nothing}

          ${tiles.length
            ? html`
                <div
                  class=${classMap({ 'stc-grid': layout === 'grid', 'stc-slider': layout === 'slider' })}
                  role="list"
                  ${ref((el) => {
                    if (el instanceof HTMLElement && el.classList.contains('stc-slider')) {
                      enableDragScroll(el);
                    }
                  })}
                >
                  ${tiles.map(
                    (tile) => html`
                      <a
                        class="stc-tile"
                        role="listitem"
                        href=${isValidHref(tile.url) ? tile.url : nothing}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabindex="0"
                        aria-label=${tile.title || t('تصنيف', 'Category')}
                        @click=${(e: Event) => {
                          if (!isValidHref(tile.url)) e.preventDefault();
                        }}
                      >
                        <img class="stc-tile__img" src=${tile.image} alt=${tile.title || ''} loading="lazy" />
                        <div class="stc-tile__shade" aria-hidden="true"></div>
                        <div class="stc-tile__label">
                          ${tile.title}
                          <span class="stc-tile__rule" aria-hidden="true"></span>
                        </div>
                      </a>
                    `
                  )}
                </div>
              `
            : html`<div class="stc-empty">${t('أضف تصنيفات من إعدادات العنصر', 'Add categories from element settings')}</div>`}
          ${renderCommerceOutcome(this.config || {}, 'stc_')}
        </div>
      </section>
    `;
  }
}
