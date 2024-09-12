export interface ErrorResponse {
  ERR_CODE: string;
  message: string;
}

interface PasswordChecks {
  length: boolean;
  uppercase_letters: boolean;
  lowercase_letters: boolean;
  digit: boolean;
  special_character: boolean;
  no_space: boolean;
}

export interface SignupFormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  country: string;
  countryCode: string;
  password: string;
  password_checks?: PasswordChecks;
}

export interface LoginFormValues {
  email: string;
  password: string;
}
export interface verifyEmailValues {
  email: string;
  token: string;
}

export interface resendVerifyEmailTokenValues {
  email: string;
}
export interface ResetPasswordEmailValues {
  email: string;
}

// export interface ResetPasswordOtpValues {
//   otp: string;
// }

export interface SetNewPasswordValues {
  email: string;
  token: string;
  newPassword: string;
  password?: string;
  confirmPassword: string;
  password_checks?: PasswordChecks;
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

export interface BasicVehicleInformationValues {
  vehicleName: string;
  city: string;
  address: string;
  vehicleType: string;
  vehicleMake: string;
  vehicleModel: string;
  year: string;
  insurance: string;
  tracker: string;
}

export interface AdditionalVehicleInformationValues {
  licensePlateNumber: string;
  stateOfRegistration: string;
  vehicleDescription: string;
  vehicleFeatures: string[];
  vehicleColor: string;
  numberOfSeats: string;
}

export interface VehiclePhotosValues {
  frontView: string;
  backView: string;
  sideView1: string;
  sideView2: string;
  interiorImage: string;
  otherImage: string;
}
export interface AvailabilityAndPricingValues {
  advanceNoticeInDays: string;
  minTripDurationInDays: string;
  maxTripDurationInDays: string;
  selfDrive: string;
  driverProvided: string;
  fuelProvided: string;
  dailyRate: string;
  extraHourRate: string;
  airportPickup: string;
  threeDaysDiscount: string;
  sevenDaysDiscount: string;
  thirtyDaysDiscount: string;
}

export type BadgeStatus = "accepted" | "pending" | "canceled";

type UderVerification = {
  id: string;
  phoneNumber: string;
  otpToken: string | null;
  bvnNumber: string | null;
  dob: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dob: string | null;
  profileImage: string | null;
  countryCode: string;
  country: string;
  emailConfirmed: boolean;
  phoneNumber: string;
  phoneVerified: boolean;
  bvnVerified: boolean;
  bio: string | null;
  city: string | null;
  userRole: "INDIVIDUAL" | "BUSINESS";
  businessLogo: string | null;
  businessName: string | null;
  businessAddress: string | null;
  businessPhoneNumber: string | null;
  businessEmail: string | null;
  createdAt: string;
  updatedAt: string;
  Verification: UderVerification;
};

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
