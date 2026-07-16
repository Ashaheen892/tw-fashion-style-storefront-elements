import { css } from 'lit';

export const componentStyles = css`
  .sfr-layout {
    display: grid;
    gap: 1.35rem;
  }

  .sfr-main {
    display: grid;
    gap: 1.35rem;
  }

  @media (min-width: 960px) {
    .sfr-layout--with-preview {
      grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
      align-items: start;
    }

    .sfr-panel--preview {
      position: sticky;
      top: 1rem;
    }
  }

  .sfr-panel {
    padding: 1.15rem;
    border-radius: var(--section-radius, 18px);
    border: 1px solid var(--border-color, #e8ddd6);
    background: var(--card-bg, #fff);
    box-shadow: 0 14px 34px rgba(43, 33, 28, 0.06);
  }

  .sfr-panel__title {
    margin: 0 0 0.85rem;
    font-size: 1.05rem;
    font-weight: 700;
  }

  .sfr-steps {
    display: grid;
    gap: 0.55rem;
  }

  .sfr-step-btn {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.7rem;
    align-items: center;
    min-height: 44px;
    padding: 0.75rem 0.85rem;
    border-radius: 10px;
    border: 1px solid var(--border-color, #e8ddd6);
    background: transparent;
    color: inherit;
    font: inherit;
    text-align: start;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
  }

  .sfr-step-btn:hover {
    border-color: color-mix(in srgb, var(--accent-color, #8b5e4b) 40%, var(--border-color, #e8ddd6));
  }

  .sfr-step-btn--active {
    border-color: var(--accent-color, #8b5e4b);
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 8%, var(--card-bg, #fff));
  }

  .sfr-step-btn__num {
    width: 2rem;
    height: 2rem;
    min-width: 2rem;
    min-height: 2rem;
    flex: 0 0 auto;
    display: inline-grid;
    place-items: center;
    box-sizing: border-box;
    border-radius: 8px;
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 14%, transparent);
    color: var(--accent-color, #8b5e4b);
    font-size: 0.8rem;
    font-weight: 700;
    line-height: 1;
    margin: 0;
    padding: 0;
  }

  .sfr-step-btn__copy {
    min-width: 0;
  }

  .sfr-step-btn__copy strong {
    display: block;
    font-size: 0.9rem;
  }

  .sfr-step-btn__copy span {
    display: block;
    margin-top: 0.15rem;
    font-size: 0.75rem;
    color: var(--muted-color, #7a6a62);
    line-height: 1.45;
  }

  .sfr-panel--preview {
    display: grid;
    gap: 0.85rem;
  }

  .sfr-detail__media {
    border-radius: 12px;
    overflow: hidden;
    aspect-ratio: 4 / 3;
    background:
      linear-gradient(145deg, color-mix(in srgb, var(--accent-color, #8b5e4b) 18%, #2b211c), #1c1613);
  }

  .sfr-detail__media--empty {
    min-height: 10rem;
  }

  .sfr-detail__media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .sfr-detail__title {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 700;
  }

  .sfr-detail__desc {
    margin: 0;
    color: var(--muted-color, #7a6a62);
    line-height: 1.7;
    font-size: 0.92rem;
  }

  .sfr-tip {
    margin: 0;
    padding: 0.75rem 0.9rem;
    border-radius: 10px;
    border-inline-start: 3px solid var(--accent-color, #8b5e4b);
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 7%, var(--card-bg, #fff));
    font-size: 0.85rem;
    line-height: 1.6;
    color: var(--text-color, #2b211c);
  }

  .sfr-table-wrap {
    overflow-x: auto;
  }

  .sfr-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    min-width: 28rem;
    font-size: 0.88rem;
  }

  .sfr-table th,
  .sfr-table td {
    padding: 0.7rem 0.75rem;
    text-align: start;
    border-bottom: 1px solid color-mix(in srgb, var(--border-color, #e8ddd6) 88%, transparent);
  }

  .sfr-table thead th {
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--muted-color, #7a6a62);
    background: color-mix(in srgb, var(--section-bg, #faf7f5) 70%, var(--card-bg, #fff));
  }

  .sfr-table tbody tr:hover td {
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 5%, transparent);
  }

  .sfr-table__size {
    font-weight: 700;
    color: var(--accent-color, #8b5e4b);
  }

  .sfr-table__note {
    font-size: 0.7rem;
    font-weight: 500;
    color: var(--muted-color, #7a6a62);
  }

  .sfr-note {
    margin: 0.85rem 0 0;
    font-size: 0.8rem;
    color: var(--muted-color, #7a6a62);
    line-height: 1.55;
  }

  @media (max-width: 959px) {
    .sfr-layout {
      gap: 1.1rem;
    }

    .sfr-panel {
      padding: 1rem 0.95rem;
    }

    .sfr-steps {
      gap: 0.45rem;
    }

    .sfr-step-btn {
      min-height: 44px;
    }
  }

  @media (max-width: 639px) {
    .sfr-panel {
      padding: 0.9rem 0.8rem;
    }

    .sfr-layout {
      gap: 0.95rem;
    }

    .sfr-main {
      gap: 0.95rem;
    }

    .sfr-table-wrap {
      margin-inline: -0.15rem;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }

    .sfr-table {
      min-width: 20rem;
      font-size: 0.78rem;
    }

    .sfr-table th,
    .sfr-table td {
      padding: 0.5rem 0.45rem;
      white-space: nowrap;
    }

    .sfr-detail__media {
      aspect-ratio: 1 / 1;
      max-height: 14.5rem;
    }

    .sfr-note {
      font-size: 0.76rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .sfr-step-btn {
      transition: none;
    }
  }
`;
