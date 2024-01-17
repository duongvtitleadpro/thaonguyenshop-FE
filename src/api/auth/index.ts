import axiosInstance from "@utils/axios";
import { AuthToken, SignInBody, SignUpBody } from "@/types/auth";

export const signupRequest = async (body: SignUpBody) => {
  const { data } = await axiosInstance.post<AuthToken>(
    "/api/auth/register",
    body
  );
  return data;
};

export const signinRequest = async (body: SignInBody) => {
  const { data } = await axiosInstance.post<AuthToken>("/auth/signin", body);
  return data;
};

export const refreshTokenRequest = async () => {
  const { data } = await axiosInstance.get<AuthToken>("/api/auth/refresh");
  return data;
};
