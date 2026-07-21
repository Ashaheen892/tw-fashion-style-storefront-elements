import { css, html, LitElement, nothing } from 'lit';
import { property, state, query } from 'lit/decorators.js';
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
import { parseLookbookItems } from './utils.js';
import type { LookbookItem } from './types.js';

export default class NewArrivalsLookbook extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private activeId = '';

  @query('.nal-gallery') private galleryEl?: HTMLElement;

  private boundLang = () => this.requestUpdate();
  private observer?: IntersectionObserver;

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
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLang);
    this.observer?.disconnect();
    super.disconnectedCallback();
  }

  firstUpdated(): void {
    this.setupMobileObserver();
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config')) {
      this.ensureActive();
      this.setupMobileObserver();
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

  private setupMobileObserver(): void {
    this.observer?.disconnect();
    const gallery = this.galleryEl;
    if (!gallery || window.matchMedia('(min-width: 768px)').matches) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const id = (best?.target as HTMLElement | undefined)?.dataset?.id;
        if (id) this.activeId = id;
      },
      { root: gallery, threshold: [0.55, 0.75] }
    );

    gallery.querySelectorAll<HTMLElement>('.nal-item').forEach((el) => this.observer?.observe(el));
  }

  private selectItem(item: LookbookItem, scroll = false): void {
    this.activeId = item.id;
    if (!scroll || !this.galleryEl) return;
    const el = this.galleryEl.querySelector<HTMLElement>(`[data-id="${item.id}"]`);
    el?.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  }

  private shift(delta: number): void {
    const list = this.items;
    if (!list.length) return;
    const idx = Math.max(0, list.findIndex((i) => i.id === this.activeId));
    const next = Math.min(list.length - 1, Math.max(0, idx + delta));
    this.selectItem(list[next], true);
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
            ? html`<header class="nal-header">
                <p class="nal-eyebrow">${t('تشكيلة الموسم', 'Season edit')}</p>
                <h2 class="nal-title">${title}</h2>
                <span class="nal-title-line" aria-hidden="true"></span>
                ${desc ? html`<p class="nal-desc">${desc}</p>` : nothing}
              </header>`
            : nothing}

          ${items.length
            ? html`
                <div
                  class="nal-gallery"
                  role="list"
                  tabindex="0"
                  aria-label=${t('معرض الوصل حديثاً — استخدم الأسهم للتنقل', 'New arrivals gallery — use arrow keys')}
                  @keydown=${(e: KeyboardEvent) => this.onGalleryKey(e)}
                >
                  ${items.map((item) => {
                    const isActive = item.id === this.activeId;
                    return html`
                      <article
                        class=${classMap({ 'nal-item': true, 'is-active': isActive })}
                        role="listitem"
                        tabindex="0"
                        data-id=${item.id}
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
                        <img class="nal-item__img" src=${item.image} alt=${item.label || ''} loading="lazy" />
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
                    `;
                  })}
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
                        @click=${() => this.selectItem(item, true)}
                      ></button>
                    `
                  )}
                </div>
              `
            : html`<div class="nal-empty">${t('أضف قطع «وصل حديثا» من إعدادات العنصر', 'Add new-arrival looks from the element settings')}</div>`}
          ${renderCommerceOutcome(this.config || {}, 'nal_')}
        </div>
      </section>
    `;
  }
}
