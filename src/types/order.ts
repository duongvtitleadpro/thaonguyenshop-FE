import { Product } from "./product";

export type Order = {
  productId: number;
  orderDetails: OrderDetail[];
};

export type OrderDetail = {
  productId: number;
  colorId: number | null;
  sizeId: number | null;
  quantity: number;
};

export type OrderResponse = {
  id: number;
  orderDate: string;
  totalPrice: number;
  note: any;
  productId: number;
  product: Product;
  userId: number;
  orderStatus: OrderStatus;
  allocationStatus: AllocationStatus;
  orderDetails: OrderDetailRespose[];
  user: User;
};

export type OrderParam = {
  page?: number;
  size?: number;
  orderStatus?: OrderStatus[];
  allocationStatus?: AllocationStatus[];
};

export type OrderDetailRespose = {
  size: {
    title: string;
  };
  color: {
    title: string;
  };
  quantity: number;
};

export type User = {
  id: number;
  name: string;
};

export type PurchasedOrder = OrderResponse & {
  orderDetailColor: {
    title: string;
  };
  orderDetailSize: {
    title: string;
  };
  orderDetailQuantity: number;
};

export type OrderStatus =
  | "NOT_PURCHASED"
  | "PURCHASED"
  | "CANCELLED"
  | "CUSTOMER_CANCELLED";

export type AllocationStatus = "SENT" | "ALLOCATED";

export type OrderCombineParam = {
  page?: number;
  size?: number;
};

export type OrderCombineResponse = {
  id: number;
  code?: string;
  createdAt: string;
  totalPrice: number;
  userId: number;
};
