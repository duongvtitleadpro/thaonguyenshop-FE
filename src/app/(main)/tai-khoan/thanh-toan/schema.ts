export interface RechargeResponse {
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
  customer_name: string;
  amount: number;
  trade_content: string;
  status: number;
  created_at: string;
  created_by: string;
  updated_at?: string;
  updated_by?: string;
}

export interface Summary {
  amount: number;
}
