import { css } from 'lit';

export const componentStyles = css`
  .fs-header {
    margin-bottom: 2rem;
  }

  .fs-title {
    font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
    font-size: clamp(2rem, 3.6vw, 2.75rem);
    font-weight: 600;
    letter-spacing: 0.01em;
  }

  .fs-desc {
    max-width: 36rem;
    margin-inline: auto;
    font-size: 0.98rem;
    line-height: 1.8;
    color: var(--muted-color, #7a6a62);
  }

  .afl-studio {
    display: grid;
    gap: 1.35rem;
    padding: 1.35rem 1.15rem 1.5rem;
    border-radius: 2px;
    border: 1px solid color-mix(in srgb, #c9a86c 34%, var(--border-color, #e8ddd6));
    background:
      linear-gradient(180deg, #fffdf9 0%, #fff 48%),
      radial-gradient(
        circle at 12% 0%,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 11%, transparent),
        transparent 42%
      );
    box-shadow:
      0 1px 0 rgba(201, 168, 108, 0.22),
      0 24px 52px rgba(43, 33, 28, 0.08);
    font-family: Manrope, 'Avenir Next', 'Segoe UI', sans-serif;
  }

  .afl-toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 0.95rem 1rem;
    border-radius: 2px;
    border: 1px solid color-mix(in srgb, #c9a86c 26%, var(--border-color, #e8ddd6));
    background: linear-gradient(
      120deg,
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, #fff),
      #fff
    );
  }

  .afl-toolbar__kicker {
    display: block;
    margin-bottom: 0.2rem;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: color-mix(in srgb, #c9a86c 70%, var(--accent-color, var(--fs-store-primary)));
  }

  .afl-toolbar__hint {
    margin: 0;
    flex: 1 1 14rem;
    font-size: 0.9rem;
    line-height: 1.65;
    color: var(--muted-color, #7a6a62);
  }

  .afl-toolbar .fs-btn {
    border-radius: 2px;
    min-height: 2.55rem;
    letter-spacing: 0.02em;
    border-color: color-mix(in srgb, #c9a86c 42%, var(--border-color, #e8ddd6));
  }

  .afl-swatches {
    display: flex;
    flex-wrap: wrap;
    gap: 0.95rem;
    justify-content: center;
    padding: 0.35rem 0 0.45rem;
  }

  .afl-swatch {
    width: 5.85rem;
    display: grid;
    justify-items: center;
    gap: 0.45rem;
    padding: 0.4rem;
    border: none;
    background: transparent;
    color: var(--text-color, #2b211c);
    font: inherit;
    cursor: pointer;
    transition: transform 0.22s ease;
  }

  .afl-swatch__ring {
    position: relative;
    width: 4.65rem;
    height: 4.65rem;
    border-radius: 2px;
    padding: 3px;
    background: linear-gradient(
      145deg,
      #c9a86c,
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 70%, #fff),
      #e8ddd6
    );
    box-shadow: 0 10px 22px rgba(43, 33, 28, 0.09);
    transition:
      transform 0.22s ease,
      box-shadow 0.22s ease;
  }

  .afl-swatch__media {
    width: 100%;
    height: 100%;
    border-radius: 1px;
    overflow: hidden;
    background: var(--card-bg, #fff);
    border: 2px solid #fffefb;
  }

  .afl-swatch__media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .afl-swatch__fallback {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 14%, #fffaf4);
    color: var(--accent-color, var(--fs-store-primary));
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-weight: 700;
    font-size: 1.25rem;
  }

  .afl-swatch__name {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 0.98rem;
    font-weight: 600;
    text-align: center;
    line-height: 1.3;
    max-width: 5.85rem;
  }

  .afl-swatch__badge {
    position: absolute;
    inset-inline-end: -0.2rem;
    bottom: -0.15rem;
    min-width: 1.35rem;
    height: 1.35rem;
    padding: 0 0.3rem;
    border-radius: 1px;
    background: linear-gradient(145deg, #b08d57, var(--accent-color, var(--fs-store-primary)));
    color: #fff;
    font-size: 0.7rem;
    font-weight: 700;
    display: grid;
    place-items: center;
    border: 2px solid #fff;
    opacity: 0;
  }

  .afl-swatch:hover .afl-swatch__ring {
    transform: translateY(-2px);
    box-shadow: 0 14px 28px rgba(43, 33, 28, 0.12);
  }

  .afl-swatch[aria-selected='true'] .afl-swatch__ring,
  .afl-swatch[aria-pressed='true'] .afl-swatch__ring {
    background: linear-gradient(145deg, #c9a86c, var(--accent-color, var(--fs-store-primary)));
    box-shadow:
      0 0 0 1px color-mix(in srgb, #c9a86c 55%, transparent),
      0 14px 28px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 28%, transparent);
    transform: scale(1.04);
  }

  .afl-swatch[aria-selected='true'] .afl-swatch__name,
  .afl-swatch[aria-pressed='true'] .afl-swatch__name {
    color: var(--accent-color, var(--fs-store-primary));
  }

  .afl-swatch[aria-pressed='true'] .afl-swatch__badge {
    opacity: 1;
  }

  .afl-stage {
    display: grid;
    gap: 1.25rem;
    padding: 1.15rem;
    border-radius: 2px;
    border: 1px solid color-mix(in srgb, #c9a86c 30%, var(--border-color, #e8ddd6));
    background:
      linear-gradient(180deg, #fffaf3 0%, #fff 55%);
    box-shadow:
      0 1px 0 rgba(201, 168, 108, 0.18),
      0 18px 40px rgba(43, 33, 28, 0.07);
  }

  @media (min-width: 960px) {
    .afl-stage {
      grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
      align-items: start;
      padding: 1.35rem;
      gap: 1.5rem;
    }
  }

  .afl-media {
    position: relative;
    border-radius: 2px;
    overflow: hidden;
    background: linear-gradient(160deg, #3a2c26, #1c1613);
    aspect-ratio: 4 / 5;
    border: 1px solid color-mix(in srgb, #c9a86c 40%, transparent);
    box-shadow: 0 22px 44px rgba(43, 33, 28, 0.14);
  }

  @media (min-width: 960px) {
    .afl-media {
      aspect-ratio: 3 / 4;
      min-height: 420px;
    }
  }

  .afl-media img,
  .afl-media video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .afl-media__tag {
    position: absolute;
    top: 0.95rem;
    inset-inline-start: 0.95rem;
    padding: 0.32rem 0.75rem;
    border-radius: 1px;
    background: rgba(20, 14, 12, 0.55);
    border: 1px solid rgba(212, 175, 105, 0.65);
    color: #f7efdf;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    backdrop-filter: blur(6px);
  }

  .afl-info {
    display: grid;
    gap: 1.15rem;
    align-content: start;
  }

  .afl-info__kicker {
    display: inline-flex;
    width: fit-content;
    padding: 0.28rem 0.7rem;
    border-radius: 1px;
    border: 1px solid color-mix(in srgb, #c9a86c 50%, transparent);
    background: color-mix(in srgb, #c9a86c 8%, #fff);
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: color-mix(in srgb, #c9a86c 55%, var(--accent-color, var(--fs-store-primary)));
  }

  .afl-info__title {
    margin: 0;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(1.75rem, 3vw, 2.35rem);
    font-weight: 600;
    color: var(--text-color, #2b211c);
    line-height: 1.15;
  }

  .afl-info__desc {
    margin: 0;
    color: var(--muted-color, #7a6a62);
    line-height: 1.8;
    font-size: 0.96rem;
  }

  .afl-section-title {
    margin: 0 0 0.75rem;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--text-color, #2b211c);
  }

  .afl-meters {
    display: grid;
    gap: 0.7rem;
  }

  @media (min-width: 640px) {
    .afl-meters {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.75rem 0.9rem;
    }
  }

  .afl-meter {
    padding: 0.8rem 0.85rem;
    border-radius: 2px;
    background: linear-gradient(180deg, #fffaf4, #fff);
    border: 1px solid color-mix(in srgb, #c9a86c 24%, var(--border-color, #e8ddd6));
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.85);
  }

  .afl-meter__label {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    margin-bottom: 0.45rem;
    font-size: 0.82rem;
    font-weight: 700;
    color: var(--text-color, #2b211c);
  }

  .afl-meter__value {
    color: var(--accent-color, var(--fs-store-primary));
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }

  .afl-meter .fs-meter {
    height: 6px;
    border-radius: 1px;
    background: color-mix(in srgb, #c9a86c 18%, var(--border-color, #e8ddd6));
  }

  .afl-meter .fs-meter > span {
    border-radius: 1px;
    background: linear-gradient(90deg, #b08d57, var(--accent-color, var(--fs-store-primary)));
  }

  .afl-care {
    display: grid;
    gap: 0.55rem;
  }

  .afl-care__item {
    margin: 0;
    padding: 0.9rem 1rem;
    border-radius: 2px;
    border-inline-start: 2px solid #c9a86c;
    border-block: 1px solid color-mix(in srgb, #c9a86c 20%, var(--border-color, #e8ddd6));
    border-inline-end: 1px solid color-mix(in srgb, #c9a86c 20%, var(--border-color, #e8ddd6));
    background: linear-gradient(
      90deg,
      color-mix(in srgb, #c9a86c 8%, #fffefb),
      #fff
    );
    font-size: 0.9rem;
    line-height: 1.7;
    color: var(--text-color, #2b211c);
  }

  .afl-care__item strong {
    color: var(--accent-color, var(--fs-store-primary));
    font-weight: 700;
  }

  .afl-compare {
    display: grid;
    gap: 1rem;
  }

  @media (min-width: 800px) {
    .afl-compare {
      grid-template-columns: 1fr 1fr;
      gap: 1.15rem;
    }
  }

  .afl-compare__card {
    padding: 1.1rem;
    border-radius: 2px;
    border: 1px solid color-mix(in srgb, #c9a86c 30%, var(--border-color, #e8ddd6));
    background: linear-gradient(180deg, #fffaf3, #fff);
    box-shadow:
      0 1px 0 rgba(201, 168, 108, 0.18),
      0 16px 34px rgba(43, 33, 28, 0.07);
    display: grid;
    gap: 0.95rem;
  }

  .afl-compare__media {
    border-radius: 2px;
    overflow: hidden;
    aspect-ratio: 4 / 3;
    background: linear-gradient(160deg, #3a2c26, #1c1613);
    border: 1px solid color-mix(in srgb, #c9a86c 35%, transparent);
  }

  .afl-compare__media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .afl-compare__card h3 {
    margin: 0;
    text-align: center;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.35rem;
    font-weight: 600;
  }

  .afl-empty {
    margin: 0;
    padding: 1.75rem 1.15rem;
    text-align: center;
    border: 1px dashed color-mix(in srgb, #c9a86c 40%, var(--border-color, #e8ddd6));
    border-radius: 2px;
    color: var(--muted-color, #7a6a62);
    background: linear-gradient(180deg, #fffaf4, #fff);
    font-size: 0.92rem;
    line-height: 1.7;
  }

  .fs-animate .fs-meter > span {
    transition: width 0.65s cubic-bezier(0.22, 1, 0.36, 1);
  }

  @media (max-width: 959px) {
    .afl-studio {
      padding: 1rem 0.85rem 1.15rem;
      gap: 1.1rem;
    }

    .afl-stage {
      padding: 1rem;
      gap: 1rem;
    }

    .afl-media {
      max-height: 20rem;
    }

    .afl-meters {
      grid-template-columns: 1fr;
    }

    .afl-toolbar .fs-btn {
      min-height: 44px;
    }
  }

  @media (max-width: 639px) {
    .afl-studio {
      padding: 0.85rem 0.65rem 1rem;
      gap: 0.95rem;
    }

    .afl-toolbar {
      padding: 0.75rem 0.8rem;
      flex-direction: column;
      align-items: stretch;
    }

    .afl-toolbar .fs-btn {
      width: 100%;
    }

    .afl-stage {
      padding: 0.8rem;
      gap: 0.85rem;
    }

    .afl-media {
      aspect-ratio: 1 / 1;
      max-height: 16rem;
    }

    .afl-swatches {
      display: flex;
      flex-wrap: nowrap;
      gap: 0.55rem;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior-x: contain;
      padding-bottom: 0.25rem;
      margin-inline: -0.15rem;
      padding-inline: 0.15rem;
    }

    .afl-swatch {
      width: 4.5rem;
      flex: 0 0 auto;
    }

    .afl-swatch__ring {
      width: 3.5rem;
      height: 3.5rem;
    }

    .afl-info__title {
      font-size: clamp(1.4rem, 6.5vw, 1.8rem);
    }

    .afl-meters {
      grid-template-columns: 1fr;
      gap: 0.7rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .afl-swatch,
    .afl-swatch__ring,
    .fs-animate .fs-meter > span {
      transition: none !important;
    }

    .afl-swatch:hover .afl-swatch__ring,
    .afl-swatch[aria-selected='true'] .afl-swatch__ring,
    .afl-swatch[aria-pressed='true'] .afl-swatch__ring {
      transform: none;
    }
  }
`;
