import { jwtDecode } from "jwt-decode";
import { Token } from "@/types/token";

export const setToken = (key: string, token: string) => {
  const decodedToken = jwtDecode<Token>(token);
  const expiresAt = new Date(decodedToken.exp * 1000);
  document.cookie = `${key}=${token}; path=/; expires=${expiresAt};`;
};

export const getToken = (key: string) => {
  const cookies = document.cookie.split("; ");
  const foundCookie = cookies.find((cookie) => cookie.startsWith(key));
  if (!foundCookie) return null;
  const token = foundCookie.split("=")[1];
  return token;
};
