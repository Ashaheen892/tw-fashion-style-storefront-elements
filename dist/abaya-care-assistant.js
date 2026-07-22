var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { n as normalizeCollection, i as isTruthy, l as localizedString, e as extractImageUrl, s as sharedSectionCss, r as readSectionTheme, g as getPageLocale, c as copyText, t, p as prefersReducedMotion, a as themeStyleMap, b as renderCommerceOutcome } from "./sharedStyles-Q5qADHV9.js";
const componentStyles = css`
  .aca-layout {
    display: grid;
    gap: 1.75rem;
    font-family: Manrope, 'Avenir Next', 'Segoe UI', sans-serif;
  }

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

  @media (min-width: 960px) {
    .aca-layout {
      grid-template-columns: minmax(260px, 292px) minmax(0, 1fr);
      align-items: start;
      gap: 2rem;
    }
  }

  .aca-sidebar {
    padding: 1.35rem 1.2rem 1.45rem;
    border-radius: 2px;
    border: 1px solid color-mix(in srgb, #c9a86c 35%, var(--border-color, #e8ddd6));
    background:
      linear-gradient(180deg, rgba(255, 252, 247, 0.98), #fff 55%),
      linear-gradient(
        135deg,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, transparent),
        transparent 55%
      );
    box-shadow:
      0 1px 0 rgba(201, 168, 108, 0.25),
      0 22px 44px rgba(43, 33, 28, 0.07);
  }

  .aca-sidebar__label {
    display: block;
    margin-bottom: 0.65rem;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.28rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    color: var(--text-color, #2b211c);
  }

  .aca-search {
    width: 100%;
    min-height: 46px;
    padding: 0.7rem 0.95rem;
    border: 1px solid color-mix(in srgb, #c9a86c 28%, var(--border-color, #e8ddd6));
    border-radius: 2px;
    background: color-mix(in srgb, var(--card-bg, #ffffff) 92%, var(--fs-surface, #f0f0f0));
    color: var(--text-color, #2b211c);
    font: inherit;
    box-sizing: border-box;
    margin-bottom: 1.05rem;
  }

  .aca-search:focus-visible {
    outline: 2px solid color-mix(in srgb, #c9a86c 55%, var(--accent-color, var(--fs-store-primary)));
    outline-offset: 2px;
  }

  .aca-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 0.55rem;
    max-height: 520px;
    overflow: auto;
  }

  .aca-list__item {
    width: 100%;
    display: grid;
    grid-template-columns: 56px minmax(0, 1fr) auto;
    align-items: center;
    gap: 0.8rem;
    padding: 0.55rem;
    border: 1px solid transparent;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.7);
    color: var(--text-color, #2b211c);
    font: inherit;
    text-align: start;
    cursor: pointer;
    transition:
      border-color 0.25s ease,
      background 0.25s ease,
      transform 0.25s ease,
      box-shadow 0.25s ease;
  }

  .aca-list__item:hover {
    border-color: color-mix(in srgb, #c9a86c 40%, var(--border-color, #e8ddd6));
    background: var(--fs-surface, var(--card-bg, #f0f0f0));
    transform: translateY(-1px);
  }

  .aca-list__item[aria-current='true'] {
    border-color: color-mix(in srgb, #c9a86c 55%, var(--accent-color, var(--fs-store-primary)));
    background: linear-gradient(
      120deg,
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, #fff),
      #fff
    );
    box-shadow: 0 12px 24px rgba(43, 33, 28, 0.08);
  }

  .aca-list__thumb {
    width: 56px;
    height: 56px;
    border-radius: 2px;
    object-fit: cover;
    background: color-mix(in srgb, var(--border-color, #e8ddd6) 50%, transparent);
    box-shadow: 0 0 0 1px rgba(201, 168, 108, 0.28);
  }

  .aca-list__meta {
    min-width: 0;
    display: grid;
    gap: 0.18rem;
  }

  .aca-list__name {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-weight: 600;
    font-size: 1.12rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .aca-list__hint {
    font-size: 0.74rem;
    color: var(--muted-color, #7a6a62);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .aca-list__check {
    width: 1.35rem;
    height: 1.35rem;
    border-radius: 2px;
    display: grid;
    place-items: center;
    font-size: 0.68rem;
    color: #fff;
    background: linear-gradient(145deg, #b08d57, #8b5e4b);
    opacity: 0;
  }

  .aca-list__item[aria-current='true'] .aca-list__check {
    opacity: 1;
  }

  .aca-panel {
    position: relative;
    overflow: hidden;
    border-radius: 2px;
    border: 1px solid color-mix(in srgb, #c9a86c 32%, var(--border-color, #e8ddd6));
    background: linear-gradient(180deg, #fffdf9 0%, var(--card-bg, #fff) 40%);
    box-shadow:
      0 1px 0 rgba(201, 168, 108, 0.22),
      0 28px 56px rgba(43, 33, 28, 0.09);
  }

  .aca-panel__hero {
    position: relative;
    min-height: 220px;
    padding: 2rem 1.6rem 2.1rem;
    color: #fff;
    background:
      linear-gradient(115deg, rgba(22, 16, 13, 0.78), rgba(43, 33, 28, 0.28)),
      var(--accent-color, var(--fs-store-primary));
  }

  .aca-panel__hero::after {
    content: '';
    position: absolute;
    inset-inline: 1.6rem;
    bottom: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(201, 168, 108, 0.75),
      transparent
    );
  }

  .aca-panel__hero-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.48;
    transform: scale(1.03);
  }

  .aca-panel__hero-content {
    position: relative;
    z-index: 1;
    display: grid;
    gap: 0.7rem;
    max-width: 34rem;
  }

  .aca-kicker {
    display: inline-flex;
    width: fit-content;
    padding: 0.3rem 0.75rem;
    border-radius: 1px;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(212, 175, 105, 0.65);
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .aca-panel__title {
    margin: 0;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(2.15rem, 3.6vw, 2.85rem);
    font-weight: 600;
    line-height: 1.1;
    letter-spacing: 0.01em;
  }

  .aca-panel__summary {
    margin: 0;
    font-size: 0.96rem;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.9);
    max-width: 32rem;
  }

  .aca-panel__body {
    padding: 1.6rem 1.45rem 1.7rem;
    display: grid;
    gap: 0;
  }

  .aca-block {
    min-width: 0;
  }

  .aca-block + .aca-block,
  .aca-block + .aca-actions {
    margin-top: 1.5rem;
    padding-top: 1.45rem;
    border-top: 1px solid color-mix(in srgb, #c9a86c 28%, var(--border-color, #e8ddd6));
  }

  .aca-block--allows {
    position: relative;
    z-index: 1;
    background: linear-gradient(180deg, #fffdf9 0%, #fff 100%);
  }

  .aca-section-title {
    margin: 0 0 0.95rem;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.42rem;
    font-weight: 600;
    color: var(--text-color, #2b211c);
  }

  .aca-journey {
    display: grid;
    gap: 0.8rem;
    overflow: hidden;
    padding-inline-end: 0.15rem;
  }

  @media (min-width: 820px) {
    .aca-journey {
      grid-template-columns: repeat(5, minmax(0, 1fr));
      gap: 0.85rem;
      overflow: visible;
      padding-inline-end: 0;
    }
  }

  .aca-step {
    position: relative;
    z-index: 0;
    display: grid;
    align-content: start;
    gap: 0.65rem;
    padding: 1.05rem 0.95rem 1.15rem;
    border-radius: 2px;
    border: 1px solid color-mix(in srgb, #c9a86c 28%, var(--border-color, #e8ddd6));
    background:
      linear-gradient(180deg, #fffaf4 0%, #fff 70%);
    min-height: 100%;
    min-width: 0;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }

  .aca-step:hover {
    transform: translateY(-2px);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.9),
      0 14px 28px rgba(43, 33, 28, 0.07);
  }

  @media (min-width: 820px) {
    .aca-step:not(:last-child)::after {
      content: '';
      position: absolute;
      top: 1.55rem;
      inset-inline-end: calc(-0.85rem / 2 - 0.15rem);
      width: 0.55rem;
      height: 1px;
      background: #c9a86c;
      pointer-events: none;
      z-index: 0;
    }
  }

  .aca-step__num {
    width: 2.05rem;
    height: 2.05rem;
    display: grid;
    place-items: center;
    border-radius: 1px;
    background: linear-gradient(145deg, #b08d57, var(--accent-color, var(--fs-store-primary)));
    color: #fff;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-weight: 700;
    font-size: 1.05rem;
    box-shadow: 0 10px 18px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 28%, transparent);
  }

  .aca-step__title {
    margin: 0;
    font-weight: 700;
    font-size: 0.9rem;
    color: var(--text-color, #2b211c);
  }

  .aca-step__text {
    margin: 0;
    color: var(--muted-color, #7a6a62);
    font-size: 0.8rem;
    line-height: 1.7;
  }

  .aca-allows {
    display: grid;
    gap: 0.65rem;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 719px) {
    .aca-allows {
      grid-template-columns: 1fr;
    }
  }

  .aca-allow {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.65rem;
    align-items: center;
    padding: 0.9rem 0.95rem;
    border-radius: 2px;
    border: 1px solid color-mix(in srgb, #c9a86c 22%, var(--border-color, #e8ddd6));
    background: var(--fs-surface, var(--card-bg, #f0f0f0));
  }

  .aca-allow__icon {
    width: 2.1rem;
    height: 2.1rem;
    border-radius: 1px;
    display: grid;
    place-items: center;
    font-size: 0.82rem;
    font-weight: 700;
  }

  .aca-allow__label {
    display: grid;
    gap: 0.12rem;
  }

  .aca-allow__label strong {
    font-size: 0.88rem;
    color: var(--text-color, #2b211c);
  }

  .aca-allow__label span {
    font-size: 0.72rem;
    color: var(--muted-color, #7a6a62);
  }

  .aca-allow--yes {
    border-color: color-mix(in srgb, #3d6b55 30%, var(--border-color, #e8ddd6));
    background: color-mix(in srgb, #3d6b55 5%, var(--fs-surface, var(--card-bg, #f0f0f0)));
  }

  .aca-allow--yes .aca-allow__icon {
    background: color-mix(in srgb, #3d6b55 14%, var(--fs-surface, var(--card-bg, #f0f0f0)));
    color: #2f5a47;
  }

  .aca-allow--no {
    border-color: color-mix(in srgb, #8f4a45 24%, var(--border-color, #e8ddd6));
    background: color-mix(in srgb, #8f4a45 4%, var(--fs-surface, var(--card-bg, #f0f0f0)));
  }

  .aca-allow--no .aca-allow__icon {
    background: color-mix(in srgb, #8f4a45 12%, var(--fs-surface, var(--card-bg, #f0f0f0)));
    color: #8f4a45;
  }

  .aca-notes {
    display: grid;
    gap: 0.6rem;
  }

  .aca-extra {
    margin: 0;
    padding: 0.95rem 1.05rem;
    border-radius: 2px;
    border-inline-start: 2px solid #c9a86c;
    border-block: 1px solid color-mix(in srgb, #c9a86c 22%, var(--border-color, #e8ddd6));
    border-inline-end: 1px solid color-mix(in srgb, #c9a86c 22%, var(--border-color, #e8ddd6));
    background: linear-gradient(
      90deg,
      color-mix(in srgb, #c9a86c 8%, #fffefb),
      #fff
    );
    font-size: 0.9rem;
    line-height: 1.75;
    color: var(--text-color, #2b211c);
  }

  .aca-extra strong {
    color: var(--accent-color, var(--fs-store-primary));
    font-weight: 700;
  }

  .aca-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    padding-top: 0.2rem;
  }

  .aca-actions .fs-btn {
    flex: 1 1 auto;
  }

  .aca-toast {
    position: fixed;
    inset-inline: 1rem;
    bottom: 1rem;
    margin: 0 auto;
    max-width: 20rem;
    padding: 0.9rem 1.15rem;
    background: linear-gradient(135deg, #6b4a3d, var(--accent-color, var(--fs-store-primary)));
    color: #fff;
    border-radius: 2px;
    text-align: center;
    font-size: 0.9rem;
    z-index: 100;
    box-shadow: 0 16px 32px rgba(43, 33, 28, 0.26);
    animation: aca-toast-in 0.3s ease;
  }

  @keyframes aca-toast-in {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .aca-empty-inline {
    margin: 0.25rem 0 0;
    padding: 0.85rem;
    text-align: center;
    color: var(--muted-color, #7a6a62);
    font-size: 0.86rem;
  }

  .aca-print-card {
    display: none;
  }

  @media (max-width: 959px) {
    .aca-layout {
      gap: 1.1rem;
    }

    .aca-list {
      max-height: 16rem;
    }

    .aca-sidebar {
      padding: 1rem 0.9rem 1.1rem;
    }

    .aca-panel__hero {
      min-height: 0;
      padding: 1.25rem 1rem 1.35rem;
    }

    .aca-panel__body {
      padding: 1.15rem 1rem 1.25rem;
      gap: 1.2rem;
    }

    .aca-panel__title {
      font-size: clamp(1.55rem, 6.5vw, 2rem);
    }

    .aca-journey {
      display: flex;
      flex-wrap: nowrap;
      gap: 0.55rem;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior-x: contain;
      padding-bottom: 0.2rem;
      scroll-snap-type: x proximity;
    }

    .aca-step {
      flex: 0 0 min(11.5rem, 72vw);
      min-height: 0;
      padding: 0.85rem 0.8rem 0.95rem;
      scroll-snap-align: start;
    }

    .aca-step:hover {
      transform: none;
    }

    .aca-allows {
      grid-template-columns: 1fr;
    }

    .aca-actions {
      display: grid;
      grid-template-columns: 1fr;
    }

    .aca-actions .fs-btn {
      width: 100%;
    }
  }

  @media (max-width: 639px) {
    .aca-list {
      max-height: 14rem;
    }

    .aca-list__item {
      min-height: 48px;
    }

    .aca-panel__summary {
      font-size: 0.9rem;
      line-height: 1.7;
    }

    .aca-section-title {
      font-size: 1.2rem;
      margin-bottom: 0.75rem;
    }

    .aca-toast {
      inset-inline: 0.75rem;
      bottom: 0.75rem;
      width: auto;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .aca-list__item,
    .aca-step,
    .aca-toast {
      transition: none !important;
      animation: none !important;
      transform: none !important;
    }
  }

  @media print {
    :host {
      display: block !important;
    }

    .fs-section > *:not(.aca-print-card) {
      display: none !important;
    }

    .aca-print-card {
      display: block !important;
      padding: 2rem;
      color: #000;
      background: var(--fs-surface, var(--card-bg, #f0f0f0));
    }

    .aca-print-card h1 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 1.7rem;
      margin: 0 0 1rem;
    }

    .aca-print-card p,
    .aca-print-card li {
      font-size: 0.95rem;
      line-height: 1.65;
    }
  }
`, JUNK_STEP_VALUES = [
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
  return normalized ? JUNK_STEP_VALUES.some((junk) => normalized === junk.toLowerCase()) : !0;
}
__name(isJunkLine, "isJunkLine");
function cleanCareText(raw) {
  const text = localizedString(raw).trim();
  if (!text) return "";
  let cleaned = text.split(/\r?\n/).map((line) => line.trim()).filter((line) => line && !isJunkLine(line)).join(`
`).trim();
  if (!cleaned) return "";
  for (const junk of JUNK_STEP_VALUES) {
    const pattern = new RegExp(`(?:^|[\\s،,])${junk.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[:：]?`, "gi");
    cleaned = cleaned.replace(pattern, " ").replace(/\s{2,}/g, " ").trim();
  }
  return isJunkLine(cleaned) ? "" : cleaned;
}
__name(cleanCareText, "cleanCareText");
function parseFabrics(raw) {
  return normalizeCollection(raw).map((item) => ({
    fabric_name: localizedString(item.fabric_name),
    fabric_image: extractImageUrl(item.fabric_image),
    fabric_summary: localizedString(item.fabric_summary),
    pre_wash: cleanCareText(item.pre_wash),
    wash: cleanCareText(item.wash),
    dry: cleanCareText(item.dry),
    iron: cleanCareText(item.iron),
    store: cleanCareText(item.store),
    stain: cleanCareText(item.stain),
    embroidery_warn: cleanCareText(item.embroidery_warn),
    wash_temp: cleanCareText(item.wash_temp),
    allow_washer: isTruthy(item.allow_washer),
    allow_dryer: isTruthy(item.allow_dryer),
    allow_steam: isTruthy(item.allow_steam)
  })).filter((f) => f.fabric_name.trim() !== "");
}
__name(parseFabrics, "parseFabrics");
function buildCareSteps(fabric) {
  return [
    { key: "pre_wash", labelAr: "قبل الغسيل", labelEn: "Pre-wash", value: fabric.pre_wash },
    { key: "wash", labelAr: "الغسيل", labelEn: "Wash", value: fabric.wash },
    { key: "dry", labelAr: "التجفيف", labelEn: "Dry", value: fabric.dry },
    { key: "iron", labelAr: "الكي", labelEn: "Iron", value: fabric.iron },
    { key: "store", labelAr: "التخزين", labelEn: "Storage", value: fabric.store }
  ].filter((s) => s.value.trim() !== "");
}
__name(buildCareSteps, "buildCareSteps");
function buildCareText(fabric, localeEn) {
  const lines = [fabric.fabric_name];
  fabric.fabric_summary && lines.push(fabric.fabric_summary);
  for (const step of buildCareSteps(fabric))
    lines.push(`${localeEn ? step.labelEn : step.labelAr}: ${step.value}`);
  return fabric.stain && lines.push(`${localeEn ? "Stain removal" : "إزالة البقع"}: ${fabric.stain}`), fabric.embroidery_warn && lines.push(
    `${localeEn ? "Embroidery note" : "تنبيه التطريز"}: ${fabric.embroidery_warn}`
  ), fabric.wash_temp && lines.push(
    `${localeEn ? "Wash temperature" : "حرارة الغسيل"}: ${fabric.wash_temp}`
  ), lines.join(`
`);
}
__name(buildCareText, "buildCareText");
function filterFabrics(fabrics, query) {
  const q = query.trim().toLowerCase();
  return q ? fabrics.filter(
    (f) => f.fabric_name.toLowerCase().includes(q) || f.fabric_summary.toLowerCase().includes(q)
  ) : fabrics;
}
__name(filterFabrics, "filterFabrics");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass"), _a;
const _AbayaCareAssistant = (_a = class extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.searchQuery = "", this.selectedKey = "", this.showToast = !1, this._onLangChange = () => this.requestUpdate(), this._toastTimer = null;
  }
  connectedCallback() {
    super.connectedCallback(), this._ensureFonts(), document.addEventListener("language-changed", this._onLangChange), this._ensureSelection(), this._syncVisibility();
  }
  _ensureFonts() {
    if (_a.fontsReady || typeof document > "u") return;
    const id = "aca-luxury-fonts";
    if (document.getElementById(id)) {
      _a.fontsReady = !0;
      return;
    }
    const link = document.createElement("link");
    link.id = id, link.rel = "stylesheet", link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;500;600;700&display=swap", document.head.appendChild(link), _a.fontsReady = !0;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("language-changed", this._onLangChange), this._toastTimer && (clearTimeout(this._toastTimer), this._toastTimer = null);
  }
  updated(changed) {
    changed.has("config") && this._ensureSelection(), this._syncVisibility();
  }
  get fabrics() {
    var _a2;
    return parseFabrics((_a2 = this.config) == null ? void 0 : _a2.aca_fabrics);
  }
  get filteredFabrics() {
    return filterFabrics(this.fabrics, this.searchQuery);
  }
  get theme() {
    return readSectionTheme(this.config, "aca_");
  }
  get selected() {
    return this.filteredFabrics.find((f) => f.fabric_name === this.selectedKey) || this.filteredFabrics[0] || null;
  }
  _syncVisibility() {
    this.style.display = this.fabrics.length ? "" : "none";
  }
  _ensureSelection() {
    const list = this.filteredFabrics;
    if (!list.length) {
      this.selectedKey = "";
      return;
    }
    list.some((f) => f.fabric_name === this.selectedKey) || (this.selectedKey = list[0].fabric_name);
  }
  _onSearch(e) {
    this.searchQuery = e.target.value, this._ensureSelection();
  }
  _selectFabric(name) {
    this.selectedKey = name;
  }
  async _copyCare() {
    const fabric = this.selected;
    if (!fabric) return;
    const localeEn = getPageLocale() === "en";
    await copyText(buildCareText(fabric, localeEn)) && this._showCopiedToast();
  }
  _printCare() {
    window.print();
  }
  _showCopiedToast() {
    this.showToast = !0, this._toastTimer && clearTimeout(this._toastTimer), this._toastTimer = setTimeout(() => {
      this.showToast = !1, this._toastTimer = null;
    }, 2400);
  }
  _label(key, ar, en) {
    var _a2;
    return localizedString((_a2 = this.config) == null ? void 0 : _a2[key], "") || t(ar, en);
  }
  render() {
    var _a2, _b;
    if (!this.fabrics.length)
      return html`<div class="fs-empty" role="status">
        ${t("لا توجد أقمشة متاحة", "No fabrics available")}
      </div>`;
    const theme = this.theme, animate = theme.animate && !prefersReducedMotion(), fabric = this.selected, title = localizedString((_a2 = this.config) == null ? void 0 : _a2.aca_title), desc = localizedString((_b = this.config) == null ? void 0 : _b.aca_desc), searchPh = this._label("aca_search_placeholder", "ابحثي عن الخامة...", "Search fabrics..."), copyBtn = this._label("aca_copy_btn", "نسخ التعليمات", "Copy instructions"), printBtn = this._label("aca_print_btn", "طباعة البطاقة", "Print card"), copiedMsg = this._label("aca_copied_msg", "تم النسخ بنجاح", "Copied successfully"), steps = fabric ? buildCareSteps(fabric) : [];
    return html`
      <section
        class=${classMap({
      "fs-section": !0,
      "fs-animate": animate
    })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("مساعد العناية بالعباية", "Abaya care assistant")}
      >
        <div class="fs-container">
          ${title || desc ? html`<header class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </header>` : nothing}

          <div class="aca-layout">
            <aside class="aca-sidebar">
              <label class="aca-sidebar__label" for="aca-search">
                ${t("اختاري الخامة", "Choose a fabric")}
              </label>
              <input
                id="aca-search"
                class="aca-search"
                type="search"
                .value=${this.searchQuery}
                placeholder=${searchPh}
                @input=${this._onSearch}
                aria-label=${searchPh}
              />
              <ul class="aca-list" role="listbox" aria-label=${t("قائمة الأقمشة", "Fabric list")}>
                ${this.filteredFabrics.map(
      (f) => html`
                    <li>
                      <button
                        type="button"
                        class="aca-list__item"
                        role="option"
                        aria-current=${f.fabric_name === (fabric == null ? void 0 : fabric.fabric_name) ? "true" : "false"}
                        @click=${() => this._selectFabric(f.fabric_name)}
                      >
                        ${f.fabric_image ? html`<img
                              class="aca-list__thumb"
                              src=${f.fabric_image}
                              alt=""
                              loading="lazy"
                              width="48"
                              height="48"
                            />` : html`<span class="aca-list__thumb" aria-hidden="true"></span>`}
                        <span class="aca-list__meta">
                          <span class="aca-list__name">${f.fabric_name}</span>
                          ${f.fabric_summary ? html`<span class="aca-list__hint">${f.fabric_summary}</span>` : nothing}
                        </span>
                        <span class="aca-list__check" aria-hidden="true">✓</span>
                      </button>
                    </li>
                  `
    )}
              </ul>
              ${this.filteredFabrics.length ? nothing : html`<p class="aca-empty-inline">${t("لا توجد نتائج", "No results")}</p>`}
            </aside>

            ${fabric ? html`<article class="aca-panel" aria-live="polite">
                  <div class="aca-panel__hero">
                    ${fabric.fabric_image ? html`<img
                          class="aca-panel__hero-bg"
                          src=${fabric.fabric_image}
                          alt=""
                          loading="eager"
                          decoding="async"
                        />` : nothing}
                    <div class="aca-panel__hero-content">
                      <span class="aca-kicker">${t("أتيليه العناية", "Care atelier")}</span>
                      <h3 class="aca-panel__title">${fabric.fabric_name}</h3>
                      ${fabric.fabric_summary ? html`<p class="aca-panel__summary">${fabric.fabric_summary}</p>` : nothing}
                    </div>
                  </div>

                  <div class="aca-panel__body">
                    <section class="aca-block aca-block--ritual">
                      <h4 class="aca-section-title">
                        ${t("طقوس العناية بأناقة", "An elegant care ritual")}
                      </h4>
                      ${steps.length ? html`<div class="aca-journey" aria-label=${t("خطوات العناية", "Care steps")}>
                            ${steps.map(
      (step, i) => html`
                                <div class="aca-step">
                                  <span class="aca-step__num" aria-hidden="true">${i + 1}</span>
                                  <p class="aca-step__title">${t(step.labelAr, step.labelEn)}</p>
                                  <p class="aca-step__text">${step.value}</p>
                                </div>
                              `
    )}
                          </div>` : html`<p class="aca-empty-inline">
                            ${t("لا توجد خطوات عناية لهذه الخامة", "No care steps for this fabric")}
                          </p>`}
                    </section>

                    <section
                      class="aca-block aca-block--allows"
                      aria-labelledby="aca-allows-title"
                    >
                      <h4 class="aca-section-title" id="aca-allows-title">
                        ${t("ما المسموح؟", "What is allowed?")}
                      </h4>
                      <div class="aca-allows" aria-label=${t("الأجهزة المسموحة", "Allowed appliances")}>
                        ${this._renderAllow(t("غسالة", "Washer"), fabric.allow_washer)}
                        ${this._renderAllow(t("مجفف", "Dryer"), fabric.allow_dryer)}
                        ${this._renderAllow(t("بخار", "Steam"), fabric.allow_steam)}
                      </div>
                    </section>

                    ${fabric.wash_temp || fabric.stain || fabric.embroidery_warn ? html`<section class="aca-block aca-block--notes">
                          <h4 class="aca-section-title">
                            ${t("ملاحظات إضافية", "Extra notes")}
                          </h4>
                          <div class="aca-notes">
                            ${fabric.wash_temp ? html`<p class="aca-extra">
                                  <strong>${t("حرارة الغسيل:", "Wash temp:")}</strong>
                                  ${fabric.wash_temp}
                                </p>` : nothing}
                            ${fabric.stain ? html`<p class="aca-extra">
                                  <strong>${t("إزالة البقع:", "Stain removal:")}</strong>
                                  ${fabric.stain}
                                </p>` : nothing}
                            ${fabric.embroidery_warn ? html`<p class="aca-extra">
                                  <strong>${t("تنبيه التطريز:", "Embroidery note:")}</strong>
                                  ${fabric.embroidery_warn}
                                </p>` : nothing}
                          </div>
                        </section>` : nothing}

                    <div class="aca-actions">
                      <button type="button" class="fs-btn" @click=${this._copyCare}>
                        ${copyBtn}
                      </button>
                      <button type="button" class="fs-btn fs-btn--ghost" @click=${this._printCare}>
                        ${printBtn}
                      </button>
                    </div>
                  </div>
                </article>` : nothing}
          </div>
        </div>

        ${this.showToast ? html`<div class="aca-toast" role="status" aria-live="polite">${copiedMsg}</div>` : nothing}

        ${fabric ? this._renderPrintCard(fabric) : nothing}
        ${renderCommerceOutcome(this.config || {}, "aca_")}
      </section>
    `;
  }
  _renderAllow(label, allowed) {
    return html`
      <div class="aca-allow ${allowed ? "aca-allow--yes" : "aca-allow--no"}">
        <span class="aca-allow__icon" aria-hidden="true">${allowed ? "✓" : "✕"}</span>
        <span class="aca-allow__label">
          <strong>${label}</strong>
          <span>${allowed ? t("مسموح", "Allowed") : t("غير مسموح", "Not allowed")}</span>
        </span>
      </div>
    `;
  }
  _renderPrintCard(fabric) {
    const steps = buildCareSteps(fabric);
    return html`
      <div class="aca-print-card" aria-hidden="true">
        <h1>${fabric.fabric_name}</h1>
        ${fabric.fabric_summary ? html`<p>${fabric.fabric_summary}</p>` : nothing}
        <ol>
          ${steps.map(
      (s) => html`<li><strong>${t(s.labelAr, s.labelEn)}:</strong> ${s.value}</li>`
    )}
        </ol>
        ${fabric.wash_temp ? html`<p>${t("حرارة الغسيل", "Wash temp")}: ${fabric.wash_temp}</p>` : nothing}
        ${fabric.stain ? html`<p>${t("إزالة البقع", "Stain")}: ${fabric.stain}</p>` : nothing}
        ${fabric.embroidery_warn ? html`<p>${t("تنبيه التطريز", "Embroidery")}: ${fabric.embroidery_warn}</p>` : nothing}
      </div>
    `;
  }
}, __name(_a, "_AbayaCareAssistant"), _a.fontsReady = !1, _a.styles = [sharedSectionCss, componentStyles], _a);
__decorateClass([
  property({ type: Object })
], _AbayaCareAssistant.prototype, "config");
__decorateClass([
  state()
], _AbayaCareAssistant.prototype, "searchQuery");
__decorateClass([
  state()
], _AbayaCareAssistant.prototype, "selectedKey");
__decorateClass([
  state()
], _AbayaCareAssistant.prototype, "showToast");
let AbayaCareAssistant = _AbayaCareAssistant;
typeof AbayaCareAssistant < "u" && AbayaCareAssistant.registerSallaComponent("salla-abaya-care-assistant");
export {
  AbayaCareAssistant as default
};
