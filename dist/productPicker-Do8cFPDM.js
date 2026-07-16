import { q as b } from "./sharedStyles-C1vUkqEN.js";
function S() {
  const r = window;
  return r.Salla || r.salla || null;
}
function m(r) {
  if (r == null) return !0;
  if (typeof r == "string") {
    const t = r.trim();
    return !t || t === "[]" || t === "null" || t === "undefined";
  }
  return Array.isArray(r) ? r.length === 0 : !1;
}
function w(r) {
  const t = String(r.source || "").toLowerCase().trim();
  return !(!t || t === "categories" && m(r.source_value) || t === "selected" && m(r.source_value));
}
async function y(r) {
  var a;
  const t = S(), e = (a = t == null ? void 0 : t.api) == null ? void 0 : a.withoutNotifier, n = window, i = n.alert;
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
    n.alert = i;
  }
}
async function p() {
  const r = S();
  if (!r) return null;
  try {
    typeof r.onReady == "function" && await r.onReady();
  } catch {
  }
  return r;
}
function f(r) {
  return r && typeof r == "object" && "data" in r ? r.data : r;
}
function A(r) {
  const t = f(r);
  if (Array.isArray(t)) return t;
  if (t && typeof t == "object") {
    const e = t;
    if (Array.isArray(e.data)) return e.data;
    if (Array.isArray(e.products)) return e.products;
    if (Array.isArray(e.items)) return e.items;
  }
  return [];
}
function l(r) {
  return r.map((t) => String(t).trim()).filter(Boolean).map((t) => {
    const e = Number(t);
    return Number.isFinite(e) && String(e) === t ? e : t;
  });
}
async function j(r) {
  var t, e, n;
  try {
    if (!w(r)) return [];
    const i = await p();
    if (!(i != null && i.product)) return [];
    const a = [
      (t = i.product.fetch) == null ? void 0 : t.bind(i.product),
      (n = (e = i.product.api) == null ? void 0 : e.fetch) == null ? void 0 : n.bind(i.product.api)
    ].filter(
      (o) => typeof o == "function"
    );
    return a.length ? await y(async () => {
      for (const o of a)
        try {
          const u = A(await o(r));
          if (u.length) return u;
        } catch {
        }
      return [];
    }) : [];
  } catch {
    return [];
  }
}
async function P(r) {
  try {
    const t = await p();
    return !(t != null && t.product) || r == null || r === "" ? null : await y(async () => {
      var e;
      try {
        if (typeof t.product.getDetails == "function")
          return f(await t.product.getDetails(r));
      } catch {
      }
      try {
        if (typeof ((e = t.product.api) == null ? void 0 : e.getDetails) == "function")
          return f(await t.product.api.getDetails(r));
      } catch {
        return null;
      }
      return null;
    });
  } catch {
    return null;
  }
}
function v(r) {
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
async function q(r) {
  const t = [...new Set(r.map((a) => String(a).trim()).filter(Boolean))], e = /* @__PURE__ */ new Map();
  if (!t.length) return e;
  const n = await j({
    source: "selected",
    source_value: l(t),
    limit: t.length
  });
  for (const a of n) {
    const o = v(a);
    o && e.set(o, a);
  }
  const i = t.filter((a) => !e.has(a));
  if (i.length) {
    const a = await Promise.all(
      i.map(async (o) => {
        const u = await P(o);
        return [o, u];
      })
    );
    for (const [o, u] of a)
      u && e.set(o, u);
  }
  return e;
}
function k(r) {
  const t = Number(r);
  return Number.isFinite(t) && String(t) === String(r).trim() ? t : r;
}
async function N(r, t) {
  if (typeof r != "function") return !1;
  const e = k(t), n = [
    { id: e, quantity: 1 },
    { product_id: e, quantity: 1 }
  ], i = new FormData();
  i.append("id", String(e)), i.append("quantity", "1"), n.push(i);
  const a = new FormData();
  a.append("product_id", String(e)), a.append("quantity", "1"), n.push(a);
  for (const o of n)
    try {
      return await r(o), !0;
    } catch {
    }
  return !1;
}
async function C(r) {
  var u, g;
  const t = r.map((c) => String(c).trim()).filter(Boolean).map((c) => {
    const s = Number(c);
    return Number.isFinite(s) && String(s) === c ? s : c;
  });
  if (!t.length)
    return { ok: !1, added: 0, error: "empty" };
  const e = await p(), n = e == null ? void 0 : e.cart, i = (u = n == null ? void 0 : n.addItem) == null ? void 0 : u.bind(n), a = (g = n == null ? void 0 : n.addItems) == null ? void 0 : g.bind(n);
  if (typeof i != "function" && typeof a != "function")
    return { ok: !1, added: 0, error: "unavailable" };
  let o = 0;
  try {
    return await y(async () => {
      if (typeof a == "function")
        try {
          await a(t.map((c) => ({ id: c, quantity: 1 }))), o = t.length;
          return;
        } catch {
        }
      for (const c of t)
        await N(i, c) && (o += 1);
    }), o === t.length ? { ok: !0, added: o } : o > 0 ? { ok: !1, added: o, error: "partial" } : { ok: !1, added: 0, error: "failed" };
  } catch {
    return { ok: !1, added: o, error: o > 0 ? "partial" : "failed" };
  }
}
const _ = /* @__PURE__ */ new Set([
  "none",
  "categories",
  "sales",
  "latest",
  "selected"
]);
function I(r) {
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
function d(r) {
  if (r == null) return "";
  if (typeof r == "number" || typeof r == "string")
    return String(r).trim();
  if (typeof r != "object") return "";
  const t = r, e = t.id ?? t.value ?? t.product_id ?? t.category_id ?? t.key;
  return Array.isArray(e) ? d(e[0]) : e != null && typeof e != "object" ? String(e).trim() : e && typeof e == "object" ? d(e) : "";
}
function h(r) {
  const t = [], e = /* @__PURE__ */ new Set();
  for (const n of I(r)) {
    const i = d(n);
    !i || _.has(i.toLowerCase()) || e.has(i) || (e.add(i), t.push(i));
  }
  return t;
}
function D(r) {
  const t = b(r, "").toLowerCase().trim();
  return !t || t === "none" ? "" : t === "categories" || t === "sales" || t === "latest" || t === "selected" ? t : "";
}
function V(r) {
  let t = D(r.source);
  const e = h(r.chosen), n = h(r.category), i = Math.max(1, Math.min(40, Number(r.limit) || 6));
  if (!t && r.fallbackSelectedWhenChosen !== !1 && e.length && (t = "selected"), !t && n.length && (t = "categories"), !t) return null;
  if (t === "selected")
    return e.length ? {
      source: t,
      sourceValue: JSON.stringify(l(e)),
      limit: Math.min(i, e.length) || i
    } : null;
  if (t === "categories") {
    if (!n.length) return null;
    const a = l(n);
    return {
      source: t,
      // Saji uses a single category id string; multi → JSON array
      sourceValue: a.length === 1 ? String(a[0]) : JSON.stringify(a),
      limit: i
    };
  }
  return t === "sales" ? { source: t, sourceValue: "sales", limit: i } : { source: "latest", sourceValue: "[]", limit: i };
}
export {
  j as a,
  h as b,
  C as c,
  d as e,
  q as f,
  V as r,
  l as t,
  I as u
};
