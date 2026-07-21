import { css, html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
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
import { parsePromoBanners } from './utils.js';

export default class StylePromoBanners extends LitElement {
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

  private get banners() {
    return parsePromoBanners(this.config?.stpb_items);
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'stpb_');
    const animate = theme.animate && !prefersReducedMotion();
    const title = localizedString(c.stpb_title as never) || t('عروض مميزة', 'Featured Promotions');
    const desc = localizedString(c.stpb_desc as never);
    const showTitle = isTruthy(c.stpb_show_title, true);
    const banners = this.banners;

    return html`
      <section
        class=${classMap({ 'fs-section': true, 'fs-animate': animate, 'stpb-shell': true })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title}
      >
        <div class="fs-container">
          ${showTitle
            ? html`<header class="fs-header fs-header--editorial">
                <p class="fs-eyebrow">${t('حصريًا', 'Exclusive')}</p>
                <h2 class="fs-title">${title}</h2>
                <span class="fs-title-line" aria-hidden="true"></span>
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </header>`
            : nothing}

          ${banners.length
            ? html`
                <div class="stpb-banners">
                  ${banners.map(
                    (banner) => html`
                      <article class="stpb-banner" aria-label=${banner.headline || t('عرض', 'Promo')}>
                        <img class="stpb-banner__img" src=${banner.image} alt=${banner.headline || ''} loading="lazy" />
                        <div class="stpb-banner__shade" aria-hidden="true"></div>
                        <div class="stpb-banner__content">
                          ${banner.headline ? html`<h3 class="stpb-banner__headline">${banner.headline}</h3>` : nothing}
                          ${banner.subtitle ? html`<p class="stpb-banner__subtitle">${banner.subtitle}</p>` : nothing}
                          ${isValidHref(banner.ctaUrl) && banner.ctaLabel
                            ? html`<a
                                class="stpb-banner__cta"
                                href=${banner.ctaUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >${banner.ctaLabel}<span class="stpb-banner__cta-arrow" aria-hidden="true">←</span></a>`
                            : nothing}
                        </div>
                      </article>
                    `
                  )}
                </div>
              `
            : html`<div class="fs-empty">${t('أضف بانرات ترويجية من إعدادات العنصر', 'Add promo banners from element settings')}</div>`}
          ${renderCommerceOutcome(this.config || {}, 'stpb_')}
        </div>
      </section>
    `;
  }
}
