var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, nothing, html } from "lit";
import { property, state, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
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
  return ((_b = typeof document < "u" ? (_a = document.documentElement.lang) == null ? void 0 : _a.split(/[-_]/)[0] : "ar") == null ? void 0 : _b.toLowerCase()) === "en" ? en : fallbackAr || ar;
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
  .als-shell {
    display: grid;
    gap: 1.5rem;
  }

  @media (min-width: 960px) {
    .als-shell {
      grid-template-columns: minmax(0, 1.35fr) minmax(280px, 0.75fr);
      align-items: start;
      gap: 2rem;
    }
  }

  .als-viewer {
    display: grid;
    gap: 0.9rem;
    min-width: 0;
  }

  .als-stage-wrap {
    position: relative;
    width: 100%;
    max-width: var(--als-max-width, 720px);
    margin-inline: auto;
  }

  .als-stage {
    position: relative;
    width: 100%;
    aspect-ratio: var(--als-aspect, 3 / 4);
    max-height: min(40rem, 76vh);
    overflow: hidden;
    border-radius: var(--section-radius, 16px);
    border: 1px solid var(--border-color, #e5e7eb);
    background: var(--als-stage-bg, #1a1614);
    box-shadow: var(--als-shadow, 0 12px 36px color-mix(in srgb, var(--text-color, #000) 12%, transparent));
    touch-action: pan-y;
    user-select: none;
    cursor: crosshair;
  }

  .als-stage--panning {
    cursor: grab;
    touch-action: none;
  }

  .als-stage--panning.als-stage--dragging {
    cursor: grabbing;
  }

  .als-stage__img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
    transform-origin: center center;
    transition: opacity 0.28s ease;
    will-change: transform;
  }

  .als-stage__img--fade {
    opacity: 0.35;
  }

  .als-lens {
    position: absolute;
    z-index: 4;
    width: 9rem;
    height: 9rem;
    border-radius: 50%;
    border: 2px solid color-mix(in srgb, #fff 80%, transparent);
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.35);
    pointer-events: none;
    background-repeat: no-repeat;
    display: none;
  }

  .als-lens--on {
    display: block;
  }

  .als-caption {
    display: grid;
    gap: 0.75rem;
    padding: 0.85rem 1rem;
    border-radius: calc(var(--section-radius, 16px) * 0.75);
    border: 1px solid var(--border-color, #e5e7eb);
    background: color-mix(in srgb, var(--card-bg, #ffffff) 92%, var(--section-bg, var(--fs-surface, #f3f4f6)));
  }

  @media (min-width: 640px) {
    .als-caption {
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: center;
      gap: 1rem;
    }
  }

  .als-caption__text {
    min-width: 0;
  }

  .als-caption__name {
    margin: 0 0 0.2rem;
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--text-color, #000000);
    line-height: 1.35;
  }

  .als-caption__desc {
    margin: 0;
    font-size: 0.86rem;
    line-height: 1.6;
    color: var(--muted-color, #666666);
  }

  .als-tools {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    align-items: center;
    justify-content: flex-end;
  }

  .als-tools__group {
    display: inline-flex;
    gap: 0.3rem;
    padding: 0.2rem;
    border-radius: calc(var(--section-radius, 16px) * 0.45);
    background: color-mix(in srgb, var(--border-color, #e5e7eb) 35%, transparent);
  }

  .als-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    min-width: 44px;
    min-height: 44px;
    padding: 0.45rem 0.95rem;
    border: 1.5px solid var(--border-color, #e5e7eb);
    border-radius: 999px;
    background: var(--card-bg, #ffffff);
    color: var(--text-color, #000000);
    font: inherit;
    font-size: 0.9rem;
    font-weight: 700;
    line-height: 1.2;
    cursor: pointer;
    text-decoration: none;
    transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease, filter 0.2s ease, box-shadow 0.2s ease;
  }

  .als-btn:hover {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, var(--border-color, #e5e7eb));
    transform: translateY(-1px);
  }

  .als-btn:focus-visible {
    outline: 2px solid var(--accent-color, var(--fs-store-primary));
    outline-offset: 2px;
  }

  .als-btn--primary {
    background: var(--button-bg, var(--fs-store-primary));
    color: var(--button-color, #fff);
    border-color: transparent;
    box-shadow: 0 6px 16px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 24%, transparent);
  }

  .als-btn--accent {
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, #fff);
    color: var(--accent-color, var(--fs-store-primary));
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 35%, var(--border-color, #e5e7eb));
  }

  .als-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .als-panel {
    display: grid;
    gap: 1.15rem;
    padding: 1.2rem 1.1rem 1.3rem;
    border-radius: var(--section-radius, 16px);
    border: 1px solid var(--border-color, #e5e7eb);
    background: var(--als-panel-bg, var(--card-bg, #ffffff));
    box-shadow: 0 8px 24px rgba(43, 33, 28, 0.04);
    min-width: 0;
  }

  .als-block {
    display: grid;
    gap: 0.7rem;
  }

  .als-block__title {
    margin: 0;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--muted-color, #666666);
  }

  .als-modes {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(5.75rem, 1fr));
    gap: 0.6rem;
  }

  .als-mode {
    display: grid;
    gap: 0.4rem;
    justify-items: center;
    padding: 0.4rem;
    border: 1px solid var(--als-thumb-border, var(--border-color, #e5e7eb));
    border-radius: calc(var(--section-radius, 16px) * 0.45);
    background: color-mix(in srgb, var(--section-bg, var(--fs-surface, #f3f4f6)) 65%, #fff);
    color: inherit;
    font: inherit;
    cursor: pointer;
    text-align: center;
    min-height: 44px;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
  }

  .als-mode:hover {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 40%, var(--border-color, #e5e7eb));
  }

  .als-mode--active,
  .als-mode[aria-pressed='true'] {
    border-color: var(--accent-color, var(--fs-store-primary));
    box-shadow: 0 0 0 1px var(--accent-color, var(--fs-store-primary));
    background: var(--fs-surface, var(--card-bg, #f0f0f0));
  }

  .als-mode__thumb {
    width: 100%;
    aspect-ratio: 3 / 4;
    object-fit: cover;
    border-radius: calc(var(--section-radius, 16px) * 0.32);
    display: block;
    background: #ddd;
  }

  .als-mode__name {
    font-size: 0.72rem;
    font-weight: 700;
    line-height: 1.3;
    color: var(--text-color, #000000);
  }

  .als-info {
    display: grid;
    gap: 1rem;
  }

  .als-info__meta {
    display: grid;
    gap: 0.75rem;
  }

  .als-info__label {
    display: block;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--muted-color, #666666);
    margin-bottom: 0.2rem;
  }

  .als-info__value {
    margin: 0;
    font-size: 0.92rem;
    font-weight: 600;
    color: var(--text-color, #000000);
    line-height: 1.6;
  }

  .als-info__cta {
    width: 100%;
    justify-content: center;
  }

  .als-metrics {
    display: grid;
    gap: 0.7rem;
  }

  .als-metric__head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 0.5rem;
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 0.3rem;
    color: var(--text-color, #000000);
  }

  .als-metric__val {
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  .als-metric__bar {
    height: 0.35rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #e5e7eb) 80%, transparent);
    overflow: hidden;
  }

  .als-metric__bar > span {
    display: block;
    height: 100%;
    width: 0;
    background: linear-gradient(
      90deg,
      color-mix(in srgb, var(--als-meter-color, var(--accent-color, var(--fs-store-primary))) 75%, #fff),
      var(--als-meter-color, var(--accent-color, var(--fs-store-primary)))
    );
    border-radius: inherit;
    transition: width 0.45s ease;
  }

  .als-metric__level {
    margin-inline-start: 0.35rem;
    color: var(--muted-color, #666666);
    font-weight: 500;
    font-size: 0.72rem;
  }

  .als-panel .fs-btn {
    width: 100%;
    justify-content: center;
  }

  .als-accordion {
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: calc(var(--section-radius, 16px) * 0.5);
    overflow: hidden;
  }

  .als-accordion__trigger {
    width: 100%;
    min-height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.75rem 0.95rem;
    border: none;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 7%, var(--card-bg, #ffffff));
    color: var(--text-color, #000000);
    font: inherit;
    font-weight: 700;
    font-size: 0.9rem;
    cursor: pointer;
    text-align: start;
  }

  .als-accordion__body {
    padding: 0.85rem 0.95rem 1rem;
    display: grid;
    gap: 0.75rem;
    border-top: 1px solid var(--border-color, #e5e7eb);
  }

  .als-compare-bar {
    display: grid;
    gap: 0.65rem;
  }

  @media (min-width: 640px) {
    .als-compare-bar {
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: end;
      gap: 0.75rem;
    }
  }

  .als-compare-pick {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.6rem;
  }

  .als-compare-pick label {
    display: grid;
    gap: 0.35rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--muted-color, #666666);
  }

  .als-compare-pick select {
    min-height: 44px;
    padding: 0.5rem 0.7rem;
    border-radius: calc(var(--section-radius, 16px) * 0.4);
    border: 1px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #ffffff);
    color: var(--text-color, #000000);
    font: inherit;
    font-weight: 600;
  }

  .als-compare {
    position: relative;
    width: 100%;
    aspect-ratio: var(--als-aspect, 3 / 4);
    max-height: min(40rem, 76vh);
    overflow: hidden;
    border-radius: var(--section-radius, 16px);
    border: 1px solid var(--border-color, #e5e7eb);
    background: #111;
    touch-action: none;
    user-select: none;
    -webkit-user-select: none;
    cursor: col-resize;
    direction: ltr;
    box-shadow: var(--als-shadow, 0 12px 36px color-mix(in srgb, var(--text-color, #000) 12%, transparent));
  }

  .als-compare--dragging {
    cursor: grabbing;
  }

  .als-compare__layer {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    pointer-events: none;
    -webkit-user-drag: none;
  }

  .als-compare__top {
    clip-path: inset(0 calc(100% - var(--als-compare, 50%)) 0 0);
  }

  .als-compare__label {
    position: absolute;
    top: 0.75rem;
    z-index: 3;
    padding: 0.35rem 0.65rem;
    border-radius: 999px;
    background: color-mix(in srgb, #000 52%, transparent);
    color: #fff;
    font-size: 0.72rem;
    font-weight: 700;
    pointer-events: none;
    backdrop-filter: blur(4px);
  }

  .als-compare__label--a {
    left: 0.75rem;
  }

  .als-compare__label--b {
    right: 0.75rem;
  }

  .als-compare__handle {
    position: absolute;
    top: 0;
    bottom: 0;
    left: var(--als-compare, 50%);
    width: 2px;
    transform: translateX(-50%);
    background: var(--als-handle-color, #fff);
    z-index: 4;
    pointer-events: none;
  }

  .als-compare__hit {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 48px;
    transform: translateX(-50%);
    pointer-events: none;
  }

  .als-compare__knob {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2.75rem;
    height: 2.75rem;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    border: 2px solid #fff;
    background: var(--als-handle-color, var(--accent-color, var(--fs-store-primary)));
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
    pointer-events: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .als-stage__img,
    .als-metric__bar > span,
    .als-mode {
      transition: none;
    }
  }

  @media (max-width: 959px) {
    .als-shell {
      grid-template-columns: 1fr;
      gap: 1.15rem;
    }

    .als-stage,
    .als-compare {
      max-height: min(26rem, 58vh);
    }

    .als-modes {
      display: flex;
      flex-wrap: nowrap;
      max-width: 100%;
      min-width: 0;
      overflow-x: auto;
      gap: 0.55rem;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior-x: contain;
      padding-bottom: 0.25rem;
      scroll-snap-type: x proximity;
    }

    .als-mode {
      flex: 0 0 5.5rem;
      scroll-snap-align: start;
    }

    .als-caption {
      padding: 0.8rem 0.85rem;
    }

    .als-tools {
      justify-content: stretch;
    }

    .als-tools__group {
      flex: 1;
      justify-content: space-between;
    }

    .als-btn {
      flex: 1;
      min-width: 0;
    }

    .als-lens {
      display: none !important;
    }

    .als-desktop-only {
      display: none !important;
    }

    .als-panel {
      padding: 1rem 0.9rem 1.1rem;
    }
  }

  @media (min-width: 960px) {
    .als-mobile-only {
      display: none !important;
    }
  }
`, ZOOM_LEVELS = [1.5, 2, 2.5, 3];
function parseAspectRatio(raw) {
  const val = getRadioValue(raw, "3/4").replace(/\s/g, "");
  return val === "1/1" || val === "4/5" || val === "16/9" || val === "3/4" ? val : "3/4";
}
__name(parseAspectRatio, "parseAspectRatio");
function parseZoomLevel(raw) {
  const n = toNumber(getRadioValue(raw, "2") || raw, 2);
  return ZOOM_LEVELS.includes(n) ? n : 2;
}
__name(parseZoomLevel, "parseZoomLevel");
function clampPct(n) {
  return Math.max(0, Math.min(100, n));
}
__name(clampPct, "clampPct");
function parseLightModes(raw) {
  return normalizeCollection(raw).map((item, index) => {
    const image = extractImageUrl(item.image) || String(item.image || "").trim(), thumb = extractImageUrl(item.thumb) || extractImageUrl(item.thumbnail) || image, name = localizedString(item.name).trim();
    return {
      index,
      name: name || `Mode ${index + 1}`,
      desc: localizedString(item.desc).trim(),
      image,
      thumb,
      alt: localizedString(item.alt).trim() || name || `Lighting mode ${index + 1}`,
      is_default: isTruthy(item.is_default, !1),
      shine: clampPct(getUnitValue(item.shine, 50)),
      embroidery: clampPct(getUnitValue(item.embroidery, 50)),
      color_depth: clampPct(getUnitValue(item.color_depth, 50)),
      flow: clampPct(getUnitValue(item.flow, 50)),
      transparency: clampPct(getUnitValue(item.transparency, 20)),
      day_fit: clampPct(getUnitValue(item.day_fit, 50)),
      night_fit: clampPct(getUnitValue(item.night_fit, 50)),
      color_name: localizedString(item.color_name).trim(),
      notes: localizedString(item.notes).trim(),
      product_url: extractLink(item.product_url),
      btn_text: localizedString(item.btn_text).trim()
    };
  }).filter((m) => !!m.image);
}
__name(parseLightModes, "parseLightModes");
function resolveDefaultIndex(modes) {
  if (!modes.length) return 0;
  const flagged = modes.find((m) => m.is_default);
  return flagged ? flagged.index : modes[0].index;
}
__name(resolveDefaultIndex, "resolveDefaultIndex");
function metricsForMode(mode) {
  return [
    { key: "shine", labelAr: "اللمعان", labelEn: "Shine", value: mode.shine },
    {
      key: "embroidery",
      labelAr: "وضوح التطريز",
      labelEn: "Embroidery clarity",
      value: mode.embroidery
    },
    {
      key: "color_depth",
      labelAr: "عمق اللون",
      labelEn: "Color depth",
      value: mode.color_depth
    },
    { key: "flow", labelAr: "الانسيابية", labelEn: "Flow", value: mode.flow },
    {
      key: "transparency",
      labelAr: "الشفافية",
      labelEn: "Transparency",
      value: mode.transparency
    },
    {
      key: "day_fit",
      labelAr: "ملاءمة النهار",
      labelEn: "Day suitability",
      value: mode.day_fit
    },
    {
      key: "night_fit",
      labelAr: "ملاءمة المساء",
      labelEn: "Evening suitability",
      value: mode.night_fit
    }
  ];
}
__name(metricsForMode, "metricsForMode");
function levelLabel(value) {
  return value < 34 ? { ar: "منخفض", en: "Low" } : value < 67 ? { ar: "متوسط", en: "Medium" } : { ar: "مرتفع", en: "High" };
}
__name(levelLabel, "levelLabel");
async function loadImageDecoded(src) {
  return src ? new Promise((resolve) => {
    const img = new Image();
    img.decoding = "async", img.onload = () => {
      typeof img.decode == "function" ? img.decode().then(() => resolve(!0)).catch(() => resolve(!0)) : resolve(!0);
    }, img.onerror = () => resolve(!1), img.src = src;
  }) : !1;
}
__name(loadImageDecoded, "loadImageDecoded");
function clampPan(value, scale, containerSize, imageSize) {
  if (scale <= 1) return 0;
  const max = (imageSize * scale - containerSize) / 2;
  return Math.max(-max, Math.min(max, value));
}
__name(clampPan, "clampPan");
function nextModeIndex(modes, currentIndex, delta) {
  if (modes.length < 2) return currentIndex;
  const positions = modes.map((m) => m.index), next = (positions.indexOf(currentIndex) + delta + positions.length) % positions.length;
  return positions[next];
}
__name(nextModeIndex, "nextModeIndex");
function bindSallaRegistration(ctor) {
  ctor.registerSallaComponent = /* @__PURE__ */ __name(function(tagName) {
    if (typeof window > "u") return;
    const attempt = /* @__PURE__ */ __name(() => {
      var _a, _b;
      const bundles = (_a = window.Salla) == null ? void 0 : _a.bundles;
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
const _AbayaLightStudio = class _AbayaLightStudio extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.activeIndex = 0, this.displaySrc = "", this.fading = !1, this.zoom = 1, this.panX = 0, this.panY = 0, this.lensOn = !1, this.lensStyle = {}, this.compareOn = !1, this.compareA = 0, this.compareB = 1, this.comparePct = 50, this.notesOpen = !1, this.panning = !1, this.loadToken = 0, this.boundLang = () => this.requestUpdate(), this.pointerId = null, this.panStartX = 0, this.panStartY = 0, this.panOriginX = 0, this.panOriginY = 0, this.compareDragging = !1, this.isCoarse = !1, this.prefetchCache = /* @__PURE__ */ new Set(), this.onPanMove = (e) => {
      if (!this.panning || e.pointerId !== this.pointerId) return;
      const stage = this.stageEl;
      if (!stage) return;
      const rect = stage.getBoundingClientRect(), dx = e.clientX - this.panStartX, dy = e.clientY - this.panStartY;
      this.panX = clampPan(
        this.panOriginX + dx,
        this.zoom,
        rect.width,
        rect.width
      ), this.panY = clampPan(
        this.panOriginY + dy,
        this.zoom,
        rect.height,
        rect.height
      );
    }, this.onPanUp = (e) => {
      e.pointerId === this.pointerId && (this.panning = !1, this.pointerId = null, this.teardownPointers());
    }, this.onCompareMove = (e) => {
      !this.compareDragging || e.pointerId !== this.pointerId || (e.preventDefault(), this.updateCompareFromClientX(e.clientX));
    }, this.onCompareUp = (e) => {
      var _a;
      if (this.pointerId != null && e.pointerId !== this.pointerId) return;
      this.compareDragging = !1;
      const el = this.compareEl;
      if (this.pointerId != null)
        try {
          (_a = el == null ? void 0 : el.releasePointerCapture) == null || _a.call(el, this.pointerId);
        } catch {
        }
      this.pointerId = null, el == null || el.removeEventListener("pointermove", this.onCompareMove), el == null || el.removeEventListener("pointerup", this.onCompareUp), el == null || el.removeEventListener("pointercancel", this.onCompareUp), this.teardownPointers();
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLang), this.isCoarse = typeof window < "u" && window.matchMedia("(pointer: coarse)").matches, this.resetFromConfig();
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLang), this.teardownPointers(), super.disconnectedCallback();
  }
  updated(changed) {
    changed.has("config") && this.resetFromConfig(), this.style.display = this.modes.length ? "" : "none";
  }
  get modes() {
    var _a;
    return parseLightModes((_a = this.config) == null ? void 0 : _a.als_modes);
  }
  get active() {
    return this.modes.find((m) => m.index === this.activeIndex) || this.modes[0] || null;
  }
  get enableLens() {
    var _a;
    return isTruthy((_a = this.config) == null ? void 0 : _a.als_enable_lens, !0) && !this.isCoarse;
  }
  get enableZoomBtns() {
    var _a;
    return isTruthy((_a = this.config) == null ? void 0 : _a.als_enable_zoom_btns, !0);
  }
  get enableCompare() {
    var _a;
    return isTruthy((_a = this.config) == null ? void 0 : _a.als_enable_compare, !0) && this.modes.length >= 2;
  }
  get showMetrics() {
    var _a;
    return isTruthy((_a = this.config) == null ? void 0 : _a.als_show_metrics, !0);
  }
  get showColor() {
    var _a;
    return isTruthy((_a = this.config) == null ? void 0 : _a.als_show_color, !0);
  }
  get showNotes() {
    var _a;
    return isTruthy((_a = this.config) == null ? void 0 : _a.als_show_notes, !0);
  }
  get showProduct() {
    var _a;
    return isTruthy((_a = this.config) == null ? void 0 : _a.als_show_product, !0);
  }
  get lensZoom() {
    var _a;
    return parseZoomLevel((_a = this.config) == null ? void 0 : _a.als_lens_zoom);
  }
  get placeholder() {
    var _a;
    return String(((_a = this.config) == null ? void 0 : _a.als_placeholder) || "").trim();
  }
  resetFromConfig() {
    var _a;
    const modes = this.modes;
    if (!modes.length) {
      this.displaySrc = "";
      return;
    }
    const def = resolveDefaultIndex(modes);
    this.activeIndex = def, this.compareA = def, this.compareB = ((_a = modes.find((m) => m.index !== def)) == null ? void 0 : _a.index) ?? def, this.compareOn = !1, this.zoom = 1, this.panX = 0, this.panY = 0;
    const mode = modes.find((m) => m.index === def) || modes[0];
    this.displaySrc = mode.image, this.ensureImage(mode.image, !0);
    const next = nextModeIndex(modes, def, 1), nextMode = modes.find((m) => m.index === next);
    nextMode && this.prefetch(nextMode.image);
  }
  async prefetch(src) {
    !src || this.prefetchCache.has(src) || (this.prefetchCache.add(src), await loadImageDecoded(src));
  }
  async ensureImage(src, immediate = !1) {
    const token = ++this.loadToken;
    immediate || (this.fading = !0);
    const ok = await loadImageDecoded(src);
    return token !== this.loadToken ? !1 : ok ? (this.displaySrc = src, this.fading = !1, !0) : (this.fading = !1, this.placeholder && !this.displaySrc && (this.displaySrc = this.placeholder), !1);
  }
  async selectMode(index) {
    const mode = this.modes.find((m) => m.index === index);
    if (!mode || mode.index === this.activeIndex) return;
    this.activeIndex = index, this.zoom = 1, this.panX = 0, this.panY = 0, this.lensOn = !1, !await this.ensureImage(mode.image) && this.displaySrc;
    const next = nextModeIndex(this.modes, index, 1), nextMode = this.modes.find((m) => m.index === next);
    nextMode && this.prefetch(nextMode.image);
  }
  zoomIn() {
    this.zoom = Math.min(3, Number((this.zoom + 0.5).toFixed(1)));
  }
  zoomOut() {
    this.zoom = Math.max(1, Number((this.zoom - 0.5).toFixed(1))), this.zoom === 1 && (this.panX = 0, this.panY = 0);
  }
  resetZoom() {
    this.zoom = 1, this.panX = 0, this.panY = 0;
  }
  /* —— Lens (desktop) —— */
  onStageMove(e) {
    if (!this.enableLens || this.zoom > 1 || this.compareOn) {
      this.lensOn = !1;
      return;
    }
    const stage = this.stageEl, src = this.displaySrc;
    if (!stage || !src) return;
    const rect = stage.getBoundingClientRect(), x = e.clientX - rect.left, y = e.clientY - rect.top;
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
      this.lensOn = !1;
      return;
    }
    const size = 144, half = size / 2, left = Math.max(0, Math.min(rect.width - size, x - half)), top = Math.max(0, Math.min(rect.height - size, y - half)), zx = this.lensZoom, bgX = -(x * zx - half), bgY = -(y * zx - half);
    this.lensOn = !0, this.lensStyle = {
      left: `${left}px`,
      top: `${top}px`,
      backgroundImage: `url("${src}")`,
      backgroundSize: `${rect.width * zx}px ${rect.height * zx}px`,
      backgroundPosition: `${bgX}px ${bgY}px`
    };
  }
  onStageLeave() {
    this.lensOn = !1;
  }
  /* —— Mobile pan when zoomed —— */
  onPanDown(e) {
    var _a, _b;
    this.compareOn || this.zoom <= 1 || e.pointerType === "mouse" && this.enableLens || (this.panning = !0, this.pointerId = e.pointerId, this.panStartX = e.clientX, this.panStartY = e.clientY, this.panOriginX = this.panX, this.panOriginY = this.panY, (_b = (_a = this.stageEl) == null ? void 0 : _a.setPointerCapture) == null || _b.call(_a, e.pointerId), window.addEventListener("pointermove", this.onPanMove), window.addEventListener("pointerup", this.onPanUp), window.addEventListener("pointercancel", this.onPanUp));
  }
  teardownPointers() {
    window.removeEventListener("pointermove", this.onPanMove), window.removeEventListener("pointerup", this.onPanUp), window.removeEventListener("pointercancel", this.onPanUp), window.removeEventListener("pointermove", this.onCompareMove), window.removeEventListener("pointerup", this.onCompareUp), window.removeEventListener("pointercancel", this.onCompareUp);
  }
  /* —— Compare —— */
  enterCompare() {
    var _a;
    if (!this.enableCompare) return;
    const modes = this.modes;
    this.compareA = this.activeIndex, this.compareB = ((_a = modes.find((m) => m.index !== this.compareA)) == null ? void 0 : _a.index) ?? this.compareA, this.comparePct = 50, this.compareOn = !0, this.resetZoom();
    const a = modes.find((m) => m.index === this.compareA), b = modes.find((m) => m.index === this.compareB);
    a && this.prefetch(a.image), b && this.prefetch(b.image);
  }
  exitCompare() {
    this.compareOn = !1, this.compareDragging = !1, this.teardownPointers();
  }
  setCompareSide(side, index) {
    if (side === "a") {
      if (index === this.compareB) return;
      this.compareA = index;
    } else {
      if (index === this.compareA) return;
      this.compareB = index;
    }
  }
  onCompareDown(e) {
    var _a;
    if (e.button != null && e.button !== 0) return;
    e.preventDefault(), e.stopPropagation(), this.compareDragging = !0, this.pointerId = e.pointerId, this.updateCompareFromClientX(e.clientX);
    const el = this.compareEl;
    try {
      (_a = el == null ? void 0 : el.setPointerCapture) == null || _a.call(el, e.pointerId);
    } catch {
    }
    el == null || el.addEventListener("pointermove", this.onCompareMove), el == null || el.addEventListener("pointerup", this.onCompareUp), el == null || el.addEventListener("pointercancel", this.onCompareUp), window.addEventListener("pointermove", this.onCompareMove), window.addEventListener("pointerup", this.onCompareUp), window.addEventListener("pointercancel", this.onCompareUp);
  }
  /** Physical left→right mapping (matches clip-path / handle `left`). No RTL flip. */
  updateCompareFromClientX(clientX) {
    const el = this.compareEl;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (!rect.width) return;
    const ratio = (clientX - rect.left) / rect.width;
    this.comparePct = Math.max(0, Math.min(100, Math.round(ratio * 100)));
  }
  onCompareKey(e) {
    e.key === "ArrowRight" || e.key === "ArrowUp" ? (e.preventDefault(), this.comparePct = Math.min(100, this.comparePct + 2)) : e.key === "ArrowLeft" || e.key === "ArrowDown" ? (e.preventDefault(), this.comparePct = Math.max(0, this.comparePct - 2)) : e.key === "Home" ? (e.preventDefault(), this.comparePct = 0) : e.key === "End" && (e.preventDefault(), this.comparePct = 100);
  }
  designVars() {
    const c = this.config || {}, theme = readSectionTheme(c, "als_"), shadowLevel = Math.max(0, Math.min(3, getUnitValue(c.als_shadow, 1))), shadows = [
      "none",
      "0 10px 28px rgba(43, 33, 28, 0.08)",
      "0 16px 40px rgba(43, 33, 28, 0.12)",
      "0 22px 56px rgba(43, 33, 28, 0.18)"
    ];
    return {
      ...themeStyleMap(theme),
      "--als-stage-bg": String(c.als_stage_bg || "#1a1614"),
      "--als-panel-bg": String(c.als_panel_bg || theme.card),
      "--als-meter-color": String(c.als_meter_color || theme.accent),
      "--als-handle-color": String(c.als_handle_color || "#ffffff"),
      "--als-thumb-border": String(c.als_thumb_border || theme.border),
      "--als-shadow": shadows[shadowLevel] || shadows[1],
      "--als-aspect": parseAspectRatio(c.als_aspect),
      "--als-max-width": `${getUnitValue(c.als_max_width, 720)}px`,
      "--als-compare": `${this.comparePct}%`
    };
  }
  productUrl(mode) {
    var _a;
    return mode ? mode.product_url || extractLink((_a = this.config) == null ? void 0 : _a.als_product_url) : "";
  }
  productBtn(mode) {
    var _a;
    return (mode == null ? void 0 : mode.btn_text) || localizedString((_a = this.config) == null ? void 0 : _a.als_default_btn) || t("مشاهدة المنتج", "View product");
  }
  renderMetrics(mode) {
    return this.showMetrics ? html`
      <div class="als-metrics" aria-label=${t("مؤشرات الخامة", "Fabric metrics")}>
        ${metricsForMode(mode).map((m) => {
      const level = levelLabel(m.value);
      return html`
            <div class="als-metric">
              <div class="als-metric__head">
                <span>${t(m.labelAr, m.labelEn)}</span>
                <span class="als-metric__val">
                  ${Math.round(m.value)}
                  <span class="als-metric__level">${t(level.ar, level.en)}</span>
                </span>
              </div>
              <div class="als-metric__bar" aria-hidden="true">
                <span style=${styleMap({ width: `${m.value}%` })}></span>
              </div>
            </div>
          `;
    })}
      </div>
    ` : nothing;
  }
  renderModeButtons() {
    return html`
      <div class="als-block">
        <h3 class="als-block__title">
          ${t("أوضاع الإضاءة", "Lighting modes")}
        </h3>
        <div
          class="als-modes"
          role="listbox"
          aria-label=${t("أوضاع الإضاءة", "Lighting modes")}
        >
          ${this.modes.map((mode, i) => {
      const pressed = mode.index === this.activeIndex;
      return html`
              <button
                type="button"
                class=${classMap({
        "als-mode": !0,
        "als-mode--active": pressed
      })}
                role="option"
                aria-selected=${pressed ? "true" : "false"}
                aria-pressed=${pressed ? "true" : "false"}
                @click=${() => {
        this.compareOn && this.exitCompare(), this.selectMode(mode.index);
      }}
              >
                <img
                  class="als-mode__thumb"
                  src=${mode.thumb || mode.image}
                  alt=${mode.alt}
                  loading=${i === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
                <span class="als-mode__name">${mode.name}</span>
              </button>
            `;
    })}
        </div>
      </div>
    `;
  }
  renderInfoCard(mode) {
    const url = this.productUrl(mode), colorBlock = this.showColor && mode.color_name ? html`<div>
            <span class="als-info__label">${t("اللون", "Color")}</span>
            <p class="als-info__value">${mode.color_name}</p>
          </div>` : nothing, notesBlock = this.showNotes && mode.notes ? html`<div>
            <span class="als-info__label">${t("ملاحظات", "Notes")}</span>
            <p class="als-info__value">${mode.notes}</p>
          </div>` : nothing;
    return html`
      <div class="als-info">
        ${colorBlock || notesBlock ? html`<div class="als-info__meta">
              ${colorBlock}${notesBlock}
            </div>` : nothing}
        ${this.showMetrics ? html`<div class="als-block">
              <h3 class="als-block__title">
                ${t("مؤشرات الخامة", "Fabric metrics")}
              </h3>
              ${this.renderMetrics(mode)}
            </div>` : nothing}
        ${this.showProduct && isValidHref(url) ? html`<a class="fs-btn als-info__cta" href=${url}
              >${this.productBtn(mode)}</a
            >` : nothing}
      </div>
    `;
  }
  renderViewer(mode) {
    if (this.compareOn) {
      const a = this.modes.find((m) => m.index === this.compareA) || mode, b = this.modes.find((m) => m.index === this.compareB) || mode;
      return html`
        <div class="als-viewer">
          <div class="als-compare-bar">
            <div class="als-compare-pick">
              <label>
                <span>${t("الوضع الأول", "First mode")}</span>
                <select
                  .value=${String(this.compareA)}
                  @change=${(e) => this.setCompareSide(
        "a",
        Number(e.target.value)
      )}
                >
                  ${this.modes.map(
        (m) => html`<option
                      value=${m.index}
                      ?disabled=${m.index === this.compareB}
                    >
                      ${m.name}
                    </option>`
      )}
                </select>
              </label>
              <label>
                <span>${t("الوضع الثاني", "Second mode")}</span>
                <select
                  .value=${String(this.compareB)}
                  @change=${(e) => this.setCompareSide(
        "b",
        Number(e.target.value)
      )}
                >
                  ${this.modes.map(
        (m) => html`<option
                      value=${m.index}
                      ?disabled=${m.index === this.compareA}
                    >
                      ${m.name}
                    </option>`
      )}
                </select>
              </label>
            </div>
            <button
              type="button"
              class="als-btn"
              aria-label=${t("الخروج من المقارنة", "Exit compare")}
              @click=${() => this.exitCompare()}
            >
              ${t("إنهاء المقارنة", "End compare")}
            </button>
          </div>

          <div class="als-stage-wrap">
            <div
              class=${classMap({
        "als-compare": !0,
        "als-compare--dragging": this.compareDragging
      })}
              dir="ltr"
              role="slider"
              tabindex="0"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow=${this.comparePct}
              aria-label=${t("شريط المقارنة", "Compare slider")}
              style=${styleMap({ "--als-compare": `${this.comparePct}%` })}
              @pointerdown=${this.onCompareDown}
              @keydown=${this.onCompareKey}
            >
              <img
                class="als-compare__layer"
                src=${b.image}
                alt=${b.alt}
                draggable="false"
              />
              <img
                class="als-compare__layer als-compare__top"
                src=${a.image}
                alt=${a.alt}
                draggable="false"
              />
              <span class="als-compare__label als-compare__label--a"
                >${a.name}</span
              >
              <span class="als-compare__label als-compare__label--b"
                >${b.name}</span
              >
              <div class="als-compare__handle" aria-hidden="true">
                <span class="als-compare__hit"></span>
                <span class="als-compare__knob"></span>
              </div>
            </div>
          </div>
        </div>
      `;
    }
    const imgStyle = {
      transform: `translate(${this.panX}px, ${this.panY}px) scale(${this.zoom})`
    };
    return html`
      <div class="als-viewer">
        <div class="als-stage-wrap">
          <div
            class=${classMap({
      "als-stage": !0,
      "als-stage--panning": this.zoom > 1,
      "als-stage--dragging": this.panning
    })}
            @pointermove=${(e) => this.onStageMove(e)}
            @pointerleave=${() => this.onStageLeave()}
            @pointerdown=${this.onPanDown}
          >
            ${this.displaySrc ? html`<img
                  class=${classMap({
      "als-stage__img": !0,
      "als-stage__img--fade": this.fading && !prefersReducedMotion()
    })}
                  style=${styleMap(imgStyle)}
                  src=${this.displaySrc}
                  alt=${mode.alt}
                  decoding="async"
                />` : nothing}
            ${this.enableLens ? html`<div
                  class=${classMap({
      "als-lens": !0,
      "als-lens--on": this.lensOn,
      "als-desktop-only": !0
    })}
                  style=${styleMap(this.lensStyle)}
                  aria-hidden="true"
                ></div>` : nothing}
          </div>
        </div>

        <div class="als-caption" aria-live="polite">
          <div class="als-caption__text">
            <p class="als-caption__name">${mode.name}</p>
            ${mode.desc ? html`<p class="als-caption__desc">${mode.desc}</p>` : nothing}
          </div>
          <div class="als-tools">
            ${this.enableZoomBtns ? html`
                  <div class="als-tools__group" role="group" aria-label=${t("التكبير", "Zoom")}>
                    <button
                      type="button"
                      class="als-btn"
                      aria-label=${t("تكبير", "Zoom in")}
                      @click=${() => this.zoomIn()}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      class="als-btn"
                      aria-label=${t("تصغير", "Zoom out")}
                      ?disabled=${this.zoom <= 1}
                      @click=${() => this.zoomOut()}
                    >
                      −
                    </button>
                    <button
                      type="button"
                      class="als-btn"
                      aria-label=${t("إعادة ضبط التكبير", "Reset zoom")}
                      @click=${() => this.resetZoom()}
                    >
                      ${t("ضبط", "Reset")}
                    </button>
                  </div>
                ` : nothing}
            ${this.enableCompare ? html`<button
                  type="button"
                  class="als-btn als-btn--primary"
                  aria-label=${t("وضع المقارنة", "Compare mode")}
                  @click=${() => this.enterCompare()}
                >
                  ${t("مقارنة", "Compare")}
                </button>` : nothing}
            ${this.showProduct && isValidHref(this.productUrl(mode)) ? html`<a
                  class="als-btn als-btn--accent"
                  href=${this.productUrl(mode)}
                >
                  ${this.productBtn(mode)}
                </a>` : nothing}
          </div>
        </div>
      </div>
    `;
  }
  renderPanel(mode) {
    return html`
      <aside
        class="als-panel"
        aria-label=${t("لوحة التحكم", "Control panel")}
      >
        ${this.renderModeButtons()}

        <div class="als-mobile-only">
          <div class="als-accordion">
            <button
              type="button"
              class="als-accordion__trigger"
              aria-expanded=${this.notesOpen ? "true" : "false"}
              @click=${() => {
      this.notesOpen = !this.notesOpen;
    }}
            >
              <span>${t("التفاصيل والملاحظات", "Details & notes")}</span>
              <span aria-hidden="true">${this.notesOpen ? "−" : "+"}</span>
            </button>
            ${this.notesOpen ? html`<div class="als-accordion__body">
                  ${this.renderInfoCard(mode)}
                </div>` : nothing}
          </div>
        </div>

        <div class="als-desktop-only">${this.renderInfoCard(mode)}</div>
      </aside>
    `;
  }
  render() {
    if (!this.modes.length) return nothing;
    const mode = this.active;
    if (!mode) return nothing;
    const c = this.config || {}, animate = readSectionTheme(c, "als_").animate && !prefersReducedMotion(), full = isTruthy(c.als_full_width, !1), title = localizedString(c.als_title), desc = localizedString(c.als_desc);
    return html`
      <section
        class=${classMap({
      "fs-section": !0,
      "fs-section--full": full,
      "fs-animate": animate
    })}
        style=${styleMap(this.designVars())}
        aria-label=${title || t("استوديو الإضاءة والخامة", "Light & fabric studio")}
      >
        <div class="fs-container">
          ${title || desc ? html`<header class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </header>` : nothing}

          <div class="als-shell">
            ${this.renderViewer(mode)}
            ${this.renderPanel(mode)}
          </div>
        </div>
        ${renderCommerceOutcome(this.config || {}, "als_")}
      </section>
    `;
  }
};
__name(_AbayaLightStudio, "AbayaLightStudio"), _AbayaLightStudio.styles = [
  sharedSectionCss,
  componentStyles,
  css`
      :host {
        direction: inherit;
      }
    `
];
let AbayaLightStudio = _AbayaLightStudio;
__decorateClass([
  property({ type: Object })
], AbayaLightStudio.prototype, "config");
__decorateClass([
  state()
], AbayaLightStudio.prototype, "activeIndex");
__decorateClass([
  state()
], AbayaLightStudio.prototype, "displaySrc");
__decorateClass([
  state()
], AbayaLightStudio.prototype, "fading");
__decorateClass([
  state()
], AbayaLightStudio.prototype, "zoom");
__decorateClass([
  state()
], AbayaLightStudio.prototype, "panX");
__decorateClass([
  state()
], AbayaLightStudio.prototype, "panY");
__decorateClass([
  state()
], AbayaLightStudio.prototype, "lensOn");
__decorateClass([
  state()
], AbayaLightStudio.prototype, "lensStyle");
__decorateClass([
  state()
], AbayaLightStudio.prototype, "compareOn");
__decorateClass([
  state()
], AbayaLightStudio.prototype, "compareA");
__decorateClass([
  state()
], AbayaLightStudio.prototype, "compareB");
__decorateClass([
  state()
], AbayaLightStudio.prototype, "comparePct");
__decorateClass([
  state()
], AbayaLightStudio.prototype, "notesOpen");
__decorateClass([
  state()
], AbayaLightStudio.prototype, "panning");
__decorateClass([
  query(".als-stage")
], AbayaLightStudio.prototype, "stageEl");
__decorateClass([
  query(".als-compare")
], AbayaLightStudio.prototype, "compareEl");
bindSallaRegistration(AbayaLightStudio);
typeof AbayaLightStudio < "u" && AbayaLightStudio.registerSallaComponent("salla-abaya-light-studio");
export {
  AbayaLightStudio as default
};
