import {
  LoginFormValues,
  ResetPasswordEmailValues,
  ResetPasswordOtpValues,
  SetNewPasswordValues,
  SignupFormValues,
  VerifyIdentityValues,
  VerifyPhoneNumberValues,
  WithdrawalAccountValues,
} from "@/utils/types";

export const signUpFormInitialValues: SignupFormValues = {
  first_name: "",
  last_name: "",
  phoneNumber: "",
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

export const verifyPhoneNumberValues: VerifyPhoneNumberValues = {
  phoneNumber: "",
};

export const verifyIdentityValues: VerifyIdentityValues = {
  day: "",
  month: "",
  year: "",
  bvn: "",
};

export const withdrawalAccountValues: WithdrawalAccountValues = {
  bank: "",
  accountNumber: "",
};
