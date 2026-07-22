import { css } from 'lit';

export const componentStyles = css`
  .es-shell {
    display: grid;
    gap: 1.35rem;
  }

  .es-featured {
    position: relative;
    padding: clamp(1.6rem, 4vw, 2.65rem);
    border-radius: var(--section-radius, 18px);
    border: 1px solid var(--border-color, #e5e7eb);
    background:
      radial-gradient(circle at 8% 0%, color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 16%, transparent), transparent 42%),
      linear-gradient(165deg, color-mix(in srgb, var(--card-bg, #ffffff) 92%, var(--fs-surface, #f3f4f6)), var(--card-bg, #ffffff));
    box-shadow: 0 18px 42px color-mix(in srgb, var(--text-color, #000) 9%, transparent);
    overflow: hidden;
    animation: es-swap 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }

  @keyframes es-swap {
    from {
      opacity: 0.35;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  .es-featured__mark {
    position: absolute;
    top: 0.4rem;
    inset-inline-end: 1rem;
    font-size: clamp(4.5rem, 14vw, 8rem);
    line-height: 1;
    color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 18%, transparent);
    font-family: Georgia, 'Times New Roman', serif;
    pointer-events: none;
    user-select: none;
  }

  .es-featured__quote {
    margin: 0 0 1.35rem;
    max-width: 40rem;
    font-size: clamp(1.2rem, 2.5vw, 1.65rem);
    line-height: 1.75;
    font-weight: 500;
    color: var(--text-color, #000000);
  }

  .es-featured__meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.85rem;
  }

  .es-avatar {
    width: 3.35rem;
    height: 3.35rem;
    border-radius: 999px;
    object-fit: cover;
    border: 2px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 25%, #fff);
    background: color-mix(in srgb, var(--border-color, #e5e7eb) 70%, transparent);
    box-shadow: 0 8px 18px color-mix(in srgb, var(--text-color, #000) 12%, transparent);
  }

  .es-avatar--placeholder {
    display: grid;
    place-items: center;
    font-weight: 800;
    color: var(--accent-color, var(--fs-store-primary));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #ffffff));
  }

  .es-person {
    display: grid;
    gap: 0.12rem;
  }

  .es-person strong {
    font-size: 0.98rem;
  }

  .es-person span {
    font-size: 0.8rem;
    color: var(--muted-color, #666666);
  }

  .es-stars {
    display: inline-flex;
    gap: 0.12rem;
    color: var(--accent-color, var(--fs-store-primary));
    font-size: 0.95rem;
    letter-spacing: 0.04em;
  }

  .es-stars--muted {
    opacity: 0.28;
  }

  .es-score {
    display: inline-flex;
    align-items: baseline;
    gap: 0.4rem;
    margin-inline-start: auto;
    padding: 0.35rem 0.7rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, transparent);
    font-size: 0.8rem;
    color: var(--muted-color, #666666);
  }

  .es-score strong {
    font-size: 1.25rem;
    color: var(--accent-color, var(--fs-store-primary));
  }

  .es-swiper {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    overflow: hidden;
    padding: 0.2rem 0 0.35rem;
  }

  .es-slide {
    width: min(78vw, 17.5rem);
    height: auto;
  }

  .es-card {

    width: 100%;
    display: grid;
    gap: 0.65rem;
    min-height: 11.5rem;
    padding: 1rem 1.05rem;
    border-radius: calc(var(--section-radius, 16px) * 0.85);
    border: 1px solid var(--border-color, #e5e7eb);
    background: var(--card-bg, #ffffff);
    color: inherit;
    font: inherit;
    text-align: start;
    cursor: pointer;
    box-shadow: 0 10px 24px rgba(43, 33, 28, 0.05);
    transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
  }

  .fs-animate .es-card {
    animation: es-rise 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .fs-animate .es-card:nth-child(1) { animation-delay: 0.05s; }
  .fs-animate .es-card:nth-child(2) { animation-delay: 0.12s; }
  .fs-animate .es-card:nth-child(3) { animation-delay: 0.19s; }
  .fs-animate .es-card:nth-child(4) { animation-delay: 0.26s; }

  @keyframes es-rise {
    from {
      opacity: 0;
      transform: translateY(14px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  .es-card:hover {
    transform: translateY(-3px);
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 40%, var(--border-color, #e5e7eb));
  }

  .es-card--active {
    border-color: var(--accent-color, var(--fs-store-primary));
    box-shadow:
      0 0 0 1px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 35%, transparent),
      0 16px 34px color-mix(in srgb, var(--text-color, #000) 12%, transparent);
    background:
      linear-gradient(
        160deg,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, var(--card-bg, #ffffff)),
        var(--card-bg, #ffffff)
      );
  }

  .es-card__quote {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.6;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .es-card__note {
    margin: 0;
    font-size: 0.75rem;
    color: var(--accent-color, var(--fs-store-primary));
    font-weight: 700;
  }

  .es-card__foot {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    margin-top: auto;
  }

  .es-card .es-avatar {
    width: 2.35rem;
    height: 2.35rem;
  }

  @media (prefers-reduced-motion: reduce) {
    .es-featured,
    .es-card {
      animation: none !important;
      transition: none !important;
      transform: none !important;
    }
  }
`;
