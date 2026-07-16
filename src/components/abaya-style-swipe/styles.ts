import { css } from 'lit';

export const componentStyles = css`
  .ass-studio {
    position: relative;
    overflow: hidden;
    max-width: 28rem;
    margin: 0 auto;
    padding: 1.15rem 1rem 1.35rem;
    border-radius: var(--section-radius, 18px);
    border: 1px solid var(--border-color, #e8ddd6);
    background:
      radial-gradient(circle at 20% 0%, color-mix(in srgb, var(--accent-color, #8b5e4b) 16%, transparent), transparent 42%),
      radial-gradient(circle at 90% 100%, color-mix(in srgb, var(--accent-color, #8b5e4b) 10%, transparent), transparent 38%),
      linear-gradient(180deg, color-mix(in srgb, var(--card-bg, #fff) 90%, #f4ebe4), var(--card-bg, #fff));
    box-shadow: 0 18px 42px rgba(43, 33, 28, 0.08);
  }

  .ass-progress {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.55rem;
    margin-bottom: 1rem;
  }

  .ass-progress__meta {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.28rem 0.7rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 10%, var(--card-bg, #fff));
    color: var(--accent-color, #8b5e4b);
    font-size: 0.78rem;
    font-weight: 700;
  }

  .ass-progress__track {
    flex: 1;
    min-width: 7rem;
    height: 0.35rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #e8ddd6) 75%, transparent);
    overflow: hidden;
  }

  .ass-progress__fill {
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(
      90deg,
      color-mix(in srgb, var(--accent-color, #8b5e4b) 70%, #c4a484),
      var(--accent-color, #8b5e4b)
    );
    transition: width 0.35s ease;
  }

  .ass-hint {
    margin: 0 0 0.85rem;
    text-align: center;
    font-size: 0.82rem;
    color: var(--muted-color, #7a6a62);
  }

  .ass-deck {
    position: relative;
    width: min(100%, 22rem);
    margin: 0 auto;
    aspect-ratio: 3 / 4.35;
  }

  .ass-stack {
    position: absolute;
    inset: 0;
    border-radius: calc(var(--section-radius, 18px) * 0.85);
    border: 1px solid color-mix(in srgb, var(--border-color, #e8ddd6) 70%, transparent);
    background: color-mix(in srgb, var(--card-bg, #fff) 88%, #eee4dc);
    pointer-events: none;
  }

  .ass-stack--1 {
    transform: scale(0.96) translateY(0.55rem);
    opacity: 0.7;
  }

  .ass-stack--2 {
    transform: scale(0.92) translateY(1.05rem);
    opacity: 0.4;
  }

  .ass-card {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    border-radius: calc(var(--section-radius, 18px) * 0.85);
    overflow: hidden;
    background: #1c1613;
    border: 1px solid color-mix(in srgb, var(--border-color, #e8ddd6) 55%, transparent);
    box-shadow:
      0 22px 48px rgba(43, 33, 28, 0.18),
      0 2px 0 color-mix(in srgb, #fff 18%, transparent) inset;
    touch-action: none;
    user-select: none;
    will-change: transform;
    transition: transform 0.18s ease, box-shadow 0.18s ease;
    cursor: grab;
  }

  .ass-card--dragging {
    transition: none;
    cursor: grabbing;
    box-shadow: 0 28px 56px rgba(43, 33, 28, 0.24);
  }

  .ass-card__media {
    position: relative;
    flex: 1;
    min-height: 0;
    background:
      linear-gradient(145deg, #3a2c26, #1c1613 55%, #2a211c);
  }

  .ass-card__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
    display: block;
  }

  .ass-card__shade {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(180deg, rgba(20, 14, 12, 0.08) 28%, rgba(20, 14, 12, 0.78) 100%);
    pointer-events: none;
  }

  .ass-card__body {
    position: absolute;
    inset-inline: 0;
    bottom: 0;
    z-index: 2;
    padding: 1.15rem 1.1rem 1.2rem;
    color: #fff;
  }

  .ass-card__name {
    margin: 0 0 0.35rem;
    font-weight: 700;
    font-size: clamp(1.1rem, 2.4vw, 1.3rem);
    line-height: 1.3;
    text-shadow: 0 2px 14px rgba(0, 0, 0, 0.35);
  }

  .ass-card__desc {
    margin: 0;
    color: rgba(255, 255, 255, 0.86);
    font-size: 0.9rem;
    line-height: 1.6;
  }

  .ass-card__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin-top: 0.75rem;
  }

  .ass-tag {
    padding: 0.22rem 0.6rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.14);
    border: 1px solid rgba(255, 255, 255, 0.22);
    color: #fff;
    font-size: 0.72rem;
    font-weight: 600;
    backdrop-filter: blur(6px);
  }

  .ass-indicator {
    position: absolute;
    top: 1.1rem;
    z-index: 3;
    padding: 0.4rem 0.85rem;
    border-radius: 0.45rem;
    font-weight: 800;
    font-size: 0.92rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    opacity: 0;
    pointer-events: none;
    border: 2.5px solid;
    background: rgba(255, 255, 255, 0.92);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    transition: opacity 0.12s ease;
  }

  .ass-indicator--like {
    inset-inline-start: 1rem;
    color: #2f7a58;
    border-color: #2f7a58;
    transform: rotate(-14deg);
  }

  .ass-indicator--skip {
    inset-inline-end: 1rem;
    color: #b33a3a;
    border-color: #b33a3a;
    transform: rotate(14deg);
  }

  .ass-indicator--visible {
    opacity: 1;
  }

  .ass-controls {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    margin-top: 1.2rem;
  }

  .ass-btn-round {
    width: 3.6rem;
    height: 3.6rem;
    border-radius: 50%;
    border: 1px solid var(--border-color, #e8ddd6);
    background: var(--card-bg, #fff);
    font-size: 1.2rem;
    line-height: 1;
    cursor: pointer;
    display: grid;
    place-items: center;
    box-shadow: 0 10px 22px rgba(43, 33, 28, 0.08);
    transition: border-color 0.2s, transform 0.2s, background 0.2s, box-shadow 0.2s;
  }

  .ass-btn-round:hover {
    transform: translateY(-2px) scale(1.04);
    box-shadow: 0 14px 28px rgba(43, 33, 28, 0.12);
  }

  .ass-btn-round:active {
    transform: scale(0.97);
  }

  .ass-btn-round--like {
    color: #fff;
    background: linear-gradient(145deg, #3d9a72, #2f7a58);
    border-color: transparent;
  }

  .ass-btn-round--skip {
    color: #b33a3a;
    background: color-mix(in srgb, #b33a3a 8%, var(--card-bg, #fff));
    border-color: color-mix(in srgb, #b33a3a 28%, var(--border-color, #e8ddd6));
  }

  .ass-btn-labels {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    width: min(100%, 14rem);
    margin: 0.55rem auto 0;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--muted-color, #7a6a62);
  }

  .ass-btn-labels span:last-child {
    color: #2f7a58;
  }

  .ass-undo {
    width: 100%;
    justify-content: center;
    margin-top: 0.15rem;
  }

  .ass-result {
    position: relative;
    overflow: hidden;
    max-width: 28rem;
    margin: 0 auto;
    padding: 1.35rem 1.15rem 1.45rem;
    text-align: center;
    border-radius: var(--section-radius, 18px);
    border: 1px solid var(--border-color, #e8ddd6);
    background:
      radial-gradient(circle at top, color-mix(in srgb, var(--accent-color, #8b5e4b) 14%, transparent), transparent 45%),
      linear-gradient(180deg, color-mix(in srgb, var(--card-bg, #fff) 92%, #f3ebe4), var(--card-bg, #fff));
    box-shadow: 0 18px 42px rgba(43, 33, 28, 0.08);
    animation: ass-reveal 0.45s ease both;
  }

  .ass-result__badge {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    margin-bottom: 0.85rem;
    padding: 0.28rem 0.7rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 12%, var(--card-bg, #fff));
    color: var(--accent-color, #8b5e4b);
    font-size: 0.75rem;
    font-weight: 700;
  }

  .ass-result__frame {
    position: relative;
    width: min(100%, 15rem);
    margin: 0 auto 1rem;
    border-radius: calc(var(--section-radius, 18px) * 0.7);
    overflow: hidden;
    box-shadow: 0 16px 36px rgba(43, 33, 28, 0.16);
  }

  .ass-result__img {
    width: 100%;
    aspect-ratio: 3 / 4;
    object-fit: cover;
    display: block;
  }

  .ass-result__title {
    margin: 0 0 0.5rem;
    font-size: clamp(1.2rem, 2.4vw, 1.45rem);
    font-weight: 700;
    line-height: 1.35;
    color: var(--text-color, #2b211c);
  }

  .ass-result__desc {
    margin: 0 auto 1.1rem;
    max-width: 26rem;
    color: var(--muted-color, #7a6a62);
    font-size: 0.95rem;
    line-height: 1.7;
  }

  .ass-result__tag {
    display: inline-flex;
    margin-bottom: 1rem;
    padding: 0.28rem 0.75rem;
    border-radius: 999px;
    border: 1px solid var(--border-color, #e8ddd6);
    color: var(--text-color, #2b211c);
    font-size: 0.8rem;
    font-weight: 600;
  }

  .ass-result__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem;
    justify-content: center;
  }

  @keyframes ass-reveal {
    from {
      opacity: 0;
      transform: translateY(0.6rem) scale(0.98);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @media (max-width: 959px) {
    .ass-studio {
      padding-inline: 0.25rem;
    }

    .ass-controls {
      gap: 0.9rem;
      margin-top: 1rem;
    }
  }

  @media (max-width: 639px) {
    .ass-deck {
      width: min(100%, 18.5rem);
      aspect-ratio: 3 / 4.05;
    }

    .ass-controls {
      gap: 0.75rem;
      margin-top: 0.8rem;
    }

    .ass-btn-round {
      width: 3.65rem;
      height: 3.65rem;
    }

    .ass-btn-labels {
      font-size: 0.72rem;
    }
  }

  @media (max-height: 700px) {
    .ass-deck {
      aspect-ratio: 3 / 3.9;
      width: min(100%, 18rem);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .ass-card,
    .ass-progress__fill,
    .ass-btn-round,
    .ass-result {
      transition: none !important;
      animation: none !important;
    }
  }
`;
