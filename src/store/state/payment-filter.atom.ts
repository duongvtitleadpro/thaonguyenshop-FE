import { atom } from "recoil";
import { ATOM_KEY } from "../key";
import { PaymentParam } from "@/types/payment";

export const PAYMENT_FILTER_DEFAULT: PaymentParam = {
  page: 1,
  size: 10,
};

export const paymentFilterState = atom<PaymentParam>({
  key: ATOM_KEY.PAYMENT_FILTER,
  default: PAYMENT_FILTER_DEFAULT,
});
