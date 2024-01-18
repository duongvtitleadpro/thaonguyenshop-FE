import { Response } from "@/types/common";
import { Order, OrderResponse } from "@/types/order";
import axiosInstance from "@utils/axios";

export const addOrder = async (order: Order): Promise<OrderResponse> => {
  const { data } = await axiosInstance.post(`/order`, order);
  return data;
};
