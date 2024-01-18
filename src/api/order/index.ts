import { Response } from "@/types/common";
import {
  Product,
  ProductColor,
  ProductParam,
  ProductSize,
} from "@/types/product";
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

export const getProductColor = async (): Promise<Response<ProductColor>> => {
  const { data } = await axiosInstance.get(`/product-color`);
  return data;
};

export const getProductDetail = async (id: number): Promise<Product> => {
  const { data } = await axiosInstance.get(`/product/${id}`);
  return data;
};
