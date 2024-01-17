import { EAuthStorageKey } from "@/constant/constans";
import { useCallback } from "react";

export const useGetAuthStorageValue = () => {
  return useCallback((key: EAuthStorageKey) => {
    const authValue = localStorage.getItem(key);
    if (authValue && authValue !== "undefined") {
      return JSON.parse(authValue);
    }
    return "";
  }, []);
};
