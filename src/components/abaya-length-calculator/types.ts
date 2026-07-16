export type ShoeType = 'flat' | 'mid' | 'high';
export type Preference = 'shorter' | 'exact' | 'longer';

export interface LengthRange {
  min_height: number;
  max_height: number;
  flat_length: number;
  mid_heel_length: number;
  high_heel_length: number;
  alt_size: string;
  note: string;
  products_url: string;
  range_label: string;
}

export interface CutOption {
  cut_id: string;
  cut_name: string;
  cut_desc: string;
  length_delta: number;
  is_default: boolean;
}

export interface NearbySuggestion {
  alt_size: string;
  suggestedLength: number;
  note: string;
  products_url: string;
  relation: 'lower' | 'higher';
}

export interface CalculationResult {
  range: LengthRange;
  baseLength: number;
  suggestedLength: number;
  cutDelta: number;
  scarfDelta: number;
  preferenceDelta: number;
  confidence: number;
  reason: string;
  nearby: NearbySuggestion[];
}
