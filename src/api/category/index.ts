import { Category } from "@/types/category";
import { Response } from "@/types/common";
import axiosInstance from "@utils/axios";

export const getAllCategory = async () => {
  const { data } = await axiosInstance.get<Response<Category>>("/category");
  return data;
};
