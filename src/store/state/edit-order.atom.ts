import { atom } from "recoil";
import { ATOM_KEY } from "../key";
import { EditOrderBody } from "@/types/order";

export const editOrderDefaultValue: EditOrderBody = {
  orderId: 0,
  note: "",
  orderDetails: [],
  orderImages: [],
  orderFileNote: null,
};

export const editOrderState = atom<EditOrderBody>({
  key: ATOM_KEY.EDIT_ORDER,
  default: editOrderDefaultValue,
});
