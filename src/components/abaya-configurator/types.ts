export interface ConfigOption {
  group_key: string;
  group_name: string;
  group_order: number;
  option_id: string;
  option_name: string;
  overlay_image: string;
  price_delta: number;
  is_default: boolean;
  option_desc: string;
  thumb_image: string;
  swatch_color: string;
}

export interface OptionGroup {
  key: string;
  name: string;
  order: number;
  options: ConfigOption[];
}
