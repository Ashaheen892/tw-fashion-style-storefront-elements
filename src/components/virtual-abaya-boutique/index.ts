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
import { ensureConfig, parseHotspots } from './utils.js';
import type { Hotspot } from './types.js';

export default class VirtualAbayaBoutique extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private activeId: string | null = null;

  private boundLangHandler = () => this.requestUpdate();
  private boundKeyHandler = (e: KeyboardEvent) => {
    if (e.key !== 'Escape' || !this.activeId) return;
    this.activeId = null;
  };

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
    window.addEventListener('keydown', this.boundKeyHandler);
    this.ensureActiveSpot();
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLangHandler);
    window.removeEventListener('keydown', this.boundKeyHandler);
    super.disconnectedCallback();
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config')) {
      this.ensureActiveSpot();
    }
  };

  private ensureActiveSpot(): void {
    const hotspots = this.hotspots;
    if (!hotspots.length) {
      this.activeId = null;
      return;
    }
    if (!this.activeId || !hotspots.some((h) => h.spot_id === this.activeId)) {
      this.activeId = hotspots[0].spot_id;
    }
  }

  private get cfg() {
    return ensureConfig(this.config);
  }

  private get hotspots() {
    return parseHotspots(this.cfg.vab_hotspots);
  }

  private selectSpot(id: string): void {
    this.activeId = id;
    const cards = this.renderRoot.querySelectorAll<HTMLElement>('[data-spot-id]');
    const card = Array.from(cards).find((el) => el.dataset.spotId === id);
    card?.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'nearest',
    });
  }

  private stopLinkClick(e: Event): void {
    e.stopPropagation();
  }

  private zoneHref(spot: Hotspot): string {
    return isValidHref(spot.spot_url) ? spot.spot_url : '';
  }

  render() {
    const c = this.cfg;
    const theme = readSectionTheme(c, 'vab_');
    const animate = theme.animate && !prefersReducedMotion();
    const hotspots = this.hotspots;
    const enablePulse = isTruthy(c.vab_enable_pulse, true);
    const mapImage = String(c.vab_map_image || '').trim();
    const title = localizedString(c.vab_title as string);
    const desc = localizedString(c.vab_desc as string);
    const active =
      hotspots.find((h) => h.spot_id === this.activeId) || hotspots[0] || null;

    if (!hotspots.length && !mapImage) {
      return html`<div class="fs-empty" role="status">
        ${t('أضيفي صورة البوتيك ومناطق التفاعل', 'Add boutique image and interactive zones')}
      </div>`;
    }

    return html`
      <section
        class=${classMap({
          'fs-section': true,
          'fs-animate': animate,
        })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('بوتيك العبايات التفاعلي', 'Virtual abaya boutique')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<header class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </header>`
            : nothing}

          <div class="vab-shell">
            <div class="vab-map-panel">
              ${mapImage
                ? html`<img
                    class="vab-map"
                    src=${mapImage}
                    alt=${title || t('خريطة البوتيك', 'Boutique map')}
                    loading="eager"
                    decoding="async"
                  />`
                : html`<div class="fs-empty" style="min-height:280px;place-content:center;">
                    ${t('أضيفي صورة الخريطة', 'Add a map image')}
                  </div>`}
              <div class="vab-map-veil" aria-hidden="true"></div>

              ${active
                ? html`<div class="vab-map-caption">
                    <strong>${active.spot_name}</strong>
                    <span>
                      ${t(
                        'اضغطي على النقاط أو البطاقات للاستكشاف',
                        'Tap pins or cards to explore'
                      )}
                    </span>
                  </div>`
                : nothing}

              ${hotspots.map(
                (spot, index) => html`
                  <button
                    type="button"
                    class=${classMap({
                      'vab-hotspot': true,
                      'vab-hotspot--pulse': enablePulse && animate,
          'fs-animate': animate,
                    })}
                    style=${styleMap({
                      left: `${spot.pos_x}%`,
                      top: `${spot.pos_y}%`,
                      '--spot-color': spot.spot_color,
                    })}
                    aria-label=${spot.spot_name}
                    aria-pressed=${this.activeId === spot.spot_id ? 'true' : 'false'}
                    @click=${() => this.selectSpot(spot.spot_id)}
                  >
                    <span class="vab-hotspot__index">${index + 1}</span>
                  </button>
                `
              )}
            </div>

            <aside class="vab-gallery" aria-label=${t('بطاقات المناطق', 'Zone cards')}>
              <div class="vab-gallery__head">
                <h3>${t('مناطق البوتيك', 'Boutique zones')}</h3>
                <span class="vab-gallery__count">
                  ${hotspots.length}
                  ${t('منطقة', 'zones')}
                </span>
              </div>

              ${hotspots.length
                ? html`
                    <div class="vab-cards" role="list">
                      ${hotspots.map((spot, index) =>
                        this.renderZoneCard(spot, index, animate)
                      )}
                    </div>

                    ${active ? this.renderActiveDetail(active) : nothing}
                  `
                : html`<div class="fs-empty">
                    ${t('لا توجد مناطق مضافة بعد', 'No zones added yet')}
                  </div>`}
            </aside>
          </div>
        </div>
        ${renderCommerceOutcome(this.config || {}, 'vab_')}
      </section>
    `;
  }

  private renderZoneCard(spot: Hotspot, index: number, animate: boolean) {
    const active = this.activeId === spot.spot_id;
    const href = this.zoneHref(spot);
    return html`
      <div
        class=${classMap({
          'vab-card': true,
          'vab-card--active': active,
          'fs-animate': animate,
        })}
        data-spot-id=${spot.spot_id}
        role="listitem"
        tabindex="0"
        aria-pressed=${active ? 'true' : 'false'}
        @click=${() => this.selectSpot(spot.spot_id)}
        @keydown=${(e: KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.selectSpot(spot.spot_id);
          }
        }}
      >
        <div class="vab-card__media">
          ${spot.spot_image
            ? html`<img
                src=${spot.spot_image}
                alt=${spot.spot_name}
                loading=${index === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />`
            : nothing}
          <span
            class="vab-card__dot"
            style=${styleMap({ '--spot-color': spot.spot_color })}
            aria-hidden="true"
          ></span>
        </div>
        <div class="vab-card__body">
          <div class="vab-card__text">
            <h4 class="vab-card__title">
              ${spot.spot_name || `${t('منطقة', 'Zone')} ${index + 1}`}
            </h4>
            ${spot.spot_desc
              ? html`<p class="vab-card__desc">${spot.spot_desc}</p>`
              : nothing}
          </div>
          <div class="vab-card__actions">
            <span class="vab-card__status ${active ? 'vab-card__status--on' : ''}">
              ${active
                ? t('مختارة الآن', 'Selected')
                : t('عرض التفاصيل', 'View details')}
            </span>
            ${isValidHref(href)
              ? html`<a
                  class="vab-card__cta"
                  href=${href}
                  @click=${this.stopLinkClick}
                >
                  ${spot.spot_btn || t('استكشفي', 'Explore')}
                </a>`
              : nothing}
          </div>
        </div>
      </div>
    `;
  }

  private renderActiveDetail(spot: Hotspot) {
    const href = this.zoneHref(spot);

    return html`
      <div
        class="vab-detail"
        aria-live="polite"
        aria-label=${spot.spot_name || t('تفاصيل المنطقة', 'Zone details')}
      >
        <div class="vab-detail__head">
          <span class="vab-detail__title">
            ${spot.spot_name || t('تفاصيل المنطقة', 'Zone details')}
          </span>
        </div>
        ${spot.spot_image
          ? html`<img
              class="vab-detail__hero"
              src=${spot.spot_image}
              alt=${spot.spot_name || ''}
              loading="lazy"
              decoding="async"
            />`
          : nothing}
        ${spot.spot_desc
          ? html`<p class="vab-products__status">${spot.spot_desc}</p>`
          : html`<p class="vab-products__status">
              ${t(
                'أضيفي وصفاً أو رابطاً لهذه المنطقة لإكمال التجربة.',
                'Add a description or link for this zone to complete the experience.'
              )}
            </p>`}

        ${isValidHref(href)
          ? html`<div class="vab-detail__actions">
              <a class="fs-btn vab-detail__cta" href=${href}>
                ${spot.spot_btn || t('استكشفي المنطقة', 'Explore zone')}
              </a>
            </div>`
          : nothing}
      </div>
    `;
  }
}
