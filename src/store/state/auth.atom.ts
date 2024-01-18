import { atom } from "recoil";
import { ATOM_KEY } from "../key";
import { User } from "@/types/auth";

type Auth = {
  isAuthenticated: boolean;
  user: User | null;
};

export const authState = atom<Auth>({
  key: ATOM_KEY.AUTH,
  default: {
    isAuthenticated: false,
    user: null,
  },
});
