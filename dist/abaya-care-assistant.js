var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { unsafeCSS, css, LitElement, html, nothing } from "lit";
import { s as swiperCore, a as swiperNav, b as swiperPag, S as Swiper, N as Navigation, P as Pagination, A as A11y, c as Autoplay } from "./pagination-YJLEv1e5.js";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { g as getPageLocale, l as localizedString } from "./localizedString-2lLX6pth.js";
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const PRIMARY = "var(--color-primary, var(--primary-color, var(--color-main, #64748b)))";
function detectFsTheme() {
  var _a2;
  if (typeof document > "u") return "light";
  const root = document.documentElement, attr = (root.getAttribute("data-theme") || root.getAttribute("data-mode") || "").toLowerCase();
  if (attr === "dark") return "dark";
  if (attr === "light") return "light";
  if (root.classList.contains("dark") || (_a2 = document.body) != null && _a2.classList.contains("dark"))
    return "dark";
  try {
    const stored = localStorage.getItem("salla_demo_theme");
    if (stored === "dark" || stored === "light") return stored;
  } catch {
  }
  return "light";
}
__name(detectFsTheme, "detectFsTheme");
function fsThemeVars(mode = detectFsTheme()) {
  const dark = mode === "dark";
  return {
    "--fs-store-primary": PRIMARY,
    "--accent-color": PRIMARY,
    "--button-bg": PRIMARY,
    "--button-color": "#ffffff",
    "--text-color": dark ? "#ffffff" : "#000000",
    "--muted-color": dark ? "#aaaaaa" : "#666666",
    "--card-bg": dark ? "#141414" : "#ffffff",
    "--fs-surface": dark ? "#1a1a1a" : "#f3f4f6",
    "--border-color": dark ? "rgba(255, 255, 255, 0.14)" : "#e5e7eb",
    "--section-bg": "transparent",
    colorScheme: dark ? "dark" : "light"
  };
}
__name(fsThemeVars, "fsThemeVars");
function applyVars(el, vars, mode) {
  for (const [key, value] of Object.entries(vars)) {
    if (key === "colorScheme") {
      el.style.colorScheme = value;
      continue;
    }
    el.style.setProperty(key, value);
  }
  el.setAttribute("data-fs-theme", mode);
}
__name(applyVars, "applyVars");
function walkAndApply(root, vars, mode) {
  root.querySelectorAll(".fs-section").forEach((node) => {
    applyVars(node, vars, mode);
  });
}
__name(walkAndApply, "walkAndApply");
function refreshLitHosts() {
  document.querySelectorAll("*").forEach((node) => {
    const el = node, shadow = el.shadowRoot;
    shadow != null && shadow.querySelector(".fs-section") && typeof el.requestUpdate == "function" && el.requestUpdate();
  });
}
__name(refreshLitHosts, "refreshLitHosts");
function applyFsThemeToDocument(mode = detectFsTheme()) {
  if (typeof document > "u") return;
  const vars = fsThemeVars(mode);
  document.documentElement.setAttribute("data-fs-theme", mode), walkAndApply(document, vars, mode), document.querySelectorAll("*").forEach((node) => {
    const el = node, shadow = el.shadowRoot;
    shadow && shadow.querySelector(".fs-section") && (applyVars(el, vars, mode), walkAndApply(shadow, vars, mode));
  });
  try {
    window.dispatchEvent(
      new CustomEvent("fs-theme-changed", { detail: { mode } })
    );
  } catch {
  }
}
__name(applyFsThemeToDocument, "applyFsThemeToDocument");
let watching = !1, syncTimer = null, lastMode = null;
function scheduleSync() {
  syncTimer && clearTimeout(syncTimer), syncTimer = setTimeout(() => {
    syncTimer = null;
    const mode = detectFsTheme();
    applyFsThemeToDocument(mode), lastMode !== mode && (lastMode = mode, refreshLitHosts());
  }, 40);
}
__name(scheduleSync, "scheduleSync");
function ensureFsThemeWatch() {
  if (!(watching || typeof document > "u")) {
    watching = !0, lastMode = detectFsTheme(), scheduleSync();
    try {
      new MutationObserver(scheduleSync).observe(document.documentElement, {
        attributes: !0,
        attributeFilter: ["data-theme", "data-mode", "class"]
      }), document.body && new MutationObserver(scheduleSync).observe(document.body, {
        attributes: !0,
        attributeFilter: ["class", "data-theme", "data-mode"]
      });
    } catch {
    }
    window.addEventListener("storage", (event) => {
      event.key === "salla_demo_theme" && scheduleSync();
    });
    try {
      new MutationObserver((records) => {
        records.some((r) => r.addedNodes.length) && scheduleSync();
      }).observe(document.documentElement, { childList: !0, subtree: !0 });
    } catch {
    }
  }
}
__name(ensureFsThemeWatch, "ensureFsThemeWatch");
function normalizeItem(item) {
  return Object.entries(item || {}).reduce((acc, [key, value]) => {
    const normalizedKey = key.includes(".") ? key.split(".").pop() : key;
    return acc[normalizedKey] = value, acc;
  }, {});
}
__name(normalizeItem, "normalizeItem");
function slugifyId(value, fallback = "") {
  const raw = typeof value == "string" || typeof value == "number" ? String(value).trim() : localizedString(value, "").trim();
  return raw && raw.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-+|-+$/g, "").slice(0, 48) || fallback;
}
__name(slugifyId, "slugifyId");
function resolveItemId(item, index, prefix = "item") {
  const keys = [
    "id",
    "value",
    "key",
    "zone_id",
    "family_id",
    "character_id",
    "note_id",
    "active_id",
    "tex_id",
    "light_id",
    "pt_id",
    "cond_id",
    "color_id",
    "step_id",
    "recipe_id",
    "strength_id",
    "time_id",
    "result_id"
  ];
  for (const key of keys) {
    const s = String(item[key] ?? "").trim();
    if (s) return s;
  }
  return slugifyId(item.name ?? item.title ?? item.label, "") || `${prefix}-${index + 1}`;
}
__name(resolveItemId, "resolveItemId");
function normalizeCollection(items) {
  return Array.isArray(items) ? items.filter((item) => !!item && typeof item == "object").map((item, index) => {
    const normalized = normalizeItem(item), row = normalized;
    return String(row.id ?? "").trim() || (row.id = resolveItemId(row, index)), normalized;
  }) : [];
}
__name(normalizeCollection, "normalizeCollection");
function getUnitValue(val, fallback = 0) {
  return typeof val == "number" && Number.isFinite(val) ? val : typeof val == "string" && val.trim() !== "" && Number.isFinite(Number(val)) ? Number(val) : val && typeof val == "object" && "value" in val ? getUnitValue(val.value, fallback) : fallback;
}
__name(getUnitValue, "getUnitValue");
function isTruthy(val, fallback = !1) {
  if (typeof val == "boolean") return val;
  if (typeof val == "string") {
    const v = val.toLowerCase().trim();
    if (["true", "1", "yes", "on"].includes(v)) return !0;
    if (["false", "0", "no", "off", ""].includes(v)) return !1;
  }
  return typeof val == "number" ? val !== 0 : fallback;
}
__name(isTruthy, "isTruthy");
function extractLink(value) {
  if (!value) return "";
  if (typeof value == "string") {
    const trimmed = value.trim();
    return isValidHref(trimmed) ? trimmed : "";
  }
  if (Array.isArray(value)) {
    for (const item of value) {
      const link = extractLink(item);
      if (link) return link;
    }
    return "";
  }
  if (typeof value == "object") {
    const obj = value, candidates = [
      obj.url,
      obj.href,
      obj.link,
      obj.value,
      obj.custom,
      obj.path
    ];
    for (const candidate of candidates) {
      const link = extractLink(candidate);
      if (link) return link;
    }
  }
  return "";
}
__name(extractLink, "extractLink");
function isValidHref(url) {
  if (!url || url === "#") return !1;
  if (url.startsWith("/") || url.startsWith("#") || url.startsWith("?") || url.startsWith("mailto:") || url.startsWith("tel:") || url.startsWith("whatsapp:"))
    return !0;
  try {
    const parsed = new URL(url, window.location.origin);
    return ["http:", "https:", "mailto:", "tel:"].includes(parsed.protocol);
  } catch {
    return !1;
  }
}
__name(isValidHref, "isValidHref");
function isExternalUrl(url) {
  try {
    return new URL(url, window.location.origin).origin !== window.location.origin;
  } catch {
    return !1;
  }
}
__name(isExternalUrl, "isExternalUrl");
function isDirectMediaUrl(url) {
  if (!url || typeof url != "string") return !1;
  try {
    const parsed = new URL(url, window.location.origin);
    return !!["http:", "https:"].includes(parsed.protocol);
  } catch {
    return !1;
  }
}
__name(isDirectMediaUrl, "isDirectMediaUrl");
function t(ar, en, value, fallbackAr) {
  var _a2, _b;
  return ((_b = typeof document < "u" ? (_a2 = document.documentElement.lang) == null ? void 0 : _a2.split(/[-_]/)[0] : "ar") == null ? void 0 : _b.toLowerCase()) === "en" ? en : fallbackAr || ar;
}
__name(t, "t");
async function copyText(text) {
  var _a2;
  if (!text) return !1;
  try {
    if ((_a2 = navigator.clipboard) != null && _a2.writeText)
      return await navigator.clipboard.writeText(text), !0;
  } catch {
  }
  try {
    const area = document.createElement("textarea");
    area.value = text, area.setAttribute("readonly", ""), area.style.position = "fixed", area.style.opacity = "0", document.body.appendChild(area), area.select();
    const ok = document.execCommand("copy");
    return document.body.removeChild(area), ok;
  } catch {
    return !1;
  }
}
__name(copyText, "copyText");
function prefersReducedMotion() {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return !1;
  }
}
__name(prefersReducedMotion, "prefersReducedMotion");
function readSectionTheme(config, prefix, defaults) {
  const c = config || {};
  return {
    bg: "transparent",
    text: "#000000",
    muted: "#666666",
    accent: "var(--color-primary, var(--primary-color, var(--color-main, #64748b)))",
    card: "var(--color-white, var(--bg-color, #ffffff))",
    border: "var(--color-border, #e5e7eb)",
    buttonBg: "var(--color-primary, var(--primary-color, var(--color-main, #64748b)))",
    buttonColor: "#ffffff",
    radius: `${getUnitValue(c[`${prefix}radius`], 20)}px`,
    spaceDesktop: getUnitValue(
      c[`${prefix}space_desktop`],
      48
    ),
    spaceMobile: getUnitValue(
      c[`${prefix}space_mobile`],
      28
    ),
    animate: isTruthy(c[`${prefix}animate`], !0),
    fullWidth: isTruthy(c[`${prefix}full_width`], !1),
    noBottomMargin: !1,
    hasContainer: !0
  };
}
__name(readSectionTheme, "readSectionTheme");
function themeStyleMap(theme) {
  const useContainer = theme.hasContainer !== !1;
  ensureFsThemeWatch();
  const mode = detectFsTheme(), vars = fsThemeVars(mode), { colorScheme, ...cssVars } = vars;
  return {
    ...cssVars,
    "color-scheme": colorScheme,
    "--section-radius": theme.radius,
    "--space-desktop": `${theme.spaceDesktop}px`,
    "--space-mobile": `${theme.spaceMobile}px`,
    "--space-desktop-bottom": theme.noBottomMargin ? "0px" : `${theme.spaceDesktop}px`,
    "--space-mobile-bottom": theme.noBottomMargin ? "0px" : `${theme.spaceMobile}px`,
    "--section-container-max": useContainer ? "1440px" : "none",
    "--section-container-pad": useContainer ? "16px" : "0px",
    "--section-container-pad-sm": useContainer ? "12px" : "0px"
  };
}
__name(themeStyleMap, "themeStyleMap");
function extractImageUrl(val) {
  if (!val) return "";
  if (typeof val == "string") {
    const trimmed = val.trim();
    return isDirectMediaUrl(trimmed) || trimmed.startsWith("/") ? trimmed : "";
  }
  if (Array.isArray(val)) {
    for (const item of val) {
      const url = extractImageUrl(item);
      if (url) return url;
    }
    return "";
  }
  if (typeof val == "object") {
    const obj = val, candidates = [obj.url, obj.src, obj.image, obj.thumbnail, obj.original];
    for (const candidate of candidates) {
      const url = extractImageUrl(candidate);
      if (url) return url;
    }
  }
  return "";
}
__name(extractImageUrl, "extractImageUrl");
function normalizeArgs(optionsOrConfig, legacyPrefix, legacyOptions) {
  if (optionsOrConfig && typeof optionsOrConfig == "object" && "config" in optionsOrConfig && "prefix" in optionsOrConfig) {
    const o = optionsOrConfig;
    return {
      ...o,
      config: o.config || {},
      prefix: o.prefix || ""
    };
  }
  return {
    ...{},
    config: optionsOrConfig || {},
    prefix: legacyPrefix
  };
}
__name(normalizeArgs, "normalizeArgs");
function renderCommerceCtaButton(config, prefix, options = {}) {
  const ctaLink = (options.href || "").trim() || extractLink(config[`${prefix}result_link`] ?? config[`${prefix}cta_link`]) || "/", ctaLabel = localizedString(config[`${prefix}cta_label`], "").trim() || t("تسوق الآن", "Shop now"), className = ["fs-btn", "fs-tap", options.className || ""].filter(Boolean).join(" ");
  return html`<a
    class=${className}
    href=${ctaLink}
    target=${isExternalUrl(ctaLink) ? "_blank" : nothing}
    rel=${isExternalUrl(ctaLink) ? "noopener noreferrer" : nothing}
  >
    ${ctaLabel}
  </a>`;
}
__name(renderCommerceCtaButton, "renderCommerceCtaButton");
function renderCommerceOutcome(optionsOrConfig, legacyPrefix, legacyOptions) {
  const opts = normalizeArgs(optionsOrConfig, legacyPrefix), c = opts.config || {}, prefix = opts.prefix || "";
  if (opts.ready === !1) return nothing;
  const ctaLink = (opts.href || "").trim() || extractLink(c[`${prefix}result_link`] ?? c[`${prefix}cta_link`]);
  return isTruthy(c[`${prefix}show_cta`], !!ctaLink) && !!ctaLink ? html`
    <aside class="fs-commerce" aria-label=${t("التسوق", "Shopping")}>
      <div class="fs-commerce__actions">
        ${renderCommerceCtaButton(c, prefix, {
    className: "fs-commerce__cta",
    href: ctaLink
  })}
      </div>
    </aside>
  ` : nothing;
}
__name(renderCommerceOutcome, "renderCommerceOutcome");
const fsSwiperCss = unsafeCSS(
  `${swiperCore}
${swiperNav}
${swiperPag}`
), DIR_ATTR = "dir", DRAG_GUARD_FLAG = "fsSwiperDragGuard";
function resolveRtl(el, forced) {
  var _a2, _b;
  return typeof forced == "boolean" ? forced : (((_a2 = el.closest(`[${DIR_ATTR}]`)) == null ? void 0 : _a2.getAttribute(DIR_ATTR)) || document.documentElement.getAttribute(DIR_ATTR) || ((_b = document.body) == null ? void 0 : _b.getAttribute(DIR_ATTR)) || "").toLowerCase() === "rtl";
}
__name(resolveRtl, "resolveRtl");
function suppressNativeDrag(el) {
  el.dataset[DRAG_GUARD_FLAG] !== "1" && (el.dataset[DRAG_GUARD_FLAG] = "1", el.addEventListener(
    "dragstart",
    (event) => {
      event.preventDefault();
    },
    { capture: !0 }
  ));
}
__name(suppressNativeDrag, "suppressNativeDrag");
function mountFsSwiper(el, options = {}) {
  const { rtl: rtlOpt, modules: extraModules, ...rest } = options, rtl = resolveRtl(el, rtlOpt);
  el.setAttribute(DIR_ATTR, rtl ? "rtl" : "ltr"), suppressNativeDrag(el);
  const existing = el.swiper;
  return existing && !existing.destroyed && existing.destroy(!0, !0), new Swiper(el, {
    modules: [Navigation, Pagination, A11y, Autoplay, ...extraModules || []],
    slidesPerView: "auto",
    spaceBetween: 16,
    speed: 420,
    watchOverflow: !0,
    grabCursor: !0,
    allowTouchMove: !0,
    simulateTouch: !0,
    threshold: 8,
    touchStartPreventDefault: !1,
    preventClicks: !1,
    preventClicksPropagation: !1,
    observer: !0,
    observeParents: !0,
    a11y: { enabled: !0 },
    ...rest,
    ...rtl ? { rtl: !0 } : {}
  });
}
__name(mountFsSwiper, "mountFsSwiper");
function destroyFsSwiper(instance) {
  instance && !instance.destroyed && instance.destroy(!0, !0);
}
__name(destroyFsSwiper, "destroyFsSwiper");
const sharedSectionCss = css`
  :host {
    direction: inherit;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    display: block;
    overflow-x: clip;
    /* Store primary + light/dark text defaults */
    --fs-store-primary: var(--color-primary, var(--primary-color, var(--color-main, #64748b)));
    --accent-color: var(--fs-store-primary);
    --button-bg: var(--fs-store-primary);
    --button-color: #ffffff;
    /* Light: titles black · subtitle/desc muted */
    --text-color: #000000;
    --muted-color: #666666;
    --card-bg: #ffffff;
    --border-color: #e5e7eb;
    --section-bg: transparent;
    --fs-surface: #f3f4f6;
    --fs-success: #2f9e63;
    --fs-caution: #e0a100;
    --fs-danger: #cf4b4b;
    --fs-unknown: #8f7a86;
  }

  :host-context(:root:not([data-theme='dark']):not(.dark)),
  :host-context(html:not([data-theme='dark']):not(.dark)) {
    --text-color: #000000;
    --muted-color: #666666;
    --card-bg: #ffffff;
    --border-color: #e5e7eb;
    --section-bg: transparent;
    --fs-surface: #f3f4f6;
    --button-bg: var(--fs-store-primary);
    --button-color: #ffffff;
  }

  :host-context([data-theme='dark']),
  :host-context(.dark),
  :host-context([data-mode='dark']) {
    /* Dark: titles white · subtitle/desc muted · secondary surfaces darker */
    --text-color: #ffffff;
    --muted-color: #aaaaaa;
    --card-bg: #141414;
    --border-color: rgba(255, 255, 255, 0.14);
    --section-bg: transparent;
    --fs-surface: #1a1a1a;
    --button-bg: var(--fs-store-primary);
    --button-color: #ffffff;
  }

  .fs-section {
    background:
      radial-gradient(
        130% 90% at 100% 0%,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, transparent),
        transparent 58%
      ),
      radial-gradient(
        120% 80% at 0% 100%,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 5%, transparent),
        transparent 55%
      ),
      var(--section-bg, transparent);
    color: var(--text-color, #000000);
    padding: var(--space-mobile, 28px) 0
      var(--space-mobile-bottom, var(--space-mobile, 28px));
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
    min-width: 0;
    overflow-x: clip;
  }

  .fs-section--full .fs-container {
    max-width: none;
  }

  .fs-header {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .fs-header--editorial {
    margin-bottom: 1.55rem;
  }

  .fs-eyebrow {
    display: inline-block;
    margin: 0 0 0.55rem;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--accent-color, var(--fs-store-primary));
  }

  .fs-title {
    margin: 0 0 0.6rem;
    font-size: clamp(1.4rem, 2.6vw, 1.95rem);
    font-weight: 800;
    line-height: 1.3;
    letter-spacing: -0.01em;
    color: var(--text-color, #000000);
  }

  .fs-header--editorial .fs-title,
  .fs-title--editorial {
    margin: 0;
    font-size: clamp(1.75rem, 3.4vw, 2.55rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.15;
  }

  .fs-title-line {
    display: block;
    width: 4.5rem;
    height: 2px;
    margin: 0.85rem auto 0;
    border-radius: 999px;
    background: linear-gradient(
      90deg,
      transparent,
      var(--accent-color, var(--fs-store-primary)),
      transparent
    );
  }

  .fs-subtitle {
    margin: 0 0 0.45rem;
    color: var(--muted-color, #666666);
    font-size: 1.05rem;
    font-weight: 600;
    line-height: 1.5;
  }

  .fs-desc {
    margin: 0.85rem auto 0;
    max-width: 36rem;
    color: var(--muted-color, #666666);
    font-size: 0.95rem;
    line-height: 1.75;
  }

  .fs-title,
  .fs-commerce__title {
    color: var(--text-color, #000000);
  }

  .fs-desc,
  .fs-subtitle,
  .fs-empty {
    color: var(--muted-color, #666666);
  }

  :host([data-fs-theme='dark']) .fs-title,
  :host([data-fs-theme='dark']) .fs-commerce__title {
    color: #ffffff;
  }

  :host([data-fs-theme='dark']) .fs-desc,
  :host([data-fs-theme='dark']) .fs-subtitle,
  :host([data-fs-theme='dark']) .fs-empty {
    color: #aaaaaa;
  }

  :host([data-fs-theme='light']) .fs-title,
  :host([data-fs-theme='light']) .fs-commerce__title {
    color: #000000;
  }

  :host([data-fs-theme='light']) .fs-desc,
  :host([data-fs-theme='light']) .fs-subtitle,
  :host([data-fs-theme='light']) .fs-empty {
    color: #666666;
  }

  /* Tip / notice surfaces — follow light/dark tokens (never hard-mix with #fff) */
  .fs-hint,
  .fs-notice {
    margin: 0;
    padding: 0.7rem 0.85rem;
    border-radius: 12px;
    font-size: 0.88rem;
    line-height: 1.55;
    color: var(--text-color, #000000);
    background: color-mix(
      in srgb,
      var(--accent-color, var(--fs-store-primary)) 14%,
      var(--fs-surface, var(--card-bg, #f0f0f0))
    );
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 80%, transparent);
    border-inline-start: 3px solid var(--accent-color, var(--fs-store-primary));
  }

  :host([data-fs-theme='dark']) .fs-hint,
  :host([data-fs-theme='dark']) .fs-notice {
    color: #ffffff;
    background: color-mix(
      in srgb,
      var(--accent-color, var(--fs-store-primary)) 18%,
      var(--fs-surface, #0a0a0a)
    );
    border-color: rgba(255, 255, 255, 0.12);
  }

  :host([data-fs-theme='light']) .fs-hint,
  :host([data-fs-theme='light']) .fs-notice {
    color: #000000;
  }

  :host([data-fs-theme='dark']) .bsf-question__hint,
  :host([data-fs-theme='dark']) .bsg-step__hint,
  :host([data-fs-theme='dark']) .bsg-notice,
  :host([data-fs-theme='dark']) .bac-tip,
  :host([data-fs-theme='dark']) .bac-tip__text,
  :host([data-fs-theme='dark']) .bac-notice,
  :host([data-fs-theme='dark']) .bil-note,
  :host([data-fs-theme='dark']) .brl-step__note,
  :host([data-fs-theme='dark']) .bpa-tips,
  :host([data-fs-theme='dark']) .bpa-notice,
  :host([data-fs-theme='dark']) .bff-notice,
  :host([data-fs-theme='dark']) .bff-note,
  :host([data-fs-theme='dark']) .bfz-notice,
  :host([data-fs-theme='dark']) .bch-notice,
  :host([data-fs-theme='dark']) .bwp-notice,
  :host([data-fs-theme='dark']) .srg-zone-tip,
  :host([data-fs-theme='dark']) .pql-callout,
  :host([data-fs-theme='dark']) .fll-note,
  :host([data-fs-theme='dark']) .inp-note,
  :host([data-fs-theme='dark']) .sfr-tip,
  :host([data-fs-theme='dark']) .nal-tip,
  :host([data-fs-theme='dark']) .pcc-notice,
  :host([data-fs-theme='dark']) .pcc-tips,
  :host([data-fs-theme='dark']) .icpm-tip,
  :host([data-fs-theme='dark']) .mmt-note,
  :host([data-fs-theme='dark']) .csdg-alert,
  :host([data-fs-theme='dark']) .tbsg-notes {
    color: #ffffff;
    background: color-mix(
      in srgb,
      var(--accent-color, var(--fs-store-primary)) 18%,
      var(--fs-surface, #0a0a0a)
    );
    border-color: rgba(255, 255, 255, 0.12);
  }

  :host([data-fs-theme='dark']) .bac-tip__text,
  :host([data-fs-theme='dark']) .pcc-notice__text,
  :host([data-fs-theme='dark']) .pcc-tips__text,
  :host([data-fs-theme='dark']) .icpm-tip__text,
  :host([data-fs-theme='dark']) .pcc-tips__title {
    color: #ffffff;
    background: transparent;
    border: none;
  }

  :host-context([data-theme='dark']) .fs-section,
  :host-context(.dark) .fs-section,
  :host-context([data-mode='dark']) .fs-section {
    color: #ffffff;
    background:
      radial-gradient(
        130% 90% at 100% 0%,
        color-mix(in srgb, var(--fs-store-primary) 14%, transparent),
        transparent 58%
      ),
      radial-gradient(
        120% 80% at 0% 100%,
        color-mix(in srgb, var(--fs-store-primary) 8%, transparent),
        transparent 55%
      ),
      var(--section-bg, transparent);
  }

  :host-context([data-theme='dark']) .fs-card,
  :host-context(.dark) .fs-card,
  :host-context([data-mode='dark']) .fs-card,
  :host-context([data-theme='dark']) .fs-stage,
  :host-context(.dark) .fs-stage,
  :host-context([data-mode='dark']) .fs-stage,
  :host([data-fs-theme='dark']) .fs-card,
  :host([data-fs-theme='dark']) .fs-stage {
    background: var(--card-bg, #141414);
    border-color: var(--border-color, rgba(255, 255, 255, 0.14));
    color: var(--text-color, #ffffff);
  }

  :host-context([data-theme='dark']) .fs-commerce,
  :host-context(.dark) .fs-commerce,
  :host-context([data-mode='dark']) .fs-commerce {
    border-color: var(--border-color, rgba(255, 255, 255, 0.14));
  }

  .fs-header:not(.fs-header--editorial) .fs-desc {
    margin-top: 0;
  }

  .fs-card {
    background: var(--card-bg, #ffffff);
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: var(--section-radius, 16px);
    box-shadow: 0 12px 32px color-mix(in srgb, var(--text-color, #000000) 8%, transparent);
    color: var(--text-color, #000000);
    transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
  }

  :host([data-fs-theme='dark']) .fs-card {
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
  }

  .fs-stage {
    position: relative;
    isolation: isolate;
    border-radius: var(--section-radius, 16px);
    overflow: hidden;
  }

  /* —— Unified buttons (size + primary fill) —— */
  .fs-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    min-height: 44px;
    min-width: 44px;
    padding: 0.65rem 1.25rem;
    border: 1.5px solid transparent;
    border-radius: 999px;
    background: var(--button-bg, var(--fs-store-primary));
    color: var(--button-color, #ffffff);
    font: inherit;
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.01em;
    line-height: 1.2;
    cursor: pointer;
    text-decoration: none;
    white-space: nowrap;
    box-shadow: 0 6px 16px color-mix(in srgb, var(--fs-store-primary) 22%, transparent);
    transition:
      box-shadow 0.2s ease,
      transform 0.2s ease,
      filter 0.2s ease,
      background 0.2s ease,
      border-color 0.2s ease,
      color 0.2s ease,
      opacity 0.2s ease;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  .fs-btn:hover {
    filter: brightness(1.05);
    transform: translateY(-1px);
    box-shadow: 0 10px 22px color-mix(in srgb, var(--fs-store-primary) 30%, transparent);
  }

  .fs-btn:active {
    transform: translateY(0);
    filter: brightness(0.98);
  }

  .fs-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    filter: none;
  }

  .fs-btn--ghost {
    background: transparent;
    color: var(--accent-color, var(--fs-store-primary));
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 50%, var(--border-color, #e5e7eb));
    box-shadow: none;
  }

  .fs-btn--ghost:hover {
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, transparent);
    filter: none;
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 70%, var(--border-color, #e5e7eb));
  }

  :host([data-fs-theme='dark']) .fs-btn--ghost {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 55%, rgba(255, 255, 255, 0.2));
  }

  .fs-btn--compact,
  .fs-btn--icon {
    min-width: 44px;
    min-height: 44px;
    padding: 0.5rem 1rem;
    font-size: 0.86rem;
    box-shadow: 0 4px 12px color-mix(in srgb, var(--fs-store-primary) 18%, transparent);
  }

  .fs-btn--icon {
    width: 44px;
    padding: 0;
  }

  .fs-btn--ghost.fs-btn--compact,
  .fs-btn--ghost.fs-btn--icon {
    box-shadow: none;
  }

  /* Choice chips — same height/radius as primary buttons */
  .fs-chip {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    min-height: 44px;
    min-width: 44px;
    padding: 0.55rem 1.1rem;
    border-radius: 999px;
    border: 1.5px solid var(--border-color, #e5e7eb);
    background: var(--fs-surface, var(--card-bg, #f0f0f0));
    color: var(--text-color, #000000);
    font: inherit;
    font-size: 0.9rem;
    font-weight: 600;
    line-height: 1.2;
    cursor: pointer;
    text-decoration: none;
    box-sizing: border-box;
    transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
  }

  .fs-chip:hover {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, var(--border-color, #e5e7eb));
  }

  .fs-chip[aria-pressed='true'],
  .fs-chip.is-active,
  .fs-chip[aria-selected='true'] {
    background: var(--button-bg, var(--fs-store-primary));
    border-color: transparent;
    color: #ffffff;
    transform: translateY(-1px);
  }

  :host([data-fs-theme='dark']) .fs-chip {
    background: var(--fs-surface, #0a0a0a);
    border-color: rgba(255, 255, 255, 0.14);
    color: #ffffff;
  }

  :host([data-fs-theme='dark']) .fs-chip[aria-pressed='true'],
  :host([data-fs-theme='dark']) .fs-chip.is-active,
  :host([data-fs-theme='dark']) .fs-chip[aria-selected='true'] {
    background: var(--button-bg, var(--fs-store-primary));
    border-color: transparent;
    color: #ffffff;
  }

  /* Align pill CTAs / choice chips only — NOT card-style chips (spa-chip, ffm-chip, …) */
  .bpb-card__cta,
  .spb-card__cta,
  .gpb-card__cta,
  .spb-cta,
  .bsf-chip,
  .bsg-option,
  .brb-option,
  .bca-answer,
  .bch-type,
  .bff-chip,
  .bac-chip {
    min-height: 44px;
    border-radius: 999px;
    box-sizing: border-box;
  }

  .bpb-card__cta,
  .spb-card__cta,
  .gpb-card__cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 0.65rem 1.25rem;
    border: 1.5px solid transparent;
    background: var(--button-bg, var(--fs-store-primary));
    color: var(--button-color, #ffffff);
    font-size: 0.9rem;
    font-weight: 700;
    line-height: 1.2;
    text-decoration: none;
    box-shadow: 0 6px 16px color-mix(in srgb, var(--fs-store-primary) 22%, transparent);
  }

  .fs-tap {
    min-width: 44px;
    min-height: 44px;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }

  .fs-actions,
  .fs-nav {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.55rem;
  }

  .fs-nav {
    justify-content: center;
    margin-top: 0.35rem;
  }

  .fs-nav .fs-btn {
    min-width: 7.5rem;
  }

  .fs-btn:focus-visible,
  button:focus-visible,
  a:focus-visible,
  input:focus-visible,
  select:focus-visible,
  [tabindex]:focus-visible {
    outline: 2px solid var(--accent-color, var(--fs-store-primary));
    outline-offset: 2px;
  }

  .fs-empty {
    padding: 2.25rem 1.15rem;
    text-align: center;
    color: var(--muted-color, #7a6a62);
    border: 1px dashed var(--border-color, #e8ddd6);
    border-radius: var(--section-radius, 16px);
    background: color-mix(in srgb, var(--card-bg, #fff) 70%, transparent);
    font-size: 0.92rem;
    line-height: 1.6;
  }

  .fs-pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
    min-height: 36px;
    padding: 0.35rem 0.85rem;
    border-radius: 999px;
    border: 1px solid var(--border-color, #e8ddd6);
    background: var(--card-bg, #fff);
    color: var(--muted-color, #7a6a62);
    font: inherit;
    font-size: 0.8rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
  }

  .fs-pill:hover {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 40%, var(--border-color, #e8ddd6));
  }

  .fs-pill[aria-pressed='true'],
  .fs-pill.is-active,
  .fs-pill--active {
    border-color: var(--accent-color, var(--fs-store-primary));
    color: var(--accent-color, var(--fs-store-primary));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, var(--card-bg, #fff));
  }

  .fs-coach {
    display: grid;
    gap: 0.35rem;
    padding: 0.85rem 1rem;
    border-radius: calc(var(--section-radius, 16px) * 0.7);
    border-inline-start: 3px solid var(--accent-color, var(--fs-store-primary));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 7%, var(--card-bg, #fff));
    color: var(--text-color, #2b211c);
    font-size: 0.88rem;
    line-height: 1.6;
  }

  :host([data-fs-theme='dark']) .fs-coach {
    color: #ffffff;
    background: color-mix(
      in srgb,
      var(--accent-color, var(--fs-store-primary)) 16%,
      var(--fs-surface, #0a0a0a)
    );
    border-color: rgba(255, 255, 255, 0.12);
  }

  .fs-coach__mark {
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--accent-color, var(--fs-store-primary));
  }

  .fs-progress {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.55rem;
    margin-bottom: 1rem;
  }

  .fs-progress__label {
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--muted-color, #7a6a62);
  }

  .fs-progress__track {
    flex: 1;
    min-width: 7rem;
    height: 0.35rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #e8ddd6) 75%, transparent);
    overflow: hidden;
  }

  .fs-progress__bar {
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(
      90deg,
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 70%, #c4a484),
      var(--accent-color, var(--fs-store-primary))
    );
    transition: width 0.35s ease;
  }

  .fs-dots {
    display: flex;
    justify-content: center;
    gap: 0.4rem;
    margin-top: 0.85rem;
  }

  .fs-dot {
    width: 0.45rem;
    height: 0.45rem;
    border: 0;
    padding: 0;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 28%, #ddd);
    cursor: pointer;
    transition: width 0.25s ease, background 0.25s ease;
  }

  .fs-dot.is-active,
  .fs-dot[aria-current='true'] {
    width: 1.35rem;
    background: var(--accent-color, var(--fs-store-primary));
  }

  .fs-meter {
    width: 100%;
    height: 6px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #e8ddd6) 80%, transparent);
    overflow: hidden;
  }

  .fs-meter > span {
    display: block;
    height: 100%;
    background: linear-gradient(
      90deg,
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 75%, #c4a484),
      var(--accent-color, var(--fs-store-primary))
    );
    border-radius: inherit;
    transition: width 0.45s ease;
  }

  .fs-scroll-x {
    display: flex;
    gap: 0.65rem;
    max-width: 100%;
    min-width: 0;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-x: contain;
    scroll-snap-type: x proximity;
    scrollbar-width: thin;
    padding-bottom: 0.25rem;
  }

  .fs-scroll-x > * {
    flex: 0 0 auto;
    scroll-snap-align: start;
  }

  
  /* Entrance motion when theme.animate is on */
  .fs-animate .fs-header,
  .fs-animate .fs-header--editorial {
    animation: fs-rise 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .fs-fade {
    animation: fs-fade 0.35s ease both;
  }

  .fs-pulse {
    animation: fs-pulse 2.2s ease-out infinite;
  }

  @keyframes fs-rise {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @keyframes fs-fade {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes fs-pulse {
    0% {
      transform: scale(0.92);
      opacity: 0.7;
    }
    100% {
      transform: scale(1.28);
      opacity: 0;
    }
  }

  /* —— Merchant commercial outcome (real Salla products slider) —— */
  .fs-commerce {
    margin-top: clamp(1.5rem, 4vw, 3rem);
    padding-top: clamp(1.25rem, 3vw, 2rem);
    border-top: 1px solid var(--border-color, #e8ddd6);
    display: grid;
    gap: 1rem;
  }

  .fs-commerce__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    margin: 0;
  }

  .fs-commerce__title,
  .fs-commerce__head h3 {
    margin: 0;
    color: var(--text-color, #2b211c);
    font-size: 1.1rem;
    font-weight: 800;
    text-align: start;
    line-height: 1.35;
  }

  .fs-commerce__view-all {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    min-height: 40px;
    padding: 0.4rem 0.8rem;
    border: 1px solid color-mix(
      in srgb,
      var(--accent-color, var(--fs-store-primary)) 35%,
      var(--border-color, #e8ddd6)
    );
    border-radius: 999px;
    color: var(--accent-color, var(--fs-store-primary));
    background: var(--card-bg, #fff);
    font-size: 0.82rem;
    font-weight: 800;
    line-height: 1;
    text-decoration: none;
    white-space: nowrap;
    transition: color 180ms ease, background-color 180ms ease,
      border-color 180ms ease;
  }

  .fs-commerce__view-all:hover {
    border-color: var(--accent-color, var(--fs-store-primary));
    color: var(--button-color, #fff);
    background: var(--accent-color, var(--fs-store-primary));
  }

  .fs-commerce__view-all-arrow {
    font-size: 1rem;
    transition: transform 180ms ease;
  }

  .fs-commerce__view-all:hover .fs-commerce__view-all-arrow {
    transform: translateX(-2px);
  }

  :host-context([dir='ltr']) .fs-commerce__view-all-arrow,
  :host([dir='ltr']) .fs-commerce__view-all-arrow {
    transform: rotate(180deg);
  }

  @media (max-width: 479px) {
    .fs-commerce__head {
      align-items: flex-start;
    }

    .fs-commerce__view-all {
      min-height: 38px;
      padding-inline: 0.7rem;
      font-size: 0.78rem;
    }
  }

  .fs-commerce__head p {
    margin: 0.35rem 0 0;
    color: var(--muted-color, #7a6a62);
    font-size: 0.9rem;
    text-align: center;
  }

  .fs-commerce__slider {
    min-width: 0;
    width: 100%;
  }

  .fs-commerce__slider salla-products-slider {
    display: block;
    width: 100%;
    margin-bottom: 0 !important;
  }

  .fs-commerce__actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.65rem;
  }

  .fs-commerce__cta {
    min-width: min(100%, 16rem);
  }

  .fs-commerce__hint {
    margin: 0;
    text-align: center;
    color: var(--muted-color, #7a6a62);
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .fs-commerce__slider[data-hide-add='1'] .s-product-card-content-footer,
  .fs-commerce__slider[data-hide-add='1'] .s-add-product-button,
  .fs-commerce__slider[data-hide-add='1'] salla-add-product-button {
    display: none !important;
  }

  /* —— Salla product cards (Theme Raed look) —— */
  .fs-commerce__slider .s-slider-block__title {
    display: none;
  }

  .fs-commerce__slider .swiper,
  .fs-commerce__slider .s-slider-container {
    overflow: hidden;
    padding: 0.35rem 0.2rem 1.1rem;
  }

  .fs-commerce__slider .swiper-wrapper {
    align-items: stretch;
  }

  .fs-commerce__slider .swiper-slide,
  .fs-commerce__slider .s-products-slider-card {
    height: auto;
    /* Swiper sets slide width — forcing it breaks drag/translate */
    box-sizing: border-box;
  }

  .fs-commerce__slider salla-product-card,
  .fs-commerce__slider .s-product-card-entry {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    overflow: hidden;
    text-align: start;
    color: #1f2937;
    background: #fff;
    border: 0;
    border-radius: 15px;
    box-shadow: none;
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .fs-commerce__slider .s-product-card-vertical {
    flex-direction: column;
  }

  .fs-commerce__slider--shadow .s-product-card-entry:hover,
  .fs-commerce__slider--shadow .s-product-card-shadow:hover {
    box-shadow: 5px 10px 30px rgba(43, 45, 52, 0.051);
  }

  .fs-commerce__slider .s-product-card-image {
    position: relative;
    display: block;
    flex: 1 1 0%;
    overflow: hidden;
    width: 100%;
    min-height: 11rem;
    max-height: 15rem;
    aspect-ratio: 1 / 1;
    background: #f3f4f6;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }

  .fs-commerce__slider .s-product-card-image::before,
  .fs-commerce__slider .s-product-card-image a::before {
    content: none !important;
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
  }

  .fs-commerce__slider .s-product-card-image:hover {
    opacity: 1;
  }

  .fs-commerce__slider .s-product-card-image a {
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
  }

  .fs-commerce__slider .s-product-card-image img,
  .fs-commerce__slider .s-product-card-image-cover,
  .fs-commerce__slider .s-product-card-image-contain {
    display: block;
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    transition: transform 400ms cubic-bezier(0.4, 0, 0.2, 1),
      opacity 500ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .fs-commerce__slider .s-product-card-image-contain {
    object-fit: contain;
  }

  .fs-commerce__slider .s-product-card-wishlist-btn {
    position: absolute;
    top: 0.5rem;
    inset-inline-end: 0.5rem;
    z-index: 2;
    opacity: 0.75;
  }

  .fs-commerce__slider .s-product-card-wishlist-btn:hover {
    opacity: 1;
  }

  .fs-commerce__slider .s-product-card-wishlist-btn button,
  .fs-commerce__slider .s-product-card-wishlist-btn .s-button-element {
    display: inline-flex !important;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    margin: 0 !important;
    padding: 0 !important;
    border: 0 !important;
    border-radius: 999px !important;
    background: #fff !important;
    box-shadow: none;
    cursor: pointer;
  }

  .fs-commerce__slider .s-product-card-wishlist-btn svg {
    width: 1rem;
    height: 1rem;
    fill: #6b7280;
  }

  .fs-commerce__slider .s-product-card-wishlist-btn button:hover svg {
    fill: #4b5563;
  }

  .fs-commerce__slider .s-product-card-wishlist-added svg,
  .fs-commerce__slider .s-product-card-wishlist-added i {
    fill: #ef4444;
    color: #ef4444;
  }

  .fs-commerce__slider .s-product-card-promotion-title {
    position: absolute;
    top: 1rem;
    left: 0;
    z-index: 2;
    max-width: calc(100% - 60px);
    padding: 0.375rem 0.625rem;
    border-radius: 0 15px 15px 0;
    background: #991b1b;
    color: #fff;
    font-size: 0.75rem;
    font-weight: 700;
    line-height: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  :host([dir='rtl']) .fs-commerce__slider .s-product-card-promotion-title,
  [dir='rtl'] .fs-commerce__slider .s-product-card-promotion-title {
    right: 0;
    left: auto;
    border-radius: 15px 0 0 15px;
  }

  .fs-commerce__slider .s-product-card-quantity {
    position: absolute;
    bottom: 0.25rem;
    left: 50%;
    z-index: 2;
    max-width: calc(100% - 60px);
    transform: translateX(-50%);
    padding: 0.375rem 0.625rem;
    border-radius: 15px;
    background: #f87171;
    color: #fff;
    font-size: 0.75rem;
    font-weight: 700;
    line-height: 1rem;
  }

  .fs-commerce__slider .s-product-card-out-badge {
    position: absolute;
    bottom: 0.5rem;
    left: 50%;
    z-index: 2;
    max-width: calc(100% - 60px);
    transform: translateX(-50%);
    padding: 0.375rem 0.625rem;
    border-radius: 0.375rem;
    background: #f3f4f6;
    color: #999;
    font-size: 0.75rem;
    font-weight: 700;
    line-height: 1rem;
  }

  .fs-commerce__slider .s-product-card-out-of-stock img {
    filter: grayscale(100%);
  }

  .fs-commerce__slider .s-product-card-content {
    position: relative;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    padding: 0.75rem;
    min-width: 0;
  }

  @media (min-width: 640px) {
    .fs-commerce__slider .s-product-card-content {
      padding: 1.25rem;
    }
  }

  .fs-commerce__slider .s-product-card-content-title {
    margin: 0 0 0.625rem;
    max-width: 100%;
    line-height: 1.5rem;
    word-break: break-word;
  }

  .fs-commerce__slider .s-product-card-content-title a {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    color: #1f2937;
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 1.25rem;
    text-decoration: none;
  }

  .fs-commerce__slider .s-product-card-content-title a:hover {
    color: var(--color-primary, var(--accent-color, var(--fs-store-primary)));
  }

  .fs-commerce__slider .s-product-card-content-subtitle {
    margin: 0 0 0.625rem;
    color: #4b5563;
    font-size: 0.875rem;
    line-height: 1.5rem;
  }

  .fs-commerce__slider .s-product-card-content-sub {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: flex-start;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
  }

  .fs-commerce__slider .s-product-card-content-footer {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: stretch;
    gap: 0.65rem;
    margin-top: auto;
  }

  .fs-commerce__slider .s-product-card-price {
    margin: 0;
    color: #1f2937;
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 1.25rem;
  }

  .fs-commerce__slider .s-product-card-sale-price {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.25rem;
  }

  .fs-commerce__slider .s-product-card-sale-price h4 {
    margin: 0;
    display: inline-block;
    color: #991b1b !important;
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 1.25rem;
  }

  .fs-commerce__slider .s-product-card-sale-price span {
    color: #9ca3af;
    font-size: 0.875rem;
    line-height: 1.25rem;
    text-decoration: line-through;
  }

  .fs-commerce__slider .s-product-card-starting-price {
    display: flex;
    width: auto;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    gap: 0.625rem;
  }

  .fs-commerce__slider .s-product-card-starting-price h4 {
    margin: 0;
    display: inline-block;
    color: #991b1b;
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 1.25rem;
  }

  .fs-commerce__slider .s-product-card-starting-price p {
    margin: 0;
    color: #6b7280;
    font-size: 0.75rem;
  }

  .fs-commerce__slider .s-product-card-rating {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    color: #9ca3af;
    font-size: 0.875rem;
  }

  .fs-commerce__slider .s-product-card-rating span svg {
    width: 1rem;
    height: 1rem;
    margin-bottom: 3px;
    fill: #fbbf24;
  }

  .fs-commerce__slider .s-add-product-button,
  .fs-commerce__slider .s-add-product-button-main {
    display: block;
    width: 100%;
    margin-top: 0;
  }

  .fs-commerce__slider .s-add-product-button .s-button-btn,
  .fs-commerce__slider .s-add-product-button-main .s-button-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    width: 100%;
    min-height: 2.55rem;
    padding: 0.55rem 1.1rem;
    border-radius: 999px;
    border: 1px solid var(--color-primary, var(--accent-color, var(--fs-store-primary)));
    background: var(--color-primary, var(--accent-color, var(--fs-store-primary)));
    color: var(--color-primary-reverse, #fff);
    font-size: 0.8125rem;
    font-weight: 700;
    white-space: nowrap;
    box-shadow: 0 8px 18px color-mix(in srgb, var(--color-primary, #21636d) 22%, transparent);
    transition: transform 180ms ease, opacity 180ms ease;
  }

  .fs-commerce__slider .s-add-product-button .s-button-btn:hover,
  .fs-commerce__slider .s-add-product-button-main .s-button-btn:hover {
    opacity: 0.92;
    transform: translateY(-1px);
  }

  @media (prefers-reduced-motion: reduce) {
    .fs-commerce__slider .s-product-card-entry,
    .fs-commerce__slider .s-product-card-image img {
      transition: none;
    }
  }

  /* —— Salla theme-raed style product card —— */
  .fs-product-card {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    text-align: start;
    color: #1f2937;
    background: #fff;
    border: 0;
    border-radius: 15px;
    box-shadow: none;
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .fs-product-card:hover {
    box-shadow: 5px 10px 30px rgba(43, 45, 52, 0.051);
  }

  .fs-product-card--selectable {
    cursor: pointer;
  }

  .fs-product-card--selectable:focus-visible {
    outline: 2px solid var(--accent-color, var(--fs-store-primary));
    outline-offset: 2px;
  }

  .fs-product-card.is-selected {
    border-color: var(--accent-color, var(--fs-store-primary));
    box-shadow:
      0 0 0 2px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 32%, transparent),
      0 16px 34px rgba(43, 33, 28, 0.12);
  }

  .fs-product-card__media {
    position: relative;
    aspect-ratio: 1 / 1;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    overflow: hidden;
    background: color-mix(in srgb, var(--border-color, #e8ddd6) 45%, #fff);
  }

  .fs-product-card__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: opacity 500ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .fs-product-card__img--empty {
    background: linear-gradient(145deg, #3a2c26, #1c1613);
  }

  /* fs-product-card__badge--rtl-fix */
  .fs-product-card__badge {
    position: absolute;
    top: 1rem;
    inset-inline-start: 0;
    z-index: 2;
    padding: 0.375rem 0.625rem;
    border-radius: 0 15px 15px 0;
    background: #991b1b;
    color: #fff;
    font-size: 0.66rem;
    font-weight: 800;
    letter-spacing: 0.02em;
      }

  :host([dir='rtl']) .fs-product-card__badge,
  [dir='rtl'] .fs-product-card__badge {
    border-radius: 15px 0 0 15px;
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
    background: var(--accent-color, var(--fs-store-primary));
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
    color: var(--accent-color, var(--fs-store-primary));
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
    font-weight: 700;
    color: #991b1b;
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
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 2.25rem;
    padding: 0.5rem 1.25rem 0.625rem;
    border-radius: 0.375rem;
    border: 1px solid var(--color-primary, var(--accent-color, var(--fs-store-primary)));
    background: var(--color-primary, var(--accent-color, var(--fs-store-primary)));
    color: var(--color-primary-reverse, #fff);
    font-size: 0.875rem;
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;
    transition: opacity 300ms;
  }

  .fs-product-card__add:hover {
    opacity: 0.8;
  }

  .fs-product-card__add:active {
    opacity: 0.9;
  }

  .fs-product-card__link {
    margin-top: 0.2rem;
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--accent-color, var(--fs-store-primary));
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
    .fs-animate .fs-header,
    .fs-animate .fs-header--editorial,
    .fs-pulse,
    .fs-fade,
    .fs-curtain,
    .fs-celebrate,
    .fs-pill,
    .fs-dot,
    .fs-progress__bar,
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
`, componentStyles = css`
  .aca-layout {
    display: grid;
    gap: 1.75rem;
    font-family: Manrope, 'Avenir Next', 'Segoe UI', sans-serif;
  }

  .fs-header {
    margin-bottom: 2rem;
  }

  .fs-title {
    font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
    font-size: clamp(2rem, 3.6vw, 2.75rem);
    font-weight: 600;
    letter-spacing: 0.01em;
  }

  .fs-desc {
    max-width: 36rem;
    margin-inline: auto;
    font-size: 0.98rem;
    line-height: 1.8;
    color: var(--muted-color, #666666);
  }

  @media (min-width: 960px) {
    .aca-layout {
      grid-template-columns: minmax(260px, 292px) minmax(0, 1fr);
      align-items: start;
      gap: 2rem;
    }
  }

  .aca-sidebar {
    padding: 1.35rem 1.2rem 1.45rem;
    border-radius: 2px;
    border: 1px solid color-mix(in srgb, #c9a86c 35%, var(--border-color, #e5e7eb));
    background:
      linear-gradient(180deg, rgba(255, 252, 247, 0.98), #fff 55%),
      linear-gradient(
        135deg,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, transparent),
        transparent 55%
      );
    box-shadow:
      0 1px 0 rgba(201, 168, 108, 0.25),
      0 22px 44px color-mix(in srgb, var(--text-color, #000) 9%, transparent);
  }

  .aca-sidebar__label {
    display: block;
    margin-bottom: 0.65rem;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.28rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    color: var(--text-color, #000000);
  }

  .aca-search {
    width: 100%;
    min-height: 46px;
    padding: 0.7rem 0.95rem;
    border: 1px solid color-mix(in srgb, #c9a86c 28%, var(--border-color, #e5e7eb));
    border-radius: 2px;
    background: color-mix(in srgb, var(--card-bg, #ffffff) 92%, var(--fs-surface, #f0f0f0));
    color: var(--text-color, #000000);
    font: inherit;
    box-sizing: border-box;
    margin-bottom: 1.05rem;
  }

  .aca-search:focus-visible {
    outline: 2px solid color-mix(in srgb, #c9a86c 55%, var(--accent-color, var(--fs-store-primary)));
    outline-offset: 2px;
  }

  .aca-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 0.55rem;
    max-height: 520px;
    overflow: auto;
  }

  .aca-list__item {
    width: 100%;
    display: grid;
    grid-template-columns: 56px minmax(0, 1fr) auto;
    align-items: center;
    gap: 0.8rem;
    padding: 0.55rem;
    border: 1px solid transparent;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.7);
    color: var(--text-color, #000000);
    font: inherit;
    text-align: start;
    cursor: pointer;
    transition:
      border-color 0.25s ease,
      background 0.25s ease,
      transform 0.25s ease,
      box-shadow 0.25s ease;
  }

  .aca-list__item:hover {
    border-color: color-mix(in srgb, #c9a86c 40%, var(--border-color, #e5e7eb));
    background: var(--fs-surface, var(--card-bg, #f0f0f0));
    transform: translateY(-1px);
  }

  .aca-list__item[aria-current='true'] {
    border-color: color-mix(in srgb, #c9a86c 55%, var(--accent-color, var(--fs-store-primary)));
    background: linear-gradient(
      120deg,
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, #fff),
      #fff
    );
    box-shadow: 0 12px 24px color-mix(in srgb, var(--text-color, #000) 10%, transparent);
  }

  .aca-list__thumb {
    width: 56px;
    height: 56px;
    border-radius: 2px;
    object-fit: cover;
    background: color-mix(in srgb, var(--border-color, #e5e7eb) 50%, transparent);
    box-shadow: 0 0 0 1px rgba(201, 168, 108, 0.28);
  }

  .aca-list__meta {
    min-width: 0;
    display: grid;
    gap: 0.18rem;
  }

  .aca-list__name {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-weight: 600;
    font-size: 1.12rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .aca-list__hint {
    font-size: 0.74rem;
    color: var(--muted-color, #666666);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .aca-list__check {
    width: 1.35rem;
    height: 1.35rem;
    border-radius: 2px;
    display: grid;
    place-items: center;
    font-size: 0.68rem;
    color: #fff;
    background: linear-gradient(145deg, #b08d57, #8b5e4b);
    opacity: 0;
  }

  .aca-list__item[aria-current='true'] .aca-list__check {
    opacity: 1;
  }

  .aca-panel {
    position: relative;
    overflow: hidden;
    border-radius: 2px;
    border: 1px solid color-mix(in srgb, #c9a86c 32%, var(--border-color, #e5e7eb));
    background: linear-gradient(180deg, #fffdf9 0%, var(--card-bg, #ffffff) 40%);
    box-shadow:
      0 1px 0 rgba(201, 168, 108, 0.22),
      0 28px 56px color-mix(in srgb, var(--text-color, #000) 11%, transparent);
  }

  .aca-panel__hero {
    position: relative;
    min-height: 220px;
    padding: 2rem 1.6rem 2.1rem;
    color: #fff;
    background:
      linear-gradient(115deg, rgba(22, 16, 13, 0.78), rgba(43, 33, 28, 0.28)),
      var(--accent-color, var(--fs-store-primary));
  }

  .aca-panel__hero::after {
    content: '';
    position: absolute;
    inset-inline: 1.6rem;
    bottom: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(201, 168, 108, 0.75),
      transparent
    );
  }

  .aca-panel__hero-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.48;
    transform: scale(1.03);
  }

  .aca-panel__hero-content {
    position: relative;
    z-index: 1;
    display: grid;
    gap: 0.7rem;
    max-width: 34rem;
  }

  .aca-kicker {
    display: inline-flex;
    width: fit-content;
    padding: 0.3rem 0.75rem;
    border-radius: 1px;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(212, 175, 105, 0.65);
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .aca-panel__title {
    margin: 0;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(2.15rem, 3.6vw, 2.85rem);
    font-weight: 600;
    line-height: 1.1;
    letter-spacing: 0.01em;
  }

  .aca-panel__summary {
    margin: 0;
    font-size: 0.96rem;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.9);
    max-width: 32rem;
  }

  .aca-panel__body {
    padding: 1.6rem 1.45rem 1.7rem;
    display: grid;
    gap: 0;
  }

  .aca-block {
    min-width: 0;
  }

  .aca-block + .aca-block,
  .aca-block + .aca-actions {
    margin-top: 1.5rem;
    padding-top: 1.45rem;
    border-top: 1px solid color-mix(in srgb, #c9a86c 28%, var(--border-color, #e5e7eb));
  }

  .aca-block--allows {
    position: relative;
    z-index: 1;
    background: linear-gradient(180deg, #fffdf9 0%, #fff 100%);
  }

  .aca-section-title {
    margin: 0 0 0.95rem;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.42rem;
    font-weight: 600;
    color: var(--text-color, #000000);
  }

  .aca-journey-swiper {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    overflow: hidden;
  }

  .aca-journey-swiper .swiper-slide {
    height: auto;
  }

  .aca-step {
    position: relative;
    z-index: 0;
    display: grid;
    align-content: start;
    gap: 0.65rem;
    padding: 1.05rem 0.95rem 1.15rem;
    border-radius: 2px;
    border: 1px solid color-mix(in srgb, #c9a86c 28%, var(--border-color, #e5e7eb));
    background:
      linear-gradient(180deg, color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 6%, var(--card-bg, #ffffff)) 0%, var(--card-bg, #ffffff) 70%);
    min-height: 100%;
    min-width: 0;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }

  .aca-step:hover {
    transform: translateY(-2px);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.9),
      0 14px 28px color-mix(in srgb, var(--text-color, #000) 9%, transparent);
  }

  @media (min-width: 820px) {
    .aca-step:not(:last-child)::after {
      content: '';
      position: absolute;
      top: 1.55rem;
      inset-inline-end: calc(-0.85rem / 2 - 0.15rem);
      width: 0.55rem;
      height: 1px;
      background: #c9a86c;
      pointer-events: none;
      z-index: 0;
    }
  }

  .aca-step__num {
    width: 2.05rem;
    height: 2.05rem;
    display: grid;
    place-items: center;
    border-radius: 1px;
    background: linear-gradient(145deg, #b08d57, var(--accent-color, var(--fs-store-primary)));
    color: #fff;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-weight: 700;
    font-size: 1.05rem;
    box-shadow: 0 10px 18px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 28%, transparent);
  }

  .aca-step__title {
    margin: 0;
    font-weight: 700;
    font-size: 0.9rem;
    color: var(--text-color, #000000);
  }

  .aca-step__text {
    margin: 0;
    color: var(--muted-color, #666666);
    font-size: 0.8rem;
    line-height: 1.7;
  }

  .aca-allows {
    display: grid;
    gap: 0.65rem;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 719px) {
    .aca-allows {
      grid-template-columns: 1fr;
    }
  }

  .aca-allow {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.65rem;
    align-items: center;
    padding: 0.9rem 0.95rem;
    border-radius: 2px;
    border: 1px solid color-mix(in srgb, #c9a86c 22%, var(--border-color, #e5e7eb));
    background: var(--fs-surface, var(--card-bg, #f0f0f0));
  }

  .aca-allow__icon {
    width: 2.1rem;
    height: 2.1rem;
    border-radius: 1px;
    display: grid;
    place-items: center;
    font-size: 0.82rem;
    font-weight: 700;
  }

  .aca-allow__label {
    display: grid;
    gap: 0.12rem;
  }

  .aca-allow__label strong {
    font-size: 0.88rem;
    color: var(--text-color, #000000);
  }

  .aca-allow__label span {
    font-size: 0.72rem;
    color: var(--muted-color, #666666);
  }

  .aca-allow--yes {
    border-color: color-mix(in srgb, #3d6b55 30%, var(--border-color, #e5e7eb));
    background: color-mix(in srgb, #3d6b55 5%, var(--fs-surface, var(--card-bg, #f0f0f0)));
  }

  .aca-allow--yes .aca-allow__icon {
    background: color-mix(in srgb, #3d6b55 14%, var(--fs-surface, var(--card-bg, #f0f0f0)));
    color: #2f5a47;
  }

  .aca-allow--no {
    border-color: color-mix(in srgb, #8f4a45 24%, var(--border-color, #e5e7eb));
    background: color-mix(in srgb, #8f4a45 4%, var(--fs-surface, var(--card-bg, #f0f0f0)));
  }

  .aca-allow--no .aca-allow__icon {
    background: color-mix(in srgb, #8f4a45 12%, var(--fs-surface, var(--card-bg, #f0f0f0)));
    color: #8f4a45;
  }

  .aca-notes {
    display: grid;
    gap: 0.6rem;
  }

  .aca-extra {
    margin: 0;
    padding: 0.95rem 1.05rem;
    border-radius: 2px;
    border-inline-start: 2px solid #c9a86c;
    border-block: 1px solid color-mix(in srgb, #c9a86c 22%, var(--border-color, #e5e7eb));
    border-inline-end: 1px solid color-mix(in srgb, #c9a86c 22%, var(--border-color, #e5e7eb));
    background: linear-gradient(
      90deg,
      color-mix(in srgb, #c9a86c 8%, #fffefb),
      #fff
    );
    font-size: 0.9rem;
    line-height: 1.75;
    color: var(--text-color, #000000);
  }

  .aca-extra strong {
    color: var(--accent-color, var(--fs-store-primary));
    font-weight: 700;
  }

  .aca-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    padding-top: 0.2rem;
  }

  .aca-actions .fs-btn {
    flex: 1 1 auto;
  }

  .aca-toast {
    position: fixed;
    inset-inline: 1rem;
    bottom: 1rem;
    margin: 0 auto;
    max-width: 20rem;
    padding: 0.9rem 1.15rem;
    background: linear-gradient(135deg, #6b4a3d, var(--accent-color, var(--fs-store-primary)));
    color: #fff;
    border-radius: 2px;
    text-align: center;
    font-size: 0.9rem;
    z-index: 100;
    box-shadow: 0 16px 32px color-mix(in srgb, var(--text-color, #000) 28%, transparent);
    animation: aca-toast-in 0.3s ease;
  }

  @keyframes aca-toast-in {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .aca-empty-inline {
    margin: 0.25rem 0 0;
    padding: 0.85rem;
    text-align: center;
    color: var(--muted-color, #666666);
    font-size: 0.86rem;
  }

  .aca-print-card {
    display: none;
  }

  @media (max-width: 959px) {
    .aca-layout {
      gap: 1.1rem;
    }

    .aca-list {
      max-height: 16rem;
    }

    .aca-sidebar {
      padding: 1rem 0.9rem 1.1rem;
    }

    .aca-panel__hero {
      min-height: 0;
      padding: 1.25rem 1rem 1.35rem;
    }

    .aca-panel__body {
      padding: 1.15rem 1rem 1.25rem;
      gap: 1.2rem;
    }

    .aca-panel__title {
      font-size: clamp(1.55rem, 6.5vw, 2rem);
    }

    .aca-step {
      min-height: 0;
      padding: 0.85rem 0.8rem 0.95rem;
    }

    .aca-step:hover {
      transform: none;
    }

    .aca-allows {
      grid-template-columns: 1fr;
    }

    .aca-actions {
      display: grid;
      grid-template-columns: 1fr;
    }

    .aca-actions .fs-btn {
      width: 100%;
    }
  }

  @media (max-width: 639px) {
    .aca-list {
      max-height: 14rem;
    }

    .aca-list__item {
      min-height: 48px;
    }

    .aca-panel__summary {
      font-size: 0.9rem;
      line-height: 1.7;
    }

    .aca-section-title {
      font-size: 1.2rem;
      margin-bottom: 0.75rem;
    }

    .aca-toast {
      inset-inline: 0.75rem;
      bottom: 0.75rem;
      width: auto;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .aca-list__item,
    .aca-step,
    .aca-toast {
      transition: none !important;
      animation: none !important;
      transform: none !important;
    }
  }

  @media print {
    :host {
      display: block !important;
    }

    .fs-section > *:not(.aca-print-card) {
      display: none !important;
    }

    .aca-print-card {
      display: block !important;
      padding: 2rem;
      color: #000;
      background: var(--fs-surface, var(--card-bg, #f0f0f0));
    }

    .aca-print-card h1 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 1.7rem;
      margin: 0 0 1rem;
    }

    .aca-print-card p,
    .aca-print-card li {
      font-size: 0.95rem;
      line-height: 1.65;
    }
  }
`, JUNK_STEP_VALUES = [
  "رابط المنتجات",
  "نص الزر",
  "product link",
  "products link",
  "button text",
  "products url",
  "btn text"
];
function isJunkLine(line) {
  const normalized = line.replace(/[:：]\s*$/, "").trim().toLowerCase();
  return normalized ? JUNK_STEP_VALUES.some((junk) => normalized === junk.toLowerCase()) : !0;
}
__name(isJunkLine, "isJunkLine");
function cleanCareText(raw) {
  const text = localizedString(raw).trim();
  if (!text) return "";
  let cleaned = text.split(/\r?\n/).map((line) => line.trim()).filter((line) => line && !isJunkLine(line)).join(`
`).trim();
  if (!cleaned) return "";
  for (const junk of JUNK_STEP_VALUES) {
    const pattern = new RegExp(`(?:^|[\\s،,])${junk.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[:：]?`, "gi");
    cleaned = cleaned.replace(pattern, " ").replace(/\s{2,}/g, " ").trim();
  }
  return isJunkLine(cleaned) ? "" : cleaned;
}
__name(cleanCareText, "cleanCareText");
function parseFabrics(raw) {
  return normalizeCollection(raw).map((item) => ({
    fabric_name: localizedString(item.fabric_name),
    fabric_image: extractImageUrl(item.fabric_image),
    fabric_summary: localizedString(item.fabric_summary),
    pre_wash: cleanCareText(item.pre_wash),
    wash: cleanCareText(item.wash),
    dry: cleanCareText(item.dry),
    iron: cleanCareText(item.iron),
    store: cleanCareText(item.store),
    stain: cleanCareText(item.stain),
    embroidery_warn: cleanCareText(item.embroidery_warn),
    wash_temp: cleanCareText(item.wash_temp),
    allow_washer: isTruthy(item.allow_washer),
    allow_dryer: isTruthy(item.allow_dryer),
    allow_steam: isTruthy(item.allow_steam)
  })).filter((f) => f.fabric_name.trim() !== "");
}
__name(parseFabrics, "parseFabrics");
function buildCareSteps(fabric) {
  return [
    { key: "pre_wash", labelAr: "قبل الغسيل", labelEn: "Pre-wash", value: fabric.pre_wash },
    { key: "wash", labelAr: "الغسيل", labelEn: "Wash", value: fabric.wash },
    { key: "dry", labelAr: "التجفيف", labelEn: "Dry", value: fabric.dry },
    { key: "iron", labelAr: "الكي", labelEn: "Iron", value: fabric.iron },
    { key: "store", labelAr: "التخزين", labelEn: "Storage", value: fabric.store }
  ].filter((s) => s.value.trim() !== "");
}
__name(buildCareSteps, "buildCareSteps");
function buildCareText(fabric, localeEn) {
  const lines = [fabric.fabric_name];
  fabric.fabric_summary && lines.push(fabric.fabric_summary);
  for (const step of buildCareSteps(fabric))
    lines.push(`${localeEn ? step.labelEn : step.labelAr}: ${step.value}`);
  return fabric.stain && lines.push(`${localeEn ? "Stain removal" : "إزالة البقع"}: ${fabric.stain}`), fabric.embroidery_warn && lines.push(
    `${localeEn ? "Embroidery note" : "تنبيه التطريز"}: ${fabric.embroidery_warn}`
  ), fabric.wash_temp && lines.push(
    `${localeEn ? "Wash temperature" : "حرارة الغسيل"}: ${fabric.wash_temp}`
  ), lines.join(`
`);
}
__name(buildCareText, "buildCareText");
function filterFabrics(fabrics, query) {
  const q = query.trim().toLowerCase();
  return q ? fabrics.filter(
    (f) => f.fabric_name.toLowerCase().includes(q) || f.fabric_summary.toLowerCase().includes(q)
  ) : fabrics;
}
__name(filterFabrics, "filterFabrics");
function bindSallaRegistration(ctor) {
  ctor.registerSallaComponent = /* @__PURE__ */ __name(function(tagName) {
    if (typeof window > "u") return;
    const attempt = /* @__PURE__ */ __name(() => {
      var _a2, _b;
      const bundles = (_a2 = window.Salla) == null ? void 0 : _a2.bundles;
      if (bundles != null && bundles.registerComponent) {
        if ((_b = bundles.isRegistered) != null && _b.call(bundles, tagName)) return !0;
        const dynamicTagName = `${tagName}-${Math.random().toString(36).slice(2, 8)}`;
        return bundles.registerComponent(tagName, {
          component: this,
          dynamicTagName
        }), !0;
      }
      const host = HTMLElement;
      return typeof host.registerSallaComponent == "function" ? (host.registerSallaComponent.call(this, tagName), !0) : !1;
    }, "attempt");
    if (attempt()) return;
    let ticks = 0;
    const timer = window.setInterval(() => {
      ticks += 1, (attempt() || ticks > 200) && window.clearInterval(timer);
    }, 50);
  }, "registerSallaComponent");
}
__name(bindSallaRegistration, "bindSallaRegistration");
var _a;
const _AbayaCareAssistant = (_a = class extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.searchQuery = "", this.selectedKey = "", this.showToast = !1, this._onLangChange = () => {
      this.requestUpdate(), this.scheduleJourneySwiper();
    }, this._toastTimer = null, this.remountTimer = null, this.scheduleJourneySwiper = () => {
      this.remountTimer && clearTimeout(this.remountTimer), this.remountTimer = setTimeout(() => this.remountJourneySwiper(), 0);
    };
  }
  connectedCallback() {
    super.connectedCallback(), this._ensureFonts(), document.addEventListener("language-changed", this._onLangChange), window.addEventListener("resize", this.scheduleJourneySwiper), this._ensureSelection(), this._syncVisibility();
  }
  _ensureFonts() {
    if (_a.fontsReady || typeof document > "u") return;
    const id = "aca-luxury-fonts";
    if (document.getElementById(id)) {
      _a.fontsReady = !0;
      return;
    }
    const link = document.createElement("link");
    link.id = id, link.rel = "stylesheet", link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;500;600;700&display=swap", document.head.appendChild(link), _a.fontsReady = !0;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("language-changed", this._onLangChange), window.removeEventListener("resize", this.scheduleJourneySwiper), this._toastTimer && (clearTimeout(this._toastTimer), this._toastTimer = null), this.remountTimer && clearTimeout(this.remountTimer), destroyFsSwiper(this.journeySwiper), this.journeySwiper = void 0;
  }
  firstUpdated() {
    this.scheduleJourneySwiper();
  }
  updated(changed) {
    changed.has("config") ? (this._ensureSelection(), this.scheduleJourneySwiper()) : changed.has("selectedKey") && this.scheduleJourneySwiper(), this._syncVisibility();
  }
  remountJourneySwiper() {
    destroyFsSwiper(this.journeySwiper), this.journeySwiper = void 0;
    const root = this.renderRoot.querySelector(".aca-journey-swiper");
    if (!root) return;
    const mobile = window.matchMedia("(max-width: 819px)").matches;
    this.journeySwiper = mountFsSwiper(root, {
      slidesPerView: mobile ? 1.15 : 5,
      spaceBetween: mobile ? 10 : 14,
      allowTouchMove: mobile,
      watchOverflow: !0
    });
  }
  get fabrics() {
    var _a2;
    return parseFabrics((_a2 = this.config) == null ? void 0 : _a2.aca_fabrics);
  }
  get filteredFabrics() {
    return filterFabrics(this.fabrics, this.searchQuery);
  }
  get theme() {
    return readSectionTheme(this.config, "aca_");
  }
  get selected() {
    return this.filteredFabrics.find((f) => f.fabric_name === this.selectedKey) || this.filteredFabrics[0] || null;
  }
  _syncVisibility() {
    this.style.display = this.fabrics.length ? "" : "none";
  }
  _ensureSelection() {
    const list = this.filteredFabrics;
    if (!list.length) {
      this.selectedKey = "";
      return;
    }
    list.some((f) => f.fabric_name === this.selectedKey) || (this.selectedKey = list[0].fabric_name);
  }
  _onSearch(e) {
    this.searchQuery = e.target.value, this._ensureSelection();
  }
  _selectFabric(name) {
    this.selectedKey = name;
  }
  async _copyCare() {
    const fabric = this.selected;
    if (!fabric) return;
    const localeEn = getPageLocale() === "en";
    await copyText(buildCareText(fabric, localeEn)) && this._showCopiedToast();
  }
  _printCare() {
    window.print();
  }
  _showCopiedToast() {
    this.showToast = !0, this._toastTimer && clearTimeout(this._toastTimer), this._toastTimer = setTimeout(() => {
      this.showToast = !1, this._toastTimer = null;
    }, 2400);
  }
  _label(key, ar, en) {
    var _a2;
    return localizedString((_a2 = this.config) == null ? void 0 : _a2[key], "") || t(ar, en);
  }
  render() {
    var _a2, _b;
    if (!this.fabrics.length)
      return html`<div class="fs-empty" role="status">
        ${t("لا توجد أقمشة متاحة", "No fabrics available")}
      </div>`;
    const theme = this.theme, animate = theme.animate && !prefersReducedMotion(), fabric = this.selected, title = localizedString((_a2 = this.config) == null ? void 0 : _a2.aca_title), desc = localizedString((_b = this.config) == null ? void 0 : _b.aca_desc), searchPh = this._label("aca_search_placeholder", "ابحثي عن الخامة...", "Search fabrics..."), copyBtn = this._label("aca_copy_btn", "نسخ التعليمات", "Copy instructions"), printBtn = this._label("aca_print_btn", "طباعة البطاقة", "Print card"), copiedMsg = this._label("aca_copied_msg", "تم النسخ بنجاح", "Copied successfully"), steps = fabric ? buildCareSteps(fabric) : [];
    return html`
      <section
        class=${classMap({
      "fs-section": !0,
      "fs-animate": animate
    })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("مساعد العناية بالعباية", "Abaya care assistant")}
      >
        <div class="fs-container">
          ${title || desc ? html`<header class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </header>` : nothing}

          <div class="aca-layout">
            <aside class="aca-sidebar">
              <label class="aca-sidebar__label" for="aca-search">
                ${t("اختاري الخامة", "Choose a fabric")}
              </label>
              <input
                id="aca-search"
                class="aca-search"
                type="search"
                .value=${this.searchQuery}
                placeholder=${searchPh}
                @input=${this._onSearch}
                aria-label=${searchPh}
              />
              <ul class="aca-list" role="listbox" aria-label=${t("قائمة الأقمشة", "Fabric list")}>
                ${this.filteredFabrics.map(
      (f) => html`
                    <li>
                      <button
                        type="button"
                        class="aca-list__item"
                        role="option"
                        aria-current=${f.fabric_name === (fabric == null ? void 0 : fabric.fabric_name) ? "true" : "false"}
                        @click=${() => this._selectFabric(f.fabric_name)}
                      >
                        ${f.fabric_image ? html`<img
                              class="aca-list__thumb"
                              src=${f.fabric_image}
                              alt=""
                              loading="lazy"
                              width="48"
                              height="48"
                            />` : html`<span class="aca-list__thumb" aria-hidden="true"></span>`}
                        <span class="aca-list__meta">
                          <span class="aca-list__name">${f.fabric_name}</span>
                          ${f.fabric_summary ? html`<span class="aca-list__hint">${f.fabric_summary}</span>` : nothing}
                        </span>
                        <span class="aca-list__check" aria-hidden="true">✓</span>
                      </button>
                    </li>
                  `
    )}
              </ul>
              ${this.filteredFabrics.length ? nothing : html`<p class="aca-empty-inline">${t("لا توجد نتائج", "No results")}</p>`}
            </aside>

            ${fabric ? html`<article class="aca-panel" aria-live="polite">
                  <div class="aca-panel__hero">
                    ${fabric.fabric_image ? html`<img
                          class="aca-panel__hero-bg"
                          src=${fabric.fabric_image}
                          alt=""
                          loading="eager"
                          decoding="async"
                        />` : nothing}
                    <div class="aca-panel__hero-content">
                      <span class="aca-kicker">${t("أتيليه العناية", "Care atelier")}</span>
                      <h3 class="aca-panel__title">${fabric.fabric_name}</h3>
                      ${fabric.fabric_summary ? html`<p class="aca-panel__summary">${fabric.fabric_summary}</p>` : nothing}
                    </div>
                  </div>

                  <div class="aca-panel__body">
                    <section class="aca-block aca-block--ritual">
                      <h4 class="aca-section-title">
                        ${t("طقوس العناية بأناقة", "An elegant care ritual")}
                      </h4>
                      ${steps.length ? html`<div class="swiper aca-journey-swiper" aria-label=${t("خطوات العناية", "Care steps")}>
                            <div class="swiper-wrapper">
                              ${steps.map(
      (step, i) => html`
                                  <div class="swiper-slide">
                                    <div class="aca-step">
                                      <span class="aca-step__num" aria-hidden="true">${i + 1}</span>
                                      <p class="aca-step__title">${t(step.labelAr, step.labelEn)}</p>
                                      <p class="aca-step__text">${step.value}</p>
                                    </div>
                                  </div>
                                `
    )}
                            </div>
                          </div>` : html`<p class="aca-empty-inline">
                            ${t("لا توجد خطوات عناية لهذه الخامة", "No care steps for this fabric")}
                          </p>`}
                    </section>

                    <section
                      class="aca-block aca-block--allows"
                      aria-labelledby="aca-allows-title"
                    >
                      <h4 class="aca-section-title" id="aca-allows-title">
                        ${t("ما المسموح؟", "What is allowed?")}
                      </h4>
                      <div class="aca-allows" aria-label=${t("الأجهزة المسموحة", "Allowed appliances")}>
                        ${this._renderAllow(t("غسالة", "Washer"), fabric.allow_washer)}
                        ${this._renderAllow(t("مجفف", "Dryer"), fabric.allow_dryer)}
                        ${this._renderAllow(t("بخار", "Steam"), fabric.allow_steam)}
                      </div>
                    </section>

                    ${fabric.wash_temp || fabric.stain || fabric.embroidery_warn ? html`<section class="aca-block aca-block--notes">
                          <h4 class="aca-section-title">
                            ${t("ملاحظات إضافية", "Extra notes")}
                          </h4>
                          <div class="aca-notes">
                            ${fabric.wash_temp ? html`<p class="aca-extra">
                                  <strong>${t("حرارة الغسيل:", "Wash temp:")}</strong>
                                  ${fabric.wash_temp}
                                </p>` : nothing}
                            ${fabric.stain ? html`<p class="aca-extra">
                                  <strong>${t("إزالة البقع:", "Stain removal:")}</strong>
                                  ${fabric.stain}
                                </p>` : nothing}
                            ${fabric.embroidery_warn ? html`<p class="aca-extra">
                                  <strong>${t("تنبيه التطريز:", "Embroidery note:")}</strong>
                                  ${fabric.embroidery_warn}
                                </p>` : nothing}
                          </div>
                        </section>` : nothing}

                    <div class="aca-actions">
                      <button type="button" class="fs-btn" @click=${this._copyCare}>
                        ${copyBtn}
                      </button>
                      <button type="button" class="fs-btn fs-btn--ghost" @click=${this._printCare}>
                        ${printBtn}
                      </button>
                    </div>
                  </div>
                </article>` : nothing}
          </div>
        </div>

        ${this.showToast ? html`<div class="aca-toast" role="status" aria-live="polite">${copiedMsg}</div>` : nothing}

        ${fabric ? this._renderPrintCard(fabric) : nothing}
        ${renderCommerceOutcome(this.config || {}, "aca_")}
      </section>
    `;
  }
  _renderAllow(label, allowed) {
    return html`
      <div class="aca-allow ${allowed ? "aca-allow--yes" : "aca-allow--no"}">
        <span class="aca-allow__icon" aria-hidden="true">${allowed ? "✓" : "✕"}</span>
        <span class="aca-allow__label">
          <strong>${label}</strong>
          <span>${allowed ? t("مسموح", "Allowed") : t("غير مسموح", "Not allowed")}</span>
        </span>
      </div>
    `;
  }
  _renderPrintCard(fabric) {
    const steps = buildCareSteps(fabric);
    return html`
      <div class="aca-print-card" aria-hidden="true">
        <h1>${fabric.fabric_name}</h1>
        ${fabric.fabric_summary ? html`<p>${fabric.fabric_summary}</p>` : nothing}
        <ol>
          ${steps.map(
      (s) => html`<li><strong>${t(s.labelAr, s.labelEn)}:</strong> ${s.value}</li>`
    )}
        </ol>
        ${fabric.wash_temp ? html`<p>${t("حرارة الغسيل", "Wash temp")}: ${fabric.wash_temp}</p>` : nothing}
        ${fabric.stain ? html`<p>${t("إزالة البقع", "Stain")}: ${fabric.stain}</p>` : nothing}
        ${fabric.embroidery_warn ? html`<p>${t("تنبيه التطريز", "Embroidery")}: ${fabric.embroidery_warn}</p>` : nothing}
      </div>
    `;
  }
}, __name(_a, "_AbayaCareAssistant"), _a.fontsReady = !1, _a.styles = [sharedSectionCss, fsSwiperCss, componentStyles], _a);
__decorateClass([
  property({ type: Object })
], _AbayaCareAssistant.prototype, "config");
__decorateClass([
  state()
], _AbayaCareAssistant.prototype, "searchQuery");
__decorateClass([
  state()
], _AbayaCareAssistant.prototype, "selectedKey");
__decorateClass([
  state()
], _AbayaCareAssistant.prototype, "showToast");
let AbayaCareAssistant = _AbayaCareAssistant;
bindSallaRegistration(AbayaCareAssistant);
typeof AbayaCareAssistant < "u" && AbayaCareAssistant.registerSallaComponent("salla-abaya-care-assistant");
export {
  AbayaCareAssistant as default
};
