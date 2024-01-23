export interface OrderResponse {
  status: number;
  message: string;
  data: Data[];
  total: number;
  offset: number;
  rowsPerPage: number;
  summary: Summary;
}

export interface Data {
  id: number;
  order_type: number;
  is_sale: number;
  customer_id: number;
  customer_email: string;
  customer_phone: string;
  customer_first_name: string;
  customer_last_name: string;
  billing_first_name: string;
  billing_last_name: string;
  billing_address_1: string;
  billing_address_2: any;
  billing_city: string;
  billing_state: string;
  billing_zip: string;
  billing_country: string;
  shipping_first_name: string;
  shipping_last_name: string;
  shipping_address_1: string;
  shipping_address_2: any;
  shipping_city: string;
  shipping_state: string;
  shipping_zip: string;
  shipping_country: string;
  sub_total: number;
  shipping_method: string;
  shipping_cost: number;
  coupon_id: any;
  discount: number;
  number_of_product: number;
  total: number;
  payment_method: string;
  currency: string;
  currency_rate: number;
  locale: string;
  status: OrderStatus;
  shipment_status: ShipmentStatus;
  china_order_code: any;
  note: string;
  admin_note?: string;
  deleted_at?: string;
  created_at: string;
  updated_at?: string;
  created_by: string;
  updated_by?: string;
  deleted_by: any;
  product_id: number;
  name: string;
  product_code: string;
  price: number;
  qty: number;
  options: Option[];
  path: string;
}

export interface Option {
  product_id: number;
  qty: number;
  line_total: number;
  order_product_id: number;
  option_label?: string;
}

export interface Summary {
  total_qty: number;
  total_amount: number;
}

type OrderStatus = "da_mua_hang" | "admin_huy_don" | "khach_huy_don";
type ShipmentStatus = "hang_ve_du" | "cho_phat_hang" | "hang_ve_thieu";
