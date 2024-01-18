export interface ProductCategoryResponse {
  status: number;
  message: string;
  data: Data[];
}

export interface Data {
  id: number;
  brand_id: any;
  tax_class_id: any;
  pro_type: number;
  product_code: string;
  slug: string;
  price: number;
  special_price?: number;
  retail_price: any;
  cost: any;
  special_price_type: any;
  special_price_start: any;
  special_price_end: any;
  selling_price: any;
  made_in?: string;
  sku: any;
  manage_stock: number;
  qty?: number;
  in_stock: number;
  viewed: number;
  is_active: number;
  is_sale: number;
  new_from: any;
  new_to: any;
  auto_deactive?: number;
  name: string;
  description: string;
  deactive_at: any;
  deleted_at?: string;
  created_at: string;
  updated_at?: string;
  virtual: number;
  created_by: string;
  updated_by?: string;
  deleted_by: any;
  path?: string;
  additional_images: AdditionalImage[];
  options: Option[];
  inventories: Inventory[];
}

export interface AdditionalImage {
  path: string;
}

export interface Option {
  id: number;
  type: string;
  is_required: number;
  is_global: number;
  position: number;
  has_image: number;
  deleted_at: any;
  created_at: string;
  updated_at?: string;
  name: string;
  pivot_product_id: number;
  pivot_option_id: number;
  option_values: OptionValue[];
}

export interface OptionValue {
  id: number;
  option_id: number;
  qty: any;
  price: any;
  price_type: string;
  position: number;
  created_at: string;
  updated_at?: string;
  label: string;
}

export interface Inventory {
  id: number;
  product_id: number;
  option_value1_id: number;
  option_value2_id: number;
  qty: number;
  option_value1?: string;
  option_value2?: string;
}
