export interface FabricLabItem {
  id: string;
  fabric_name: string;
  fabric_desc: string;
  macro_image: string;
  video_url: string;
  flow: number;
  thickness: number;
  shine: number;
  summer: number;
  wrinkle: number;
  transparency: number;
  wash_care: string;
  iron_care: string;
  best_use: string;
}

export interface MeterSpec {
  key: keyof Pick<
    FabricLabItem,
    'flow' | 'thickness' | 'shine' | 'summer' | 'wrinkle' | 'transparency'
  >;
  labelAr: string;
  labelEn: string;
}

export const METER_SPECS: MeterSpec[] = [
  { key: 'flow', labelAr: 'انسيابية', labelEn: 'Flow' },
  { key: 'thickness', labelAr: 'سُمك', labelEn: 'Thickness' },
  { key: 'shine', labelAr: 'لمعان', labelEn: 'Shine' },
  { key: 'summer', labelAr: 'مناسبة للصيف', labelEn: 'Summer' },
  { key: 'wrinkle', labelAr: 'مقاومة التجاعيد', labelEn: 'Wrinkle resist' },
  { key: 'transparency', labelAr: 'شفافية', labelEn: 'Transparency' },
];
