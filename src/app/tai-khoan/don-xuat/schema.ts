export interface ExportResponse {
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
  customer_id: number;
  customer_email: string;
  customer_phone: string;
  customer_first_name: string;
  customer_last_name: string;
  customer_address: string;
  compensation: number;
  discount: number;
  total: number;
  fee_ship: number;
  amount: number;
  number_of_product: number;
  status: string;
  note: any;
  deleted_at: any;
  created_at: string;
  updated_at?: string;
  created_by: string;
  updated_by?: string;
  deleted_by: any;
}

export interface Summary {
  total: number;
  discount: number;
  amount: number;
}
