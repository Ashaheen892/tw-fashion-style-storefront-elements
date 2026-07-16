import { css } from 'lit';

/**
 * Shared section chrome + mobile/tablet baselines.
 * Breakpoints: phone ≤639 · tablet ≤959 · desktop ≥960
 */
export const sharedSectionCss = css`
  :host {
    display: block;
    overflow-x: clip;
  }

  .fs-section {
    background: var(--section-bg, #faf7f5);
    color: var(--text-color, #2b211c);
    padding: var(--space-mobile, 28px) 0;
    overflow-x: clip;
  }

  @media (min-width: 960px) {
    .fs-section {
      padding: var(--space-desktop, 48px) 0;
    }
  }

  .fs-container {
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 16px;
    box-sizing: border-box;
  }

  .fs-section--full .fs-container {
    max-width: none;
  }

  .fs-header {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .fs-title {
    margin: 0 0 0.5rem;
    font-size: clamp(1.35rem, 2.5vw, 1.85rem);
    font-weight: 700;
    line-height: 1.35;
    color: var(--text-color, #2b211c);
  }

  .fs-desc {
    margin: 0 auto;
    max-width: 42rem;
    color: var(--muted-color, #7a6a62);
    font-size: 0.95rem;
    line-height: 1.7;
  }

  .fs-card {
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #e8ddd6);
    border-radius: var(--section-radius, 16px);
    box-shadow: 0 8px 28px rgba(43, 33, 28, 0.06);
  }

  .fs-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    min-height: 44px;
    padding: 0.65rem 1.15rem;
    border: none;
    border-radius: calc(var(--section-radius, 16px) * 0.6);
    background: var(--button-bg, #8b5e4b);
    color: var(--button-color, #fff);
    font: inherit;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    transition: opacity 0.2s ease, transform 0.2s ease;
    box-sizing: border-box;
  }

  .fs-btn:hover {
    opacity: 0.92;
  }

  .fs-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .fs-btn--ghost {
    background: transparent;
    color: var(--accent-color, #8b5e4b);
    border: 1px solid var(--border-color, #e8ddd6);
  }

  .fs-btn:focus-visible,
  button:focus-visible,
  a:focus-visible,
  input:focus-visible,
  select:focus-visible {
    outline: 2px solid var(--accent-color, #8b5e4b);
    outline-offset: 2px;
  }

  .fs-empty {
    padding: 2rem 1rem;
    text-align: center;
    color: var(--muted-color, #7a6a62);
    border: 1px dashed var(--border-color, #e8ddd6);
    border-radius: var(--section-radius, 16px);
  }

  .fs-meter {
    width: 100%;
    height: 8px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #e8ddd6) 80%, transparent);
    overflow: hidden;
  }

  .fs-meter > span {
    display: block;
    height: 100%;
    background: var(--accent-color, #8b5e4b);
    border-radius: inherit;
    transition: width 0.45s ease;
  }

  .fs-scroll-x {
    display: flex;
    gap: 0.65rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-x: contain;
    scroll-snap-type: x proximity;
    scrollbar-width: thin;
  }

  .fs-scroll-x > * {
    flex: 0 0 auto;
    scroll-snap-align: start;
  }

  .fs-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
  }

  .fs-tap {
    min-height: 44px;
    min-width: 44px;
  }

  /* —— Tablet —— */
  @media (max-width: 959px) {
    .fs-header {
      margin-bottom: 1.25rem;
    }

    .fs-title {
      font-size: clamp(1.3rem, 4vw, 1.75rem);
      line-height: 1.3;
    }

    .fs-desc {
      font-size: 0.92rem;
      line-height: 1.65;
    }

    .fs-actions {
      display: grid;
      grid-template-columns: 1fr;
    }

    .fs-actions .fs-btn {
      width: 100%;
    }
  }

  /* —— Phone —— */
  @media (max-width: 639px) {
    .fs-section {
      padding: var(--space-mobile, 22px) 0;
    }

    .fs-container {
      padding: 0 12px;
    }

    .fs-header {
      margin-bottom: 1rem;
    }

    .fs-title {
      font-size: clamp(1.2rem, 6.2vw, 1.55rem);
      line-height: 1.28;
    }

    .fs-desc {
      font-size: 0.88rem;
      line-height: 1.6;
    }

    .fs-empty {
      padding: 1.35rem 0.85rem;
      font-size: 0.88rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .fs-btn,
    .fs-meter > span,
    * {
      scroll-behavior: auto !important;
    }

    .fs-animate,
    .fs-pulse,
    .fs-fade,
    .fs-curtain,
    .fs-celebrate {
      transition: none !important;
      animation: none !important;
    }
  }
`;
