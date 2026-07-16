import { css as q, LitElement as A, html as n, nothing as m } from "lit";
import { property as D, state as f, query as P } from "lit/decorators.js";
import { classMap as v } from "lit/directives/class-map.js";
import { styleMap as T } from "lit/directives/style-map.js";
import { q as _, n as B, e as O, l as p, b as z, i as d, d as S, u as k, s as H, p as y, r as M, a as U, w as I, t as c } from "./sharedStyles-C1vUkqEN.js";
const N = q`
  .amm-shell {
    display: grid;
    gap: 1.35rem;
  }

  @media (min-width: 960px) {
    .amm-shell--side {
      grid-template-columns: minmax(0, 1.15fr) minmax(240px, 0.85fr);
      align-items: start;
      gap: 1.75rem;
    }

    .amm-shell--side-left .amm-panel {
      order: -1;
    }

    .amm-shell--side-left {
      grid-template-columns: minmax(240px, 0.85fr) minmax(0, 1.15fr);
    }
  }

  .amm-viewer {
    position: relative;
    display: grid;
    gap: 0.75rem;
    min-width: 0;
  }

  .amm-stage {
    position: relative;
    width: 100%;
    aspect-ratio: var(--amm-aspect, 3 / 4);
    max-height: min(42rem, 78vh);
    overflow: hidden;
    border-radius: var(--section-radius, 16px);
    border: 1px solid var(--amm-viewer-border, var(--border-color, #e8ddd6));
    background: var(--amm-viewer-bg, #1a1614);
    box-shadow: var(--amm-shadow, 0 12px 36px rgba(43, 33, 28, 0.1));
    touch-action: pan-y;
    user-select: none;
    -webkit-user-select: none;
    cursor: grab;
  }

  .amm-stage--dragging {
    cursor: grabbing;
  }

  .amm-stage--static {
    cursor: default;
  }

  .amm-stage__media {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
    pointer-events: none;
  }

  .amm-stage__media--layer {
    transition: opacity 0.55s ease;
    will-change: opacity;
  }

  .amm-stage__media--front {
    opacity: 1;
    z-index: 2;
  }

  .amm-stage__media--back {
    opacity: 0;
    z-index: 1;
  }

  .amm-stage--playing .amm-stage__media--front {
    animation: amm-play-soft 0.55s ease;
  }

  .amm-stage video.amm-stage__media {
    pointer-events: none;
    background: #000;
  }

  .amm-stage:fullscreen,
  .amm-stage:-webkit-full-screen,
  .amm-stage--fs {
    position: fixed !important;
    inset: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    max-height: none !important;
    aspect-ratio: auto !important;
    border-radius: 0 !important;
    z-index: 99999;
    background: #0d0b0a;
  }

  .amm-stage:fullscreen .amm-fs-trigger,
  .amm-stage:-webkit-full-screen .amm-fs-trigger,
  .amm-stage--fs .amm-fs-trigger {
    top: 1rem;
    left: 1rem;
  }

  .amm-fs-trigger {
    position: absolute;
    top: 0.75rem;
    left: 0.75rem;
    z-index: 5;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: color-mix(in srgb, #000 48%, transparent);
    color: #fff;
    cursor: pointer;
    backdrop-filter: blur(4px);
    transition: background 0.2s ease, transform 0.2s ease;
  }

  .amm-fs-trigger:hover {
    background: color-mix(in srgb, #000 62%, transparent);
  }

  .amm-fs-trigger:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 2px;
  }

  .amm-stage-nav {
    position: absolute;
    left: 50%;
    bottom: 0.85rem;
    transform: translateX(-50%);
    z-index: 5;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    gap: 0.45rem;
    padding: 0.3rem 0.4rem;
    border-radius: 999px;
    background: color-mix(in srgb, #000 48%, transparent);
    backdrop-filter: blur(4px);
    color: #fff;
    direction: ltr;
  }

  .amm-arrow {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: color-mix(in srgb, #fff 14%, transparent);
    color: #fff;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  .amm-arrow:hover {
    background: color-mix(in srgb, #fff 26%, transparent);
  }

  .amm-arrow:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 2px;
  }

  .amm-stage-nav__count {
    min-width: 4.25rem;
    text-align: center;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    font-variant-numeric: tabular-nums;
  }

  .amm-hint {
    position: absolute;
    left: 50%;
    top: 0.85rem;
    transform: translateX(-50%);
    z-index: 3;
    margin: 0;
    padding: 0.45rem 0.85rem;
    border-radius: 999px;
    background: color-mix(in srgb, #000 45%, transparent);
    color: #fff;
    font-size: 0.78rem;
    font-weight: 600;
    white-space: nowrap;
    pointer-events: none;
    transition: opacity 0.35s ease;
  }

  .amm-hint--hidden {
    opacity: 0;
  }

  .amm-caption {
    position: absolute;
    inset-inline: 0.75rem;
    bottom: 0.75rem;
    z-index: 3;
    max-width: min(20rem, calc(100% - 1.5rem));
    padding: 0.7rem 0.85rem;
    border-radius: calc(var(--section-radius, 16px) * 0.55);
    background: var(--amm-info-bg, color-mix(in srgb, var(--card-bg, #fff) 92%, transparent));
    color: var(--text-color, #2b211c);
    box-shadow: 0 10px 24px rgba(43, 33, 28, 0.14);
    animation: amm-fade 0.28s ease both;
  }

  .amm-caption__title {
    margin: 0 0 0.2rem;
    font-size: 0.9rem;
    font-weight: 700;
  }

  .amm-caption__desc {
    margin: 0;
    font-size: 0.78rem;
    line-height: 1.55;
    color: var(--muted-color, #7a6a62);
  }

  .amm-caption__link {
    display: inline-flex;
    margin-top: 0.45rem;
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--accent-color, #8b5e4b);
    text-decoration: none;
  }

  .amm-caption__link:hover {
    text-decoration: underline;
  }

  @media (min-width: 960px) {
    .amm-caption {
      inset-inline-start: 1rem;
      inset-inline-end: auto;
      bottom: 1rem;
    }
  }

  .amm-controls {
    display: grid;
    gap: 0.65rem;
  }

  .amm-progress-wrap {
    display: grid;
    gap: 0.35rem;
  }

  .amm-progress {
    position: relative;
    width: 100%;
    height: 2.75rem;
    display: grid;
    align-items: center;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    touch-action: none;
  }

  .amm-progress__track {
    position: relative;
    height: 0.35rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #e8ddd6) 85%, transparent);
    overflow: hidden;
  }

  .amm-progress__fill {
    display: block;
    height: 100%;
    width: var(--amm-progress, 0%);
    background: var(--amm-progress-color, var(--accent-color, #8b5e4b));
    border-radius: inherit;
  }

  .amm-progress__meta {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--muted-color, #7a6a62);
  }

  .amm-toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
  }

  .amm-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 44px;
    min-height: 44px;
    padding: 0.45rem 0.75rem;
    border: 1px solid var(--border-color, #e8ddd6);
    border-radius: calc(var(--section-radius, 16px) * 0.45);
    background: var(--amm-control-bg, var(--card-bg, #fff));
    color: var(--text-color, #2b211c);
    font: inherit;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease;
  }

  .amm-btn:hover {
    border-color: color-mix(in srgb, var(--accent-color, #8b5e4b) 45%, var(--border-color, #e8ddd6));
  }

  .amm-btn--primary {
    background: var(--button-bg, #8b5e4b);
    color: var(--button-color, #fff);
    border-color: transparent;
  }

  .amm-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .amm-panel {
    display: grid;
    gap: 0.85rem;
    padding: 1.15rem 1.1rem 1.25rem;
    border-radius: var(--section-radius, 16px);
    border: 1px solid var(--border-color, #e8ddd6);
    background: var(--card-bg, #fff);
    min-width: 0;
  }

  .amm-panel__name {
    margin: 0;
    font-size: clamp(1.35rem, 2.5vw, 1.75rem);
    font-weight: 700;
    line-height: 1.3;
    color: var(--text-color, #2b211c);
  }

  .amm-panel__desc {
    margin: 0;
    font-size: 0.92rem;
    line-height: 1.7;
    color: var(--muted-color, #7a6a62);
  }

  .amm-meta {
    display: grid;
    gap: 0.55rem;
  }

  .amm-meta__row {
    display: grid;
    gap: 0.2rem;
  }

  .amm-meta__label {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--muted-color, #7a6a62);
  }

  .amm-meta__value {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-color, #2b211c);
  }

  .amm-meters {
    display: grid;
    gap: 0.75rem;
  }

  .amm-meter {
    display: grid;
    gap: 0.3rem;
  }

  .amm-meter__head {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .amm-meter__bar {
    height: 0.4rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #e8ddd6) 80%, transparent);
    overflow: hidden;
  }

  .amm-meter__bar > span {
    display: block;
    height: 100%;
    background: var(--accent-color, #8b5e4b);
    border-radius: inherit;
  }

  .amm-panel .fs-btn {
    width: 100%;
    justify-content: center;
  }

  @keyframes amm-fade {
    from {
      opacity: 0;
      transform: translateY(0.35rem);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @keyframes amm-play-soft {
    0% {
      opacity: 0.72;
      transform: scale(1.012);
    }
    100% {
      opacity: 1;
      transform: none;
    }
  }

  @media (max-width: 959px) {
    .amm-shell {
      gap: 1.1rem;
    }

    .amm-stage {
      max-height: min(26rem, 58vh);
      border-radius: calc(var(--section-radius, 16px) * 0.75);
    }

    .amm-caption {
      position: static;
      max-width: none;
      margin-top: 0.15rem;
      box-shadow: none;
      border: 1px solid var(--border-color, #e8ddd6);
    }

    .amm-stage-nav {
      bottom: 0.65rem;
    }

    .amm-toolbar {
      display: flex;
      justify-content: center;
    }

    .amm-btn {
      min-width: 7.5rem;
    }

    .amm-panel {
      padding: 1rem 0.9rem 1.1rem;
    }
  }

  @media (max-width: 639px) {
    .amm-hint {
      top: 3.4rem;
      font-size: 0.72rem;
      padding: 0.4rem 0.7rem;
      max-width: calc(100% - 5.5rem);
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .amm-stage-nav__count {
      min-width: 3.6rem;
      font-size: 0.76rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .amm-caption,
    .amm-hint,
    .amm-btn,
    .amm-progress__fill,
    .amm-stage__media--layer,
    .amm-stage--playing .amm-stage__media--front {
      transition: none !important;
      animation: none !important;
    }
  }
`, j = [1, 2, 3, 4], X = [0.5, 0.75, 1], V = {
  6: 2,
  8: 1,
  12: 2,
  15: 2
};
function K(a) {
  return _(a, "sequence").toLowerCase() === "video" ? "video" : "sequence";
}
function W(a) {
  const e = S(_(a, "1") || a, 1);
  return j.includes(e) ? e : V[e] ? V[e] : 1;
}
function G(a) {
  const e = S(_(a, "1") || a, 1);
  return X.includes(e) ? e : 1;
}
function Y(a) {
  const e = _(a, "right").toLowerCase();
  return e === "left" || e === "bottom" ? e : "right";
}
function J(a) {
  const e = _(a, "3/4").replace(/\s/g, "");
  return e === "1/1" || e === "4/5" || e === "16/9" || e === "3/4" ? e : "3/4";
}
function Q(a) {
  return B(a).map((e, t) => {
    const i = O(e.image) || String(e.image || "").trim(), s = p(e.title).trim(), r = p(e.desc).trim(), o = p(e.alt).trim() || s || `Frame ${t + 1}`;
    return {
      index: t,
      image: i,
      alt: o,
      title: s,
      desc: r,
      show_info: d(e.show_info, !!(s || r)),
      url: z(e.url),
      btn_text: p(e.btn_text).trim()
    };
  }).filter((e) => !!e.image);
}
function Z(a) {
  return B(a).map((e) => {
    const t = p(e.name).trim(), i = Math.max(
      0,
      Math.min(100, k(e.value ?? e.grade ?? e.degree, 0))
    );
    return { name: t, value: i };
  }).filter((e) => !!e.name).slice(0, 10);
}
function ee(a) {
  const e = [];
  return a.amm_flow != null && a.amm_flow !== "" && e.push({
    name: "الانسيابية",
    value: Math.max(0, Math.min(100, k(a.amm_flow, 70)))
  }), a.amm_width != null && a.amm_width !== "" && e.push({
    name: "الاتساع",
    value: Math.max(0, Math.min(100, k(a.amm_width, 55)))
  }), e;
}
function te(a) {
  const e = Z(a.amm_meters);
  return {
    name: p(a.amm_name).trim(),
    desc: p(a.amm_desc).trim(),
    fabric: p(a.amm_fabric).trim(),
    cut: p(a.amm_cut).trim(),
    meters: e.length ? e : ee(a),
    sleeves: p(a.amm_sleeves).trim(),
    product_url: z(a.amm_product_url),
    product_btn: p(a.amm_product_btn).trim()
  };
}
function ie(a) {
  if (!a) return !1;
  const e = a.toLowerCase();
  return e.includes("youtube.com") || e.includes("youtu.be") || e.includes("vimeo.com/") ? !1 : /\.(mp4|webm|ogg|mov)(\?|$)/i.test(a) || e.startsWith("blob:") || e.startsWith("data:video") || e.includes("/video") || e.startsWith("https://") || e.startsWith("http://") || e.startsWith("/");
}
function C(a, e, t) {
  return e <= 0 ? 0 : t ? (a % e + e) % e : Math.max(0, Math.min(e - 1, a));
}
function se(a) {
  return a ? new Promise((e) => {
    const t = new Image();
    t.decoding = "async", t.onload = () => e(!0), t.onerror = () => e(!1), t.src = a;
  }) : Promise.resolve(!1);
}
class L {
  constructor() {
    this.ready = /* @__PURE__ */ new Set(), this.failed = /* @__PURE__ */ new Set(), this.inflight = /* @__PURE__ */ new Map();
  }
  isReady(e) {
    return this.ready.has(e);
  }
  isFailed(e) {
    return this.failed.has(e);
  }
  async load(e) {
    if (!e) return !1;
    if (this.ready.has(e)) return !0;
    if (this.failed.has(e)) return !1;
    const t = this.inflight.get(e);
    if (t) return t;
    const i = se(e).then((s) => (this.inflight.delete(e), s ? this.ready.add(e) : this.failed.add(e), s));
    return this.inflight.set(e, i), i;
  }
  async loadMany(e) {
    await Promise.all(e.filter(Boolean).map((t) => this.load(t)));
  }
  firstReady(e) {
    for (const t of e)
      if ((this.ready.has(t.image) || !this.failed.has(t.image)) && this.ready.has(t.image))
        return t;
    for (const t of e)
      if (!this.failed.has(t.image)) return t;
    return null;
  }
  failureRatio(e) {
    return e.length ? e.filter((i) => this.failed.has(i.image)).length / e.length : 1;
  }
}
var ae = Object.defineProperty, h = (a, e, t, i) => {
  for (var s = void 0, r = a.length - 1, o; r >= 0; r--)
    (o = a[r]) && (s = o(e, t, s) || s);
  return s && ae(e, t, s), s;
};
const R = 18, E = class E extends A {
  constructor() {
    super(...arguments), this.config = {}, this.frameIndex = 0, this.displaySrc = "", this.playing = !1, this.dragging = !1, this.hintHidden = !1, this.inView = !1, this.videoTime = 0, this.videoDuration = 0, this.fullscreenOpen = !1, this.framesReady = !1, this.mediaFront = "", this.mediaBack = "", this.frontIsA = !0, this.loader = new L(), this.boundLang = () => this.requestUpdate(), this.io = null, this.playRaf = 0, this.dragRaf = 0, this.lastPlayTs = 0, this.playBusy = !1, this.boundFsChange = () => this.syncFullscreenState(), this.pointerId = null, this.dragStartX = 0, this.dragStartIndex = 0, this.dragStartVideoTime = 0, this.wasPlayingBeforeDrag = !1, this.userStopped = !1, this.pendingIndex = null, this.preloadStarted = !1, this.boundVisibility = () => this.onVisibilityChange(), this.boundKeydown = (e) => this.onGlobalKey(e), this.onPointerMove = (e) => {
      !this.dragging || e.pointerId !== this.pointerId || this.dragRaf || (this.dragRaf = requestAnimationFrame(() => {
        this.dragRaf = 0;
        const t = e.clientX - this.dragStartX, i = getComputedStyle(this).direction === "rtl" ? -1 : 1, s = t * i;
        if (this.mode === "sequence") {
          const r = Math.round(s / R);
          if (Math.abs(s) < R) return;
          this.goToFrame(this.dragStartIndex + r);
        } else {
          const r = this.stageEl, o = this.videoEl;
          if (!r || !o || !this.videoDuration) return;
          const u = r.getBoundingClientRect(), g = Math.max(0, Math.min(1, (e.clientX - u.left) / u.width)), b = this.videoStartSec(), w = this.videoEndSec(), x = Math.max(0.01, w - b);
          o.currentTime = b + g * x, this.videoTime = o.currentTime;
        }
      }));
    }, this.onPointerUp = (e) => {
      e.pointerId === this.pointerId && (this.teardownPointer(), this.dragging = !1, this.wasPlayingBeforeDrag && !this.userStopped && (this.mode === "sequence" ? this.startPlayback() : this.playVideo()), this.wasPlayingBeforeDrag = !1);
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLang), document.addEventListener("visibilitychange", this.boundVisibility), document.addEventListener("fullscreenchange", this.boundFsChange), document.addEventListener("webkitfullscreenchange", this.boundFsChange), this.setupObserver();
  }
  disconnectedCallback() {
    var e;
    window.removeEventListener("language-changed", this.boundLang), document.removeEventListener("visibilitychange", this.boundVisibility), document.removeEventListener("fullscreenchange", this.boundFsChange), document.removeEventListener("webkitfullscreenchange", this.boundFsChange), document.removeEventListener("keydown", this.boundKeydown), this.teardownPointer(), this.stopPlaybackLoop(), (e = this.io) == null || e.disconnect(), this.io = null, this.pauseVideo(), this.fullscreenOpen && this.exitNativeFullscreen(), this.unlockPageScroll(), super.disconnectedCallback();
  }
  firstUpdated() {
    this.bootstrapFrames(), this.observeHost();
  }
  updated(e) {
    e.has("config") && (this.loader = new L(), this.preloadStarted = !1, this.frameIndex = 0, this.displaySrc = "", this.mediaFront = "", this.mediaBack = "", this.frontIsA = !0, this.playing = !1, this.userStopped = !1, this.hintHidden = !1, this.bootstrapFrames()), this.syncHostVisibility();
  }
  get mode() {
    var e;
    return K((e = this.config) == null ? void 0 : e.amm_mode);
  }
  get frames() {
    var e;
    return Q((e = this.config) == null ? void 0 : e.amm_frames);
  }
  get info() {
    return te(this.config || {});
  }
  get loop() {
    var e;
    return d((e = this.config) == null ? void 0 : e.amm_loop, !0);
  }
  get fps() {
    var e;
    return W((e = this.config) == null ? void 0 : e.amm_fps);
  }
  get autoplay() {
    var t, i;
    return (this.mode === "video" ? d((t = this.config) == null ? void 0 : t.amm_video_autoplay, !1) : d((i = this.config) == null ? void 0 : i.amm_autoplay, !1)) && !y();
  }
  get stopOnInteract() {
    var e;
    return d((e = this.config) == null ? void 0 : e.amm_stop_on_interact, !0);
  }
  get showProgress() {
    var e;
    return d((e = this.config) == null ? void 0 : e.amm_show_progress, !0);
  }
  get showControls() {
    var e;
    return d((e = this.config) == null ? void 0 : e.amm_show_controls, !0);
  }
  get showFrameNum() {
    var e;
    return d((e = this.config) == null ? void 0 : e.amm_show_frame_num, !0);
  }
  get showPanel() {
    var e;
    return d((e = this.config) == null ? void 0 : e.amm_show_panel, !0);
  }
  get showHint() {
    var e;
    return d((e = this.config) == null ? void 0 : e.amm_show_hint, !0);
  }
  get enableCaptions() {
    var e;
    return d((e = this.config) == null ? void 0 : e.amm_enable_captions, !0);
  }
  get enableFs() {
    var e;
    return d((e = this.config) == null ? void 0 : e.amm_enable_fs, !0);
  }
  get videoUrl() {
    var t;
    const e = String(((t = this.config) == null ? void 0 : t.amm_video_url) || "").trim();
    return ie(e) ? e : "";
  }
  get poster() {
    var e;
    return String(((e = this.config) == null ? void 0 : e.amm_poster) || "").trim();
  }
  get placeholder() {
    var e;
    return String(((e = this.config) == null ? void 0 : e.amm_placeholder) || "").trim();
  }
  get hasContent() {
    return this.mode === "video" ? !!(this.videoUrl || this.poster) : this.frames.length > 0;
  }
  get interactiveSequence() {
    return this.mode === "sequence" && this.frames.length > 1;
  }
  get currentFrame() {
    return this.frames[this.frameIndex] || null;
  }
  syncHostVisibility() {
    this.style.display = this.hasContent ? "" : "none";
  }
  setupObserver() {
    this.io || typeof IntersectionObserver > "u" || (this.io = new IntersectionObserver(
      (e) => {
        const t = e[0], i = this.inView;
        this.inView = !!(t != null && t.isIntersecting), this.inView && !i && this.onEnterView(), this.inView || this.pauseAll("offscreen");
      },
      { threshold: 0.2 }
    ));
  }
  observeHost() {
    var e;
    (e = this.io) == null || e.observe(this);
  }
  async bootstrapFrames() {
    var r;
    if (this.mode !== "sequence") {
      this.framesReady = !0;
      return;
    }
    const e = this.frames;
    if (!e.length) {
      this.framesReady = !1;
      return;
    }
    const t = e[0], s = await this.loader.load(t.image) ? t.image : this.placeholder || ((r = e.find((o) => o.image)) == null ? void 0 : r.image) || "";
    this.displaySrc = s, this.mediaFront = s, this.mediaBack = "", this.frontIsA = !0, this.frameIndex = 0, this.framesReady = !!this.displaySrc, this.loader.loadMany(
      e.slice(1, 3).map((o) => o.image)
    ), this.inView && this.onEnterView();
  }
  async onEnterView() {
    this.mode === "sequence" ? (this.preloadStarted || (this.preloadStarted = !0, this.progressivePreload()), this.autoplay && !this.userStopped && this.interactiveSequence && this.startPlayback()) : this.mode === "video" && (this.setupVideo(), this.autoplay && !this.userStopped && this.playVideo());
  }
  async progressivePreload() {
    const e = this.frames;
    for (let t = 3; t < e.length; t += 2) {
      if (!this.isConnected) return;
      await this.loader.loadMany(
        e.slice(t, t + 2).map((i) => i.image)
      ), await new Promise((i) => setTimeout(i, 16));
    }
    if (this.loader.failureRatio(e) > 0.6) {
      const t = this.loader.firstReady(e);
      t && (this.setDisplayImage(t.image, !1), this.frameIndex = t.index, this.playing = !1);
    }
  }
  onVisibilityChange() {
    document.hidden && this.pauseAll("hidden");
  }
  pauseAll(e) {
    this.stopPlaybackLoop(), this.playing = !1, this.pauseVideo();
  }
  startPlayback() {
    if (!this.interactiveSequence || y()) return;
    this.playing = !0, this.userStopped = !1, this.lastPlayTs = 0, this.playBusy = !1, this.stopPlaybackLoop();
    const e = (t) => {
      if (!this.playing || !this.inView || document.hidden) {
        this.playRaf = 0;
        return;
      }
      if (this.playBusy) {
        this.playRaf = requestAnimationFrame(e);
        return;
      }
      this.lastPlayTs || (this.lastPlayTs = t);
      const i = Math.max(900, Math.round(1e3 / this.fps));
      t - this.lastPlayTs >= i && (this.lastPlayTs = t, this.playBusy = !0, this.goToFrame(this.frameIndex + 1, { fromPlay: !0 }).then(
        () => {
          this.playBusy = !1;
        },
        () => {
          this.playBusy = !1;
        }
      )), this.playRaf = requestAnimationFrame(e);
    };
    this.playRaf = requestAnimationFrame(e);
  }
  stopPlaybackLoop() {
    this.playRaf && (cancelAnimationFrame(this.playRaf), this.playRaf = 0), this.lastPlayTs = 0, this.playBusy = !1;
  }
  togglePlay() {
    if (this.hideHint(), this.mode === "video") {
      this.playing ? (this.userStopped = !0, this.pauseAll("user")) : (this.userStopped = !1, this.playVideo());
      return;
    }
    this.playing ? (this.userStopped = !0, this.pauseAll("user")) : (this.userStopped = !1, this.startPlayback());
  }
  async goToFrame(e, t = {}) {
    const i = this.frames;
    if (!i.length) return;
    let s = C(e, i.length, this.loop);
    if (!this.loop && t.fromPlay && e >= i.length) {
      this.playing = !1, this.stopPlaybackLoop();
      return;
    }
    let r = 0;
    for (; r < i.length && this.loader.isFailed(i[s].image); )
      s = C(s + 1, i.length, this.loop), r += 1;
    const o = i[s];
    if (!o) return;
    this.pendingIndex = s;
    const u = await this.loader.load(o.image);
    if (this.pendingIndex === s) {
      if (!u)
        return t.force ? void 0 : this.goToFrame(s + 1, t);
      this.frameIndex = s, this.setDisplayImage(o.image, !y());
    }
  }
  setDisplayImage(e, t = !1) {
    if (!e || e === this.displaySrc) {
      this.displaySrc = e;
      return;
    }
    const i = this.displaySrc;
    this.displaySrc = e, t && i && !y() ? this.frontIsA ? (this.mediaBack = e, this.frontIsA = !1) : (this.mediaFront = e, this.frontIsA = !0) : (this.mediaFront = e, this.mediaBack = "", this.frontIsA = !0);
  }
  resetToStart() {
    if (this.hideHint(), this.mode === "video") {
      const e = this.videoEl;
      e && (e.currentTime = this.videoStartSec(), this.videoTime = e.currentTime);
      return;
    }
    this.goToFrame(0, { force: !0 });
  }
  step(e) {
    if (this.hideHint(), this.stopOnInteract && (this.userStopped = !0, this.pauseAll("user")), this.mode === "video") {
      const t = this.videoEl;
      if (!t || !this.videoDuration) return;
      const i = Math.max(
        this.videoStartSec(),
        Math.min(this.videoEndSec(), t.currentTime + e * 0.5)
      );
      t.currentTime = i, this.videoTime = i;
      return;
    }
    this.goToFrame(this.frameIndex + e);
  }
  /* —— Pointer / drag —— */
  onPointerDown(e) {
    var t, i, s, r;
    e.button !== 0 && e.pointerType === "mouse" || this.mode === "sequence" && !this.interactiveSequence || this.mode === "video" && !d((t = this.config) == null ? void 0 : t.amm_video_scrub, !0) || this.mode === "video" && !this.videoDuration || (this.hideHint(), this.wasPlayingBeforeDrag = this.playing, this.stopOnInteract, this.pauseAll("drag"), this.dragging = !0, this.pointerId = e.pointerId, this.dragStartX = e.clientX, this.dragStartIndex = this.frameIndex, this.dragStartVideoTime = ((i = this.videoEl) == null ? void 0 : i.currentTime) || 0, (r = (s = this.stageEl) == null ? void 0 : s.setPointerCapture) == null || r.call(s, e.pointerId), window.addEventListener("pointermove", this.onPointerMove), window.addEventListener("pointerup", this.onPointerUp), window.addEventListener("pointercancel", this.onPointerUp));
  }
  teardownPointer() {
    window.removeEventListener("pointermove", this.onPointerMove), window.removeEventListener("pointerup", this.onPointerUp), window.removeEventListener("pointercancel", this.onPointerUp), this.pointerId = null, this.dragRaf && (cancelAnimationFrame(this.dragRaf), this.dragRaf = 0);
  }
  hideHint() {
    this.hintHidden = !0;
  }
  /* —— Video —— */
  videoStartSec() {
    var e;
    return Math.max(0, S((e = this.config) == null ? void 0 : e.amm_video_start, 0));
  }
  videoEndSec() {
    var t;
    const e = S((t = this.config) == null ? void 0 : t.amm_video_end, 0);
    return e > 0 ? e : this.videoDuration || 0;
  }
  setupVideo() {
    var t, i, s;
    const e = this.videoEl;
    e && (e.playsInline = !0, e.muted = d((t = this.config) == null ? void 0 : t.amm_video_muted, !0) || this.autoplay, e.loop = d((i = this.config) == null ? void 0 : i.amm_video_loop, !0), e.playbackRate = G((s = this.config) == null ? void 0 : s.amm_video_speed), this.poster && (e.poster = this.poster));
  }
  async playVideo() {
    const e = this.videoEl;
    if (!(!e || !this.videoUrl)) {
      this.setupVideo();
      try {
        e.currentTime < this.videoStartSec() && (e.currentTime = this.videoStartSec()), await e.play(), this.playing = !0, this.userStopped = !1;
      } catch {
        this.playing = !1;
      }
    }
  }
  pauseVideo() {
    const e = this.videoEl;
    e && !e.paused && e.pause(), this.playing = !1;
  }
  onVideoMeta() {
    const e = this.videoEl;
    e && (this.videoDuration = e.duration || 0, this.videoStartSec() > 0 && (e.currentTime = this.videoStartSec(), this.videoTime = e.currentTime));
  }
  onVideoTime() {
    var i;
    const e = this.videoEl;
    if (!e) return;
    this.videoTime = e.currentTime;
    const t = this.videoEndSec();
    t > 0 && e.currentTime >= t && (d((i = this.config) == null ? void 0 : i.amm_video_loop, !0) ? e.currentTime = this.videoStartSec() : (this.pauseVideo(), this.userStopped = !0));
  }
  /* —— Progress keyboard / click —— */
  progressMax() {
    return this.mode === "video" ? Math.max(1, Math.floor((this.videoEndSec() - this.videoStartSec()) * 10)) : Math.max(1, this.frames.length - 1);
  }
  progressNow() {
    if (this.mode === "video") {
      const e = this.videoStartSec();
      return Math.max(0, Math.floor((this.videoTime - e) * 10));
    }
    return this.frameIndex;
  }
  progressPercent() {
    if (this.mode === "video") {
      const e = this.videoStartSec(), t = this.videoEndSec() || this.videoDuration;
      return !t || t <= e ? 0 : (this.videoTime - e) / (t - e) * 100;
    }
    return this.frames.length <= 1 ? 0 : this.frameIndex / (this.frames.length - 1) * 100;
  }
  onProgressKey(e) {
    e.key === "ArrowRight" ? (e.preventDefault(), this.step(1)) : e.key === "ArrowLeft" ? (e.preventDefault(), this.step(-1)) : e.key === "Home" ? (e.preventDefault(), this.resetToStart()) : e.key === "End" ? (e.preventDefault(), this.mode === "sequence" ? this.goToFrame(this.frames.length - 1) : this.videoEl && (this.videoEl.currentTime = this.videoEndSec() || this.videoDuration, this.videoTime = this.videoEl.currentTime)) : (e.key === " " || e.code === "Space") && (e.preventDefault(), this.togglePlay());
  }
  onProgressPointer(e) {
    const i = e.currentTarget.getBoundingClientRect(), s = Math.max(0, Math.min(1, (e.clientX - i.left) / i.width));
    if (this.hideHint(), this.stopOnInteract && (this.userStopped = !0, this.pauseAll("user")), this.mode === "sequence") {
      const r = Math.round(s * Math.max(0, this.frames.length - 1));
      this.goToFrame(r);
    } else if (this.videoEl && this.videoDuration) {
      const r = this.videoStartSec(), o = this.videoEndSec();
      this.videoEl.currentTime = r + s * Math.max(0.01, o - r), this.videoTime = this.videoEl.currentTime;
    }
  }
  /* —— Fullscreen (native on the stage — not a nested popup) —— */
  syncFullscreenState() {
    var s, r, o, u, g;
    const e = document.fullscreenElement || document.webkitFullscreenElement, t = !!(e && (e === this.stageEl || (s = this.stageEl) != null && s.contains(e))), i = this.fullscreenOpen;
    this.fullscreenOpen = t || (((r = this.stageEl) == null ? void 0 : r.classList.contains("amm-stage--fs")) ?? !1), i && !this.fullscreenOpen && ((o = this.stageEl) == null || o.classList.remove("amm-stage--fs"), this.unlockPageScroll(), document.removeEventListener("keydown", this.boundKeydown), (g = (u = this.fsTrigger) == null ? void 0 : u.focus) == null || g.call(u));
  }
  async openFullscreen() {
    var i, s;
    const e = this.stageEl;
    if (!e) return;
    document.addEventListener("keydown", this.boundKeydown);
    const t = ((i = e.requestFullscreen) == null ? void 0 : i.bind(e)) || ((s = e.webkitRequestFullscreen) == null ? void 0 : s.bind(e));
    if (typeof t == "function")
      try {
        await t(), this.fullscreenOpen = !0;
        return;
      } catch {
      }
    e.classList.add("amm-stage--fs"), this.fullscreenOpen = !0, this.lockPageScroll();
  }
  async exitNativeFullscreen() {
    var t;
    const e = document;
    if (document.fullscreenElement)
      try {
        await document.exitFullscreen();
      } catch {
      }
    else if (typeof e.webkitExitFullscreen == "function")
      try {
        await e.webkitExitFullscreen();
      } catch {
      }
    (t = this.stageEl) == null || t.classList.remove("amm-stage--fs"), this.fullscreenOpen = !1, this.unlockPageScroll();
  }
  closeFullscreen() {
    this.exitNativeFullscreen().then(() => {
      var e, t;
      document.removeEventListener("keydown", this.boundKeydown), (t = (e = this.fsTrigger) == null ? void 0 : e.focus) == null || t.call(e);
    });
  }
  onGlobalKey(e) {
    e.key === "Escape" && this.fullscreenOpen && (e.preventDefault(), this.closeFullscreen());
  }
  lockPageScroll() {
    document.documentElement.style.overflow = "hidden";
  }
  unlockPageScroll() {
    document.documentElement.style.overflow = "";
  }
  designVars() {
    const e = this.config || {}, t = M(e, "amm_"), i = Math.max(0, Math.min(3, k(e.amm_shadow, 1))), s = [
      "none",
      "0 10px 28px rgba(43, 33, 28, 0.08)",
      "0 16px 40px rgba(43, 33, 28, 0.12)",
      "0 22px 56px rgba(43, 33, 28, 0.18)"
    ];
    return {
      ...U(t),
      "--amm-viewer-bg": String(e.amm_viewer_bg || "#1a1614"),
      "--amm-progress-color": String(e.amm_progress_color || t.accent),
      "--amm-control-bg": String(e.amm_control_bg || t.card),
      "--amm-info-bg": String(e.amm_info_bg || t.card),
      "--amm-viewer-border": String(e.amm_viewer_border || t.border),
      "--amm-shadow": s[i] || s[1],
      "--amm-aspect": J(e.amm_aspect),
      "--amm-progress": `${this.progressPercent()}%`
    };
  }
  renderMeter(e, t) {
    const i = Math.max(0, Math.min(100, t));
    return n`
      <div
        class="amm-meter"
        role="meter"
        aria-label=${e}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${Math.round(i)}
      >
        <div class="amm-meter__head">
          <span>${e}</span>
          <span>${Math.round(i)}</span>
        </div>
        <div class="amm-meter__bar" aria-hidden="true">
          <span style=${T({ width: `${i}%` })}></span>
        </div>
      </div>
    `;
  }
  renderCaption(e) {
    return !this.enableCaptions || !(e != null && e.show_info) ? m : !e.title && !e.desc ? m : n`
      <div class="amm-caption" aria-live="polite">
        ${e.title ? n`<p class="amm-caption__title">${e.title}</p>` : m}
        ${e.desc ? n`<p class="amm-caption__desc">${e.desc}</p>` : m}
        ${I(e.url) ? n`<a class="amm-caption__link" href=${e.url}>
              ${e.btn_text || c("اكتشفي المزيد", "Learn more")}
            </a>` : m}
      </div>
    `;
  }
  renderStage() {
    var u, g, b, w, x, F;
    const e = this.mode, t = e === "sequence" && this.interactiveSequence || e === "video" && d((u = this.config) == null ? void 0 : u.amm_video_scrub, !0) && this.videoDuration > 0, i = p((g = this.config) == null ? void 0 : g.amm_hint) || c("اسحبي لرؤية الحركة", "Drag to explore the motion"), s = ((b = this.currentFrame) == null ? void 0 : b.alt) || this.info.name || c("حركة العباية", "Abaya motion"), r = this.mediaFront || this.displaySrc || this.placeholder || ((w = this.frames[0]) == null ? void 0 : w.image) || "", o = this.mediaBack;
    return n`
      <div
        class=${v({
      "amm-stage": !0,
      "amm-stage--dragging": this.dragging,
      "amm-stage--static": !t,
      "amm-stage--playing": this.playing && e === "sequence"
    })}
        @pointerdown=${this.onPointerDown}
      >
        ${e === "video" && this.videoUrl ? n`<video
              class="amm-stage__media"
              src=${this.videoUrl}
              playsinline
              ?muted=${d((x = this.config) == null ? void 0 : x.amm_video_muted, !0) || this.autoplay}
              ?loop=${d((F = this.config) == null ? void 0 : F.amm_video_loop, !0)}
              poster=${this.poster || ""}
              preload="metadata"
              @loadedmetadata=${() => this.onVideoMeta()}
              @timeupdate=${() => this.onVideoTime()}
              @play=${() => {
      this.playing = !0;
    }}
              @pause=${() => {
      this.dragging || (this.playing = !1);
    }}
            ></video>` : n`
              ${o ? n`<img
                    class=${v({
      "amm-stage__media": !0,
      "amm-stage__media--layer": !0,
      "amm-stage__media--front": !this.frontIsA,
      "amm-stage__media--back": this.frontIsA
    })}
                    src=${o}
                    alt=""
                    aria-hidden="true"
                    decoding="async"
                  />` : m}
              <img
                class=${v({
      "amm-stage__media": !0,
      "amm-stage__media--layer": !0,
      "amm-stage__media--front": this.frontIsA,
      "amm-stage__media--back": !this.frontIsA
    })}
                src=${r}
                alt=${s}
                decoding="async"
              />
            `}
        ${this.enableFs ? n`<button
              type="button"
              class="amm-fs-trigger"
              aria-label=${this.fullscreenOpen ? c("إنهاء ملء الشاشة", "Exit fullscreen") : c("ملء الشاشة", "Fullscreen")}
              @click=${($) => {
      $.stopPropagation(), this.fullscreenOpen ? this.closeFullscreen() : this.openFullscreen();
    }}
              @pointerdown=${($) => $.stopPropagation()}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                ${this.fullscreenOpen ? n`<path
                      fill="currentColor"
                      d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"
                    />` : n`<path
                      fill="currentColor"
                      d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
                    />`}
              </svg>
            </button>` : m}

        ${this.showHint && !this.hintHidden && t ? n`<p
              class=${v({
      "amm-hint": !0,
      "amm-hint--hidden": this.hintHidden
    })}
            >
              ${i}
            </p>` : m}

        ${t ? this.renderStageNav() : m}

        ${e === "sequence" ? this.renderCaption(this.currentFrame) : m}
      </div>
    `;
  }
  renderStageNav() {
    if (!this.showControls) return m;
    const t = this.mode === "sequence" ? `${this.frameIndex + 1} / ${this.frames.length}` : `${Math.floor(this.videoTime)}s / ${Math.floor(this.videoDuration || 0)}s`;
    return n`
      <div
        class="amm-stage-nav"
        dir="ltr"
        @pointerdown=${(i) => i.stopPropagation()}
      >
        <button
          type="button"
          class="amm-arrow"
          aria-label=${c("السابق", "Previous")}
          @click=${() => this.step(-1)}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
              fill="currentColor"
              d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"
            />
          </svg>
        </button>
        ${this.showFrameNum ? n`<span class="amm-stage-nav__count" aria-live="polite"
              >${t}</span
            >` : m}
        <button
          type="button"
          class="amm-arrow"
          aria-label=${c("التالي", "Next")}
          @click=${() => this.step(1)}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
              fill="currentColor"
              d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z"
            />
          </svg>
        </button>
      </div>
    `;
  }
  renderControls() {
    return this.showProgress ? (this.mode === "sequence" ? this.interactiveSequence : !!this.videoDuration) ? n`
      <div class="amm-controls">
        <div class="amm-progress-wrap">
          <div
            class="amm-progress"
            role="slider"
            tabindex="0"
            aria-valuemin="0"
            aria-valuemax=${this.progressMax()}
            aria-valuenow=${this.progressNow()}
            aria-label=${c("شريط التقدم", "Progress")}
            @keydown=${this.onProgressKey}
            @pointerdown=${this.onProgressPointer}
          >
            <div class="amm-progress__track">
              <span class="amm-progress__fill"></span>
            </div>
          </div>
        </div>
      </div>
    ` : m : m;
  }
  renderPanel() {
    if (!this.showPanel) return m;
    const e = this.info;
    return !(e.name || e.desc || e.fabric || e.cut || e.sleeves || e.product_url) && !e.meters.length ? m : n`
      <aside class="amm-panel" aria-label=${c("معلومات العباية", "Abaya details")}>
        ${e.name ? n`<h3 class="amm-panel__name">${e.name}</h3>` : m}
        ${e.desc ? n`<p class="amm-panel__desc">${e.desc}</p>` : m}
        <div class="amm-meta">
          ${e.fabric ? n`<div class="amm-meta__row">
                <span class="amm-meta__label">${c("الخامة", "Fabric")}</span>
                <span class="amm-meta__value">${e.fabric}</span>
              </div>` : m}
          ${e.cut ? n`<div class="amm-meta__row">
                <span class="amm-meta__label">${c("القصة", "Cut")}</span>
                <span class="amm-meta__value">${e.cut}</span>
              </div>` : m}
          ${e.sleeves ? n`<div class="amm-meta__row">
                <span class="amm-meta__label">${c("الأكمام", "Sleeves")}</span>
                <span class="amm-meta__value">${e.sleeves}</span>
              </div>` : m}
        </div>
        ${e.meters.length ? n`<div
              class="amm-meters"
              aria-label=${c("مستويات الخصائص", "Characteristic levels")}
            >
              ${e.meters.map((i) => this.renderMeter(i.name, i.value))}
            </div>` : m}
        ${I(e.product_url) ? n`<a class="fs-btn" href=${e.product_url}>
              ${e.product_btn || c("عرض المنتج", "View product")}
            </a>` : m}
      </aside>
    `;
  }
  renderViewerBlock() {
    return n`
      <div class="amm-viewer">
        ${this.renderStage()}
        ${this.renderControls()}
      </div>
    `;
  }
  render() {
    if (!this.hasContent) return m;
    const e = this.config || {}, i = M(e, "amm_").animate && !y(), s = Y(e.amm_panel_side), r = p(e.amm_title), o = p(e.amm_section_desc), u = {
      "amm-shell": !0,
      "amm-shell--side": this.showPanel && s !== "bottom",
      "amm-shell--side-left": this.showPanel && s === "left"
    }, g = n`
      <div class=${v(u)}>
        ${this.renderViewerBlock()}
        ${this.renderPanel()}
      </div>
    `;
    return n`
      <section
        class=${v({
      "fs-section": !0,
      "fs-animate": i
    })}
        style=${T(this.designVars())}
        aria-label=${r || c("مرآة حركة العباية", "Abaya motion mirror")}
      >
        <div class="fs-container">
          ${r || o ? n`<header class="fs-header">
                ${r ? n`<h2 class="fs-title">${r}</h2>` : m}
                ${o ? n`<p class="fs-desc">${o}</p>` : m}
              </header>` : m}
          ${g}
        </div>
      </section>
    `;
  }
};
E.styles = [
  H,
  N,
  q`
      :host {
        direction: inherit;
      }
    `
];
let l = E;
h([
  D({ type: Object })
], l.prototype, "config");
h([
  f()
], l.prototype, "frameIndex");
h([
  f()
], l.prototype, "displaySrc");
h([
  f()
], l.prototype, "playing");
h([
  f()
], l.prototype, "dragging");
h([
  f()
], l.prototype, "hintHidden");
h([
  f()
], l.prototype, "inView");
h([
  f()
], l.prototype, "videoTime");
h([
  f()
], l.prototype, "videoDuration");
h([
  f()
], l.prototype, "fullscreenOpen");
h([
  f()
], l.prototype, "framesReady");
h([
  f()
], l.prototype, "mediaFront");
h([
  f()
], l.prototype, "mediaBack");
h([
  f()
], l.prototype, "frontIsA");
h([
  P(".amm-stage")
], l.prototype, "stageEl");
h([
  P("video.amm-stage__media")
], l.prototype, "videoEl");
h([
  P(".amm-fs-trigger")
], l.prototype, "fsTrigger");
typeof l < "u" && l.registerSallaComponent("salla-abaya-motion-mirror");
export {
  l as default
};
