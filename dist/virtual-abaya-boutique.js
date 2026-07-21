import { css as W, LitElement as K, html as n, nothing as u } from "lit";
import { property as V, state as z, query as Y } from "lit/decorators.js";
import { classMap as S } from "lit/directives/class-map.js";
import { styleMap as E } from "lit/directives/style-map.js";
import { n as Z, l as m, z as B, y as O, d as q, m as w, x as N, u as G, D as X, e as b, k as x, j as J, C as Q, h as ee, s as te, p as T, F as re, A as y, r as ae, i as oe, t as c, a as ie, b as se } from "./sharedStyles-BYm1OK6w.js";
import { r as ne } from "./productCard-BlEnQRkD.js";
const ce = W`
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
      radial-gradient(circle at 20% 10%, color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 16%, transparent), transparent 46%),
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
    background: var(--spot-color, var(--accent-color, var(--fs-store-primary)));
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
    border: 2px solid var(--spot-color, var(--accent-color, var(--fs-store-primary)));
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
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, var(--border-color, #e8ddd6));
  }

  .vab-card--active {
    border-color: var(--accent-color, var(--fs-store-primary));
    background:
      linear-gradient(
        135deg,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, var(--card-bg, #fff)),
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
    background: var(--spot-color, var(--accent-color, var(--fs-store-primary)));
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
    color: var(--accent-color, var(--fs-store-primary));
  }

  .vab-card__status--on::before {
    content: '';
    width: 0.4rem;
    height: 0.4rem;
    margin-inline-end: 0.4rem;
    border-radius: 50%;
    background: var(--accent-color, var(--fs-store-primary));
  }

  .vab-card__cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    min-height: 44px;
    padding: 0.45rem 0.95rem;
    border-radius: calc(var(--section-radius, 18px) * 0.4);
    background: var(--button-bg, var(--accent-color, var(--fs-store-primary)));
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
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 28%, var(--border-color, #e8ddd6));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 6%, var(--card-bg, #fff));
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

  .vab-detail__head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.6rem;
    margin-bottom: 0.15rem;
  }

  .vab-detail__title {
    font-size: 0.98rem;
    font-weight: 700;
    color: var(--text-color, #2b211c);
  }

  .vab-detail__count {
    flex: 0 0 auto;
    padding: 0.18rem 0.6rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
    color: var(--accent-color, var(--fs-store-primary));
    font-size: 0.72rem;
    font-weight: 700;
  }

  .vab-rail {
    position: relative;
    /* keep the slider strictly inside the detail panel */
    max-width: 100%;
    min-width: 0;
  }

  .vab-rail__nav {
    position: absolute;
    top: 42%;
    transform: translateY(-50%);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    padding: 0;
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 22%, var(--border-color, #e8ddd6));
    border-radius: 999px;
    background: color-mix(in srgb, var(--card-bg, #fff) 88%, transparent);
    color: var(--text-color, #2b211c);
    cursor: pointer;
    box-shadow: 0 6px 18px rgba(43, 33, 28, 0.16);
    backdrop-filter: blur(8px);
    transition: background 0.2s, color 0.2s, transform 0.2s, box-shadow 0.2s;
  }

  .vab-rail__nav svg {
    width: 1rem;
    height: 1rem;
  }

  .vab-rail__nav:hover {
    background: var(--accent-color, var(--fs-store-primary));
    color: #fff;
    box-shadow: 0 10px 22px rgba(43, 33, 28, 0.24);
  }

  .vab-rail__nav:active {
    transform: translateY(-50%) scale(0.92);
  }

  .vab-rail__nav:focus-visible {
    outline: 2px solid var(--accent-color, var(--fs-store-primary));
    outline-offset: 2px;
  }

  .vab-rail__nav--prev {
    inset-inline-start: 0.25rem;
  }

  .vab-rail__nav--next {
    inset-inline-end: 0.25rem;
  }

  /* mirror the chevrons for RTL reading direction */
  :host-context([dir='rtl']) .vab-rail__nav svg {
    transform: scaleX(-1);
  }

  .vab-products {
    display: flex;
    gap: 0.7rem;
    overflow-x: auto;
    padding: 0.2rem 0.15rem 0.5rem;
    scroll-snap-type: x mandatory;
    scroll-padding-inline: 0.15rem;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-x: contain;
    scrollbar-width: thin;
    scrollbar-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, transparent) transparent;
  }

  /* leave room for the arrows only when they are shown */
  .vab-rail.has-nav .vab-products {
    padding-inline: 2.4rem;
    scroll-padding-inline: 2.4rem;
  }

  .vab-products::-webkit-scrollbar {
    height: 6px;
  }

  .vab-products::-webkit-scrollbar-track {
    background: transparent;
  }

  .vab-products::-webkit-scrollbar-thumb {
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 40%, transparent);
    border-radius: 999px;
  }

  .vab-product-slot {
    flex: 0 0 clamp(9.5rem, 42%, 11.5rem);
    min-width: 0;
    display: flex;
    scroll-snap-align: start;
  }

  .vab-product-slot > .fs-product-card {
    width: 100%;
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

    .vab-detail {
      padding: 0.9rem;
    }
  }

  @media (max-width: 639px) {
    .vab-map-panel,
    .vab-map {
      max-height: min(16.5rem, 44vh);
    }

    .vab-product-slot {
      flex-basis: clamp(8.5rem, 62%, 10.5rem);
    }

    .vab-detail__title {
      font-size: 0.9rem;
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
`, v = /* @__PURE__ */ new Set(["none", "categories", "sales", "latest", "selected"]);
function g(r) {
  return G(r);
}
function le(r) {
  const e = !!(m(r.name).trim() || m(r.label).trim()), t = !!(b(r.image) || b(r.thumbnail) || b(r.main_image) || r.value && typeof r.value == "object" && b(r.value.image)), o = !!q(r.url || r.permalink || r.link), a = x(r.price) > 0 || x(r.sale_price) > 0 || x(r.regular_price) > 0;
  return e && (t || o || a);
}
function F(r) {
  if (!r || typeof r != "object") return !1;
  const e = r, t = String(e.value ?? e.key ?? "").toLowerCase().trim();
  return v.has(t) && !e.id && !e.product_id;
}
function C(r) {
  const e = g(r);
  return !e.length || e.length === 1 && F(e[0]) ? !1 : e.some((t) => {
    if (t == null) return !1;
    if (typeof t == "number" || typeof t == "string") {
      const i = String(t).trim();
      return !!i && !v.has(i.toLowerCase());
    }
    if (typeof t != "object" || F(t)) return !1;
    const o = t;
    if (le(o)) return !0;
    const a = w(o);
    return !!a && !v.has(a.toLowerCase());
  });
}
function de(r) {
  if (C(r)) return "selected";
  const e = N(r, "").toLowerCase();
  return !e || e === "none" ? "" : ["categories", "sales", "latest", "selected"].includes(e) ? e : "";
}
function pe(r) {
  const t = N(r, "").toLowerCase() || m(r).toLowerCase();
  return ["left", "right", "top", "bottom"].includes(t) ? t : "";
}
function ue(r) {
  const e = [
    r.chosen_products,
    r.selected_products,
    r.product_ids,
    r.products_list,
    r["chosen_products.selected"]
  ];
  for (const t of e)
    if (g(t).length || C(t))
      return t;
  return C(r.products) ? r.products : r.chosen_products ?? null;
}
function P(r) {
  if (r == null) return null;
  if (typeof r == "number" || typeof r == "string") {
    const R = String(r).trim();
    return !R || v.has(R.toLowerCase()) ? null : { id: R, name: "", image: "", url: "", price: 0, old_price: 0 };
  }
  if (typeof r != "object" || F(r)) return null;
  const e = J(r);
  if (e && (e.name || e.image || e.url || e.id))
    return e.id && v.has(e.id.toLowerCase()) && !e.name && !e.image ? null : {
      id: e.id,
      name: e.name,
      image: e.image,
      url: e.url,
      price: e.price,
      old_price: e.old_price
    };
  const t = r, o = t.value && typeof t.value == "object" && !Array.isArray(t.value) ? t.value : null, a = m(t.name).trim() || m(t.label).trim() || m(t.title).trim() || (o ? m(o.name).trim() || m(o.label).trim() : ""), i = b(t.image) || b(t.thumbnail) || b(t.main_image) || (o ? b(o.image) : ""), s = q(
    t.url || t.permalink || t.link || (o == null ? void 0 : o.url) || (o == null ? void 0 : o.permalink)
  ), l = w(t), d = o || t, _ = !!(d.on_sale || d.is_on_sale), p = x(d.sale_price), f = x(d.regular_price), $ = x(d.price);
  let I = $, A = 0;
  return _ && p > 0 ? (I = p, A = f > p ? f : 0) : f > $ && $ > 0 && (I = $, A = f), !a && !i && !s && !l || l && v.has(l.toLowerCase()) && !a && !i ? null : { id: l, name: a, image: i, url: s, price: I, old_price: A };
}
function me(r) {
  return Z(r).map((e) => P(e)).filter((e) => !!e);
}
function he(r) {
  return Z(r).map((e, t) => {
    const o = m(e.spot_name), a = m(e.spot_id) || o || `zone-${t + 1}`, i = ue(e);
    let s = de(e.products);
    return !s && C(i) && (s = "selected"), {
      spot_id: a,
      spot_name: o,
      spot_desc: m(e.spot_desc),
      pos_x: B(O(e.pos_x, 50), 0, 100),
      pos_y: B(O(e.pos_y, 50), 0, 100),
      spot_image: String(e.spot_image || "").trim(),
      spot_url: q(e.spot_url),
      spot_btn: m(e.spot_btn),
      spot_color: String(e.spot_color || "").trim() || "#8b5e4b",
      card_dir: pe(e.card_dir),
      products_source: s,
      chosen_products: i,
      category: e.category,
      products_limit: B(O(e.products_limit, 6) || 6, 1, 24),
      demo_products: me(e.demo_products)
    };
  }).filter((e) => e.spot_name.trim() !== "" || e.spot_image !== "");
}
function ve(r) {
  return r.map((e) => P(e)).filter((e) => !!e && !!(e.name || e.image || e.id));
}
async function j(r) {
  return ve(await Q(r));
}
async function M(r, e) {
  const t = [...new Set(r.filter(Boolean))].slice(0, e);
  if (!t.length) return [];
  const o = await ee(t);
  return t.map((a) => P(o.get(a) ?? a)).filter((a) => !!a && !!(a.name || a.image || a.id)).slice(0, e);
}
function U(r, e) {
  const t = g(r), o = [], a = /* @__PURE__ */ new Set();
  for (const i of t) {
    if (o.length >= e) break;
    const s = P(i);
    if (!s || !s.name && !s.image && !s.id) continue;
    const l = s.id || `${s.name}|${s.image}`;
    l && a.has(l) || (l && a.add(l), o.push(s));
  }
  return o;
}
function L(r) {
  return g(r).map((e) => w(e)).filter((e) => !!e && !v.has(e.toLowerCase()));
}
async function fe(r, e, t) {
  if (r === "latest")
    return j({ source: "latest", limit: t });
  if (r === "sales") {
    const o = [
      { source: "sales", source_value: [], limit: t },
      { source: "sales", limit: t },
      { source: "top-rated", source_value: [], limit: t },
      { source: "offers", source_value: [], limit: t }
    ];
    for (const a of o) {
      const i = await j(a);
      if (i.length) return i;
    }
    return [];
  }
  if (r === "categories") {
    const o = X(
      g(e.category).map((a) => w(a)).filter((a) => !!a && !v.has(a.toLowerCase()))
    );
    return o.length ? j({
      source: "categories",
      source_value: o,
      limit: t
    }) : [];
  }
  if (r === "selected") {
    const o = U(e.chosen_products, t);
    if (o.some((i) => i.name || i.image)) {
      const i = L(e.chosen_products);
      if (i.length && !o.every((s) => s.image || s.price > 0)) {
        const s = await M(i, t);
        if (s.some((l) => l.name || l.image))
          return s;
      }
      return o;
    }
    const a = L(e.chosen_products);
    if (a.length) {
      const i = await M(a, t);
      return i.some((s) => s.name || s.image) ? i : o.length ? o : a.slice(0, t).map((s) => ({
        id: s,
        name: "",
        image: "",
        url: "",
        price: 0,
        old_price: 0
      }));
    }
    return o;
  }
  return [];
}
async function be(r) {
  const e = r.products_limit || 6;
  let t = r.products_source;
  !t && L(r.chosen_products).length && (t = "selected");
  const o = g(r.category).map((i) => w(i)).filter((i) => !!i && !v.has(i.toLowerCase()));
  if (!t && o.length && (t = "categories"), !t || t === "categories" && !o.length)
    return r.demo_products.slice(0, e);
  const a = await fe(t, r, e);
  if (a.length) return a.slice(0, e);
  if (t === "selected") {
    const i = U(r.chosen_products, e);
    if (i.length) return i;
  }
  return r.demo_products.slice(0, e);
}
function ge(r) {
  return r && typeof r == "object" ? r : {};
}
function D(r) {
  const e = L(r.chosen_products).join(","), t = g(r.category).map((a) => w(a)).filter(Boolean).join(","), o = g(r.chosen_products).length;
  return [
    r.spot_id,
    r.products_source || "none",
    r.products_limit,
    t,
    e,
    o
  ].join("|");
}
var _e = Object.defineProperty, k = (r, e, t, o) => {
  for (var a = void 0, i = r.length - 1, s; i >= 0; i--)
    (s = r[i]) && (a = s(e, t, a) || a);
  return a && _e(e, t, a), a;
};
const H = class H extends K {
  constructor() {
    super(...arguments), this.config = {}, this.activeId = null, this.products = [], this.productsLoading = !1, this.canScrollRail = !1, this.productCache = /* @__PURE__ */ new Map(), this.loadToken = 0, this.autoplayPaused = !1, this.boundLangHandler = () => this.requestUpdate(), this.boundKeyHandler = (e) => {
      e.key !== "Escape" || !this.activeId || (this.activeId = null);
    }, this.pauseAutoplay = () => {
      this.autoplayPaused = !0;
    }, this.resumeAutoplay = () => {
      this.autoplayPaused = !1;
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler), window.addEventListener("keydown", this.boundKeyHandler), this.ensureActiveSpot();
  }
  disconnectedCallback() {
    var e;
    window.removeEventListener("language-changed", this.boundLangHandler), window.removeEventListener("keydown", this.boundKeyHandler), this.stopAutoplay(), (e = this.railObserver) == null || e.disconnect(), this.railObserver = void 0, super.disconnectedCallback();
  }
  updated(e) {
    e.has("config") && (this.productCache.clear(), this.ensureActiveSpot()), (e.has("products") || e.has("productsLoading")) && requestAnimationFrame(() => {
      this.observeRail(), this.restartAutoplay();
    });
  }
  observeRail() {
    const e = this.railEl;
    if (!e) {
      this.canScrollRail = !1;
      return;
    }
    this.railObserver ? this.railObserver.disconnect() : this.railObserver = new ResizeObserver(() => this.measureRail()), this.railObserver.observe(e), this.measureRail();
  }
  measureRail() {
    const e = this.railEl, t = !!e && e.scrollWidth - e.clientWidth > 2;
    t !== this.canScrollRail && (this.canScrollRail = t, t || this.stopAutoplay());
  }
  railStep() {
    const e = this.railEl;
    if (!e) return 0;
    const t = e.firstElementChild, o = parseFloat(getComputedStyle(e).columnGap || "0") || 11;
    return t ? t.getBoundingClientRect().width + o : e.clientWidth * 0.8;
  }
  get railIsRtl() {
    return getComputedStyle(this).direction === "rtl";
  }
  scrollRail(e) {
    const t = this.railEl;
    t && t.scrollBy({ left: e, behavior: "smooth" });
  }
  advanceRail() {
    const e = this.railEl;
    if (!e) return;
    const t = e.scrollWidth - e.clientWidth;
    if (t <= 2) return;
    if (Math.abs(e.scrollLeft) >= t - 2) {
      e.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }
    const a = this.railStep();
    this.scrollRail(this.railIsRtl ? -a : a);
  }
  restartAutoplay() {
    this.stopAutoplay(), !(T() || this.products.length < 2) && requestAnimationFrame(() => {
      const e = this.railEl;
      !e || e.scrollWidth - e.clientWidth <= 2 || (this.autoplayTimer = setInterval(() => {
        this.autoplayPaused || this.advanceRail();
      }, 3500));
    });
  }
  stopAutoplay() {
    this.autoplayTimer && (clearInterval(this.autoplayTimer), this.autoplayTimer = void 0);
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
    return ge(this.config);
  }
  get hotspots() {
    return he(this.cfg.vab_hotspots);
  }
  get currency() {
    return re();
  }
  selectSpot(e) {
    const t = this.activeId === e;
    if (this.activeId = e, t && (this.products.length || this.productsLoading))
      return;
    if (t) {
      const i = this.hotspots.find((s) => s.spot_id === e);
      i && this.productCache.delete(D(i));
    }
    this.loadProductsForActive();
    const o = this.renderRoot.querySelectorAll("[data-spot-id]"), a = Array.from(o).find((i) => i.dataset.spotId === e);
    a == null || a.scrollIntoView({
      behavior: T() ? "auto" : "smooth",
      block: "nearest"
    });
  }
  async loadProductsForActive() {
    const e = this.hotspots.find((d) => d.spot_id === this.activeId);
    if (!e) {
      this.products = [], this.productsLoading = !1;
      return;
    }
    const t = D(e), o = this.productCache.get(t);
    if (o != null && o.length) {
      this.products = o, this.productsLoading = !1;
      return;
    }
    const a = ++this.loadToken;
    this.productsLoading = !0;
    const i = await be(e);
    if (a !== this.loadToken) return;
    const s = new Set(
      e.demo_products.map((d) => `${d.name}|${d.image}`)
    ), l = !!e.products_source && i.length > 0 && i.every((d) => s.has(`${d.name}|${d.image}`));
    i.length && !l && this.productCache.set(t, i), this.products = i, this.productsLoading = !1;
  }
  stopLinkClick(e) {
    e.stopPropagation();
  }
  zoneHref(e) {
    if (y(e.spot_url)) return e.spot_url;
    const t = this.activeId === e.spot_id ? this.products[0] : null;
    return t && y(t.url) ? t.url : "";
  }
  render() {
    const e = this.cfg, t = ae(e, "vab_"), o = t.animate && !T(), a = this.hotspots, i = oe(e.vab_enable_pulse, !0), s = String(e.vab_map_image || "").trim(), l = m(e.vab_title), d = m(e.vab_desc), _ = a.find((p) => p.spot_id === this.activeId) || a[0] || null;
    return !a.length && !s ? n`<div class="fs-empty" role="status">
        ${c("أضيفي صورة البوتيك ومناطق التفاعل", "Add boutique image and interactive zones")}
      </div>` : n`
      <section
        class=${S({
      "fs-section": !0,
      "fs-animate": o
    })}
        style=${E(ie(t))}
        aria-label=${l || c("بوتيك العبايات التفاعلي", "Virtual abaya boutique")}
      >
        <div class="fs-container">
          ${l || d ? n`<header class="fs-header">
                ${l ? n`<h2 class="fs-title">${l}</h2>` : u}
                ${d ? n`<p class="fs-desc">${d}</p>` : u}
              </header>` : u}

          <div class="vab-shell">
            <div class="vab-map-panel">
              ${s ? n`<img
                    class="vab-map"
                    src=${s}
                    alt=${l || c("خريطة البوتيك", "Boutique map")}
                    loading="eager"
                    decoding="async"
                  />` : n`<div class="fs-empty" style="min-height:280px;place-content:center;">
                    ${c("أضيفي صورة الخريطة", "Add a map image")}
                  </div>`}
              <div class="vab-map-veil" aria-hidden="true"></div>

              ${_ ? n`<div class="vab-map-caption">
                    <strong>${_.spot_name}</strong>
                    <span>
                      ${c(
      "اضغطي على النقاط أو البطاقات للاستكشاف",
      "Tap pins or cards to explore"
    )}
                    </span>
                  </div>` : u}

              ${a.map(
      (p, f) => n`
                  <button
                    type="button"
                    class=${S({
        "vab-hotspot": !0,
        "vab-hotspot--pulse": i && o,
        "fs-animate": o
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

            <aside class="vab-gallery" aria-label=${c("بطاقات المناطق", "Zone cards")}>
              <div class="vab-gallery__head">
                <h3>${c("مناطق البوتيك", "Boutique zones")}</h3>
                <span class="vab-gallery__count">
                  ${a.length}
                  ${c("منطقة", "zones")}
                </span>
              </div>

              ${a.length ? n`
                    <div class="vab-cards" role="list">
                      ${a.map(
      (p, f) => this.renderZoneCard(p, f, o)
    )}
                    </div>

                    ${_ ? this.renderActiveDetail(_) : u}
                  ` : n`<div class="fs-empty">
                    ${c("لا توجد مناطق مضافة بعد", "No zones added yet")}
                  </div>`}
            </aside>
          </div>
        </div>
        ${se(this.config || {}, "vab_")}
      </section>
    `;
  }
  renderZoneCard(e, t, o) {
    const a = this.activeId === e.spot_id, i = this.zoneHref(e);
    return n`
      <div
        class=${S({
      "vab-card": !0,
      "vab-card--active": a,
      "fs-animate": o
    })}
        data-spot-id=${e.spot_id}
        role="listitem"
        tabindex="0"
        aria-pressed=${a ? "true" : "false"}
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
              />` : u}
          <span
            class="vab-card__dot"
            style=${E({ "--spot-color": e.spot_color })}
            aria-hidden="true"
          ></span>
        </div>
        <div class="vab-card__body">
          <div class="vab-card__text">
            <h4 class="vab-card__title">
              ${e.spot_name || `${c("منطقة", "Zone")} ${t + 1}`}
            </h4>
            ${e.spot_desc ? n`<p class="vab-card__desc">${e.spot_desc}</p>` : u}
          </div>
          <div class="vab-card__actions">
            <span class="vab-card__status ${a ? "vab-card__status--on" : ""}">
              ${a ? c("مختارة الآن", "Selected") : c("عرض التفاصيل", "View details")}
            </span>
            ${y(i) ? n`<a
                  class="vab-card__cta"
                  href=${i}
                  @click=${this.stopLinkClick}
                >
                  ${e.spot_btn || c("استكشفي", "Explore")}
                </a>` : u}
          </div>
        </div>
      </div>
    `;
  }
  renderProductRail(e) {
    if (!e.length) return u;
    const t = this.currency, o = () => this.railStep() || 200, a = this.canScrollRail;
    return n`
      <div
        class=${S({ "vab-rail": !0, "has-nav": a })}
        @pointerenter=${this.pauseAutoplay}
        @pointerleave=${this.resumeAutoplay}
        @focusin=${this.pauseAutoplay}
        @focusout=${this.resumeAutoplay}
      >
        ${a ? n`<button
              type="button"
              class="vab-rail__nav vab-rail__nav--prev"
              aria-label=${c("السابق", "Previous")}
              @click=${() => this.scrollRail(-o())}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M15 5l-7 7 7 7"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>` : u}

        <div
          class="vab-products"
          role="list"
          aria-label=${c("منتجات المنطقة", "Zone products")}
        >
          ${e.map(
      (i) => n`<div class="vab-product-slot" role="listitem">
              ${ne(
        {
          id: i.id,
          name: i.name || c("منتج", "Product"),
          image: i.image,
          url: i.url,
          price: i.price,
          old_price: i.old_price
        },
        {
          currency: t,
          wishlist: !0,
          addToCart: !0
        }
      )}
            </div>`
    )}
        </div>

        ${a ? n`<button
              type="button"
              class="vab-rail__nav vab-rail__nav--next"
              aria-label=${c("التالي", "Next")}
              @click=${() => this.scrollRail(o())}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M9 5l7 7-7 7"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>` : u}
      </div>
    `;
  }
  renderActiveDetail(e) {
    var s;
    const t = y(e.spot_url) ? e.spot_url : ((s = this.products.find((l) => y(l.url))) == null ? void 0 : s.url) || "", o = this.products.length, a = this.productsLoading ? n`<p class="vab-products__status" role="status">
          ${c("جاري تحميل المنتجات...", "Loading products...")}
        </p>` : this.renderProductRail(this.products), i = !this.productsLoading && !this.products.length;
    return n`
      <div
        class="vab-detail"
        aria-live="polite"
        aria-label=${e.spot_name || c("منتجات المنطقة", "Zone products")}
      >
        ${!this.productsLoading && o ? n`<div class="vab-detail__head">
              <span class="vab-detail__title">
                ${e.spot_name || c("منتجات المنطقة", "Zone products")}
              </span>
              <span class="vab-detail__count">
                ${o} ${o === 1 ? c("منتج", "product") : c("منتجات", "products")}
              </span>
            </div>` : u}

        ${a}

        ${i ? n`<p class="vab-products__status">
              ${c(
      "أضيفي منتجات للمنطقة (أحدث / تخفيضات / تصنيف / مختارة)",
      "Add products for this zone (latest / sales / category / selected)"
    )}
            </p>` : u}

        ${y(t) ? n`<div class="vab-detail__actions">
              <a class="fs-btn vab-detail__cta" href=${t}>
                ${e.spot_btn || c("استكشفي المنطقة", "Explore zone")}
              </a>
            </div>` : u}
      </div>
    `;
  }
};
H.styles = [
  te,
  ce,
  W`
      :host {
        direction: inherit;
      }
    `
];
let h = H;
k([
  V({ type: Object })
], h.prototype, "config");
k([
  z()
], h.prototype, "activeId");
k([
  z()
], h.prototype, "products");
k([
  z()
], h.prototype, "productsLoading");
k([
  z()
], h.prototype, "canScrollRail");
k([
  Y(".vab-products")
], h.prototype, "railEl");
typeof h < "u" && h.registerSallaComponent("salla-virtual-abaya-boutique");
export {
  h as default
};
