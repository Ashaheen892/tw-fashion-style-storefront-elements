export interface CompareAttribute {
  key: string;
  label: string;
  value: string;
}

export interface CompareProduct {
  id: string;
  product_id: string;
  name: string;
  image: string;
  price: number;
  old_price: number;
  url: string;
  btn_text: string;
  /** Merchant-configured comparison rows for this product */
  attributes: CompareAttribute[];
}

export interface CompareCriterion {
  key: string;
  label: string;
}

export interface CompareRow {
  key: string;
  labelAr: string;
  labelEn: string;
  kind: 'price' | 'discount' | 'attr';
  criterionKey?: string;
  highlightIdentical?: boolean;
  isPrice?: boolean;
  isDiscount?: boolean;
}
