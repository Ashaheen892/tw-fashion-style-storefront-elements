import { css, html, LitElement, nothing } from 'lit';
import { property, state, query } from 'lit/decorators.js';
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
import { parseVideos, youtubeEmbedUrl } from './utils.js';
import type { ShineVideoItem } from './types.js';

export default class ShineVideos extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private active: ShineVideoItem | null = null;
  @state() private focusId = '';

  @query('.sv-track') private trackEl?: HTMLElement;

  private observer?: IntersectionObserver;
  private boundLang = () => this.requestUpdate();
  private boundKey = (e: KeyboardEvent) => {
    if (!this.active) return;
    if (e.key === 'Escape') this.closeModal();
    if (e.key === 'ArrowRight') this.shiftModal(-1);
    if (e.key === 'ArrowLeft') this.shiftModal(1);
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
    window.addEventListener('language-changed', this.boundLang);
    window.addEventListener('keydown', this.boundKey);
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLang);
    window.removeEventListener('keydown', this.boundKey);
    this.observer?.disconnect();
    super.disconnectedCallback();
  }

  firstUpdated(): void {
    this.setupObserver();
    this.ensureFocus();
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config')) {
      this.ensureFocus();
      this.setupObserver();
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

  private setupObserver(): void {
    this.observer?.disconnect();
    const track = this.trackEl;
    if (!track) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const id = (visible?.target as HTMLElement | undefined)?.dataset?.id;
        if (id) this.focusId = id;
      },
      { root: track, threshold: [0.45, 0.7, 0.9] }
    );

    track.querySelectorAll<HTMLElement>('.sv-card').forEach((card) => this.observer?.observe(card));
  }

  private scrollToIndex(index: number): void {
    const track = this.trackEl;
    const card = track?.querySelectorAll<HTMLElement>('.sv-card')[index];
    card?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', inline: 'center', block: 'nearest' });
  }

  private focusIndex(): number {
    return Math.max(0, this.videos.findIndex((v) => v.id === this.focusId));
  }

  private shiftFocus(delta: number): void {
    const list = this.videos;
    if (!list.length) return;
    const next = Math.min(list.length - 1, Math.max(0, this.focusIndex() + delta));
    this.focusId = list[next].id;
    this.scrollToIndex(next);
  }

  private openModal(item: ShineVideoItem): void {
    if (!item.videoUrl && !item.poster) return;
    this.active = item;
    this.focusId = item.id;
  }

  private closeModal(): void {
    this.active = null;
  }

  private shiftModal(dir: number): void {
    const list = this.videos;
    if (!this.active || list.length < 2) return;
    // RTL-friendly: ArrowLeft advances in Arabic LTR visual next
    const idx = list.findIndex((v) => v.id === this.active!.id);
    const next = (idx + dir + list.length) % list.length;
    this.active = list[next];
    this.focusId = list[next].id;
    this.scrollToIndex(next);
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
            ? html`<header class="sv-header">
                <p class="sv-eyebrow">${t('لحظات الأناقة', 'Style moments')}</p>
                <h2 class="sv-title">${title}</h2>
                <span class="sv-title-line" aria-hidden="true"></span>
                ${desc ? html`<p class="sv-desc">${desc}</p>` : nothing}
              </header>`
            : nothing}

          ${videos.length
            ? html`<div class="sv-stage">
                <button
                  type="button"
                  class="sv-nav sv-nav--prev"
                  aria-label=${t('السابق', 'Previous')}
                  ?disabled=${focusIdx <= 0}
                  @click=${() => this.shiftFocus(-1)}
                >
                  ‹
                </button>
                <button
                  type="button"
                  class="sv-nav sv-nav--next"
                  aria-label=${t('التالي', 'Next')}
                  ?disabled=${focusIdx >= videos.length - 1}
                  @click=${() => this.shiftFocus(1)}
                >
                  ›
                </button>

                <div class="sv-track" role="list">
                  ${videos.map(
                    (item, i) => html`
                      <article
                        class=${classMap({ 'sv-card': true, 'is-focus': item.id === this.focusId })}
                        role="listitem"
                        data-id=${item.id}
                      >
                        <button
                          type="button"
                          class="sv-thumb"
                          aria-label=${item.caption || t('تشغيل الفيديو', 'Play video')}
                          @click=${() => this.openModal(item)}
                          @focus=${() => {
                            this.focusId = item.id;
                          }}
                        >
                          ${item.poster
                            ? html`<img src=${item.poster} alt=${item.caption || ''} loading="lazy" />`
                            : nothing}
                          <span class="sv-film" aria-hidden="true"></span>
                          <span class="sv-index">${String(i + 1).padStart(2, '0')}</span>
                          <span class="sv-play" aria-hidden="true">
                            <span class="sv-play__btn"><i class="sicon-play"></i></span>
                          </span>
                        </button>
                        ${item.caption ? html`<p class="sv-caption">${item.caption}</p>` : nothing}
                      </article>
                    `
                  )}
                </div>

                <div class="sv-dots" role="tablist" aria-label=${t('التنقل بين المقاطع', 'Browse clips')}>
                  ${videos.map(
                    (item, i) => html`
                      <button
                        type="button"
                        class=${classMap({ 'sv-dot': true, 'is-active': item.id === this.focusId })}
                        aria-label=${t(`مقطع ${i + 1}`, `Clip ${i + 1}`)}
                        @click=${() => {
                          this.focusId = item.id;
                          this.scrollToIndex(i);
                        }}
                      ></button>
                    `
                  )}
                </div>
              </div>`
            : html`<div class="sv-empty">${t('أضف مقاطع فيديو من إعدادات العنصر', 'Add videos from the element settings')}</div>`}
        </div>
        ${renderCommerceOutcome(this.config || {}, 'sv_')}
        ${this.renderModal()}
      </section>
    `;
  }
}
