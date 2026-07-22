import { css as L, LitElement as M, html as o, nothing as i } from "lit";
import { property as B, state as I } from "lit/decorators.js";
import { classMap as b } from "lit/directives/class-map.js";
import { styleMap as R } from "lit/directives/style-map.js";
import { n as K, l, d as C, q as S, s as O, r as j, i as x, t as d, x as T, y as A, p as E, a as N, b as P, v as V } from "./sharedStyles-Cd7RKVf-.js";
const U = L`
  .asd-arena {
    position: relative;
    overflow: hidden;
    padding: 1.25rem 1rem 1.4rem;
    border-radius: var(--section-radius, 18px);
    border: 1px solid var(--border-color, #e8ddd6);
    background:
      radial-gradient(circle at top, color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 14%, transparent), transparent 40%),
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
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, var(--card-bg, #fff));
    color: var(--accent-color, var(--fs-store-primary));
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
    background: var(--accent-color, var(--fs-store-primary));
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
      linear-gradient(145deg, var(--accent-color, var(--fs-store-primary)), color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 65%, #000));
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
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, var(--border-color, #e8ddd6));
  }

  .asd-option:disabled {
    cursor: default;
  }

  .asd-option--winner {
    border-color: var(--accent-color, var(--fs-store-primary));
    box-shadow:
      0 0 0 2px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 25%, transparent),
      0 16px 34px rgba(43, 33, 28, 0.12);
  }

  .asd-option--picked {
    outline: 2px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 55%, transparent);
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
    background: color-mix(in srgb, var(--card-bg, #ffffff) 92%, var(--fs-surface, #f0f0f0));
    color: var(--accent-color, var(--fs-store-primary));
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
    background: var(--accent-color, var(--fs-store-primary));
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
    color: var(--accent-color, var(--fs-store-primary));
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
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 70%, #c4a484),
      var(--accent-color, var(--fs-store-primary))
    );
    transition: width 0.55s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .asd-result {
    margin-top: 1.25rem;
    padding: 1rem 1.05rem;
    border-radius: calc(var(--section-radius, 18px) * 0.65);
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 22%, var(--border-color, #e8ddd6));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, var(--card-bg, #fff));
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
function X(c) {
  return K(c).map((e, r) => ({
    id: `round-${r}`,
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
function Y(c, e, r) {
  let t = r ? c.votes_a : 0, a = r ? c.votes_b : 0;
  e === "a" && (t += 1), e === "b" && (a += 1);
  const s = t + a;
  return s === 0 ? { pctA: 50, pctB: 50, total: 0 } : {
    pctA: Math.round(t / s * 100),
    pctB: Math.round(a / s * 100),
    total: s
  };
}
function G(c, e) {
  return l(c, e).trim() || e;
}
var H = Object.defineProperty, y = (c, e, r, t) => {
  for (var a = void 0, s = c.length - 1, p; s >= 0; s--)
    (p = c[s]) && (a = p(e, r, a) || a);
  return a && H(e, r, a), a;
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
    return X((e = this.config) == null ? void 0 : e.asd_rounds);
  }
  get theme() {
    return j(this.config, "asd_");
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
  _label(e, r, t) {
    var a;
    return l((a = this.config) == null ? void 0 : a[e], "") || d(r, t);
  }
  _syncVisibility() {
    this.style.display = this.rounds.length ? "" : "none";
  }
  _loadVotes() {
    var r;
    this._storageKey = G(
      (r = this.config) == null ? void 0 : r.asd_storage_key,
      "asd-style-duel-votes"
    );
    const e = T(this._storageKey, { votes: {} });
    this.votes = e.votes || {};
  }
  _saveVotes() {
    A(this._storageKey, { votes: this.votes });
  }
  _vote(e) {
    const r = this.currentRound;
    !r || this.votes[r.id] && !this.allowRevote || (this.votes = { ...this.votes, [r.id]: e }, this._saveVotes());
  }
  _nextRound() {
    this.roundIndex < this.rounds.length - 1 && (this.roundIndex += 1);
  }
  render() {
    var w, k, z;
    if (!this.rounds.length)
      return o`<div class="fs-empty" role="status">
        ${d("لا توجد جولات متاحة", "No rounds available")}
      </div>`;
    const e = this.theme, r = e.animate && !E(), t = this.currentRound;
    if (!t) return i;
    const a = l((w = this.config) == null ? void 0 : w.asd_title), s = l((k = this.config) == null ? void 0 : k.asd_desc), p = l((z = this.config) == null ? void 0 : z.asd_result_note), _ = this._label("asd_next_btn", "المواجهة التالية", "Next duel"), m = this.votes[t.id] ?? null, n = m !== null, { pctA: g, pctB: f } = Y(t, m, this.useSeedVotes), h = n && g >= f, v = n && f > g;
    return o`
      <section
        class=${b({
      "fs-section": !0,
      "fs-animate": r
    })}
        style=${R(N(e))}
        aria-label=${a || d("تحدي العبايات", "Abaya style duel")}
      >
        <div class="fs-container">
          ${a || s ? o`<header class="fs-header">
                ${a ? o`<h2 class="fs-title">${a}</h2>` : i}
                ${s ? o`<p class="fs-desc">${s}</p>` : i}
              </header>` : i}

          <div class="asd-arena" role="group" aria-label=${t.question}>
            <div class="asd-progress">
              <span class="asd-progress__meta">
                ${d("جولة", "Round")} ${this.roundIndex + 1}
                /
                ${this.rounds.length}
              </span>
              <div class="asd-dots" aria-hidden="true">
                ${this.rounds.map(
      (F, q) => o`<span
                    class=${b({
        "asd-dot": !0,
        "asd-dot--active": q === this.roundIndex
      })}
                  ></span>`
    )}
              </div>
            </div>

            <p class="asd-question">${t.question}</p>

            <div class="asd-options">
              ${this._renderOption("a", t, g, h, n, m === "a", r)}
              <span class="asd-vs" aria-hidden="true">VS</span>
              ${this._renderOption("b", t, f, v, n, m === "b", r)}
            </div>

            ${n && t.result_desc ? o`<div class="asd-result" aria-live="polite">${t.result_desc}</div>` : i}

            ${n && t.enable_next && this.roundIndex < this.rounds.length - 1 ? o`<div class="asd-nav">
                  <button type="button" class="fs-btn" @click=${this._nextRound}>
                    ${_}
                  </button>
                </div>` : i}

            ${p && !this.hideResultSource ? o`<p class="asd-note">${p}</p>` : i}

            <p class="asd-note">
              ${d(
      "النتائج محفوظة على جهازك فقط ولا تمثل تصويتًا لجميع الزوّار.",
      "Results are saved on your device only and do not represent all visitors."
    )}
            </p>
          </div>
        </div>
        ${P(this.config || {}, "asd_")}
      </section>
    `;
  }
  _renderOption(e, r, t, a, s, p, _) {
    const m = e === "a" ? r.img_a : r.img_b, n = e === "a" ? r.name_a : r.name_b, g = e === "a" ? r.url_a : r.url_b, f = !s || this.allowRevote, h = {
      "asd-option": !0,
      "asd-option--winner": a,
      "asd-option--picked": p,
      "fs-celebrate": _ && a
    }, v = o`
      <div class="asd-option__media">
        ${m ? o`<img
              class="asd-option__img"
              src=${m}
              alt=${n}
              loading=${e === "a" ? "eager" : "lazy"}
              decoding="async"
            />` : i}
        <div class="asd-option__veil" aria-hidden="true"></div>
        ${s ? i : o`<span class="asd-option__vote-label">${d("صوّتي لها", "Vote for this")}</span>`}
        ${a ? o`<span class="asd-option__crown">${d("الأقرب لذوقك", "Your pick lead")}</span>` : i}
      </div>
      <div class="asd-option__body">
        <p class="asd-option__name">${n}</p>
        ${s ? o`
              <div class="asd-pct-row">
                <p class="asd-pct">${t}%</p>
                <span class="asd-pct-label">${d("من ذوقك", "of your taste")}</span>
              </div>
              <div
                class="asd-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow=${t}
                aria-label=${`${n}: ${t}%`}
              >
                <span style=${R({ width: `${t}%` })}></span>
              </div>
              ${V(g) ? o`<p class="asd-option__cta">${d("اضغطي لعرض المنتج", "Tap to view product")}</p>` : i}
            ` : o`<p class="asd-option__cta">${d("اختاري ما يقرّب من ذوقك", "Choose what matches your taste")}</p>`}
      </div>
    `;
    return V(g) && s ? o`
        <a
          class=${b(h)}
          href=${g}
          target="_blank"
          rel="noopener noreferrer"
          aria-label=${n}
        >
          ${v}
        </a>
      ` : o`
      <button
        type="button"
        class=${b(h)}
        ?disabled=${!f && s}
        aria-label=${d(`اختيار ${n}`, `Choose ${n}`)}
        aria-pressed=${p ? "true" : "false"}
        @click=${() => this._vote(e)}
      >
        ${v}
      </button>
    `;
  }
};
$.styles = [O, U];
let u = $;
y([
  B({ type: Object })
], u.prototype, "config");
y([
  I()
], u.prototype, "roundIndex");
y([
  I()
], u.prototype, "votes");
typeof u < "u" && u.registerSallaComponent("salla-abaya-style-duel");
export {
  u as default
};
