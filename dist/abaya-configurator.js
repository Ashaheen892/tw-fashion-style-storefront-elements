import { css as G, LitElement as E, nothing as m, html as r } from "lit";
import { property as D, state as v } from "lit/decorators.js";
import { classMap as k } from "lit/directives/class-map.js";
import { styleMap as T } from "lit/directives/style-map.js";
import { k as H, m as q, n as K, l, e as z, i as A, d as b, o as W, s as V, p as M, c as Y, t as d, r as J, b as Q, q as X, a as Z, j as R } from "./sharedStyles-BGb_aVO_.js";
const ee = G`
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
    border: 1px solid color-mix(in srgb, var(--accent-color, #8b5e4b) 45%, transparent);
    background: transparent;
    color: var(--accent-color, #8b5e4b);
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
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 10%, transparent);
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
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 6%, transparent);
  }

  .acfg-option[aria-pressed='true'] {
    border-color: color-mix(in srgb, var(--accent-color, #8b5e4b) 55%, transparent);
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 8%, #fff);
  }

  .acfg-option__media,
  .acfg-option__swatch {
    width: 3.4rem;
    height: 3.4rem;
    object-fit: cover;
    display: block;
  }

  .acfg-option__swatch {
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 35%, #ddd);
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
    min-height: 2.65rem;
    border-radius: calc(var(--section-radius, 16px) * 0.35);
    font-size: 0.82rem;
    justify-content: center;
  }

  .acfg-copy-msg {
    margin: 0;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--accent-color, #8b5e4b);
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
function te(n) {
  return K(n).map((e, o) => {
    const i = l(e.group_name), t = l(e.option_name), a = l(e.group_key) || i || "default";
    return {
      group_key: a,
      group_name: i || a,
      group_order: b(e.group_order, 0),
      option_id: l(e.option_id) || t || `opt-${o + 1}`,
      option_name: t,
      overlay_image: z(e.overlay_image),
      price_delta: b(e.price_delta, 0),
      is_default: A(e.is_default),
      option_desc: l(e.option_desc),
      thumb_image: z(e.thumb_image),
      swatch_color: l(e.swatch_color)
    };
  }).filter((e) => e.option_name);
}
function oe(n) {
  const e = H(n, "group_key"), o = [];
  for (const [i, t] of e) {
    const a = q(t, "group_order"), c = a[0];
    o.push({
      key: i,
      name: c.group_name || i,
      order: c.group_order,
      options: a
    });
  }
  return o.sort((i, t) => i.order - t.order);
}
function j(n) {
  const e = {};
  for (const o of n) {
    const i = o.options.find((t) => t.is_default) || o.options[0];
    i && (e[o.key] = i.option_id);
  }
  return e;
}
function L(n, e, o) {
  let i = n;
  for (const t of e) {
    const a = o[t.key], c = t.options.find((g) => g.option_id === a);
    c && (i += c.price_delta);
  }
  return i;
}
function ie(n, e, o, i) {
  const t = [];
  t.push(`${i}`), t.push(`Base: ${o}`);
  for (const a of n) {
    const c = e[a.key], g = a.options.find((w) => w.option_id === c);
    g && (t.push(`${a.name}: ${g.option_name}`), g.price_delta && t.push(`  +${g.price_delta}`), g.option_desc && t.push(`  ${g.option_desc}`));
  }
  return t.push(`Total: ${L(o, n, e)} ${i}`), t.join(`
