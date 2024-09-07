import { object, string } from "yup";
import { emailRegEx } from "@/utils/constants";
import { isValidPhoneNumber } from "react-phone-number-input";

export const signupFormValidationSchema = object().shape({
  first_name: string().required("Please enter your first name"),
  last_name: string().required("Please enter your last name"),
  phoneNumber: string()
    .required("Please enter your phone number")
    .test("phoneNumber", "Invalid phone number", function (val) {
      return isValidPhoneNumber(val);
    }),
  email: string()
    .email("Please enter a valid email address")
    .required("Please enter your email")
    .matches(emailRegEx, "Please enter a valid email address"),
  password: string().required("Please enter your password"),
});

export const loginFormValidationSchema = object().shape({
  email: string()
    .email("Please enter a valid email")
    .required("Please enter your email"),
  password: string().required("Please enter your password"),
});

export const resetPasswordEmailValidationSchema = object().shape({
  email: string()
    .email("Please enter a valid email")
    .required("Please enter your email"),
});

export const setNewPasswordValidationSchema = object().shape({
  password: string().required("Please enter your password"),
  confirm_password: string().required("Please enter your password"),
});

export const verifyPhoneNumberSchema = object().shape({
  phoneNumber: string()
    .required("Please enter your phone number")
    .test("phoneNumber", "Invalid phone number", function (val) {
      return isValidPhoneNumber(val);
    }),
});

export const verifyIdentitySchema = object().shape({
  // valdate day, month and year as dob
  // dob: string().required("Please enter your dob"),
  bvn: string().required("Please enter your bvn"),
});

export const withdrawalAccountSchema = object().shape({
  bank: string().required("Please enter your bank"),
  accountNumber: string().required("Please enter your account number"),
});
