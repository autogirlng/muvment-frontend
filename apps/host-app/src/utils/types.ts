export interface SignupFormValues {
  first_name: string;
  last_name: string;
  phoneNumber: string;
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

export interface VerifyPhoneNumberValues {
  phoneNumber: string;
}

export interface VerifyIdentityValues {
  day: string;
  month: string;
  year: string;
  bvn: string;
}


export interface WithdrawalAccountValues {
  bank: string;
  accountNumber: string;
}


export type BadgeStatus = "accepted" | "pending" | "canceled";

// ==================== hard coded types - to be changed ====================//
export type TopRatedVehicleType = {
  make: string;
  model: string;
  year: string;
  colour: string;
  seatingCapacity: string;
  totalRides: string;
  totalEarnings: string;
};

export type BookingOverviewTableRow = {
  vehicle: string;
  guestName: string;
  bookingId: string;
  bookingType: string;
  duration: string;
  startDate: string;
  endDate: string;
  status: string;
  price: string;
  actions: string;
};
