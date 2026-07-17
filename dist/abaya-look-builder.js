import { css as F, LitElement as Q, nothing as y, html as g } from "lit";
import { property as W, state as $ } from "lit/decorators.js";
import { classMap as O } from "lit/directives/class-map.js";
import { styleMap as X } from "lit/directives/style-map.js";
import { k as Z, m as R, n as H, l as b, d as T, i as z, b as A, u as ee, f as E, e as k, h as x, q as te, s as re, y as oe, t as l, j as S, c as ae, r as se, p as ie, a as ne } from "./sharedStyles-BGb_aVO_.js";
import { a as L, t as le, b as ce, u as de, f as ue, e as pe, c as me, r as be } from "./productPicker-DSFtCeT4.js";
const ge = F`
  .alb-studio {
    position: relative;
    overflow: hidden;
    padding: 1.25rem 1rem 1.4rem;
    border-radius: var(--section-radius, 18px);
    border: 1px solid var(--border-color, #e8ddd6);
    background:
      radial-gradient(circle at 10% 0%, color-mix(in srgb, var(--accent-color, #8b5e4b) 14%, transparent), transparent 42%),
      radial-gradient(circle at 95% 100%, color-mix(in srgb, var(--accent-color, #8b5e4b) 10%, transparent), transparent 40%),
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
    color: var(--accent-color, #8b5e4b);
  }

  .alb-tab[aria-selected='true']::after {
    background: var(--accent-color, #8b5e4b);
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
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 12%, var(--card-bg, #fff));
    color: var(--accent-color, #8b5e4b);
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
      radial-gradient(circle at top, color-mix(in srgb, var(--accent-color, #8b5e4b) 8%, transparent), transparent 55%),
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
    color: var(--accent-color, #8b5e4b);
    white-space: nowrap;
  }

  .alb-piece__link {
    grid-column: 1 / -1;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--accent-color, #8b5e4b);
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
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 8%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--accent-color, #8b5e4b) 12%, var(--border-color, #e8ddd6));
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
    color: var(--accent-color, #8b5e4b);
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
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 10%, var(--card-bg, #fff));
    color: var(--accent-color, #8b5e4b);
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
function N(e) {
  const t = !!b(e.name).trim(), o = !!(k(e.image) || k(e.thumbnail) || k(e.main_image)), r = !!A(e.url || e.permalink), a = x(e.price) > 0 || x(e.sale_price) > 0 || x(e.regular_price) > 0;
  return t && (o || r || a);
}
function C(e) {
  return de(e);
}
function I(e) {
  return pe(e);
}
function K(e) {
  const t = C(e);
  for (const r of t)
    if (r != null) {
      if (typeof r == "number" || typeof r == "string") {
        const a = String(r).trim();
        if (a) return { id: a, label: "", hydrated: null };
      }
      if (typeof r == "object") {
        const a = r, s = I(a), i = b(a.label ?? a.name).trim(), n = N(a) ? a : null;
        if (s || n)
          return {
            id: s || String((n == null ? void 0 : n.id) ?? "").trim(),
            label: i,
            hydrated: n
          };
      }
    }
  const o = E(e);
  return o != null && o.id ? { id: o.id, label: o.name, hydrated: e } : null;
}
function fe(e) {
  return e.product ?? e.products ?? e.selected_product ?? e.chosen_products ?? e["alb_items.product"] ?? e["alb_tabs.products"];
}
function G(e) {
  const t = H(e), o = [];
  return t.forEach((r, a) => {
    const s = b(r.group_name) || b(r.group_key) || `تبويب ${a + 1}`, i = b(r.group_key) || s || `tab-${a}`, n = T(r.group_order, a + 1), p = r.products ?? r.product ?? r.chosen_products ?? r["alb_tabs.products"], c = C(p);
    c.length && c.forEach((m, f) => {
      const d = K(m);
      if (!(d != null && d.id) && !(d != null && d.hydrated)) return;
      const w = (d == null ? void 0 : d.id) || "";
      o.push({
        id: w ? `tab-${a}-product-${w}` : `tab-${a}-item-${f}`,
        group_key: i,
        group_name: s,
        group_order: n,
        product_id: w,
        product_label: (d == null ? void 0 : d.label) || "",
        hydrated: (d == null ? void 0 : d.hydrated) || null,
        piece_name: "",
        image: "",
        price: 0,
        old_price: 0,
        url: "",
        is_default: f === 0,
        color_note: ""
      });
    });
  }), o;
}
function _e(e) {
  return k(e) || (typeof e == "string" ? e.trim() : b(e));
}
function j(e) {
  return H(e).map((t, o) => {
    const r = K(fe(t)), a = (r == null ? void 0 : r.id) || "";
    return {
      id: a ? `product-${a}` : `item-${o}`,
      group_key: b(t.group_key) || b(t.group_name) || "default",
      group_name: b(t.group_name) || b(t.group_key) || "default",
      group_order: T(t.group_order, 0),
      product_id: a,
      product_label: (r == null ? void 0 : r.label) || "",
      hydrated: (r == null ? void 0 : r.hydrated) || null,
      piece_name: b(t.piece_name),
      image: _e(t.image),
      price: T(t.price, 0),
      old_price: T(t.old_price, 0),
      url: A(t.url),
      is_default: z(t.is_default),
      color_note: b(t.color_note)
    };
  }).filter((t) => t.product_id || t.piece_name || t.image || t.hydrated);
}
function he(e) {
  return {
    id: e.id,
    group_key: e.group_key,
    group_name: e.group_name,
    group_order: e.group_order,
    piece_name: e.piece_name || e.product_label,
    image: e.image,
    price: e.price,
    old_price: e.old_price,
    url: e.url,
    product_id: e.product_id,
    is_default: e.is_default,
    color_note: e.color_note,
    rating: 0
  };
}
function M(e, t) {
  const o = E(t), r = t && typeof t == "object" ? t : {}, a = e.piece_name || (o == null ? void 0 : o.name) || b(r.name) || e.product_label, s = e.image || (o == null ? void 0 : o.image) || k(r.image) || k(r.thumbnail) || k(r.main_image), i = e.url || (o == null ? void 0 : o.url) || A(r.url || r.permalink || r.link);
  let n = e.price > 0 ? e.price : (o == null ? void 0 : o.price) || 0, p = e.old_price > 0 ? e.old_price : (o == null ? void 0 : o.old_price) || 0;
  if (!(e.price > 0)) {
    const c = z(r.is_on_sale) || z(r.on_sale), m = x(r.sale_price), f = x(r.regular_price), d = x(r.price);
    c && m > 0 ? (n = m, p = f > m ? f : 0) : d > 0 && (n = d, f > d && (p = f));
  }
  return {
    id: e.id,
    group_key: e.group_key,
    group_name: e.group_name,
    group_order: e.group_order,
    piece_name: a,
    image: s,
    price: n,
    old_price: p,
    url: i,
    product_id: e.product_id || (o == null ? void 0 : o.id) || "",
    is_default: e.is_default,
    color_note: e.color_note,
    rating: (o == null ? void 0 : o.rating) || 0
  };
}
async function Y(e) {
  return ue(e);
}
function ye(e) {
  const t = te(e, "").toLowerCase();
  return !t || t === "none" ? "" : ["categories", "sales", "latest", "selected"].includes(t) ? t : "";
}
function ve(e, t, o) {
  const r = E(e);
  if (!r && (!e || typeof e != "object")) return null;
  const a = {
    id: `product-${(r == null ? void 0 : r.id) || o}`,
    group_key: t.key,
    group_name: t.name,
    group_order: t.order,
    product_id: (r == null ? void 0 : r.id) || I(e),
    product_label: (r == null ? void 0 : r.name) || "",
    piece_name: "",
    image: "",
    price: 0,
    old_price: 0,
    url: "",
    is_default: o === 0,
    color_note: ""
  };
  return M(a, e || r);
}
async function ke(e) {
  const t = ye(e.alb_products);
  if (!t) return [];
  const o = Math.max(1, Math.min(40, ee(e.alb_products_limit, 12))), r = b(e.alb_import_group_name) || "المنتجات", a = {
    key: b(e.alb_import_group_key) || r,
    name: r,
    order: T(e.alb_import_group_order, 0)
  };
  let s = [];
  if (t === "latest")
    s = await L({ source: "latest", limit: o });
  else if (t === "sales") {
    for (const i of [
      { source: "sales", source_value: "sales", limit: o },
      { source: "sales", limit: o },
      { source: "offers", limit: o }
    ])
      if (s = await L(i), s.length) break;
  } else if (t === "categories") {
    const i = le(
      C(e.alb_category).map((n) => I(n)).filter(Boolean)
    );
    i.length && (s = await L({
      source: "categories",
      source_value: i.length === 1 ? i[0] : i,
      limit: o
    }));
  } else if (t === "selected") {
    const i = C(e.alb_chosen_products), n = ce(e.alb_chosen_products).slice(0, o), p = /* @__PURE__ */ new Map();
    for (const m of i) {
      if (!m || typeof m != "object") continue;
      const f = m;
      if (!N(f)) continue;
      const d = I(f);
      d && p.set(d, f);
    }
    const c = n.filter((m) => !p.has(m));
    if (c.length) {
      const m = await Y(c);
      for (const [f, d] of m) p.set(f, d);
    }
    n.length ? s = n.map((m) => p.get(m)).filter(Boolean) : s = [...p.values()];
  }
  return s.slice(0, o).map((i, n) => ve(i, a, n)).filter(
    (i) => !!i && !!i.product_id && !!(i.piece_name || i.image)
  );
}
function $e(e) {
  return e.hydrated ? !0 : !!((e.piece_name || e.product_label) && (e.image || e.url || e.price > 0));
}
function B(e, t) {
  return t ? M(e, t) : e.hydrated ? M(e, e.hydrated) : he({
    ...e,
    piece_name: e.piece_name || e.product_label
  });
}
function P(e) {
  return !!e.product_id;
}
function J(e) {
  const t = G(e.alb_tabs), o = j(e.alb_items);
  return t.length ? t : o;
}
function xe(e) {
  return (e && typeof e == "object" && !Array.isArray(e) && ("alb_tabs" in e || "alb_items" in e) ? J(e) : [...G(e), ...j(e)]).filter((o) => o.product_id).map((o) => B(o)).filter(P);
}
async function we(e) {
  const t = (e && typeof e == "object" && !Array.isArray(e) && ("alb_tabs" in e || "alb_items" in e) ? J(e) : [...G(e), ...j(e)]).filter((a) => a.product_id), o = t.filter((a) => a.product_id && !$e(a)).map((a) => a.product_id), r = o.length ? await Y(o) : /* @__PURE__ */ new Map();
  return t.map((a) => a.product_id && r.has(a.product_id) ? B(a, r.get(a.product_id)) : B(a)).filter(P);
}
async function Se(e) {
  const t = e && typeof e == "object" ? e : {}, [o, r] = await Promise.all([
    we(t),
    ke(t)
  ]), a = r.filter(P), s = o.filter(P);
  if (!a.length) return s;
  if (!s.length) return a;
  const i = new Set(s.map((p) => p.product_id).filter(Boolean)), n = [...s];
  for (const p of a)
    i.has(p.product_id) || (i.add(p.product_id), n.push(p));
  return n;
}
function V(e) {
  const t = Z(e, "group_key"), o = [];
  for (const [r, a] of t) {
    const s = R(a, "group_order"), i = s[0];
    o.push({
      key: r,
      name: i.group_name || r,
      order: i.group_order,
      items: s
    });
  }
  return o.sort((r, a) => r.order - a.order);
}
function Te(e) {
  const t = {};
  for (const o of e) {
    const r = o.items.find((a) => a.is_default) || o.items[0];
    r && (t[o.key] = r.id);
  }
  return t;
}
function q(e, t, o) {
  const r = [];
  let a = 0, s = 0, i = 0;
  for (const n of e) {
    const p = t[n.key], c = n.items.find((f) => f.id === p);
    if (!c) continue;
    i += 1, a += c.price, c.old_price > c.price && (s += c.old_price - c.price);
    const m = c.color_note ? ` (${c.color_note})` : "";
    r.push(`${n.name}: ${c.piece_name}${m}`), c.url && r.push(`  ${c.url}`), c.price > 0 && r.push(`  ${c.price} ${o}`);
  }
  return { lines: r, total: a, count: i, savings: s };
}
var Ce = Object.defineProperty, v = (e, t, o, r) => {
  for (var a = void 0, s = e.length - 1, i; s >= 0; s--)
    (i = e[s]) && (a = i(t, o, a) || a);
  return a && Ce(t, o, a), a;
};
const U = class U extends Q {
  constructor() {
    super(...arguments), this.config = {}, this.activeGroup = "", this.selections = {}, this.statusMsg = "", this.statusError = !1, this.items = [], this.loading = !0, this.addingToCart = !1, this.boundLangHandler = () => this.requestUpdate(), this.statusTimer = null, this.loadToken = 0;
  }
  get currency() {
    return oe("ر.س");
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler), this.loadItems();
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), this.statusTimer && clearTimeout(this.statusTimer), super.disconnectedCallback();
  }
  updated(t) {
    t.has("config") && this.loadItems();
  }
  get groups() {
    return V(this.items);
  }
  applyItems(t) {
    var r;
    this.items = t;
    const o = V(t);
    this.selections = Te(o), (!this.activeGroup || !o.some((a) => a.key === this.activeGroup)) && (this.activeGroup = ((r = o[0]) == null ? void 0 : r.key) || "");
  }
  async loadItems() {
    const t = ++this.loadToken, o = xe(this.config || {});
    o.length ? (this.applyItems(o), this.loading = !1) : this.loading = !0;
    const r = await Se(this.config);
    t === this.loadToken && (this.applyItems(r), this.loading = !1);
  }
  selectItem(t, o) {
    this.selections = { ...this.selections, [t]: o };
  }
  getSelectedItems() {
    return this.groups.map((t) => {
      const o = this.selections[t.key], r = t.items.find((a) => a.id === o);
      return r ? { group: t, item: r } : null;
    }).filter((t) => !!t);
  }
  setStatus(t, o = !1) {
    this.statusMsg = t, this.statusError = o, this.statusTimer && clearTimeout(this.statusTimer), this.statusTimer = setTimeout(() => {
      this.statusMsg = "", this.statusError = !1;
    }, 4200);
  }
  async handleCopy() {
    const t = this.currency, o = q(this.groups, this.selections, t), r = [
      b(this.config.alb_title) || l("إطلالة مختارة", "Selected look"),
      "",
      ...o.lines,
      "",
      `${l("الإجمالي", "Total")}: ${S(o.total, t)}`,
      `${l("عدد القطع", "Pieces")}: ${o.count}`,
      o.savings > 0 ? `${l("التوفير", "Savings")}: ${S(o.savings, t)}` : ""
    ].filter(Boolean).join(`
