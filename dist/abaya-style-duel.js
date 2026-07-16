import { css as q, LitElement as M, html as s, nothing as i } from "lit";
import { property as B, state as I } from "lit/decorators.js";
import { classMap as v } from "lit/directives/class-map.js";
import { styleMap as R } from "lit/directives/style-map.js";
import { n as K, l, b as C, u as S, s as j, r as A, i as x, t as d, z as O, A as T, p as E, a as N, w as V } from "./sharedStyles-C1vUkqEN.js";
const P = q`
  .asd-arena {
    position: relative;
    overflow: hidden;
    padding: 1.25rem 1rem 1.4rem;
    border-radius: var(--section-radius, 18px);
    border: 1px solid var(--border-color, #e8ddd6);
    background:
      radial-gradient(circle at top, color-mix(in srgb, var(--accent-color, #8b5e4b) 14%, transparent), transparent 40%),
      linear-gradient(180deg, color-mix(in srgb, var(--card-bg, #fff) 92%, #f3ebe4), var(--card-bg, #fff));
    box-shadow: 0 18px 42px rgba(43, 33, 28, 0.08);
  }

  .asd-progress {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.6rem;
    margin-bottom: 1rem;
  }

  .asd-progress__meta {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.3rem 0.7rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 10%, var(--card-bg, #fff));
    color: var(--accent-color, #8b5e4b);
    font-size: 0.78rem;
    font-weight: 700;
  }

  .asd-dots {
    display: flex;
    gap: 0.35rem;
  }

  .asd-dot {
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 50%;
    background: color-mix(in srgb, var(--border-color, #e8ddd6) 80%, transparent);
  }

  .asd-dot--active {
    width: 1.1rem;
    border-radius: 999px;
    background: var(--accent-color, #8b5e4b);
  }

  .asd-question {
    margin: 0 auto 1.35rem;
    max-width: 34rem;
    text-align: center;
    font-size: clamp(1.15rem, 2.2vw, 1.45rem);
    font-weight: 700;
    line-height: 1.45;
    color: var(--text-color, #2b211c);
  }

  .asd-options {
    position: relative;
    display: grid;
    gap: 1rem;
  }

  @media (min-width: 640px) {
    .asd-options {
      grid-template-columns: 1fr 1fr;
      gap: 1.25rem;
      align-items: stretch;
    }
  }

  .asd-vs {
    display: grid;
    place-items: center;
    width: 3rem;
    height: 3rem;
    margin: 0.15rem auto;
    border-radius: 50%;
    background:
      linear-gradient(145deg, var(--accent-color, #8b5e4b), color-mix(in srgb, var(--accent-color, #8b5e4b) 65%, #000));
    color: #fff;
    font-weight: 800;
    font-size: 0.82rem;
    letter-spacing: 0.04em;
    box-shadow:
      0 0 0 6px color-mix(in srgb, var(--card-bg, #fff) 92%, transparent),
      0 10px 24px rgba(43, 33, 28, 0.2);
    z-index: 3;
  }

  @media (min-width: 640px) {
    .asd-vs {
      position: absolute;
      /* Physical center — avoids RTL inset-inline-start offset */
      left: 50%;
      top: 38%;
      margin: 0;
      transform: translate(-50%, -50%);
      width: 3.4rem;
      height: 3.4rem;
      font-size: 0.9rem;
      pointer-events: none;
    }
  }

  .asd-option {
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 100%;
    padding: 0;
    border: 1px solid var(--border-color, #e8ddd6);
    border-radius: calc(var(--section-radius, 18px) * 0.8);
    background: var(--card-bg, #fff);
    overflow: hidden;
    cursor: pointer;
    text-align: center;
    color: inherit;
    font: inherit;
    text-decoration: none;
    box-shadow: 0 10px 26px rgba(43, 33, 28, 0.06);
    transition:
      border-color 0.25s ease,
      transform 0.25s ease,
      box-shadow 0.25s ease;
  }

  .asd-option:hover:not(:disabled) {
    transform: translateY(-3px);
    border-color: color-mix(in srgb, var(--accent-color, #8b5e4b) 45%, var(--border-color, #e8ddd6));
  }

  .asd-option:disabled {
    cursor: default;
  }

  .asd-option--winner {
    border-color: var(--accent-color, #8b5e4b);
    box-shadow:
      0 0 0 2px color-mix(in srgb, var(--accent-color, #8b5e4b) 25%, transparent),
      0 16px 34px rgba(43, 33, 28, 0.12);
  }

  .asd-option--picked {
    outline: 2px solid color-mix(in srgb, var(--accent-color, #8b5e4b) 55%, transparent);
    outline-offset: 2px;
  }

  .fs-celebrate.asd-option--winner {
    animation: asd-celebrate 0.65s ease;
  }

  @keyframes asd-celebrate {
    0%,
    100% {
      transform: scale(1);
    }
    40% {
      transform: scale(1.02);
    }
    70% {
      transform: scale(0.995);
    }
  }

  .asd-option__media {
    position: relative;
    aspect-ratio: 3 / 4;
    overflow: hidden;
    background: color-mix(in srgb, var(--border-color, #e8ddd6) 45%, transparent);
    flex: 0 0 auto;
  }

  .asd-option__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.45s ease;
  }

  .asd-option:hover .asd-option__img {
    transform: scale(1.03);
  }

  .asd-option__veil {
    position: absolute;
    inset: auto 0 0;
    height: 42%;
    background: linear-gradient(180deg, transparent, rgba(43, 33, 28, 0.55));
    pointer-events: none;
  }

  .asd-option__vote-label {
    position: absolute;
    left: 50%;
    bottom: 0.75rem;
    z-index: 1;
    transform: translateX(-50%);
    padding: 0.35rem 0.75rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.94);
    color: var(--accent-color, #8b5e4b);
    font-size: 0.75rem;
    font-weight: 700;
    white-space: nowrap;
  }

  .asd-option__crown {
    position: absolute;
    top: 0.75rem;
    left: 50%;
    z-index: 1;
    transform: translateX(-50%);
    padding: 0.28rem 0.7rem;
    border-radius: 999px;
    background: var(--accent-color, #8b5e4b);
    color: #fff;
    font-size: 0.7rem;
    font-weight: 700;
    white-space: nowrap;
    box-shadow: 0 6px 14px rgba(43, 33, 28, 0.22);
  }

  .asd-option__body {
    display: grid;
    gap: 0.55rem;
    padding: 1rem 0.95rem 1.1rem;
    flex: 1 1 auto;
    align-content: start;
  }

  .asd-option__name {
    margin: 0;
    font-weight: 700;
    font-size: 1.05rem;
    line-height: 1.35;
    color: var(--text-color, #2b211c);
    text-align: center;
  }

  .asd-option__cta {
    margin: 0;
    font-size: 0.8rem;
    color: var(--muted-color, #7a6a62);
    text-align: center;
  }

  .asd-pct-row {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.15rem;
  }

  .asd-pct {
    margin: 0;
    font-size: 1.35rem;
    font-weight: 800;
    line-height: 1;
    color: var(--accent-color, #8b5e4b);
  }

  .asd-pct-label {
    font-size: 0.72rem;
    color: var(--muted-color, #7a6a62);
  }

  .asd-bar {
    position: relative;
    height: 8px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #e8ddd6) 85%, transparent);
    overflow: hidden;
    /* Keep fill growing left→right in RTL pages */
    direction: ltr;
  }

  .asd-bar > span {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(
      90deg,
      color-mix(in srgb, var(--accent-color, #8b5e4b) 70%, #c4a484),
      var(--accent-color, #8b5e4b)
    );
    transition: width 0.55s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .asd-result {
    margin-top: 1.25rem;
    padding: 1rem 1.05rem;
    border-radius: calc(var(--section-radius, 18px) * 0.65);
    border: 1px solid color-mix(in srgb, var(--accent-color, #8b5e4b) 22%, var(--border-color, #e8ddd6));
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 8%, var(--card-bg, #fff));
    line-height: 1.7;
    font-size: 0.92rem;
    text-align: center;
    color: var(--text-color, #2b211c);
  }

  .asd-nav {
    display: flex;
    justify-content: center;
    margin-top: 1.1rem;
  }

  .asd-nav .fs-btn {
    min-width: min(100%, 16rem);
  }

  .asd-note {
    margin: 0.85rem 0 0;
    text-align: center;
    font-size: 0.78rem;
    color: var(--muted-color, #7a6a62);
    line-height: 1.6;
  }

  @media (max-width: 959px) {
    .asd-arena {
      padding: 1rem 0.85rem 1.15rem;
    }

    .asd-nav {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }

    .asd-nav .fs-btn {
      width: 100%;
      min-width: 0;
    }
  }

  @media (max-width: 639px) {
    .asd-arena {
      padding: 0.85rem 0.65rem 1rem;
    }

    .asd-options {
      gap: 0.85rem;
    }

    .asd-option__media {
      aspect-ratio: 4 / 5;
      max-height: 14.5rem;
    }

    .asd-option__name {
      font-size: 0.95rem;
    }

    .asd-vs {
      width: 2.65rem;
      height: 2.65rem;
      font-size: 0.72rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .asd-option,
    .asd-option__img,
    .asd-bar > span,
    .fs-celebrate.asd-option--winner {
      transition: none !important;
      animation: none !important;
    }

    .asd-option:hover:not(:disabled) {
      transform: none;
    }
  }
`;
function U(c) {
  return K(c).map((e, t) => ({
    id: `round-${t}`,
    question: l(e.question),
    img_a: l(e.img_a),
    name_a: l(e.name_a),
    url_a: C(e.url_a),
    votes_a: S(e.votes_a),
    votes_b: S(e.votes_b),
    img_b: l(e.img_b),
    name_b: l(e.name_b),
    url_b: C(e.url_b),
    result_desc: l(e.result_desc),
    enable_next: e.enable_next !== !1 && e.enable_next !== "false"
  })).filter(
    (e) => e.question.trim() !== "" && (e.name_a.trim() !== "" || e.img_a.trim() !== "") && (e.name_b.trim() !== "" || e.img_b.trim() !== "")
  );
}
function X(c, e, t) {
  let a = t ? c.votes_a : 0, r = t ? c.votes_b : 0;
  e === "a" && (a += 1), e === "b" && (r += 1);
  const o = a + r;
  return o === 0 ? { pctA: 50, pctB: 50, total: 0 } : {
    pctA: Math.round(a / o * 100),
    pctB: Math.round(r / o * 100),
    total: o
  };
}
function Y(c, e) {
  return l(c, e).trim() || e;
}
var G = Object.defineProperty, w = (c, e, t, a) => {
  for (var r = void 0, o = c.length - 1, p; o >= 0; o--)
    (p = c[o]) && (r = p(e, t, r) || r);
  return r && G(e, t, r), r;
};
const $ = class $ extends M {
  constructor() {
    super(...arguments), this.config = {}, this.roundIndex = 0, this.votes = {}, this._onLangChange = () => this.requestUpdate(), this._storageKey = "";
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("language-changed", this._onLangChange), this._loadVotes(), this._syncVisibility();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("language-changed", this._onLangChange);
  }
  updated(e) {
    this._syncVisibility(), e.has("config") && (this._loadVotes(), this.roundIndex >= this.rounds.length && (this.roundIndex = Math.max(0, this.rounds.length - 1)));
  }
  get rounds() {
    var e;
    return U((e = this.config) == null ? void 0 : e.asd_rounds);
  }
  get theme() {
    return A(this.config, "asd_");
  }
  get useSeedVotes() {
    var e;
    return x((e = this.config) == null ? void 0 : e.asd_use_seed_votes, !0);
  }
  get allowRevote() {
    var e;
    return x((e = this.config) == null ? void 0 : e.asd_allow_revote);
  }
  get hideResultSource() {
    var e;
    return x((e = this.config) == null ? void 0 : e.asd_hide_result_source);
  }
  get currentRound() {
    return this.rounds[this.roundIndex] ?? null;
  }
  _label(e, t, a) {
    var r;
    return l((r = this.config) == null ? void 0 : r[e], "") || d(t, a);
  }
  _syncVisibility() {
    this.style.display = this.rounds.length ? "" : "none";
  }
  _loadVotes() {
    var t;
    this._storageKey = Y(
      (t = this.config) == null ? void 0 : t.asd_storage_key,
      "asd-style-duel-votes"
    );
    const e = O(this._storageKey, { votes: {} });
    this.votes = e.votes || {};
  }
  _saveVotes() {
    T(this._storageKey, { votes: this.votes });
  }
  _vote(e) {
    const t = this.currentRound;
    !t || this.votes[t.id] && !this.allowRevote || (this.votes = { ...this.votes, [t.id]: e }, this._saveVotes());
  }
  _nextRound() {
    this.roundIndex < this.rounds.length - 1 && (this.roundIndex += 1);
  }
  render() {
    var y, k, z;
    if (!this.rounds.length)
      return s`<div class="fs-empty" role="status">
        ${d("لا توجد جولات متاحة", "No rounds available")}
      </div>`;
    const e = this.theme, t = e.animate && !E(), a = this.currentRound;
    if (!a) return i;
    const r = l((y = this.config) == null ? void 0 : y.asd_title), o = l((k = this.config) == null ? void 0 : k.asd_desc), p = l((z = this.config) == null ? void 0 : z.asd_result_note), _ = this._label("asd_next_btn", "المواجهة التالية", "Next duel"), g = this.votes[a.id] ?? null, n = g !== null, { pctA: m, pctB: u } = X(a, g, this.useSeedVotes), h = n && m >= u, f = n && u > m;
    return s`
      <section
        class=${v({
      "fs-section": !0,
      "fs-animate": t
    })}
        style=${R(N(e))}
        aria-label=${r || d("تحدي العبايات", "Abaya style duel")}
      >
        <div class="fs-container">
          ${r || o ? s`<header class="fs-header">
                ${r ? s`<h2 class="fs-title">${r}</h2>` : i}
                ${o ? s`<p class="fs-desc">${o}</p>` : i}
              </header>` : i}

          <div class="asd-arena" role="group" aria-label=${a.question}>
            <div class="asd-progress">
              <span class="asd-progress__meta">
                ${d("جولة", "Round")} ${this.roundIndex + 1}
                /
                ${this.rounds.length}
              </span>
              <div class="asd-dots" aria-hidden="true">
                ${this.rounds.map(
      (H, L) => s`<span
                    class=${v({
        "asd-dot": !0,
        "asd-dot--active": L === this.roundIndex
      })}
                  ></span>`
    )}
              </div>
            </div>

            <p class="asd-question">${a.question}</p>

            <div class="asd-options">
              ${this._renderOption("a", a, m, h, n, g === "a", t)}
              <span class="asd-vs" aria-hidden="true">VS</span>
              ${this._renderOption("b", a, u, f, n, g === "b", t)}
            </div>

            ${n && a.result_desc ? s`<div class="asd-result" aria-live="polite">${a.result_desc}</div>` : i}

            ${n && a.enable_next && this.roundIndex < this.rounds.length - 1 ? s`<div class="asd-nav">
                  <button type="button" class="fs-btn" @click=${this._nextRound}>
                    ${_}
                  </button>
                </div>` : i}

            ${p && !this.hideResultSource ? s`<p class="asd-note">${p}</p>` : i}

            <p class="asd-note">
              ${d(
      "النتائج محفوظة على جهازك فقط ولا تمثل تصويتًا لجميع الزوّار.",
      "Results are saved on your device only and do not represent all visitors."
    )}
            </p>
          </div>
        </div>
      </section>
    `;
  }
  _renderOption(e, t, a, r, o, p, _) {
    const g = e === "a" ? t.img_a : t.img_b, n = e === "a" ? t.name_a : t.name_b, m = e === "a" ? t.url_a : t.url_b, u = !o || this.allowRevote, h = {
      "asd-option": !0,
      "asd-option--winner": r,
      "asd-option--picked": p,
      "fs-celebrate": _ && r
    }, f = s`
      <div class="asd-option__media">
        ${g ? s`<img
              class="asd-option__img"
              src=${g}
              alt=${n}
              loading=${e === "a" ? "eager" : "lazy"}
              decoding="async"
            />` : i}
        <div class="asd-option__veil" aria-hidden="true"></div>
        ${o ? i : s`<span class="asd-option__vote-label">${d("صوّتي لها", "Vote for this")}</span>`}
        ${r ? s`<span class="asd-option__crown">${d("الأقرب لذوقك", "Your pick lead")}</span>` : i}
      </div>
      <div class="asd-option__body">
        <p class="asd-option__name">${n}</p>
        ${o ? s`
              <div class="asd-pct-row">
                <p class="asd-pct">${a}%</p>
                <span class="asd-pct-label">${d("من ذوقك", "of your taste")}</span>
              </div>
              <div
                class="asd-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow=${a}
                aria-label=${`${n}: ${a}%`}
              >
                <span style=${R({ width: `${a}%` })}></span>
              </div>
              ${V(m) ? s`<p class="asd-option__cta">${d("اضغطي لعرض المنتج", "Tap to view product")}</p>` : i}
            ` : s`<p class="asd-option__cta">${d("اختاري ما يقرّب من ذوقك", "Choose what matches your taste")}</p>`}
      </div>
    `;
    return V(m) && o ? s`
        <a
          class=${v(h)}
          href=${m}
          target="_blank"
          rel="noopener noreferrer"
          aria-label=${n}
        >
          ${f}
        </a>
      ` : s`
      <button
        type="button"
        class=${v(h)}
        ?disabled=${!u && o}
        aria-label=${d(`اختيار ${n}`, `Choose ${n}`)}
        aria-pressed=${p ? "true" : "false"}
        @click=${() => this._vote(e)}
      >
        ${f}
      </button>
    `;
  }
};
$.styles = [j, P];
let b = $;
w([
  B({ type: Object })
], b.prototype, "config");
w([
  I()
], b.prototype, "roundIndex");
w([
  I()
], b.prototype, "votes");
typeof b < "u" && b.registerSallaComponent("salla-abaya-style-duel");
export {
  b as default
};
