import { css as F, LitElement as W, nothing as _, html as u } from "lit";
import { property as X, state as x } from "lit/decorators.js";
import { classMap as D } from "lit/directives/class-map.js";
import { styleMap as Z } from "lit/directives/style-map.js";
import { k as R, m as ee, n as H, l as g, d as T, i as L, b as A, u as te, f as E, e as $, h as w, q as re, s as oe, y as ae, t as n, j as k, c as ie, r as se, p as ne, a as le } from "./sharedStyles-C1vUkqEN.js";
import { a as P, t as ce, b as de, u as pe, f as ue, e as me, c as be } from "./productPicker-Do8cFPDM.js";
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

  .alb-item {
    position: relative;
    display: grid;
    gap: 0;
    padding: 0;
    overflow: hidden;
    text-align: start;
    cursor: pointer;
    border: 1px solid var(--border-color, #e8ddd6);
    border-radius: calc(var(--section-radius, 18px) * 0.65);
    background: var(--card-bg, #fff);
    box-shadow: 0 10px 24px rgba(43, 33, 28, 0.06);
    transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
  }

  .alb-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 30px rgba(43, 33, 28, 0.1);
  }

  .alb-item[aria-pressed='true'] {
    border-color: var(--accent-color, #8b5e4b);
    box-shadow:
      0 0 0 2px color-mix(in srgb, var(--accent-color, #8b5e4b) 28%, transparent),
      0 14px 30px rgba(43, 33, 28, 0.1);
  }

  .alb-item__check {
    position: absolute;
    top: 0.5rem;
    inset-inline-end: 0.5rem;
    z-index: 2;
    width: 1.45rem;
    height: 1.45rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: var(--accent-color, #8b5e4b);
    color: #fff;
    font-size: 0.7rem;
    font-weight: 700;
    box-shadow: 0 6px 14px rgba(43, 33, 28, 0.2);
    opacity: 0;
    transform: scale(0.85);
    transition: opacity 0.2s, transform 0.2s;
  }

  .alb-item[aria-pressed='true'] .alb-item__check {
    opacity: 1;
    transform: scale(1);
  }

  .alb-item__media {
    position: relative;
    aspect-ratio: 3 / 4;
    overflow: hidden;
    background: linear-gradient(145deg, #3a2c26, #1c1613);
  }

  .alb-item__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .alb-item__body {
    padding: 0.65rem 0.7rem 0.8rem;
  }

  .alb-item__name {
    margin: 0 0 0.25rem;
    font-size: 0.82rem;
    font-weight: 700;
    line-height: 1.35;
    color: var(--text-color, #2b211c);
  }

  .alb-item__note {
    margin: 0 0 0.35rem;
    font-size: 0.72rem;
    color: var(--muted-color, #7a6a62);
    line-height: 1.4;
  }

  .alb-item__price {
    display: inline-flex;
    align-items: baseline;
    gap: 0.3rem;
    font-size: 0.82rem;
    font-weight: 700;
    color: var(--accent-color, #8b5e4b);
  }

  .alb-item__old {
    font-size: 0.7rem;
    font-weight: 500;
    color: var(--muted-color, #7a6a62);
    text-decoration: line-through;
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
    .alb-item,
    .alb-item__check,
    .alb-tab,
    .alb-mood-tile,
    .alb-copy-msg {
      transition: none !important;
      animation: none !important;
    }
  }
`;
function N(e) {
  const t = !!g(e.name).trim(), o = !!($(e.image) || $(e.thumbnail) || $(e.main_image)), r = !!A(e.url || e.permalink), a = w(e.price) > 0 || w(e.sale_price) > 0 || w(e.regular_price) > 0;
  return t && (o || r || a);
}
function C(e) {
  return pe(e);
}
function z(e) {
  return me(e);
}
function Y(e) {
  const t = C(e);
  for (const r of t)
    if (r != null) {
      if (typeof r == "number" || typeof r == "string") {
        const a = String(r).trim();
        if (a) return { id: a, label: "", hydrated: null };
      }
      if (typeof r == "object") {
        const a = r, i = z(a), s = g(a.label ?? a.name).trim(), l = N(a) ? a : null;
        if (i || l)
          return {
            id: i || String((l == null ? void 0 : l.id) ?? "").trim(),
            label: s,
            hydrated: l
          };
      }
    }
  const o = E(e);
  return o != null && o.id ? { id: o.id, label: o.name, hydrated: e } : null;
}
function fe(e) {
  return e.product ?? e.products ?? e.selected_product ?? e.chosen_products ?? e["alb_items.product"] ?? e["alb_tabs.products"];
}
function j(e) {
  const t = H(e), o = [];
  return t.forEach((r, a) => {
    const i = g(r.group_name) || g(r.group_key) || `تبويب ${a + 1}`, s = g(r.group_key) || i || `tab-${a}`, l = T(r.group_order, a + 1), m = r.products ?? r.product ?? r.chosen_products ?? r["alb_tabs.products"], d = C(m);
    d.length && d.forEach((b, f) => {
      const p = Y(b);
      if (!(p != null && p.id) && !(p != null && p.hydrated)) return;
      const S = (p == null ? void 0 : p.id) || "";
      o.push({
        id: S ? `tab-${a}-product-${S}` : `tab-${a}-item-${f}`,
        group_key: s,
        group_name: i,
        group_order: l,
        product_id: S,
        product_label: (p == null ? void 0 : p.label) || "",
        hydrated: (p == null ? void 0 : p.hydrated) || null,
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
  return $(e) || (typeof e == "string" ? e.trim() : g(e));
}
function G(e) {
  return H(e).map((t, o) => {
    const r = Y(fe(t)), a = (r == null ? void 0 : r.id) || "";
    return {
      id: a ? `product-${a}` : `item-${o}`,
      group_key: g(t.group_key) || g(t.group_name) || "default",
      group_name: g(t.group_name) || g(t.group_key) || "default",
      group_order: T(t.group_order, 0),
      product_id: a,
      product_label: (r == null ? void 0 : r.label) || "",
      hydrated: (r == null ? void 0 : r.hydrated) || null,
      piece_name: g(t.piece_name),
      image: _e(t.image),
      price: T(t.price, 0),
      old_price: T(t.old_price, 0),
      url: A(t.url),
      is_default: L(t.is_default),
      color_note: g(t.color_note)
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
    color_note: e.color_note
  };
}
function M(e, t) {
  const o = E(t), r = t && typeof t == "object" ? t : {}, a = e.piece_name || (o == null ? void 0 : o.name) || g(r.name) || e.product_label, i = e.image || (o == null ? void 0 : o.image) || $(r.image) || $(r.thumbnail) || $(r.main_image), s = e.url || (o == null ? void 0 : o.url) || A(r.url || r.permalink || r.link);
  let l = e.price > 0 ? e.price : (o == null ? void 0 : o.price) || 0, m = e.old_price > 0 ? e.old_price : (o == null ? void 0 : o.old_price) || 0;
  if (!(e.price > 0)) {
    const d = L(r.is_on_sale) || L(r.on_sale), b = w(r.sale_price), f = w(r.regular_price), p = w(r.price);
    d && b > 0 ? (l = b, m = f > b ? f : 0) : p > 0 && (l = p, f > p && (m = f));
  }
  return {
    id: e.id,
    group_key: e.group_key,
    group_name: e.group_name,
    group_order: e.group_order,
    piece_name: a,
    image: i,
    price: l,
    old_price: m,
    url: s,
    product_id: e.product_id || (o == null ? void 0 : o.id) || "",
    is_default: e.is_default,
    color_note: e.color_note
  };
}
async function K(e) {
  return ue(e);
}
function ye(e) {
  const t = re(e, "").toLowerCase();
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
    product_id: (r == null ? void 0 : r.id) || z(e),
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
  const o = Math.max(1, Math.min(40, te(e.alb_products_limit, 12))), r = g(e.alb_import_group_name) || "المنتجات", a = {
    key: g(e.alb_import_group_key) || r,
    name: r,
    order: T(e.alb_import_group_order, 0)
  };
  let i = [];
  if (t === "latest")
    i = await P({ source: "latest", limit: o });
  else if (t === "sales") {
    for (const s of [
      { source: "sales", source_value: "sales", limit: o },
      { source: "sales", limit: o },
      { source: "offers", limit: o }
    ])
      if (i = await P(s), i.length) break;
  } else if (t === "categories") {
    const s = ce(
      C(e.alb_category).map((l) => z(l)).filter(Boolean)
    );
    s.length && (i = await P({
      source: "categories",
      source_value: s.length === 1 ? s[0] : s,
      limit: o
    }));
  } else if (t === "selected") {
    const s = C(e.alb_chosen_products), l = de(e.alb_chosen_products).slice(0, o), m = /* @__PURE__ */ new Map();
    for (const b of s) {
      if (!b || typeof b != "object") continue;
      const f = b;
      if (!N(f)) continue;
      const p = z(f);
      p && m.set(p, f);
    }
    const d = l.filter((b) => !m.has(b));
    if (d.length) {
      const b = await K(d);
      for (const [f, p] of b) m.set(f, p);
    }
    l.length ? i = l.map((b) => m.get(b)).filter(Boolean) : i = [...m.values()];
  }
  return i.slice(0, o).map((s, l) => ve(s, a, l)).filter(
    (s) => !!s && !!s.product_id && !!(s.piece_name || s.image)
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
function I(e) {
  return !!e.product_id;
}
function J(e) {
  const t = j(e.alb_tabs), o = G(e.alb_items);
  return t.length ? t : o;
}
function xe(e) {
  return (e && typeof e == "object" && !Array.isArray(e) && ("alb_tabs" in e || "alb_items" in e) ? J(e) : [...j(e), ...G(e)]).filter((o) => o.product_id).map((o) => B(o)).filter(I);
}
async function we(e) {
  const t = (e && typeof e == "object" && !Array.isArray(e) && ("alb_tabs" in e || "alb_items" in e) ? J(e) : [...j(e), ...G(e)]).filter((a) => a.product_id), o = t.filter((a) => a.product_id && !$e(a)).map((a) => a.product_id), r = o.length ? await K(o) : /* @__PURE__ */ new Map();
  return t.map((a) => a.product_id && r.has(a.product_id) ? B(a, r.get(a.product_id)) : B(a)).filter(I);
}
async function Se(e) {
  const t = e && typeof e == "object" ? e : {}, [o, r] = await Promise.all([
    we(t),
    ke(t)
  ]), a = r.filter(I), i = o.filter(I);
  if (!a.length) return i;
  if (!i.length) return a;
  const s = new Set(i.map((m) => m.product_id).filter(Boolean)), l = [...i];
  for (const m of a)
    s.has(m.product_id) || (s.add(m.product_id), l.push(m));
  return l;
}
function O(e) {
  const t = R(e, "group_key"), o = [];
  for (const [r, a] of t) {
    const i = ee(a, "group_order"), s = i[0];
    o.push({
      key: r,
      name: s.group_name || r,
      order: s.group_order,
      items: i
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
  let a = 0, i = 0, s = 0;
  for (const l of e) {
    const m = t[l.key], d = l.items.find((f) => f.id === m);
    if (!d) continue;
    s += 1, a += d.price, d.old_price > d.price && (i += d.old_price - d.price);
    const b = d.color_note ? ` (${d.color_note})` : "";
    r.push(`${l.name}: ${d.piece_name}${b}`), d.url && r.push(`  ${d.url}`), d.price > 0 && r.push(`  ${d.price} ${o}`);
  }
  return { lines: r, total: a, count: s, savings: i };
}
var Ce = Object.defineProperty, v = (e, t, o, r) => {
  for (var a = void 0, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (a = s(t, o, a) || a);
  return a && Ce(t, o, a), a;
};
const U = class U extends W {
  constructor() {
    super(...arguments), this.config = {}, this.activeGroup = "", this.selections = {}, this.statusMsg = "", this.statusError = !1, this.items = [], this.loading = !0, this.addingToCart = !1, this.boundLangHandler = () => this.requestUpdate(), this.statusTimer = null, this.loadToken = 0;
  }
  get currency() {
    return ae("ر.س");
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
    return O(this.items);
  }
  applyItems(t) {
    var r;
    this.items = t;
    const o = O(t);
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
      g(this.config.alb_title) || n("إطلالة مختارة", "Selected look"),
      "",
      ...o.lines,
      "",
      `${n("الإجمالي", "Total")}: ${k(o.total, t)}`,
      `${n("عدد القطع", "Pieces")}: ${o.count}`,
      o.savings > 0 ? `${n("التوفير", "Savings")}: ${k(o.savings, t)}` : ""
    ].filter(Boolean).join(`
`), a = await ie(r);
    this.setStatus(
      a ? n("تم نسخ التفاصيل", "Details copied") : n("تعذر النسخ", "Could not copy"),
      !a
    );
  }
  async handleAddToCart() {
    if (this.addingToCart) return;
    const t = this.getSelectedItems(), o = t.map(({ item: a }) => a.product_id).filter(Boolean);
    if (!o.length) {
      this.setStatus(
        n("اختاري قطعاً من المتجر أولاً", "Select store pieces first"),
        !0
      );
      return;
    }
    this.addingToCart = !0;
    const r = await be(o);
    if (this.addingToCart = !1, r.ok) {
      this.setStatus(
        r.error === "partial" ? n(
          "أُضيفت بعض القطع إلى السلة. تأكدي من السلة قبل الدفع.",
          "Some pieces were added. Check the cart before checkout."
        ) : n(
          `تمت إضافة ${r.added} قطعة إلى السلة`,
          `Added ${r.added} piece(s) to cart`
        )
      );
      return;
    }
    if (r.error === "unavailable") {
      this.setStatus(
        n(
          "السلة غير متاحة في المعاينة. افتحي صفحة المنتج للإضافة من المتجر.",
          "Cart is unavailable in preview. Open the product page to add it in the store."
        ),
        !0
      );
      const a = t.map(({ item: i }) => i.url).find(Boolean);
      a && window.open(a, "_blank", "noopener,noreferrer");
      return;
    }
    if (r.added > 0 || r.error === "partial") {
      this.setStatus(
        n(
          `أُضيفت ${r.added} قطعة، وتعذّر إكمال الباقي`,
          `Added ${r.added} piece(s); some could not be added`
        ),
        !0
      );
      return;
    }
    this.setStatus(
      n(
        "تعذّرت الإضافة. جرّبي فتح صفحة المنتج أو اختيار مقاس إن وُجد.",
        "Could not add. Try opening the product page or choosing a size if required."
      ),
      !0
    );
  }
  render() {
    var V;
    const t = this.config || {}, o = se(t, "alb_"), r = o.animate && !ne(), a = this.groups, i = this.currency, s = a.find((c) => c.key === this.activeGroup) || a[0], l = this.getSelectedItems(), m = l.map((c) => c.item), d = q(a, this.selections, i), b = g(t.alb_title), f = g(t.alb_desc), p = (V = m.find((c) => c.url)) == null ? void 0 : V.url, S = m.some((c) => c.product_id);
    return u`
      <section
        class=${D({
      "fs-section": !0,
      "fs-animate": r
    })}
        style=${Z(le(o))}
        aria-label=${b || n("منسقة الإطلالة", "Look builder")}
      >
        <div class="fs-container">
          ${b || f ? u`<div class="fs-header">
                ${b ? u`<h2 class="fs-title">${b}</h2>` : _}
                ${f ? u`<p class="fs-desc">${f}</p>` : _}
              </div>` : _}

          ${this.loading ? u`<div class="alb-studio">
                <div class="alb-loading" role="status">
                  ${n("جاري تحميل منتجات الإطلالة…", "Loading look products…")}
                </div>
              </div>` : a.length ? u`<div class="alb-studio">
                  <div class="alb-layout">
                    <div class="alb-picker">
                      <div
                        class="alb-tabs"
                        role="tablist"
                        aria-label=${n("تبويبات الإطلالة", "Look tabs")}
                      >
                        ${a.map(
      (c) => u`
                            <button
                              type="button"
                              class="alb-tab"
                              role="tab"
                              aria-selected=${this.activeGroup === c.key ? "true" : "false"}
                              @click=${() => {
        this.activeGroup = c.key;
      }}
                            >
                              ${c.name}${this.selections[c.key] ? " · ✓" : ""}
                            </button>
                          `
    )}
                      </div>

                      ${s ? u`
                            <p class="alb-panel-label">
                              ${n("اختاري من", "Choose from")} ${s.name}
                            </p>
                            <div class="alb-grid" role="list">
                              ${s.items.map((c) => {
      const y = this.selections[s.key] === c.id;
      return u`
                                  <button
                                    type="button"
                                    class="alb-item"
                                    role="listitem"
                                    aria-pressed=${y ? "true" : "false"}
                                    @click=${() => this.selectItem(s.key, c.id)}
                                  >
                                    <span class="alb-item__check" aria-hidden="true">✓</span>
                                    <div class="alb-item__media">
                                      ${c.image ? u`<img
                                            class="alb-item__img"
                                            src=${c.image}
                                            alt=${c.piece_name}
                                            loading="lazy"
                                            decoding="async"
                                          />` : _}
                                      <span class="alb-item__store" aria-hidden="true">
                                        ${n("من المتجر", "Store")}
                                      </span>
                                    </div>
                                    <div class="alb-item__body">
                                      <p class="alb-item__name">${c.piece_name}</p>
                                      ${c.color_note ? u`<p class="alb-item__note">${c.color_note}</p>` : _}
                                      ${c.price > 0 ? u`<span class="alb-item__price">
                                            ${k(c.price, i)}
                                            ${c.old_price > c.price ? u`<span class="alb-item__old">
                                                  ${k(c.old_price, i)}
                                                </span>` : _}
                                          </span>` : _}
                                      ${c.url ? u`<a
                                            class="alb-item__link"
                                            href=${c.url}
                                            @click=${(Q) => Q.stopPropagation()}
                                          >
                                            ${n("عرض المنتج", "View product")}
                                          </a>` : _}
                                    </div>
                                  </button>
                                `;
    })}
                            </div>
                          ` : _}
                    </div>

                    <aside
                      class="alb-summary"
                      aria-label=${n("ملخص الإطلالة", "Look summary")}
                    >
                      <div class="alb-summary__head">
                        <h3 class="alb-summary__title">
                          ${n("ملخص الإطلالة", "Look summary")}
                        </h3>
                        <span class="alb-summary__badge">
                          ${d.count}
                          ${n("قطع", "pieces")}
                        </span>
                      </div>

                      ${l.length ? u`<div class="alb-pieces">
                            ${l.map(
      ({ group: c, item: y }) => u`
                                <div class="alb-piece">
                                  ${y.image ? u`<img
                                        class="alb-piece__thumb"
                                        src=${y.image}
                                        alt=""
                                        loading="lazy"
                                        decoding="async"
                                      />` : u`<span class="alb-piece__thumb" aria-hidden="true"></span>`}
                                  <span class="alb-piece__meta">
                                    <span class="alb-piece__group">${c.name}</span>
                                    <span class="alb-piece__name">${y.piece_name}</span>
                                  </span>
                                  ${y.price > 0 ? u`<span class="alb-piece__price">
                                        ${k(y.price, i)}
                                      </span>` : _}
                                  ${y.url ? u`<a
                                        class="alb-piece__link"
                                        href=${y.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        ${n("عرض القطعة", "View piece")}
                                      </a>` : _}
                                </div>
                              `
    )}
                          </div>` : u`<p class="alb-summary__empty">
                            ${n(
      "اختاري قطعاً لبناء إطلالتك",
      "Select pieces to build your look"
    )}
                          </p>`}

                      <div class="alb-stats">
                        <div class="alb-stat">
                          <span class="alb-stat__label">${n("عدد القطع", "Pieces")}</span>
                          <span class="alb-stat__value">${d.count}</span>
                        </div>
                        <div class="alb-stat alb-stat--accent">
                          <span class="alb-stat__label">${n("الإجمالي", "Total")}</span>
                          <span class="alb-stat__value">
                            ${k(d.total, i)}
                          </span>
                        </div>
                        ${d.savings > 0 ? u`<div class="alb-stat alb-stat--wide alb-stat--accent">
                              <span class="alb-stat__label">${n("التوفير", "Savings")}</span>
                              <span class="alb-stat__value">
                                ${k(d.savings, i)}
                              </span>
                            </div>` : _}
                      </div>

                      <div class="alb-actions">
                        <button
                          type="button"
                          class="fs-btn"
                          ?disabled=${this.addingToCart || !S}
                          @click=${this.handleAddToCart}
                        >
                          ${this.addingToCart ? n("جاري الإضافة…", "Adding…") : g(t.alb_cart_btn) || n("أضيفي إلى السلة", "Add to cart")}
                        </button>
                        <button type="button" class="fs-btn fs-btn--ghost" @click=${this.handleCopy}>
                          ${g(t.alb_copy_btn) || n("نسخ التفاصيل", "Copy details")}
                        </button>
                        ${p ? u`<a
                              class="fs-btn fs-btn--ghost"
                              href=${p}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              ${g(t.alb_view_btn) || n("عرض المختار", "View selected")}
                            </a>` : _}
                      </div>
                      ${this.statusMsg ? u`<p
                            class=${D({
      "alb-copy-msg": !0,
      "alb-copy-msg--error": this.statusError
    })}
                            role="status"
                          >
                            ${this.statusMsg}
                          </p>` : _}
                    </aside>
                  </div>
                </div>` : u`<div class="fs-empty">
                  ${n(
      "أضيفي تبويبات من إعدادات العنصر واختاري منتجات لكل تبويب",
      "Add tabs in the element settings and pick products for each tab"
    )}
                </div>`}
        </div>
      </section>
    `;
  }
};
U.styles = [oe, ge, F`
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
let h = U;
v([
  X({ type: Object })
], h.prototype, "config");
v([
  x()
], h.prototype, "activeGroup");
v([
  x()
], h.prototype, "selections");
v([
  x()
], h.prototype, "statusMsg");
v([
  x()
], h.prototype, "statusError");
v([
  x()
], h.prototype, "items");
v([
  x()
], h.prototype, "loading");
v([
  x()
], h.prototype, "addingToCart");
typeof h < "u" && h.registerSallaComponent("salla-abaya-look-builder");
export {
  h as default
};
