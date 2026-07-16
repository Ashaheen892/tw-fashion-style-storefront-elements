export interface FabricCare {
  fabric_name: string;
  fabric_image: string;
  fabric_summary: string;
  pre_wash: string;
  wash: string;
  dry: string;
  iron: string;
  store: string;
  stain: string;
  embroidery_warn: string;
  wash_temp: string;
  allow_washer: boolean;
  allow_dryer: boolean;
  allow_steam: boolean;
}

export interface CareStep {
  key: string;
  labelAr: string;
  labelEn: string;
  value: string;
}
