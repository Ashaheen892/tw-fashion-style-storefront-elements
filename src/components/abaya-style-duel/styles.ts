import { css } from 'lit';

export const componentStyles = css`
  .asd-arena {
    position: relative;
    overflow: hidden;
    padding: 1.25rem 1rem 1.4rem;
    border-radius: var(--section-radius, 18px);
    border: 1px solid var(--border-color, #e8ddd6);
    background:
      radial-gradient(circle at top, color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 14%, transparent), transparent 40%),
      linear-gradient(180deg, color-mix(in srgb, var(--card-bg, #fff) 92%, #f3ebe4), var(--card-bg, #fff));
    box-shadow: 0 18px 42px rgba(43, 33, 28, 0.08);
  }

  .asd-progress {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.6rem;
    margin-bottom: 1rem;
  }

  .asd-progress__meta {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.3rem 0.7rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, var(--card-bg, #fff));
    color: var(--accent-color, var(--fs-store-primary));
    font-size: 0.78rem;
    font-weight: 700;
  }

  .asd-dots {
    display: flex;
    gap: 0.35rem;
  }

  .asd-dot {
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 50%;
    background: color-mix(in srgb, var(--border-color, #e8ddd6) 80%, transparent);
  }

  .asd-dot--active {
    width: 1.1rem;
    border-radius: 999px;
    background: var(--accent-color, var(--fs-store-primary));
  }

  .asd-question {
    margin: 0 auto 1.35rem;
    max-width: 34rem;
    text-align: center;
    font-size: clamp(1.15rem, 2.2vw, 1.45rem);
    font-weight: 700;
    line-height: 1.45;
    color: var(--text-color, #2b211c);
  }

  .asd-options {
    position: relative;
    display: grid;
    gap: 1rem;
  }

  @media (min-width: 640px) {
    .asd-options {
      grid-template-columns: 1fr 1fr;
      gap: 1.25rem;
      align-items: stretch;
    }
  }

  .asd-vs {
    display: grid;
    place-items: center;
    width: 3rem;
    height: 3rem;
    margin: 0.15rem auto;
    border-radius: 50%;
    background:
      linear-gradient(145deg, var(--accent-color, var(--fs-store-primary)), color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 65%, #000));
    color: #fff;
    font-weight: 800;
    font-size: 0.82rem;
    letter-spacing: 0.04em;
    box-shadow:
      0 0 0 6px color-mix(in srgb, var(--card-bg, #fff) 92%, transparent),
      0 10px 24px rgba(43, 33, 28, 0.2);
    z-index: 3;
  }

  @media (min-width: 640px) {
    .asd-vs {
      position: absolute;
      /* Physical center — avoids RTL inset-inline-start offset */
      left: 50%;
      top: 38%;
      margin: 0;
      transform: translate(-50%, -50%);
      width: 3.4rem;
      height: 3.4rem;
      font-size: 0.9rem;
      pointer-events: none;
    }
  }

  .asd-option {
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 100%;
    padding: 0;
    border: 1px solid var(--border-color, #e8ddd6);
    border-radius: calc(var(--section-radius, 18px) * 0.8);
    background: var(--card-bg, #fff);
    overflow: hidden;
    cursor: pointer;
    text-align: center;
    color: inherit;
    font: inherit;
    text-decoration: none;
    box-shadow: 0 10px 26px rgba(43, 33, 28, 0.06);
    transition:
      border-color 0.25s ease,
      transform 0.25s ease,
      box-shadow 0.25s ease;
  }

  .asd-option:hover:not(:disabled) {
    transform: translateY(-3px);
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, var(--border-color, #e8ddd6));
  }

  .asd-option:disabled {
    cursor: default;
  }

  .asd-option--winner {
    border-color: var(--accent-color, var(--fs-store-primary));
    box-shadow:
      0 0 0 2px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 25%, transparent),
      0 16px 34px rgba(43, 33, 28, 0.12);
  }

  .asd-option--picked {
    outline: 2px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 55%, transparent);
    outline-offset: 2px;
  }

  .fs-celebrate.asd-option--winner {
    animation: asd-celebrate 0.65s ease;
  }

  @keyframes asd-celebrate {
    0%,
    100% {
      transform: scale(1);
    }
    40% {
      transform: scale(1.02);
    }
    70% {
      transform: scale(0.995);
    }
  }

  .asd-option__media {
    position: relative;
    aspect-ratio: 3 / 4;
    overflow: hidden;
    background: color-mix(in srgb, var(--border-color, #e8ddd6) 45%, transparent);
    flex: 0 0 auto;
  }

  .asd-option__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.45s ease;
  }

  .asd-option:hover .asd-option__img {
    transform: scale(1.03);
  }

  .asd-option__veil {
    position: absolute;
    inset: auto 0 0;
    height: 42%;
    background: linear-gradient(180deg, transparent, rgba(43, 33, 28, 0.55));
    pointer-events: none;
  }

  .asd-option__vote-label {
    position: absolute;
    left: 50%;
    bottom: 0.75rem;
    z-index: 1;
    transform: translateX(-50%);
    padding: 0.35rem 0.75rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.94);
    color: var(--accent-color, var(--fs-store-primary));
    font-size: 0.75rem;
    font-weight: 700;
    white-space: nowrap;
  }

  .asd-option__crown {
    position: absolute;
    top: 0.75rem;
    left: 50%;
    z-index: 1;
    transform: translateX(-50%);
    padding: 0.28rem 0.7rem;
    border-radius: 999px;
    background: var(--accent-color, var(--fs-store-primary));
    color: #fff;
    font-size: 0.7rem;
    font-weight: 700;
    white-space: nowrap;
    box-shadow: 0 6px 14px rgba(43, 33, 28, 0.22);
  }

  .asd-option__body {
    display: grid;
    gap: 0.55rem;
    padding: 1rem 0.95rem 1.1rem;
    flex: 1 1 auto;
    align-content: start;
  }

  .asd-option__name {
    margin: 0;
    font-weight: 700;
    font-size: 1.05rem;
    line-height: 1.35;
    color: var(--text-color, #2b211c);
    text-align: center;
  }

  .asd-option__cta {
    margin: 0;
    font-size: 0.8rem;
    color: var(--muted-color, #7a6a62);
    text-align: center;
  }

  .asd-pct-row {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.15rem;
  }

  .asd-pct {
    margin: 0;
    font-size: 1.35rem;
    font-weight: 800;
    line-height: 1;
    color: var(--accent-color, var(--fs-store-primary));
  }

  .asd-pct-label {
    font-size: 0.72rem;
    color: var(--muted-color, #7a6a62);
  }

  .asd-bar {
    position: relative;
    height: 8px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #e8ddd6) 85%, transparent);
    overflow: hidden;
    /* Keep fill growing left→right in RTL pages */
    direction: ltr;
  }

  .asd-bar > span {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(
      90deg,
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 70%, #c4a484),
      var(--accent-color, var(--fs-store-primary))
    );
    transition: width 0.55s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .asd-result {
    margin-top: 1.25rem;
    padding: 1rem 1.05rem;
    border-radius: calc(var(--section-radius, 18px) * 0.65);
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 22%, var(--border-color, #e8ddd6));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, var(--card-bg, #fff));
    line-height: 1.7;
    font-size: 0.92rem;
    text-align: center;
    color: var(--text-color, #2b211c);
  }

  .asd-nav {
    display: flex;
    justify-content: center;
    margin-top: 1.1rem;
  }

  .asd-nav .fs-btn {
    min-width: min(100%, 16rem);
  }

  .asd-note {
    margin: 0.85rem 0 0;
    text-align: center;
    font-size: 0.78rem;
    color: var(--muted-color, #7a6a62);
    line-height: 1.6;
  }

  @media (max-width: 959px) {
    .asd-arena {
      padding: 1rem 0.85rem 1.15rem;
    }

    .asd-nav {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }

    .asd-nav .fs-btn {
      width: 100%;
      min-width: 0;
    }
  }

  @media (max-width: 639px) {
    .asd-arena {
      padding: 0.85rem 0.65rem 1rem;
    }

    .asd-options {
      gap: 0.85rem;
    }

    .asd-option__media {
      aspect-ratio: 4 / 5;
      max-height: 14.5rem;
    }

    .asd-option__name {
      font-size: 0.95rem;
    }

    .asd-vs {
      width: 2.65rem;
      height: 2.65rem;
      font-size: 0.72rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .asd-option,
    .asd-option__img,
    .asd-bar > span,
    .fs-celebrate.asd-option--winner {
      transition: none !important;
      animation: none !important;
    }

    .asd-option:hover:not(:disabled) {
      transform: none;
    }
  }
`;
