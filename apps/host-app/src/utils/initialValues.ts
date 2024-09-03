import {
  LoginFormValues,
  ResetPasswordEmailValues,
  ResetPasswordOtpValues,
  SetNewPasswordValues,
  SignupFormValues,
} from "@/utils/types";

export const signUpFormInitialValues: SignupFormValues = {
  first_name: "",
  last_name: "",
  phone_number: "",
  email: "",
  password: "",
  password_checks: {
    length: false,
    uppercase_letters: false,
    lowercase_letters: false,
    digit: false,
    special_character: false,
    no_space: false,
  },
};

export const loginFormInitialValues: LoginFormValues = {
  email: "",
  password: "",
};

export const resetPasswordEmailInitialValues: ResetPasswordEmailValues = {
  email: "",
};

export const resetPasswordOtpInitialValues: ResetPasswordOtpValues = {
  otp: "",
};
export const setNewPasswordInitialValues: SetNewPasswordValues = {
  password: "",
  confirm_password: "",
};
