import { css } from 'lit';

export const componentStyles = css`
  .stba-shell {
    position: relative;
  }

  .stba-pairs {
    display: grid;
    gap: 1.75rem;
  }

  .stba-compare {
    border-radius: calc(var(--section-radius, 16px) * 0.95);
    overflow: hidden;
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #e8ddd6);
    box-shadow: 0 14px 34px rgba(43, 33, 28, 0.07);
  }

  .fs-animate .stba-compare {
    animation: stba-rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .fs-animate .stba-compare:nth-child(2) { animation-delay: 0.1s; }
  .fs-animate .stba-compare:nth-child(3) { animation-delay: 0.18s; }

  @keyframes stba-rise {
    from {
      opacity: 0;
      transform: translateY(18px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  .stba-slider {
    position: relative;
    aspect-ratio: 16 / 10;
    min-height: 240px;
    overflow: hidden;
    touch-action: none;
    cursor: ew-resize;
    user-select: none;
    background: #1a1210;
  }

  .stba-slider__img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
  }

  .stba-slider__img--after {
    position: absolute;
    inset: 0;
  }

  .stba-slider__before {
    position: absolute;
    inset-block: 0;
    inset-inline-start: 0;
    overflow: hidden;
    z-index: 1;
  }

  .stba-slider__before .stba-slider__img {
    position: absolute;
    inset-block: 0;
    inset-inline-start: 0;
    width: var(--stba-full, 100cqw);
    max-width: none;
    height: 100%;
  }

  .stba-slider {
    container-type: inline-size;
  }

  .stba-slider__before .stba-slider__img {
    width: 100cqw;
  }

  .stba-slider__label {
    position: absolute;
    z-index: 2;
    bottom: 0.85rem;
    padding: 0.3rem 0.7rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.92);
    color: var(--text-color, #2b211c);
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    pointer-events: none;
  }

  .stba-slider__label--before {
    inset-inline-start: 0.85rem;
  }

  .stba-slider__label--after {
    inset-inline-end: 0.85rem;
  }

  .stba-handle {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 3;
    width: 2.75rem;
    margin-inline-start: -1.375rem;
    display: grid;
    place-items: center;
    cursor: grab;
    touch-action: none;
  }

  .stba-handle:active {
    cursor: grabbing;
  }

  .stba-handle__line {
    position: absolute;
    inset-block: 0;
    width: 2px;
    background: rgba(255, 255, 255, 0.92);
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.25);
  }

  .stba-handle__knob {
    position: relative;
    z-index: 1;
    width: 2.55rem;
    height: 2.55rem;
    border-radius: 999px;
    display: grid;
    place-items: center;
    background: #fff;
    color: var(--accent-color, var(--fs-store-primary));
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.22);
    font-size: 0.85rem;
  }

  .stba-caption {
    margin: 0;
    padding: 0.9rem 1.15rem;
    text-align: center;
    font-size: 0.9rem;
    color: var(--muted-color, #7a6a62);
    border-top: 1px solid var(--border-color, #e8ddd6);
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 5%, var(--card-bg, #fff));
  }

  @media (max-width: 639px) {
    .stba-slider {
      aspect-ratio: 4 / 5;
      min-height: 280px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .stba-compare {
      animation: none !important;
    }
  }
`;
