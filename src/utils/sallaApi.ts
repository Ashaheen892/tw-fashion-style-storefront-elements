/**
 * Thin wrappers around the Twilight Salla SDK for storefront elements.
 * Product detail failures otherwise fire availability notifiers
 * (alert: نفذت الكمية / حقل التصنيفات مطلوب).
 */

export type SallaProductApi = {
  fetch?: (params: Record<string, unknown>) => Promise<unknown>;
  api?: {
    fetch?: (params: Record<string, unknown>) => Promise<unknown>;
    getDetails?: (id: string | number) => Promise<unknown>;
  };
  getDetails?: (id: string | number, includes?: string[]) => Promise<unknown>;
};

export type SallaCartApi = {
  addItem?: (
    payload:
      | { id: string | number; quantity?: number }
      | FormData
      | Record<string, unknown>
  ) => Promise<unknown>;
  addItems?: (
    items: Array<{ id: string | number; quantity?: number }>
  ) => Promise<unknown>;
};

export type SallaApi = {
  onReady?: () => Promise<unknown> | void;
  api?: {
    withoutNotifier?: <T>(callback: () => T | Promise<T>) => Promise<T>;
  };
  notify?: unknown;
  product?: SallaProductApi;
  cart?: SallaCartApi;
};

export function getSalla(): SallaApi | null {
  const w = window as unknown as { Salla?: SallaApi; salla?: SallaApi };
  return w.Salla || w.salla || null;
}

function isEmptySourceValue(value: unknown): boolean {
  if (value == null) return true;
  if (typeof value === 'string') {
    const t = value.trim();
    return !t || t === '[]' || t === 'null' || t === 'undefined';
  }
  if (Array.isArray(value)) return value.length === 0;
  return false;
}

/** Reject API shapes that always trigger Salla validation alerts. */
export function canFetchProducts(params: Record<string, unknown>): boolean {
  const source = String(params.source || '')
    .toLowerCase()
    .trim();
  if (!source) return false;
  if (source === 'categories' && isEmptySourceValue(params.source_value)) {
    return false;
  }
  if (source === 'selected' && isEmptySourceValue(params.source_value)) {
    return false;
  }
  return true;
}

/**
 * Run a Salla API call without toast/alert notifiers when supported.
 * Twilight local demo mocks `withoutNotifier` incompletely — also mute
 * `window.alert` for the duration of the call.
 */
export async function silentSalla<T>(fn: () => Promise<T>): Promise<T> {
  const salla = getSalla();
  const wrap = salla?.api?.withoutNotifier;
  const win = window as Window & { alert: typeof window.alert };
  const prevAlert = win.alert;
  win.alert = (() => {
    /* swallow demo validation alerts e.g. حقل التصنيفات مطلوب */
  }) as typeof window.alert;

  try {
    if (typeof wrap === 'function') {
      try {
        return await Promise.resolve(wrap(fn) as Promise<T>);
      } catch {
        // Incomplete SDK / demo — retry without the wrapper
      }
    }
    return await fn();
  } finally {
    win.alert = prevAlert;
  }
}

export async function awaitSallaReady(): Promise<SallaApi | null> {
  const salla = getSalla();
  if (!salla) return null;
  try {
    if (typeof salla.onReady === 'function') await salla.onReady();
  } catch {
    // continue
  }
  return salla;
}

export function unwrapData(res: unknown): unknown {
  if (res && typeof res === 'object' && 'data' in (res as object)) {
    return (res as { data: unknown }).data;
  }
  return res;
}

export function unwrapList(res: unknown): unknown[] {
  const data = unwrapData(res);
  if (Array.isArray(data)) return data;
  if (data && typeof data === 'object') {
    const obj = data as Record<string, unknown>;
    if (Array.isArray(obj.data)) return obj.data;
    if (Array.isArray(obj.products)) return obj.products;
    if (Array.isArray(obj.items)) return obj.items;
  }
  return [];
}

export function toSourceIds(ids: string[]): Array<number | string> {
  return ids
    .map((id) => String(id).trim())
    .filter(Boolean)
    .map((id) => {
      const n = Number(id);
      return Number.isFinite(n) && String(n) === id ? n : id;
    });
}

/** Fetch product list silently; tries product.fetch then product.api.fetch. */
export async function fetchSallaProducts(
  params: Record<string, unknown>
): Promise<unknown[]> {
  try {
    if (!canFetchProducts(params)) return [];

    const salla = await awaitSallaReady();
    if (!salla?.product) return [];

    const fetchers = [
      salla.product.fetch?.bind(salla.product),
      salla.product.api?.fetch?.bind(salla.product.api),
    ].filter(
      (fn): fn is (p: Record<string, unknown>) => Promise<unknown> =>
        typeof fn === 'function'
    );

    if (!fetchers.length) return [];

    return await silentSalla(async () => {
      for (const fetchFn of fetchers) {
        try {
          const list = unwrapList(await fetchFn(params));
          if (list.length) return list;
        } catch {
          // try next
        }
      }
      return [];
    });
  } catch {
    return [];
  }
}

