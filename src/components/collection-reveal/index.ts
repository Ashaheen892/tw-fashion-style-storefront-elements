import { css, html, LitElement, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import {
  extractLink,
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
  getCountdown,
  isVideoUrl,
  overlayOpacity,
  parseLaunchDate,
  parseRevealProducts,
} from './utils.js';
import type { CountdownParts } from './types.js';

export default class CollectionReveal extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private phase: 'pre' | 'curtain' | 'post' = 'pre';
  @state() private curtainOpen = false;
  @state() private countdown: CountdownParts = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalMs: 0,
  };

  private timerId: ReturnType<typeof setInterval> | null = null;
  private curtainTimer: ReturnType<typeof setTimeout> | null = null;
  private boundLangHandler = () => this.requestUpdate();
  private boundMotionHandler = () => this.requestUpdate();

  static styles = [sharedSectionCss, componentStyles, css`
    :host {
      direction: inherit;
    }
  `];

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('language-changed', this.boundLangHandler);
    this.motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.motionQuery.addEventListener('change', this.boundMotionHandler);
    this.syncTimer();
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLangHandler);
    this.motionQuery?.removeEventListener('change', this.boundMotionHandler);
    this.clearTimer();
    if (this.curtainTimer) clearTimeout(this.curtainTimer);
    super.disconnectedCallback();
  }

  private motionQuery: MediaQueryList | null = null;

  private clearTimer(): void {
    if (this.timerId != null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  private get cfg(): Record<string, unknown> {
    const value = this.config;
    return value && typeof value === 'object' ? value : {};
  }

  private syncTimer(): void {
    this.clearTimer();
    const launchAt = parseLaunchDate(this.cfg.cr_launch_at);
    if (!launchAt) {
      this.phase = 'post';
      return;
    }

    const tick = () => {
      const parts = getCountdown(launchAt);
      this.countdown = parts;
      if (parts.totalMs <= 0) {
        this.clearTimer();
        if (this.phase === 'pre') this.beginLaunchReveal();
      }
    };

    tick();
    if (this.phase === 'pre') {
      this.timerId = setInterval(tick, 1000);
    }
  }

  private beginLaunchReveal(): void {
    const animate = !prefersReducedMotion() && isTruthy(this.cfg.cr_animate, true);
    if (animate) {
      this.phase = 'curtain';
      this.curtainOpen = false;
      if (this.curtainTimer) clearTimeout(this.curtainTimer);
      // Paint closed curtain first, then open so the slide-up animation runs.
      void this.updateComplete.then(() => {
        requestAnimationFrame(() => {
          this.curtainOpen = true;
        });
      });
      this.curtainTimer = setTimeout(() => {
        this.phase = 'post';
        this.curtainOpen = false;
      }, 950);
      return;
    }
    this.phase = 'post';
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config')) {
      this.phase = 'pre';
      this.curtainOpen = false;
      if (this.curtainTimer) clearTimeout(this.curtainTimer);
      this.syncTimer();
    }
  }

  private renderTimerUnit(
    value: number,
    labelAr: string,
    labelEn: string,
    show: boolean
  ) {
    if (!show) return nothing;
    return html`
      <div class="cr-timer__unit" role="listitem">
        <span class="cr-timer__value" aria-hidden="true">${String(value).padStart(2, '0')}</span>
        <span class="cr-timer__label">${t(labelAr, labelEn)}</span>
      </div>
    `;
  }

  render() {
    const c = this.cfg;
    const theme = readSectionTheme(c, 'cr_');
    const animate = theme.animate && !prefersReducedMotion();
    const products = parseRevealProducts(c.cr_products);
    const ctaUrl = extractLink(c.cr_cta_url);
    const launchMedia = localizedString(c.cr_launch_media as string);
    const overlayAlpha = overlayOpacity(c.cr_overlay_opacity);
    const timerColor = String(c.cr_timer_color || theme.accent);
    const overlayColor = String(c.cr_overlay_color || '#2b211c');

    const showDays = isTruthy(c.cr_show_days, true);
    const showHours = isTruthy(c.cr_show_hours, true);
    const showMinutes = isTruthy(c.cr_show_minutes, true);
    const showSeconds = isTruthy(c.cr_show_seconds, true);

    return html`
      <section
        class=${classMap({
          'fs-section': true,
          'fs-animate': animate,
        })}
        style=${styleMap({
          ...themeStyleMap(theme),
          '--timer-color': timerColor,
        })}
        aria-live=${this.phase === 'post' ? 'polite' : 'off'}
      >
        <div class="fs-container">
          ${this.phase !== 'post'
            ? html`
                <div class="fs-header">
                  <h2 class="fs-title">${localizedString(c.cr_tease_title as string)}</h2>
                  <p class="fs-desc">${localizedString(c.cr_tease_desc as string)}</p>
                </div>
                <div class="cr-stage fs-card">
                  ${localizedString(c.cr_bg_image as string)
                    ? html`<img
                        class="cr-bg"
                        src=${localizedString(c.cr_bg_image as string)}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />`
                    : nothing}
                  <div
                    class="cr-overlay"
                    style=${styleMap({
                      background: overlayColor,
                      opacity: String(overlayAlpha),
                    })}
                  ></div>
                  <div class="cr-pre">
                    ${localizedString(c.cr_pre_text as string)
                      ? html`<p class="cr-pre-text">${localizedString(c.cr_pre_text as string)}</p>`
                      : nothing}
                    ${localizedString(c.cr_mystery_image as string)
                      ? html`<img
                          class=${classMap({
                            'cr-mystery': true,
                            'cr-mystery--breath': isTruthy(c.cr_breath_effect) && animate,
                          })}
                          src=${localizedString(c.cr_mystery_image as string)}
                          alt=${localizedString(c.cr_tease_title as string) || t('صورة المجموعة', 'Collection preview')}
                          loading="eager"
                          decoding="async"
                        />`
                      : nothing}
                    <div class="cr-timer" role="timer" aria-label=${t('العد التنازلي', 'Countdown')}>
                      ${this.renderTimerUnit(this.countdown.days, 'يوم', 'Days', showDays)}
                      ${this.renderTimerUnit(this.countdown.hours, 'ساعة', 'Hours', showHours)}
                      ${this.renderTimerUnit(this.countdown.minutes, 'دقيقة', 'Minutes', showMinutes)}
                      ${this.renderTimerUnit(this.countdown.seconds, 'ثانية', 'Seconds', showSeconds)}
                    </div>
                  </div>
                  ${this.phase === 'curtain'
                    ? html`<div
                        class=${classMap({
                          'cr-curtain': true,
                          'cr-curtain--open': this.curtainOpen,
                        })}
                        aria-hidden="true"
                      ></div>`
                    : nothing}
                </div>
              `
            : html`
                <div class="cr-post ${animate ? 'fs-animate' : ''}">
                  <div class="fs-header">
                    <h2 class="fs-title">${localizedString(c.cr_launch_title as string)}</h2>
                    <p class="fs-desc">${localizedString(c.cr_launch_desc as string)}</p>
                  </div>
                  ${launchMedia
                    ? isVideoUrl(launchMedia)
                      ? html`<video
                          class="cr-media"
                          src=${launchMedia}
                          controls
                          muted
                          playsinline
                          preload="metadata"
                          aria-label=${localizedString(c.cr_launch_title as string) || t('فيديو الإطلاق', 'Launch video')}
                        ></video>`
                      : html`<img
                          class="cr-media"
                          src=${launchMedia}
                          alt=${localizedString(c.cr_launch_title as string) || t('وسائط الإطلاق', 'Launch media')}
                          loading="eager"
                          decoding="async"
                        />`
                    : nothing}
                  ${ctaUrl
                    ? html`<div class="cr-cta-wrap">
                        <a class="fs-btn" href=${ctaUrl}>
                          ${localizedString(c.cr_cta_text as string) || t('اكتشفي المجموعة', 'Explore collection')}
                        </a>
                      </div>`
                    : nothing}
                  ${products.length
                    ? html`<div class="cr-products">
                        ${products.map(
                          (p) => html`
                            <article class="cr-product fs-card">
                              ${p.image
                                ? html`<img
                                    class="cr-product__img"
                                    src=${p.image}
                                    alt=${p.name || t('منتج', 'Product')}
                                    loading="lazy"
                                    decoding="async"
                                  />`
                                : nothing}
                              <h3 class="cr-product__name">${p.name}</h3>
                              ${p.desc ? html`<p class="cr-product__desc">${p.desc}</p>` : nothing}
                              ${p.url
                                ? html`<a class="fs-btn" href=${p.url}>
                                    ${p.btn_text || t('تسوقي الآن', 'Shop now')}
                                  </a>`
                                : nothing}
                            </article>
                          `
                        )}
                      </div>`
                    : nothing}
                </div>
              `}
        </div>
        ${renderCommerceOutcome(this.config || {}, 'cr_')}
      </section>
    `;
  }
}
