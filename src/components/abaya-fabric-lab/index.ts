import { html, LitElement, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { localizedString } from '../../utils/localizedString.js';
import {
  isTruthy,
  prefersReducedMotion,
  readSectionTheme,
  t,
  themeStyleMap,
} from '../../utils/helpers.js';
import { renderCommerceOutcome } from '../../utils/commerceOutcome.js';
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { componentStyles } from './styles.js';
import { isPlayableVideo, parseFabrics } from './utils.js';
import { METER_SPECS, type FabricLabItem } from './types.js';

export default class AbayaFabricLab extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private activeIndex = 0;
  @state() private compareMode = false;
  @state() private compareIds: string[] = [];

  private _onLangChange = () => this.requestUpdate();
  private _videoObserver: IntersectionObserver | null = null;
  private static fontsReady = false;

  static styles = [sharedSectionCss, componentStyles];

  connectedCallback(): void {
    super.connectedCallback();
    this._ensureFonts();
    document.addEventListener('language-changed', this._onLangChange);
    this._syncVisibility();
    this._setupVideoObserver();
  }

  private _ensureFonts(): void {
    if (AbayaFabricLab.fontsReady || typeof document === 'undefined') return;
    const id = 'afl-luxury-fonts';
    if (document.getElementById(id)) {
      AbayaFabricLab.fontsReady = true;
      return;
    }
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;500;600;700&display=swap';
    document.head.appendChild(link);
    AbayaFabricLab.fontsReady = true;
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('language-changed', this._onLangChange);
    this._videoObserver?.disconnect();
    this._videoObserver = null;
  }

  protected firstUpdated(): void {
    this._setupVideoObserver();
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config')) {
      const fabrics = this.fabrics;
      if (this.activeIndex >= fabrics.length) {
        this.activeIndex = Math.max(0, fabrics.length - 1);
      }
    }
    this._syncVisibility();
    this._observeVideos();
  }

  private get fabrics(): FabricLabItem[] {
    return parseFabrics(this.config?.afl_fabrics);
  }

  private get theme() {
    return readSectionTheme(this.config, 'afl_');
  }

  private get autoplayVideo(): boolean {
    return isTruthy(this.config?.afl_autoplay_video);
  }

  private get activeFabric(): FabricLabItem | null {
    return this.fabrics[this.activeIndex] ?? null;
  }

  private get compareFabrics(): FabricLabItem[] {
    return this.compareIds
      .map((id) => this.fabrics.find((f) => f.id === id))
      .filter((f): f is FabricLabItem => !!f)
      .slice(0, 2);
  }

  private _label(key: string, ar: string, en: string): string {
    return localizedString(this.config?.[key] as string, '') || t(ar, en);
  }

  private _syncVisibility(): void {
    this.style.display = this.fabrics.length ? '' : 'none';
  }

  private _setupVideoObserver(): void {
    if (this._videoObserver) return;
    this._videoObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting && this.autoplayVideo) {
            video.play().catch(() => undefined);
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0.35 }
    );
    this._observeVideos();
  }

  private _observeVideos(): void {
    if (!this._videoObserver) return;
    this._videoObserver.disconnect();
    this.renderRoot
      .querySelectorAll('video')
      .forEach((v) => this._videoObserver!.observe(v));
  }

  private _selectFabric(index: number): void {
    this.activeIndex = index;
  }

  private _toggleCompare(id: string): void {
    if (this.compareIds.includes(id)) {
      this.compareIds = this.compareIds.filter((x) => x !== id);
      return;
    }
    if (this.compareIds.length >= 2) {
      this.compareIds = [this.compareIds[1], id];
      return;
    }
    this.compareIds = [...this.compareIds, id];
  }

  private _enterCompare(): void {
    if (this.compareIds.length < 2 && this.activeFabric) {
      this.compareIds = [this.activeFabric.id];
    }
    this.compareMode = true;
  }

  private _exitCompare(): void {
    this.compareMode = false;
    this.compareIds = [];
  }

  private _initial(name: string): string {
    const trimmed = name.trim();
    return trimmed ? trimmed.slice(0, 1) : 'أ';
  }

  render() {
    if (!this.fabrics.length) {
      return html`<div class="fs-empty" role="status">
        ${t('لا توجد أقمشة للعرض', 'No fabrics to display')}
      </div>`;
    }

    const theme = this.theme;
    const animate = theme.animate && !prefersReducedMotion();
    const title = localizedString(this.config?.afl_title as string);
    const desc = localizedString(this.config?.afl_desc as string);
    const compareBtn = this._label('afl_compare_btn', 'قارني خامتين', 'Compare two fabrics');
    const exitCompareBtn = this._label('afl_exit_compare', 'إنهاء المقارنة', 'Exit compare');

    return html`
      <section
        class=${classMap({
          'fs-section': true,
          'fs-animate': animate,
        })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('مختبر أقمشة العبايات', 'Abaya fabric lab')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<header class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </header>`
            : nothing}

          <div class="afl-studio">
            <div class="afl-toolbar">
              <div>
                <span class="afl-toolbar__kicker"
                  >${t('أتيليه العينات', 'Swatch atelier')}</span
                >
                <p class="afl-toolbar__hint">
                  ${this.compareMode
                    ? t('اختاري خامتين للمقارنة', 'Select two fabrics to compare')
                    : t('لمسي عينة لاستكشاف الخامة', 'Tap a swatch to explore the fabric')}
                </p>
              </div>
              ${!this.compareMode
                ? html`<button type="button" class="fs-btn fs-btn--ghost" @click=${this._enterCompare}>
                    ${compareBtn}
                  </button>`
                : html`<button type="button" class="fs-btn fs-btn--ghost" @click=${this._exitCompare}>
                    ${exitCompareBtn}
                  </button>`}
            </div>

            <div
              class="afl-swatches"
              role="tablist"
              aria-label=${t('عينات الأقمشة', 'Fabric swatches')}
            >
              ${this.fabrics.map((f, i) => this._renderSwatch(f, i))}
            </div>

            ${this.compareMode
              ? this._renderCompare(animate)
              : this._renderDetail(this.activeFabric, animate)}
          </div>
        </div>
        ${renderCommerceOutcome(this.config || {}, 'afl_')}
      </section>
    `;
  }

  private _renderSwatch(fabric: FabricLabItem, index: number) {
    const selected = !this.compareMode && index === this.activeIndex;
    const pressed = this.compareMode && this.compareIds.includes(fabric.id);
    const mark = this.compareIds.indexOf(fabric.id) + 1;

    return html`
      <button
        type="button"
        class="afl-swatch"
        role="tab"
        aria-selected=${selected ? 'true' : 'false'}
        aria-pressed=${pressed ? 'true' : 'false'}
        aria-label=${fabric.fabric_name}
        @click=${() =>
          this.compareMode ? this._toggleCompare(fabric.id) : this._selectFabric(index)}
      >
        <span class="afl-swatch__ring">
          <span class="afl-swatch__media">
            ${fabric.macro_image
              ? html`<img
                  src=${fabric.macro_image}
                  alt=""
                  loading=${index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />`
              : html`<span class="afl-swatch__fallback" aria-hidden="true">
                  ${this._initial(fabric.fabric_name)}
                </span>`}
          </span>
          <span class="afl-swatch__badge" aria-hidden="true">${mark > 0 ? mark : ''}</span>
        </span>
        <span class="afl-swatch__name">${fabric.fabric_name}</span>
      </button>
    `;
  }

  private _renderDetail(fabric: FabricLabItem | null, animate: boolean) {
    if (!fabric) return nothing;

    return html`
      <div class="afl-stage" aria-live="polite">
        <div class="afl-media">
          ${isPlayableVideo(fabric.video_url)
            ? html`<video
                src=${fabric.video_url}
                muted
                playsinline
                loop
                ?autoplay=${this.autoplayVideo}
                aria-label=${fabric.fabric_name}
              ></video>`
            : fabric.macro_image
              ? html`<img
                  src=${fabric.macro_image}
                  alt=${fabric.fabric_name}
                  loading="eager"
                  decoding="async"
                />`
              : nothing}
          <span class="afl-media__tag">${t('عينة مقربة', 'Macro sample')}</span>
        </div>

        <div class="afl-info">
          <span class="afl-info__kicker">${t('ملف الخامة', 'Fabric profile')}</span>
          <h3 class="afl-info__title">${fabric.fabric_name}</h3>
          ${fabric.fabric_desc
            ? html`<p class="afl-info__desc">${fabric.fabric_desc}</p>`
            : nothing}

          <div>
            <h4 class="afl-section-title">${t('خصائص القماش', 'Fabric properties')}</h4>
            <div class="afl-meters" aria-label=${t('خصائص القماش', 'Fabric properties')}>
              ${METER_SPECS.map((spec) => this._renderMeter(fabric, spec, animate))}
            </div>
          </div>

          ${fabric.wash_care || fabric.iron_care || fabric.best_use
            ? html`<div>
                <h4 class="afl-section-title">${t('ملاحظات العناية', 'Care notes')}</h4>
                <div class="afl-care">
                  ${fabric.wash_care
                    ? html`<p class="afl-care__item">
                        <strong>${t('الغسيل:', 'Wash:')}</strong> ${fabric.wash_care}
                      </p>`
                    : nothing}
                  ${fabric.iron_care
                    ? html`<p class="afl-care__item">
                        <strong>${t('الكي:', 'Iron:')}</strong> ${fabric.iron_care}
                      </p>`
                    : nothing}
                  ${fabric.best_use
                    ? html`<p class="afl-care__item">
                        <strong>${t('الأنسب لـ:', 'Best for:')}</strong> ${fabric.best_use}
                      </p>`
                    : nothing}
                </div>
              </div>`
            : nothing}
        </div>
      </div>
    `;
  }

  private _renderCompare(animate: boolean) {
    const fabrics = this.compareFabrics;

    if (fabrics.length < 2) {
      return html`<p class="afl-empty" role="status">
        ${t('اختاري قماشين للمقارنة (حد أقصى ٢)', 'Select 2 fabrics to compare (max 2)')}
      </p>`;
    }

    return html`
      <div class="afl-compare" role="region" aria-label=${t('مقارنة الأقمشة', 'Fabric comparison')}>
        ${fabrics.map(
          (f) => html`
            <article class="afl-compare__card">
              <div class="afl-compare__media">
                ${f.macro_image
                  ? html`<img
                      src=${f.macro_image}
                      alt=${f.fabric_name}
                      loading="lazy"
                      decoding="async"
                    />`
                  : nothing}
              </div>
              <h3>${f.fabric_name}</h3>
              <div class="afl-meters">
                ${METER_SPECS.map((spec) => this._renderMeter(f, spec, animate))}
              </div>
            </article>
          `
        )}
      </div>
    `;
  }

  private _renderMeter(
    fabric: FabricLabItem,
    spec: (typeof METER_SPECS)[number],
    animate: boolean
  ) {
    const value = fabric[spec.key];
    return html`
      <div class="afl-meter">
        <div class="afl-meter__label">
          <span>${t(spec.labelAr, spec.labelEn)}</span>
          <span class="afl-meter__value">${value}%</span>
        </div>
        <div class=${classMap({ 'fs-meter': true, 'fs-animate': animate })}>
          <span style=${styleMap({ width: `${value}%` })}></span>
        </div>
      </div>
    `;
  }
}
