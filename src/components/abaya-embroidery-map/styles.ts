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
