import { css as D, LitElement as K, nothing as h, html as d } from "lit";
import { property as q, state as C } from "lit/decorators.js";
import { classMap as $ } from "lit/directives/class-map.js";
import { styleMap as R } from "lit/directives/style-map.js";
import { n as S, l as u, d as M, f as A, e as _, h as X, j, i as B, k as x, u as Y, m as G, s as J, o as Q, t as m, r as W, p as Z, a as ee, b as te } from "./sharedStyles-BYm1OK6w.js";
import { r as re } from "./productCard-BlEnQRkD.js";
const ae = D`
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
function ie(t) {
  return Y(t);
}
function oe(t) {
  return G(t);
}
function se(t) {
  const e = !!u(t.name).trim(), r = !!(_(t.image) || _(t.thumbnail) || _(t.main_image)), i = !!M(t.url || t.permalink), a = x(t.price) > 0 || x(t.sale_price) > 0 || x(t.regular_price) > 0;
  return e && (r || i || a);
}
function ce(t) {
  for (const r of ie(t))
    if (r != null) {
      if (typeof r == "number" || typeof r == "string") {
        const i = String(r).trim();
        if (i) return { id: i, label: "", hydrated: null };
      }
      if (typeof r == "object") {
        const i = r, a = oe(i), o = u(i.label ?? i.name).trim(), s = se(i) ? i : null;
        if (a || s)
          return {
            id: a || String((s == null ? void 0 : s.id) ?? "").trim(),
            label: o,
            hydrated: s
          };
      }
    }
  const e = j(t);
  return e != null && e.id ? {
    id: e.id,
    label: e.name,
    hydrated: t && typeof t == "object" ? t : null
  } : null;
}
function O(t, e) {
  return t.trim().toLowerCase().replace(/\s+/g, "-") || `criterion-${e + 1}`;
}
function ne(t) {
  return S(t).map((e, r) => {
    const i = u(e.label).trim(), a = u(e.value).trim(), o = u(e.key).trim() || O(i, r);
    return { key: o, label: i || o, value: a };
  }).filter((e) => e.label && e.value);
}
function H(t) {
  return S(t).map((e, r) => {
    const i = ce(
      e.product ?? e.products ?? e.selected_product
    ), a = (i == null ? void 0 : i.id) || "";
    return {
      id: a ? `product-${a}` : `item-${r}`,
      product_id: a,
      product_label: (i == null ? void 0 : i.label) || "",
      hydrated: (i == null ? void 0 : i.hydrated) || null,
      name: u(e.name),
      image: _(e.image),
      price: A(e.price, 0),
      old_price: A(e.old_price, 0),
      url: M(e.url),
      btn_text: u(e.btn_text),
      attributes: ne(e.attributes)
    };
  }).filter((e) => e.product_id || e.name || e.image || e.hydrated || e.attributes.length);
}
function le(t) {
  return t.hydrated ? !0 : !!(t.name && (t.image || t.url || t.price > 0));
}
function z(t, e) {
  const r = e ? j(e) : null, i = e && typeof e == "object" ? e : null, a = t.name || (r == null ? void 0 : r.name) || (i ? u(i.name) : "") || t.product_label, o = t.image || (r == null ? void 0 : r.image) || (i ? _(i.image) || _(i.thumbnail) || _(i.main_image) : ""), s = t.url || (r == null ? void 0 : r.url) || (i ? M(i.url || i.permalink) : "");
  let c = t.price > 0 ? t.price : (r == null ? void 0 : r.price) || 0, l = t.old_price > 0 ? t.old_price : (r == null ? void 0 : r.old_price) || 0;
  if (!(t.price > 0) && i) {
    const p = B(i.is_on_sale) || B(i.on_sale), g = x(i.sale_price), b = x(i.regular_price), w = x(i.price);
    p && g > 0 ? (c = g, l = b > g ? b : 0) : w > 0 && (c = w, b > w && (l = b));
  }
  return {
    id: t.id,
    product_id: t.product_id || (r == null ? void 0 : r.id) || "",
    name: a,
    image: o,
    price: c,
    old_price: l,
    url: s,
    btn_text: t.btn_text,
    rating: (r == null ? void 0 : r.rating) || 0,
    attributes: t.attributes
  };
}
function L(t, e) {
  return e ? z(t, e) : t.hydrated ? z(t, t.hydrated) : z(t);
}
function de(t) {
  return H(t).map((e) => L(e)).filter((e) => e.name || e.image || e.product_id || e.attributes.length);
}
async function me(t) {
  return X(t);
}
async function ue(t) {
  const e = H(t), r = e.filter((a) => a.product_id && !le(a)).map((a) => a.product_id), i = r.length ? await me(r) : /* @__PURE__ */ new Map();
  return e.map((a) => a.product_id && i.has(a.product_id) ? L(a, i.get(a.product_id)) : L(a)).filter((a) => a.name || a.image || a.product_id || a.attributes.length);
}
function pe(t, e = []) {
  const r = S(t).map((o, s) => {
    const c = u(o.label).trim(), l = u(o.key).trim() || O(c, s);
    return { key: l, label: c || l };
  }).filter((o) => o.label);
  if (r.length) return r;
  const i = /* @__PURE__ */ new Set(), a = [];
  for (const o of e)
    for (const s of o.attributes) {
      const c = s.key || s.label;
      !c || i.has(c) || (i.add(c), a.push({ key: s.key, label: s.label }));
    }
  return a;
}
function N(t, e) {
  const r = t.attributes.find((o) => o.key === e.key);
  if (r != null && r.value) return r.value;
  const i = e.label.trim().toLowerCase(), a = t.attributes.find(
    (o) => o.label.trim().toLowerCase() === i
  );
  return (a == null ? void 0 : a.value) || "";
}
function V(t, e) {
  return !e || e <= t ? 0 : Math.round((e - t) / e * 100);
}
function fe(t) {
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
function he(t, e, r) {
  const i = /* @__PURE__ */ new Set();
  let a = null, o = null;
  if (t.highlightIdentical && t.criterionKey && e.length > 1) {
    const s = r.find((c) => c.key === t.criterionKey);
    if (s) {
      const c = e.map((l) => N(l, s).trim().toLowerCase()).filter(Boolean);
      c.length === e.length && c.every((l) => l === c[0]) && e.forEach((l) => i.add(l.id));
    }
  }
  if (t.isPrice) {
    const s = e.filter((c) => c.price > 0);
    if (s.length) {
      const c = Math.min(...s.map((p) => p.price)), l = s.filter((p) => p.price === c);
      l.length === 1 && (a = l[0].id);
    }
  }
  if (t.isDiscount) {
    const s = e.map((c) => ({
      id: c.id,
      pct: V(c.price, c.old_price)
    })).filter((c) => c.pct > 0);
    if (s.length) {
      const c = Math.max(...s.map((p) => p.pct)), l = s.filter((p) => p.pct === c);
      l.length === 1 && (o = l[0].id);
    }
  }
  return { identical: i, bestPriceId: a, bestDiscountId: o };
}
var ge = Object.defineProperty, k = (t, e, r, i) => {
  for (var a = void 0, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (a = s(e, r, a) || a);
  return a && ge(e, r, a), a;
};
const I = 3, P = 2, T = class T extends K {
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
    return pe((e = this.config) == null ? void 0 : e.acm_criteria, this.products);
  }
  get selected() {
    return this.selectedIds.map((e) => this.products.find((r) => r.id === e)).filter((e) => !!e);
  }
  get currency() {
    var e;
    return String(((e = this.config) == null ? void 0 : e.acm_currency) || "ر.س").trim() || "ر.س";
  }
  async loadProducts() {
    var a, o;
    const e = ++this.loadToken, r = de((a = this.config) == null ? void 0 : a.acm_products);
    r.length ? (this.products = r, this.productsLoading = !1) : this.productsLoading = !0;
    const i = await ue((o = this.config) == null ? void 0 : o.acm_products);
    e === this.loadToken && (this.products = i, this.productsLoading = !1, this.selectedIds = this.selectedIds.filter(
      (s) => i.some((c) => c.id === s)
    ), this.selectedIds.length < P && (this.showTable = !1));
  }
  toggleProduct(e) {
    if (this.selectedIds.includes(e)) {
      this.selectedIds = this.selectedIds.filter((r) => r !== e), this.selectedIds.length < P && (this.showTable = !1);
      return;
    }
    this.selectedIds.length >= I || (this.selectedIds = [...this.selectedIds, e]);
  }
  removeProduct(e) {
    this.selectedIds = this.selectedIds.filter((r) => r !== e), this.selectedIds.length < P && (this.showTable = !1);
  }
  clearAll() {
    this.selectedIds = [], this.showTable = !1;
  }
  formatCellValue(e, r, i) {
    if (e === "price")
      return r.price > 0 ? Q(r.price, this.currency) : "—";
    if (e === "discount") {
      const a = V(r.price, r.old_price);
      return a > 0 ? `${a}%` : "—";
    }
    if (i) {
      const a = this.criteria.find((o) => o.key === i);
      if (a)
        return N(r, a) || "—";
    }
    return "—";
  }
  _renderSlots(e) {
    return d`
      <div class="acm-slots" aria-label=${m("خانات المقارنة", "Comparison slots")}>
        ${Array.from({ length: I }, (r, i) => {
      const a = e[i];
      return d`
            <div
              class=${$({
        "acm-slot": !0,
        "acm-slot--filled": !!a
      })}
            >
              <span class="acm-slot__num" aria-hidden="true">${i + 1}</span>
              ${a ? d`
                    ${a.image ? d`<img
                          class="acm-slot__thumb"
                          src=${a.image}
                          alt=""
                          loading="lazy"
                          decoding="async"
                        />` : h}
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
                  ` : d`<span class="acm-slot__empty">
                    ${m("فارغة", "Empty")}
                  </span>`}
            </div>
          `;
    })}
      </div>
    `;
  }
  render() {
    const e = this.config || {}, r = W(e, "acm_"), i = r.animate && !Z(), a = this.products, o = this.selected, s = this.currency, c = this.selectedIds.length >= I, l = o.length >= P, p = u(e.acm_title), g = u(e.acm_desc), b = this.criteria, w = fe(b);
    return d`
      <section
        class=${$({
      "fs-section": !0,
      "fs-animate": i
    })}
        style=${R(ee(r))}
        aria-label=${p || m("مقارنة العبايات", "Compare abayas")}
      >
        <div class="fs-container">
          ${p || g ? d`<div class="fs-header fs-header--editorial">
                <p class="fs-eyebrow">${m("مقارنة ذكية", "Smart compare")}</p>
                ${p ? d`<h2 class="fs-title">${p}</h2>` : h}
                <span class="fs-title-line" aria-hidden="true"></span>
                ${g ? d`<p class="fs-desc">${g}</p>` : h}
              </div>` : h}

          ${this.productsLoading ? d`<div class="fs-empty" role="status">
                ${m("جاري تحميل المنتجات...", "Loading products...")}
              </div>` : a.length ? d`<div class="acm-studio">
                  <div class="acm-toolbar">
                    <p class="acm-hint">
                      ${u(e.acm_select_hint) || m(
      "اختر من 2 إلى 3 عبايات ثم اضغط قارن",
      "Pick 2 to 3 abayas, then tap Compare"
    )}
                    </p>
                    <span class="acm-count" aria-live="polite">
                      ${o.length} / ${I}
                      ${m("مختارة", "selected")}
                    </span>
                  </div>

                  ${this._renderSlots(o)}

                  <div class="acm-picker" role="list">
                    ${a.map((n) => {
      const y = this.selectedIds.includes(n.id), v = !y && c;
      return d`
                        <div
                          class=${$({
        "acm-pick-slot": !0,
        "is-disabled": v
      })}
                          role="listitem"
                        >
                          ${re(
        {
          id: n.product_id,
          name: n.name,
          image: n.image,
          url: n.url,
          price: n.price,
          old_price: n.old_price,
          rating: n.rating
        },
        {
          currency: s,
          selectable: !0,
          selected: y,
          wishlist: !0,
          onSelect: () => {
            v || this.toggleProduct(n.id);
          }
        }
      )}
                        </div>
                      `;
    })}
                  </div>

                  <div class="acm-actions">
                    <button
                      type="button"
                      class="fs-btn"
                      ?disabled=${!l}
                      @click=${() => {
      this.showTable = !0;
    }}
                    >
                      ${u(e.acm_compare_btn) || m("قارني", "Compare")}
                    </button>
                    <button
                      type="button"
                      class="fs-btn fs-btn--ghost"
                      ?disabled=${!o.length}
                      @click=${this.clearAll}
                    >
                      ${u(e.acm_clear_btn) || m("مسح الكل", "Clear all")}
                    </button>
                  </div>

                  ${this.showTable && l ? d`
                        <div class="acm-table-wrap">
                          <p class="acm-user-hint">
                            ${u(e.acm_user_hint) || m(
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
                                ${o.map(
      (n) => d`
                                    <th>
                                      <div class="acm-product-head">
                                        ${n.image ? d`<img
                                              class="acm-product-head__img"
                                              src=${n.image}
                                              alt=${n.name}
                                              loading="lazy"
                                              decoding="async"
                                            />` : h}
                                        <span class="acm-product-head__name">${n.name}</span>
                                        ${n.url ? d`<a class="fs-btn fs-btn--ghost" href=${n.url}>
                                              ${n.btn_text || m("عرض", "View")}
                                            </a>` : h}
                                      </div>
                                    </th>
                                  `
    )}
                              </tr>
                            </thead>
                            <tbody>
                              ${w.map((n) => {
      const y = he(n, o, b);
      return d`
                                  <tr>
                                    <th class="acm-table__label" scope="row">
                                      ${m(n.labelAr, n.labelEn)}
                                    </th>
                                    ${o.map((v) => {
        const U = y.identical.has(v.id), E = y.bestPriceId === v.id || y.bestDiscountId === v.id, F = this.formatCellValue(
          n.key,
          v,
          n.criterionKey
        );
        return d`
                                        <td
                                          class=${$({
          "acm-cell--same": U,
          "acm-cell--best": E
        })}
                                        >
                                          ${F}
                                          ${E ? d`<span class="acm-cell__badge">
                                                ${m("الأفضل", "Best")}
                                              </span>` : h}
                                        </td>
                                      `;
      })}
                                  </tr>
                                `;
    })}
                            </tbody>
                          </table>
                        </div>
                      ` : h}
                </div>` : d`<div class="fs-empty" role="status">
                  ${m(
      "أضف منتجات المقارنة من إعدادات العنصر لعرضها هنا.",
      "Add comparison products from the element settings to show them here."
    )}
                </div>`}
        </div>
        ${te(this.config || {}, "acm_")}
      </section>
    `;
  }
};
T.styles = [
  J,
  ae,
  D`
      :host {
        direction: inherit;
      }
    `
];
let f = T;
k([
  q({ type: Object })
], f.prototype, "config");
k([
  C()
], f.prototype, "products");
k([
  C()
], f.prototype, "productsLoading");
k([
  C()
], f.prototype, "selectedIds");
k([
  C()
], f.prototype, "showTable");
typeof f < "u" && f.registerSallaComponent("salla-abaya-comparison-arena");
export {
  f as default
};
