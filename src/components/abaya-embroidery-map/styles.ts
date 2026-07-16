import { css } from 'lit';

export const componentStyles = css`
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
    min-height: 2.6rem;
    text-align: center;
    font-size: 0.88rem;
    font-weight: 600;
    color: var(--muted-color, #7a6a62);
    line-height: 1.55;
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
    background: var(--aem-stage-bg, #f3ece7);
    border: 1px solid var(--border-color, #e8ddd6);
    box-shadow: var(--aem-shadow, 0 10px 28px rgba(43, 33, 28, 0.08));
    overflow: hidden;
  }

  .aem-stage__ornament {
    position: absolute;
    inset: 8%;
    border: 1px solid color-mix(in srgb, var(--accent-color, #8b5e4b) 22%, transparent);
    border-radius: calc(var(--section-radius, 16px) * 0.7);
    pointer-events: none;
    opacity: 0.55;
  }

  .aem-stage__img-wrap {
    position: absolute;
    inset: 0;
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
    inset: 0;
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
    color: var(--aem-spot-color, var(--accent-color, #8b5e4b));
  }

  .aem-spot:focus {
    outline: none;
  }

  .aem-spot:focus-visible .aem-spot__ring {
    outline: 2px solid var(--aem-active, var(--accent-color, #8b5e4b));
    outline-offset: 3px;
  }

  .aem-spot__ring {
    position: relative;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 2px solid currentColor;
    background: color-mix(in srgb, var(--card-bg, #fff) 88%, transparent);
    display: grid;
    place-items: center;
    box-shadow: 0 4px 14px rgba(43, 33, 28, 0.16);
    transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
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
    font-weight: 700;
    color: var(--text-color, #2b211c);
    line-height: 1;
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
    transform: scale(1.12);
    border-color: var(--aem-active, var(--accent-color, #8b5e4b));
    box-shadow: 0 6px 18px color-mix(in srgb, var(--aem-active, #8b5e4b) 35%, transparent);
    color: var(--aem-active, var(--accent-color, #8b5e4b));
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
    background: var(--card-bg, #fff);
    color: var(--text-color, #2b211c);
    border: 1px solid var(--border-color, #e8ddd6);
    font-size: 0.72rem;
    font-weight: 600;
    box-shadow: 0 6px 16px rgba(43, 33, 28, 0.1);
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
    stroke: var(--aem-active, var(--accent-color, #8b5e4b));
    stroke-width: 2.1;
    opacity: 1;
  }

  .aem-desk--dim .aem-line--active,
  .aem-desk--dim .aem-line--hover {
    opacity: 1;
  }

  .aem-card {
    position: relative;
    background: var(--card-bg, #fff);
    border: 1px solid var(--aem-card-border, var(--border-color, #e8ddd6));
    border-radius: var(--section-radius, 16px);
    box-shadow: var(--aem-shadow, 0 10px 28px rgba(43, 33, 28, 0.08));
    padding: 0.75rem;
    display: grid;
    gap: 0.55rem;
    min-width: 0;
    cursor: pointer;
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease,
      transform 0.22s ease,
      opacity 0.28s ease;
    text-align: start;
  }

  .aem-card:focus {
    outline: none;
  }

  .aem-card:focus-visible {
    outline: 2px solid var(--aem-active, var(--accent-color, #8b5e4b));
    outline-offset: 2px;
  }

  .aem-card--active,
  .aem-card--hover {
    border-color: var(--aem-active, var(--accent-color, #8b5e4b));
    box-shadow: 0 12px 32px color-mix(in srgb, var(--aem-active, #8b5e4b) 18%, transparent);
  }

  .aem-card--featured {
    padding: 0.9rem;
    transform: scale(1.02);
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

  .aem-card__zoom:focus-visible {
    outline: 2px solid var(--aem-active, #8b5e4b);
    outline-offset: -2px;
  }

  .aem-badge {
    display: inline-flex;
    align-self: start;
    padding: 0.2rem 0.55rem;
    border-radius: 999px;
    font-size: 0.7rem;
    font-weight: 700;
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 14%, #fff);
    color: var(--accent-color, #8b5e4b);
  }

  .aem-card__title {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 700;
    line-height: 1.35;
    color: var(--text-color, #2b211c);
  }

  .aem-card__desc {
    margin: 0;
    font-size: 0.82rem;
    line-height: 1.55;
    color: var(--muted-color, #7a6a62);
  }

  .aem-meta {
    display: grid;
    gap: 0.25rem;
    font-size: 0.78rem;
    color: var(--muted-color, #7a6a62);
  }

  .aem-meta strong {
    color: var(--text-color, #2b211c);
    font-weight: 600;
  }

  .aem-card__link {
    justify-self: start;
    min-height: 40px;
    padding: 0.45rem 0.9rem;
    font-size: 0.82rem;
  }

  .aem-clear {
    display: inline-flex;
    margin-inline: auto;
    min-height: 40px;
    padding: 0.4rem 0.9rem;
    border: 1px solid var(--border-color, #e8ddd6);
    border-radius: calc(var(--section-radius, 16px) * 0.55);
    background: transparent;
    color: var(--muted-color, #7a6a62);
    font: inherit;
    font-size: 0.85rem;
    cursor: pointer;
  }

  .aem-clear:focus-visible {
    outline: 2px solid var(--aem-active, #8b5e4b);
    outline-offset: 2px;
  }

  .aem-mobile__live {
    min-height: 1.25rem;
    text-align: center;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-color, #2b211c);
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
    border: 1px solid var(--border-color, #e8ddd6);
    background: var(--card-bg, #fff);
    color: var(--text-color, #2b211c);
    font: inherit;
    cursor: pointer;
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
    background: rgba(24, 18, 15, 0.55);
  }

  .aem-dialog__inner {
    background: var(--card-bg, #fff);
    border-radius: var(--section-radius, 16px);
    padding: 1rem;
    display: grid;
    gap: 0.75rem;
    color: var(--text-color, #2b211c);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.28);
  }

  .aem-dialog__close {
    justify-self: end;
    min-width: 40px;
    min-height: 40px;
    border: none;
    border-radius: 50%;
    background: color-mix(in srgb, var(--muted-color, #7a6a62) 12%, #fff);
    color: var(--text-color, #2b211c);
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
    color: var(--muted-color, #7a6a62);
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
