import { css, html, LitElement, nothing } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import {
  extractLink,
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
import type { LightMode } from './types.js';
import {
  clampPan,
  levelLabel,
  loadImageDecoded,
  metricsForMode,
  nextModeIndex,
  parseAspectRatio,
  parseLightModes,
  parseZoomLevel,
  resolveDefaultIndex,
} from './utils.js';

export default class AbayaLightStudio extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private activeIndex = 0;
  @state() private displaySrc = '';
  @state() private fading = false;
  @state() private zoom = 1;
  @state() private panX = 0;
  @state() private panY = 0;
  @state() private lensOn = false;
  @state() private lensStyle: Record<string, string> = {};
  @state() private compareOn = false;
  @state() private compareA = 0;
  @state() private compareB = 1;
  @state() private comparePct = 50;
  @state() private notesOpen = false;
  @state() private panning = false;

  @query('.als-stage') private stageEl?: HTMLElement;
  @query('.als-compare') private compareEl?: HTMLElement;

  private loadToken = 0;
  private boundLang = () => this.requestUpdate();
  private pointerId: number | null = null;
  private panStartX = 0;
  private panStartY = 0;
  private panOriginX = 0;
  private panOriginY = 0;
  private compareDragging = false;
  private isCoarse = false;
  private prefetchCache = new Set<string>();

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
    this.isCoarse =
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: coarse)').matches;
    this.resetFromConfig();
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLang);
    this.teardownPointers();
    super.disconnectedCallback();
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config')) this.resetFromConfig();
    this.style.display = this.modes.length ? '' : 'none';
  }

  private get modes(): LightMode[] {
    return parseLightModes(this.config?.als_modes);
  }

  private get active(): LightMode | null {
    return this.modes.find((m) => m.index === this.activeIndex) || this.modes[0] || null;
  }

  private get enableLens(): boolean {
    return isTruthy(this.config?.als_enable_lens, true) && !this.isCoarse;
  }

  private get enableZoomBtns(): boolean {
    return isTruthy(this.config?.als_enable_zoom_btns, true);
  }

  private get enableCompare(): boolean {
    return isTruthy(this.config?.als_enable_compare, true) && this.modes.length >= 2;
  }

  private get showMetrics(): boolean {
    return isTruthy(this.config?.als_show_metrics, true);
  }

  private get showColor(): boolean {
    return isTruthy(this.config?.als_show_color, true);
  }

  private get showNotes(): boolean {
    return isTruthy(this.config?.als_show_notes, true);
  }

  private get showProduct(): boolean {
    return isTruthy(this.config?.als_show_product, true);
  }

  private get lensZoom(): number {
    return parseZoomLevel(this.config?.als_lens_zoom);
  }

  private get placeholder(): string {
    return String(this.config?.als_placeholder || '').trim();
  }

  private resetFromConfig(): void {
    const modes = this.modes;
    if (!modes.length) {
      this.displaySrc = '';
      return;
    }
    const def = resolveDefaultIndex(modes);
    this.activeIndex = def;
    this.compareA = def;
    this.compareB = modes.find((m) => m.index !== def)?.index ?? def;
    this.compareOn = false;
    this.zoom = 1;
    this.panX = 0;
    this.panY = 0;
    const mode = modes.find((m) => m.index === def) || modes[0];
    this.displaySrc = mode.image;
    void this.ensureImage(mode.image, true);
    const next = nextModeIndex(modes, def, 1);
    const nextMode = modes.find((m) => m.index === next);
    if (nextMode) void this.prefetch(nextMode.image);
  }

  private async prefetch(src: string): Promise<void> {
    if (!src || this.prefetchCache.has(src)) return;
    this.prefetchCache.add(src);
    await loadImageDecoded(src);
  }

  private async ensureImage(src: string, immediate = false): Promise<boolean> {
    const token = ++this.loadToken;
    if (!immediate) this.fading = true;
    const ok = await loadImageDecoded(src);
    if (token !== this.loadToken) return false;
    if (ok) {
      this.displaySrc = src;
      this.fading = false;
      return true;
    }
    this.fading = false;
    if (this.placeholder && !this.displaySrc) this.displaySrc = this.placeholder;
    return false;
  }

  private async selectMode(index: number): Promise<void> {
    const mode = this.modes.find((m) => m.index === index);
    if (!mode || mode.index === this.activeIndex) return;

    this.activeIndex = index;
    this.zoom = 1;
    this.panX = 0;
    this.panY = 0;
    this.lensOn = false;

    const ok = await this.ensureImage(mode.image);
    if (!ok && this.displaySrc) {
      // keep previous image
    }

    const next = nextModeIndex(this.modes, index, 1);
    const nextMode = this.modes.find((m) => m.index === next);
    if (nextMode) void this.prefetch(nextMode.image);
  }

  private zoomIn(): void {
    this.zoom = Math.min(3, Number((this.zoom + 0.5).toFixed(1)));
  }

  private zoomOut(): void {
    this.zoom = Math.max(1, Number((this.zoom - 0.5).toFixed(1)));
    if (this.zoom === 1) {
      this.panX = 0;
      this.panY = 0;
    }
  }

  private resetZoom(): void {
    this.zoom = 1;
    this.panX = 0;
    this.panY = 0;
  }

  /* —— Lens (desktop) —— */
  private onStageMove(e: PointerEvent): void {
    if (!this.enableLens || this.zoom > 1 || this.compareOn) {
      this.lensOn = false;
      return;
    }
    const stage = this.stageEl;
    const src = this.displaySrc;
    if (!stage || !src) return;

    const rect = stage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
      this.lensOn = false;
      return;
    }

    const size = 144;
    const half = size / 2;
    const left = Math.max(0, Math.min(rect.width - size, x - half));
    const top = Math.max(0, Math.min(rect.height - size, y - half));
    const zx = this.lensZoom;
    const bgX = -(x * zx - half);
    const bgY = -(y * zx - half);

    this.lensOn = true;
    this.lensStyle = {
      left: `${left}px`,
      top: `${top}px`,
      backgroundImage: `url("${src}")`,
      backgroundSize: `${rect.width * zx}px ${rect.height * zx}px`,
      backgroundPosition: `${bgX}px ${bgY}px`,
    };
  }

  private onStageLeave(): void {
    this.lensOn = false;
  }

  /* —— Mobile pan when zoomed —— */
  private onPanDown(e: PointerEvent): void {
    if (this.compareOn) return;
    if (this.zoom <= 1) return;
    if (e.pointerType === 'mouse' && this.enableLens) return;

    this.panning = true;
    this.pointerId = e.pointerId;
    this.panStartX = e.clientX;
    this.panStartY = e.clientY;
    this.panOriginX = this.panX;
    this.panOriginY = this.panY;
    this.stageEl?.setPointerCapture?.(e.pointerId);
    window.addEventListener('pointermove', this.onPanMove);
    window.addEventListener('pointerup', this.onPanUp);
    window.addEventListener('pointercancel', this.onPanUp);
  }

  private onPanMove = (e: PointerEvent): void => {
    if (!this.panning || e.pointerId !== this.pointerId) return;
    const stage = this.stageEl;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const dx = e.clientX - this.panStartX;
    const dy = e.clientY - this.panStartY;
    this.panX = clampPan(
      this.panOriginX + dx,
      this.zoom,
      rect.width,
      rect.width
    );
    this.panY = clampPan(
      this.panOriginY + dy,
      this.zoom,
      rect.height,
      rect.height
    );
  };

  private onPanUp = (e: PointerEvent): void => {
    if (e.pointerId !== this.pointerId) return;
    this.panning = false;
    this.pointerId = null;
    this.teardownPointers();
  };

  private teardownPointers(): void {
    window.removeEventListener('pointermove', this.onPanMove);
    window.removeEventListener('pointerup', this.onPanUp);
    window.removeEventListener('pointercancel', this.onPanUp);
    window.removeEventListener('pointermove', this.onCompareMove);
    window.removeEventListener('pointerup', this.onCompareUp);
    window.removeEventListener('pointercancel', this.onCompareUp);
  }

  /* —— Compare —— */
  private enterCompare(): void {
    if (!this.enableCompare) return;
    const modes = this.modes;
    this.compareA = this.activeIndex;
    this.compareB =
      modes.find((m) => m.index !== this.compareA)?.index ?? this.compareA;
    this.comparePct = 50;
    this.compareOn = true;
    this.resetZoom();
    const a = modes.find((m) => m.index === this.compareA);
    const b = modes.find((m) => m.index === this.compareB);
    if (a) void this.prefetch(a.image);
    if (b) void this.prefetch(b.image);
  }

  private exitCompare(): void {
    this.compareOn = false;
    this.compareDragging = false;
    this.teardownPointers();
  }

  private setCompareSide(side: 'a' | 'b', index: number): void {
    if (side === 'a') {
      if (index === this.compareB) return;
      this.compareA = index;
    } else {
      if (index === this.compareA) return;
      this.compareB = index;
    }
  }

  private onCompareDown(e: PointerEvent): void {
    if (e.button != null && e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    this.compareDragging = true;
    this.pointerId = e.pointerId;
    this.updateCompareFromClientX(e.clientX);
    const el = this.compareEl;
    try {
      el?.setPointerCapture?.(e.pointerId);
    } catch {
      // ignore
    }
    el?.addEventListener('pointermove', this.onCompareMove);
    el?.addEventListener('pointerup', this.onCompareUp);
    el?.addEventListener('pointercancel', this.onCompareUp);
    window.addEventListener('pointermove', this.onCompareMove);
    window.addEventListener('pointerup', this.onCompareUp);
    window.addEventListener('pointercancel', this.onCompareUp);
  }

  private onCompareMove = (e: PointerEvent): void => {
    if (!this.compareDragging || e.pointerId !== this.pointerId) return;
    e.preventDefault();
    this.updateCompareFromClientX(e.clientX);
  };

  private onCompareUp = (e: PointerEvent): void => {
    if (this.pointerId != null && e.pointerId !== this.pointerId) return;
    this.compareDragging = false;
    const el = this.compareEl;
    if (this.pointerId != null) {
      try {
        el?.releasePointerCapture?.(this.pointerId);
      } catch {
        // ignore
      }
    }
    this.pointerId = null;
    el?.removeEventListener('pointermove', this.onCompareMove);
    el?.removeEventListener('pointerup', this.onCompareUp);
    el?.removeEventListener('pointercancel', this.onCompareUp);
    this.teardownPointers();
  };

  /** Physical left→right mapping (matches clip-path / handle `left`). No RTL flip. */
  private updateCompareFromClientX(clientX: number): void {
    const el = this.compareEl;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (!rect.width) return;
    const ratio = (clientX - rect.left) / rect.width;
    this.comparePct = Math.max(0, Math.min(100, Math.round(ratio * 100)));
  }

  private onCompareKey(e: KeyboardEvent): void {
    // Physical arrows: right/up reveal more of mode A
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      this.comparePct = Math.min(100, this.comparePct + 2);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      this.comparePct = Math.max(0, this.comparePct - 2);
    } else if (e.key === 'Home') {
      e.preventDefault();
      this.comparePct = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      this.comparePct = 100;
    }
  }

  private designVars(): Record<string, string> {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'als_');
    const shadowLevel = Math.max(0, Math.min(3, getUnitValue(c.als_shadow, 1)));
    const shadows = [
      'none',
      '0 10px 28px rgba(43, 33, 28, 0.08)',
      '0 16px 40px rgba(43, 33, 28, 0.12)',
      '0 22px 56px rgba(43, 33, 28, 0.18)',
    ];
    return {
      ...themeStyleMap(theme),
      '--als-stage-bg': String(c.als_stage_bg || '#1a1614'),
      '--als-panel-bg': String(c.als_panel_bg || theme.card),
      '--als-meter-color': String(c.als_meter_color || theme.accent),
      '--als-handle-color': String(c.als_handle_color || '#ffffff'),
      '--als-thumb-border': String(c.als_thumb_border || theme.border),
      '--als-shadow': shadows[shadowLevel] || shadows[1],
      '--als-aspect': parseAspectRatio(c.als_aspect),
      '--als-max-width': `${getUnitValue(c.als_max_width, 720)}px`,
      '--als-compare': `${this.comparePct}%`,
    };
  }

  private productUrl(mode: LightMode | null): string {
    if (!mode) return '';
    return mode.product_url || extractLink(this.config?.als_product_url);
  }

  private productBtn(mode: LightMode | null): string {
    return (
      mode?.btn_text ||
      localizedString(this.config?.als_default_btn as string) ||
      t('مشاهدة المنتج', 'View product')
    );
  }

  private renderMetrics(mode: LightMode) {
    if (!this.showMetrics) return nothing;
    return html`
      <div class="als-metrics" aria-label=${t('مؤشرات الخامة', 'Fabric metrics')}>
        ${metricsForMode(mode).map((m) => {
          const level = levelLabel(m.value);
          return html`
            <div class="als-metric">
              <div class="als-metric__head">
                <span>${t(m.labelAr, m.labelEn)}</span>
                <span class="als-metric__val">
                  ${Math.round(m.value)}
                  <span class="als-metric__level">${t(level.ar, level.en)}</span>
                </span>
              </div>
              <div class="als-metric__bar" aria-hidden="true">
                <span style=${styleMap({ width: `${m.value}%` })}></span>
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }

  private renderModeButtons() {
    return html`
      <div class="als-block">
        <h3 class="als-block__title">
          ${t('أوضاع الإضاءة', 'Lighting modes')}
        </h3>
        <div
          class="als-modes"
          role="listbox"
          aria-label=${t('أوضاع الإضاءة', 'Lighting modes')}
        >
          ${this.modes.map((mode, i) => {
            const pressed = mode.index === this.activeIndex;
            return html`
              <button
                type="button"
                class=${classMap({
                  'als-mode': true,
                  'als-mode--active': pressed,
                })}
                role="option"
                aria-selected=${pressed ? 'true' : 'false'}
                aria-pressed=${pressed ? 'true' : 'false'}
                @click=${() => {
                  if (this.compareOn) this.exitCompare();
                  void this.selectMode(mode.index);
                }}
              >
                <img
                  class="als-mode__thumb"
                  src=${mode.thumb || mode.image}
                  alt=${mode.alt}
                  loading=${i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
                <span class="als-mode__name">${mode.name}</span>
              </button>
            `;
          })}
        </div>
      </div>
    `;
  }

  private renderInfoCard(mode: LightMode) {
    const url = this.productUrl(mode);
    const colorBlock =
      this.showColor && mode.color_name
        ? html`<div>
            <span class="als-info__label">${t('اللون', 'Color')}</span>
            <p class="als-info__value">${mode.color_name}</p>
          </div>`
        : nothing;
    const notesBlock =
      this.showNotes && mode.notes
        ? html`<div>
            <span class="als-info__label">${t('ملاحظات', 'Notes')}</span>
            <p class="als-info__value">${mode.notes}</p>
          </div>`
        : nothing;

    return html`
      <div class="als-info">
        ${colorBlock || notesBlock
          ? html`<div class="als-info__meta">
              ${colorBlock}${notesBlock}
            </div>`
          : nothing}
        ${this.showMetrics
          ? html`<div class="als-block">
              <h3 class="als-block__title">
                ${t('مؤشرات الخامة', 'Fabric metrics')}
              </h3>
              ${this.renderMetrics(mode)}
            </div>`
          : nothing}
        ${this.showProduct && isValidHref(url)
          ? html`<a class="fs-btn als-info__cta" href=${url}
              >${this.productBtn(mode)}</a
            >`
          : nothing}
      </div>
    `;
  }

  private renderViewer(mode: LightMode) {
    if (this.compareOn) {
      const a = this.modes.find((m) => m.index === this.compareA) || mode;
      const b = this.modes.find((m) => m.index === this.compareB) || mode;
      return html`
        <div class="als-viewer">
          <div class="als-compare-bar">
            <div class="als-compare-pick">
              <label>
                <span>${t('الوضع الأول', 'First mode')}</span>
                <select
                  .value=${String(this.compareA)}
                  @change=${(e: Event) =>
                    this.setCompareSide(
                      'a',
                      Number((e.target as HTMLSelectElement).value)
                    )}
                >
                  ${this.modes.map(
                    (m) => html`<option
                      value=${m.index}
                      ?disabled=${m.index === this.compareB}
                    >
                      ${m.name}
                    </option>`
                  )}
                </select>
              </label>
              <label>
                <span>${t('الوضع الثاني', 'Second mode')}</span>
                <select
                  .value=${String(this.compareB)}
                  @change=${(e: Event) =>
                    this.setCompareSide(
                      'b',
                      Number((e.target as HTMLSelectElement).value)
                    )}
                >
                  ${this.modes.map(
                    (m) => html`<option
                      value=${m.index}
                      ?disabled=${m.index === this.compareA}
                    >
                      ${m.name}
                    </option>`
                  )}
                </select>
              </label>
            </div>
            <button
              type="button"
              class="als-btn"
              aria-label=${t('الخروج من المقارنة', 'Exit compare')}
              @click=${() => this.exitCompare()}
            >
              ${t('إنهاء المقارنة', 'End compare')}
            </button>
          </div>

          <div class="als-stage-wrap">
            <div
              class=${classMap({
                'als-compare': true,
                'als-compare--dragging': this.compareDragging,
              })}
              dir="ltr"
              role="slider"
              tabindex="0"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow=${this.comparePct}
              aria-label=${t('شريط المقارنة', 'Compare slider')}
              style=${styleMap({ '--als-compare': `${this.comparePct}%` })}
              @pointerdown=${this.onCompareDown}
              @keydown=${this.onCompareKey}
            >
              <img
                class="als-compare__layer"
                src=${b.image}
                alt=${b.alt}
                draggable="false"
              />
              <img
                class="als-compare__layer als-compare__top"
                src=${a.image}
                alt=${a.alt}
                draggable="false"
              />
              <span class="als-compare__label als-compare__label--a"
                >${a.name}</span
              >
              <span class="als-compare__label als-compare__label--b"
                >${b.name}</span
              >
              <div class="als-compare__handle" aria-hidden="true">
                <span class="als-compare__hit"></span>
                <span class="als-compare__knob"></span>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    const imgStyle = {
      transform: `translate(${this.panX}px, ${this.panY}px) scale(${this.zoom})`,
    };

    return html`
      <div class="als-viewer">
        <div class="als-stage-wrap">
          <div
            class=${classMap({
              'als-stage': true,
              'als-stage--panning': this.zoom > 1,
              'als-stage--dragging': this.panning,
            })}
            @pointermove=${(e: PointerEvent) => this.onStageMove(e)}
            @pointerleave=${() => this.onStageLeave()}
            @pointerdown=${this.onPanDown}
          >
            ${this.displaySrc
              ? html`<img
                  class=${classMap({
                    'als-stage__img': true,
                    'als-stage__img--fade':
                      this.fading && !prefersReducedMotion(),
                  })}
                  style=${styleMap(imgStyle)}
                  src=${this.displaySrc}
                  alt=${mode.alt}
                  decoding="async"
                />`
              : nothing}
            ${this.enableLens
              ? html`<div
                  class=${classMap({
                    'als-lens': true,
                    'als-lens--on': this.lensOn,
                    'als-desktop-only': true,
                  })}
                  style=${styleMap(this.lensStyle)}
                  aria-hidden="true"
                ></div>`
              : nothing}
          </div>
        </div>

        <div class="als-caption" aria-live="polite">
          <div class="als-caption__text">
            <p class="als-caption__name">${mode.name}</p>
            ${mode.desc
              ? html`<p class="als-caption__desc">${mode.desc}</p>`
              : nothing}
          </div>
          <div class="als-tools">
            ${this.enableZoomBtns
              ? html`
                  <div class="als-tools__group" role="group" aria-label=${t('التكبير', 'Zoom')}>
                    <button
                      type="button"
                      class="als-btn"
                      aria-label=${t('تكبير', 'Zoom in')}
                      @click=${() => this.zoomIn()}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      class="als-btn"
                      aria-label=${t('تصغير', 'Zoom out')}
                      ?disabled=${this.zoom <= 1}
                      @click=${() => this.zoomOut()}
                    >
                      −
                    </button>
                    <button
                      type="button"
                      class="als-btn"
                      aria-label=${t('إعادة ضبط التكبير', 'Reset zoom')}
                      @click=${() => this.resetZoom()}
                    >
                      ${t('ضبط', 'Reset')}
                    </button>
                  </div>
                `
              : nothing}
            ${this.enableCompare
              ? html`<button
                  type="button"
                  class="als-btn als-btn--primary"
                  aria-label=${t('وضع المقارنة', 'Compare mode')}
                  @click=${() => this.enterCompare()}
                >
                  ${t('مقارنة', 'Compare')}
                </button>`
              : nothing}
            ${this.showProduct && isValidHref(this.productUrl(mode))
              ? html`<a
                  class="als-btn als-btn--accent"
                  href=${this.productUrl(mode)!}
                >
                  ${this.productBtn(mode)}
                </a>`
              : nothing}
          </div>
        </div>
      </div>
    `;
  }

  private renderPanel(mode: LightMode) {
    return html`
      <aside
        class="als-panel"
        aria-label=${t('لوحة التحكم', 'Control panel')}
      >
        ${this.renderModeButtons()}

        <div class="als-mobile-only">
          <div class="als-accordion">
            <button
              type="button"
              class="als-accordion__trigger"
              aria-expanded=${this.notesOpen ? 'true' : 'false'}
              @click=${() => {
                this.notesOpen = !this.notesOpen;
              }}
            >
              <span>${t('التفاصيل والملاحظات', 'Details & notes')}</span>
              <span aria-hidden="true">${this.notesOpen ? '−' : '+'}</span>
            </button>
            ${this.notesOpen
              ? html`<div class="als-accordion__body">
                  ${this.renderInfoCard(mode)}
                </div>`
              : nothing}
          </div>
        </div>

        <div class="als-desktop-only">${this.renderInfoCard(mode)}</div>
      </aside>
    `;
  }

  render() {
    const modes = this.modes;
    if (!modes.length) return nothing;

    const mode = this.active;
    if (!mode) return nothing;

    const c = this.config || {};
    const theme = readSectionTheme(c, 'als_');
    const animate = theme.animate && !prefersReducedMotion();
    const full = isTruthy(c.als_full_width, false);
    const title = localizedString(c.als_title as string);
    const desc = localizedString(c.als_desc as string);

    return html`
      <section
        class=${classMap({
          'fs-section': true,
          'fs-section--full': full,
          'fs-animate': animate,
        })}
        style=${styleMap(this.designVars())}
        aria-label=${title || t('استوديو الإضاءة والخامة', 'Light & fabric studio')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<header class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </header>`
            : nothing}

          <div class="als-shell">
            ${this.renderViewer(mode)}
            ${this.renderPanel(mode)}
          </div>
        </div>
      </section>
    `;
  }
}
