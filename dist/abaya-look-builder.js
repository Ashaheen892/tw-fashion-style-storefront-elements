import { css as C, LitElement as O, nothing as m, html as n } from "lit";
import { property as H, state as k } from "lit/decorators.js";
import { classMap as T } from "lit/directives/class-map.js";
import { styleMap as N } from "lit/directives/style-map.js";
import { j as U, k as V, n as S, l as p, f as $, d as E, i as M, e as q, s as A, t as l, h as y, c as B, r as F, p as K, a as R, b as Y } from "./sharedStyles-Cd7RKVf-.js";
const J = C`
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
function j(a) {
  const e = S(a), t = [];
  return e.forEach((r, s) => {
    const c = p(r.group_name) || p(r.group_key) || `تبويب ${s + 1}`, d = p(r.group_key) || c || `tab-${s}`, g = $(r.group_order, s + 1), v = S(
      r.items ?? r.pieces ?? r.products ?? r["alb_tabs.items"]
    );
    v.length && v.forEach((o, f) => {
      const h = p(o.piece_name).trim(), x = G(o.image), w = E(o.url), i = p(o.id).trim() || h || `${d}-${f + 1}`;
      !h && !x && !w || t.push({
        id: i,
        group_key: d,
        group_name: c,
        group_order: g,
        piece_name: h,
        image: x,
        price: $(o.price, 0),
        old_price: $(o.old_price, 0),
        url: w,
        is_default: f === 0 || M(o.is_default),
        color_note: p(o.color_note)
      });
    });
  }), t;
}
function G(a) {
  return q(a) || (typeof a == "string" ? a.trim() : p(a));
}
function P(a) {
  return S(a).map((e, t) => {
    const r = p(e.piece_name).trim(), s = G(e.image), c = E(e.url);
    return {
      id: p(e.id).trim() || r || `item-${t}`,
      group_key: p(e.group_key) || p(e.group_name) || "default",
      group_name: p(e.group_name) || p(e.group_key) || "default",
      group_order: $(e.group_order, 0),
      piece_name: r,
      image: s,
      price: $(e.price, 0),
      old_price: $(e.old_price, 0),
      url: c,
      is_default: M(e.is_default),
      color_note: p(e.color_note)
    };
  }).filter((e) => e.piece_name || e.image || e.url);
}
function Q(a) {
  return {
    id: a.id,
    group_key: a.group_key,
    group_name: a.group_name,
    group_order: a.group_order,
    piece_name: a.piece_name,
    image: a.image,
    price: a.price,
    old_price: a.old_price,
    url: a.url,
    is_default: a.is_default,
    color_note: a.color_note
  };
}
function W(a) {
  const e = j(a.alb_tabs), t = P(a.alb_items);
  return e.length ? e : t;
}
function D(a) {
  return (a && typeof a == "object" && !Array.isArray(a) && ("alb_tabs" in a || "alb_items" in a) ? W(a) : [...j(a), ...P(a)]).map((t) => Q(t));
}
async function X(a) {
  return D(a);
}
async function Z(a) {
  return X(a && typeof a == "object" ? a : {});
}
function L(a) {
  const e = U(a, "group_key"), t = [];
  for (const [r, s] of e) {
    const c = V(s, "group_order"), d = c[0];
    t.push({
      key: r,
      name: d.group_name || r,
      order: d.group_order,
      items: c
    });
  }
  return t.sort((r, s) => r.order - s.order);
}
function ee(a) {
  const e = {};
  for (const t of a) {
    const r = t.items.find((s) => s.is_default) || t.items[0];
    r && (e[t.key] = r.id);
  }
  return e;
}
function I(a, e, t) {
  const r = [];
  let s = 0, c = 0, d = 0;
  for (const g of a) {
    const v = e[g.key], o = g.items.find((h) => h.id === v);
    if (!o) continue;
    d += 1, s += o.price, o.old_price > o.price && (c += o.old_price - o.price);
    const f = o.color_note ? ` (${o.color_note})` : "";
    r.push(`${g.name}: ${o.piece_name}${f}`), o.url && r.push(`  ${o.url}`), o.price > 0 && r.push(`  ${o.price} ${t}`);
  }
  return { lines: r, total: s, count: d, savings: c };
}
var ae = Object.defineProperty, _ = (a, e, t, r) => {
  for (var s = void 0, c = a.length - 1, d; c >= 0; c--)
    (d = a[c]) && (s = d(e, t, s) || s);
  return s && ae(e, t, s), s;
};
const z = class z extends O {
  constructor() {
    super(...arguments), this.config = {}, this.activeGroup = "", this.selections = {}, this.statusMsg = "", this.statusError = !1, this.items = [], this.loading = !0, this.boundLangHandler = () => this.requestUpdate(), this.statusTimer = null, this.loadToken = 0;
  }
  get currency() {
    var e;
    return String(((e = this.config) == null ? void 0 : e.alb_currency) || "ر.س").trim() || "ر.س";
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler), this.loadItems();
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), this.statusTimer && clearTimeout(this.statusTimer), super.disconnectedCallback();
  }
  updated(e) {
    e.has("config") && this.loadItems();
  }
  get groups() {
    return L(this.items);
  }
  applyItems(e) {
    var r;
    this.items = e;
    const t = L(e);
    this.selections = ee(t), (!this.activeGroup || !t.some((s) => s.key === this.activeGroup)) && (this.activeGroup = ((r = t[0]) == null ? void 0 : r.key) || "");
  }
  async loadItems() {
    const e = ++this.loadToken, t = D(this.config || {});
    t.length ? (this.applyItems(t), this.loading = !1) : this.loading = !0;
    const r = await Z(this.config);
    e === this.loadToken && (this.applyItems(r), this.loading = !1);
  }
  selectItem(e, t) {
    this.selections = { ...this.selections, [e]: t };
  }
  getSelectedItems() {
    return this.groups.map((e) => {
      const t = this.selections[e.key], r = e.items.find((s) => s.id === t);
      return r ? { group: e, item: r } : null;
    }).filter((e) => !!e);
  }
  setStatus(e, t = !1) {
    this.statusMsg = e, this.statusError = t, this.statusTimer && clearTimeout(this.statusTimer), this.statusTimer = setTimeout(() => {
      this.statusMsg = "", this.statusError = !1;
    }, 4200);
  }
  async handleCopy() {
    const e = this.currency, t = I(this.groups, this.selections, e), r = [
      p(this.config.alb_title) || l("إطلالة مختارة", "Selected look"),
      "",
      ...t.lines,
      "",
      `${l("الإجمالي", "Total")}: ${y(t.total, e)}`,
      `${l("عدد القطع", "Pieces")}: ${t.count}`,
      t.savings > 0 ? `${l("التوفير", "Savings")}: ${y(t.savings, e)}` : ""
    ].filter(Boolean).join(`
