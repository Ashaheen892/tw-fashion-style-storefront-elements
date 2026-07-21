import { nothing as i, html as s } from "lit";
import { classMap as $ } from "lit/directives/class-map.js";
import { t as l, o as f, K as _, L as b, M as g } from "./sharedStyles-BYm1OK6w.js";
function h(a, e) {
  return e <= 0 || a <= 0 || e <= a ? 0 : Math.round((e - a) / e * 100);
}
function m(a) {
  if (!a || a <= 0) return i;
  const e = Math.round(a * 2) / 2;
  return s`
    <span class="fs-product-card__rating" aria-label=${`${a} / 5`}>
      <i class="sicon-star2" aria-hidden="true"></i>
      <span>${e.toLocaleString()}</span>
    </span>
  `;
}
function p(a) {
  const e = _(a.id);
  return s`
    <button
      type="button"
      class=${$({
    "fs-product-card__wishlist": !0,
    "is-active": e
  })}
      aria-label=${l("أضيفي لقائمة الأمنيات", "Add to wishlist")}
      aria-pressed=${e ? "true" : "false"}
      @click=${async (n) => {
    n.stopPropagation();
    const r = n.currentTarget, c = await b(a.id);
    c !== null && r.classList.toggle("is-active", c);
  }}
    >
      <i class="sicon-heart" aria-hidden="true"></i>
    </button>
  `;
}
function y(a, e) {
  return s`
    <button
      type="button"
      class="fs-btn fs-btn--ghost fs-product-card__add"
      @click=${async (n) => {
    var d;
    n.stopPropagation();
    const r = n.currentTarget;
    if (r.dataset.busy === "1") return;
    r.dataset.busy = "1", r.setAttribute("disabled", "");
    const c = await g(a.id);
    r.removeAttribute("disabled"), r.dataset.busy = "0", (d = e.onAdded) == null || d.call(e, a, c.ok);
  }}
    >
      <i class="sicon-shopping-bag" aria-hidden="true"></i>
      <span>${e.addLabel || l("أضيفي للسلة", "Add to cart")}</span>
    </button>
  `;
}
function L(a, e = {}) {
  const n = e.currency || "ر.س", r = h(a.price, a.old_price), c = a.old_price > a.price && a.old_price > 0, d = !!e.selectable, o = s`
    <div class="fs-product-card__media">
      ${a.image ? s`<img
            class="fs-product-card__img"
            src=${a.image}
            alt=${a.name}
            loading=${e.imageLoading || "lazy"}
            decoding="async"
          />` : s`<span class="fs-product-card__img fs-product-card__img--empty" aria-hidden="true"></span>`}
      ${r > 0 ? s`<span class="fs-product-card__badge">${l(`خصم ${r}%`, `${r}% off`)}</span>` : i}
      ${e.wishlist && a.id ? p(a) : i}
      ${d ? s`<span class="fs-product-card__check" aria-hidden="true">✓</span>` : i}
    </div>
    <div class="fs-product-card__body">
      <h3 class="fs-product-card__title">
        ${a.url && !d ? s`<a href=${a.url} @click=${(t) => t.stopPropagation()}>${a.name}</a>` : a.name}
      </h3>
      ${a.subtitle ? s`<p class="fs-product-card__subtitle">${a.subtitle}</p>` : i}
      <div class="fs-product-card__meta">
        ${a.price > 0 ? s`<span class="fs-product-card__price">
              <span class="fs-product-card__price-now">${f(a.price, n)}</span>
              ${c ? s`<span class="fs-product-card__price-old">${f(a.old_price, n)}</span>` : i}
            </span>` : i}
        ${m(a.rating || 0)}
      </div>
      ${e.addToCart && a.id ? y(a, e) : i}
      ${e.viewLink && a.url ? s`<a
            class="fs-product-card__link"
            href=${a.url}
            target="_blank"
            rel="noopener noreferrer"
            @click=${(t) => t.stopPropagation()}
            >${e.viewLabel || l("عرض المنتج", "View product")}</a
          >` : i}
      ${e.extra ?? i}
    </div>
  `;
  return d ? s`
      <article
        class=${$({
    "fs-product-card": !0,
    "fs-product-card--selectable": !0,
    "is-selected": !!e.selected
  })}
        role="button"
        tabindex="0"
        aria-pressed=${e.selected ? "true" : "false"}
        @click=${() => {
    var t;
    return (t = e.onSelect) == null ? void 0 : t.call(e, a);
  }}
        @keydown=${(t) => {
    var u;
    (t.key === "Enter" || t.key === " ") && (t.preventDefault(), (u = e.onSelect) == null || u.call(e, a));
  }}
      >
        ${o}
      </article>
    ` : s`<article class="fs-product-card">${o}</article>`;
}
export {
  L as r
};
