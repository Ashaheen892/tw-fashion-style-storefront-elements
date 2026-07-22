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
    padding: 1.2rem;
    border-radius: var(--section-radius, 18px);
    border: 1px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #ffffff);
    box-shadow: 0 14px 34px color-mix(in srgb, var(--text-color, #000) 8%, transparent);
  }

  .fs-animate .sfr-panel {
    animation: sfr-rise 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .fs-animate .sfr-panel:nth-child(2) { animation-delay: 0.08s; }
  .fs-animate .sfr-panel--preview { animation-delay: 0.14s; }

  @keyframes sfr-rise {
    from {
      opacity: 0;
      transform: translateY(14px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  .sfr-panel__title {
    margin: 0 0 0.95rem;
    font-size: 1.05rem;
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  .sfr-steps {
    display: grid;
    gap: 0.55rem;
  }

  .sfr-step-btn {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.75rem;
    align-items: center;
    min-height: 52px;
    padding: 0.8rem 0.9rem;
    border-radius: calc(var(--section-radius, 16px) * 0.65);
    border: 1px solid var(--border-color, #e5e7eb);
    background: transparent;
    color: inherit;
    font: inherit;
    text-align: start;
    cursor: pointer;
    transition: border-color 0.22s ease, background 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease;
  }

  .sfr-step-btn:hover {
    transform: translateY(-1px);
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 40%, var(--border-color, #e5e7eb));
  }

  .sfr-step-btn--active {
    border-color: var(--accent-color, var(--fs-store-primary));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 9%, var(--card-bg, #ffffff));
    box-shadow: 0 10px 22px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, transparent);
  }

  .sfr-step-btn__num {
    width: 2.15rem;
    height: 2.15rem;
    min-width: 2.15rem;
    display: inline-grid;
    place-items: center;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 14%, transparent);
    color: var(--accent-color, var(--fs-store-primary));
    font-size: 0.82rem;
    font-weight: 800;
    line-height: 1;
    transition: background 0.2s ease, color 0.2s ease;
  }

  .sfr-step-btn--active .sfr-step-btn__num {
    background: var(--accent-color, var(--fs-store-primary));
    color: #fff;
  }

  .sfr-step-btn__copy {
    min-width: 0;
  }

  .sfr-step-btn__copy strong {
    display: block;
    font-size: 0.92rem;
  }

  .sfr-step-btn__copy span {
    display: block;
    margin-top: 0.18rem;
    font-size: 0.76rem;
    color: var(--muted-color, #666666);
    line-height: 1.45;
  }

  .sfr-panel--preview {
    display: grid;
    gap: 0.9rem;
    background:
      radial-gradient(circle at 90% 0%, color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, transparent), transparent 40%),
      var(--card-bg, #ffffff);
  }

  .sfr-detail__media {
    position: relative;
    border-radius: calc(var(--section-radius, 16px) * 0.75);
    overflow: hidden;
    aspect-ratio: 4 / 3;
    background:
      linear-gradient(145deg, color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 22%, #000000), #1c1613);
  }

  .sfr-detail__media--empty {
    min-height: 11rem;
    display: grid;
    place-items: center;
  }

  .sfr-detail__media--empty::after {
    content: attr(data-label);
    color: rgba(255, 255, 255, 0.72);
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.06em;
  }

  .sfr-detail__media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    animation: sfr-fade 0.35s ease;
  }

  @keyframes sfr-fade {
    from { opacity: 0.4; transform: scale(1.02); }
    to { opacity: 1; transform: none; }
  }

  .sfr-detail__title {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  .sfr-detail__desc {
    margin: 0;
    color: var(--muted-color, #666666);
    line-height: 1.7;
    font-size: 0.92rem;
  }

  .sfr-tip {
    margin: 0;
    padding: 0.8rem 0.95rem;
    border-radius: calc(var(--section-radius, 16px) * 0.55);
    border-inline-start: 3px solid var(--accent-color, var(--fs-store-primary));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 7%, var(--card-bg, #ffffff));
    font-size: 0.85rem;
    line-height: 1.6;
    color: var(--text-color, #000000);
  }

  .sfr-table-wrap {
    overflow-x: auto;
    border-radius: calc(var(--section-radius, 16px) * 0.55);
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
    padding: 0.75rem 0.8rem;
    text-align: start;
    border-bottom: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 88%, transparent);
  }

  .sfr-table thead th {
    font-size: 0.74rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--muted-color, #666666);
    background: color-mix(in srgb, var(--section-bg, var(--fs-surface, #f3f4f6)) 70%, var(--card-bg, #ffffff));
  }

  .sfr-table tbody tr {
    transition: background 0.2s ease;
  }

  .sfr-table tbody tr:hover td {
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 6%, transparent);
  }

  .sfr-table__size {
    font-weight: 800;
    color: var(--accent-color, var(--fs-store-primary));
  }

  .sfr-table__note {
    font-size: 0.7rem;
    font-weight: 500;
    color: var(--muted-color, #666666);
  }

  .sfr-note {
    margin: 0.85rem 0 0;
    font-size: 0.8rem;
    color: var(--muted-color, #666666);
    line-height: 1.55;
  }

  @media (max-width: 639px) {
    .sfr-panel {
      padding: 0.95rem 0.85rem;
    }

    .sfr-table {
      min-width: 20rem;
      font-size: 0.78rem;
    }

    .sfr-detail__media {
      aspect-ratio: 1 / 1;
      max-height: 14.5rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .sfr-panel,
    .sfr-step-btn,
    .sfr-detail__media img {
      animation: none !important;
      transition: none !important;
      transform: none !important;
    }
  }
`;
