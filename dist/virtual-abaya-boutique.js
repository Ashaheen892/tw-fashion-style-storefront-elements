var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { n as normalizeCollection, l as localizedString, d as extractLink, u as clamp, q as getUnitValue, o as getRadioValue, s as sharedSectionCss, p as prefersReducedMotion, v as isValidHref, r as readSectionTheme, i as isTruthy, t, a as themeStyleMap, b as renderCommerceOutcome } from "./sharedStyles-Q5qADHV9.js";
const componentStyles = css`
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
`;
function normalizeCardDir(raw) {
  const val = getRadioValue(raw, "").toLowerCase() || localizedString(raw).toLowerCase();
  return ["left", "right", "top", "bottom"].includes(val) ? val : "";
}
__name(normalizeCardDir, "normalizeCardDir");
function parseHotspots(raw) {
  return normalizeCollection(raw).map((item, index) => {
    const spotName = localizedString(item.spot_name);
    return {
      spot_id: localizedString(item.spot_id) || spotName || `zone-${index + 1}`,
      spot_name: spotName,
      spot_desc: localizedString(item.spot_desc),
      pos_x: clamp(getUnitValue(item.pos_x, 50), 0, 100),
      pos_y: clamp(getUnitValue(item.pos_y, 50), 0, 100),
      spot_image: String(item.spot_image || "").trim(),
      spot_url: extractLink(item.spot_url),
      spot_btn: localizedString(item.spot_btn),
      spot_color: String(item.spot_color || "").trim() || "#8b5e4b",
      card_dir: normalizeCardDir(item.card_dir)
    };
  }).filter((h) => h.spot_name.trim() !== "" || h.spot_image !== "");
}
__name(parseHotspots, "parseHotspots");
function ensureConfig(config) {
  return config && typeof config == "object" ? config : {};
}
__name(ensureConfig, "ensureConfig");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const _VirtualAbayaBoutique = class _VirtualAbayaBoutique extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.activeId = null, this.boundLangHandler = () => this.requestUpdate(), this.boundKeyHandler = (e) => {
      e.key !== "Escape" || !this.activeId || (this.activeId = null);
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler), window.addEventListener("keydown", this.boundKeyHandler), this.ensureActiveSpot();
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), window.removeEventListener("keydown", this.boundKeyHandler), super.disconnectedCallback();
  }
  updated(changed) {
    changed.has("config") && this.ensureActiveSpot();
  }
  ensureActiveSpot() {
    const hotspots = this.hotspots;
    if (!hotspots.length) {
      this.activeId = null;
      return;
    }
    (!this.activeId || !hotspots.some((h) => h.spot_id === this.activeId)) && (this.activeId = hotspots[0].spot_id);
  }
  get cfg() {
    return ensureConfig(this.config);
  }
  get hotspots() {
    return parseHotspots(this.cfg.vab_hotspots);
  }
  selectSpot(id) {
    this.activeId = id;
    const cards = this.renderRoot.querySelectorAll("[data-spot-id]"), card = Array.from(cards).find((el) => el.dataset.spotId === id);
    card == null || card.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "nearest"
    });
  }
  stopLinkClick(e) {
    e.stopPropagation();
  }
  zoneHref(spot) {
    return isValidHref(spot.spot_url) ? spot.spot_url : "";
  }
  render() {
    const c = this.cfg, theme = readSectionTheme(c, "vab_"), animate = theme.animate && !prefersReducedMotion(), hotspots = this.hotspots, enablePulse = isTruthy(c.vab_enable_pulse, !0), mapImage = String(c.vab_map_image || "").trim(), title = localizedString(c.vab_title), desc = localizedString(c.vab_desc), active = hotspots.find((h) => h.spot_id === this.activeId) || hotspots[0] || null;
    return !hotspots.length && !mapImage ? html`<div class="fs-empty" role="status">
        ${t("أضيفي صورة البوتيك ومناطق التفاعل", "Add boutique image and interactive zones")}
      </div>` : html`
      <section
        class=${classMap({
      "fs-section": !0,
      "fs-animate": animate
    })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("بوتيك العبايات التفاعلي", "Virtual abaya boutique")}
      >
        <div class="fs-container">
          ${title || desc ? html`<header class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </header>` : nothing}

          <div class="vab-shell">
            <div class="vab-map-panel">
              ${mapImage ? html`<img
                    class="vab-map"
                    src=${mapImage}
                    alt=${title || t("خريطة البوتيك", "Boutique map")}
                    loading="eager"
                    decoding="async"
                  />` : html`<div class="fs-empty" style="min-height:280px;place-content:center;">
                    ${t("أضيفي صورة الخريطة", "Add a map image")}
                  </div>`}
              <div class="vab-map-veil" aria-hidden="true"></div>

              ${active ? html`<div class="vab-map-caption">
                    <strong>${active.spot_name}</strong>
                    <span>
                      ${t(
      "اضغطي على النقاط أو البطاقات للاستكشاف",
      "Tap pins or cards to explore"
    )}
                    </span>
                  </div>` : nothing}

              ${hotspots.map(
      (spot, index) => html`
                  <button
                    type="button"
                    class=${classMap({
        "vab-hotspot": !0,
        "vab-hotspot--pulse": enablePulse && animate,
        "fs-animate": animate
      })}
                    style=${styleMap({
        left: `${spot.pos_x}%`,
        top: `${spot.pos_y}%`,
        "--spot-color": spot.spot_color
      })}
                    aria-label=${spot.spot_name}
                    aria-pressed=${this.activeId === spot.spot_id ? "true" : "false"}
                    @click=${() => this.selectSpot(spot.spot_id)}
                  >
                    <span class="vab-hotspot__index">${index + 1}</span>
                  </button>
                `
    )}
            </div>

            <aside class="vab-gallery" aria-label=${t("بطاقات المناطق", "Zone cards")}>
              <div class="vab-gallery__head">
                <h3>${t("مناطق البوتيك", "Boutique zones")}</h3>
                <span class="vab-gallery__count">
                  ${hotspots.length}
                  ${t("منطقة", "zones")}
                </span>
              </div>

              ${hotspots.length ? html`
                    <div class="vab-cards" role="list">
                      ${hotspots.map(
      (spot, index) => this.renderZoneCard(spot, index, animate)
    )}
                    </div>

                    ${active ? this.renderActiveDetail(active) : nothing}
                  ` : html`<div class="fs-empty">
                    ${t("لا توجد مناطق مضافة بعد", "No zones added yet")}
                  </div>`}
            </aside>
          </div>
        </div>
        ${renderCommerceOutcome(this.config || {}, "vab_")}
      </section>
    `;
  }
  renderZoneCard(spot, index, animate) {
    const active = this.activeId === spot.spot_id, href = this.zoneHref(spot);
    return html`
      <div
        class=${classMap({
      "vab-card": !0,
      "vab-card--active": active,
      "fs-animate": animate
    })}
        data-spot-id=${spot.spot_id}
        role="listitem"
        tabindex="0"
        aria-pressed=${active ? "true" : "false"}
        @click=${() => this.selectSpot(spot.spot_id)}
        @keydown=${(e) => {
      (e.key === "Enter" || e.key === " ") && (e.preventDefault(), this.selectSpot(spot.spot_id));
    }}
      >
        <div class="vab-card__media">
          ${spot.spot_image ? html`<img
                src=${spot.spot_image}
                alt=${spot.spot_name}
                loading=${index === 0 ? "eager" : "lazy"}
                decoding="async"
              />` : nothing}
          <span
            class="vab-card__dot"
            style=${styleMap({ "--spot-color": spot.spot_color })}
            aria-hidden="true"
          ></span>
        </div>
        <div class="vab-card__body">
          <div class="vab-card__text">
            <h4 class="vab-card__title">
              ${spot.spot_name || `${t("منطقة", "Zone")} ${index + 1}`}
            </h4>
            ${spot.spot_desc ? html`<p class="vab-card__desc">${spot.spot_desc}</p>` : nothing}
          </div>
          <div class="vab-card__actions">
            <span class="vab-card__status ${active ? "vab-card__status--on" : ""}">
              ${active ? t("مختارة الآن", "Selected") : t("عرض التفاصيل", "View details")}
            </span>
            ${isValidHref(href) ? html`<a
                  class="vab-card__cta"
                  href=${href}
                  @click=${this.stopLinkClick}
                >
                  ${spot.spot_btn || t("استكشفي", "Explore")}
                </a>` : nothing}
          </div>
        </div>
      </div>
    `;
  }
  renderActiveDetail(spot) {
    const href = this.zoneHref(spot);
    return html`
      <div
        class="vab-detail"
        aria-live="polite"
        aria-label=${spot.spot_name || t("تفاصيل المنطقة", "Zone details")}
      >
        <div class="vab-detail__head">
          <span class="vab-detail__title">
            ${spot.spot_name || t("تفاصيل المنطقة", "Zone details")}
          </span>
        </div>
        ${spot.spot_image ? html`<img
              class="vab-detail__hero"
              src=${spot.spot_image}
              alt=${spot.spot_name || ""}
              loading="lazy"
              decoding="async"
            />` : nothing}
        ${spot.spot_desc ? html`<p class="vab-products__status">${spot.spot_desc}</p>` : html`<p class="vab-products__status">
              ${t(
      "أضيفي وصفاً أو رابطاً لهذه المنطقة لإكمال التجربة.",
      "Add a description or link for this zone to complete the experience."
    )}
            </p>`}

        ${isValidHref(href) ? html`<div class="vab-detail__actions">
              <a class="fs-btn vab-detail__cta" href=${href}>
                ${spot.spot_btn || t("استكشفي المنطقة", "Explore zone")}
              </a>
            </div>` : nothing}
      </div>
    `;
  }
};
__name(_VirtualAbayaBoutique, "VirtualAbayaBoutique"), _VirtualAbayaBoutique.styles = [
  sharedSectionCss,
  componentStyles,
  css`
      :host {
        direction: inherit;
      }
    `
];
let VirtualAbayaBoutique = _VirtualAbayaBoutique;
__decorateClass([
  property({ type: Object })
], VirtualAbayaBoutique.prototype, "config");
__decorateClass([
  state()
], VirtualAbayaBoutique.prototype, "activeId");
typeof VirtualAbayaBoutique < "u" && VirtualAbayaBoutique.registerSallaComponent("salla-virtual-abaya-boutique");
export {
  VirtualAbayaBoutique as default
};
