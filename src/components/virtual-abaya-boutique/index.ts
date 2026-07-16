import { css, html, LitElement, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import {
  isTruthy,
  isValidHref,
  prefersReducedMotion,
  readSectionTheme,
  t,
  themeStyleMap,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import {
  resolveProductsSliderAttrs,
  type ProductsSliderAttrs,
} from '../../utils/productPicker.js';
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { componentStyles } from './styles.js';
import {
  ensureConfig,
  formatPrice,
  parseHotspots,
  resolveSpotProducts,
  spotProductsCacheKey,
} from './utils.js';
import type { BoutiqueProduct, Hotspot } from './types.js';

export default class VirtualAbayaBoutique extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private activeId: string | null = null;
  @state() private products: BoutiqueProduct[] = [];
  @state() private productsLoading = false;
  @state() private nativeSliderReady = false;

  private productCache = new Map<string, BoutiqueProduct[]>();
  private loadToken = 0;

  private boundLangHandler = () => this.requestUpdate();
  private boundKeyHandler = (e: KeyboardEvent) => {
    if (e.key !== 'Escape' || !this.activeId) return;
    this.activeId = null;
  };

  static styles = [
    sharedSectionCss,
    componentStyles,
    css`
      :host {
        direction: inherit;
      }
    `,
  ];

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('language-changed', this.boundLangHandler);
    window.addEventListener('keydown', this.boundKeyHandler);
    this.watchNativeSlider();
    this.ensureActiveSpot();
  }

  private watchNativeSlider(): void {
    if (typeof customElements === 'undefined') return;
    if (customElements.get('salla-products-slider')) {
      this.nativeSliderReady = true;
      return;
    }
    customElements
      .whenDefined('salla-products-slider')
      .then(() => {
        this.nativeSliderReady = true;
      })
      .catch(() => {
        /* keep custom product rail */
      });
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLangHandler);
    window.removeEventListener('keydown', this.boundKeyHandler);
    super.disconnectedCallback();
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config')) {
      this.productCache.clear();
      this.ensureActiveSpot();
    }
  }

  private ensureActiveSpot(): void {
    const hotspots = this.hotspots;
    if (!hotspots.length) {
      this.activeId = null;
      this.products = [];
      return;
    }
    if (!this.activeId || !hotspots.some((h) => h.spot_id === this.activeId)) {
      this.activeId = hotspots[0].spot_id;
    }
    void this.loadProductsForActive();
  }

  private get cfg() {
    return ensureConfig(this.config);
  }

  private get hotspots() {
    return parseHotspots(this.cfg.vab_hotspots);
  }

  private get currency(): string {
    return String(this.cfg.vab_currency || 'ر.س').trim() || 'ر.س';
  }

  private selectSpot(id: string): void {
    const same = this.activeId === id;
    this.activeId = id;
    if (same && (this.products.length || this.productsLoading)) {
      return;
    }
    // Retry when previous resolve returned empty (e.g. API not ready yet)
    if (same) {
      const spot = this.hotspots.find((h) => h.spot_id === id);
      if (spot) this.productCache.delete(spotProductsCacheKey(spot));
    }
    void this.loadProductsForActive();
    const cards = this.renderRoot.querySelectorAll<HTMLElement>('[data-spot-id]');
    const card = Array.from(cards).find((el) => el.dataset.spotId === id);
    card?.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'nearest',
    });
  }

  private async loadProductsForActive(): Promise<void> {
    const spot = this.hotspots.find((h) => h.spot_id === this.activeId);
    if (!spot) {
      this.products = [];
      this.productsLoading = false;
      return;
    }

    // Native Salla slider loads its own products — avoid a second fetch
    // that can pop demo alerts مثل «حقل التصنيفات مطلوب».
    if (this.sliderAttrsForSpot(spot) && this.nativeSliderReady) {
      this.products = [];
      this.productsLoading = false;
      return;
    }

    const cacheKey = spotProductsCacheKey(spot);

    const cached = this.productCache.get(cacheKey);
    if (cached?.length) {
      this.products = cached;
      this.productsLoading = false;
      return;
    }

    const token = ++this.loadToken;
    this.productsLoading = true;
    const list = await resolveSpotProducts(spot);
    if (token !== this.loadToken) return;

    // Cache live/hydrated results only — never lock onto demo fallback
    const demoNames = new Set(
      spot.demo_products.map((d) => `${d.name}|${d.image}`)
    );
    const isDemoOnly =
      Boolean(spot.products_source) &&
      list.length > 0 &&
      list.every((p) => demoNames.has(`${p.name}|${p.image}`));
    if (list.length && !isDemoOnly) this.productCache.set(cacheKey, list);
    this.products = list;
    this.productsLoading = false;
  }

  private stopLinkClick(e: Event): void {
    e.stopPropagation();
  }

  private zoneHref(spot: Hotspot): string {
    if (isValidHref(spot.spot_url)) return spot.spot_url;
    const first = this.activeId === spot.spot_id ? this.products[0] : null;
    if (first && isValidHref(first.url)) return first.url;
    return '';
  }

  render() {
    const c = this.cfg;
    const theme = readSectionTheme(c, 'vab_');
    const animate = theme.animate && !prefersReducedMotion();
    const hotspots = this.hotspots;
    const enablePulse = isTruthy(c.vab_enable_pulse, true);
    const mapImage = String(c.vab_map_image || '').trim();
    const title = localizedString(c.vab_title as string);
    const desc = localizedString(c.vab_desc as string);
    const active =
      hotspots.find((h) => h.spot_id === this.activeId) || hotspots[0] || null;

    if (!hotspots.length && !mapImage) {
      return html`<div class="fs-empty" role="status">
        ${t('أضيفي صورة البوتيك ومناطق التفاعل', 'Add boutique image and interactive zones')}
      </div>`;
    }

    return html`
      <section
        class=${classMap({
          'fs-section': true,
          'fs-animate': animate,
        })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('بوتيك العبايات التفاعلي', 'Virtual abaya boutique')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<header class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </header>`
            : nothing}

          <div class="vab-shell">
            <div class="vab-map-panel">
              ${mapImage
                ? html`<img
                    class="vab-map"
                    src=${mapImage}
                    alt=${title || t('خريطة البوتيك', 'Boutique map')}
                    loading="eager"
                    decoding="async"
                  />`
                : html`<div class="fs-empty" style="min-height:280px;place-content:center;">
                    ${t('أضيفي صورة الخريطة', 'Add a map image')}
                  </div>`}
              <div class="vab-map-veil" aria-hidden="true"></div>

              ${active
                ? html`<div class="vab-map-caption">
                    <strong>${active.spot_name}</strong>
                    <span>
                      ${t(
                        'اضغطي على النقاط أو البطاقات للاستكشاف',
                        'Tap pins or cards to explore'
                      )}
                    </span>
                  </div>`
                : nothing}

              ${hotspots.map(
                (spot, index) => html`
                  <button
                    type="button"
                    class=${classMap({
                      'vab-hotspot': true,
                      'vab-hotspot--pulse': enablePulse && animate,
          'fs-animate': animate,
                    })}
                    style=${styleMap({
                      left: `${spot.pos_x}%`,
                      top: `${spot.pos_y}%`,
                      '--spot-color': spot.spot_color,
                    })}
                    aria-label=${spot.spot_name}
                    aria-pressed=${this.activeId === spot.spot_id ? 'true' : 'false'}
                    @click=${() => this.selectSpot(spot.spot_id)}
                  >
                    <span class="vab-hotspot__index">${index + 1}</span>
                  </button>
                `
              )}
            </div>

            <aside class="vab-gallery" aria-label=${t('بطاقات المناطق', 'Zone cards')}>
              <div class="vab-gallery__head">
                <h3>${t('مناطق البوتيك', 'Boutique zones')}</h3>
                <span class="vab-gallery__count">
                  ${hotspots.length}
                  ${t('منطقة', 'zones')}
                </span>
              </div>

              ${hotspots.length
                ? html`
                    <div class="vab-cards" role="list">
                      ${hotspots.map((spot, index) =>
                        this.renderZoneCard(spot, index, animate)
                      )}
                    </div>

                    ${active ? this.renderActiveDetail(active) : nothing}
                  `
                : html`<div class="fs-empty">
                    ${t('لا توجد مناطق مضافة بعد', 'No zones added yet')}
                  </div>`}
            </aside>
          </div>
        </div>
      </section>
    `;
  }

  private renderZoneCard(spot: Hotspot, index: number, animate: boolean) {
    const active = this.activeId === spot.spot_id;
    const href = this.zoneHref(spot);
    return html`
      <div
        class=${classMap({
          'vab-card': true,
          'vab-card--active': active,
          'fs-animate': animate,
        })}
        data-spot-id=${spot.spot_id}
        role="listitem"
        tabindex="0"
        aria-pressed=${active ? 'true' : 'false'}
        @click=${() => this.selectSpot(spot.spot_id)}
        @keydown=${(e: KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.selectSpot(spot.spot_id);
          }
        }}
      >
        <div class="vab-card__media">
          ${spot.spot_image
            ? html`<img
                src=${spot.spot_image}
                alt=${spot.spot_name}
                loading=${index === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />`
            : nothing}
          <span
            class="vab-card__dot"
            style=${styleMap({ '--spot-color': spot.spot_color })}
            aria-hidden="true"
          ></span>
        </div>
        <div class="vab-card__body">
          <div class="vab-card__text">
            <h4 class="vab-card__title">
              ${spot.spot_name || `${t('منطقة', 'Zone')} ${index + 1}`}
            </h4>
            ${spot.spot_desc
              ? html`<p class="vab-card__desc">${spot.spot_desc}</p>`
              : nothing}
          </div>
          <div class="vab-card__actions">
            <span class="vab-card__status ${active ? 'vab-card__status--on' : ''}">
              ${active
                ? t('مختارة الآن', 'Selected')
                : t('عرض التفاصيل', 'View details')}
            </span>
            ${isValidHref(href)
              ? html`<a
                  class="vab-card__cta"
                  href=${href}
                  @click=${this.stopLinkClick}
                >
                  ${spot.spot_btn || t('استكشفي', 'Explore')}
                </a>`
              : nothing}
          </div>
        </div>
      </div>
    `;
  }

  private sliderAttrsForSpot(spot: Hotspot): ProductsSliderAttrs | null {
    return resolveProductsSliderAttrs({
      source: spot.products_source,
      chosen: spot.chosen_products,
      category: spot.category,
      limit: spot.products_limit,
      fallbackSelectedWhenChosen: true,
    });
  }

  /** Official Salla product cards (same path as Raed / Saji / reference zip). */
  private renderSallaSlider(attrs: ProductsSliderAttrs, spotId: string) {
    return html`
      <div
        class="vab-slider"
        aria-label=${t('منتجات المنطقة', 'Zone products')}
      >
        <salla-products-slider
          slider-id=${`vab-${spotId}-slider`}
          source=${attrs.source}
          source-value=${attrs.sourceValue}
          limit=${String(attrs.limit)}
          autoplay
        ></salla-products-slider>
      </div>
    `;
  }

  private renderProductRail(products: BoutiqueProduct[]) {
    if (!products.length) return nothing;
    const currency = this.currency;

    return html`
      <div
        class="vab-products"
        role="list"
        aria-label=${t('منتجات المنطقة', 'Zone products')}
      >
        ${products.map((product) => {
          const label = product.name || t('منتج', 'Product');
          return html`
            <a
              class=${classMap({
                'vab-product': true,
                'vab-product--link': isValidHref(product.url),
              })}
              role="listitem"
              href=${isValidHref(product.url) ? product.url : '#'}
              @click=${(e: Event) => {
                if (!isValidHref(product.url)) e.preventDefault();
              }}
            >
              <div class="vab-product__media">
                ${product.image
                  ? html`<img
                      src=${product.image}
                      alt=${label}
                      loading="lazy"
                      decoding="async"
                    />`
                  : html`<span class="vab-product__placeholder" aria-hidden="true"></span>`}
              </div>
              <div class="vab-product__body">
                <span class="vab-product__name">${label}</span>
                ${product.price > 0
                  ? html`<span class="vab-product__price">
                      ${formatPrice(product.price, currency)}
                      ${product.old_price > product.price
                        ? html`<s>${formatPrice(product.old_price, currency)}</s>`
                        : nothing}
                    </span>`
                  : nothing}
              </div>
            </a>
          `;
        })}
      </div>
    `;
  }

  private renderActiveDetail(spot: Hotspot) {
    const slider = this.sliderAttrsForSpot(spot);
    const href = isValidHref(spot.spot_url)
      ? spot.spot_url
      : this.products.find((p) => isValidHref(p.url))?.url || '';

    const useNativeSlider = Boolean(slider && this.nativeSliderReady);
    const productsBlock = useNativeSlider
      ? this.renderSallaSlider(slider!, spot.spot_id)
      : this.productsLoading
        ? html`<p class="vab-products__status" role="status">
            ${t('جاري تحميل المنتجات...', 'Loading products...')}
          </p>`
        : this.renderProductRail(this.products);

    const empty =
      !useNativeSlider &&
      !this.productsLoading &&
      !this.products.length;

    return html`
      <div
        class="vab-detail"
        aria-live="polite"
        aria-label=${spot.spot_name || t('منتجات المنطقة', 'Zone products')}
      >
        ${productsBlock}

        ${empty
          ? html`<p class="vab-products__status">
              ${t(
                'أضيفي منتجات للمنطقة (أحدث / تخفيضات / تصنيف / مختارة)',
                'Add products for this zone (latest / sales / category / selected)'
              )}
            </p>`
          : nothing}

        ${isValidHref(href)
          ? html`<div class="vab-detail__actions">
              <a class="fs-btn vab-detail__cta" href=${href}>
                ${spot.spot_btn || t('استكشفي المنطقة', 'Explore zone')}
              </a>
            </div>`
          : nothing}
      </div>
    `;
  }
}
