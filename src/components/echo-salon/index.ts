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
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { componentStyles } from './styles.js';
import { averageRating, parseReviews } from './utils.js';
import type { EchoReview } from './types.js';

export default class EchoSalon extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private activeId = '';

  private boundLang = () => this.requestUpdate();
  private autoTimer: ReturnType<typeof setInterval> | null = null;

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
    this.ensureActive();
    this.syncAutoplay();
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLang);
    this.clearAutoplay();
    super.disconnectedCallback();
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config')) {
      this.ensureActive();
      this.syncAutoplay();
    }
  }

  private get reviews() {
    return parseReviews(this.config?.es_reviews);
  }

  private get active(): EchoReview | null {
    return this.reviews.find((r) => r.id === this.activeId) || this.reviews[0] || null;
  }

  private ensureActive(): void {
    const list = this.reviews;
    if (!list.length) {
      this.activeId = '';
      return;
    }
    if (!list.some((r) => r.id === this.activeId)) {
      this.activeId = list[0].id;
    }
  }

  private clearAutoplay(): void {
    if (this.autoTimer) {
      clearInterval(this.autoTimer);
      this.autoTimer = null;
    }
  }

  private syncAutoplay(): void {
    this.clearAutoplay();
    const auto = isTruthy(this.config?.es_autoplay, true) && !prefersReducedMotion();
    if (!auto || this.reviews.length < 2) return;
    this.autoTimer = setInterval(() => this.next(), 5500);
  }

  private next(): void {
    const list = this.reviews;
    if (list.length < 2) return;
    const idx = list.findIndex((r) => r.id === this.activeId);
    const next = list[(idx + 1) % list.length];
    this.activeId = next.id;
  }

  private select(id: string): void {
    this.activeId = id;
    this.syncAutoplay();
  }

  private renderStars(rating: number) {
    return html`
      <span class="es-stars" aria-label=${`${rating} / 5`}>
        ${[1, 2, 3, 4, 5].map(
          (n) => html`<span class=${n <= rating ? '' : 'es-stars--muted'}>★</span>`
        )}
      </span>
    `;
  }

  private renderAvatar(review: EchoReview, large = false) {
    const cls = large ? 'es-avatar' : 'es-avatar';
    if (review.avatar) {
      return html`<img class=${cls} src=${review.avatar} alt="" loading="lazy" decoding="async" />`;
    }
    const initial = (review.name || '?').trim().charAt(0);
    return html`<span class="es-avatar es-avatar--placeholder" aria-hidden="true">${initial}</span>`;
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'es_');
    const animate = theme.animate && !prefersReducedMotion();
    const reviews = this.reviews;
    const active = this.active;
    const title = localizedString(c.es_title as string);
    const desc = localizedString(c.es_desc as string);
    const avg = averageRating(reviews);

    if (!reviews.length) {
      return html`<div class="fs-empty" role="status">
        ${t('أضيفي شهادات الزبونات في الإعدادات', 'Add customer echoes in settings')}
      </div>`;
    }

    return html`
      <section
        class=${classMap({
          'fs-section': true,
          'fs-animate': animate,
        })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('رواق الشهادات', 'Testimony Arcade')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<header class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </header>`
            : nothing}

          <div class="es-shell">
            ${active
              ? html`<article class="es-featured" aria-live="polite">
                  <span class="es-featured__mark" aria-hidden="true">”</span>
                  <p class="es-featured__quote">${active.quote}</p>
                  <div class="es-featured__meta">
                    ${this.renderAvatar(active, true)}
                    <div class="es-person">
                      <strong>${active.name}</strong>
                      ${active.role
                        ? html`<span>${active.role}</span>`
                        : nothing}
                      ${active.product_note
                        ? html`<span>${active.product_note}</span>`
                        : nothing}
                    </div>
                    ${this.renderStars(active.rating)}
                    ${avg > 0
                      ? html`<div class="es-score">
                          <strong>${avg}</strong>
                          <span>/ 5 · ${reviews.length} ${t('صدى', 'echoes')}</span>
                        </div>`
                      : nothing}
                  </div>
                </article>`
              : nothing}

            <div class="es-rail" role="list">
              ${reviews.map(
                (review) => html`
                  <button
                    type="button"
                    class=${classMap({
                      'es-card': true,
                      'es-card--active': review.id === this.activeId,
                    })}
                    role="listitem"
                    aria-pressed=${review.id === this.activeId ? 'true' : 'false'}
                    @click=${() => this.select(review.id)}
                  >
                    ${this.renderStars(review.rating)}
                    <p class="es-card__quote">${review.quote}</p>
                    ${review.product_note
                      ? html`<p class="es-card__note">${review.product_note}</p>`
                      : nothing}
                    <div class="es-card__foot">
                      ${this.renderAvatar(review)}
                      <div class="es-person">
                        <strong>${review.name}</strong>
                        ${review.role ? html`<span>${review.role}</span>` : nothing}
                      </div>
                    </div>
                  </button>
                `
              )}
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
