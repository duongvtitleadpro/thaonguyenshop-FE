import { atom } from "recoil";
import { ATOM_KEY } from "../key";
import { ProductParam } from "@/types/product";

export const filterProductState = atom<ProductParam>({
  key: ATOM_KEY.FILTER_PRODUCT,
  default: {
    page: 1,
    limit: 10,
    sizes: [],
    colors: [],
  },
});
