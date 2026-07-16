import { html, LitElement, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { localizedString } from '../../utils/localizedString.js';
import {
  isTruthy,
  isValidHref,
  readSectionTheme,
  safeStorageGet,
  safeStorageSet,
  t,
  themeStyleMap,
} from '../../utils/helpers.js';
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { componentStyles } from './styles.js';
import {
  computeWinningTag,
  findMatchingResult,
  getStorageKey,
  parseCards,
  parseResults,
} from './utils.js';
import type {
  StoredSwipeState,
  SwipeAction,
  SwipeCard,
  SwipeHistoryItem,
} from './types.js';

const SWIPE_THRESHOLD = 80;

export default class AbayaStyleSwipe extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private cardIndex = 0;
  @state() private likedIds: string[] = [];
  @state() private history: SwipeHistoryItem[] = [];
  @state() private finished = false;
  @state() private dragX = 0;
  @state() private dragging = false;

  private _onLangChange = () => this.requestUpdate();
  private _storageKey = '';
  private _pointerId: number | null = null;
  private _startX = 0;
  private _boundPointerMove = (e: PointerEvent) => this._onPointerMove(e);
  private _boundPointerUp = (e: PointerEvent) => this._onPointerUp(e);

  static styles = [sharedSectionCss, componentStyles];

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('language-changed', this._onLangChange);
    this._loadState();
    this._syncVisibility();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('language-changed', this._onLangChange);
    this._cleanupPointerListeners();
  }

  updated(changed: Map<PropertyKey, unknown>): void {
    this._syncVisibility();
    if (changed.has('config')) {
      this._loadState();
    }
  }

  private get cards(): SwipeCard[] {
    return parseCards(this.config?.ass_cards);
  }

  private get results() {
    return parseResults(this.config?.ass_results);
  }

  private get theme() {
    return readSectionTheme(this.config, 'ass_');
  }

  private get enableStorage(): boolean {
    return isTruthy(this.config?.ass_enable_storage, true);
  }

  private get currentCard(): SwipeCard | null {
    return this.cards[this.cardIndex] ?? null;
  }

  private get likedCards(): SwipeCard[] {
    return this.cards.filter((c) => this.likedIds.includes(c.id));
  }

  private _syncVisibility(): void {
    this.style.display = this.cards.length ? '' : 'none';
  }

  private _loadState(): void {
    if (!this.enableStorage) return;
    this._storageKey = getStorageKey(
      this.config?.ass_storage_key,
      'ass-style-swipe-state'
    );
    const stored = safeStorageGet<StoredSwipeState>(this._storageKey, {
      index: 0,
      likedIds: [],
      history: [],
    });
    this.cardIndex = Math.min(stored.index, Math.max(0, this.cards.length - 1));
    this.likedIds = stored.likedIds || [];
    this.history = stored.history || [];
    this.finished = this.cardIndex >= this.cards.length;
  }

  private _saveState(): void {
    if (!this.enableStorage) return;
    safeStorageSet(this._storageKey, {
      index: this.cardIndex,
      likedIds: this.likedIds,
      history: this.history,
    });
  }

  private _cleanupPointerListeners(): void {
    window.removeEventListener('pointermove', this._boundPointerMove);
    window.removeEventListener('pointerup', this._boundPointerUp);
    window.removeEventListener('pointercancel', this._boundPointerUp);
    this._pointerId = null;
  }

  private _onPointerDown(e: PointerEvent): void {
    if (this.finished || !this.currentCard) return;
    this.dragging = true;
    this._pointerId = e.pointerId;
    this._startX = e.clientX;
    this.dragX = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    window.addEventListener('pointermove', this._boundPointerMove);
    window.addEventListener('pointerup', this._boundPointerUp);
    window.addEventListener('pointercancel', this._boundPointerUp);
  }

  private _onPointerMove(e: PointerEvent): void {
    if (!this.dragging || e.pointerId !== this._pointerId) return;
    this.dragX = e.clientX - this._startX;
  }

  private _onPointerUp(e: PointerEvent): void {
    if (!this.dragging || e.pointerId !== this._pointerId) return;
    this._cleanupPointerListeners();
    this.dragging = false;

    if (this.dragX > SWIPE_THRESHOLD) {
      this._swipe('like');
    } else if (this.dragX < -SWIPE_THRESHOLD) {
      this._swipe('skip');
    } else {
      this.dragX = 0;
    }
  }

  private _swipe(action: SwipeAction): void {
    const card = this.currentCard;
    if (!card) return;

    this.history = [...this.history, { cardId: card.id, action }];
    if (action === 'like') {
      this.likedIds = [...this.likedIds, card.id];
    }

    this.dragX = 0;
    this.cardIndex += 1;

    if (this.cardIndex >= this.cards.length) {
      this.finished = true;
    }

    this._saveState();
  }

  private _undo(): void {
    const last = this.history[this.history.length - 1];
    if (!last) return;

    this.history = this.history.slice(0, -1);
    if (last.action === 'like') {
      this.likedIds = this.likedIds.filter((id) => id !== last.cardId);
    }

    this.cardIndex = Math.max(0, this.cardIndex - 1);
    this.finished = false;
    this._saveState();
  }

  private _restart(): void {
    this.cardIndex = 0;
    this.likedIds = [];
    this.history = [];
    this.finished = false;
    this.dragX = 0;
    this._saveState();
  }

  render() {
    if (!this.cards.length) {
      return html`<div class="fs-empty" role="status">
        ${t('لا توجد بطاقات للعرض', 'No cards to display')}
      </div>`;
    }

    const theme = this.theme;
    const title = localizedString(this.config?.ass_title as string);
    const desc = localizedString(this.config?.ass_desc as string);
    const likeLabel = localizedString(this.config?.ass_like_label as string) ||
      t('أعجبني', 'Like');
    const skipLabel = localizedString(this.config?.ass_skip_label as string) ||
      t('تخطي', 'Skip');
    const undoLabel = localizedString(this.config?.ass_undo_label as string) ||
      t('تراجع', 'Undo');
    const restartLabel = localizedString(this.config?.ass_restart_label as string) ||
      t('ابدئي من جديد', 'Restart');

    return html`
      <section
        class="fs-section"
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('اكتشفي أسلوبك', 'Discover your style')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<header class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </header>`
            : nothing}

          ${this.finished
            ? this._renderResult(restartLabel)
            : this._renderDeck(likeLabel, skipLabel, undoLabel)}
        </div>
      </section>
    `;
  }

  private _renderDeck(likeLabel: string, skipLabel: string, undoLabel: string) {
    const card = this.currentCard;
    if (!card) return nothing;

    const likeOpacity = Math.min(1, Math.max(0, this.dragX / SWIPE_THRESHOLD));
    const skipOpacity = Math.min(1, Math.max(0, -this.dragX / SWIPE_THRESHOLD));
    const rotate = this.dragX * 0.06;
    const remaining = this.cards.length - this.cardIndex;
    const progress = Math.round((this.cardIndex / this.cards.length) * 100);

    return html`
      <div class="ass-studio">
        <div class="ass-progress" aria-live="polite">
          <span class="ass-progress__meta">
            ${t('إطلالة', 'Look')} ${this.cardIndex + 1}
            <span aria-hidden="true">·</span>
            ${this.cards.length}
          </span>
          <div
            class="ass-progress__track"
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax=${this.cards.length}
            aria-valuenow=${this.cardIndex}
            aria-label=${t('تقدم الاكتشاف', 'Discovery progress')}
          >
            <div
              class="ass-progress__fill"
              style=${styleMap({ width: `${progress}%` })}
            ></div>
          </div>
        </div>

        <p class="ass-hint">
          ${t('اسحبي يميناً للإعجاب أو يساراً للتخطي', 'Swipe right to like, left to skip')}
        </p>

        <div class="ass-deck" aria-label=${t('بطاقات الأسلوب', 'Style cards')}>
          ${remaining > 2 ? html`<div class="ass-stack ass-stack--2" aria-hidden="true"></div>` : nothing}
          ${remaining > 1 ? html`<div class="ass-stack ass-stack--1" aria-hidden="true"></div>` : nothing}

          <div
            class="ass-card ${this.dragging ? 'ass-card--dragging' : ''}"
            style=${styleMap({
              transform: `translateX(${this.dragX}px) rotate(${rotate}deg)`,
            })}
            @pointerdown=${this._onPointerDown}
            role="article"
            aria-label=${card.look_name}
          >
            <span
              class="ass-indicator ass-indicator--like ${likeOpacity > 0.2 ? 'ass-indicator--visible' : ''}"
              style=${styleMap({ opacity: String(likeOpacity) })}
              aria-hidden="true"
            >
              ${likeLabel}
            </span>
            <span
              class="ass-indicator ass-indicator--skip ${skipOpacity > 0.2 ? 'ass-indicator--visible' : ''}"
              style=${styleMap({ opacity: String(skipOpacity) })}
              aria-hidden="true"
            >
              ${skipLabel}
            </span>

            <div class="ass-card__media">
              ${card.image
                ? html`<img
                    class="ass-card__img"
                    src=${card.image}
                    alt=${card.look_name}
                    loading="lazy"
                    draggable="false"
                  />`
                : nothing}
              <div class="ass-card__shade" aria-hidden="true"></div>
            </div>

            <div class="ass-card__body">
              <h3 class="ass-card__name">${card.look_name}</h3>
              ${card.look_desc
                ? html`<p class="ass-card__desc">${card.look_desc}</p>`
                : nothing}
              ${card.tags.length
                ? html`<div class="ass-card__tags">
                    ${card.tags.map((tag: string) => html`<span class="ass-tag">${tag}</span>`)}
                  </div>`
                : nothing}
            </div>
          </div>
        </div>

        <div class="ass-controls">
          <button
            type="button"
            class="ass-btn-round ass-btn-round--skip"
            aria-label=${skipLabel}
            @click=${() => this._swipe('skip')}
          >
            ✕
          </button>
          <button
            type="button"
            class="ass-btn-round ass-btn-round--like"
            aria-label=${likeLabel}
            @click=${() => this._swipe('like')}
          >
            ♥
          </button>
        </div>
        <div class="ass-btn-labels" aria-hidden="true">
          <span>${skipLabel}</span>
          <span>${likeLabel}</span>
        </div>
        ${this.history.length
          ? html`<div class="ass-controls ass-undo">
              <button type="button" class="fs-btn fs-btn--ghost" @click=${this._undo}>
                ${undoLabel}
              </button>
            </div>`
          : nothing}
      </div>
    `;
  }

  private _renderResult(restartLabel: string) {
    const winning = computeWinningTag(this.likedCards);
    const match = winning ? findMatchingResult(this.results, winning.tag) : null;
    const likesCount = this.likedIds.length;

    return html`
      <div class="ass-result">
        <span class="ass-result__badge">
          ${t('نتيجة ذوقك', 'Your taste result')}
          ${likesCount
            ? html`<span aria-hidden="true">·</span>
                ${likesCount}
                ${t('إعجاب', 'likes')}`
            : nothing}
        </span>

        ${match?.result_image
          ? html`<div class="ass-result__frame">
              <img
                class="ass-result__img"
                src=${match.result_image}
                alt=${match.result_title}
                loading="lazy"
              />
            </div>`
          : nothing}

        <h3 class="ass-result__title">
          ${match?.result_title ||
          t('أسلوبك المميز', 'Your signature style')}
        </h3>

        ${match?.result_desc
          ? html`<p class="ass-result__desc">${match.result_desc}</p>`
          : winning
            ? html`<p class="ass-result__desc">
                ${t('الوسم الأبرز في اختياراتك', 'Your top style tag')}
              </p>
              <span class="ass-result__tag">${winning.tag}</span>`
            : html`<p class="ass-result__desc">
                ${t('لم تعجبك أي بطاقة — جرّبي مرة أخرى', 'No likes yet — try again')}
              </p>`}

        <div class="ass-result__actions">
          ${match && isValidHref(match.result_url)
            ? html`<a class="fs-btn" href=${match.result_url}>
                ${match.result_btn || t('تسوقي الإطلالة', 'Shop the look')}
              </a>`
            : nothing}
          <button type="button" class="fs-btn fs-btn--ghost" @click=${this._restart}>
            ${restartLabel}
          </button>
        </div>
      </div>
    `;
  }
}
