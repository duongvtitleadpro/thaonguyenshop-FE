import { Response } from "@/types/common";
import {
  Order,
  OrderParam,
  OrderResponse,
  OrderCombineParam,
  OrderCombineResponse,
  ResponseWithTotal,
  EditOrder,
  SummaryOrderStatus,
  PurchasedOrder,
  EditOrderBody,
} from "@/types/order";
import { objectToQueryStringByComma } from "@/utils";
import axiosInstance from "@utils/axios";

export const addOrder = async (order: Order): Promise<OrderResponse[]> => {
  const { data } = await axiosInstance.post(`/order`, order);
  return data;
};

export const editOrder = async (
  order: EditOrderBody
): Promise<OrderResponse> => {
  const { data } = await axiosInstance.put(`/order/customer`, order);
  return data;
};

export const getOrder = async (param: OrderParam): Promise<PurchasedOrder> => {
  const search = objectToQueryStringByComma(param);
  const { data } = await axiosInstance.get(`/order?${search}`);
  return data;
};

export const getOrderDetail = async (id: string): Promise<OrderResponse> => {
  const { data } = await axiosInstance.get(`/order/${id}`);
  return data;
};

export const getCombineOrder = async (
  param: OrderCombineParam
): Promise<Response<OrderCombineResponse>> => {
  const search = objectToQueryStringByComma(param);
  const { data } = await axiosInstance.get(`/order/combined-orders?${search}`);
  return data;
};

export const getCombineOrderDetail = async (
  id: number
): Promise<OrderCombineResponse> => {
  const { data } = await axiosInstance.get(`/order/combined-orders/${id}`);
  return data;
};

export const cancelOrder = async (id: number) => {
  const { data } = await axiosInstance.patch(`/order/cancel/${id}`);
  return data;
};

export const getSummaryOrderStatus = async (): Promise<SummaryOrderStatus> => {
  const { data } = await axiosInstance.get(`/order/summary-order-status`);
  return data;
};
