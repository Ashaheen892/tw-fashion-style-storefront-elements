var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { n as normalizeCollection, u as clamp, q as getUnitValue, l as localizedString, e as extractImageUrl, w as isDirectMediaUrl, s as sharedSectionCss, r as readSectionTheme, i as isTruthy, t, p as prefersReducedMotion, a as themeStyleMap, b as renderCommerceOutcome } from "./sharedStyles-Q5qADHV9.js";
const componentStyles = css`
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
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 11%, transparent),
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
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, #fff),
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
    color: color-mix(in srgb, #c9a86c 70%, var(--accent-color, var(--fs-store-primary)));
  }

  .afl-toolbar__hint {
    margin: 0;
    flex: 1 1 14rem;
    font-size: 0.9rem;
    line-height: 1.65;
    color: var(--muted-color, #7a6a62);
  }

  .afl-toolbar .fs-btn {
    flex: 0 0 auto;
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
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 70%, #fff),
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
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 14%, #fffaf4);
    color: var(--accent-color, var(--fs-store-primary));
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
    background: linear-gradient(145deg, #b08d57, var(--accent-color, var(--fs-store-primary)));
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
    background: linear-gradient(145deg, #c9a86c, var(--accent-color, var(--fs-store-primary)));
    box-shadow:
      0 0 0 1px color-mix(in srgb, #c9a86c 55%, transparent),
      0 14px 28px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 28%, transparent);
    transform: scale(1.04);
  }

  .afl-swatch[aria-selected='true'] .afl-swatch__name,
  .afl-swatch[aria-pressed='true'] .afl-swatch__name {
    color: var(--accent-color, var(--fs-store-primary));
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
    background: color-mix(in srgb, #c9a86c 8%, var(--fs-surface, var(--card-bg, #f0f0f0)));
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: color-mix(in srgb, #c9a86c 55%, var(--accent-color, var(--fs-store-primary)));
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
    color: var(--accent-color, var(--fs-store-primary));
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
    background: linear-gradient(90deg, #b08d57, var(--accent-color, var(--fs-store-primary)));
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
    color: var(--accent-color, var(--fs-store-primary));
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
`, JUNK_VALUES = [
  "رابط المنتجات",
  "نص الزر",
  "product link",
  "products link",
  "button text",
  "products url",
  "btn text"
];
function isJunkLine(line) {
  const normalized = line.replace(/[:：]\s*$/, "").trim().toLowerCase();
  return normalized ? JUNK_VALUES.some((junk) => normalized === junk.toLowerCase()) : !0;
}
__name(isJunkLine, "isJunkLine");
function cleanText(raw) {
  const text = localizedString(raw).trim();
  if (!text) return "";
  let cleaned = text.split(/\r?\n/).map((line) => line.trim()).filter((line) => line && !isJunkLine(line)).join(`
`).trim();
  if (!cleaned) return "";
  for (const junk of JUNK_VALUES) {
    const pattern = new RegExp(
      `(?:^|[\\s،,])${junk.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[:：]?`,
      "gi"
    );
    cleaned = cleaned.replace(pattern, " ").replace(/\s{2,}/g, " ").trim();
  }
  return isJunkLine(cleaned) ? "" : cleaned;
}
__name(cleanText, "cleanText");
function parseFabrics(raw) {
  return normalizeCollection(raw).map((item, index) => ({
    id: `fabric-${index}`,
    fabric_name: cleanText(item.fabric_name),
    fabric_desc: cleanText(item.fabric_desc),
    macro_image: extractImageUrl(item.macro_image),
    video_url: localizedString(item.video_url).trim(),
    flow: clamp(getUnitValue(item.flow), 0, 100),
    thickness: clamp(getUnitValue(item.thickness), 0, 100),
    shine: clamp(getUnitValue(item.shine), 0, 100),
    summer: clamp(getUnitValue(item.summer), 0, 100),
    wrinkle: clamp(getUnitValue(item.wrinkle), 0, 100),
    transparency: clamp(getUnitValue(item.transparency), 0, 100),
    wash_care: cleanText(item.wash_care),
    iron_care: cleanText(item.iron_care),
    best_use: cleanText(item.best_use)
  })).filter((f) => f.fabric_name.trim() !== "");
}
__name(parseFabrics, "parseFabrics");
function isPlayableVideo(url) {
  return isDirectMediaUrl(url) && /\.(mp4|webm|ogg)(\?|$)/i.test(url);
}
__name(isPlayableVideo, "isPlayableVideo");
const METER_SPECS = [
  { key: "flow", labelAr: "انسيابية", labelEn: "Flow" },
  { key: "thickness", labelAr: "سُمك", labelEn: "Thickness" },
  { key: "shine", labelAr: "لمعان", labelEn: "Shine" },
  { key: "summer", labelAr: "مناسبة للصيف", labelEn: "Summer" },
  { key: "wrinkle", labelAr: "مقاومة التجاعيد", labelEn: "Wrinkle resist" },
  { key: "transparency", labelAr: "شفافية", labelEn: "Transparency" }
];
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass"), _a;
const _AbayaFabricLab = (_a = class extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.activeIndex = 0, this.compareMode = !1, this.compareIds = [], this._onLangChange = () => this.requestUpdate(), this._videoObserver = null;
  }
  connectedCallback() {
    super.connectedCallback(), this._ensureFonts(), document.addEventListener("language-changed", this._onLangChange), this._syncVisibility(), this._setupVideoObserver();
  }
  _ensureFonts() {
    if (_a.fontsReady || typeof document > "u") return;
    const id = "afl-luxury-fonts";
    if (document.getElementById(id)) {
      _a.fontsReady = !0;
      return;
    }
    const link = document.createElement("link");
    link.id = id, link.rel = "stylesheet", link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;500;600;700&display=swap", document.head.appendChild(link), _a.fontsReady = !0;
  }
  disconnectedCallback() {
    var _a2;
    super.disconnectedCallback(), document.removeEventListener("language-changed", this._onLangChange), (_a2 = this._videoObserver) == null || _a2.disconnect(), this._videoObserver = null;
  }
  firstUpdated() {
    this._setupVideoObserver();
  }
  updated(changed) {
    if (changed.has("config")) {
      const fabrics = this.fabrics;
      this.activeIndex >= fabrics.length && (this.activeIndex = Math.max(0, fabrics.length - 1));
    }
    this._syncVisibility(), this._observeVideos();
  }
  get fabrics() {
    var _a2;
    return parseFabrics((_a2 = this.config) == null ? void 0 : _a2.afl_fabrics);
  }
  get theme() {
    return readSectionTheme(this.config, "afl_");
  }
  get autoplayVideo() {
    var _a2;
    return isTruthy((_a2 = this.config) == null ? void 0 : _a2.afl_autoplay_video);
  }
  get activeFabric() {
    return this.fabrics[this.activeIndex] ?? null;
  }
  get compareFabrics() {
    return this.compareIds.map((id) => this.fabrics.find((f) => f.id === id)).filter((f) => !!f).slice(0, 2);
  }
  _label(key, ar, en) {
    var _a2;
    return localizedString((_a2 = this.config) == null ? void 0 : _a2[key], "") || t(ar, en);
  }
  _syncVisibility() {
    this.style.display = this.fabrics.length ? "" : "none";
  }
  _setupVideoObserver() {
    this._videoObserver || (this._videoObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const video = entry.target;
          entry.isIntersecting && this.autoplayVideo ? video.play().catch(() => {
          }) : video.pause();
        }
      },
      { threshold: 0.35 }
    ), this._observeVideos());
  }
  _observeVideos() {
    this._videoObserver && (this._videoObserver.disconnect(), this.renderRoot.querySelectorAll("video").forEach((v) => this._videoObserver.observe(v)));
  }
  _selectFabric(index) {
    this.activeIndex = index;
  }
  _toggleCompare(id) {
    if (this.compareIds.includes(id)) {
      this.compareIds = this.compareIds.filter((x) => x !== id);
      return;
    }
    if (this.compareIds.length >= 2) {
      this.compareIds = [this.compareIds[1], id];
      return;
    }
    this.compareIds = [...this.compareIds, id];
  }
  _enterCompare() {
    this.compareIds.length < 2 && this.activeFabric && (this.compareIds = [this.activeFabric.id]), this.compareMode = !0;
  }
  _exitCompare() {
    this.compareMode = !1, this.compareIds = [];
  }
  _initial(name) {
    const trimmed = name.trim();
    return trimmed ? trimmed.slice(0, 1) : "أ";
  }
  render() {
    var _a2, _b;
    if (!this.fabrics.length)
      return html`<div class="fs-empty" role="status">
        ${t("لا توجد أقمشة للعرض", "No fabrics to display")}
      </div>`;
    const theme = this.theme, animate = theme.animate && !prefersReducedMotion(), title = localizedString((_a2 = this.config) == null ? void 0 : _a2.afl_title), desc = localizedString((_b = this.config) == null ? void 0 : _b.afl_desc), compareBtn = this._label("afl_compare_btn", "قارني خامتين", "Compare two fabrics"), exitCompareBtn = this._label("afl_exit_compare", "إنهاء المقارنة", "Exit compare");
    return html`
      <section
        class=${classMap({
      "fs-section": !0,
      "fs-animate": animate
    })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("مختبر أقمشة العبايات", "Abaya fabric lab")}
      >
        <div class="fs-container">
          ${title || desc ? html`<header class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </header>` : nothing}

          <div class="afl-studio">
            <div class="afl-toolbar">
              <div>
                <span class="afl-toolbar__kicker"
                  >${t("أتيليه العينات", "Swatch atelier")}</span
                >
                <p class="afl-toolbar__hint">
                  ${this.compareMode ? t("اختاري خامتين للمقارنة", "Select two fabrics to compare") : t("لمسي عينة لاستكشاف الخامة", "Tap a swatch to explore the fabric")}
                </p>
              </div>
              ${this.compareMode ? html`<button type="button" class="fs-btn fs-btn--ghost" @click=${this._exitCompare}>
                    ${exitCompareBtn}
                  </button>` : html`<button type="button" class="fs-btn fs-btn--ghost" @click=${this._enterCompare}>
                    ${compareBtn}
                  </button>`}
            </div>

            <div
              class="afl-swatches"
              role="tablist"
              aria-label=${t("عينات الأقمشة", "Fabric swatches")}
            >
              ${this.fabrics.map((f, i) => this._renderSwatch(f, i))}
            </div>

            ${this.compareMode ? this._renderCompare(animate) : this._renderDetail(this.activeFabric, animate)}
          </div>
        </div>
        ${renderCommerceOutcome(this.config || {}, "afl_")}
      </section>
    `;
  }
  _renderSwatch(fabric, index) {
    const selected = !this.compareMode && index === this.activeIndex, pressed = this.compareMode && this.compareIds.includes(fabric.id), mark = this.compareIds.indexOf(fabric.id) + 1;
    return html`
      <button
        type="button"
        class="afl-swatch"
        role="tab"
        aria-selected=${selected ? "true" : "false"}
        aria-pressed=${pressed ? "true" : "false"}
        aria-label=${fabric.fabric_name}
        @click=${() => this.compareMode ? this._toggleCompare(fabric.id) : this._selectFabric(index)}
      >
        <span class="afl-swatch__ring">
          <span class="afl-swatch__media">
            ${fabric.macro_image ? html`<img
                  src=${fabric.macro_image}
                  alt=""
                  loading=${index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />` : html`<span class="afl-swatch__fallback" aria-hidden="true">
                  ${this._initial(fabric.fabric_name)}
                </span>`}
          </span>
          <span class="afl-swatch__badge" aria-hidden="true">${mark > 0 ? mark : ""}</span>
        </span>
        <span class="afl-swatch__name">${fabric.fabric_name}</span>
      </button>
    `;
  }
  _renderDetail(fabric, animate) {
    return fabric ? html`
      <div class="afl-stage" aria-live="polite">
        <div class="afl-media">
          ${isPlayableVideo(fabric.video_url) ? html`<video
                src=${fabric.video_url}
                muted
                playsinline
                loop
                ?autoplay=${this.autoplayVideo}
                aria-label=${fabric.fabric_name}
              ></video>` : fabric.macro_image ? html`<img
                  src=${fabric.macro_image}
                  alt=${fabric.fabric_name}
                  loading="eager"
                  decoding="async"
                />` : nothing}
          <span class="afl-media__tag">${t("عينة مقربة", "Macro sample")}</span>
        </div>

        <div class="afl-info">
          <span class="afl-info__kicker">${t("ملف الخامة", "Fabric profile")}</span>
          <h3 class="afl-info__title">${fabric.fabric_name}</h3>
          ${fabric.fabric_desc ? html`<p class="afl-info__desc">${fabric.fabric_desc}</p>` : nothing}

          <div>
            <h4 class="afl-section-title">${t("خصائص القماش", "Fabric properties")}</h4>
            <div class="afl-meters" aria-label=${t("خصائص القماش", "Fabric properties")}>
              ${METER_SPECS.map((spec) => this._renderMeter(fabric, spec, animate))}
            </div>
          </div>

          ${fabric.wash_care || fabric.iron_care || fabric.best_use ? html`<div>
                <h4 class="afl-section-title">${t("ملاحظات العناية", "Care notes")}</h4>
                <div class="afl-care">
                  ${fabric.wash_care ? html`<p class="afl-care__item">
                        <strong>${t("الغسيل:", "Wash:")}</strong> ${fabric.wash_care}
                      </p>` : nothing}
                  ${fabric.iron_care ? html`<p class="afl-care__item">
                        <strong>${t("الكي:", "Iron:")}</strong> ${fabric.iron_care}
                      </p>` : nothing}
                  ${fabric.best_use ? html`<p class="afl-care__item">
                        <strong>${t("الأنسب لـ:", "Best for:")}</strong> ${fabric.best_use}
                      </p>` : nothing}
                </div>
              </div>` : nothing}
        </div>
      </div>
    ` : nothing;
  }
  _renderCompare(animate) {
    const fabrics = this.compareFabrics;
    return fabrics.length < 2 ? html`<p class="afl-empty" role="status">
        ${t("اختاري قماشين للمقارنة (حد أقصى ٢)", "Select 2 fabrics to compare (max 2)")}
      </p>` : html`
      <div class="afl-compare" role="region" aria-label=${t("مقارنة الأقمشة", "Fabric comparison")}>
        ${fabrics.map(
      (f) => html`
            <article class="afl-compare__card">
              <div class="afl-compare__media">
                ${f.macro_image ? html`<img
                      src=${f.macro_image}
                      alt=${f.fabric_name}
                      loading="lazy"
                      decoding="async"
                    />` : nothing}
              </div>
              <h3>${f.fabric_name}</h3>
              <div class="afl-meters">
                ${METER_SPECS.map((spec) => this._renderMeter(f, spec, animate))}
              </div>
            </article>
          `
    )}
      </div>
    `;
  }
  _renderMeter(fabric, spec, animate) {
    const value = fabric[spec.key];
    return html`
      <div class="afl-meter">
        <div class="afl-meter__label">
          <span>${t(spec.labelAr, spec.labelEn)}</span>
          <span class="afl-meter__value">${value}%</span>
        </div>
        <div class=${classMap({ "fs-meter": !0, "fs-animate": animate })}>
          <span style=${styleMap({ width: `${value}%` })}></span>
        </div>
      </div>
    `;
  }
}, __name(_a, "_AbayaFabricLab"), _a.fontsReady = !1, _a.styles = [sharedSectionCss, componentStyles], _a);
__decorateClass([
  property({ type: Object })
], _AbayaFabricLab.prototype, "config");
__decorateClass([
  state()
], _AbayaFabricLab.prototype, "activeIndex");
__decorateClass([
  state()
], _AbayaFabricLab.prototype, "compareMode");
__decorateClass([
  state()
], _AbayaFabricLab.prototype, "compareIds");
let AbayaFabricLab = _AbayaFabricLab;
typeof AbayaFabricLab < "u" && AbayaFabricLab.registerSallaComponent("salla-abaya-fabric-lab");
export {
  AbayaFabricLab as default
};
