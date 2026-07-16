import { css } from 'lit';

export const componentStyles = css`
  .es-shell {
    display: grid;
    gap: 1.5rem;
  }

  .es-featured {
    position: relative;
    padding: clamp(1.5rem, 4vw, 2.5rem);
    border-radius: var(--section-radius, 18px);
    border: 1px solid var(--border-color, #e8ddd6);
    background:
      radial-gradient(circle at 8% 0%, color-mix(in srgb, var(--accent-color, #8b5e4b) 14%, transparent), transparent 42%),
      linear-gradient(165deg, color-mix(in srgb, var(--card-bg, #fff) 92%, #f3ebe4), var(--card-bg, #fff));
    box-shadow: 0 18px 40px rgba(43, 33, 28, 0.07);
    overflow: hidden;
  }

  .es-featured__mark {
    position: absolute;
    top: 0.6rem;
    inset-inline-end: 1rem;
    font-size: clamp(4rem, 12vw, 7rem);
    line-height: 1;
    color: color-mix(in srgb, var(--accent-color, #8b5e4b) 16%, transparent);
    font-family: Georgia, 'Times New Roman', serif;
    pointer-events: none;
    user-select: none;
  }

  .es-featured__quote {
    margin: 0 0 1.25rem;
    max-width: 40rem;
    font-size: clamp(1.15rem, 2.4vw, 1.55rem);
    line-height: 1.75;
    font-weight: 500;
    color: var(--text-color, #2b211c);
  }

  .es-featured__meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.85rem;
  }

  .es-avatar {
    width: 3.25rem;
    height: 3.25rem;
    border-radius: 10px;
    object-fit: cover;
    background: color-mix(in srgb, var(--border-color, #e8ddd6) 70%, transparent);
  }

  .es-avatar--placeholder {
    display: grid;
    place-items: center;
    font-weight: 700;
    color: var(--accent-color, #8b5e4b);
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 12%, var(--card-bg, #fff));
  }

  .es-person {
    display: grid;
    gap: 0.15rem;
  }

  .es-person strong {
    font-size: 0.98rem;
  }

  .es-person span {
    font-size: 0.8rem;
    color: var(--muted-color, #7a6a62);
  }

  .es-stars {
    display: inline-flex;
    gap: 0.15rem;
    color: var(--accent-color, #8b5e4b);
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
    font-size: 0.82rem;
    color: var(--muted-color, #7a6a62);
  }

  .es-score strong {
    font-size: 1.35rem;
    color: var(--accent-color, #8b5e4b);
  }

  .es-rail {
    display: flex;
    gap: 0.85rem;
    overflow-x: auto;
    padding: 0.15rem 0.1rem 0.55rem;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
  }

  .es-rail::-webkit-scrollbar {
    height: 4px;
  }

  .es-rail::-webkit-scrollbar-thumb {
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 40%, transparent);
    border-radius: 999px;
  }

  .es-card {
    flex: 0 0 min(17.5rem, 78vw);
    scroll-snap-align: start;
    display: grid;
    gap: 0.75rem;
    padding: 1rem;
    border-radius: calc(var(--section-radius, 18px) * 0.7);
    border: 1px solid var(--border-color, #e8ddd6);
    background: var(--card-bg, #fff);
    text-align: start;
    color: inherit;
    font: inherit;
    cursor: pointer;
    transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
  }

  .es-card:hover {
    transform: translateY(-2px);
    border-color: color-mix(in srgb, var(--accent-color, #8b5e4b) 40%, var(--border-color, #e8ddd6));
  }

  .es-card--active {
    border-color: var(--accent-color, #8b5e4b);
    box-shadow: 0 12px 28px rgba(43, 33, 28, 0.1);
    background: color-mix(in srgb, var(--accent-color, #8b5e4b) 6%, var(--card-bg, #fff));
  }

  .es-card__quote {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.65;
    color: var(--text-color, #2b211c);
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .es-card__note {
    margin: 0;
    font-size: 0.72rem;
    color: var(--muted-color, #7a6a62);
  }

  .es-card__foot {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    margin-top: auto;
  }

  .es-card__foot .es-avatar {
    width: 2.35rem;
    height: 2.35rem;
    border-radius: 8px;
  }

  @media (max-width: 959px) {
    .es-shell {
      gap: 1.2rem;
    }

    .es-featured {
      padding: 1.25rem 1.1rem;
    }

    .es-rail {
      margin-inline: -16px;
      padding-inline: 16px;
    }
  }

  @media (max-width: 639px) {
    .es-shell {
      gap: 1rem;
    }

    .es-featured {
      padding: 1.05rem 0.9rem;
    }

    .es-featured__mark {
      font-size: 3.1rem;
      top: 0.2rem;
      inset-inline-end: 0.55rem;
    }

    .es-featured__quote {
      margin-bottom: 0.9rem;
      font-size: 1rem;
      line-height: 1.65;
    }

    .es-rail {
      margin-inline: -12px;
      padding-inline: 12px;
      gap: 0.65rem;
    }

    .es-card {
      flex-basis: min(15.5rem, 84vw);
      padding: 0.85rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .es-card,
    .es-card:hover {
      transition: none;
      transform: none;
    }
  }
`;
