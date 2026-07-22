import { css } from 'lit';

export const componentStyles = css`
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
    border: 1px solid var(--amm-viewer-border, var(--border-color, #e5e7eb));
    background: var(--amm-viewer-bg, #1a1614);
    box-shadow: var(--amm-shadow, 0 12px 36px color-mix(in srgb, var(--text-color, #000) 12%, transparent));
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
    background: var(--amm-info-bg, color-mix(in srgb, var(--card-bg, #ffffff) 92%, transparent));
    color: var(--text-color, #000000);
    box-shadow: 0 10px 24px color-mix(in srgb, var(--text-color, #000) 16%, transparent);
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
    color: var(--muted-color, #666666);
  }

  .amm-caption__link {
    display: inline-flex;
    margin-top: 0.45rem;
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--accent-color, var(--fs-store-primary));
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
    background: color-mix(in srgb, var(--border-color, #e5e7eb) 85%, transparent);
    overflow: hidden;
  }

  .amm-progress__fill {
    display: block;
    height: 100%;
    width: var(--amm-progress, 0%);
    background: var(--amm-progress-color, var(--accent-color, var(--fs-store-primary)));
    border-radius: inherit;
  }

  .amm-progress__meta {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--muted-color, #666666);
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
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: calc(var(--section-radius, 16px) * 0.45);
    background: var(--amm-control-bg, var(--card-bg, #ffffff));
    color: var(--text-color, #000000);
    font: inherit;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease;
  }

  .amm-btn:hover {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, var(--border-color, #e5e7eb));
  }

  .amm-btn--primary {
    background: var(--button-bg, var(--accent-color, var(--fs-store-primary)));
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
    border: 1px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #ffffff);
    min-width: 0;
  }

  .amm-panel__name {
    margin: 0;
    font-size: clamp(1.35rem, 2.5vw, 1.75rem);
    font-weight: 700;
    line-height: 1.3;
    color: var(--text-color, #000000);
  }

  .amm-panel__desc {
    margin: 0;
    font-size: 0.92rem;
    line-height: 1.7;
    color: var(--muted-color, #666666);
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
    color: var(--muted-color, #666666);
  }

  .amm-meta__value {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-color, #000000);
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
    background: color-mix(in srgb, var(--border-color, #e5e7eb) 80%, transparent);
    overflow: hidden;
  }

  .amm-meter__bar > span {
    display: block;
    height: 100%;
    background: var(--accent-color, var(--fs-store-primary));
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
      border: 1px solid var(--border-color, #e5e7eb);
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
`;
