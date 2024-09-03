export interface SignupFormValues {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password: string;
  password_checks: {
    length: boolean;
    uppercase_letters: boolean;
    lowercase_letters: boolean;
    digit: boolean;
    special_character: boolean;
    no_space: boolean;
  };
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface ResetPasswordEmailValues {
  email: string;
}

export interface ResetPasswordOtpValues {
  otp: string;
}

export interface SetNewPasswordValues {
  password: string;
  confirm_password: string;
}
