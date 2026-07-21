import { html, LitElement, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { localizedString } from '../../utils/localizedString.js';
import {
  isTruthy,
  isValidHref,
  prefersReducedMotion,
  readSectionTheme,
  safeStorageGet,
  safeStorageSet,
  t,
  themeStyleMap,
} from '../../utils/helpers.js';
import { renderCommerceOutcome } from '../../utils/commerceOutcome.js';
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { componentStyles } from './styles.js';
import {
  computePercentages,
  getStorageKey,
  parseRounds,
} from './utils.js';
import type { DuelChoice, DuelRound, StoredVotes } from './types.js';

export default class AbayaStyleDuel extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private roundIndex = 0;
  @state() private votes: Record<string, DuelChoice> = {};

  private _onLangChange = () => this.requestUpdate();
  private _storageKey = '';

  static styles = [sharedSectionCss, componentStyles];

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('language-changed', this._onLangChange);
    this._loadVotes();
    this._syncVisibility();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('language-changed', this._onLangChange);
  }

  updated(changed: Map<PropertyKey, unknown>): void {
    this._syncVisibility();
    if (changed.has('config')) {
      this._loadVotes();
      if (this.roundIndex >= this.rounds.length) {
        this.roundIndex = Math.max(0, this.rounds.length - 1);
      }
    }
  }

  private get rounds(): DuelRound[] {
    return parseRounds(this.config?.asd_rounds);
  }

  private get theme() {
    return readSectionTheme(this.config, 'asd_');
  }

  private get useSeedVotes(): boolean {
    return isTruthy(this.config?.asd_use_seed_votes, true);
  }

  private get allowRevote(): boolean {
    return isTruthy(this.config?.asd_allow_revote);
  }

  private get hideResultSource(): boolean {
    return isTruthy(this.config?.asd_hide_result_source);
  }

  private get currentRound(): DuelRound | null {
    return this.rounds[this.roundIndex] ?? null;
  }

  private _label(key: string, ar: string, en: string): string {
    return localizedString(this.config?.[key] as string, '') || t(ar, en);
  }

  private _syncVisibility(): void {
    this.style.display = this.rounds.length ? '' : 'none';
  }

  private _loadVotes(): void {
    this._storageKey = getStorageKey(
      this.config?.asd_storage_key,
      'asd-style-duel-votes'
    );
    const stored = safeStorageGet<StoredVotes>(this._storageKey, { votes: {} });
    this.votes = stored.votes || {};
  }

  private _saveVotes(): void {
    safeStorageSet(this._storageKey, { votes: this.votes });
  }

  private _vote(choice: DuelChoice): void {
    const round = this.currentRound;
    if (!round) return;

    const existing = this.votes[round.id];
    if (existing && !this.allowRevote) return;

    this.votes = { ...this.votes, [round.id]: choice };
    this._saveVotes();
  }

  private _nextRound(): void {
    if (this.roundIndex < this.rounds.length - 1) {
      this.roundIndex += 1;
    }
  }

  render() {
    if (!this.rounds.length) {
      return html`<div class="fs-empty" role="status">
        ${t('لا توجد جولات متاحة', 'No rounds available')}
      </div>`;
    }

    const theme = this.theme;
    const animate = theme.animate && !prefersReducedMotion();
    const round = this.currentRound;
    if (!round) return nothing;

    const title = localizedString(this.config?.asd_title as string);
    const desc = localizedString(this.config?.asd_desc as string);
    const resultNote = localizedString(this.config?.asd_result_note as string);
    const nextBtn = this._label('asd_next_btn', 'المواجهة التالية', 'Next duel');

    const choice = this.votes[round.id] ?? null;
    const hasVoted = choice !== null;
    const { pctA, pctB } = computePercentages(round, choice, this.useSeedVotes);
    const winnerA = hasVoted && pctA >= pctB;
    const winnerB = hasVoted && pctB > pctA;

    return html`
      <section
        class=${classMap({
          'fs-section': true,
          'fs-animate': animate,
        })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('تحدي العبايات', 'Abaya style duel')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<header class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </header>`
            : nothing}

          <div class="asd-arena" role="group" aria-label=${round.question}>
            <div class="asd-progress">
              <span class="asd-progress__meta">
                ${t('جولة', 'Round')} ${this.roundIndex + 1}
                /
                ${this.rounds.length}
              </span>
              <div class="asd-dots" aria-hidden="true">
                ${this.rounds.map(
                  (_, i) => html`<span
                    class=${classMap({
                      'asd-dot': true,
                      'asd-dot--active': i === this.roundIndex,
                    })}
                  ></span>`
                )}
              </div>
            </div>

            <p class="asd-question">${round.question}</p>

            <div class="asd-options">
              ${this._renderOption('a', round, pctA, winnerA, hasVoted, choice === 'a', animate)}
              <span class="asd-vs" aria-hidden="true">VS</span>
              ${this._renderOption('b', round, pctB, winnerB, hasVoted, choice === 'b', animate)}
            </div>

            ${hasVoted && round.result_desc
              ? html`<div class="asd-result" aria-live="polite">${round.result_desc}</div>`
              : nothing}

            ${hasVoted && round.enable_next && this.roundIndex < this.rounds.length - 1
              ? html`<div class="asd-nav">
                  <button type="button" class="fs-btn" @click=${this._nextRound}>
                    ${nextBtn}
                  </button>
                </div>`
              : nothing}

            ${resultNote && !this.hideResultSource
              ? html`<p class="asd-note">${resultNote}</p>`
              : nothing}

            <p class="asd-note">
              ${t(
                'النتائج محفوظة على جهازك فقط ولا تمثل تصويتًا لجميع الزوّار.',
                'Results are saved on your device only and do not represent all visitors.'
              )}
            </p>
          </div>
        </div>
        ${renderCommerceOutcome(this.config || {}, 'asd_')}
      </section>
    `;
  }

  private _renderOption(
    side: DuelChoice,
    round: DuelRound,
    pct: number,
    isWinner: boolean,
    hasVoted: boolean,
    isPicked: boolean,
    animate: boolean
  ) {
    const img = side === 'a' ? round.img_a : round.img_b;
    const name = side === 'a' ? round.name_a : round.name_b;
    const url = side === 'a' ? round.url_a : round.url_b;
    const canVote = !hasVoted || this.allowRevote;

    const classes = {
      'asd-option': true,
      'asd-option--winner': isWinner,
      'asd-option--picked': isPicked,
      'fs-celebrate': animate && isWinner,
    };

    const content = html`
      <div class="asd-option__media">
        ${img
          ? html`<img
              class="asd-option__img"
              src=${img}
              alt=${name}
              loading=${side === 'a' ? 'eager' : 'lazy'}
              decoding="async"
            />`
          : nothing}
        <div class="asd-option__veil" aria-hidden="true"></div>
        ${!hasVoted
          ? html`<span class="asd-option__vote-label">${t('صوّتي لها', 'Vote for this')}</span>`
          : nothing}
        ${isWinner
          ? html`<span class="asd-option__crown">${t('الأقرب لذوقك', 'Your pick lead')}</span>`
          : nothing}
      </div>
      <div class="asd-option__body">
        <p class="asd-option__name">${name}</p>
        ${hasVoted
          ? html`
              <div class="asd-pct-row">
                <p class="asd-pct">${pct}%</p>
                <span class="asd-pct-label">${t('من ذوقك', 'of your taste')}</span>
              </div>
              <div
                class="asd-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow=${pct}
                aria-label=${`${name}: ${pct}%`}
              >
                <span style=${styleMap({ width: `${pct}%` })}></span>
              </div>
              ${isValidHref(url)
                ? html`<p class="asd-option__cta">${t('اضغطي لعرض المنتج', 'Tap to view product')}</p>`
                : nothing}
            `
          : html`<p class="asd-option__cta">${t('اختاري ما يقرّب من ذوقك', 'Choose what matches your taste')}</p>`}
      </div>
    `;

    if (isValidHref(url) && hasVoted) {
      return html`
        <a
          class=${classMap(classes)}
          href=${url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label=${name}
        >
          ${content}
        </a>
      `;
    }

    return html`
      <button
        type="button"
        class=${classMap(classes)}
        ?disabled=${!canVote && hasVoted}
        aria-label=${t(`اختيار ${name}`, `Choose ${name}`)}
        aria-pressed=${isPicked ? 'true' : 'false'}
        @click=${() => this._vote(side)}
      >
        ${content}
      </button>
    `;
  }
}
