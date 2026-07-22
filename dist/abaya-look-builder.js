var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, nothing, html } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { j as groupByKey, k as sortByOrder, n as normalizeCollection, l as localizedString, f as toNumber, d as extractLink, i as isTruthy, e as extractImageUrl, s as sharedSectionCss, t, h as formatPrice, c as copyText, r as readSectionTheme, p as prefersReducedMotion, a as themeStyleMap, b as renderCommerceOutcome } from "./sharedStyles-Q5qADHV9.js";
const componentStyles = css`
  .alb-studio {
    position: relative;
    overflow: hidden;
    padding: 1.25rem 1rem 1.4rem;
    border-radius: var(--section-radius, 18px);
    border: 1px solid var(--border-color, #e8ddd6);
    background:
      radial-gradient(circle at 10% 0%, color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 14%, transparent), transparent 42%),
      radial-gradient(circle at 95% 100%, color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, transparent), transparent 40%),
      linear-gradient(180deg, color-mix(in srgb, var(--card-bg, #fff) 90%, #f4ebe4), var(--card-bg, #fff));
    box-shadow: 0 18px 42px rgba(43, 33, 28, 0.08);
  }

  .alb-layout {
    display: grid;
    gap: 1.35rem;
  }

  @media (min-width: 960px) {
    .alb-layout {
      grid-template-columns: 1.15fr 0.85fr;
      align-items: start;
      gap: 1.5rem;
    }
  }

  .alb-picker {
    min-width: 0;
  }

  .alb-tabs {
    display: flex;
    gap: 0;
    margin: 0 0 1.1rem;
    border-bottom: 1px solid var(--border-color, #e8ddd6);
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }

  .alb-tabs::-webkit-scrollbar {
    display: none;
  }

  .alb-tab {
    position: relative;
    flex: 0 0 auto;
    min-height: 46px;
    padding: 0.65rem 1.05rem;
    border: none;
    border-radius: 0;
    background: transparent;
    color: var(--muted-color, #7a6a62);
    font: inherit;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    transition: color 0.2s ease;
  }

  .alb-tab::after {
    content: '';
    position: absolute;
    inset-inline: 0.55rem;
    bottom: 0;
    height: 2px;
    border-radius: 1px;
    background: transparent;
    transition: background 0.2s ease;
  }

  .alb-tab:hover {
    color: var(--text-color, #2b211c);
  }

  .alb-tab[aria-selected='true'] {
    color: var(--accent-color, var(--fs-store-primary));
  }

  .alb-tab[aria-selected='true']::after {
    background: var(--button-bg, var(--accent-color, var(--fs-store-primary)));
  }

  .alb-panel-label {
    margin: 0 0 0.75rem;
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--muted-color, #7a6a62);
  }

  .alb-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(8.5rem, 1fr));
    gap: 0.85rem;
  }

  @media (min-width: 720px) {
    .alb-grid {
      grid-template-columns: repeat(auto-fill, minmax(9.5rem, 1fr));
    }
  }

  .alb-slot {
    display: flex;
    min-width: 0;
  }

  .alb-slot > .fs-product-card {
    width: 100%;
  }

  .alb-summary {
    position: sticky;
    top: 1rem;
    display: grid;
    gap: 1rem;
    padding: 1.15rem 1.05rem 1.2rem;
    border-radius: calc(var(--section-radius, 18px) * 0.85);
    border: 1px solid var(--border-color, #e8ddd6);
    background:
      linear-gradient(180deg, color-mix(in srgb, var(--card-bg, #fff) 88%, #f3ebe4), var(--card-bg, #fff));
    box-shadow: 0 14px 34px rgba(43, 33, 28, 0.08);
  }

  .alb-summary__head {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }

  .alb-summary__title {
    margin: 0;
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--text-color, #2b211c);
  }

  .alb-summary__badge {
    display: inline-flex;
    padding: 0.25rem 0.65rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
    color: var(--accent-color, var(--fs-store-primary));
    font-size: 0.72rem;
    font-weight: 700;
  }

  .alb-moodboard {
    position: relative;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.5rem;
    min-height: 10rem;
    padding: 0.55rem;
    border-radius: calc(var(--section-radius, 18px) * 0.65);
    border: 1px dashed color-mix(in srgb, var(--border-color, #e8ddd6) 90%, transparent);
    background:
      radial-gradient(circle at top, color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, transparent), transparent 55%),
      color-mix(in srgb, var(--section-bg, #faf7f5) 70%, var(--card-bg, #fff));
  }

  .alb-moodboard--empty {
    place-items: center;
    text-align: center;
    color: var(--muted-color, #7a6a62);
    font-size: 0.85rem;
    line-height: 1.55;
  }

  .alb-mood-tile {
    position: relative;
    overflow: hidden;
    border-radius: calc(var(--section-radius, 18px) * 0.45);
    aspect-ratio: 3 / 4;
    background: #1c1613;
    box-shadow: 0 8px 18px rgba(43, 33, 28, 0.12);
    animation: alb-pop 0.35s ease both;
  }

  .alb-mood-tile:nth-child(3n) {
    grid-column: span 2;
    aspect-ratio: 16 / 9;
  }

  .alb-mood-tile img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .alb-mood-tile__label {
    position: absolute;
    inset-inline: 0;
    bottom: 0;
    padding: 0.45rem 0.5rem;
    background: linear-gradient(180deg, transparent, rgba(20, 14, 12, 0.75));
    color: #fff;
    font-size: 0.68rem;
    font-weight: 600;
    line-height: 1.3;
  }

  .alb-pieces {
    display: grid;
    gap: 0.45rem;
  }

  .alb-piece {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 0.55rem;
    align-items: center;
    padding: 0.45rem 0.5rem;
    border-radius: calc(var(--section-radius, 18px) * 0.45);
    border: 1px solid color-mix(in srgb, var(--border-color, #e8ddd6) 80%, transparent);
    background: var(--card-bg, #fff);
  }

  .alb-piece__thumb {
    width: 2.4rem;
    height: 2.9rem;
    object-fit: cover;
    border-radius: 0.35rem;
    background: #2a211c;
  }

  .alb-piece__meta {
    min-width: 0;
  }

  .alb-piece__group {
    display: block;
    font-size: 0.68rem;
    font-weight: 600;
    color: var(--muted-color, #7a6a62);
    margin-bottom: 0.1rem;
  }

  .alb-piece__name {
    display: block;
    font-size: 0.82rem;
    font-weight: 700;
    color: var(--text-color, #2b211c);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .alb-piece__price {
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--accent-color, var(--fs-store-primary));
    white-space: nowrap;
  }

  .alb-piece__link {
    grid-column: 1 / -1;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--accent-color, var(--fs-store-primary));
    text-decoration: none;
  }

  .alb-piece__link:hover {
    text-decoration: underline;
  }

  .alb-stats {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.55rem;
  }

  .alb-stat {
    padding: 0.65rem 0.7rem;
    border-radius: calc(var(--section-radius, 18px) * 0.45);
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--border-color, #e8ddd6));
  }

  .alb-stat--wide {
    grid-column: 1 / -1;
  }

  .alb-stat__label {
    display: block;
    margin-bottom: 0.2rem;
    font-size: 0.72rem;
    color: var(--muted-color, #7a6a62);
    font-weight: 600;
  }

  .alb-stat__value {
    font-size: 1rem;
    font-weight: 700;
    color: var(--text-color, #2b211c);
  }

  .alb-stat--accent .alb-stat__value {
    color: var(--accent-color, var(--fs-store-primary));
  }

  .alb-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
  }

  .alb-actions .fs-btn {
    flex: 1 1 auto;
  }

  .alb-copy-msg {
    margin: 0;
    padding: 0.45rem 0.65rem;
    border-radius: calc(var(--section-radius, 18px) * 0.4);
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, var(--card-bg, #fff));
    color: var(--accent-color, var(--fs-store-primary));
    font-size: 0.8rem;
    font-weight: 600;
    text-align: center;
    animation: alb-pop 0.3s ease both;
  }

  @keyframes alb-pop {
    from {
      opacity: 0;
      transform: translateY(0.35rem) scale(0.98);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .alb-tab,
    .alb-mood-tile,
    .alb-copy-msg {
      transition: none !important;
      animation: none !important;
    }
  }
`;
function parseTabDrafts(raw) {
  const rows = normalizeCollection(raw), drafts = [];
  return rows.forEach((row, tabIndex) => {
    const group_name = localizedString(row.group_name) || localizedString(row.group_key) || `تبويب ${tabIndex + 1}`, group_key = localizedString(row.group_key) || group_name || `tab-${tabIndex}`, group_order = toNumber(row.group_order, tabIndex + 1), entries = normalizeCollection(
      row.items ?? row.pieces ?? row.products ?? row["alb_tabs.items"]
    );
    entries.length && entries.forEach((entry, productIndex) => {
      const pieceName = localizedString(entry.piece_name).trim(), image = readImage(entry.image), url = extractLink(entry.url), id = localizedString(entry.id).trim() || pieceName || `${group_key}-${productIndex + 1}`;
      !pieceName && !image && !url || drafts.push({
        id,
        group_key,
        group_name,
        group_order,
        piece_name: pieceName,
        image,
        price: toNumber(entry.price, 0),
        old_price: toNumber(entry.old_price, 0),
        url,
        is_default: productIndex === 0 || isTruthy(entry.is_default),
        color_note: localizedString(entry.color_note)
      });
    });
  }), drafts;
}
__name(parseTabDrafts, "parseTabDrafts");
function readImage(raw) {
  return extractImageUrl(raw) || (typeof raw == "string" ? raw.trim() : localizedString(raw));
}
__name(readImage, "readImage");
function parseLookItemDrafts(raw) {
  return normalizeCollection(raw).map((item, index) => {
    const pieceName = localizedString(item.piece_name).trim(), image = readImage(item.image), url = extractLink(item.url);
    return {
      id: localizedString(item.id).trim() || pieceName || `item-${index}`,
      group_key: localizedString(item.group_key) || localizedString(item.group_name) || "default",
      group_name: localizedString(item.group_name) || localizedString(item.group_key) || "default",
      group_order: toNumber(item.group_order, 0),
      piece_name: pieceName,
      image,
      price: toNumber(item.price, 0),
      old_price: toNumber(item.old_price, 0),
      url,
      is_default: isTruthy(item.is_default),
      color_note: localizedString(item.color_note)
    };
  }).filter((d) => d.piece_name || d.image || d.url);
}
__name(parseLookItemDrafts, "parseLookItemDrafts");
function draftToLookItem(draft) {
  return {
    id: draft.id,
    group_key: draft.group_key,
    group_name: draft.group_name,
    group_order: draft.group_order,
    piece_name: draft.piece_name,
    image: draft.image,
    price: draft.price,
    old_price: draft.old_price,
    url: draft.url,
    is_default: draft.is_default,
    color_note: draft.color_note
  };
}
__name(draftToLookItem, "draftToLookItem");
function collectLookDrafts(config) {
  const fromTabs = parseTabDrafts(config.alb_tabs), fromItems = parseLookItemDrafts(config.alb_items);
  return fromTabs.length ? fromTabs : fromItems;
}
__name(collectLookDrafts, "collectLookDrafts");
function peekLookItems(raw) {
  return (raw && typeof raw == "object" && !Array.isArray(raw) && ("alb_tabs" in raw || "alb_items" in raw) ? collectLookDrafts(raw) : [...parseTabDrafts(raw), ...parseLookItemDrafts(raw)]).map((draft) => draftToLookItem(draft));
}
__name(peekLookItems, "peekLookItems");
async function resolveLookItems(raw) {
  return peekLookItems(raw);
}
__name(resolveLookItems, "resolveLookItems");
async function resolveLookFromConfig(config) {
  return resolveLookItems(config && typeof config == "object" ? config : {});
}
__name(resolveLookFromConfig, "resolveLookFromConfig");
function buildLookGroups(items) {
  const map = groupByKey(items, "group_key"), groups = [];
  for (const [key, list] of map) {
    const sorted = sortByOrder(list, "group_order"), first = sorted[0];
    groups.push({
      key,
      name: first.group_name || key,
      order: first.group_order,
      items: sorted
    });
  }
  return groups.sort((a, b) => a.order - b.order);
}
__name(buildLookGroups, "buildLookGroups");
function defaultSelections(groups) {
  const selections = {};
  for (const group of groups) {
    const def = group.items.find((i) => i.is_default) || group.items[0];
    def && (selections[group.key] = def.id);
  }
  return selections;
}
__name(defaultSelections, "defaultSelections");
function buildLookSummary(groups, selections, currency) {
  const lines = [];
  let total = 0, savings = 0, count = 0;
  for (const group of groups) {
    const selectedId = selections[group.key], item = group.items.find((i) => i.id === selectedId);
    if (!item) continue;
    count += 1, total += item.price, item.old_price > item.price && (savings += item.old_price - item.price);
    const note = item.color_note ? ` (${item.color_note})` : "";
    lines.push(`${group.name}: ${item.piece_name}${note}`), item.url && lines.push(`  ${item.url}`), item.price > 0 && lines.push(`  ${item.price} ${currency}`);
  }
  return { lines, total, count, savings };
}
__name(buildLookSummary, "buildLookSummary");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const _AbayaLookBuilder = class _AbayaLookBuilder extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.activeGroup = "", this.selections = {}, this.statusMsg = "", this.statusError = !1, this.items = [], this.loading = !0, this.boundLangHandler = () => this.requestUpdate(), this.statusTimer = null, this.loadToken = 0;
  }
  get currency() {
    var _a;
    return String(((_a = this.config) == null ? void 0 : _a.alb_currency) || "ر.س").trim() || "ر.س";
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler), this.loadItems();
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), this.statusTimer && clearTimeout(this.statusTimer), super.disconnectedCallback();
  }
  updated(changed) {
    changed.has("config") && this.loadItems();
  }
  get groups() {
    return buildLookGroups(this.items);
  }
  applyItems(resolved) {
    var _a;
    this.items = resolved;
    const groups = buildLookGroups(resolved);
    this.selections = defaultSelections(groups), (!this.activeGroup || !groups.some((g) => g.key === this.activeGroup)) && (this.activeGroup = ((_a = groups[0]) == null ? void 0 : _a.key) || "");
  }
  async loadItems() {
    const token = ++this.loadToken, instant = peekLookItems(this.config || {});
    instant.length ? (this.applyItems(instant), this.loading = !1) : this.loading = !0;
    const resolved = await resolveLookFromConfig(this.config);
    token === this.loadToken && (this.applyItems(resolved), this.loading = !1);
  }
  selectItem(groupKey, itemId) {
    this.selections = { ...this.selections, [groupKey]: itemId };
  }
  getSelectedItems() {
    return this.groups.map((g) => {
      const id = this.selections[g.key], item = g.items.find((i) => i.id === id);
      return item ? { group: g, item } : null;
    }).filter((x) => !!x);
  }
  setStatus(msg, isError = !1) {
    this.statusMsg = msg, this.statusError = isError, this.statusTimer && clearTimeout(this.statusTimer), this.statusTimer = setTimeout(() => {
      this.statusMsg = "", this.statusError = !1;
    }, 4200);
  }
  async handleCopy() {
    const currency = this.currency, summary = buildLookSummary(this.groups, this.selections, currency), text = [
      localizedString(this.config.alb_title) || t("إطلالة مختارة", "Selected look"),
      "",
      ...summary.lines,
      "",
      `${t("الإجمالي", "Total")}: ${formatPrice(summary.total, currency)}`,
      `${t("عدد القطع", "Pieces")}: ${summary.count}`,
      summary.savings > 0 ? `${t("التوفير", "Savings")}: ${formatPrice(summary.savings, currency)}` : ""
    ].filter(Boolean).join(`
`), ok = await copyText(text);
    this.setStatus(
      ok ? t("تم نسخ التفاصيل", "Details copied") : t("تعذر النسخ", "Could not copy"),
      !ok
    );
  }
  render() {
    var _a;
    const c = this.config || {}, theme = readSectionTheme(c, "alb_"), animate = theme.animate && !prefersReducedMotion(), groups = this.groups, currency = this.currency, current = groups.find((g) => g.key === this.activeGroup) || groups[0], selectedPairs = this.getSelectedItems(), selectedItems = selectedPairs.map((p) => p.item), summary = buildLookSummary(groups, this.selections, currency), title = localizedString(c.alb_title), desc = localizedString(c.alb_desc), firstUrl = (_a = selectedItems.find((i) => i.url)) == null ? void 0 : _a.url;
    return html`
      <section
        class=${classMap({
      "fs-section": !0,
      "fs-animate": animate
    })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("منسقة الإطلالة", "Look builder")}
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}

          ${this.loading ? html`<div class="alb-studio">
                <div class="alb-loading" role="status">
                  ${t("جاري تحميل عناصر الإطلالة…", "Loading look items…")}
                </div>
              </div>` : groups.length ? html`<div class="alb-studio">
                  <div class="alb-layout">
                    <div class="alb-picker">
                      <div
                        class="alb-tabs"
                        role="tablist"
                        aria-label=${t("تبويبات الإطلالة", "Look tabs")}
                      >
                        ${groups.map(
      (g) => html`
                            <button
                              type="button"
                              class="alb-tab"
                              role="tab"
                              aria-selected=${this.activeGroup === g.key ? "true" : "false"}
                              @click=${() => {
        this.activeGroup = g.key;
      }}
                            >
                              ${g.name}${this.selections[g.key] ? " · ✓" : ""}
                            </button>
                          `
    )}
                      </div>

                      ${current ? html`
                            <p class="alb-panel-label">
                              ${t("اختاري من", "Choose from")} ${current.name}
                            </p>
                            <div class="alb-grid" role="list">
                              ${current.items.map((item) => {
      const selected = this.selections[current.key] === item.id;
      return html`<div class="alb-slot" role="listitem">
                                  <article
                                    class=${classMap({
        "fs-card": !0,
        "alb-choice": !0,
        "alb-choice--selected": selected
      })}
                                  >
                                    ${item.image ? html`<img
                                          class="alb-piece__thumb"
                                          src=${item.image}
                                          alt=${item.piece_name}
                                          loading="lazy"
                                          decoding="async"
                                        />` : nothing}
                                    <div class="alb-piece__meta">
                                      <span class="alb-piece__group">${current.name}</span>
                                      <strong class="alb-piece__name">
                                        ${item.piece_name || t("قطعة", "Piece")}
                                      </strong>
                                      ${item.color_note ? html`<span class="alb-piece__group">${item.color_note}</span>` : nothing}
                                      ${item.price > 0 ? html`<span class="alb-piece__price">
                                            ${formatPrice(item.price, currency)}
                                          </span>` : nothing}
                                    </div>
                                    <div class="alb-actions">
                                      <button
                                        type="button"
                                        class="fs-btn ${selected ? "fs-btn--ghost" : ""}"
                                        @click=${() => this.selectItem(current.key, item.id)}
                                      >
                                        ${selected ? t("القطعة المختارة", "Selected") : t("اختيار القطعة", "Select piece")}
                                      </button>
                                      ${item.url ? html`<a
                                            class="fs-btn fs-btn--ghost"
                                            href=${item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            ${t("عرض القطعة", "View piece")}
                                          </a>` : nothing}
                                    </div>
                                  </article>
                                </div>`;
    })}
                            </div>
                          ` : nothing}
                    </div>

                    <aside
                      class="alb-summary"
                      aria-label=${t("ملخص الإطلالة", "Look summary")}
                    >
                      <div class="alb-summary__head">
                        <h3 class="alb-summary__title">
                          ${t("ملخص الإطلالة", "Look summary")}
                        </h3>
                        <span class="alb-summary__badge">
                          ${summary.count}
                          ${t("قطع", "pieces")}
                        </span>
                      </div>

                      ${selectedPairs.length ? html`<div class="alb-pieces">
                            ${selectedPairs.map(
      ({ group, item }) => html`
                                <div class="alb-piece">
                                  ${item.image ? html`<img
                                        class="alb-piece__thumb"
                                        src=${item.image}
                                        alt=""
                                        loading="lazy"
                                        decoding="async"
                                      />` : html`<span class="alb-piece__thumb" aria-hidden="true"></span>`}
                                  <span class="alb-piece__meta">
                                    <span class="alb-piece__group">${group.name}</span>
                                    <span class="alb-piece__name">${item.piece_name}</span>
                                  </span>
                                  ${item.price > 0 ? html`<span class="alb-piece__price">
                                        ${formatPrice(item.price, currency)}
                                      </span>` : nothing}
                                  ${item.url ? html`<a
                                        class="alb-piece__link"
                                        href=${item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        ${t("عرض القطعة", "View piece")}
                                      </a>` : nothing}
                                </div>
                              `
    )}
                          </div>` : html`<p class="alb-summary__empty">
                            ${t(
      "اختاري قطعاً لبناء إطلالتك",
      "Select pieces to build your look"
    )}
                          </p>`}

                      <div class="alb-stats">
                        <div class="alb-stat">
                          <span class="alb-stat__label">${t("عدد القطع", "Pieces")}</span>
                          <span class="alb-stat__value">${summary.count}</span>
                        </div>
                        <div class="alb-stat alb-stat--accent">
                          <span class="alb-stat__label">${t("الإجمالي", "Total")}</span>
                          <span class="alb-stat__value">
                            ${formatPrice(summary.total, currency)}
                          </span>
                        </div>
                        ${summary.savings > 0 ? html`<div class="alb-stat alb-stat--wide alb-stat--accent">
                              <span class="alb-stat__label">${t("التوفير", "Savings")}</span>
                              <span class="alb-stat__value">
                                ${formatPrice(summary.savings, currency)}
                              </span>
                            </div>` : nothing}
                      </div>

                      <div class="alb-actions">
                        <button type="button" class="fs-btn fs-btn--ghost" @click=${this.handleCopy}>
                          ${localizedString(c.alb_copy_btn) || t("نسخ التفاصيل", "Copy details")}
                        </button>
                        ${firstUrl ? html`<a
                              class="fs-btn fs-btn--ghost"
                              href=${firstUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              ${localizedString(c.alb_view_btn) || t("عرض المختار", "View selected")}
                            </a>` : nothing}
                      </div>
                      ${this.statusMsg ? html`<p
                            class=${classMap({
      "alb-copy-msg": !0,
      "alb-copy-msg--error": this.statusError
    })}
                            role="status"
                          >
                            ${this.statusMsg}
                          </p>` : nothing}
                    </aside>
                  </div>
                </div>` : html`<div class="fs-empty">
                  ${t(
      "أضيفي تبويبات وعناصر مرئية لكل تبويب من إعدادات العنصر",
      "Add tabs and visual pieces for each tab from the element settings"
    )}
                </div>`}
        </div>
        ${renderCommerceOutcome(this.config || {}, "alb_")}
      </section>
    `;
  }
};
__name(_AbayaLookBuilder, "AbayaLookBuilder"), _AbayaLookBuilder.styles = [sharedSectionCss, componentStyles, css`
    :host {
      direction: inherit;
    }

    .alb-loading {
      display: grid;
      place-items: center;
      min-height: 12rem;
      color: var(--muted-color, #7a6a62);
      font-size: 0.92rem;
    }

    .alb-actions .fs-btn:disabled {
      opacity: 0.65;
      cursor: wait;
    }

    .alb-copy-msg--error {
      background: color-mix(in srgb, #8f4a45 10%, #fff);
      color: #8f4a45;
    }
  `];
let AbayaLookBuilder = _AbayaLookBuilder;
__decorateClass([
  property({ type: Object })
], AbayaLookBuilder.prototype, "config");
__decorateClass([
  state()
], AbayaLookBuilder.prototype, "activeGroup");
__decorateClass([
  state()
], AbayaLookBuilder.prototype, "selections");
__decorateClass([
  state()
], AbayaLookBuilder.prototype, "statusMsg");
__decorateClass([
  state()
], AbayaLookBuilder.prototype, "statusError");
__decorateClass([
  state()
], AbayaLookBuilder.prototype, "items");
__decorateClass([
  state()
], AbayaLookBuilder.prototype, "loading");
typeof AbayaLookBuilder < "u" && AbayaLookBuilder.registerSallaComponent("salla-abaya-look-builder");
export {
  AbayaLookBuilder as default
};
