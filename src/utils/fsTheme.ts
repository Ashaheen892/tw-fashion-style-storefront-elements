/**
 * Reliable light/dark + store-primary tokens for Lit shadow roots.
 * `:host-context()` is fragile (iframe demos / Firefox), so we also push
 * CSS variables onto hosts and `.fs-section` nodes when the document theme changes.
 */

export type FsThemeMode = 'light' | 'dark';

const PRIMARY =
  'var(--color-primary, var(--primary-color, var(--color-main, #64748b)))';

export function detectFsTheme(): FsThemeMode {
  if (typeof document === 'undefined') return 'light';
  const root = document.documentElement;
  const attr = (
    root.getAttribute('data-theme') ||
    root.getAttribute('data-mode') ||
    ''
  ).toLowerCase();
  if (attr === 'dark') return 'dark';
  if (attr === 'light') return 'light';
  if (root.classList.contains('dark') || document.body?.classList.contains('dark')) {
    return 'dark';
  }
  try {
    const stored = localStorage.getItem('salla_demo_theme');
    if (stored === 'dark' || stored === 'light') return stored;
  } catch {
    /* ignore */
  }
  return 'light';
}

/** CSS variables that must win inside component trees. */
export function fsThemeVars(mode: FsThemeMode = detectFsTheme()): Record<string, string> {
  const dark = mode === 'dark';
  return {
    '--fs-store-primary': PRIMARY,
    '--accent-color': PRIMARY,
    '--button-bg': PRIMARY,
    '--button-color': '#ffffff',
    '--text-color': dark ? '#ffffff' : '#000000',
    '--muted-color': dark ? '#aaaaaa' : '#666666',
    '--card-bg': dark ? '#141414' : '#ffffff',
    '--fs-surface': dark ? '#1a1a1a' : '#f3f4f6',
    '--border-color': dark ? 'rgba(255, 255, 255, 0.14)' : '#e5e7eb',
    '--section-bg': 'transparent',
    colorScheme: dark ? 'dark' : 'light',
  };
}

function applyVars(el: HTMLElement, vars: Record<string, string>, mode: FsThemeMode): void {
  for (const [key, value] of Object.entries(vars)) {
    if (key === 'colorScheme') {
      el.style.colorScheme = value;
      continue;
    }
    el.style.setProperty(key, value);
  }
  el.setAttribute('data-fs-theme', mode);
}

function walkAndApply(root: Document | ShadowRoot, vars: Record<string, string>, mode: FsThemeMode): void {
  root.querySelectorAll('.fs-section').forEach((node) => {
    applyVars(node as HTMLElement, vars, mode);
  });
}

function refreshLitHosts(): void {
  document.querySelectorAll('*').forEach((node) => {
    const el = node as HTMLElement & { requestUpdate?: () => void };
    const shadow = el.shadowRoot;
    if (!shadow?.querySelector('.fs-section')) return;
    if (typeof el.requestUpdate === 'function') el.requestUpdate();
  });
}

/** Push theme tokens onto every mounted kit host / section. */
export function applyFsThemeToDocument(mode: FsThemeMode = detectFsTheme()): void {
  if (typeof document === 'undefined') return;
  const vars = fsThemeVars(mode);
  document.documentElement.setAttribute('data-fs-theme', mode);
  walkAndApply(document, vars, mode);

  document.querySelectorAll('*').forEach((node) => {
    const el = node as HTMLElement;
    const shadow = el.shadowRoot;
    if (!shadow) return;
    if (shadow.querySelector('.fs-section')) {
      applyVars(el, vars, mode);
      walkAndApply(shadow, vars, mode);
    }
  });

  try {
    window.dispatchEvent(
      new CustomEvent('fs-theme-changed', { detail: { mode } })
    );
  } catch {
    /* ignore */
  }
}

let watching = false;
let syncTimer: ReturnType<typeof setTimeout> | null = null;
let lastMode: FsThemeMode | null = null;

function scheduleSync(): void {
  if (syncTimer) clearTimeout(syncTimer);
  syncTimer = setTimeout(() => {
    syncTimer = null;
    const mode = detectFsTheme();
    applyFsThemeToDocument(mode);
    if (lastMode !== mode) {
      lastMode = mode;
      refreshLitHosts();
    }
  }, 40);
}

/** Start a single document-level theme observer (idempotent). */
export function ensureFsThemeWatch(): void {
  if (watching || typeof document === 'undefined') return;
  watching = true;

  lastMode = detectFsTheme();
  scheduleSync();

  try {
    new MutationObserver(scheduleSync).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'data-mode', 'class'],
    });
    if (document.body) {
      new MutationObserver(scheduleSync).observe(document.body, {
        attributes: true,
        attributeFilter: ['class', 'data-theme', 'data-mode'],
      });
    }
  } catch {
    /* ignore */
  }

  window.addEventListener('storage', (event) => {
    if (event.key === 'salla_demo_theme') scheduleSync();
  });

  // Catch late-mounted custom elements in the Salla demo grid.
  try {
    new MutationObserver((records) => {
      if (records.some((r) => r.addedNodes.length)) scheduleSync();
    }).observe(document.documentElement, { childList: true, subtree: true });
  } catch {
    /* ignore */
  }
}

/** Accent-tinted swatch that tracks store primary in light and dark. */
export function fsAccentTone(index: number, steps = 5): string {
  const stops = [28, 40, 52, 64, 78];
  const pct = stops[index % Math.max(steps, stops.length)] ?? 45;
  return `color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) ${pct}%, var(--fs-surface, #f3f4f6))`;
}
