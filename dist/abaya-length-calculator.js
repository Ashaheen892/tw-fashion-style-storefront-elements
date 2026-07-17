import { css as R, LitElement as B, html as l, nothing as c } from "lit";
import { property as E, state as $ } from "lit/decorators.js";
import { styleMap as z } from "lit/directives/style-map.js";
import { n as N, l as _, b as V, u as p, i as x, v as y, s as Y, r as W, t as o, a as G, w as P } from "./sharedStyles-BGb_aVO_.js";
const U = R`
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
    accent-color: var(--accent-color, #8b5e4b);
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
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 4%, var(--card-bg, #fff));
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
    background: var(--accent-color, #8b5e4b);
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
    border-color: var(--accent-color, #8b5e4b);
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 12%, var(--card-bg, #fff));
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
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 14%, transparent);
    color: var(--accent-color, #8b5e4b);
    font-weight: 700;
    font-size: 0.88rem;
  }

  .alc-result__length {
    margin: 0;
    text-align: center;
    font-size: clamp(2.4rem, 6vw, 3.4rem);
    font-weight: 700;
    color: var(--accent-color, #8b5e4b);
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
    background: var(--accent-color, #8b5e4b);
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
    color: var(--accent-color, #8b5e4b);
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
function q(i) {
  return N(i).map((e) => ({
    min_height: p(e.min_height),
    max_height: p(e.max_height),
    flat_length: p(e.flat_length),
    mid_heel_length: p(e.mid_heel_length),
    high_heel_length: p(e.high_heel_length),
    alt_size: _(e.alt_size),
    note: _(e.note),
    products_url: V(e.products_url),
    range_label: _(e.range_label)
  })).filter(
    (e) => e.min_height > 0 && e.max_height >= e.min_height && (e.flat_length > 0 || e.mid_heel_length > 0 || e.high_heel_length > 0)
  ).sort((e, a) => e.min_height - a.min_height);
}
function A(i) {
  return N(i).map((e, a) => ({
    cut_id: _(e.cut_id) || _(e.cut_name) || `cut-${a}`,
    cut_name: _(e.cut_name),
    cut_desc: _(e.cut_desc),
    length_delta: p(e.length_delta, 0),
    is_default: x(e.is_default)
  })).filter((e) => e.cut_name.trim() !== "");
}
function J(i, e) {
  return i.find((a) => e >= a.min_height && e <= a.max_height) ?? null;
}
function j(i, e) {
  return e === "mid" ? i.mid_heel_length || i.flat_length : e === "high" && (i.high_heel_length || i.mid_heel_length) || i.flat_length;
}
function K(i, e) {
  const a = e.max_height - e.min_height;
  if (a <= 0) return 100;
  const t = (e.min_height + e.max_height) / 2, r = Math.abs(i - t), n = y(r / (a / 2), 0, 1);
  return Math.round((1 - n) * 100);
}
function Q(i, e, a, t, r, n, g, w) {
  const m = i.findIndex(
    (f) => f.min_height === e.min_height && f.max_height === e.max_height
  );
  if (m < 0) return [];
  const b = [], h = (f, S) => {
    const d = j(f, a);
    let C = 0;
    t === "shorter" && (C = -r), t === "longer" && (C = n), b.push({
      alt_size: f.alt_size,
      suggestedLength: y(d + C + g + w, 0, 999),
      note: f.note,
      products_url: f.products_url,
      relation: S
    });
  };
  return m > 0 && h(i[m - 1], "lower"), m < i.length - 1 && h(i[m + 1], "higher"), b;
}
function X(i) {
  const e = J(i.ranges, i.height);
  if (!e) return null;
  const a = j(e, i.shoe);
  let t = 0;
  i.preference === "shorter" && (t = -i.shorterOffset), i.preference === "longer" && (t = i.longerOffset);
  const r = y(
    a + t + i.cutDelta + i.scarfDelta,
    0,
    999
  );
  return {
    range: e,
    baseLength: a,
    suggestedLength: r,
    cutDelta: i.cutDelta,
    scarfDelta: i.scarfDelta,
    preferenceDelta: t,
    confidence: K(i.height, e),
    reason: i.reasonParts.filter(Boolean).join(" · "),
    nearby: Q(
      i.ranges,
      e,
      i.shoe,
      i.preference,
      i.shorterOffset,
      i.longerOffset,
      i.cutDelta,
      i.scarfDelta
    )
  };
}
function Z(i, e, a) {
  return i.length ? {
    min: Math.min(...i.map((t) => t.min_height)),
    max: Math.max(...i.map((t) => t.max_height))
  } : { min: e, max: a };
}
function ee(i, e, a) {
  return a <= e ? 0 : y((i - e) / (a - e) * 100, 0, 100);
}
function te(i, e, a) {
  const t = Math.max(a - e, 1), r = (i.min_height - e) / t * 100, n = (i.max_height + 1 - e) / t * 100, g = Math.max(n - r, 0.5);
  return {
    start: y(r, 0, 100),
    width: y(g, 0.5, 100 - y(r, 0, 100))
  };
}
var ie = Object.defineProperty, v = (i, e, a, t) => {
  for (var r = void 0, n = i.length - 1, g; n >= 0; n--)
    (g = i[n]) && (r = g(e, a, r) || r);
  return r && ie(e, a, r), r;
};
const T = ["#8b5e4b", "#a6775f", "#6b4a3d", "#c4a18a", "#5a3d32"], L = class L extends B {
  constructor() {
    super(...arguments), this.config = {}, this.heightInput = "", this.shoeType = "flat", this.preference = "exact", this.cutId = "", this.withScarf = !1, this.result = null, this.error = "", this.initialized = !1, this._onLangChange = () => this.requestUpdate(), this._liveTimer = null;
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("language-changed", this._onLangChange), this._ensureDefaults(), this._syncVisibility(), this.liveCalc && this._scheduleCalc();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("language-changed", this._onLangChange), this._liveTimer && clearTimeout(this._liveTimer);
  }
  updated(e) {
    e.has("config") && (this.initialized = !1, this._ensureDefaults(), this.liveCalc && this._scheduleCalc()), this._syncVisibility();
  }
  get ranges() {
    var e;
    return q((e = this.config) == null ? void 0 : e.alc_ranges);
  }
  get cuts() {
    var e;
    return A((e = this.config) == null ? void 0 : e.alc_cuts);
  }
  get theme() {
    return W(this.config, "alc_");
  }
  get minHeight() {
    var e;
    return p((e = this.config) == null ? void 0 : e.alc_min_height, 150);
  }
  get maxHeight() {
    var e;
    return p((e = this.config) == null ? void 0 : e.alc_max_height, 200);
  }
  get shorterOffset() {
    var e;
    return p((e = this.config) == null ? void 0 : e.alc_shorter_offset, 2);
  }
  get longerOffset() {
    var e;
    return p((e = this.config) == null ? void 0 : e.alc_longer_offset, 2);
  }
  get scarfDelta() {
    var e;
    return this.withScarf ? p((e = this.config) == null ? void 0 : e.alc_scarf_delta, 1) : 0;
  }
  get liveCalc() {
    var e;
    return x((e = this.config) == null ? void 0 : e.alc_live_calc, !0);
  }
  get showSlider() {
    var e;
    return x((e = this.config) == null ? void 0 : e.alc_show_slider, !0);
  }
  get showGuide() {
    var e;
    return x((e = this.config) == null ? void 0 : e.alc_show_guide, !0);
  }
  get showCut() {
    var e;
    return x((e = this.config) == null ? void 0 : e.alc_show_cut, !0) && this.cuts.length > 0;
  }
  get showScarf() {
    var e;
    return x((e = this.config) == null ? void 0 : e.alc_show_scarf, !0);
  }
  get selectedCut() {
    return this.cuts.find((e) => e.cut_id === this.cutId) || this.cuts[0] || null;
  }
  _syncVisibility() {
    this.style.display = this.ranges.length ? "" : "none";
  }
  _ensureDefaults() {
    var n, g, w, m;
    if (this.initialized) return;
    const e = Math.round((this.minHeight + this.maxHeight) / 2) || 165, a = p((n = this.config) == null ? void 0 : n.alc_default_height, e);
    if (!this.heightInput.trim()) {
      const b = Math.min(
        this.maxHeight,
        Math.max(this.minHeight, a > 0 ? a : e)
      );
      this.heightInput = String(b);
    }
    if (this.cuts.length) {
      const b = this.cuts.find((h) => h.is_default) || this.cuts[0];
      this.cutId = b.cut_id;
    }
    const t = _((g = this.config) == null ? void 0 : g.alc_default_shoe, "flat");
    (t === "mid" || t === "high" || t === "flat") && (this.shoeType = t);
    const r = _((w = this.config) == null ? void 0 : w.alc_default_preference, "exact");
    (r === "shorter" || r === "exact" || r === "longer") && (this.preference = r), this.withScarf = x((m = this.config) == null ? void 0 : m.alc_scarf_default, !1), this.initialized = !0;
  }
  _label(e, a, t) {
    var r;
    return _((r = this.config) == null ? void 0 : r[e], "") || o(a, t);
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
  _jumpToRange(e, a) {
    const t = Math.round((e + a) / 2);
    this.heightInput = String(t), this.error = "", this.liveCalc && this._scheduleCalc();
  }
  _setShoe(e) {
    this.shoeType = e, this.liveCalc && this._scheduleCalc();
  }
  _setPreference(e) {
    this.preference = e, this.liveCalc && this._scheduleCalc();
  }
  _setCut(e) {
    this.cutId = e, this.liveCalc && this._scheduleCalc();
  }
  _setScarf(e) {
    this.withScarf = e, this.liveCalc && this._scheduleCalc();
  }
  _buildReasonParts(e) {
    const a = this.shoeType === "flat" ? this._label("alc_shoe_flat", "مسطح", "Flat") : this.shoeType === "mid" ? this._label("alc_shoe_mid", "كعب متوسط", "Mid heel") : this._label("alc_shoe_high", "كعب عالي", "High heel"), t = this.preference === "shorter" ? this._label("alc_pref_shorter", "أقصر قليلًا", "Slightly shorter") : this.preference === "longer" ? this._label("alc_pref_longer", "أطول قليلًا", "Slightly longer") : this._label("alc_pref_exact", "طول مضبوط", "Exact length"), r = [
      `${this._label("alc_shoe_label", "الحذاء", "Shoe")}: ${a}`,
      `${this._label("alc_pref_label", "التفضيل", "Preference")}: ${t}`
    ];
    return e && r.push(
      `${this._label("alc_cut_label", "القصة", "Silhouette")}: ${e.cut_name}`
    ), this.showScarf && this.withScarf && r.push(this._label("alc_scarf_yes", "مع طرحة", "With scarf")), r;
  }
  _calculate(e = !1) {
    const a = Number(this.heightInput);
    if (!this.heightInput.trim()) {
      this.result = null, this.error = e ? "" : o("يرجى إدخال طولك بالسنتيمتر", "Please enter your height in centimeters");
      return;
    }
    if (!Number.isFinite(a) || a <= 0) {
      this.result = null, this.error = o(
        "يرجى إدخال طول صحيح بالسنتيمتر",
        "Please enter a valid height in centimeters"
      );
      return;
    }
    if (a < this.minHeight || a > this.maxHeight) {
      this.result = null, this.error = o(
        `الطول يجب أن يكون بين ${this.minHeight} و ${this.maxHeight} سم`,
        `Height must be between ${this.minHeight} and ${this.maxHeight} cm`
      );
      return;
    }
    const t = this.selectedCut, r = X({
      ranges: this.ranges,
      height: a,
      shoe: this.shoeType,
      preference: this.preference,
      shorterOffset: this.shorterOffset,
      longerOffset: this.longerOffset,
      cutDelta: (t == null ? void 0 : t.length_delta) || 0,
      scarfDelta: this.scarfDelta,
      reasonParts: this._buildReasonParts(t)
    });
    if (!r) {
      this.result = null, this.error = this._label(
        "alc_no_match",
        "لا يوجد مقاس مناسب لطولك — تواصلي معنا للمساعدة",
        "No matching size for your height — contact us for help"
      );
      return;
    }
    this.error = "", this.result = r;
  }
  _reset() {
    this.initialized = !1, this.heightInput = "", this.shoeType = "flat", this.preference = "exact", this.cutId = "", this.withScarf = !1, this.result = null, this.error = "", this._ensureDefaults(), this.liveCalc && this._scheduleCalc();
  }
  _formatDelta(e) {
    return e ? e > 0 ? `+${e}` : String(e) : "0";
  }
  render() {
    var O, H, M;
    if (!this.ranges.length)
      return l`<div class="fs-empty" role="status">
        ${o("لا توجد بيانات مقاسات متاحة", "No size data available")}
      </div>`;
    const e = this.theme, a = e.animate ? "fs-animate" : "", t = _((O = this.config) == null ? void 0 : O.alc_title), r = _((H = this.config) == null ? void 0 : H.alc_desc), n = _((M = this.config) == null ? void 0 : M.alc_disclaimer), g = this._label("alc_calc_btn", "احسبي الطول", "Calculate"), w = this._label("alc_reset_btn", "إعادة الحساب", "Recalculate"), m = this._label("alc_shop_btn", "تسوّقي هذا المقاس", "Shop this size"), b = this._label("alc_height_label", "طولك (سم)", "Your height (cm)"), h = Z(this.ranges, this.minHeight, this.maxHeight), f = h.min, S = h.max, d = Number(this.heightInput), C = Number.isFinite(d) ? ee(d, h.min, h.max) : 0, F = Number.isFinite(d) ? String(Math.min(S, Math.max(f, d))) : String(f);
    return l`
      <section
        class="fs-section ${a}"
        style=${z(G(e))}
        aria-label=${t || o("حاسبة طول العباية", "Abaya length calculator")}
      >
        <div class="fs-container">
          ${t || r ? l`<header class="fs-header">
                ${t ? l`<h2 class="fs-title">${t}</h2>` : c}
                ${r ? l`<p class="fs-desc">${r}</p>` : c}
              </header>` : c}

          <div class="alc-layout">
            <div class="alc-form fs-card">
              <div class="alc-field">
                <label for="alc-height">${b}</label>
                <div class="alc-height-row">
                  <input
                    id="alc-height"
                    class="alc-input"
                    type="number"
                    inputmode="decimal"
                    min=${f}
                    max=${S}
                    step="1"
                    .value=${this.heightInput}
                    @input=${this._onHeightInput}
                    aria-describedby=${this.error ? "alc-error" : "alc-guide-text"}
                  />
                  <span class="alc-height-unit">${o("سم", "cm")}</span>
                </div>

                ${this.showSlider ? l`<input
                      class="alc-slider"
                      type="range"
                      min=${f}
                      max=${S}
                      step="1"
                      .value=${F}
                      @input=${this._onSliderInput}
                      aria-label=${b}
                    />` : c}
              </div>

              ${this.showGuide ? l`<div class="alc-guide" id="alc-guide-text">
                    <div
                      class="alc-guide__track"
                      role="img"
                      aria-label=${o("دليل نطاقات المقاسات", "Size range guide")}
                    >
                      ${this.ranges.map((s, D) => {
      const k = te(s, h.min, h.max), I = Number.isFinite(d) && d >= s.min_height && d <= s.max_height;
      return l`<div
                          class="alc-guide__segment ${I ? "alc-guide__segment--active" : ""}"
                          style=${z({
        insetInlineStart: `${k.start}%`,
        width: `${k.width}%`,
        background: T[D % T.length]
      })}
                          title=${`${s.alt_size || s.range_label || ""} (${s.min_height}–${s.max_height} ${o("سم", "cm")})`.trim()}
                        ></div>`;
    })}
                      ${Number.isFinite(d) && d >= h.min && d <= h.max ? l`<span
                            class="alc-guide__marker"
                            style=${z({ insetInlineStart: `${C}%` })}
                          ></span>` : c}
                    </div>
                    <div class="alc-guide__labels">
                      <span>${h.min} ${o("سم", "cm")}</span>
                      <span>${h.max} ${o("سم", "cm")}</span>
                    </div>
                    <div class="alc-guide__chips" role="group" aria-label=${o("المقاسات", "Sizes")}>
                      ${this.ranges.map((s, D) => {
      const k = Number.isFinite(d) && d >= s.min_height && d <= s.max_height, I = s.alt_size || s.range_label || `${s.min_height}-${s.max_height}`;
      return l`<button
                          type="button"
                          class="alc-chip ${k ? "alc-chip--active" : ""}"
                          style=${z({
        color: T[D % T.length]
      })}
                          aria-pressed=${k ? "true" : "false"}
                          title=${`${s.min_height}–${s.max_height} ${o("سم", "cm")}`}
                          @click=${() => this._jumpToRange(s.min_height, s.max_height)}
                        >
                          <span class="alc-chip__swatch" aria-hidden="true"></span>
                          <span class="alc-chip__text">
                            <span class="alc-chip__name">${I}</span>
                            <span class="alc-chip__range"
                              >${s.min_height}–${s.max_height}</span
                            >
                          </span>
                        </button>`;
    })}
                    </div>
                  </div>` : c}

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

              ${this.showCut ? l`<fieldset class="alc-field" style="border:none;margin:0;padding:0;">
                    <legend>${this._label("alc_cut_label", "قصة العباية", "Abaya silhouette")}</legend>
                    <div class="alc-options" role="group">
                      ${this.cuts.map(
      (s) => l`
                          <button
                            type="button"
                            class="alc-option"
                            aria-pressed=${this.cutId === s.cut_id ? "true" : "false"}
                            @click=${() => this._setCut(s.cut_id)}
                          >
                            ${s.cut_name}
                            ${s.cut_desc ? l`<small>${s.cut_desc}</small>` : s.length_delta ? l`<small>${this._formatDelta(s.length_delta)} ${o("سم", "cm")}</small>` : c}
                          </button>
                        `
    )}
                    </div>
                  </fieldset>` : c}

              ${this.showScarf ? l`<fieldset class="alc-field" style="border:none;margin:0;padding:0;">
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
                  </fieldset>` : c}

              ${this.error ? l`<p id="alc-error" class="alc-error" role="alert">${this.error}</p>` : c}

              <div class="alc-actions">
                ${this.liveCalc ? c : l`<button type="button" class="fs-btn" @click=${() => this._calculate(!1)}>
                      ${g}
                    </button>`}
                <button type="button" class="fs-btn fs-btn--ghost" @click=${this._reset}>
                  ${w}
                </button>
              </div>

              ${this.liveCalc ? l`<p class="alc-live-hint">
                    ${this._label(
      "alc_live_hint",
      "النتيجة تتحدث تلقائيًا مع كل اختيار",
      "The result updates automatically with every choice"
    )}
                  </p>` : c}
            </div>

            ${this.result ? this._renderResult(m, a) : c}
          </div>

          ${n ? l`<p class="alc-disclaimer">${n}</p>` : c}
        </div>
      </section>
    `;
  }
  _renderResult(e, a) {
    const t = this.result, r = this._label(
      "alc_confidence_label",
      "مدى ملاءمة النطاق",
      "Range fit confidence"
    );
    return l`
      <div class="alc-result fs-card ${a}" aria-live="polite">
        <div class="alc-result__top">
          ${t.range.alt_size ? l`<span class="alc-badge">${t.range.alt_size}</span>` : c}
          ${t.range.range_label ? l`<span class="alc-badge">${t.range.range_label}</span>` : c}
        </div>

        <p class="alc-result__length">
          ${t.suggestedLength}
          <span class="alc-result__unit">${o("سم", "cm")}</span>
        </p>

        <div class="alc-confidence">
          <div class="alc-confidence__label">
            <span>${r}</span>
            <strong>${t.confidence}%</strong>
          </div>
          <div
            class="alc-confidence__bar"
            role="meter"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow=${t.confidence}
            aria-label=${r}
          >
            <span style=${z({ width: `${t.confidence}%` })}></span>
          </div>
        </div>

        ${t.reason ? l`<p class="alc-result__reason">${t.reason}</p>` : c}

        <div class="alc-breakdown" aria-label=${o("تفاصيل الحساب", "Calculation details")}>
          <div class="alc-breakdown__row">
            <span>${this._label("alc_base_label", "الطول الأساسي", "Base length")}</span>
            <strong>${t.baseLength} ${o("سم", "cm")}</strong>
          </div>
          <div class="alc-breakdown__row">
            <span>${this._label("alc_pref_label", "التفضيل", "Preference")}</span>
            <strong>${this._formatDelta(t.preferenceDelta)} ${o("سم", "cm")}</strong>
          </div>
          ${this.showCut ? l`<div class="alc-breakdown__row">
                <span>${this._label("alc_cut_label", "القصة", "Silhouette")}</span>
                <strong>${this._formatDelta(t.cutDelta)} ${o("سم", "cm")}</strong>
              </div>` : c}
          ${this.showScarf ? l`<div class="alc-breakdown__row">
                <span>${this._label("alc_scarf_label", "الطرحة", "Scarf")}</span>
                <strong>${this._formatDelta(t.scarfDelta)} ${o("سم", "cm")}</strong>
              </div>` : c}
        </div>

        ${t.range.note ? l`<p class="alc-result__note">${t.range.note}</p>` : c}

        ${P(t.range.products_url) ? l`<div class="alc-actions">
              <a
                class="fs-btn"
                href=${t.range.products_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                ${e}
              </a>
            </div>` : c}

        ${t.nearby.length ? l`<div class="alc-nearby">
              <p class="alc-nearby__title">
                ${this._label(
      "alc_nearby_title",
      "اقتراحات قريبة أيضًا",
      "Nearby suggestions"
    )}
              </p>
              <div class="alc-nearby__list">
                ${t.nearby.map((n) => {
      const g = l`
                    <span>
                      ${n.relation === "lower" ? this._label("alc_nearby_lower", "أقصر قليلًا", "Slightly smaller") : this._label("alc_nearby_higher", "أطول قليلًا", "Slightly larger")}
                    </span>
                    <strong>
                      ${n.alt_size || `${n.suggestedLength} ${o("سم", "cm")}`}
                    </strong>
                    <span>${n.suggestedLength} ${o("سم", "cm")}</span>
                  `;
      return P(n.products_url) ? l`<a
                        class="alc-nearby__card"
                        href=${n.products_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        ${g}
                      </a>` : l`<div class="alc-nearby__card">${g}</div>`;
    })}
              </div>
            </div>` : c}
      </div>
    `;
  }
  _renderOption(e, a, t, r) {
    return l`
      <button
        type="button"
        class="alc-option"
        aria-pressed=${t === e ? "true" : "false"}
        @click=${r}
      >
        ${a}
      </button>
    `;
  }
};
L.styles = [
  Y,
  U,
  R`
      :host {
        direction: inherit;
      }
    `
];
let u = L;
v([
  E({ type: Object })
], u.prototype, "config");
v([
  $()
], u.prototype, "heightInput");
v([
  $()
], u.prototype, "shoeType");
v([
  $()
], u.prototype, "preference");
v([
  $()
], u.prototype, "cutId");
v([
  $()
], u.prototype, "withScarf");
v([
  $()
], u.prototype, "result");
v([
  $()
], u.prototype, "error");
v([
  $()
], u.prototype, "initialized");
typeof u < "u" && u.registerSallaComponent("salla-abaya-length-calculator");
export {
  u as default
};
