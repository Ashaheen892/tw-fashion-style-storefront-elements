export type CardSide = 'right' | 'left' | 'auto';

export type AspectRatio = '3/4' | '2/3' | '4/5' | '1/1';

export type CraftMethod = 'hand' | 'machine' | 'both' | '';

export interface EmbroideryDetail {
  /** Collection order index — not a merchant ID */
  index: number;
  name: string;
  desc: string;
  image: string;
  alt: string;
  pos_x: number;
  pos_y: number;
  card_side: CardSide;
  stitch_type: string;
  thread: string;
  method: CraftMethod;
  duration: string;
  extra: string;
  product_url: string;
  btn_text: string;
  show_number: boolean;
  spot_color: string;
  is_featured: boolean;
  badge: string;
}

export interface LineGeom {
  index: number;
  d: string;
}
