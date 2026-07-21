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
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { componentStyles } from './styles.js';
import { parseBeforeAfterPairs } from './utils.js';

export default class StyleBeforeAfter extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  /** Reveal position per pair id (0–100). */
  @state() private reveals: Record<string, number> = {};

  private boundLang = () => this.requestUpdate();
  private dragId = '';

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
    window.addEventListener('pointerup', this.endDrag);
    window.addEventListener('pointercancel', this.endDrag);
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLang);
    window.removeEventListener('pointerup', this.endDrag);
    window.removeEventListener('pointercancel', this.endDrag);
    super.disconnectedCallback();
  }

  private get pairs() {
    return parseBeforeAfterPairs(this.config?.stba_items);
  }

  private revealFor(id: string): number {
    const v = this.reveals[id];
    return typeof v === 'number' ? v : 50;
  }

  private setReveal(id: string, value: number): void {
    const next = Math.min(95, Math.max(5, value));
    this.reveals = { ...this.reveals, [id]: next };
  }

  private endDrag = (): void => {
    this.dragId = '';
  };

  private onPointerDown(id: string, e: PointerEvent): void {
    this.dragId = id;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    this.updateFromEvent(id, e);
  }

  private onPointerMove(id: string, e: PointerEvent): void {
    if (this.dragId !== id) return;
    this.updateFromEvent(id, e);
  }

  private updateFromEvent(id: string, e: PointerEvent): void {
    const el = this.renderRoot.querySelector<HTMLElement>(`[data-compare="${id}"]`);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (!rect.width) return;
    const rtl = getComputedStyle(this).direction === 'rtl';
    const raw = ((e.clientX - rect.left) / rect.width) * 100;
    this.setReveal(id, rtl ? 100 - raw : raw);
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'stba_');
    const animate = theme.animate && !prefersReducedMotion();
    const title = localizedString(c.stba_title as never) || t('قبل وبعد', 'Before & After');
    const desc = localizedString(c.stba_desc as never);
    const showTitle = isTruthy(c.stba_show_title, true);
    const pairs = this.pairs;

    return html`
      <section
        class=${classMap({ 'fs-section': true, 'fs-animate': animate, 'stba-shell': true })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title}
      >
        <div class="fs-container">
          ${showTitle
            ? html`<header class="fs-header fs-header--editorial">
                <p class="fs-eyebrow">${t('تحوّل الإطلالة', 'Style transformation')}</p>
                <h2 class="fs-title">${title}</h2>
                <span class="fs-title-line" aria-hidden="true"></span>
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </header>`
            : nothing}

          ${pairs.length
            ? html`
                <div class="stba-pairs">
                  ${pairs.map((pair) => {
                    const pos = this.revealFor(pair.id);
                    return html`
                      <article class="stba-compare" aria-label=${pair.caption || t('مقارنة', 'Comparison')}>
                        <div
                          class="stba-slider"
                          data-compare=${pair.id}
                          @pointerdown=${(e: PointerEvent) => this.onPointerDown(pair.id, e)}
                          @pointermove=${(e: PointerEvent) => this.onPointerMove(pair.id, e)}
                        >
                          <img
                            class="stba-slider__img stba-slider__img--after"
                            src=${pair.afterImage}
                            alt=${pair.afterLabel || t('بعد', 'After')}
                            loading="lazy"
                            draggable="false"
                          />
                          <div
                            class="stba-slider__before"
                            style=${styleMap({ width: `${pos}%` })}
                          >
                            <img
                              class="stba-slider__img"
                              src=${pair.beforeImage}
                              alt=${pair.beforeLabel || t('قبل', 'Before')}
                              loading="lazy"
                              draggable="false"
                            />
                          </div>
                          <span class="stba-slider__label stba-slider__label--before">
                            ${pair.beforeLabel || t('قبل', 'Before')}
                          </span>
                          <span class="stba-slider__label stba-slider__label--after">
                            ${pair.afterLabel || t('بعد', 'After')}
                          </span>
                          <div
                            class="stba-handle"
                            style=${styleMap({ insetInlineStart: `${pos}%` })}
                            role="slider"
                            tabindex="0"
                            aria-valuemin="5"
                            aria-valuemax="95"
                            aria-valuenow=${Math.round(pos)}
                            aria-label=${t('اسحب للمقارنة', 'Drag to compare')}
                            @keydown=${(e: KeyboardEvent) => {
                              if (e.key === 'ArrowLeft') {
                                e.preventDefault();
                                this.setReveal(pair.id, pos + (getComputedStyle(this).direction === 'rtl' ? 4 : -4));
                              } else if (e.key === 'ArrowRight') {
                                e.preventDefault();
                                this.setReveal(pair.id, pos + (getComputedStyle(this).direction === 'rtl' ? -4 : 4));
                              }
                            }}
                          >
                            <span class="stba-handle__line" aria-hidden="true"></span>
                            <span class="stba-handle__knob" aria-hidden="true">
                              <i class="sicon-arrow-left-right"></i>
                            </span>
                          </div>
                        </div>
                        ${pair.caption ? html`<p class="stba-caption">${pair.caption}</p>` : nothing}
                      </article>
                    `;
                  })}
                </div>
              `
            : html`<div class="fs-empty">${t('أضف مقارنات قبل وبعد من إعدادات العنصر', 'Add before & after pairs from element settings')}</div>`}
          ${renderCommerceOutcome(this.config || {}, 'stba_')}
        </div>
      </section>
    `;
  }
}
