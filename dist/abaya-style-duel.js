var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { n as normalizeCollection, l as localizedString, d as extractLink, q as getUnitValue, s as sharedSectionCss, r as readSectionTheme, i as isTruthy, t, x as safeStorageGet, y as safeStorageSet, p as prefersReducedMotion, a as themeStyleMap, b as renderCommerceOutcome, v as isValidHref } from "./sharedStyles-Q5qADHV9.js";
const componentStyles = css`
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
function parseRounds(raw) {
  return normalizeCollection(raw).map((item, index) => ({
    id: `round-${index}`,
    question: localizedString(item.question),
    img_a: localizedString(item.img_a),
    name_a: localizedString(item.name_a),
    url_a: extractLink(item.url_a),
    votes_a: getUnitValue(item.votes_a),
    votes_b: getUnitValue(item.votes_b),
    img_b: localizedString(item.img_b),
    name_b: localizedString(item.name_b),
    url_b: extractLink(item.url_b),
    result_desc: localizedString(item.result_desc),
    enable_next: item.enable_next !== !1 && item.enable_next !== "false"
  })).filter(
    (r) => r.question.trim() !== "" && (r.name_a.trim() !== "" || r.img_a.trim() !== "") && (r.name_b.trim() !== "" || r.img_b.trim() !== "")
  );
}
__name(parseRounds, "parseRounds");
function computePercentages(round, choice, useSeed) {
  let votesA = useSeed ? round.votes_a : 0, votesB = useSeed ? round.votes_b : 0;
  choice === "a" && (votesA += 1), choice === "b" && (votesB += 1);
  const total = votesA + votesB;
  return total === 0 ? { pctA: 50, pctB: 50, total: 0 } : {
    pctA: Math.round(votesA / total * 100),
    pctB: Math.round(votesB / total * 100),
    total
  };
}
__name(computePercentages, "computePercentages");
function getStorageKey(configKey, fallback) {
  return localizedString(configKey, fallback).trim() || fallback;
}
__name(getStorageKey, "getStorageKey");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const _AbayaStyleDuel = class _AbayaStyleDuel extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.roundIndex = 0, this.votes = {}, this._onLangChange = () => this.requestUpdate(), this._storageKey = "";
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("language-changed", this._onLangChange), this._loadVotes(), this._syncVisibility();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("language-changed", this._onLangChange);
  }
  updated(changed) {
    this._syncVisibility(), changed.has("config") && (this._loadVotes(), this.roundIndex >= this.rounds.length && (this.roundIndex = Math.max(0, this.rounds.length - 1)));
  }
  get rounds() {
    var _a;
    return parseRounds((_a = this.config) == null ? void 0 : _a.asd_rounds);
  }
  get theme() {
    return readSectionTheme(this.config, "asd_");
  }
  get useSeedVotes() {
    var _a;
    return isTruthy((_a = this.config) == null ? void 0 : _a.asd_use_seed_votes, !0);
  }
  get allowRevote() {
    var _a;
    return isTruthy((_a = this.config) == null ? void 0 : _a.asd_allow_revote);
  }
  get hideResultSource() {
    var _a;
    return isTruthy((_a = this.config) == null ? void 0 : _a.asd_hide_result_source);
  }
  get currentRound() {
    return this.rounds[this.roundIndex] ?? null;
  }
  _label(key, ar, en) {
    var _a;
    return localizedString((_a = this.config) == null ? void 0 : _a[key], "") || t(ar, en);
  }
  _syncVisibility() {
    this.style.display = this.rounds.length ? "" : "none";
  }
  _loadVotes() {
    var _a;
    this._storageKey = getStorageKey(
      (_a = this.config) == null ? void 0 : _a.asd_storage_key,
      "asd-style-duel-votes"
    );
    const stored = safeStorageGet(this._storageKey, { votes: {} });
    this.votes = stored.votes || {};
  }
  _saveVotes() {
    safeStorageSet(this._storageKey, { votes: this.votes });
  }
  _vote(choice) {
    const round = this.currentRound;
    !round || this.votes[round.id] && !this.allowRevote || (this.votes = { ...this.votes, [round.id]: choice }, this._saveVotes());
  }
  _nextRound() {
    this.roundIndex < this.rounds.length - 1 && (this.roundIndex += 1);
  }
  render() {
    var _a, _b, _c;
    if (!this.rounds.length)
      return html`<div class="fs-empty" role="status">
        ${t("لا توجد جولات متاحة", "No rounds available")}
      </div>`;
    const theme = this.theme, animate = theme.animate && !prefersReducedMotion(), round = this.currentRound;
    if (!round) return nothing;
    const title = localizedString((_a = this.config) == null ? void 0 : _a.asd_title), desc = localizedString((_b = this.config) == null ? void 0 : _b.asd_desc), resultNote = localizedString((_c = this.config) == null ? void 0 : _c.asd_result_note), nextBtn = this._label("asd_next_btn", "المواجهة التالية", "Next duel"), choice = this.votes[round.id] ?? null, hasVoted = choice !== null, { pctA, pctB } = computePercentages(round, choice, this.useSeedVotes), winnerA = hasVoted && pctA >= pctB, winnerB = hasVoted && pctB > pctA;
    return html`
      <section
        class=${classMap({
      "fs-section": !0,
      "fs-animate": animate
    })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("تحدي العبايات", "Abaya style duel")}
      >
        <div class="fs-container">
          ${title || desc ? html`<header class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </header>` : nothing}

          <div class="asd-arena" role="group" aria-label=${round.question}>
            <div class="asd-progress">
              <span class="asd-progress__meta">
                ${t("جولة", "Round")} ${this.roundIndex + 1}
                /
                ${this.rounds.length}
              </span>
              <div class="asd-dots" aria-hidden="true">
                ${this.rounds.map(
      (_, i) => html`<span
                    class=${classMap({
        "asd-dot": !0,
        "asd-dot--active": i === this.roundIndex
      })}
                  ></span>`
    )}
              </div>
            </div>

            <p class="asd-question">${round.question}</p>

            <div class="asd-options">
              ${this._renderOption("a", round, pctA, winnerA, hasVoted, choice === "a", animate)}
              <span class="asd-vs" aria-hidden="true">VS</span>
              ${this._renderOption("b", round, pctB, winnerB, hasVoted, choice === "b", animate)}
            </div>

            ${hasVoted && round.result_desc ? html`<div class="asd-result" aria-live="polite">${round.result_desc}</div>` : nothing}

            ${hasVoted && round.enable_next && this.roundIndex < this.rounds.length - 1 ? html`<div class="asd-nav">
                  <button type="button" class="fs-btn" @click=${this._nextRound}>
                    ${nextBtn}
                  </button>
                </div>` : nothing}

            ${resultNote && !this.hideResultSource ? html`<p class="asd-note">${resultNote}</p>` : nothing}

            <p class="asd-note">
              ${t(
      "النتائج محفوظة على جهازك فقط ولا تمثل تصويتًا لجميع الزوّار.",
      "Results are saved on your device only and do not represent all visitors."
    )}
            </p>
          </div>
        </div>
        ${renderCommerceOutcome(this.config || {}, "asd_")}
      </section>
    `;
  }
  _renderOption(side, round, pct, isWinner, hasVoted, isPicked, animate) {
    const img = side === "a" ? round.img_a : round.img_b, name = side === "a" ? round.name_a : round.name_b, url = side === "a" ? round.url_a : round.url_b, canVote = !hasVoted || this.allowRevote, classes = {
      "asd-option": !0,
      "asd-option--winner": isWinner,
      "asd-option--picked": isPicked,
      "fs-celebrate": animate && isWinner
    }, content = html`
      <div class="asd-option__media">
        ${img ? html`<img
              class="asd-option__img"
              src=${img}
              alt=${name}
              loading=${side === "a" ? "eager" : "lazy"}
              decoding="async"
            />` : nothing}
        <div class="asd-option__veil" aria-hidden="true"></div>
        ${hasVoted ? nothing : html`<span class="asd-option__vote-label">${t("صوّتي لها", "Vote for this")}</span>`}
        ${isWinner ? html`<span class="asd-option__crown">${t("الأقرب لذوقك", "Your pick lead")}</span>` : nothing}
      </div>
      <div class="asd-option__body">
        <p class="asd-option__name">${name}</p>
        ${hasVoted ? html`
              <div class="asd-pct-row">
                <p class="asd-pct">${pct}%</p>
                <span class="asd-pct-label">${t("من ذوقك", "of your taste")}</span>
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
              ${isValidHref(url) ? html`<p class="asd-option__cta">${t("اضغطي لعرض المنتج", "Tap to view product")}</p>` : nothing}
            ` : html`<p class="asd-option__cta">${t("اختاري ما يقرّب من ذوقك", "Choose what matches your taste")}</p>`}
      </div>
    `;
    return isValidHref(url) && hasVoted ? html`
        <a
          class=${classMap(classes)}
          href=${url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label=${name}
        >
          ${content}
        </a>
      ` : html`
      <button
        type="button"
        class=${classMap(classes)}
        ?disabled=${!canVote && hasVoted}
        aria-label=${t(`اختيار ${name}`, `Choose ${name}`)}
        aria-pressed=${isPicked ? "true" : "false"}
        @click=${() => this._vote(side)}
      >
        ${content}
      </button>
    `;
  }
};
__name(_AbayaStyleDuel, "AbayaStyleDuel"), _AbayaStyleDuel.styles = [sharedSectionCss, componentStyles];
let AbayaStyleDuel = _AbayaStyleDuel;
__decorateClass([
  property({ type: Object })
], AbayaStyleDuel.prototype, "config");
__decorateClass([
  state()
], AbayaStyleDuel.prototype, "roundIndex");
__decorateClass([
  state()
], AbayaStyleDuel.prototype, "votes");
typeof AbayaStyleDuel < "u" && AbayaStyleDuel.registerSallaComponent("salla-abaya-style-duel");
export {
  AbayaStyleDuel as default
};
