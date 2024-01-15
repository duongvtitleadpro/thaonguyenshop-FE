import { atom } from "recoil";

export const hasDisplayedUnpaidOrderState = atom<number>({
  key: "testState",
  default: 0,
});
