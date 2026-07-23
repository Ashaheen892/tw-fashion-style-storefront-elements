var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, html, nothing } from "lit";
import { property, state, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { styleMap } from "lit/directives/style-map.js";
import { l as localizedString } from "./localizedString-2lLX6pth.js";
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const PRIMARY = "var(--color-primary, var(--primary-color, var(--color-main, #64748b)))";
function detectFsTheme() {
  var _a;
  if (typeof document > "u") return "light";
  const root = document.documentElement, attr = (root.getAttribute("data-theme") || root.getAttribute("data-mode") || "").toLowerCase();
  if (attr === "dark") return "dark";
  if (attr === "light") return "light";
  if (root.classList.contains("dark") || (_a = document.body) != null && _a.classList.contains("dark"))
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
function toNumber(val, fallback = 0) {
  if (typeof val == "number" && Number.isFinite(val)) return val;
  if (typeof val == "string" && val.trim() !== "") {
    const n = Number(val.replace(",", "."));
    return Number.isFinite(n) ? n : fallback;
  }
  return fallback;
}
__name(toNumber, "toNumber");
function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
__name(clamp, "clamp");
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
  var _a, _b;
  return ((_b = typeof document < "u" ? (_a = document.documentElement.lang) == null ? void 0 : _a.split(/[-_]/)[0] : "ar") == null ? void 0 : _b.toLowerCase()) === "en" ? en : ar;
}
__name(t, "t");
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
function getRadioValue(value, fallback = "") {
  if (typeof value == "string" && value.trim()) return value.trim();
  if (Array.isArray(value) && value[0]) {
    const first = value[0];
    if (typeof first == "string") return first;
    if (first && typeof first == "object" && "value" in first)
      return String(first.value ?? fallback);
    if (first && typeof first == "object" && "key" in first)
      return String(first.key ?? fallback);
  }
  if (value && typeof value == "object") {
    const obj = value;
    if (Array.isArray(obj.selected) && obj.selected[0])
      return getRadioValue(obj.selected, fallback);
    if ("value" in obj && obj.value != null && !Array.isArray(obj.value))
      return String(obj.value ?? fallback);
    if (Array.isArray(obj.value) && obj.value[0])
      return getRadioValue(obj.value, fallback);
  }
  return fallback;
}
__name(getRadioValue, "getRadioValue");
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
  .aem-shell {
    display: grid;
    gap: 1.25rem;
  }

  .aem-cta {
    display: flex;
    justify-content: center;
  }

  .aem-desk {
    position: relative;
    display: grid;
    grid-template-columns: minmax(180px, 1fr) minmax(240px, var(--aem-max-width, 420px)) minmax(180px, 1fr);
    gap: 1.25rem 1.5rem;
    align-items: start;
  }

  .aem-desk--compact {
    grid-template-columns: minmax(160px, 0.85fr) minmax(260px, var(--aem-max-width, 420px)) minmax(160px, 0.85fr);
    gap: 1rem;
  }

  .aem-stage-stack {
    display: grid;
    gap: 0.65rem;
    min-width: 0;
  }

  .aem-col {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    min-width: 0;
    justify-content: center;
    padding-block: 0.35rem;
    min-height: 8rem;
  }

  .aem-col__placeholder {
    min-height: 1px;
  }

  .aem-card-slot {
    min-width: 0;
  }

  .aem-card-slot--in {
    animation: aem-card-in 0.35s ease both;
  }

  .aem-col--left .aem-card-slot--in {
    animation: aem-slide-left 0.35s ease both;
  }

  .aem-col--right .aem-card-slot--in {
    animation: aem-slide-right 0.35s ease both;
  }

  .aem-pick-hint {
    margin: 0;
    width: fit-content;
    max-width: 100%;
    margin-inline: auto;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    min-height: 2.4rem;
    padding: 0.4rem 0.95rem;
    text-align: center;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--muted-color, #666666);
    line-height: 1.5;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 7%, var(--card-bg, #ffffff));
    border: 1px dashed color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 30%, transparent);
  }

  .aem-pick-hint::before {
    content: '';
    flex: 0 0 auto;
    width: 0.55rem;
    height: 0.55rem;
    border-radius: 50%;
    background: var(--accent-color, var(--fs-store-primary));
    opacity: 0.7;
  }

  .aem-pick-hint--hidden {
    visibility: hidden;
    pointer-events: none;
  }

  .aem-clear-wrap {
    text-align: center;
  }

  .aem-mobile {
    display: grid;
    gap: 0.85rem;
    min-width: 0;
  }

  .aem-mobile__card {
    max-width: 22rem;
    margin-inline: auto;
    width: 100%;
  }

  .aem-stage-wrap {
    position: relative;
    width: 100%;
    max-width: var(--aem-max-width, 420px);
    margin-inline: auto;
  }

  .aem-stage {
    position: relative;
    width: 100%;
    aspect-ratio: var(--aem-aspect, 3 / 4);
    border-radius: var(--section-radius, 16px);
    background:
      radial-gradient(
        120% 90% at 50% 0%,
        color-mix(in srgb, var(--card-bg, #ffffff) 65%, transparent),
        transparent 60%
      ),
      var(--aem-stage-bg, #f3ece7);
    border: 1px solid var(--border-color, #e5e7eb);
    box-shadow: var(--aem-shadow, 0 10px 28px color-mix(in srgb, var(--text-color, #000) 10%, transparent)),
      inset 0 1px 0 rgba(255, 255, 255, 0.5);
    overflow: hidden;
  }

  .aem-stage__ornament {
    position: absolute;
    inset: 7%;
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 26%, transparent);
    border-radius: calc(var(--section-radius, 16px) * 0.7);
    pointer-events: none;
    opacity: 0.6;
  }

  /* couture corner ticks on the ornament frame */
  .aem-stage__ornament::before,
  .aem-stage__ornament::after {
    content: '';
    position: absolute;
    width: 14px;
    height: 14px;
    border: 0 solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 55%, transparent);
    pointer-events: none;
  }

  .aem-stage__ornament::before {
    top: -1px;
    inset-inline-start: -1px;
    border-top-width: 2px;
    border-inline-start-width: 2px;
    border-start-start-radius: 6px;
  }

  .aem-stage__ornament::after {
    bottom: -1px;
    inset-inline-end: -1px;
    border-bottom-width: 2px;
    border-inline-end-width: 2px;
    border-end-end-radius: 6px;
  }

  .aem-stage__img-wrap {
    position: absolute;
    /* keep the abaya tucked inside the ornament frame (matches .aem-spots) */
    inset: 8.5%;
    display: grid;
    place-items: center;
  }

  .aem-stage__img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
    display: block;
    user-select: none;
    -webkit-user-drag: none;
  }

  .aem-stage__img[hidden] {
    display: none !important;
  }

  .aem-spots {
    position: absolute;
    /* align the spot coordinate space with the inset image */
    inset: 8.5%;
    pointer-events: none;
  }

  .aem-spot {
    position: absolute;
    transform: translate(-50%, -50%);
    width: 44px;
    height: 44px;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    pointer-events: auto;
    z-index: 2;
    display: grid;
    place-items: center;
    color: var(--aem-spot-color, var(--accent-color, var(--fs-store-primary)));
  }

  .aem-spot:focus {
    outline: none;
  }

  .aem-spot:focus-visible .aem-spot__ring {
    outline: 2px solid var(--aem-active, var(--accent-color, var(--fs-store-primary)));
    outline-offset: 3px;
  }

  .aem-spot__ring {
    position: relative;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 2px solid currentColor;
    background: color-mix(in srgb, var(--card-bg, #ffffff) 92%, transparent);
    display: grid;
    place-items: center;
    box-shadow: 0 4px 14px color-mix(in srgb, var(--text-color, #000) 20%, transparent),
      inset 0 0 0 1px rgba(255, 255, 255, 0.45);
    backdrop-filter: blur(2px);
    transition: transform 0.24s cubic-bezier(0.22, 1, 0.36, 1),
      background 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease,
      color 0.22s ease;
  }

  .aem-spot__core {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: currentColor;
  }

  .aem-spot__num {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    font-size: 0.72rem;
    font-weight: 800;
    color: var(--text-color, #000000);
    line-height: 1;
    transition: color 0.22s ease;
  }

  .aem-spot__num + .aem-spot__core {
    display: none;
  }

  .aem-spot--pulse .aem-spot__ring::after {
    content: '';
    position: absolute;
    inset: -5px;
    border-radius: 50%;
    border: 1px solid currentColor;
    opacity: 0.35;
    animation: aem-pulse 1.8s ease-out infinite;
  }

  .aem-spot--active .aem-spot__ring,
  .aem-spot--hover .aem-spot__ring {
    transform: scale(1.16);
    border-color: var(--aem-active, var(--accent-color, var(--fs-store-primary)));
    background: var(--aem-active, var(--accent-color, var(--fs-store-primary)));
    box-shadow: 0 8px 22px color-mix(in srgb, var(--aem-active, #8b5e4b) 42%, transparent);
    color: var(--aem-active, var(--accent-color, var(--fs-store-primary)));
  }

  .aem-spot--active .aem-spot__num,
  .aem-spot--hover .aem-spot__num {
    color: #fff;
  }

  .aem-spot--featured .aem-spot__ring {
    width: 32px;
    height: 32px;
    border-width: 2.5px;
  }

  .aem-spot__tip {
    position: absolute;
    left: 50%;
    bottom: calc(100% + 6px);
    transform: translateX(-50%);
    white-space: nowrap;
    max-width: 10rem;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0.28rem 0.55rem;
    border-radius: 999px;
    background: var(--card-bg, #ffffff);
    color: var(--text-color, #000000);
    border: 1px solid var(--border-color, #e5e7eb);
    font-size: 0.72rem;
    font-weight: 600;
    box-shadow: 0 6px 16px color-mix(in srgb, var(--text-color, #000) 12%, transparent);
    pointer-events: none;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.18s ease;
    z-index: 3;
  }

  .aem-spot__tip--show,
  .aem-spot--hover .aem-spot__tip,
  .aem-spot--active .aem-spot__tip {
    opacity: 1;
    visibility: visible;
  }

  .aem-lines {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: visible;
    z-index: 1;
  }

  .aem-line {
    fill: none;
    stroke: var(--aem-line-color, #c4a99a);
    stroke-width: 1.35;
    stroke-linecap: round;
    stroke-linejoin: round;
    opacity: 0.72;
    transition: stroke 0.2s ease, stroke-width 0.2s ease, opacity 0.2s ease;
  }

  .aem-desk--dim .aem-line {
    opacity: 0.22;
  }

  .aem-line--active,
  .aem-line--hover {
    stroke: var(--aem-active, var(--accent-color, var(--fs-store-primary)));
    stroke-width: 2.1;
    opacity: 1;
  }

  .aem-desk--dim .aem-line--active,
  .aem-desk--dim .aem-line--hover {
    opacity: 1;
  }

  .aem-card {
    position: relative;
    background: var(--card-bg, #ffffff);
    border: 1px solid var(--aem-card-border, var(--border-color, #e5e7eb));
    border-radius: var(--section-radius, 16px);
    box-shadow: var(--aem-shadow, 0 10px 28px color-mix(in srgb, var(--text-color, #000) 10%, transparent));
    padding: 0.85rem;
    display: grid;
    gap: 0.6rem;
    min-width: 0;
    cursor: pointer;
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease,
      transform 0.26s cubic-bezier(0.22, 1, 0.36, 1),
      opacity 0.28s ease;
    text-align: start;
  }

  /* accent hairline on the leading edge for a couture feel */
  .aem-card::before {
    content: '';
    position: absolute;
    inset-block: 0.9rem;
    inset-inline-start: 0;
    width: 3px;
    border-radius: 999px;
    background: var(--aem-active, var(--accent-color, var(--fs-store-primary)));
    opacity: 0;
    transition: opacity 0.24s ease;
  }

  .aem-card:focus {
    outline: none;
  }

  .aem-card:focus-visible {
    outline: 2px solid var(--aem-active, var(--accent-color, var(--fs-store-primary)));
    outline-offset: 2px;
  }

  .aem-card--active,
  .aem-card--hover {
    border-color: color-mix(in srgb, var(--aem-active, #8b5e4b) 55%, var(--aem-card-border, #e5e7eb));
    box-shadow: 0 16px 36px color-mix(in srgb, var(--aem-active, #8b5e4b) 20%, transparent);
  }

  .aem-card--active::before,
  .aem-card--hover::before {
    opacity: 1;
  }

  .aem-card--hover:not(.aem-card--featured),
  .aem-card--active:not(.aem-card--featured) {
    transform: translateY(-3px);
  }

  .aem-card--featured {
    padding: 0.95rem;
    transform: scale(1.02);
  }

  .aem-card--featured.aem-card--hover,
  .aem-card--featured.aem-card--active {
    transform: scale(1.03) translateY(-2px);
  }

  .aem-card__media {
    position: relative;
    width: 100%;
    aspect-ratio: 4 / 3;
    border-radius: calc(var(--section-radius, 16px) * 0.65);
    overflow: hidden;
    background: color-mix(in srgb, var(--aem-stage-bg, #f3ece7) 70%, #fff);
  }

  .aem-card__media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.35s ease;
  }

  .aem-card__media img[hidden] {
    display: none !important;
  }

  .aem-card--hover .aem-card__media img,
  .aem-card--active .aem-card__media img {
    transform: scale(1.06);
  }

  .aem-card__zoom {
    position: absolute;
    inset: 0;
    border: none;
    background: transparent;
    cursor: zoom-in;
    padding: 0;
  }

  /* magnifier chip revealed on hover/focus */
  .aem-card__zoom::after {
    content: '⤢';
    position: absolute;
    inset-block-end: 0.5rem;
    inset-inline-end: 0.5rem;
    width: 1.85rem;
    height: 1.85rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: color-mix(in srgb, var(--card-bg, #ffffff) 82%, transparent);
    color: var(--text-color, #000000);
    font-size: 0.9rem;
    box-shadow: 0 4px 12px color-mix(in srgb, var(--text-color, #000) 22%, transparent);
    backdrop-filter: blur(4px);
    opacity: 0;
    transform: translateY(4px) scale(0.9);
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  .aem-card:hover .aem-card__zoom::after,
  .aem-card__zoom:hover::after,
  .aem-card__zoom:focus-visible::after {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  .aem-card__zoom:focus-visible {
    outline: 2px solid var(--aem-active, #8b5e4b);
    outline-offset: -2px;
  }

  .aem-badge {
    display: inline-flex;
    align-items: center;
    align-self: start;
    padding: 0.24rem 0.6rem;
    border-radius: 999px;
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0.01em;
    background: linear-gradient(
      135deg,
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 22%, #fff),
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, #fff)
    );
    color: var(--accent-color, var(--fs-store-primary));
    box-shadow: 0 2px 6px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 18%, transparent);
  }

  .aem-card__title {
    margin: 0;
    font-size: 0.98rem;
    font-weight: 800;
    line-height: 1.35;
    color: var(--text-color, #000000);
  }

  .aem-card__desc {
    margin: 0;
    font-size: 0.82rem;
    line-height: 1.6;
    color: var(--muted-color, #666666);
  }

  .aem-meta {
    display: grid;
    gap: 0.35rem;
    padding: 0.6rem 0.7rem;
    border-radius: calc(var(--section-radius, 16px) * 0.5);
    background: color-mix(in srgb, var(--aem-stage-bg, #f3ece7) 45%, var(--card-bg, #ffffff));
    border: 1px solid color-mix(in srgb, var(--aem-card-border, #e5e7eb) 65%, transparent);
    font-size: 0.78rem;
    line-height: 1.5;
    color: var(--muted-color, #666666);
  }

  .aem-meta > div {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
  }

  .aem-meta > div + div {
    padding-top: 0.35rem;
    border-top: 1px dashed color-mix(in srgb, var(--aem-card-border, #e5e7eb) 70%, transparent);
  }

  .aem-meta strong {
    color: var(--text-color, #000000);
    font-weight: 700;
  }

  .aem-card__link {
    justify-self: stretch;
    width: 100%;
    justify-content: center;
    min-height: 42px;
    padding: 0.5rem 0.9rem;
    font-size: 0.85rem;
    font-weight: 700;
    border-radius: calc(var(--section-radius, 16px) * 0.5);
  }

  .aem-clear {
    display: inline-flex;
    align-items: center;
    margin-inline: auto;
    min-height: 40px;
    padding: 0.4rem 1.1rem;
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: 999px;
    background: var(--card-bg, #ffffff);
    color: var(--muted-color, #666666);
    font: inherit;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
  }

  .aem-clear:hover {
    border-color: color-mix(in srgb, var(--aem-active, #8b5e4b) 55%, var(--border-color, #e5e7eb));
    color: var(--aem-active, var(--accent-color, var(--fs-store-primary)));
    background: color-mix(in srgb, var(--aem-active, #8b5e4b) 7%, var(--card-bg, #ffffff));
  }

  .aem-clear:focus-visible {
    outline: 2px solid var(--aem-active, #8b5e4b);
    outline-offset: 2px;
  }

  .aem-mobile__live {
    width: fit-content;
    max-width: 100%;
    margin-inline: auto;
    min-height: 1.25rem;
    padding: 0.3rem 0.9rem;
    text-align: center;
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--aem-active, var(--accent-color, var(--fs-store-primary)));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 9%, var(--card-bg, #ffffff));
    border-radius: 999px;
  }

  .aem-nav {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
  }

  .aem-nav button {
    min-width: 44px;
    min-height: 44px;
    border-radius: 50%;
    border: 1px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #ffffff);
    color: var(--text-color, #000000);
    font: inherit;
    font-size: 1.1rem;
    line-height: 1;
    cursor: pointer;
    box-shadow: 0 4px 12px color-mix(in srgb, var(--text-color, #000) 10%, transparent);
    transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease,
      transform 0.2s ease;
  }

  .aem-nav button:hover:not(:disabled) {
    border-color: var(--aem-active, var(--accent-color, var(--fs-store-primary)));
    color: var(--aem-active, var(--accent-color, var(--fs-store-primary)));
    background: color-mix(in srgb, var(--aem-active, #8b5e4b) 8%, var(--card-bg, #ffffff));
  }

  .aem-nav button:active:not(:disabled) {
    transform: scale(0.94);
  }

  .aem-nav button:focus-visible {
    outline: 2px solid var(--aem-active, #8b5e4b);
    outline-offset: 2px;
  }

  .aem-nav button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  /* Dialog */
  .aem-dialog {
    border: none;
    padding: 0;
    max-width: min(92vw, 520px);
    width: 100%;
    background: transparent;
  }

  .aem-dialog::backdrop {
    background: rgba(24, 18, 15, 0.58);
    backdrop-filter: blur(3px);
  }

  .aem-dialog__inner {
    background: var(--card-bg, #ffffff);
    border-radius: var(--section-radius, 16px);
    padding: 1rem;
    display: grid;
    gap: 0.75rem;
    color: var(--text-color, #000000);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.28);
    animation: aem-card-in 0.28s ease both;
  }

  .aem-dialog__close {
    justify-self: end;
    min-width: 40px;
    min-height: 40px;
    border: none;
    border-radius: 50%;
    background: color-mix(in srgb, var(--muted-color, #666666) 12%, #fff);
    color: var(--text-color, #000000);
    font: inherit;
    cursor: pointer;
  }

  .aem-dialog__close:focus-visible {
    outline: 2px solid var(--aem-active, #8b5e4b);
    outline-offset: 2px;
  }

  .aem-dialog__img {
    width: 100%;
    max-height: min(60vh, 420px);
    object-fit: contain;
    border-radius: calc(var(--section-radius, 16px) * 0.65);
    background: var(--aem-stage-bg, #f3ece7);
  }

  .aem-dialog__title {
    margin: 0;
    font-size: 1.15rem;
  }

  .aem-dialog__desc {
    margin: 0;
    color: var(--muted-color, #666666);
    line-height: 1.6;
  }

  .aem-fs-fallback {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: grid;
    place-items: center;
    padding: 1rem;
    background: rgba(24, 18, 15, 0.55);
  }

  /* Entrance */
  .aem--enter .aem-stage {
    animation: aem-fade-up 0.35s ease both;
  }

  .aem--enter .aem-spot {
    opacity: 0;
    animation: aem-fade-up 0.3s ease both;
  }

  .aem--enter .aem-line {
    stroke-dasharray: 240;
    stroke-dashoffset: 240;
    animation: aem-draw 0.35s ease forwards;
    animation-delay: 0.35s;
  }

  .aem--enter .aem-col--left .aem-card {
    animation: aem-slide-left 0.35s ease both;
    animation-delay: 0.45s;
  }

  .aem--enter .aem-col--right .aem-card {
    animation: aem-slide-right 0.35s ease both;
    animation-delay: 0.45s;
  }

  .aem--enter .aem-mobile .aem-card {
    animation: aem-fade-up 0.35s ease both;
    animation-delay: 0.4s;
  }

  @keyframes aem-pulse {
    0% {
      transform: scale(0.85);
      opacity: 0.45;
    }
    100% {
      transform: scale(1.35);
      opacity: 0;
    }
  }

  @keyframes aem-fade-up {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @keyframes aem-card-in {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @keyframes aem-slide-left {
    from {
      opacity: 0;
      transform: translateX(-16px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @keyframes aem-slide-right {
    from {
      opacity: 0;
      transform: translateX(16px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @keyframes aem-draw {
    to {
      stroke-dashoffset: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .aem-spot--pulse .aem-spot__ring::after,
    .aem--enter .aem-stage,
    .aem--enter .aem-spot,
    .aem--enter .aem-line,
    .aem--enter .aem-card,
    .aem-card-slot--in,
    .aem-card__media img {
      animation: none !important;
      transition: none !important;
      opacity: 1;
      transform: none;
      stroke-dasharray: none;
      stroke-dashoffset: 0;
    }
  }

  @media (max-width: 959px) {
    .aem-desk {
      grid-template-columns: 1fr;
      gap: 0.85rem;
    }

    .aem-spot {
      width: 48px;
      height: 48px;
    }

    .aem-spot__ring {
      width: 30px;
      height: 30px;
    }

    .aem-lines {
      display: none;
    }
  }
`;
function clampPct(value, fallback = 50) {
  const n = toNumber(value, Number.NaN);
  return Number.isFinite(n) ? clamp(n, 0, 100) : fallback;
}
__name(clampPct, "clampPct");
function parseCardSide(raw) {
  const val = getRadioValue(raw, "auto").toLowerCase();
  return val === "right" || val === "left" || val === "auto" ? val : "auto";
}
__name(parseCardSide, "parseCardSide");
function parseAspectRatio(raw) {
  const val = getRadioValue(raw, "3/4").replace(/\s/g, "").replace(":", "/");
  return val === "2/3" || val === "4/5" || val === "1/1" || val === "3/4" ? val : "3/4";
}
__name(parseAspectRatio, "parseAspectRatio");
function parseCraftMethod(raw) {
  const val = getRadioValue(raw, "").toLowerCase();
  return val === "hand" || val === "machine" || val === "both" ? val : "";
}
__name(parseCraftMethod, "parseCraftMethod");
function resolveMethodText(method) {
  return method === "hand" ? { ar: "يدوي", en: "Hand" } : method === "machine" ? { ar: "آلي", en: "Machine" } : method === "both" ? { ar: "يدوي وآلي", en: "Hand & machine" } : { ar: "", en: "" };
}
__name(resolveMethodText, "resolveMethodText");
function parseDetails(raw) {
  return normalizeCollection(raw).map((item, index) => {
    const name = localizedString(item.name).trim(), order = getUnitValue(item.sort_order, index + 1);
    return {
      index,
      sort: order,
      name: name || `Detail ${index + 1}`,
      desc: localizedString(item.desc).trim(),
      image: extractImageUrl(item.image) || String(item.image || "").trim(),
      alt: localizedString(item.alt).trim() || name || `Embroidery detail ${index + 1}`,
      pos_x: clampPct(item.pos_x ?? item.x, 50),
      pos_y: clampPct(item.pos_y ?? item.y, 50),
      card_side: parseCardSide(item.card_side),
      stitch_type: localizedString(item.stitch_type).trim(),
      thread: localizedString(item.thread).trim(),
      method: parseCraftMethod(item.method),
      duration: localizedString(item.duration).trim(),
      extra: localizedString(item.extra).trim(),
      product_url: extractLink(item.product_url),
      btn_text: localizedString(item.btn_text).trim(),
      show_number: isTruthy(item.show_number, !0),
      spot_color: String(item.spot_color || "").trim(),
      is_featured: isTruthy(item.is_featured, !1),
      badge: localizedString(item.badge).trim()
    };
  }).sort((a, b) => a.sort - b.sort || a.index - b.index).map((item, index) => ({
    index,
    name: item.name,
    desc: item.desc,
    image: item.image,
    alt: item.alt,
    pos_x: item.pos_x,
    pos_y: item.pos_y,
    card_side: item.card_side,
    stitch_type: item.stitch_type,
    thread: item.thread,
    method: item.method,
    duration: item.duration,
    extra: item.extra,
    product_url: item.product_url,
    btn_text: item.btn_text,
    show_number: item.show_number,
    spot_color: item.spot_color,
    is_featured: item.is_featured,
    badge: item.badge
  }));
}
__name(parseDetails, "parseDetails");
function resolveSide(detail) {
  return detail.card_side === "left" || detail.card_side === "right" ? detail.card_side : detail.pos_x >= 50 ? "right" : "left";
}
__name(resolveSide, "resolveSide");
function featuredVisualSet(details) {
  const set = /* @__PURE__ */ new Set();
  for (const d of details)
    if (d.is_featured && (set.add(d.index), set.size >= 2))
      break;
  return set;
}
__name(featuredVisualSet, "featuredVisualSet");
function buildLinePath(spot, card, root, side) {
  const sx = spot.left + spot.width / 2 - root.left, sy = spot.top + spot.height / 2 - root.top, cardMidY = card.top + card.height / 2 - root.top, stub = 14;
  let edgeX, elbowX;
  side === "right" ? (edgeX = card.left - root.left, elbowX = edgeX - stub) : (edgeX = card.right - root.left, elbowX = edgeX + stub);
  const midX = (sx + elbowX) / 2;
  return `M ${sx.toFixed(1)} ${sy.toFixed(1)} L ${midX.toFixed(1)} ${sy.toFixed(1)} L ${elbowX.toFixed(1)} ${sy.toFixed(1)} L ${elbowX.toFixed(1)} ${cardMidY.toFixed(1)} L ${edgeX.toFixed(1)} ${cardMidY.toFixed(1)}`;
}
__name(buildLinePath, "buildLinePath");
function computeLines(details, rootEl, getSpot, getCard) {
  const root = rootEl.getBoundingClientRect();
  if (!root.width || !root.height) return [];
  const lines = [];
  for (const d of details)
    try {
      const spotEl = getSpot(d.index), cardEl = getCard(d.index);
      if (!spotEl || !cardEl) continue;
      const spot = spotEl.getBoundingClientRect(), card = cardEl.getBoundingClientRect();
      if (!spot.width || !card.width) continue;
      const side = resolveSide(d);
      lines.push({
        index: d.index,
        d: buildLinePath(spot, card, root, side)
      });
    } catch {
    }
  return lines;
}
__name(computeLines, "computeLines");
function shadowForLevel(level) {
  const shadows = [
    "none",
    "0 10px 28px rgba(43, 33, 28, 0.08)",
    "0 16px 40px rgba(43, 33, 28, 0.12)",
    "0 22px 56px rgba(43, 33, 28, 0.18)"
  ];
  return shadows[clamp(level, 0, 3)] || shadows[1];
}
__name(shadowForLevel, "shadowForLevel");
const _AbayaEmbroideryMap = class _AbayaEmbroideryMap extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.activeIndex = null, this.hoverIndex = null, this.lines = [], this.entered = !1, this.zoomOpen = !1, this.zoomIndex = null, this.useFallbackDialog = !1, this.brokenMain = !1, this.brokenDetail = /* @__PURE__ */ new Set(), this.isDesktop = !0, this.boundLang = () => this.requestUpdate(), this.resizeObs = null, this.io = null, this.mq = null, this.lineRaf = 0, this.enterOnce = !1, this.zoomTrigger = null, this.boundMq = () => this.onMqChange(), this.boundKeydown = (e) => this.onGlobalKey(e);
  }
  connectedCallback() {
    var _a, _b, _c, _d;
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLang), this.mq = window.matchMedia("(min-width: 960px)"), this.isDesktop = this.mq.matches, (_b = (_a = this.mq).addEventListener) == null || _b.call(_a, "change", this.boundMq), (_d = (_c = this.mq).addListener) == null || _d.call(_c, this.boundMq);
  }
  disconnectedCallback() {
    var _a, _b, _c, _d;
    window.removeEventListener("language-changed", this.boundLang), (_b = (_a = this.mq) == null ? void 0 : _a.removeEventListener) == null || _b.call(_a, "change", this.boundMq), (_d = (_c = this.mq) == null ? void 0 : _c.removeListener) == null || _d.call(_c, this.boundMq), this.teardownObservers(), this.unlockPageScroll(), document.removeEventListener("keydown", this.boundKeydown), this.lineRaf && cancelAnimationFrame(this.lineRaf), super.disconnectedCallback();
  }
  firstUpdated() {
    this.setupObservers(), this.scheduleLines();
  }
  updated(changed) {
    changed.has("config") && (this.brokenMain = !1, this.brokenDetail = /* @__PURE__ */ new Set(), this.activeIndex != null && this.activeIndex >= this.details.length && (this.activeIndex = null)), this.style.display = this.mainImage ? "" : "none", this.scheduleLines();
  }
  get details() {
    var _a;
    return parseDetails((_a = this.config) == null ? void 0 : _a.aem_details);
  }
  get mainImage() {
    const c = this.config || {};
    return extractImageUrl(c.aem_image) || String(c.aem_image || "").trim();
  }
  get featuredSet() {
    return featuredVisualSet(this.details);
  }
  get enableLines() {
    var _a;
    return isTruthy((_a = this.config) == null ? void 0 : _a.aem_enable_lines, !0);
  }
  get enablePulse() {
    var _a;
    return isTruthy((_a = this.config) == null ? void 0 : _a.aem_enable_pulse, !0) && !prefersReducedMotion();
  }
  get showNumbers() {
    var _a;
    return isTruthy((_a = this.config) == null ? void 0 : _a.aem_show_numbers, !0);
  }
  get enableDetailImages() {
    var _a;
    return isTruthy((_a = this.config) == null ? void 0 : _a.aem_enable_detail_images, !0);
  }
  get enableZoom() {
    var _a;
    return isTruthy((_a = this.config) == null ? void 0 : _a.aem_enable_zoom, !0);
  }
  get openNewTab() {
    var _a;
    return isTruthy((_a = this.config) == null ? void 0 : _a.aem_open_new_tab, !0);
  }
  teardownObservers() {
    var _a, _b;
    (_a = this.resizeObs) == null || _a.disconnect(), this.resizeObs = null, (_b = this.io) == null || _b.disconnect(), this.io = null;
  }
  setupObservers() {
    this.teardownObservers(), typeof ResizeObserver < "u" && (this.resizeObs = new ResizeObserver(() => this.scheduleLines()), this.deskEl && this.resizeObs.observe(this.deskEl), this.resizeObs.observe(this)), typeof IntersectionObserver < "u" ? (this.io = new IntersectionObserver(
      (entries) => {
        entries.some((e) => e.isIntersecting) && this.triggerEnter();
      },
      { threshold: 0.2 }
    ), this.io.observe(this)) : this.triggerEnter();
  }
  onMqChange() {
    var _a;
    this.isDesktop = !!((_a = this.mq) != null && _a.matches), requestAnimationFrame(() => {
      this.setupObservers(), this.scheduleLines();
    });
  }
  /** Card + connector lines follow click only — hover just highlights the spot. */
  focusIndex() {
    return this.activeIndex;
  }
  triggerEnter() {
    if (this.enterOnce) return;
    if (this.enterOnce = !0, !readSectionTheme(this.config, "aem_").animate || prefersReducedMotion()) {
      this.entered = !1;
      return;
    }
    this.entered = !0, window.setTimeout(() => {
      this.entered = !1;
    }, 900);
  }
  scheduleLines() {
    this.lineRaf && cancelAnimationFrame(this.lineRaf), this.lineRaf = requestAnimationFrame(() => {
      this.lineRaf = 0, this.recalcLines();
    });
  }
  recalcLines() {
    if (!this.isDesktop || !this.enableLines || !this.deskEl) {
      this.lines.length && (this.lines = []);
      return;
    }
    const focus = this.focusIndex(), forLines = focus == null ? [] : this.details.filter((d) => d.index === focus), next = computeLines(
      forLines,
      this.deskEl,
      (i) => this.renderRoot.querySelector(
        `.aem-spot[data-index="${i}"]`
      ),
      (i) => this.renderRoot.querySelector(
        `.aem-desk .aem-card[data-index="${i}"]`
      )
    );
    this.lines = next;
  }
  setHover(index) {
    this.hoverIndex !== index && (this.hoverIndex = index);
  }
  setActive(index) {
    if (this.activeIndex === index) {
      this.scheduleLines();
      return;
    }
    this.activeIndex = index, this.scheduleLines();
  }
  toggleActive(index) {
    this.setActive(this.activeIndex === index ? null : index);
  }
  clearActive() {
    this.setActive(null), this.hoverIndex = null;
  }
  onSpotKeydown(e, index) {
    const len = this.details.length;
    if (!len) return;
    let next = index;
    if (e.key === "ArrowRight" || e.key === "ArrowDown")
      e.preventDefault(), next = (index + 1) % len;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp")
      e.preventDefault(), next = (index - 1 + len) % len;
    else if (e.key === "Home")
      e.preventDefault(), next = 0;
    else if (e.key === "End")
      e.preventDefault(), next = len - 1;
    else
      return;
    this.setActive(next);
    const btn = this.renderRoot.querySelector(
      `.aem-spot[data-index="${next}"]`
    );
    btn == null || btn.focus();
  }
  openZoom(index, trigger) {
    if (!this.enableZoom) return;
    const d = this.details[index];
    !(d != null && d.image) || this.brokenDetail.has(index) || (this.zoomTrigger = trigger instanceof HTMLElement ? trigger : null, this.zoomIndex = index, this.zoomOpen = !0, this.lockPageScroll(), document.addEventListener("keydown", this.boundKeydown), requestAnimationFrame(() => {
      const dialog = this.dialogEl;
      dialog && typeof dialog.showModal == "function" ? (this.useFallbackDialog = !1, dialog.open || dialog.showModal()) : this.useFallbackDialog = !0;
    }));
  }
  closeZoom() {
    var _a, _b;
    const dialog = this.dialogEl;
    dialog != null && dialog.open && dialog.close(), this.zoomOpen = !1, this.useFallbackDialog = !1, this.zoomIndex = null, this.unlockPageScroll(), document.removeEventListener("keydown", this.boundKeydown), (_b = (_a = this.zoomTrigger) == null ? void 0 : _a.focus) == null || _b.call(_a), this.zoomTrigger = null;
  }
  onGlobalKey(e) {
    e.key === "Escape" && this.zoomOpen && (e.preventDefault(), this.closeZoom());
  }
  lockPageScroll() {
    document.documentElement.style.overflow = "hidden";
  }
  unlockPageScroll() {
    document.documentElement.style.overflow = "";
  }
  markBrokenDetail(index) {
    const next = new Set(this.brokenDetail);
    next.add(index), this.brokenDetail = next;
  }
  designVars() {
    const c = this.config || {}, theme = readSectionTheme(c, "aem_"), shadowLevel = Math.max(0, Math.min(3, getUnitValue(c.aem_shadow, 1)));
    return {
      ...themeStyleMap(theme),
      "--aem-stage-bg": String(c.aem_stage_bg || "#f3ece7"),
      "--aem-spot-color": String(c.aem_spot_color || theme.accent),
      "--aem-line-color": String(c.aem_line_color || "#c4a99a"),
      "--aem-active": String(c.aem_active_color || theme.accent),
      "--aem-card-border": String(c.aem_card_border || theme.border),
      "--aem-shadow": shadowForLevel(shadowLevel),
      "--aem-aspect": parseAspectRatio(c.aem_aspect).replace("/", " / "),
      "--aem-max-width": `${getUnitValue(c.aem_max_width, 420)}px`
    };
  }
  highlightIndex() {
    return this.hoverIndex ?? this.activeIndex;
  }
  renderSpot(d) {
    const hi = this.highlightIndex(), featured = this.featuredSet.has(d.index), showNum = this.showNumbers && d.show_number, color = d.spot_color || void 0;
    return html`
      <button
        type="button"
        class=${classMap({
      "aem-spot": !0,
      "aem-spot--pulse": this.enablePulse,
      "aem-spot--active": this.activeIndex === d.index,
      "aem-spot--hover": this.hoverIndex === d.index,
      "aem-spot--featured": featured
    })}
        style=${styleMap({
      left: `${d.pos_x}%`,
      top: `${d.pos_y}%`,
      ...color ? { color } : {},
      ...this.entered ? { animationDelay: `${80 + d.index * 55}ms` } : {}
    })}
        data-index=${d.index}
        aria-label=${d.name}
        aria-pressed=${this.activeIndex === d.index ? "true" : "false"}
        @pointerenter=${() => this.setHover(d.index)}
        @pointerleave=${() => this.setHover(null)}
        @focus=${() => this.setHover(d.index)}
        @blur=${(e) => {
      const next = e.relatedTarget;
      next && this.renderRoot.contains(next) || this.setHover(null);
    }}
        @click=${() => this.toggleActive(d.index)}
        @keydown=${(e) => this.onSpotKeydown(e, d.index)}
      >
        <span class="aem-spot__ring">
          ${showNum ? html`<span class="aem-spot__num">${d.index + 1}</span>` : html`<span class="aem-spot__core" aria-hidden="true"></span>`}
        </span>
        <span
          class=${classMap({
      "aem-spot__tip": !0,
      "aem-spot__tip--show": hi === d.index
    })}
          >${d.name}</span
        >
      </button>
    `;
  }
  renderCard(d) {
    const featured = this.featuredSet.has(d.index), showImg = this.enableDetailImages && d.image && !this.brokenDetail.has(d.index), method = resolveMethodText(d.method), methodText = method.ar ? t(method.ar, method.en) : "", btnText = d.btn_text || t("عرض المنتج", "View product"), link = isValidHref(d.product_url) ? d.product_url : "";
    return html`
      <article
        class=${classMap({
      "aem-card": !0,
      "aem-card--active": this.activeIndex === d.index,
      "aem-card--hover": this.hoverIndex === d.index,
      "aem-card--featured": featured
    })}
        data-index=${d.index}
        tabindex="0"
        role="button"
        aria-pressed=${this.activeIndex === d.index ? "true" : "false"}
        @pointerenter=${() => this.setHover(d.index)}
        @pointerleave=${() => this.setHover(null)}
        @focus=${() => this.setHover(d.index)}
        @blur=${(e) => {
      const next = e.relatedTarget;
      next && this.renderRoot.contains(next) || this.setHover(null);
    }}
        @click=${(e) => {
      e.target.closest("a, .aem-card__zoom") || this.toggleActive(d.index);
    }}
        @keydown=${(e) => {
      (e.key === "Enter" || e.key === " ") && (e.preventDefault(), this.toggleActive(d.index));
    }}
      >
        ${featured && d.badge ? html`<span class="aem-badge">${d.badge}</span>` : nothing}
        ${showImg ? html`<div class="aem-card__media">
              <img
                src=${d.image}
                alt=${d.alt || d.name}
                loading="lazy"
                decoding="async"
                @error=${() => this.markBrokenDetail(d.index)}
              />
              ${this.enableZoom ? html`<button
                    type="button"
                    class="aem-card__zoom"
                    aria-label=${t("تكبير التفصيلة", "Zoom detail")}
                    @click=${(e) => {
      e.stopPropagation(), this.openZoom(d.index, e.currentTarget);
    }}
                  ></button>` : nothing}
            </div>` : nothing}
        <h3 class="aem-card__title">${d.name}</h3>
        ${d.desc ? html`<p class="aem-card__desc">${d.desc}</p>` : nothing}
        ${d.stitch_type || d.thread || methodText || d.duration || d.extra ? html`<div class="aem-meta">
              ${d.stitch_type ? html`<div>
                    <strong>${t("التطريز", "Stitch")}:</strong> ${d.stitch_type}
                  </div>` : nothing}
              ${d.thread ? html`<div>
                    <strong>${t("الخيط / الخامة", "Thread / material")}:</strong>
                    ${d.thread}
                  </div>` : nothing}
              ${methodText ? html`<div>
                    <strong>${t("التنفيذ", "Method")}:</strong> ${methodText}
                  </div>` : nothing}
              ${d.duration ? html`<div>
                    <strong>${t("المدة", "Duration")}:</strong> ${d.duration}
                  </div>` : nothing}
              ${d.extra ? html`<div>${d.extra}</div>` : nothing}
            </div>` : nothing}
        ${link ? html`<a
              class="fs-btn aem-card__link"
              href=${link}
              target=${ifDefined(this.openNewTab ? "_blank" : void 0)}
              rel=${ifDefined(this.openNewTab ? "noopener noreferrer" : void 0)}
              @click=${(e) => e.stopPropagation()}
              >${btnText}</a
            >` : nothing}
      </article>
    `;
  }
  renderLines() {
    return !this.isDesktop || !this.enableLines || !this.lines.length ? nothing : (this.highlightIndex(), html`
      <svg class="aem-lines" aria-hidden="true" focusable="false">
        ${this.lines.map(
      (line) => html`<path
            class=${classMap({
        "aem-line": !0,
        "aem-line--active": this.activeIndex === line.index,
        "aem-line--hover": this.hoverIndex === line.index
      })}
            d=${line.d}
            style=${this.entered ? styleMap({
        animationDelay: `${350 + line.index * 40}ms`
      }) : nothing}
          />`
    )}
      </svg>
    `);
  }
  renderStage() {
    const c = this.config || {}, alt = localizedString(c.aem_image_alt).trim() || t("عباية", "Abaya");
    return html`
      <div class="aem-stage-wrap">
        <div class="aem-stage">
          <div class="aem-stage__ornament" aria-hidden="true"></div>
          <div class="aem-stage__img-wrap">
            ${this.brokenMain ? nothing : html`<img
                  class="aem-stage__img"
                  src=${this.mainImage}
                  alt=${alt}
                  decoding="async"
                  @error=${() => {
      this.brokenMain = !0;
    }}
                />`}
          </div>
          <div class="aem-spots">
            ${this.details.map((d) => this.renderSpot(d))}
          </div>
        </div>
      </div>
    `;
  }
  renderColSlot(side, detail) {
    const show = detail && resolveSide(detail) === side;
    return html`
      <div class="aem-col aem-col--${side}">
        ${show && detail ? html`<div class="aem-card-slot aem-card-slot--in">
              ${this.renderCard(detail)}
            </div>` : html`<div class="aem-col__placeholder" aria-hidden="true"></div>`}
      </div>
    `;
  }
  renderDesktop() {
    var _a;
    const focus = this.focusIndex(), detail = focus != null && this.details[focus] || null, hi = this.highlightIndex();
    return html`
      <div
        class=${classMap({
      "aem-desk": !0,
      "aem-desk--dim": hi != null,
      "aem-desk--compact": getRadioValue((_a = this.config) == null ? void 0 : _a.aem_layout, "map") === "compact",
      "aem-desk--focus": detail != null
    })}
      >
        ${this.renderColSlot("left", detail)}
        <div class="aem-stage-stack">
          ${this.renderStage()}
          <p
            class=${classMap({
      "aem-pick-hint": !0,
      "aem-pick-hint--hidden": detail != null
    })}
            aria-live="polite"
            aria-hidden=${detail != null ? "true" : "false"}
          >
            ${t(
      "اضغطي على رقم التفصيلة لعرض تفاصيلها",
      "Tap a detail number to view it"
    )}
          </p>
        </div>
        ${this.renderColSlot("right", detail)}
        ${detail ? this.renderLines() : nothing}
      </div>
    `;
  }
  renderMobile() {
    const active = this.activeIndex != null ? this.details[this.activeIndex] : null, showNav = this.details.length > 1;
    return html`
      <div class="aem-mobile">
        ${this.renderStage()}
        <div class="aem-mobile__live" aria-live="polite">
          ${active ? active.name : t(
      "اضغطي على رقم التفصيلة",
      "Tap a detail number"
    )}
        </div>
        ${active ? html`<div class="aem-mobile__card aem-card-slot aem-card-slot--in">
              ${this.renderCard(active)}
            </div>` : html`<p class="aem-pick-hint">
              ${t(
      "اختاري تفصيلة من الأرقام على الصورة",
      "Choose a detail from the numbers on the image"
    )}
            </p>`}
        ${showNav && active ? html`<div class="aem-nav">
              <button
                type="button"
                aria-label=${t("السابق", "Previous")}
                ?disabled=${active.index <= 0}
                @click=${() => this.setActive(Math.max(0, active.index - 1))}
              >
                ‹
              </button>
              <button
                type="button"
                aria-label=${t("التالي", "Next")}
                ?disabled=${active.index >= this.details.length - 1}
                @click=${() => this.setActive(
      Math.min(this.details.length - 1, active.index + 1)
    )}
              >
                ›
              </button>
            </div>` : nothing}
      </div>
    `;
  }
  renderZoom() {
    if (!this.zoomOpen || this.zoomIndex == null) return nothing;
    const d = this.details[this.zoomIndex];
    if (!d) return nothing;
    const method = resolveMethodText(d.method), methodText = method.ar ? t(method.ar, method.en) : "", link = isValidHref(d.product_url) ? d.product_url : "", btnText = d.btn_text || t("عرض المنتج", "View product"), inner = html`
      <div class="aem-dialog__inner">
        <button
          type="button"
          class="aem-dialog__close"
          aria-label=${t("إغلاق", "Close")}
          @click=${() => this.closeZoom()}
        >
          ✕
        </button>
        <img class="aem-dialog__img" src=${d.image} alt=${d.alt || d.name} />
        <h3 class="aem-dialog__title">${d.name}</h3>
        ${d.desc ? html`<p class="aem-dialog__desc">${d.desc}</p>` : nothing}
        ${d.stitch_type || methodText ? html`<div class="aem-meta">
              ${d.stitch_type ? html`<div>
                    <strong>${t("التطريز", "Stitch")}:</strong> ${d.stitch_type}
                  </div>` : nothing}
              ${methodText ? html`<div>
                    <strong>${t("التنفيذ", "Method")}:</strong> ${methodText}
                  </div>` : nothing}
            </div>` : nothing}
        ${link ? html`<a
              class="fs-btn"
              href=${link}
              target=${ifDefined(this.openNewTab ? "_blank" : void 0)}
              rel=${ifDefined(this.openNewTab ? "noopener noreferrer" : void 0)}
              >${btnText}</a
            >` : nothing}
      </div>
    `;
    return this.useFallbackDialog ? html`<div
        class="aem-fs-fallback"
        @click=${(e) => {
      e.target === e.currentTarget && this.closeZoom();
    }}
      >
        ${inner}
      </div>` : html`<dialog
      class="aem-dialog"
      @click=${(e) => {
      e.target === this.dialogEl && this.closeZoom();
    }}
      @close=${() => {
      this.zoomOpen && this.closeZoom();
    }}
    >
      ${inner}
    </dialog>`;
  }
  render() {
    if (!this.mainImage) return nothing;
    const c = this.config || {}, animate = readSectionTheme(c, "aem_").animate && !prefersReducedMotion(), full = isTruthy(c.aem_full_width, !1), showTitle = isTruthy(c.aem_show_title, !0), showDesc = isTruthy(c.aem_show_desc, !0), showBtn = isTruthy(c.aem_show_btn, !0), title = showTitle ? localizedString(c.aem_title).trim() : "", desc = showDesc ? localizedString(c.aem_desc).trim() : "", mainUrl = extractLink(c.aem_product_url), mainBtn = localizedString(c.aem_btn_text).trim() || t("عرض العباية", "View abaya"), showMainBtn = showBtn && isValidHref(mainUrl);
    return html`
      <section
        class=${classMap({
      "fs-section": !0,
      "fs-section--full": full,
      "fs-animate": animate,
      "aem--enter": this.entered
    })}
        style=${styleMap(this.designVars())}
        aria-label=${title || t("خريطة تطريز العباية", "Abaya embroidery map")}
      >
        <div class="fs-container">
          ${title || desc ? html`<header class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </header>` : nothing}

          <div class="aem-shell">
            ${this.isDesktop ? this.renderDesktop() : this.renderMobile()}
            ${this.activeIndex != null ? html`<div class="aem-clear-wrap">
                  <button
                    type="button"
                    class="aem-clear"
                    @click=${() => this.clearActive()}
                  >
                    ${t("مسح التحديد", "Clear selection")}
                  </button>
                </div>` : nothing}
            ${showMainBtn ? html`<div class="aem-cta">
                  <a
                    class="fs-btn"
                    href=${mainUrl}
                    target=${ifDefined(this.openNewTab ? "_blank" : void 0)}
                    rel=${ifDefined(
      this.openNewTab ? "noopener noreferrer" : void 0
    )}
                    >${mainBtn}</a
                  >
                </div>` : nothing}
          </div>
        </div>
        ${this.renderZoom()}
        ${renderCommerceOutcome(this.config || {}, "aem_")}
      </section>
    `;
  }
};
__name(_AbayaEmbroideryMap, "AbayaEmbroideryMap"), _AbayaEmbroideryMap.styles = [
  sharedSectionCss,
  componentStyles,
  css`
      :host {
        direction: inherit;
      }
    `
];
let AbayaEmbroideryMap = _AbayaEmbroideryMap;
__decorateClass([
  property({ type: Object })
], AbayaEmbroideryMap.prototype, "config");
__decorateClass([
  state()
], AbayaEmbroideryMap.prototype, "activeIndex");
__decorateClass([
  state()
], AbayaEmbroideryMap.prototype, "hoverIndex");
__decorateClass([
  state()
], AbayaEmbroideryMap.prototype, "lines");
__decorateClass([
  state()
], AbayaEmbroideryMap.prototype, "entered");
__decorateClass([
  state()
], AbayaEmbroideryMap.prototype, "zoomOpen");
__decorateClass([
  state()
], AbayaEmbroideryMap.prototype, "zoomIndex");
__decorateClass([
  state()
], AbayaEmbroideryMap.prototype, "useFallbackDialog");
__decorateClass([
  state()
], AbayaEmbroideryMap.prototype, "brokenMain");
__decorateClass([
  state()
], AbayaEmbroideryMap.prototype, "brokenDetail");
__decorateClass([
  state()
], AbayaEmbroideryMap.prototype, "isDesktop");
__decorateClass([
  query(".aem-desk")
], AbayaEmbroideryMap.prototype, "deskEl");
__decorateClass([
  query("dialog.aem-dialog")
], AbayaEmbroideryMap.prototype, "dialogEl");
typeof AbayaEmbroideryMap < "u" && AbayaEmbroideryMap.registerSallaComponent("salla-abaya-embroidery-map");
export {
  AbayaEmbroideryMap as default
};
