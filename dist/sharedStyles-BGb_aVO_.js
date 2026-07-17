import { css as z } from "lit";
function A() {
  var r, t, e;
  try {
    const o = typeof Salla < "u" ? (t = (r = Salla == null ? void 0 : Salla.lang) == null ? void 0 : r.getLocale) == null ? void 0 : t.call(r) : void 0, i = (e = document.documentElement.lang) == null ? void 0 : e.split(/[-_]/)[0];
    return (o || i || "ar").toLowerCase();
  } catch {
    return "ar";
  }
}
function h(r, t = "") {
  if (r == null) return t;
  if (typeof r == "string")
    return r.trim() || t;
  if (typeof r == "number" && Number.isFinite(r))
    return String(r);
  if (typeof r == "object") {
    const e = r, i = [A(), "ar", "en", ...Object.keys(e)];
    for (const s of i) {
      const a = e[s];
      if (typeof a == "string" && a.trim()) return a.trim();
      if (typeof a == "number" && Number.isFinite(a)) return String(a);
    }
  }
  return t;
}
function $(r) {
  return Object.entries(r || {}).reduce((t, [e, o]) => {
    const i = e.includes(".") ? e.split(".").pop() : e;
    return t[i] = o, t;
  }, {});
}
function F(r) {
  return Array.isArray(r) ? r.filter((t) => !!t && typeof t == "object").map((t) => $(t)) : [];
}
function y(r, t = 0) {
  return typeof r == "number" && Number.isFinite(r) ? r : typeof r == "string" && r.trim() !== "" && Number.isFinite(Number(r)) ? Number(r) : r && typeof r == "object" && "value" in r ? y(r.value, t) : t;
}
function x(r, t = 0) {
  if (typeof r == "number" && Number.isFinite(r)) return r;
  if (typeof r == "string" && r.trim() !== "") {
    const e = Number(r.replace(",", "."));
    return Number.isFinite(e) ? e : t;
  }
  return t;
}
function L(r, t, e) {
  return Math.min(e, Math.max(t, r));
}
function _(r, t = !1) {
  if (typeof r == "boolean") return r;
  if (typeof r == "string") {
    const e = r.toLowerCase().trim();
    if (["true", "1", "yes", "on"].includes(e)) return !0;
    if (["false", "0", "no", "off", ""].includes(e)) return !1;
  }
  return typeof r == "number" ? r !== 0 : t;
}
function w(r) {
  if (!r) return "";
  if (typeof r == "string") {
    const t = r.trim();
    return N(t) ? t : "";
  }
  if (Array.isArray(r)) {
    for (const t of r) {
      const e = w(t);
      if (e) return e;
    }
    return "";
  }
  if (typeof r == "object") {
    const t = r, e = [
      t.url,
      t.href,
      t.link,
      t.value,
      t.custom,
      t.path
    ];
    for (const o of e) {
      const i = w(o);
      if (i) return i;
    }
  }
  return "";
}
function N(r) {
  if (!r || r === "#") return !1;
  if (r.startsWith("/") || r.startsWith("#") || r.startsWith("?") || r.startsWith("mailto:") || r.startsWith("tel:") || r.startsWith("whatsapp:"))
    return !0;
  try {
    const t = new URL(r, window.location.origin);
    return ["http:", "https:", "mailto:", "tel:"].includes(t.protocol);
  } catch {
    return !1;
  }
}
function C(r) {
  if (!r || typeof r != "string") return !1;
  try {
    const t = new URL(r, window.location.origin);
    return !!["http:", "https:"].includes(t.protocol);
  } catch {
    return !1;
  }
}
function W(r, t = "ر.س") {
  return Number.isFinite(r) ? `${r.toLocaleString(void 0, {
    minimumFractionDigits: r % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2
  })} ${t}`.trim() : "";
}
function B(r = "ر.س") {
  var t, e, o, i, s, a;
  try {
    const m = window, n = m.Salla || m.salla, d = ((e = (t = n == null ? void 0 : n.config) == null ? void 0 : t.currency) == null ? void 0 : e.symbol) || ((i = (o = n == null ? void 0 : n.config) == null ? void 0 : o.currency) == null ? void 0 : i.code) || ((s = n == null ? void 0 : n.currency) == null ? void 0 : s.symbol) || ((a = n == null ? void 0 : n.currency) == null ? void 0 : a.code);
    if (typeof d == "string" && d.trim())
      return d.trim();
    const f = document.documentElement.getAttribute("data-currency");
    if (f != null && f.trim()) return f.trim();
  } catch {
  }
  return r;
}
function P(r, t) {
  const e = /* @__PURE__ */ new Map();
  for (const o of r) {
    const i = String(o[t] ?? "").trim();
    if (!i) continue;
    const s = e.get(i) || [];
    s.push(o), e.set(i, s);
  }
  return e;
}
function T(r, t = "group_order") {
  return [...r].sort(
    (e, o) => x(e[t], 0) - x(o[t], 0)
  );
}
function U(r, t, e, o) {
  var s, a;
  return ((a = typeof document < "u" ? (s = document.documentElement.lang) == null ? void 0 : s.split(/[-_]/)[0] : "ar") == null ? void 0 : a.toLowerCase()) === "en" ? t : o || r;
}
function D(r, t) {
  try {
    const e = localStorage.getItem(r);
    return e ? JSON.parse(e) : t;
  } catch {
    return t;
  }
}
function R(r, t) {
  try {
    localStorage.setItem(r, JSON.stringify(t));
  } catch {
  }
}
function I(r, t) {
  const e = String(r || "").replace(/\D+/g, "");
  if (!e || e.length < 8) return "";
  const o = encodeURIComponent(t || "");
  return `https://wa.me/${e}${o ? `?text=${o}` : ""}`;
}
async function O(r) {
  var t;
  if (!r) return !1;
  try {
    if ((t = navigator.clipboard) != null && t.writeText)
      return await navigator.clipboard.writeText(r), !0;
  } catch {
  }
  try {
    const e = document.createElement("textarea");
    e.value = r, e.setAttribute("readonly", ""), e.style.position = "fixed", e.style.opacity = "0", document.body.appendChild(e), e.select();
    const o = document.execCommand("copy");
    return document.body.removeChild(e), o;
  } catch {
    return !1;
  }
}
function E() {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return !1;
  }
}
function V(r, t, e) {
  const o = r || {};
  return {
    bg: String(o[`${t}bg`] ?? (e == null ? void 0 : e.bg) ?? "#faf7f5"),
    text: String(o[`${t}text`] ?? (e == null ? void 0 : e.text) ?? "#2b211c"),
    muted: String(o[`${t}muted`] ?? (e == null ? void 0 : e.muted) ?? "#7a6a62"),
    accent: String(o[`${t}accent`] ?? (e == null ? void 0 : e.accent) ?? "#8b5e4b"),
    card: String(o[`${t}card`] ?? (e == null ? void 0 : e.card) ?? "#ffffff"),
    border: String(o[`${t}border`] ?? (e == null ? void 0 : e.border) ?? "#e8ddd6"),
    buttonBg: String(o[`${t}button_bg`] ?? (e == null ? void 0 : e.buttonBg) ?? "#8b5e4b"),
    buttonColor: String(
      o[`${t}button_color`] ?? (e == null ? void 0 : e.buttonColor) ?? "#ffffff"
    ),
    radius: `${y(o[`${t}radius`], 16)}px`,
    spaceDesktop: y(
      o[`${t}space_desktop`],
      48
    ),
    spaceMobile: y(
      o[`${t}space_mobile`],
      28
    ),
    animate: _(o[`${t}animate`], !0),
    fullWidth: _(o[`${t}full_width`], !1)
  };
}
function J(r) {
  return {
    "--section-bg": r.bg,
    "--text-color": r.text,
    "--muted-color": r.muted,
    "--accent-color": r.accent,
    "--card-bg": r.card,
    "--border-color": r.border,
    "--button-bg": r.buttonBg,
    "--button-color": r.buttonColor,
    "--section-radius": r.radius,
    "--space-desktop": `${r.spaceDesktop}px`,
    "--space-mobile": `${r.spaceMobile}px`
  };
}
function S(r, t = "") {
  if (typeof r == "string" && r.trim()) return r.trim();
  if (Array.isArray(r) && r[0]) {
    const e = r[0];
    if (typeof e == "string") return e;
    if (e && typeof e == "object" && "value" in e)
      return String(e.value ?? t);
    if (e && typeof e == "object" && "key" in e)
      return String(e.key ?? t);
  }
  if (r && typeof r == "object") {
    const e = r;
    if (Array.isArray(e.selected) && e.selected[0])
      return S(e.selected, t);
    if ("value" in e && e.value != null && !Array.isArray(e.value))
      return String(e.value ?? t);
    if (Array.isArray(e.value) && e.value[0])
      return S(e.value, t);
  }
  return t;
}
function q(r) {
  const t = h(r, "");
  return t ? t.split(/[,،|/]/).map((e) => e.trim()).filter(Boolean) : [];
}
function l(r) {
  if (typeof r == "number" && Number.isFinite(r)) return r;
  if (typeof r == "string" && r.trim() !== "") return x(r, 0);
  if (r && typeof r == "object") {
    const t = r;
    if ("amount" in t) return l(t.amount);
    if ("value" in t) return l(t.value);
  }
  return 0;
}
function u(r) {
  if (!r) return "";
  if (typeof r == "string") {
    const t = r.trim();
    return C(t) || t.startsWith("/") ? t : "";
  }
  if (Array.isArray(r)) {
    for (const t of r) {
      const e = u(t);
      if (e) return e;
    }
    return "";
  }
  if (typeof r == "object") {
    const t = r, e = [t.url, t.src, t.image, t.thumbnail, t.original];
    for (const o of e) {
      const i = u(o);
      if (i) return i;
    }
  }
  return "";
}
function v(r) {
  if (r == null) return 0;
  if (typeof r == "number" && Number.isFinite(r))
    return Math.max(0, Math.min(5, r));
  if (typeof r == "string") return v(x(r, 0));
  if (typeof r == "object") {
    const t = r, e = t.stars ?? t.rate ?? t.rating ?? t.average ?? t.value;
    if (e != null && e !== r) return v(e);
  }
  return 0;
}
function G(r) {
  if (!r) return null;
  let t = r;
  if (Array.isArray(r))
    t = r[0];
  else if (typeof r == "object") {
    const c = r, k = Array.isArray(c.selected) ? c.selected : [], p = Array.isArray(c.value) ? c.value : [];
    k.length ? t = k[0] : p.length ? t = (typeof p[0] == "object" && p[0], p[0]) : c.product && typeof c.product == "object" ? t = c.product : c.value && typeof c.value == "object" && !Array.isArray(c.value) && (t = c.value);
  }
  if (t != null && (typeof t == "string" || typeof t == "number")) {
    const c = String(t).trim();
    return c ? { id: c, name: "", image: "", url: "", price: 0, old_price: 0, rating: 0 } : null;
  }
  if (!t || typeof t != "object") return null;
  const e = t;
  let o = String(e.id ?? e.product_id ?? "").trim();
  if (!o && e.value != null && typeof e.value != "object" && (o = String(e.value).trim()), !o && e.value && typeof e.value == "object") {
    const c = e.value;
    o = String(c.id ?? c.product_id ?? c.value ?? "").trim();
  }
  const i = h(e.name, "").trim() || h(e.label, "").trim() || h(e.title, "").trim(), s = u(e.image) || u(e.main_image) || u(e.thumbnail) || u(e.images) || (e.value && typeof e.value == "object" ? u(e.value.image) : ""), a = w(
    e.url || e.permalink || e.link || (e.value && typeof e.value == "object" ? e.value.url : "")
  ), m = _(e.on_sale) || _(e.is_on_sale), n = l(
    e.sale_price ?? e.sale_price_amount ?? e.discounted_price
  ), d = l(
    e.regular_price ?? e.regular_price_amount ?? e.price_before
  ), f = l(e.price ?? e.price_amount);
  let b = f, g = 0;
  m && n > 0 ? (b = n, g = d > n ? d : 0) : d > f && f > 0 ? (b = f, g = d) : n > 0 && d > n && (b = n, g = d);
  const j = v(e.rating ?? e.rate ?? e.rating_stars);
  return !o && !i && !s && !a ? null : { id: o, name: i, image: s, url: a, price: b, old_price: g, rating: j };
}
const H = z`
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

  /* —— Salla theme-raed style product card —— */
  .fs-product-card {
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    text-align: start;
    background: var(--card-bg, #fff);
    border: 1px solid color-mix(in srgb, var(--border-color, #e8ddd6) 85%, transparent);
    border-radius: calc(var(--section-radius, 16px) * 0.95);
    box-shadow: 0 4px 16px rgba(43, 33, 28, 0.05);
    transition:
      border-color 0.25s ease,
      box-shadow 0.25s ease,
      transform 0.25s ease;
  }

  .fs-product-card:hover {
    border-color: color-mix(in srgb, var(--accent-color, #8b5e4b) 30%, var(--border-color, #e8ddd6));
    box-shadow: 0 18px 38px rgba(43, 33, 28, 0.12);
    transform: translateY(-4px);
  }

  .fs-product-card--selectable {
    cursor: pointer;
  }

  .fs-product-card--selectable:focus-visible {
    outline: 2px solid var(--accent-color, #8b5e4b);
    outline-offset: 2px;
  }

  .fs-product-card.is-selected {
    border-color: var(--accent-color, #8b5e4b);
    box-shadow:
      0 0 0 2px color-mix(in srgb, var(--accent-color, #8b5e4b) 32%, transparent),
      0 16px 34px rgba(43, 33, 28, 0.12);
  }

  .fs-product-card__media {
    position: relative;
    aspect-ratio: 3 / 4;
    overflow: hidden;
    background: color-mix(in srgb, var(--border-color, #e8ddd6) 45%, #fff);
  }

  /* soft scrim so overlays stay legible on light images */
  .fs-product-card__media::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(20, 14, 12, 0.14) 0%,
      transparent 22%,
      transparent 78%,
      rgba(20, 14, 12, 0.05) 100%
    );
    opacity: 0;
    transition: opacity 0.25s ease;
    pointer-events: none;
  }

  .fs-product-card:hover .fs-product-card__media::after {
    opacity: 1;
  }

  .fs-product-card__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.5s cubic-bezier(0.2, 0.6, 0.2, 1);
  }

  .fs-product-card:hover .fs-product-card__img {
    transform: scale(1.06);
  }

  .fs-product-card__img--empty {
    background: linear-gradient(145deg, #3a2c26, #1c1613);
  }

  .fs-product-card__badge {
    position: absolute;
    top: 0.65rem;
    inset-inline-start: 0.65rem;
    z-index: 2;
    padding: 0.24rem 0.6rem;
    border-radius: 999px;
    background: linear-gradient(
      135deg,
      #d1495b,
      color-mix(in srgb, #d1495b 70%, #8b2f3d)
    );
    color: #fff;
    font-size: 0.66rem;
    font-weight: 800;
    letter-spacing: 0.02em;
    box-shadow: 0 4px 12px rgba(160, 40, 60, 0.35);
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
    background: var(--accent-color, #8b5e4b);
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
    color: var(--accent-color, #8b5e4b);
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
    font-weight: 800;
    color: var(--accent-color, #8b5e4b);
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
    width: 100%;
    margin-top: 0.6rem;
    min-height: 42px;
    font-size: 0.85rem;
    font-weight: 700;
    transition:
      background 0.2s ease,
      color 0.2s ease,
      border-color 0.2s ease,
      transform 0.15s ease;
  }

  .fs-product-card__add:hover {
    background: var(--button-bg, #8b5e4b);
    color: var(--button-color, #fff);
    border-color: var(--button-bg, #8b5e4b);
  }

  .fs-product-card__add:active {
    transform: scale(0.98);
  }

  .fs-product-card__link {
    margin-top: 0.2rem;
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--accent-color, #8b5e4b);
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
    .fs-pulse,
    .fs-fade,
    .fs-curtain,
    .fs-celebrate,
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
  R as A,
  q as B,
  J as a,
  w as b,
  O as c,
  x as d,
  u as e,
  G as f,
  A as g,
  l as h,
  _ as i,
  W as j,
  P as k,
  h as l,
  T as m,
  F as n,
  I as o,
  E as p,
  S as q,
  V as r,
  H as s,
  U as t,
  y as u,
  L as v,
  N as w,
  C as x,
  B as y,
  D as z
};
