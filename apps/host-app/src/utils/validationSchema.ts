import { object, ref, string } from "yup";
import {
  emailRegEx,
  lowercaseRegex,
  numberRegex,
  spacesRegex,
  specialCharRegex,
  uppercaseRegex,
} from "@/utils/constants";
import { isValidPhoneNumber } from "react-phone-number-input";

export const signupFormValidationSchema = object().shape({
  firstName: string().required("Please enter your first name"),
  lastName: string().required("Please enter your last name"),
  phoneNumber: string()
    .required("Please enter your phone number")
    .test("phoneNumber", "Invalid phone number", function (val) {
      return isValidPhoneNumber(val);
    }),
  country: string().required("Please enter your country code"),
  email: string()
    .email("Please enter a valid email address")
    .required("Please enter your email")
    .matches(emailRegEx, "Please enter a valid email address"),
  password: string().required("Please enter your password"),
  // password: string()
  //   .required("Please enter your password")
  //   .matches(
  //     uppercaseRegex,
  //     "Password must contain at least one uppercase letter"
  //   )
  //   .matches(
  //     lowercaseRegex,
  //     "Password must contain at least one lowercase letter"
  //   )
  //   .matches(numberRegex, "Password must contain at least one number")
  //   .matches(
  //     specialCharRegex,
  //     "Password must contain at least one special character"
  //   )
  //   .matches(spacesRegex, "Password must not contain spaces")
  //   .min(8, "Password must be at least 8 characters long"),
});

export const loginFormValidationSchema = object().shape({
  email: string()
    .email("Please enter a valid email")
    .required("Please enter your email"),
  password: string()
    .required("Please enter your password")
    .matches(
      uppercaseRegex,
      "Password must contain at least one uppercase letter"
    )
    .matches(
      lowercaseRegex,
      "Password must contain at least one lowercase letter"
    )
    .matches(numberRegex, "Password must contain at least one number")
    .matches(
      specialCharRegex,
      "Password must contain at least one special character"
    )
    .matches(spacesRegex, "Password must not contain spaces")
    .min(8, "Password must be at least 8 characters long"),
});

export const resetPasswordEmailValidationSchema = object().shape({
  email: string()
    .email("Please enter a valid email")
    .required("Please enter your email"),
});

export const setNewPasswordValidationSchema = object().shape({
  password: string().required("Please enter your password"),
  // password: string()
  //   .required("Please enter your password")
  //   .matches(
  //     uppercaseRegex,
  //     "Password must contain at least one uppercase letter"
  //   )
  //   .matches(
  //     lowercaseRegex,
  //     "Password must contain at least one lowercase letter"
  //   )
  //   .matches(numberRegex, "Password must contain at least one number")
  //   .matches(
  //     specialCharRegex,
  //     "Password must contain at least one special character"
  //   )
  //   .matches(spacesRegex, "Password must not contain spaces")
  //   .min(8, "Password must be at least 8 characters long"),
  confirmPassword: string()
    .required("Please confirm your password")
    .oneOf([ref("password")], "The passwords doesn’t match."),
});

export const verifyPhoneNumberSchema = object().shape({
  country: string().required("Please select country"),
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
  bankCode: string().required("Please enter your bank"),
  accountNumber: string().required("Please enter your account number"),
});

export const basicVehicleInformationSchema = object().shape({
  vehicleName: string().required("Vehicle name is required"),
  city: string().required("City is required"),
  address: string().required("Address is required"),
  vehicleType: string().required("Please select vehicle type"),
  vehicleMake: string().required("Please select vehicle make"),
  vehicleModel: string().required("Please select vehicle model"),
  year: string().required("Please select year of release"),
  insurance: string().required("Please select insurance status"),
  tracker: string().required("Please select tracker status"),
});

export const addtionalVehicleInformationSchema = object().shape({
  licensePlateNumber: string().required("License plate number is required"),
  stateOfRegistration: string().required("State of registration is required"),
  vehicleDescription: string().required("Vehicle description is required"),
  // vehicleFeatures: string().required("Vehicle features is required"),
  vehicleColor: string().required("Vehicle color is required"),
  numberOfSeats: string().required("Number of seats is required"),
});

export const vehiclePhotosSchema = object().shape({
  // frontView: string().required("Front view is required"),
  // backView: string().required("Back view is required"),
  // leftView: string().required("Left view is required"),
  // rightView: string().required("Right view is required"),
  // interiorView: string().required("Interior view is required"),
});

export const availabilityAndPricingSchema = object().shape({
  advanceNotice: string().required("Advance notice is required"),
});
