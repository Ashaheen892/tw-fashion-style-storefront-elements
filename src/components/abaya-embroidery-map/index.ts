import { css, html, LitElement, nothing } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';
import {
  extractImageUrl,
  extractLink,
  getRadioValue,
  getUnitValue,
  isTruthy,
  isValidHref,
  prefersReducedMotion,
  readSectionTheme,
  t,
  themeStyleMap,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { componentStyles } from './styles.js';
import type { EmbroideryDetail, LineGeom } from './types.js';
import {
  computeLines,
  featuredVisualSet,
  parseAspectRatio,
  parseDetails,
  resolveMethodText,
  resolveSide,
  shadowForLevel,
} from './utils.js';

export default class AbayaEmbroideryMap extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private activeIndex: number | null = null;
  @state() private hoverIndex: number | null = null;
  @state() private lines: LineGeom[] = [];
  @state() private entered = false;
  @state() private zoomOpen = false;
  @state() private zoomIndex: number | null = null;
  @state() private useFallbackDialog = false;
  @state() private brokenMain = false;
  @state() private brokenDetail = new Set<number>();
  @state() private isDesktop = true;

  @query('.aem-desk') private deskEl?: HTMLElement;
  @query('dialog.aem-dialog') private dialogEl?: HTMLDialogElement;

  private boundLang = () => this.requestUpdate();
  private resizeObs: ResizeObserver | null = null;
  private io: IntersectionObserver | null = null;
  private mq: MediaQueryList | null = null;
  private lineRaf = 0;
  private enterOnce = false;
  private zoomTrigger: HTMLElement | null = null;
  private boundMq = () => this.onMqChange();
  private boundKeydown = (e: KeyboardEvent) => this.onGlobalKey(e);

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
    this.mq = window.matchMedia('(min-width: 960px)');
    this.isDesktop = this.mq.matches;
    this.mq.addEventListener?.('change', this.boundMq);
    this.mq.addListener?.(this.boundMq);
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLang);
    this.mq?.removeEventListener?.('change', this.boundMq);
    this.mq?.removeListener?.(this.boundMq);
    this.teardownObservers();
    this.unlockPageScroll();
    document.removeEventListener('keydown', this.boundKeydown);
    if (this.lineRaf) cancelAnimationFrame(this.lineRaf);
    super.disconnectedCallback();
  }

  firstUpdated(): void {
    this.setupObservers();
    this.scheduleLines();
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config')) {
      this.brokenMain = false;
      this.brokenDetail = new Set();
      if (this.activeIndex != null && this.activeIndex >= this.details.length) {
        this.activeIndex = null;
      }
    }
    this.style.display = this.mainImage ? '' : 'none';
    this.scheduleLines();
  }

  private get details(): EmbroideryDetail[] {
    return parseDetails(this.config?.aem_details);
  }

  private get mainImage(): string {
    const c = this.config || {};
    return (
      extractImageUrl(c.aem_image) ||
      String(c.aem_image || '').trim()
    );
  }

  private get featuredSet(): Set<number> {
    return featuredVisualSet(this.details);
  }

  private get enableLines(): boolean {
    return isTruthy(this.config?.aem_enable_lines, true);
  }

  private get enablePulse(): boolean {
    return isTruthy(this.config?.aem_enable_pulse, true) && !prefersReducedMotion();
  }

  private get showNumbers(): boolean {
    return isTruthy(this.config?.aem_show_numbers, true);
  }

  private get enableDetailImages(): boolean {
    return isTruthy(this.config?.aem_enable_detail_images, true);
  }

  private get enableZoom(): boolean {
    return isTruthy(this.config?.aem_enable_zoom, true);
  }

  private get openNewTab(): boolean {
    return isTruthy(this.config?.aem_open_new_tab, true);
  }

  private teardownObservers(): void {
    this.resizeObs?.disconnect();
    this.resizeObs = null;
    this.io?.disconnect();
    this.io = null;
  }

  private setupObservers(): void {
    this.teardownObservers();
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObs = new ResizeObserver(() => this.scheduleLines());
      if (this.deskEl) this.resizeObs.observe(this.deskEl);
      this.resizeObs.observe(this);
    }
    if (typeof IntersectionObserver !== 'undefined') {
      this.io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) this.triggerEnter();
        },
        { threshold: 0.2 }
      );
      this.io.observe(this);
    } else {
      this.triggerEnter();
    }
  }

  private onMqChange(): void {
    this.isDesktop = !!this.mq?.matches;
    requestAnimationFrame(() => {
      this.setupObservers();
      this.scheduleLines();
    });
  }

  /** Card + connector lines follow click only — hover just highlights the spot. */
  private focusIndex(): number | null {
    return this.activeIndex;
  }

  private triggerEnter(): void {
    if (this.enterOnce) return;
    this.enterOnce = true;
    const theme = readSectionTheme(this.config, 'aem_');
    if (!theme.animate || prefersReducedMotion()) {
      this.entered = false;
      return;
    }
    this.entered = true;
    window.setTimeout(() => {
      this.entered = false;
    }, 900);
  }

  private scheduleLines(): void {
    if (this.lineRaf) cancelAnimationFrame(this.lineRaf);
    this.lineRaf = requestAnimationFrame(() => {
      this.lineRaf = 0;
      this.recalcLines();
    });
  }

  private recalcLines(): void {
    if (!this.isDesktop || !this.enableLines || !this.deskEl) {
      if (this.lines.length) this.lines = [];
      return;
    }
    const focus = this.focusIndex();
    const forLines =
      focus == null ? [] : this.details.filter((d) => d.index === focus);
    const next = computeLines(
      forLines,
      this.deskEl,
      (i) =>
        this.renderRoot.querySelector(
          `.aem-spot[data-index="${i}"]`
        ) as HTMLElement | null,
      (i) =>
        this.renderRoot.querySelector(
          `.aem-desk .aem-card[data-index="${i}"]`
        ) as HTMLElement | null
    );
    this.lines = next;
  }

  private setHover(index: number | null): void {
    if (this.hoverIndex === index) return;
    this.hoverIndex = index;
  }

  private setActive(index: number | null): void {
    if (this.activeIndex === index) {
      this.scheduleLines();
      return;
    }
    this.activeIndex = index;
    this.scheduleLines();
  }

  private toggleActive(index: number): void {
    // Clicking a number always reveals its card; second click on same clears
    this.setActive(this.activeIndex === index ? null : index);
  }

  private clearActive(): void {
    this.setActive(null);
    this.hoverIndex = null;
  }

  private onSpotKeydown(e: KeyboardEvent, index: number): void {
    const len = this.details.length;
    if (!len) return;
    let next = index;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      next = (index + 1) % len;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      next = (index - 1 + len) % len;
    } else if (e.key === 'Home') {
      e.preventDefault();
      next = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      next = len - 1;
    } else {
      return;
    }
    this.setActive(next);
    const btn = this.renderRoot.querySelector(
      `.aem-spot[data-index="${next}"]`
    ) as HTMLButtonElement | null;
    btn?.focus();
  }

  private openZoom(index: number, trigger: EventTarget | null): void {
    if (!this.enableZoom) return;
    const d = this.details[index];
    if (!d?.image || this.brokenDetail.has(index)) return;
    this.zoomTrigger = trigger instanceof HTMLElement ? trigger : null;
    this.zoomIndex = index;
    this.zoomOpen = true;
    this.lockPageScroll();
    document.addEventListener('keydown', this.boundKeydown);
    requestAnimationFrame(() => {
      const dialog = this.dialogEl;
      if (dialog && typeof dialog.showModal === 'function') {
        this.useFallbackDialog = false;
        if (!dialog.open) dialog.showModal();
      } else {
        this.useFallbackDialog = true;
      }
    });
  }

  private closeZoom(): void {
    const dialog = this.dialogEl;
    if (dialog?.open) dialog.close();
    this.zoomOpen = false;
    this.useFallbackDialog = false;
    this.zoomIndex = null;
    this.unlockPageScroll();
    document.removeEventListener('keydown', this.boundKeydown);
    this.zoomTrigger?.focus?.();
    this.zoomTrigger = null;
  }

  private onGlobalKey(e: KeyboardEvent): void {
    if (e.key === 'Escape' && this.zoomOpen) {
      e.preventDefault();
      this.closeZoom();
    }
  }

  private lockPageScroll(): void {
    document.documentElement.style.overflow = 'hidden';
  }

  private unlockPageScroll(): void {
    document.documentElement.style.overflow = '';
  }

  private markBrokenDetail(index: number): void {
    const next = new Set(this.brokenDetail);
    next.add(index);
    this.brokenDetail = next;
  }

  private designVars(): Record<string, string> {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'aem_');
    const shadowLevel = Math.max(0, Math.min(3, getUnitValue(c.aem_shadow, 1)));
    return {
      ...themeStyleMap(theme),
      '--aem-stage-bg': String(c.aem_stage_bg || '#f3ece7'),
      '--aem-spot-color': String(c.aem_spot_color || theme.accent),
      '--aem-line-color': String(c.aem_line_color || '#c4a99a'),
      '--aem-active': String(c.aem_active_color || theme.accent),
      '--aem-card-border': String(c.aem_card_border || theme.border),
      '--aem-shadow': shadowForLevel(shadowLevel),
      '--aem-aspect': parseAspectRatio(c.aem_aspect).replace('/', ' / '),
      '--aem-max-width': `${getUnitValue(c.aem_max_width, 420)}px`,
    };
  }

  private highlightIndex(): number | null {
    return this.hoverIndex ?? this.activeIndex;
  }

  private renderSpot(d: EmbroideryDetail) {
    const hi = this.highlightIndex();
    const featured = this.featuredSet.has(d.index);
    const showNum = this.showNumbers && d.show_number;
    const color = d.spot_color || undefined;
    return html`
      <button
        type="button"
        class=${classMap({
          'aem-spot': true,
          'aem-spot--pulse': this.enablePulse,
          'aem-spot--active': this.activeIndex === d.index,
          'aem-spot--hover': this.hoverIndex === d.index,
          'aem-spot--featured': featured,
        })}
        style=${styleMap({
          left: `${d.pos_x}%`,
          top: `${d.pos_y}%`,
          ...(color ? { color } : {}),
          ...(this.entered
            ? { animationDelay: `${80 + d.index * 55}ms` }
            : {}),
        })}
        data-index=${d.index}
        aria-label=${d.name}
        aria-pressed=${this.activeIndex === d.index ? 'true' : 'false'}
        @pointerenter=${() => this.setHover(d.index)}
        @pointerleave=${() => this.setHover(null)}
        @focus=${() => this.setHover(d.index)}
        @blur=${(e: FocusEvent) => {
          const next = e.relatedTarget as Node | null;
          if (next && this.renderRoot.contains(next)) return;
          this.setHover(null);
        }}
        @click=${() => this.toggleActive(d.index)}
        @keydown=${(e: KeyboardEvent) => this.onSpotKeydown(e, d.index)}
      >
        <span class="aem-spot__ring">
          ${showNum
            ? html`<span class="aem-spot__num">${d.index + 1}</span>`
            : html`<span class="aem-spot__core" aria-hidden="true"></span>`}
        </span>
        <span
          class=${classMap({
            'aem-spot__tip': true,
            'aem-spot__tip--show': hi === d.index,
          })}
          >${d.name}</span
        >
      </button>
    `;
  }

  private renderCard(d: EmbroideryDetail) {
    const featured = this.featuredSet.has(d.index);
    const showImg =
      this.enableDetailImages && d.image && !this.brokenDetail.has(d.index);
    const method = resolveMethodText(d.method);
    const methodText = method.ar
      ? t(method.ar, method.en)
      : '';
    const btnText =
      d.btn_text ||
      t('عرض المنتج', 'View product');
    const link = isValidHref(d.product_url) ? d.product_url : '';

    return html`
      <article
        class=${classMap({
          'aem-card': true,
          'aem-card--active': this.activeIndex === d.index,
          'aem-card--hover': this.hoverIndex === d.index,
          'aem-card--featured': featured,
        })}
        data-index=${d.index}
        tabindex="0"
        role="button"
        aria-pressed=${this.activeIndex === d.index ? 'true' : 'false'}
        @pointerenter=${() => this.setHover(d.index)}
        @pointerleave=${() => this.setHover(null)}
        @focus=${() => this.setHover(d.index)}
        @blur=${(e: FocusEvent) => {
          const next = e.relatedTarget as Node | null;
          if (next && this.renderRoot.contains(next)) return;
          this.setHover(null);
        }}
        @click=${(e: Event) => {
          const t = e.target as HTMLElement;
          if (t.closest('a, .aem-card__zoom')) return;
          this.toggleActive(d.index);
        }}
        @keydown=${(e: KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.toggleActive(d.index);
          }
        }}
      >
        ${featured && d.badge
          ? html`<span class="aem-badge">${d.badge}</span>`
          : nothing}
        ${showImg
          ? html`<div class="aem-card__media">
              <img
                src=${d.image}
                alt=${d.alt || d.name}
                loading="lazy"
                decoding="async"
                @error=${() => this.markBrokenDetail(d.index)}
              />
              ${this.enableZoom
                ? html`<button
                    type="button"
                    class="aem-card__zoom"
                    aria-label=${t('تكبير التفصيلة', 'Zoom detail')}
                    @click=${(e: Event) => {
                      e.stopPropagation();
                      this.openZoom(d.index, e.currentTarget);
                    }}
                  ></button>`
                : nothing}
            </div>`
          : nothing}
        <h3 class="aem-card__title">${d.name}</h3>
        ${d.desc ? html`<p class="aem-card__desc">${d.desc}</p>` : nothing}
        ${d.stitch_type || d.thread || methodText || d.duration || d.extra
          ? html`<div class="aem-meta">
              ${d.stitch_type
                ? html`<div>
                    <strong>${t('التطريز', 'Stitch')}:</strong> ${d.stitch_type}
                  </div>`
                : nothing}
              ${d.thread
                ? html`<div>
                    <strong>${t('الخيط / الخامة', 'Thread / material')}:</strong>
                    ${d.thread}
                  </div>`
                : nothing}
              ${methodText
                ? html`<div>
                    <strong>${t('التنفيذ', 'Method')}:</strong> ${methodText}
                  </div>`
                : nothing}
              ${d.duration
                ? html`<div>
                    <strong>${t('المدة', 'Duration')}:</strong> ${d.duration}
                  </div>`
                : nothing}
              ${d.extra ? html`<div>${d.extra}</div>` : nothing}
            </div>`
          : nothing}
        ${link
          ? html`<a
              class="fs-btn aem-card__link"
              href=${link}
              target=${ifDefined(this.openNewTab ? '_blank' : undefined)}
              rel=${ifDefined(this.openNewTab ? 'noopener noreferrer' : undefined)}
              @click=${(e: Event) => e.stopPropagation()}
              >${btnText}</a
            >`
          : nothing}
      </article>
    `;
  }

  private renderLines() {
    if (!this.isDesktop || !this.enableLines || !this.lines.length) return nothing;
    const hi = this.highlightIndex();
    return html`
      <svg class="aem-lines" aria-hidden="true" focusable="false">
        ${this.lines.map(
          (line) => html`<path
            class=${classMap({
              'aem-line': true,
              'aem-line--active': this.activeIndex === line.index,
              'aem-line--hover': this.hoverIndex === line.index,
            })}
            d=${line.d}
            style=${this.entered
              ? styleMap({
                  animationDelay: `${350 + line.index * 40}ms`,
                })
              : nothing}
          />`
        )}
      </svg>
    `;
  }

  private renderStage() {
    const c = this.config || {};
    const alt =
      localizedString(c.aem_image_alt as string).trim() ||
      t('عباية', 'Abaya');
    return html`
      <div class="aem-stage-wrap">
        <div class="aem-stage">
          <div class="aem-stage__ornament" aria-hidden="true"></div>
          <div class="aem-stage__img-wrap">
            ${!this.brokenMain
              ? html`<img
                  class="aem-stage__img"
                  src=${this.mainImage}
                  alt=${alt}
                  decoding="async"
                  @error=${() => {
                    this.brokenMain = true;
                  }}
                />`
              : nothing}
          </div>
          <div class="aem-spots">
            ${this.details.map((d) => this.renderSpot(d))}
          </div>
        </div>
      </div>
    `;
  }

  private renderColSlot(side: 'left' | 'right', detail: EmbroideryDetail | null) {
    const show = detail && resolveSide(detail) === side;
    return html`
      <div class="aem-col aem-col--${side}">
        ${show && detail
          ? html`<div class="aem-card-slot aem-card-slot--in">
              ${this.renderCard(detail)}
            </div>`
          : html`<div class="aem-col__placeholder" aria-hidden="true"></div>`}
      </div>
    `;
  }

  private renderDesktop() {
    const focus = this.focusIndex();
    const detail = focus != null ? this.details[focus] || null : null;
    const hi = this.highlightIndex();

    return html`
      <div
        class=${classMap({
          'aem-desk': true,
          'aem-desk--dim': hi != null,
          'aem-desk--compact':
            getRadioValue(this.config?.aem_layout, 'map') === 'compact',
          'aem-desk--focus': detail != null,
        })}
      >
        ${this.renderColSlot('left', detail)}
        <div class="aem-stage-stack">
          ${this.renderStage()}
          <p
            class=${classMap({
              'aem-pick-hint': true,
              'aem-pick-hint--hidden': detail != null,
            })}
            aria-live="polite"
            aria-hidden=${detail != null ? 'true' : 'false'}
          >
            ${t(
              'اضغطي على رقم التفصيلة لعرض تفاصيلها',
              'Tap a detail number to view it'
            )}
          </p>
        </div>
        ${this.renderColSlot('right', detail)}
        ${detail ? this.renderLines() : nothing}
      </div>
    `;
  }

  private renderMobile() {
    const active =
      this.activeIndex != null
        ? this.details[this.activeIndex]
        : null;
    const showNav = this.details.length > 1;
    return html`
      <div class="aem-mobile">
        ${this.renderStage()}
        <div class="aem-mobile__live" aria-live="polite">
          ${active
            ? active.name
            : t(
                'اضغطي على رقم التفصيلة',
                'Tap a detail number'
              )}
        </div>
        ${active
          ? html`<div class="aem-mobile__card aem-card-slot aem-card-slot--in">
              ${this.renderCard(active)}
            </div>`
          : html`<p class="aem-pick-hint">
              ${t(
                'اختاري تفصيلة من الأرقام على الصورة',
                'Choose a detail from the numbers on the image'
              )}
            </p>`}
        ${showNav && active
          ? html`<div class="aem-nav">
              <button
                type="button"
                aria-label=${t('السابق', 'Previous')}
                ?disabled=${active.index <= 0}
                @click=${() => this.setActive(Math.max(0, active.index - 1))}
              >
                ‹
              </button>
              <button
                type="button"
                aria-label=${t('التالي', 'Next')}
                ?disabled=${active.index >= this.details.length - 1}
                @click=${() =>
                  this.setActive(
                    Math.min(this.details.length - 1, active.index + 1)
                  )}
              >
                ›
              </button>
            </div>`
          : nothing}
      </div>
    `;
  }

  private renderZoom() {
    if (!this.zoomOpen || this.zoomIndex == null) return nothing;
    const d = this.details[this.zoomIndex];
    if (!d) return nothing;
    const method = resolveMethodText(d.method);
    const methodText = method.ar ? t(method.ar, method.en) : '';
    const link = isValidHref(d.product_url) ? d.product_url : '';
    const btnText = d.btn_text || t('عرض المنتج', 'View product');
    const inner = html`
      <div class="aem-dialog__inner">
        <button
          type="button"
          class="aem-dialog__close"
          aria-label=${t('إغلاق', 'Close')}
          @click=${() => this.closeZoom()}
        >
          ✕
        </button>
        <img class="aem-dialog__img" src=${d.image} alt=${d.alt || d.name} />
        <h3 class="aem-dialog__title">${d.name}</h3>
        ${d.desc ? html`<p class="aem-dialog__desc">${d.desc}</p>` : nothing}
        ${d.stitch_type || methodText
          ? html`<div class="aem-meta">
              ${d.stitch_type
                ? html`<div>
                    <strong>${t('التطريز', 'Stitch')}:</strong> ${d.stitch_type}
                  </div>`
                : nothing}
              ${methodText
                ? html`<div>
                    <strong>${t('التنفيذ', 'Method')}:</strong> ${methodText}
                  </div>`
                : nothing}
            </div>`
          : nothing}
        ${link
          ? html`<a
              class="fs-btn"
              href=${link}
              target=${ifDefined(this.openNewTab ? '_blank' : undefined)}
              rel=${ifDefined(this.openNewTab ? 'noopener noreferrer' : undefined)}
              >${btnText}</a
            >`
          : nothing}
      </div>
    `;

    if (this.useFallbackDialog) {
      return html`<div
        class="aem-fs-fallback"
        @click=${(e: Event) => {
          if (e.target === e.currentTarget) this.closeZoom();
        }}
      >
        ${inner}
      </div>`;
    }

    return html`<dialog
      class="aem-dialog"
      @click=${(e: Event) => {
        if (e.target === this.dialogEl) this.closeZoom();
      }}
      @close=${() => {
        if (this.zoomOpen) this.closeZoom();
      }}
    >
      ${inner}
    </dialog>`;
  }

  render() {
    if (!this.mainImage) return nothing;

    const c = this.config || {};
    const theme = readSectionTheme(c, 'aem_');
    const animate = theme.animate && !prefersReducedMotion();
    const full = isTruthy(c.aem_full_width, false);
    const showTitle = isTruthy(c.aem_show_title, true);
    const showDesc = isTruthy(c.aem_show_desc, true);
    const showBtn = isTruthy(c.aem_show_btn, true);
    const title = showTitle ? localizedString(c.aem_title as string).trim() : '';
    const desc = showDesc ? localizedString(c.aem_desc as string).trim() : '';
    const mainUrl = extractLink(c.aem_product_url);
    const mainBtn =
      localizedString(c.aem_btn_text as string).trim() ||
      t('عرض العباية', 'View abaya');
    const showMainBtn = showBtn && isValidHref(mainUrl);

    return html`
      <section
        class=${classMap({
          'fs-section': true,
          'fs-section--full': full,
          'fs-animate': animate,
          'aem--enter': this.entered,
        })}
        style=${styleMap(this.designVars())}
        aria-label=${title || t('خريطة تطريز العباية', 'Abaya embroidery map')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<header class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </header>`
            : nothing}

          <div class="aem-shell">
            ${this.isDesktop ? this.renderDesktop() : this.renderMobile()}
            ${this.activeIndex != null
              ? html`<div class="aem-clear-wrap">
                  <button
                    type="button"
                    class="aem-clear"
                    @click=${() => this.clearActive()}
                  >
                    ${t('مسح التحديد', 'Clear selection')}
                  </button>
                </div>`
              : nothing}
            ${showMainBtn
              ? html`<div class="aem-cta">
                  <a
                    class="fs-btn"
                    href=${mainUrl}
                    target=${ifDefined(this.openNewTab ? '_blank' : undefined)}
                    rel=${ifDefined(
                      this.openNewTab ? 'noopener noreferrer' : undefined
                    )}
                    >${mainBtn}</a
                  >
                </div>`
              : nothing}
          </div>
        </div>
        ${this.renderZoom()}
      </section>
    `;
  }
}
