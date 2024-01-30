import { atom } from "recoil";
import { ATOM_KEY } from "../key";
import { ProductParam } from "@/types/product";

export const FILTER_PRODUCT_DEFAULT: ProductParam = {
  page: 1,
  limit: 12,
  sizes: [],
  colors: [],
  sort: "createdAt,desc",
};

export const filterProductState = atom<ProductParam>({
  key: ATOM_KEY.FILTER_PRODUCT,
  default: FILTER_PRODUCT_DEFAULT,
});