`), a = await ae(r);
    this.setStatus(
      a ? l("تم نسخ التفاصيل", "Details copied") : l("تعذر النسخ", "Could not copy"),
      !a
    );
  }
  async handleAddToCart() {
    if (this.addingToCart) return;
    const t = this.getSelectedItems(), o = t.map(({ item: a }) => a.product_id).filter(Boolean);
    if (!o.length) {
      this.setStatus(
        l("اختاري قطعاً من المتجر أولاً", "Select store pieces first"),
        !0
      );
      return;
    }
    this.addingToCart = !0;
    const r = await me(o);
    if (this.addingToCart = !1, r.ok) {
      this.setStatus(
        r.error === "partial" ? l(
          "أُضيفت بعض القطع إلى السلة. تأكدي من السلة قبل الدفع.",
          "Some pieces were added. Check the cart before checkout."
        ) : l(
          `تمت إضافة ${r.added} قطعة إلى السلة`,
          `Added ${r.added} piece(s) to cart`
        )
      );
      return;
    }
    if (r.error === "unavailable") {
      this.setStatus(
        l(
          "السلة غير متاحة في المعاينة. افتحي صفحة المنتج للإضافة من المتجر.",
          "Cart is unavailable in preview. Open the product page to add it in the store."
        ),
        !0
      );
      const a = t.map(({ item: s }) => s.url).find(Boolean);
      a && window.open(a, "_blank", "noopener,noreferrer");
      return;
    }
    if (r.added > 0 || r.error === "partial") {
      this.setStatus(
        l(
          `أُضيفت ${r.added} قطعة، وتعذّر إكمال الباقي`,
          `Added ${r.added} piece(s); some could not be added`
        ),
        !0
      );
      return;
    }
    this.setStatus(
      l(
        "تعذّرت الإضافة. جرّبي فتح صفحة المنتج أو اختيار مقاس إن وُجد.",
        "Could not add. Try opening the product page or choosing a size if required."
      ),
      !0
    );
  }
  render() {
    var D;
    const t = this.config || {}, o = se(t, "alb_"), r = o.animate && !ie(), a = this.groups, s = this.currency, i = a.find((u) => u.key === this.activeGroup) || a[0], n = this.getSelectedItems(), p = n.map((u) => u.item), c = q(a, this.selections, s), m = b(t.alb_title), f = b(t.alb_desc), d = (D = p.find((u) => u.url)) == null ? void 0 : D.url, w = p.some((u) => u.product_id);
    return g`
      <section
        class=${O({
      "fs-section": !0,
      "fs-animate": r
    })}
        style=${X(ne(o))}
        aria-label=${m || l("منسقة الإطلالة", "Look builder")}
      >
        <div class="fs-container">
          ${m || f ? g`<div class="fs-header">
                ${m ? g`<h2 class="fs-title">${m}</h2>` : y}
                ${f ? g`<p class="fs-desc">${f}</p>` : y}
              </div>` : y}

          ${this.loading ? g`<div class="alb-studio">
                <div class="alb-loading" role="status">
                  ${l("جاري تحميل منتجات الإطلالة…", "Loading look products…")}
                </div>
              </div>` : a.length ? g`<div class="alb-studio">
                  <div class="alb-layout">
                    <div class="alb-picker">
                      <div
                        class="alb-tabs"
                        role="tablist"
                        aria-label=${l("تبويبات الإطلالة", "Look tabs")}
                      >
                        ${a.map(
      (u) => g`
                            <button
                              type="button"
                              class="alb-tab"
                              role="tab"
                              aria-selected=${this.activeGroup === u.key ? "true" : "false"}
                              @click=${() => {
        this.activeGroup = u.key;
      }}
                            >
                              ${u.name}${this.selections[u.key] ? " · ✓" : ""}
                            </button>
                          `
    )}
                      </div>

                      ${i ? g`
                            <p class="alb-panel-label">
                              ${l("اختاري من", "Choose from")} ${i.name}
                            </p>
                            <div class="alb-grid" role="list">
                              ${i.items.map((u) => {
      const h = this.selections[i.key] === u.id;
      return g`<div class="alb-slot" role="listitem">
                                  ${be(
        {
          id: u.product_id,
          name: u.piece_name,
          image: u.image,
          url: u.url,
          price: u.price,
          old_price: u.old_price,
          rating: u.rating,
          subtitle: u.color_note
        },
        {
          currency: s,
          selectable: !0,
          selected: h,
          wishlist: !0,
          viewLink: !0,
          onSelect: () => this.selectItem(i.key, u.id)
        }
      )}
                                </div>`;
    })}
                            </div>
                          ` : y}
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
                          ${c.count}
                          ${l("قطع", "pieces")}
                        </span>
                      </div>

                      ${n.length ? g`<div class="alb-pieces">
                            ${n.map(
      ({ group: u, item: h }) => g`
                                <div class="alb-piece">
                                  ${h.image ? g`<img
                                        class="alb-piece__thumb"
                                        src=${h.image}
                                        alt=""
                                        loading="lazy"
                                        decoding="async"
                                      />` : g`<span class="alb-piece__thumb" aria-hidden="true"></span>`}
                                  <span class="alb-piece__meta">
                                    <span class="alb-piece__group">${u.name}</span>
                                    <span class="alb-piece__name">${h.piece_name}</span>
                                  </span>
                                  ${h.price > 0 ? g`<span class="alb-piece__price">
                                        ${S(h.price, s)}
                                      </span>` : y}
                                  ${h.url ? g`<a
                                        class="alb-piece__link"
                                        href=${h.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        ${l("عرض القطعة", "View piece")}
                                      </a>` : y}
                                </div>
                              `
    )}
                          </div>` : g`<p class="alb-summary__empty">
                            ${l(
      "اختاري قطعاً لبناء إطلالتك",
      "Select pieces to build your look"
    )}
                          </p>`}

                      <div class="alb-stats">
                        <div class="alb-stat">
                          <span class="alb-stat__label">${l("عدد القطع", "Pieces")}</span>
                          <span class="alb-stat__value">${c.count}</span>
                        </div>
                        <div class="alb-stat alb-stat--accent">
                          <span class="alb-stat__label">${l("الإجمالي", "Total")}</span>
                          <span class="alb-stat__value">
                            ${S(c.total, s)}
                          </span>
                        </div>
                        ${c.savings > 0 ? g`<div class="alb-stat alb-stat--wide alb-stat--accent">
                              <span class="alb-stat__label">${l("التوفير", "Savings")}</span>
                              <span class="alb-stat__value">
                                ${S(c.savings, s)}
                              </span>
                            </div>` : y}
                      </div>

                      <div class="alb-actions">
                        <button
                          type="button"
                          class="fs-btn"
                          ?disabled=${this.addingToCart || !w}
                          @click=${this.handleAddToCart}
                        >
                          ${this.addingToCart ? l("جاري الإضافة…", "Adding…") : b(t.alb_cart_btn) || l("أضيفي إلى السلة", "Add to cart")}
                        </button>
                        <button type="button" class="fs-btn fs-btn--ghost" @click=${this.handleCopy}>
                          ${b(t.alb_copy_btn) || l("نسخ التفاصيل", "Copy details")}
                        </button>
                        ${d ? g`<a
                              class="fs-btn fs-btn--ghost"
                              href=${d}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              ${b(t.alb_view_btn) || l("عرض المختار", "View selected")}
                            </a>` : y}
                      </div>
                      ${this.statusMsg ? g`<p
                            class=${O({
      "alb-copy-msg": !0,
      "alb-copy-msg--error": this.statusError
    })}
                            role="status"
                          >
                            ${this.statusMsg}
                          </p>` : y}
                    </aside>
                  </div>
                </div>` : g`<div class="fs-empty">
                  ${l(
      "أضيفي تبويبات من إعدادات العنصر واختاري منتجات لكل تبويب",
      "Add tabs in the element settings and pick products for each tab"
    )}
                </div>`}
        </div>
      </section>
    `;
  }
};
U.styles = [re, ge, F`
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
let _ = U;
v([
  W({ type: Object })
], _.prototype, "config");
v([
  $()
], _.prototype, "activeGroup");
v([
  $()
], _.prototype, "selections");
v([
  $()
], _.prototype, "statusMsg");
v([
  $()
], _.prototype, "statusError");
v([
  $()
], _.prototype, "items");
v([
  $()
], _.prototype, "loading");
v([
  $()
], _.prototype, "addingToCart");
typeof _ < "u" && _.registerSallaComponent("salla-abaya-look-builder");
export {
  _ as default
};
