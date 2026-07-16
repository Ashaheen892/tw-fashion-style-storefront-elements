export type ZoomLevel = 1.5 | 2 | 2.5 | 3;

export type AspectRatio = '3/4' | '1/1' | '4/5' | '16/9';

export interface LightMetric {
  key: string;
  labelAr: string;
  labelEn: string;
  value: number;
}

export interface LightMode {
  /** Collection index — not a merchant-entered ID */
  index: number;
  name: string;
  desc: string;
  image: string;
  thumb: string;
  alt: string;
  is_default: boolean;
  shine: number;
  embroidery: number;
  color_depth: number;
  flow: number;
  transparency: number;
  day_fit: number;
  night_fit: number;
  color_name: string;
  notes: string;
  product_url: string;
  btn_text: string;
}
