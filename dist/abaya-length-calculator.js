var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { n as normalizeCollection, l as localizedString, d as extractLink, q as getUnitValue, i as isTruthy, u as clamp, s as sharedSectionCss, r as readSectionTheme, t, a as themeStyleMap, b as renderCommerceOutcome, v as isValidHref } from "./sharedStyles-Q5qADHV9.js";
const componentStyles = css`
  .alc-layout {
    display: grid;
    gap: 1.25rem;
  }

  @media (min-width: 900px) {
    .alc-layout {
      grid-template-columns: 1.1fr 0.9fr;
      align-items: start;
    }
  }

  .alc-form {
    display: grid;
    gap: 1.15rem;
    padding: 1.35rem;
  }

  .alc-field {
    display: grid;
    gap: 0.45rem;
  }

  .alc-field label,
  .alc-field legend {
    font-weight: 600;
    font-size: 0.92rem;
    color: var(--text-color, #2b211c);
  }

  .alc-field legend {
    padding: 0;
    margin-bottom: 0.15rem;
  }

  .alc-height-row {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0.65rem;
    align-items: center;
  }

  .alc-input,
  .alc-slider {
    width: 100%;
    box-sizing: border-box;
  }

  .alc-input {
    min-height: 44px;
    padding: 0.65rem 0.85rem;
    border: 1px solid var(--border-color, #e8ddd6);
    border-radius: calc(var(--section-radius, 16px) * 0.5);
    background: var(--card-bg, #fff);
    color: var(--text-color, #2b211c);
    font: inherit;
  }

  .alc-height-unit {
    min-width: 2.5rem;
    color: var(--muted-color, #7a6a62);
    font-weight: 600;
  }

  .alc-slider {
    accent-color: var(--accent-color, var(--fs-store-primary));
    min-height: 44px;
    cursor: pointer;
    /* Match guide + size chips: min at inline-start (right in Arabic) */
    direction: inherit;
  }

  .alc-guide {
    display: grid;
    gap: 0.65rem;
    padding: 0.9rem;
    border: 1px dashed var(--border-color, #e8ddd6);
    border-radius: calc(var(--section-radius, 16px) * 0.45);
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 4%, var(--card-bg, #fff));
  }

  .alc-guide__track {
    position: relative;
    height: 12px;
    border-radius: 6px;
    /* Logical positioning so marker moves with size direction in RTL/LTR */
    direction: inherit;
    background: color-mix(in srgb, var(--border-color, #e8ddd6) 70%, transparent);
  }

  .alc-guide__segment {
    position: absolute;
    top: 0;
    bottom: 0;
    min-width: 2px;
    border-radius: 4px;
    opacity: 0.72;
    transition: opacity 0.2s ease, filter 0.2s ease;
  }

  .alc-guide__segment--active {
    opacity: 1;
    filter: brightness(1.05);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.35);
  }

  .alc-guide__marker {
    position: absolute;
    top: 50%;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid #fff;
    background: var(--accent-color, var(--fs-store-primary));
    transform: translateY(-50%);
    /* Negative inline margin centers the dot on the percentage edge in RTL + LTR */
    margin-inline-start: -8px;
    box-shadow: 0 2px 8px rgba(43, 33, 28, 0.25);
    pointer-events: none;
    z-index: 2;
  }

  .alc-guide__labels {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    color: var(--muted-color, #7a6a62);
    font-size: 0.75rem;
  }

  .alc-guide__chips {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(5.75rem, 1fr));
    gap: 0.45rem;
  }

  .alc-chip {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    width: 100%;
    min-height: 44px;
    padding: 0.55rem 0.7rem;
    border-radius: 8px;
    border: 1px solid var(--border-color, #e8ddd6);
    background: var(--card-bg, #fff);
    color: var(--muted-color, #7a6a62);
    font: inherit;
    font-size: 0.74rem;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
  }

  .alc-chip:hover {
    border-color: color-mix(in srgb, currentColor 40%, var(--border-color, #e8ddd6));
    background: color-mix(in srgb, currentColor 5%, var(--card-bg, #fff));
  }

  .alc-chip--active {
    border-color: currentColor;
    background: color-mix(in srgb, currentColor 12%, var(--card-bg, #fff));
    box-shadow: inset 0 0 0 1px color-mix(in srgb, currentColor 25%, transparent);
    font-weight: 600;
  }

  .alc-chip__swatch {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 3px;
    background: currentColor;
    flex: 0 0 auto;
  }

  .alc-chip__text {
    display: grid;
    gap: 0.1rem;
    text-align: start;
    line-height: 1.25;
    min-width: 0;
  }

  .alc-chip__name {
    font-weight: 600;
    color: var(--text-color, #2b211c);
  }

  .alc-chip--active .alc-chip__name {
    color: inherit;
  }

  .alc-chip__range {
    font-size: 0.64rem;
    opacity: 0.78;
    font-weight: 500;
  }

  .alc-options {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .alc-option {
    flex: 1 1 auto;
    min-width: 5.5rem;
    min-height: 44px;
    padding: 0.55rem 0.75rem;
    border: 1px solid var(--border-color, #e8ddd6);
    border-radius: calc(var(--section-radius, 16px) * 0.5);
    background: var(--card-bg, #fff);
    color: var(--text-color, #2b211c);
    font: inherit;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s, transform 0.2s;
    text-align: center;
  }

  .alc-option small {
    display: block;
    margin-top: 0.15rem;
    font-size: 0.72rem;
    color: var(--muted-color, #7a6a62);
    font-weight: 400;
  }

  .alc-option[aria-pressed='true'] {
    border-color: var(--accent-color, var(--fs-store-primary));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
    font-weight: 600;
  }

  .alc-option:hover {
    transform: translateY(-1px);
  }

  .alc-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem;
    justify-content: center;
  }

  .alc-result {
    padding: 1.35rem;
    display: grid;
    gap: 1rem;
  }

  .alc-result__top {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    justify-content: center;
    align-items: center;
  }

  .alc-badge {
    display: inline-flex;
    align-items: center;
    min-height: 2rem;
    padding: 0.25rem 0.8rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 14%, transparent);
    color: var(--accent-color, var(--fs-store-primary));
    font-weight: 700;
    font-size: 0.88rem;
  }

  .alc-result__length {
    margin: 0;
    text-align: center;
    font-size: clamp(2.4rem, 6vw, 3.4rem);
    font-weight: 700;
    color: var(--accent-color, var(--fs-store-primary));
    line-height: 1.1;
  }

  .alc-result__unit {
    display: inline;
    margin-inline-start: 0.25rem;
    font-size: 1rem;
    color: var(--muted-color, #7a6a62);
    font-weight: 500;
  }

  .alc-confidence {
    display: grid;
    gap: 0.35rem;
  }

  .alc-confidence__label {
    display: flex;
    justify-content: space-between;
    gap: 0.75rem;
    font-size: 0.82rem;
    color: var(--muted-color, #7a6a62);
  }

  .alc-confidence__bar {
    height: 8px;
    border-radius: 999px;
    overflow: hidden;
    background: color-mix(in srgb, var(--border-color, #e8ddd6) 85%, transparent);
  }

  .alc-confidence__bar > span {
    display: block;
    height: 100%;
    background: var(--accent-color, var(--fs-store-primary));
    border-radius: inherit;
    transition: width 0.35s ease;
  }

  .alc-result__reason,
  .alc-result__note {
    margin: 0;
    color: var(--muted-color, #7a6a62);
    font-size: 0.9rem;
    line-height: 1.65;
    text-align: center;
  }

  .alc-breakdown {
    display: grid;
    gap: 0.35rem;
    padding: 0.85rem;
    border-radius: calc(var(--section-radius, 16px) * 0.5);
    background: color-mix(in srgb, var(--section-bg, #faf7f5) 70%, var(--card-bg, #fff));
    font-size: 0.85rem;
  }

  .alc-breakdown__row {
    display: flex;
    justify-content: space-between;
    gap: 0.75rem;
    color: var(--text-color, #2b211c);
  }

  .alc-nearby {
    display: grid;
    gap: 0.55rem;
  }

  .alc-nearby__title {
    margin: 0;
    font-size: 0.88rem;
    font-weight: 700;
    color: var(--text-color, #2b211c);
  }

  .alc-nearby__list {
    display: grid;
    gap: 0.5rem;
  }

  @media (min-width: 640px) {
    .alc-nearby__list {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  .alc-nearby__card {
    display: grid;
    gap: 0.25rem;
    padding: 0.75rem;
    border: 1px solid var(--border-color, #e8ddd6);
    border-radius: calc(var(--section-radius, 16px) * 0.5);
    text-align: start;
    text-decoration: none;
    color: inherit;
    background: var(--card-bg, #fff);
  }

  .alc-nearby__card strong {
    color: var(--accent-color, var(--fs-store-primary));
  }

  .alc-error {
    margin: 0;
    padding: 0.75rem 1rem;
    border-radius: calc(var(--section-radius, 16px) * 0.5);
    background: color-mix(in srgb, #c0392b 10%, var(--card-bg, #fff));
    color: #8b2e24;
    font-size: 0.9rem;
    text-align: center;
  }

  .alc-disclaimer {
    margin-top: 0.25rem;
    text-align: center;
    font-size: 0.82rem;
    color: var(--muted-color, #7a6a62);
    line-height: 1.6;
  }

  .alc-live-hint {
    margin: 0;
    text-align: center;
    font-size: 0.8rem;
    color: var(--muted-color, #7a6a62);
  }

  .fs-animate .alc-result {
    animation: alc-fade-in 0.45s ease;
  }

  @media (max-width: 959px) {
    .alc-form,
    .alc-result {
      padding: 1.05rem 1rem;
    }

    .alc-actions {
      display: grid;
      grid-template-columns: 1fr;
    }

    .alc-actions .fs-btn {
      width: 100%;
    }
  }

  @media (max-width: 639px) {
    .alc-form,
    .alc-result {
      padding: 0.95rem 0.85rem;
    }

    .alc-guide__chips {
      grid-template-columns: 1fr;
      gap: 0.45rem;
    }

    .alc-chip {
      font-size: 0.78rem;
    }

    .alc-height-row {
      grid-template-columns: 1fr;
      gap: 0.45rem;
    }

    .alc-option {
      min-height: 44px;
    }

    .alc-actions {
      display: grid;
      grid-template-columns: 1fr;
    }

    .alc-actions .fs-btn {
      width: 100%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .alc-option:hover,
    .alc-confidence__bar > span,
    .fs-animate .alc-result {
      transform: none;
      animation: none;
      transition: none;
    }
  }

  @keyframes alc-fade-in {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
function parseRanges(raw) {
  return normalizeCollection(raw).map((item) => ({
    min_height: getUnitValue(item.min_height),
    max_height: getUnitValue(item.max_height),
    flat_length: getUnitValue(item.flat_length),
    mid_heel_length: getUnitValue(item.mid_heel_length),
    high_heel_length: getUnitValue(item.high_heel_length),
    alt_size: localizedString(item.alt_size),
    note: localizedString(item.note),
    products_url: extractLink(item.products_url),
    range_label: localizedString(item.range_label)
  })).filter(
    (r) => r.min_height > 0 && r.max_height >= r.min_height && (r.flat_length > 0 || r.mid_heel_length > 0 || r.high_heel_length > 0)
  ).sort((a, b) => a.min_height - b.min_height);
}
__name(parseRanges, "parseRanges");
function parseCuts(raw) {
  return normalizeCollection(raw).map((item, index) => ({
    cut_id: localizedString(item.cut_id) || localizedString(item.cut_name) || `cut-${index}`,
    cut_name: localizedString(item.cut_name),
    cut_desc: localizedString(item.cut_desc),
    length_delta: getUnitValue(item.length_delta, 0),
    is_default: isTruthy(item.is_default)
  })).filter((c) => c.cut_name.trim() !== "");
}
__name(parseCuts, "parseCuts");
function findRange(ranges, height) {
  return ranges.find((r) => height >= r.min_height && height <= r.max_height) ?? null;
}
__name(findRange, "findRange");
function getBaseLength(range, shoe) {
  return shoe === "mid" ? range.mid_heel_length || range.flat_length : shoe === "high" && (range.high_heel_length || range.mid_heel_length) || range.flat_length;
}
__name(getBaseLength, "getBaseLength");
function computeConfidence(height, range) {
  const span = range.max_height - range.min_height;
  if (span <= 0) return 100;
  const mid = (range.min_height + range.max_height) / 2, distance = Math.abs(height - mid), edgeRatio = clamp(distance / (span / 2), 0, 1);
  return Math.round((1 - edgeRatio) * 100);
}
__name(computeConfidence, "computeConfidence");
function findNearby(ranges, current, shoe, preference, shorterOffset, longerOffset, cutDelta, scarfDelta) {
  const index = ranges.findIndex(
    (r) => r.min_height === current.min_height && r.max_height === current.max_height
  );
  if (index < 0) return [];
  const out = [], build = /* @__PURE__ */ __name((range, relation) => {
    const base = getBaseLength(range, shoe);
    let prefDelta = 0;
    preference === "shorter" && (prefDelta = -shorterOffset), preference === "longer" && (prefDelta = longerOffset), out.push({
      alt_size: range.alt_size,
      suggestedLength: clamp(base + prefDelta + cutDelta + scarfDelta, 0, 999),
      note: range.note,
      products_url: range.products_url,
      relation
    });
  }, "build");
  return index > 0 && build(ranges[index - 1], "lower"), index < ranges.length - 1 && build(ranges[index + 1], "higher"), out;
}
__name(findNearby, "findNearby");
function calculateLength(params) {
  const range = findRange(params.ranges, params.height);
  if (!range) return null;
  const baseLength = getBaseLength(range, params.shoe);
  let preferenceDelta = 0;
  params.preference === "shorter" && (preferenceDelta = -params.shorterOffset), params.preference === "longer" && (preferenceDelta = params.longerOffset);
  const suggestedLength = clamp(
    baseLength + preferenceDelta + params.cutDelta + params.scarfDelta,
    0,
    999
  );
  return {
    range,
    baseLength,
    suggestedLength,
    cutDelta: params.cutDelta,
    scarfDelta: params.scarfDelta,
    preferenceDelta,
    confidence: computeConfidence(params.height, range),
    reason: params.reasonParts.filter(Boolean).join(" · "),
    nearby: findNearby(
      params.ranges,
      range,
      params.shoe,
      params.preference,
      params.shorterOffset,
      params.longerOffset,
      params.cutDelta,
      params.scarfDelta
    )
  };
}
__name(calculateLength, "calculateLength");
function overallBounds(ranges, fallbackMin, fallbackMax) {
  return ranges.length ? {
    min: Math.min(...ranges.map((r) => r.min_height)),
    max: Math.max(...ranges.map((r) => r.max_height))
  } : { min: fallbackMin, max: fallbackMax };
}
__name(overallBounds, "overallBounds");
function heightToPercent(height, min, max) {
  return max <= min ? 0 : clamp((height - min) / (max - min) * 100, 0, 100);
}
__name(heightToPercent, "heightToPercent");
function rangeSegmentStyle(range, boundsMin, boundsMax) {
  const span = Math.max(boundsMax - boundsMin, 1), start = (range.min_height - boundsMin) / span * 100, end = (range.max_height + 1 - boundsMin) / span * 100, width = Math.max(end - start, 0.5);
  return {
    start: clamp(start, 0, 100),
    width: clamp(width, 0.5, 100 - clamp(start, 0, 100))
  };
}
__name(rangeSegmentStyle, "rangeSegmentStyle");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const SEGMENT_COLORS = ["#8b5e4b", "#a6775f", "#6b4a3d", "#c4a18a", "#5a3d32"], _AbayaLengthCalculator = class _AbayaLengthCalculator extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.heightInput = "", this.shoeType = "flat", this.preference = "exact", this.cutId = "", this.withScarf = !1, this.result = null, this.error = "", this.initialized = !1, this._onLangChange = () => this.requestUpdate(), this._liveTimer = null;
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("language-changed", this._onLangChange), this._ensureDefaults(), this._syncVisibility(), this.liveCalc && this._scheduleCalc();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("language-changed", this._onLangChange), this._liveTimer && clearTimeout(this._liveTimer);
  }
  updated(changed) {
    changed.has("config") && (this.initialized = !1, this._ensureDefaults(), this.liveCalc && this._scheduleCalc()), this._syncVisibility();
  }
  get ranges() {
    var _a;
    return parseRanges((_a = this.config) == null ? void 0 : _a.alc_ranges);
  }
  get cuts() {
    var _a;
    return parseCuts((_a = this.config) == null ? void 0 : _a.alc_cuts);
  }
  get theme() {
    return readSectionTheme(this.config, "alc_");
  }
  get minHeight() {
    var _a;
    return getUnitValue((_a = this.config) == null ? void 0 : _a.alc_min_height, 150);
  }
  get maxHeight() {
    var _a;
    return getUnitValue((_a = this.config) == null ? void 0 : _a.alc_max_height, 200);
  }
  get shorterOffset() {
    var _a;
    return getUnitValue((_a = this.config) == null ? void 0 : _a.alc_shorter_offset, 2);
  }
  get longerOffset() {
    var _a;
    return getUnitValue((_a = this.config) == null ? void 0 : _a.alc_longer_offset, 2);
  }
  get scarfDelta() {
    var _a;
    return this.withScarf ? getUnitValue((_a = this.config) == null ? void 0 : _a.alc_scarf_delta, 1) : 0;
  }
  get liveCalc() {
    var _a;
    return isTruthy((_a = this.config) == null ? void 0 : _a.alc_live_calc, !0);
  }
  get showSlider() {
    var _a;
    return isTruthy((_a = this.config) == null ? void 0 : _a.alc_show_slider, !0);
  }
  get showGuide() {
    var _a;
    return isTruthy((_a = this.config) == null ? void 0 : _a.alc_show_guide, !0);
  }
  get showCut() {
    var _a;
    return isTruthy((_a = this.config) == null ? void 0 : _a.alc_show_cut, !0) && this.cuts.length > 0;
  }
  get showScarf() {
    var _a;
    return isTruthy((_a = this.config) == null ? void 0 : _a.alc_show_scarf, !0);
  }
  get selectedCut() {
    return this.cuts.find((c) => c.cut_id === this.cutId) || this.cuts[0] || null;
  }
  _syncVisibility() {
    this.style.display = this.ranges.length ? "" : "none";
  }
  _ensureDefaults() {
    var _a, _b, _c, _d;
    if (this.initialized) return;
    const midFallback = Math.round((this.minHeight + this.maxHeight) / 2) || 165, defaultHeight = getUnitValue((_a = this.config) == null ? void 0 : _a.alc_default_height, midFallback);
    if (!this.heightInput.trim()) {
      const clamped = Math.min(
        this.maxHeight,
        Math.max(this.minHeight, defaultHeight > 0 ? defaultHeight : midFallback)
      );
      this.heightInput = String(clamped);
    }
    if (this.cuts.length) {
      const def = this.cuts.find((c) => c.is_default) || this.cuts[0];
      this.cutId = def.cut_id;
    }
    const defaultShoe = localizedString((_b = this.config) == null ? void 0 : _b.alc_default_shoe, "flat");
    (defaultShoe === "mid" || defaultShoe === "high" || defaultShoe === "flat") && (this.shoeType = defaultShoe);
    const defaultPref = localizedString((_c = this.config) == null ? void 0 : _c.alc_default_preference, "exact");
    (defaultPref === "shorter" || defaultPref === "exact" || defaultPref === "longer") && (this.preference = defaultPref), this.withScarf = isTruthy((_d = this.config) == null ? void 0 : _d.alc_scarf_default, !1), this.initialized = !0;
  }
  _label(key, ar, en) {
    var _a;
    return localizedString((_a = this.config) == null ? void 0 : _a[key], "") || t(ar, en);
  }
  _scheduleCalc() {
    this._liveTimer && clearTimeout(this._liveTimer), this._liveTimer = setTimeout(() => {
      this._calculate(!0);
    }, 120);
  }
  _onHeightInput(e) {
    this.heightInput = e.target.value, this.error = "", this.liveCalc && this._scheduleCalc();
  }
  _onSliderInput(e) {
    this.heightInput = e.target.value, this.error = "", this.liveCalc && this._scheduleCalc();
  }
  _jumpToRange(minHeight, maxHeight) {
    const mid = Math.round((minHeight + maxHeight) / 2);
    this.heightInput = String(mid), this.error = "", this.liveCalc && this._scheduleCalc();
  }
  _setShoe(shoe) {
    this.shoeType = shoe, this.liveCalc && this._scheduleCalc();
  }
  _setPreference(pref) {
    this.preference = pref, this.liveCalc && this._scheduleCalc();
  }
  _setCut(cutId) {
    this.cutId = cutId, this.liveCalc && this._scheduleCalc();
  }
  _setScarf(value) {
    this.withScarf = value, this.liveCalc && this._scheduleCalc();
  }
  _buildReasonParts(cut) {
    const shoeLabel = this.shoeType === "flat" ? this._label("alc_shoe_flat", "مسطح", "Flat") : this.shoeType === "mid" ? this._label("alc_shoe_mid", "كعب متوسط", "Mid heel") : this._label("alc_shoe_high", "كعب عالي", "High heel"), prefLabel = this.preference === "shorter" ? this._label("alc_pref_shorter", "أقصر قليلًا", "Slightly shorter") : this.preference === "longer" ? this._label("alc_pref_longer", "أطول قليلًا", "Slightly longer") : this._label("alc_pref_exact", "طول مضبوط", "Exact length"), parts = [
      `${this._label("alc_shoe_label", "الحذاء", "Shoe")}: ${shoeLabel}`,
      `${this._label("alc_pref_label", "التفضيل", "Preference")}: ${prefLabel}`
    ];
    return cut && parts.push(
      `${this._label("alc_cut_label", "القصة", "Silhouette")}: ${cut.cut_name}`
    ), this.showScarf && this.withScarf && parts.push(this._label("alc_scarf_yes", "مع طرحة", "With scarf")), parts;
  }
  _calculate(silent = !1) {
    const height = Number(this.heightInput);
    if (!this.heightInput.trim()) {
      this.result = null, this.error = silent ? "" : t("يرجى إدخال طولك بالسنتيمتر", "Please enter your height in centimeters");
      return;
    }
    if (!Number.isFinite(height) || height <= 0) {
      this.result = null, this.error = t(
        "يرجى إدخال طول صحيح بالسنتيمتر",
        "Please enter a valid height in centimeters"
      );
      return;
    }
    if (height < this.minHeight || height > this.maxHeight) {
      this.result = null, this.error = t(
        `الطول يجب أن يكون بين ${this.minHeight} و ${this.maxHeight} سم`,
        `Height must be between ${this.minHeight} and ${this.maxHeight} cm`
      );
      return;
    }
    const cut = this.selectedCut, result = calculateLength({
      ranges: this.ranges,
      height,
      shoe: this.shoeType,
      preference: this.preference,
      shorterOffset: this.shorterOffset,
      longerOffset: this.longerOffset,
      cutDelta: (cut == null ? void 0 : cut.length_delta) || 0,
      scarfDelta: this.scarfDelta,
      reasonParts: this._buildReasonParts(cut)
    });
    if (!result) {
      this.result = null, this.error = this._label(
        "alc_no_match",
        "لا يوجد مقاس مناسب لطولك — تواصلي معنا للمساعدة",
        "No matching size for your height — contact us for help"
      );
      return;
    }
    this.error = "", this.result = result;
  }
  _reset() {
    this.initialized = !1, this.heightInput = "", this.shoeType = "flat", this.preference = "exact", this.cutId = "", this.withScarf = !1, this.result = null, this.error = "", this._ensureDefaults(), this.liveCalc && this._scheduleCalc();
  }
  _formatDelta(value) {
    return value ? value > 0 ? `+${value}` : String(value) : "0";
  }
  render() {
    var _a, _b, _c;
    if (!this.ranges.length)
      return html`<div class="fs-empty" role="status">
        ${t("لا توجد بيانات مقاسات متاحة", "No size data available")}
      </div>`;
    const theme = this.theme, animateClass = theme.animate ? "fs-animate" : "", title = localizedString((_a = this.config) == null ? void 0 : _a.alc_title), desc = localizedString((_b = this.config) == null ? void 0 : _b.alc_desc), disclaimer = localizedString((_c = this.config) == null ? void 0 : _c.alc_disclaimer), calcBtn = this._label("alc_calc_btn", "احسبي الطول", "Calculate"), resetBtn = this._label("alc_reset_btn", "إعادة الحساب", "Recalculate"), shopBtn = this._label("alc_shop_btn", "تسوّقي هذا المقاس", "Shop this size"), heightLabel = this._label("alc_height_label", "طولك (سم)", "Your height (cm)"), bounds = overallBounds(this.ranges, this.minHeight, this.maxHeight), inputMin = bounds.min, inputMax = bounds.max, heightNum = Number(this.heightInput), markerPct = Number.isFinite(heightNum) ? heightToPercent(heightNum, bounds.min, bounds.max) : 0, sliderValue = Number.isFinite(heightNum) ? String(Math.min(inputMax, Math.max(inputMin, heightNum))) : String(inputMin);
    return html`
      <section
        class="fs-section ${animateClass}"
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("حاسبة طول العباية", "Abaya length calculator")}
      >
        <div class="fs-container">
          ${title || desc ? html`<header class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </header>` : nothing}

          <div class="alc-layout">
            <div class="alc-form fs-card">
              <div class="alc-field">
                <label for="alc-height">${heightLabel}</label>
                <div class="alc-height-row">
                  <input
                    id="alc-height"
                    class="alc-input"
                    type="number"
                    inputmode="decimal"
                    min=${inputMin}
                    max=${inputMax}
                    step="1"
                    .value=${this.heightInput}
                    @input=${this._onHeightInput}
                    aria-describedby=${this.error ? "alc-error" : "alc-guide-text"}
                  />
                  <span class="alc-height-unit">${t("سم", "cm")}</span>
                </div>

                ${this.showSlider ? html`<input
                      class="alc-slider"
                      type="range"
                      min=${inputMin}
                      max=${inputMax}
                      step="1"
                      .value=${sliderValue}
                      @input=${this._onSliderInput}
                      aria-label=${heightLabel}
                    />` : nothing}
              </div>

              ${this.showGuide ? html`<div class="alc-guide" id="alc-guide-text">
                    <div
                      class="alc-guide__track"
                      role="img"
                      aria-label=${t("دليل نطاقات المقاسات", "Size range guide")}
                    >
                      ${this.ranges.map((range, index) => {
      const seg = rangeSegmentStyle(range, bounds.min, bounds.max), active = Number.isFinite(heightNum) && heightNum >= range.min_height && heightNum <= range.max_height;
      return html`<div
                          class="alc-guide__segment ${active ? "alc-guide__segment--active" : ""}"
                          style=${styleMap({
        insetInlineStart: `${seg.start}%`,
        width: `${seg.width}%`,
        background: SEGMENT_COLORS[index % SEGMENT_COLORS.length]
      })}
                          title=${`${range.alt_size || range.range_label || ""} (${range.min_height}–${range.max_height} ${t("سم", "cm")})`.trim()}
                        ></div>`;
    })}
                      ${Number.isFinite(heightNum) && heightNum >= bounds.min && heightNum <= bounds.max ? html`<span
                            class="alc-guide__marker"
                            style=${styleMap({ insetInlineStart: `${markerPct}%` })}
                          ></span>` : nothing}
                    </div>
                    <div class="alc-guide__labels">
                      <span>${bounds.min} ${t("سم", "cm")}</span>
                      <span>${bounds.max} ${t("سم", "cm")}</span>
                    </div>
                    <div class="alc-guide__chips" role="group" aria-label=${t("المقاسات", "Sizes")}>
                      ${this.ranges.map((range, index) => {
      const active = Number.isFinite(heightNum) && heightNum >= range.min_height && heightNum <= range.max_height, label = range.alt_size || range.range_label || `${range.min_height}-${range.max_height}`;
      return html`<button
                          type="button"
                          class="alc-chip ${active ? "alc-chip--active" : ""}"
                          style=${styleMap({
        color: SEGMENT_COLORS[index % SEGMENT_COLORS.length]
      })}
                          aria-pressed=${active ? "true" : "false"}
                          title=${`${range.min_height}–${range.max_height} ${t("سم", "cm")}`}
                          @click=${() => this._jumpToRange(range.min_height, range.max_height)}
                        >
                          <span class="alc-chip__swatch" aria-hidden="true"></span>
                          <span class="alc-chip__text">
                            <span class="alc-chip__name">${label}</span>
                            <span class="alc-chip__range"
                              >${range.min_height}–${range.max_height}</span
                            >
                          </span>
                        </button>`;
    })}
                    </div>
                  </div>` : nothing}

              <fieldset class="alc-field" style="border:none;margin:0;padding:0;">
                <legend>${this._label("alc_shoe_label", "نوع الحذاء", "Shoe type")}</legend>
                <div class="alc-options" role="group">
                  ${this._renderOption(
      "flat",
      this._label("alc_shoe_flat", "مسطح", "Flat"),
      this.shoeType,
      () => this._setShoe("flat")
    )}
                  ${this._renderOption(
      "mid",
      this._label("alc_shoe_mid", "كعب متوسط", "Mid heel"),
      this.shoeType,
      () => this._setShoe("mid")
    )}
                  ${this._renderOption(
      "high",
      this._label("alc_shoe_high", "كعب عالي", "High heel"),
      this.shoeType,
      () => this._setShoe("high")
    )}
                </div>
              </fieldset>

              <fieldset class="alc-field" style="border:none;margin:0;padding:0;">
                <legend>${this._label("alc_pref_label", "التفضيل", "Preference")}</legend>
                <div class="alc-options" role="group">
                  ${this._renderOption(
      "shorter",
      this._label("alc_pref_shorter", "أقصر قليلًا", "Slightly shorter"),
      this.preference,
      () => this._setPreference("shorter")
    )}
                  ${this._renderOption(
      "exact",
      this._label("alc_pref_exact", "طول مضبوط", "Exact length"),
      this.preference,
      () => this._setPreference("exact")
    )}
                  ${this._renderOption(
      "longer",
      this._label("alc_pref_longer", "أطول قليلًا", "Slightly longer"),
      this.preference,
      () => this._setPreference("longer")
    )}
                </div>
              </fieldset>

              ${this.showCut ? html`<fieldset class="alc-field" style="border:none;margin:0;padding:0;">
                    <legend>${this._label("alc_cut_label", "قصة العباية", "Abaya silhouette")}</legend>
                    <div class="alc-options" role="group">
                      ${this.cuts.map(
      (cut) => html`
                          <button
                            type="button"
                            class="alc-option"
                            aria-pressed=${this.cutId === cut.cut_id ? "true" : "false"}
                            @click=${() => this._setCut(cut.cut_id)}
                          >
                            ${cut.cut_name}
                            ${cut.cut_desc ? html`<small>${cut.cut_desc}</small>` : cut.length_delta ? html`<small>${this._formatDelta(cut.length_delta)} ${t("سم", "cm")}</small>` : nothing}
                          </button>
                        `
    )}
                    </div>
                  </fieldset>` : nothing}

              ${this.showScarf ? html`<fieldset class="alc-field" style="border:none;margin:0;padding:0;">
                    <legend>${this._label("alc_scarf_label", "هل ستلبسين طرحة؟", "Will you wear a scarf?")}</legend>
                    <div class="alc-options" role="group">
                      ${this._renderOption(
      "no",
      this._label("alc_scarf_no", "بدون طرحة", "Without scarf"),
      this.withScarf ? "yes" : "no",
      () => this._setScarf(!1)
    )}
                      ${this._renderOption(
      "yes",
      this._label("alc_scarf_yes", "مع طرحة", "With scarf"),
      this.withScarf ? "yes" : "no",
      () => this._setScarf(!0)
    )}
                    </div>
                  </fieldset>` : nothing}

              ${this.error ? html`<p id="alc-error" class="alc-error" role="alert">${this.error}</p>` : nothing}

              <div class="alc-actions">
                ${this.liveCalc ? nothing : html`<button type="button" class="fs-btn" @click=${() => this._calculate(!1)}>
                      ${calcBtn}
                    </button>`}
                <button type="button" class="fs-btn fs-btn--ghost" @click=${this._reset}>
                  ${resetBtn}
                </button>
              </div>

              ${this.liveCalc ? html`<p class="alc-live-hint">
                    ${this._label(
      "alc_live_hint",
      "النتيجة تتحدث تلقائيًا مع كل اختيار",
      "The result updates automatically with every choice"
    )}
                  </p>` : nothing}
            </div>

            ${this.result ? this._renderResult(shopBtn, animateClass) : nothing}
          </div>

          ${disclaimer ? html`<p class="alc-disclaimer">${disclaimer}</p>` : nothing}
        </div>
        ${renderCommerceOutcome(this.config || {}, "alc_")}
      </section>
    `;
  }
  _renderResult(shopBtn, animateClass) {
    const result = this.result, confidenceLabel = this._label(
      "alc_confidence_label",
      "مدى ملاءمة النطاق",
      "Range fit confidence"
    );
    return html`
      <div class="alc-result fs-card ${animateClass}" aria-live="polite">
        <div class="alc-result__top">
          ${result.range.alt_size ? html`<span class="alc-badge">${result.range.alt_size}</span>` : nothing}
          ${result.range.range_label ? html`<span class="alc-badge">${result.range.range_label}</span>` : nothing}
        </div>

        <p class="alc-result__length">
          ${result.suggestedLength}
          <span class="alc-result__unit">${t("سم", "cm")}</span>
        </p>

        <div class="alc-confidence">
          <div class="alc-confidence__label">
            <span>${confidenceLabel}</span>
            <strong>${result.confidence}%</strong>
          </div>
          <div
            class="alc-confidence__bar"
            role="meter"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow=${result.confidence}
            aria-label=${confidenceLabel}
          >
            <span style=${styleMap({ width: `${result.confidence}%` })}></span>
          </div>
        </div>

        ${result.reason ? html`<p class="alc-result__reason">${result.reason}</p>` : nothing}

        <div class="alc-breakdown" aria-label=${t("تفاصيل الحساب", "Calculation details")}>
          <div class="alc-breakdown__row">
            <span>${this._label("alc_base_label", "الطول الأساسي", "Base length")}</span>
            <strong>${result.baseLength} ${t("سم", "cm")}</strong>
          </div>
          <div class="alc-breakdown__row">
            <span>${this._label("alc_pref_label", "التفضيل", "Preference")}</span>
            <strong>${this._formatDelta(result.preferenceDelta)} ${t("سم", "cm")}</strong>
          </div>
          ${this.showCut ? html`<div class="alc-breakdown__row">
                <span>${this._label("alc_cut_label", "القصة", "Silhouette")}</span>
                <strong>${this._formatDelta(result.cutDelta)} ${t("سم", "cm")}</strong>
              </div>` : nothing}
          ${this.showScarf ? html`<div class="alc-breakdown__row">
                <span>${this._label("alc_scarf_label", "الطرحة", "Scarf")}</span>
                <strong>${this._formatDelta(result.scarfDelta)} ${t("سم", "cm")}</strong>
              </div>` : nothing}
        </div>

        ${result.range.note ? html`<p class="alc-result__note">${result.range.note}</p>` : nothing}

        ${isValidHref(result.range.products_url) ? html`<div class="alc-actions">
              <a
                class="fs-btn"
                href=${result.range.products_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                ${shopBtn}
              </a>
            </div>` : nothing}

        ${result.nearby.length ? html`<div class="alc-nearby">
              <p class="alc-nearby__title">
                ${this._label(
      "alc_nearby_title",
      "اقتراحات قريبة أيضًا",
      "Nearby suggestions"
    )}
              </p>
              <div class="alc-nearby__list">
                ${result.nearby.map((item) => {
      const content = html`
                    <span>
                      ${item.relation === "lower" ? this._label("alc_nearby_lower", "أقصر قليلًا", "Slightly smaller") : this._label("alc_nearby_higher", "أطول قليلًا", "Slightly larger")}
                    </span>
                    <strong>
                      ${item.alt_size || `${item.suggestedLength} ${t("سم", "cm")}`}
                    </strong>
                    <span>${item.suggestedLength} ${t("سم", "cm")}</span>
                  `;
      return isValidHref(item.products_url) ? html`<a
                        class="alc-nearby__card"
                        href=${item.products_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        ${content}
                      </a>` : html`<div class="alc-nearby__card">${content}</div>`;
    })}
              </div>
            </div>` : nothing}
      </div>
    `;
  }
  _renderOption(value, label, current, onSelect) {
    return html`
      <button
        type="button"
        class="alc-option"
        aria-pressed=${current === value ? "true" : "false"}
        @click=${onSelect}
      >
        ${label}
      </button>
    `;
  }
};
__name(_AbayaLengthCalculator, "AbayaLengthCalculator"), _AbayaLengthCalculator.styles = [
  sharedSectionCss,
  componentStyles,
  css`
      :host {
        direction: inherit;
      }
    `
];
let AbayaLengthCalculator = _AbayaLengthCalculator;
__decorateClass([
  property({ type: Object })
], AbayaLengthCalculator.prototype, "config");
__decorateClass([
  state()
], AbayaLengthCalculator.prototype, "heightInput");
__decorateClass([
  state()
], AbayaLengthCalculator.prototype, "shoeType");
__decorateClass([
  state()
], AbayaLengthCalculator.prototype, "preference");
__decorateClass([
  state()
], AbayaLengthCalculator.prototype, "cutId");
__decorateClass([
  state()
], AbayaLengthCalculator.prototype, "withScarf");
__decorateClass([
  state()
], AbayaLengthCalculator.prototype, "result");
__decorateClass([
  state()
], AbayaLengthCalculator.prototype, "error");
__decorateClass([
  state()
], AbayaLengthCalculator.prototype, "initialized");
typeof AbayaLengthCalculator < "u" && AbayaLengthCalculator.registerSallaComponent("salla-abaya-length-calculator");
export {
  AbayaLengthCalculator as default
};
