export interface LookItem {
  id: string;
  group_key: string;
  group_name: string;
  group_order: number;
  piece_name: string;
  image: string;
  price: number;
  old_price: number;
  url: string;
  product_id: string;
  is_default: boolean;
  color_note: string;
}

export interface LookGroup {
  key: string;
  name: string;
  order: number;
  items: LookItem[];
}

export interface LookItemDraft {
  id: string;
  group_key: string;
  group_name: string;
  group_order: number;
  product_id: string;
  product_label: string;
  /** Full product payload when Salla hydrates the picker (theme style). */
  hydrated: unknown | null;
  piece_name: string;
  image: string;
  price: number;
  old_price: number;
  url: string;
  is_default: boolean;
  color_note: string;
}
