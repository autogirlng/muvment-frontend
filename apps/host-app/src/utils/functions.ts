import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { ErrorResponse } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

import {
  lowercaseRegex,
  numberRegex,
  spacesRegex,
  specialCharRegex,
  uppercaseRegex,
} from "@/utils/constants";
import { daysOfTheWeek } from "./data";
import { api } from "@/lib/api";

export const isLengthValid = (password: string): boolean => {
  const isLengthValid = password.length >= 8;
  return isLengthValid;
};

export const isUpperCaseValid = (password: string): boolean => {
  const hasUppercase = uppercaseRegex.test(password);
  return hasUppercase;
};

export const isLowerCaseValid = (password: string): boolean => {
  const hasLowercase = lowercaseRegex.test(password);
  return hasLowercase;
};

export const isDigitValid = (password: string): boolean => {
  const hasNumber = numberRegex.test(password);
  return hasNumber;
};

export const isSpecialCharacterValid = (password: string): boolean => {
  const hasSpecialChar = specialCharRegex.test(password);
  return hasSpecialChar;
};

export const isSpaceValid = (password: string): boolean => {
  const noSpace = spacesRegex.test(password);
  return noSpace;
};

export const addSpaceBeforeUppercase = (str: string): string => {
  return str?.replace(/([a-z])([A-Z])/g, "$1 $2");
};

export const keyAndValueInAChip = (
  key: string,
  value: string | number
): string => {
  return `${addSpaceBeforeUppercase(key.charAt(0).toUpperCase() + key.slice(1))}: ${value}`;
};

export const getInitialsFromName = (
  firstName: string,
  lastName: string
): string => {
  const firstInitial = firstName.charAt(0).toUpperCase();
  const lastInitial = lastName.charAt(0).toUpperCase();

  return `${firstInitial}${lastInitial}`;
};

export const mapRentalAvailabilityToArray = (days: {
  [key: string]: boolean;
}): string[] => {
  return Object.keys(days).filter((day) => days[day]);
};

export const mapRentalAvailabilityArrayToObject = (
  daysArray: string[]
): {
  [key: string]: boolean;
} => {
  return daysOfTheWeek.reduce(
    (acc, day) => {
      acc[day] = daysArray.includes(day);
      return acc;
    },
    {} as { [key: string]: boolean }
  );
};

export const copyToCipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success("Copied to clipboard");
};

export const formatNumberWithCommas = (number: string | number): string => {
  return number?.toLocaleString();
};

export const calculateServiceFee = (
  price: number,
  standardFee: number
): number => {
  return price * standardFee;
};

export const calculateRateGuestsWillSee = (
  price: number,
  serviceFee: number
): number => {
  return price + serviceFee;
};

export const handleErrors = (
  page: string,
  error: AxiosError<ErrorResponse>,
  redirectUser?: () => void
) => {
  console.log(`${page} error`, error.response?.status, error.response?.data);
  const ERR_CODE = error.response?.data?.ERR_CODE;

  if (error?.message === "Network Error") {
    console.log(error);
    return toast.error("Network Error");
  }

  if (ERR_CODE === "USER_ALREADY_EXIST") {
    return toast.error("Email already registered");
  }

  if (error.response?.data?.ERR_CODE === "PHONE_ALREADY_USED") {
    return toast.error("Phone number already registered");
  }

  if (error.response?.data?.ERR_CODE === "INVALID_CREDENTIALS") {
    return toast.error("Invalid login credentials");
  }

  if (error.response?.data?.ERR_CODE === "USER_NOT_FOUND") {
    return toast.error("User not found");
  }

  if (error.response?.data?.ERR_CODE === "EMAIL_NOT_CONFIRMED") {
    toast.error("Email not verified");
    return redirectUser && redirectUser();
  }

  if (error.response?.data?.ERR_CODE === "EMAIL_ALREADY_CONFIRMED") {
    return toast.error("Email already confirmed");
  }

  if (error.response?.data?.ERR_CODE === "PHONE_NUMBER_NOT_FOUND") {
    return toast.error("Phone Number not found");
  }

  if (error.response?.data?.ERR_CODE === "HOST_NOT_OWNER_OF_VEHICLE") {
    return toast.error("Host not owner of vehicle");
  }

  if (error.response?.data?.ERR_CODE === "INCORRECT_OTP") {
    return toast.error("Incorrect OTP");
  }

  if (error.response?.data?.ERR_CODE) {
    return toast.error(error.response?.data?.ERR_CODE);
  }

  if (error.response?.data?.message) {
    return toast.error(error.response?.data?.message);
  }
};

export const useCustomQuery = (
  url: string,
  queryKey: Array<unknown>,
  enabled: boolean,
  onCompleted: (
    data: AxiosResponse<any, any> | undefined,
    isSuccess: boolean,
    isError: boolean,
    error: AxiosError<ErrorResponse>
  ) => void,
  onError: void
) => {
  const { data, isError, error, isLoading, isSuccess } = useQuery({
    queryKey,
    queryFn: () => api.get(url),
    enabled,
  });

  onCompleted(data, isSuccess, isError, error as AxiosError<ErrorResponse>);

  alert("Mounted");

  return { data, isError, error, isLoading, isSuccess };
};
