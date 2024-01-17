import { Response } from "@/types/common";
import { Product, ProductParam, ProductSize } from "@/types/product";
import { objectToQueryString } from "@/utils";
import axiosInstance from "@utils/axios";

export const getProductList = async (
  param: ProductParam
): Promise<Response<Product>> => {
  const search = objectToQueryString(param);
  const { data } = await axiosInstance.get(`/product?${search}`);
  return data;
};

export const getProductSize = async (): Promise<Response<ProductSize>> => {
  const { data } = await axiosInstance.get(`/product-size`);
  return data;
};
