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
import {
  destroyFsSwiper,
  fsSwiperCss,
  mountFsSwiper,
  type Swiper,
} from '../../utils/fsSwiper.js';
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { componentStyles } from './styles.js';
import { parseLookbookItems } from './utils.js';
import type { LookbookItem } from './types.js';

export default class NewArrivalsLookbook extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private activeId = '';

  private swiper?: Swiper;
  private remountTimer: ReturnType<typeof setTimeout> | null = null;
  private boundLang = () => {
    this.requestUpdate();
    this.scheduleRemount();
  };
  private boundResize = () => this.scheduleRemount();

  static styles = [
    sharedSectionCss,
    fsSwiperCss,
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
    window.addEventListener('resize', this.boundResize);
    this.ensureActive();
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLang);
    window.removeEventListener('resize', this.boundResize);
    if (this.remountTimer) clearTimeout(this.remountTimer);
    destroyFsSwiper(this.swiper);
    this.swiper = undefined;
    super.disconnectedCallback();
  }

  firstUpdated(): void {
    this.remountSwiper();
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config')) {
      this.ensureActive();
      this.scheduleRemount();
    }
    if (changed.has('activeId')) {
      this.updateComplete.then(() => {
        if (!this.isConnected || !this.swiper || this.swiper.destroyed) return;
        this.swiper.update();
      });
    }
  }

  private get items() {
    return parseLookbookItems(this.config?.nal_items);
  }

  private get activeItem(): LookbookItem | null {
    return this.items.find((i) => i.id === this.activeId) || this.items[0] || null;
  }

  private ensureActive(): void {
    const list = this.items;
    if (!list.length) {
      this.activeId = '';
      return;
    }
    if (!list.some((i) => i.id === this.activeId)) {
      this.activeId = list[0].id;
    }
  }

  private scheduleRemount(): void {
    if (this.remountTimer) clearTimeout(this.remountTimer);
    this.remountTimer = setTimeout(() => this.remountSwiper(), 0);
  }

  private remountSwiper(): void {
    destroyFsSwiper(this.swiper);
    this.swiper = undefined;

    const root = this.renderRoot.querySelector('.nal-swiper') as HTMLElement | null;
    const items = this.items;
    if (!root || !items.length) return;

    const start = Math.max(0, items.findIndex((i) => i.id === this.activeId));

    this.swiper = mountFsSwiper(root, {
      slidesPerView: 'auto',
      spaceBetween: 10,
      centeredSlides: window.matchMedia('(max-width: 767px)').matches,
      initialSlide: start,
      on: {
        slideChange: (sw) => {
          const item = items[sw.activeIndex];
          if (item) this.activeId = item.id;
        },
      },
    });
  }

  private selectItem(item: LookbookItem): void {
    this.activeId = item.id;
    const idx = this.items.findIndex((i) => i.id === item.id);
    if (idx >= 0) this.swiper?.slideTo(idx);
  }

  private shift(delta: number): void {
    const list = this.items;
    if (!list.length) return;
    const idx = Math.max(0, list.findIndex((i) => i.id === this.activeId));
    const next = Math.min(list.length - 1, Math.max(0, idx + delta));
    this.selectItem(list[next]);
  }

  private openLink(item: LookbookItem, e?: Event): void {
    e?.stopPropagation();
    if (!isValidHref(item.url)) return;
    window.open(item.url, '_blank', 'noopener,noreferrer');
  }

  private onGalleryKey(e: KeyboardEvent): void {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      this.shift(-1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      this.shift(1);
    }
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'nal_');
    const animate = theme.animate && !prefersReducedMotion();
    const title = localizedString(c.nal_title as never) || t('وصل حديثا', 'New Arrivals');
    const desc = localizedString(c.nal_desc as never);
    const showTitle = isTruthy(c.nal_show_title, true);
    const items = this.items;
    const active = this.activeItem;

    return html`
      <section
        class=${classMap({ 'fs-section': true, 'fs-animate': animate, 'nal-shell': true })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title}
      >
        <div class="fs-container">
          ${showTitle
            ? html`<header class="fs-header fs-header--editorial">
                <p class="fs-eyebrow">${t('تشكيلة الموسم', 'Season edit')}</p>
                <h2 class="fs-title">${title}</h2>
                <span class="fs-title-line" aria-hidden="true"></span>
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </header>`
            : nothing}

          ${items.length
            ? html`
                <div
                  class="swiper nal-swiper"
                  aria-roledescription="carousel"
                  tabindex="0"
                  aria-label=${t('معرض الوصل حديثاً — استخدم الأسهم للتنقل', 'New arrivals gallery — use arrow keys')}
                  @keydown=${(e: KeyboardEvent) => this.onGalleryKey(e)}
                >
                  <div class="swiper-wrapper">
                    ${items.map((item) => {
                      const isActive = item.id === this.activeId;
                      return html`
                        <div
                          class=${classMap({
                            'swiper-slide': true,
                            'nal-slide': true,
                            'is-active': isActive,
                          })}
                        >
                          <article
                            class=${classMap({ 'nal-item': true, 'is-active': isActive })}
                            data-id=${item.id}
                            tabindex="0"
                            aria-current=${isActive ? 'true' : 'false'}
                            aria-label=${item.label || t('قطعة جديدة', 'New piece')}
                            @click=${() => this.selectItem(item)}
                            @mouseenter=${() => this.selectItem(item)}
                            @focus=${() => this.selectItem(item)}
                            @keydown=${(e: KeyboardEvent) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                this.selectItem(item);
                                if (isValidHref(item.url)) this.openLink(item);
                              }
                            }}
                          >
                            <img
                              class="nal-item__img"
                              src=${item.image}
                              alt=${item.label || ''}
                              loading="lazy"
                              draggable="false"
                            />
                            <div class="nal-item__shade" aria-hidden="true"></div>
                            <span class="nal-badge">${t('جديد', 'New')}</span>
                            ${item.label ? html`<h3 class="nal-item__label">${item.label}</h3>` : nothing}
                            ${isValidHref(item.url)
                              ? html`
                                  <span
                                    class="nal-tip"
                                    style=${styleMap({ left: `${item.spotX}%`, top: `${item.spotY}%` })}
                                  >
                                    ${t('اكتشف التفاصيل', 'Discover details')}
                                  </span>
                                  <button
                                    type="button"
                                    class="nal-spot"
                                    style=${styleMap({ left: `${item.spotX}%`, top: `${item.spotY}%` })}
                                    aria-label=${t('عرض المنتج', 'View product')}
                                    @click=${(e: Event) => this.openLink(item, e)}
                                  >
                                    <i class="sicon-add" aria-hidden="true"></i>
                                  </button>
                                `
                              : nothing}
                          </article>
                        </div>
                      `;
                    })}
                  </div>
                </div>

                ${active
                  ? html`<div class="nal-dock">
                      <div class="nal-dock__meta">
                        <p class="nal-dock__kicker">${t('القطعة المختارة', 'Selected look')}</p>
                        <h3 class="nal-dock__title">${active.label || t('قطعة جديدة', 'New piece')}</h3>
                        <p class="nal-dock__hint">
                          ${t('مرّر على اللوحات أو استخدم الأسهم لاستكشاف التشكيلة', 'Hover panels or use arrows to explore the edit')}
                        </p>
                      </div>
                      <button
                        type="button"
                        class="nal-dock__cta"
                        ?disabled=${!isValidHref(active.url)}
                        @click=${() => this.openLink(active)}
                      >
                        ${t('تسوق الآن', 'Shop now')}
                        <span aria-hidden="true">→</span>
                      </button>
                    </div>`
                  : nothing}

                <div class="nal-steps" role="tablist" aria-label=${t('قطع التشكيلة', 'Looks')}>
                  ${items.map(
                    (item, i) => html`
                      <button
                        type="button"
                        class=${classMap({ 'nal-step': true, 'is-active': item.id === this.activeId })}
                        aria-label=${item.label || t(`قطعة ${i + 1}`, `Look ${i + 1}`)}
                        @click=${() => this.selectItem(item)}
                      ></button>
                    `
                  )}
                </div>
              `
            : html`<div class="fs-empty">${t('أضف قطع «وصل حديثا» من إعدادات العنصر', 'Add new-arrival looks from the element settings')}</div>`}
          ${renderCommerceOutcome(this.config || {}, 'nal_')}
        </div>
      </section>
    `;
  }
}
