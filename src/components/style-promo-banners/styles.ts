import { css } from 'lit';

export const componentStyles = css`
  :host {
    direction: inherit;
  }

  .stpb-shell {
    position: relative;
  }

  /* Swiper carousel wrapper */
  .stpb-carousel {
    position: relative;
  }

  .stpb-swiper {
    position: relative;
    overflow: hidden;
    border-radius: calc(var(--section-radius, 16px) * 0.95);
  }

  .stpb-slide {
    height: auto;
  }

  /* Single banner — full-bleed magazine style */
  .stpb-banner {
    position: relative;
    display: flex;
    align-items: flex-end;
    min-height: min(55vw, 420px);
    overflow: hidden;
    background: #1a1210;
    box-shadow: 0 14px 32px rgba(43, 33, 28, 0.1);
  }

  .fs-animate .stpb-banner {
    animation: stpb-rise 0.65s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .fs-animate .stpb-banner:nth-child(2) {
    animation-delay: 0.12s;
  }
  .fs-animate .stpb-banner:nth-child(3) {
    animation-delay: 0.2s;
  }

  @keyframes stpb-rise {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  .stpb-banner__img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
    pointer-events: none;
  }

  .stpb-banner:hover .stpb-banner__img {
    transform: scale(1.04);
  }

  .stpb-banner__shade {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(14, 9, 7, 0.05) 0%,
      rgba(14, 9, 7, 0.55) 60%,
      rgba(14, 9, 7, 0.82) 100%
    );
    pointer-events: none;
  }

  .stpb-banner__content {
    position: relative;
    z-index: 1;
    padding: 2rem 2.25rem;
    max-width: 38rem;
  }

  .stpb-banner__headline {
    margin: 0 0 0.45rem;
    font-size: clamp(1.55rem, 3.2vw, 2.85rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1.15;
    color: #fff;
    font-family: Georgia, 'Times New Roman', serif;
  }

  .stpb-banner__subtitle {
    margin: 0 0 1rem;
    font-size: clamp(0.85rem, 1.5vw, 1.05rem);
    color: rgba(255, 255, 255, 0.82);
    line-height: 1.6;
    letter-spacing: 0.01em;
  }

  .stpb-banner__cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    min-height: 46px;
    padding: 0.7rem 1.35rem;
    border: 1.5px solid transparent;
    border-radius: 999px;
    background: var(--button-bg, var(--fs-store-primary));
    color: var(--button-color, #fff);
    font-size: 0.92rem;
    font-weight: 700;
    letter-spacing: 0.01em;
    line-height: 1.2;
    text-decoration: none;
    text-transform: none;
    cursor: pointer;
    box-shadow: 0 8px 20px
      color-mix(
        in srgb,
        var(--accent-color, var(--fs-store-primary)) 28%,
        transparent
      );
    transition: filter 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  }

  .stpb-banner__cta:hover {
    filter: brightness(1.05);
    transform: translateY(-1px);
    opacity: 1;
  }

  .stpb-banner__cta-arrow {
    font-size: 1rem;
    transition: transform 0.2s ease;
  }

  .stpb-banner__cta:hover .stpb-banner__cta-arrow {
    transform: translateX(-3px);
  }

  :host([dir='rtl']) .stpb-banner__cta:hover .stpb-banner__cta-arrow,
  :host(:dir(rtl)) .stpb-banner__cta:hover .stpb-banner__cta-arrow {
    transform: translateX(3px);
  }

  /* Pagination dots below carousel */
  .stpb-dots {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.4rem;
    margin-top: 0.75rem;
  }

  .stpb-dot {
    display: inline-block;
    width: 0.5rem;
    height: 0.5rem;
    min-width: 0;
    min-height: 0;
    padding: 0;
    margin: 0 !important;
    border: 0;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.45);
    cursor: pointer;
    opacity: 1;
    transition: width 0.2s ease, background 0.2s ease, transform 0.2s ease;
  }

  .stpb-dot.is-active {
    width: 1.1rem;
    background: var(--fs-surface, var(--card-bg, #f0f0f0));
    transform: scale(1.1);
  }

  @media (max-width: 639px) {
    .stpb-banner {
      min-height: 320px;
    }

    .stpb-banner__content {
      padding: 1.35rem 1.25rem;
    }

    .stpb-banner__headline {
      font-size: 1.45rem;
    }

    .stpb-dots {
      margin-top: 0.6rem;
      gap: 0.3rem;
    }

    .stpb-dot {
      width: 0.4rem;
      height: 0.4rem;
    }

    .stpb-dot.is-active {
      width: 0.85rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .stpb-banner,
    .stpb-banner__img,
    .stpb-banner__cta,
    .stpb-dot {
      animation: none !important;
      transition: none !important;
    }
  }
`;
