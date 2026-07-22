var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { n as normalizeCollection, l as localizedString, d as extractLink, z as parseTags, s as sharedSectionCss, r as readSectionTheme, i as isTruthy, x as safeStorageGet, y as safeStorageSet, t, a as themeStyleMap, b as renderCommerceOutcome, v as isValidHref } from "./sharedStyles-Q5qADHV9.js";
const componentStyles = css`
  .ass-studio {
    position: relative;
    overflow: hidden;
    max-width: 28rem;
    margin: 0 auto;
    padding: 1.15rem 1rem 1.35rem;
    border-radius: var(--section-radius, 18px);
    border: 1px solid var(--border-color, #e8ddd6);
    background:
      radial-gradient(circle at 20% 0%, color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 16%, transparent), transparent 42%),
      radial-gradient(circle at 90% 100%, color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, transparent), transparent 38%),
      linear-gradient(180deg, color-mix(in srgb, var(--card-bg, #fff) 90%, #f4ebe4), var(--card-bg, #fff));
    box-shadow: 0 18px 42px rgba(43, 33, 28, 0.08);
  }

  .ass-progress {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.55rem;
    margin-bottom: 1rem;
  }

  .ass-progress__meta {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.28rem 0.7rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, var(--card-bg, #fff));
    color: var(--accent-color, var(--fs-store-primary));
    font-size: 0.78rem;
    font-weight: 700;
  }

  .ass-progress__track {
    flex: 1;
    min-width: 7rem;
    height: 0.35rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #e8ddd6) 75%, transparent);
    overflow: hidden;
  }

  .ass-progress__fill {
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(
      90deg,
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 70%, #c4a484),
      var(--accent-color, var(--fs-store-primary))
    );
    transition: width 0.35s ease;
  }

  .ass-hint {
    margin: 0 0 0.85rem;
    text-align: center;
    font-size: 0.82rem;
    color: var(--muted-color, #7a6a62);
  }

  .ass-deck {
    position: relative;
    width: min(100%, 22rem);
    margin: 0 auto;
    aspect-ratio: 3 / 4.35;
  }

  .ass-stack {
    position: absolute;
    inset: 0;
    border-radius: calc(var(--section-radius, 18px) * 0.85);
    border: 1px solid color-mix(in srgb, var(--border-color, #e8ddd6) 70%, transparent);
    background: color-mix(in srgb, var(--card-bg, #fff) 88%, #eee4dc);
    pointer-events: none;
  }

  .ass-stack--1 {
    transform: scale(0.96) translateY(0.55rem);
    opacity: 0.7;
  }

  .ass-stack--2 {
    transform: scale(0.92) translateY(1.05rem);
    opacity: 0.4;
  }

  .ass-card {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    border-radius: calc(var(--section-radius, 18px) * 0.85);
    overflow: hidden;
    background: #1c1613;
    border: 1px solid color-mix(in srgb, var(--border-color, #e8ddd6) 55%, transparent);
    box-shadow:
      0 22px 48px rgba(43, 33, 28, 0.18),
      0 2px 0 color-mix(in srgb, #fff 18%, transparent) inset;
    touch-action: none;
    user-select: none;
    will-change: transform;
    transition: transform 0.18s ease, box-shadow 0.18s ease;
    cursor: grab;
  }

  .ass-card--dragging {
    transition: none;
    cursor: grabbing;
    box-shadow: 0 28px 56px rgba(43, 33, 28, 0.24);
  }

  .ass-card__media {
    position: relative;
    flex: 1;
    min-height: 0;
    background:
      linear-gradient(145deg, #3a2c26, #1c1613 55%, #2a211c);
  }

  .ass-card__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
    display: block;
  }

  .ass-card__shade {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(180deg, rgba(20, 14, 12, 0.08) 28%, rgba(20, 14, 12, 0.78) 100%);
    pointer-events: none;
  }

  .ass-card__body {
    position: absolute;
    inset-inline: 0;
    bottom: 0;
    z-index: 2;
    padding: 1.15rem 1.1rem 1.2rem;
    color: #fff;
  }

  .ass-card__name {
    margin: 0 0 0.35rem;
    font-weight: 700;
    font-size: clamp(1.1rem, 2.4vw, 1.3rem);
    line-height: 1.3;
    text-shadow: 0 2px 14px rgba(0, 0, 0, 0.35);
  }

  .ass-card__desc {
    margin: 0;
    color: rgba(255, 255, 255, 0.86);
    font-size: 0.9rem;
    line-height: 1.6;
  }

  .ass-card__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin-top: 0.75rem;
  }

  .ass-tag {
    padding: 0.22rem 0.6rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.14);
    border: 1px solid rgba(255, 255, 255, 0.22);
    color: #fff;
    font-size: 0.72rem;
    font-weight: 600;
    backdrop-filter: blur(6px);
  }

  .ass-indicator {
    position: absolute;
    top: 1.1rem;
    z-index: 3;
    padding: 0.4rem 0.85rem;
    border-radius: 0.45rem;
    font-weight: 800;
    font-size: 0.92rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    opacity: 0;
    pointer-events: none;
    border: 2.5px solid;
    background: color-mix(in srgb, var(--card-bg, #ffffff) 92%, var(--fs-surface, #f0f0f0));
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    transition: opacity 0.12s ease;
  }

  .ass-indicator--like {
    inset-inline-start: 1rem;
    color: var(--fs-success, #2f7a58);
    border-color: var(--fs-success, #2f7a58);
    transform: rotate(-14deg);
  }

  .ass-indicator--skip {
    inset-inline-end: 1rem;
    color: var(--fs-danger, #b33a3a);
    border-color: var(--fs-danger, #b33a3a);
    transform: rotate(14deg);
  }

  .ass-indicator--visible {
    opacity: 1;
  }

  .ass-controls {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    margin-top: 1.2rem;
  }

  .ass-btn-round {
    width: 3.6rem;
    height: 3.6rem;
    border-radius: 50%;
    border: 1px solid var(--border-color, #e8ddd6);
    background: var(--card-bg, #fff);
    font-size: 1.2rem;
    line-height: 1;
    cursor: pointer;
    display: grid;
    place-items: center;
    box-shadow: 0 10px 22px rgba(43, 33, 28, 0.08);
    transition: border-color 0.2s, transform 0.2s, background 0.2s, box-shadow 0.2s;
  }

  .ass-btn-round:hover {
    transform: translateY(-2px) scale(1.04);
    box-shadow: 0 14px 28px rgba(43, 33, 28, 0.12);
  }

  .ass-btn-round:active {
    transform: scale(0.97);
  }

  .ass-btn-round--like {
    color: #fff;
    background: linear-gradient(145deg, color-mix(in srgb, var(--fs-success, #2f7a58) 75%, #fff), var(--fs-success, #2f7a58));
    border-color: transparent;
  }

  .ass-btn-round--skip {
    color: var(--fs-danger, #b33a3a);
    background: color-mix(in srgb, var(--fs-danger, #b33a3a) 8%, var(--card-bg, #fff));
    border-color: color-mix(in srgb, var(--fs-danger, #b33a3a) 28%, var(--border-color, #e8ddd6));
  }

  .ass-btn-labels {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    width: min(100%, 14rem);
    margin: 0.55rem auto 0;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--muted-color, #7a6a62);
  }

  .ass-btn-labels span:last-child {
    color: var(--fs-success, #2f7a58);
  }

  .ass-undo {
    width: 100%;
    justify-content: center;
    margin-top: 0.15rem;
  }

  .ass-result {
    position: relative;
    overflow: hidden;
    max-width: 28rem;
    margin: 0 auto;
    padding: 1.35rem 1.15rem 1.45rem;
    text-align: center;
    border-radius: var(--section-radius, 18px);
    border: 1px solid var(--border-color, #e8ddd6);
    background:
      radial-gradient(circle at top, color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 14%, transparent), transparent 45%),
      linear-gradient(180deg, color-mix(in srgb, var(--card-bg, #fff) 92%, #f3ebe4), var(--card-bg, #fff));
    box-shadow: 0 18px 42px rgba(43, 33, 28, 0.08);
    animation: ass-reveal 0.45s ease both;
  }

  .ass-result__badge {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    margin-bottom: 0.85rem;
    padding: 0.28rem 0.7rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
    color: var(--accent-color, var(--fs-store-primary));
    font-size: 0.75rem;
    font-weight: 700;
  }

  .ass-result__frame {
    position: relative;
    width: min(100%, 15rem);
    margin: 0 auto 1rem;
    border-radius: calc(var(--section-radius, 18px) * 0.7);
    overflow: hidden;
    box-shadow: 0 16px 36px rgba(43, 33, 28, 0.16);
  }

  .ass-result__img {
    width: 100%;
    aspect-ratio: 3 / 4;
    object-fit: cover;
    display: block;
  }

  .ass-result__title {
    margin: 0 0 0.5rem;
    font-size: clamp(1.2rem, 2.4vw, 1.45rem);
    font-weight: 700;
    line-height: 1.35;
    color: var(--text-color, #2b211c);
  }

  .ass-result__desc {
    margin: 0 auto 1.1rem;
    max-width: 26rem;
    color: var(--muted-color, #7a6a62);
    font-size: 0.95rem;
    line-height: 1.7;
  }

  .ass-result__tag {
    display: inline-flex;
    margin-bottom: 1rem;
    padding: 0.28rem 0.75rem;
    border-radius: 999px;
    border: 1px solid var(--border-color, #e8ddd6);
    color: var(--text-color, #2b211c);
    font-size: 0.8rem;
    font-weight: 600;
  }

  .ass-result__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem;
    justify-content: center;
  }

  @keyframes ass-reveal {
    from {
      opacity: 0;
      transform: translateY(0.6rem) scale(0.98);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @media (max-width: 959px) {
    .ass-studio {
      padding-inline: 0.25rem;
    }

    .ass-controls {
      gap: 0.9rem;
      margin-top: 1rem;
    }
  }

  @media (max-width: 639px) {
    .ass-deck {
      width: min(100%, 18.5rem);
      aspect-ratio: 3 / 4.05;
    }

    .ass-controls {
      gap: 0.75rem;
      margin-top: 0.8rem;
    }

    .ass-btn-round {
      width: 3.65rem;
      height: 3.65rem;
    }

    .ass-btn-labels {
      font-size: 0.72rem;
    }
  }

  @media (max-height: 700px) {
    .ass-deck {
      aspect-ratio: 3 / 3.9;
      width: min(100%, 18rem);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .ass-card,
    .ass-progress__fill,
    .ass-btn-round,
    .ass-result {
      transition: none !important;
      animation: none !important;
    }
  }
`;
function parseCards(raw) {
  return normalizeCollection(raw).map((item, index) => ({
    id: `card-${index}`,
    image: localizedString(item.image),
    look_name: localizedString(item.look_name),
    look_desc: localizedString(item.look_desc),
    tags: parseTags(item.tags),
    url: extractLink(item.url),
    btn_text: localizedString(item.btn_text)
  })).filter((c) => c.look_name.trim() !== "" || c.image.trim() !== "");
}
__name(parseCards, "parseCards");
function parseResults(raw) {
  return normalizeCollection(raw).map((item) => ({
    tag_name: localizedString(item.tag_name).toLowerCase(),
    result_title: localizedString(item.result_title),
    result_desc: localizedString(item.result_desc),
    result_image: localizedString(item.result_image),
    result_url: extractLink(item.result_url),
    result_btn: localizedString(item.result_btn)
  })).filter((r) => r.tag_name.trim() !== "");
}
__name(parseResults, "parseResults");
function computeWinningTag(likedCards) {
  const counts = /* @__PURE__ */ new Map(), firstSeen = /* @__PURE__ */ new Map();
  likedCards.forEach((card, cardIndex) => {
    card.tags.forEach((tag) => {
      const key = tag.toLowerCase();
      counts.set(key, (counts.get(key) ?? 0) + 1), firstSeen.has(key) || firstSeen.set(key, cardIndex);
    });
  });
  let best = null;
  for (const [tag, count] of counts) {
    const order = firstSeen.get(tag) ?? 0;
    (!best || count > best.count || count === best.count && order < best.order) && (best = { tag, count, order });
  }
  return best ? { tag: best.tag, count: best.count } : null;
}
__name(computeWinningTag, "computeWinningTag");
function findMatchingResult(results, tag) {
  const key = tag.toLowerCase();
  return results.find((r) => r.tag_name === key) ?? null;
}
__name(findMatchingResult, "findMatchingResult");
function getStorageKey(configKey, fallback) {
  return localizedString(configKey, fallback).trim() || fallback;
}
__name(getStorageKey, "getStorageKey");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const SWIPE_THRESHOLD = 80, _AbayaStyleSwipe = class _AbayaStyleSwipe extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.cardIndex = 0, this.likedIds = [], this.history = [], this.finished = !1, this.dragX = 0, this.dragging = !1, this._onLangChange = () => this.requestUpdate(), this._storageKey = "", this._pointerId = null, this._startX = 0, this._boundPointerMove = (e) => this._onPointerMove(e), this._boundPointerUp = (e) => this._onPointerUp(e);
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("language-changed", this._onLangChange), this._loadState(), this._syncVisibility();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("language-changed", this._onLangChange), this._cleanupPointerListeners();
  }
  updated(changed) {
    this._syncVisibility(), changed.has("config") && this._loadState();
  }
  get cards() {
    var _a;
    return parseCards((_a = this.config) == null ? void 0 : _a.ass_cards);
  }
  get results() {
    var _a;
    return parseResults((_a = this.config) == null ? void 0 : _a.ass_results);
  }
  get theme() {
    return readSectionTheme(this.config, "ass_");
  }
  get enableStorage() {
    var _a;
    return isTruthy((_a = this.config) == null ? void 0 : _a.ass_enable_storage, !0);
  }
  get currentCard() {
    return this.cards[this.cardIndex] ?? null;
  }
  get likedCards() {
    return this.cards.filter((c) => this.likedIds.includes(c.id));
  }
  _syncVisibility() {
    this.style.display = this.cards.length ? "" : "none";
  }
  _loadState() {
    var _a;
    if (!this.enableStorage) return;
    this._storageKey = getStorageKey(
      (_a = this.config) == null ? void 0 : _a.ass_storage_key,
      "ass-style-swipe-state"
    );
    const stored = safeStorageGet(this._storageKey, {
      index: 0,
      likedIds: [],
      history: []
    });
    this.cardIndex = Math.min(stored.index, Math.max(0, this.cards.length - 1)), this.likedIds = stored.likedIds || [], this.history = stored.history || [], this.finished = this.cardIndex >= this.cards.length;
  }
  _saveState() {
    this.enableStorage && safeStorageSet(this._storageKey, {
      index: this.cardIndex,
      likedIds: this.likedIds,
      history: this.history
    });
  }
  _cleanupPointerListeners() {
    window.removeEventListener("pointermove", this._boundPointerMove), window.removeEventListener("pointerup", this._boundPointerUp), window.removeEventListener("pointercancel", this._boundPointerUp), this._pointerId = null;
  }
  _onPointerDown(e) {
    this.finished || !this.currentCard || (this.dragging = !0, this._pointerId = e.pointerId, this._startX = e.clientX, this.dragX = 0, e.currentTarget.setPointerCapture(e.pointerId), window.addEventListener("pointermove", this._boundPointerMove), window.addEventListener("pointerup", this._boundPointerUp), window.addEventListener("pointercancel", this._boundPointerUp));
  }
  _onPointerMove(e) {
    !this.dragging || e.pointerId !== this._pointerId || (this.dragX = e.clientX - this._startX);
  }
  _onPointerUp(e) {
    !this.dragging || e.pointerId !== this._pointerId || (this._cleanupPointerListeners(), this.dragging = !1, this.dragX > SWIPE_THRESHOLD ? this._swipe("like") : this.dragX < -SWIPE_THRESHOLD ? this._swipe("skip") : this.dragX = 0);
  }
  _swipe(action) {
    const card = this.currentCard;
    card && (this.history = [...this.history, { cardId: card.id, action }], action === "like" && (this.likedIds = [...this.likedIds, card.id]), this.dragX = 0, this.cardIndex += 1, this.cardIndex >= this.cards.length && (this.finished = !0), this._saveState());
  }
  _undo() {
    const last = this.history[this.history.length - 1];
    last && (this.history = this.history.slice(0, -1), last.action === "like" && (this.likedIds = this.likedIds.filter((id) => id !== last.cardId)), this.cardIndex = Math.max(0, this.cardIndex - 1), this.finished = !1, this._saveState());
  }
  _restart() {
    this.cardIndex = 0, this.likedIds = [], this.history = [], this.finished = !1, this.dragX = 0, this._saveState();
  }
  render() {
    var _a, _b, _c, _d, _e, _f;
    if (!this.cards.length)
      return html`<div class="fs-empty" role="status">
        ${t("لا توجد بطاقات للعرض", "No cards to display")}
      </div>`;
    const theme = this.theme, title = localizedString((_a = this.config) == null ? void 0 : _a.ass_title), desc = localizedString((_b = this.config) == null ? void 0 : _b.ass_desc), likeLabel = localizedString((_c = this.config) == null ? void 0 : _c.ass_like_label) || t("أعجبني", "Like"), skipLabel = localizedString((_d = this.config) == null ? void 0 : _d.ass_skip_label) || t("تخطي", "Skip"), undoLabel = localizedString((_e = this.config) == null ? void 0 : _e.ass_undo_label) || t("تراجع", "Undo"), restartLabel = localizedString((_f = this.config) == null ? void 0 : _f.ass_restart_label) || t("ابدئي من جديد", "Restart");
    return html`
      <section
        class="fs-section"
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("اكتشفي أسلوبك", "Discover your style")}
      >
        <div class="fs-container">
          ${title || desc ? html`<header class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </header>` : nothing}

          ${this.finished ? this._renderResult(restartLabel) : this._renderDeck(likeLabel, skipLabel, undoLabel)}
        </div>
        ${renderCommerceOutcome(this.config || {}, "ass_")}
      </section>
    `;
  }
  _renderDeck(likeLabel, skipLabel, undoLabel) {
    const card = this.currentCard;
    if (!card) return nothing;
    const likeOpacity = Math.min(1, Math.max(0, this.dragX / SWIPE_THRESHOLD)), skipOpacity = Math.min(1, Math.max(0, -this.dragX / SWIPE_THRESHOLD)), rotate = this.dragX * 0.06, remaining = this.cards.length - this.cardIndex, progress = Math.round(this.cardIndex / this.cards.length * 100);
    return html`
      <div class="ass-studio">
        <div class="ass-progress" aria-live="polite">
          <span class="ass-progress__meta">
            ${t("إطلالة", "Look")} ${this.cardIndex + 1}
            <span aria-hidden="true">·</span>
            ${this.cards.length}
          </span>
          <div
            class="ass-progress__track"
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax=${this.cards.length}
            aria-valuenow=${this.cardIndex}
            aria-label=${t("تقدم الاكتشاف", "Discovery progress")}
          >
            <div
              class="ass-progress__fill"
              style=${styleMap({ width: `${progress}%` })}
            ></div>
          </div>
        </div>

        <p class="ass-hint">
          ${t("اسحبي يميناً للإعجاب أو يساراً للتخطي", "Swipe right to like, left to skip")}
        </p>

        <div class="ass-deck" aria-label=${t("بطاقات الأسلوب", "Style cards")}>
          ${remaining > 2 ? html`<div class="ass-stack ass-stack--2" aria-hidden="true"></div>` : nothing}
          ${remaining > 1 ? html`<div class="ass-stack ass-stack--1" aria-hidden="true"></div>` : nothing}

          <div
            class="ass-card ${this.dragging ? "ass-card--dragging" : ""}"
            style=${styleMap({
      transform: `translateX(${this.dragX}px) rotate(${rotate}deg)`
    })}
            @pointerdown=${this._onPointerDown}
            role="article"
            aria-label=${card.look_name}
          >
            <span
              class="ass-indicator ass-indicator--like ${likeOpacity > 0.2 ? "ass-indicator--visible" : ""}"
              style=${styleMap({ opacity: String(likeOpacity) })}
              aria-hidden="true"
            >
              ${likeLabel}
            </span>
            <span
              class="ass-indicator ass-indicator--skip ${skipOpacity > 0.2 ? "ass-indicator--visible" : ""}"
              style=${styleMap({ opacity: String(skipOpacity) })}
              aria-hidden="true"
            >
              ${skipLabel}
            </span>

            <div class="ass-card__media">
              ${card.image ? html`<img
                    class="ass-card__img"
                    src=${card.image}
                    alt=${card.look_name}
                    loading="lazy"
                    draggable="false"
                  />` : nothing}
              <div class="ass-card__shade" aria-hidden="true"></div>
            </div>

            <div class="ass-card__body">
              <h3 class="ass-card__name">${card.look_name}</h3>
              ${card.look_desc ? html`<p class="ass-card__desc">${card.look_desc}</p>` : nothing}
              ${card.tags.length ? html`<div class="ass-card__tags">
                    ${card.tags.map((tag) => html`<span class="ass-tag">${tag}</span>`)}
                  </div>` : nothing}
            </div>
          </div>
        </div>

        <div class="ass-controls">
          <button
            type="button"
            class="ass-btn-round ass-btn-round--skip"
            aria-label=${skipLabel}
            @click=${() => this._swipe("skip")}
          >
            ✕
          </button>
          <button
            type="button"
            class="ass-btn-round ass-btn-round--like"
            aria-label=${likeLabel}
            @click=${() => this._swipe("like")}
          >
            ♥
          </button>
        </div>
        <div class="ass-btn-labels" aria-hidden="true">
          <span>${skipLabel}</span>
          <span>${likeLabel}</span>
        </div>
        ${this.history.length ? html`<div class="ass-controls ass-undo">
              <button type="button" class="fs-btn fs-btn--ghost" @click=${this._undo}>
                ${undoLabel}
              </button>
            </div>` : nothing}
      </div>
    `;
  }
  _renderResult(restartLabel) {
    const winning = computeWinningTag(this.likedCards), match = winning ? findMatchingResult(this.results, winning.tag) : null, likesCount = this.likedIds.length;
    return html`
      <div class="ass-result">
        <span class="ass-result__badge">
          ${t("نتيجة ذوقك", "Your taste result")}
          ${likesCount ? html`<span aria-hidden="true">·</span>
                ${likesCount}
                ${t("إعجاب", "likes")}` : nothing}
        </span>

        ${match != null && match.result_image ? html`<div class="ass-result__frame">
              <img
                class="ass-result__img"
                src=${match.result_image}
                alt=${match.result_title}
                loading="lazy"
              />
            </div>` : nothing}

        <h3 class="ass-result__title">
          ${(match == null ? void 0 : match.result_title) || t("أسلوبك المميز", "Your signature style")}
        </h3>

        ${match != null && match.result_desc ? html`<p class="ass-result__desc">${match.result_desc}</p>` : winning ? html`<p class="ass-result__desc">
                ${t("الوسم الأبرز في اختياراتك", "Your top style tag")}
              </p>
              <span class="ass-result__tag">${winning.tag}</span>` : html`<p class="ass-result__desc">
                ${t("لم تعجبك أي بطاقة — جرّبي مرة أخرى", "No likes yet — try again")}
              </p>`}

        <div class="ass-result__actions">
          ${match && isValidHref(match.result_url) ? html`<a class="fs-btn" href=${match.result_url}>
                ${match.result_btn || t("تسوقي الإطلالة", "Shop the look")}
              </a>` : nothing}
          <button type="button" class="fs-btn fs-btn--ghost" @click=${this._restart}>
            ${restartLabel}
          </button>
        </div>
      </div>
    `;
  }
};
__name(_AbayaStyleSwipe, "AbayaStyleSwipe"), _AbayaStyleSwipe.styles = [sharedSectionCss, componentStyles];
let AbayaStyleSwipe = _AbayaStyleSwipe;
__decorateClass([
  property({ type: Object })
], AbayaStyleSwipe.prototype, "config");
__decorateClass([
  state()
], AbayaStyleSwipe.prototype, "cardIndex");
__decorateClass([
  state()
], AbayaStyleSwipe.prototype, "likedIds");
__decorateClass([
  state()
], AbayaStyleSwipe.prototype, "history");
__decorateClass([
  state()
], AbayaStyleSwipe.prototype, "finished");
__decorateClass([
  state()
], AbayaStyleSwipe.prototype, "dragX");
__decorateClass([
  state()
], AbayaStyleSwipe.prototype, "dragging");
typeof AbayaStyleSwipe < "u" && AbayaStyleSwipe.registerSallaComponent("salla-abaya-style-swipe");
export {
  AbayaStyleSwipe as default
};
