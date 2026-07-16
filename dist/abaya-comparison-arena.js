import { css as N, LitElement as Y, nothing as b, html as l } from "lit";
import { property as q, state as z } from "lit/decorators.js";
import { classMap as C } from "lit/directives/class-map.js";
import { styleMap as R } from "lit/directives/style-map.js";
import { n as E, l as p, b as A, d as j, e as _, f as O, i as H, h as y, s as X, j as L, t as m, r as G, p as J, a as Q } from "./sharedStyles-C1vUkqEN.js";
import { f as W, u as Z, e as ee } from "./productPicker-Do8cFPDM.js";
const te = N`
  .acm-studio {
    position: relative;
    overflow: hidden;
    padding: 1.25rem 1rem 1.4rem;
    border-radius: var(--section-radius, 18px);
    border: 1px solid var(--border-color, #e8ddd6);
    background:
      radial-gradient(circle at 12% 0%, color-mix(in srgb, var(--accent-color, #8b5e4b) 14%, transparent), transparent 42%),
      radial-gradient(circle at 92% 100%, color-mix(in srgb, var(--accent-color, #8b5e4b) 10%, transparent), transparent 40%),
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
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 10%, var(--card-bg, #fff));
    color: var(--accent-color, #8b5e4b);
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
  }

  .acm-slot--filled {
    border-style: solid;
    border-color: color-mix(in srgb, var(--accent-color, #8b5e4b) 35%, var(--border-color, #e8ddd6));
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 6%, var(--card-bg, #fff));
  }

  .acm-slot__num {
    flex: 0 0 auto;
    width: 1.45rem;
    height: 1.45rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 12%, var(--card-bg, #fff));
    color: var(--accent-color, #8b5e4b);
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

  .acm-pick-card {
    position: relative;
    display: grid;
    gap: 0;
    padding: 0;
    overflow: hidden;
    text-align: start;
    cursor: pointer;
    border: 1px solid var(--border-color, #e8ddd6);
    border-radius: calc(var(--section-radius, 18px) * 0.7);
    background: var(--card-bg, #fff);
    box-shadow: 0 10px 26px rgba(43, 33, 28, 0.06);
    transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
  }

  .acm-pick-card:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 16px 32px rgba(43, 33, 28, 0.1);
  }

  .acm-pick-card[aria-pressed='true'] {
    border-color: var(--accent-color, #8b5e4b);
    box-shadow:
      0 0 0 2px color-mix(in srgb, var(--accent-color, #8b5e4b) 28%, transparent),
      0 16px 32px rgba(43, 33, 28, 0.1);
  }

  .acm-pick-card:disabled {
    opacity: 0.42;
    cursor: not-allowed;
  }

  .acm-pick-card__media {
    position: relative;
    aspect-ratio: 3 / 4;
    overflow: hidden;
    background: linear-gradient(145deg, #3a2c26, #1c1613);
  }

  .acm-pick-card__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .acm-pick-card__check {
    position: absolute;
    top: 0.55rem;
    inset-inline-end: 0.55rem;
    z-index: 2;
    width: 1.55rem;
    height: 1.55rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: var(--accent-color, #8b5e4b);
    color: #fff;
    font-size: 0.75rem;
    font-weight: 700;
    box-shadow: 0 6px 14px rgba(43, 33, 28, 0.22);
    opacity: 0;
    transform: scale(0.85);
    transition: opacity 0.2s, transform 0.2s;
  }

  .acm-pick-card[aria-pressed='true'] .acm-pick-card__check {
    opacity: 1;
    transform: scale(1);
  }

  .acm-pick-card__body {
    padding: 0.75rem 0.8rem 0.9rem;
  }

  .acm-pick-card__name {
    margin: 0 0 0.3rem;
    font-size: 0.9rem;
    font-weight: 700;
    line-height: 1.35;
    color: var(--text-color, #2b211c);
  }

  .acm-pick-card__price {
    display: inline-flex;
    align-items: baseline;
    gap: 0.35rem;
    font-size: 0.88rem;
    font-weight: 700;
    color: var(--accent-color, #8b5e4b);
  }

  .acm-pick-card__old {
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--muted-color, #7a6a62);
    text-decoration: line-through;
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
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 12%, var(--card-bg, #fff));
  }

  .acm-legend__swatch--best {
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 22%, var(--card-bg, #fff));
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--accent-color, #8b5e4b) 35%, transparent);
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
    outline: 2px solid color-mix(in srgb, var(--accent-color, #8b5e4b) 45%, transparent);
    outline-offset: 1px;
    border-color: var(--accent-color, #8b5e4b);
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
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 10%, var(--card-bg, #fff)) !important;
  }

  .acm-cell--best {
    position: relative;
    font-weight: 700;
    color: var(--accent-color, #8b5e4b);
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 14%, var(--card-bg, #fff)) !important;
  }

  .acm-cell__badge {
    display: inline-block;
    margin-inline-start: 0.35rem;
    padding: 0.1rem 0.4rem;
    border-radius: 999px;
    background: var(--accent-color, #8b5e4b);
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
    min-height: 2.75rem;
    padding: 0.45rem 0.85rem;
    font-size: 0.8rem;
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
    .acm-pick-card,
    .acm-pick-card__check,
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
function re(t) {
  return Z(t);
}
function ae(t) {
  return ee(t);
}
function ie(t) {
  const e = !!p(t.name).trim(), r = !!(_(t.image) || _(t.thumbnail) || _(t.main_image)), i = !!A(t.url || t.permalink), a = y(t.price) > 0 || y(t.sale_price) > 0 || y(t.regular_price) > 0;
  return e && (r || i || a);
}
function ce(t) {
  for (const r of re(t))
    if (r != null) {
      if (typeof r == "number" || typeof r == "string") {
        const i = String(r).trim();
        if (i) return { id: i, label: "", hydrated: null };
      }
      if (typeof r == "object") {
        const i = r, a = ae(i), c = p(i.label ?? i.name).trim(), o = ie(i) ? i : null;
        if (a || o)
          return {
            id: a || String((o == null ? void 0 : o.id) ?? "").trim(),
            label: c,
            hydrated: o
          };
      }
    }
  const e = O(t);
  return e != null && e.id ? {
    id: e.id,
    label: e.name,
    hydrated: t && typeof t == "object" ? t : null
  } : null;
}
function V(t, e) {
  return t.trim().toLowerCase().replace(/\s+/g, "-") || `criterion-${e + 1}`;
}
function oe(t) {
  return E(t).map((e, r) => {
    const i = p(e.label).trim(), a = p(e.value).trim(), c = p(e.key).trim() || V(i, r);
    return { key: c, label: i || c, value: a };
  }).filter((e) => e.label && e.value);
}
function U(t) {
  return E(t).map((e, r) => {
    const i = ce(
      e.product ?? e.products ?? e.selected_product
    ), a = (i == null ? void 0 : i.id) || "";
    return {
      id: a ? `product-${a}` : `item-${r}`,
      product_id: a,
      product_label: (i == null ? void 0 : i.label) || "",
      hydrated: (i == null ? void 0 : i.hydrated) || null,
      name: p(e.name),
      image: _(e.image),
      price: j(e.price, 0),
      old_price: j(e.old_price, 0),
      url: A(e.url),
      btn_text: p(e.btn_text),
      attributes: oe(e.attributes)
    };
  }).filter((e) => e.product_id || e.name || e.image || e.hydrated || e.attributes.length);
}
function ne(t) {
  return t.hydrated ? !0 : !!(t.name && (t.image || t.url || t.price > 0));
}
function S(t, e) {
  const r = e ? O(e) : null, i = e && typeof e == "object" ? e : null, a = t.name || (r == null ? void 0 : r.name) || (i ? p(i.name) : "") || t.product_label, c = t.image || (r == null ? void 0 : r.image) || (i ? _(i.image) || _(i.thumbnail) || _(i.main_image) : ""), o = t.url || (r == null ? void 0 : r.url) || (i ? A(i.url || i.permalink) : "");
  let n = t.price > 0 ? t.price : (r == null ? void 0 : r.price) || 0, d = t.old_price > 0 ? t.old_price : (r == null ? void 0 : r.old_price) || 0;
  if (!(t.price > 0) && i) {
    const u = H(i.is_on_sale) || H(i.on_sale), h = y(i.sale_price), f = y(i.regular_price), k = y(i.price);
    u && h > 0 ? (n = h, d = f > h ? f : 0) : k > 0 && (n = k, f > k && (d = f));
  }
  return {
    id: t.id,
    product_id: t.product_id || (r == null ? void 0 : r.id) || "",
    name: a,
    image: c,
    price: n,
    old_price: d,
    url: o,
    btn_text: t.btn_text,
    attributes: t.attributes
  };
}
function M(t, e) {
  return e ? S(t, e) : t.hydrated ? S(t, t.hydrated) : S(t);
}
function se(t) {
  return U(t).map((e) => M(e)).filter((e) => e.name || e.image || e.product_id || e.attributes.length);
}
async function le(t) {
  return W(t);
}
async function de(t) {
  const e = U(t), r = e.filter((a) => a.product_id && !ne(a)).map((a) => a.product_id), i = r.length ? await le(r) : /* @__PURE__ */ new Map();
  return e.map((a) => a.product_id && i.has(a.product_id) ? M(a, i.get(a.product_id)) : M(a)).filter((a) => a.name || a.image || a.product_id || a.attributes.length);
}
function me(t, e = []) {
  const r = E(t).map((c, o) => {
    const n = p(c.label).trim(), d = p(c.key).trim() || V(n, o);
    return { key: d, label: n || d };
  }).filter((c) => c.label);
  if (r.length) return r;
  const i = /* @__PURE__ */ new Set(), a = [];
  for (const c of e)
    for (const o of c.attributes) {
      const n = o.key || o.label;
      !n || i.has(n) || (i.add(n), a.push({ key: o.key, label: o.label }));
    }
  return a;
}
function F(t, e) {
  const r = t.attributes.find((c) => c.key === e.key);
  if (r != null && r.value) return r.value;
  const i = e.label.trim().toLowerCase(), a = t.attributes.find(
    (c) => c.label.trim().toLowerCase() === i
  );
  return (a == null ? void 0 : a.value) || "";
}
function T(t, e) {
  return !e || e <= t ? 0 : Math.round((e - t) / e * 100);
}
function pe(t) {
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
    ...t.map((e) => ({
      key: `attr:${e.key}`,
      labelAr: e.label,
      labelEn: e.label,
      kind: "attr",
      criterionKey: e.key,
      highlightIdentical: !0
    }))
  ];
}
function ue(t, e, r) {
  const i = /* @__PURE__ */ new Set();
  let a = null, c = null;
  if (t.highlightIdentical && t.criterionKey && e.length > 1) {
    const o = r.find((n) => n.key === t.criterionKey);
    if (o) {
      const n = e.map((d) => F(d, o).trim().toLowerCase()).filter(Boolean);
      n.length === e.length && n.every((d) => d === n[0]) && e.forEach((d) => i.add(d.id));
    }
  }
  if (t.isPrice) {
    const o = e.filter((n) => n.price > 0);
    if (o.length) {
      const n = Math.min(...o.map((u) => u.price)), d = o.filter((u) => u.price === n);
      d.length === 1 && (a = d[0].id);
    }
  }
  if (t.isDiscount) {
    const o = e.map((n) => ({
      id: n.id,
      pct: T(n.price, n.old_price)
    })).filter((n) => n.pct > 0);
    if (o.length) {
      const n = Math.max(...o.map((u) => u.pct)), d = o.filter((u) => u.pct === n);
      d.length === 1 && (c = d[0].id);
    }
  }
  return { identical: i, bestPriceId: a, bestDiscountId: c };
}
var be = Object.defineProperty, w = (t, e, r, i) => {
  for (var a = void 0, c = t.length - 1, o; c >= 0; c--)
    (o = t[c]) && (a = o(e, r, a) || a);
  return a && be(e, r, a), a;
};
const $ = 3, I = 2, B = class B extends Y {
  constructor() {
    super(...arguments), this.config = {}, this.products = [], this.productsLoading = !1, this.selectedIds = [], this.showTable = !1, this.loadToken = 0, this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler), this.loadProducts();
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(e) {
    e.has("config") && (this.selectedIds = [], this.showTable = !1, this.loadProducts());
  }
  get criteria() {
    var e;
    return me((e = this.config) == null ? void 0 : e.acm_criteria, this.products);
  }
  get selected() {
    return this.selectedIds.map((e) => this.products.find((r) => r.id === e)).filter((e) => !!e);
  }
  get currency() {
    var e;
    return String(((e = this.config) == null ? void 0 : e.acm_currency) || "ر.س").trim() || "ر.س";
  }
  async loadProducts() {
    var a, c;
    const e = ++this.loadToken, r = se((a = this.config) == null ? void 0 : a.acm_products);
    r.length ? (this.products = r, this.productsLoading = !1) : this.productsLoading = !0;
    const i = await de((c = this.config) == null ? void 0 : c.acm_products);
    e === this.loadToken && (this.products = i, this.productsLoading = !1, this.selectedIds = this.selectedIds.filter(
      (o) => i.some((n) => n.id === o)
    ), this.selectedIds.length < I && (this.showTable = !1));
  }
  toggleProduct(e) {
    if (this.selectedIds.includes(e)) {
      this.selectedIds = this.selectedIds.filter((r) => r !== e), this.selectedIds.length < I && (this.showTable = !1);
      return;
    }
    this.selectedIds.length >= $ || (this.selectedIds = [...this.selectedIds, e]);
  }
  removeProduct(e) {
    this.selectedIds = this.selectedIds.filter((r) => r !== e), this.selectedIds.length < I && (this.showTable = !1);
  }
  clearAll() {
    this.selectedIds = [], this.showTable = !1;
  }
  formatCellValue(e, r, i) {
    if (e === "price")
      return r.price > 0 ? L(r.price, this.currency) : "—";
    if (e === "discount") {
      const a = T(r.price, r.old_price);
      return a > 0 ? `${a}%` : "—";
    }
    if (i) {
      const a = this.criteria.find((c) => c.key === i);
      if (a)
        return F(r, a) || "—";
    }
    return "—";
  }
  _renderSlots(e) {
    return l`
      <div class="acm-slots" aria-label=${m("خانات المقارنة", "Comparison slots")}>
        ${Array.from({ length: $ }, (r, i) => {
      const a = e[i];
      return l`
            <div
              class=${C({
        "acm-slot": !0,
        "acm-slot--filled": !!a
      })}
            >
              <span class="acm-slot__num" aria-hidden="true">${i + 1}</span>
              ${a ? l`
                    ${a.image ? l`<img
                          class="acm-slot__thumb"
                          src=${a.image}
                          alt=""
                          loading="lazy"
                          decoding="async"
                        />` : b}
                    <span class="acm-slot__meta">
                      <span class="acm-slot__name">${a.name}</span>
                    </span>
                    <button
                      type="button"
                      class="acm-slot__remove"
                      aria-label=${m("إزالة", "Remove") + " " + a.name}
                      @click=${() => this.removeProduct(a.id)}
                    >
                      ×
                    </button>
                  ` : l`<span class="acm-slot__empty">
                    ${m("فارغة", "Empty")}
                  </span>`}
            </div>
          `;
    })}
      </div>
    `;
  }
  render() {
    const e = this.config || {}, r = G(e, "acm_"), i = r.animate && !J(), a = this.products, c = this.selected, o = this.currency, n = this.selectedIds.length >= $, d = c.length >= I, u = p(e.acm_title), h = p(e.acm_desc), f = this.criteria, k = pe(f);
    return l`
      <section
        class=${C({
      "fs-section": !0,
      "fs-animate": i
    })}
        style=${R(Q(r))}
        aria-label=${u || m("مقارنة العبايات", "Compare abayas")}
      >
        <div class="fs-container">
          ${u || h ? l`<div class="fs-header">
                ${u ? l`<h2 class="fs-title">${u}</h2>` : b}
                ${h ? l`<p class="fs-desc">${h}</p>` : b}
              </div>` : b}

          ${this.productsLoading ? l`<div class="fs-empty" role="status">
                ${m("جاري تحميل المنتجات...", "Loading products...")}
              </div>` : a.length ? l`<div class="acm-studio">
                  <div class="acm-toolbar">
                    <p class="acm-hint">
                      ${p(e.acm_select_hint) || m(
      "اختاري من 2 إلى 3 عبايات ثم اضغطي قارني",
      "Pick 2 to 3 abayas, then tap Compare"
    )}
                    </p>
                    <span class="acm-count" aria-live="polite">
                      ${c.length} / ${$}
                      ${m("مختارة", "selected")}
                    </span>
                  </div>

                  ${this._renderSlots(c)}

                  <div class="acm-picker" role="list">
                    ${a.map((s) => {
      const v = this.selectedIds.includes(s.id), x = !v && n, P = T(s.price, s.old_price);
      return l`
                        <button
                          type="button"
                          class="acm-pick-card"
                          role="listitem"
                          aria-pressed=${v ? "true" : "false"}
                          ?disabled=${x}
                          @click=${() => this.toggleProduct(s.id)}
                        >
                          <span class="acm-pick-card__check" aria-hidden="true">✓</span>
                          <div class="acm-pick-card__media">
                            ${s.image ? l`<img
                                  class="acm-pick-card__img"
                                  src=${s.image}
                                  alt=${s.name}
                                  loading="lazy"
                                  decoding="async"
                                />` : b}
                          </div>
                          <div class="acm-pick-card__body">
                            <p class="acm-pick-card__name">${s.name}</p>
                            ${s.price > 0 ? l`<span class="acm-pick-card__price">
                                  ${L(s.price, o)}
                                  ${P > 0 && s.old_price > 0 ? l`<span class="acm-pick-card__old">
                                        ${L(s.old_price, o)}
                                      </span>` : b}
                                </span>` : b}
                          </div>
                        </button>
                      `;
    })}
                  </div>

                  <div class="acm-actions">
                    <button
                      type="button"
                      class="fs-btn"
                      ?disabled=${!d}
                      @click=${() => {
      this.showTable = !0;
    }}
                    >
                      ${p(e.acm_compare_btn) || m("قارني", "Compare")}
                    </button>
                    <button
                      type="button"
                      class="fs-btn fs-btn--ghost"
                      ?disabled=${!c.length}
                      @click=${this.clearAll}
                    >
                      ${p(e.acm_clear_btn) || m("مسح الكل", "Clear all")}
                    </button>
                  </div>

                  ${this.showTable && d ? l`
                        <div class="acm-table-wrap">
                          <p class="acm-user-hint">
                            ${p(e.acm_user_hint) || m(
      "السعر من المتجر تلقائيًا — وبقية المقارنة من إعدادات كل منتج",
      "Price comes from the store — other rows come from each product’s settings"
    )}
                          </p>
                          <div class="acm-legend" aria-hidden="true">
                            <span class="acm-legend__item">
                              <span class="acm-legend__swatch acm-legend__swatch--best"></span>
                              ${m("أفضل قيمة", "Best value")}
                            </span>
                            <span class="acm-legend__item">
                              <span class="acm-legend__swatch acm-legend__swatch--same"></span>
                              ${m("متطابق", "Identical")}
                            </span>
                          </div>
                          <table class="acm-table">
                            <thead>
                              <tr>
                                <th class="acm-table__label">${m("الخاصية", "Attribute")}</th>
                                ${c.map(
      (s) => l`
                                    <th>
                                      <div class="acm-product-head">
                                        ${s.image ? l`<img
                                              class="acm-product-head__img"
                                              src=${s.image}
                                              alt=${s.name}
                                              loading="lazy"
                                              decoding="async"
                                            />` : b}
                                        <span class="acm-product-head__name">${s.name}</span>
                                        ${s.url ? l`<a class="fs-btn fs-btn--ghost" href=${s.url}>
                                              ${s.btn_text || m("عرض", "View")}
                                            </a>` : b}
                                      </div>
                                    </th>
                                  `
    )}
                              </tr>
                            </thead>
                            <tbody>
                              ${k.map((s) => {
      const v = ue(s, c, f);
      return l`
                                  <tr>
                                    <th class="acm-table__label" scope="row">
                                      ${m(s.labelAr, s.labelEn)}
                                    </th>
                                    ${c.map((x) => {
        const P = v.identical.has(x.id), D = v.bestPriceId === x.id || v.bestDiscountId === x.id, K = this.formatCellValue(
          s.key,
          x,
          s.criterionKey
        );
        return l`
                                        <td
                                          class=${C({
          "acm-cell--same": P,
          "acm-cell--best": D
        })}
                                        >
                                          ${K}
                                          ${D ? l`<span class="acm-cell__badge">
                                                ${m("الأفضل", "Best")}
                                              </span>` : b}
                                        </td>
                                      `;
      })}
                                  </tr>
                                `;
    })}
                            </tbody>
                          </table>
                        </div>
                      ` : b}
                </div>` : b}
        </div>
      </section>
    `;
  }
};
B.styles = [
  X,
  te,
  N`
      :host {
        direction: inherit;
      }
    `
];
let g = B;
w([
  q({ type: Object })
], g.prototype, "config");
w([
  z()
], g.prototype, "products");
w([
  z()
], g.prototype, "productsLoading");
w([
  z()
], g.prototype, "selectedIds");
w([
  z()
], g.prototype, "showTable");
typeof g < "u" && g.registerSallaComponent("salla-abaya-comparison-arena");
export {
  g as default
};
