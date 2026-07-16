import { css, html, LitElement, nothing } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import {
  getUnitValue,
  isTruthy,
  isValidHref,
  prefersReducedMotion,
  readSectionTheme,
  t,
  themeStyleMap,
  toNumber,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { componentStyles } from './styles.js';
import type { MotionFrame } from './types.js';
import {
  clampIndex,
  FrameLoader,
  isDirectVideoUrl,
  parseAspectRatio,
  parseFrames,
  parseFps,
  parseMotionInfo,
  parsePanelSide,
  parseVideoSpeed,
  parseViewerMode,
} from './utils.js';

const DRAG_PX_PER_FRAME = 18;

export default class AbayaMotionMirror extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private frameIndex = 0;
  @state() private displaySrc = '';
  @state() private playing = false;
  @state() private dragging = false;
  @state() private hintHidden = false;
  @state() private inView = false;
  @state() private videoTime = 0;
  @state() private videoDuration = 0;
  @state() private fullscreenOpen = false;
  @state() private framesReady = false;
  @state() private mediaFront = '';
  @state() private mediaBack = '';
  @state() private frontIsA = true;

  @query('.amm-stage') private stageEl?: HTMLElement;
  @query('video.amm-stage__media') private videoEl?: HTMLVideoElement;
  @query('.amm-fs-trigger') private fsTrigger?: HTMLButtonElement;

  private loader = new FrameLoader();
  private boundLang = () => this.requestUpdate();
  private io: IntersectionObserver | null = null;
  private playRaf = 0;
  private dragRaf = 0;
  private lastPlayTs = 0;
  private playBusy = false;
  private boundFsChange = () => this.syncFullscreenState();
  private pointerId: number | null = null;
  private dragStartX = 0;
  private dragStartIndex = 0;
  private dragStartVideoTime = 0;
  private wasPlayingBeforeDrag = false;
  private userStopped = false;
  private pendingIndex: number | null = null;
  private preloadStarted = false;
  private boundVisibility = () => this.onVisibilityChange();
  private boundKeydown = (e: KeyboardEvent) => this.onGlobalKey(e);

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
    window.addEventListener('language-changed', this.boundLang);
    document.addEventListener('visibilitychange', this.boundVisibility);
    document.addEventListener('fullscreenchange', this.boundFsChange);
    document.addEventListener('webkitfullscreenchange', this.boundFsChange);
    this.setupObserver();
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLang);
    document.removeEventListener('visibilitychange', this.boundVisibility);
    document.removeEventListener('fullscreenchange', this.boundFsChange);
    document.removeEventListener('webkitfullscreenchange', this.boundFsChange);
    document.removeEventListener('keydown', this.boundKeydown);
    this.teardownPointer();
    this.stopPlaybackLoop();
    this.io?.disconnect();
    this.io = null;
    this.pauseVideo();
    if (this.fullscreenOpen) void this.exitNativeFullscreen();
    this.unlockPageScroll();
    super.disconnectedCallback();
  }

  firstUpdated(): void {
    void this.bootstrapFrames();
    this.observeHost();
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config')) {
      this.loader = new FrameLoader();
      this.preloadStarted = false;
      this.frameIndex = 0;
      this.displaySrc = '';
      this.mediaFront = '';
      this.mediaBack = '';
      this.frontIsA = true;
      this.playing = false;
      this.userStopped = false;
      this.hintHidden = false;
      void this.bootstrapFrames();
    }
    this.syncHostVisibility();
  }

  private get mode() {
    return parseViewerMode(this.config?.amm_mode);
  }

  private get frames(): MotionFrame[] {
    return parseFrames(this.config?.amm_frames);
  }

  private get info() {
    return parseMotionInfo(this.config || {});
  }

  private get loop() {
    return isTruthy(this.config?.amm_loop, true);
  }

  private get fps() {
    return parseFps(this.config?.amm_fps);
  }

  private get autoplay() {
    const flag =
      this.mode === 'video'
        ? isTruthy(this.config?.amm_video_autoplay, false)
        : isTruthy(this.config?.amm_autoplay, false);
    return flag && !prefersReducedMotion();
  }

  private get stopOnInteract() {
    return isTruthy(this.config?.amm_stop_on_interact, true);
  }

  private get showProgress() {
    return isTruthy(this.config?.amm_show_progress, true);
  }

  private get showControls() {
    return isTruthy(this.config?.amm_show_controls, true);
  }

  private get showFrameNum() {
    return isTruthy(this.config?.amm_show_frame_num, true);
  }

  private get showPanel() {
    return isTruthy(this.config?.amm_show_panel, true);
  }

  private get showHint() {
    return isTruthy(this.config?.amm_show_hint, true);
  }

  private get enableCaptions() {
    return isTruthy(this.config?.amm_enable_captions, true);
  }

  private get enableFs() {
    return isTruthy(this.config?.amm_enable_fs, true);
  }

  private get videoUrl() {
    const url = String(this.config?.amm_video_url || '').trim();
    return isDirectVideoUrl(url) ? url : '';
  }

  private get poster() {
    return String(this.config?.amm_poster || '').trim();
  }

  private get placeholder() {
    return String(this.config?.amm_placeholder || '').trim();
  }

  private get hasContent(): boolean {
    if (this.mode === 'video') return Boolean(this.videoUrl || this.poster);
    return this.frames.length > 0;
  }

  private get interactiveSequence(): boolean {
    return this.mode === 'sequence' && this.frames.length > 1;
  }

  private get currentFrame(): MotionFrame | null {
    return this.frames[this.frameIndex] || null;
  }

  private syncHostVisibility(): void {
    this.style.display = this.hasContent ? '' : 'none';
  }

  private setupObserver(): void {
    if (this.io || typeof IntersectionObserver === 'undefined') return;
    this.io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const was = this.inView;
        this.inView = Boolean(entry?.isIntersecting);
        if (this.inView && !was) {
          void this.onEnterView();
        }
        if (!this.inView) {
          this.pauseAll('offscreen');
        }
      },
      { threshold: 0.2 }
    );
  }

  private observeHost(): void {
    this.io?.observe(this);
  }

  private async bootstrapFrames(): Promise<void> {
    if (this.mode !== 'sequence') {
      this.framesReady = true;
      return;
    }
    const frames = this.frames;
    if (!frames.length) {
      this.framesReady = false;
      return;
    }

    const first = frames[0];
    const ok = await this.loader.load(first.image);
    const src = ok
      ? first.image
      : this.placeholder || frames.find((f) => f.image)?.image || '';
    this.displaySrc = src;
    this.mediaFront = src;
    this.mediaBack = '';
    this.frontIsA = true;
    this.frameIndex = 0;
    this.framesReady = Boolean(this.displaySrc);

    // Eager neighbors
    void this.loader.loadMany(
      frames.slice(1, 3).map((f) => f.image)
    );

    if (this.inView) void this.onEnterView();
  }

  private async onEnterView(): Promise<void> {
    if (this.mode === 'sequence') {
      if (!this.preloadStarted) {
        this.preloadStarted = true;
        void this.progressivePreload();
      }
      if (this.autoplay && !this.userStopped && this.interactiveSequence) {
        this.startPlayback();
      }
    } else if (this.mode === 'video') {
      this.setupVideo();
      if (this.autoplay && !this.userStopped) {
        void this.playVideo();
      }
    }
  }

  private async progressivePreload(): Promise<void> {
    const frames = this.frames;
    for (let i = 3; i < frames.length; i += 2) {
      if (!this.isConnected) return;
      await this.loader.loadMany(
        frames.slice(i, i + 2).map((f) => f.image)
      );
      // yield to main thread
      await new Promise((r) => setTimeout(r, 16));
    }

    if (this.loader.failureRatio(frames) > 0.6) {
      const fallback = this.loader.firstReady(frames);
      if (fallback) {
        this.setDisplayImage(fallback.image, false);
        this.frameIndex = fallback.index;
        this.playing = false;
      }
    }
  }

  private onVisibilityChange(): void {
    if (document.hidden) this.pauseAll('hidden');
  }

  private pauseAll(_reason: string): void {
    this.stopPlaybackLoop();
    this.playing = false;
    this.pauseVideo();
  }

  private startPlayback(): void {
    if (!this.interactiveSequence || prefersReducedMotion()) return;
    this.playing = true;
    this.userStopped = false;
    this.lastPlayTs = 0;
    this.playBusy = false;
    this.stopPlaybackLoop();
    const tick = (ts: number) => {
      if (!this.playing || !this.inView || document.hidden) {
        this.playRaf = 0;
        return;
      }
      if (this.playBusy) {
        this.playRaf = requestAnimationFrame(tick);
        return;
      }
      if (!this.lastPlayTs) this.lastPlayTs = ts;
      // Calm pacing: at least 900ms between frames + crossfade
      const interval = Math.max(900, Math.round(1000 / this.fps));
      if (ts - this.lastPlayTs >= interval) {
        this.lastPlayTs = ts;
        this.playBusy = true;
        void this.goToFrame(this.frameIndex + 1, { fromPlay: true }).then(
          () => {
            this.playBusy = false;
          },
          () => {
            this.playBusy = false;
          }
        );
      }
      this.playRaf = requestAnimationFrame(tick);
    };
    this.playRaf = requestAnimationFrame(tick);
  }

  private stopPlaybackLoop(): void {
    if (this.playRaf) {
      cancelAnimationFrame(this.playRaf);
      this.playRaf = 0;
    }
    this.lastPlayTs = 0;
    this.playBusy = false;
  }

  private togglePlay(): void {
    this.hideHint();
    if (this.mode === 'video') {
      if (this.playing) {
        this.userStopped = true;
        this.pauseAll('user');
      } else {
        this.userStopped = false;
        void this.playVideo();
      }
      return;
    }
    if (this.playing) {
      this.userStopped = true;
      this.pauseAll('user');
    } else {
      this.userStopped = false;
      this.startPlayback();
    }
  }

  private async goToFrame(
    next: number,
    opts: { fromPlay?: boolean; force?: boolean } = {}
  ): Promise<void> {
    const frames = this.frames;
    if (!frames.length) return;

    let target = clampIndex(next, frames.length, this.loop);
    if (!this.loop && opts.fromPlay && next >= frames.length) {
      this.playing = false;
      this.stopPlaybackLoop();
      return;
    }

    // skip failed frames
    let guard = 0;
    while (
      guard < frames.length &&
      this.loader.isFailed(frames[target].image)
    ) {
      target = clampIndex(target + 1, frames.length, this.loop);
      guard += 1;
    }

    const frame = frames[target];
    if (!frame) return;

    this.pendingIndex = target;
    const ok = await this.loader.load(frame.image);
    if (this.pendingIndex !== target) return;
    if (!ok) {
      if (opts.force) return;
      return this.goToFrame(target + 1, opts);
    }

    this.frameIndex = target;
    this.setDisplayImage(frame.image, !prefersReducedMotion());
  }

  private setDisplayImage(src: string, soft = false): void {
    if (!src || src === this.displaySrc) {
      this.displaySrc = src;
      return;
    }
    const prev = this.displaySrc;
    this.displaySrc = src;
    if (soft && prev && !prefersReducedMotion()) {
      if (this.frontIsA) {
        this.mediaBack = src;
        this.frontIsA = false;
      } else {
        this.mediaFront = src;
        this.frontIsA = true;
      }
    } else {
      this.mediaFront = src;
      this.mediaBack = '';
      this.frontIsA = true;
    }
  }

  private resetToStart(): void {
    this.hideHint();
    if (this.mode === 'video') {
      const video = this.videoEl;
      if (video) {
        video.currentTime = this.videoStartSec();
        this.videoTime = video.currentTime;
      }
      return;
    }
    void this.goToFrame(0, { force: true });
  }

  private step(delta: number): void {
    this.hideHint();
    if (this.stopOnInteract) {
      this.userStopped = true;
      this.pauseAll('user');
    }
    if (this.mode === 'video') {
      const video = this.videoEl;
      if (!video || !this.videoDuration) return;
      const next = Math.max(
        this.videoStartSec(),
        Math.min(this.videoEndSec(), video.currentTime + delta * 0.5)
      );
      video.currentTime = next;
      this.videoTime = next;
      return;
    }
    void this.goToFrame(this.frameIndex + delta);
  }

  /* —— Pointer / drag —— */
  private onPointerDown(e: PointerEvent): void {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    if (this.mode === 'sequence' && !this.interactiveSequence) return;
    if (this.mode === 'video' && !isTruthy(this.config?.amm_video_scrub, true)) {
      return;
    }
    if (this.mode === 'video' && !this.videoDuration) return;

    this.hideHint();
    this.wasPlayingBeforeDrag = this.playing;
    if (this.stopOnInteract || true) {
      this.pauseAll('drag');
    }

    this.dragging = true;
    this.pointerId = e.pointerId;
    this.dragStartX = e.clientX;
    this.dragStartIndex = this.frameIndex;
    this.dragStartVideoTime = this.videoEl?.currentTime || 0;
    this.stageEl?.setPointerCapture?.(e.pointerId);
    window.addEventListener('pointermove', this.onPointerMove);
    window.addEventListener('pointerup', this.onPointerUp);
    window.addEventListener('pointercancel', this.onPointerUp);
  }

  private onPointerMove = (e: PointerEvent): void => {
    if (!this.dragging || e.pointerId !== this.pointerId) return;
    if (this.dragRaf) return;
    this.dragRaf = requestAnimationFrame(() => {
      this.dragRaf = 0;
      const dx = e.clientX - this.dragStartX;
      // RTL: reverse scrub direction for natural feel
      const dir = getComputedStyle(this).direction === 'rtl' ? -1 : 1;
      const signed = dx * dir;

      if (this.mode === 'sequence') {
        const deltaFrames = Math.round(signed / DRAG_PX_PER_FRAME);
        if (Math.abs(signed) < DRAG_PX_PER_FRAME) return;
        void this.goToFrame(this.dragStartIndex + deltaFrames);
      } else {
        const stage = this.stageEl;
        const video = this.videoEl;
        if (!stage || !video || !this.videoDuration) return;
        const rect = stage.getBoundingClientRect();
        const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const start = this.videoStartSec();
        const end = this.videoEndSec();
        const span = Math.max(0.01, end - start);
        video.currentTime = start + ratio * span;
        this.videoTime = video.currentTime;
      }
    });
  };

  private onPointerUp = (e: PointerEvent): void => {
    if (e.pointerId !== this.pointerId) return;
    this.teardownPointer();
    this.dragging = false;
    if (this.wasPlayingBeforeDrag && !this.userStopped) {
      if (this.mode === 'sequence') this.startPlayback();
      else void this.playVideo();
    }
    this.wasPlayingBeforeDrag = false;
  };

  private teardownPointer(): void {
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('pointerup', this.onPointerUp);
    window.removeEventListener('pointercancel', this.onPointerUp);
    this.pointerId = null;
    if (this.dragRaf) {
      cancelAnimationFrame(this.dragRaf);
      this.dragRaf = 0;
    }
  }

  private hideHint(): void {
    this.hintHidden = true;
  }

  /* —— Video —— */
  private videoStartSec(): number {
    return Math.max(0, toNumber(this.config?.amm_video_start, 0));
  }

  private videoEndSec(): number {
    const end = toNumber(this.config?.amm_video_end, 0);
    if (end > 0) return end;
    return this.videoDuration || 0;
  }

  private setupVideo(): void {
    const video = this.videoEl;
    if (!video) return;
    video.playsInline = true;
    video.muted = isTruthy(this.config?.amm_video_muted, true) || this.autoplay;
    video.loop = isTruthy(this.config?.amm_video_loop, true);
    video.playbackRate = parseVideoSpeed(this.config?.amm_video_speed);
    if (this.poster) video.poster = this.poster;
  }

  private async playVideo(): Promise<void> {
    const video = this.videoEl;
    if (!video || !this.videoUrl) return;
    this.setupVideo();
    try {
      if (video.currentTime < this.videoStartSec()) {
        video.currentTime = this.videoStartSec();
      }
      await video.play();
      this.playing = true;
      this.userStopped = false;
    } catch {
      this.playing = false;
    }
  }

  private pauseVideo(): void {
    const video = this.videoEl;
    if (video && !video.paused) video.pause();
    this.playing = false;
  }

  private onVideoMeta(): void {
    const video = this.videoEl;
    if (!video) return;
    this.videoDuration = video.duration || 0;
    if (this.videoStartSec() > 0) {
      video.currentTime = this.videoStartSec();
      this.videoTime = video.currentTime;
    }
  }

  private onVideoTime(): void {
    const video = this.videoEl;
    if (!video) return;
    this.videoTime = video.currentTime;
    const end = this.videoEndSec();
    if (end > 0 && video.currentTime >= end) {
      if (isTruthy(this.config?.amm_video_loop, true)) {
        video.currentTime = this.videoStartSec();
      } else {
        this.pauseVideo();
        this.userStopped = true;
      }
    }
  }

  /* —— Progress keyboard / click —— */
  private progressMax(): number {
    if (this.mode === 'video') {
      return Math.max(1, Math.floor((this.videoEndSec() - this.videoStartSec()) * 10));
    }
    return Math.max(1, this.frames.length - 1);
  }

  private progressNow(): number {
    if (this.mode === 'video') {
      const start = this.videoStartSec();
      return Math.max(0, Math.floor((this.videoTime - start) * 10));
    }
    return this.frameIndex;
  }

  private progressPercent(): number {
    if (this.mode === 'video') {
      const start = this.videoStartSec();
      const end = this.videoEndSec() || this.videoDuration;
      if (!end || end <= start) return 0;
      return ((this.videoTime - start) / (end - start)) * 100;
    }
    if (this.frames.length <= 1) return 0;
    return (this.frameIndex / (this.frames.length - 1)) * 100;
  }

  private onProgressKey(e: KeyboardEvent): void {
    // Physical left/right: left = previous, right = next
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      this.step(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      this.step(-1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      this.resetToStart();
    } else if (e.key === 'End') {
      e.preventDefault();
      if (this.mode === 'sequence') void this.goToFrame(this.frames.length - 1);
      else if (this.videoEl) {
        this.videoEl.currentTime = this.videoEndSec() || this.videoDuration;
        this.videoTime = this.videoEl.currentTime;
      }
    } else if (e.key === ' ' || e.code === 'Space') {
      e.preventDefault();
      this.togglePlay();
    }
  }

  private onProgressPointer(e: PointerEvent): void {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    this.hideHint();
    if (this.stopOnInteract) {
      this.userStopped = true;
      this.pauseAll('user');
    }
    if (this.mode === 'sequence') {
      const idx = Math.round(ratio * Math.max(0, this.frames.length - 1));
      void this.goToFrame(idx);
    } else if (this.videoEl && this.videoDuration) {
      const start = this.videoStartSec();
      const end = this.videoEndSec();
      this.videoEl.currentTime = start + ratio * Math.max(0.01, end - start);
      this.videoTime = this.videoEl.currentTime;
    }
  }

  /* —— Fullscreen (native on the stage — not a nested popup) —— */
  private syncFullscreenState(): void {
    const fsEl =
      document.fullscreenElement ||
      (document as Document & { webkitFullscreenElement?: Element })
        .webkitFullscreenElement;
    const open = Boolean(fsEl && (fsEl === this.stageEl || this.stageEl?.contains(fsEl)));
    const was = this.fullscreenOpen;
    this.fullscreenOpen = open || (this.stageEl?.classList.contains('amm-stage--fs') ?? false);
    if (was && !this.fullscreenOpen) {
      this.stageEl?.classList.remove('amm-stage--fs');
      this.unlockPageScroll();
      document.removeEventListener('keydown', this.boundKeydown);
      this.fsTrigger?.focus?.();
    }
  }

  private async openFullscreen(): Promise<void> {
    const stage = this.stageEl;
    if (!stage) return;

    document.addEventListener('keydown', this.boundKeydown);

    const req =
      stage.requestFullscreen?.bind(stage) ||
      (
        stage as HTMLElement & {
          webkitRequestFullscreen?: () => Promise<void> | void;
        }
      ).webkitRequestFullscreen?.bind(stage);

    if (typeof req === 'function') {
      try {
        await req();
        this.fullscreenOpen = true;
        return;
      } catch {
        // fall through to CSS fullscreen
      }
    }

    // CSS fallback: expand the same stage in place (no second nested viewer)
    stage.classList.add('amm-stage--fs');
    this.fullscreenOpen = true;
    this.lockPageScroll();
  }

  private async exitNativeFullscreen(): Promise<void> {
    const doc = document as Document & {
      webkitExitFullscreen?: () => Promise<void> | void;
    };
    if (document.fullscreenElement) {
      try {
        await document.exitFullscreen();
      } catch {
        // ignore
      }
    } else if (typeof doc.webkitExitFullscreen === 'function') {
      try {
        await doc.webkitExitFullscreen();
      } catch {
        // ignore
      }
    }
    this.stageEl?.classList.remove('amm-stage--fs');
    this.fullscreenOpen = false;
    this.unlockPageScroll();
  }

  private closeFullscreen(): void {
    void this.exitNativeFullscreen().then(() => {
      document.removeEventListener('keydown', this.boundKeydown);
      this.fsTrigger?.focus?.();
    });
  }

  private onGlobalKey(e: KeyboardEvent): void {
    if (e.key === 'Escape' && this.fullscreenOpen) {
      e.preventDefault();
      this.closeFullscreen();
    }
  }

  private lockPageScroll(): void {
    document.documentElement.style.overflow = 'hidden';
  }

  private unlockPageScroll(): void {
    document.documentElement.style.overflow = '';
  }

  private designVars(): Record<string, string> {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'amm_');
    const shadowLevel = Math.max(0, Math.min(3, getUnitValue(c.amm_shadow, 1)));
    const shadows = [
      'none',
      '0 10px 28px rgba(43, 33, 28, 0.08)',
      '0 16px 40px rgba(43, 33, 28, 0.12)',
      '0 22px 56px rgba(43, 33, 28, 0.18)',
    ];
    return {
      ...themeStyleMap(theme),
      '--amm-viewer-bg': String(c.amm_viewer_bg || '#1a1614'),
      '--amm-progress-color': String(c.amm_progress_color || theme.accent),
      '--amm-control-bg': String(c.amm_control_bg || theme.card),
      '--amm-info-bg': String(c.amm_info_bg || theme.card),
      '--amm-viewer-border': String(c.amm_viewer_border || theme.border),
      '--amm-shadow': shadows[shadowLevel] || shadows[1],
      '--amm-aspect': parseAspectRatio(c.amm_aspect),
      '--amm-progress': `${this.progressPercent()}%`,
    };
  }

  private renderMeter(label: string, value: number) {
    const safe = Math.max(0, Math.min(100, value));
    return html`
      <div
        class="amm-meter"
        role="meter"
        aria-label=${label}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${Math.round(safe)}
      >
        <div class="amm-meter__head">
          <span>${label}</span>
          <span>${Math.round(safe)}</span>
        </div>
        <div class="amm-meter__bar" aria-hidden="true">
          <span style=${styleMap({ width: `${safe}%` })}></span>
        </div>
      </div>
    `;
  }

  private renderCaption(frame: MotionFrame | null) {
    if (!this.enableCaptions || !frame?.show_info) return nothing;
    if (!frame.title && !frame.desc) return nothing;
    return html`
      <div class="amm-caption" aria-live="polite">
        ${frame.title
          ? html`<p class="amm-caption__title">${frame.title}</p>`
          : nothing}
        ${frame.desc
          ? html`<p class="amm-caption__desc">${frame.desc}</p>`
          : nothing}
        ${isValidHref(frame.url)
          ? html`<a class="amm-caption__link" href=${frame.url}>
              ${frame.btn_text || t('اكتشفي المزيد', 'Learn more')}
            </a>`
          : nothing}
      </div>
    `;
  }

  private renderStage() {
    const mode = this.mode;
    const interactive =
      (mode === 'sequence' && this.interactiveSequence) ||
      (mode === 'video' &&
        isTruthy(this.config?.amm_video_scrub, true) &&
        this.videoDuration > 0);
    const hint =
      localizedString(this.config?.amm_hint as string) ||
      t('اسحبي لرؤية الحركة', 'Drag to explore the motion');

    const alt =
      this.currentFrame?.alt ||
      this.info.name ||
      t('حركة العباية', 'Abaya motion');
    const frontSrc =
      this.mediaFront ||
      this.displaySrc ||
      this.placeholder ||
      this.frames[0]?.image ||
      '';
    const backSrc = this.mediaBack;

    return html`
      <div
        class=${classMap({
          'amm-stage': true,
          'amm-stage--dragging': this.dragging,
          'amm-stage--static': !interactive,
          'amm-stage--playing': this.playing && mode === 'sequence',
        })}
        @pointerdown=${this.onPointerDown}
      >
        ${mode === 'video' && this.videoUrl
          ? html`<video
              class="amm-stage__media"
              src=${this.videoUrl}
              playsinline
              ?muted=${isTruthy(this.config?.amm_video_muted, true) || this.autoplay}
              ?loop=${isTruthy(this.config?.amm_video_loop, true)}
              poster=${this.poster || ''}
              preload="metadata"
              @loadedmetadata=${() => this.onVideoMeta()}
              @timeupdate=${() => this.onVideoTime()}
              @play=${() => {
                this.playing = true;
              }}
              @pause=${() => {
                if (!this.dragging) this.playing = false;
              }}
            ></video>`
          : html`
              ${backSrc
                ? html`<img
                    class=${classMap({
                      'amm-stage__media': true,
                      'amm-stage__media--layer': true,
                      'amm-stage__media--front': !this.frontIsA,
                      'amm-stage__media--back': this.frontIsA,
                    })}
                    src=${backSrc}
                    alt=""
                    aria-hidden="true"
                    decoding="async"
                  />`
                : nothing}
              <img
                class=${classMap({
                  'amm-stage__media': true,
                  'amm-stage__media--layer': true,
                  'amm-stage__media--front': this.frontIsA,
                  'amm-stage__media--back': !this.frontIsA,
                })}
                src=${frontSrc}
                alt=${alt}
                decoding="async"
              />
            `}
        ${this.enableFs
          ? html`<button
              type="button"
              class="amm-fs-trigger"
              aria-label=${this.fullscreenOpen
                ? t('إنهاء ملء الشاشة', 'Exit fullscreen')
                : t('ملء الشاشة', 'Fullscreen')}
              @click=${(e: Event) => {
                e.stopPropagation();
                if (this.fullscreenOpen) this.closeFullscreen();
                else void this.openFullscreen();
              }}
              @pointerdown=${(e: Event) => e.stopPropagation()}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                ${this.fullscreenOpen
                  ? html`<path
                      fill="currentColor"
                      d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"
                    />`
                  : html`<path
                      fill="currentColor"
                      d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
                    />`}
              </svg>
            </button>`
          : nothing}

        ${this.showHint && !this.hintHidden && interactive
          ? html`<p
              class=${classMap({
                'amm-hint': true,
                'amm-hint--hidden': this.hintHidden,
              })}
            >
              ${hint}
            </p>`
          : nothing}

        ${interactive ? this.renderStageNav() : nothing}

        ${mode === 'sequence' ? this.renderCaption(this.currentFrame) : nothing}
      </div>
    `;
  }

  private renderStageNav() {
    if (!this.showControls) return nothing;
    const seq = this.mode === 'sequence';
    const label = seq
      ? `${this.frameIndex + 1} / ${this.frames.length}`
      : `${Math.floor(this.videoTime)}s / ${Math.floor(this.videoDuration || 0)}s`;

    // Fixed LTR control order: left = previous, right = next (avoids RTL flip)
    return html`
      <div
        class="amm-stage-nav"
        dir="ltr"
        @pointerdown=${(e: Event) => e.stopPropagation()}
      >
        <button
          type="button"
          class="amm-arrow"
          aria-label=${t('السابق', 'Previous')}
          @click=${() => this.step(-1)}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
              fill="currentColor"
              d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"
            />
          </svg>
        </button>
        ${this.showFrameNum
          ? html`<span class="amm-stage-nav__count" aria-live="polite"
              >${label}</span
            >`
          : nothing}
        <button
          type="button"
          class="amm-arrow"
          aria-label=${t('التالي', 'Next')}
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

  private renderControls() {
    if (!this.showProgress) return nothing;
    const seq = this.mode === 'sequence';
    const multi = seq ? this.interactiveSequence : Boolean(this.videoDuration);
    if (!multi) return nothing;

    return html`
      <div class="amm-controls">
        <div class="amm-progress-wrap">
          <div
            class="amm-progress"
            role="slider"
            tabindex="0"
            aria-valuemin="0"
            aria-valuemax=${this.progressMax()}
            aria-valuenow=${this.progressNow()}
            aria-label=${t('شريط التقدم', 'Progress')}
            @keydown=${this.onProgressKey}
            @pointerdown=${this.onProgressPointer}
          >
            <div class="amm-progress__track">
              <span class="amm-progress__fill"></span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private renderPanel() {
    if (!this.showPanel) return nothing;
    const info = this.info;
    const hasText =
      info.name ||
      info.desc ||
      info.fabric ||
      info.cut ||
      info.sleeves ||
      info.product_url;
    if (!hasText && !info.meters.length) return nothing;

    return html`
      <aside class="amm-panel" aria-label=${t('معلومات العباية', 'Abaya details')}>
        ${info.name ? html`<h3 class="amm-panel__name">${info.name}</h3>` : nothing}
        ${info.desc ? html`<p class="amm-panel__desc">${info.desc}</p>` : nothing}
        <div class="amm-meta">
          ${info.fabric
            ? html`<div class="amm-meta__row">
                <span class="amm-meta__label">${t('الخامة', 'Fabric')}</span>
                <span class="amm-meta__value">${info.fabric}</span>
              </div>`
            : nothing}
          ${info.cut
            ? html`<div class="amm-meta__row">
                <span class="amm-meta__label">${t('القصة', 'Cut')}</span>
                <span class="amm-meta__value">${info.cut}</span>
              </div>`
            : nothing}
          ${info.sleeves
            ? html`<div class="amm-meta__row">
                <span class="amm-meta__label">${t('الأكمام', 'Sleeves')}</span>
                <span class="amm-meta__value">${info.sleeves}</span>
              </div>`
            : nothing}
        </div>
        ${info.meters.length
          ? html`<div
              class="amm-meters"
              aria-label=${t('مستويات الخصائص', 'Characteristic levels')}
            >
              ${info.meters.map((m) => this.renderMeter(m.name, m.value))}
            </div>`
          : nothing}
        ${isValidHref(info.product_url)
          ? html`<a class="fs-btn" href=${info.product_url}>
              ${info.product_btn || t('عرض المنتج', 'View product')}
            </a>`
          : nothing}
      </aside>
    `;
  }

  private renderViewerBlock() {
    return html`
      <div class="amm-viewer">
        ${this.renderStage()}
        ${this.renderControls()}
      </div>
    `;
  }

  render() {
    if (!this.hasContent) return nothing;

    const c = this.config || {};
    const theme = readSectionTheme(c, 'amm_');
    const animate = theme.animate && !prefersReducedMotion();
    const panelSide = parsePanelSide(c.amm_panel_side);
    const title = localizedString(c.amm_title as string);
    const sectionDesc = localizedString(c.amm_section_desc as string);

    const shellClass = {
      'amm-shell': true,
      'amm-shell--side': this.showPanel && panelSide !== 'bottom',
      'amm-shell--side-left': this.showPanel && panelSide === 'left',
    };

    const body = html`
      <div class=${classMap(shellClass)}>
        ${this.renderViewerBlock()}
        ${this.renderPanel()}
      </div>
    `;

    return html`
      <section
        class=${classMap({
          'fs-section': true,
          'fs-animate': animate,
        })}
        style=${styleMap(this.designVars())}
        aria-label=${title || t('مرآة حركة العباية', 'Abaya motion mirror')}
      >
        <div class="fs-container">
          ${title || sectionDesc
            ? html`<header class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${sectionDesc
                  ? html`<p class="fs-desc">${sectionDesc}</p>`
                  : nothing}
              </header>`
            : nothing}
          ${body}
        </div>
      </section>
    `;
  }
}
