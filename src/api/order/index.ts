import { Response } from "@/types/common";
import { Order, OrderParam, OrderResponse } from "@/types/order";
import { objectToQueryString } from "@/utils";
import axiosInstance from "@utils/axios";

export const addOrder = async (order: Order): Promise<OrderResponse> => {
  const { data } = await axiosInstance.post(`/order`, order);
  return data;
};

export const getOrder = async (
  param: OrderParam
): Promise<Response<OrderResponse>> => {
  const search = objectToQueryString(param);
  const { data } = await axiosInstance.get(`/order?${search}`);
  return data;
};
