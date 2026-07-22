import { css } from 'lit';

export const componentStyles = css`
  .sv-shell {
    position: relative;
    isolation: isolate;
  }

  .sv-shell::before {
    content: '';
    position: absolute;
    inset: 8% 5% auto;
    height: 55%;
    z-index: -1;
    border-radius: 50%;
    background: radial-gradient(
      ellipse at center,
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 22%, transparent),
      transparent 70%
    );
    filter: blur(28px);
    pointer-events: none;
  }

  .sv-header {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .sv-eyebrow {
    display: inline-block;
    margin: 0 0 0.55rem;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--accent-color, var(--fs-store-primary));
  }

  .sv-title {
    margin: 0;
    font-size: clamp(1.75rem, 3.4vw, 2.55rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.15;
    color: var(--text-color, #000000);
  }

  .sv-title-line {
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

  .sv-desc {
    margin: 0.9rem auto 0;
    max-width: 34rem;
    color: var(--muted-color, #666666);
    font-size: 0.95rem;
    line-height: 1.75;
  }

  .sv-stage {
    position: relative;
    max-width: 100%;
    min-width: 0;
    overflow: hidden;
    padding-inline: 2.75rem;
  }

  .sv-nav {
    position: absolute;
    top: 42%;
    z-index: 3;
    transform: translateY(-50%);
    width: 2.6rem;
    height: 2.6rem;
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 80%, transparent);
    border-radius: 999px;
    display: grid;
    place-items: center;
    background: color-mix(in srgb, var(--card-bg, #ffffff) 92%, transparent);
    color: var(--text-color, #000000);
    box-shadow: 0 10px 24px color-mix(in srgb, var(--text-color, #000) 10%, transparent);
    cursor: pointer;
    backdrop-filter: blur(8px);
    transition: transform 0.2s ease, background 0.2s ease, opacity 0.2s ease;
  }

  .sv-nav:hover {
    transform: translateY(-50%) scale(1.06);
    background: var(--card-bg, #ffffff);
  }

  .sv-nav:disabled,
  .sv-nav.swiper-button-disabled {
    opacity: 0.35;
    cursor: default;
    transform: translateY(-50%);
    pointer-events: none;
  }

  .sv-nav--prev {
    inset-inline-start: 0;
  }

  .sv-nav--next {
    inset-inline-end: 0;
  }

  .sv-swiper {
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    padding: 1.1rem 0 0.35rem;
  }

  .sv-slide {
    width: clamp(148px, 30vw, 210px);
    height: auto;
  }

  .sv-card {
    --sv-tilt: 0deg;
    width: 100%;
    transform: perspective(900px) rotateY(var(--sv-tilt));
    transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease;
    opacity: 0.72;
  }

  .sv-slide.is-focus .sv-card,
  .sv-slide.swiper-slide-active .sv-card {
    --sv-tilt: 0deg;
    opacity: 1;
    z-index: 1;
  }

  .sv-slide:not(.is-focus):not(.swiper-slide-active) .sv-card {
    --sv-tilt: -4deg;
  }

  .sv-slide:nth-child(even):not(.is-focus):not(.swiper-slide-active) .sv-card {
    --sv-tilt: 4deg;
  }

  .sv-pagination {
    display: flex;
    justify-content: center;
    gap: 0.35rem;
    margin-top: 0.55rem;
    min-height: 0.7rem;
  }

  .sv-pagination .swiper-pagination-bullet {
    width: 0.45rem;
    height: 0.45rem;
    margin: 0 !important;
    opacity: 1;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 28%, #ddd);
  }

  .sv-pagination .swiper-pagination-bullet-active {
    width: 1.35rem;
    border-radius: 999px;
    background: var(--accent-color, var(--fs-store-primary));
  }

  .fs-animate .sv-card {
    animation: sv-rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .fs-animate .sv-slide:nth-child(1) .sv-card { animation-delay: 0.05s; }
  .fs-animate .sv-slide:nth-child(2) .sv-card { animation-delay: 0.12s; }
  .fs-animate .sv-slide:nth-child(3) .sv-card { animation-delay: 0.19s; }
  .fs-animate .sv-slide:nth-child(4) .sv-card { animation-delay: 0.26s; }
  .fs-animate .sv-slide:nth-child(5) .sv-card { animation-delay: 0.33s; }
  .fs-animate .sv-slide:nth-child(6) .sv-card { animation-delay: 0.4s; }

  @keyframes sv-rise {
    from {
      opacity: 0;
      transform: translateY(28px) scale(0.94);
    }
    to {
      opacity: 0.72;
      transform: perspective(900px) rotateY(var(--sv-tilt));
    }
  }

  .sv-thumb {
    position: relative;
    display: block;
    width: 100%;
    aspect-ratio: 9 / 16;
    border: 0;
    padding: 0;
    border-radius: calc(var(--section-radius, 16px) * 0.95);
    overflow: hidden;
    cursor: pointer;
    background: #1a1210;
    box-shadow: 0 16px 34px color-mix(in srgb, var(--text-color, #000) 16%, transparent);
    transition: box-shadow 0.35s ease, transform 0.35s ease;
  }

  .sv-card.is-focus .sv-thumb,
  .sv-slide.swiper-slide-active .sv-thumb {
    transform: translateY(-6px) scale(1.03);
    box-shadow:
      0 0 0 2px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 55%, transparent),
      0 22px 44px color-mix(in srgb, var(--text-color, #000) 18%, transparent);
  }

  .sv-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .sv-thumb:hover img,
  .sv-thumb:focus-visible img,
  .sv-slide.is-focus .sv-thumb img,
  .sv-slide.swiper-slide-active .sv-thumb img {
    transform: scale(1.06);
  }

  .sv-film {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.08), transparent 22%),
      linear-gradient(180deg, transparent 55%, rgba(12, 8, 6, 0.72));
  }

  .sv-film::after {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0;
    background: linear-gradient(
      115deg,
      transparent 35%,
      rgba(255, 255, 255, 0.18) 48%,
      transparent 62%
    );
    transform: translateX(-40%);
    transition: opacity 0.2s ease;
  }

  .sv-thumb:hover .sv-film::after,
  .sv-card.is-focus .sv-film::after {
    opacity: 1;
    animation: sv-shine 1.4s ease;
  }

  @keyframes sv-shine {
    from { transform: translateX(-55%); }
    to { transform: translateX(55%); }
  }

  .sv-play {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    pointer-events: none;
  }

  .sv-play__btn {
    position: relative;
    width: 3.15rem;
    height: 3.15rem;
    border-radius: 999px;
    display: grid;
    place-items: center;
    background: color-mix(in srgb, var(--card-bg, #ffffff) 92%, var(--fs-surface, #f0f0f0));
    color: var(--accent-color, var(--fs-store-primary));
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.22);
    transition: transform 0.25s ease;
  }

  .sv-play__btn::before,
  .sv-play__btn::after {
    content: '';
    position: absolute;
    inset: -6px;
    border-radius: inherit;
    border: 1.5px solid rgba(255, 255, 255, 0.55);
    animation: sv-pulse 2.4s ease-out infinite;
  }

  .sv-play__btn::after {
    animation-delay: 0.8s;
  }

  .sv-card.is-focus .sv-play__btn {
    transform: scale(1.08);
  }

  .sv-thumb:hover .sv-play__btn {
    transform: scale(1.12);
  }

  @keyframes sv-pulse {
    0% {
      transform: scale(0.92);
      opacity: 0.7;
    }
    100% {
      transform: scale(1.35);
      opacity: 0;
    }
  }

  .sv-play__btn i {
    font-size: 1.15rem;
    margin-inline-start: 2px;
  }

  .sv-index {
    position: absolute;
    top: 0.65rem;
    inset-inline-start: 0.65rem;
    padding: 0.2rem 0.5rem;
    border-radius: 999px;
    background: rgba(18, 12, 10, 0.45);
    color: #fff;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    backdrop-filter: blur(6px);
  }

  .sv-caption {
    margin: 0.7rem 0 0;
    font-size: 0.88rem;
    font-weight: 700;
    text-align: center;
    color: var(--text-color, #000000);
    line-height: 1.35;
    transition: color 0.25s ease;
  }

  .sv-slide.is-focus .sv-caption,
  .sv-slide.swiper-slide-active .sv-caption {
    color: var(--accent-color, var(--fs-store-primary));
  }

  .sv-empty {
    padding: 2.25rem 1rem;
    text-align: center;
    color: var(--muted-color, #666666);
    border: 1px dashed var(--border-color, #e5e7eb);
    border-radius: var(--section-radius, 16px);
    background: color-mix(in srgb, var(--card-bg, #ffffff) 70%, transparent);
  }

  .sv-modal {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: grid;
    place-items: center;
    padding: 1rem;
    background: rgba(12, 8, 6, 0.82);
    backdrop-filter: blur(8px);
    animation: sv-fade 0.22s ease;
  }

  @keyframes sv-fade {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .sv-modal__panel {
    position: relative;
    width: min(420px, 100%);
    aspect-ratio: 9 / 16;
    max-height: min(88vh, 760px);
    background: #000;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 28px 70px rgba(0, 0, 0, 0.5);
    animation: sv-pop 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  }

  @keyframes sv-pop {
    from {
      opacity: 0;
      transform: translateY(18px) scale(0.94);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  .sv-modal__panel iframe,
  .sv-modal__panel video,
  .sv-modal__panel img {
    width: 100%;
    height: 100%;
    border: 0;
    display: block;
    object-fit: cover;
  }

  .sv-modal__close {
    position: absolute;
    top: 0.7rem;
    inset-inline-end: 0.7rem;
    z-index: 2;
    width: 2.35rem;
    height: 2.35rem;
    border: 0;
    border-radius: 999px;
    background: color-mix(in srgb, var(--card-bg, #ffffff) 92%, var(--fs-surface, #f0f0f0));
    color: #000000;
    cursor: pointer;
    font-size: 1.15rem;
    line-height: 1;
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.2);
  }

  .sv-modal__cap {
    position: absolute;
    inset-inline: 0;
    bottom: 0;
    z-index: 2;
    margin: 0;
    padding: 1.4rem 1rem 1rem;
    color: #fff;
    font-size: 0.95rem;
    font-weight: 700;
    background: linear-gradient(180deg, transparent, rgba(10, 6, 4, 0.78));
  }

  .sv-modal__nav {
    position: absolute;
    top: 50%;
    z-index: 2;
    transform: translateY(-50%);
    width: 2.2rem;
    height: 2.2rem;
    border: 0;
    border-radius: 999px;
    display: grid;
    place-items: center;
    background: color-mix(in srgb, var(--card-bg, #ffffff) 92%, var(--fs-surface, #f0f0f0));
    color: #000000;
    cursor: pointer;
  }

  .sv-modal__nav--prev {
    inset-inline-start: 0.55rem;
  }

  .sv-modal__nav--next {
    inset-inline-end: 0.55rem;
  }

  @media (max-width: 767px) {
    .sv-stage {
      padding-inline: 0;
    }

    .sv-nav {
      display: none;
    }

    .sv-slide {
      width: clamp(150px, 58vw, 210px);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .sv-card,
    .sv-thumb,
    .sv-thumb img,
    .sv-play__btn,
    .sv-modal,
    .sv-modal__panel,
    .sv-dot {
      animation: none !important;
      transition: none !important;
    }

    .sv-card {
      opacity: 1;
      transform: none;
    }

    .sv-play__btn::before,
    .sv-play__btn::after,
    .sv-film::after {
      display: none;
    }
  }
`;
