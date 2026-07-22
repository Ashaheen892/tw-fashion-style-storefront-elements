import { css as G, LitElement as E, nothing as f, html as r } from "lit";
import { property as D, state as b } from "lit/decorators.js";
import { classMap as k } from "lit/directives/class-map.js";
import { styleMap as T } from "lit/directives/style-map.js";
import { j as H, k as K, n as W, l as p, e as z, i as A, f as v, m as q, s as V, p as M, c as Y, t as l, r as J, d as Q, o as X, a as Z, h as O, b as ee } from "./sharedStyles-Cd7RKVf-.js";
const te = G`
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
function oe(n) {
  return W(n).map((e, o) => {
    const a = p(e.group_name), t = p(e.option_name), i = p(e.group_key) || a || "default";
    return {
      group_key: i,
      group_name: a || i,
      group_order: v(e.group_order, 0),
      option_id: p(e.option_id) || t || `opt-${o + 1}`,
      option_name: t,
      overlay_image: z(e.overlay_image),
      price_delta: v(e.price_delta, 0),
      is_default: A(e.is_default),
      option_desc: p(e.option_desc),
      thumb_image: z(e.thumb_image),
      swatch_color: p(e.swatch_color)
    };
  }).filter((e) => e.option_name);
}
function ae(n) {
  const e = H(n, "group_key"), o = [];
  for (const [a, t] of e) {
    const i = K(t, "group_order"), c = i[0];
    o.push({
      key: a,
      name: c.group_name || a,
      order: c.group_order,
      options: i
    });
  }
  return o.sort((a, t) => a.order - t.order);
}
function R(n) {
  const e = {};
  for (const o of n) {
    const a = o.options.find((t) => t.is_default) || o.options[0];
    a && (e[o.key] = a.option_id);
  }
  return e;
}
function L(n, e, o) {
  let a = n;
  for (const t of e) {
    const i = o[t.key], c = t.options.find((d) => d.option_id === i);
    c && (a += c.price_delta);
  }
  return a;
}
function ie(n, e, o, a) {
  const t = [];
  t.push(`${a}`), t.push(`Base: ${o}`);
  for (const i of n) {
    const c = e[i.key], d = i.options.find((w) => w.option_id === c);
    d && (t.push(`${i.name}: ${d.option_name}`), d.price_delta && t.push(`  +${d.price_delta}`), d.option_desc && t.push(`  ${d.option_desc}`));
  }
  return t.push(`Total: ${L(o, n, e)} ${a}`), t.join(`
