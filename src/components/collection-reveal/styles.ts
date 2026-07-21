import { css } from 'lit';

export const componentStyles = css`
  .cr-stage {
    position: relative;
    overflow: hidden;
    border-radius: var(--section-radius, 16px);
    min-height: 22rem;
  }

  .cr-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .cr-overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .cr-pre {
    position: relative;
    z-index: 2;
    display: grid;
    gap: 1.25rem;
    padding: clamp(1.5rem, 4vw, 2.5rem);
    text-align: center;
    align-content: center;
    min-height: 22rem;
  }

  .cr-mystery {
    width: min(12rem, 55vw);
    margin: 0 auto;
    border-radius: calc(var(--section-radius, 16px) * 0.75);
    box-shadow: 0 12px 36px rgba(43, 33, 28, 0.18);
  }

  .cr-mystery--breath.fs-animate {
    animation: cr-breath 3.2s ease-in-out infinite;
  }

  @keyframes cr-breath {
    0%,
    100% {
      transform: scale(1);
      opacity: 0.92;
    }
    50% {
      transform: scale(1.03);
      opacity: 1;
    }
  }

  .cr-pre-text {
    margin: 0;
    font-size: 0.88rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: color-mix(in srgb, #fff 88%, var(--muted-color, #7a6a62));
  }

  .cr-timer {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.65rem;
  }

  .cr-timer__unit {
    min-width: 4.5rem;
    padding: 0.75rem 0.5rem;
    border-radius: calc(var(--section-radius, 16px) * 0.55);
    background: color-mix(in srgb, var(--card-bg, #fff) 88%, transparent);
    border: 1px solid var(--border-color, #e8ddd6);
  }

  .cr-timer__value {
    display: block;
    font-size: 1.65rem;
    font-weight: 700;
    line-height: 1.1;
    color: var(--timer-color, var(--accent-color, var(--fs-store-primary)));
  }

  .cr-timer__label {
    display: block;
    margin-top: 0.2rem;
    font-size: 0.72rem;
    color: var(--muted-color, #7a6a62);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .cr-curtain {
    position: absolute;
    inset: 0;
    z-index: 5;
    background: linear-gradient(
      180deg,
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 92%, #000) 0%,
      color-mix(in srgb, var(--text-color, #2b211c) 88%, #000) 100%
    );
    transform: translateY(0);
    transition: transform 0.9s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
  }

  .cr-curtain--open {
    transform: translateY(-102%);
  }

  .cr-post {
    display: grid;
    gap: 1.5rem;
  }

  .cr-post.fs-animate {
    animation: cr-reveal 0.65s ease;
  }

  @keyframes cr-reveal {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .cr-media {
    width: 100%;
    max-height: 28rem;
    object-fit: cover;
    border-radius: var(--section-radius, 16px);
  }

  .cr-products {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }

  .cr-product {
    display: grid;
    gap: 0.65rem;
    padding: 1rem;
    overflow: hidden;
  }

  .cr-product__img {
    width: 100%;
    aspect-ratio: 3 / 4;
    object-fit: cover;
    border-radius: calc(var(--section-radius, 16px) * 0.55);
  }

  .cr-product__name {
    margin: 0;
    font-weight: 700;
    font-size: 1rem;
  }

  .cr-product__desc {
    margin: 0;
    font-size: 0.88rem;
    color: var(--muted-color, #7a6a62);
    line-height: 1.55;
  }

  .cr-cta-wrap {
    text-align: center;
  }

  @media (max-width: 959px) {
    .cr-products {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.85rem;
    }

    .cr-cta-wrap .fs-btn {
      width: 100%;
      max-width: 22rem;
    }
  }

  @media (max-width: 639px) {
    .cr-stage,
    .cr-pre {
      min-height: 15rem;
    }

    .cr-pre {
      padding: 1rem 0.85rem;
      gap: 0.9rem;
    }

    .cr-media {
      max-height: 16rem;
    }

    .cr-products {
      grid-template-columns: 1fr;
      gap: 0.75rem;
    }

    .cr-product {
      padding: 0.8rem;
    }

    .cr-product__name {
      font-size: 0.95rem;
    }

    .cr-timer {
      gap: 0.4rem;
      flex-wrap: wrap;
      justify-content: center;
    }

    .cr-timer__unit {
      min-width: 3.4rem;
      padding: 0.5rem 0.3rem;
    }

    .cr-timer__value {
      font-size: 1.25rem;
    }

    .cr-cta-wrap .fs-btn {
      width: 100%;
      max-width: none;
    }
  }
`;
