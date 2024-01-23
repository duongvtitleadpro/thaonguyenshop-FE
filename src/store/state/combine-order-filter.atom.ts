import { atom } from "recoil";
import { ATOM_KEY } from "../key";
import { OrderCombineParam } from "@/types/order";

export const CombineOrderFilterDefaultValue: OrderCombineParam = {
  page: 1,
  size: 10,
};

export const combineOrderFilterState = atom<OrderCombineParam>({
  key: ATOM_KEY.COMBINE_ORDER_FILTER,
  default: CombineOrderFilterDefaultValue,
});
