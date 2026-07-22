var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, nothing, html } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { n as normalizeCollection, l as localizedString, d as extractLink, f as toNumber, e as extractImageUrl, s as sharedSectionCss, t, h as formatPrice, r as readSectionTheme, p as prefersReducedMotion, a as themeStyleMap, b as renderCommerceOutcome } from "./sharedStyles-Q5qADHV9.js";
const componentStyles = css`
  .acm-studio {
    position: relative;
    overflow: hidden;
    padding: 1.25rem 1rem 1.4rem;
    border-radius: var(--section-radius, 18px);
    border: 1px solid var(--border-color, #e8ddd6);
    background:
      radial-gradient(circle at 12% 0%, color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 14%, transparent), transparent 42%),
      radial-gradient(circle at 92% 100%, color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, transparent), transparent 40%),
      linear-gradient(180deg, color-mix(in srgb, var(--card-bg, #fff) 90%, #f4ebe4), var(--card-bg, #fff));
    box-shadow: 0 18px 42px rgba(43, 33, 28, 0.08);
  }

  .acm-toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.65rem;
    margin-bottom: 1rem;
  }

  .acm-hint {
    margin: 0;
    color: var(--muted-color, #7a6a62);
    font-size: 0.9rem;
    line-height: 1.55;
  }

  .acm-count {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.3rem 0.75rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, var(--card-bg, #fff));
    color: var(--accent-color, var(--fs-store-primary));
    font-size: 0.78rem;
    font-weight: 700;
    white-space: nowrap;
  }

  .acm-slots {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.55rem;
    margin-bottom: 1.15rem;
  }

  .acm-slot {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    min-height: 3.4rem;
    padding: 0.45rem 0.55rem;
    border-radius: calc(var(--section-radius, 18px) * 0.55);
    border: 1px dashed color-mix(in srgb, var(--border-color, #e8ddd6) 90%, transparent);
    background: color-mix(in srgb, var(--card-bg, #fff) 70%, transparent);
    transition: border-color 0.22s ease, background 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease;
  }

  .acm-slot--filled {
    border-style: solid;
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 35%, var(--border-color, #e8ddd6));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 6%, var(--card-bg, #fff));
    box-shadow: 0 8px 18px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, transparent);
  }

  .acm-slot__num {
    flex: 0 0 auto;
    width: 1.45rem;
    height: 1.45rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
    color: var(--accent-color, var(--fs-store-primary));
    font-size: 0.72rem;
    font-weight: 700;
  }

  .acm-slot__thumb {
    width: 2.35rem;
    height: 2.85rem;
    object-fit: cover;
    border-radius: 0.4rem;
    flex: 0 0 auto;
  }

  .acm-slot__meta {
    min-width: 0;
    flex: 1;
  }

  .acm-slot__name {
    display: block;
    font-size: 0.78rem;
    font-weight: 600;
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .acm-slot__empty {
    color: var(--muted-color, #7a6a62);
    font-size: 0.75rem;
  }

  .acm-slot__remove {
    flex: 0 0 auto;
    width: 1.5rem;
    height: 1.5rem;
    border: none;
    border-radius: 50%;
    background: transparent;
    color: var(--muted-color, #7a6a62);
    cursor: pointer;
    font-size: 1rem;
    line-height: 1;
  }

  .acm-slot__remove:hover {
    color: var(--text-color, #2b211c);
    background: color-mix(in srgb, var(--border-color, #e8ddd6) 55%, transparent);
  }

  .acm-picker {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(9.5rem, 1fr));
    gap: 0.85rem;
  }

  @media (min-width: 720px) {
    .acm-picker {
      grid-template-columns: repeat(auto-fill, minmax(11rem, 1fr));
      gap: 1rem;
    }
  }

  .acm-pick-slot {
    display: flex;
    min-width: 0;
  }

  .acm-pick-slot > .fs-product-card {
    width: 100%;
  }

  .acm-pick-slot.is-disabled {
    opacity: 0.42;
    pointer-events: none;
  }

  .acm-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem;
    justify-content: center;
    margin-top: 1.25rem;
  }

  .acm-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    justify-content: center;
    margin: 0 0 0.85rem;
    font-size: 0.75rem;
    color: var(--muted-color, #7a6a62);
  }

  .acm-legend__item {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
  }

  .acm-legend__swatch {
    width: 0.85rem;
    height: 0.85rem;
    border-radius: 0.25rem;
    border: 1px solid var(--border-color, #e8ddd6);
  }

  .acm-legend__swatch--same {
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
  }

  .acm-legend__swatch--best {
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 22%, var(--card-bg, #fff));
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 35%, transparent);
  }

  .acm-table-wrap {
    margin-top: 1.35rem;
    overflow-x: auto;
    border-radius: calc(var(--section-radius, 18px) * 0.85);
    border: 1px solid var(--border-color, #e8ddd6);
    background: var(--card-bg, #fff);
    box-shadow: 0 14px 34px rgba(43, 33, 28, 0.07);
    animation: acm-reveal 0.4s ease both;
  }

  .acm-user-hint {
    margin: 0;
    padding: 0.85rem 1rem 0;
    color: var(--muted-color, #7a6a62);
    font-size: 0.82rem;
    line-height: 1.55;
    text-align: center;
  }

  .acm-cell--input {
    padding: 0.55rem 0.65rem;
  }

  .acm-input {
    width: 100%;
    min-height: 44px;
    box-sizing: border-box;
    padding: 0.45rem 0.65rem;
    border: 1px solid var(--border-color, #e8ddd6);
    border-radius: 8px;
    background: color-mix(in srgb, var(--card-bg, #fff) 88%, var(--section-bg, #faf7f5));
    color: var(--text-color, #2b211c);
    font: inherit;
    font-size: 0.85rem;
  }

  .acm-input:focus {
    outline: 2px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, transparent);
    outline-offset: 1px;
    border-color: var(--accent-color, var(--fs-store-primary));
  }

  .acm-input::placeholder {
    color: color-mix(in srgb, var(--muted-color, #7a6a62) 75%, transparent);
  }

  .acm-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    min-width: 36rem;
  }

  .acm-table th,
  .acm-table td {
    padding: 0.85rem 0.95rem;
    border-bottom: 1px solid color-mix(in srgb, var(--border-color, #e8ddd6) 85%, transparent);
    text-align: start;
    vertical-align: middle;
    font-size: 0.9rem;
  }

  .acm-table tbody tr:last-child th,
  .acm-table tbody tr:last-child td {
    border-bottom: none;
  }

  .acm-table thead th {
    position: sticky;
    top: 0;
    z-index: 2;
    background:
      linear-gradient(180deg, color-mix(in srgb, var(--card-bg, #fff) 92%, #f3ebe4), var(--card-bg, #fff));
    font-weight: 700;
  }

  .acm-table__label {
    color: var(--muted-color, #7a6a62);
    font-weight: 600;
    white-space: nowrap;
    width: 9rem;
    background: color-mix(in srgb, var(--section-bg, #faf7f5) 55%, var(--card-bg, #fff));
  }

  .acm-table tbody tr:nth-child(even) td {
    background: color-mix(in srgb, var(--section-bg, #faf7f5) 35%, var(--card-bg, #fff));
  }

  .acm-cell--same {
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, var(--card-bg, #fff)) !important;
  }

  .acm-cell--best {
    position: relative;
    font-weight: 700;
    color: var(--accent-color, var(--fs-store-primary));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 14%, var(--card-bg, #fff)) !important;
  }

  .acm-cell__badge {
    display: inline-block;
    margin-inline-start: 0.35rem;
    padding: 0.1rem 0.4rem;
    border-radius: 999px;
    background: var(--accent-color, var(--fs-store-primary));
    color: #fff;
    font-size: 0.65rem;
    font-weight: 700;
    vertical-align: middle;
  }

  .acm-product-head {
    display: grid;
    gap: 0.45rem;
    justify-items: center;
    min-width: 9rem;
    padding: 0.25rem 0;
  }

  .acm-product-head__img {
    width: 5.25rem;
    height: 6.5rem;
    object-fit: cover;
    border-radius: calc(var(--section-radius, 18px) * 0.45);
    box-shadow: 0 10px 22px rgba(43, 33, 28, 0.14);
  }

  .acm-product-head__name {
    font-size: 0.88rem;
    font-weight: 700;
    line-height: 1.35;
    text-align: center;
  }

  .acm-product-head .fs-btn {
    width: 100%;
    justify-content: center;
  }

  @keyframes acm-reveal {
    from {
      opacity: 0;
      transform: translateY(0.55rem);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .acm-table-wrap {
      transition: none !important;
      animation: none !important;
    }
  }

  @media (max-width: 959px) {
    .acm-studio {
      padding: 1rem 0.75rem 1.15rem;
    }

    .acm-slots {
      grid-template-columns: 1fr;
      gap: 0.65rem;
    }

    .acm-slot__remove {
      width: 2.75rem;
      height: 2.75rem;
      display: grid;
      place-items: center;
      font-size: 1.2rem;
    }
  }

  @media (max-width: 639px) {
    .acm-picker {
      grid-template-columns: 1fr;
      gap: 0.65rem;
    }

    .acm-table {
      min-width: 28rem;
      font-size: 0.8rem;
    }

    .acm-product-head__img {
      width: 3.5rem;
      height: 4.4rem;
    }

    .acm-product-head,
    .acm-table__label {
      min-width: 6.25rem;
      width: auto;
    }

    .acm-table th,
    .acm-table td {
      padding: 0.55rem 0.55rem;
      font-size: 0.78rem;
    }

    .acm-table-wrap {
      margin-inline: -0.25rem;
      padding-bottom: 0.25rem;
    }
  }
`;
function criterionKeyFromLabel(label, index) {
  return label.trim().toLowerCase().replace(/\s+/g, "-") || `criterion-${index + 1}`;
}
__name(criterionKeyFromLabel, "criterionKeyFromLabel");
function parseAttributes(raw) {
  return normalizeCollection(raw).map((item, index) => {
    const label = localizedString(item.label).trim(), value = localizedString(item.value).trim(), key = localizedString(item.key).trim() || criterionKeyFromLabel(label, index);
    return { key, label: label || key, value };
  }).filter((a) => a.label && a.value);
}
__name(parseAttributes, "parseAttributes");
function peekCompareProducts(raw) {
  return normalizeCollection(raw).map((item, index) => ({
    id: localizedString(item.id).trim() || localizedString(item.name).trim() || `item-${index}`,
    name: localizedString(item.name).trim(),
    image: extractImageUrl(item.image),
    price: toNumber(item.price, 0),
    old_price: toNumber(item.old_price, 0),
    url: extractLink(item.url),
    btn_text: localizedString(item.btn_text).trim(),
    attributes: parseAttributes(item.attributes)
  })).filter((item) => item.name || item.image || item.url || item.attributes.length);
}
__name(peekCompareProducts, "peekCompareProducts");
async function resolveCompareProducts(raw) {
  return peekCompareProducts(raw);
}
__name(resolveCompareProducts, "resolveCompareProducts");
function parseCriteria(raw, products = []) {
  const fromConfig = normalizeCollection(raw).map((item, index) => {
    const label = localizedString(item.label).trim(), key = localizedString(item.key).trim() || criterionKeyFromLabel(label, index);
    return { key, label: label || key };
  }).filter((c) => c.label);
  if (fromConfig.length) return fromConfig;
  const seen = /* @__PURE__ */ new Set(), fromProducts = [];
  for (const product of products)
    for (const attr of product.attributes) {
      const mark = attr.key || attr.label;
      !mark || seen.has(mark) || (seen.add(mark), fromProducts.push({ key: attr.key, label: attr.label }));
    }
  return fromProducts;
}
__name(parseCriteria, "parseCriteria");
function getAttributeValue(product, criterion) {
  const byKey = product.attributes.find((a) => a.key === criterion.key);
  if (byKey != null && byKey.value) return byKey.value;
  const labelNorm = criterion.label.trim().toLowerCase(), byLabel = product.attributes.find(
    (a) => a.label.trim().toLowerCase() === labelNorm
  );
  return (byLabel == null ? void 0 : byLabel.value) || "";
}
__name(getAttributeValue, "getAttributeValue");
function getDiscountPercent(price, oldPrice) {
  return !oldPrice || oldPrice <= price ? 0 : Math.round((oldPrice - price) / oldPrice * 100);
}
__name(getDiscountPercent, "getDiscountPercent");
function buildCompareRows(criteria) {
  return [
    {
      key: "price",
      labelAr: "السعر",
      labelEn: "Price",
      kind: "price",
      isPrice: !0
    },
    {
      key: "discount",
      labelAr: "الخصم",
      labelEn: "Discount",
      kind: "discount",
      isDiscount: !0
    },
    ...criteria.map((c) => ({
      key: `attr:${c.key}`,
      labelAr: c.label,
      labelEn: c.label,
      kind: "attr",
      criterionKey: c.key,
      highlightIdentical: !0
    }))
  ];
}
__name(buildCompareRows, "buildCompareRows");
function rowHighlights(row, selected, criteria) {
  const identical = /* @__PURE__ */ new Set();
  let bestPriceId = null, bestDiscountId = null;
  if (row.highlightIdentical && row.criterionKey && selected.length > 1) {
    const criterion = criteria.find((c) => c.key === row.criterionKey);
    if (criterion) {
      const values = selected.map((p) => getAttributeValue(p, criterion).trim().toLowerCase()).filter(Boolean);
      values.length === selected.length && values.every((v) => v === values[0]) && selected.forEach((p) => identical.add(p.id));
    }
  }
  if (row.isPrice) {
    const priced = selected.filter((p) => p.price > 0);
    if (priced.length) {
      const min = Math.min(...priced.map((p) => p.price)), winners = priced.filter((p) => p.price === min);
      winners.length === 1 && (bestPriceId = winners[0].id);
    }
  }
  if (row.isDiscount) {
    const discounted = selected.map((p) => ({
      id: p.id,
      pct: getDiscountPercent(p.price, p.old_price)
    })).filter((d) => d.pct > 0);
    if (discounted.length) {
      const max = Math.max(...discounted.map((d) => d.pct)), winners = discounted.filter((d) => d.pct === max);
      winners.length === 1 && (bestDiscountId = winners[0].id);
    }
  }
  return { identical, bestPriceId, bestDiscountId };
}
__name(rowHighlights, "rowHighlights");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const MAX_COMPARE = 3, MIN_COMPARE = 2, _AbayaComparisonArena = class _AbayaComparisonArena extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.products = [], this.productsLoading = !1, this.selectedIds = [], this.showTable = !1, this.loadToken = 0, this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler), this.loadProducts();
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(changed) {
    changed.has("config") && (this.selectedIds = [], this.showTable = !1, this.loadProducts());
  }
  get criteria() {
    var _a;
    return parseCriteria((_a = this.config) == null ? void 0 : _a.acm_criteria, this.products);
  }
  get selected() {
    return this.selectedIds.map((id) => this.products.find((p) => p.id === id)).filter((p) => !!p);
  }
  get currency() {
    var _a;
    return String(((_a = this.config) == null ? void 0 : _a.acm_currency) || "ر.س").trim() || "ر.س";
  }
  async loadProducts() {
    var _a, _b;
    const token = ++this.loadToken, instant = peekCompareProducts((_a = this.config) == null ? void 0 : _a.acm_products);
    instant.length ? (this.products = instant, this.productsLoading = !1) : this.productsLoading = !0;
    const list = await resolveCompareProducts((_b = this.config) == null ? void 0 : _b.acm_products);
    token === this.loadToken && (this.products = list, this.productsLoading = !1, this.selectedIds = this.selectedIds.filter(
      (id) => list.some((p) => p.id === id)
    ), this.selectedIds.length < MIN_COMPARE && (this.showTable = !1));
  }
  toggleProduct(id) {
    if (this.selectedIds.includes(id)) {
      this.selectedIds = this.selectedIds.filter((x) => x !== id), this.selectedIds.length < MIN_COMPARE && (this.showTable = !1);
      return;
    }
    this.selectedIds.length >= MAX_COMPARE || (this.selectedIds = [...this.selectedIds, id]);
  }
  removeProduct(id) {
    this.selectedIds = this.selectedIds.filter((x) => x !== id), this.selectedIds.length < MIN_COMPARE && (this.showTable = !1);
  }
  clearAll() {
    this.selectedIds = [], this.showTable = !1;
  }
  renderChoiceCard(product, isSelected, disabled) {
    return html`
      <article
        class=${classMap({
      "acm-pick-slot": !0,
      "is-disabled": disabled,
      "acm-pick-slot--selected": isSelected
    })}
      >
        ${product.image ? html`<img
              class="acm-product-head__img"
              src=${product.image}
              alt=${product.name}
              loading="lazy"
              decoding="async"
            />` : nothing}
        <div class="acm-product-head">
          <span class="acm-product-head__name">${product.name || t("عنصر", "Item")}</span>
          ${product.price > 0 ? html`<strong>${formatPrice(product.price, this.currency)}</strong>` : nothing}
          ${product.old_price > product.price && product.price > 0 ? html`<span class="acm-slot__empty">
                ${formatPrice(product.old_price, this.currency)}
              </span>` : nothing}
        </div>
        <div class="acm-actions">
          <button
            type="button"
            class="fs-btn ${isSelected ? "fs-btn--ghost" : ""}"
            ?disabled=${disabled}
            @click=${() => {
      disabled || this.toggleProduct(product.id);
    }}
          >
            ${isSelected ? t("إزالة من المقارنة", "Remove") : t("اختيار للمقارنة", "Compare")}
          </button>
          ${product.url ? html`<a class="fs-btn fs-btn--ghost" href=${product.url}>
                ${product.btn_text || t("عرض", "View")}
              </a>` : nothing}
        </div>
      </article>
    `;
  }
  formatCellValue(rowKey, product, criterionKey) {
    if (rowKey === "price")
      return product.price > 0 ? formatPrice(product.price, this.currency) : "—";
    if (rowKey === "discount") {
      const pct = getDiscountPercent(product.price, product.old_price);
      return pct > 0 ? `${pct}%` : "—";
    }
    if (criterionKey) {
      const criterion = this.criteria.find((c) => c.key === criterionKey);
      if (criterion)
        return getAttributeValue(product, criterion) || "—";
    }
    return "—";
  }
  _renderSlots(selected) {
    return html`
      <div class="acm-slots" aria-label=${t("خانات المقارنة", "Comparison slots")}>
        ${Array.from({ length: MAX_COMPARE }, (_, i) => {
      const product = selected[i];
      return html`
            <div
              class=${classMap({
        "acm-slot": !0,
        "acm-slot--filled": !!product
      })}
            >
              <span class="acm-slot__num" aria-hidden="true">${i + 1}</span>
              ${product ? html`
                    ${product.image ? html`<img
                          class="acm-slot__thumb"
                          src=${product.image}
                          alt=""
                          loading="lazy"
                          decoding="async"
                        />` : nothing}
                    <span class="acm-slot__meta">
                      <span class="acm-slot__name">${product.name}</span>
                    </span>
                    <button
                      type="button"
                      class="acm-slot__remove"
                      aria-label=${t("إزالة", "Remove") + " " + product.name}
                      @click=${() => this.removeProduct(product.id)}
                    >
                      ×
                    </button>
                  ` : html`<span class="acm-slot__empty">
                    ${t("فارغة", "Empty")}
                  </span>`}
            </div>
          `;
    })}
      </div>
    `;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "acm_"), animate = theme.animate && !prefersReducedMotion(), products = this.products, selected = this.selected;
    this.currency;
    const atMax = this.selectedIds.length >= MAX_COMPARE, canCompare = selected.length >= MIN_COMPARE, title = localizedString(c.acm_title), desc = localizedString(c.acm_desc), criteria = this.criteria, rows = buildCompareRows(criteria);
    return html`
      <section
        class=${classMap({
      "fs-section": !0,
      "fs-animate": animate
    })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("مقارنة العبايات", "Compare abayas")}
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header fs-header--editorial">
                <p class="fs-eyebrow">${t("مقارنة ذكية", "Smart compare")}</p>
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                <span class="fs-title-line" aria-hidden="true"></span>
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}

          ${this.productsLoading ? html`<div class="fs-empty" role="status">
                ${t("جاري تحميل المنتجات...", "Loading products...")}
              </div>` : products.length ? html`<div class="acm-studio">
                  <div class="acm-toolbar">
                    <p class="acm-hint">
                      ${localizedString(c.acm_select_hint) || t(
      "اختر من 2 إلى 3 عبايات ثم اضغط قارن",
      "Pick 2 to 3 abayas, then tap Compare"
    )}
                    </p>
                    <span class="acm-count" aria-live="polite">
                      ${selected.length} / ${MAX_COMPARE}
                      ${t("مختارة", "selected")}
                    </span>
                  </div>

                  ${this._renderSlots(selected)}

                  <div class="acm-picker" role="list">
                    ${products.map((p) => {
      const isSelected = this.selectedIds.includes(p.id), disabled = !isSelected && atMax;
      return html`
                        <div role="listitem">
                          ${this.renderChoiceCard(p, isSelected, disabled)}
                        </div>
                      `;
    })}
                  </div>

                  <div class="acm-actions">
                    <button
                      type="button"
                      class="fs-btn"
                      ?disabled=${!canCompare}
                      @click=${() => {
      this.showTable = !0;
    }}
                    >
                      ${localizedString(c.acm_compare_btn) || t("قارني", "Compare")}
                    </button>
                    <button
                      type="button"
                      class="fs-btn fs-btn--ghost"
                      ?disabled=${!selected.length}
                      @click=${this.clearAll}
                    >
                      ${localizedString(c.acm_clear_btn) || t("مسح الكل", "Clear all")}
                    </button>
                  </div>

                  ${this.showTable && canCompare ? html`
                        <div class="acm-table-wrap">
                          <p class="acm-user-hint">
                            ${localizedString(c.acm_user_hint) || t(
      "السعر من المتجر تلقائيًا — وبقية المقارنة من إعدادات كل منتج",
      "Price comes from the store — other rows come from each product’s settings"
    )}
                          </p>
                          <div class="acm-legend" aria-hidden="true">
                            <span class="acm-legend__item">
                              <span class="acm-legend__swatch acm-legend__swatch--best"></span>
                              ${t("أفضل قيمة", "Best value")}
                            </span>
                            <span class="acm-legend__item">
                              <span class="acm-legend__swatch acm-legend__swatch--same"></span>
                              ${t("متطابق", "Identical")}
                            </span>
                          </div>
                          <table class="acm-table">
                            <thead>
                              <tr>
                                <th class="acm-table__label">${t("الخاصية", "Attribute")}</th>
                                ${selected.map(
      (p) => html`
                                    <th>
                                      <div class="acm-product-head">
                                        ${p.image ? html`<img
                                              class="acm-product-head__img"
                                              src=${p.image}
                                              alt=${p.name}
                                              loading="lazy"
                                              decoding="async"
                                            />` : nothing}
                                        <span class="acm-product-head__name">${p.name}</span>
                                        ${p.url ? html`<a class="fs-btn fs-btn--ghost" href=${p.url}>
                                              ${p.btn_text || t("عرض", "View")}
                                            </a>` : nothing}
                                      </div>
                                    </th>
                                  `
    )}
                              </tr>
                            </thead>
                            <tbody>
                              ${rows.map((row) => {
      const hl = rowHighlights(row, selected, criteria);
      return html`
                                  <tr>
                                    <th class="acm-table__label" scope="row">
                                      ${t(row.labelAr, row.labelEn)}
                                    </th>
                                    ${selected.map((p) => {
        const same = hl.identical.has(p.id), best = hl.bestPriceId === p.id || hl.bestDiscountId === p.id, value = this.formatCellValue(
          row.key,
          p,
          row.criterionKey
        );
        return html`
                                        <td
                                          class=${classMap({
          "acm-cell--same": same,
          "acm-cell--best": best
        })}
                                        >
                                          ${value}
                                          ${best ? html`<span class="acm-cell__badge">
                                                ${t("الأفضل", "Best")}
                                              </span>` : nothing}
                                        </td>
                                      `;
      })}
                                  </tr>
                                `;
    })}
                            </tbody>
                          </table>
                        </div>
                      ` : nothing}
                </div>` : html`<div class="fs-empty" role="status">
                  ${t(
      "أضف منتجات المقارنة من إعدادات العنصر لعرضها هنا.",
      "Add comparison products from the element settings to show them here."
    )}
                </div>`}
        </div>
        ${renderCommerceOutcome(this.config || {}, "acm_")}
      </section>
    `;
  }
};
__name(_AbayaComparisonArena, "AbayaComparisonArena"), _AbayaComparisonArena.styles = [
  sharedSectionCss,
  componentStyles,
  css`
      :host {
        direction: inherit;
      }
    `
];
let AbayaComparisonArena = _AbayaComparisonArena;
__decorateClass([
  property({ type: Object })
], AbayaComparisonArena.prototype, "config");
__decorateClass([
  state()
], AbayaComparisonArena.prototype, "products");
__decorateClass([
  state()
], AbayaComparisonArena.prototype, "productsLoading");
__decorateClass([
  state()
], AbayaComparisonArena.prototype, "selectedIds");
__decorateClass([
  state()
], AbayaComparisonArena.prototype, "showTable");
typeof AbayaComparisonArena < "u" && AbayaComparisonArena.registerSallaComponent("salla-abaya-comparison-arena");
export {
  AbayaComparisonArena as default
};
