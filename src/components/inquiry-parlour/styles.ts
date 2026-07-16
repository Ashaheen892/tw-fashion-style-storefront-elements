import { css } from 'lit';

export const componentStyles = css`
  .ip-shell {
    display: grid;
    gap: 1.15rem;
    max-width: 48rem;
    margin: 0 auto;
  }

  .ip-toolbar {
    display: grid;
    gap: 0.65rem;
  }

  @media (min-width: 720px) {
    .ip-toolbar {
      grid-template-columns: 1fr auto;
      align-items: center;
    }
  }

  .ip-search {
    width: 100%;
    min-height: 44px;
    box-sizing: border-box;
    padding: 0.65rem 0.9rem;
    border: 1px solid var(--border-color, #e8ddd6);
    border-radius: 10px;
    background: var(--card-bg, #fff);
    color: var(--text-color, #2b211c);
    font: inherit;
  }

  .ip-search:focus {
    outline: 2px solid color-mix(in srgb, var(--accent-color, #8b5e4b) 40%, transparent);
    outline-offset: 1px;
    border-color: var(--accent-color, #8b5e4b);
  }

  .ip-cats {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    justify-content: flex-start;
  }

  .ip-cat {
    min-height: 44px;
    padding: 0.45rem 0.85rem;
    border-radius: 8px;
    border: 1px solid var(--border-color, #e8ddd6);
    background: var(--card-bg, #fff);
    color: var(--muted-color, #7a6a62);
    font: inherit;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
  }

  .ip-cat[aria-pressed='true'] {
    border-color: var(--accent-color, #8b5e4b);
    color: var(--accent-color, #8b5e4b);
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 10%, var(--card-bg, #fff));
  }

  .ip-list {
    display: grid;
    gap: 0.55rem;
  }

  .ip-item {
    border: 1px solid var(--border-color, #e8ddd6);
    border-radius: 12px;
    background: var(--card-bg, #fff);
    overflow: hidden;
    box-shadow: 0 8px 22px rgba(43, 33, 28, 0.04);
  }

  .ip-item--open {
    border-color: color-mix(in srgb, var(--accent-color, #8b5e4b) 40%, var(--border-color, #e8ddd6));
    box-shadow: 0 12px 28px rgba(43, 33, 28, 0.08);
  }

  .ip-q {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0.75rem;
    align-items: center;
    padding: 1rem 1.05rem;
    border: none;
    background: transparent;
    color: inherit;
    font: inherit;
    text-align: start;
    cursor: pointer;
  }

  .ip-q__text {
    font-size: 0.98rem;
    font-weight: 700;
    line-height: 1.45;
  }

  .ip-q__meta {
    display: block;
    margin-top: 0.25rem;
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--muted-color, #7a6a62);
  }

  .ip-q__icon {
    width: 1.75rem;
    height: 1.75rem;
    display: grid;
    place-items: center;
    border-radius: 8px;
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 12%, transparent);
    color: var(--accent-color, #8b5e4b);
    font-size: 1.1rem;
    font-weight: 700;
    transition: transform 0.2s ease;
  }

  .ip-item--open .ip-q__icon {
    transform: rotate(45deg);
  }

  .ip-a {
    padding: 0 1.05rem 1.05rem;
    color: var(--muted-color, #7a6a62);
    font-size: 0.92rem;
    line-height: 1.75;
    animation: ip-reveal 0.28s ease;
  }

  .ip-a p {
    margin: 0;
  }

  .ip-empty {
    text-align: center;
    padding: 1.5rem 1rem;
    color: var(--muted-color, #7a6a62);
    font-size: 0.9rem;
  }

  @keyframes ip-reveal {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 959px) {
    .ip-toolbar {
      gap: 0.75rem;
    }

    .ip-cats {
      flex-wrap: nowrap;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior-x: contain;
      padding-bottom: 0.15rem;
      gap: 0.4rem;
    }

    .ip-cat {
      flex: 0 0 auto;
      white-space: nowrap;
    }
  }

  @media (max-width: 639px) {
    .ip-toolbar {
      gap: 0.65rem;
    }

    .ip-cat {
      font-size: 0.76rem;
      padding-inline: 0.75rem;
    }

    .ip-q {
      padding: 0.85rem 0.8rem;
      gap: 0.6rem;
      min-height: 48px;
    }

    .ip-a {
      padding: 0 0.8rem 0.9rem;
      font-size: 0.86rem;
      line-height: 1.65;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .ip-a,
    .ip-q__icon {
      animation: none !important;
      transition: none !important;
      transform: none !important;
    }
  }
`;
