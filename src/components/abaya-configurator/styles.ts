import { css } from 'lit';

export const componentStyles = css`
  .fs-header {
    margin-bottom: 1.5rem;
  }

  .fs-title {
    font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
    font-size: clamp(1.85rem, 3.5vw, 2.6rem);
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  .fs-desc {
    max-width: 32rem;
    margin-inline: auto;
    font-size: 0.92rem;
    line-height: 1.75;
    color: var(--muted-color, #7a6a62);
  }

  .acfg-studio {
    font-family: Manrope, 'Avenir Next', 'Segoe UI', sans-serif;
  }

  .acfg-layout {
    display: grid;
    gap: 1.5rem;
  }

  @media (min-width: 960px) {
    .acfg-layout {
      grid-template-columns: minmax(0, 1fr) minmax(300px, 0.95fr);
      align-items: start;
      gap: 2.5rem;
    }

    .acfg-layout--preview-left {
      grid-template-columns: minmax(300px, 0.95fr) minmax(0, 1fr);
    }

    .acfg-layout--preview-left .acfg-preview-wrap {
      order: -1;
    }

    .acfg-preview-wrap {
      position: sticky;
      top: 1rem;
    }
  }

  .acfg-preview-wrap {
    display: block;
  }

  .acfg-preview {
    position: relative;
    aspect-ratio: 3 / 4;
    max-height: min(38rem, 76vh);
    width: 100%;
    overflow: hidden;
    background: #141210;
  }

  .acfg-preview--pulse .acfg-preview__base {
    animation: acfg-preview-pulse 0.5s ease;
  }

  .acfg-preview__base,
  .acfg-preview__overlay {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
  }

  .acfg-preview__base {
    z-index: 0;
  }

  .acfg-preview__overlay {
    z-index: 1;
    pointer-events: none;
  }

  .acfg-preview__empty {
    position: absolute;
    inset: 0;
    z-index: 2;
    display: grid;
    place-items: center;
    padding: 1.5rem;
    text-align: center;
    color: rgba(247, 239, 223, 0.65);
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.1rem;
  }

  .acfg-controls {
    display: grid;
    gap: 1.35rem;
  }

  .acfg-toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.65rem;
  }

  .acfg-recommend {
    appearance: none;
    border: 1px solid color-mix(in srgb, var(--accent-color, #8b5e4b) 45%, transparent);
    background: transparent;
    color: var(--accent-color, #8b5e4b);
    min-height: 44px;
    padding: 0.45rem 0.9rem;
    font: inherit;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease;
  }

  .acfg-recommend:hover {
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 10%, transparent);
  }

  .acfg-flash {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--muted-color, #7a6a62);
  }

  .acfg-group {
    display: grid;
    gap: 0.7rem;
    padding-bottom: 1.15rem;
    border-bottom: 1px solid color-mix(in srgb, var(--border-color, #e8ddd6) 85%, transparent);
  }

  .acfg-group:last-of-type {
    border-bottom: none;
    padding-bottom: 0;
  }

  .acfg-group__head {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.35rem 0.75rem;
  }

  .acfg-group__title {
    margin: 0;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-color, #2b211c);
  }

  .acfg-group__pick {
    font-size: 0.78rem;
    font-weight: 500;
    color: var(--muted-color, #7a6a62);
  }

  .acfg-options {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .acfg-option {
    position: relative;
    display: grid;
    justify-items: center;
    gap: 0.35rem;
    width: 5.5rem;
    padding: 0.4rem 0.35rem 0.55rem;
    border: 1px solid transparent;
    background: transparent;
    cursor: pointer;
    font: inherit;
    color: inherit;
    transition: border-color 0.2s ease, background 0.2s ease;
  }

  .acfg-option:hover {
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 6%, transparent);
  }

  .acfg-option[aria-pressed='true'] {
    border-color: color-mix(in srgb, var(--accent-color, #8b5e4b) 55%, transparent);
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 8%, #fff);
  }

  .acfg-option__media,
  .acfg-option__swatch {
    width: 3.4rem;
    height: 3.4rem;
    object-fit: cover;
    display: block;
  }

  .acfg-option__swatch {
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 35%, #ddd);
  }

  .acfg-option__name {
    font-size: 0.72rem;
    font-weight: 600;
    line-height: 1.3;
    text-align: center;
    color: var(--text-color, #2b211c);
    max-width: 100%;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .acfg-option__delta {
    font-size: 0.65rem;
    font-weight: 600;
    color: var(--muted-color, #7a6a62);
  }

  .acfg-summary {
    display: grid;
    gap: 0.9rem;
    padding-top: 0.25rem;
  }

  .acfg-price {
    margin: 0;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(1.75rem, 2.8vw, 2.15rem);
    font-weight: 600;
    color: var(--text-color, #2b211c);
    line-height: 1.15;
  }

  .acfg-price span {
    display: block;
    margin-bottom: 0.15rem;
    font-family: Manrope, 'Avenir Next', 'Segoe UI', sans-serif;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted-color, #7a6a62);
  }

  .acfg-summary__list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: 0.4rem;
  }

  .acfg-summary__list li {
    display: flex;
    justify-content: space-between;
    gap: 0.75rem;
    font-size: 0.85rem;
    line-height: 1.4;
  }

  .acfg-summary__list span {
    color: var(--muted-color, #7a6a62);
    flex: 0 0 auto;
  }

  .acfg-summary__list strong {
    font-weight: 600;
    text-align: end;
    color: var(--text-color, #2b211c);
  }

  .acfg-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .acfg-actions .fs-btn {
    flex: 1 1 auto;
    min-height: 2.65rem;
    border-radius: calc(var(--section-radius, 16px) * 0.35);
    font-size: 0.82rem;
    justify-content: center;
  }

  .acfg-copy-msg {
    margin: 0;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--accent-color, #8b5e4b);
    text-align: center;
    animation: acfg-pop 0.3s ease both;
  }

  @keyframes acfg-pop {
    from {
      opacity: 0;
      transform: translateY(0.25rem);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @keyframes acfg-preview-pulse {
    0% {
      filter: brightness(1);
    }
    40% {
      filter: brightness(1.05);
    }
    100% {
      filter: brightness(1);
    }
  }

  @media (max-width: 959px) {
    .acfg-layout {
      gap: 1.2rem;
    }

    .acfg-preview {
      max-height: min(22rem, 52vh);
    }

    .acfg-controls {
      gap: 1.1rem;
    }

    .acfg-option {
      width: calc(33.333% - 0.35rem);
      min-width: 4.75rem;
    }

    .acfg-actions {
      display: grid;
      grid-template-columns: 1fr;
    }

    .acfg-actions .fs-btn {
      width: 100%;
    }
  }

  @media (max-width: 639px) {
    .acfg-preview {
      max-height: min(18rem, 46vh);
    }

    .acfg-option {
      width: calc(50% - 0.3rem);
      min-width: 0;
      padding: 0.35rem 0.25rem 0.5rem;
    }

    .acfg-option__media,
    .acfg-option__swatch {
      width: 3.1rem;
      height: 3.1rem;
    }

    .acfg-option__name {
      font-size: 0.74rem;
    }

    .acfg-group__title {
      font-size: 1.15rem;
    }

    .acfg-recommend {
      width: 100%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .acfg-option,
    .acfg-preview--pulse .acfg-preview__base,
    .acfg-copy-msg {
      transition: none !important;
      animation: none !important;
    }
  }
`;
