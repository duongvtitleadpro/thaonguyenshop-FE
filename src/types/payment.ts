export type PaymentParam = {
  page: number;
  size: number;
  query?: string;
};

export type PaymentDetail = {
  id: number;
  paymentCode: string;
  amount: number;
  content: string;
  createdAt: string;
  userId: number;
};
