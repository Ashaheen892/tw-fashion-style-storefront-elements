import { css } from 'lit';

export const componentStyles = css`
  .stc-shell {
    position: relative;
  }

  .stc-header {
    text-align: center;
    margin-bottom: 1.55rem;
  }

  .stc-eyebrow {
    display: inline-block;
    margin: 0 0 0.55rem;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--accent-color, var(--fs-store-primary));
  }

  .stc-title {
    margin: 0;
    font-size: clamp(1.75rem, 3.4vw, 2.55rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.15;
    color: var(--text-color, #000000);
  }

  .stc-title-line {
    display: block;
    width: 4.5rem;
    height: 2px;
    margin: 0.85rem auto 0;
    background: linear-gradient(
      90deg,
      transparent,
      var(--accent-color, var(--fs-store-primary)),
      transparent
    );
  }

  .stc-desc {
    margin: 0.9rem auto 0;
    max-width: 34rem;
    color: var(--muted-color, #666666);
    font-size: 0.95rem;
    line-height: 1.75;
  }

  /* Grid layout */
  .stc-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1.15rem;
  }

  /* Slider layout (Swiper) */
  .stc-swiper {
    overflow: hidden;
  }

  .stc-swiper .swiper-slide {
    width: auto;
  }

  .stc-slide {
    width: min(72vw, 280px);
  }

  .stc-slide .stc-tile {
    width: 100%;
  }

  /* Tile */
  .stc-tile {
    position: relative;
    display: block;
    overflow: hidden;
    border-radius: calc(var(--section-radius, 16px) * 0.95);
    aspect-ratio: 3 / 4;
    text-decoration: none;
    cursor: pointer;
    background: #1a1210;
    box-shadow: 0 12px 28px color-mix(in srgb, var(--text-color, #000) 10%, transparent);
    transition:
      transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
      box-shadow 0.35s ease;
    outline: none;
  }

  .fs-animate .stc-tile {
    animation: stc-rise 0.65s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .fs-animate .stc-tile:nth-child(1) { animation-delay: 0.04s; }
  .fs-animate .stc-tile:nth-child(2) { animation-delay: 0.1s; }
  .fs-animate .stc-tile:nth-child(3) { animation-delay: 0.16s; }
  .fs-animate .stc-tile:nth-child(4) { animation-delay: 0.22s; }
  .fs-animate .stc-tile:nth-child(5) { animation-delay: 0.28s; }
  .fs-animate .stc-tile:nth-child(6) { animation-delay: 0.34s; }

  @keyframes stc-rise {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.97);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  .stc-tile:hover,
  .stc-tile:focus-visible {
    transform: translateY(-4px);
    box-shadow:
      0 0 0 2px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 30%, transparent),
      0 20px 44px color-mix(in srgb, var(--text-color, #000) 16%, transparent);
  }

  .stc-tile:focus-visible {
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, transparent);
  }

  .stc-tile__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .stc-tile:hover .stc-tile__img {
    transform: scale(1.06);
  }

  .stc-tile__shade {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 45%, rgba(14, 9, 7, 0.72));
    pointer-events: none;
  }

  .stc-tile__label {
    position: absolute;
    inset-inline-start: 1.15rem;
    inset-inline-end: 1.15rem;
    bottom: 1.15rem;
    margin: 0;
    color: #fff;
    font-size: clamp(0.95rem, 1.8vw, 1.25rem);
    font-weight: 700;
    letter-spacing: -0.01em;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.35);
    line-height: 1.3;
  }

  .stc-tile__rule {
    display: block;
    width: 2.8rem;
    height: 1.5px;
    margin-top: 0.55rem;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 85%, #fff);
    border: 0;
    border-radius: 1px;
  }

  .stc-empty {
    padding: 2.25rem 1rem;
    text-align: center;
    color: var(--muted-color, #666666);
    border: 1px dashed var(--border-color, #e5e7eb);
    border-radius: var(--section-radius, 16px);
  }

  @media (max-width: 639px) {
    .stc-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 0.75rem;
    }

    .stc-tile__label {
      font-size: 0.88rem;
      inset-inline-start: 0.85rem;
      bottom: 0.85rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .stc-tile,
    .stc-tile__img {
      animation: none !important;
      transition: none !important;
    }
  }
`;
