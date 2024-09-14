import {
  AdditionalVehicleInformationValues,
  AvailabilityAndPricingValues,
  BasicVehicleInformationValues,
  LoginFormValues,
  ResetPasswordEmailValues,
  // ResetPasswordOtpValues,
  SetNewPasswordValues,
  SignupFormValues,
  VehiclePhotosValues,
  // verifyEmailValues,
  // resendVerifyEmailTokenValues,
  VerifyIdentityValues,
  VerifyPhoneNumberValues,
  WithdrawalAccountValues,
} from "@/utils/types";



export const signUpFormInitialValues: SignupFormValues = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  country: "",
  countryCode: "",
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

// export const verifyEmailInitialValues: verifyEmailValues = {
//   email: "",
//   token: "",
// };

// export const resendVerifyEmailTokenInitialValues: resendVerifyEmailTokenValues =
//   {
//     email: "",
//   };

export const resetPasswordEmailInitialValues: ResetPasswordEmailValues = {
  email: "",
};

// export const resetPasswordOtpInitialValues: ResetPasswordOtpValues = {
//   otp: "",
// };
export const setNewPasswordInitialValues: SetNewPasswordValues = {
  email: "",
  token: "",
  password: "",
  confirmPassword: "",
  password_checks: {
    length: false,
    uppercase_letters: false,
    lowercase_letters: false,
    digit: false,
    special_character: false,
    no_space: false,
  },
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

export const basicVehicleInformationValues: BasicVehicleInformationValues = {
  vehicleName: "",
  city: "",
  address: "",
  vehicleType: "",
  vehicleMake: "",
  vehicleModel: "",
  year: "",
  insurance: "",
  tracker: "",
};

export const additionalVehicleInformationValues: AdditionalVehicleInformationValues =
  {
    licensePlateNumber: "",
    stateOfRegistration: "",
    vehicleDescription: "",
    vehicleFeatures: [],
    vehicleColor: "",
    numberOfSeats: "",
  };

export const vehiclePhotosValues: VehiclePhotosValues = {
  frontView: "",
  backView: "",
  sideView1: "",
  sideView2: "",
  interiorImage: "",
  otherImage: "",
};

export const availabilityAndPricingValues: AvailabilityAndPricingValues = {
  advanceNoticeInDays: "",
  minTripDurationInDays: "",
  maxTripDurationInDays: "",
  selfDrive: "",
  driverProvided: "",
  fuelProvided: "",
  dailyRate: "",
  extraHourRate: "",
  airportPickup: "",
  threeDaysDiscount: "",
  sevenDaysDiscount: "",
  thirtyDaysDiscount: "",
};
