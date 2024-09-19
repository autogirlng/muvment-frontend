import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ErrorResponse } from "@/utils/types";
import {
  lowercaseRegex,
  numberRegex,
  spacesRegex,
  specialCharRegex,
  uppercaseRegex,
} from "@/utils/constants";

export const isLengthValid = (password: string) => {
  const isLengthValid = password.length >= 8;
  return isLengthValid;
};

export const isUpperCaseValid = (password: string) => {
  const hasUppercase = uppercaseRegex.test(password);
  return hasUppercase;
};

export const isLowerCaseValid = (password: string) => {
  const hasLowercase = lowercaseRegex.test(password);
  return hasLowercase;
};

export const isDigitValid = (password: string) => {
  const hasNumber = numberRegex.test(password);
  return hasNumber;
};

export const isSpecialCharacterValid = (password: string) => {
  const hasSpecialChar = specialCharRegex.test(password);
  return hasSpecialChar;
};

export const isSpaceValid = (password: string) => {
  const noSpace = spacesRegex.test(password);
  return noSpace;
};

export const addSpaceBeforeUppercase = (str: string): string => {
  return str.replace(/([a-z])([A-Z])/g, "$1 $2");
};

export const formatNumberWithCommas = (number: string | number) => {
  return number.toLocaleString();
};

export const calculateServiceFee = (price: number, standardFee: number) => {
  return price * standardFee;
};
export const calculateRateGuestsWillSee = (
  price: number,
  serviceFee: number
) => {
  return price + serviceFee;
};

export const handleErrors = (
  page: string,
  error: AxiosError<ErrorResponse>,
  redirectUser?: () => void
) => {
  console.log(`${page} error`, error.response?.status, error.response?.data);
  const ERR_CODE = error.response?.data?.ERR_CODE;

  if (ERR_CODE === "USER_ALREADY_EXIST")
    toast.error("Email already registered");

  if (error.response?.data?.ERR_CODE === "PHONE_ALREADY_USED")
    toast.error("Phone number already registered");

  if (error.response?.data?.ERR_CODE === "INVALID_CREDENTIALS")
    toast.error("Invalid login credentials");

  if (error.response?.data?.ERR_CODE === "USER_NOT_FOUND")
    toast.error("User not found");

  if (error.response?.data?.ERR_CODE === "EMAIL_NOT_CONFIRMED") {
    toast.error("Email not verified");
    redirectUser && redirectUser();
  }

  if (error.response?.data?.ERR_CODE === "EMAIL_ALREADY_CONFIRMED")
    toast.error("Email already confirmed");

  if (error.response?.data?.ERR_CODE === "PHONE_NUMBER_NOT_FOUND")
    toast.error("Phone Number not found");

  if (error.response?.data?.message) toast.error(error.response?.data?.message);
};
