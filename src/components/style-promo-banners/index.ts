import { css, html, LitElement, nothing } from 'lit';
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
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { componentStyles } from './styles.js';
import { parsePromoBanners } from './utils.js';
import type { PromoBanner } from './types.js';

const AUTOPLAY_MS = 5000;

export default class StylePromoBanners extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private activeIndex = 0;

  private boundLang = () => this.requestUpdate();
  private autoTimer: ReturnType<typeof setInterval> | null = null;
  private swipeStartX: number | null = null;

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
    this.syncAutoplay();
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLang);
    this.clearAutoplay();
    super.disconnectedCallback();
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config')) {
      const banners = this.banners;
      if (this.activeIndex >= banners.length) this.activeIndex = 0;
      this.syncAutoplay();
    }
  }

  private get banners(): PromoBanner[] {
    return parsePromoBanners(this.config?.stpb_items);
  }

  private get carouselMode(): boolean {
    return isTruthy(this.config?.stpb_autoplay, true) && this.banners.length > 1;
  }

  private clearAutoplay(): void {
    if (this.autoTimer) {
      clearInterval(this.autoTimer);
      this.autoTimer = null;
    }
  }

  private syncAutoplay(): void {
    this.clearAutoplay();
    if (!this.carouselMode) return;
    this.autoTimer = setInterval(() => this.next(), AUTOPLAY_MS);
  }

  private goTo(index: number): void {
    const len = this.banners.length;
    if (!len) return;
    this.activeIndex = ((index % len) + len) % len;
    this.syncAutoplay();
  }

  private prev(): void {
    this.goTo(this.activeIndex - 1);
  }

  private next(): void {
    this.goTo(this.activeIndex + 1);
  }

  private onPointerDown = (e: PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    this.swipeStartX = e.clientX;
    this.clearAutoplay();
  };

  private onPointerUp = (e: PointerEvent) => {
    const startX = this.swipeStartX;
    this.swipeStartX = null;
    this.syncAutoplay();
    if (startX == null) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) < 40) return;
    const rtl = getComputedStyle(this).direction === 'rtl';
    const forward = rtl ? dx > 0 : dx < 0;
    if (forward) this.next();
    else this.prev();
  };

  private onPointerCancel = () => {
    this.swipeStartX = null;
    this.syncAutoplay();
  };

  private onDragStart = (e: Event) => e.preventDefault();

  private renderBanner(banner: PromoBanner) {
    return html`
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
    `;
  }

  private renderCarousel(banners: PromoBanner[]) {
    const rtl = (getComputedStyle(this).direction || 'ltr') === 'rtl';
    const offset = this.activeIndex * 100 * (rtl ? 1 : -1);
    return html`
      <div
        class="stpb-carousel"
        role="region"
        aria-roledescription="carousel"
        @pointerdown=${this.onPointerDown}
        @pointerup=${this.onPointerUp}
        @pointercancel=${this.onPointerCancel}
        @dragstart=${this.onDragStart}
      >
        <div class="stpb-carousel__track" style=${styleMap({ transform: `translateX(${offset}%)` })}>
          ${banners.map(
            (banner, i) => html`<div
              class="stpb-carousel__slide"
              aria-hidden=${i === this.activeIndex ? 'false' : 'true'}
            >${this.renderBanner(banner)}</div>`
          )}
        </div>
        <div class="stpb-dots" role="tablist">
          ${banners.map(
            (_b, i) => html`<button
              type="button"
              role="tab"
              class=${classMap({ 'stpb-dot': true, 'is-active': i === this.activeIndex })}
              aria-selected=${i === this.activeIndex ? 'true' : 'false'}
              aria-label=${`${i + 1}`}
              @click=${() => this.goTo(i)}
            ></button>`
          )}
        </div>
      </div>
    `;
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
            ? this.carouselMode
              ? this.renderCarousel(banners)
              : html`<div class="stpb-banners">${banners.map((banner) => this.renderBanner(banner))}</div>`
            : html`<div class="fs-empty">${t('أضف بانرات ترويجية من إعدادات العنصر', 'Add promo banners from element settings')}</div>`}
          ${renderCommerceOutcome(this.config || {}, 'stpb_')}
        </div>
      </section>
    `;
  }
}
