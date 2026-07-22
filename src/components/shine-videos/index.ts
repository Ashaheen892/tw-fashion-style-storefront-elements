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
import {
  destroyFsSwiper,
  fsSwiperCss,
  mountFsSwiper,
  Navigation,
  Pagination,
  type Swiper,
} from '../../utils/fsSwiper.js';
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { componentStyles } from './styles.js';
import { parseVideos, youtubeEmbedUrl } from './utils.js';
import type { ShineVideoItem } from './types.js';

export default class ShineVideos extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private active: ShineVideoItem | null = null;
  @state() private focusId = '';

  private swiper?: Swiper;
  private remountTimer: ReturnType<typeof setTimeout> | null = null;

  private boundLang = () => {
    this.requestUpdate();
    this.scheduleRemount();
  };

  private boundKey = (e: KeyboardEvent) => {
    if (!this.active) return;
    if (e.key === 'Escape') this.closeModal();
    if (e.key === 'ArrowRight') this.shiftModal(-1);
    if (e.key === 'ArrowLeft') this.shiftModal(1);
  };

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
    window.addEventListener('keydown', this.boundKey);
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLang);
    window.removeEventListener('keydown', this.boundKey);
    if (this.remountTimer) clearTimeout(this.remountTimer);
    destroyFsSwiper(this.swiper);
    this.swiper = undefined;
    super.disconnectedCallback();
  }

  firstUpdated(): void {
    this.ensureFocus();
    this.remountSwiper();
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config')) {
      this.ensureFocus();
      this.scheduleRemount();
    }
  }

  private get videos() {
    return parseVideos(this.config?.sv_videos);
  }

  private ensureFocus(): void {
    const list = this.videos;
    if (!list.length) {
      this.focusId = '';
      return;
    }
    if (!list.some((v) => v.id === this.focusId)) {
      this.focusId = list[0].id;
    }
  }

  private scheduleRemount(): void {
    if (this.remountTimer) clearTimeout(this.remountTimer);
    this.remountTimer = setTimeout(() => this.remountSwiper(), 0);
  }

  private remountSwiper(): void {
    destroyFsSwiper(this.swiper);
    this.swiper = undefined;

    const root = this.renderRoot.querySelector('.sv-swiper') as HTMLElement | null;
    const videos = this.videos;
    if (!root || !videos.length) return;

    const start = Math.max(0, videos.findIndex((v) => v.id === this.focusId));

    this.swiper = mountFsSwiper(root, {
      modules: [Navigation, Pagination],
      slidesPerView: 'auto',
      spaceBetween: 14,
      centeredSlides: true,
      initialSlide: start,
      navigation: {
        prevEl: this.renderRoot.querySelector('.sv-nav--prev') as HTMLElement,
        nextEl: this.renderRoot.querySelector('.sv-nav--next') as HTMLElement,
      },
      pagination: {
        el: this.renderRoot.querySelector('.sv-pagination') as HTMLElement,
        clickable: true,
      },
      on: {
        slideChange: (sw) => {
          const item = videos[sw.activeIndex];
          if (item) this.focusId = item.id;
        },
      },
    });
  }

  private focusIndex(): number {
    return Math.max(0, this.videos.findIndex((v) => v.id === this.focusId));
  }

  private openModal(item: ShineVideoItem): void {
    if (!item.videoUrl && !item.poster) return;
    this.active = item;
    this.focusId = item.id;
    const idx = this.videos.findIndex((v) => v.id === item.id);
    if (idx >= 0) this.swiper?.slideTo(idx);
  }

  private closeModal(): void {
    this.active = null;
  }

  private shiftModal(dir: number): void {
    const list = this.videos;
    if (!this.active || list.length < 2) return;
    const idx = list.findIndex((v) => v.id === this.active!.id);
    const next = (idx + dir + list.length) % list.length;
    this.active = list[next];
    this.focusId = list[next].id;
    this.swiper?.slideTo(next);
  }

  private renderModal() {
    if (!this.active) return nothing;
    const url = this.active.videoUrl;
    const yt = youtubeEmbedUrl(url);
    const list = this.videos;
    const multi = list.length > 1;

    return html`
      <div class="sv-modal" role="dialog" aria-modal="true" @click=${() => this.closeModal()}>
        <div class="sv-modal__panel" @click=${(e: Event) => e.stopPropagation()}>
          <button
            type="button"
            class="sv-modal__close"
            aria-label=${t('إغلاق', 'Close')}
            @click=${() => this.closeModal()}
          >
            ×
          </button>
          ${multi
            ? html`
                <button
                  type="button"
                  class="sv-modal__nav sv-modal__nav--prev"
                  aria-label=${t('السابق', 'Previous')}
                  @click=${() => this.shiftModal(1)}
                >
                  ‹
                </button>
                <button
                  type="button"
                  class="sv-modal__nav sv-modal__nav--next"
                  aria-label=${t('التالي', 'Next')}
                  @click=${() => this.shiftModal(-1)}
                >
                  ›
                </button>
              `
            : nothing}
          ${yt
            ? html`<iframe
                src=${yt}
                title=${this.active.caption || t('فيديو', 'Video')}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>`
            : url
              ? html`<video src=${url} controls autoplay playsinline></video>`
              : this.active.poster
                ? html`<img src=${this.active.poster} alt=${this.active.caption || ''} />`
                : nothing}
          ${this.active.caption ? html`<p class="sv-modal__cap">${this.active.caption}</p>` : nothing}
        </div>
      </div>
    `;
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'sv_');
    const animate = theme.animate && !prefersReducedMotion();
    const title = localizedString(c.sv_title as never) || t('تألقي', 'Shine');
    const desc = localizedString(c.sv_desc as never);
    const showTitle = isTruthy(c.sv_show_title, true);
    const videos = this.videos;
    const focusIdx = this.focusIndex();

    return html`
      <section
        class=${classMap({ 'fs-section': true, 'fs-animate': animate, 'sv-shell': true })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title}
      >
        <div class="fs-container">
          ${showTitle
            ? html`<header class="fs-header fs-header--editorial">
                <p class="fs-eyebrow">${t('لحظات الأناقة', 'Style moments')}</p>
                <h2 class="fs-title">${title}</h2>
                <span class="fs-title-line" aria-hidden="true"></span>
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </header>`
            : nothing}

          ${videos.length
            ? html`<div class="sv-stage">
                <button
                  type="button"
                  class="sv-nav sv-nav--prev"
                  aria-label=${t('السابق', 'Previous')}
                  ?disabled=${focusIdx <= 0}
                >
                  ‹
                </button>
                <button
                  type="button"
                  class="sv-nav sv-nav--next"
                  aria-label=${t('التالي', 'Next')}
                  ?disabled=${focusIdx >= videos.length - 1}
                >
                  ›
                </button>

                <div class="swiper sv-swiper" aria-roledescription="carousel">
                  <div class="swiper-wrapper">
                    ${videos.map(
                      (item, i) => html`
                        <div
                          class=${classMap({
                            'swiper-slide': true,
                            'sv-slide': true,
                            'is-focus': item.id === this.focusId,
                          })}
                          data-id=${item.id}
                        >
                          <article class="sv-card" role="group">
                            <button
                              type="button"
                              class="sv-thumb"
                              aria-label=${item.caption || t('تشغيل الفيديو', 'Play video')}
                              @click=${() => this.openModal(item)}
                            >
                              ${item.poster
                                ? html`<img
                                    src=${item.poster}
                                    alt=${item.caption || ''}
                                    loading="lazy"
                                    draggable="false"
                                  />`
                                : nothing}
                              <span class="sv-film" aria-hidden="true"></span>
                              <span class="sv-index">${String(i + 1).padStart(2, '0')}</span>
                              <span class="sv-play" aria-hidden="true">
                                <span class="sv-play__btn"><i class="sicon-play"></i></span>
                              </span>
                            </button>
                            ${item.caption ? html`<p class="sv-caption">${item.caption}</p>` : nothing}
                          </article>
                        </div>
                      `
                    )}
                  </div>
                </div>

                <div class="sv-pagination" aria-hidden=${videos.length < 2 ? 'true' : 'false'}></div>
              </div>`
            : html`<div class="fs-empty">${t('أضف مقاطع فيديو من إعدادات العنصر', 'Add videos from the element settings')}</div>`}
        </div>
        ${renderCommerceOutcome(this.config || {}, 'sv_')}
        ${this.renderModal()}
      </section>
    `;
  }
}