`);
}
function re(n, e) {
  return q(n, e);
}
var se = Object.defineProperty, _ = (n, e, o, a) => {
  for (var t = void 0, i = n.length - 1, c; i >= 0; i--)
    (c = n[i]) && (t = c(e, o, t) || t);
  return t && se(e, o, t), t;
}, g;
const u = (g = class extends E {
  constructor() {
    super(...arguments), this.config = {}, this.selections = {}, this.copyMsg = "", this.recommendFlash = !1, this.previewPulse = !1, this.boundLangHandler = () => this.requestUpdate(), this.copyTimer = null, this.recommendTimer = null, this.pulseTimer = null;
  }
  connectedCallback() {
    super.connectedCallback(), this._ensureFonts(), window.addEventListener("language-changed", this.boundLangHandler), this.initSelections();
  }
  _ensureFonts() {
    if (g.fontsReady || typeof document > "u") return;
    const e = "acfg-luxury-fonts";
    if (document.getElementById(e)) {
      g.fontsReady = !0;
      return;
    }
    const o = document.createElement("link");
    o.id = e, o.rel = "stylesheet", o.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;500;600;700&display=swap", document.head.appendChild(o), g.fontsReady = !0;
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), this.copyTimer && clearTimeout(this.copyTimer), this.recommendTimer && clearTimeout(this.recommendTimer), this.pulseTimer && clearTimeout(this.pulseTimer), super.disconnectedCallback();
  }
  get groups() {
    return ae(oe(this.config.acfg_options));
  }
  initSelections() {
    const e = this.groups;
    e.length && (this.selections = R(e));
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
    const e = R(this.groups);
    this.selections = e, this.recommendFlash = !0, this.pulsePreview(), this.recommendTimer && clearTimeout(this.recommendTimer), this.recommendTimer = setTimeout(() => {
      this.recommendFlash = !1;
    }, 1600);
  }
  hasRecommended() {
    return this.groups.some((e) => e.options.some((o) => o.is_default));
  }
  async handleCopy() {
    const e = p(this.config.acfg_currency) || "ر.س", o = v(this.config.acfg_base_price, 0), a = ie(this.groups, this.selections, o, e), t = await Y(a);
    this.copyMsg = t ? l("تم نسخ التصميم", "Design copied") : l("تعذر النسخ", "Could not copy"), this.copyTimer && clearTimeout(this.copyTimer), this.copyTimer = setTimeout(() => {
      this.copyMsg = "";
    }, 2400);
  }
  getOverlayImages() {
    return this.groups.map((e, o) => {
      const a = this.selections[e.key], t = e.options.find((c) => c.option_id === a), i = (t == null ? void 0 : t.overlay_image) || "";
      return i ? { groupKey: e.key, src: i, z: o + 1 } : null;
    }).filter((e) => !!e);
  }
  render() {
    const e = this.config || {}, o = J(e, "acfg_"), a = o.animate && !M(), t = this.groups, i = p(e.acfg_currency) || "ر.س", c = v(e.acfg_base_price, 0), d = L(c, t, this.selections), w = A(e.acfg_show_price, !0), C = z(e.acfg_base_image), P = Q(e.acfg_product_url), F = X(e.acfg_preview_side, "right"), I = p(e.acfg_whatsapp), U = p(e.acfg_whatsapp_msg) || l("أرغب في هذا التصميم", "I would like this design"), S = re(I, U), N = this.getOverlayImages(), h = p(e.acfg_title), $ = p(e.acfg_desc), B = p(e.acfg_recommend_btn) || l("الموصى به", "Recommended");
    return r`
      <section
        class=${k({
      "fs-section": !0,
      "fs-animate": a
    })}
        style=${T(Z(o))}
        aria-label=${h || l("مصممة العباية", "Abaya configurator")}
      >
        <div class="fs-container">
          ${h || $ ? r`<div class="fs-header fs-header--editorial">
                <p class="fs-eyebrow">${l("صمّم إطلالتك", "Design your look")}</p>
                ${h ? r`<h2 class="fs-title">${h}</h2>` : f}
                <span class="fs-title-line" aria-hidden="true"></span>
                ${$ ? r`<p class="fs-desc">${$}</p>` : f}
              </div>` : f}

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
                                ${l("تم التطبيق", "Applied")}
                              </span>` : f}
                        </div>` : f}

                    ${t.map((m) => {
      const y = m.options.find(
        (s) => s.option_id === this.selections[m.key]
      );
      return r`
                        <div class="acfg-group">
                          <div class="acfg-group__head">
                            <h3 class="acfg-group__title">${m.name}</h3>
                            ${y ? r`<span class="acfg-group__pick">${y.option_name}</span>` : f}
                          </div>
                          <div class="acfg-options" role="list">
                            ${m.options.map((s) => {
        const x = this.selections[m.key] === s.option_id;
        return r`
                                <button
                                  type="button"
                                  class="acfg-option"
                                  role="listitem"
                                  aria-pressed=${x ? "true" : "false"}
                                  aria-label=${s.option_name}
                                  title=${s.option_desc ? `${s.option_name} — ${s.option_desc}` : s.option_name}
                                  @click=${() => this.selectOption(m.key, s.option_id)}
                                >
                                  ${s.thumb_image ? r`<img
                                        class="acfg-option__media"
                                        src=${s.thumb_image}
                                        alt=""
                                        loading="lazy"
                                        decoding="async"
                                      />` : r`<span
                                        class="acfg-option__media acfg-option__swatch"
                                        style=${s.swatch_color ? T({ background: s.swatch_color }) : f}
                                        aria-hidden="true"
                                      ></span>`}
                                  <span class="acfg-option__name">${s.option_name}</span>
                                  ${s.price_delta ? r`<span class="acfg-option__delta">
                                        +${O(s.price_delta, i)}
                                      </span>` : f}
                                </button>
                              `;
      })}
                          </div>
                        </div>
                      `;
    })}

                    <div class="acfg-summary">
                      ${w ? r`<p class="acfg-price">
                            <span>${l("السعر", "Price")}</span>
                            ${O(d, i)}
                          </p>` : f}

                      <ul class="acfg-summary__list">
                        ${t.map((m) => {
      const y = this.selections[m.key], s = m.options.find((x) => x.option_id === y);
      return r`<li>
                            <span>${m.name}</span>
                            <strong>${(s == null ? void 0 : s.option_name) || "—"}</strong>
                          </li>`;
    })}
                      </ul>

                      <div class="acfg-actions">
                        ${P ? r`<a class="fs-btn" href=${P}>
                              ${p(e.acfg_finish_btn) || l("فتح المنتج", "Open product")}
                            </a>` : f}
                        <button
                          type="button"
                          class="fs-btn fs-btn--ghost"
                          @click=${this.handleCopy}
                        >
                          ${l("نسخ التصميم", "Copy design")}
                        </button>
                        ${S ? r`<a
                              class="fs-btn fs-btn--ghost"
                              href=${S}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              ${l("واتساب", "WhatsApp")}
                            </a>` : f}
                      </div>
                      ${this.copyMsg ? r`<p class="acfg-copy-msg" role="status">${this.copyMsg}</p>` : f}
                    </div>
                  </div>

                  <div class="acfg-preview-wrap">
                    <div
                      class=${k({
      "acfg-preview": !0,
      "acfg-preview--pulse": this.previewPulse && a
    })}
                      aria-label=${l("معاينة التصميم", "Design preview")}
                    >
                      ${C ? r`<img
                            class="acfg-preview__base"
                            src=${C}
                            alt=${h || l("عباءة أساسية", "Base abaya")}
                            loading="eager"
                            decoding="async"
                          />` : r`<div class="acfg-preview__empty">
                            ${l("أضيفي الصورة الأساسية", "Add base image")}
                          </div>`}
                      ${N.map(
      (m) => r`<img
                          class="acfg-preview__overlay"
                          style=${T({ zIndex: String(m.z) })}
                          src=${m.src}
                          alt=""
                          loading="lazy"
                          decoding="async"
                        />`
    )}
                    </div>
                  </div>
                </div>
              </div>` : f}
        </div>
        ${ee(this.config || {}, "acfg_")}
      </section>
    `;
  }
}, g.fontsReady = !1, g.styles = [V, te, G`
    :host {
      direction: inherit;
    }
  `], g);
_([
  D({ type: Object })
], u.prototype, "config");
_([
  b()
], u.prototype, "selections");
_([
  b()
], u.prototype, "copyMsg");
_([
  b()
], u.prototype, "recommendFlash");
_([
  b()
], u.prototype, "previewPulse");
let j = u;
typeof j < "u" && j.registerSallaComponent("salla-abaya-configurator");
export {
  j as default
};
