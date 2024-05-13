import { Response } from "./common";
import { Product } from "./product";

export type Order = {
  productId: number;
  note: string;
  orderDetails: OrderDetail[];
  imageNote?: "";
};
export type EditOrder = {
  orderId: number;
  note: string;
  orderDetails: OrderDetail[];
};

export type OrderDetail = {
  productId: number;
  colorId: number | null;
  sizeId: number | null;
  quantity: number;
};

export type OrderResponse = {
  adminNote?: string;
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
  orderImages: OrderImage[];
  user: User;
};

export type OrderImage = {
  id: number;
  orderId: number;
  url: string;
};

export type OrderParam = {
  page?: number;
  size?: number;
  orderStatus?: OrderStatus[];
  allocationStatus?: AllocationStatus[];
  sizeIds?: number[];
  colorIds?: number[];
  query?: string;
  startDate?: string;
  endDate?: string;
};

export type OrderDetailRespose = {
  id: number;
  size: {
    title: string;
    id: number;
  } | null;
  color: {
    title: string;
    id: number;
  } | null;
  quantity: number;
  receivedQuantity: number;
};

export type User = {
  id: number;
  name: string;
};

export type PurchasedOrder = ResponseWithTotal<OrderResponse> & {
  size: {
    title: string;
    id: number;
  }[];
  color: {
    title: string;
    id: number;
  }[];
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

export type CombinedOrderDetail = {
  id: number;
  combinedOrderId: number;
  orderId: number;
  order: OrderResponse;
};

export type ResponseWithTotal<T> = Response<T> & {
  totalPrice: number;
  totalReceivedPrice: number;
  totalQuantity: number;
  totalReceivedQuantity: number;
};

export type SummaryOrderStatus = {
  totalOrder: number;
  totalPurchased: number;
  totalUnPurchased: number;
  totalCancelled: number;
  totalCustomerCancelled: number;
  totalOrderAllocated: number;
  totalAllocated: number;
  totalSent: number;
};

export interface IDownloadFileExport {
  id: number;
}
export type EditOrderDetail = {
  id: number;
  productId: number;
  colorId: number | null;
  sizeId: number | null;
  quantity: number;
};

export type EditOrderBody = {
  orderId: number;
  note: string;
  orderDetails: EditOrderDetail[];
  orderImages: string[];
  orderFileNote?: File | null;
};
