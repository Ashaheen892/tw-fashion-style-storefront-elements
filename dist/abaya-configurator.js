var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, nothing, html } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { j as groupByKey, k as sortByOrder, n as normalizeCollection, l as localizedString, e as extractImageUrl, i as isTruthy, f as toNumber, m as buildWhatsAppUrl, s as sharedSectionCss, p as prefersReducedMotion, c as copyText, t, r as readSectionTheme, d as extractLink, o as getRadioValue, a as themeStyleMap, h as formatPrice, b as renderCommerceOutcome } from "./sharedStyles-Q5qADHV9.js";
const componentStyles = css`
  .fs-header {
    margin-bottom: 1.5rem;
  }

  .fs-title {
    font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
    font-size: clamp(1.85rem, 3.5vw, 2.6rem);
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  .fs-desc {
    max-width: 32rem;
    margin-inline: auto;
    font-size: 0.92rem;
    line-height: 1.75;
    color: var(--muted-color, #7a6a62);
  }

  .acfg-studio {
    font-family: Manrope, 'Avenir Next', 'Segoe UI', sans-serif;
  }

  .acfg-layout {
    display: grid;
    gap: 1.5rem;
  }

  @media (min-width: 960px) {
    .acfg-layout {
      grid-template-columns: minmax(0, 1fr) minmax(300px, 0.95fr);
      align-items: start;
      gap: 2.5rem;
    }

    .acfg-layout--preview-left {
      grid-template-columns: minmax(300px, 0.95fr) minmax(0, 1fr);
    }

    .acfg-layout--preview-left .acfg-preview-wrap {
      order: -1;
    }

    .acfg-preview-wrap {
      position: sticky;
      top: 1rem;
    }
  }

  .acfg-preview-wrap {
    display: block;
  }

  .acfg-preview {
    position: relative;
    aspect-ratio: 3 / 4;
    max-height: min(38rem, 76vh);
    width: 100%;
    overflow: hidden;
    background: #141210;
  }

  .acfg-preview--pulse .acfg-preview__base {
    animation: acfg-preview-pulse 0.5s ease;
  }

  .acfg-preview__base,
  .acfg-preview__overlay {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
  }

  .acfg-preview__base {
    z-index: 0;
  }

  .acfg-preview__overlay {
    z-index: 1;
    pointer-events: none;
  }

  .acfg-preview__empty {
    position: absolute;
    inset: 0;
    z-index: 2;
    display: grid;
    place-items: center;
    padding: 1.5rem;
    text-align: center;
    color: rgba(247, 239, 223, 0.65);
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.1rem;
  }

  .acfg-controls {
    display: grid;
    gap: 1.35rem;
  }

  .acfg-toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.65rem;
  }

  .acfg-recommend {
    appearance: none;
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, transparent);
    background: transparent;
    color: var(--accent-color, var(--fs-store-primary));
    min-height: 44px;
    padding: 0.45rem 0.9rem;
    font: inherit;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease;
  }

  .acfg-recommend:hover {
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, transparent);
  }

  .acfg-flash {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--muted-color, #7a6a62);
  }

  .acfg-group {
    display: grid;
    gap: 0.7rem;
    padding-bottom: 1.15rem;
    border-bottom: 1px solid color-mix(in srgb, var(--border-color, #e8ddd6) 85%, transparent);
  }

  .acfg-group:last-of-type {
    border-bottom: none;
    padding-bottom: 0;
  }

  .acfg-group__head {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.35rem 0.75rem;
  }

  .acfg-group__title {
    margin: 0;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-color, #2b211c);
  }

  .acfg-group__pick {
    font-size: 0.78rem;
    font-weight: 500;
    color: var(--muted-color, #7a6a62);
  }

  .acfg-options {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .acfg-option {
    position: relative;
    display: grid;
    justify-items: center;
    gap: 0.35rem;
    width: 5.5rem;
    padding: 0.4rem 0.35rem 0.55rem;
    border: 1px solid transparent;
    background: transparent;
    cursor: pointer;
    font: inherit;
    color: inherit;
    transition: border-color 0.2s ease, background 0.2s ease;
  }

  .acfg-option:hover {
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 6%, transparent);
  }

  .acfg-option[aria-pressed='true'] {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 55%, transparent);
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, #fff);
  }

  .acfg-option__media,
  .acfg-option__swatch {
    width: 3.4rem;
    height: 3.4rem;
    object-fit: cover;
    display: block;
  }

  .acfg-option__swatch {
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 35%, #ddd);
  }

  .acfg-option__name {
    font-size: 0.72rem;
    font-weight: 600;
    line-height: 1.3;
    text-align: center;
    color: var(--text-color, #2b211c);
    max-width: 100%;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .acfg-option__delta {
    font-size: 0.65rem;
    font-weight: 600;
    color: var(--muted-color, #7a6a62);
  }

  .acfg-summary {
    display: grid;
    gap: 0.9rem;
    padding-top: 0.25rem;
  }

  .acfg-price {
    margin: 0;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(1.75rem, 2.8vw, 2.15rem);
    font-weight: 600;
    color: var(--text-color, #2b211c);
    line-height: 1.15;
  }

  .acfg-price span {
    display: block;
    margin-bottom: 0.15rem;
    font-family: Manrope, 'Avenir Next', 'Segoe UI', sans-serif;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted-color, #7a6a62);
  }

  .acfg-summary__list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: 0.4rem;
  }

  .acfg-summary__list li {
    display: flex;
    justify-content: space-between;
    gap: 0.75rem;
    font-size: 0.85rem;
    line-height: 1.4;
  }

  .acfg-summary__list span {
    color: var(--muted-color, #7a6a62);
    flex: 0 0 auto;
  }

  .acfg-summary__list strong {
    font-weight: 600;
    text-align: end;
    color: var(--text-color, #2b211c);
  }

  .acfg-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .acfg-actions .fs-btn {
    flex: 1 1 auto;
    justify-content: center;
  }

  .acfg-copy-msg {
    margin: 0;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--accent-color, var(--fs-store-primary));
    text-align: center;
    animation: acfg-pop 0.3s ease both;
  }

  @keyframes acfg-pop {
    from {
      opacity: 0;
      transform: translateY(0.25rem);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @keyframes acfg-preview-pulse {
    0% {
      filter: brightness(1);
    }
    40% {
      filter: brightness(1.05);
    }
    100% {
      filter: brightness(1);
    }
  }

  @media (max-width: 959px) {
    .acfg-layout {
      gap: 1.2rem;
    }

    .acfg-preview {
      max-height: min(22rem, 52vh);
    }

    .acfg-controls {
      gap: 1.1rem;
    }

    .acfg-option {
      width: calc(33.333% - 0.35rem);
      min-width: 4.75rem;
    }

    .acfg-actions {
      display: grid;
      grid-template-columns: 1fr;
    }

    .acfg-actions .fs-btn {
      width: 100%;
    }
  }

  @media (max-width: 639px) {
    .acfg-preview {
      max-height: min(18rem, 46vh);
    }

    .acfg-option {
      width: calc(50% - 0.3rem);
      min-width: 0;
      padding: 0.35rem 0.25rem 0.5rem;
    }

    .acfg-option__media,
    .acfg-option__swatch {
      width: 3.1rem;
      height: 3.1rem;
    }

    .acfg-option__name {
      font-size: 0.74rem;
    }

    .acfg-group__title {
      font-size: 1.15rem;
    }

    .acfg-recommend {
      width: 100%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .acfg-option,
    .acfg-preview--pulse .acfg-preview__base,
    .acfg-copy-msg {
      transition: none !important;
      animation: none !important;
    }
  }
`;
function parseConfigOptions(raw) {
  return normalizeCollection(raw).map((item, index) => {
    const groupName = localizedString(item.group_name), optionName = localizedString(item.option_name), groupKey = localizedString(item.group_key) || groupName || "default";
    return {
      group_key: groupKey,
      group_name: groupName || groupKey,
      group_order: toNumber(item.group_order, 0),
      option_id: localizedString(item.option_id) || optionName || `opt-${index + 1}`,
      option_name: optionName,
      overlay_image: extractImageUrl(item.overlay_image),
      price_delta: toNumber(item.price_delta, 0),
      is_default: isTruthy(item.is_default),
      option_desc: localizedString(item.option_desc),
      thumb_image: extractImageUrl(item.thumb_image),
      swatch_color: localizedString(item.swatch_color)
    };
  }).filter((o) => o.option_name);
}
__name(parseConfigOptions, "parseConfigOptions");
function buildOptionGroups(options) {
  const map = groupByKey(options, "group_key"), groups = [];
  for (const [key, list] of map) {
    const sorted = sortByOrder(list, "group_order"), first = sorted[0];
    groups.push({
      key,
      name: first.group_name || key,
      order: first.group_order,
      options: sorted
    });
  }
  return groups.sort((a, b) => a.order - b.order);
}
__name(buildOptionGroups, "buildOptionGroups");
function defaultOptionSelections(groups) {
  const selections = {};
  for (const group of groups) {
    const def = group.options.find((o) => o.is_default) || group.options[0];
    def && (selections[group.key] = def.option_id);
  }
  return selections;
}
__name(defaultOptionSelections, "defaultOptionSelections");
function calcFinalPrice(basePrice, groups, selections) {
  let total = basePrice;
  for (const group of groups) {
    const id = selections[group.key], opt = group.options.find((o) => o.option_id === id);
    opt && (total += opt.price_delta);
  }
  return total;
}
__name(calcFinalPrice, "calcFinalPrice");
function buildDesignSummary(groups, selections, basePrice, currency) {
  const lines = [];
  lines.push(`${currency}`), lines.push(`Base: ${basePrice}`);
  for (const group of groups) {
    const id = selections[group.key], opt = group.options.find((o) => o.option_id === id);
    opt && (lines.push(`${group.name}: ${opt.option_name}`), opt.price_delta && lines.push(`  +${opt.price_delta}`), opt.option_desc && lines.push(`  ${opt.option_desc}`));
  }
  return lines.push(`Total: ${calcFinalPrice(basePrice, groups, selections)} ${currency}`), lines.join(`
`);
}
__name(buildDesignSummary, "buildDesignSummary");
function whatsAppLink(phone, message) {
  return buildWhatsAppUrl(phone, message);
}
__name(whatsAppLink, "whatsAppLink");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass"), _a;
const _AbayaConfigurator = (_a = class extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.selections = {}, this.copyMsg = "", this.recommendFlash = !1, this.previewPulse = !1, this.boundLangHandler = () => this.requestUpdate(), this.copyTimer = null, this.recommendTimer = null, this.pulseTimer = null;
  }
  connectedCallback() {
    super.connectedCallback(), this._ensureFonts(), window.addEventListener("language-changed", this.boundLangHandler), this.initSelections();
  }
  _ensureFonts() {
    if (_a.fontsReady || typeof document > "u") return;
    const id = "acfg-luxury-fonts";
    if (document.getElementById(id)) {
      _a.fontsReady = !0;
      return;
    }
    const link = document.createElement("link");
    link.id = id, link.rel = "stylesheet", link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;500;600;700&display=swap", document.head.appendChild(link), _a.fontsReady = !0;
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), this.copyTimer && clearTimeout(this.copyTimer), this.recommendTimer && clearTimeout(this.recommendTimer), this.pulseTimer && clearTimeout(this.pulseTimer), super.disconnectedCallback();
  }
  get groups() {
    return buildOptionGroups(parseConfigOptions(this.config.acfg_options));
  }
  initSelections() {
    const groups = this.groups;
    groups.length && (this.selections = defaultOptionSelections(groups));
  }
  updated(changed) {
    changed.has("config") && this.initSelections();
  }
  selectOption(groupKey, optionId) {
    this.selections[groupKey] !== optionId && (this.selections = { ...this.selections, [groupKey]: optionId }, this.pulsePreview());
  }
  pulsePreview() {
    prefersReducedMotion() || (this.previewPulse = !0, this.pulseTimer && clearTimeout(this.pulseTimer), this.pulseTimer = setTimeout(() => {
      this.previewPulse = !1;
    }, 420));
  }
  applyRecommended() {
    const next = defaultOptionSelections(this.groups);
    this.selections = next, this.recommendFlash = !0, this.pulsePreview(), this.recommendTimer && clearTimeout(this.recommendTimer), this.recommendTimer = setTimeout(() => {
      this.recommendFlash = !1;
    }, 1600);
  }
  hasRecommended() {
    return this.groups.some((g) => g.options.some((o) => o.is_default));
  }
  async handleCopy() {
    const currency = localizedString(this.config.acfg_currency) || "ر.س", basePrice = toNumber(this.config.acfg_base_price, 0), text = buildDesignSummary(this.groups, this.selections, basePrice, currency), ok = await copyText(text);
    this.copyMsg = ok ? t("تم نسخ التصميم", "Design copied") : t("تعذر النسخ", "Could not copy"), this.copyTimer && clearTimeout(this.copyTimer), this.copyTimer = setTimeout(() => {
      this.copyMsg = "";
    }, 2400);
  }
  getOverlayImages() {
    return this.groups.map((g, index) => {
      const id = this.selections[g.key], opt = g.options.find((o) => o.option_id === id), src = (opt == null ? void 0 : opt.overlay_image) || "";
      return src ? { groupKey: g.key, src, z: index + 1 } : null;
    }).filter((x) => !!x);
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "acfg_"), animate = theme.animate && !prefersReducedMotion(), groups = this.groups, currency = localizedString(c.acfg_currency) || "ر.س", basePrice = toNumber(c.acfg_base_price, 0), finalPrice = calcFinalPrice(basePrice, groups, this.selections), showPrice = isTruthy(c.acfg_show_price, !0), baseImage = extractImageUrl(c.acfg_base_image), productUrl = extractLink(c.acfg_product_url), previewSide = getRadioValue(c.acfg_preview_side, "right"), waPhone = localizedString(c.acfg_whatsapp), waMsg = localizedString(c.acfg_whatsapp_msg) || t("أرغب في هذا التصميم", "I would like this design"), waUrl = whatsAppLink(waPhone, waMsg), overlays = this.getOverlayImages(), title = localizedString(c.acfg_title), desc = localizedString(c.acfg_desc), recommendLabel = localizedString(c.acfg_recommend_btn) || t("الموصى به", "Recommended");
    return html`
      <section
        class=${classMap({
      "fs-section": !0,
      "fs-animate": animate
    })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("مصممة العباية", "Abaya configurator")}
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header fs-header--editorial">
                <p class="fs-eyebrow">${t("صمّم إطلالتك", "Design your look")}</p>
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                <span class="fs-title-line" aria-hidden="true"></span>
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}

          ${groups.length ? html`<div class="acfg-studio">
                <div
                  class=${classMap({
      "acfg-layout": !0,
      "acfg-layout--preview-left": previewSide === "left"
    })}
                >
                  <div class="acfg-controls">
                    ${this.hasRecommended() ? html`<div class="acfg-toolbar">
                          <button
                            type="button"
                            class="acfg-recommend"
                            @click=${this.applyRecommended}
                          >
                            ${recommendLabel}
                          </button>
                          ${this.recommendFlash ? html`<span class="acfg-flash" role="status">
                                ${t("تم التطبيق", "Applied")}
                              </span>` : nothing}
                        </div>` : nothing}

                    ${groups.map((group) => {
      const selected = group.options.find(
        (o) => o.option_id === this.selections[group.key]
      );
      return html`
                        <div class="acfg-group">
                          <div class="acfg-group__head">
                            <h3 class="acfg-group__title">${group.name}</h3>
                            ${selected ? html`<span class="acfg-group__pick">${selected.option_name}</span>` : nothing}
                          </div>
                          <div class="acfg-options" role="list">
                            ${group.options.map((opt) => {
        const pressed = this.selections[group.key] === opt.option_id;
        return html`
                                <button
                                  type="button"
                                  class="acfg-option"
                                  role="listitem"
                                  aria-pressed=${pressed ? "true" : "false"}
                                  aria-label=${opt.option_name}
                                  title=${opt.option_desc ? `${opt.option_name} — ${opt.option_desc}` : opt.option_name}
                                  @click=${() => this.selectOption(group.key, opt.option_id)}
                                >
                                  ${opt.thumb_image ? html`<img
                                        class="acfg-option__media"
                                        src=${opt.thumb_image}
                                        alt=""
                                        loading="lazy"
                                        decoding="async"
                                      />` : html`<span
                                        class="acfg-option__media acfg-option__swatch"
                                        style=${opt.swatch_color ? styleMap({ background: opt.swatch_color }) : nothing}
                                        aria-hidden="true"
                                      ></span>`}
                                  <span class="acfg-option__name">${opt.option_name}</span>
                                  ${opt.price_delta ? html`<span class="acfg-option__delta">
                                        +${formatPrice(opt.price_delta, currency)}
                                      </span>` : nothing}
                                </button>
                              `;
      })}
                          </div>
                        </div>
                      `;
    })}

                    <div class="acfg-summary">
                      ${showPrice ? html`<p class="acfg-price">
                            <span>${t("السعر", "Price")}</span>
                            ${formatPrice(finalPrice, currency)}
                          </p>` : nothing}

                      <ul class="acfg-summary__list">
                        ${groups.map((g) => {
      const id = this.selections[g.key], opt = g.options.find((o) => o.option_id === id);
      return html`<li>
                            <span>${g.name}</span>
                            <strong>${(opt == null ? void 0 : opt.option_name) || "—"}</strong>
                          </li>`;
    })}
                      </ul>

                      <div class="acfg-actions">
                        ${productUrl ? html`<a class="fs-btn" href=${productUrl}>
                              ${localizedString(c.acfg_finish_btn) || t("فتح المنتج", "Open product")}
                            </a>` : nothing}
                        <button
                          type="button"
                          class="fs-btn fs-btn--ghost"
                          @click=${this.handleCopy}
                        >
                          ${t("نسخ التصميم", "Copy design")}
                        </button>
                        ${waUrl ? html`<a
                              class="fs-btn fs-btn--ghost"
                              href=${waUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              ${t("واتساب", "WhatsApp")}
                            </a>` : nothing}
                      </div>
                      ${this.copyMsg ? html`<p class="acfg-copy-msg" role="status">${this.copyMsg}</p>` : nothing}
                    </div>
                  </div>

                  <div class="acfg-preview-wrap">
                    <div
                      class=${classMap({
      "acfg-preview": !0,
      "acfg-preview--pulse": this.previewPulse && animate
    })}
                      aria-label=${t("معاينة التصميم", "Design preview")}
                    >
                      ${baseImage ? html`<img
                            class="acfg-preview__base"
                            src=${baseImage}
                            alt=${title || t("عباءة أساسية", "Base abaya")}
                            loading="eager"
                            decoding="async"
                          />` : html`<div class="acfg-preview__empty">
                            ${t("أضيفي الصورة الأساسية", "Add base image")}
                          </div>`}
                      ${overlays.map(
      (o) => html`<img
                          class="acfg-preview__overlay"
                          style=${styleMap({ zIndex: String(o.z) })}
                          src=${o.src}
                          alt=""
                          loading="lazy"
                          decoding="async"
                        />`
    )}
                    </div>
                  </div>
                </div>
              </div>` : nothing}
        </div>
        ${renderCommerceOutcome(this.config || {}, "acfg_")}
      </section>
    `;
  }
}, __name(_a, "_AbayaConfigurator"), _a.fontsReady = !1, _a.styles = [sharedSectionCss, componentStyles, css`
    :host {
      direction: inherit;
    }
  `], _a);
__decorateClass([
  property({ type: Object })
], _AbayaConfigurator.prototype, "config");
__decorateClass([
  state()
], _AbayaConfigurator.prototype, "selections");
__decorateClass([
  state()
], _AbayaConfigurator.prototype, "copyMsg");
__decorateClass([
  state()
], _AbayaConfigurator.prototype, "recommendFlash");
__decorateClass([
  state()
], _AbayaConfigurator.prototype, "previewPulse");
let AbayaConfigurator = _AbayaConfigurator;
typeof AbayaConfigurator < "u" && AbayaConfigurator.registerSallaComponent("salla-abaya-configurator");
export {
  AbayaConfigurator as default
};
