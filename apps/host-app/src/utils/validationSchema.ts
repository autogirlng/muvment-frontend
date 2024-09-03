import { object, string } from "yup";
import { emailRegEx } from "@/utils/constants";
import { isValidPhoneNumber } from "react-phone-number-input";

export const signupFormValidationSchema = object().shape({
  first_name: string().required("Please enter your first name"),
  last_name: string().required("Please enter your last name"),
  phone_number: string()
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
