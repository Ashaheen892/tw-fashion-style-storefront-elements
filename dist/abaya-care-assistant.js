import { css as A, LitElement as E, html as i, nothing as n } from "lit";
import { property as G, state as _ } from "lit/decorators.js";
import { classMap as L } from "lit/directives/class-map.js";
import { styleMap as F } from "lit/directives/style-map.js";
import { n as j, i as f, l as p, e as P, s as K, r as M, g as N, c as R, t as o, p as W, a as Q } from "./sharedStyles-BGb_aVO_.js";
const U = A`
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
        color-mix(in srgb, var(--accent-color, #8b5e4b) 8%, transparent),
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
    background: rgba(255, 255, 255, 0.95);
    color: var(--text-color, #2b211c);
    font: inherit;
    box-sizing: border-box;
    margin-bottom: 1.05rem;
  }

  .aca-search:focus-visible {
    outline: 2px solid color-mix(in srgb, #c9a86c 55%, var(--accent-color, #8b5e4b));
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
    background: #fff;
    transform: translateY(-1px);
  }

  .aca-list__item[aria-current='true'] {
    border-color: color-mix(in srgb, #c9a86c 55%, var(--accent-color, #8b5e4b));
    background: linear-gradient(
      120deg,
      color-mix(in srgb, var(--accent-color, #8b5e4b) 10%, #fff),
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
      var(--accent-color, #8b5e4b);
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
    background: linear-gradient(145deg, #b08d57, var(--accent-color, #8b5e4b));
    color: #fff;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-weight: 700;
    font-size: 1.05rem;
    box-shadow: 0 10px 18px color-mix(in srgb, var(--accent-color, #8b5e4b) 28%, transparent);
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
    background: #fff;
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
    background: color-mix(in srgb, #3d6b55 5%, #fff);
  }

  .aca-allow--yes .aca-allow__icon {
    background: color-mix(in srgb, #3d6b55 14%, #fff);
    color: #2f5a47;
  }

  .aca-allow--no {
    border-color: color-mix(in srgb, #8f4a45 24%, var(--border-color, #e8ddd6));
    background: color-mix(in srgb, #8f4a45 4%, #fff);
  }

  .aca-allow--no .aca-allow__icon {
    background: color-mix(in srgb, #8f4a45 12%, #fff);
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
    color: var(--accent-color, #8b5e4b);
    font-weight: 700;
  }

  .aca-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    padding-top: 0.2rem;
  }

  .aca-actions .fs-btn {
    border-radius: 2px;
    min-height: 2.85rem;
    letter-spacing: 0.03em;
    box-shadow: 0 10px 22px rgba(43, 33, 28, 0.1);
  }

  .aca-actions .fs-btn--ghost {
    box-shadow: none;
    border-color: color-mix(in srgb, #c9a86c 45%, var(--border-color, #e8ddd6));
  }

  .aca-toast {
    position: fixed;
    inset-inline: 1rem;
    bottom: 1rem;
    margin: 0 auto;
    max-width: 20rem;
    padding: 0.9rem 1.15rem;
    background: linear-gradient(135deg, #6b4a3d, var(--accent-color, #8b5e4b));
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
      background: #fff;
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
`, k = [
  "رابط المنتجات",
  "نص الزر",
  "product link",
  "products link",
  "button text",
  "products url",
  "btn text"
];
function v(t) {
  const a = t.replace(/[:：]\s*$/, "").trim().toLowerCase();
  return a ? k.some((r) => a === r.toLowerCase()) : !0;
}
function m(t) {
  const a = p(t).trim();
  if (!a) return "";
  let e = a.split(/\r?\n/).map((s) => s.trim()).filter((s) => s && !v(s)).join(`
`).trim();
  if (!e) return "";
  for (const s of k) {
    const d = new RegExp(`(?:^|[\\s،,])${s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[:：]?`, "gi");
    e = e.replace(d, " ").replace(/\s{2,}/g, " ").trim();
  }
  return v(e) ? "" : e;
}
function I(t) {
  return j(t).map((a) => ({
    fabric_name: p(a.fabric_name),
    fabric_image: P(a.fabric_image),
    fabric_summary: p(a.fabric_summary),
    pre_wash: m(a.pre_wash),
    wash: m(a.wash),
    dry: m(a.dry),
    iron: m(a.iron),
    store: m(a.store),
    stain: m(a.stain),
    embroidery_warn: m(a.embroidery_warn),
    wash_temp: m(a.wash_temp),
    allow_washer: f(a.allow_washer),
    allow_dryer: f(a.allow_dryer),
    allow_steam: f(a.allow_steam)
  })).filter((a) => a.fabric_name.trim() !== "");
}
function u(t) {
  return [
    { key: "pre_wash", labelAr: "قبل الغسيل", labelEn: "Pre-wash", value: t.pre_wash },
    { key: "wash", labelAr: "الغسيل", labelEn: "Wash", value: t.wash },
    { key: "dry", labelAr: "التجفيف", labelEn: "Dry", value: t.dry },
    { key: "iron", labelAr: "الكي", labelEn: "Iron", value: t.iron },
    { key: "store", labelAr: "التخزين", labelEn: "Storage", value: t.store }
  ].filter((r) => r.value.trim() !== "");
}
function V(t, a) {
  const r = [t.fabric_name];
  t.fabric_summary && r.push(t.fabric_summary);
  for (const e of u(t))
    r.push(`${a ? e.labelEn : e.labelAr}: ${e.value}`);
  return t.stain && r.push(`${a ? "Stain removal" : "إزالة البقع"}: ${t.stain}`), t.embroidery_warn && r.push(
    `${a ? "Embroidery note" : "تنبيه التطريز"}: ${t.embroidery_warn}`
  ), t.wash_temp && r.push(
    `${a ? "Wash temperature" : "حرارة الغسيل"}: ${t.wash_temp}`
  ), r.join(`
`);
}
function Y(t, a) {
  const r = a.trim().toLowerCase();
  return r ? t.filter(
    (e) => e.fabric_name.toLowerCase().includes(r) || e.fabric_summary.toLowerCase().includes(r)
  ) : t;
}
var B = Object.defineProperty, h = (t, a, r, e) => {
  for (var s = void 0, d = t.length - 1, b; d >= 0; d--)
    (b = t[d]) && (s = b(a, r, s) || s);
  return s && B(a, r, s), s;
}, c;
const g = (c = class extends E {
  constructor() {
    super(...arguments), this.config = {}, this.searchQuery = "", this.selectedKey = "", this.showToast = !1, this._onLangChange = () => this.requestUpdate(), this._toastTimer = null;
  }
  connectedCallback() {
    super.connectedCallback(), this._ensureFonts(), document.addEventListener("language-changed", this._onLangChange), this._ensureSelection(), this._syncVisibility();
  }
  _ensureFonts() {
    if (c.fontsReady || typeof document > "u") return;
    const a = "aca-luxury-fonts";
    if (document.getElementById(a)) {
      c.fontsReady = !0;
      return;
    }
    const r = document.createElement("link");
    r.id = a, r.rel = "stylesheet", r.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;500;600;700&display=swap", document.head.appendChild(r), c.fontsReady = !0;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("language-changed", this._onLangChange), this._toastTimer && (clearTimeout(this._toastTimer), this._toastTimer = null);
  }
  updated(a) {
    a.has("config") && this._ensureSelection(), this._syncVisibility();
  }
  get fabrics() {
    var a;
    return I((a = this.config) == null ? void 0 : a.aca_fabrics);
  }
  get filteredFabrics() {
    return Y(this.fabrics, this.searchQuery);
  }
  get theme() {
    return M(this.config, "aca_");
  }
  get selected() {
    return this.filteredFabrics.find((a) => a.fabric_name === this.selectedKey) || this.filteredFabrics[0] || null;
  }
  _syncVisibility() {
    this.style.display = this.fabrics.length ? "" : "none";
  }
  _ensureSelection() {
    const a = this.filteredFabrics;
    if (!a.length) {
      this.selectedKey = "";
      return;
    }
    a.some((r) => r.fabric_name === this.selectedKey) || (this.selectedKey = a[0].fabric_name);
  }
  _onSearch(a) {
    this.searchQuery = a.target.value, this._ensureSelection();
  }
  _selectFabric(a) {
    this.selectedKey = a;
  }
  async _copyCare() {
    const a = this.selected;
    if (!a) return;
    const r = N() === "en";
    await R(V(a, r)) && this._showCopiedToast();
  }
  _printCare() {
    window.print();
  }
  _showCopiedToast() {
    this.showToast = !0, this._toastTimer && clearTimeout(this._toastTimer), this._toastTimer = setTimeout(() => {
      this.showToast = !1, this._toastTimer = null;
    }, 2400);
  }
  _label(a, r, e) {
    var s;
    return p((s = this.config) == null ? void 0 : s[a], "") || o(r, e);
  }
  render() {
    var y, w;
    if (!this.fabrics.length)
      return i`<div class="fs-empty" role="status">
        ${o("لا توجد أقمشة متاحة", "No fabrics available")}
      </div>`;
    const a = this.theme, r = a.animate && !W(), e = this.selected, s = p((y = this.config) == null ? void 0 : y.aca_title), d = p((w = this.config) == null ? void 0 : w.aca_desc), b = this._label("aca_search_placeholder", "ابحثي عن الخامة...", "Search fabrics..."), C = this._label("aca_copy_btn", "نسخ التعليمات", "Copy instructions"), z = this._label("aca_print_btn", "طباعة البطاقة", "Print card"), T = this._label("aca_copied_msg", "تم النسخ بنجاح", "Copied successfully"), x = e ? u(e) : [];
    return i`
      <section
        class=${L({
      "fs-section": !0,
      "fs-animate": r
    })}
        style=${F(Q(a))}
        aria-label=${s || o("مساعد العناية بالعباية", "Abaya care assistant")}
      >
        <div class="fs-container">
          ${s || d ? i`<header class="fs-header">
                ${s ? i`<h2 class="fs-title">${s}</h2>` : n}
                ${d ? i`<p class="fs-desc">${d}</p>` : n}
              </header>` : n}

          <div class="aca-layout">
            <aside class="aca-sidebar">
              <label class="aca-sidebar__label" for="aca-search">
                ${o("اختاري الخامة", "Choose a fabric")}
              </label>
              <input
                id="aca-search"
                class="aca-search"
                type="search"
                .value=${this.searchQuery}
                placeholder=${b}
                @input=${this._onSearch}
                aria-label=${b}
              />
              <ul class="aca-list" role="listbox" aria-label=${o("قائمة الأقمشة", "Fabric list")}>
                ${this.filteredFabrics.map(
      (l) => i`
                    <li>
                      <button
                        type="button"
                        class="aca-list__item"
                        role="option"
                        aria-current=${l.fabric_name === (e == null ? void 0 : e.fabric_name) ? "true" : "false"}
                        @click=${() => this._selectFabric(l.fabric_name)}
                      >
                        ${l.fabric_image ? i`<img
                              class="aca-list__thumb"
                              src=${l.fabric_image}
                              alt=""
                              loading="lazy"
                              width="48"
                              height="48"
                            />` : i`<span class="aca-list__thumb" aria-hidden="true"></span>`}
                        <span class="aca-list__meta">
                          <span class="aca-list__name">${l.fabric_name}</span>
                          ${l.fabric_summary ? i`<span class="aca-list__hint">${l.fabric_summary}</span>` : n}
                        </span>
                        <span class="aca-list__check" aria-hidden="true">✓</span>
                      </button>
                    </li>
                  `
    )}
              </ul>
              ${this.filteredFabrics.length ? n : i`<p class="aca-empty-inline">${o("لا توجد نتائج", "No results")}</p>`}
            </aside>

            ${e ? i`<article class="aca-panel" aria-live="polite">
                  <div class="aca-panel__hero">
                    ${e.fabric_image ? i`<img
                          class="aca-panel__hero-bg"
                          src=${e.fabric_image}
                          alt=""
                          loading="eager"
                          decoding="async"
                        />` : n}
                    <div class="aca-panel__hero-content">
                      <span class="aca-kicker">${o("أتيليه العناية", "Care atelier")}</span>
                      <h3 class="aca-panel__title">${e.fabric_name}</h3>
                      ${e.fabric_summary ? i`<p class="aca-panel__summary">${e.fabric_summary}</p>` : n}
                    </div>
                  </div>

                  <div class="aca-panel__body">
                    <section class="aca-block aca-block--ritual">
                      <h4 class="aca-section-title">
                        ${o("طقوس العناية بأناقة", "An elegant care ritual")}
                      </h4>
                      ${x.length ? i`<div class="aca-journey" aria-label=${o("خطوات العناية", "Care steps")}>
                            ${x.map(
      (l, S) => i`
                                <div class="aca-step">
                                  <span class="aca-step__num" aria-hidden="true">${S + 1}</span>
                                  <p class="aca-step__title">${o(l.labelAr, l.labelEn)}</p>
                                  <p class="aca-step__text">${l.value}</p>
                                </div>
                              `
    )}
                          </div>` : i`<p class="aca-empty-inline">
                            ${o("لا توجد خطوات عناية لهذه الخامة", "No care steps for this fabric")}
                          </p>`}
                    </section>

                    <section
                      class="aca-block aca-block--allows"
                      aria-labelledby="aca-allows-title"
                    >
                      <h4 class="aca-section-title" id="aca-allows-title">
                        ${o("ما المسموح؟", "What is allowed?")}
                      </h4>
                      <div class="aca-allows" aria-label=${o("الأجهزة المسموحة", "Allowed appliances")}>
                        ${this._renderAllow(o("غسالة", "Washer"), e.allow_washer)}
                        ${this._renderAllow(o("مجفف", "Dryer"), e.allow_dryer)}
                        ${this._renderAllow(o("بخار", "Steam"), e.allow_steam)}
                      </div>
                    </section>

                    ${e.wash_temp || e.stain || e.embroidery_warn ? i`<section class="aca-block aca-block--notes">
                          <h4 class="aca-section-title">
                            ${o("ملاحظات إضافية", "Extra notes")}
                          </h4>
                          <div class="aca-notes">
                            ${e.wash_temp ? i`<p class="aca-extra">
                                  <strong>${o("حرارة الغسيل:", "Wash temp:")}</strong>
                                  ${e.wash_temp}
                                </p>` : n}
                            ${e.stain ? i`<p class="aca-extra">
                                  <strong>${o("إزالة البقع:", "Stain removal:")}</strong>
                                  ${e.stain}
                                </p>` : n}
                            ${e.embroidery_warn ? i`<p class="aca-extra">
                                  <strong>${o("تنبيه التطريز:", "Embroidery note:")}</strong>
                                  ${e.embroidery_warn}
                                </p>` : n}
                          </div>
                        </section>` : n}

                    <div class="aca-actions">
                      <button type="button" class="fs-btn" @click=${this._copyCare}>
                        ${C}
                      </button>
                      <button type="button" class="fs-btn fs-btn--ghost" @click=${this._printCare}>
                        ${z}
                      </button>
                    </div>
                  </div>
                </article>` : n}
          </div>
        </div>

        ${this.showToast ? i`<div class="aca-toast" role="status" aria-live="polite">${T}</div>` : n}

        ${e ? this._renderPrintCard(e) : n}
      </section>
    `;
  }
  _renderAllow(a, r) {
    return i`
      <div class="aca-allow ${r ? "aca-allow--yes" : "aca-allow--no"}">
        <span class="aca-allow__icon" aria-hidden="true">${r ? "✓" : "✕"}</span>
        <span class="aca-allow__label">
          <strong>${a}</strong>
          <span>${r ? o("مسموح", "Allowed") : o("غير مسموح", "Not allowed")}</span>
        </span>
      </div>
    `;
  }
  _renderPrintCard(a) {
    const r = u(a);
    return i`
      <div class="aca-print-card" aria-hidden="true">
        <h1>${a.fabric_name}</h1>
        ${a.fabric_summary ? i`<p>${a.fabric_summary}</p>` : n}
        <ol>
          ${r.map(
      (e) => i`<li><strong>${o(e.labelAr, e.labelEn)}:</strong> ${e.value}</li>`
    )}
        </ol>
        ${a.wash_temp ? i`<p>${o("حرارة الغسيل", "Wash temp")}: ${a.wash_temp}</p>` : n}
        ${a.stain ? i`<p>${o("إزالة البقع", "Stain")}: ${a.stain}</p>` : n}
        ${a.embroidery_warn ? i`<p>${o("تنبيه التطريز", "Embroidery")}: ${a.embroidery_warn}</p>` : n}
      </div>
    `;
  }
}, c.fontsReady = !1, c.styles = [K, U], c);
h([
  G({ type: Object })
], g.prototype, "config");
h([
  _()
], g.prototype, "searchQuery");
h([
  _()
], g.prototype, "selectedKey");
h([
  _()
], g.prototype, "showToast");
let $ = g;
typeof $ < "u" && $.registerSallaComponent("salla-abaya-care-assistant");
export {
  $ as default
};
