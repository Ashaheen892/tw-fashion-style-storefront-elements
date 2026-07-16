export type CardDirection = 'left' | 'right' | 'top' | 'bottom' | '';

export type ProductSource = 'categories' | 'sales' | 'latest' | 'selected' | '';

export interface BoutiqueProduct {
  id: string;
  name: string;
  image: string;
  url: string;
  price: number;
  old_price: number;
}

export interface Hotspot {
  spot_id: string;
  spot_name: string;
  spot_desc: string;
  pos_x: number;
  pos_y: number;
  spot_image: string;
  spot_url: string;
  spot_btn: string;
  spot_color: string;
  card_dir: CardDirection;
  products_source: ProductSource;
  chosen_products: unknown;
  category: unknown;
  products_limit: number;
  demo_products: BoutiqueProduct[];
}
