import { css } from 'lit';

export const componentStyles = css`
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
    border: 1px solid var(--border-color, #e8ddd6);
    background: var(--als-stage-bg, #1a1614);
    box-shadow: var(--als-shadow, 0 12px 36px rgba(43, 33, 28, 0.1));
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
    border: 1px solid var(--border-color, #e8ddd6);
    background: color-mix(in srgb, var(--card-bg, #fff) 92%, var(--section-bg, #faf7f5));
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
    color: var(--text-color, #2b211c);
    line-height: 1.35;
  }

  .als-caption__desc {
    margin: 0;
    font-size: 0.86rem;
    line-height: 1.6;
    color: var(--muted-color, #7a6a62);
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
    background: color-mix(in srgb, var(--border-color, #e8ddd6) 35%, transparent);
  }

  .als-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 40px;
    min-height: 40px;
    padding: 0.4rem 0.75rem;
    border: 1px solid var(--border-color, #e8ddd6);
    border-radius: calc(var(--section-radius, 16px) * 0.4);
    background: var(--card-bg, #fff);
    color: var(--text-color, #2b211c);
    font: inherit;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    transition: border-color 0.2s ease, background 0.2s ease;
  }

  .als-btn:hover {
    border-color: color-mix(in srgb, var(--accent-color, #8b5e4b) 45%, var(--border-color, #e8ddd6));
  }

  .als-btn--primary {
    background: var(--button-bg, #8b5e4b);
    color: var(--button-color, #fff);
    border-color: transparent;
  }

  .als-btn--accent {
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 12%, #fff);
    color: var(--accent-color, #8b5e4b);
    border-color: color-mix(in srgb, var(--accent-color, #8b5e4b) 35%, var(--border-color, #e8ddd6));
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
    border: 1px solid var(--border-color, #e8ddd6);
    background: var(--als-panel-bg, var(--card-bg, #fff));
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
    color: var(--muted-color, #7a6a62);
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
    border: 1px solid var(--als-thumb-border, var(--border-color, #e8ddd6));
    border-radius: calc(var(--section-radius, 16px) * 0.45);
    background: color-mix(in srgb, var(--section-bg, #faf7f5) 65%, #fff);
    color: inherit;
    font: inherit;
    cursor: pointer;
    text-align: center;
    min-height: 44px;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
  }

  .als-mode:hover {
    border-color: color-mix(in srgb, var(--accent-color, #8b5e4b) 40%, var(--border-color, #e8ddd6));
  }

  .als-mode--active,
  .als-mode[aria-pressed='true'] {
    border-color: var(--accent-color, #8b5e4b);
    box-shadow: 0 0 0 1px var(--accent-color, #8b5e4b);
    background: #fff;
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
    color: var(--text-color, #2b211c);
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
    color: var(--muted-color, #7a6a62);
    margin-bottom: 0.2rem;
  }

  .als-info__value {
    margin: 0;
    font-size: 0.92rem;
    font-weight: 600;
    color: var(--text-color, #2b211c);
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
    color: var(--text-color, #2b211c);
  }

  .als-metric__val {
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  .als-metric__bar {
    height: 0.35rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #e8ddd6) 80%, transparent);
    overflow: hidden;
  }

  .als-metric__bar > span {
    display: block;
    height: 100%;
    width: 0;
    background: linear-gradient(
      90deg,
      color-mix(in srgb, var(--als-meter-color, var(--accent-color, #8b5e4b)) 75%, #fff),
      var(--als-meter-color, var(--accent-color, #8b5e4b))
    );
    border-radius: inherit;
    transition: width 0.45s ease;
  }

  .als-metric__level {
    margin-inline-start: 0.35rem;
    color: var(--muted-color, #7a6a62);
    font-weight: 500;
    font-size: 0.72rem;
  }

  .als-panel .fs-btn {
    width: 100%;
    justify-content: center;
  }

  .als-accordion {
    border: 1px solid var(--border-color, #e8ddd6);
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
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 7%, var(--card-bg, #fff));
    color: var(--text-color, #2b211c);
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
    border-top: 1px solid var(--border-color, #e8ddd6);
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
    color: var(--muted-color, #7a6a62);
  }

  .als-compare-pick select {
    min-height: 44px;
    padding: 0.5rem 0.7rem;
    border-radius: calc(var(--section-radius, 16px) * 0.4);
    border: 1px solid var(--border-color, #e8ddd6);
    background: var(--card-bg, #fff);
    color: var(--text-color, #2b211c);
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
    border: 1px solid var(--border-color, #e8ddd6);
    background: #111;
    touch-action: none;
    user-select: none;
    -webkit-user-select: none;
    cursor: col-resize;
    direction: ltr;
    box-shadow: var(--als-shadow, 0 12px 36px rgba(43, 33, 28, 0.1));
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
    background: var(--als-handle-color, var(--accent-color, #8b5e4b));
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
`;
