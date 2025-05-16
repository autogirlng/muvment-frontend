import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ErrorResponse, NotificationType, User } from "@/utils/types";

import {
  lowercaseRegex,
  numberRegex,
  spacesRegex,
  specialCharRegex,
  standardServiceFeeInPercentage,
  uppercaseRegex,
} from "@/utils/constants";
import { daysOfTheWeek } from "./data";
import Icons from "@repo/ui/icons";
import { useSearchParams } from "next/navigation";
import { formatDistanceStrict } from "date-fns";

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

export const validatePhoneNumber = (phoneNumber: string, country: string) => {
  let isPhoneNumberValid = false;
  if (country === "NG") {
    isPhoneNumberValid = phoneNumber.length === 11;
  } else {
    isPhoneNumberValid = phoneNumber.length === 10;
  }

  return isPhoneNumberValid;
};

export const replaceCharactersWithString = (str: string): string => {
  return str.replace(/\D/g, "");
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

export const formatPhoneNumber = (phoneNumber: string): string => {
  const firstPart = phoneNumber.slice(0, 3);
  const lastPart = phoneNumber.slice(-3);
  const middlePart = "*".repeat(phoneNumber.length - 6);

  return `${firstPart}${middlePart}${lastPart}`;
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

export const calculateNumberOfDays = (
  pickupDate: Date | string,
  dropoffDate: Date | string
): string => {
  return formatDistanceStrict(new Date(dropoffDate), new Date(pickupDate), {
    unit: "day",
  });
};

export const getNumberOfDays = (
  pickupDate: Date,
  dropoffDate: Date
): number => {
  const distance = calculateNumberOfDays(pickupDate, dropoffDate);
  const [number] = distance.split(" ");
  return parseInt(number, 10);
};

export const calculateTotalCostWithoutServiceFee = (
  dropoffDate: Date,
  pickupDate: Date,
  dailyPrice: number
) => {
  const numberOfDays = getNumberOfDays(dropoffDate, pickupDate);

  const totalCost = numberOfDays * dailyPrice;

  return totalCost;
};

export const calculateTotalCostWithServiceFee = (
  dropoffDate: Date,
  pickupDate: Date,
  dailyPrice: number
) => {
  const numberOfDays = getNumberOfDays(dropoffDate, pickupDate);

  const totalCost = numberOfDays * dailyPrice;

  const serviceFee = calculateServiceFee(
    totalCost,
    standardServiceFeeInPercentage
  );

  return calculateRateGuestsWillSee(totalCost, serviceFee);
};

export const calculateSubTotal = (
  amount: number,
  hostDiscount: { durationInDays: number; percentage: number }[],
  dropoffDate: Date,
  pickupDate: Date
): string => {
  const numberOfDays = getNumberOfDays(dropoffDate, pickupDate);
  const totalCostWithServiceFee = calculateTotalCostWithServiceFee(
    dropoffDate,
    pickupDate,
    amount
  );
  const totalCostWithoutServiceFee = calculateTotalCostWithoutServiceFee(
    dropoffDate,
    pickupDate,
    amount
  );

  const discount = calculateDiscount(
    totalCostWithoutServiceFee,
    hostDiscount,
    numberOfDays
  );

  const subTotal = totalCostWithServiceFee - discount;

  return formatNumberWithCommas(subTotal);
};

export const calculateDiscount = (
  amount: number,
  hostDiscounts: { durationInDays: number; percentage: number }[],
  numberOfDays: number
): number => {
  const sortedDiscounts = hostDiscounts.sort(
    (a, b) => a.durationInDays - b.durationInDays
  );

  const applicableDiscount = sortedDiscounts.find(
    (discount) => numberOfDays <= discount.durationInDays
  );

  if (applicableDiscount) {
    const discountPercentage = applicableDiscount.percentage;
    return amount * (discountPercentage / 100);
  }

  return 0;
};

export const useFetchUrlParams = () => {
  const searchParams = useSearchParams();

  const bookingType = searchParams.get("bookingType") ?? "";
  const startDate = searchParams.get("startDate") ?? null;
  const startTime = searchParams.get("startTime") ?? null;
  const endDate = searchParams.get("endDate") ?? null;
  const endTime = searchParams.get("endTime") ?? null;

  const search = searchParams.get("search") ?? "";
  const fromDate = searchParams.get("fromDate") ?? null;
  const fromTime = searchParams.get("fromTime") ?? null;
  const untilDate = searchParams.get("untilDate") ?? null;
  const untilTime = searchParams.get("untilTime") ?? null;

  return {
    bookingType,
    startDate,
    startTime,
    endDate,
    endTime,
    search,
    fromDate,
    fromTime,
    untilDate,
    untilTime,
  };
};

export const getExistingBookingInformation = (
  values: any,
  vehicleId: string,
  formType: string,
  user?: User | null
) => {
  const bookingInformation = localStorage.getItem("bookingInformation");

  if (bookingInformation) {
    const bookingInformationObject = JSON.parse(bookingInformation);
    return bookingInformationObject[vehicleId]?.[formType] || values;
  }

  return getPrefillUserValuesForBooking(values, user);
};

const getPrefillUserValuesForBooking = (values: any, user?: any) => {
  if (user?.firstName && user?.lastName && user?.email) {
    return {
      ...values,
      guestName: `${user.firstName} ${user.lastName}`,
      guestEmail: user.email,
      guestPhoneNumber: user.phoneNumber,
      country: user.country,
      countryCode: user.countryCode,
    };
  }
  return values;
};

export const saveAndUpdateBookingInformation = (
  values: any,
  id: string,
  formType: string
) => {
  const bookingInformation = localStorage.getItem("bookingInformation");

  if (bookingInformation) {
    const bookingInformationObject = JSON.parse(bookingInformation);
    const updatedBookingInformation = {
      ...bookingInformationObject,
      [id]: {
        ...bookingInformationObject[id],
        [formType]: values,
      },
    };

    localStorage.setItem(
      "bookingInformation",
      JSON.stringify(updatedBookingInformation)
    );
  } else {
    localStorage.setItem(
      "bookingInformation",
      JSON.stringify({ [id]: { [formType]: values } })
    );
  }
};

// ============================= Notification Icons, Color and Bg Color starts ============================= //
export const getNotificationIcon = (type: string) => {
  switch (type) {
    case NotificationType.BOOKING_REQUEST:
      return Icons.ic_booking_request;
    case NotificationType.BOOKING_CONFIRMED:
      return Icons.ic_booking_confirmed;
    case NotificationType.BOOKING_CANCELED:
      return Icons.ic_booking_canceled;
    case NotificationType.UPCOMING_BOOKING:
      return Icons.ic_upcoming_booking;
    case NotificationType.GUEST_CHECK_IN:
      return Icons.ic_check_in;
    case NotificationType.GUEST_CHECK_OUT:
      return Icons.ic_check_out;
    case NotificationType.VEHICLE_ACCEPTED:
      return Icons.ic_car;
    case NotificationType.PAYMENT_RECEIVED:
      return Icons.ic_payment_received;
    case NotificationType.SECURITY_ALERT:
      return Icons.ic_lock;
    case NotificationType.NEW_REVIEW:
      return Icons.ic_star_square;
    case NotificationType.SPECIAL_OFFER:
      return Icons.ic_upcoming_booking;
    default:
      return Icons.ic_lock;
  }
};

export const getNotificationIconColor = (type: string) => {
  switch (type) {
    case NotificationType.BOOKING_REQUEST:
      return "text-primary-600";
    case NotificationType.BOOKING_CONFIRMED:
      return "text-success-600";
    case NotificationType.BOOKING_CANCELED:
      return "text-error-900";
    case NotificationType.UPCOMING_BOOKING:
      return "text-warning-400";
    case NotificationType.GUEST_CHECK_IN:
      return "text-grey-700";
    case NotificationType.GUEST_CHECK_OUT:
      return "text-grey-700";
    case NotificationType.VEHICLE_ACCEPTED:
      return "text-success-600";
    case NotificationType.PAYMENT_RECEIVED:
      return "text-success-600";
    case NotificationType.SECURITY_ALERT:
      return "text-error-900";
    case NotificationType.NEW_REVIEW:
      return "text-warning-400";
    case NotificationType.SPECIAL_OFFER:
      return "text-warning-400";
    default:
      return "text-grey-700";
  }
};

export const getNotificationBgColor = (type: string) => {
  switch (type) {
    case NotificationType.BOOKING_REQUEST:
      return "bg-primary-75";
    case NotificationType.BOOKING_CONFIRMED:
      return "bg-success-75";
    case NotificationType.BOOKING_CANCELED:
      return "bg-error-100";
    case NotificationType.UPCOMING_BOOKING:
      return "bg-warning-75";
    case NotificationType.GUEST_CHECK_IN:
      return "bg-grey-90";
    case NotificationType.GUEST_CHECK_OUT:
      return "bg-grey-90";
    case NotificationType.VEHICLE_ACCEPTED:
      return "bg-success-75";
    case NotificationType.PAYMENT_RECEIVED:
      return "bg-success-75";
    case NotificationType.SECURITY_ALERT:
      return "bg-error-100";
    case NotificationType.NEW_REVIEW:
      return "bg-warning-75";
    case NotificationType.SPECIAL_OFFER:
      return "bg-warning-75";
    default:
      return "bg-grey-90";
  }
};
// ============================= Notification Icons, Color and Bg Color ends ============================= //

// Debounce function
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
) => {
  let timer: ReturnType<typeof setTimeout> | null;

  return function (...args: Parameters<T>) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

export const handleFilterQuery = ({
  filters,
  month,
  year,
  search,
  startDate,
  endDate,
  fromDate,
  untilDate,
  fromTime,
  untilTime,
  location,
}: {
  filters: Record<string, string[] | number[]>;
  month?: number;
  year?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
  fromDate?: string;
  untilDate?: string;
  fromTime?: string;
  untilTime?: string;
  location?: string;
}) => {
  const filterQuery = new URLSearchParams();
  Object.entries(filters).forEach(([key, values]) => {
    if (key === "price") {
      {
        filterQuery.append("minPrice", values[0].toString());
        filterQuery.append("maxPrice", values[1].toString());
      }
    } else {
      values.forEach((value) => {
        if (key === "vehicle")
          filterQuery.append("vehicleId", value.toString());
        else filterQuery.append(key, value.toString());
      });
    }
  });

  if (month) filterQuery.append("month", month.toString());
  if (year) filterQuery.append("year", year.toString());
  if (search) filterQuery.append("search", search.toString());
  if (startDate) filterQuery.append("startDate", startDate.toString());
  if (endDate) filterQuery.append("endDate", endDate.toString());
  if (fromDate) filterQuery.append("fromDate", fromDate.toString());
  if (untilDate) filterQuery.append("untilDate", untilDate.toString());
  if (location) filterQuery.append("location", location.toString());

  // if (fromTime) filterQuery.append("startDate", fromTime.toString());
  // if (untilTime) filterQuery.append("endDate", untilTime.toString());

  return filterQuery.toString();
};

export const handleErrors = (
  error: AxiosError<ErrorResponse>,
  page?: string
) => {
  console.log(
    `${page} error`,
    error,
    error.response?.status,
    error.response?.data
  );

  const ERR_CODE = error.response?.data?.ERR_CODE;

  if (error?.message === "Network Error") {
    console.log(error);
    return toast.error("Network Error");
  }

  if (error.response?.status === 500) {
    return toast.error(error.response?.data?.message);
  }

  if (ERR_CODE === "USER_ALREADY_EXIST") {
    return toast.error("Email already registered");
  }

  if (ERR_CODE === "PHONE_ALREADY_USED") {
    return toast.error("Phone number already registered");
  }

  if (ERR_CODE === "INVALID_CREDENTIALS") {
    return toast.error("Invalid login credentials");
  }

  if (ERR_CODE === "USER_NOT_FOUND") {
    return toast.error("User not found");
  }

  if (ERR_CODE === "EMAIL_NOT_CONFIRMED") {
    toast.error("Email not verified");
    const parsedData = JSON.parse(error.config?.data);
    console.log(parsedData);

    window.location.href = `/verify-email?email=${encodeURIComponent(parsedData?.email ?? "")}`;
    return;
  }

  if (ERR_CODE === "EMAIL_ALREADY_CONFIRMED") {
    return toast.error("Email already confirmed");
  }

  if (ERR_CODE === "PHONE_NUMBER_NOT_FOUND") {
    return toast.error("Phone Number not found");
  }

  if (ERR_CODE === "HOST_NOT_OWNER_OF_VEHICLE") {
    return toast.error("Host not owner of vehicle");
  }

  if (ERR_CODE === "INCORRECT_OTP") {
    return toast.error("Incorrect OTP");
  }

  if (
    ERR_CODE === "NO_WITHDRAWAL_ACCOUNT_FOUND" ||
    ERR_CODE === "RENTAL_AVALIABLITY_NOT_FOUND" ||
    ERR_CODE === "WALLET_NOT_FOUND "
  ) {
    return;
  }

  if (ERR_CODE) {
    return toast.error(ERR_CODE);
  }

  if (error.response?.data?.message) {
    return toast.error(error.response.data.message);
  }

  return {};
};
