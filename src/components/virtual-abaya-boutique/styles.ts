import { css } from 'lit';

export const componentStyles = css`
  .vab-shell {
    display: grid;
    gap: 1.25rem;
  }

  @media (min-width: 960px) {
    .vab-shell {
      grid-template-columns: minmax(0, 1.15fr) minmax(18rem, 0.95fr);
      align-items: stretch;
      gap: 1.5rem;
    }
  }

  .vab-map-panel {
    position: relative;
    border-radius: var(--section-radius, 18px);
    overflow: hidden;
    background:
      radial-gradient(circle at 20% 10%, color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 16%, transparent), transparent 46%),
      var(--card-bg, #ffffff);
    border: 1px solid var(--border-color, #e5e7eb);
    box-shadow: 0 16px 40px color-mix(in srgb, var(--text-color, #000) 10%, transparent);
    min-height: 280px;
  }

  .vab-map {
    display: block;
    width: 100%;
    height: 100%;
    min-height: 280px;
    max-height: 560px;
    object-fit: cover;
    aspect-ratio: 4 / 5;
  }

  @media (min-width: 960px) {
    .vab-map {
      aspect-ratio: 3 / 4;
      max-height: none;
      min-height: 440px;
    }
  }

  .vab-map-veil {
    pointer-events: none;
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      color-mix(in srgb, var(--text-color, #000) 10%, transparent) 0%,
      rgba(43, 33, 28, 0.02) 35%,
      rgba(43, 33, 28, 0.28) 100%
    );
  }

  .vab-map-caption {
    position: absolute;
    inset-inline: 1rem;
    bottom: 1rem;
    z-index: 2;
    color: #fff;
    text-shadow: 0 2px 14px rgba(0, 0, 0, 0.35);
  }

  .vab-map-caption strong {
    display: block;
    font-size: 1rem;
    margin-bottom: 0.15rem;
  }

  .vab-map-caption span {
    font-size: 0.82rem;
    opacity: 0.92;
  }

  .vab-hotspot {
    position: absolute;
    z-index: 3;
    width: 2.75rem;
    height: 2.75rem;
    margin: -1.375rem 0 0 -1.375rem;
    border: 2px solid rgba(255, 255, 255, 0.95);
    border-radius: 50%;
    background: var(--spot-color, var(--accent-color, var(--fs-store-primary)));
    box-shadow:
      0 0 0 6px color-mix(in srgb, var(--spot-color, #8b5e4b) 18%, transparent),
      0 8px 20px rgba(43, 33, 28, 0.28);
    cursor: pointer;
    transition: transform 0.22s ease, box-shadow 0.22s ease;
    color: #fff;
    font: inherit;
    font-size: 0.72rem;
    font-weight: 700;
  }

  .vab-hotspot:hover,
  .vab-hotspot[aria-pressed='true'] {
    transform: scale(1.1);
    box-shadow:
      0 0 0 8px color-mix(in srgb, var(--spot-color, #8b5e4b) 24%, transparent),
      0 10px 24px rgba(43, 33, 28, 0.32);
  }

  .vab-hotspot--pulse.fs-animate::after {
    content: '';
    position: absolute;
    inset: -7px;
    border-radius: inherit;
    border: 2px solid var(--spot-color, var(--accent-color, var(--fs-store-primary)));
    animation: vab-pulse 2s ease-out infinite;
  }

  @keyframes vab-pulse {
    0% {
      transform: scale(0.9);
      opacity: 0.85;
    }
    100% {
      transform: scale(1.7);
      opacity: 0;
    }
  }

  .vab-hotspot__index {
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
  }

  .vab-gallery {
    display: grid;
    gap: 0.85rem;
    align-content: start;
  }

  .vab-gallery__head {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .vab-gallery__head h3 {
    margin: 0;
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--text-color, #000000);
  }

  .vab-gallery__count {
    font-size: 0.8rem;
    color: var(--muted-color, #666666);
  }

  .vab-cards {
    display: grid;
    gap: 0.85rem;
  }

  .vab-card {
    position: relative;
    display: grid;
    grid-template-columns: 5.5rem minmax(0, 1fr);
    gap: 0.85rem;
    padding: 0.85rem;
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: calc(var(--section-radius, 18px) * 0.75);
    background: var(--card-bg, #ffffff);
    box-shadow: 0 8px 24px rgba(43, 33, 28, 0.05);
    cursor: pointer;
    text-align: start;
    color: inherit;
    font: inherit;
    transition:
      border-color 0.2s ease,
      transform 0.2s ease,
      box-shadow 0.2s ease,
      background 0.2s ease;
  }

  .vab-card:hover {
    transform: translateY(-2px);
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, var(--border-color, #e5e7eb));
  }

  .vab-card--active {
    border-color: var(--accent-color, var(--fs-store-primary));
    background:
      linear-gradient(
        135deg,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, var(--card-bg, #ffffff)),
        var(--card-bg, #ffffff) 55%
      );
    box-shadow: 0 14px 32px color-mix(in srgb, var(--text-color, #000) 12%, transparent);
  }

  .vab-card__media {
    position: relative;
    width: 5.5rem;
    aspect-ratio: 3 / 4;
    overflow: hidden;
    border-radius: calc(var(--section-radius, 18px) * 0.55);
    background: color-mix(in srgb, var(--border-color, #e5e7eb) 55%, transparent);
  }

  .vab-card__media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .vab-card__dot {
    position: absolute;
    top: 0.4rem;
    inset-inline-start: 0.4rem;
    width: 0.65rem;
    height: 0.65rem;
    border-radius: 50%;
    border: 1.5px solid #fff;
    background: var(--spot-color, var(--accent-color, var(--fs-store-primary)));
  }

  .vab-card__body {
    display: grid;
    grid-template-rows: 1fr auto;
    align-content: stretch;
    gap: 0.65rem;
    min-width: 0;
  }

  .vab-card__text {
    display: grid;
    gap: 0.3rem;
    min-width: 0;
  }

  .vab-card__title {
    margin: 0;
    font-size: 0.98rem;
    font-weight: 700;
    color: var(--text-color, #000000);
  }

  .vab-card__desc {
    margin: 0;
    font-size: 0.82rem;
    line-height: 1.55;
    color: var(--muted-color, #666666);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .vab-card__actions {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.55rem;
    margin-top: 0;
    min-height: 2.25rem;
  }

  .vab-card__status {
    display: inline-flex;
    align-items: center;
    min-height: auto;
    padding: 0;
    border: none;
    border-radius: 0;
    background: transparent;
    color: var(--muted-color, #666666);
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    white-space: nowrap;
  }

  .vab-card__status--on {
    color: var(--accent-color, var(--fs-store-primary));
  }

  .vab-card__status--on::before {
    content: '';
    width: 0.4rem;
    height: 0.4rem;
    margin-inline-end: 0.4rem;
    border-radius: 50%;
    background: var(--accent-color, var(--fs-store-primary));
  }

  .vab-card__cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    min-height: 44px;
    padding: 0.45rem 0.95rem;
    border-radius: calc(var(--section-radius, 18px) * 0.4);
    background: var(--button-bg, var(--accent-color, var(--fs-store-primary)));
    color: var(--button-color, #fff);
    text-decoration: none;
    font-size: 0.8rem;
    font-weight: 600;
    white-space: nowrap;
    line-height: 1;
  }

  .vab-card__cta:hover {
    opacity: 0.92;
  }

  .vab-detail {
    margin-top: 0.25rem;
    padding: 1rem;
    border-radius: calc(var(--section-radius, 18px) * 0.8);
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 28%, var(--border-color, #e5e7eb));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 6%, var(--card-bg, #ffffff));
    display: grid;
    gap: 0.65rem;
    animation: vab-fade 0.35s ease;
  }

  .vab-detail__media {
    border-radius: calc(var(--section-radius, 18px) * 0.6);
    overflow: hidden;
    aspect-ratio: 16 / 10;
    background: var(--border-color, #e5e7eb);
  }

  .vab-detail__media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .vab-detail__title {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 700;
  }

  .vab-detail__desc {
    margin: 0;
    color: var(--muted-color, #666666);
    line-height: 1.65;
    font-size: 0.9rem;
  }

  .vab-detail__actions {
    display: grid;
    margin-top: 0.25rem;
  }

  .vab-detail__cta {
    width: 100%;
    justify-content: center;
    border-radius: calc(var(--section-radius, 18px) * 0.45);
  }

  .vab-detail__head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.6rem;
    margin-bottom: 0.15rem;
  }

  .vab-detail__title {
    font-size: 0.98rem;
    font-weight: 700;
    color: var(--text-color, #000000);
  }

  .vab-detail__count {
    flex: 0 0 auto;
    padding: 0.18rem 0.6rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #ffffff));
    color: var(--accent-color, var(--fs-store-primary));
    font-size: 0.72rem;
    font-weight: 700;
  }

  .vab-rail {
    position: relative;
    /* keep the slider strictly inside the detail panel */
    max-width: 100%;
    min-width: 0;
  }

  .vab-rail__nav {
    position: absolute;
    top: 42%;
    transform: translateY(-50%);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    padding: 0;
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 22%, var(--border-color, #e5e7eb));
    border-radius: 999px;
    background: color-mix(in srgb, var(--card-bg, #ffffff) 88%, transparent);
    color: var(--text-color, #000000);
    cursor: pointer;
    box-shadow: 0 6px 18px color-mix(in srgb, var(--text-color, #000) 18%, transparent);
    backdrop-filter: blur(8px);
    transition: background 0.2s, color 0.2s, transform 0.2s, box-shadow 0.2s;
  }

  .vab-rail__nav svg {
    width: 1rem;
    height: 1rem;
  }

  .vab-rail__nav:hover {
    background: var(--accent-color, var(--fs-store-primary));
    color: #fff;
    box-shadow: 0 10px 22px color-mix(in srgb, var(--text-color, #000) 26%, transparent);
  }

  .vab-rail__nav:active {
    transform: translateY(-50%) scale(0.92);
  }

  .vab-rail__nav:focus-visible {
    outline: 2px solid var(--accent-color, var(--fs-store-primary));
    outline-offset: 2px;
  }

  .vab-rail__nav--prev {
    inset-inline-start: 0.25rem;
  }

  .vab-rail__nav--next {
    inset-inline-end: 0.25rem;
  }

  /* mirror the chevrons for RTL reading direction */
  :host-context([dir='rtl']) .vab-rail__nav svg {
    transform: scaleX(-1);
  }

  .vab-products {
    display: none; /* product rail retired — commerce outcome handles recommendations */
    gap: 0.7rem;
    max-width: 100%;
    min-width: 0;
    overflow-x: hidden;
    padding: 0.2rem 0.15rem 0.5rem;
    scrollbar-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, transparent) transparent;
  }

  /* leave room for the arrows only when they are shown */
  .vab-rail.has-nav .vab-products {
    padding-inline: 2.4rem;
    scroll-padding-inline: 2.4rem;
  }

  .vab-products::-webkit-scrollbar {
    height: 6px;
  }

  .vab-products::-webkit-scrollbar-track {
    background: transparent;
  }

  .vab-products::-webkit-scrollbar-thumb {
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 40%, transparent);
    border-radius: 999px;
  }

  .vab-product-slot {
    flex: 0 0 clamp(9.5rem, 42%, 11.5rem);
    min-width: 0;
    display: flex;
    scroll-snap-align: start;
  }

  .vab-product-slot > .fs-product-card {
    width: 100%;
  }

  .vab-products__status {
    margin: 0;
    font-size: 0.82rem;
    color: var(--muted-color, #666666);
  }

  @keyframes vab-fade {
    from {
      opacity: 0;
      transform: translateY(6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 959px) {
    .vab-shell {
      gap: 1.1rem;
    }

    .vab-map-panel,
    .vab-map {
      min-height: 0;
      max-height: min(20rem, 48vh);
      aspect-ratio: 1 / 1;
    }

    .vab-map-caption {
      inset-inline: 0.75rem;
      bottom: 0.75rem;
      padding: 0.55rem 0.7rem;
    }

    .vab-map-caption strong {
      font-size: 0.9rem;
    }

    .vab-map-caption span {
      font-size: 0.72rem;
    }

    .vab-gallery__head h3 {
      font-size: 1.05rem;
    }

    .vab-card__actions {
      flex-wrap: wrap;
      gap: 0.45rem;
    }

    .vab-card__cta {
      margin-inline-start: auto;
    }

    .vab-detail {
      padding: 0.9rem;
    }
  }

  @media (max-width: 639px) {
    .vab-map-panel,
    .vab-map {
      max-height: min(16.5rem, 44vh);
    }

    .vab-product-slot {
      flex-basis: clamp(8.5rem, 62%, 10.5rem);
    }

    .vab-detail__title {
      font-size: 0.9rem;
    }

    .vab-card {
      grid-template-columns: 4.25rem minmax(0, 1fr);
      gap: 0.65rem;
      padding: 0.7rem;
    }

    .vab-card__media {
      width: 4.25rem;
    }

    .vab-card__body {
      gap: 0.5rem;
    }

    .vab-card__title {
      font-size: 0.92rem;
    }

    .vab-card__desc {
      font-size: 0.76rem;
      -webkit-line-clamp: 2;
    }

    .vab-card__actions {
      flex-direction: column;
      align-items: stretch;
    }

    .vab-card__cta {
      width: 100%;
      margin-inline-start: 0;
    }

    .vab-detail__actions .fs-btn {
      width: 100%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .vab-hotspot--pulse.fs-animate::after,
    .vab-card,
    .vab-detail {
      animation: none !important;
      transition: none !important;
    }

    .vab-card:hover {
      transform: none;
    }
  }
`;
