export type ViewerMode = 'sequence' | 'video';

export type FpsOption = 1 | 2 | 3 | 4;

export type VideoSpeed = 0.5 | 0.75 | 1;

export type PanelSide = 'right' | 'left' | 'bottom';

export type AspectRatio = '3/4' | '1/1' | '4/5' | '16/9';

export interface MotionFrame {
  /** Stable key from collection index — not a merchant ID field */
  index: number;
  image: string;
  alt: string;
  title: string;
  desc: string;
  show_info: boolean;
  url: string;
  btn_text: string;
}

export interface MotionMeter {
  name: string;
  value: number;
}

export interface MotionInfo {
  name: string;
  desc: string;
  fabric: string;
  cut: string;
  meters: MotionMeter[];
  sleeves: string;
  product_url: string;
  product_btn: string;
}
