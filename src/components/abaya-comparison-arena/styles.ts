import { css } from 'lit';

export const componentStyles = css`
  .acm-studio {
    position: relative;
    overflow: hidden;
    padding: 1.25rem 1rem 1.4rem;
    border-radius: var(--section-radius, 18px);
    border: 1px solid var(--border-color, #e8ddd6);
    background:
      radial-gradient(circle at 12% 0%, color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 14%, transparent), transparent 42%),
      radial-gradient(circle at 92% 100%, color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, transparent), transparent 40%),
      linear-gradient(180deg, color-mix(in srgb, var(--card-bg, #fff) 90%, #f4ebe4), var(--card-bg, #fff));
    box-shadow: 0 18px 42px rgba(43, 33, 28, 0.08);
  }

  .acm-toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.65rem;
    margin-bottom: 1rem;
  }

  .acm-hint {
    margin: 0;
    color: var(--muted-color, #7a6a62);
    font-size: 0.9rem;
    line-height: 1.55;
  }

  .acm-count {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.3rem 0.75rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, var(--card-bg, #fff));
    color: var(--accent-color, var(--fs-store-primary));
    font-size: 0.78rem;
    font-weight: 700;
    white-space: nowrap;
  }

  .acm-slots {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.55rem;
    margin-bottom: 1.15rem;
  }

  .acm-slot {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    min-height: 3.4rem;
    padding: 0.45rem 0.55rem;
    border-radius: calc(var(--section-radius, 18px) * 0.55);
    border: 1px dashed color-mix(in srgb, var(--border-color, #e8ddd6) 90%, transparent);
    background: color-mix(in srgb, var(--card-bg, #fff) 70%, transparent);
    transition: border-color 0.22s ease, background 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease;
  }

  .acm-slot--filled {
    border-style: solid;
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 35%, var(--border-color, #e8ddd6));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 6%, var(--card-bg, #fff));
    box-shadow: 0 8px 18px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, transparent);
  }

  .acm-slot__num {
    flex: 0 0 auto;
    width: 1.45rem;
    height: 1.45rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
    color: var(--accent-color, var(--fs-store-primary));
    font-size: 0.72rem;
    font-weight: 700;
  }

  .acm-slot__thumb {
    width: 2.35rem;
    height: 2.85rem;
    object-fit: cover;
    border-radius: 0.4rem;
    flex: 0 0 auto;
  }

  .acm-slot__meta {
    min-width: 0;
    flex: 1;
  }

  .acm-slot__name {
    display: block;
    font-size: 0.78rem;
    font-weight: 600;
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .acm-slot__empty {
    color: var(--muted-color, #7a6a62);
    font-size: 0.75rem;
  }

  .acm-slot__remove {
    flex: 0 0 auto;
    width: 1.5rem;
    height: 1.5rem;
    border: none;
    border-radius: 50%;
    background: transparent;
    color: var(--muted-color, #7a6a62);
    cursor: pointer;
    font-size: 1rem;
    line-height: 1;
  }

  .acm-slot__remove:hover {
    color: var(--text-color, #2b211c);
    background: color-mix(in srgb, var(--border-color, #e8ddd6) 55%, transparent);
  }

  .acm-picker {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(9.5rem, 1fr));
    gap: 0.85rem;
  }

  @media (min-width: 720px) {
    .acm-picker {
      grid-template-columns: repeat(auto-fill, minmax(11rem, 1fr));
      gap: 1rem;
    }
  }

  .acm-pick-slot {
    display: flex;
    min-width: 0;
  }

  .acm-pick-slot > .fs-product-card {
    width: 100%;
  }

  .acm-pick-slot.is-disabled {
    opacity: 0.42;
    pointer-events: none;
  }

  .acm-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem;
    justify-content: center;
    margin-top: 1.25rem;
  }

  .acm-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    justify-content: center;
    margin: 0 0 0.85rem;
    font-size: 0.75rem;
    color: var(--muted-color, #7a6a62);
  }

  .acm-legend__item {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
  }

  .acm-legend__swatch {
    width: 0.85rem;
    height: 0.85rem;
    border-radius: 0.25rem;
    border: 1px solid var(--border-color, #e8ddd6);
  }

  .acm-legend__swatch--same {
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
  }

  .acm-legend__swatch--best {
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 22%, var(--card-bg, #fff));
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 35%, transparent);
  }

  .acm-table-wrap {
    margin-top: 1.35rem;
    overflow-x: auto;
    border-radius: calc(var(--section-radius, 18px) * 0.85);
    border: 1px solid var(--border-color, #e8ddd6);
    background: var(--card-bg, #fff);
    box-shadow: 0 14px 34px rgba(43, 33, 28, 0.07);
    animation: acm-reveal 0.4s ease both;
  }

  .acm-user-hint {
    margin: 0;
    padding: 0.85rem 1rem 0;
    color: var(--muted-color, #7a6a62);
    font-size: 0.82rem;
    line-height: 1.55;
    text-align: center;
  }

  .acm-cell--input {
    padding: 0.55rem 0.65rem;
  }

  .acm-input {
    width: 100%;
    min-height: 44px;
    box-sizing: border-box;
    padding: 0.45rem 0.65rem;
    border: 1px solid var(--border-color, #e8ddd6);
    border-radius: 8px;
    background: color-mix(in srgb, var(--card-bg, #fff) 88%, var(--section-bg, #faf7f5));
    color: var(--text-color, #2b211c);
    font: inherit;
    font-size: 0.85rem;
  }

  .acm-input:focus {
    outline: 2px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, transparent);
    outline-offset: 1px;
    border-color: var(--accent-color, var(--fs-store-primary));
  }

  .acm-input::placeholder {
    color: color-mix(in srgb, var(--muted-color, #7a6a62) 75%, transparent);
  }

  .acm-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    min-width: 36rem;
  }

  .acm-table th,
  .acm-table td {
    padding: 0.85rem 0.95rem;
    border-bottom: 1px solid color-mix(in srgb, var(--border-color, #e8ddd6) 85%, transparent);
    text-align: start;
    vertical-align: middle;
    font-size: 0.9rem;
  }

  .acm-table tbody tr:last-child th,
  .acm-table tbody tr:last-child td {
    border-bottom: none;
  }

  .acm-table thead th {
    position: sticky;
    top: 0;
    z-index: 2;
    background:
      linear-gradient(180deg, color-mix(in srgb, var(--card-bg, #fff) 92%, #f3ebe4), var(--card-bg, #fff));
    font-weight: 700;
  }

  .acm-table__label {
    color: var(--muted-color, #7a6a62);
    font-weight: 600;
    white-space: nowrap;
    width: 9rem;
    background: color-mix(in srgb, var(--section-bg, #faf7f5) 55%, var(--card-bg, #fff));
  }

  .acm-table tbody tr:nth-child(even) td {
    background: color-mix(in srgb, var(--section-bg, #faf7f5) 35%, var(--card-bg, #fff));
  }

  .acm-cell--same {
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, var(--card-bg, #fff)) !important;
  }

  .acm-cell--best {
    position: relative;
    font-weight: 700;
    color: var(--accent-color, var(--fs-store-primary));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 14%, var(--card-bg, #fff)) !important;
  }

  .acm-cell__badge {
    display: inline-block;
    margin-inline-start: 0.35rem;
    padding: 0.1rem 0.4rem;
    border-radius: 999px;
    background: var(--accent-color, var(--fs-store-primary));
    color: #fff;
    font-size: 0.65rem;
    font-weight: 700;
    vertical-align: middle;
  }

  .acm-product-head {
    display: grid;
    gap: 0.45rem;
    justify-items: center;
    min-width: 9rem;
    padding: 0.25rem 0;
  }

  .acm-product-head__img {
    width: 5.25rem;
    height: 6.5rem;
    object-fit: cover;
    border-radius: calc(var(--section-radius, 18px) * 0.45);
    box-shadow: 0 10px 22px rgba(43, 33, 28, 0.14);
  }

  .acm-product-head__name {
    font-size: 0.88rem;
    font-weight: 700;
    line-height: 1.35;
    text-align: center;
  }

  .acm-product-head .fs-btn {
    width: 100%;
    justify-content: center;
  }

  @keyframes acm-reveal {
    from {
      opacity: 0;
      transform: translateY(0.55rem);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .acm-table-wrap {
      transition: none !important;
      animation: none !important;
    }
  }

  @media (max-width: 959px) {
    .acm-studio {
      padding: 1rem 0.75rem 1.15rem;
    }

    .acm-slots {
      grid-template-columns: 1fr;
      gap: 0.65rem;
    }

    .acm-slot__remove {
      width: 2.75rem;
      height: 2.75rem;
      display: grid;
      place-items: center;
      font-size: 1.2rem;
    }
  }

  @media (max-width: 639px) {
    .acm-picker {
      grid-template-columns: 1fr;
      gap: 0.65rem;
    }

    .acm-table {
      min-width: 28rem;
      font-size: 0.8rem;
    }

    .acm-product-head__img {
      width: 3.5rem;
      height: 4.4rem;
    }

    .acm-product-head,
    .acm-table__label {
      min-width: 6.25rem;
      width: auto;
    }

    .acm-table th,
    .acm-table td {
      padding: 0.55rem 0.55rem;
      font-size: 0.78rem;
    }

    .acm-table-wrap {
      margin-inline: -0.25rem;
      padding-bottom: 0.25rem;
    }
  }
`;
