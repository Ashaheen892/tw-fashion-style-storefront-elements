import { css as A } from "lit";
function _() {
  var t, e, r;
  try {
    const n = typeof Salla < "u" ? (e = (t = Salla == null ? void 0 : Salla.lang) == null ? void 0 : t.getLocale) == null ? void 0 : e.call(t) : void 0, o = (r = document.documentElement.lang) == null ? void 0 : r.split(/[-_]/)[0];
    return (n || o || "ar").toLowerCase();
  } catch {
    return "ar";
  }
}
function y(t, e = "") {
  if (t == null) return e;
  if (typeof t == "string")
    return t.trim() || e;
  if (typeof t == "number" && Number.isFinite(t))
    return String(t);
  if (typeof t == "object") {
    const r = t, o = [_(), "ar", "en", ...Object.keys(r)];
    for (const a of o) {
      const s = r[a];
      if (typeof s == "string" && s.trim()) return s.trim();
      if (typeof s == "number" && Number.isFinite(s)) return String(s);
    }
  }
  return e;
}
function $(t) {
  return Object.entries(t || {}).reduce((e, [r, n]) => {
    const o = r.includes(".") ? r.split(".").pop() : r;
    return e[o] = n, e;
  }, {});
}
function N(t) {
  return Array.isArray(t) ? t.filter((e) => !!e && typeof e == "object").map((e) => $(e)) : [];
}
function h(t, e = 0) {
  return typeof t == "number" && Number.isFinite(t) ? t : typeof t == "string" && t.trim() !== "" && Number.isFinite(Number(t)) ? Number(t) : t && typeof t == "object" && "value" in t ? h(t.value, e) : e;
}
function w(t, e = 0) {
  if (typeof t == "number" && Number.isFinite(t)) return t;
  if (typeof t == "string" && t.trim() !== "") {
    const r = Number(t.replace(",", "."));
    return Number.isFinite(r) ? r : e;
  }
  return e;
}
function L(t, e, r) {
  return Math.min(r, Math.max(e, t));
}
function x(t, e = !1) {
  if (typeof t == "boolean") return t;
  if (typeof t == "string") {
    const r = t.toLowerCase().trim();
    if (["true", "1", "yes", "on"].includes(r)) return !0;
    if (["false", "0", "no", "off", ""].includes(r)) return !1;
  }
  return typeof t == "number" ? t !== 0 : e;
}
function S(t) {
  if (!t) return "";
  if (typeof t == "string") {
    const e = t.trim();
    return k(e) ? e : "";
  }
  if (Array.isArray(t)) {
    for (const e of t) {
      const r = S(e);
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
    for (const n of r) {
      const o = S(n);
      if (o) return o;
    }
  }
  return "";
}
function k(t) {
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
function z(t) {
  if (!t || typeof t != "string") return !1;
  try {
    const e = new URL(t, window.location.origin);
    return !!["http:", "https:"].includes(e.protocol);
  } catch {
    return !1;
  }
}
function F(t, e = "ر.س") {
  return Number.isFinite(t) ? `${t.toLocaleString(void 0, {
    minimumFractionDigits: t % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2
  })} ${e}`.trim() : "";
}
function M(t = "ر.س") {
  var e, r, n, o, a, s;
  try {
    const l = window, i = l.Salla || l.salla, u = ((r = (e = i == null ? void 0 : i.config) == null ? void 0 : e.currency) == null ? void 0 : r.symbol) || ((o = (n = i == null ? void 0 : i.config) == null ? void 0 : n.currency) == null ? void 0 : o.code) || ((a = i == null ? void 0 : i.currency) == null ? void 0 : a.symbol) || ((s = i == null ? void 0 : i.currency) == null ? void 0 : s.code);
    if (typeof u == "string" && u.trim())
      return u.trim();
    const f = document.documentElement.getAttribute("data-currency");
    if (f != null && f.trim()) return f.trim();
  } catch {
  }
  return t;
}
function W(t, e) {
  const r = /* @__PURE__ */ new Map();
  for (const n of t) {
    const o = String(n[e] ?? "").trim();
    if (!o) continue;
    const a = r.get(o) || [];
    a.push(n), r.set(o, a);
  }
  return r;
}
function B(t, e = "group_order") {
  return [...t].sort(
    (r, n) => w(r[e], 0) - w(n[e], 0)
  );
}
function P(t, e, r, n) {
  var a, s;
  return ((s = typeof document < "u" ? (a = document.documentElement.lang) == null ? void 0 : a.split(/[-_]/)[0] : "ar") == null ? void 0 : s.toLowerCase()) === "en" ? e : n || t;
}
function T(t, e) {
  try {
    const r = localStorage.getItem(t);
    return r ? JSON.parse(r) : e;
  } catch {
    return e;
  }
}
function U(t, e) {
  try {
    localStorage.setItem(t, JSON.stringify(e));
  } catch {
  }
}
function D(t, e) {
  const r = String(t || "").replace(/\D+/g, "");
  if (!r || r.length < 8) return "";
  const n = encodeURIComponent(e || "");
  return `https://wa.me/${r}${n ? `?text=${n}` : ""}`;
}
async function I(t) {
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
    const n = document.execCommand("copy");
    return document.body.removeChild(r), n;
  } catch {
    return !1;
  }
}
function O() {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return !1;
  }
}
function R(t, e, r) {
  const n = t || {};
  return {
    bg: String(n[`${e}bg`] ?? (r == null ? void 0 : r.bg) ?? "#faf7f5"),
    text: String(n[`${e}text`] ?? (r == null ? void 0 : r.text) ?? "#2b211c"),
    muted: String(n[`${e}muted`] ?? (r == null ? void 0 : r.muted) ?? "#7a6a62"),
    accent: String(n[`${e}accent`] ?? (r == null ? void 0 : r.accent) ?? "#8b5e4b"),
    card: String(n[`${e}card`] ?? (r == null ? void 0 : r.card) ?? "#ffffff"),
    border: String(n[`${e}border`] ?? (r == null ? void 0 : r.border) ?? "#e8ddd6"),
    buttonBg: String(n[`${e}button_bg`] ?? (r == null ? void 0 : r.buttonBg) ?? "#8b5e4b"),
    buttonColor: String(
      n[`${e}button_color`] ?? (r == null ? void 0 : r.buttonColor) ?? "#ffffff"
    ),
    radius: `${h(n[`${e}radius`], 16)}px`,
    spaceDesktop: h(
      n[`${e}space_desktop`],
      48
    ),
    spaceMobile: h(
      n[`${e}space_mobile`],
      28
    ),
    animate: x(n[`${e}animate`], !0),
    fullWidth: x(n[`${e}full_width`], !1)
  };
}
function E(t) {
  return {
    "--section-bg": t.bg,
    "--text-color": t.text,
    "--muted-color": t.muted,
    "--accent-color": t.accent,
    "--card-bg": t.card,
    "--border-color": t.border,
    "--button-bg": t.buttonBg,
    "--button-color": t.buttonColor,
    "--section-radius": t.radius,
    "--space-desktop": `${t.spaceDesktop}px`,
    "--space-mobile": `${t.spaceMobile}px`
  };
}
function v(t, e = "") {
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
      return v(r.selected, e);
    if ("value" in r && r.value != null && !Array.isArray(r.value))
      return String(r.value ?? e);
    if (Array.isArray(r.value) && r.value[0])
      return v(r.value, e);
  }
  return e;
}
function V(t) {
  const e = y(t, "");
  return e ? e.split(/[,،|/]/).map((r) => r.trim()).filter(Boolean) : [];
}
function p(t) {
  if (typeof t == "number" && Number.isFinite(t)) return t;
  if (typeof t == "string" && t.trim() !== "") return w(t, 0);
  if (t && typeof t == "object") {
    const e = t;
    if ("amount" in e) return p(e.amount);
    if ("value" in e) return p(e.value);
  }
  return 0;
}
function d(t) {
  if (!t) return "";
  if (typeof t == "string") {
    const e = t.trim();
    return z(e) || e.startsWith("/") ? e : "";
  }
  if (Array.isArray(t)) {
    for (const e of t) {
      const r = d(e);
      if (r) return r;
    }
    return "";
  }
  if (typeof t == "object") {
    const e = t, r = [e.url, e.src, e.image, e.thumbnail, e.original];
    for (const n of r) {
      const o = d(n);
      if (o) return o;
    }
  }
  return "";
}
function J(t) {
  if (!t) return null;
  let e = t;
  if (Array.isArray(t))
    e = t[0];
  else if (typeof t == "object") {
    const c = t, j = Array.isArray(c.selected) ? c.selected : [], m = Array.isArray(c.value) ? c.value : [];
    j.length ? e = j[0] : m.length ? e = (typeof m[0] == "object" && m[0], m[0]) : c.product && typeof c.product == "object" ? e = c.product : c.value && typeof c.value == "object" && !Array.isArray(c.value) && (e = c.value);
  }
  if (e != null && (typeof e == "string" || typeof e == "number")) {
    const c = String(e).trim();
    return c ? { id: c, name: "", image: "", url: "", price: 0, old_price: 0 } : null;
  }
  if (!e || typeof e != "object") return null;
  const r = e;
  let n = String(r.id ?? r.product_id ?? "").trim();
  if (!n && r.value != null && typeof r.value != "object" && (n = String(r.value).trim()), !n && r.value && typeof r.value == "object") {
    const c = r.value;
    n = String(c.id ?? c.product_id ?? c.value ?? "").trim();
  }
  const o = y(r.name, "").trim() || y(r.label, "").trim() || y(r.title, "").trim(), a = d(r.image) || d(r.main_image) || d(r.thumbnail) || d(r.images) || (r.value && typeof r.value == "object" ? d(r.value.image) : ""), s = S(
    r.url || r.permalink || r.link || (r.value && typeof r.value == "object" ? r.value.url : "")
  ), l = x(r.on_sale) || x(r.is_on_sale), i = p(
    r.sale_price ?? r.sale_price_amount ?? r.discounted_price
  ), u = p(
    r.regular_price ?? r.regular_price_amount ?? r.price_before
  ), f = p(r.price ?? r.price_amount);
  let b = f, g = 0;
  return l && i > 0 ? (b = i, g = u > i ? u : 0) : u > f && f > 0 ? (b = f, g = u) : i > 0 && u > i && (b = i, g = u), !n && !o && !a && !s ? null : { id: n, name: o, image: a, url: s, price: b, old_price: g };
}
const q = A`
  :host {
    display: block;
    overflow-x: clip;
  }

  .fs-section {
    background: var(--section-bg, #faf7f5);
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

  .fs-title {
    margin: 0 0 0.5rem;
    font-size: clamp(1.35rem, 2.5vw, 1.85rem);
    font-weight: 700;
    line-height: 1.35;
    color: var(--text-color, #2b211c);
  }

  .fs-desc {
    margin: 0 auto;
    max-width: 42rem;
    color: var(--muted-color, #7a6a62);
    font-size: 0.95rem;
    line-height: 1.7;
  }

  .fs-card {
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #e8ddd6);
    border-radius: var(--section-radius, 16px);
    box-shadow: 0 8px 28px rgba(43, 33, 28, 0.06);
  }

  .fs-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    min-height: 44px;
    padding: 0.65rem 1.15rem;
    border: none;
    border-radius: calc(var(--section-radius, 16px) * 0.6);
    background: var(--button-bg, #8b5e4b);
    color: var(--button-color, #fff);
    font: inherit;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    transition: opacity 0.2s ease, transform 0.2s ease;
    box-sizing: border-box;
  }

  .fs-btn:hover {
    opacity: 0.92;
  }

  .fs-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .fs-btn--ghost {
    background: transparent;
    color: var(--accent-color, #8b5e4b);
    border: 1px solid var(--border-color, #e8ddd6);
  }

  .fs-btn:focus-visible,
  button:focus-visible,
  a:focus-visible,
  input:focus-visible,
  select:focus-visible {
    outline: 2px solid var(--accent-color, #8b5e4b);
    outline-offset: 2px;
  }

  .fs-empty {
    padding: 2rem 1rem;
    text-align: center;
    color: var(--muted-color, #7a6a62);
    border: 1px dashed var(--border-color, #e8ddd6);
    border-radius: var(--section-radius, 16px);
  }

  .fs-meter {
    width: 100%;
    height: 8px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #e8ddd6) 80%, transparent);
    overflow: hidden;
  }

  .fs-meter > span {
    display: block;
    height: 100%;
    background: var(--accent-color, #8b5e4b);
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

  .fs-tap {
    min-height: 44px;
    min-width: 44px;
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
  }

  @media (prefers-reduced-motion: reduce) {
    .fs-btn,
    .fs-meter > span,
    * {
      scroll-behavior: auto !important;
    }

    .fs-animate,
    .fs-pulse,
    .fs-fade,
    .fs-curtain,
    .fs-celebrate {
      transition: none !important;
      animation: none !important;
    }
  }
`;
export {
  U as A,
  V as B,
  E as a,
  S as b,
  I as c,
  w as d,
  d as e,
  J as f,
  _ as g,
  p as h,
  x as i,
  F as j,
  W as k,
  y as l,
  B as m,
  N as n,
  D as o,
  O as p,
  v as q,
  R as r,
  q as s,
  P as t,
  h as u,
  L as v,
  k as w,
  z as x,
  M as y,
  T as z
};
