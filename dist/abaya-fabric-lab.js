import { css as M, LitElement as E, html as i, nothing as n } from "lit";
import { property as F, state as u } from "lit/decorators.js";
import { classMap as v } from "lit/directives/class-map.js";
import { styleMap as w } from "lit/directives/style-map.js";
import { n as S, v as d, u as m, l as p, e as O, x as V, s as G, r as A, i as j, t as s, p as L, a as R } from "./sharedStyles-C1vUkqEN.js";
const T = M`
  .fs-header {
    margin-bottom: 2rem;
  }

  .fs-title {
    font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
    font-size: clamp(2rem, 3.6vw, 2.75rem);
    font-weight: 600;
    letter-spacing: 0.01em;
  }

  .fs-desc {
    max-width: 36rem;
    margin-inline: auto;
    font-size: 0.98rem;
    line-height: 1.8;
    color: var(--muted-color, #7a6a62);
  }

  .afl-studio {
    display: grid;
    gap: 1.35rem;
    padding: 1.35rem 1.15rem 1.5rem;
    border-radius: 2px;
    border: 1px solid color-mix(in srgb, #c9a86c 34%, var(--border-color, #e8ddd6));
    background:
      linear-gradient(180deg, #fffdf9 0%, #fff 48%),
      radial-gradient(
        circle at 12% 0%,
        color-mix(in srgb, var(--accent-color, #8b5e4b) 11%, transparent),
        transparent 42%
      );
    box-shadow:
      0 1px 0 rgba(201, 168, 108, 0.22),
      0 24px 52px rgba(43, 33, 28, 0.08);
    font-family: Manrope, 'Avenir Next', 'Segoe UI', sans-serif;
  }

  .afl-toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 0.95rem 1rem;
    border-radius: 2px;
    border: 1px solid color-mix(in srgb, #c9a86c 26%, var(--border-color, #e8ddd6));
    background: linear-gradient(
      120deg,
      color-mix(in srgb, var(--accent-color, #8b5e4b) 8%, #fff),
      #fff
    );
  }

  .afl-toolbar__kicker {
    display: block;
    margin-bottom: 0.2rem;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: color-mix(in srgb, #c9a86c 70%, var(--accent-color, #8b5e4b));
  }

  .afl-toolbar__hint {
    margin: 0;
    flex: 1 1 14rem;
    font-size: 0.9rem;
    line-height: 1.65;
    color: var(--muted-color, #7a6a62);
  }

  .afl-toolbar .fs-btn {
    border-radius: 2px;
    min-height: 2.55rem;
    letter-spacing: 0.02em;
    border-color: color-mix(in srgb, #c9a86c 42%, var(--border-color, #e8ddd6));
  }

  .afl-swatches {
    display: flex;
    flex-wrap: wrap;
    gap: 0.95rem;
    justify-content: center;
    padding: 0.35rem 0 0.45rem;
  }

  .afl-swatch {
    width: 5.85rem;
    display: grid;
    justify-items: center;
    gap: 0.45rem;
    padding: 0.4rem;
    border: none;
    background: transparent;
    color: var(--text-color, #2b211c);
    font: inherit;
    cursor: pointer;
    transition: transform 0.22s ease;
  }

  .afl-swatch__ring {
    position: relative;
    width: 4.65rem;
    height: 4.65rem;
    border-radius: 2px;
    padding: 3px;
    background: linear-gradient(
      145deg,
      #c9a86c,
      color-mix(in srgb, var(--accent-color, #8b5e4b) 70%, #fff),
      #e8ddd6
    );
    box-shadow: 0 10px 22px rgba(43, 33, 28, 0.09);
    transition:
      transform 0.22s ease,
      box-shadow 0.22s ease;
  }

  .afl-swatch__media {
    width: 100%;
    height: 100%;
    border-radius: 1px;
    overflow: hidden;
    background: var(--card-bg, #fff);
    border: 2px solid #fffefb;
  }

  .afl-swatch__media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .afl-swatch__fallback {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 14%, #fffaf4);
    color: var(--accent-color, #8b5e4b);
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-weight: 700;
    font-size: 1.25rem;
  }

  .afl-swatch__name {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 0.98rem;
    font-weight: 600;
    text-align: center;
    line-height: 1.3;
    max-width: 5.85rem;
  }

  .afl-swatch__badge {
    position: absolute;
    inset-inline-end: -0.2rem;
    bottom: -0.15rem;
    min-width: 1.35rem;
    height: 1.35rem;
    padding: 0 0.3rem;
    border-radius: 1px;
    background: linear-gradient(145deg, #b08d57, var(--accent-color, #8b5e4b));
    color: #fff;
    font-size: 0.7rem;
    font-weight: 700;
    display: grid;
    place-items: center;
    border: 2px solid #fff;
    opacity: 0;
  }

  .afl-swatch:hover .afl-swatch__ring {
    transform: translateY(-2px);
    box-shadow: 0 14px 28px rgba(43, 33, 28, 0.12);
  }

  .afl-swatch[aria-selected='true'] .afl-swatch__ring,
  .afl-swatch[aria-pressed='true'] .afl-swatch__ring {
    background: linear-gradient(145deg, #c9a86c, var(--accent-color, #8b5e4b));
    box-shadow:
      0 0 0 1px color-mix(in srgb, #c9a86c 55%, transparent),
      0 14px 28px color-mix(in srgb, var(--accent-color, #8b5e4b) 28%, transparent);
    transform: scale(1.04);
  }

  .afl-swatch[aria-selected='true'] .afl-swatch__name,
  .afl-swatch[aria-pressed='true'] .afl-swatch__name {
    color: var(--accent-color, #8b5e4b);
  }

  .afl-swatch[aria-pressed='true'] .afl-swatch__badge {
    opacity: 1;
  }

  .afl-stage {
    display: grid;
    gap: 1.25rem;
    padding: 1.15rem;
    border-radius: 2px;
    border: 1px solid color-mix(in srgb, #c9a86c 30%, var(--border-color, #e8ddd6));
    background:
      linear-gradient(180deg, #fffaf3 0%, #fff 55%);
    box-shadow:
      0 1px 0 rgba(201, 168, 108, 0.18),
      0 18px 40px rgba(43, 33, 28, 0.07);
  }

  @media (min-width: 960px) {
    .afl-stage {
      grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
      align-items: start;
      padding: 1.35rem;
      gap: 1.5rem;
    }
  }

  .afl-media {
    position: relative;
    border-radius: 2px;
    overflow: hidden;
    background: linear-gradient(160deg, #3a2c26, #1c1613);
    aspect-ratio: 4 / 5;
    border: 1px solid color-mix(in srgb, #c9a86c 40%, transparent);
    box-shadow: 0 22px 44px rgba(43, 33, 28, 0.14);
  }

  @media (min-width: 960px) {
    .afl-media {
      aspect-ratio: 3 / 4;
      min-height: 420px;
    }
  }

  .afl-media img,
  .afl-media video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .afl-media__tag {
    position: absolute;
    top: 0.95rem;
    inset-inline-start: 0.95rem;
    padding: 0.32rem 0.75rem;
    border-radius: 1px;
    background: rgba(20, 14, 12, 0.55);
    border: 1px solid rgba(212, 175, 105, 0.65);
    color: #f7efdf;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    backdrop-filter: blur(6px);
  }

  .afl-info {
    display: grid;
    gap: 1.15rem;
    align-content: start;
  }

  .afl-info__kicker {
    display: inline-flex;
    width: fit-content;
    padding: 0.28rem 0.7rem;
    border-radius: 1px;
    border: 1px solid color-mix(in srgb, #c9a86c 50%, transparent);
    background: color-mix(in srgb, #c9a86c 8%, #fff);
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: color-mix(in srgb, #c9a86c 55%, var(--accent-color, #8b5e4b));
  }

  .afl-info__title {
    margin: 0;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(1.75rem, 3vw, 2.35rem);
    font-weight: 600;
    color: var(--text-color, #2b211c);
    line-height: 1.15;
  }

  .afl-info__desc {
    margin: 0;
    color: var(--muted-color, #7a6a62);
    line-height: 1.8;
    font-size: 0.96rem;
  }

  .afl-section-title {
    margin: 0 0 0.75rem;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--text-color, #2b211c);
  }

  .afl-meters {
    display: grid;
    gap: 0.7rem;
  }

  @media (min-width: 640px) {
    .afl-meters {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.75rem 0.9rem;
    }
  }

  .afl-meter {
    padding: 0.8rem 0.85rem;
    border-radius: 2px;
    background: linear-gradient(180deg, #fffaf4, #fff);
    border: 1px solid color-mix(in srgb, #c9a86c 24%, var(--border-color, #e8ddd6));
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.85);
  }

  .afl-meter__label {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    margin-bottom: 0.45rem;
    font-size: 0.82rem;
    font-weight: 700;
    color: var(--text-color, #2b211c);
  }

  .afl-meter__value {
    color: var(--accent-color, #8b5e4b);
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }

  .afl-meter .fs-meter {
    height: 6px;
    border-radius: 1px;
    background: color-mix(in srgb, #c9a86c 18%, var(--border-color, #e8ddd6));
  }

  .afl-meter .fs-meter > span {
    border-radius: 1px;
    background: linear-gradient(90deg, #b08d57, var(--accent-color, #8b5e4b));
  }

  .afl-care {
    display: grid;
    gap: 0.55rem;
  }

  .afl-care__item {
    margin: 0;
    padding: 0.9rem 1rem;
    border-radius: 2px;
    border-inline-start: 2px solid #c9a86c;
    border-block: 1px solid color-mix(in srgb, #c9a86c 20%, var(--border-color, #e8ddd6));
    border-inline-end: 1px solid color-mix(in srgb, #c9a86c 20%, var(--border-color, #e8ddd6));
    background: linear-gradient(
      90deg,
      color-mix(in srgb, #c9a86c 8%, #fffefb),
      #fff
    );
    font-size: 0.9rem;
    line-height: 1.7;
    color: var(--text-color, #2b211c);
  }

  .afl-care__item strong {
    color: var(--accent-color, #8b5e4b);
    font-weight: 700;
  }

  .afl-compare {
    display: grid;
    gap: 1rem;
  }

  @media (min-width: 800px) {
    .afl-compare {
      grid-template-columns: 1fr 1fr;
      gap: 1.15rem;
    }
  }

  .afl-compare__card {
    padding: 1.1rem;
    border-radius: 2px;
    border: 1px solid color-mix(in srgb, #c9a86c 30%, var(--border-color, #e8ddd6));
    background: linear-gradient(180deg, #fffaf3, #fff);
    box-shadow:
      0 1px 0 rgba(201, 168, 108, 0.18),
      0 16px 34px rgba(43, 33, 28, 0.07);
    display: grid;
    gap: 0.95rem;
  }

  .afl-compare__media {
    border-radius: 2px;
    overflow: hidden;
    aspect-ratio: 4 / 3;
    background: linear-gradient(160deg, #3a2c26, #1c1613);
    border: 1px solid color-mix(in srgb, #c9a86c 35%, transparent);
  }

  .afl-compare__media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .afl-compare__card h3 {
    margin: 0;
    text-align: center;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.35rem;
    font-weight: 600;
  }

  .afl-empty {
    margin: 0;
    padding: 1.75rem 1.15rem;
    text-align: center;
    border: 1px dashed color-mix(in srgb, #c9a86c 40%, var(--border-color, #e8ddd6));
    border-radius: 2px;
    color: var(--muted-color, #7a6a62);
    background: linear-gradient(180deg, #fffaf4, #fff);
    font-size: 0.92rem;
    line-height: 1.7;
  }

  .fs-animate .fs-meter > span {
    transition: width 0.65s cubic-bezier(0.22, 1, 0.36, 1);
  }

  @media (max-width: 959px) {
    .afl-studio {
      padding: 1rem 0.85rem 1.15rem;
      gap: 1.1rem;
    }

    .afl-stage {
      padding: 1rem;
      gap: 1rem;
    }

    .afl-media {
      max-height: 20rem;
    }

    .afl-meters {
      grid-template-columns: 1fr;
    }

    .afl-toolbar .fs-btn {
      min-height: 44px;
    }
  }

  @media (max-width: 639px) {
    .afl-studio {
      padding: 0.85rem 0.65rem 1rem;
      gap: 0.95rem;
    }

    .afl-toolbar {
      padding: 0.75rem 0.8rem;
      flex-direction: column;
      align-items: stretch;
    }

    .afl-toolbar .fs-btn {
      width: 100%;
    }

    .afl-stage {
      padding: 0.8rem;
      gap: 0.85rem;
    }

    .afl-media {
      aspect-ratio: 1 / 1;
      max-height: 16rem;
    }

    .afl-swatches {
      display: flex;
      flex-wrap: nowrap;
      gap: 0.55rem;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior-x: contain;
      padding-bottom: 0.25rem;
      margin-inline: -0.15rem;
      padding-inline: 0.15rem;
    }

    .afl-swatch {
      width: 4.5rem;
      flex: 0 0 auto;
    }

    .afl-swatch__ring {
      width: 3.5rem;
      height: 3.5rem;
    }

    .afl-info__title {
      font-size: clamp(1.4rem, 6.5vw, 1.8rem);
    }

    .afl-meters {
      grid-template-columns: 1fr;
      gap: 0.7rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .afl-swatch,
    .afl-swatch__ring,
    .fs-animate .fs-meter > span {
      transition: none !important;
    }

    .afl-swatch:hover .afl-swatch__ring,
    .afl-swatch[aria-selected='true'] .afl-swatch__ring,
    .afl-swatch[aria-pressed='true'] .afl-swatch__ring {
      transform: none;
    }
  }
`, C = [
  "رابط المنتجات",
  "نص الزر",
  "product link",
  "products link",
  "button text",
  "products url",
  "btn text"
];
function y(o) {
  const e = o.replace(/[:：]\s*$/, "").trim().toLowerCase();
  return e ? C.some((a) => e === a.toLowerCase()) : !0;
}
function f(o) {
  const e = p(o).trim();
  if (!e) return "";
  let r = e.split(/\r?\n/).map((t) => t.trim()).filter((t) => t && !y(t)).join(`
`).trim();
  if (!r) return "";
  for (const t of C) {
    const l = new RegExp(
      `(?:^|[\\s،,])${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[:：]?`,
      "gi"
    );
    r = r.replace(l, " ").replace(/\s{2,}/g, " ").trim();
  }
  return y(r) ? "" : r;
}
function U(o) {
  return S(o).map((e, a) => ({
    id: `fabric-${a}`,
    fabric_name: f(e.fabric_name),
    fabric_desc: f(e.fabric_desc),
    macro_image: O(e.macro_image),
    video_url: p(e.video_url).trim(),
    flow: d(m(e.flow), 0, 100),
    thickness: d(m(e.thickness), 0, 100),
    shine: d(m(e.shine), 0, 100),
    summer: d(m(e.summer), 0, 100),
    wrinkle: d(m(e.wrinkle), 0, 100),
    transparency: d(m(e.transparency), 0, 100),
    wash_care: f(e.wash_care),
    iron_care: f(e.iron_care),
    best_use: f(e.best_use)
  })).filter((e) => e.fabric_name.trim() !== "");
}
function B(o) {
  return V(o) && /\.(mp4|webm|ogg)(\?|$)/i.test(o);
}
const $ = [
  { key: "flow", labelAr: "انسيابية", labelEn: "Flow" },
  { key: "thickness", labelAr: "سُمك", labelEn: "Thickness" },
  { key: "shine", labelAr: "لمعان", labelEn: "Shine" },
  { key: "summer", labelAr: "مناسبة للصيف", labelEn: "Summer" },
  { key: "wrinkle", labelAr: "مقاومة التجاعيد", labelEn: "Wrinkle resist" },
  { key: "transparency", labelAr: "شفافية", labelEn: "Transparency" }
];
var N = Object.defineProperty, b = (o, e, a, r) => {
  for (var t = void 0, l = o.length - 1, h; l >= 0; l--)
    (h = o[l]) && (t = h(e, a, t) || t);
  return t && N(e, a, t), t;
}, c;
const g = (c = class extends E {
  constructor() {
    super(...arguments), this.config = {}, this.activeIndex = 0, this.compareMode = !1, this.compareIds = [], this._onLangChange = () => this.requestUpdate(), this._videoObserver = null;
  }
  connectedCallback() {
    super.connectedCallback(), this._ensureFonts(), document.addEventListener("language-changed", this._onLangChange), this._syncVisibility(), this._setupVideoObserver();
  }
  _ensureFonts() {
    if (c.fontsReady || typeof document > "u") return;
    const e = "afl-luxury-fonts";
    if (document.getElementById(e)) {
      c.fontsReady = !0;
      return;
    }
    const a = document.createElement("link");
    a.id = e, a.rel = "stylesheet", a.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;500;600;700&display=swap", document.head.appendChild(a), c.fontsReady = !0;
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), document.removeEventListener("language-changed", this._onLangChange), (e = this._videoObserver) == null || e.disconnect(), this._videoObserver = null;
  }
  firstUpdated() {
    this._setupVideoObserver();
  }
  updated(e) {
    if (e.has("config")) {
      const a = this.fabrics;
      this.activeIndex >= a.length && (this.activeIndex = Math.max(0, a.length - 1));
    }
    this._syncVisibility(), this._observeVideos();
  }
  get fabrics() {
    var e;
    return U((e = this.config) == null ? void 0 : e.afl_fabrics);
  }
  get theme() {
    return A(this.config, "afl_");
  }
  get autoplayVideo() {
    var e;
    return j((e = this.config) == null ? void 0 : e.afl_autoplay_video);
  }
  get activeFabric() {
    return this.fabrics[this.activeIndex] ?? null;
  }
  get compareFabrics() {
    return this.compareIds.map((e) => this.fabrics.find((a) => a.id === e)).filter((e) => !!e).slice(0, 2);
  }
  _label(e, a, r) {
    var t;
    return p((t = this.config) == null ? void 0 : t[e], "") || s(a, r);
  }
  _syncVisibility() {
    this.style.display = this.fabrics.length ? "" : "none";
  }
  _setupVideoObserver() {
    this._videoObserver || (this._videoObserver = new IntersectionObserver(
      (e) => {
        for (const a of e) {
          const r = a.target;
          a.isIntersecting && this.autoplayVideo ? r.play().catch(() => {
          }) : r.pause();
        }
      },
      { threshold: 0.35 }
    ), this._observeVideos());
  }
  _observeVideos() {
    this._videoObserver && (this._videoObserver.disconnect(), this.renderRoot.querySelectorAll("video").forEach((e) => this._videoObserver.observe(e)));
  }
  _selectFabric(e) {
    this.activeIndex = e;
  }
  _toggleCompare(e) {
    if (this.compareIds.includes(e)) {
      this.compareIds = this.compareIds.filter((a) => a !== e);
      return;
    }
    if (this.compareIds.length >= 2) {
      this.compareIds = [this.compareIds[1], e];
      return;
    }
    this.compareIds = [...this.compareIds, e];
  }
  _enterCompare() {
    this.compareIds.length < 2 && this.activeFabric && (this.compareIds = [this.activeFabric.id]), this.compareMode = !0;
  }
  _exitCompare() {
    this.compareMode = !1, this.compareIds = [];
  }
  _initial(e) {
    const a = e.trim();
    return a ? a.slice(0, 1) : "أ";
  }
  render() {
    var _, x;
    if (!this.fabrics.length)
      return i`<div class="fs-empty" role="status">
        ${s("لا توجد أقمشة للعرض", "No fabrics to display")}
      </div>`;
    const e = this.theme, a = e.animate && !L(), r = p((_ = this.config) == null ? void 0 : _.afl_title), t = p((x = this.config) == null ? void 0 : x.afl_desc), l = this._label("afl_compare_btn", "قارني خامتين", "Compare two fabrics"), h = this._label("afl_exit_compare", "إنهاء المقارنة", "Exit compare");
    return i`
      <section
        class=${v({
      "fs-section": !0,
      "fs-animate": a
    })}
        style=${w(R(e))}
        aria-label=${r || s("مختبر أقمشة العبايات", "Abaya fabric lab")}
      >
        <div class="fs-container">
          ${r || t ? i`<header class="fs-header">
                ${r ? i`<h2 class="fs-title">${r}</h2>` : n}
                ${t ? i`<p class="fs-desc">${t}</p>` : n}
              </header>` : n}

          <div class="afl-studio">
            <div class="afl-toolbar">
              <div>
                <span class="afl-toolbar__kicker"
                  >${s("أتيليه العينات", "Swatch atelier")}</span
                >
                <p class="afl-toolbar__hint">
                  ${this.compareMode ? s("اختاري خامتين للمقارنة", "Select two fabrics to compare") : s("لمسي عينة لاستكشاف الخامة", "Tap a swatch to explore the fabric")}
                </p>
              </div>
              ${this.compareMode ? i`<button type="button" class="fs-btn fs-btn--ghost" @click=${this._exitCompare}>
                    ${h}
                  </button>` : i`<button type="button" class="fs-btn fs-btn--ghost" @click=${this._enterCompare}>
                    ${l}
                  </button>`}
            </div>

            <div
              class="afl-swatches"
              role="tablist"
              aria-label=${s("عينات الأقمشة", "Fabric swatches")}
            >
              ${this.fabrics.map((I, z) => this._renderSwatch(I, z))}
            </div>

            ${this.compareMode ? this._renderCompare(a) : this._renderDetail(this.activeFabric, a)}
          </div>
        </div>
      </section>
    `;
  }
  _renderSwatch(e, a) {
    const r = !this.compareMode && a === this.activeIndex, t = this.compareMode && this.compareIds.includes(e.id), l = this.compareIds.indexOf(e.id) + 1;
    return i`
      <button
        type="button"
        class="afl-swatch"
        role="tab"
        aria-selected=${r ? "true" : "false"}
        aria-pressed=${t ? "true" : "false"}
        aria-label=${e.fabric_name}
        @click=${() => this.compareMode ? this._toggleCompare(e.id) : this._selectFabric(a)}
      >
        <span class="afl-swatch__ring">
          <span class="afl-swatch__media">
            ${e.macro_image ? i`<img
                  src=${e.macro_image}
                  alt=""
                  loading=${a === 0 ? "eager" : "lazy"}
                  decoding="async"
                />` : i`<span class="afl-swatch__fallback" aria-hidden="true">
                  ${this._initial(e.fabric_name)}
                </span>`}
          </span>
          <span class="afl-swatch__badge" aria-hidden="true">${l > 0 ? l : ""}</span>
        </span>
        <span class="afl-swatch__name">${e.fabric_name}</span>
      </button>
    `;
  }
  _renderDetail(e, a) {
    return e ? i`
      <div class="afl-stage" aria-live="polite">
        <div class="afl-media">
          ${B(e.video_url) ? i`<video
                src=${e.video_url}
                muted
                playsinline
                loop
                ?autoplay=${this.autoplayVideo}
                aria-label=${e.fabric_name}
              ></video>` : e.macro_image ? i`<img
                  src=${e.macro_image}
                  alt=${e.fabric_name}
                  loading="eager"
                  decoding="async"
                />` : n}
          <span class="afl-media__tag">${s("عينة مقربة", "Macro sample")}</span>
        </div>

        <div class="afl-info">
          <span class="afl-info__kicker">${s("ملف الخامة", "Fabric profile")}</span>
          <h3 class="afl-info__title">${e.fabric_name}</h3>
          ${e.fabric_desc ? i`<p class="afl-info__desc">${e.fabric_desc}</p>` : n}

          <div>
            <h4 class="afl-section-title">${s("خصائص القماش", "Fabric properties")}</h4>
            <div class="afl-meters" aria-label=${s("خصائص القماش", "Fabric properties")}>
              ${$.map((r) => this._renderMeter(e, r, a))}
            </div>
          </div>

          ${e.wash_care || e.iron_care || e.best_use ? i`<div>
                <h4 class="afl-section-title">${s("ملاحظات العناية", "Care notes")}</h4>
                <div class="afl-care">
                  ${e.wash_care ? i`<p class="afl-care__item">
                        <strong>${s("الغسيل:", "Wash:")}</strong> ${e.wash_care}
                      </p>` : n}
                  ${e.iron_care ? i`<p class="afl-care__item">
                        <strong>${s("الكي:", "Iron:")}</strong> ${e.iron_care}
                      </p>` : n}
                  ${e.best_use ? i`<p class="afl-care__item">
                        <strong>${s("الأنسب لـ:", "Best for:")}</strong> ${e.best_use}
                      </p>` : n}
                </div>
              </div>` : n}
        </div>
      </div>
    ` : n;
  }
  _renderCompare(e) {
    const a = this.compareFabrics;
    return a.length < 2 ? i`<p class="afl-empty" role="status">
        ${s("اختاري قماشين للمقارنة (حد أقصى ٢)", "Select 2 fabrics to compare (max 2)")}
      </p>` : i`
      <div class="afl-compare" role="region" aria-label=${s("مقارنة الأقمشة", "Fabric comparison")}>
        ${a.map(
      (r) => i`
            <article class="afl-compare__card">
              <div class="afl-compare__media">
                ${r.macro_image ? i`<img
                      src=${r.macro_image}
                      alt=${r.fabric_name}
                      loading="lazy"
                      decoding="async"
                    />` : n}
              </div>
              <h3>${r.fabric_name}</h3>
              <div class="afl-meters">
                ${$.map((t) => this._renderMeter(r, t, e))}
              </div>
            </article>
          `
    )}
      </div>
    `;
  }
  _renderMeter(e, a, r) {
    const t = e[a.key];
    return i`
      <div class="afl-meter">
        <div class="afl-meter__label">
          <span>${s(a.labelAr, a.labelEn)}</span>
          <span class="afl-meter__value">${t}%</span>
        </div>
        <div class=${v({ "fs-meter": !0, "fs-animate": r })}>
          <span style=${w({ width: `${t}%` })}></span>
        </div>
      </div>
    `;
  }
}, c.fontsReady = !1, c.styles = [G, T], c);
b([
  F({ type: Object })
], g.prototype, "config");
b([
  u()
], g.prototype, "activeIndex");
b([
  u()
], g.prototype, "compareMode");
b([
  u()
], g.prototype, "compareIds");
let k = g;
typeof k < "u" && k.registerSallaComponent("salla-abaya-fabric-lab");
export {
  k as default
};
