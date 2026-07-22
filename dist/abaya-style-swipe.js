import { css as S, LitElement as C, html as a, nothing as d } from "lit";
import { property as L, state as u } from "lit/decorators.js";
import { styleMap as f } from "lit/directives/style-map.js";
import { n as $, l as n, d as I, z as P, s as z, r as X, i as M, x as E, y as j, t as i, a as U, b as D, v as Y } from "./sharedStyles-Cd7RKVf-.js";
const O = S`
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
function R(l) {
  return $(l).map((s, r) => ({
    id: `card-${r}`,
    image: n(s.image),
    look_name: n(s.look_name),
    look_desc: n(s.look_desc),
    tags: P(s.tags),
    url: I(s.url),
    btn_text: n(s.btn_text)
  })).filter((s) => s.look_name.trim() !== "" || s.image.trim() !== "");
}
function T(l) {
  return $(l).map((s) => ({
    tag_name: n(s.tag_name).toLowerCase(),
    result_title: n(s.result_title),
    result_desc: n(s.result_desc),
    result_image: n(s.result_image),
    result_url: I(s.result_url),
    result_btn: n(s.result_btn)
  })).filter((s) => s.tag_name.trim() !== "");
}
function K(l) {
  const s = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  l.forEach((t, o) => {
    t.tags.forEach((c) => {
      const h = c.toLowerCase();
      s.set(h, (s.get(h) ?? 0) + 1), r.has(h) || r.set(h, o);
    });
  });
  let e = null;
  for (const [t, o] of s) {
    const c = r.get(t) ?? 0;
    (!e || o > e.count || o === e.count && c < e.order) && (e = { tag: t, count: o, order: c });
  }
  return e ? { tag: e.tag, count: e.count } : null;
}
function V(l, s) {
  const r = s.toLowerCase();
  return l.find((e) => e.tag_name === r) ?? null;
}
function H(l, s) {
  return n(l, s).trim() || s;
}
var N = Object.defineProperty, p = (l, s, r, e) => {
  for (var t = void 0, o = l.length - 1, c; o >= 0; o--)
    (c = l[o]) && (t = c(s, r, t) || t);
  return t && N(s, r, t), t;
};
const v = 80, x = class x extends C {
  constructor() {
    super(...arguments), this.config = {}, this.cardIndex = 0, this.likedIds = [], this.history = [], this.finished = !1, this.dragX = 0, this.dragging = !1, this._onLangChange = () => this.requestUpdate(), this._storageKey = "", this._pointerId = null, this._startX = 0, this._boundPointerMove = (s) => this._onPointerMove(s), this._boundPointerUp = (s) => this._onPointerUp(s);
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("language-changed", this._onLangChange), this._loadState(), this._syncVisibility();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("language-changed", this._onLangChange), this._cleanupPointerListeners();
  }
  updated(s) {
    this._syncVisibility(), s.has("config") && this._loadState();
  }
  get cards() {
    var s;
    return R((s = this.config) == null ? void 0 : s.ass_cards);
  }
  get results() {
    var s;
    return T((s = this.config) == null ? void 0 : s.ass_results);
  }
  get theme() {
    return X(this.config, "ass_");
  }
  get enableStorage() {
    var s;
    return M((s = this.config) == null ? void 0 : s.ass_enable_storage, !0);
  }
  get currentCard() {
    return this.cards[this.cardIndex] ?? null;
  }
  get likedCards() {
    return this.cards.filter((s) => this.likedIds.includes(s.id));
  }
  _syncVisibility() {
    this.style.display = this.cards.length ? "" : "none";
  }
  _loadState() {
    var r;
    if (!this.enableStorage) return;
    this._storageKey = H(
      (r = this.config) == null ? void 0 : r.ass_storage_key,
      "ass-style-swipe-state"
    );
    const s = E(this._storageKey, {
      index: 0,
      likedIds: [],
      history: []
    });
    this.cardIndex = Math.min(s.index, Math.max(0, this.cards.length - 1)), this.likedIds = s.likedIds || [], this.history = s.history || [], this.finished = this.cardIndex >= this.cards.length;
  }
  _saveState() {
    this.enableStorage && j(this._storageKey, {
      index: this.cardIndex,
      likedIds: this.likedIds,
      history: this.history
    });
  }
  _cleanupPointerListeners() {
    window.removeEventListener("pointermove", this._boundPointerMove), window.removeEventListener("pointerup", this._boundPointerUp), window.removeEventListener("pointercancel", this._boundPointerUp), this._pointerId = null;
  }
  _onPointerDown(s) {
    this.finished || !this.currentCard || (this.dragging = !0, this._pointerId = s.pointerId, this._startX = s.clientX, this.dragX = 0, s.currentTarget.setPointerCapture(s.pointerId), window.addEventListener("pointermove", this._boundPointerMove), window.addEventListener("pointerup", this._boundPointerUp), window.addEventListener("pointercancel", this._boundPointerUp));
  }
  _onPointerMove(s) {
    !this.dragging || s.pointerId !== this._pointerId || (this.dragX = s.clientX - this._startX);
  }
  _onPointerUp(s) {
    !this.dragging || s.pointerId !== this._pointerId || (this._cleanupPointerListeners(), this.dragging = !1, this.dragX > v ? this._swipe("like") : this.dragX < -v ? this._swipe("skip") : this.dragX = 0);
  }
  _swipe(s) {
    const r = this.currentCard;
    r && (this.history = [...this.history, { cardId: r.id, action: s }], s === "like" && (this.likedIds = [...this.likedIds, r.id]), this.dragX = 0, this.cardIndex += 1, this.cardIndex >= this.cards.length && (this.finished = !0), this._saveState());
  }
  _undo() {
    const s = this.history[this.history.length - 1];
    s && (this.history = this.history.slice(0, -1), s.action === "like" && (this.likedIds = this.likedIds.filter((r) => r !== s.cardId)), this.cardIndex = Math.max(0, this.cardIndex - 1), this.finished = !1, this._saveState());
  }
  _restart() {
    this.cardIndex = 0, this.likedIds = [], this.history = [], this.finished = !1, this.dragX = 0, this._saveState();
  }
  render() {
    var m, b, _, y, k, w;
    if (!this.cards.length)
      return a`<div class="fs-empty" role="status">
        ${i("لا توجد بطاقات للعرض", "No cards to display")}
      </div>`;
    const s = this.theme, r = n((m = this.config) == null ? void 0 : m.ass_title), e = n((b = this.config) == null ? void 0 : b.ass_desc), t = n((_ = this.config) == null ? void 0 : _.ass_like_label) || i("أعجبني", "Like"), o = n((y = this.config) == null ? void 0 : y.ass_skip_label) || i("تخطي", "Skip"), c = n((k = this.config) == null ? void 0 : k.ass_undo_label) || i("تراجع", "Undo"), h = n((w = this.config) == null ? void 0 : w.ass_restart_label) || i("ابدئي من جديد", "Restart");
    return a`
      <section
        class="fs-section"
        style=${f(U(s))}
        aria-label=${r || i("اكتشفي أسلوبك", "Discover your style")}
      >
        <div class="fs-container">
          ${r || e ? a`<header class="fs-header">
                ${r ? a`<h2 class="fs-title">${r}</h2>` : d}
                ${e ? a`<p class="fs-desc">${e}</p>` : d}
              </header>` : d}

          ${this.finished ? this._renderResult(h) : this._renderDeck(t, o, c)}
        </div>
        ${D(this.config || {}, "ass_")}
      </section>
    `;
  }
  _renderDeck(s, r, e) {
    const t = this.currentCard;
    if (!t) return d;
    const o = Math.min(1, Math.max(0, this.dragX / v)), c = Math.min(1, Math.max(0, -this.dragX / v)), h = this.dragX * 0.06, m = this.cards.length - this.cardIndex, b = Math.round(this.cardIndex / this.cards.length * 100);
    return a`
      <div class="ass-studio">
        <div class="ass-progress" aria-live="polite">
          <span class="ass-progress__meta">
            ${i("إطلالة", "Look")} ${this.cardIndex + 1}
            <span aria-hidden="true">·</span>
            ${this.cards.length}
          </span>
          <div
            class="ass-progress__track"
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax=${this.cards.length}
            aria-valuenow=${this.cardIndex}
            aria-label=${i("تقدم الاكتشاف", "Discovery progress")}
          >
            <div
              class="ass-progress__fill"
              style=${f({ width: `${b}%` })}
            ></div>
          </div>
        </div>

        <p class="ass-hint">
          ${i("اسحبي يميناً للإعجاب أو يساراً للتخطي", "Swipe right to like, left to skip")}
        </p>

        <div class="ass-deck" aria-label=${i("بطاقات الأسلوب", "Style cards")}>
          ${m > 2 ? a`<div class="ass-stack ass-stack--2" aria-hidden="true"></div>` : d}
          ${m > 1 ? a`<div class="ass-stack ass-stack--1" aria-hidden="true"></div>` : d}

          <div
            class="ass-card ${this.dragging ? "ass-card--dragging" : ""}"
            style=${f({
      transform: `translateX(${this.dragX}px) rotate(${h}deg)`
    })}
            @pointerdown=${this._onPointerDown}
            role="article"
            aria-label=${t.look_name}
          >
            <span
              class="ass-indicator ass-indicator--like ${o > 0.2 ? "ass-indicator--visible" : ""}"
              style=${f({ opacity: String(o) })}
              aria-hidden="true"
            >
              ${s}
            </span>
            <span
              class="ass-indicator ass-indicator--skip ${c > 0.2 ? "ass-indicator--visible" : ""}"
              style=${f({ opacity: String(c) })}
              aria-hidden="true"
            >
              ${r}
            </span>

            <div class="ass-card__media">
              ${t.image ? a`<img
                    class="ass-card__img"
                    src=${t.image}
                    alt=${t.look_name}
                    loading="lazy"
                    draggable="false"
                  />` : d}
              <div class="ass-card__shade" aria-hidden="true"></div>
            </div>

            <div class="ass-card__body">
              <h3 class="ass-card__name">${t.look_name}</h3>
              ${t.look_desc ? a`<p class="ass-card__desc">${t.look_desc}</p>` : d}
              ${t.tags.length ? a`<div class="ass-card__tags">
                    ${t.tags.map((_) => a`<span class="ass-tag">${_}</span>`)}
                  </div>` : d}
            </div>
          </div>
        </div>

        <div class="ass-controls">
          <button
            type="button"
            class="ass-btn-round ass-btn-round--skip"
            aria-label=${r}
            @click=${() => this._swipe("skip")}
          >
            ✕
          </button>
          <button
            type="button"
            class="ass-btn-round ass-btn-round--like"
            aria-label=${s}
            @click=${() => this._swipe("like")}
          >
            ♥
          </button>
        </div>
        <div class="ass-btn-labels" aria-hidden="true">
          <span>${r}</span>
          <span>${s}</span>
        </div>
        ${this.history.length ? a`<div class="ass-controls ass-undo">
              <button type="button" class="fs-btn fs-btn--ghost" @click=${this._undo}>
                ${e}
              </button>
            </div>` : d}
      </div>
    `;
  }
  _renderResult(s) {
    const r = K(this.likedCards), e = r ? V(this.results, r.tag) : null, t = this.likedIds.length;
    return a`
      <div class="ass-result">
        <span class="ass-result__badge">
          ${i("نتيجة ذوقك", "Your taste result")}
          ${t ? a`<span aria-hidden="true">·</span>
                ${t}
                ${i("إعجاب", "likes")}` : d}
        </span>

        ${e != null && e.result_image ? a`<div class="ass-result__frame">
              <img
                class="ass-result__img"
                src=${e.result_image}
                alt=${e.result_title}
                loading="lazy"
              />
            </div>` : d}

        <h3 class="ass-result__title">
          ${(e == null ? void 0 : e.result_title) || i("أسلوبك المميز", "Your signature style")}
        </h3>

        ${e != null && e.result_desc ? a`<p class="ass-result__desc">${e.result_desc}</p>` : r ? a`<p class="ass-result__desc">
                ${i("الوسم الأبرز في اختياراتك", "Your top style tag")}
              </p>
              <span class="ass-result__tag">${r.tag}</span>` : a`<p class="ass-result__desc">
                ${i("لم تعجبك أي بطاقة — جرّبي مرة أخرى", "No likes yet — try again")}
              </p>`}

        <div class="ass-result__actions">
          ${e && Y(e.result_url) ? a`<a class="fs-btn" href=${e.result_url}>
                ${e.result_btn || i("تسوقي الإطلالة", "Shop the look")}
              </a>` : d}
          <button type="button" class="fs-btn fs-btn--ghost" @click=${this._restart}>
            ${s}
          </button>
        </div>
      </div>
    `;
  }
};
x.styles = [z, O];
let g = x;
p([
  L({ type: Object })
], g.prototype, "config");
p([
  u()
], g.prototype, "cardIndex");
p([
  u()
], g.prototype, "likedIds");
p([
  u()
], g.prototype, "history");
p([
  u()
], g.prototype, "finished");
p([
  u()
], g.prototype, "dragX");
p([
  u()
], g.prototype, "dragging");
typeof g < "u" && g.registerSallaComponent("salla-abaya-style-swipe");
export {
  g as default
};
