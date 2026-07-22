import { css } from 'lit';

export const componentStyles = css`
  .alc-layout {
    display: grid;
    gap: 1.25rem;
  }

  @media (min-width: 900px) {
    .alc-layout {
      grid-template-columns: 1.1fr 0.9fr;
      align-items: start;
    }
  }

  .alc-form {
    display: grid;
    gap: 1.15rem;
    padding: 1.35rem;
  }

  .alc-field {
    display: grid;
    gap: 0.45rem;
  }

  .alc-field label,
  .alc-field legend {
    font-weight: 600;
    font-size: 0.92rem;
    color: var(--text-color, #000000);
  }

  .alc-field legend {
    padding: 0;
    margin-bottom: 0.15rem;
  }

  .alc-height-row {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0.65rem;
    align-items: center;
  }

  .alc-input,
  .alc-slider {
    width: 100%;
    box-sizing: border-box;
  }

  .alc-input {
    min-height: 44px;
    padding: 0.65rem 0.85rem;
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: calc(var(--section-radius, 16px) * 0.5);
    background: var(--card-bg, #ffffff);
    color: var(--text-color, #000000);
    font: inherit;
  }

  .alc-height-unit {
    min-width: 2.5rem;
    color: var(--muted-color, #666666);
    font-weight: 600;
  }

  .alc-slider {
    accent-color: var(--accent-color, var(--fs-store-primary));
    min-height: 44px;
    cursor: pointer;
    /* Match guide + size chips: min at inline-start (right in Arabic) */
    direction: inherit;
  }

  .alc-guide {
    display: grid;
    gap: 0.65rem;
    padding: 0.9rem;
    border: 1px dashed var(--border-color, #e5e7eb);
    border-radius: calc(var(--section-radius, 16px) * 0.45);
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 4%, var(--fs-surface, var(--card-bg, #ffffff)));
  }

  .alc-guide__track {
    position: relative;
    height: 12px;
    border-radius: 6px;
    /* Logical positioning so marker moves with size direction in RTL/LTR */
    direction: inherit;
    background: color-mix(in srgb, var(--border-color, #e5e7eb) 70%, transparent);
  }

  .alc-guide__segment {
    position: absolute;
    top: 0;
    bottom: 0;
    min-width: 2px;
    border-radius: 4px;
    opacity: 0.72;
    transition: opacity 0.2s ease, filter 0.2s ease;
  }

  .alc-guide__segment--active {
    opacity: 1;
    filter: brightness(1.05);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.35);
  }

  .alc-guide__marker {
    position: absolute;
    top: 50%;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid var(--card-bg, #ffffff);
    background: var(--accent-color, var(--fs-store-primary));
    transform: translateY(-50%);
    /* Negative inline margin centers the dot on the percentage edge in RTL + LTR */
    margin-inline-start: -8px;
    box-shadow: 0 2px 8px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 35%, transparent);
    pointer-events: none;
    z-index: 2;
  }

  .alc-guide__labels {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    color: var(--muted-color, #666666);
    font-size: 0.75rem;
  }

  .alc-guide__chips {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(5.75rem, 1fr));
    gap: 0.45rem;
  }

  .alc-chip {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    width: 100%;
    min-height: 44px;
    padding: 0.55rem 0.7rem;
    border-radius: 8px;
    border: 1px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #ffffff);
    color: var(--muted-color, #666666);
    font: inherit;
    font-size: 0.74rem;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
  }

  .alc-chip:hover {
    border-color: color-mix(in srgb, currentColor 40%, var(--border-color, #e5e7eb));
    background: color-mix(in srgb, currentColor 5%, var(--card-bg, #ffffff));
  }

  .alc-chip--active {
    border-color: currentColor;
    background: color-mix(in srgb, currentColor 12%, var(--card-bg, #ffffff));
    box-shadow: inset 0 0 0 1px color-mix(in srgb, currentColor 25%, transparent);
    font-weight: 600;
  }

  .alc-chip__swatch {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 3px;
    background: currentColor;
    flex: 0 0 auto;
  }

  .alc-chip__text {
    display: grid;
    gap: 0.1rem;
    text-align: start;
    line-height: 1.25;
    min-width: 0;
  }

  .alc-chip__name {
    font-weight: 600;
    color: var(--text-color, #000000);
  }

  .alc-chip--active .alc-chip__name {
    color: inherit;
  }

  .alc-chip__range {
    font-size: 0.64rem;
    opacity: 0.78;
    font-weight: 500;
  }

  .alc-options {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .alc-option {
    flex: 1 1 auto;
    min-width: 5.5rem;
    min-height: 44px;
    padding: 0.55rem 0.75rem;
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: calc(var(--section-radius, 16px) * 0.5);
    background: var(--card-bg, #ffffff);
    color: var(--text-color, #000000);
    font: inherit;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s, transform 0.2s;
    text-align: center;
  }

  .alc-option small {
    display: block;
    margin-top: 0.15rem;
    font-size: 0.72rem;
    color: var(--muted-color, #666666);
    font-weight: 400;
  }

  .alc-option[aria-pressed='true'] {
    border-color: var(--accent-color, var(--fs-store-primary));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #ffffff));
    font-weight: 600;
  }

  .alc-option:hover {
    transform: translateY(-1px);
  }

  .alc-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem;
    justify-content: center;
  }

  .alc-result {
    padding: 1.35rem;
    display: grid;
    gap: 1rem;
  }

  .alc-result__top {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    justify-content: center;
    align-items: center;
  }

  .alc-badge {
    display: inline-flex;
    align-items: center;
    min-height: 2rem;
    padding: 0.25rem 0.8rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 14%, transparent);
    color: var(--accent-color, var(--fs-store-primary));
    font-weight: 700;
    font-size: 0.88rem;
  }

  .alc-result__length {
    margin: 0;
    text-align: center;
    font-size: clamp(2.4rem, 6vw, 3.4rem);
    font-weight: 700;
    color: var(--accent-color, var(--fs-store-primary));
    line-height: 1.1;
  }

  .alc-result__unit {
    display: inline;
    margin-inline-start: 0.25rem;
    font-size: 1rem;
    color: var(--muted-color, #666666);
    font-weight: 500;
  }

  .alc-confidence {
    display: grid;
    gap: 0.35rem;
  }

  .alc-confidence__label {
    display: flex;
    justify-content: space-between;
    gap: 0.75rem;
    font-size: 0.82rem;
    color: var(--muted-color, #666666);
  }

  .alc-confidence__bar {
    height: 8px;
    border-radius: 999px;
    overflow: hidden;
    background: color-mix(in srgb, var(--border-color, #e5e7eb) 85%, transparent);
  }

  .alc-confidence__bar > span {
    display: block;
    height: 100%;
    background: var(--accent-color, var(--fs-store-primary));
    border-radius: inherit;
    transition: width 0.35s ease;
  }

  .alc-result__reason,
  .alc-result__note {
    margin: 0;
    color: var(--muted-color, #666666);
    font-size: 0.9rem;
    line-height: 1.65;
    text-align: center;
  }

  .alc-breakdown {
    display: grid;
    gap: 0.35rem;
    padding: 0.85rem;
    border-radius: calc(var(--section-radius, 16px) * 0.5);
    background: color-mix(in srgb, var(--fs-surface, #f3f4f6) 85%, var(--card-bg, #ffffff));
    font-size: 0.85rem;
  }

  .alc-breakdown__row {
    display: flex;
    justify-content: space-between;
    gap: 0.75rem;
    color: var(--text-color, #000000);
  }

  .alc-nearby {
    display: grid;
    gap: 0.55rem;
  }

  .alc-nearby__title {
    margin: 0;
    font-size: 0.88rem;
    font-weight: 700;
    color: var(--text-color, #000000);
  }

  .alc-nearby__list {
    display: grid;
    gap: 0.5rem;
  }

  @media (min-width: 640px) {
    .alc-nearby__list {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  .alc-nearby__card {
    display: grid;
    gap: 0.25rem;
    padding: 0.75rem;
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: calc(var(--section-radius, 16px) * 0.5);
    text-align: start;
    text-decoration: none;
    color: inherit;
    background: var(--card-bg, #ffffff);
  }

  .alc-nearby__card strong {
    color: var(--accent-color, var(--fs-store-primary));
  }

  .alc-error {
    margin: 0;
    padding: 0.75rem 1rem;
    border-radius: calc(var(--section-radius, 16px) * 0.5);
    background: color-mix(in srgb, var(--fs-danger, #cf4b4b) 12%, var(--fs-surface, var(--card-bg, #ffffff)));
    color: var(--fs-danger, #cf4b4b);
    font-size: 0.9rem;
    text-align: center;
  }

  .alc-disclaimer {
    margin-top: 0.25rem;
    text-align: center;
    font-size: 0.82rem;
    color: var(--muted-color, #666666);
    line-height: 1.6;
  }

  .alc-live-hint {
    margin: 0;
    text-align: center;
    font-size: 0.8rem;
    color: var(--muted-color, #666666);
  }

  .fs-animate .alc-result {
    animation: alc-fade-in 0.45s ease;
  }

  @media (max-width: 959px) {
    .alc-form,
    .alc-result {
      padding: 1.05rem 1rem;
    }

    .alc-actions {
      display: grid;
      grid-template-columns: 1fr;
    }

    .alc-actions .fs-btn {
      width: 100%;
    }
  }

  @media (max-width: 639px) {
    .alc-form,
    .alc-result {
      padding: 0.95rem 0.85rem;
    }

    .alc-guide__chips {
      grid-template-columns: 1fr;
      gap: 0.45rem;
    }

    .alc-chip {
      font-size: 0.78rem;
    }

    .alc-height-row {
      grid-template-columns: 1fr;
      gap: 0.45rem;
    }

    .alc-option {
      min-height: 44px;
    }

    .alc-actions {
      display: grid;
      grid-template-columns: 1fr;
    }

    .alc-actions .fs-btn {
      width: 100%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .alc-option:hover,
    .alc-confidence__bar > span,
    .fs-animate .alc-result {
      transform: none;
      animation: none;
      transition: none;
    }
  }

  @keyframes alc-fade-in {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
