import { Response } from "./common";
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
  location?: string;
  productId: number;
  product: Product;
  userId: number;
  orderStatus: OrderStatus;
  allocationStatus: AllocationStatus;
  allocatedDate: string;
  orderDetails: OrderDetailRespose[];
  user: User;
};

export type OrderParam = {
  page?: number;
  size?: number;
  orderStatus?: OrderStatus[];
  allocationStatus?: AllocationStatus[];
  sizeIds?: number[];
  colorIds?: number[];
  query?: string;
};

export type OrderDetailRespose = {
  size: {
    title: string;
  };
  color: {
    title: string;
  };
  quantity: number;
  receivedQuantity: number;
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
  combinedOrderDetails: CombinedOrderDetail[];
};

export interface CombinedOrderDetail {
  id: number;
  combinedOrderId: number;
  orderId: number;
  order: Omit<OrderResponse, "orderDetails">;
}

export type ResponseWithTotal<T> = Response<T> & {
  totalPrice: number;
  totalQuantity: number;
  totalRecievedQuantity: number;
};
