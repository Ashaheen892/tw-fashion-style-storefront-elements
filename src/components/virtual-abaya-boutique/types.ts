export type CardDirection = 'left' | 'right' | 'top' | 'bottom' | '';

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
}
