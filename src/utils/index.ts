import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { EAuthStorageKey } from "@/constans/constans";
import { requestRefreshToken } from "./auth";

interface TemporaryTokens {
  accessToken: string;
  refreshToken: string;
}

let bearerTokenInterceptorId = 0;

// eslint-disable-next-line prefer-const
export let tokenTemporaryStorage: TemporaryTokens = {
  accessToken: "",
  refreshToken: "",
};

const getAccessToken = () => tokenTemporaryStorage.accessToken;

const setupBearerTokenInterceptor = async () => {
  bearerTokenInterceptorId = axios.interceptors.request.use(
    async function (config: any) {
      if (config && config.headers) {
        config.headers.Authorization = `Bearer ${getAccessToken()}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
};
const refreshAuthLogic = async (failedRequest: any) => {
  try {
    const accessToken = JSON.parse(
      localStorage.getItem(EAuthStorageKey.accessToken) || ""
    );
    const refreshToken = JSON.parse(
      localStorage.getItem(EAuthStorageKey.refreshToken) || ""
    );

    const { data } = await requestRefreshToken({ accessToken, refreshToken });
    localStorage.setItem(
      EAuthStorageKey.refreshToken,
      JSON.stringify(data.refreshToken)
    );
    localStorage.setItem(
      EAuthStorageKey.accessToken,
      JSON.stringify(data.accessToken)
    );
    tokenTemporaryStorage.accessToken = data.accessToken;
    tokenTemporaryStorage.refreshToken = data.refreshToken;
    await setupBearerTokenInterceptor();
    failedRequest.response.config.headers.Authorization = `Bearer ${data.accessToken}`;
    return Promise.resolve();
  } catch (error) {
    try {
      localStorage.removeItem(EAuthStorageKey.accessToken);
      localStorage.removeItem(EAuthStorageKey.refreshToken);
    } catch (error) {
      console.log(error);
    }
    location.reload();
    return Promise.reject(error);
  }
};

export const setUpRequestInterceptor = async (tokens: TemporaryTokens) => {
  const { accessToken, refreshToken } = tokens;
  tokenTemporaryStorage.accessToken = accessToken;
  tokenTemporaryStorage.refreshToken = refreshToken;
  await setupBearerTokenInterceptor();
  createAuthRefreshInterceptor(axios, refreshAuthLogic, {
    statusCodes: [401],
  });
};

export const clearRequestInterceptor = async () => {
  if (bearerTokenInterceptorId !== 0) {
    axios.interceptors.request.eject(bearerTokenInterceptorId);
    bearerTokenInterceptorId = 0;
  }
};

export const isRequestInterceptorSetup = bearerTokenInterceptorId > 0;
