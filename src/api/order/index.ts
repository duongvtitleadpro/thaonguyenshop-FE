import { Response } from "@/types/common";
import {
  Order,
  OrderParam,
  OrderResponse,
  OrderCombineParam,
  OrderCombineResponse,
  ResponseWithTotal,
} from "@/types/order";
import { objectToQueryStringByComma } from "@/utils";
import axiosInstance from "@utils/axios";

export const addOrder = async (order: Order): Promise<OrderResponse> => {
  const { data } = await axiosInstance.post(`/order`, order);
  return data;
};

export const getOrder = async (
  param: OrderParam
): Promise<ResponseWithTotal<OrderResponse>> => {
  const search = objectToQueryStringByComma(param);
  const { data } = await axiosInstance.get(`/order?${search}`);
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