import { Response } from "@/types/common";
import {
  Product,
  ProductColor,
  ProductParam,
  ProductSize,
  StockProductImage,
  StockProductImageParam,
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

export const getStockProductImage = async (
  param: StockProductImageParam
): Promise<Response<StockProductImage>> => {
  const search = objectToQueryString(param);
  const { data } = await axiosInstance.get(`/stock-product-image?${search}`);
  return data;
};

export const getWatchedProductRequest = async (param: {
  page: number;
  limit: number;
}): Promise<Response<Product>> => {
  const search = objectToQueryString(param);
  const { data } = await axiosInstance.get(
    `/product/watched-products?${search}`
  );
  return data;
};

export const getSuggestProductRequest = async (param: {
  page: number;
  limit: number;
  productId: number;
}): Promise<Response<Product>> => {
  const search = objectToQueryString(param);
  const { data } = await axiosInstance.get(
    `/product/suggest-products?${search}`
  );
  return data;
};
