import axios from "axios";
import { AxiosAuthRefreshRequestConfig } from "axios-auth-refresh";
import { Config } from "./env";

interface ITokens {
  accessToken: string;
  refreshToken: string;
}

const authAxios = axios.create();

export const requestRefreshToken = async ({
  accessToken,
  refreshToken,
}: ITokens) => {
  if (!refreshToken || !accessToken) {
    throw new Error("Refresh token or access token not found!");
  }

  return authAxios.post(
    `https://sv.offchainsaigon.com/customers/renew`,
    {
      refreshToken,
    },
    {
      skipAuthRefresh: true,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    } as AxiosAuthRefreshRequestConfig
  );
};
