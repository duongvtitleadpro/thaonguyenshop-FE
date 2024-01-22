import { atom } from "recoil";
import { ATOM_KEY } from "../key";
import { OrderParam } from "@/types/order";

export const PurchaseOrderFilterDefaultValue: OrderParam = {
  page: 1,
  size: 10,
  orderStatus: [],
  allocationStatus: [],
};

export const purchaseOrderFilterState = atom<OrderParam>({
  key: ATOM_KEY.PURCHASE_ORDER_FILTER,
  default: PurchaseOrderFilterDefaultValue,
});