/** Fetch a single product silently (avoids نفذت الكمية alerts on failed details). */
export async function fetchSallaProductDetails(
  productId: string | number
): Promise<unknown | null> {
  try {
    const salla = await awaitSallaReady();
    if (!salla?.product || productId == null || productId === '') return null;

    return await silentSalla(async () => {
      try {
        if (typeof salla.product!.getDetails === 'function') {
          return unwrapData(await salla.product!.getDetails(productId));
        }
      } catch {
        // try api
      }

      try {
        if (typeof salla.product!.api?.getDetails === 'function') {
          return unwrapData(await salla.product!.api.getDetails(productId));
        }
      } catch {
        return null;
      }

      return null;
    });
  } catch {
    return null;
  }
}

function productIdFromRaw(raw: unknown): string {
  if (raw == null) return '';
  if (typeof raw === 'number' || typeof raw === 'string') return String(raw).trim();
  if (typeof raw !== 'object') return '';
  const obj = raw as Record<string, unknown>;
  const direct = obj.id ?? obj.product_id ?? obj.value;
  if (direct != null && typeof direct !== 'object') return String(direct).trim();
  if (direct && typeof direct === 'object') {
    const nested = direct as Record<string, unknown>;
    return String(nested.id ?? nested.product_id ?? nested.value ?? '').trim();
  }
  return '';
}

/**
 * Batch-fetch selected products, then fill misses with getDetails (Saji style).
 */
export async function fetchSelectedProductsMap(
  ids: string[]
): Promise<Map<string, unknown>> {
  const unique = [...new Set(ids.map((id) => String(id).trim()).filter(Boolean))];
  const map = new Map<string, unknown>();
  if (!unique.length) return map;

  const batch = await fetchSallaProducts({
    source: 'selected',
    source_value: toSourceIds(unique),
    limit: unique.length,
  });

  for (const item of batch) {
    const id = productIdFromRaw(item);
    if (id) map.set(id, item);
  }

  const missing = unique.filter((id) => !map.has(id));
  if (missing.length) {
    const details = await Promise.all(
      missing.map(async (id) => {
        const raw = await fetchSallaProductDetails(id);
        return [id, raw] as const;
      })
    );
    for (const [id, raw] of details) {
      if (raw) map.set(id, raw);
    }
  }

  return map;
}

function asCartId(id: string | number): string | number {
  const n = Number(id);
  return Number.isFinite(n) && String(n) === String(id).trim() ? n : id;
}

async function tryAddOneItem(
  addItem: SallaCartApi['addItem'],
  id: string | number
): Promise<boolean> {
  if (typeof addItem !== 'function') return false;
  const cartId = asCartId(id);

  const payloads: Array<
    { id: string | number; quantity: number } | { product_id: string | number; quantity: number } | FormData
  > = [
    { id: cartId, quantity: 1 },
    { product_id: cartId, quantity: 1 },
  ];

  const fd = new FormData();
  fd.append('id', String(cartId));
  fd.append('quantity', '1');
  payloads.push(fd);

  const fdPid = new FormData();
  fdPid.append('product_id', String(cartId));
  fdPid.append('quantity', '1');
  payloads.push(fdPid);

  for (const payload of payloads) {
    try {
      await addItem(payload as Parameters<NonNullable<SallaCartApi['addItem']>>[0]);
      return true;
    } catch {
      // try next payload shape
    }
  }
  return false;
}

/** Add products to cart (Raed / Saji: salla.cart.addItem). */
export async function addProductsToCart(
  productIds: Array<string | number>
): Promise<{ ok: boolean; added: number; error?: string }> {
  const ids = productIds
    .map((id) => String(id).trim())
    .filter(Boolean)
    .map((id) => {
      const n = Number(id);
      return Number.isFinite(n) && String(n) === id ? n : id;
    });

  if (!ids.length) {
    return { ok: false, added: 0, error: 'empty' };
  }

  const salla = await awaitSallaReady();
  const cart = salla?.cart;
  const addItem = cart?.addItem?.bind(cart);
  const addItems = cart?.addItems?.bind(cart);

  if (typeof addItem !== 'function' && typeof addItems !== 'function') {
    return { ok: false, added: 0, error: 'unavailable' };
  }

  let added = 0;
  try {
    await silentSalla(async () => {
      if (typeof addItems === 'function') {
        try {
          await addItems(ids.map((id) => ({ id, quantity: 1 })));
          added = ids.length;
          return;
        } catch {
          // fall through to per-item
        }
      }

      for (const id of ids) {
        if (await tryAddOneItem(addItem, id)) added += 1;
      }
    });

    if (added === ids.length) return { ok: true, added };
    if (added > 0) return { ok: false, added, error: 'partial' };
    return { ok: false, added: 0, error: 'failed' };
  } catch {
    return { ok: false, added, error: added > 0 ? 'partial' : 'failed' };
  }
}
