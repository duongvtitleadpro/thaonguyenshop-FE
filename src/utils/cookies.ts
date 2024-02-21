import { jwtDecode } from "jwt-decode";
import { Token } from "@/types/token";

export const setToken = (key: string, token: string) => {
  localStorage.setItem(key, token);
  // const decodedToken = jwtDecode<Token>(token);
  // const expiresAt = new Date(decodedToken.exp * 1000);
  // document.cookie = `${key}=${token}; path=/; expires=${expiresAt};`;
};

export const getToken = (key: string) => {
  // const cookies = document.cookie.split("; ");
  // const foundCookie = cookies.find((cookie) => cookie.startsWith(key));
  // if (!foundCookie) return null;
  // const token = foundCookie.split("=")[1];
  const token = localStorage.getItem(key);
  return token;
};

export const clearToken = (key: string) => {
  // document.cookie = `${key}=; path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  localStorage.removeItem(key);
};
