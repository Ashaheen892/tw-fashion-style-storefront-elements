import { html, nothing, type TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { formatPrice, t } from './helpers.js';
import { addProductToCart, isInWishlist, toggleWishlist } from './sallaApi.js';

/**
 * Shared, Salla theme-raed style product card.
 * Mirrors `.s-product-card` (image + wishlist heart, sale badge,
 * title, sale/old price, rating stars, add-to-cart button).
 */
export interface ProductCardData {
  id: string;
  name: string;
  image: string;
  url: string;
  price: number;
  old_price: number;
  rating?: number;
  /** Optional secondary line (e.g. color note / subtitle). */
  subtitle?: string;
}

export interface ProductCardOptions {
  currency?: string;
  /** Turn the whole card into a selection target. */
  selectable?: boolean;
  selected?: boolean;
  onSelect?: (product: ProductCardData) => void;
  /** Show the wishlist heart overlay (needs a store product id). */
  wishlist?: boolean;
  /** Show a per-card add-to-cart button. */
  addToCart?: boolean;
  addLabel?: string;
  onAdded?: (product: ProductCardData, ok: boolean) => void;
  /** Show a "view product" link when a url exists. */
  viewLink?: boolean;
  viewLabel?: string;
  /** Extra content rendered at the end of the card body. */
  extra?: TemplateResult | typeof nothing;
  imageLoading?: 'eager' | 'lazy';
}

function discountPercent(price: number, oldPrice: number): number {
  if (oldPrice <= 0 || price <= 0 || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

function renderStars(rating: number): TemplateResult | typeof nothing {
  if (!rating || rating <= 0) return nothing;
  const rounded = Math.round(rating * 2) / 2;
  return html`
    <span class="fs-product-card__rating" aria-label=${`${rating} / 5`}>
      <i class="sicon-star2" aria-hidden="true"></i>
      <span>${rounded.toLocaleString()}</span>
    </span>
  `;
}

function renderWishlist(product: ProductCardData): TemplateResult {
  const active = isInWishlist(product.id);
  return html`
    <button
      type="button"
      class=${classMap({
        'fs-product-card__wishlist': true,
        'is-active': active,
      })}
      aria-label=${t('أضيفي لقائمة الأمنيات', 'Add to wishlist')}
      aria-pressed=${active ? 'true' : 'false'}
      @click=${async (e: Event) => {
        e.stopPropagation();
        const btn = e.currentTarget as HTMLButtonElement;
        const next = await toggleWishlist(product.id);
        if (next !== null) btn.classList.toggle('is-active', next);
      }}
    >
      <i class="sicon-heart" aria-hidden="true"></i>
    </button>
  `;
}

function renderAddToCart(
  product: ProductCardData,
  opts: ProductCardOptions
): TemplateResult {
  return html`
    <button
      type="button"
      class="fs-btn fs-btn--ghost fs-product-card__add"
      @click=${async (e: Event) => {
        e.stopPropagation();
        const btn = e.currentTarget as HTMLButtonElement;
        if (btn.dataset.busy === '1') return;
        btn.dataset.busy = '1';
        btn.setAttribute('disabled', '');
        const res = await addProductToCart(product.id);
        btn.removeAttribute('disabled');
        btn.dataset.busy = '0';
        opts.onAdded?.(product, res.ok);
      }}
    >
      <i class="sicon-shopping-bag" aria-hidden="true"></i>
      <span>${opts.addLabel || t('أضيفي للسلة', 'Add to cart')}</span>
    </button>
  `;
}

export function renderProductCard(
  product: ProductCardData,
  opts: ProductCardOptions = {}
): TemplateResult {
  const currency = opts.currency || 'ر.س';
  const discount = discountPercent(product.price, product.old_price);
  const hasOld = product.old_price > product.price && product.old_price > 0;
  const selectable = !!opts.selectable;

  const body = html`
    <div class="fs-product-card__media">
      ${product.image
        ? html`<img
            class="fs-product-card__img"
            src=${product.image}
            alt=${product.name}
            loading=${opts.imageLoading || 'lazy'}
            decoding="async"
          />`
        : html`<span class="fs-product-card__img fs-product-card__img--empty" aria-hidden="true"></span>`}
      ${discount > 0
        ? html`<span class="fs-product-card__badge">${t(`خصم ${discount}%`, `${discount}% off`)}</span>`
        : nothing}
      ${opts.wishlist && product.id ? renderWishlist(product) : nothing}
      ${selectable
        ? html`<span class="fs-product-card__check" aria-hidden="true">✓</span>`
        : nothing}
    </div>
    <div class="fs-product-card__body">
      <h3 class="fs-product-card__title">
        ${product.url && !selectable
          ? html`<a href=${product.url} @click=${(e: Event) => e.stopPropagation()}>${product.name}</a>`
          : product.name}
      </h3>
      ${product.subtitle
        ? html`<p class="fs-product-card__subtitle">${product.subtitle}</p>`
        : nothing}
      <div class="fs-product-card__meta">
        ${product.price > 0
          ? html`<span class="fs-product-card__price">
              <span class="fs-product-card__price-now">${formatPrice(product.price, currency)}</span>
              ${hasOld
                ? html`<span class="fs-product-card__price-old">${formatPrice(product.old_price, currency)}</span>`
                : nothing}
            </span>`
          : nothing}
        ${renderStars(product.rating || 0)}
      </div>
      ${opts.addToCart && product.id ? renderAddToCart(product, opts) : nothing}
      ${opts.viewLink && product.url
        ? html`<a
            class="fs-product-card__link"
            href=${product.url}
            target="_blank"
            rel="noopener noreferrer"
            @click=${(e: Event) => e.stopPropagation()}
            >${opts.viewLabel || t('عرض المنتج', 'View product')}</a
          >`
        : nothing}
      ${opts.extra ?? nothing}
    </div>
  `;

  if (selectable) {
    return html`
      <article
        class=${classMap({
          'fs-product-card': true,
          'fs-product-card--selectable': true,
          'is-selected': !!opts.selected,
        })}
        role="button"
        tabindex="0"
        aria-pressed=${opts.selected ? 'true' : 'false'}
        @click=${() => opts.onSelect?.(product)}
        @keydown=${(e: KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            opts.onSelect?.(product);
          }
        }}
      >
        ${body}
      </article>
    `;
  }

  return html`<article class="fs-product-card">${body}</article>`;
}
