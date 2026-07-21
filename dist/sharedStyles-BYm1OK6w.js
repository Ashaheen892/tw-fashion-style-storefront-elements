import { css as ot, LitElement as Tt, html as F, nothing as ne } from "lit";
import { keyed as _t } from "lit/directives/keyed.js";
import { property as ie, state as ue } from "lit/decorators.js";
import { classMap as Et } from "lit/directives/class-map.js";
import { ref as Ct } from "lit/directives/ref.js";
function kt() {
  var t, e, r;
  try {
    const i = typeof Salla < "u" ? (e = (t = Salla == null ? void 0 : Salla.lang) == null ? void 0 : t.getLocale) == null ? void 0 : e.call(t) : void 0, s = (r = document.documentElement.lang) == null ? void 0 : r.split(/[-_]/)[0];
    return (i || s || "ar").toLowerCase();
  } catch {
    return "ar";
  }
}
function Z(t, e = "") {
  if (t == null) return e;
  if (typeof t == "string")
    return t.trim() || e;
  if (typeof t == "number" && Number.isFinite(t))
    return String(t);
  if (typeof t == "object") {
    const r = t, s = [kt(), "ar", "en", ...Object.keys(r)];
    for (const n of s) {
      const o = r[n];
      if (typeof o == "string" && o.trim()) return o.trim();
      if (typeof o == "number" && Number.isFinite(o)) return String(o);
    }
  }
  return e;
}
function Mt(t) {
  return Object.entries(t || {}).reduce((e, [r, i]) => {
    const s = r.includes(".") ? r.split(".").pop() : r;
    return e[s] = i, e;
  }, {});
}
function Pt(t, e = "") {
  const r = typeof t == "string" || typeof t == "number" ? String(t).trim() : Z(t, "").trim();
  return r && r.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-+|-+$/g, "").slice(0, 48) || e;
}
function Lt(t, e, r = "item") {
  const i = [
    "id",
    "value",
    "key",
    "zone_id",
    "family_id",
    "character_id",
    "note_id",
    "active_id",
    "tex_id",
    "light_id",
    "pt_id",
    "cond_id",
    "color_id",
    "step_id",
    "recipe_id",
    "strength_id",
    "time_id",
    "result_id"
  ];
  for (const s of i) {
    const n = String(t[s] ?? "").trim();
    if (n) return n;
  }
  return Pt(t.name ?? t.title ?? t.label, "") || `${r}-${e + 1}`;
}
function Mi(t) {
  return Array.isArray(t) ? t.filter((e) => !!e && typeof e == "object").map((e, r) => {
    const i = Mt(e), s = i;
    return String(s.id ?? "").trim() || (s.id = Lt(s, r)), i;
  }) : [];
}
function ve(t, e = 0) {
  return typeof t == "number" && Number.isFinite(t) ? t : typeof t == "string" && t.trim() !== "" && Number.isFinite(Number(t)) ? Number(t) : t && typeof t == "object" && "value" in t ? ve(t.value, e) : e;
}
function xe(t, e = 0) {
  if (typeof t == "number" && Number.isFinite(t)) return t;
  if (typeof t == "string" && t.trim() !== "") {
    const r = Number(t.replace(",", "."));
    return Number.isFinite(r) ? r : e;
  }
  return e;
}
function Pi(t, e, r) {
  return Math.min(r, Math.max(e, t));
}
function q(t, e = !1) {
  if (typeof t == "boolean") return t;
  if (typeof t == "string") {
    const r = t.toLowerCase().trim();
    if (["true", "1", "yes", "on"].includes(r)) return !0;
    if (["false", "0", "no", "off", ""].includes(r)) return !1;
  }
  return typeof t == "number" ? t !== 0 : e;
}
function Se(t) {
  if (!t) return "";
  if (typeof t == "string") {
    const e = t.trim();
    return At(e) ? e : "";
  }
  if (Array.isArray(t)) {
    for (const e of t) {
      const r = Se(e);
      if (r) return r;
    }
    return "";
  }
  if (typeof t == "object") {
    const e = t, r = [
      e.url,
      e.href,
      e.link,
      e.value,
      e.custom,
      e.path
    ];
    for (const i of r) {
      const s = Se(i);
      if (s) return s;
    }
  }
  return "";
}
function At(t) {
  if (!t || t === "#") return !1;
  if (t.startsWith("/") || t.startsWith("#") || t.startsWith("?") || t.startsWith("mailto:") || t.startsWith("tel:") || t.startsWith("whatsapp:"))
    return !0;
  try {
    const e = new URL(t, window.location.origin);
    return ["http:", "https:", "mailto:", "tel:"].includes(e.protocol);
  } catch {
    return !1;
  }
}
function qe(t) {
  try {
    return new URL(t, window.location.origin).origin !== window.location.origin;
  } catch {
    return !1;
  }
}
function zt(t) {
  if (!t || typeof t != "string") return !1;
  try {
    const e = new URL(t, window.location.origin);
    return !!["http:", "https:"].includes(e.protocol);
  } catch {
    return !1;
  }
}
function Li(t, e = "ر.س") {
  return Number.isFinite(t) ? `${t.toLocaleString(void 0, {
    minimumFractionDigits: t % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2
  })} ${e}`.trim() : "";
}
function Ai(t = "ر.س") {
  var e, r, i, s, n, o;
  try {
    const a = window, d = a.Salla || a.salla, l = ((r = (e = d == null ? void 0 : d.config) == null ? void 0 : e.currency) == null ? void 0 : r.symbol) || ((s = (i = d == null ? void 0 : d.config) == null ? void 0 : i.currency) == null ? void 0 : s.code) || ((n = d == null ? void 0 : d.currency) == null ? void 0 : n.symbol) || ((o = d == null ? void 0 : d.currency) == null ? void 0 : o.code);
    if (typeof l == "string" && l.trim())
      return l.trim();
    const f = document.documentElement.getAttribute("data-currency");
    if (f != null && f.trim()) return f.trim();
  } catch {
  }
  return t;
}
function zi(t, e) {
  const r = /* @__PURE__ */ new Map();
  for (const i of t) {
    const s = String(i[e] ?? "").trim();
    if (!s) continue;
    const n = r.get(s) || [];
    n.push(i), r.set(s, n);
  }
  return r;
}
function Ii(t, e = "group_order") {
  return [...t].sort(
    (r, i) => xe(r[e], 0) - xe(i[e], 0)
  );
}
function H(t, e, r, i) {
  var n, o;
  return ((o = typeof document < "u" ? (n = document.documentElement.lang) == null ? void 0 : n.split(/[-_]/)[0] : "ar") == null ? void 0 : o.toLowerCase()) === "en" ? e : i || t;
}
function Oi(t, e) {
  try {
    const r = localStorage.getItem(t);
    return r ? JSON.parse(r) : e;
  } catch {
    return e;
  }
}
function $i(t, e) {
  try {
    localStorage.setItem(t, JSON.stringify(e));
  } catch {
  }
}
function Di(t, e) {
  const r = String(t || "").replace(/\D+/g, "");
  if (!r || r.length < 8) return "";
  const i = encodeURIComponent(e || "");
  return `https://wa.me/${r}${i ? `?text=${i}` : ""}`;
}
async function Bi(t) {
  var e;
  if (!t) return !1;
  try {
    if ((e = navigator.clipboard) != null && e.writeText)
      return await navigator.clipboard.writeText(t), !0;
  } catch {
  }
  try {
    const r = document.createElement("textarea");
    r.value = t, r.setAttribute("readonly", ""), r.style.position = "fixed", r.style.opacity = "0", document.body.appendChild(r), r.select();
    const i = document.execCommand("copy");
    return document.body.removeChild(r), i;
  } catch {
    return !1;
  }
}
function Ri() {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return !1;
  }
}
function Ni(t, e, r) {
  const i = t || {};
  return {
    bg: String(i[`${e}bg`] ?? (r == null ? void 0 : r.bg) ?? "#faf7f5"),
    text: String(i[`${e}text`] ?? (r == null ? void 0 : r.text) ?? "#2b211c"),
    muted: String(i[`${e}muted`] ?? (r == null ? void 0 : r.muted) ?? "#7a6a62"),
    accent: String(i[`${e}accent`] ?? (r == null ? void 0 : r.accent) ?? "#8b5e4b"),
    card: String(i[`${e}card`] ?? (r == null ? void 0 : r.card) ?? "#ffffff"),
    border: String(i[`${e}border`] ?? (r == null ? void 0 : r.border) ?? "#e8ddd6"),
    buttonBg: String(i[`${e}button_bg`] ?? (r == null ? void 0 : r.buttonBg) ?? "#8b5e4b"),
    buttonColor: String(
      i[`${e}button_color`] ?? (r == null ? void 0 : r.buttonColor) ?? "#ffffff"
    ),
    radius: `${ve(i[`${e}radius`], 16)}px`,
    spaceDesktop: ve(
      i[`${e}space_desktop`],
      48
    ),
    spaceMobile: ve(
      i[`${e}space_mobile`],
      28
    ),
    animate: q(i[`${e}animate`], !0),
    fullWidth: q(i[`${e}full_width`], !1)
  };
}
function Gi(t) {
  return {
    "--section-bg": t.bg,
    "--text-color": t.text,
    "--muted-color": t.muted,
    "--accent-color": t.accent || "var(--color-primary, var(--primary-color, #64748b))",
    /* raed-bridge */
    "--card-bg": t.card,
    "--border-color": t.border,
    "--button-bg": t.buttonBg || t.accent || "var(--color-primary, var(--primary-color, #64748b))",
    "--button-color": t.buttonColor,
    "--section-radius": t.radius,
    "--space-desktop": `${t.spaceDesktop}px`,
    "--space-mobile": `${t.spaceMobile}px`
  };
}
function De(t, e = "") {
  if (typeof t == "string" && t.trim()) return t.trim();
  if (Array.isArray(t) && t[0]) {
    const r = t[0];
    if (typeof r == "string") return r;
    if (r && typeof r == "object" && "value" in r)
      return String(r.value ?? e);
    if (r && typeof r == "object" && "key" in r)
      return String(r.key ?? e);
  }
  if (t && typeof t == "object") {
    const r = t;
    if (Array.isArray(r.selected) && r.selected[0])
      return De(r.selected, e);
    if ("value" in r && r.value != null && !Array.isArray(r.value))
      return String(r.value ?? e);
    if (Array.isArray(r.value) && r.value[0])
      return De(r.value, e);
  }
  return e;
}
function Vi(t) {
  const e = Z(t, "");
  return e ? e.split(/[,،|/]/).map((r) => r.trim()).filter(Boolean) : [];
}
function le(t) {
  if (typeof t == "number" && Number.isFinite(t)) return t;
  if (typeof t == "string" && t.trim() !== "") return xe(t, 0);
  if (t && typeof t == "object") {
    const e = t;
    if ("amount" in e) return le(e.amount);
    if ("value" in e) return le(e.value);
  }
  return 0;
}
function Q(t) {
  if (!t) return "";
  if (typeof t == "string") {
    const e = t.trim();
    return zt(e) || e.startsWith("/") ? e : "";
  }
  if (Array.isArray(t)) {
    for (const e of t) {
      const r = Q(e);
      if (r) return r;
    }
    return "";
  }
  if (typeof t == "object") {
    const e = t, r = [e.url, e.src, e.image, e.thumbnail, e.original];
    for (const i of r) {
      const s = Q(i);
      if (s) return s;
    }
  }
  return "";
}
function Be(t) {
  if (t == null) return 0;
  if (typeof t == "number" && Number.isFinite(t))
    return Math.max(0, Math.min(5, t));
  if (typeof t == "string") return Be(xe(t, 0));
  if (typeof t == "object") {
    const e = t, r = e.stars ?? e.rate ?? e.rating ?? e.average ?? e.value;
    if (r != null && r !== t) return Be(r);
  }
  return 0;
}
function Fi(t) {
  if (!t) return null;
  let e = t;
  if (Array.isArray(t))
    e = t[0];
  else if (typeof t == "object") {
    const p = t, v = Array.isArray(p.selected) ? p.selected : [], T = Array.isArray(p.value) ? p.value : [];
    v.length ? e = v[0] : T.length ? e = (typeof T[0] == "object" && T[0], T[0]) : p.product && typeof p.product == "object" ? e = p.product : p.value && typeof p.value == "object" && !Array.isArray(p.value) && (e = p.value);
  }
  if (e != null && (typeof e == "string" || typeof e == "number")) {
    const p = String(e).trim();
    return p ? { id: p, name: "", image: "", url: "", price: 0, old_price: 0, rating: 0 } : null;
  }
  if (!e || typeof e != "object") return null;
  const r = e;
  let i = String(r.id ?? r.product_id ?? "").trim();
  if (!i && r.value != null && typeof r.value != "object" && (i = String(r.value).trim()), !i && r.value && typeof r.value == "object") {
    const p = r.value;
    i = String(p.id ?? p.product_id ?? p.value ?? "").trim();
  }
  const s = Z(r.name, "").trim() || Z(r.label, "").trim() || Z(r.title, "").trim(), n = Q(r.image) || Q(r.main_image) || Q(r.thumbnail) || Q(r.images) || (r.value && typeof r.value == "object" ? Q(r.value.image) : ""), o = Se(
    r.url || r.permalink || r.link || (r.value && typeof r.value == "object" ? r.value.url : "")
  ), a = q(r.on_sale) || q(r.is_on_sale), d = le(
    r.sale_price ?? r.sale_price_amount ?? r.discounted_price
  ), l = le(
    r.regular_price ?? r.regular_price_amount ?? r.price_before
  ), f = le(r.price ?? r.price_amount);
  let u = f, h = 0;
  a && d > 0 ? (u = d, h = l > d ? l : 0) : l > f && f > 0 ? (u = f, h = l) : d > 0 && l > d && (u = d, h = l);
  const b = Be(r.rating ?? r.rate ?? r.rating_stars);
  return !i && !s && !n && !o ? null : { id: i, name: s, image: n, url: o, price: u, old_price: h, rating: b };
}
function te() {
  const t = window;
  return t.Salla || t.salla || null;
}
function Ye(t) {
  if (t == null) return !0;
  if (typeof t == "string") {
    const e = t.trim();
    return !e || e === "[]" || e === "null" || e === "undefined";
  }
  return Array.isArray(t) ? t.length === 0 : !1;
}
function we(t) {
  const e = String(t.source || "").toLowerCase().trim();
  return !(!e || e === "categories" && Ye(t.source_value) || e === "selected" && Ye(t.source_value));
}
async function ee(t) {
  var n;
  const e = te(), r = (n = e == null ? void 0 : e.api) == null ? void 0 : n.withoutNotifier, i = window, s = i.alert;
  i.alert = () => {
  };
  try {
    if (typeof r == "function")
      try {
        return await Promise.resolve(r(t));
      } catch {
      }
    return await t();
  } finally {
    i.alert = s;
  }
}
async function re() {
  const t = te();
  if (!t) return null;
  try {
    typeof t.onReady == "function" && await t.onReady();
  } catch {
  }
  return t;
}
function Re(t) {
  return t && typeof t == "object" && "data" in t ? t.data : t;
}
function Xe(t) {
  const e = Re(t);
  if (Array.isArray(e)) return e;
  if (e && typeof e == "object") {
    const r = e;
    if (Array.isArray(r.data)) return r.data;
    if (Array.isArray(r.products)) return r.products;
    if (Array.isArray(r.items)) return r.items;
  }
  return [];
}
function oe(t) {
  return t.map((e) => String(e).trim()).filter(Boolean).map((e) => {
    const r = Number(e);
    return Number.isFinite(r) && String(r) === e ? r : e;
  });
}
function It(t, e, r) {
  const i = String(t || "").toLowerCase().trim();
  if (!i) return null;
  const s = Math.max(1, Math.min(40, Number(r) || 8)), n = {
    source: i,
    per_page: s,
    limit: s
  }, o = String(e ?? "").trim();
  let a = o;
  if (!o || o === "[]")
    a = i === "sales" ? "sales" : [];
  else
    try {
      a = JSON.parse(o);
    } catch {
      a = o;
    }
  return i === "latest" ? n : i === "sales" ? (n.source_value = a || "sales", we(n) ? n : null) : (n.source_value = a, we(n) ? n : null);
}
async function at(t) {
  var e, r, i;
  try {
    if (!we(t)) return [];
    const s = await re();
    if (!(s != null && s.product)) return [];
    const n = [
      (e = s.product.fetch) == null ? void 0 : e.bind(s.product),
      (i = (r = s.product.api) == null ? void 0 : r.fetch) == null ? void 0 : i.bind(s.product.api)
    ].filter(
      (o) => typeof o == "function"
    );
    return n.length ? await ee(async () => {
      for (const o of n)
        try {
          const a = Xe(await o(t));
          if (a.length) return a;
        } catch {
        }
      if (String(t.source) === "latest")
        for (const o of n)
          try {
            const a = Xe(
              await o({ source: "latest", limit: t.limit, per_page: t.per_page })
            );
            if (a.length) return a;
          } catch {
          }
      return [];
    }) : [];
  } catch {
    return [];
  }
}
async function Ot(t) {
  try {
    const e = await re();
    return !(e != null && e.product) || t == null || t === "" ? null : await ee(async () => {
      var r;
      try {
        if (typeof e.product.getDetails == "function")
          return Re(await e.product.getDetails(t));
      } catch {
      }
      try {
        if (typeof ((r = e.product.api) == null ? void 0 : r.getDetails) == "function")
          return Re(await e.product.api.getDetails(t));
      } catch {
        return null;
      }
      return null;
    });
  } catch {
    return null;
  }
}
function $t(t) {
  if (t == null) return "";
  if (typeof t == "number" || typeof t == "string") return String(t).trim();
  if (typeof t != "object") return "";
  const e = t, r = e.id ?? e.product_id ?? e.value;
  if (r != null && typeof r != "object") return String(r).trim();
  if (r && typeof r == "object") {
    const i = r;
    return String(i.id ?? i.product_id ?? i.value ?? "").trim();
  }
  return "";
}
async function ji(t) {
  const e = [...new Set(t.map((n) => String(n).trim()).filter(Boolean))], r = /* @__PURE__ */ new Map();
  if (!e.length) return r;
  const i = await at({
    source: "selected",
    source_value: oe(e),
    limit: e.length
  });
  for (const n of i) {
    const o = $t(n);
    o && r.set(o, n);
  }
  const s = e.filter((n) => !r.has(n));
  if (s.length) {
    const n = await Promise.all(
      s.map(async (o) => {
        const a = await Ot(o);
        return [o, a];
      })
    );
    for (const [o, a] of n)
      a && r.set(o, a);
  }
  return r;
}
function Dt(t) {
  const e = Number(t);
  return Number.isFinite(e) && String(e) === String(t).trim() ? e : t;
}
async function lt(t, e) {
  if (typeof t != "function") return !1;
  const r = Dt(e), i = [
    { id: r, quantity: 1 },
    { product_id: r, quantity: 1 }
  ], s = new FormData();
  s.append("id", String(r)), s.append("quantity", "1"), i.push(s);
  const n = new FormData();
  n.append("product_id", String(r)), n.append("quantity", "1"), i.push(n);
  for (const o of i)
    try {
      return await t(o), !0;
    } catch {
    }
  return !1;
}
async function Hi(t) {
  var a, d;
  const e = t.map((l) => String(l).trim()).filter(Boolean).map((l) => {
    const f = Number(l);
    return Number.isFinite(f) && String(f) === l ? f : l;
  });
  if (!e.length)
    return { ok: !1, added: 0, error: "empty" };
  const r = await re(), i = r == null ? void 0 : r.cart, s = (a = i == null ? void 0 : i.addItem) == null ? void 0 : a.bind(i), n = (d = i == null ? void 0 : i.addItems) == null ? void 0 : d.bind(i);
  if (typeof s != "function" && typeof n != "function")
    return { ok: !1, added: 0, error: "unavailable" };
  let o = 0;
  try {
    return await ee(async () => {
      if (typeof n == "function")
        try {
          await n(e.map((l) => ({ id: l, quantity: 1 }))), o = e.length;
          return;
        } catch {
        }
      for (const l of e)
        await lt(s, l) && (o += 1);
    }), o === e.length ? { ok: !0, added: o } : o > 0 ? { ok: !1, added: o, error: "partial" } : { ok: !1, added: 0, error: "failed" };
  } catch {
    return { ok: !1, added: o, error: o > 0 ? "partial" : "failed" };
  }
}
async function Wi(t) {
  var n;
  const e = await re(), r = e == null ? void 0 : e.cart, i = (n = r == null ? void 0 : r.addItem) == null ? void 0 : n.bind(r);
  if (typeof i != "function")
    return { ok: !1, error: "unavailable" };
  let s = !1;
  try {
    await ee(async () => {
      s = await lt(i, t);
    });
  } catch {
    s = !1;
  }
  return s ? { ok: !0 } : { ok: !1, error: "failed" };
}
function Bt(t) {
  var i;
  const e = te(), r = (i = e == null ? void 0 : e.storage) == null ? void 0 : i.get;
  if (typeof r != "function") return !1;
  try {
    const s = r("salla::wishlist", []);
    return Array.isArray(s) ? s.map((n) => String(n)).includes(String(t)) : !1;
  } catch {
    return !1;
  }
}
async function qi(t) {
  const e = await re(), r = e == null ? void 0 : e.wishlist, i = Bt(t);
  try {
    if (typeof (r == null ? void 0 : r.toggle) == "function")
      return await ee(async () => {
        await Promise.resolve(r.toggle(t));
      }), !i;
    if (!i && typeof (r == null ? void 0 : r.add) == "function")
      return await ee(async () => {
        await Promise.resolve(r.add(t));
      }), !0;
    if (i && typeof (r == null ? void 0 : r.remove) == "function")
      return await ee(async () => {
        await Promise.resolve(r.remove(t));
      }), !1;
  } catch {
    return null;
  }
  return null;
}
const Rt = /* @__PURE__ */ new Set([
  "none",
  "categories",
  "brands",
  "sales",
  "latest",
  "selected",
  "tags"
]);
function Nt(t) {
  if (!t) return [];
  if (Array.isArray(t)) return t;
  if (typeof t == "object") {
    const e = t;
    if (Array.isArray(e.selected) && e.selected.length) return e.selected;
    if (Array.isArray(e.value) && e.value.length) return e.value;
    if (Array.isArray(e.data) && e.data.length) return e.data;
    if (Array.isArray(e.items) && e.items.length) return e.items;
    if (Array.isArray(e.products) && e.products.length) return e.products;
    if ("id" in e || "value" in e || "name" in e || "label" in e)
      return [e];
  }
  return typeof t == "number" || typeof t == "string" ? [t] : [];
}
function Ne(t) {
  if (t == null) return "";
  if (typeof t == "number" || typeof t == "string")
    return String(t).trim();
  if (typeof t != "object") return "";
  const e = t, r = e.id ?? e.value ?? e.product_id ?? e.category_id ?? e.brand_id ?? e.key;
  return Array.isArray(r) ? Ne(r[0]) : r != null && typeof r != "object" ? String(r).trim() : r && typeof r == "object" ? Ne(r) : "";
}
function he(t) {
  const e = [], r = /* @__PURE__ */ new Set();
  for (const i of Nt(t)) {
    const s = Ne(i);
    !s || Rt.has(s.toLowerCase()) || r.has(s) || (r.add(s), e.push(s));
  }
  return e;
}
function Ge(t) {
  const e = De(t, "").toLowerCase().trim();
  return !e || e === "none" ? "" : e === "categories" || e === "brands" || e === "sales" || e === "latest" || e === "selected" || e === "tags" ? e : "";
}
function dt(t) {
  if (!t || typeof t != "object") return "";
  const e = t, r = String(
    e.source ?? e.key ?? e.type ?? e.format ?? ""
  ).toLowerCase().trim();
  return r === "brands" || r === "brand" ? "brands" : r === "categories" || r === "category" ? "categories" : r === "products" || r === "product" ? "products" : Array.isArray(e.selected) && e.selected[0] && typeof e.selected[0] == "object" ? dt(e.selected[0]) : "";
}
function se(t) {
  let e = Ge(t.source);
  const r = he(t.chosen), i = he(t.category), s = he(t.brand), n = he(t.tags), o = Math.max(1, Math.min(40, Number(t.limit) || 6));
  if (!e && t.fallbackSelectedWhenChosen !== !1 && r.length && (e = "selected"), !e && i.length && (e = "categories"), !e && s.length && (e = "brands"), !e && n.length && (e = "tags"), e === "selected")
    return r.length ? {
      source: e,
      sourceValue: JSON.stringify(oe(r)),
      limit: Math.min(o, r.length) || o
    } : null;
  if (e === "categories") {
    if (!i.length) return null;
    const a = oe(i);
    return {
      source: e,
      sourceValue: a.length === 1 ? String(a[0]) : JSON.stringify(a),
      limit: o
    };
  }
  if (e === "brands") {
    if (!s.length) return null;
    const a = oe(s);
    return {
      source: e,
      sourceValue: a.length === 1 ? String(a[0]) : JSON.stringify(a),
      limit: o
    };
  }
  if (e === "tags") {
    if (!n.length) return null;
    const a = oe(n);
    return {
      source: e,
      sourceValue: a.length === 1 ? String(a[0]) : JSON.stringify(a),
      limit: o
    };
  }
  return e === "sales" ? { source: e, sourceValue: "sales", limit: o } : e === "latest" ? { source: e, sourceValue: "[]", limit: o } : null;
}
function Gt(t) {
  const e = Math.max(1, Math.min(40, Number(t.limit) || 8)), r = se({
    source: t.source,
    chosen: t.chosen,
    category: t.category,
    brand: t.brand,
    tags: t.tags,
    limit: e,
    fallbackSelectedWhenChosen: !0
  });
  if (r) return r;
  const i = dt(t.link);
  return i === "brands" ? se({
    source: "brands",
    brand: t.link,
    limit: e
  }) : i === "categories" ? se({
    source: "categories",
    category: t.link,
    limit: e
  }) : i === "products" ? se({
    source: "selected",
    chosen: t.link,
    limit: e
  }) : null;
}
function Vt(t, e = 8) {
  const r = t.products, i = Ge(r), s = t.products_source ?? t.product_source ?? t.source ?? (i ? r : void 0), n = Ge(s), o = !i && r != null ? r : void 0;
  return {
    source: n || void 0,
    chosen: t.chosen_products ?? o,
    category: t.categories ?? t.category,
    brand: t.brands ?? t.salla_brand ?? t.product_brands ?? (t.brand && typeof t.brand == "object" ? t.brand : void 0),
    tags: t.tags,
    link: n ? void 0 : t.link,
    limit: e
  };
}
function ct(t, e) {
  const r = Math.max(
    1,
    Math.min(40, Number(t[`${e}products_limit`]) || 8)
  ), i = t[`${e}products_source`] ?? t[`${e}product_source`], s = t[`${e}chosen_products`] ?? t[`${e}products`], n = t[`${e}categories`] ?? t[`${e}category`], o = t[`${e}product_brands`] ?? t[`${e}brands`] ?? t[`${e}brand`], a = se({
    source: i,
    chosen: s,
    category: n,
    brand: o,
    tags: t[`${e}tags`],
    limit: r,
    fallbackSelectedWhenChosen: !0
  });
  return a || se({ source: "latest", limit: r });
}
function Ft(t, e, r) {
  const i = Math.max(
    1,
    Math.min(40, Number(t[`${e}products_limit`]) || 8)
  );
  if (r && typeof r == "object") {
    const s = r, n = s.products;
    let o;
    n && typeof n == "object" && !Array.isArray(n) ? o = {
      ...n,
      link: n.link ?? s.link,
      limit: i
    } : "source" in s || "chosen" in s ? o = { ...r, limit: i } : o = Vt(s, i);
    const a = Gt(o);
    if (a) return a;
  }
  return ct(t, e);
}
function Ue(t) {
  return t !== null && typeof t == "object" && "constructor" in t && t.constructor === Object;
}
function He(t, e) {
  t === void 0 && (t = {}), e === void 0 && (e = {});
  const r = ["__proto__", "constructor", "prototype"];
  Object.keys(e).filter((i) => r.indexOf(i) < 0).forEach((i) => {
    typeof t[i] > "u" ? t[i] = e[i] : Ue(e[i]) && Ue(t[i]) && Object.keys(e[i]).length > 0 && He(t[i], e[i]);
  });
}
const ft = {
  body: {},
  addEventListener() {
  },
  removeEventListener() {
  },
  activeElement: {
    blur() {
    },
    nodeName: ""
  },
  querySelector() {
    return null;
  },
  querySelectorAll() {
    return [];
  },
  getElementById() {
    return null;
  },
  createEvent() {
    return {
      initEvent() {
      }
    };
  },
  createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {
      },
      getElementsByTagName() {
        return [];
      }
    };
  },
  createElementNS() {
    return {};
  },
  importNode() {
    return null;
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: ""
  }
};
function Y() {
  const t = typeof document < "u" ? document : {};
  return He(t, ft), t;
}
const jt = {
  document: ft,
  navigator: {
    userAgent: ""
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: ""
  },
  history: {
    replaceState() {
    },
    pushState() {
    },
    go() {
    },
    back() {
    }
  },
  CustomEvent: function() {
    return this;
  },
  addEventListener() {
  },
  removeEventListener() {
  },
  getComputedStyle() {
    return {
      getPropertyValue() {
        return "";
      }
    };
  },
  Image() {
  },
  Date() {
  },
  screen: {},
  setTimeout() {
  },
  clearTimeout() {
  },
  matchMedia() {
    return {};
  },
  requestAnimationFrame(t) {
    return typeof setTimeout > "u" ? (t(), null) : setTimeout(t, 0);
  },
  cancelAnimationFrame(t) {
    typeof setTimeout > "u" || clearTimeout(t);
  }
};
function N() {
  const t = typeof window < "u" ? window : {};
  return He(t, jt), t;
}
function Ht(t) {
  return t === void 0 && (t = ""), t.trim().split(" ").filter((e) => !!e.trim());
}
function Wt(t) {
  const e = t;
  Object.keys(e).forEach((r) => {
    try {
      e[r] = null;
    } catch {
    }
    try {
      delete e[r];
    } catch {
    }
  });
}
function ut(t, e) {
  return e === void 0 && (e = 0), setTimeout(t, e);
}
function Te() {
  return Date.now();
}
function qt(t) {
  const e = N();
  let r;
  return e.getComputedStyle && (r = e.getComputedStyle(t, null)), !r && t.currentStyle && (r = t.currentStyle), r || (r = t.style), r;
}
function Yt(t, e) {
  e === void 0 && (e = "x");
  const r = N();
  let i, s, n;
  const o = qt(t);
  return r.WebKitCSSMatrix ? (s = o.transform || o.webkitTransform, s.split(",").length > 6 && (s = s.split(", ").map((a) => a.replace(",", ".")).join(", ")), n = new r.WebKitCSSMatrix(s === "none" ? "" : s)) : (n = o.MozTransform || o.OTransform || o.MsTransform || o.msTransform || o.transform || o.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), i = n.toString().split(",")), e === "x" && (r.WebKitCSSMatrix ? s = n.m41 : i.length === 16 ? s = parseFloat(i[12]) : s = parseFloat(i[4])), e === "y" && (r.WebKitCSSMatrix ? s = n.m42 : i.length === 16 ? s = parseFloat(i[13]) : s = parseFloat(i[5])), s || 0;
}
function ge(t) {
  return typeof t == "object" && t !== null && t.constructor && Object.prototype.toString.call(t).slice(8, -1) === "Object";
}
function Xt(t) {
  return typeof window < "u" && typeof window.HTMLElement < "u" ? t instanceof HTMLElement : t && (t.nodeType === 1 || t.nodeType === 11);
}
function G() {
  const t = Object(arguments.length <= 0 ? void 0 : arguments[0]), e = ["__proto__", "constructor", "prototype"];
  for (let r = 1; r < arguments.length; r += 1) {
    const i = r < 0 || arguments.length <= r ? void 0 : arguments[r];
    if (i != null && !Xt(i)) {
      const s = Object.keys(Object(i)).filter((n) => e.indexOf(n) < 0);
      for (let n = 0, o = s.length; n < o; n += 1) {
        const a = s[n], d = Object.getOwnPropertyDescriptor(i, a);
        d !== void 0 && d.enumerable && (ge(t[a]) && ge(i[a]) ? i[a].__swiper__ ? t[a] = i[a] : G(t[a], i[a]) : !ge(t[a]) && ge(i[a]) ? (t[a] = {}, i[a].__swiper__ ? t[a] = i[a] : G(t[a], i[a])) : t[a] = i[a]);
      }
    }
  }
  return t;
}
function be(t, e, r) {
  t.style.setProperty(e, r);
}
function pt(t) {
  let {
    swiper: e,
    targetPosition: r,
    side: i
  } = t;
  const s = N(), n = -e.translate;
  let o = null, a;
  const d = e.params.speed;
  e.wrapperEl.style.scrollSnapType = "none", s.cancelAnimationFrame(e.cssModeFrameID);
  const l = r > n ? "next" : "prev", f = (h, b) => l === "next" && h >= b || l === "prev" && h <= b, u = () => {
    a = (/* @__PURE__ */ new Date()).getTime(), o === null && (o = a);
    const h = Math.max(Math.min((a - o) / d, 1), 0), b = 0.5 - Math.cos(h * Math.PI) / 2;
    let p = n + b * (r - n);
    if (f(p, r) && (p = r), e.wrapperEl.scrollTo({
      [i]: p
    }), f(p, r)) {
      e.wrapperEl.style.overflow = "hidden", e.wrapperEl.style.scrollSnapType = "", setTimeout(() => {
        e.wrapperEl.style.overflow = "", e.wrapperEl.scrollTo({
          [i]: p
        });
      }), s.cancelAnimationFrame(e.cssModeFrameID);
      return;
    }
    e.cssModeFrameID = s.requestAnimationFrame(u);
  };
  u();
}
function W(t, e) {
  e === void 0 && (e = "");
  const r = N(), i = [...t.children];
  return r.HTMLSlotElement && t instanceof HTMLSlotElement && i.push(...t.assignedElements()), e ? i.filter((s) => s.matches(e)) : i;
}
function Ut(t, e) {
  const r = [e];
  for (; r.length > 0; ) {
    const i = r.shift();
    if (t === i)
      return !0;
    r.push(...i.children, ...i.shadowRoot ? i.shadowRoot.children : [], ...i.assignedElements ? i.assignedElements() : []);
  }
}
function Kt(t, e) {
  const r = N();
  let i = e.contains(t);
  return !i && r.HTMLSlotElement && e instanceof HTMLSlotElement && (i = [...e.assignedElements()].includes(t), i || (i = Ut(t, e))), i;
}
function _e(t) {
  try {
    console.warn(t);
    return;
  } catch {
  }
}
function ce(t, e) {
  e === void 0 && (e = []);
  const r = document.createElement(t);
  return r.classList.add(...Array.isArray(e) ? e : Ht(e)), r;
}
function Jt(t, e) {
  const r = [];
  for (; t.previousElementSibling; ) {
    const i = t.previousElementSibling;
    e ? i.matches(e) && r.push(i) : r.push(i), t = i;
  }
  return r;
}
function Qt(t, e) {
  const r = [];
  for (; t.nextElementSibling; ) {
    const i = t.nextElementSibling;
    e ? i.matches(e) && r.push(i) : r.push(i), t = i;
  }
  return r;
}
function J(t, e) {
  return N().getComputedStyle(t, null).getPropertyValue(e);
}
function fe(t) {
  let e = t, r;
  if (e) {
    for (r = 0; (e = e.previousSibling) !== null; )
      e.nodeType === 1 && (r += 1);
    return r;
  }
}
function mt(t, e) {
  const r = [];
  let i = t.parentElement;
  for (; i; )
    e ? i.matches(e) && r.push(i) : r.push(i), i = i.parentElement;
  return r;
}
function Ve(t, e, r) {
  const i = N();
  return t[e === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(i.getComputedStyle(t, null).getPropertyValue(e === "width" ? "margin-right" : "margin-top")) + parseFloat(i.getComputedStyle(t, null).getPropertyValue(e === "width" ? "margin-left" : "margin-bottom"));
}
function O(t) {
  return (Array.isArray(t) ? t : [t]).filter((e) => !!e);
}
function Fe(t, e) {
  e === void 0 && (e = ""), typeof trustedTypes < "u" ? t.innerHTML = trustedTypes.createPolicy("html", {
    createHTML: (r) => r
  }).createHTML(e) : t.innerHTML = e;
}
let Ce;
function Zt() {
  const t = N(), e = Y();
  return {
    smoothScroll: e.documentElement && e.documentElement.style && "scrollBehavior" in e.documentElement.style,
    touch: !!("ontouchstart" in t || t.DocumentTouch && e instanceof t.DocumentTouch)
  };
}
function ht() {
  return Ce || (Ce = Zt()), Ce;
}
let ke;
function er(t) {
  let {
    userAgent: e
  } = t === void 0 ? {} : t;
  const r = ht(), i = N(), s = i.navigator.platform, n = e || i.navigator.userAgent, o = {
    ios: !1,
    android: !1
  }, a = i.screen.width, d = i.screen.height, l = n.match(/(Android);?[\s\/]+([\d.]+)?/);
  let f = n.match(/(iPad).*OS\s([\d_]+)/);
  const u = n.match(/(iPod)(.*OS\s([\d_]+))?/), h = !f && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/), b = s === "Win32";
  let p = s === "MacIntel";
  const v = ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"];
  return !f && p && r.touch && v.indexOf(`${a}x${d}`) >= 0 && (f = n.match(/(Version)\/([\d.]+)/), f || (f = [0, 1, "13_0_0"]), p = !1), l && !b && (o.os = "android", o.android = !0), (f || h || u) && (o.os = "ios", o.ios = !0), o;
}
function gt(t) {
  return t === void 0 && (t = {}), ke || (ke = er(t)), ke;
}
let Me;
function tr() {
  const t = N(), e = gt();
  let r = !1;
  function i() {
    const a = t.navigator.userAgent.toLowerCase();
    return a.indexOf("safari") >= 0 && a.indexOf("chrome") < 0 && a.indexOf("android") < 0;
  }
  if (i()) {
    const a = String(t.navigator.userAgent);
    if (a.includes("Version/")) {
      const [d, l] = a.split("Version/")[1].split(" ")[0].split(".").map((f) => Number(f));
      r = d < 16 || d === 16 && l < 2;
    }
  }
  const s = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(t.navigator.userAgent), n = i(), o = n || s && e.ios;
  return {
    isSafari: r || n,
    needPerspectiveFix: r,
    need3dFix: o,
    isWebView: s
  };
}
function bt() {
  return Me || (Me = tr()), Me;
}
function rr(t) {
  let {
    swiper: e,
    on: r,
    emit: i
  } = t;
  const s = N();
  let n = null, o = null;
  const a = () => {
    !e || e.destroyed || !e.initialized || (i("beforeResize"), i("resize"));
  }, d = () => {
    !e || e.destroyed || !e.initialized || (n = new ResizeObserver((u) => {
      o = s.requestAnimationFrame(() => {
        const {
          width: h,
          height: b
        } = e;
        let p = h, v = b;
        u.forEach((T) => {
          let {
            contentBoxSize: y,
            contentRect: c,
            target: m
          } = T;
          m && m !== e.el || (p = c ? c.width : (y[0] || y).inlineSize, v = c ? c.height : (y[0] || y).blockSize);
        }), (p !== h || v !== b) && a();
      });
    }), n.observe(e.el));
  }, l = () => {
    o && s.cancelAnimationFrame(o), n && n.unobserve && e.el && (n.unobserve(e.el), n = null);
  }, f = () => {
    !e || e.destroyed || !e.initialized || i("orientationchange");
  };
  r("init", () => {
    if (e.params.resizeObserver && typeof s.ResizeObserver < "u") {
      d();
      return;
    }
    s.addEventListener("resize", a), s.addEventListener("orientationchange", f);
  }), r("destroy", () => {
    l(), s.removeEventListener("resize", a), s.removeEventListener("orientationchange", f);
  });
}
function ir(t) {
  let {
    swiper: e,
    extendParams: r,
    on: i,
    emit: s
  } = t;
  const n = [], o = N(), a = function(f, u) {
    u === void 0 && (u = {});
    const h = o.MutationObserver || o.WebkitMutationObserver, b = new h((p) => {
      if (e.__preventObserver__) return;
      if (p.length === 1) {
        s("observerUpdate", p[0]);
        return;
      }
      const v = function() {
        s("observerUpdate", p[0]);
      };
      o.requestAnimationFrame ? o.requestAnimationFrame(v) : o.setTimeout(v, 0);
    });
    b.observe(f, {
      attributes: typeof u.attributes > "u" ? !0 : u.attributes,
      childList: e.isElement || (typeof u.childList > "u" ? !0 : u).childList,
      characterData: typeof u.characterData > "u" ? !0 : u.characterData
    }), n.push(b);
  }, d = () => {
    if (e.params.observer) {
      if (e.params.observeParents) {
        const f = mt(e.hostEl);
        for (let u = 0; u < f.length; u += 1)
          a(f[u]);
      }
      a(e.hostEl, {
        childList: e.params.observeSlideChildren
      }), a(e.wrapperEl, {
        attributes: !1
      });
    }
  }, l = () => {
    n.forEach((f) => {
      f.disconnect();
    }), n.splice(0, n.length);
  };
  r({
    observer: !1,
    observeParents: !1,
    observeSlideChildren: !1
  }), i("init", d), i("destroy", l);
}
var sr = {
  on(t, e, r) {
    const i = this;
    if (!i.eventsListeners || i.destroyed || typeof e != "function") return i;
    const s = r ? "unshift" : "push";
    return t.split(" ").forEach((n) => {
      i.eventsListeners[n] || (i.eventsListeners[n] = []), i.eventsListeners[n][s](e);
    }), i;
  },
  once(t, e, r) {
    const i = this;
    if (!i.eventsListeners || i.destroyed || typeof e != "function") return i;
    function s() {
      i.off(t, s), s.__emitterProxy && delete s.__emitterProxy;
      for (var n = arguments.length, o = new Array(n), a = 0; a < n; a++)
        o[a] = arguments[a];
      e.apply(i, o);
    }
    return s.__emitterProxy = e, i.on(t, s, r);
  },
  onAny(t, e) {
    const r = this;
    if (!r.eventsListeners || r.destroyed || typeof t != "function") return r;
    const i = e ? "unshift" : "push";
    return r.eventsAnyListeners.indexOf(t) < 0 && r.eventsAnyListeners[i](t), r;
  },
  offAny(t) {
    const e = this;
    if (!e.eventsListeners || e.destroyed || !e.eventsAnyListeners) return e;
    const r = e.eventsAnyListeners.indexOf(t);
    return r >= 0 && e.eventsAnyListeners.splice(r, 1), e;
  },
  off(t, e) {
    const r = this;
    return !r.eventsListeners || r.destroyed || !r.eventsListeners || t.split(" ").forEach((i) => {
      typeof e > "u" ? r.eventsListeners[i] = [] : r.eventsListeners[i] && r.eventsListeners[i].forEach((s, n) => {
        (s === e || s.__emitterProxy && s.__emitterProxy === e) && r.eventsListeners[i].splice(n, 1);
      });
    }), r;
  },
  emit() {
    const t = this;
    if (!t.eventsListeners || t.destroyed || !t.eventsListeners) return t;
    let e, r, i;
    for (var s = arguments.length, n = new Array(s), o = 0; o < s; o++)
      n[o] = arguments[o];
    return typeof n[0] == "string" || Array.isArray(n[0]) ? (e = n[0], r = n.slice(1, n.length), i = t) : (e = n[0].events, r = n[0].data, i = n[0].context || t), r.unshift(i), (Array.isArray(e) ? e : e.split(" ")).forEach((d) => {
      t.eventsAnyListeners && t.eventsAnyListeners.length && t.eventsAnyListeners.forEach((l) => {
        l.apply(i, [d, ...r]);
      }), t.eventsListeners && t.eventsListeners[d] && t.eventsListeners[d].forEach((l) => {
        l.apply(i, r);
      });
    }), t;
  }
};
function nr() {
  const t = this;
  let e, r;
  const i = t.el;
  typeof t.params.width < "u" && t.params.width !== null ? e = t.params.width : e = i.clientWidth, typeof t.params.height < "u" && t.params.height !== null ? r = t.params.height : r = i.clientHeight, !(e === 0 && t.isHorizontal() || r === 0 && t.isVertical()) && (e = e - parseInt(J(i, "padding-left") || 0, 10) - parseInt(J(i, "padding-right") || 0, 10), r = r - parseInt(J(i, "padding-top") || 0, 10) - parseInt(J(i, "padding-bottom") || 0, 10), Number.isNaN(e) && (e = 0), Number.isNaN(r) && (r = 0), Object.assign(t, {
    width: e,
    height: r,
    size: t.isHorizontal() ? e : r
  }));
}
function or() {
  const t = this;
  function e(_, E) {
    return parseFloat(_.getPropertyValue(t.getDirectionLabel(E)) || 0);
  }
  const r = t.params, {
    wrapperEl: i,
    slidesEl: s,
    size: n,
    rtlTranslate: o,
    wrongRTL: a
  } = t, d = t.virtual && r.virtual.enabled, l = d ? t.virtual.slides.length : t.slides.length, f = W(s, `.${t.params.slideClass}, swiper-slide`), u = d ? t.virtual.slides.length : f.length;
  let h = [];
  const b = [], p = [];
  let v = r.slidesOffsetBefore;
  typeof v == "function" && (v = r.slidesOffsetBefore.call(t));
  let T = r.slidesOffsetAfter;
  typeof T == "function" && (T = r.slidesOffsetAfter.call(t));
  const y = t.snapGrid.length, c = t.slidesGrid.length;
  let m = r.spaceBetween, w = -v, x = 0, C = 0;
  if (typeof n > "u")
    return;
  typeof m == "string" && m.indexOf("%") >= 0 ? m = parseFloat(m.replace("%", "")) / 100 * n : typeof m == "string" && (m = parseFloat(m)), t.virtualSize = -m, f.forEach((_) => {
    o ? _.style.marginLeft = "" : _.style.marginRight = "", _.style.marginBottom = "", _.style.marginTop = "";
  }), r.centeredSlides && r.cssMode && (be(i, "--swiper-centered-offset-before", ""), be(i, "--swiper-centered-offset-after", ""));
  const k = r.grid && r.grid.rows > 1 && t.grid;
  k ? t.grid.initSlides(f) : t.grid && t.grid.unsetSlides();
  let P;
  const z = r.slidesPerView === "auto" && r.breakpoints && Object.keys(r.breakpoints).filter((_) => typeof r.breakpoints[_].slidesPerView < "u").length > 0;
  for (let _ = 0; _ < u; _ += 1) {
    P = 0;
    let E;
    if (f[_] && (E = f[_]), k && t.grid.updateSlide(_, E, f), !(f[_] && J(E, "display") === "none")) {
      if (r.slidesPerView === "auto") {
        z && (f[_].style[t.getDirectionLabel("width")] = "");
        const L = getComputedStyle(E), A = E.style.transform, $ = E.style.webkitTransform;
        if (A && (E.style.transform = "none"), $ && (E.style.webkitTransform = "none"), r.roundLengths)
          P = t.isHorizontal() ? Ve(E, "width") : Ve(E, "height");
        else {
          const D = e(L, "width"), M = e(L, "padding-left"), g = e(L, "padding-right"), S = e(L, "margin-left"), I = e(L, "margin-right"), B = L.getPropertyValue("box-sizing");
          if (B && B === "border-box")
            P = D + S + I;
          else {
            const {
              clientWidth: X,
              offsetWidth: U
            } = E;
            P = D + M + g + S + I + (U - X);
          }
        }
        A && (E.style.transform = A), $ && (E.style.webkitTransform = $), r.roundLengths && (P = Math.floor(P));
      } else
        P = (n - (r.slidesPerView - 1) * m) / r.slidesPerView, r.roundLengths && (P = Math.floor(P)), f[_] && (f[_].style[t.getDirectionLabel("width")] = `${P}px`);
      f[_] && (f[_].swiperSlideSize = P), p.push(P), r.centeredSlides ? (w = w + P / 2 + x / 2 + m, x === 0 && _ !== 0 && (w = w - n / 2 - m), _ === 0 && (w = w - n / 2 - m), Math.abs(w) < 1 / 1e3 && (w = 0), r.roundLengths && (w = Math.floor(w)), C % r.slidesPerGroup === 0 && h.push(w), b.push(w)) : (r.roundLengths && (w = Math.floor(w)), (C - Math.min(t.params.slidesPerGroupSkip, C)) % t.params.slidesPerGroup === 0 && h.push(w), b.push(w), w = w + P + m), t.virtualSize += P + m, x = P, C += 1;
    }
  }
  if (t.virtualSize = Math.max(t.virtualSize, n) + T, o && a && (r.effect === "slide" || r.effect === "coverflow") && (i.style.width = `${t.virtualSize + m}px`), r.setWrapperSize && (i.style[t.getDirectionLabel("width")] = `${t.virtualSize + m}px`), k && t.grid.updateWrapperSize(P, h), !r.centeredSlides) {
    const _ = [];
    for (let E = 0; E < h.length; E += 1) {
      let L = h[E];
      r.roundLengths && (L = Math.floor(L)), h[E] <= t.virtualSize - n && _.push(L);
    }
    h = _, Math.floor(t.virtualSize - n) - Math.floor(h[h.length - 1]) > 1 && h.push(t.virtualSize - n);
  }
  if (d && r.loop) {
    const _ = p[0] + m;
    if (r.slidesPerGroup > 1) {
      const E = Math.ceil((t.virtual.slidesBefore + t.virtual.slidesAfter) / r.slidesPerGroup), L = _ * r.slidesPerGroup;
      for (let A = 0; A < E; A += 1)
        h.push(h[h.length - 1] + L);
    }
    for (let E = 0; E < t.virtual.slidesBefore + t.virtual.slidesAfter; E += 1)
      r.slidesPerGroup === 1 && h.push(h[h.length - 1] + _), b.push(b[b.length - 1] + _), t.virtualSize += _;
  }
  if (h.length === 0 && (h = [0]), m !== 0) {
    const _ = t.isHorizontal() && o ? "marginLeft" : t.getDirectionLabel("marginRight");
    f.filter((E, L) => !r.cssMode || r.loop ? !0 : L !== f.length - 1).forEach((E) => {
      E.style[_] = `${m}px`;
    });
  }
  if (r.centeredSlides && r.centeredSlidesBounds) {
    let _ = 0;
    p.forEach((L) => {
      _ += L + (m || 0);
    }), _ -= m;
    const E = _ > n ? _ - n : 0;
    h = h.map((L) => L <= 0 ? -v : L > E ? E + T : L);
  }
  if (r.centerInsufficientSlides) {
    let _ = 0;
    p.forEach((L) => {
      _ += L + (m || 0);
    }), _ -= m;
    const E = (r.slidesOffsetBefore || 0) + (r.slidesOffsetAfter || 0);
    if (_ + E < n) {
      const L = (n - _ - E) / 2;
      h.forEach((A, $) => {
        h[$] = A - L;
      }), b.forEach((A, $) => {
        b[$] = A + L;
      });
    }
  }
  if (Object.assign(t, {
    slides: f,
    snapGrid: h,
    slidesGrid: b,
    slidesSizesGrid: p
  }), r.centeredSlides && r.cssMode && !r.centeredSlidesBounds) {
    be(i, "--swiper-centered-offset-before", `${-h[0]}px`), be(i, "--swiper-centered-offset-after", `${t.size / 2 - p[p.length - 1] / 2}px`);
    const _ = -t.snapGrid[0], E = -t.slidesGrid[0];
    t.snapGrid = t.snapGrid.map((L) => L + _), t.slidesGrid = t.slidesGrid.map((L) => L + E);
  }
  if (u !== l && t.emit("slidesLengthChange"), h.length !== y && (t.params.watchOverflow && t.checkOverflow(), t.emit("snapGridLengthChange")), b.length !== c && t.emit("slidesGridLengthChange"), r.watchSlidesProgress && t.updateSlidesOffset(), t.emit("slidesUpdated"), !d && !r.cssMode && (r.effect === "slide" || r.effect === "fade")) {
    const _ = `${r.containerModifierClass}backface-hidden`, E = t.el.classList.contains(_);
    u <= r.maxBackfaceHiddenSlides ? E || t.el.classList.add(_) : E && t.el.classList.remove(_);
  }
}
function ar(t) {
  const e = this, r = [], i = e.virtual && e.params.virtual.enabled;
  let s = 0, n;
  typeof t == "number" ? e.setTransition(t) : t === !0 && e.setTransition(e.params.speed);
  const o = (a) => i ? e.slides[e.getSlideIndexByData(a)] : e.slides[a];
  if (e.params.slidesPerView !== "auto" && e.params.slidesPerView > 1)
    if (e.params.centeredSlides)
      (e.visibleSlides || []).forEach((a) => {
        r.push(a);
      });
    else
      for (n = 0; n < Math.ceil(e.params.slidesPerView); n += 1) {
        const a = e.activeIndex + n;
        if (a > e.slides.length && !i) break;
        r.push(o(a));
      }
  else
    r.push(o(e.activeIndex));
  for (n = 0; n < r.length; n += 1)
    if (typeof r[n] < "u") {
      const a = r[n].offsetHeight;
      s = a > s ? a : s;
    }
  (s || s === 0) && (e.wrapperEl.style.height = `${s}px`);
}
function lr() {
  const t = this, e = t.slides, r = t.isElement ? t.isHorizontal() ? t.wrapperEl.offsetLeft : t.wrapperEl.offsetTop : 0;
  for (let i = 0; i < e.length; i += 1)
    e[i].swiperSlideOffset = (t.isHorizontal() ? e[i].offsetLeft : e[i].offsetTop) - r - t.cssOverflowAdjustment();
}
const Ke = (t, e, r) => {
  e && !t.classList.contains(r) ? t.classList.add(r) : !e && t.classList.contains(r) && t.classList.remove(r);
};
function dr(t) {
  t === void 0 && (t = this && this.translate || 0);
  const e = this, r = e.params, {
    slides: i,
    rtlTranslate: s,
    snapGrid: n
  } = e;
  if (i.length === 0) return;
  typeof i[0].swiperSlideOffset > "u" && e.updateSlidesOffset();
  let o = -t;
  s && (o = t), e.visibleSlidesIndexes = [], e.visibleSlides = [];
  let a = r.spaceBetween;
  typeof a == "string" && a.indexOf("%") >= 0 ? a = parseFloat(a.replace("%", "")) / 100 * e.size : typeof a == "string" && (a = parseFloat(a));
  for (let d = 0; d < i.length; d += 1) {
    const l = i[d];
    let f = l.swiperSlideOffset;
    r.cssMode && r.centeredSlides && (f -= i[0].swiperSlideOffset);
    const u = (o + (r.centeredSlides ? e.minTranslate() : 0) - f) / (l.swiperSlideSize + a), h = (o - n[0] + (r.centeredSlides ? e.minTranslate() : 0) - f) / (l.swiperSlideSize + a), b = -(o - f), p = b + e.slidesSizesGrid[d], v = b >= 0 && b <= e.size - e.slidesSizesGrid[d], T = b >= 0 && b < e.size - 1 || p > 1 && p <= e.size || b <= 0 && p >= e.size;
    T && (e.visibleSlides.push(l), e.visibleSlidesIndexes.push(d)), Ke(l, T, r.slideVisibleClass), Ke(l, v, r.slideFullyVisibleClass), l.progress = s ? -u : u, l.originalProgress = s ? -h : h;
  }
}
function cr(t) {
  const e = this;
  if (typeof t > "u") {
    const f = e.rtlTranslate ? -1 : 1;
    t = e && e.translate && e.translate * f || 0;
  }
  const r = e.params, i = e.maxTranslate() - e.minTranslate();
  let {
    progress: s,
    isBeginning: n,
    isEnd: o,
    progressLoop: a
  } = e;
  const d = n, l = o;
  if (i === 0)
    s = 0, n = !0, o = !0;
  else {
    s = (t - e.minTranslate()) / i;
    const f = Math.abs(t - e.minTranslate()) < 1, u = Math.abs(t - e.maxTranslate()) < 1;
    n = f || s <= 0, o = u || s >= 1, f && (s = 0), u && (s = 1);
  }
  if (r.loop) {
    const f = e.getSlideIndexByData(0), u = e.getSlideIndexByData(e.slides.length - 1), h = e.slidesGrid[f], b = e.slidesGrid[u], p = e.slidesGrid[e.slidesGrid.length - 1], v = Math.abs(t);
    v >= h ? a = (v - h) / p : a = (v + p - b) / p, a > 1 && (a -= 1);
  }
  Object.assign(e, {
    progress: s,
    progressLoop: a,
    isBeginning: n,
    isEnd: o
  }), (r.watchSlidesProgress || r.centeredSlides && r.autoHeight) && e.updateSlidesProgress(t), n && !d && e.emit("reachBeginning toEdge"), o && !l && e.emit("reachEnd toEdge"), (d && !n || l && !o) && e.emit("fromEdge"), e.emit("progress", s);
}
const Pe = (t, e, r) => {
  e && !t.classList.contains(r) ? t.classList.add(r) : !e && t.classList.contains(r) && t.classList.remove(r);
};
function fr() {
  const t = this, {
    slides: e,
    params: r,
    slidesEl: i,
    activeIndex: s
  } = t, n = t.virtual && r.virtual.enabled, o = t.grid && r.grid && r.grid.rows > 1, a = (u) => W(i, `.${r.slideClass}${u}, swiper-slide${u}`)[0];
  let d, l, f;
  if (n)
    if (r.loop) {
      let u = s - t.virtual.slidesBefore;
      u < 0 && (u = t.virtual.slides.length + u), u >= t.virtual.slides.length && (u -= t.virtual.slides.length), d = a(`[data-swiper-slide-index="${u}"]`);
    } else
      d = a(`[data-swiper-slide-index="${s}"]`);
  else
    o ? (d = e.find((u) => u.column === s), f = e.find((u) => u.column === s + 1), l = e.find((u) => u.column === s - 1)) : d = e[s];
  d && (o || (f = Qt(d, `.${r.slideClass}, swiper-slide`)[0], r.loop && !f && (f = e[0]), l = Jt(d, `.${r.slideClass}, swiper-slide`)[0], r.loop && !l === 0 && (l = e[e.length - 1]))), e.forEach((u) => {
    Pe(u, u === d, r.slideActiveClass), Pe(u, u === f, r.slideNextClass), Pe(u, u === l, r.slidePrevClass);
  }), t.emitSlidesClasses();
}
const ye = (t, e) => {
  if (!t || t.destroyed || !t.params) return;
  const r = () => t.isElement ? "swiper-slide" : `.${t.params.slideClass}`, i = e.closest(r());
  if (i) {
    let s = i.querySelector(`.${t.params.lazyPreloaderClass}`);
    !s && t.isElement && (i.shadowRoot ? s = i.shadowRoot.querySelector(`.${t.params.lazyPreloaderClass}`) : requestAnimationFrame(() => {
      i.shadowRoot && (s = i.shadowRoot.querySelector(`.${t.params.lazyPreloaderClass}`), s && s.remove());
    })), s && s.remove();
  }
}, Le = (t, e) => {
  if (!t.slides[e]) return;
  const r = t.slides[e].querySelector('[loading="lazy"]');
  r && r.removeAttribute("loading");
}, je = (t) => {
  if (!t || t.destroyed || !t.params) return;
  let e = t.params.lazyPreloadPrevNext;
  const r = t.slides.length;
  if (!r || !e || e < 0) return;
  e = Math.min(e, r);
  const i = t.params.slidesPerView === "auto" ? t.slidesPerViewDynamic() : Math.ceil(t.params.slidesPerView), s = t.activeIndex;
  if (t.params.grid && t.params.grid.rows > 1) {
    const o = s, a = [o - e];
    a.push(...Array.from({
      length: e
    }).map((d, l) => o + i + l)), t.slides.forEach((d, l) => {
      a.includes(d.column) && Le(t, l);
    });
    return;
  }
  const n = s + i - 1;
  if (t.params.rewind || t.params.loop)
    for (let o = s - e; o <= n + e; o += 1) {
      const a = (o % r + r) % r;
      (a < s || a > n) && Le(t, a);
    }
  else
    for (let o = Math.max(s - e, 0); o <= Math.min(n + e, r - 1); o += 1)
      o !== s && (o > n || o < s) && Le(t, o);
};
function ur(t) {
  const {
    slidesGrid: e,
    params: r
  } = t, i = t.rtlTranslate ? t.translate : -t.translate;
  let s;
  for (let n = 0; n < e.length; n += 1)
    typeof e[n + 1] < "u" ? i >= e[n] && i < e[n + 1] - (e[n + 1] - e[n]) / 2 ? s = n : i >= e[n] && i < e[n + 1] && (s = n + 1) : i >= e[n] && (s = n);
  return r.normalizeSlideIndex && (s < 0 || typeof s > "u") && (s = 0), s;
}
function pr(t) {
  const e = this, r = e.rtlTranslate ? e.translate : -e.translate, {
    snapGrid: i,
    params: s,
    activeIndex: n,
    realIndex: o,
    snapIndex: a
  } = e;
  let d = t, l;
  const f = (b) => {
    let p = b - e.virtual.slidesBefore;
    return p < 0 && (p = e.virtual.slides.length + p), p >= e.virtual.slides.length && (p -= e.virtual.slides.length), p;
  };
  if (typeof d > "u" && (d = ur(e)), i.indexOf(r) >= 0)
    l = i.indexOf(r);
  else {
    const b = Math.min(s.slidesPerGroupSkip, d);
    l = b + Math.floor((d - b) / s.slidesPerGroup);
  }
  if (l >= i.length && (l = i.length - 1), d === n && !e.params.loop) {
    l !== a && (e.snapIndex = l, e.emit("snapIndexChange"));
    return;
  }
  if (d === n && e.params.loop && e.virtual && e.params.virtual.enabled) {
    e.realIndex = f(d);
    return;
  }
  const u = e.grid && s.grid && s.grid.rows > 1;
  let h;
  if (e.virtual && s.virtual.enabled && s.loop)
    h = f(d);
  else if (u) {
    const b = e.slides.find((v) => v.column === d);
    let p = parseInt(b.getAttribute("data-swiper-slide-index"), 10);
    Number.isNaN(p) && (p = Math.max(e.slides.indexOf(b), 0)), h = Math.floor(p / s.grid.rows);
  } else if (e.slides[d]) {
    const b = e.slides[d].getAttribute("data-swiper-slide-index");
    b ? h = parseInt(b, 10) : h = d;
  } else
    h = d;
  Object.assign(e, {
    previousSnapIndex: a,
    snapIndex: l,
    previousRealIndex: o,
    realIndex: h,
    previousIndex: n,
    activeIndex: d
  }), e.initialized && je(e), e.emit("activeIndexChange"), e.emit("snapIndexChange"), (e.initialized || e.params.runCallbacksOnInit) && (o !== h && e.emit("realIndexChange"), e.emit("slideChange"));
}
function mr(t, e) {
  const r = this, i = r.params;
  let s = t.closest(`.${i.slideClass}, swiper-slide`);
  !s && r.isElement && e && e.length > 1 && e.includes(t) && [...e.slice(e.indexOf(t) + 1, e.length)].forEach((a) => {
    !s && a.matches && a.matches(`.${i.slideClass}, swiper-slide`) && (s = a);
  });
  let n = !1, o;
  if (s) {
    for (let a = 0; a < r.slides.length; a += 1)
      if (r.slides[a] === s) {
        n = !0, o = a;
        break;
      }
  }
  if (s && n)
    r.clickedSlide = s, r.virtual && r.params.virtual.enabled ? r.clickedIndex = parseInt(s.getAttribute("data-swiper-slide-index"), 10) : r.clickedIndex = o;
  else {
    r.clickedSlide = void 0, r.clickedIndex = void 0;
    return;
  }
  i.slideToClickedSlide && r.clickedIndex !== void 0 && r.clickedIndex !== r.activeIndex && r.slideToClickedSlide();
}
var hr = {
  updateSize: nr,
  updateSlides: or,
  updateAutoHeight: ar,
  updateSlidesOffset: lr,
  updateSlidesProgress: dr,
  updateProgress: cr,
  updateSlidesClasses: fr,
  updateActiveIndex: pr,
  updateClickedSlide: mr
};
function gr(t) {
  t === void 0 && (t = this.isHorizontal() ? "x" : "y");
  const e = this, {
    params: r,
    rtlTranslate: i,
    translate: s,
    wrapperEl: n
  } = e;
  if (r.virtualTranslate)
    return i ? -s : s;
  if (r.cssMode)
    return s;
  let o = Yt(n, t);
  return o += e.cssOverflowAdjustment(), i && (o = -o), o || 0;
}
function br(t, e) {
  const r = this, {
    rtlTranslate: i,
    params: s,
    wrapperEl: n,
    progress: o
  } = r;
  let a = 0, d = 0;
  const l = 0;
  r.isHorizontal() ? a = i ? -t : t : d = t, s.roundLengths && (a = Math.floor(a), d = Math.floor(d)), r.previousTranslate = r.translate, r.translate = r.isHorizontal() ? a : d, s.cssMode ? n[r.isHorizontal() ? "scrollLeft" : "scrollTop"] = r.isHorizontal() ? -a : -d : s.virtualTranslate || (r.isHorizontal() ? a -= r.cssOverflowAdjustment() : d -= r.cssOverflowAdjustment(), n.style.transform = `translate3d(${a}px, ${d}px, ${l}px)`);
  let f;
  const u = r.maxTranslate() - r.minTranslate();
  u === 0 ? f = 0 : f = (t - r.minTranslate()) / u, f !== o && r.updateProgress(t), r.emit("setTranslate", r.translate, e);
}
function vr() {
  return -this.snapGrid[0];
}
function wr() {
  return -this.snapGrid[this.snapGrid.length - 1];
}
function yr(t, e, r, i, s) {
  t === void 0 && (t = 0), e === void 0 && (e = this.params.speed), r === void 0 && (r = !0), i === void 0 && (i = !0);
  const n = this, {
    params: o,
    wrapperEl: a
  } = n;
  if (n.animating && o.preventInteractionOnTransition)
    return !1;
  const d = n.minTranslate(), l = n.maxTranslate();
  let f;
  if (i && t > d ? f = d : i && t < l ? f = l : f = t, n.updateProgress(f), o.cssMode) {
    const u = n.isHorizontal();
    if (e === 0)
      a[u ? "scrollLeft" : "scrollTop"] = -f;
    else {
      if (!n.support.smoothScroll)
        return pt({
          swiper: n,
          targetPosition: -f,
          side: u ? "left" : "top"
        }), !0;
      a.scrollTo({
        [u ? "left" : "top"]: -f,
        behavior: "smooth"
      });
    }
    return !0;
  }
  return e === 0 ? (n.setTransition(0), n.setTranslate(f), r && (n.emit("beforeTransitionStart", e, s), n.emit("transitionEnd"))) : (n.setTransition(e), n.setTranslate(f), r && (n.emit("beforeTransitionStart", e, s), n.emit("transitionStart")), n.animating || (n.animating = !0, n.onTranslateToWrapperTransitionEnd || (n.onTranslateToWrapperTransitionEnd = function(h) {
    !n || n.destroyed || h.target === this && (n.wrapperEl.removeEventListener("transitionend", n.onTranslateToWrapperTransitionEnd), n.onTranslateToWrapperTransitionEnd = null, delete n.onTranslateToWrapperTransitionEnd, n.animating = !1, r && n.emit("transitionEnd"));
  }), n.wrapperEl.addEventListener("transitionend", n.onTranslateToWrapperTransitionEnd))), !0;
}
var xr = {
  getTranslate: gr,
  setTranslate: br,
  minTranslate: vr,
  maxTranslate: wr,
  translateTo: yr
};
function Sr(t, e) {
  const r = this;
  r.params.cssMode || (r.wrapperEl.style.transitionDuration = `${t}ms`, r.wrapperEl.style.transitionDelay = t === 0 ? "0ms" : ""), r.emit("setTransition", t, e);
}
function vt(t) {
  let {
    swiper: e,
    runCallbacks: r,
    direction: i,
    step: s
  } = t;
  const {
    activeIndex: n,
    previousIndex: o
  } = e;
  let a = i;
  a || (n > o ? a = "next" : n < o ? a = "prev" : a = "reset"), e.emit(`transition${s}`), r && a === "reset" ? e.emit(`slideResetTransition${s}`) : r && n !== o && (e.emit(`slideChangeTransition${s}`), a === "next" ? e.emit(`slideNextTransition${s}`) : e.emit(`slidePrevTransition${s}`));
}
function Tr(t, e) {
  t === void 0 && (t = !0);
  const r = this, {
    params: i
  } = r;
  i.cssMode || (i.autoHeight && r.updateAutoHeight(), vt({
    swiper: r,
    runCallbacks: t,
    direction: e,
    step: "Start"
  }));
}
function _r(t, e) {
  t === void 0 && (t = !0);
  const r = this, {
    params: i
  } = r;
  r.animating = !1, !i.cssMode && (r.setTransition(0), vt({
    swiper: r,
    runCallbacks: t,
    direction: e,
    step: "End"
  }));
}
var Er = {
  setTransition: Sr,
  transitionStart: Tr,
  transitionEnd: _r
};
function Cr(t, e, r, i, s) {
  t === void 0 && (t = 0), r === void 0 && (r = !0), typeof t == "string" && (t = parseInt(t, 10));
  const n = this;
  let o = t;
  o < 0 && (o = 0);
  const {
    params: a,
    snapGrid: d,
    slidesGrid: l,
    previousIndex: f,
    activeIndex: u,
    rtlTranslate: h,
    wrapperEl: b,
    enabled: p
  } = n;
  if (!p && !i && !s || n.destroyed || n.animating && a.preventInteractionOnTransition)
    return !1;
  typeof e > "u" && (e = n.params.speed);
  const v = Math.min(n.params.slidesPerGroupSkip, o);
  let T = v + Math.floor((o - v) / n.params.slidesPerGroup);
  T >= d.length && (T = d.length - 1);
  const y = -d[T];
  if (a.normalizeSlideIndex)
    for (let k = 0; k < l.length; k += 1) {
      const P = -Math.floor(y * 100), z = Math.floor(l[k] * 100), _ = Math.floor(l[k + 1] * 100);
      typeof l[k + 1] < "u" ? P >= z && P < _ - (_ - z) / 2 ? o = k : P >= z && P < _ && (o = k + 1) : P >= z && (o = k);
    }
  if (n.initialized && o !== u && (!n.allowSlideNext && (h ? y > n.translate && y > n.minTranslate() : y < n.translate && y < n.minTranslate()) || !n.allowSlidePrev && y > n.translate && y > n.maxTranslate() && (u || 0) !== o))
    return !1;
  o !== (f || 0) && r && n.emit("beforeSlideChangeStart"), n.updateProgress(y);
  let c;
  o > u ? c = "next" : o < u ? c = "prev" : c = "reset";
  const m = n.virtual && n.params.virtual.enabled;
  if (!(m && s) && (h && -y === n.translate || !h && y === n.translate))
    return n.updateActiveIndex(o), a.autoHeight && n.updateAutoHeight(), n.updateSlidesClasses(), a.effect !== "slide" && n.setTranslate(y), c !== "reset" && (n.transitionStart(r, c), n.transitionEnd(r, c)), !1;
  if (a.cssMode) {
    const k = n.isHorizontal(), P = h ? y : -y;
    if (e === 0)
      m && (n.wrapperEl.style.scrollSnapType = "none", n._immediateVirtual = !0), m && !n._cssModeVirtualInitialSet && n.params.initialSlide > 0 ? (n._cssModeVirtualInitialSet = !0, requestAnimationFrame(() => {
        b[k ? "scrollLeft" : "scrollTop"] = P;
      })) : b[k ? "scrollLeft" : "scrollTop"] = P, m && requestAnimationFrame(() => {
        n.wrapperEl.style.scrollSnapType = "", n._immediateVirtual = !1;
      });
    else {
      if (!n.support.smoothScroll)
        return pt({
          swiper: n,
          targetPosition: P,
          side: k ? "left" : "top"
        }), !0;
      b.scrollTo({
        [k ? "left" : "top"]: P,
        behavior: "smooth"
      });
    }
    return !0;
  }
  const C = bt().isSafari;
  return m && !s && C && n.isElement && n.virtual.update(!1, !1, o), n.setTransition(e), n.setTranslate(y), n.updateActiveIndex(o), n.updateSlidesClasses(), n.emit("beforeTransitionStart", e, i), n.transitionStart(r, c), e === 0 ? n.transitionEnd(r, c) : n.animating || (n.animating = !0, n.onSlideToWrapperTransitionEnd || (n.onSlideToWrapperTransitionEnd = function(P) {
    !n || n.destroyed || P.target === this && (n.wrapperEl.removeEventListener("transitionend", n.onSlideToWrapperTransitionEnd), n.onSlideToWrapperTransitionEnd = null, delete n.onSlideToWrapperTransitionEnd, n.transitionEnd(r, c));
  }), n.wrapperEl.addEventListener("transitionend", n.onSlideToWrapperTransitionEnd)), !0;
}
function kr(t, e, r, i) {
  t === void 0 && (t = 0), r === void 0 && (r = !0), typeof t == "string" && (t = parseInt(t, 10));
  const s = this;
  if (s.destroyed) return;
  typeof e > "u" && (e = s.params.speed);
  const n = s.grid && s.params.grid && s.params.grid.rows > 1;
  let o = t;
  if (s.params.loop)
    if (s.virtual && s.params.virtual.enabled)
      o = o + s.virtual.slidesBefore;
    else {
      let a;
      if (n) {
        const h = o * s.params.grid.rows;
        a = s.slides.find((b) => b.getAttribute("data-swiper-slide-index") * 1 === h).column;
      } else
        a = s.getSlideIndexByData(o);
      const d = n ? Math.ceil(s.slides.length / s.params.grid.rows) : s.slides.length, {
        centeredSlides: l
      } = s.params;
      let f = s.params.slidesPerView;
      f === "auto" ? f = s.slidesPerViewDynamic() : (f = Math.ceil(parseFloat(s.params.slidesPerView, 10)), l && f % 2 === 0 && (f = f + 1));
      let u = d - a < f;
      if (l && (u = u || a < Math.ceil(f / 2)), i && l && s.params.slidesPerView !== "auto" && !n && (u = !1), u) {
        const h = l ? a < s.activeIndex ? "prev" : "next" : a - s.activeIndex - 1 < s.params.slidesPerView ? "next" : "prev";
        s.loopFix({
          direction: h,
          slideTo: !0,
          activeSlideIndex: h === "next" ? a + 1 : a - d + 1,
          slideRealIndex: h === "next" ? s.realIndex : void 0
        });
      }
      if (n) {
        const h = o * s.params.grid.rows;
        o = s.slides.find((b) => b.getAttribute("data-swiper-slide-index") * 1 === h).column;
      } else
        o = s.getSlideIndexByData(o);
    }
  return requestAnimationFrame(() => {
    s.slideTo(o, e, r, i);
  }), s;
}
function Mr(t, e, r) {
  e === void 0 && (e = !0);
  const i = this, {
    enabled: s,
    params: n,
    animating: o
  } = i;
  if (!s || i.destroyed) return i;
  typeof t > "u" && (t = i.params.speed);
  let a = n.slidesPerGroup;
  n.slidesPerView === "auto" && n.slidesPerGroup === 1 && n.slidesPerGroupAuto && (a = Math.max(i.slidesPerViewDynamic("current", !0), 1));
  const d = i.activeIndex < n.slidesPerGroupSkip ? 1 : a, l = i.virtual && n.virtual.enabled;
  if (n.loop) {
    if (o && !l && n.loopPreventsSliding) return !1;
    if (i.loopFix({
      direction: "next"
    }), i._clientLeft = i.wrapperEl.clientLeft, i.activeIndex === i.slides.length - 1 && n.cssMode)
      return requestAnimationFrame(() => {
        i.slideTo(i.activeIndex + d, t, e, r);
      }), !0;
  }
  return n.rewind && i.isEnd ? i.slideTo(0, t, e, r) : i.slideTo(i.activeIndex + d, t, e, r);
}
function Pr(t, e, r) {
  e === void 0 && (e = !0);
  const i = this, {
    params: s,
    snapGrid: n,
    slidesGrid: o,
    rtlTranslate: a,
    enabled: d,
    animating: l
  } = i;
  if (!d || i.destroyed) return i;
  typeof t > "u" && (t = i.params.speed);
  const f = i.virtual && s.virtual.enabled;
  if (s.loop) {
    if (l && !f && s.loopPreventsSliding) return !1;
    i.loopFix({
      direction: "prev"
    }), i._clientLeft = i.wrapperEl.clientLeft;
  }
  const u = a ? i.translate : -i.translate;
  function h(c) {
    return c < 0 ? -Math.floor(Math.abs(c)) : Math.floor(c);
  }
  const b = h(u), p = n.map((c) => h(c)), v = s.freeMode && s.freeMode.enabled;
  let T = n[p.indexOf(b) - 1];
  if (typeof T > "u" && (s.cssMode || v)) {
    let c;
    n.forEach((m, w) => {
      b >= m && (c = w);
    }), typeof c < "u" && (T = v ? n[c] : n[c > 0 ? c - 1 : c]);
  }
  let y = 0;
  if (typeof T < "u" && (y = o.indexOf(T), y < 0 && (y = i.activeIndex - 1), s.slidesPerView === "auto" && s.slidesPerGroup === 1 && s.slidesPerGroupAuto && (y = y - i.slidesPerViewDynamic("previous", !0) + 1, y = Math.max(y, 0))), s.rewind && i.isBeginning) {
    const c = i.params.virtual && i.params.virtual.enabled && i.virtual ? i.virtual.slides.length - 1 : i.slides.length - 1;
    return i.slideTo(c, t, e, r);
  } else if (s.loop && i.activeIndex === 0 && s.cssMode)
    return requestAnimationFrame(() => {
      i.slideTo(y, t, e, r);
    }), !0;
  return i.slideTo(y, t, e, r);
}
function Lr(t, e, r) {
  e === void 0 && (e = !0);
  const i = this;
  if (!i.destroyed)
    return typeof t > "u" && (t = i.params.speed), i.slideTo(i.activeIndex, t, e, r);
}
function Ar(t, e, r, i) {
  e === void 0 && (e = !0), i === void 0 && (i = 0.5);
  const s = this;
  if (s.destroyed) return;
  typeof t > "u" && (t = s.params.speed);
  let n = s.activeIndex;
  const o = Math.min(s.params.slidesPerGroupSkip, n), a = o + Math.floor((n - o) / s.params.slidesPerGroup), d = s.rtlTranslate ? s.translate : -s.translate;
  if (d >= s.snapGrid[a]) {
    const l = s.snapGrid[a], f = s.snapGrid[a + 1];
    d - l > (f - l) * i && (n += s.params.slidesPerGroup);
  } else {
    const l = s.snapGrid[a - 1], f = s.snapGrid[a];
    d - l <= (f - l) * i && (n -= s.params.slidesPerGroup);
  }
  return n = Math.max(n, 0), n = Math.min(n, s.slidesGrid.length - 1), s.slideTo(n, t, e, r);
}
function zr() {
  const t = this;
  if (t.destroyed) return;
  const {
    params: e,
    slidesEl: r
  } = t, i = e.slidesPerView === "auto" ? t.slidesPerViewDynamic() : e.slidesPerView;
  let s = t.getSlideIndexWhenGrid(t.clickedIndex), n;
  const o = t.isElement ? "swiper-slide" : `.${e.slideClass}`, a = t.grid && t.params.grid && t.params.grid.rows > 1;
  if (e.loop) {
    if (t.animating) return;
    n = parseInt(t.clickedSlide.getAttribute("data-swiper-slide-index"), 10), e.centeredSlides ? t.slideToLoop(n) : s > (a ? (t.slides.length - i) / 2 - (t.params.grid.rows - 1) : t.slides.length - i) ? (t.loopFix(), s = t.getSlideIndex(W(r, `${o}[data-swiper-slide-index="${n}"]`)[0]), ut(() => {
      t.slideTo(s);
    })) : t.slideTo(s);
  } else
    t.slideTo(s);
}
var Ir = {
  slideTo: Cr,
  slideToLoop: kr,
  slideNext: Mr,
  slidePrev: Pr,
  slideReset: Lr,
  slideToClosest: Ar,
  slideToClickedSlide: zr
};
function Or(t, e) {
  const r = this, {
    params: i,
    slidesEl: s
  } = r;
  if (!i.loop || r.virtual && r.params.virtual.enabled) return;
  const n = () => {
    W(s, `.${i.slideClass}, swiper-slide`).forEach((b, p) => {
      b.setAttribute("data-swiper-slide-index", p);
    });
  }, o = () => {
    const h = W(s, `.${i.slideBlankClass}`);
    h.forEach((b) => {
      b.remove();
    }), h.length > 0 && (r.recalcSlides(), r.updateSlides());
  }, a = r.grid && i.grid && i.grid.rows > 1;
  i.loopAddBlankSlides && (i.slidesPerGroup > 1 || a) && o();
  const d = i.slidesPerGroup * (a ? i.grid.rows : 1), l = r.slides.length % d !== 0, f = a && r.slides.length % i.grid.rows !== 0, u = (h) => {
    for (let b = 0; b < h; b += 1) {
      const p = r.isElement ? ce("swiper-slide", [i.slideBlankClass]) : ce("div", [i.slideClass, i.slideBlankClass]);
      r.slidesEl.append(p);
    }
  };
  if (l) {
    if (i.loopAddBlankSlides) {
      const h = d - r.slides.length % d;
      u(h), r.recalcSlides(), r.updateSlides();
    } else
      _e("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
    n();
  } else if (f) {
    if (i.loopAddBlankSlides) {
      const h = i.grid.rows - r.slides.length % i.grid.rows;
      u(h), r.recalcSlides(), r.updateSlides();
    } else
      _e("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
    n();
  } else
    n();
  r.loopFix({
    slideRealIndex: t,
    direction: i.centeredSlides ? void 0 : "next",
    initial: e
  });
}
function $r(t) {
  let {
    slideRealIndex: e,
    slideTo: r = !0,
    direction: i,
    setTranslate: s,
    activeSlideIndex: n,
    initial: o,
    byController: a,
    byMousewheel: d
  } = t === void 0 ? {} : t;
  const l = this;
  if (!l.params.loop) return;
  l.emit("beforeLoopFix");
  const {
    slides: f,
    allowSlidePrev: u,
    allowSlideNext: h,
    slidesEl: b,
    params: p
  } = l, {
    centeredSlides: v,
    initialSlide: T
  } = p;
  if (l.allowSlidePrev = !0, l.allowSlideNext = !0, l.virtual && p.virtual.enabled) {
    r && (!p.centeredSlides && l.snapIndex === 0 ? l.slideTo(l.virtual.slides.length, 0, !1, !0) : p.centeredSlides && l.snapIndex < p.slidesPerView ? l.slideTo(l.virtual.slides.length + l.snapIndex, 0, !1, !0) : l.snapIndex === l.snapGrid.length - 1 && l.slideTo(l.virtual.slidesBefore, 0, !1, !0)), l.allowSlidePrev = u, l.allowSlideNext = h, l.emit("loopFix");
    return;
  }
  let y = p.slidesPerView;
  y === "auto" ? y = l.slidesPerViewDynamic() : (y = Math.ceil(parseFloat(p.slidesPerView, 10)), v && y % 2 === 0 && (y = y + 1));
  const c = p.slidesPerGroupAuto ? y : p.slidesPerGroup;
  let m = v ? Math.max(c, Math.ceil(y / 2)) : c;
  m % c !== 0 && (m += c - m % c), m += p.loopAdditionalSlides, l.loopedSlides = m;
  const w = l.grid && p.grid && p.grid.rows > 1;
  f.length < y + m || l.params.effect === "cards" && f.length < y + m * 2 ? _e("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled or not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters") : w && p.grid.fill === "row" && _e("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
  const x = [], C = [], k = w ? Math.ceil(f.length / p.grid.rows) : f.length, P = o && k - T < y && !v;
  let z = P ? T : l.activeIndex;
  typeof n > "u" ? n = l.getSlideIndex(f.find((M) => M.classList.contains(p.slideActiveClass))) : z = n;
  const _ = i === "next" || !i, E = i === "prev" || !i;
  let L = 0, A = 0;
  const D = (w ? f[n].column : n) + (v && typeof s > "u" ? -y / 2 + 0.5 : 0);
  if (D < m) {
    L = Math.max(m - D, c);
    for (let M = 0; M < m - D; M += 1) {
      const g = M - Math.floor(M / k) * k;
      if (w) {
        const S = k - g - 1;
        for (let I = f.length - 1; I >= 0; I -= 1)
          f[I].column === S && x.push(I);
      } else
        x.push(k - g - 1);
    }
  } else if (D + y > k - m) {
    A = Math.max(D - (k - m * 2), c), P && (A = Math.max(A, y - k + T + 1));
    for (let M = 0; M < A; M += 1) {
      const g = M - Math.floor(M / k) * k;
      w ? f.forEach((S, I) => {
        S.column === g && C.push(I);
      }) : C.push(g);
    }
  }
  if (l.__preventObserver__ = !0, requestAnimationFrame(() => {
    l.__preventObserver__ = !1;
  }), l.params.effect === "cards" && f.length < y + m * 2 && (C.includes(n) && C.splice(C.indexOf(n), 1), x.includes(n) && x.splice(x.indexOf(n), 1)), E && x.forEach((M) => {
    f[M].swiperLoopMoveDOM = !0, b.prepend(f[M]), f[M].swiperLoopMoveDOM = !1;
  }), _ && C.forEach((M) => {
    f[M].swiperLoopMoveDOM = !0, b.append(f[M]), f[M].swiperLoopMoveDOM = !1;
  }), l.recalcSlides(), p.slidesPerView === "auto" ? l.updateSlides() : w && (x.length > 0 && E || C.length > 0 && _) && l.slides.forEach((M, g) => {
    l.grid.updateSlide(g, M, l.slides);
  }), p.watchSlidesProgress && l.updateSlidesOffset(), r) {
    if (x.length > 0 && E) {
      if (typeof e > "u") {
        const M = l.slidesGrid[z], S = l.slidesGrid[z + L] - M;
        d ? l.setTranslate(l.translate - S) : (l.slideTo(z + Math.ceil(L), 0, !1, !0), s && (l.touchEventsData.startTranslate = l.touchEventsData.startTranslate - S, l.touchEventsData.currentTranslate = l.touchEventsData.currentTranslate - S));
      } else if (s) {
        const M = w ? x.length / p.grid.rows : x.length;
        l.slideTo(l.activeIndex + M, 0, !1, !0), l.touchEventsData.currentTranslate = l.translate;
      }
    } else if (C.length > 0 && _)
      if (typeof e > "u") {
        const M = l.slidesGrid[z], S = l.slidesGrid[z - A] - M;
        d ? l.setTranslate(l.translate - S) : (l.slideTo(z - A, 0, !1, !0), s && (l.touchEventsData.startTranslate = l.touchEventsData.startTranslate - S, l.touchEventsData.currentTranslate = l.touchEventsData.currentTranslate - S));
      } else {
        const M = w ? C.length / p.grid.rows : C.length;
        l.slideTo(l.activeIndex - M, 0, !1, !0);
      }
  }
  if (l.allowSlidePrev = u, l.allowSlideNext = h, l.controller && l.controller.control && !a) {
    const M = {
      slideRealIndex: e,
      direction: i,
      setTranslate: s,
      activeSlideIndex: n,
      byController: !0
    };
    Array.isArray(l.controller.control) ? l.controller.control.forEach((g) => {
      !g.destroyed && g.params.loop && g.loopFix({
        ...M,
        slideTo: g.params.slidesPerView === p.slidesPerView ? r : !1
      });
    }) : l.controller.control instanceof l.constructor && l.controller.control.params.loop && l.controller.control.loopFix({
      ...M,
      slideTo: l.controller.control.params.slidesPerView === p.slidesPerView ? r : !1
    });
  }
  l.emit("loopFix");
}
function Dr() {
  const t = this, {
    params: e,
    slidesEl: r
  } = t;
  if (!e.loop || !r || t.virtual && t.params.virtual.enabled) return;
  t.recalcSlides();
  const i = [];
  t.slides.forEach((s) => {
    const n = typeof s.swiperSlideIndex > "u" ? s.getAttribute("data-swiper-slide-index") * 1 : s.swiperSlideIndex;
    i[n] = s;
  }), t.slides.forEach((s) => {
    s.removeAttribute("data-swiper-slide-index");
  }), i.forEach((s) => {
    r.append(s);
  }), t.recalcSlides(), t.slideTo(t.realIndex, 0);
}
var Br = {
  loopCreate: Or,
  loopFix: $r,
  loopDestroy: Dr
};
function Rr(t) {
  const e = this;
  if (!e.params.simulateTouch || e.params.watchOverflow && e.isLocked || e.params.cssMode) return;
  const r = e.params.touchEventsTarget === "container" ? e.el : e.wrapperEl;
  e.isElement && (e.__preventObserver__ = !0), r.style.cursor = "move", r.style.cursor = t ? "grabbing" : "grab", e.isElement && requestAnimationFrame(() => {
    e.__preventObserver__ = !1;
  });
}
function Nr() {
  const t = this;
  t.params.watchOverflow && t.isLocked || t.params.cssMode || (t.isElement && (t.__preventObserver__ = !0), t[t.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "", t.isElement && requestAnimationFrame(() => {
    t.__preventObserver__ = !1;
  }));
}
var Gr = {
  setGrabCursor: Rr,
  unsetGrabCursor: Nr
};
function Vr(t, e) {
  e === void 0 && (e = this);
  function r(i) {
    if (!i || i === Y() || i === N()) return null;
    i.assignedSlot && (i = i.assignedSlot);
    const s = i.closest(t);
    return !s && !i.getRootNode ? null : s || r(i.getRootNode().host);
  }
  return r(e);
}
function Je(t, e, r) {
  const i = N(), {
    params: s
  } = t, n = s.edgeSwipeDetection, o = s.edgeSwipeThreshold;
  return n && (r <= o || r >= i.innerWidth - o) ? n === "prevent" ? (e.preventDefault(), !0) : !1 : !0;
}
function Fr(t) {
  const e = this, r = Y();
  let i = t;
  i.originalEvent && (i = i.originalEvent);
  const s = e.touchEventsData;
  if (i.type === "pointerdown") {
    if (s.pointerId !== null && s.pointerId !== i.pointerId)
      return;
    s.pointerId = i.pointerId;
  } else i.type === "touchstart" && i.targetTouches.length === 1 && (s.touchId = i.targetTouches[0].identifier);
  if (i.type === "touchstart") {
    Je(e, i, i.targetTouches[0].pageX);
    return;
  }
  const {
    params: n,
    touches: o,
    enabled: a
  } = e;
  if (!a || !n.simulateTouch && i.pointerType === "mouse" || e.animating && n.preventInteractionOnTransition)
    return;
  !e.animating && n.cssMode && n.loop && e.loopFix();
  let d = i.target;
  if (n.touchEventsTarget === "wrapper" && !Kt(d, e.wrapperEl) || "which" in i && i.which === 3 || "button" in i && i.button > 0 || s.isTouched && s.isMoved) return;
  const l = !!n.noSwipingClass && n.noSwipingClass !== "", f = i.composedPath ? i.composedPath() : i.path;
  l && i.target && i.target.shadowRoot && f && (d = f[0]);
  const u = n.noSwipingSelector ? n.noSwipingSelector : `.${n.noSwipingClass}`, h = !!(i.target && i.target.shadowRoot);
  if (n.noSwiping && (h ? Vr(u, d) : d.closest(u))) {
    e.allowClick = !0;
    return;
  }
  if (n.swipeHandler && !d.closest(n.swipeHandler))
    return;
  o.currentX = i.pageX, o.currentY = i.pageY;
  const b = o.currentX, p = o.currentY;
  if (!Je(e, i, b))
    return;
  Object.assign(s, {
    isTouched: !0,
    isMoved: !1,
    allowTouchCallbacks: !0,
    isScrolling: void 0,
    startMoving: void 0
  }), o.startX = b, o.startY = p, s.touchStartTime = Te(), e.allowClick = !0, e.updateSize(), e.swipeDirection = void 0, n.threshold > 0 && (s.allowThresholdMove = !1);
  let v = !0;
  d.matches(s.focusableElements) && (v = !1, d.nodeName === "SELECT" && (s.isTouched = !1)), r.activeElement && r.activeElement.matches(s.focusableElements) && r.activeElement !== d && (i.pointerType === "mouse" || i.pointerType !== "mouse" && !d.matches(s.focusableElements)) && r.activeElement.blur();
  const T = v && e.allowTouchMove && n.touchStartPreventDefault;
  (n.touchStartForcePreventDefault || T) && !d.isContentEditable && i.preventDefault(), n.freeMode && n.freeMode.enabled && e.freeMode && e.animating && !n.cssMode && e.freeMode.onTouchStart(), e.emit("touchStart", i);
}
function jr(t) {
  const e = Y(), r = this, i = r.touchEventsData, {
    params: s,
    touches: n,
    rtlTranslate: o,
    enabled: a
  } = r;
  if (!a || !s.simulateTouch && t.pointerType === "mouse") return;
  let d = t;
  if (d.originalEvent && (d = d.originalEvent), d.type === "pointermove" && (i.touchId !== null || d.pointerId !== i.pointerId))
    return;
  let l;
  if (d.type === "touchmove") {
    if (l = [...d.changedTouches].find((x) => x.identifier === i.touchId), !l || l.identifier !== i.touchId) return;
  } else
    l = d;
  if (!i.isTouched) {
    i.startMoving && i.isScrolling && r.emit("touchMoveOpposite", d);
    return;
  }
  const f = l.pageX, u = l.pageY;
  if (d.preventedByNestedSwiper) {
    n.startX = f, n.startY = u;
    return;
  }
  if (!r.allowTouchMove) {
    d.target.matches(i.focusableElements) || (r.allowClick = !1), i.isTouched && (Object.assign(n, {
      startX: f,
      startY: u,
      currentX: f,
      currentY: u
    }), i.touchStartTime = Te());
    return;
  }
  if (s.touchReleaseOnEdges && !s.loop)
    if (r.isVertical()) {
      if (u < n.startY && r.translate <= r.maxTranslate() || u > n.startY && r.translate >= r.minTranslate()) {
        i.isTouched = !1, i.isMoved = !1;
        return;
      }
    } else {
      if (o && (f > n.startX && -r.translate <= r.maxTranslate() || f < n.startX && -r.translate >= r.minTranslate()))
        return;
      if (!o && (f < n.startX && r.translate <= r.maxTranslate() || f > n.startX && r.translate >= r.minTranslate()))
        return;
    }
  if (e.activeElement && e.activeElement.matches(i.focusableElements) && e.activeElement !== d.target && d.pointerType !== "mouse" && e.activeElement.blur(), e.activeElement && d.target === e.activeElement && d.target.matches(i.focusableElements)) {
    i.isMoved = !0, r.allowClick = !1;
    return;
  }
  i.allowTouchCallbacks && r.emit("touchMove", d), n.previousX = n.currentX, n.previousY = n.currentY, n.currentX = f, n.currentY = u;
  const h = n.currentX - n.startX, b = n.currentY - n.startY;
  if (r.params.threshold && Math.sqrt(h ** 2 + b ** 2) < r.params.threshold) return;
  if (typeof i.isScrolling > "u") {
    let x;
    r.isHorizontal() && n.currentY === n.startY || r.isVertical() && n.currentX === n.startX ? i.isScrolling = !1 : h * h + b * b >= 25 && (x = Math.atan2(Math.abs(b), Math.abs(h)) * 180 / Math.PI, i.isScrolling = r.isHorizontal() ? x > s.touchAngle : 90 - x > s.touchAngle);
  }
  if (i.isScrolling && r.emit("touchMoveOpposite", d), typeof i.startMoving > "u" && (n.currentX !== n.startX || n.currentY !== n.startY) && (i.startMoving = !0), i.isScrolling || d.type === "touchmove" && i.preventTouchMoveFromPointerMove) {
    i.isTouched = !1;
    return;
  }
  if (!i.startMoving)
    return;
  r.allowClick = !1, !s.cssMode && d.cancelable && d.preventDefault(), s.touchMoveStopPropagation && !s.nested && d.stopPropagation();
  let p = r.isHorizontal() ? h : b, v = r.isHorizontal() ? n.currentX - n.previousX : n.currentY - n.previousY;
  s.oneWayMovement && (p = Math.abs(p) * (o ? 1 : -1), v = Math.abs(v) * (o ? 1 : -1)), n.diff = p, p *= s.touchRatio, o && (p = -p, v = -v);
  const T = r.touchesDirection;
  r.swipeDirection = p > 0 ? "prev" : "next", r.touchesDirection = v > 0 ? "prev" : "next";
  const y = r.params.loop && !s.cssMode, c = r.touchesDirection === "next" && r.allowSlideNext || r.touchesDirection === "prev" && r.allowSlidePrev;
  if (!i.isMoved) {
    if (y && c && r.loopFix({
      direction: r.swipeDirection
    }), i.startTranslate = r.getTranslate(), r.setTransition(0), r.animating) {
      const x = new window.CustomEvent("transitionend", {
        bubbles: !0,
        cancelable: !0,
        detail: {
          bySwiperTouchMove: !0
        }
      });
      r.wrapperEl.dispatchEvent(x);
    }
    i.allowMomentumBounce = !1, s.grabCursor && (r.allowSlideNext === !0 || r.allowSlidePrev === !0) && r.setGrabCursor(!0), r.emit("sliderFirstMove", d);
  }
  if ((/* @__PURE__ */ new Date()).getTime(), s._loopSwapReset !== !1 && i.isMoved && i.allowThresholdMove && T !== r.touchesDirection && y && c && Math.abs(p) >= 1) {
    Object.assign(n, {
      startX: f,
      startY: u,
      currentX: f,
      currentY: u,
      startTranslate: i.currentTranslate
    }), i.loopSwapReset = !0, i.startTranslate = i.currentTranslate;
    return;
  }
  r.emit("sliderMove", d), i.isMoved = !0, i.currentTranslate = p + i.startTranslate;
  let m = !0, w = s.resistanceRatio;
  if (s.touchReleaseOnEdges && (w = 0), p > 0 ? (y && c && i.allowThresholdMove && i.currentTranslate > (s.centeredSlides ? r.minTranslate() - r.slidesSizesGrid[r.activeIndex + 1] - (s.slidesPerView !== "auto" && r.slides.length - s.slidesPerView >= 2 ? r.slidesSizesGrid[r.activeIndex + 1] + r.params.spaceBetween : 0) - r.params.spaceBetween : r.minTranslate()) && r.loopFix({
    direction: "prev",
    setTranslate: !0,
    activeSlideIndex: 0
  }), i.currentTranslate > r.minTranslate() && (m = !1, s.resistance && (i.currentTranslate = r.minTranslate() - 1 + (-r.minTranslate() + i.startTranslate + p) ** w))) : p < 0 && (y && c && i.allowThresholdMove && i.currentTranslate < (s.centeredSlides ? r.maxTranslate() + r.slidesSizesGrid[r.slidesSizesGrid.length - 1] + r.params.spaceBetween + (s.slidesPerView !== "auto" && r.slides.length - s.slidesPerView >= 2 ? r.slidesSizesGrid[r.slidesSizesGrid.length - 1] + r.params.spaceBetween : 0) : r.maxTranslate()) && r.loopFix({
    direction: "next",
    setTranslate: !0,
    activeSlideIndex: r.slides.length - (s.slidesPerView === "auto" ? r.slidesPerViewDynamic() : Math.ceil(parseFloat(s.slidesPerView, 10)))
  }), i.currentTranslate < r.maxTranslate() && (m = !1, s.resistance && (i.currentTranslate = r.maxTranslate() + 1 - (r.maxTranslate() - i.startTranslate - p) ** w))), m && (d.preventedByNestedSwiper = !0), !r.allowSlideNext && r.swipeDirection === "next" && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate), !r.allowSlidePrev && r.swipeDirection === "prev" && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate), !r.allowSlidePrev && !r.allowSlideNext && (i.currentTranslate = i.startTranslate), s.threshold > 0)
    if (Math.abs(p) > s.threshold || i.allowThresholdMove) {
      if (!i.allowThresholdMove) {
        i.allowThresholdMove = !0, n.startX = n.currentX, n.startY = n.currentY, i.currentTranslate = i.startTranslate, n.diff = r.isHorizontal() ? n.currentX - n.startX : n.currentY - n.startY;
        return;
      }
    } else {
      i.currentTranslate = i.startTranslate;
      return;
    }
  !s.followFinger || s.cssMode || ((s.freeMode && s.freeMode.enabled && r.freeMode || s.watchSlidesProgress) && (r.updateActiveIndex(), r.updateSlidesClasses()), s.freeMode && s.freeMode.enabled && r.freeMode && r.freeMode.onTouchMove(), r.updateProgress(i.currentTranslate), r.setTranslate(i.currentTranslate));
}
function Hr(t) {
  const e = this, r = e.touchEventsData;
  let i = t;
  i.originalEvent && (i = i.originalEvent);
  let s;
  if (i.type === "touchend" || i.type === "touchcancel") {
    if (s = [...i.changedTouches].find((x) => x.identifier === r.touchId), !s || s.identifier !== r.touchId) return;
  } else {
    if (r.touchId !== null || i.pointerId !== r.pointerId) return;
    s = i;
  }
  if (["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(i.type) && !(["pointercancel", "contextmenu"].includes(i.type) && (e.browser.isSafari || e.browser.isWebView)))
    return;
  r.pointerId = null, r.touchId = null;
  const {
    params: o,
    touches: a,
    rtlTranslate: d,
    slidesGrid: l,
    enabled: f
  } = e;
  if (!f || !o.simulateTouch && i.pointerType === "mouse") return;
  if (r.allowTouchCallbacks && e.emit("touchEnd", i), r.allowTouchCallbacks = !1, !r.isTouched) {
    r.isMoved && o.grabCursor && e.setGrabCursor(!1), r.isMoved = !1, r.startMoving = !1;
    return;
  }
  o.grabCursor && r.isMoved && r.isTouched && (e.allowSlideNext === !0 || e.allowSlidePrev === !0) && e.setGrabCursor(!1);
  const u = Te(), h = u - r.touchStartTime;
  if (e.allowClick) {
    const x = i.path || i.composedPath && i.composedPath();
    e.updateClickedSlide(x && x[0] || i.target, x), e.emit("tap click", i), h < 300 && u - r.lastClickTime < 300 && e.emit("doubleTap doubleClick", i);
  }
  if (r.lastClickTime = Te(), ut(() => {
    e.destroyed || (e.allowClick = !0);
  }), !r.isTouched || !r.isMoved || !e.swipeDirection || a.diff === 0 && !r.loopSwapReset || r.currentTranslate === r.startTranslate && !r.loopSwapReset) {
    r.isTouched = !1, r.isMoved = !1, r.startMoving = !1;
    return;
  }
  r.isTouched = !1, r.isMoved = !1, r.startMoving = !1;
  let b;
  if (o.followFinger ? b = d ? e.translate : -e.translate : b = -r.currentTranslate, o.cssMode)
    return;
  if (o.freeMode && o.freeMode.enabled) {
    e.freeMode.onTouchEnd({
      currentPos: b
    });
    return;
  }
  const p = b >= -e.maxTranslate() && !e.params.loop;
  let v = 0, T = e.slidesSizesGrid[0];
  for (let x = 0; x < l.length; x += x < o.slidesPerGroupSkip ? 1 : o.slidesPerGroup) {
    const C = x < o.slidesPerGroupSkip - 1 ? 1 : o.slidesPerGroup;
    typeof l[x + C] < "u" ? (p || b >= l[x] && b < l[x + C]) && (v = x, T = l[x + C] - l[x]) : (p || b >= l[x]) && (v = x, T = l[l.length - 1] - l[l.length - 2]);
  }
  let y = null, c = null;
  o.rewind && (e.isBeginning ? c = o.virtual && o.virtual.enabled && e.virtual ? e.virtual.slides.length - 1 : e.slides.length - 1 : e.isEnd && (y = 0));
  const m = (b - l[v]) / T, w = v < o.slidesPerGroupSkip - 1 ? 1 : o.slidesPerGroup;
  if (h > o.longSwipesMs) {
    if (!o.longSwipes) {
      e.slideTo(e.activeIndex);
      return;
    }
    e.swipeDirection === "next" && (m >= o.longSwipesRatio ? e.slideTo(o.rewind && e.isEnd ? y : v + w) : e.slideTo(v)), e.swipeDirection === "prev" && (m > 1 - o.longSwipesRatio ? e.slideTo(v + w) : c !== null && m < 0 && Math.abs(m) > o.longSwipesRatio ? e.slideTo(c) : e.slideTo(v));
  } else {
    if (!o.shortSwipes) {
      e.slideTo(e.activeIndex);
      return;
    }
    e.navigation && (i.target === e.navigation.nextEl || i.target === e.navigation.prevEl) ? i.target === e.navigation.nextEl ? e.slideTo(v + w) : e.slideTo(v) : (e.swipeDirection === "next" && e.slideTo(y !== null ? y : v + w), e.swipeDirection === "prev" && e.slideTo(c !== null ? c : v));
  }
}
function Qe() {
  const t = this, {
    params: e,
    el: r
  } = t;
  if (r && r.offsetWidth === 0) return;
  e.breakpoints && t.setBreakpoint();
  const {
    allowSlideNext: i,
    allowSlidePrev: s,
    snapGrid: n
  } = t, o = t.virtual && t.params.virtual.enabled;
  t.allowSlideNext = !0, t.allowSlidePrev = !0, t.updateSize(), t.updateSlides(), t.updateSlidesClasses();
  const a = o && e.loop;
  (e.slidesPerView === "auto" || e.slidesPerView > 1) && t.isEnd && !t.isBeginning && !t.params.centeredSlides && !a ? t.slideTo(t.slides.length - 1, 0, !1, !0) : t.params.loop && !o ? t.slideToLoop(t.realIndex, 0, !1, !0) : t.slideTo(t.activeIndex, 0, !1, !0), t.autoplay && t.autoplay.running && t.autoplay.paused && (clearTimeout(t.autoplay.resizeTimeout), t.autoplay.resizeTimeout = setTimeout(() => {
    t.autoplay && t.autoplay.running && t.autoplay.paused && t.autoplay.resume();
  }, 500)), t.allowSlidePrev = s, t.allowSlideNext = i, t.params.watchOverflow && n !== t.snapGrid && t.checkOverflow();
}
function Wr(t) {
  const e = this;
  e.enabled && (e.allowClick || (e.params.preventClicks && t.preventDefault(), e.params.preventClicksPropagation && e.animating && (t.stopPropagation(), t.stopImmediatePropagation())));
}
function qr() {
  const t = this, {
    wrapperEl: e,
    rtlTranslate: r,
    enabled: i
  } = t;
  if (!i) return;
  t.previousTranslate = t.translate, t.isHorizontal() ? t.translate = -e.scrollLeft : t.translate = -e.scrollTop, t.translate === 0 && (t.translate = 0), t.updateActiveIndex(), t.updateSlidesClasses();
  let s;
  const n = t.maxTranslate() - t.minTranslate();
  n === 0 ? s = 0 : s = (t.translate - t.minTranslate()) / n, s !== t.progress && t.updateProgress(r ? -t.translate : t.translate), t.emit("setTranslate", t.translate, !1);
}
function Yr(t) {
  const e = this;
  ye(e, t.target), !(e.params.cssMode || e.params.slidesPerView !== "auto" && !e.params.autoHeight) && e.update();
}
function Xr() {
  const t = this;
  t.documentTouchHandlerProceeded || (t.documentTouchHandlerProceeded = !0, t.params.touchReleaseOnEdges && (t.el.style.touchAction = "auto"));
}
const wt = (t, e) => {
  const r = Y(), {
    params: i,
    el: s,
    wrapperEl: n,
    device: o
  } = t, a = !!i.nested, d = e === "on" ? "addEventListener" : "removeEventListener", l = e;
  !s || typeof s == "string" || (r[d]("touchstart", t.onDocumentTouchStart, {
    passive: !1,
    capture: a
  }), s[d]("touchstart", t.onTouchStart, {
    passive: !1
  }), s[d]("pointerdown", t.onTouchStart, {
    passive: !1
  }), r[d]("touchmove", t.onTouchMove, {
    passive: !1,
    capture: a
  }), r[d]("pointermove", t.onTouchMove, {
    passive: !1,
    capture: a
  }), r[d]("touchend", t.onTouchEnd, {
    passive: !0
  }), r[d]("pointerup", t.onTouchEnd, {
    passive: !0
  }), r[d]("pointercancel", t.onTouchEnd, {
    passive: !0
  }), r[d]("touchcancel", t.onTouchEnd, {
    passive: !0
  }), r[d]("pointerout", t.onTouchEnd, {
    passive: !0
  }), r[d]("pointerleave", t.onTouchEnd, {
    passive: !0
  }), r[d]("contextmenu", t.onTouchEnd, {
    passive: !0
  }), (i.preventClicks || i.preventClicksPropagation) && s[d]("click", t.onClick, !0), i.cssMode && n[d]("scroll", t.onScroll), i.updateOnWindowResize ? t[l](o.ios || o.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", Qe, !0) : t[l]("observerUpdate", Qe, !0), s[d]("load", t.onLoad, {
    capture: !0
  }));
};
function Ur() {
  const t = this, {
    params: e
  } = t;
  t.onTouchStart = Fr.bind(t), t.onTouchMove = jr.bind(t), t.onTouchEnd = Hr.bind(t), t.onDocumentTouchStart = Xr.bind(t), e.cssMode && (t.onScroll = qr.bind(t)), t.onClick = Wr.bind(t), t.onLoad = Yr.bind(t), wt(t, "on");
}
function Kr() {
  wt(this, "off");
}
var Jr = {
  attachEvents: Ur,
  detachEvents: Kr
};
const Ze = (t, e) => t.grid && e.grid && e.grid.rows > 1;
function Qr() {
  const t = this, {
    realIndex: e,
    initialized: r,
    params: i,
    el: s
  } = t, n = i.breakpoints;
  if (!n || n && Object.keys(n).length === 0) return;
  const o = Y(), a = i.breakpointsBase === "window" || !i.breakpointsBase ? i.breakpointsBase : "container", d = ["window", "container"].includes(i.breakpointsBase) || !i.breakpointsBase ? t.el : o.querySelector(i.breakpointsBase), l = t.getBreakpoint(n, a, d);
  if (!l || t.currentBreakpoint === l) return;
  const u = (l in n ? n[l] : void 0) || t.originalParams, h = Ze(t, i), b = Ze(t, u), p = t.params.grabCursor, v = u.grabCursor, T = i.enabled;
  h && !b ? (s.classList.remove(`${i.containerModifierClass}grid`, `${i.containerModifierClass}grid-column`), t.emitContainerClasses()) : !h && b && (s.classList.add(`${i.containerModifierClass}grid`), (u.grid.fill && u.grid.fill === "column" || !u.grid.fill && i.grid.fill === "column") && s.classList.add(`${i.containerModifierClass}grid-column`), t.emitContainerClasses()), p && !v ? t.unsetGrabCursor() : !p && v && t.setGrabCursor(), ["navigation", "pagination", "scrollbar"].forEach((C) => {
    if (typeof u[C] > "u") return;
    const k = i[C] && i[C].enabled, P = u[C] && u[C].enabled;
    k && !P && t[C].disable(), !k && P && t[C].enable();
  });
  const y = u.direction && u.direction !== i.direction, c = i.loop && (u.slidesPerView !== i.slidesPerView || y), m = i.loop;
  y && r && t.changeDirection(), G(t.params, u);
  const w = t.params.enabled, x = t.params.loop;
  Object.assign(t, {
    allowTouchMove: t.params.allowTouchMove,
    allowSlideNext: t.params.allowSlideNext,
    allowSlidePrev: t.params.allowSlidePrev
  }), T && !w ? t.disable() : !T && w && t.enable(), t.currentBreakpoint = l, t.emit("_beforeBreakpoint", u), r && (c ? (t.loopDestroy(), t.loopCreate(e), t.updateSlides()) : !m && x ? (t.loopCreate(e), t.updateSlides()) : m && !x && t.loopDestroy()), t.emit("breakpoint", u);
}
function Zr(t, e, r) {
  if (e === void 0 && (e = "window"), !t || e === "container" && !r) return;
  let i = !1;
  const s = N(), n = e === "window" ? s.innerHeight : r.clientHeight, o = Object.keys(t).map((a) => {
    if (typeof a == "string" && a.indexOf("@") === 0) {
      const d = parseFloat(a.substr(1));
      return {
        value: n * d,
        point: a
      };
    }
    return {
      value: a,
      point: a
    };
  });
  o.sort((a, d) => parseInt(a.value, 10) - parseInt(d.value, 10));
  for (let a = 0; a < o.length; a += 1) {
    const {
      point: d,
      value: l
    } = o[a];
    e === "window" ? s.matchMedia(`(min-width: ${l}px)`).matches && (i = d) : l <= r.clientWidth && (i = d);
  }
  return i || "max";
}
var ei = {
  setBreakpoint: Qr,
  getBreakpoint: Zr
};
function ti(t, e) {
  const r = [];
  return t.forEach((i) => {
    typeof i == "object" ? Object.keys(i).forEach((s) => {
      i[s] && r.push(e + s);
    }) : typeof i == "string" && r.push(e + i);
  }), r;
}
function ri() {
  const t = this, {
    classNames: e,
    params: r,
    rtl: i,
    el: s,
    device: n
  } = t, o = ti(["initialized", r.direction, {
    "free-mode": t.params.freeMode && r.freeMode.enabled
  }, {
    autoheight: r.autoHeight
  }, {
    rtl: i
  }, {
    grid: r.grid && r.grid.rows > 1
  }, {
    "grid-column": r.grid && r.grid.rows > 1 && r.grid.fill === "column"
  }, {
    android: n.android
  }, {
    ios: n.ios
  }, {
    "css-mode": r.cssMode
  }, {
    centered: r.cssMode && r.centeredSlides
  }, {
    "watch-progress": r.watchSlidesProgress
  }], r.containerModifierClass);
  e.push(...o), s.classList.add(...e), t.emitContainerClasses();
}
function ii() {
  const t = this, {
    el: e,
    classNames: r
  } = t;
  !e || typeof e == "string" || (e.classList.remove(...r), t.emitContainerClasses());
}
var si = {
  addClasses: ri,
  removeClasses: ii
};
function ni() {
  const t = this, {
    isLocked: e,
    params: r
  } = t, {
    slidesOffsetBefore: i
  } = r;
  if (i) {
    const s = t.slides.length - 1, n = t.slidesGrid[s] + t.slidesSizesGrid[s] + i * 2;
    t.isLocked = t.size > n;
  } else
    t.isLocked = t.snapGrid.length === 1;
  r.allowSlideNext === !0 && (t.allowSlideNext = !t.isLocked), r.allowSlidePrev === !0 && (t.allowSlidePrev = !t.isLocked), e && e !== t.isLocked && (t.isEnd = !1), e !== t.isLocked && t.emit(t.isLocked ? "lock" : "unlock");
}
var oi = {
  checkOverflow: ni
}, et = {
  init: !0,
  direction: "horizontal",
  oneWayMovement: !1,
  swiperElementNodeName: "SWIPER-CONTAINER",
  touchEventsTarget: "wrapper",
  initialSlide: 0,
  speed: 300,
  cssMode: !1,
  updateOnWindowResize: !0,
  resizeObserver: !0,
  nested: !1,
  createElements: !1,
  eventsPrefix: "swiper",
  enabled: !0,
  focusableElements: "input, select, option, textarea, button, video, label",
  // Overrides
  width: null,
  height: null,
  //
  preventInteractionOnTransition: !1,
  // ssr
  userAgent: null,
  url: null,
  // To support iOS's swipe-to-go-back gesture (when being used in-app).
  edgeSwipeDetection: !1,
  edgeSwipeThreshold: 20,
  // Autoheight
  autoHeight: !1,
  // Set wrapper width
  setWrapperSize: !1,
  // Virtual Translate
  virtualTranslate: !1,
  // Effects
  effect: "slide",
  // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
  // Breakpoints
  breakpoints: void 0,
  breakpointsBase: "window",
  // Slides grid
  spaceBetween: 0,
  slidesPerView: 1,
  slidesPerGroup: 1,
  slidesPerGroupSkip: 0,
  slidesPerGroupAuto: !1,
  centeredSlides: !1,
  centeredSlidesBounds: !1,
  slidesOffsetBefore: 0,
  // in px
  slidesOffsetAfter: 0,
  // in px
  normalizeSlideIndex: !0,
  centerInsufficientSlides: !1,
  // Disable swiper and hide navigation when container not overflow
  watchOverflow: !0,
  // Round length
  roundLengths: !1,
  // Touches
  touchRatio: 1,
  touchAngle: 45,
  simulateTouch: !0,
  shortSwipes: !0,
  longSwipes: !0,
  longSwipesRatio: 0.5,
  longSwipesMs: 300,
  followFinger: !0,
  allowTouchMove: !0,
  threshold: 5,
  touchMoveStopPropagation: !1,
  touchStartPreventDefault: !0,
  touchStartForcePreventDefault: !1,
  touchReleaseOnEdges: !1,
  // Unique Navigation Elements
  uniqueNavElements: !0,
  // Resistance
  resistance: !0,
  resistanceRatio: 0.85,
  // Progress
  watchSlidesProgress: !1,
  // Cursor
  grabCursor: !1,
  // Clicks
  preventClicks: !0,
  preventClicksPropagation: !0,
  slideToClickedSlide: !1,
  // loop
  loop: !1,
  loopAddBlankSlides: !0,
  loopAdditionalSlides: 0,
  loopPreventsSliding: !0,
  // rewind
  rewind: !1,
  // Swiping/no swiping
  allowSlidePrev: !0,
  allowSlideNext: !0,
  swipeHandler: null,
  // '.swipe-handler',
  noSwiping: !0,
  noSwipingClass: "swiper-no-swiping",
  noSwipingSelector: null,
  // Passive Listeners
  passiveListeners: !0,
  maxBackfaceHiddenSlides: 10,
  // NS
  containerModifierClass: "swiper-",
  // NEW
  slideClass: "swiper-slide",
  slideBlankClass: "swiper-slide-blank",
  slideActiveClass: "swiper-slide-active",
  slideVisibleClass: "swiper-slide-visible",
  slideFullyVisibleClass: "swiper-slide-fully-visible",
  slideNextClass: "swiper-slide-next",
  slidePrevClass: "swiper-slide-prev",
  wrapperClass: "swiper-wrapper",
  lazyPreloaderClass: "swiper-lazy-preloader",
  lazyPreloadPrevNext: 0,
  // Callbacks
  runCallbacksOnInit: !0,
  // Internals
  _emitClasses: !1
};
function ai(t, e) {
  return function(i) {
    i === void 0 && (i = {});
    const s = Object.keys(i)[0], n = i[s];
    if (typeof n != "object" || n === null) {
      G(e, i);
      return;
    }
    if (t[s] === !0 && (t[s] = {
      enabled: !0
    }), s === "navigation" && t[s] && t[s].enabled && !t[s].prevEl && !t[s].nextEl && (t[s].auto = !0), ["pagination", "scrollbar"].indexOf(s) >= 0 && t[s] && t[s].enabled && !t[s].el && (t[s].auto = !0), !(s in t && "enabled" in n)) {
      G(e, i);
      return;
    }
    typeof t[s] == "object" && !("enabled" in t[s]) && (t[s].enabled = !0), t[s] || (t[s] = {
      enabled: !1
    }), G(e, i);
  };
}
const Ae = {
  eventsEmitter: sr,
  update: hr,
  translate: xr,
  transition: Er,
  slide: Ir,
  loop: Br,
  grabCursor: Gr,
  events: Jr,
  breakpoints: ei,
  checkOverflow: oi,
  classes: si
}, ze = {};
class V {
  constructor() {
    let e, r;
    for (var i = arguments.length, s = new Array(i), n = 0; n < i; n++)
      s[n] = arguments[n];
    s.length === 1 && s[0].constructor && Object.prototype.toString.call(s[0]).slice(8, -1) === "Object" ? r = s[0] : [e, r] = s, r || (r = {}), r = G({}, r), e && !r.el && (r.el = e);
    const o = Y();
    if (r.el && typeof r.el == "string" && o.querySelectorAll(r.el).length > 1) {
      const f = [];
      return o.querySelectorAll(r.el).forEach((u) => {
        const h = G({}, r, {
          el: u
        });
        f.push(new V(h));
      }), f;
    }
    const a = this;
    a.__swiper__ = !0, a.support = ht(), a.device = gt({
      userAgent: r.userAgent
    }), a.browser = bt(), a.eventsListeners = {}, a.eventsAnyListeners = [], a.modules = [...a.__modules__], r.modules && Array.isArray(r.modules) && a.modules.push(...r.modules);
    const d = {};
    a.modules.forEach((f) => {
      f({
        params: r,
        swiper: a,
        extendParams: ai(r, d),
        on: a.on.bind(a),
        once: a.once.bind(a),
        off: a.off.bind(a),
        emit: a.emit.bind(a)
      });
    });
    const l = G({}, et, d);
    return a.params = G({}, l, ze, r), a.originalParams = G({}, a.params), a.passedParams = G({}, r), a.params && a.params.on && Object.keys(a.params.on).forEach((f) => {
      a.on(f, a.params.on[f]);
    }), a.params && a.params.onAny && a.onAny(a.params.onAny), Object.assign(a, {
      enabled: a.params.enabled,
      el: e,
      // Classes
      classNames: [],
      // Slides
      slides: [],
      slidesGrid: [],
      snapGrid: [],
      slidesSizesGrid: [],
      // isDirection
      isHorizontal() {
        return a.params.direction === "horizontal";
      },
      isVertical() {
        return a.params.direction === "vertical";
      },
      // Indexes
      activeIndex: 0,
      realIndex: 0,
      //
      isBeginning: !0,
      isEnd: !1,
      // Props
      translate: 0,
      previousTranslate: 0,
      progress: 0,
      velocity: 0,
      animating: !1,
      cssOverflowAdjustment() {
        return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
      },
      // Locks
      allowSlideNext: a.params.allowSlideNext,
      allowSlidePrev: a.params.allowSlidePrev,
      // Touch Events
      touchEventsData: {
        isTouched: void 0,
        isMoved: void 0,
        allowTouchCallbacks: void 0,
        touchStartTime: void 0,
        isScrolling: void 0,
        currentTranslate: void 0,
        startTranslate: void 0,
        allowThresholdMove: void 0,
        // Form elements to match
        focusableElements: a.params.focusableElements,
        // Last click time
        lastClickTime: 0,
        clickTimeout: void 0,
        // Velocities
        velocities: [],
        allowMomentumBounce: void 0,
        startMoving: void 0,
        pointerId: null,
        touchId: null
      },
      // Clicks
      allowClick: !0,
      // Touches
      allowTouchMove: a.params.allowTouchMove,
      touches: {
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        diff: 0
      },
      // Images
      imagesToLoad: [],
      imagesLoaded: 0
    }), a.emit("_swiper"), a.params.init && a.init(), a;
  }
  getDirectionLabel(e) {
    return this.isHorizontal() ? e : {
      width: "height",
      "margin-top": "margin-left",
      "margin-bottom ": "margin-right",
      "margin-left": "margin-top",
      "margin-right": "margin-bottom",
      "padding-left": "padding-top",
      "padding-right": "padding-bottom",
      marginRight: "marginBottom"
    }[e];
  }
  getSlideIndex(e) {
    const {
      slidesEl: r,
      params: i
    } = this, s = W(r, `.${i.slideClass}, swiper-slide`), n = fe(s[0]);
    return fe(e) - n;
  }
  getSlideIndexByData(e) {
    return this.getSlideIndex(this.slides.find((r) => r.getAttribute("data-swiper-slide-index") * 1 === e));
  }
  getSlideIndexWhenGrid(e) {
    return this.grid && this.params.grid && this.params.grid.rows > 1 && (this.params.grid.fill === "column" ? e = Math.floor(e / this.params.grid.rows) : this.params.grid.fill === "row" && (e = e % Math.ceil(this.slides.length / this.params.grid.rows))), e;
  }
  recalcSlides() {
    const e = this, {
      slidesEl: r,
      params: i
    } = e;
    e.slides = W(r, `.${i.slideClass}, swiper-slide`);
  }
  enable() {
    const e = this;
    e.enabled || (e.enabled = !0, e.params.grabCursor && e.setGrabCursor(), e.emit("enable"));
  }
  disable() {
    const e = this;
    e.enabled && (e.enabled = !1, e.params.grabCursor && e.unsetGrabCursor(), e.emit("disable"));
  }
  setProgress(e, r) {
    const i = this;
    e = Math.min(Math.max(e, 0), 1);
    const s = i.minTranslate(), o = (i.maxTranslate() - s) * e + s;
    i.translateTo(o, typeof r > "u" ? 0 : r), i.updateActiveIndex(), i.updateSlidesClasses();
  }
  emitContainerClasses() {
    const e = this;
    if (!e.params._emitClasses || !e.el) return;
    const r = e.el.className.split(" ").filter((i) => i.indexOf("swiper") === 0 || i.indexOf(e.params.containerModifierClass) === 0);
    e.emit("_containerClasses", r.join(" "));
  }
  getSlideClasses(e) {
    const r = this;
    return r.destroyed ? "" : e.className.split(" ").filter((i) => i.indexOf("swiper-slide") === 0 || i.indexOf(r.params.slideClass) === 0).join(" ");
  }
  emitSlidesClasses() {
    const e = this;
    if (!e.params._emitClasses || !e.el) return;
    const r = [];
    e.slides.forEach((i) => {
      const s = e.getSlideClasses(i);
      r.push({
        slideEl: i,
        classNames: s
      }), e.emit("_slideClass", i, s);
    }), e.emit("_slideClasses", r);
  }
  slidesPerViewDynamic(e, r) {
    e === void 0 && (e = "current"), r === void 0 && (r = !1);
    const i = this, {
      params: s,
      slides: n,
      slidesGrid: o,
      slidesSizesGrid: a,
      size: d,
      activeIndex: l
    } = i;
    let f = 1;
    if (typeof s.slidesPerView == "number") return s.slidesPerView;
    if (s.centeredSlides) {
      let u = n[l] ? Math.ceil(n[l].swiperSlideSize) : 0, h;
      for (let b = l + 1; b < n.length; b += 1)
        n[b] && !h && (u += Math.ceil(n[b].swiperSlideSize), f += 1, u > d && (h = !0));
      for (let b = l - 1; b >= 0; b -= 1)
        n[b] && !h && (u += n[b].swiperSlideSize, f += 1, u > d && (h = !0));
    } else if (e === "current")
      for (let u = l + 1; u < n.length; u += 1)
        (r ? o[u] + a[u] - o[l] < d : o[u] - o[l] < d) && (f += 1);
    else
      for (let u = l - 1; u >= 0; u -= 1)
        o[l] - o[u] < d && (f += 1);
    return f;
  }
  update() {
    const e = this;
    if (!e || e.destroyed) return;
    const {
      snapGrid: r,
      params: i
    } = e;
    i.breakpoints && e.setBreakpoint(), [...e.el.querySelectorAll('[loading="lazy"]')].forEach((o) => {
      o.complete && ye(e, o);
    }), e.updateSize(), e.updateSlides(), e.updateProgress(), e.updateSlidesClasses();
    function s() {
      const o = e.rtlTranslate ? e.translate * -1 : e.translate, a = Math.min(Math.max(o, e.maxTranslate()), e.minTranslate());
      e.setTranslate(a), e.updateActiveIndex(), e.updateSlidesClasses();
    }
    let n;
    if (i.freeMode && i.freeMode.enabled && !i.cssMode)
      s(), i.autoHeight && e.updateAutoHeight();
    else {
      if ((i.slidesPerView === "auto" || i.slidesPerView > 1) && e.isEnd && !i.centeredSlides) {
        const o = e.virtual && i.virtual.enabled ? e.virtual.slides : e.slides;
        n = e.slideTo(o.length - 1, 0, !1, !0);
      } else
        n = e.slideTo(e.activeIndex, 0, !1, !0);
      n || s();
    }
    i.watchOverflow && r !== e.snapGrid && e.checkOverflow(), e.emit("update");
  }
  changeDirection(e, r) {
    r === void 0 && (r = !0);
    const i = this, s = i.params.direction;
    return e || (e = s === "horizontal" ? "vertical" : "horizontal"), e === s || e !== "horizontal" && e !== "vertical" || (i.el.classList.remove(`${i.params.containerModifierClass}${s}`), i.el.classList.add(`${i.params.containerModifierClass}${e}`), i.emitContainerClasses(), i.params.direction = e, i.slides.forEach((n) => {
      e === "vertical" ? n.style.width = "" : n.style.height = "";
    }), i.emit("changeDirection"), r && i.update()), i;
  }
  changeLanguageDirection(e) {
    const r = this;
    r.rtl && e === "rtl" || !r.rtl && e === "ltr" || (r.rtl = e === "rtl", r.rtlTranslate = r.params.direction === "horizontal" && r.rtl, r.rtl ? (r.el.classList.add(`${r.params.containerModifierClass}rtl`), r.el.dir = "rtl") : (r.el.classList.remove(`${r.params.containerModifierClass}rtl`), r.el.dir = "ltr"), r.update());
  }
  mount(e) {
    const r = this;
    if (r.mounted) return !0;
    let i = e || r.params.el;
    if (typeof i == "string" && (i = document.querySelector(i)), !i)
      return !1;
    i.swiper = r, i.parentNode && i.parentNode.host && i.parentNode.host.nodeName === r.params.swiperElementNodeName.toUpperCase() && (r.isElement = !0);
    const s = () => `.${(r.params.wrapperClass || "").trim().split(" ").join(".")}`;
    let o = i && i.shadowRoot && i.shadowRoot.querySelector ? i.shadowRoot.querySelector(s()) : W(i, s())[0];
    return !o && r.params.createElements && (o = ce("div", r.params.wrapperClass), i.append(o), W(i, `.${r.params.slideClass}`).forEach((a) => {
      o.append(a);
    })), Object.assign(r, {
      el: i,
      wrapperEl: o,
      slidesEl: r.isElement && !i.parentNode.host.slideSlots ? i.parentNode.host : o,
      hostEl: r.isElement ? i.parentNode.host : i,
      mounted: !0,
      // RTL
      rtl: i.dir.toLowerCase() === "rtl" || J(i, "direction") === "rtl",
      rtlTranslate: r.params.direction === "horizontal" && (i.dir.toLowerCase() === "rtl" || J(i, "direction") === "rtl"),
      wrongRTL: J(o, "display") === "-webkit-box"
    }), !0;
  }
  init(e) {
    const r = this;
    if (r.initialized || r.mount(e) === !1) return r;
    r.emit("beforeInit"), r.params.breakpoints && r.setBreakpoint(), r.addClasses(), r.updateSize(), r.updateSlides(), r.params.watchOverflow && r.checkOverflow(), r.params.grabCursor && r.enabled && r.setGrabCursor(), r.params.loop && r.virtual && r.params.virtual.enabled ? r.slideTo(r.params.initialSlide + r.virtual.slidesBefore, 0, r.params.runCallbacksOnInit, !1, !0) : r.slideTo(r.params.initialSlide, 0, r.params.runCallbacksOnInit, !1, !0), r.params.loop && r.loopCreate(void 0, !0), r.attachEvents();
    const s = [...r.el.querySelectorAll('[loading="lazy"]')];
    return r.isElement && s.push(...r.hostEl.querySelectorAll('[loading="lazy"]')), s.forEach((n) => {
      n.complete ? ye(r, n) : n.addEventListener("load", (o) => {
        ye(r, o.target);
      });
    }), je(r), r.initialized = !0, je(r), r.emit("init"), r.emit("afterInit"), r;
  }
  destroy(e, r) {
    e === void 0 && (e = !0), r === void 0 && (r = !0);
    const i = this, {
      params: s,
      el: n,
      wrapperEl: o,
      slides: a
    } = i;
    return typeof i.params > "u" || i.destroyed || (i.emit("beforeDestroy"), i.initialized = !1, i.detachEvents(), s.loop && i.loopDestroy(), r && (i.removeClasses(), n && typeof n != "string" && n.removeAttribute("style"), o && o.removeAttribute("style"), a && a.length && a.forEach((d) => {
      d.classList.remove(s.slideVisibleClass, s.slideFullyVisibleClass, s.slideActiveClass, s.slideNextClass, s.slidePrevClass), d.removeAttribute("style"), d.removeAttribute("data-swiper-slide-index");
    })), i.emit("destroy"), Object.keys(i.eventsListeners).forEach((d) => {
      i.off(d);
    }), e !== !1 && (i.el && typeof i.el != "string" && (i.el.swiper = null), Wt(i)), i.destroyed = !0), null;
  }
  static extendDefaults(e) {
    G(ze, e);
  }
  static get extendedDefaults() {
    return ze;
  }
  static get defaults() {
    return et;
  }
  static installModule(e) {
    V.prototype.__modules__ || (V.prototype.__modules__ = []);
    const r = V.prototype.__modules__;
    typeof e == "function" && r.indexOf(e) < 0 && r.push(e);
  }
  static use(e) {
    return Array.isArray(e) ? (e.forEach((r) => V.installModule(r)), V) : (V.installModule(e), V);
  }
}
Object.keys(Ae).forEach((t) => {
  Object.keys(Ae[t]).forEach((e) => {
    V.prototype[e] = Ae[t][e];
  });
});
V.use([rr, ir]);
function yt(t, e, r, i) {
  return t.params.createElements && Object.keys(i).forEach((s) => {
    if (!r[s] && r.auto === !0) {
      let n = W(t.el, `.${i[s]}`)[0];
      n || (n = ce("div", i[s]), n.className = i[s], t.el.append(n)), r[s] = n, e[s] = n;
    }
  }), r;
}
function li(t) {
  let {
    swiper: e,
    extendParams: r,
    on: i,
    emit: s
  } = t;
  r({
    navigation: {
      nextEl: null,
      prevEl: null,
      hideOnClick: !1,
      disabledClass: "swiper-button-disabled",
      hiddenClass: "swiper-button-hidden",
      lockClass: "swiper-button-lock",
      navigationDisabledClass: "swiper-navigation-disabled"
    }
  }), e.navigation = {
    nextEl: null,
    prevEl: null
  };
  function n(p) {
    let v;
    return p && typeof p == "string" && e.isElement && (v = e.el.querySelector(p) || e.hostEl.querySelector(p), v) ? v : (p && (typeof p == "string" && (v = [...document.querySelectorAll(p)]), e.params.uniqueNavElements && typeof p == "string" && v && v.length > 1 && e.el.querySelectorAll(p).length === 1 ? v = e.el.querySelector(p) : v && v.length === 1 && (v = v[0])), p && !v ? p : v);
  }
  function o(p, v) {
    const T = e.params.navigation;
    p = O(p), p.forEach((y) => {
      y && (y.classList[v ? "add" : "remove"](...T.disabledClass.split(" ")), y.tagName === "BUTTON" && (y.disabled = v), e.params.watchOverflow && e.enabled && y.classList[e.isLocked ? "add" : "remove"](T.lockClass));
    });
  }
  function a() {
    const {
      nextEl: p,
      prevEl: v
    } = e.navigation;
    if (e.params.loop) {
      o(v, !1), o(p, !1);
      return;
    }
    o(v, e.isBeginning && !e.params.rewind), o(p, e.isEnd && !e.params.rewind);
  }
  function d(p) {
    p.preventDefault(), !(e.isBeginning && !e.params.loop && !e.params.rewind) && (e.slidePrev(), s("navigationPrev"));
  }
  function l(p) {
    p.preventDefault(), !(e.isEnd && !e.params.loop && !e.params.rewind) && (e.slideNext(), s("navigationNext"));
  }
  function f() {
    const p = e.params.navigation;
    if (e.params.navigation = yt(e, e.originalParams.navigation, e.params.navigation, {
      nextEl: "swiper-button-next",
      prevEl: "swiper-button-prev"
    }), !(p.nextEl || p.prevEl)) return;
    let v = n(p.nextEl), T = n(p.prevEl);
    Object.assign(e.navigation, {
      nextEl: v,
      prevEl: T
    }), v = O(v), T = O(T);
    const y = (c, m) => {
      c && c.addEventListener("click", m === "next" ? l : d), !e.enabled && c && c.classList.add(...p.lockClass.split(" "));
    };
    v.forEach((c) => y(c, "next")), T.forEach((c) => y(c, "prev"));
  }
  function u() {
    let {
      nextEl: p,
      prevEl: v
    } = e.navigation;
    p = O(p), v = O(v);
    const T = (y, c) => {
      y.removeEventListener("click", c === "next" ? l : d), y.classList.remove(...e.params.navigation.disabledClass.split(" "));
    };
    p.forEach((y) => T(y, "next")), v.forEach((y) => T(y, "prev"));
  }
  i("init", () => {
    e.params.navigation.enabled === !1 ? b() : (f(), a());
  }), i("toEdge fromEdge lock unlock", () => {
    a();
  }), i("destroy", () => {
    u();
  }), i("enable disable", () => {
    let {
      nextEl: p,
      prevEl: v
    } = e.navigation;
    if (p = O(p), v = O(v), e.enabled) {
      a();
      return;
    }
    [...p, ...v].filter((T) => !!T).forEach((T) => T.classList.add(e.params.navigation.lockClass));
  }), i("click", (p, v) => {
    let {
      nextEl: T,
      prevEl: y
    } = e.navigation;
    T = O(T), y = O(y);
    const c = v.target;
    let m = y.includes(c) || T.includes(c);
    if (e.isElement && !m) {
      const w = v.path || v.composedPath && v.composedPath();
      w && (m = w.find((x) => T.includes(x) || y.includes(x)));
    }
    if (e.params.navigation.hideOnClick && !m) {
      if (e.pagination && e.params.pagination && e.params.pagination.clickable && (e.pagination.el === c || e.pagination.el.contains(c))) return;
      let w;
      T.length ? w = T[0].classList.contains(e.params.navigation.hiddenClass) : y.length && (w = y[0].classList.contains(e.params.navigation.hiddenClass)), s(w === !0 ? "navigationShow" : "navigationHide"), [...T, ...y].filter((x) => !!x).forEach((x) => x.classList.toggle(e.params.navigation.hiddenClass));
    }
  });
  const h = () => {
    e.el.classList.remove(...e.params.navigation.navigationDisabledClass.split(" ")), f(), a();
  }, b = () => {
    e.el.classList.add(...e.params.navigation.navigationDisabledClass.split(" ")), u();
  };
  Object.assign(e.navigation, {
    enable: h,
    disable: b,
    update: a,
    init: f,
    destroy: u
  });
}
function K(t) {
  return t === void 0 && (t = ""), `.${t.trim().replace(/([\.:!+\/()[\]])/g, "\\$1").replace(/ /g, ".")}`;
}
function di(t) {
  let {
    swiper: e,
    extendParams: r,
    on: i,
    emit: s
  } = t;
  const n = "swiper-pagination";
  r({
    pagination: {
      el: null,
      bulletElement: "span",
      clickable: !1,
      hideOnClick: !1,
      renderBullet: null,
      renderProgressbar: null,
      renderFraction: null,
      renderCustom: null,
      progressbarOpposite: !1,
      type: "bullets",
      // 'bullets' or 'progressbar' or 'fraction' or 'custom'
      dynamicBullets: !1,
      dynamicMainBullets: 1,
      formatFractionCurrent: (c) => c,
      formatFractionTotal: (c) => c,
      bulletClass: `${n}-bullet`,
      bulletActiveClass: `${n}-bullet-active`,
      modifierClass: `${n}-`,
      currentClass: `${n}-current`,
      totalClass: `${n}-total`,
      hiddenClass: `${n}-hidden`,
      progressbarFillClass: `${n}-progressbar-fill`,
      progressbarOppositeClass: `${n}-progressbar-opposite`,
      clickableClass: `${n}-clickable`,
      lockClass: `${n}-lock`,
      horizontalClass: `${n}-horizontal`,
      verticalClass: `${n}-vertical`,
      paginationDisabledClass: `${n}-disabled`
    }
  }), e.pagination = {
    el: null,
    bullets: []
  };
  let o, a = 0;
  function d() {
    return !e.params.pagination.el || !e.pagination.el || Array.isArray(e.pagination.el) && e.pagination.el.length === 0;
  }
  function l(c, m) {
    const {
      bulletActiveClass: w
    } = e.params.pagination;
    c && (c = c[`${m === "prev" ? "previous" : "next"}ElementSibling`], c && (c.classList.add(`${w}-${m}`), c = c[`${m === "prev" ? "previous" : "next"}ElementSibling`], c && c.classList.add(`${w}-${m}-${m}`)));
  }
  function f(c, m, w) {
    if (c = c % w, m = m % w, m === c + 1)
      return "next";
    if (m === c - 1)
      return "previous";
  }
  function u(c) {
    const m = c.target.closest(K(e.params.pagination.bulletClass));
    if (!m)
      return;
    c.preventDefault();
    const w = fe(m) * e.params.slidesPerGroup;
    if (e.params.loop) {
      if (e.realIndex === w) return;
      const x = f(e.realIndex, w, e.slides.length);
      x === "next" ? e.slideNext() : x === "previous" ? e.slidePrev() : e.slideToLoop(w);
    } else
      e.slideTo(w);
  }
  function h() {
    const c = e.rtl, m = e.params.pagination;
    if (d()) return;
    let w = e.pagination.el;
    w = O(w);
    let x, C;
    const k = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length, P = e.params.loop ? Math.ceil(k / e.params.slidesPerGroup) : e.snapGrid.length;
    if (e.params.loop ? (C = e.previousRealIndex || 0, x = e.params.slidesPerGroup > 1 ? Math.floor(e.realIndex / e.params.slidesPerGroup) : e.realIndex) : typeof e.snapIndex < "u" ? (x = e.snapIndex, C = e.previousSnapIndex) : (C = e.previousIndex || 0, x = e.activeIndex || 0), m.type === "bullets" && e.pagination.bullets && e.pagination.bullets.length > 0) {
      const z = e.pagination.bullets;
      let _, E, L;
      if (m.dynamicBullets && (o = Ve(z[0], e.isHorizontal() ? "width" : "height"), w.forEach((A) => {
        A.style[e.isHorizontal() ? "width" : "height"] = `${o * (m.dynamicMainBullets + 4)}px`;
      }), m.dynamicMainBullets > 1 && C !== void 0 && (a += x - (C || 0), a > m.dynamicMainBullets - 1 ? a = m.dynamicMainBullets - 1 : a < 0 && (a = 0)), _ = Math.max(x - a, 0), E = _ + (Math.min(z.length, m.dynamicMainBullets) - 1), L = (E + _) / 2), z.forEach((A) => {
        const $ = [...["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map((D) => `${m.bulletActiveClass}${D}`)].map((D) => typeof D == "string" && D.includes(" ") ? D.split(" ") : D).flat();
        A.classList.remove(...$);
      }), w.length > 1)
        z.forEach((A) => {
          const $ = fe(A);
          $ === x ? A.classList.add(...m.bulletActiveClass.split(" ")) : e.isElement && A.setAttribute("part", "bullet"), m.dynamicBullets && ($ >= _ && $ <= E && A.classList.add(...`${m.bulletActiveClass}-main`.split(" ")), $ === _ && l(A, "prev"), $ === E && l(A, "next"));
        });
      else {
        const A = z[x];
        if (A && A.classList.add(...m.bulletActiveClass.split(" ")), e.isElement && z.forEach(($, D) => {
          $.setAttribute("part", D === x ? "bullet-active" : "bullet");
        }), m.dynamicBullets) {
          const $ = z[_], D = z[E];
          for (let M = _; M <= E; M += 1)
            z[M] && z[M].classList.add(...`${m.bulletActiveClass}-main`.split(" "));
          l($, "prev"), l(D, "next");
        }
      }
      if (m.dynamicBullets) {
        const A = Math.min(z.length, m.dynamicMainBullets + 4), $ = (o * A - o) / 2 - L * o, D = c ? "right" : "left";
        z.forEach((M) => {
          M.style[e.isHorizontal() ? D : "top"] = `${$}px`;
        });
      }
    }
    w.forEach((z, _) => {
      if (m.type === "fraction" && (z.querySelectorAll(K(m.currentClass)).forEach((E) => {
        E.textContent = m.formatFractionCurrent(x + 1);
      }), z.querySelectorAll(K(m.totalClass)).forEach((E) => {
        E.textContent = m.formatFractionTotal(P);
      })), m.type === "progressbar") {
        let E;
        m.progressbarOpposite ? E = e.isHorizontal() ? "vertical" : "horizontal" : E = e.isHorizontal() ? "horizontal" : "vertical";
        const L = (x + 1) / P;
        let A = 1, $ = 1;
        E === "horizontal" ? A = L : $ = L, z.querySelectorAll(K(m.progressbarFillClass)).forEach((D) => {
          D.style.transform = `translate3d(0,0,0) scaleX(${A}) scaleY(${$})`, D.style.transitionDuration = `${e.params.speed}ms`;
        });
      }
      m.type === "custom" && m.renderCustom ? (Fe(z, m.renderCustom(e, x + 1, P)), _ === 0 && s("paginationRender", z)) : (_ === 0 && s("paginationRender", z), s("paginationUpdate", z)), e.params.watchOverflow && e.enabled && z.classList[e.isLocked ? "add" : "remove"](m.lockClass);
    });
  }
  function b() {
    const c = e.params.pagination;
    if (d()) return;
    const m = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.grid && e.params.grid.rows > 1 ? e.slides.length / Math.ceil(e.params.grid.rows) : e.slides.length;
    let w = e.pagination.el;
    w = O(w);
    let x = "";
    if (c.type === "bullets") {
      let C = e.params.loop ? Math.ceil(m / e.params.slidesPerGroup) : e.snapGrid.length;
      e.params.freeMode && e.params.freeMode.enabled && C > m && (C = m);
      for (let k = 0; k < C; k += 1)
        c.renderBullet ? x += c.renderBullet.call(e, k, c.bulletClass) : x += `<${c.bulletElement} ${e.isElement ? 'part="bullet"' : ""} class="${c.bulletClass}"></${c.bulletElement}>`;
    }
    c.type === "fraction" && (c.renderFraction ? x = c.renderFraction.call(e, c.currentClass, c.totalClass) : x = `<span class="${c.currentClass}"></span> / <span class="${c.totalClass}"></span>`), c.type === "progressbar" && (c.renderProgressbar ? x = c.renderProgressbar.call(e, c.progressbarFillClass) : x = `<span class="${c.progressbarFillClass}"></span>`), e.pagination.bullets = [], w.forEach((C) => {
      c.type !== "custom" && Fe(C, x || ""), c.type === "bullets" && e.pagination.bullets.push(...C.querySelectorAll(K(c.bulletClass)));
    }), c.type !== "custom" && s("paginationRender", w[0]);
  }
  function p() {
    e.params.pagination = yt(e, e.originalParams.pagination, e.params.pagination, {
      el: "swiper-pagination"
    });
    const c = e.params.pagination;
    if (!c.el) return;
    let m;
    typeof c.el == "string" && e.isElement && (m = e.el.querySelector(c.el)), !m && typeof c.el == "string" && (m = [...document.querySelectorAll(c.el)]), m || (m = c.el), !(!m || m.length === 0) && (e.params.uniqueNavElements && typeof c.el == "string" && Array.isArray(m) && m.length > 1 && (m = [...e.el.querySelectorAll(c.el)], m.length > 1 && (m = m.find((w) => mt(w, ".swiper")[0] === e.el))), Array.isArray(m) && m.length === 1 && (m = m[0]), Object.assign(e.pagination, {
      el: m
    }), m = O(m), m.forEach((w) => {
      c.type === "bullets" && c.clickable && w.classList.add(...(c.clickableClass || "").split(" ")), w.classList.add(c.modifierClass + c.type), w.classList.add(e.isHorizontal() ? c.horizontalClass : c.verticalClass), c.type === "bullets" && c.dynamicBullets && (w.classList.add(`${c.modifierClass}${c.type}-dynamic`), a = 0, c.dynamicMainBullets < 1 && (c.dynamicMainBullets = 1)), c.type === "progressbar" && c.progressbarOpposite && w.classList.add(c.progressbarOppositeClass), c.clickable && w.addEventListener("click", u), e.enabled || w.classList.add(c.lockClass);
    }));
  }
  function v() {
    const c = e.params.pagination;
    if (d()) return;
    let m = e.pagination.el;
    m && (m = O(m), m.forEach((w) => {
      w.classList.remove(c.hiddenClass), w.classList.remove(c.modifierClass + c.type), w.classList.remove(e.isHorizontal() ? c.horizontalClass : c.verticalClass), c.clickable && (w.classList.remove(...(c.clickableClass || "").split(" ")), w.removeEventListener("click", u));
    })), e.pagination.bullets && e.pagination.bullets.forEach((w) => w.classList.remove(...c.bulletActiveClass.split(" ")));
  }
  i("changeDirection", () => {
    if (!e.pagination || !e.pagination.el) return;
    const c = e.params.pagination;
    let {
      el: m
    } = e.pagination;
    m = O(m), m.forEach((w) => {
      w.classList.remove(c.horizontalClass, c.verticalClass), w.classList.add(e.isHorizontal() ? c.horizontalClass : c.verticalClass);
    });
  }), i("init", () => {
    e.params.pagination.enabled === !1 ? y() : (p(), b(), h());
  }), i("activeIndexChange", () => {
    typeof e.snapIndex > "u" && h();
  }), i("snapIndexChange", () => {
    h();
  }), i("snapGridLengthChange", () => {
    b(), h();
  }), i("destroy", () => {
    v();
  }), i("enable disable", () => {
    let {
      el: c
    } = e.pagination;
    c && (c = O(c), c.forEach((m) => m.classList[e.enabled ? "remove" : "add"](e.params.pagination.lockClass)));
  }), i("lock unlock", () => {
    h();
  }), i("click", (c, m) => {
    const w = m.target, x = O(e.pagination.el);
    if (e.params.pagination.el && e.params.pagination.hideOnClick && x && x.length > 0 && !w.classList.contains(e.params.pagination.bulletClass)) {
      if (e.navigation && (e.navigation.nextEl && w === e.navigation.nextEl || e.navigation.prevEl && w === e.navigation.prevEl)) return;
      const C = x[0].classList.contains(e.params.pagination.hiddenClass);
      s(C === !0 ? "paginationShow" : "paginationHide"), x.forEach((k) => k.classList.toggle(e.params.pagination.hiddenClass));
    }
  });
  const T = () => {
    e.el.classList.remove(e.params.pagination.paginationDisabledClass);
    let {
      el: c
    } = e.pagination;
    c && (c = O(c), c.forEach((m) => m.classList.remove(e.params.pagination.paginationDisabledClass))), p(), b(), h();
  }, y = () => {
    e.el.classList.add(e.params.pagination.paginationDisabledClass);
    let {
      el: c
    } = e.pagination;
    c && (c = O(c), c.forEach((m) => m.classList.add(e.params.pagination.paginationDisabledClass))), v();
  };
  Object.assign(e.pagination, {
    enable: T,
    disable: y,
    render: b,
    update: h,
    init: p,
    destroy: v
  });
}
function ci(t) {
  let {
    swiper: e,
    extendParams: r,
    on: i
  } = t;
  r({
    a11y: {
      enabled: !0,
      notificationClass: "swiper-notification",
      prevSlideMessage: "Previous slide",
      nextSlideMessage: "Next slide",
      firstSlideMessage: "This is the first slide",
      lastSlideMessage: "This is the last slide",
      paginationBulletMessage: "Go to slide {{index}}",
      slideLabelMessage: "{{index}} / {{slidesLength}}",
      containerMessage: null,
      containerRoleDescriptionMessage: null,
      containerRole: null,
      itemRoleDescriptionMessage: null,
      slideRole: "group",
      id: null,
      scrollOnFocus: !0
    }
  }), e.a11y = {
    clicked: !1
  };
  let s = null, n, o, a = (/* @__PURE__ */ new Date()).getTime();
  function d(g) {
    const S = s;
    S.length !== 0 && Fe(S, g);
  }
  function l(g) {
    const S = () => Math.round(16 * Math.random()).toString(16);
    return "x".repeat(g).replace(/x/g, S);
  }
  function f(g) {
    g = O(g), g.forEach((S) => {
      S.setAttribute("tabIndex", "0");
    });
  }
  function u(g) {
    g = O(g), g.forEach((S) => {
      S.setAttribute("tabIndex", "-1");
    });
  }
  function h(g, S) {
    g = O(g), g.forEach((I) => {
      I.setAttribute("role", S);
    });
  }
  function b(g, S) {
    g = O(g), g.forEach((I) => {
      I.setAttribute("aria-roledescription", S);
    });
  }
  function p(g, S) {
    g = O(g), g.forEach((I) => {
      I.setAttribute("aria-controls", S);
    });
  }
  function v(g, S) {
    g = O(g), g.forEach((I) => {
      I.setAttribute("aria-label", S);
    });
  }
  function T(g, S) {
    g = O(g), g.forEach((I) => {
      I.setAttribute("id", S);
    });
  }
  function y(g, S) {
    g = O(g), g.forEach((I) => {
      I.setAttribute("aria-live", S);
    });
  }
  function c(g) {
    g = O(g), g.forEach((S) => {
      S.setAttribute("aria-disabled", !0);
    });
  }
  function m(g) {
    g = O(g), g.forEach((S) => {
      S.setAttribute("aria-disabled", !1);
    });
  }
  function w(g) {
    if (g.keyCode !== 13 && g.keyCode !== 32) return;
    const S = e.params.a11y, I = g.target;
    if (!(e.pagination && e.pagination.el && (I === e.pagination.el || e.pagination.el.contains(g.target)) && !g.target.matches(K(e.params.pagination.bulletClass)))) {
      if (e.navigation && e.navigation.prevEl && e.navigation.nextEl) {
        const B = O(e.navigation.prevEl);
        O(e.navigation.nextEl).includes(I) && (e.isEnd && !e.params.loop || e.slideNext(), e.isEnd ? d(S.lastSlideMessage) : d(S.nextSlideMessage)), B.includes(I) && (e.isBeginning && !e.params.loop || e.slidePrev(), e.isBeginning ? d(S.firstSlideMessage) : d(S.prevSlideMessage));
      }
      e.pagination && I.matches(K(e.params.pagination.bulletClass)) && I.click();
    }
  }
  function x() {
    if (e.params.loop || e.params.rewind || !e.navigation) return;
    const {
      nextEl: g,
      prevEl: S
    } = e.navigation;
    S && (e.isBeginning ? (c(S), u(S)) : (m(S), f(S))), g && (e.isEnd ? (c(g), u(g)) : (m(g), f(g)));
  }
  function C() {
    return e.pagination && e.pagination.bullets && e.pagination.bullets.length;
  }
  function k() {
    return C() && e.params.pagination.clickable;
  }
  function P() {
    const g = e.params.a11y;
    C() && e.pagination.bullets.forEach((S) => {
      e.params.pagination.clickable && (f(S), e.params.pagination.renderBullet || (h(S, "button"), v(S, g.paginationBulletMessage.replace(/\{\{index\}\}/, fe(S) + 1)))), S.matches(K(e.params.pagination.bulletActiveClass)) ? S.setAttribute("aria-current", "true") : S.removeAttribute("aria-current");
    });
  }
  const z = (g, S, I) => {
    f(g), g.tagName !== "BUTTON" && (h(g, "button"), g.addEventListener("keydown", w)), v(g, I), p(g, S);
  }, _ = (g) => {
    o && o !== g.target && !o.contains(g.target) && (n = !0), e.a11y.clicked = !0;
  }, E = () => {
    n = !1, requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        e.destroyed || (e.a11y.clicked = !1);
      });
    });
  }, L = (g) => {
    a = (/* @__PURE__ */ new Date()).getTime();
  }, A = (g) => {
    if (e.a11y.clicked || !e.params.a11y.scrollOnFocus || (/* @__PURE__ */ new Date()).getTime() - a < 100) return;
    const S = g.target.closest(`.${e.params.slideClass}, swiper-slide`);
    if (!S || !e.slides.includes(S)) return;
    o = S;
    const I = e.slides.indexOf(S) === e.activeIndex, B = e.params.watchSlidesProgress && e.visibleSlides && e.visibleSlides.includes(S);
    I || B || g.sourceCapabilities && g.sourceCapabilities.firesTouchEvents || (e.isHorizontal() ? e.el.scrollLeft = 0 : e.el.scrollTop = 0, requestAnimationFrame(() => {
      n || (e.params.loop ? e.slideToLoop(e.getSlideIndexWhenGrid(parseInt(S.getAttribute("data-swiper-slide-index"))), 0) : e.slideTo(e.getSlideIndexWhenGrid(e.slides.indexOf(S)), 0), n = !1);
    }));
  }, $ = () => {
    const g = e.params.a11y;
    g.itemRoleDescriptionMessage && b(e.slides, g.itemRoleDescriptionMessage), g.slideRole && h(e.slides, g.slideRole);
    const S = e.slides.length;
    g.slideLabelMessage && e.slides.forEach((I, B) => {
      const X = e.params.loop ? parseInt(I.getAttribute("data-swiper-slide-index"), 10) : B, U = g.slideLabelMessage.replace(/\{\{index\}\}/, X + 1).replace(/\{\{slidesLength\}\}/, S);
      v(I, U);
    });
  }, D = () => {
    const g = e.params.a11y;
    e.el.append(s);
    const S = e.el;
    g.containerRoleDescriptionMessage && b(S, g.containerRoleDescriptionMessage), g.containerMessage && v(S, g.containerMessage), g.containerRole && h(S, g.containerRole);
    const I = e.wrapperEl, B = g.id || I.getAttribute("id") || `swiper-wrapper-${l(16)}`, X = e.params.autoplay && e.params.autoplay.enabled ? "off" : "polite";
    T(I, B), y(I, X), $();
    let {
      nextEl: U,
      prevEl: pe
    } = e.navigation ? e.navigation : {};
    U = O(U), pe = O(pe), U && U.forEach((me) => z(me, B, g.nextSlideMessage)), pe && pe.forEach((me) => z(me, B, g.prevSlideMessage)), k() && O(e.pagination.el).forEach((St) => {
      St.addEventListener("keydown", w);
    }), Y().addEventListener("visibilitychange", L), e.el.addEventListener("focus", A, !0), e.el.addEventListener("focus", A, !0), e.el.addEventListener("pointerdown", _, !0), e.el.addEventListener("pointerup", E, !0);
  };
  function M() {
    s && s.remove();
    let {
      nextEl: g,
      prevEl: S
    } = e.navigation ? e.navigation : {};
    g = O(g), S = O(S), g && g.forEach((B) => B.removeEventListener("keydown", w)), S && S.forEach((B) => B.removeEventListener("keydown", w)), k() && O(e.pagination.el).forEach((X) => {
      X.removeEventListener("keydown", w);
    }), Y().removeEventListener("visibilitychange", L), e.el && typeof e.el != "string" && (e.el.removeEventListener("focus", A, !0), e.el.removeEventListener("pointerdown", _, !0), e.el.removeEventListener("pointerup", E, !0));
  }
  i("beforeInit", () => {
    s = ce("span", e.params.a11y.notificationClass), s.setAttribute("aria-live", "assertive"), s.setAttribute("aria-atomic", "true");
  }), i("afterInit", () => {
    e.params.a11y.enabled && D();
  }), i("slidesLengthChange snapGridLengthChange slidesGridLengthChange", () => {
    e.params.a11y.enabled && $();
  }), i("fromEdge toEdge afterInit lock unlock", () => {
    e.params.a11y.enabled && x();
  }), i("paginationUpdate", () => {
    e.params.a11y.enabled && P();
  }), i("destroy", () => {
    e.params.a11y.enabled && M();
  });
}
const ae = "dir";
function fi(t, e) {
  var i, s;
  return typeof e == "boolean" ? e : (((i = t.closest(`[${ae}]`)) == null ? void 0 : i.getAttribute(ae)) || document.documentElement.getAttribute(ae) || ((s = document.body) == null ? void 0 : s.getAttribute(ae)) || "").toLowerCase() === "rtl";
}
function ui(t, e = {}) {
  const { rtl: r, modules: i, ...s } = e, n = fi(t, r);
  t.setAttribute(ae, n ? "rtl" : "ltr");
  const o = t.swiper;
  return o && !o.destroyed && o.destroy(!0, !0), new V(t, {
    modules: [li, di, ci, ...i || []],
    slidesPerView: 4.2,
    spaceBetween: 16,
    speed: 420,
    watchOverflow: !0,
    grabCursor: !0,
    allowTouchMove: !0,
    simulateTouch: !0,
    threshold: 8,
    touchStartPreventDefault: !1,
    preventClicks: !1,
    preventClicksPropagation: !1,
    observer: !0,
    observeParents: !0,
    a11y: { enabled: !0 },
    ...s,
    // Keep last so callers cannot accidentally drop RTL
    ...n ? { rtl: !0 } : {}
  });
}
function tt(t) {
  t && !t.destroyed && t.destroy(!0, !0);
}
const rt = "data-tw-raed-product-styles", pi = `
  .s-slider-block__title {
    display: none !important;
  }

  .swiper,
  .s-slider-container {
    position: relative;
    display: block;
    overflow: hidden;
    width: 100%;
    padding: 0.35rem 0.2rem 1.1rem;
    box-sizing: border-box;
  }

  .swiper-wrapper {
    display: flex !important;
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: content-box;
    align-items: stretch;
    transition-property: transform;
  }

  .swiper-slide,
  .s-products-slider-card {
    flex-shrink: 0;
    height: auto !important;
    /* Let Swiper set width via slidesPerView — forced widths break drag */
    box-sizing: border-box;
  }

  salla-product-card,
  custom-salla-product-card,
  .s-product-card-entry {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    overflow: hidden;
    text-align: start;
    color: #1f2937;
    background: #fff;
    border: 0;
    border-radius: 15px;
    box-shadow: none;
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);
    box-sizing: border-box;
  }

  .s-product-card-vertical {
    flex-direction: column;
  }

  :host(.tw-raed-shadow) .s-product-card-entry:hover,
  :host(.tw-raed-shadow) .s-product-card-shadow:hover,
  .s-product-card-shadow:hover {
    box-shadow: 5px 10px 30px rgba(43, 45, 52, 0.051);
  }

  :host(.tw-raed-hide-add) .s-product-card-content-footer,
  :host(.tw-raed-hide-add) .s-add-product-button,
  :host(.tw-raed-hide-add) salla-add-product-button {
    display: none !important;
  }

  .s-product-card-image {
    position: relative;
    display: block;
    flex: 1 1 0%;
    overflow: hidden;
    width: 100%;
    min-height: 11rem;
    max-height: 15rem;
    aspect-ratio: 1 / 1;
    background: #f3f4f6;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }

  /* Salla injects a sallaicons placeholder via ::before — hide it */
  .s-product-card-image::before,
  .s-product-card-image a::before,
  .s-product-card-image .salla-file-pond::before,
  .s-product-card-image [class*='placeholder']::before {
    content: none !important;
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    width: 0 !important;
    height: 0 !important;
    font-size: 0 !important;
    background: none !important;
    pointer-events: none !important;
  }

  .s-product-card-image:hover {
    opacity: 1;
  }

  .s-product-card-image:hover img {
    transform: scale(1.03);
  }

  .s-product-card-image a {
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
  }

  .s-product-card-image img,
  .s-product-card-image-cover,
  .s-product-card-image-contain {
    display: block;
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    transition: transform 400ms cubic-bezier(0.4, 0, 0.2, 1),
      opacity 500ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .s-product-card-image-contain {
    object-fit: contain;
  }

  .s-product-card-wishlist-btn {
    position: absolute;
    top: 0.5rem;
    inset-inline-end: 0.5rem;
    z-index: 2;
    opacity: 0.75;
  }

  .s-product-card-wishlist-btn:hover {
    opacity: 1;
  }

  .s-product-card-wishlist-btn button,
  .s-product-card-wishlist-btn .s-button-element {
    display: inline-flex !important;
    align-items: center;
    justify-content: center;
    width: 2.35rem;
    height: 2.35rem;
    margin: 0 !important;
    padding: 0 !important;
    border: 1px solid rgba(31, 41, 55, 0.08) !important;
    border-radius: 999px !important;
    background: rgba(255, 255, 255, 0.95) !important;
    box-shadow: 0 4px 14px rgba(43, 45, 52, 0.08);
    cursor: pointer;
    transition: transform 200ms ease, box-shadow 200ms ease;
  }

  .s-product-card-wishlist-btn button:hover,
  .s-product-card-wishlist-btn .s-button-element:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 18px rgba(43, 45, 52, 0.12);
  }

  .s-product-card-wishlist-btn svg {
    width: 1rem;
    height: 1rem;
    fill: #6b7280;
  }

  .s-product-card-wishlist-btn button:hover svg {
    fill: #4b5563;
  }

  .s-product-card-wishlist-added svg,
  .s-product-card-wishlist-added i {
    fill: #ef4444;
    color: #ef4444;
  }

  .s-product-card-promotion-title {
    position: absolute;
    top: 1rem;
    left: 0;
    z-index: 2;
    max-width: calc(100% - 60px);
    padding: 0.375rem 0.625rem;
    border-radius: 0 15px 15px 0;
    background: #991b1b;
    color: #fff;
    font-size: 0.75rem;
    font-weight: 700;
    line-height: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  [dir='rtl'] .s-product-card-promotion-title,
  :host([dir='rtl']) .s-product-card-promotion-title {
    right: 0;
    left: auto;
    border-radius: 15px 0 0 15px;
  }

  .s-product-card-quantity {
    position: absolute;
    bottom: 0.25rem;
    left: 50%;
    z-index: 2;
    max-width: calc(100% - 60px);
    transform: translateX(-50%);
    padding: 0.375rem 0.625rem;
    border-radius: 15px;
    background: #f87171;
    color: #fff;
    font-size: 0.75rem;
    font-weight: 700;
    line-height: 1rem;
  }

  .s-product-card-out-badge {
    position: absolute;
    bottom: 0.5rem;
    left: 50%;
    z-index: 2;
    max-width: calc(100% - 60px);
    transform: translateX(-50%);
    padding: 0.375rem 0.625rem;
    border-radius: 0.375rem;
    background: #f3f4f6;
    color: #999;
    font-size: 0.75rem;
    font-weight: 700;
    line-height: 1rem;
  }

  .s-product-card-out-of-stock img {
    filter: grayscale(100%);
  }

  .s-product-card-content {
    position: relative;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    padding: 0.75rem;
    min-width: 0;
    box-sizing: border-box;
  }

  @media (min-width: 640px) {
    .s-product-card-content {
      padding: 1.25rem;
    }
  }

  .s-product-card-content-title {
    margin: 0 0 0.625rem;
    max-width: 100%;
    line-height: 1.5rem;
    word-break: break-word;
  }

  .s-product-card-content-title a {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    color: #1f2937;
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 1.25rem;
    text-decoration: none;
  }

  .s-product-card-content-title a:hover {
    color: var(--color-primary, var(--accent-color, #21636d));
  }

  .s-product-card-content-subtitle {
    margin: 0 0 0.625rem;
    color: #4b5563;
    font-size: 0.875rem;
    line-height: 1.5rem;
  }

  .s-product-card-content-sub {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: flex-start;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
  }

  .s-product-card-content-footer {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: stretch;
    gap: 0.65rem;
    margin-top: auto;
  }

  .s-product-card-price {
    margin: 0;
    color: #1f2937;
    font-size: 0.9375rem;
    font-weight: 700;
    line-height: 1.25rem;
  }

  .s-product-card-sale-price {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.25rem;
  }

  .s-product-card-sale-price h4 {
    margin: 0;
    display: inline-block;
    color: #991b1b !important;
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 1.25rem;
  }

  .s-product-card-sale-price span {
    color: #9ca3af;
    font-size: 0.875rem;
    line-height: 1.25rem;
    text-decoration: line-through;
  }

  .s-product-card-starting-price {
    display: flex;
    width: auto;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    gap: 0.625rem;
  }

  .s-product-card-starting-price h4 {
    margin: 0;
    display: inline-block;
    color: #991b1b;
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 1.25rem;
  }

  .s-product-card-starting-price p {
    margin: 0;
    color: #6b7280;
    font-size: 0.75rem;
  }

  .s-product-card-rating {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    color: #9ca3af;
    font-size: 0.875rem;
  }

  .s-product-card-rating span svg {
    width: 1rem;
    height: 1rem;
    margin-bottom: 3px;
    fill: #fbbf24;
  }

  .s-add-product-button,
  .s-add-product-button-main,
  .s-product-card-content-footer salla-add-product-button {
    display: block;
    width: 100%;
    margin: 0;
  }

  .s-add-product-button .s-button-element,
  .s-add-product-button-main .s-button-element,
  .s-product-card-content-footer salla-add-product-button .s-button-element {
    display: block !important;
    width: 100% !important;
  }

  .s-add-product-button .s-button-btn,
  .s-add-product-button-main .s-button-btn,
  .s-product-card-content-footer .s-button-btn {
    display: inline-flex !important;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    width: 100%;
    min-height: 2.55rem;
    padding: 0.55rem 1.1rem;
    border-radius: 999px;
    border: 1px solid var(--color-primary, var(--accent-color, #21636d));
    background: var(--color-primary, var(--accent-color, #21636d));
    color: var(--color-primary-reverse, #fff);
    font-size: 0.8125rem;
    font-weight: 700;
    letter-spacing: 0.01em;
    white-space: nowrap;
    box-shadow: 0 8px 18px color-mix(in srgb, var(--color-primary, #21636d) 22%, transparent);
    transition: transform 180ms ease, opacity 180ms ease, box-shadow 180ms ease;
    cursor: pointer;
  }

  .s-add-product-button .s-button-btn:hover,
  .s-add-product-button-main .s-button-btn:hover,
  .s-product-card-content-footer .s-button-btn:hover {
    opacity: 0.92;
    transform: translateY(-1px);
    box-shadow: 0 10px 22px color-mix(in srgb, var(--color-primary, #21636d) 28%, transparent);
  }

  .s-add-product-button .s-button-text,
  .s-add-product-button-main .s-button-text,
  .s-product-card-content-footer .s-button-text {
    color: inherit !important;
    font-weight: inherit;
  }

  salla-add-product-button[product-status='out-and-notify'] .s-button-btn,
  salla-add-product-button[product-status='out'] .s-button-btn {
    background: #e5e7eb !important;
    border-color: #d1d5db !important;
    color: #374151 !important;
    box-shadow: none;
  }

  /* Theme Raed product.scss */
  .s-product-card-content-title {
    word-break: break-word;
  }

  .s-product-card-image img {
    opacity: 1;
  }

  .s-product-card-wishlist-added i {
    color: #ef4444;
  }

  .s-product-card-promotion-title {
    background: #991b1b !important;
    color: #fff !important;
  }

  .s-product-card-sale-price h4 {
    color: #991b1b !important;
  }

  .s-product-card-starting-price h4 {
    color: #991b1b !important;
  }

  .s-product-card-full-image salla-add-product-button {
    background: #fff;
    border-radius: 0.25rem;
  }

  .s-rating-stars-reviews {
    color: #6b7280;
  }

  .s-product-card-content-pie-svg-base {
    transition: stroke-dashoffset 1s linear;
    stroke: #e8edf2;
    stroke-width: 2px;
    stroke-linecap: round;
    fill: none;
  }

  .s-product-card-content-pie-svg-bar {
    fill: none;
    stroke: var(--color-primary, #21636d);
    stroke-dasharray: 100 100;
    stroke-dashoffset: 100;
  }

  .cart-options,
  .product-options {
    background: #fff;
    border: 1px dashed #9ca3af;
    border-radius: 0.375rem;
  }

  .cart-options salla-product-options,
  .product-options salla-product-options {
    display: block;
    margin-bottom: 0;
    padding-top: 0;
  }

  .s-product-options-colors-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .s-product-options-colors-item {
    margin: 0 !important;
    width: auto;
  }

  salla-add-product-button[product-status='out-and-notify'] .s-button-primary,
  .s-product-availability-wrap .s-button-primary {
    background: #e5e7eb !important;
    color: #1f2937 !important;
    border-color: #d1d5db !important;
  }

  @media (prefers-reduced-motion: reduce) {
    .s-product-card-entry,
    .s-product-card-image img {
      transition: none;
    }
  }
`.trim(), Ie = /* @__PURE__ */ new Set([
  "SALLA-PRODUCTS-SLIDER",
  "SALLA-PRODUCTS-LIST",
  "SALLA-PRODUCTS-GRID"
]);
function mi(t) {
  return pi;
}
function Ee(t, e) {
  const r = mi(), i = (t instanceof ShadowRoot || t instanceof Document, t);
  let s = i instanceof ShadowRoot || i instanceof Document ? i.querySelector(`style[${rt}]`) : null;
  s || (s = document.createElement("style"), s.setAttribute(rt, "1"), i instanceof ShadowRoot ? i.appendChild(s) : i instanceof Document ? i.head.appendChild(s) : i.appendChild(s)), s.textContent !== r && (s.textContent = r), t instanceof ShadowRoot && (t.host.classList.toggle("tw-raed-shadow", e.shadow), t.host.classList.toggle("tw-raed-hide-add", e.hideAdd));
}
function hi(t) {
  return t ? {
    shadow: t.classList.contains("fs-commerce__slider--shadow"),
    hideAdd: t.getAttribute("data-hide-add") === "1"
  } : { shadow: !0, hideAdd: !1 };
}
const gi = /* @__PURE__ */ new Set([
  "SALLA-PRODUCT-CARD",
  "CUSTOM-SALLA-PRODUCT-CARD"
]);
function Oe(t, e) {
  const r = () => {
    t.shadowRoot && (Ee(t.shadowRoot, e), t.shadowRoot.querySelectorAll("*").forEach((i) => {
      i instanceof HTMLElement && gi.has(i.tagName) && i.shadowRoot && Ee(i.shadowRoot, e);
    }));
  };
  r(), [0, 50, 150, 400, 1e3, 2e3].forEach((i) => window.setTimeout(r, i)), t.shadowRoot && !t.__twRaedObserved && (t.__twRaedObserved = !0, new MutationObserver(() => r()).observe(t.shadowRoot, { childList: !0, subtree: !0 }));
}
function de(t, e) {
  var r;
  !(t instanceof HTMLElement) && !(t instanceof ShadowRoot) || (t instanceof HTMLElement ? (Ie.has(t.tagName) && Oe(t, e), t.shadowRoot && de(t.shadowRoot, e), (r = t.querySelectorAll) == null || r.call(t, "*").forEach((i) => {
    i instanceof HTMLElement && Ie.has(i.tagName) && Oe(i, e), i instanceof HTMLElement && i.shadowRoot && de(i.shadowRoot, e);
  })) : t.querySelectorAll("*").forEach((i) => {
    i instanceof HTMLElement && Ie.has(i.tagName) && Oe(i, e), i instanceof HTMLElement && i.shadowRoot && de(i.shadowRoot, e);
  }));
}
function $e(t) {
  var s, n;
  if (!t || typeof document > "u") return;
  const e = t instanceof HTMLElement && t.classList.contains("fs-commerce__slider") ? t : t instanceof HTMLElement ? t.closest(".fs-commerce__slider") : null, r = hi(
    e instanceof HTMLElement ? e : t instanceof HTMLElement ? t : null
  ), i = ((s = t.getRootNode) == null ? void 0 : s.call(t)) ?? null;
  i instanceof ShadowRoot && (Ee(i, r), de(i, r)), de(t, r), t instanceof HTMLElement && ((n = t.querySelectorAll) == null || n.call(t, "salla-product-card, custom-salla-product-card").forEach((o) => {
    o instanceof HTMLElement && o.shadowRoot && Ee(o.shadowRoot, r);
  }));
}
var bi = Object.defineProperty, j = (t, e, r, i) => {
  for (var s = void 0, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (s = o(e, r, s) || s);
  return s && bi(e, r, s), s;
};
const it = "fs-products-swiper";
async function st(t, e, r) {
  var n;
  const i = It(t, e, r);
  return i ? (await re(), (n = te()) != null && n.product || (await new Promise((o) => setTimeout(o, 300)), await re()), (await at(i)).slice(0, Math.max(1, Math.min(40, Number(r) || 8)))) : [];
}
function xt(t) {
  return !!(Array.isArray(t.options) && t.options.length || Number(t.options_count) > 0 || t.has_options || t.has_product_options);
}
function nt() {
  return typeof customElements < "u" && customElements.get("custom-salla-product-card") ? "custom-salla-product-card" : "salla-product-card";
}
async function vi(t) {
  var n, o, a;
  const e = /* @__PURE__ */ new Map(), r = [];
  for (const d of t) {
    const l = d.id;
    if (l == null) continue;
    const f = String(l);
    if (Array.isArray(d.options) && d.options.length) {
      e.set(f, d.options);
      continue;
    }
    (xt(d) || !("options" in d)) && r.push(l);
  }
  if (!r.length) return e;
  const i = te(), s = (a = (o = (n = i == null ? void 0 : i.product) == null ? void 0 : n.api) == null ? void 0 : o.fetchOptions) == null ? void 0 : a.bind(i.product.api);
  if (typeof s != "function") return e;
  try {
    const d = await s(r), l = Array.isArray(d == null ? void 0 : d.data) ? d.data : [];
    for (const f of l) {
      if ((f == null ? void 0 : f.id) == null) continue;
      const u = Array.isArray(f.options) ? f.options : [];
      e.set(String(f.id), u);
    }
  } catch {
  }
  return e;
}
const wi = ot`
  :host {
    display: block;
    width: 100%;
    min-width: 0;
    max-width: 100%;
  }

  .fs-ps {
    position: relative;
    width: 100%;
    min-width: 0;
    max-width: 100%;
  }

  .fs-ps__status {
    margin: 0;
    text-align: center;
    color: var(--muted-color, #7a6a62);
    font-size: 0.9rem;
    line-height: 1.5;
    padding: 0.75rem 0.25rem;
  }

  /*
   * Swiper base CSS must live in the Lit shadow root.
   * Do NOT force slide widths with !important — that breaks drag/translate math.
   */
  .fs-ps .swiper {
    position: relative;
    display: block;
    width: 100%;
    margin: 0;
    padding: 0.35rem 2.4rem 1.25rem;
    overflow: hidden;
    list-style: none;
    z-index: 1;
    box-sizing: border-box;
    touch-action: pan-y;
  }

  .fs-ps .swiper-wrapper {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    z-index: 1;
    box-sizing: content-box;
    align-items: stretch;
    transition-property: transform;
    transition-timing-function: ease;
  }

  .fs-ps .swiper-slide {
    position: relative;
    display: block;
    flex-shrink: 0;
    height: auto;
    width: auto;
    box-sizing: border-box;
    transition-property: transform;
  }

  .fs-ps__item {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    min-width: 0;
  }

  .fs-ps salla-product-card,
  .fs-ps custom-salla-product-card {
    display: block;
    width: 100%;
    flex: 1 1 auto;
    pointer-events: auto;
  }

  /* Theme Raed .cart-options / product options on card */
  .fs-ps__options.cart-options {
    margin-top: 0.65rem;
    padding: 0.75rem 0.85rem;
    background: #fff;
    border: 1px dashed #9ca3af;
    border-radius: 0.375rem;
    box-sizing: border-box;
  }

  .fs-ps__options salla-product-options {
    display: block;
    margin: 0;
    padding: 0;
  }

  .fs-ps__options .s-product-options-option:not(.s-product-options-option-booking) {
    display: block !important;
  }

  .fs-ps__options .s-product-options-label {
    margin-bottom: 0.75rem;
  }

  .fs-ps__options .s-form-control,
  .fs-ps__options .s-datetime-picker-input {
    border-radius: 0.375rem;
    border-color: #e5e7eb;
  }

  .fs-ps__options .s-product-options-multiple-options-wrapper {
    display: block !important;
  }

  .fs-ps__options .s-product-options-colors-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .fs-ps__options .s-product-options-colors-item {
    margin: 0;
    width: auto;
  }

  .fs-ps__nav {
    position: absolute;
    top: 42%;
    z-index: 20;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.35rem;
    height: 2.35rem;
    border: 1px solid #e5e7eb;
    border-radius: 999px;
    background: #fff;
    color: #1f2937;
    box-shadow: 5px 10px 30px rgba(43, 45, 52, 0.051);
    cursor: pointer;
    pointer-events: auto;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
  }

  .fs-ps__nav--prev {
    inset-inline-start: 0;
  }

  .fs-ps__nav--next {
    inset-inline-end: 0;
  }

  .fs-ps__nav.swiper-button-disabled {
    opacity: 0.35;
    cursor: default;
  }

  .fs-ps__nav:not(.swiper-button-disabled):hover {
    border-color: var(--color-primary, #21636d);
    color: var(--color-primary, #21636d);
  }

  .fs-ps[data-hide-add='1'] .s-product-card-content-footer,
  .fs-ps[data-hide-add='1'] .s-add-product-button,
  .fs-ps[data-hide-add='1'] salla-add-product-button {
    display: none !important;
  }
`, We = class We extends Tt {
  constructor() {
    super(...arguments), this.source = "latest", this.sourceValue = "[]", this.limit = 8, this.slidesPerView = 4.2, this.shadow = !0, this.hideAdd = !1, this.showOptions = !1, this.products = [], this.optionsById = /* @__PURE__ */ new Map(), this.loading = !0, this.error = "", this.cardTag = "salla-product-card", this.fetchToken = 0, this.mountedKey = "", this.updateTimers = [], this.bindRoot = (e) => {
      e instanceof HTMLElement && (this.swiperEl = e, $e(e), this.mountSwiper(), this.mountOptionsWidgets());
    }, this.slidePrev = (e) => {
      var r, i;
      (r = e == null ? void 0 : e.preventDefault) == null || r.call(e), (i = e == null ? void 0 : e.stopPropagation) == null || i.call(e), !(!this.swiper || this.swiper.destroyed) && this.swiper.slidePrev();
    }, this.slideNext = (e) => {
      var r, i;
      (r = e == null ? void 0 : e.preventDefault) == null || r.call(e), (i = e == null ? void 0 : e.stopPropagation) == null || i.call(e), !(!this.swiper || this.swiper.destroyed) && this.swiper.slideNext();
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.cardTag = nt(), this.loadProducts();
  }
  disconnectedCallback() {
    this.clearUpdateTimers(), tt(this.swiper), this.swiper = void 0, this.mountedKey = "", super.disconnectedCallback();
  }
  clearUpdateTimers() {
    this.updateTimers.forEach((e) => window.clearTimeout(e)), this.updateTimers = [];
  }
  updated(e) {
    if (e.has("source") || e.has("sourceValue") || e.has("limit") || e.has("showOptions")) {
      this.loadProducts();
      return;
    }
    (e.has("products") || e.has("optionsById") || e.has("slidesPerView") || e.has("shadow") || e.has("hideAdd")) && queueMicrotask(() => {
      this.mountSwiper(), this.mountOptionsWidgets();
    });
  }
  async loadProducts() {
    var r, i;
    const e = ++this.fetchToken;
    this.loading = !0, this.error = "", this.cardTag = nt();
    try {
      let s = await st(this.source, this.sourceValue, this.limit);
      if (!s.length && !((r = te()) != null && r.product)) {
        if (await new Promise((n) => setTimeout(n, 800)), e !== this.fetchToken) return;
        s = await st(this.source, this.sourceValue, this.limit);
      }
      if (e !== this.fetchToken) return;
      this.products = s;
      try {
        this.showOptions && s.length ? this.optionsById = await vi(s) : this.optionsById = /* @__PURE__ */ new Map();
      } catch {
        this.optionsById = /* @__PURE__ */ new Map();
      }
      if (!s.length) {
        const n = !!((i = te()) != null && i.product);
        this.error = n ? H("لا توجد منتجات للعرض حالياً.", "No products to show right now.") : H(
          "بانتظار تهيئة متجر سلة لعرض المنتجات…",
          "Waiting for Salla storefront to load products…"
        );
      }
    } catch (s) {
      if (console.warn("[fs-products-swiper] load failed", s), e !== this.fetchToken) return;
      this.products = [], this.optionsById = /* @__PURE__ */ new Map(), this.error = H(
        "لا توجد منتجات للعرض حالياً.",
        "No products to show right now."
      );
    } finally {
      e === this.fetchToken && (this.loading = !1);
    }
  }
  syncNavDisabled() {
    const e = this.renderRoot.querySelector(".fs-ps__nav--prev"), r = this.renderRoot.querySelector(".fs-ps__nav--next"), i = this.swiper;
    !e || !r || !i || i.destroyed || (e.classList.toggle("swiper-button-disabled", i.isBeginning), r.classList.toggle("swiper-button-disabled", i.isEnd), e.setAttribute("aria-disabled", i.isBeginning ? "true" : "false"), r.setAttribute("aria-disabled", i.isEnd ? "true" : "false"));
  }
  mountSwiper() {
    if (!this.swiperEl || !this.products.length) return;
    const e = this.showOptions ? Math.min(this.slidesPerView, 2.4) : this.slidesPerView, r = `${this.products.length}:${e}:${this.showOptions ? 1 : 0}:${this.shadow ? 1 : 0}`;
    if (this.swiper && !this.swiper.destroyed && this.mountedKey === r) {
      this.swiper.update(), this.syncNavDisabled(), $e(this.swiperEl);
      return;
    }
    this.clearUpdateTimers(), tt(this.swiper), this.swiper = void 0, this.swiper = ui(this.swiperEl, {
      slidesPerView: e,
      spaceBetween: 16,
      speed: 420,
      threshold: 8,
      resistanceRatio: 0.65,
      allowTouchMove: !0,
      simulateTouch: !0,
      grabCursor: !0,
      touchStartPreventDefault: !1,
      preventClicks: !1,
      preventClicksPropagation: !1,
      slideToClickedSlide: !1,
      breakpoints: {
        0: { slidesPerView: Math.min(1.15, e) },
        640: { slidesPerView: Math.min(2.2, e) },
        960: { slidesPerView: Math.min(3.2, e) },
        1200: { slidesPerView: e }
      },
      on: {
        init: () => this.syncNavDisabled(),
        slideChange: () => this.syncNavDisabled(),
        reachBeginning: () => this.syncNavDisabled(),
        reachEnd: () => this.syncNavDisabled(),
        fromEdge: () => this.syncNavDisabled(),
        resize: () => this.syncNavDisabled()
      }
    }), this.mountedKey = r, $e(this.swiperEl), this.syncNavDisabled();
    const i = this.swiper, s = () => {
      !i || i.destroyed || (i.updateSize(), i.updateSlides(), i.update(), this.syncNavDisabled());
    };
    requestAnimationFrame(s), this.updateTimers = [120, 400].map(
      (n) => window.setTimeout(s, n)
    );
  }
  mountOptionsWidgets() {
    if (!this.showOptions) return;
    this.renderRoot.querySelectorAll("[data-fs-product-options]").forEach((r) => {
      if (r.querySelector("salla-product-options")) return;
      const i = r.getAttribute("data-product-id");
      if (!i) return;
      const s = this.optionsById.get(i);
      if (!(s != null && s.length)) {
        r.hidden = !0;
        return;
      }
      r.hidden = !1;
      const n = document.createElement("salla-product-options");
      n.setAttribute("product-id", i), Object.assign(n, {
        options: s,
        productId: i
      }), r.appendChild(n);
    });
  }
  renderCard(e) {
    const r = {
      product: e,
      shadow: this.shadow,
      hideAdd: this.hideAdd
    };
    return this.cardTag === "custom-salla-product-card" ? F`<custom-salla-product-card
        .product=${r.product}
        ?shadowOnHover=${r.shadow}
        ?hideAddBtn=${r.hideAdd}
      ></custom-salla-product-card>` : F`<salla-product-card
      .product=${r.product}
      ?shadow=${r.shadow}
      ?shadow-on-hover=${r.shadow}
      ?hide-add-btn=${r.hideAdd}
    ></salla-product-card>`;
  }
  render() {
    return this.loading ? F`<p class="fs-ps__status">${H("جاري تحميل المنتجات…", "Loading products…")}</p>` : this.products.length ? F`
      <div
        class=${Et({
      "fs-ps": !0,
      "fs-commerce__slider": !0,
      "fs-commerce__slider--shadow": this.shadow
    })}
        data-hide-add=${this.hideAdd ? "1" : "0"}
        data-show-options=${this.showOptions ? "1" : "0"}
      >
        <button
          type="button"
          class="fs-ps__nav fs-ps__nav--prev"
          aria-label=${H("السابق", "Previous")}
          @click=${this.slidePrev}
        >‹</button>
        <button
          type="button"
          class="fs-ps__nav fs-ps__nav--next"
          aria-label=${H("التالي", "Next")}
          @click=${this.slideNext}
        >›</button>
        <div class="swiper" ${Ct(this.bindRoot)}>
          <div class="swiper-wrapper">
            ${this.products.map((e) => {
      const r = e.id != null ? String(e.id) : "", i = r ? this.optionsById.get(r) : void 0, s = this.showOptions && r && ((i == null ? void 0 : i.length) || xt(e));
      return F`
                <div class="swiper-slide">
                  <div class="fs-ps__item">
                    ${this.renderCard(e)}
                    ${s ? F`<div
                          class="cart-options product-options fs-ps__options"
                          data-fs-product-options
                          data-product-id=${r}
                        ></div>` : null}
                  </div>
                </div>
              `;
    })}
          </div>
        </div>
      </div>
    ` : F`<p class="fs-ps__status">${this.error}</p>`;
  }
};
We.styles = wi;
let R = We;
j([
  ie({ type: String })
], R.prototype, "source");
j([
  ie({ type: String, attribute: "source-value" })
], R.prototype, "sourceValue");
j([
  ie({ type: Number })
], R.prototype, "limit");
j([
  ie({ type: Number, attribute: "slides-per-view" })
], R.prototype, "slidesPerView");
j([
  ie({ type: Boolean })
], R.prototype, "shadow");
j([
  ie({ type: Boolean, attribute: "hide-add" })
], R.prototype, "hideAdd");
j([
  ie({ type: Boolean, attribute: "show-options" })
], R.prototype, "showOptions");
j([
  ue()
], R.prototype, "products");
j([
  ue()
], R.prototype, "optionsById");
j([
  ue()
], R.prototype, "loading");
j([
  ue()
], R.prototype, "error");
j([
  ue()
], R.prototype, "cardTag");
function yi() {
  typeof customElements > "u" || customElements.get(it) || customElements.define(it, R);
}
yi();
function xi(t, e, r) {
  if (t && typeof t == "object" && "config" in t && "prefix" in t) {
    const s = t;
    return {
      ...s,
      config: s.config || {},
      prefix: s.prefix || ""
    };
  }
  return {
    ...{},
    config: t || {},
    prefix: e || ""
  };
}
function Yi(t, e, r) {
  const i = xi(t, e), s = i.config || {}, n = i.prefix || "", o = i.sliderOverride !== void 0, a = o || q(s[`${n}show_products`], !1), d = i.ready !== !1, l = Math.max(
    1,
    Math.min(40, Number(s[`${n}products_limit`]) || 8)
  ), f = i.defaultProductsTitle || {
    ar: "قطع مختارة لك",
    en: "Selected parts for you"
  };
  let u = null;
  a && d && (o ? u = i.sliderOverride ?? null : i.selection !== void 0 || i.dynamicOnly ? u = Ft(s, n, i.selection) : u = ct(s, n), u && (u = { ...u, limit: Math.min(l, u.limit) || l }));
  const h = Se(
    s[`${n}result_link`] ?? s[`${n}cta_link`]
  ), b = q(s[`${n}show_cta`], !!h) && !!h, p = Z(s[`${n}cta_label`], "").trim() || H("تسوق الآن", "Shop now"), v = Z(s[`${n}products_title`], "").trim() || H(f.ar, f.en), T = a && d && i.dynamicOnly && !u ? H(
    "اختر من الخيارات أعلاه لعرض المنتجات المناسبة.",
    "Make a selection above to see matching products."
  ) : "";
  if (!u && !b && !T) return ne;
  const y = q(s[`${n}product_shadow`], !0), c = q(s[`${n}hide_add_btn`], !1), m = q(s[`${n}show_product_options`], !1), w = Math.max(
    1.2,
    Math.min(5, Number(s[`${n}slides_per_view`]) || 4.2)
  ), x = u ? `${u.source}:${u.sourceValue}:${u.limit}:${m ? 1 : 0}` : "";
  return F`
    <aside class="fs-commerce" aria-label=${H("التسوق", "Shopping")}>
      ${u ? F`
            <div class="fs-commerce__head">
              <h3 class="fs-commerce__title">${v}</h3>
            </div>
            ${_t(
    x,
    F`<fs-products-swiper
                source=${u.source}
                source-value=${u.sourceValue}
                limit=${u.limit}
                slides-per-view=${w}
                ?shadow=${y}
                ?hide-add=${c}
                ?show-options=${m}
              ></fs-products-swiper>`
  )}
          ` : T ? F`<p class="fs-commerce__hint">${T}</p>` : ne}
      ${b ? F`<div class="fs-commerce__actions">
            <a
              class="fs-btn fs-tap fs-commerce__cta"
              href=${h}
              target=${qe(h) ? "_blank" : ne}
              rel=${qe(h) ? "noopener noreferrer" : ne}
            >${p}</a>
          </div>` : ne}
    </aside>
  `;
}
const Xi = ot`
  :host {
    direction: inherit;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  /* Raed theme bridge — elements are storefront add-ons, not a full theme */
  --fs-store-primary: var(--color-primary, var(--primary-color, var(--color-main, #64748b)));
  --fs-store-text: var(--color-text, var(--text-color-primary, currentColor));
  --fs-success: #2f7a58;
  --fs-danger: #b33a3a;
    display: block;
    overflow-x: clip;
  }

  .fs-section {
    background: var(--section-bg, transparent);
    color: var(--text-color, #2b211c);
    padding: var(--space-mobile, 28px) 0;
    overflow-x: clip;
  }

  @media (min-width: 960px) {
    .fs-section {
      padding: var(--space-desktop, 48px) 0;
    }
  }

  .fs-container {
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 16px;
    box-sizing: border-box;
  }

  .fs-section--full .fs-container {
    max-width: none;
  }

  .fs-header {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .fs-header--editorial {
    margin-bottom: 1.55rem;
  }

  .fs-eyebrow {
    display: inline-block;
    margin: 0 0 0.55rem;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--accent-color, var(--fs-store-primary));
  }

  .fs-title {
    margin: 0 0 0.5rem;
    font-size: clamp(1.35rem, 2.5vw, 1.85rem);
    font-weight: 700;
    line-height: 1.35;
    letter-spacing: -0.02em;
    color: var(--text-color, #2b211c);
  }

  .fs-header--editorial .fs-title,
  .fs-title--editorial {
    margin: 0;
    font-size: clamp(1.75rem, 3.4vw, 2.55rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.15;
  }

  .fs-title-line {
    display: block;
    width: 4.5rem;
    height: 2px;
    margin: 0.85rem auto 0;
    border-radius: 999px;
    background: linear-gradient(
      90deg,
      transparent,
      var(--accent-color, var(--fs-store-primary)),
      transparent
    );
  }

  .fs-desc {
    margin: 0.85rem auto 0;
    max-width: 36rem;
    color: var(--muted-color, #7a6a62);
    font-size: 0.95rem;
    line-height: 1.75;
  }

  .fs-header:not(.fs-header--editorial) .fs-desc {
    margin-top: 0;
  }

  .fs-card {
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #e8ddd6);
    border-radius: var(--section-radius, 16px);
    box-shadow: 0 12px 32px rgba(43, 33, 28, 0.06);
    transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
  }

  .fs-stage {
    position: relative;
    isolation: isolate;
    border-radius: var(--section-radius, 16px);
    overflow: hidden;
  }

  .fs-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    min-height: 46px;
    padding: 0.7rem 1.25rem;
    border: none;
    border-radius: 999px;
    background: var(--button-bg, var(--accent-color, var(--fs-store-primary)));
    color: var(--button-color, #fff);
    font: inherit;
    font-weight: 700;
    cursor: pointer;
    text-decoration: none;
    transition: opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
    box-sizing: border-box;
    box-shadow: 0 10px 22px color-mix(in srgb, var(--button-bg, var(--accent-color, var(--fs-store-primary))) 26%, transparent);
  }

  .fs-btn:hover {
    opacity: 0.94;
    transform: translateY(-1px);
  }

  .fs-btn:active {
    transform: translateY(0);
  }

  .fs-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  .fs-btn--ghost {
    background: transparent;
    color: var(--accent-color, var(--fs-store-primary));
    border: 1px solid var(--border-color, #e8ddd6);
    box-shadow: none;
  }

  .fs-btn--ghost:hover {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, var(--border-color, #e8ddd6));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, transparent);
  }

  .fs-btn--compact,
  .fs-btn--icon {
    min-width: 44px;
    min-height: 44px;
    padding: 0.45rem 0.85rem;
    border-radius: calc(var(--section-radius, 16px) * 0.55);
    box-shadow: none;
  }

  .fs-btn--icon {
    padding: 0;
    width: 44px;
  }

  .fs-tap {
    min-width: 44px;
    min-height: 44px;
  }

  .fs-btn:focus-visible,
  button:focus-visible,
  a:focus-visible,
  input:focus-visible,
  select:focus-visible,
  [tabindex]:focus-visible {
    outline: 2px solid var(--accent-color, var(--fs-store-primary));
    outline-offset: 2px;
  }

  .fs-empty {
    padding: 2.25rem 1.15rem;
    text-align: center;
    color: var(--muted-color, #7a6a62);
    border: 1px dashed var(--border-color, #e8ddd6);
    border-radius: var(--section-radius, 16px);
    background: color-mix(in srgb, var(--card-bg, #fff) 70%, transparent);
    font-size: 0.92rem;
    line-height: 1.6;
  }

  .fs-pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
    min-height: 36px;
    padding: 0.35rem 0.85rem;
    border-radius: 999px;
    border: 1px solid var(--border-color, #e8ddd6);
    background: var(--card-bg, #fff);
    color: var(--muted-color, #7a6a62);
    font: inherit;
    font-size: 0.8rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
  }

  .fs-pill:hover {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 40%, var(--border-color, #e8ddd6));
  }

  .fs-pill[aria-pressed='true'],
  .fs-pill.is-active,
  .fs-pill--active {
    border-color: var(--accent-color, var(--fs-store-primary));
    color: var(--accent-color, var(--fs-store-primary));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, var(--card-bg, #fff));
  }

  .fs-coach {
    display: grid;
    gap: 0.35rem;
    padding: 0.85rem 1rem;
    border-radius: calc(var(--section-radius, 16px) * 0.7);
    border-inline-start: 3px solid var(--accent-color, var(--fs-store-primary));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 7%, var(--card-bg, #fff));
    color: var(--text-color, #2b211c);
    font-size: 0.88rem;
    line-height: 1.6;
  }

  .fs-coach__mark {
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--accent-color, var(--fs-store-primary));
  }

  .fs-progress {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.55rem;
    margin-bottom: 1rem;
  }

  .fs-progress__label {
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--muted-color, #7a6a62);
  }

  .fs-progress__track {
    flex: 1;
    min-width: 7rem;
    height: 0.35rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #e8ddd6) 75%, transparent);
    overflow: hidden;
  }

  .fs-progress__bar {
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(
      90deg,
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 70%, #c4a484),
      var(--accent-color, var(--fs-store-primary))
    );
    transition: width 0.35s ease;
  }

  .fs-dots {
    display: flex;
    justify-content: center;
    gap: 0.4rem;
    margin-top: 0.85rem;
  }

  .fs-dot {
    width: 0.45rem;
    height: 0.45rem;
    border: 0;
    padding: 0;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 28%, #ddd);
    cursor: pointer;
    transition: width 0.25s ease, background 0.25s ease;
  }

  .fs-dot.is-active,
  .fs-dot[aria-current='true'] {
    width: 1.35rem;
    background: var(--accent-color, var(--fs-store-primary));
  }

  .fs-meter {
    width: 100%;
    height: 6px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #e8ddd6) 80%, transparent);
    overflow: hidden;
  }

  .fs-meter > span {
    display: block;
    height: 100%;
    background: linear-gradient(
      90deg,
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 75%, #c4a484),
      var(--accent-color, var(--fs-store-primary))
    );
    border-radius: inherit;
    transition: width 0.45s ease;
  }

  .fs-scroll-x {
    display: flex;
    gap: 0.65rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-x: contain;
    scroll-snap-type: x proximity;
    scrollbar-width: thin;
    padding-bottom: 0.25rem;
  }

  .fs-scroll-x > * {
    flex: 0 0 auto;
    scroll-snap-align: start;
  }

  .fs-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
  }

  /* Entrance motion when theme.animate is on */
  .fs-animate .fs-header,
  .fs-animate .fs-header--editorial {
    animation: fs-rise 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .fs-fade {
    animation: fs-fade 0.35s ease both;
  }

  .fs-pulse {
    animation: fs-pulse 2.2s ease-out infinite;
  }

  @keyframes fs-rise {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @keyframes fs-fade {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes fs-pulse {
    0% {
      transform: scale(0.92);
      opacity: 0.7;
    }
    100% {
      transform: scale(1.28);
      opacity: 0;
    }
  }

  /* —— Merchant commercial outcome (real Salla products slider) —— */
  .fs-commerce {
    margin-top: clamp(1.5rem, 4vw, 3rem);
    padding-top: clamp(1.25rem, 3vw, 2rem);
    border-top: 1px solid var(--border-color, #e8ddd6);
    display: grid;
    gap: 1rem;
  }

  .fs-commerce__head {
    margin: 0;
  }

  .fs-commerce__title,
  .fs-commerce__head h3 {
    margin: 0;
    color: var(--text-color, #2b211c);
    font-size: 1.1rem;
    font-weight: 800;
    text-align: center;
    line-height: 1.35;
  }

  .fs-commerce__head p {
    margin: 0.35rem 0 0;
    color: var(--muted-color, #7a6a62);
    font-size: 0.9rem;
    text-align: center;
  }

  .fs-commerce__slider {
    min-width: 0;
    width: 100%;
  }

  .fs-commerce__slider salla-products-slider {
    display: block;
    width: 100%;
    margin-bottom: 0 !important;
  }

  .fs-commerce__actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.65rem;
  }

  .fs-commerce__cta {
    min-width: min(100%, 16rem);
  }

  .fs-commerce__hint {
    margin: 0;
    text-align: center;
    color: var(--muted-color, #7a6a62);
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .fs-commerce__slider[data-hide-add='1'] .s-product-card-content-footer,
  .fs-commerce__slider[data-hide-add='1'] .s-add-product-button,
  .fs-commerce__slider[data-hide-add='1'] salla-add-product-button {
    display: none !important;
  }


  /* —— Salla product cards (Theme Raed look) —— */
  .fs-commerce__slider .s-slider-block__title {
    display: none;
  }

  .fs-commerce__slider .swiper,
  .fs-commerce__slider .s-slider-container {
    overflow: hidden;
    padding: 0.35rem 0.2rem 1.1rem;
  }

  .fs-commerce__slider .swiper-wrapper {
    align-items: stretch;
  }

  .fs-commerce__slider .swiper-slide,
  .fs-commerce__slider .s-products-slider-card {
    height: auto;
    /* Swiper sets slide width — forcing it breaks drag/translate */
    box-sizing: border-box;
  }

  .fs-commerce__slider salla-product-card,
  .fs-commerce__slider .s-product-card-entry {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    overflow: hidden;
    text-align: start;
    color: #1f2937;
    background: #fff;
    border: 0;
    border-radius: 15px;
    box-shadow: none;
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .fs-commerce__slider .s-product-card-vertical {
    flex-direction: column;
  }

  .fs-commerce__slider--shadow .s-product-card-entry:hover,
  .fs-commerce__slider--shadow .s-product-card-shadow:hover {
    box-shadow: 5px 10px 30px rgba(43, 45, 52, 0.051);
  }

  .fs-commerce__slider .s-product-card-image {
    position: relative;
    display: block;
    flex: 1 1 0%;
    overflow: hidden;
    width: 100%;
    min-height: 11rem;
    max-height: 15rem;
    aspect-ratio: 1 / 1;
    background: #f3f4f6;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }

  .fs-commerce__slider .s-product-card-image::before,
  .fs-commerce__slider .s-product-card-image a::before {
    content: none !important;
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
  }

  .fs-commerce__slider .s-product-card-image:hover {
    opacity: 1;
  }

  .fs-commerce__slider .s-product-card-image a {
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
  }

  .fs-commerce__slider .s-product-card-image img,
  .fs-commerce__slider .s-product-card-image-cover,
  .fs-commerce__slider .s-product-card-image-contain {
    display: block;
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    transition: transform 400ms cubic-bezier(0.4, 0, 0.2, 1),
      opacity 500ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .fs-commerce__slider .s-product-card-image-contain {
    object-fit: contain;
  }

  .fs-commerce__slider .s-product-card-wishlist-btn {
    position: absolute;
    top: 0.5rem;
    inset-inline-end: 0.5rem;
    z-index: 2;
    opacity: 0.75;
  }

  .fs-commerce__slider .s-product-card-wishlist-btn:hover {
    opacity: 1;
  }

  .fs-commerce__slider .s-product-card-wishlist-btn button,
  .fs-commerce__slider .s-product-card-wishlist-btn .s-button-element {
    display: inline-flex !important;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    margin: 0 !important;
    padding: 0 !important;
    border: 0 !important;
    border-radius: 999px !important;
    background: #fff !important;
    box-shadow: none;
    cursor: pointer;
  }

  .fs-commerce__slider .s-product-card-wishlist-btn svg {
    width: 1rem;
    height: 1rem;
    fill: #6b7280;
  }

  .fs-commerce__slider .s-product-card-wishlist-btn button:hover svg {
    fill: #4b5563;
  }

  .fs-commerce__slider .s-product-card-wishlist-added svg,
  .fs-commerce__slider .s-product-card-wishlist-added i {
    fill: #ef4444;
    color: #ef4444;
  }

  .fs-commerce__slider .s-product-card-promotion-title {
    position: absolute;
    top: 1rem;
    left: 0;
    z-index: 2;
    max-width: calc(100% - 60px);
    padding: 0.375rem 0.625rem;
    border-radius: 0 15px 15px 0;
    background: #991b1b;
    color: #fff;
    font-size: 0.75rem;
    font-weight: 700;
    line-height: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  :host([dir='rtl']) .fs-commerce__slider .s-product-card-promotion-title,
  [dir='rtl'] .fs-commerce__slider .s-product-card-promotion-title {
    right: 0;
    left: auto;
    border-radius: 15px 0 0 15px;
  }

  .fs-commerce__slider .s-product-card-quantity {
    position: absolute;
    bottom: 0.25rem;
    left: 50%;
    z-index: 2;
    max-width: calc(100% - 60px);
    transform: translateX(-50%);
    padding: 0.375rem 0.625rem;
    border-radius: 15px;
    background: #f87171;
    color: #fff;
    font-size: 0.75rem;
    font-weight: 700;
    line-height: 1rem;
  }

  .fs-commerce__slider .s-product-card-out-badge {
    position: absolute;
    bottom: 0.5rem;
    left: 50%;
    z-index: 2;
    max-width: calc(100% - 60px);
    transform: translateX(-50%);
    padding: 0.375rem 0.625rem;
    border-radius: 0.375rem;
    background: #f3f4f6;
    color: #999;
    font-size: 0.75rem;
    font-weight: 700;
    line-height: 1rem;
  }

  .fs-commerce__slider .s-product-card-out-of-stock img {
    filter: grayscale(100%);
  }

  .fs-commerce__slider .s-product-card-content {
    position: relative;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    padding: 0.75rem;
    min-width: 0;
  }

  @media (min-width: 640px) {
    .fs-commerce__slider .s-product-card-content {
      padding: 1.25rem;
    }
  }

  .fs-commerce__slider .s-product-card-content-title {
    margin: 0 0 0.625rem;
    max-width: 100%;
    line-height: 1.5rem;
    word-break: break-word;
  }

  .fs-commerce__slider .s-product-card-content-title a {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    color: #1f2937;
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 1.25rem;
    text-decoration: none;
  }

  .fs-commerce__slider .s-product-card-content-title a:hover {
    color: var(--color-primary, var(--accent-color, var(--fs-store-primary)));
  }

  .fs-commerce__slider .s-product-card-content-subtitle {
    margin: 0 0 0.625rem;
    color: #4b5563;
    font-size: 0.875rem;
    line-height: 1.5rem;
  }

  .fs-commerce__slider .s-product-card-content-sub {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: flex-start;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
  }

  .fs-commerce__slider .s-product-card-content-footer {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: stretch;
    gap: 0.65rem;
    margin-top: auto;
  }

  .fs-commerce__slider .s-product-card-price {
    margin: 0;
    color: #1f2937;
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 1.25rem;
  }

  .fs-commerce__slider .s-product-card-sale-price {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.25rem;
  }

  .fs-commerce__slider .s-product-card-sale-price h4 {
    margin: 0;
    display: inline-block;
    color: #991b1b !important;
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 1.25rem;
  }

  .fs-commerce__slider .s-product-card-sale-price span {
    color: #9ca3af;
    font-size: 0.875rem;
    line-height: 1.25rem;
    text-decoration: line-through;
  }

  .fs-commerce__slider .s-product-card-starting-price {
    display: flex;
    width: auto;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    gap: 0.625rem;
  }

  .fs-commerce__slider .s-product-card-starting-price h4 {
    margin: 0;
    display: inline-block;
    color: #991b1b;
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 1.25rem;
  }

  .fs-commerce__slider .s-product-card-starting-price p {
    margin: 0;
    color: #6b7280;
    font-size: 0.75rem;
  }

  .fs-commerce__slider .s-product-card-rating {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    color: #9ca3af;
    font-size: 0.875rem;
  }

  .fs-commerce__slider .s-product-card-rating span svg {
    width: 1rem;
    height: 1rem;
    margin-bottom: 3px;
    fill: #fbbf24;
  }

  .fs-commerce__slider .s-add-product-button,
  .fs-commerce__slider .s-add-product-button-main {
    display: block;
    width: 100%;
    margin-top: 0;
  }

  .fs-commerce__slider .s-add-product-button .s-button-btn,
  .fs-commerce__slider .s-add-product-button-main .s-button-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    width: 100%;
    min-height: 2.55rem;
    padding: 0.55rem 1.1rem;
    border-radius: 999px;
    border: 1px solid var(--color-primary, var(--accent-color, var(--fs-store-primary)));
    background: var(--color-primary, var(--accent-color, var(--fs-store-primary)));
    color: var(--color-primary-reverse, #fff);
    font-size: 0.8125rem;
    font-weight: 700;
    white-space: nowrap;
    box-shadow: 0 8px 18px color-mix(in srgb, var(--color-primary, #21636d) 22%, transparent);
    transition: transform 180ms ease, opacity 180ms ease;
  }

  .fs-commerce__slider .s-add-product-button .s-button-btn:hover,
  .fs-commerce__slider .s-add-product-button-main .s-button-btn:hover {
    opacity: 0.92;
    transform: translateY(-1px);
  }

  @media (prefers-reduced-motion: reduce) {
    .fs-commerce__slider .s-product-card-entry,
    .fs-commerce__slider .s-product-card-image img {
      transition: none;
    }
  }

  /* —— Salla theme-raed style product card —— */
  .fs-product-card {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    text-align: start;
    color: #1f2937;
    background: #fff;
    border: 0;
    border-radius: 15px;
    box-shadow: none;
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .fs-product-card:hover {
    box-shadow: 5px 10px 30px rgba(43, 45, 52, 0.051);
  }

  .fs-product-card--selectable {
    cursor: pointer;
  }

  .fs-product-card--selectable:focus-visible {
    outline: 2px solid var(--accent-color, var(--fs-store-primary));
    outline-offset: 2px;
  }

  .fs-product-card.is-selected {
    border-color: var(--accent-color, var(--fs-store-primary));
    box-shadow:
      0 0 0 2px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 32%, transparent),
      0 16px 34px rgba(43, 33, 28, 0.12);
  }

  .fs-product-card__media {
    position: relative;
    aspect-ratio: 1 / 1;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    overflow: hidden;
    background: color-mix(in srgb, var(--border-color, #e8ddd6) 45%, #fff);
  }

  .fs-product-card__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: opacity 500ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .fs-product-card__img--empty {
    background: linear-gradient(145deg, #3a2c26, #1c1613);
  }

  /* fs-product-card__badge--rtl-fix */
  .fs-product-card__badge {
    position: absolute;
    top: 1rem;
    inset-inline-start: 0;
    z-index: 2;
    padding: 0.375rem 0.625rem;
    border-radius: 0 15px 15px 0;
    background: #991b1b;
    color: #fff;
    font-size: 0.66rem;
    font-weight: 800;
    letter-spacing: 0.02em;
      }

  :host([dir='rtl']) .fs-product-card__badge,
  [dir='rtl'] .fs-product-card__badge {
    border-radius: 15px 0 0 15px;
  }


  .fs-product-card__wishlist {
    position: absolute;
    top: 0.6rem;
    inset-inline-end: 0.6rem;
    z-index: 3;
    width: 2.15rem;
    height: 2.15rem;
    display: grid;
    place-items: center;
    padding: 0;
    border: 1px solid color-mix(in srgb, var(--border-color, #e8ddd6) 70%, transparent);
    border-radius: 50%;
    background: color-mix(in srgb, var(--card-bg, #fff) 82%, transparent);
    color: var(--muted-color, #7a6a62);
    font-size: 0.98rem;
    line-height: 1;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(43, 33, 28, 0.12);
    -webkit-backdrop-filter: blur(6px);
    backdrop-filter: blur(6px);
    transition:
      color 0.2s ease,
      background 0.2s ease,
      border-color 0.2s ease,
      transform 0.2s ease;
  }

  .fs-product-card__wishlist:hover {
    transform: scale(1.1);
    color: #d1495b;
    border-color: color-mix(in srgb, #d1495b 35%, var(--border-color, #e8ddd6));
  }

  .fs-product-card__wishlist:active {
    transform: scale(0.94);
  }

  .fs-product-card__wishlist.is-active {
    color: #fff;
    border-color: transparent;
    background: linear-gradient(135deg, #d1495b, #b23a4a);
    animation: fs-heart-pop 0.32s ease;
  }

  @keyframes fs-heart-pop {
    0% {
      transform: scale(0.8);
    }
    55% {
      transform: scale(1.18);
    }
    100% {
      transform: scale(1);
    }
  }

  .fs-product-card__check {
    position: absolute;
    top: 0.6rem;
    inset-inline-start: 0.6rem;
    z-index: 3;
    width: 1.65rem;
    height: 1.65rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: var(--accent-color, var(--fs-store-primary));
    color: #fff;
    font-size: 0.75rem;
    font-weight: 700;
    box-shadow: 0 6px 14px rgba(43, 33, 28, 0.22);
    opacity: 0;
    transform: scale(0.8);
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  .fs-product-card.is-selected .fs-product-card__check {
    opacity: 1;
    transform: scale(1);
  }

  .fs-product-card__body {
    display: flex;
    flex-direction: column;
    gap: 0.42rem;
    padding: 0.8rem 0.85rem 0.9rem;
    flex: 1 1 auto;
  }

  .fs-product-card__title {
    margin: 0;
    font-size: 0.92rem;
    font-weight: 700;
    line-height: 1.45;
    color: var(--text-color, #2b211c);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .fs-product-card__title a {
    color: inherit;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .fs-product-card:hover .fs-product-card__title a {
    color: var(--accent-color, var(--fs-store-primary));
  }

  .fs-product-card__subtitle {
    margin: 0;
    font-size: 0.76rem;
    color: var(--muted-color, #7a6a62);
    line-height: 1.45;
  }

  .fs-product-card__meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.35rem 0.6rem;
    margin-top: auto;
    padding-top: 0.15rem;
  }

  .fs-product-card__price {
    display: inline-flex;
    align-items: baseline;
    gap: 0.4rem;
    flex-wrap: wrap;
  }

  .fs-product-card__price-now {
    font-size: 1rem;
    font-weight: 700;
    color: #991b1b;
    letter-spacing: -0.01em;
  }

  .fs-product-card__price-old {
    font-size: 0.76rem;
    font-weight: 500;
    color: var(--muted-color, #7a6a62);
    text-decoration: line-through;
  }

  .fs-product-card__rating {
    display: inline-flex;
    align-items: center;
    gap: 0.22rem;
    padding: 0.15rem 0.45rem;
    border-radius: 999px;
    background: color-mix(in srgb, #f4a940 16%, var(--card-bg, #fff));
    font-size: 0.76rem;
    font-weight: 700;
    color: var(--text-color, #2b211c);
  }

  .fs-product-card__rating .sicon-star2 {
    color: #f4a940;
  }

  .fs-product-card__add {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 2.25rem;
    padding: 0.5rem 1.25rem 0.625rem;
    border-radius: 0.375rem;
    border: 1px solid var(--color-primary, var(--accent-color, var(--fs-store-primary)));
    background: var(--color-primary, var(--accent-color, var(--fs-store-primary)));
    color: var(--color-primary-reverse, #fff);
    font-size: 0.875rem;
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;
    transition: opacity 300ms;
  }

  .fs-product-card__add:hover {
    opacity: 0.8;
  }

  .fs-product-card__add:active {
    opacity: 0.9;
  }

  .fs-product-card__link {
    margin-top: 0.2rem;
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--accent-color, var(--fs-store-primary));
    text-decoration: none;
  }

  .fs-product-card__link:hover {
    text-decoration: underline;
  }

  /* —— Tablet —— */
  @media (max-width: 959px) {
    .fs-header {
      margin-bottom: 1.25rem;
    }

    .fs-title {
      font-size: clamp(1.3rem, 4vw, 1.75rem);
      line-height: 1.3;
    }

    .fs-desc {
      font-size: 0.92rem;
      line-height: 1.65;
    }

    .fs-actions {
      display: grid;
      grid-template-columns: 1fr;
    }

    .fs-actions .fs-btn {
      width: 100%;
    }
  }

  /* —— Phone —— */
  @media (max-width: 639px) {
    .fs-section {
      padding: var(--space-mobile, 22px) 0;
    }

    .fs-container {
      padding: 0 12px;
    }

    .fs-header {
      margin-bottom: 1rem;
    }

    .fs-title {
      font-size: clamp(1.2rem, 6.2vw, 1.55rem);
      line-height: 1.28;
    }

    .fs-desc {
      font-size: 0.88rem;
      line-height: 1.6;
    }

    .fs-empty {
      padding: 1.35rem 0.85rem;
      font-size: 0.88rem;
    }

    .fs-product-card__body {
      padding: 0.65rem 0.65rem 0.75rem;
      gap: 0.35rem;
    }

    .fs-product-card__title {
      font-size: 0.86rem;
    }

    .fs-product-card__price-now {
      font-size: 0.92rem;
    }

    .fs-product-card__wishlist {
      width: 1.95rem;
      height: 1.95rem;
      font-size: 0.9rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .fs-btn,
    .fs-meter > span,
    * {
      scroll-behavior: auto !important;
    }

    .fs-animate,
    .fs-animate .fs-header,
    .fs-animate .fs-header--editorial,
    .fs-pulse,
    .fs-fade,
    .fs-curtain,
    .fs-celebrate,
    .fs-pill,
    .fs-dot,
    .fs-progress__bar,
    .fs-product-card,
    .fs-product-card__img,
    .fs-product-card__media::after,
    .fs-product-card__wishlist,
    .fs-product-card__check,
    .fs-product-card__add {
      transition: none !important;
      animation: none !important;
    }

    .fs-product-card:hover {
      transform: none;
    }

    .fs-product-card:hover .fs-product-card__img {
      transform: none;
    }
  }
`;
export {
  At as A,
  zt as B,
  at as C,
  oe as D,
  he as E,
  Ai as F,
  Hi as G,
  Oi as H,
  $i as I,
  Vi as J,
  Bt as K,
  qi as L,
  Wi as M,
  Gi as a,
  Yi as b,
  Bi as c,
  Se as d,
  Q as e,
  xe as f,
  kt as g,
  ji as h,
  q as i,
  Fi as j,
  le as k,
  Z as l,
  Ne as m,
  Mi as n,
  Li as o,
  Ri as p,
  zi as q,
  Ni as r,
  Xi as s,
  H as t,
  Nt as u,
  Ii as v,
  Di as w,
  De as x,
  ve as y,
  Pi as z
};