`), s = await B(r);
    this.setStatus(
      s ? l("تم نسخ التفاصيل", "Details copied") : l("تعذر النسخ", "Could not copy"),
      !s
    );
  }
  render() {
    var w;
    const e = this.config || {}, t = F(e, "alb_"), r = t.animate && !K(), s = this.groups, c = this.currency, d = s.find((i) => i.key === this.activeGroup) || s[0], g = this.getSelectedItems(), v = g.map((i) => i.item), o = I(s, this.selections, c), f = p(e.alb_title), h = p(e.alb_desc), x = (w = v.find((i) => i.url)) == null ? void 0 : w.url;
    return n`
      <section
        class=${T({
      "fs-section": !0,
      "fs-animate": r
    })}
        style=${N(R(t))}
        aria-label=${f || l("منسقة الإطلالة", "Look builder")}
      >
        <div class="fs-container">
          ${f || h ? n`<div class="fs-header">
                ${f ? n`<h2 class="fs-title">${f}</h2>` : m}
                ${h ? n`<p class="fs-desc">${h}</p>` : m}
              </div>` : m}

          ${this.loading ? n`<div class="alb-studio">
                <div class="alb-loading" role="status">
                  ${l("جاري تحميل عناصر الإطلالة…", "Loading look items…")}
                </div>
              </div>` : s.length ? n`<div class="alb-studio">
                  <div class="alb-layout">
                    <div class="alb-picker">
                      <div
                        class="alb-tabs"
                        role="tablist"
                        aria-label=${l("تبويبات الإطلالة", "Look tabs")}
                      >
                        ${s.map(
      (i) => n`
                            <button
                              type="button"
                              class="alb-tab"
                              role="tab"
                              aria-selected=${this.activeGroup === i.key ? "true" : "false"}
                              @click=${() => {
        this.activeGroup = i.key;
      }}
                            >
                              ${i.name}${this.selections[i.key] ? " · ✓" : ""}
                            </button>
                          `
    )}
                      </div>

                      ${d ? n`
                            <p class="alb-panel-label">
                              ${l("اختاري من", "Choose from")} ${d.name}
                            </p>
                            <div class="alb-grid" role="list">
                              ${d.items.map((i) => {
      const b = this.selections[d.key] === i.id;
      return n`<div class="alb-slot" role="listitem">
                                  <article
                                    class=${T({
        "fs-card": !0,
        "alb-choice": !0,
        "alb-choice--selected": b
      })}
                                  >
                                    ${i.image ? n`<img
                                          class="alb-piece__thumb"
                                          src=${i.image}
                                          alt=${i.piece_name}
                                          loading="lazy"
                                          decoding="async"
                                        />` : m}
                                    <div class="alb-piece__meta">
                                      <span class="alb-piece__group">${d.name}</span>
                                      <strong class="alb-piece__name">
                                        ${i.piece_name || l("قطعة", "Piece")}
                                      </strong>
                                      ${i.color_note ? n`<span class="alb-piece__group">${i.color_note}</span>` : m}
                                      ${i.price > 0 ? n`<span class="alb-piece__price">
                                            ${y(i.price, c)}
                                          </span>` : m}
                                    </div>
                                    <div class="alb-actions">
                                      <button
                                        type="button"
                                        class="fs-btn ${b ? "fs-btn--ghost" : ""}"
                                        @click=${() => this.selectItem(d.key, i.id)}
                                      >
                                        ${b ? l("القطعة المختارة", "Selected") : l("اختيار القطعة", "Select piece")}
                                      </button>
                                      ${i.url ? n`<a
                                            class="fs-btn fs-btn--ghost"
                                            href=${i.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            ${l("عرض القطعة", "View piece")}
                                          </a>` : m}
                                    </div>
                                  </article>
                                </div>`;
    })}
                            </div>
                          ` : m}
                    </div>

                    <aside
                      class="alb-summary"
                      aria-label=${l("ملخص الإطلالة", "Look summary")}
                    >
                      <div class="alb-summary__head">
                        <h3 class="alb-summary__title">
                          ${l("ملخص الإطلالة", "Look summary")}
                        </h3>
                        <span class="alb-summary__badge">
                          ${o.count}
                          ${l("قطع", "pieces")}
                        </span>
                      </div>

                      ${g.length ? n`<div class="alb-pieces">
                            ${g.map(
      ({ group: i, item: b }) => n`
                                <div class="alb-piece">
                                  ${b.image ? n`<img
                                        class="alb-piece__thumb"
                                        src=${b.image}
                                        alt=""
                                        loading="lazy"
                                        decoding="async"
                                      />` : n`<span class="alb-piece__thumb" aria-hidden="true"></span>`}
                                  <span class="alb-piece__meta">
                                    <span class="alb-piece__group">${i.name}</span>
                                    <span class="alb-piece__name">${b.piece_name}</span>
                                  </span>
                                  ${b.price > 0 ? n`<span class="alb-piece__price">
                                        ${y(b.price, c)}
                                      </span>` : m}
                                  ${b.url ? n`<a
                                        class="alb-piece__link"
                                        href=${b.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        ${l("عرض القطعة", "View piece")}
                                      </a>` : m}
                                </div>
                              `
    )}
                          </div>` : n`<p class="alb-summary__empty">
                            ${l(
      "اختاري قطعاً لبناء إطلالتك",
      "Select pieces to build your look"
    )}
                          </p>`}

                      <div class="alb-stats">
                        <div class="alb-stat">
                          <span class="alb-stat__label">${l("عدد القطع", "Pieces")}</span>
                          <span class="alb-stat__value">${o.count}</span>
                        </div>
                        <div class="alb-stat alb-stat--accent">
                          <span class="alb-stat__label">${l("الإجمالي", "Total")}</span>
                          <span class="alb-stat__value">
                            ${y(o.total, c)}
                          </span>
                        </div>
                        ${o.savings > 0 ? n`<div class="alb-stat alb-stat--wide alb-stat--accent">
                              <span class="alb-stat__label">${l("التوفير", "Savings")}</span>
                              <span class="alb-stat__value">
                                ${y(o.savings, c)}
                              </span>
                            </div>` : m}
                      </div>

                      <div class="alb-actions">
                        <button type="button" class="fs-btn fs-btn--ghost" @click=${this.handleCopy}>
                          ${p(e.alb_copy_btn) || l("نسخ التفاصيل", "Copy details")}
                        </button>
                        ${x ? n`<a
                              class="fs-btn fs-btn--ghost"
                              href=${x}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              ${p(e.alb_view_btn) || l("عرض المختار", "View selected")}
                            </a>` : m}
                      </div>
                      ${this.statusMsg ? n`<p
                            class=${T({
      "alb-copy-msg": !0,
      "alb-copy-msg--error": this.statusError
    })}
                            role="status"
                          >
                            ${this.statusMsg}
                          </p>` : m}
                    </aside>
                  </div>
                </div>` : n`<div class="fs-empty">
                  ${l(
      "أضيفي تبويبات وعناصر مرئية لكل تبويب من إعدادات العنصر",
      "Add tabs and visual pieces for each tab from the element settings"
    )}
                </div>`}
        </div>
        ${Y(this.config || {}, "alb_")}
      </section>
    `;
  }
};
z.styles = [A, J, C`
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
let u = z;
_([
  H({ type: Object })
], u.prototype, "config");
_([
  k()
], u.prototype, "activeGroup");
_([
  k()
], u.prototype, "selections");
_([
  k()
], u.prototype, "statusMsg");
_([
  k()
], u.prototype, "statusError");
_([
  k()
], u.prototype, "items");
_([
  k()
], u.prototype, "loading");
typeof u < "u" && u.registerSallaComponent("salla-abaya-look-builder");
export {
  u as default
};
