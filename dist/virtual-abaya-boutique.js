import { css as U, LitElement as Y, html as n, nothing as m } from "lit";
import { property as W, state as C } from "lit/decorators.js";
import { classMap as S } from "lit/directives/class-map.js";
import { styleMap as E } from "lit/directives/style-map.js";
import { n as V, l as u, v as R, u as F, b as q, q as K, e as g, h as x, f as G, s as J, p as N, w as b, r as Q, i as X, t as d, a as ee } from "./sharedStyles-C1vUkqEN.js";
import { e as w, u as te, t as re, a as ae, f as oe, r as ie } from "./productPicker-Do8cFPDM.js";
const se = U`
  .vab-shell {
    display: grid;
    gap: 1.25rem;
  }

  @media (min-width: 960px) {
    .vab-shell {
      grid-template-columns: minmax(0, 1.15fr) minmax(18rem, 0.95fr);
      align-items: stretch;
      gap: 1.5rem;
    }
  }

  .vab-map-panel {
    position: relative;
    border-radius: var(--section-radius, 18px);
    overflow: hidden;
    background:
      radial-gradient(circle at 20% 10%, color-mix(in srgb, var(--accent-color, #8b5e4b) 16%, transparent), transparent 46%),
      var(--card-bg, #fff);
    border: 1px solid var(--border-color, #e8ddd6);
    box-shadow: 0 16px 40px rgba(43, 33, 28, 0.08);
    min-height: 280px;
  }

  .vab-map {
    display: block;
    width: 100%;
    height: 100%;
    min-height: 280px;
    max-height: 560px;
    object-fit: cover;
    aspect-ratio: 4 / 5;
  }

  @media (min-width: 960px) {
    .vab-map {
      aspect-ratio: 3 / 4;
      max-height: none;
      min-height: 440px;
    }
  }

  .vab-map-veil {
    pointer-events: none;
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(43, 33, 28, 0.08) 0%,
      rgba(43, 33, 28, 0.02) 35%,
      rgba(43, 33, 28, 0.28) 100%
    );
  }

  .vab-map-caption {
    position: absolute;
    inset-inline: 1rem;
    bottom: 1rem;
    z-index: 2;
    color: #fff;
    text-shadow: 0 2px 14px rgba(0, 0, 0, 0.35);
  }

  .vab-map-caption strong {
    display: block;
    font-size: 1rem;
    margin-bottom: 0.15rem;
  }

  .vab-map-caption span {
    font-size: 0.82rem;
    opacity: 0.92;
  }

  .vab-hotspot {
    position: absolute;
    z-index: 3;
    width: 2.75rem;
    height: 2.75rem;
    margin: -1.375rem 0 0 -1.375rem;
    border: 2px solid rgba(255, 255, 255, 0.95);
    border-radius: 50%;
    background: var(--spot-color, var(--accent-color, #8b5e4b));
    box-shadow:
      0 0 0 6px color-mix(in srgb, var(--spot-color, #8b5e4b) 18%, transparent),
      0 8px 20px rgba(43, 33, 28, 0.28);
    cursor: pointer;
    transition: transform 0.22s ease, box-shadow 0.22s ease;
    color: #fff;
    font: inherit;
    font-size: 0.72rem;
    font-weight: 700;
  }

  .vab-hotspot:hover,
  .vab-hotspot[aria-pressed='true'] {
    transform: scale(1.1);
    box-shadow:
      0 0 0 8px color-mix(in srgb, var(--spot-color, #8b5e4b) 24%, transparent),
      0 10px 24px rgba(43, 33, 28, 0.32);
  }

  .vab-hotspot--pulse.fs-animate::after {
    content: '';
    position: absolute;
    inset: -7px;
    border-radius: inherit;
    border: 2px solid var(--spot-color, var(--accent-color, #8b5e4b));
    animation: vab-pulse 2s ease-out infinite;
  }

  @keyframes vab-pulse {
    0% {
      transform: scale(0.9);
      opacity: 0.85;
    }
    100% {
      transform: scale(1.7);
      opacity: 0;
    }
  }

  .vab-hotspot__index {
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
  }

  .vab-gallery {
    display: grid;
    gap: 0.85rem;
    align-content: start;
  }

  .vab-gallery__head {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .vab-gallery__head h3 {
    margin: 0;
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--text-color, #2b211c);
  }

  .vab-gallery__count {
    font-size: 0.8rem;
    color: var(--muted-color, #7a6a62);
  }

  .vab-cards {
    display: grid;
    gap: 0.85rem;
  }

  .vab-card {
    position: relative;
    display: grid;
    grid-template-columns: 5.5rem minmax(0, 1fr);
    gap: 0.85rem;
    padding: 0.85rem;
    border: 1px solid var(--border-color, #e8ddd6);
    border-radius: calc(var(--section-radius, 18px) * 0.75);
    background: var(--card-bg, #fff);
    box-shadow: 0 8px 24px rgba(43, 33, 28, 0.05);
    cursor: pointer;
    text-align: start;
    color: inherit;
    font: inherit;
    transition:
      border-color 0.2s ease,
      transform 0.2s ease,
      box-shadow 0.2s ease,
      background 0.2s ease;
  }

  .vab-card:hover {
    transform: translateY(-2px);
    border-color: color-mix(in srgb, var(--accent-color, #8b5e4b) 45%, var(--border-color, #e8ddd6));
  }

  .vab-card--active {
    border-color: var(--accent-color, #8b5e4b);
    background:
      linear-gradient(
        135deg,
        color-mix(in srgb, var(--accent-color, #8b5e4b) 10%, var(--card-bg, #fff)),
        var(--card-bg, #fff) 55%
      );
    box-shadow: 0 14px 32px rgba(43, 33, 28, 0.1);
  }

  .vab-card__media {
    position: relative;
    width: 5.5rem;
    aspect-ratio: 3 / 4;
    overflow: hidden;
    border-radius: calc(var(--section-radius, 18px) * 0.55);
    background: color-mix(in srgb, var(--border-color, #e8ddd6) 55%, transparent);
  }

  .vab-card__media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .vab-card__dot {
    position: absolute;
    top: 0.4rem;
    inset-inline-start: 0.4rem;
    width: 0.65rem;
    height: 0.65rem;
    border-radius: 50%;
    border: 1.5px solid #fff;
    background: var(--spot-color, var(--accent-color, #8b5e4b));
  }

  .vab-card__body {
    display: grid;
    grid-template-rows: 1fr auto;
    align-content: stretch;
    gap: 0.65rem;
    min-width: 0;
  }

  .vab-card__text {
    display: grid;
    gap: 0.3rem;
    min-width: 0;
  }

  .vab-card__title {
    margin: 0;
    font-size: 0.98rem;
    font-weight: 700;
    color: var(--text-color, #2b211c);
  }

  .vab-card__desc {
    margin: 0;
    font-size: 0.82rem;
    line-height: 1.55;
    color: var(--muted-color, #7a6a62);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .vab-card__actions {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.55rem;
    margin-top: 0;
    min-height: 2.25rem;
  }

  .vab-card__status {
    display: inline-flex;
    align-items: center;
    min-height: auto;
    padding: 0;
    border: none;
    border-radius: 0;
    background: transparent;
    color: var(--muted-color, #7a6a62);
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    white-space: nowrap;
  }

  .vab-card__status--on {
    color: var(--accent-color, #8b5e4b);
  }

  .vab-card__status--on::before {
    content: '';
    width: 0.4rem;
    height: 0.4rem;
    margin-inline-end: 0.4rem;
    border-radius: 50%;
    background: var(--accent-color, #8b5e4b);
  }

  .vab-card__cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    min-height: 44px;
    padding: 0.45rem 0.95rem;
    border-radius: calc(var(--section-radius, 18px) * 0.4);
    background: var(--button-bg, #8b5e4b);
    color: var(--button-color, #fff);
    text-decoration: none;
    font-size: 0.8rem;
    font-weight: 600;
    white-space: nowrap;
    line-height: 1;
  }

  .vab-card__cta:hover {
    opacity: 0.92;
  }

  .vab-detail {
    margin-top: 0.25rem;
    padding: 1rem;
    border-radius: calc(var(--section-radius, 18px) * 0.8);
    border: 1px solid color-mix(in srgb, var(--accent-color, #8b5e4b) 28%, var(--border-color, #e8ddd6));
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 6%, var(--card-bg, #fff));
    display: grid;
    gap: 0.65rem;
    animation: vab-fade 0.35s ease;
  }

  .vab-detail__media {
    border-radius: calc(var(--section-radius, 18px) * 0.6);
    overflow: hidden;
    aspect-ratio: 16 / 10;
    background: var(--border-color, #e8ddd6);
  }

  .vab-detail__media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .vab-detail__title {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 700;
  }

  .vab-detail__desc {
    margin: 0;
    color: var(--muted-color, #7a6a62);
    line-height: 1.65;
    font-size: 0.9rem;
  }

  .vab-detail__actions {
    display: grid;
    margin-top: 0.25rem;
  }

  .vab-detail__cta {
    width: 100%;
    justify-content: center;
    border-radius: calc(var(--section-radius, 18px) * 0.45);
  }

  .vab-slider {
    width: 100%;
    min-width: 0;
    overflow: hidden;
  }

  .vab-slider salla-products-slider {
    display: block;
    width: 100%;
  }

  .vab-products {
    display: flex;
    gap: 0.75rem;
    overflow-x: auto;
    padding: 0.15rem 0.1rem 0.45rem;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
  }

  .vab-products::-webkit-scrollbar {
    height: 4px;
  }

  .vab-products::-webkit-scrollbar-thumb {
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 45%, transparent);
    border-radius: 999px;
  }

  .vab-product {
    flex: 0 0 7.5rem;
    scroll-snap-align: start;
    display: grid;
    gap: 0.4rem;
    text-decoration: none;
    color: inherit;
    min-width: 0;
  }

  .vab-product--link:hover .vab-product__name {
    color: var(--accent-color, #8b5e4b);
  }

  .vab-product__media {
    aspect-ratio: 3 / 4;
    border-radius: calc(var(--section-radius, 18px) * 0.45);
    overflow: hidden;
    background: color-mix(in srgb, var(--border-color, #e8ddd6) 55%, transparent);
  }

  .vab-product__media img,
  .vab-product__placeholder {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .vab-product__placeholder {
    min-height: 100%;
    background:
      linear-gradient(
        145deg,
        color-mix(in srgb, var(--accent-color, #8b5e4b) 18%, #ddd),
        color-mix(in srgb, var(--border-color, #e8ddd6) 70%, #fff)
      );
  }

  .vab-product__body {
    display: grid;
    gap: 0.15rem;
  }

  .vab-product__name {
    font-size: 0.78rem;
    font-weight: 600;
    line-height: 1.35;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .vab-product__price {
    font-size: 0.74rem;
    font-weight: 700;
    color: var(--accent-color, #8b5e4b);
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
    align-items: baseline;
  }

  .vab-product__price s {
    font-weight: 500;
    color: var(--muted-color, #7a6a62);
    font-size: 0.68rem;
  }

  .vab-products__status {
    margin: 0;
    font-size: 0.82rem;
    color: var(--muted-color, #7a6a62);
  }

  @keyframes vab-fade {
    from {
      opacity: 0;
      transform: translateY(6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 959px) {
    .vab-shell {
      gap: 1.1rem;
    }

    .vab-map-panel,
    .vab-map {
      min-height: 0;
      max-height: min(20rem, 48vh);
      aspect-ratio: 1 / 1;
    }

    .vab-map-caption {
      inset-inline: 0.75rem;
      bottom: 0.75rem;
      padding: 0.55rem 0.7rem;
    }

    .vab-map-caption strong {
      font-size: 0.9rem;
    }

    .vab-map-caption span {
      font-size: 0.72rem;
    }

    .vab-gallery__head h3 {
      font-size: 1.05rem;
    }

    .vab-card__actions {
      flex-wrap: wrap;
      gap: 0.45rem;
    }

    .vab-card__cta {
      margin-inline-start: auto;
    }

    .vab-products {
      margin-inline: -0.25rem;
      padding-inline: 0.15rem;
    }

    .vab-detail {
      padding: 0.9rem;
    }
  }

  @media (max-width: 639px) {
    .vab-map-panel,
    .vab-map {
      max-height: min(16.5rem, 44vh);
    }

    .vab-card {
      grid-template-columns: 4.25rem minmax(0, 1fr);
      gap: 0.65rem;
      padding: 0.7rem;
    }

    .vab-card__media {
      width: 4.25rem;
    }

    .vab-card__body {
      gap: 0.5rem;
    }

    .vab-card__title {
      font-size: 0.92rem;
    }

    .vab-card__desc {
      font-size: 0.76rem;
      -webkit-line-clamp: 2;
    }

    .vab-card__actions {
      flex-direction: column;
      align-items: stretch;
    }

    .vab-card__cta {
      width: 100%;
      margin-inline-start: 0;
    }

    .vab-detail__actions .fs-btn {
      width: 100%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .vab-hotspot--pulse.fs-animate::after,
    .vab-card,
    .vab-detail {
      animation: none !important;
      transition: none !important;
    }

    .vab-card:hover {
      transform: none;
    }
  }
`, h = /* @__PURE__ */ new Set(["none", "categories", "sales", "latest", "selected"]);
function _(r) {
  return te(r);
}
function ne(r) {
  const e = !!(u(r.name).trim() || u(r.label).trim()), t = !!(g(r.image) || g(r.thumbnail) || g(r.main_image) || r.value && typeof r.value == "object" && g(r.value.image)), a = !!q(r.url || r.permalink || r.link), o = x(r.price) > 0 || x(r.sale_price) > 0 || x(r.regular_price) > 0;
  return e && (t || a || o);
}
function j(r) {
  if (!r || typeof r != "object") return !1;
  const e = r, t = String(e.value ?? e.key ?? "").toLowerCase().trim();
  return h.has(t) && !e.id && !e.product_id;
}
function L(r) {
  const e = _(r);
  return !e.length || e.length === 1 && j(e[0]) ? !1 : e.some((t) => {
    if (t == null) return !1;
    if (typeof t == "number" || typeof t == "string") {
      const i = String(t).trim();
      return !!i && !h.has(i.toLowerCase());
    }
    if (typeof t != "object" || j(t)) return !1;
    const a = t;
    if (ne(a)) return !0;
    const o = w(a);
    return !!o && !h.has(o.toLowerCase());
  });
}
function ce(r) {
  if (L(r)) return "selected";
  const e = K(r, "").toLowerCase();
  return !e || e === "none" ? "" : ["categories", "sales", "latest", "selected"].includes(e) ? e : "";
}
function de(r) {
  const t = K(r, "").toLowerCase() || u(r).toLowerCase();
  return ["left", "right", "top", "bottom"].includes(t) ? t : "";
}
function le(r) {
  const e = [
    r.chosen_products,
    r.selected_products,
    r.product_ids,
    r.products_list,
    r["chosen_products.selected"]
  ];
  for (const t of e)
    if (_(t).length || L(t))
      return t;
  return L(r.products) ? r.products : r.chosen_products ?? null;
}
function P(r) {
  if (r == null) return null;
  if (typeof r == "number" || typeof r == "string") {
    const B = String(r).trim();
    return !B || h.has(B.toLowerCase()) ? null : { id: B, name: "", image: "", url: "", price: 0, old_price: 0 };
  }
  if (typeof r != "object" || j(r)) return null;
  const e = G(r);
  if (e && (e.name || e.image || e.url || e.id))
    return e.id && h.has(e.id.toLowerCase()) && !e.name && !e.image ? null : {
      id: e.id,
      name: e.name,
      image: e.image,
      url: e.url,
      price: e.price,
      old_price: e.old_price
    };
  const t = r, a = t.value && typeof t.value == "object" && !Array.isArray(t.value) ? t.value : null, o = u(t.name).trim() || u(t.label).trim() || u(t.title).trim() || (a ? u(a.name).trim() || u(a.label).trim() : ""), i = g(t.image) || g(t.thumbnail) || g(t.main_image) || (a ? g(a.image) : ""), s = q(
    t.url || t.permalink || t.link || (a == null ? void 0 : a.url) || (a == null ? void 0 : a.permalink)
  ), c = w(t), l = a || t, y = !!(l.on_sale || l.is_on_sale), p = x(l.sale_price), f = x(l.regular_price), k = x(l.price);
  let I = k, A = 0;
  return y && p > 0 ? (I = p, A = f > p ? f : 0) : f > k && k > 0 && (I = k, A = f), !o && !i && !s && !c || c && h.has(c.toLowerCase()) && !o && !i ? null : { id: c, name: o, image: i, url: s, price: I, old_price: A };
}
function pe(r) {
  return V(r).map((e) => P(e)).filter((e) => !!e);
}
function ue(r) {
  return V(r).map((e, t) => {
    const a = u(e.spot_name), o = u(e.spot_id) || a || `zone-${t + 1}`, i = le(e);
    let s = ce(e.products);
    return !s && L(i) && (s = "selected"), {
      spot_id: o,
      spot_name: a,
      spot_desc: u(e.spot_desc),
      pos_x: R(F(e.pos_x, 50), 0, 100),
      pos_y: R(F(e.pos_y, 50), 0, 100),
      spot_image: String(e.spot_image || "").trim(),
      spot_url: q(e.spot_url),
      spot_btn: u(e.spot_btn),
      spot_color: String(e.spot_color || "").trim() || "#8b5e4b",
      card_dir: de(e.card_dir),
      products_source: s,
      chosen_products: i,
      category: e.category,
      products_limit: R(F(e.products_limit, 6) || 6, 1, 24),
      demo_products: pe(e.demo_products)
    };
  }).filter((e) => e.spot_name.trim() !== "" || e.spot_image !== "");
}
function me(r) {
  return r.map((e) => P(e)).filter((e) => !!e && !!(e.name || e.image || e.id));
}
async function H(r) {
  return me(await ae(r));
}
async function M(r, e) {
  const t = [...new Set(r.filter(Boolean))].slice(0, e);
  if (!t.length) return [];
  const a = await oe(t);
  return t.map((o) => P(a.get(o) ?? o)).filter((o) => !!o && !!(o.name || o.image || o.id)).slice(0, e);
}
function O(r, e) {
  const t = _(r), a = [], o = /* @__PURE__ */ new Set();
  for (const i of t) {
    if (a.length >= e) break;
    const s = P(i);
    if (!s || !s.name && !s.image && !s.id) continue;
    const c = s.id || `${s.name}|${s.image}`;
    c && o.has(c) || (c && o.add(c), a.push(s));
  }
  return a;
}
function z(r) {
  return _(r).map((e) => w(e)).filter((e) => !!e && !h.has(e.toLowerCase()));
}
async function be(r, e, t) {
  if (r === "latest")
    return H({ source: "latest", limit: t });
  if (r === "sales") {
    const a = [
      { source: "sales", source_value: "sales", limit: t },
      { source: "sales", limit: t },
      { source: "offers", limit: t }
    ];
    for (const o of a) {
      const i = await H(o);
      if (i.length) return i;
    }
    return [];
  }
  if (r === "categories") {
    const a = re(
      _(e.category).map((o) => w(o)).filter((o) => !!o && !h.has(o.toLowerCase()))
    );
    return a.length ? H({
      source: "categories",
      source_value: a.length === 1 ? a[0] : a,
      limit: t
    }) : [];
  }
  if (r === "selected") {
    const a = O(e.chosen_products, t);
    if (a.some((i) => i.name || i.image)) {
      const i = z(e.chosen_products);
      if (i.length && !a.every((s) => s.image || s.price > 0)) {
        const s = await M(i, t);
        if (s.some((c) => c.name || c.image))
          return s;
      }
      return a;
    }
    const o = z(e.chosen_products);
    if (o.length) {
      const i = await M(o, t);
      return i.some((s) => s.name || s.image) ? i : a.length ? a : o.slice(0, t).map((s) => ({
        id: s,
        name: "",
        image: "",
        url: "",
        price: 0,
        old_price: 0
      }));
    }
    return a;
  }
  return [];
}
async function he(r) {
  const e = r.products_limit || 6;
  let t = r.products_source;
  !t && z(r.chosen_products).length && (t = "selected");
  const a = _(r.category).map((i) => w(i)).filter((i) => !!i && !h.has(i.toLowerCase()));
  if (!t && a.length && (t = "categories"), !t || t === "categories" && !a.length)
    return r.demo_products.slice(0, e);
  const o = await be(t, r, e);
  if (o.length) return o.slice(0, e);
  if (t === "selected") {
    const i = O(r.chosen_products, e);
    if (i.length) return i;
  }
  return r.demo_products.slice(0, e);
}
function Z(r, e) {
  if (!(r > 0)) return "";
  const t = Number.isInteger(r) ? String(r) : r.toFixed(2).replace(/\.00$/, "");
  return e ? `${t} ${e}` : t;
}
function ve(r) {
  return r && typeof r == "object" ? r : {};
}
function T(r) {
  const e = z(r.chosen_products).join(","), t = _(r.category).map((o) => w(o)).filter(Boolean).join(","), a = _(r.chosen_products).length;
  return [
    r.spot_id,
    r.products_source || "none",
    r.products_limit,
    t,
    e,
    a
  ].join("|");
}
var fe = Object.defineProperty, $ = (r, e, t, a) => {
  for (var o = void 0, i = r.length - 1, s; i >= 0; i--)
    (s = r[i]) && (o = s(e, t, o) || o);
  return o && fe(e, t, o), o;
};
const D = class D extends Y {
  constructor() {
    super(...arguments), this.config = {}, this.activeId = null, this.products = [], this.productsLoading = !1, this.nativeSliderReady = !1, this.productCache = /* @__PURE__ */ new Map(), this.loadToken = 0, this.boundLangHandler = () => this.requestUpdate(), this.boundKeyHandler = (e) => {
      e.key !== "Escape" || !this.activeId || (this.activeId = null);
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler), window.addEventListener("keydown", this.boundKeyHandler), this.watchNativeSlider(), this.ensureActiveSpot();
  }
  watchNativeSlider() {
    if (!(typeof customElements > "u")) {
      if (customElements.get("salla-products-slider")) {
        this.nativeSliderReady = !0;
        return;
      }
      customElements.whenDefined("salla-products-slider").then(() => {
        this.nativeSliderReady = !0;
      }).catch(() => {
      });
    }
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), window.removeEventListener("keydown", this.boundKeyHandler), super.disconnectedCallback();
  }
  updated(e) {
    e.has("config") && (this.productCache.clear(), this.ensureActiveSpot());
  }
  ensureActiveSpot() {
    const e = this.hotspots;
    if (!e.length) {
      this.activeId = null, this.products = [];
      return;
    }
    (!this.activeId || !e.some((t) => t.spot_id === this.activeId)) && (this.activeId = e[0].spot_id), this.loadProductsForActive();
  }
  get cfg() {
    return ve(this.config);
  }
  get hotspots() {
    return ue(this.cfg.vab_hotspots);
  }
  get currency() {
    return String(this.cfg.vab_currency || "ر.س").trim() || "ر.س";
  }
  selectSpot(e) {
    const t = this.activeId === e;
    if (this.activeId = e, t && (this.products.length || this.productsLoading))
      return;
    if (t) {
      const i = this.hotspots.find((s) => s.spot_id === e);
      i && this.productCache.delete(T(i));
    }
    this.loadProductsForActive();
    const a = this.renderRoot.querySelectorAll("[data-spot-id]"), o = Array.from(a).find((i) => i.dataset.spotId === e);
    o == null || o.scrollIntoView({
      behavior: N() ? "auto" : "smooth",
      block: "nearest"
    });
  }
  async loadProductsForActive() {
    const e = this.hotspots.find((l) => l.spot_id === this.activeId);
    if (!e) {
      this.products = [], this.productsLoading = !1;
      return;
    }
    if (this.sliderAttrsForSpot(e) && this.nativeSliderReady) {
      this.products = [], this.productsLoading = !1;
      return;
    }
    const t = T(e), a = this.productCache.get(t);
    if (a != null && a.length) {
      this.products = a, this.productsLoading = !1;
      return;
    }
    const o = ++this.loadToken;
    this.productsLoading = !0;
    const i = await he(e);
    if (o !== this.loadToken) return;
    const s = new Set(
      e.demo_products.map((l) => `${l.name}|${l.image}`)
    ), c = !!e.products_source && i.length > 0 && i.every((l) => s.has(`${l.name}|${l.image}`));
    i.length && !c && this.productCache.set(t, i), this.products = i, this.productsLoading = !1;
  }
  stopLinkClick(e) {
    e.stopPropagation();
  }
  zoneHref(e) {
    if (b(e.spot_url)) return e.spot_url;
    const t = this.activeId === e.spot_id ? this.products[0] : null;
    return t && b(t.url) ? t.url : "";
  }
  render() {
    const e = this.cfg, t = Q(e, "vab_"), a = t.animate && !N(), o = this.hotspots, i = X(e.vab_enable_pulse, !0), s = String(e.vab_map_image || "").trim(), c = u(e.vab_title), l = u(e.vab_desc), y = o.find((p) => p.spot_id === this.activeId) || o[0] || null;
    return !o.length && !s ? n`<div class="fs-empty" role="status">
        ${d("أضيفي صورة البوتيك ومناطق التفاعل", "Add boutique image and interactive zones")}
      </div>` : n`
      <section
        class=${S({
      "fs-section": !0,
      "fs-animate": a
    })}
        style=${E(ee(t))}
        aria-label=${c || d("بوتيك العبايات التفاعلي", "Virtual abaya boutique")}
      >
        <div class="fs-container">
          ${c || l ? n`<header class="fs-header">
                ${c ? n`<h2 class="fs-title">${c}</h2>` : m}
                ${l ? n`<p class="fs-desc">${l}</p>` : m}
              </header>` : m}

          <div class="vab-shell">
            <div class="vab-map-panel">
              ${s ? n`<img
                    class="vab-map"
                    src=${s}
                    alt=${c || d("خريطة البوتيك", "Boutique map")}
                    loading="eager"
                    decoding="async"
                  />` : n`<div class="fs-empty" style="min-height:280px;place-content:center;">
                    ${d("أضيفي صورة الخريطة", "Add a map image")}
                  </div>`}
              <div class="vab-map-veil" aria-hidden="true"></div>

              ${y ? n`<div class="vab-map-caption">
                    <strong>${y.spot_name}</strong>
                    <span>
                      ${d(
      "اضغطي على النقاط أو البطاقات للاستكشاف",
      "Tap pins or cards to explore"
    )}
                    </span>
                  </div>` : m}

              ${o.map(
      (p, f) => n`
                  <button
                    type="button"
                    class=${S({
        "vab-hotspot": !0,
        "vab-hotspot--pulse": i && a,
        "fs-animate": a
      })}
                    style=${E({
        left: `${p.pos_x}%`,
        top: `${p.pos_y}%`,
        "--spot-color": p.spot_color
      })}
                    aria-label=${p.spot_name}
                    aria-pressed=${this.activeId === p.spot_id ? "true" : "false"}
                    @click=${() => this.selectSpot(p.spot_id)}
                  >
                    <span class="vab-hotspot__index">${f + 1}</span>
                  </button>
                `
    )}
            </div>

            <aside class="vab-gallery" aria-label=${d("بطاقات المناطق", "Zone cards")}>
              <div class="vab-gallery__head">
                <h3>${d("مناطق البوتيك", "Boutique zones")}</h3>
                <span class="vab-gallery__count">
                  ${o.length}
                  ${d("منطقة", "zones")}
                </span>
              </div>

              ${o.length ? n`
                    <div class="vab-cards" role="list">
                      ${o.map(
      (p, f) => this.renderZoneCard(p, f, a)
    )}
                    </div>

                    ${y ? this.renderActiveDetail(y) : m}
                  ` : n`<div class="fs-empty">
                    ${d("لا توجد مناطق مضافة بعد", "No zones added yet")}
                  </div>`}
            </aside>
          </div>
        </div>
      </section>
    `;
  }
  renderZoneCard(e, t, a) {
    const o = this.activeId === e.spot_id, i = this.zoneHref(e);
    return n`
      <div
        class=${S({
      "vab-card": !0,
      "vab-card--active": o,
      "fs-animate": a
    })}
        data-spot-id=${e.spot_id}
        role="listitem"
        tabindex="0"
        aria-pressed=${o ? "true" : "false"}
        @click=${() => this.selectSpot(e.spot_id)}
        @keydown=${(s) => {
      (s.key === "Enter" || s.key === " ") && (s.preventDefault(), this.selectSpot(e.spot_id));
    }}
      >
        <div class="vab-card__media">
          ${e.spot_image ? n`<img
                src=${e.spot_image}
                alt=${e.spot_name}
                loading=${t === 0 ? "eager" : "lazy"}
                decoding="async"
              />` : m}
          <span
            class="vab-card__dot"
            style=${E({ "--spot-color": e.spot_color })}
            aria-hidden="true"
          ></span>
        </div>
        <div class="vab-card__body">
          <div class="vab-card__text">
            <h4 class="vab-card__title">
              ${e.spot_name || `${d("منطقة", "Zone")} ${t + 1}`}
            </h4>
            ${e.spot_desc ? n`<p class="vab-card__desc">${e.spot_desc}</p>` : m}
          </div>
          <div class="vab-card__actions">
            <span class="vab-card__status ${o ? "vab-card__status--on" : ""}">
              ${o ? d("مختارة الآن", "Selected") : d("عرض التفاصيل", "View details")}
            </span>
            ${b(i) ? n`<a
                  class="vab-card__cta"
                  href=${i}
                  @click=${this.stopLinkClick}
                >
                  ${e.spot_btn || d("استكشفي", "Explore")}
                </a>` : m}
          </div>
        </div>
      </div>
    `;
  }
  sliderAttrsForSpot(e) {
    return ie({
      source: e.products_source,
      chosen: e.chosen_products,
      category: e.category,
      limit: e.products_limit,
      fallbackSelectedWhenChosen: !0
    });
  }
  /** Official Salla product cards (same path as Raed / Saji / reference zip). */
  renderSallaSlider(e, t) {
    return n`
      <div
        class="vab-slider"
        aria-label=${d("منتجات المنطقة", "Zone products")}
      >
        <salla-products-slider
          slider-id=${`vab-${t}-slider`}
          source=${e.source}
          source-value=${e.sourceValue}
          limit=${String(e.limit)}
          autoplay
        ></salla-products-slider>
      </div>
    `;
  }
  renderProductRail(e) {
    if (!e.length) return m;
    const t = this.currency;
    return n`
      <div
        class="vab-products"
        role="list"
        aria-label=${d("منتجات المنطقة", "Zone products")}
      >
        ${e.map((a) => {
      const o = a.name || d("منتج", "Product");
      return n`
            <a
              class=${S({
        "vab-product": !0,
        "vab-product--link": b(a.url)
      })}
              role="listitem"
              href=${b(a.url) ? a.url : "#"}
              @click=${(i) => {
        b(a.url) || i.preventDefault();
      }}
            >
              <div class="vab-product__media">
                ${a.image ? n`<img
                      src=${a.image}
                      alt=${o}
                      loading="lazy"
                      decoding="async"
                    />` : n`<span class="vab-product__placeholder" aria-hidden="true"></span>`}
              </div>
              <div class="vab-product__body">
                <span class="vab-product__name">${o}</span>
                ${a.price > 0 ? n`<span class="vab-product__price">
                      ${Z(a.price, t)}
                      ${a.old_price > a.price ? n`<s>${Z(a.old_price, t)}</s>` : m}
                    </span>` : m}
              </div>
            </a>
          `;
    })}
      </div>
    `;
  }
  renderActiveDetail(e) {
    var c;
    const t = this.sliderAttrsForSpot(e), a = b(e.spot_url) ? e.spot_url : ((c = this.products.find((l) => b(l.url))) == null ? void 0 : c.url) || "", o = !!(t && this.nativeSliderReady), i = o ? this.renderSallaSlider(t, e.spot_id) : this.productsLoading ? n`<p class="vab-products__status" role="status">
            ${d("جاري تحميل المنتجات...", "Loading products...")}
          </p>` : this.renderProductRail(this.products), s = !o && !this.productsLoading && !this.products.length;
    return n`
      <div
        class="vab-detail"
        aria-live="polite"
        aria-label=${e.spot_name || d("منتجات المنطقة", "Zone products")}
      >
        ${i}

        ${s ? n`<p class="vab-products__status">
              ${d(
      "أضيفي منتجات للمنطقة (أحدث / تخفيضات / تصنيف / مختارة)",
      "Add products for this zone (latest / sales / category / selected)"
    )}
            </p>` : m}

        ${b(a) ? n`<div class="vab-detail__actions">
              <a class="fs-btn vab-detail__cta" href=${a}>
                ${e.spot_btn || d("استكشفي المنطقة", "Explore zone")}
              </a>
            </div>` : m}
      </div>
    `;
  }
};
D.styles = [
  J,
  se,
  U`
      :host {
        direction: inherit;
      }
    `
];
let v = D;
$([
  W({ type: Object })
], v.prototype, "config");
$([
  C()
], v.prototype, "activeId");
$([
  C()
], v.prototype, "products");
$([
  C()
], v.prototype, "productsLoading");
$([
  C()
], v.prototype, "nativeSliderReady");
typeof v < "u" && v.registerSallaComponent("salla-virtual-abaya-boutique");
export {
  v as default
};
