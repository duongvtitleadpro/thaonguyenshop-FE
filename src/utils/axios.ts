import axios from "axios";
import axiosRetry from "axios-retry";
import { getToken, setToken } from "./cookies";
import { refreshTokenRequest } from "@api/auth";
import { TOKEN_KEY } from "@constant/auth";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL,
});

axiosRetry(axiosInstance, {
  retries: 3,
  retryDelay: (...arg) => axiosRetry.exponentialDelay(...arg, 2000),
  retryCondition(error: any) {
    switch (error?.response?.status) {
      //retry only if status is 500 or 501

      case 406:
        if (error?.response?.data.message === "password_change") {
          const accessToken = getToken("accessToken");
          if (accessToken) {
            window.location.replace("/");
            localStorage.clear();
          }
        }
      default:
        return false;
    }
  },
});

axiosInstance.request({
  headers: {
    "Access-Control-Allow-Methods": "PUT, GET, HEAD, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Credentials": "true",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = getToken("accessToken");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const statusCode = error.response ? error.response.status : null;
//     if (statusCode === 401) {
//       const token = await refreshTokenRequest();
//       setToken(TOKEN_KEY.ACCESS, token.accessToken);
//       setToken(TOKEN_KEY.REFRESH, token.refreshToken);
//       return error.config;
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