`);
}
function ae(n, e) {
  return W(n, e);
}
var re = Object.defineProperty, _ = (n, e, o, i) => {
  for (var t = void 0, a = n.length - 1, c; a >= 0; a--)
    (c = n[a]) && (t = c(e, o, t) || t);
  return t && re(e, o, t), t;
}, f;
const u = (f = class extends E {
  constructor() {
    super(...arguments), this.config = {}, this.selections = {}, this.copyMsg = "", this.recommendFlash = !1, this.previewPulse = !1, this.boundLangHandler = () => this.requestUpdate(), this.copyTimer = null, this.recommendTimer = null, this.pulseTimer = null;
  }
  connectedCallback() {
    super.connectedCallback(), this._ensureFonts(), window.addEventListener("language-changed", this.boundLangHandler), this.initSelections();
  }
  _ensureFonts() {
    if (f.fontsReady || typeof document > "u") return;
    const e = "acfg-luxury-fonts";
    if (document.getElementById(e)) {
      f.fontsReady = !0;
      return;
    }
    const o = document.createElement("link");
    o.id = e, o.rel = "stylesheet", o.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;500;600;700&display=swap", document.head.appendChild(o), f.fontsReady = !0;
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), this.copyTimer && clearTimeout(this.copyTimer), this.recommendTimer && clearTimeout(this.recommendTimer), this.pulseTimer && clearTimeout(this.pulseTimer), super.disconnectedCallback();
  }
  get groups() {
    return oe(te(this.config.acfg_options));
  }
  initSelections() {
    const e = this.groups;
    e.length && (this.selections = j(e));
  }
  updated(e) {
    e.has("config") && this.initSelections();
  }
  selectOption(e, o) {
    this.selections[e] !== o && (this.selections = { ...this.selections, [e]: o }, this.pulsePreview());
  }
  pulsePreview() {
    M() || (this.previewPulse = !0, this.pulseTimer && clearTimeout(this.pulseTimer), this.pulseTimer = setTimeout(() => {
      this.previewPulse = !1;
    }, 420));
  }
  applyRecommended() {
    const e = j(this.groups);
    this.selections = e, this.recommendFlash = !0, this.pulsePreview(), this.recommendTimer && clearTimeout(this.recommendTimer), this.recommendTimer = setTimeout(() => {
      this.recommendFlash = !1;
    }, 1600);
  }
  hasRecommended() {
    return this.groups.some((e) => e.options.some((o) => o.is_default));
  }
  async handleCopy() {
    const e = l(this.config.acfg_currency) || "ر.س", o = b(this.config.acfg_base_price, 0), i = ie(this.groups, this.selections, o, e), t = await Y(i);
    this.copyMsg = t ? d("تم نسخ التصميم", "Design copied") : d("تعذر النسخ", "Could not copy"), this.copyTimer && clearTimeout(this.copyTimer), this.copyTimer = setTimeout(() => {
      this.copyMsg = "";
    }, 2400);
  }
  getOverlayImages() {
    return this.groups.map((e, o) => {
      const i = this.selections[e.key], t = e.options.find((c) => c.option_id === i), a = (t == null ? void 0 : t.overlay_image) || "";
      return a ? { groupKey: e.key, src: a, z: o + 1 } : null;
    }).filter((e) => !!e);
  }
  render() {
    const e = this.config || {}, o = J(e, "acfg_"), i = o.animate && !M(), t = this.groups, a = l(e.acfg_currency) || "ر.س", c = b(e.acfg_base_price, 0), g = L(c, t, this.selections), w = A(e.acfg_show_price, !0), C = z(e.acfg_base_image), P = Q(e.acfg_product_url), F = X(e.acfg_preview_side, "right"), I = l(e.acfg_whatsapp), U = l(e.acfg_whatsapp_msg) || d("أرغب في هذا التصميم", "I would like this design"), S = ae(I, U), N = this.getOverlayImages(), h = l(e.acfg_title), $ = l(e.acfg_desc), B = l(e.acfg_recommend_btn) || d("الموصى به", "Recommended");
    return r`
      <section
        class=${k({
      "fs-section": !0,
      "fs-animate": i
    })}
        style=${T(Z(o))}
        aria-label=${h || d("مصممة العباية", "Abaya configurator")}
      >
        <div class="fs-container">
          ${h || $ ? r`<div class="fs-header">
                ${h ? r`<h2 class="fs-title">${h}</h2>` : m}
                ${$ ? r`<p class="fs-desc">${$}</p>` : m}
              </div>` : m}

          ${t.length ? r`<div class="acfg-studio">
                <div
                  class=${k({
      "acfg-layout": !0,
      "acfg-layout--preview-left": F === "left"
    })}
                >
                  <div class="acfg-controls">
                    ${this.hasRecommended() ? r`<div class="acfg-toolbar">
                          <button
                            type="button"
                            class="acfg-recommend"
                            @click=${this.applyRecommended}
                          >
                            ${B}
                          </button>
                          ${this.recommendFlash ? r`<span class="acfg-flash" role="status">
                                ${d("تم التطبيق", "Applied")}
                              </span>` : m}
                        </div>` : m}

                    ${t.map((p) => {
      const y = p.options.find(
        (s) => s.option_id === this.selections[p.key]
      );
      return r`
                        <div class="acfg-group">
                          <div class="acfg-group__head">
                            <h3 class="acfg-group__title">${p.name}</h3>
                            ${y ? r`<span class="acfg-group__pick">${y.option_name}</span>` : m}
                          </div>
                          <div class="acfg-options" role="list">
                            ${p.options.map((s) => {
        const x = this.selections[p.key] === s.option_id;
        return r`
                                <button
                                  type="button"
                                  class="acfg-option"
                                  role="listitem"
                                  aria-pressed=${x ? "true" : "false"}
                                  aria-label=${s.option_name}
                                  title=${s.option_desc ? `${s.option_name} — ${s.option_desc}` : s.option_name}
                                  @click=${() => this.selectOption(p.key, s.option_id)}
                                >
                                  ${s.thumb_image ? r`<img
                                        class="acfg-option__media"
                                        src=${s.thumb_image}
                                        alt=""
                                        loading="lazy"
                                        decoding="async"
                                      />` : r`<span
                                        class="acfg-option__media acfg-option__swatch"
                                        style=${s.swatch_color ? T({ background: s.swatch_color }) : m}
                                        aria-hidden="true"
                                      ></span>`}
                                  <span class="acfg-option__name">${s.option_name}</span>
                                  ${s.price_delta ? r`<span class="acfg-option__delta">
                                        +${R(s.price_delta, a)}
                                      </span>` : m}
                                </button>
                              `;
      })}
                          </div>
                        </div>
                      `;
    })}

                    <div class="acfg-summary">
                      ${w ? r`<p class="acfg-price">
                            <span>${d("السعر", "Price")}</span>
                            ${R(g, a)}
                          </p>` : m}

                      <ul class="acfg-summary__list">
                        ${t.map((p) => {
      const y = this.selections[p.key], s = p.options.find((x) => x.option_id === y);
      return r`<li>
                            <span>${p.name}</span>
                            <strong>${(s == null ? void 0 : s.option_name) || "—"}</strong>
                          </li>`;
    })}
                      </ul>

                      <div class="acfg-actions">
                        ${P ? r`<a class="fs-btn" href=${P}>
                              ${l(e.acfg_finish_btn) || d("فتح المنتج", "Open product")}
                            </a>` : m}
                        <button
                          type="button"
                          class="fs-btn fs-btn--ghost"
                          @click=${this.handleCopy}
                        >
                          ${d("نسخ التصميم", "Copy design")}
                        </button>
                        ${S ? r`<a
                              class="fs-btn fs-btn--ghost"
                              href=${S}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              ${d("واتساب", "WhatsApp")}
                            </a>` : m}
                      </div>
                      ${this.copyMsg ? r`<p class="acfg-copy-msg" role="status">${this.copyMsg}</p>` : m}
                    </div>
                  </div>

                  <div class="acfg-preview-wrap">
                    <div
                      class=${k({
      "acfg-preview": !0,
      "acfg-preview--pulse": this.previewPulse && i
    })}
                      aria-label=${d("معاينة التصميم", "Design preview")}
                    >
                      ${C ? r`<img
                            class="acfg-preview__base"
                            src=${C}
                            alt=${h || d("عباءة أساسية", "Base abaya")}
                            loading="eager"
                            decoding="async"
                          />` : r`<div class="acfg-preview__empty">
                            ${d("أضيفي الصورة الأساسية", "Add base image")}
                          </div>`}
                      ${N.map(
      (p) => r`<img
                          class="acfg-preview__overlay"
                          style=${T({ zIndex: String(p.z) })}
                          src=${p.src}
                          alt=""
                          loading="lazy"
                          decoding="async"
                        />`
    )}
                    </div>
                  </div>
                </div>
              </div>` : m}
        </div>
      </section>
    `;
  }
}, f.fontsReady = !1, f.styles = [V, ee, G`
    :host {
      direction: inherit;
    }
  `], f);
_([
  D({ type: Object })
], u.prototype, "config");
_([
  v()
], u.prototype, "selections");
_([
  v()
], u.prototype, "copyMsg");
_([
  v()
], u.prototype, "recommendFlash");
_([
  v()
], u.prototype, "previewPulse");
let O = u;
typeof O < "u" && O.registerSallaComponent("salla-abaya-configurator");
export {
  O as default
};
