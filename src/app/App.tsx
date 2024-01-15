"use client";
import { EAuthStorageKey } from "@/constans/constans";
import { useGetAuthStorageValue } from "@/hooks/useGetAuthStorageValue";
import { isRequestInterceptorSetup, setUpRequestInterceptor } from "@/utils";
import React, { useCallback, useEffect } from "react";
import { RecoilRoot } from "recoil";

export default function App({ children }: { children: React.ReactNode }) {
  const getAuthStorageValue = useGetAuthStorageValue();

  const setupAxiosRequest = useCallback(async () => {
    try {
      if (isRequestInterceptorSetup) return;
      const accessToken = getAuthStorageValue(EAuthStorageKey.accessToken);
      const refreshToken = getAuthStorageValue(EAuthStorageKey.refreshToken);
      await setUpRequestInterceptor({ refreshToken, accessToken });
    } catch (error) {
      console.log("error", error);
    }
  }, [getAuthStorageValue]);

  useEffect(() => {
    const accessToken = getAuthStorageValue(EAuthStorageKey.accessToken);
    const refreshToken = getAuthStorageValue(EAuthStorageKey.refreshToken);
    const hasTokens = !!accessToken || !!refreshToken;
    if (hasTokens) {
      setupAxiosRequest();
    }
  }, [getAuthStorageValue, setupAxiosRequest]);
  return <RecoilRoot>{children}</RecoilRoot>;
}
