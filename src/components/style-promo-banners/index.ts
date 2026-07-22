import { html, LitElement, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
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
import {
  Autoplay,
  destroyFsSwiper,
  fsSwiperCss,
  mountFsSwiper,
  type Swiper,
} from '../../utils/fsSwiper.js';
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { componentStyles } from './styles.js';
import { parsePromoBanners } from './utils.js';
import type { PromoBanner } from './types.js';

const AUTOPLAY_MS = 5000;

export default class StylePromoBanners extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private swiperReady = false;

  private boundLang = () => {
    this.requestUpdate();
    queueMicrotask(() => this.remountSwiper());
  };
  private swiper: Swiper | null = null;
  private remountTimer: ReturnType<typeof setTimeout> | null = null;

  static styles = [sharedSectionCss, fsSwiperCss, componentStyles];

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('language-changed', this.boundLang);
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLang);
    if (this.remountTimer) clearTimeout(this.remountTimer);
    destroyFsSwiper(this.swiper);
    this.swiper = null;
    super.disconnectedCallback();
  }

  protected firstUpdated(): void {
    this.remountSwiper();
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config')) this.scheduleRemount();
  }

  private scheduleRemount(): void {
    if (this.remountTimer) clearTimeout(this.remountTimer);
    this.remountTimer = setTimeout(() => this.remountSwiper(), 0);
  }

  private remountSwiper(): void {
    destroyFsSwiper(this.swiper);
    this.swiper = null;
    this.swiperReady = false;

    const banners = this.banners;
    const root = this.renderRoot.querySelector('.stpb-swiper') as HTMLElement | null;
    if (!root || banners.length < 1) return;

    const multi = banners.length > 1;
    const autoplayOn =
      multi && isTruthy(this.config?.stpb_autoplay, true) && !prefersReducedMotion();
    const pagEl = this.renderRoot.querySelector('.stpb-dots') as HTMLElement | null;
    const rtl = getComputedStyle(this).direction !== 'ltr';

    this.swiper = mountFsSwiper(root, {
      rtl,
      modules: autoplayOn ? [Autoplay] : [],
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 480,
      loop: multi,
      watchOverflow: true,
      pagination: multi && pagEl
        ? {
            el: pagEl,
            clickable: true,
            bulletClass: 'stpb-dot',
            bulletActiveClass: 'is-active',
          }
        : undefined,
      autoplay: autoplayOn
        ? {
            delay: AUTOPLAY_MS,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }
        : false,
    });

    this.swiperReady = true;
  }

  private get banners(): PromoBanner[] {
    return parsePromoBanners(this.config?.stpb_items);
  }

  private renderBanner(banner: PromoBanner, index: number) {
    return html`
      <article class="stpb-banner" aria-label=${banner.headline || t('عرض', 'Promo')}>
        <img
          class="stpb-banner__img"
          src=${banner.image}
          alt=${banner.headline || ''}
          loading=${index === 0 ? 'eager' : 'lazy'}
          decoding="async"
          draggable="false"
        />
        <div class="stpb-banner__shade" aria-hidden="true"></div>
        <div class="stpb-banner__content">
          ${banner.headline
            ? html`<h3 class="stpb-banner__headline">${banner.headline}</h3>`
            : nothing}
          ${banner.subtitle
            ? html`<p class="stpb-banner__subtitle">${banner.subtitle}</p>`
            : nothing}
          ${isValidHref(banner.ctaUrl) && banner.ctaLabel
            ? html`<a
                class="stpb-banner__cta"
                href=${banner.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                draggable="false"
              >${banner.ctaLabel}<span class="stpb-banner__cta-arrow" aria-hidden="true">←</span></a>`
            : nothing}
        </div>
      </article>
    `;
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'stpb_');
    const animate = theme.animate && !prefersReducedMotion();
    const title =
      localizedString(c.stpb_title as never) || t('عروض مميزة', 'Featured Promotions');
    const desc = localizedString(c.stpb_desc as never);
    const showTitle = isTruthy(c.stpb_show_title, true);
    const banners = this.banners;
    const multi = banners.length > 1;

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
                <div class="stpb-carousel">
                  <div
                    class=${classMap({
                      swiper: true,
                      'stpb-swiper': true,
                      'is-ready': this.swiperReady,
                    })}
                    role="region"
                    aria-roledescription="carousel"
                    aria-label=${title}
                  >
                    <div class="swiper-wrapper">
                      ${banners.map(
                        (banner, i) => html`
                          <div class="swiper-slide stpb-slide">
                            ${this.renderBanner(banner, i)}
                          </div>
                        `
                      )}
                    </div>
                  </div>

                  ${multi
                    ? html`<div
                        class="stpb-dots"
                        aria-label=${t('شرائح العرض', 'Promo slides')}
                      ></div>`
                    : nothing}
                </div>
              `
            : html`<div class="fs-empty">
                ${t(
                  'أضف بانرات ترويجية من إعدادات العنصر',
                  'Add promo banners from element settings'
                )}
              </div>`}

          ${renderCommerceOutcome(this.config || {}, 'stpb_')}
        </div>
      </section>
    `;
  }
}
