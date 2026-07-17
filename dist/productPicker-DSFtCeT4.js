import { nothing as u, html as o } from "lit";
import { classMap as $ } from "lit/directives/class-map.js";
import { t as p, j as _ } from "./sharedStyles-BGb_aVO_.js";
function h() {
  const r = window;
  return r.Salla || r.salla || null;
}
function w(r) {
  if (r == null) return !0;
  if (typeof r == "string") {
    const t = r.trim();
    return !t || t === "[]" || t === "null" || t === "undefined";
  }
  return Array.isArray(r) ? r.length === 0 : !1;
}
function v(r) {
  const t = String(r.source || "").toLowerCase().trim();
  return !(!t || t === "categories" && w(r.source_value) || t === "selected" && w(r.source_value));
}
async function l(r) {
  var i;
  const t = h(), e = (i = t == null ? void 0 : t.api) == null ? void 0 : i.withoutNotifier, n = window, a = n.alert;
  n.alert = () => {
  };
  try {
    if (typeof e == "function")
      try {
        return await Promise.resolve(e(r));
      } catch {
      }
    return await r();
  } finally {
    n.alert = a;
  }
}
async function y() {
  const r = h();
  if (!r) return null;
  try {
    typeof r.onReady == "function" && await r.onReady();
  } catch {
  }
  return r;
}
function m(r) {
  return r && typeof r == "object" && "data" in r ? r.data : r;
}
function k(r) {
  const t = m(r);
  if (Array.isArray(t)) return t;
  if (t && typeof t == "object") {
    const e = t;
    if (Array.isArray(e.data)) return e.data;
    if (Array.isArray(e.products)) return e.products;
    if (Array.isArray(e.items)) return e.items;
  }
  return [];
}
function P(r) {
  return r.map((t) => String(t).trim()).filter(Boolean).map((t) => {
    const e = Number(t);
    return Number.isFinite(e) && String(e) === t ? e : t;
  });
}
async function j(r) {
  var t, e, n;
  try {
    if (!v(r)) return [];
    const a = await y();
    if (!(a != null && a.product)) return [];
    const i = [
      (t = a.product.fetch) == null ? void 0 : t.bind(a.product),
      (n = (e = a.product.api) == null ? void 0 : e.fetch) == null ? void 0 : n.bind(a.product.api)
    ].filter(
      (s) => typeof s == "function"
    );
    return i.length ? await l(async () => {
      for (const s of i)
        try {
          const c = k(await s(r));
          if (c.length) return c;
        } catch {
        }
      return [];
    }) : [];
  } catch {
    return [];
  }
}
async function L(r) {
  try {
    const t = await y();
    return !(t != null && t.product) || r == null || r === "" ? null : await l(async () => {
      var e;
      try {
        if (typeof t.product.getDetails == "function")
          return m(await t.product.getDetails(r));
      } catch {
      }
      try {
        if (typeof ((e = t.product.api) == null ? void 0 : e.getDetails) == "function")
          return m(await t.product.api.getDetails(r));
      } catch {
        return null;
      }
      return null;
    });
  } catch {
    return null;
  }
}
function C(r) {
  if (r == null) return "";
  if (typeof r == "number" || typeof r == "string") return String(r).trim();
  if (typeof r != "object") return "";
  const t = r, e = t.id ?? t.product_id ?? t.value;
  if (e != null && typeof e != "object") return String(e).trim();
  if (e && typeof e == "object") {
    const n = e;
    return String(n.id ?? n.product_id ?? n.value ?? "").trim();
  }
  return "";
}
async function V(r) {
  const t = [...new Set(r.map((i) => String(i).trim()).filter(Boolean))], e = /* @__PURE__ */ new Map();
  if (!t.length) return e;
  const n = await j({
    source: "selected",
    source_value: P(t),
    limit: t.length
  });
  for (const i of n) {
    const s = C(i);
    s && e.set(s, i);
  }
  const a = t.filter((i) => !e.has(i));
  if (a.length) {
    const i = await Promise.all(
      a.map(async (s) => {
        const c = await L(s);
        return [s, c];
      })
    );
    for (const [s, c] of i)
      c && e.set(s, c);
  }
  return e;
}
function D(r) {
  const t = Number(r);
  return Number.isFinite(t) && String(t) === String(r).trim() ? t : r;
}
async function A(r, t) {
  if (typeof r != "function") return !1;
  const e = D(t), n = [
    { id: e, quantity: 1 },
    { product_id: e, quantity: 1 }
  ], a = new FormData();
  a.append("id", String(e)), a.append("quantity", "1"), n.push(a);
  const i = new FormData();
  i.append("product_id", String(e)), i.append("quantity", "1"), n.push(i);
  for (const s of n)
    try {
      return await r(s), !0;
    } catch {
    }
  return !1;
}
async function W(r) {
  var c, d;
  const t = r.map((f) => String(f).trim()).filter(Boolean).map((f) => {
    const g = Number(f);
    return Number.isFinite(g) && String(g) === f ? g : f;
  });
  if (!t.length)
    return { ok: !1, added: 0, error: "empty" };
  const e = await y(), n = e == null ? void 0 : e.cart, a = (c = n == null ? void 0 : n.addItem) == null ? void 0 : c.bind(n), i = (d = n == null ? void 0 : n.addItems) == null ? void 0 : d.bind(n);
  if (typeof a != "function" && typeof i != "function")
    return { ok: !1, added: 0, error: "unavailable" };
  let s = 0;
  try {
    return await l(async () => {
      if (typeof i == "function")
        try {
          await i(t.map((f) => ({ id: f, quantity: 1 }))), s = t.length;
          return;
        } catch {
        }
      for (const f of t)
        await A(a, f) && (s += 1);
    }), s === t.length ? { ok: !0, added: s } : s > 0 ? { ok: !1, added: s, error: "partial" } : { ok: !1, added: 0, error: "failed" };
  } catch {
    return { ok: !1, added: s, error: s > 0 ? "partial" : "failed" };
  }
}
async function F(r) {
  var i;
  const t = await y(), e = t == null ? void 0 : t.cart, n = (i = e == null ? void 0 : e.addItem) == null ? void 0 : i.bind(e);
  if (typeof n != "function")
    return { ok: !1, error: "unavailable" };
  let a = !1;
  try {
    await l(async () => {
      a = await A(n, r);
    });
  } catch {
    a = !1;
  }
  return a ? { ok: !0 } : { ok: !1, error: "failed" };
}
function S(r) {
  var n;
  const t = h(), e = (n = t == null ? void 0 : t.storage) == null ? void 0 : n.get;
  if (typeof e != "function") return !1;
  try {
    const a = e("salla::wishlist", []);
    return Array.isArray(a) ? a.map((i) => String(i)).includes(String(r)) : !1;
  } catch {
    return !1;
  }
}
async function I(r) {
  const t = await y(), e = t == null ? void 0 : t.wishlist, n = S(r);
  try {
    if (typeof (e == null ? void 0 : e.toggle) == "function")
      return await l(async () => {
        await Promise.resolve(e.toggle(r));
      }), !n;
    if (!n && typeof (e == null ? void 0 : e.add) == "function")
      return await l(async () => {
        await Promise.resolve(e.add(r));
      }), !0;
    if (n && typeof (e == null ? void 0 : e.remove) == "function")
      return await l(async () => {
        await Promise.resolve(e.remove(r));
      }), !1;
  } catch {
    return null;
  }
  return null;
}
function N(r, t) {
  return t <= 0 || r <= 0 || t <= r ? 0 : Math.round((t - r) / t * 100);
}
function q(r) {
  if (!r || r <= 0) return u;
  const t = Math.round(r * 2) / 2;
  return o`
    <span class="fs-product-card__rating" aria-label=${`${r} / 5`}>
      <i class="sicon-star2" aria-hidden="true"></i>
      <span>${t.toLocaleString()}</span>
    </span>
  `;
}
function x(r) {
  const t = S(r.id);
  return o`
    <button
      type="button"
      class=${$({
    "fs-product-card__wishlist": !0,
    "is-active": t
  })}
      aria-label=${p("أضيفي لقائمة الأمنيات", "Add to wishlist")}
      aria-pressed=${t ? "true" : "false"}
      @click=${async (e) => {
    e.stopPropagation();
    const n = e.currentTarget, a = await I(r.id);
    a !== null && n.classList.toggle("is-active", a);
  }}
    >
      <i class="sicon-heart" aria-hidden="true"></i>
    </button>
  `;
}
function E(r, t) {
  return o`
    <button
      type="button"
      class="fs-btn fs-btn--ghost fs-product-card__add"
      @click=${async (e) => {
    var i;
    e.stopPropagation();
    const n = e.currentTarget;
    if (n.dataset.busy === "1") return;
    n.dataset.busy = "1", n.setAttribute("disabled", "");
    const a = await F(r.id);
    n.removeAttribute("disabled"), n.dataset.busy = "0", (i = t.onAdded) == null || i.call(t, r, a.ok);
  }}
    >
      <i class="sicon-shopping-bag" aria-hidden="true"></i>
      <span>${t.addLabel || p("أضيفي للسلة", "Add to cart")}</span>
    </button>
  `;
}
function U(r, t = {}) {
  const e = t.currency || "ر.س", n = N(r.price, r.old_price), a = r.old_price > r.price && r.old_price > 0, i = !!t.selectable, s = o`
    <div class="fs-product-card__media">
      ${r.image ? o`<img
            class="fs-product-card__img"
            src=${r.image}
            alt=${r.name}
            loading=${t.imageLoading || "lazy"}
            decoding="async"
          />` : o`<span class="fs-product-card__img fs-product-card__img--empty" aria-hidden="true"></span>`}
      ${n > 0 ? o`<span class="fs-product-card__badge">${p(`خصم ${n}%`, `${n}% off`)}</span>` : u}
      ${t.wishlist && r.id ? x(r) : u}
      ${i ? o`<span class="fs-product-card__check" aria-hidden="true">✓</span>` : u}
    </div>
    <div class="fs-product-card__body">
      <h3 class="fs-product-card__title">
        ${r.url && !i ? o`<a href=${r.url} @click=${(c) => c.stopPropagation()}>${r.name}</a>` : r.name}
      </h3>
      ${r.subtitle ? o`<p class="fs-product-card__subtitle">${r.subtitle}</p>` : u}
      <div class="fs-product-card__meta">
        ${r.price > 0 ? o`<span class="fs-product-card__price">
              <span class="fs-product-card__price-now">${_(r.price, e)}</span>
              ${a ? o`<span class="fs-product-card__price-old">${_(r.old_price, e)}</span>` : u}
            </span>` : u}
        ${q(r.rating || 0)}
      </div>
      ${t.addToCart && r.id ? E(r, t) : u}
      ${t.viewLink && r.url ? o`<a
            class="fs-product-card__link"
            href=${r.url}
            target="_blank"
            rel="noopener noreferrer"
            @click=${(c) => c.stopPropagation()}
            >${t.viewLabel || p("عرض المنتج", "View product")}</a
          >` : u}
      ${t.extra ?? u}
    </div>
  `;
  return i ? o`
      <article
        class=${$({
    "fs-product-card": !0,
    "fs-product-card--selectable": !0,
    "is-selected": !!t.selected
  })}
        role="button"
        tabindex="0"
        aria-pressed=${t.selected ? "true" : "false"}
        @click=${() => {
    var c;
    return (c = t.onSelect) == null ? void 0 : c.call(t, r);
  }}
        @keydown=${(c) => {
    var d;
    (c.key === "Enter" || c.key === " ") && (c.preventDefault(), (d = t.onSelect) == null || d.call(t, r));
  }}
      >
        ${s}
      </article>
    ` : o`<article class="fs-product-card">${s}</article>`;
}
const T = /* @__PURE__ */ new Set([
  "none",
  "categories",
  "sales",
  "latest",
  "selected"
]);
function M(r) {
  if (!r) return [];
  if (Array.isArray(r)) return r;
  if (typeof r == "object") {
    const t = r;
    if (Array.isArray(t.selected) && t.selected.length) return t.selected;
    if (Array.isArray(t.value) && t.value.length) return t.value;
    if (Array.isArray(t.data) && t.data.length) return t.data;
    if (Array.isArray(t.items) && t.items.length) return t.items;
    if (Array.isArray(t.products) && t.products.length) return t.products;
    if ("id" in t || "value" in t || "name" in t || "label" in t)
      return [t];
  }
  return typeof r == "number" || typeof r == "string" ? [r] : [];
}
function b(r) {
  if (r == null) return "";
  if (typeof r == "number" || typeof r == "string")
    return String(r).trim();
  if (typeof r != "object") return "";
  const t = r, e = t.id ?? t.value ?? t.product_id ?? t.category_id ?? t.key;
  return Array.isArray(e) ? b(e[0]) : e != null && typeof e != "object" ? String(e).trim() : e && typeof e == "object" ? b(e) : "";
}
function z(r) {
  const t = [], e = /* @__PURE__ */ new Set();
  for (const n of M(r)) {
    const a = b(n);
    !a || T.has(a.toLowerCase()) || e.has(a) || (e.add(a), t.push(a));
  }
  return t;
}
export {
  j as a,
  z as b,
  W as c,
  b as e,
  V as f,
  U as r,
  P as t,
  M as u
};
