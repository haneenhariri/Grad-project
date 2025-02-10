import Cookies from "js-cookie";
import { encryptData, decryptData } from "./cryptoUtils";

export const setSecureCookie = (key: string, value: string) => {
  const encryptedValue = encryptData(value);
  Cookies.set(key, encryptedValue, { secure: true, sameSite: "Strict" });
};

export const getSecureCookie = (key: string) => {
  const cookieValue = Cookies.get(key);
  return cookieValue ? decryptData(cookieValue) : null;
};

export const removeSecureCookie = (key: string) => {
  Cookies.remove(key);
};
