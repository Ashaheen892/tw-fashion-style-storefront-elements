var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
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
function fsAccentTone(index, steps = 5) {
  const stops = [28, 40, 52, 64, 78];
  return `color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) ${stops[index % Math.max(steps, stops.length)] ?? 45}%, var(--fs-surface, #f3f4f6))`;
}
__name(fsAccentTone, "fsAccentTone");
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
function t(ar, en, value, fallbackAr) {
  var _a, _b;
  return ((_b = typeof document < "u" ? (_a = document.documentElement.lang) == null ? void 0 : _a.split(/[-_]/)[0] : "ar") == null ? void 0 : _b.toLowerCase()) === "en" ? en : fallbackAr || ar;
}
__name(t, "t");
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
  .alc-layout {
    display: grid;
    gap: 1.25rem;
  }

  @media (min-width: 900px) {
    .alc-layout {
      grid-template-columns: 1.1fr 0.9fr;
      align-items: start;
    }
  }

  .alc-form {
    display: grid;
    gap: 1.15rem;
    padding: 1.35rem;
  }

  .alc-field {
    display: grid;
    gap: 0.45rem;
  }

  .alc-field label,
  .alc-field legend {
    font-weight: 600;
    font-size: 0.92rem;
    color: var(--text-color, #000000);
  }

  .alc-field legend {
    padding: 0;
    margin-bottom: 0.15rem;
  }

  .alc-height-row {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0.65rem;
    align-items: center;
  }

  .alc-input,
  .alc-slider {
    width: 100%;
    box-sizing: border-box;
  }

  .alc-input {
    min-height: 44px;
    padding: 0.65rem 0.85rem;
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: calc(var(--section-radius, 16px) * 0.5);
    background: var(--card-bg, #ffffff);
    color: var(--text-color, #000000);
    font: inherit;
  }

  .alc-height-unit {
    min-width: 2.5rem;
    color: var(--muted-color, #666666);
    font-weight: 600;
  }

  .alc-slider {
    accent-color: var(--accent-color, var(--fs-store-primary));
    min-height: 44px;
    cursor: pointer;
    /* Match guide + size chips: min at inline-start (right in Arabic) */
    direction: inherit;
  }

  .alc-guide {
    display: grid;
    gap: 0.65rem;
    padding: 0.9rem;
    border: 1px dashed var(--border-color, #e5e7eb);
    border-radius: calc(var(--section-radius, 16px) * 0.45);
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 4%, var(--fs-surface, var(--card-bg, #ffffff)));
  }

  .alc-guide__track {
    position: relative;
    height: 12px;
    border-radius: 6px;
    /* Logical positioning so marker moves with size direction in RTL/LTR */
    direction: inherit;
    background: color-mix(in srgb, var(--border-color, #e5e7eb) 70%, transparent);
  }

  .alc-guide__segment {
    position: absolute;
    top: 0;
    bottom: 0;
    min-width: 2px;
    border-radius: 4px;
    opacity: 0.72;
    transition: opacity 0.2s ease, filter 0.2s ease;
  }

  .alc-guide__segment--active {
    opacity: 1;
    filter: brightness(1.05);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.35);
  }

  .alc-guide__marker {
    position: absolute;
    top: 50%;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid var(--card-bg, #ffffff);
    background: var(--accent-color, var(--fs-store-primary));
    transform: translateY(-50%);
    /* Negative inline margin centers the dot on the percentage edge in RTL + LTR */
    margin-inline-start: -8px;
    box-shadow: 0 2px 8px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 35%, transparent);
    pointer-events: none;
    z-index: 2;
  }

  .alc-guide__labels {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    color: var(--muted-color, #666666);
    font-size: 0.75rem;
  }

  .alc-guide__chips {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(5.75rem, 1fr));
    gap: 0.45rem;
  }

  .alc-chip {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    width: 100%;
    min-height: 44px;
    padding: 0.55rem 0.7rem;
    border-radius: 8px;
    border: 1px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #ffffff);
    color: var(--muted-color, #666666);
    font: inherit;
    font-size: 0.74rem;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
  }

  .alc-chip:hover {
    border-color: color-mix(in srgb, currentColor 40%, var(--border-color, #e5e7eb));
    background: color-mix(in srgb, currentColor 5%, var(--card-bg, #ffffff));
  }

  .alc-chip--active {
    border-color: currentColor;
    background: color-mix(in srgb, currentColor 12%, var(--card-bg, #ffffff));
    box-shadow: inset 0 0 0 1px color-mix(in srgb, currentColor 25%, transparent);
    font-weight: 600;
  }

  .alc-chip__swatch {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 3px;
    background: currentColor;
    flex: 0 0 auto;
  }

  .alc-chip__text {
    display: grid;
    gap: 0.1rem;
    text-align: start;
    line-height: 1.25;
    min-width: 0;
  }

  .alc-chip__name {
    font-weight: 600;
    color: var(--text-color, #000000);
  }

  .alc-chip--active .alc-chip__name {
    color: inherit;
  }

  .alc-chip__range {
    font-size: 0.64rem;
    opacity: 0.78;
    font-weight: 500;
  }

  .alc-options {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .alc-option {
    flex: 1 1 auto;
    min-width: 5.5rem;
    min-height: 44px;
    padding: 0.55rem 0.75rem;
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: calc(var(--section-radius, 16px) * 0.5);
    background: var(--card-bg, #ffffff);
    color: var(--text-color, #000000);
    font: inherit;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s, transform 0.2s;
    text-align: center;
  }

  .alc-option small {
    display: block;
    margin-top: 0.15rem;
    font-size: 0.72rem;
    color: var(--muted-color, #666666);
    font-weight: 400;
  }

  .alc-option[aria-pressed='true'] {
    border-color: var(--accent-color, var(--fs-store-primary));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #ffffff));
    font-weight: 600;
  }

  .alc-option:hover {
    transform: translateY(-1px);
  }

  .alc-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem;
    justify-content: center;
  }

  .alc-result {
    padding: 1.35rem;
    display: grid;
    gap: 1rem;
  }

  .alc-result__top {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    justify-content: center;
    align-items: center;
  }

  .alc-badge {
    display: inline-flex;
    align-items: center;
    min-height: 2rem;
    padding: 0.25rem 0.8rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 14%, transparent);
    color: var(--accent-color, var(--fs-store-primary));
    font-weight: 700;
    font-size: 0.88rem;
  }

  .alc-result__length {
    margin: 0;
    text-align: center;
    font-size: clamp(2.4rem, 6vw, 3.4rem);
    font-weight: 700;
    color: var(--accent-color, var(--fs-store-primary));
    line-height: 1.1;
  }

  .alc-result__unit {
    display: inline;
    margin-inline-start: 0.25rem;
    font-size: 1rem;
    color: var(--muted-color, #666666);
    font-weight: 500;
  }

  .alc-confidence {
    display: grid;
    gap: 0.35rem;
  }

  .alc-confidence__label {
    display: flex;
    justify-content: space-between;
    gap: 0.75rem;
    font-size: 0.82rem;
    color: var(--muted-color, #666666);
  }

  .alc-confidence__bar {
    height: 8px;
    border-radius: 999px;
    overflow: hidden;
    background: color-mix(in srgb, var(--border-color, #e5e7eb) 85%, transparent);
  }

  .alc-confidence__bar > span {
    display: block;
    height: 100%;
    background: var(--accent-color, var(--fs-store-primary));
    border-radius: inherit;
    transition: width 0.35s ease;
  }

  .alc-result__reason,
  .alc-result__note {
    margin: 0;
    color: var(--muted-color, #666666);
    font-size: 0.9rem;
    line-height: 1.65;
    text-align: center;
  }

  .alc-breakdown {
    display: grid;
    gap: 0.35rem;
    padding: 0.85rem;
    border-radius: calc(var(--section-radius, 16px) * 0.5);
    background: color-mix(in srgb, var(--fs-surface, #f3f4f6) 85%, var(--card-bg, #ffffff));
    font-size: 0.85rem;
  }

  .alc-breakdown__row {
    display: flex;
    justify-content: space-between;
    gap: 0.75rem;
    color: var(--text-color, #000000);
  }

  .alc-nearby {
    display: grid;
    gap: 0.55rem;
  }

  .alc-nearby__title {
    margin: 0;
    font-size: 0.88rem;
    font-weight: 700;
    color: var(--text-color, #000000);
  }

  .alc-nearby__list {
    display: grid;
    gap: 0.5rem;
  }

  @media (min-width: 640px) {
    .alc-nearby__list {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  .alc-nearby__card {
    display: grid;
    gap: 0.25rem;
    padding: 0.75rem;
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: calc(var(--section-radius, 16px) * 0.5);
    text-align: start;
    text-decoration: none;
    color: inherit;
    background: var(--card-bg, #ffffff);
  }

  .alc-nearby__card strong {
    color: var(--accent-color, var(--fs-store-primary));
  }

  .alc-error {
    margin: 0;
    padding: 0.75rem 1rem;
    border-radius: calc(var(--section-radius, 16px) * 0.5);
    background: color-mix(in srgb, var(--fs-danger, #cf4b4b) 12%, var(--fs-surface, var(--card-bg, #ffffff)));
    color: var(--fs-danger, #cf4b4b);
    font-size: 0.9rem;
    text-align: center;
  }

  .alc-disclaimer {
    margin-top: 0.25rem;
    text-align: center;
    font-size: 0.82rem;
    color: var(--muted-color, #666666);
    line-height: 1.6;
  }

  .alc-live-hint {
    margin: 0;
    text-align: center;
    font-size: 0.8rem;
    color: var(--muted-color, #666666);
  }

  .fs-animate .alc-result {
    animation: alc-fade-in 0.45s ease;
  }

  @media (max-width: 959px) {
    .alc-form,
    .alc-result {
      padding: 1.05rem 1rem;
    }

    .alc-actions {
      display: grid;
      grid-template-columns: 1fr;
    }

    .alc-actions .fs-btn {
      width: 100%;
    }
  }

  @media (max-width: 639px) {
    .alc-form,
    .alc-result {
      padding: 0.95rem 0.85rem;
    }

    .alc-guide__chips {
      grid-template-columns: 1fr;
      gap: 0.45rem;
    }

    .alc-chip {
      font-size: 0.78rem;
    }

    .alc-height-row {
      grid-template-columns: 1fr;
      gap: 0.45rem;
    }

    .alc-option {
      min-height: 44px;
    }

    .alc-actions {
      display: grid;
      grid-template-columns: 1fr;
    }

    .alc-actions .fs-btn {
      width: 100%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .alc-option:hover,
    .alc-confidence__bar > span,
    .fs-animate .alc-result {
      transform: none;
      animation: none;
      transition: none;
    }
  }

  @keyframes alc-fade-in {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
function parseRanges(raw) {
  return normalizeCollection(raw).map((item) => ({
    min_height: getUnitValue(item.min_height),
    max_height: getUnitValue(item.max_height),
    flat_length: getUnitValue(item.flat_length),
    mid_heel_length: getUnitValue(item.mid_heel_length),
    high_heel_length: getUnitValue(item.high_heel_length),
    alt_size: localizedString(item.alt_size),
    note: localizedString(item.note),
    products_url: extractLink(item.products_url),
    range_label: localizedString(item.range_label)
  })).filter(
    (r) => r.min_height > 0 && r.max_height >= r.min_height && (r.flat_length > 0 || r.mid_heel_length > 0 || r.high_heel_length > 0)
  ).sort((a, b) => a.min_height - b.min_height);
}
__name(parseRanges, "parseRanges");
function parseCuts(raw) {
  return normalizeCollection(raw).map((item, index) => ({
    cut_id: localizedString(item.cut_id) || localizedString(item.cut_name) || `cut-${index}`,
    cut_name: localizedString(item.cut_name),
    cut_desc: localizedString(item.cut_desc),
    length_delta: getUnitValue(item.length_delta, 0),
    is_default: isTruthy(item.is_default)
  })).filter((c) => c.cut_name.trim() !== "");
}
__name(parseCuts, "parseCuts");
function findRange(ranges, height) {
  return ranges.find((r) => height >= r.min_height && height <= r.max_height) ?? null;
}
__name(findRange, "findRange");
function getBaseLength(range, shoe) {
  return shoe === "mid" ? range.mid_heel_length || range.flat_length : shoe === "high" && (range.high_heel_length || range.mid_heel_length) || range.flat_length;
}
__name(getBaseLength, "getBaseLength");
function computeConfidence(height, range) {
  const span = range.max_height - range.min_height;
  if (span <= 0) return 100;
  const mid = (range.min_height + range.max_height) / 2, distance = Math.abs(height - mid), edgeRatio = clamp(distance / (span / 2), 0, 1);
  return Math.round((1 - edgeRatio) * 100);
}
__name(computeConfidence, "computeConfidence");
function findNearby(ranges, current, shoe, preference, shorterOffset, longerOffset, cutDelta, scarfDelta) {
  const index = ranges.findIndex(
    (r) => r.min_height === current.min_height && r.max_height === current.max_height
  );
  if (index < 0) return [];
  const out = [], build = /* @__PURE__ */ __name((range, relation) => {
    const base = getBaseLength(range, shoe);
    let prefDelta = 0;
    preference === "shorter" && (prefDelta = -shorterOffset), preference === "longer" && (prefDelta = longerOffset), out.push({
      alt_size: range.alt_size,
      suggestedLength: clamp(base + prefDelta + cutDelta + scarfDelta, 0, 999),
      note: range.note,
      products_url: range.products_url,
      relation
    });
  }, "build");
  return index > 0 && build(ranges[index - 1], "lower"), index < ranges.length - 1 && build(ranges[index + 1], "higher"), out;
}
__name(findNearby, "findNearby");
function calculateLength(params) {
  const range = findRange(params.ranges, params.height);
  if (!range) return null;
  const baseLength = getBaseLength(range, params.shoe);
  let preferenceDelta = 0;
  params.preference === "shorter" && (preferenceDelta = -params.shorterOffset), params.preference === "longer" && (preferenceDelta = params.longerOffset);
  const suggestedLength = clamp(
    baseLength + preferenceDelta + params.cutDelta + params.scarfDelta,
    0,
    999
  );
  return {
    range,
    baseLength,
    suggestedLength,
    cutDelta: params.cutDelta,
    scarfDelta: params.scarfDelta,
    preferenceDelta,
    confidence: computeConfidence(params.height, range),
    reason: params.reasonParts.filter(Boolean).join(" · "),
    nearby: findNearby(
      params.ranges,
      range,
      params.shoe,
      params.preference,
      params.shorterOffset,
      params.longerOffset,
      params.cutDelta,
      params.scarfDelta
    )
  };
}
__name(calculateLength, "calculateLength");
function overallBounds(ranges, fallbackMin, fallbackMax) {
  return ranges.length ? {
    min: Math.min(...ranges.map((r) => r.min_height)),
    max: Math.max(...ranges.map((r) => r.max_height))
  } : { min: fallbackMin, max: fallbackMax };
}
__name(overallBounds, "overallBounds");
function heightToPercent(height, min, max) {
  return max <= min ? 0 : clamp((height - min) / (max - min) * 100, 0, 100);
}
__name(heightToPercent, "heightToPercent");
function rangeSegmentStyle(range, boundsMin, boundsMax) {
  const span = Math.max(boundsMax - boundsMin, 1), start = (range.min_height - boundsMin) / span * 100, end = (range.max_height + 1 - boundsMin) / span * 100, width = Math.max(end - start, 0.5);
  return {
    start: clamp(start, 0, 100),
    width: clamp(width, 0.5, 100 - clamp(start, 0, 100))
  };
}
__name(rangeSegmentStyle, "rangeSegmentStyle");
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
const _AbayaLengthCalculator = class _AbayaLengthCalculator extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.heightInput = "", this.shoeType = "flat", this.preference = "exact", this.cutId = "", this.withScarf = !1, this.result = null, this.error = "", this.initialized = !1, this._onLangChange = () => this.requestUpdate(), this._liveTimer = null;
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("language-changed", this._onLangChange), this._ensureDefaults(), this._syncVisibility(), this.liveCalc && this._scheduleCalc();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("language-changed", this._onLangChange), this._liveTimer && clearTimeout(this._liveTimer);
  }
  updated(changed) {
    changed.has("config") && (this.initialized = !1, this._ensureDefaults(), this.liveCalc && this._scheduleCalc()), this._syncVisibility();
  }
  get ranges() {
    var _a;
    return parseRanges((_a = this.config) == null ? void 0 : _a.alc_ranges);
  }
  get cuts() {
    var _a;
    return parseCuts((_a = this.config) == null ? void 0 : _a.alc_cuts);
  }
  get theme() {
    return readSectionTheme(this.config, "alc_");
  }
  get minHeight() {
    var _a;
    return getUnitValue((_a = this.config) == null ? void 0 : _a.alc_min_height, 150);
  }
  get maxHeight() {
    var _a;
    return getUnitValue((_a = this.config) == null ? void 0 : _a.alc_max_height, 200);
  }
  get shorterOffset() {
    var _a;
    return getUnitValue((_a = this.config) == null ? void 0 : _a.alc_shorter_offset, 2);
  }
  get longerOffset() {
    var _a;
    return getUnitValue((_a = this.config) == null ? void 0 : _a.alc_longer_offset, 2);
  }
  get scarfDelta() {
    var _a;
    return this.withScarf ? getUnitValue((_a = this.config) == null ? void 0 : _a.alc_scarf_delta, 1) : 0;
  }
  get liveCalc() {
    var _a;
    return isTruthy((_a = this.config) == null ? void 0 : _a.alc_live_calc, !0);
  }
  get showSlider() {
    var _a;
    return isTruthy((_a = this.config) == null ? void 0 : _a.alc_show_slider, !0);
  }
  get showGuide() {
    var _a;
    return isTruthy((_a = this.config) == null ? void 0 : _a.alc_show_guide, !0);
  }
  get showCut() {
    var _a;
    return isTruthy((_a = this.config) == null ? void 0 : _a.alc_show_cut, !0) && this.cuts.length > 0;
  }
  get showScarf() {
    var _a;
    return isTruthy((_a = this.config) == null ? void 0 : _a.alc_show_scarf, !0);
  }
  get selectedCut() {
    return this.cuts.find((c) => c.cut_id === this.cutId) || this.cuts[0] || null;
  }
  _syncVisibility() {
    this.style.display = this.ranges.length ? "" : "none";
  }
  _ensureDefaults() {
    var _a, _b, _c, _d;
    if (this.initialized) return;
    const midFallback = Math.round((this.minHeight + this.maxHeight) / 2) || 165, defaultHeight = getUnitValue((_a = this.config) == null ? void 0 : _a.alc_default_height, midFallback);
    if (!this.heightInput.trim()) {
      const clamped = Math.min(
        this.maxHeight,
        Math.max(this.minHeight, defaultHeight > 0 ? defaultHeight : midFallback)
      );
      this.heightInput = String(clamped);
    }
    if (this.cuts.length) {
      const def = this.cuts.find((c) => c.is_default) || this.cuts[0];
      this.cutId = def.cut_id;
    }
    const defaultShoe = localizedString((_b = this.config) == null ? void 0 : _b.alc_default_shoe, "flat");
    (defaultShoe === "mid" || defaultShoe === "high" || defaultShoe === "flat") && (this.shoeType = defaultShoe);
    const defaultPref = localizedString((_c = this.config) == null ? void 0 : _c.alc_default_preference, "exact");
    (defaultPref === "shorter" || defaultPref === "exact" || defaultPref === "longer") && (this.preference = defaultPref), this.withScarf = isTruthy((_d = this.config) == null ? void 0 : _d.alc_scarf_default, !1), this.initialized = !0;
  }
  _label(key, ar, en) {
    var _a;
    return localizedString((_a = this.config) == null ? void 0 : _a[key], "") || t(ar, en);
  }
  _scheduleCalc() {
    this._liveTimer && clearTimeout(this._liveTimer), this._liveTimer = setTimeout(() => {
      this._calculate(!0);
    }, 120);
  }
  _onHeightInput(e) {
    this.heightInput = e.target.value, this.error = "", this.liveCalc && this._scheduleCalc();
  }
  _onSliderInput(e) {
    this.heightInput = e.target.value, this.error = "", this.liveCalc && this._scheduleCalc();
  }
  _jumpToRange(minHeight, maxHeight) {
    const mid = Math.round((minHeight + maxHeight) / 2);
    this.heightInput = String(mid), this.error = "", this.liveCalc && this._scheduleCalc();
  }
  _setShoe(shoe) {
    this.shoeType = shoe, this.liveCalc && this._scheduleCalc();
  }
  _setPreference(pref) {
    this.preference = pref, this.liveCalc && this._scheduleCalc();
  }
  _setCut(cutId) {
    this.cutId = cutId, this.liveCalc && this._scheduleCalc();
  }
  _setScarf(value) {
    this.withScarf = value, this.liveCalc && this._scheduleCalc();
  }
  _buildReasonParts(cut) {
    const shoeLabel = this.shoeType === "flat" ? this._label("alc_shoe_flat", "مسطح", "Flat") : this.shoeType === "mid" ? this._label("alc_shoe_mid", "كعب متوسط", "Mid heel") : this._label("alc_shoe_high", "كعب عالي", "High heel"), prefLabel = this.preference === "shorter" ? this._label("alc_pref_shorter", "أقصر قليلًا", "Slightly shorter") : this.preference === "longer" ? this._label("alc_pref_longer", "أطول قليلًا", "Slightly longer") : this._label("alc_pref_exact", "طول مضبوط", "Exact length"), parts = [
      `${this._label("alc_shoe_label", "الحذاء", "Shoe")}: ${shoeLabel}`,
      `${this._label("alc_pref_label", "التفضيل", "Preference")}: ${prefLabel}`
    ];
    return cut && parts.push(
      `${this._label("alc_cut_label", "القصة", "Silhouette")}: ${cut.cut_name}`
    ), this.showScarf && this.withScarf && parts.push(this._label("alc_scarf_yes", "مع طرحة", "With scarf")), parts;
  }
  _calculate(silent = !1) {
    const height = Number(this.heightInput);
    if (!this.heightInput.trim()) {
      this.result = null, this.error = silent ? "" : t("يرجى إدخال طولك بالسنتيمتر", "Please enter your height in centimeters");
      return;
    }
    if (!Number.isFinite(height) || height <= 0) {
      this.result = null, this.error = t(
        "يرجى إدخال طول صحيح بالسنتيمتر",
        "Please enter a valid height in centimeters"
      );
      return;
    }
    if (height < this.minHeight || height > this.maxHeight) {
      this.result = null, this.error = t(
        `الطول يجب أن يكون بين ${this.minHeight} و ${this.maxHeight} سم`,
        `Height must be between ${this.minHeight} and ${this.maxHeight} cm`
      );
      return;
    }
    const cut = this.selectedCut, result = calculateLength({
      ranges: this.ranges,
      height,
      shoe: this.shoeType,
      preference: this.preference,
      shorterOffset: this.shorterOffset,
      longerOffset: this.longerOffset,
      cutDelta: (cut == null ? void 0 : cut.length_delta) || 0,
      scarfDelta: this.scarfDelta,
      reasonParts: this._buildReasonParts(cut)
    });
    if (!result) {
      this.result = null, this.error = this._label(
        "alc_no_match",
        "لا يوجد مقاس مناسب لطولك — تواصلي معنا للمساعدة",
        "No matching size for your height — contact us for help"
      );
      return;
    }
    this.error = "", this.result = result;
  }
  _reset() {
    this.initialized = !1, this.heightInput = "", this.shoeType = "flat", this.preference = "exact", this.cutId = "", this.withScarf = !1, this.result = null, this.error = "", this._ensureDefaults(), this.liveCalc && this._scheduleCalc();
  }
  _formatDelta(value) {
    return value ? value > 0 ? `+${value}` : String(value) : "0";
  }
  render() {
    var _a, _b, _c;
    if (!this.ranges.length)
      return html`<div class="fs-empty" role="status">
        ${t("لا توجد بيانات مقاسات متاحة", "No size data available")}
      </div>`;
    const theme = this.theme, animateClass = theme.animate ? "fs-animate" : "", title = localizedString((_a = this.config) == null ? void 0 : _a.alc_title), desc = localizedString((_b = this.config) == null ? void 0 : _b.alc_desc), disclaimer = localizedString((_c = this.config) == null ? void 0 : _c.alc_disclaimer), calcBtn = this._label("alc_calc_btn", "احسبي الطول", "Calculate"), resetBtn = this._label("alc_reset_btn", "إعادة الحساب", "Recalculate"), shopBtn = this._label("alc_shop_btn", "تسوّقي هذا المقاس", "Shop this size"), heightLabel = this._label("alc_height_label", "طولك (سم)", "Your height (cm)"), bounds = overallBounds(this.ranges, this.minHeight, this.maxHeight), inputMin = bounds.min, inputMax = bounds.max, heightNum = Number(this.heightInput), markerPct = Number.isFinite(heightNum) ? heightToPercent(heightNum, bounds.min, bounds.max) : 0, sliderValue = Number.isFinite(heightNum) ? String(Math.min(inputMax, Math.max(inputMin, heightNum))) : String(inputMin);
    return html`
      <section
        class="fs-section ${animateClass}"
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("حاسبة طول العباية", "Abaya length calculator")}
      >
        <div class="fs-container">
          ${title || desc ? html`<header class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </header>` : nothing}

          <div class="alc-layout">
            <div class="alc-form fs-card">
              <div class="alc-field">
                <label for="alc-height">${heightLabel}</label>
                <div class="alc-height-row">
                  <input
                    id="alc-height"
                    class="alc-input"
                    type="number"
                    inputmode="decimal"
                    min=${inputMin}
                    max=${inputMax}
                    step="1"
                    .value=${this.heightInput}
                    @input=${this._onHeightInput}
                    aria-describedby=${this.error ? "alc-error" : "alc-guide-text"}
                  />
                  <span class="alc-height-unit">${t("سم", "cm")}</span>
                </div>

                ${this.showSlider ? html`<input
                      class="alc-slider"
                      type="range"
                      min=${inputMin}
                      max=${inputMax}
                      step="1"
                      .value=${sliderValue}
                      @input=${this._onSliderInput}
                      aria-label=${heightLabel}
                    />` : nothing}
              </div>

              ${this.showGuide ? html`<div class="alc-guide" id="alc-guide-text">
                    <div
                      class="alc-guide__track"
                      role="img"
                      aria-label=${t("دليل نطاقات المقاسات", "Size range guide")}
                    >
                      ${this.ranges.map((range, index) => {
      const seg = rangeSegmentStyle(range, bounds.min, bounds.max), active = Number.isFinite(heightNum) && heightNum >= range.min_height && heightNum <= range.max_height;
      return html`<div
                          class="alc-guide__segment ${active ? "alc-guide__segment--active" : ""}"
                          style=${styleMap({
        insetInlineStart: `${seg.start}%`,
        width: `${seg.width}%`,
        background: fsAccentTone(index)
      })}
                          title=${`${range.alt_size || range.range_label || ""} (${range.min_height}–${range.max_height} ${t("سم", "cm")})`.trim()}
                        ></div>`;
    })}
                      ${Number.isFinite(heightNum) && heightNum >= bounds.min && heightNum <= bounds.max ? html`<span
                            class="alc-guide__marker"
                            style=${styleMap({ insetInlineStart: `${markerPct}%` })}
                          ></span>` : nothing}
                    </div>
                    <div class="alc-guide__labels">
                      <span>${bounds.min} ${t("سم", "cm")}</span>
                      <span>${bounds.max} ${t("سم", "cm")}</span>
                    </div>
                    <div class="alc-guide__chips" role="group" aria-label=${t("المقاسات", "Sizes")}>
                      ${this.ranges.map((range, index) => {
      const active = Number.isFinite(heightNum) && heightNum >= range.min_height && heightNum <= range.max_height, label = range.alt_size || range.range_label || `${range.min_height}-${range.max_height}`;
      return html`<button
                          type="button"
                          class="alc-chip ${active ? "alc-chip--active" : ""}"
                          style=${styleMap({
        color: fsAccentTone(index)
      })}
                          aria-pressed=${active ? "true" : "false"}
                          title=${`${range.min_height}–${range.max_height} ${t("سم", "cm")}`}
                          @click=${() => this._jumpToRange(range.min_height, range.max_height)}
                        >
                          <span class="alc-chip__swatch" aria-hidden="true"></span>
                          <span class="alc-chip__text">
                            <span class="alc-chip__name">${label}</span>
                            <span class="alc-chip__range"
                              >${range.min_height}–${range.max_height}</span
                            >
                          </span>
                        </button>`;
    })}
                    </div>
                  </div>` : nothing}

              <fieldset class="alc-field" style="border:none;margin:0;padding:0;">
                <legend>${this._label("alc_shoe_label", "نوع الحذاء", "Shoe type")}</legend>
                <div class="alc-options" role="group">
                  ${this._renderOption(
      "flat",
      this._label("alc_shoe_flat", "مسطح", "Flat"),
      this.shoeType,
      () => this._setShoe("flat")
    )}
                  ${this._renderOption(
      "mid",
      this._label("alc_shoe_mid", "كعب متوسط", "Mid heel"),
      this.shoeType,
      () => this._setShoe("mid")
    )}
                  ${this._renderOption(
      "high",
      this._label("alc_shoe_high", "كعب عالي", "High heel"),
      this.shoeType,
      () => this._setShoe("high")
    )}
                </div>
              </fieldset>

              <fieldset class="alc-field" style="border:none;margin:0;padding:0;">
                <legend>${this._label("alc_pref_label", "التفضيل", "Preference")}</legend>
                <div class="alc-options" role="group">
                  ${this._renderOption(
      "shorter",
      this._label("alc_pref_shorter", "أقصر قليلًا", "Slightly shorter"),
      this.preference,
      () => this._setPreference("shorter")
    )}
                  ${this._renderOption(
      "exact",
      this._label("alc_pref_exact", "طول مضبوط", "Exact length"),
      this.preference,
      () => this._setPreference("exact")
    )}
                  ${this._renderOption(
      "longer",
      this._label("alc_pref_longer", "أطول قليلًا", "Slightly longer"),
      this.preference,
      () => this._setPreference("longer")
    )}
                </div>
              </fieldset>

              ${this.showCut ? html`<fieldset class="alc-field" style="border:none;margin:0;padding:0;">
                    <legend>${this._label("alc_cut_label", "قصة العباية", "Abaya silhouette")}</legend>
                    <div class="alc-options" role="group">
                      ${this.cuts.map(
      (cut) => html`
                          <button
                            type="button"
                            class="alc-option"
                            aria-pressed=${this.cutId === cut.cut_id ? "true" : "false"}
                            @click=${() => this._setCut(cut.cut_id)}
                          >
                            ${cut.cut_name}
                            ${cut.cut_desc ? html`<small>${cut.cut_desc}</small>` : cut.length_delta ? html`<small>${this._formatDelta(cut.length_delta)} ${t("سم", "cm")}</small>` : nothing}
                          </button>
                        `
    )}
                    </div>
                  </fieldset>` : nothing}

              ${this.showScarf ? html`<fieldset class="alc-field" style="border:none;margin:0;padding:0;">
                    <legend>${this._label("alc_scarf_label", "هل ستلبسين طرحة؟", "Will you wear a scarf?")}</legend>
                    <div class="alc-options" role="group">
                      ${this._renderOption(
      "no",
      this._label("alc_scarf_no", "بدون طرحة", "Without scarf"),
      this.withScarf ? "yes" : "no",
      () => this._setScarf(!1)
    )}
                      ${this._renderOption(
      "yes",
      this._label("alc_scarf_yes", "مع طرحة", "With scarf"),
      this.withScarf ? "yes" : "no",
      () => this._setScarf(!0)
    )}
                    </div>
                  </fieldset>` : nothing}

              ${this.error ? html`<p id="alc-error" class="alc-error" role="alert">${this.error}</p>` : nothing}

              <div class="alc-actions">
                ${this.liveCalc ? nothing : html`<button type="button" class="fs-btn" @click=${() => this._calculate(!1)}>
                      ${calcBtn}
                    </button>`}
                <button type="button" class="fs-btn fs-btn--ghost" @click=${this._reset}>
                  ${resetBtn}
                </button>
              </div>

              ${this.liveCalc ? html`<p class="alc-live-hint">
                    ${this._label(
      "alc_live_hint",
      "النتيجة تتحدث تلقائيًا مع كل اختيار",
      "The result updates automatically with every choice"
    )}
                  </p>` : nothing}
            </div>

            ${this.result ? this._renderResult(shopBtn, animateClass) : nothing}
          </div>

          ${disclaimer ? html`<p class="alc-disclaimer">${disclaimer}</p>` : nothing}
        </div>
        ${renderCommerceOutcome(this.config || {}, "alc_")}
      </section>
    `;
  }
  _renderResult(shopBtn, animateClass) {
    const result = this.result, confidenceLabel = this._label(
      "alc_confidence_label",
      "مدى ملاءمة النطاق",
      "Range fit confidence"
    );
    return html`
      <div class="alc-result fs-card ${animateClass}" aria-live="polite">
        <div class="alc-result__top">
          ${result.range.alt_size ? html`<span class="alc-badge">${result.range.alt_size}</span>` : nothing}
          ${result.range.range_label ? html`<span class="alc-badge">${result.range.range_label}</span>` : nothing}
        </div>

        <p class="alc-result__length">
          ${result.suggestedLength}
          <span class="alc-result__unit">${t("سم", "cm")}</span>
        </p>

        <div class="alc-confidence">
          <div class="alc-confidence__label">
            <span>${confidenceLabel}</span>
            <strong>${result.confidence}%</strong>
          </div>
          <div
            class="alc-confidence__bar"
            role="meter"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow=${result.confidence}
            aria-label=${confidenceLabel}
          >
            <span style=${styleMap({ width: `${result.confidence}%` })}></span>
          </div>
        </div>

        ${result.reason ? html`<p class="alc-result__reason">${result.reason}</p>` : nothing}

        <div class="alc-breakdown" aria-label=${t("تفاصيل الحساب", "Calculation details")}>
          <div class="alc-breakdown__row">
            <span>${this._label("alc_base_label", "الطول الأساسي", "Base length")}</span>
            <strong>${result.baseLength} ${t("سم", "cm")}</strong>
          </div>
          <div class="alc-breakdown__row">
            <span>${this._label("alc_pref_label", "التفضيل", "Preference")}</span>
            <strong>${this._formatDelta(result.preferenceDelta)} ${t("سم", "cm")}</strong>
          </div>
          ${this.showCut ? html`<div class="alc-breakdown__row">
                <span>${this._label("alc_cut_label", "القصة", "Silhouette")}</span>
                <strong>${this._formatDelta(result.cutDelta)} ${t("سم", "cm")}</strong>
              </div>` : nothing}
          ${this.showScarf ? html`<div class="alc-breakdown__row">
                <span>${this._label("alc_scarf_label", "الطرحة", "Scarf")}</span>
                <strong>${this._formatDelta(result.scarfDelta)} ${t("سم", "cm")}</strong>
              </div>` : nothing}
        </div>

        ${result.range.note ? html`<p class="alc-result__note">${result.range.note}</p>` : nothing}

        ${isValidHref(result.range.products_url) ? html`<div class="alc-actions">
              <a
                class="fs-btn"
                href=${result.range.products_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                ${shopBtn}
              </a>
            </div>` : nothing}

        ${result.nearby.length ? html`<div class="alc-nearby">
              <p class="alc-nearby__title">
                ${this._label(
      "alc_nearby_title",
      "اقتراحات قريبة أيضًا",
      "Nearby suggestions"
    )}
              </p>
              <div class="alc-nearby__list">
                ${result.nearby.map((item) => {
      const content = html`
                    <span>
                      ${item.relation === "lower" ? this._label("alc_nearby_lower", "أقصر قليلًا", "Slightly smaller") : this._label("alc_nearby_higher", "أطول قليلًا", "Slightly larger")}
                    </span>
                    <strong>
                      ${item.alt_size || `${item.suggestedLength} ${t("سم", "cm")}`}
                    </strong>
                    <span>${item.suggestedLength} ${t("سم", "cm")}</span>
                  `;
      return isValidHref(item.products_url) ? html`<a
                        class="alc-nearby__card"
                        href=${item.products_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        ${content}
                      </a>` : html`<div class="alc-nearby__card">${content}</div>`;
    })}
              </div>
            </div>` : nothing}
      </div>
    `;
  }
  _renderOption(value, label, current, onSelect) {
    return html`
      <button
        type="button"
        class="alc-option"
        aria-pressed=${current === value ? "true" : "false"}
        @click=${onSelect}
      >
        ${label}
      </button>
    `;
  }
};
__name(_AbayaLengthCalculator, "AbayaLengthCalculator"), _AbayaLengthCalculator.styles = [
  sharedSectionCss,
  componentStyles,
  css`
      :host {
        direction: inherit;
      }
    `
];
let AbayaLengthCalculator = _AbayaLengthCalculator;
__decorateClass([
  property({ type: Object })
], AbayaLengthCalculator.prototype, "config");
__decorateClass([
  state()
], AbayaLengthCalculator.prototype, "heightInput");
__decorateClass([
  state()
], AbayaLengthCalculator.prototype, "shoeType");
__decorateClass([
  state()
], AbayaLengthCalculator.prototype, "preference");
__decorateClass([
  state()
], AbayaLengthCalculator.prototype, "cutId");
__decorateClass([
  state()
], AbayaLengthCalculator.prototype, "withScarf");
__decorateClass([
  state()
], AbayaLengthCalculator.prototype, "result");
__decorateClass([
  state()
], AbayaLengthCalculator.prototype, "error");
__decorateClass([
  state()
], AbayaLengthCalculator.prototype, "initialized");
bindSallaRegistration(AbayaLengthCalculator);
typeof AbayaLengthCalculator < "u" && AbayaLengthCalculator.registerSallaComponent("salla-abaya-length-calculator");
export {
  AbayaLengthCalculator as default
};
