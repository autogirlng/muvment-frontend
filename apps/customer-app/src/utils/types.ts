import { ReactNode } from "react";

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

export interface BankProp {
  bankId: string;
  baseUssdCode: string;
  code: string;
  name: string;
  nipBankCode: string;
  transferUssdTemplate: string;
  ussdTemplate: string;
}

export interface AccountSetupTask {
  icon: JSX.Element;
  title: string;
  link: string;
  linkText: string;
  isCompleted: boolean;
  taskId: keyof User;
}

export type MappedInformation = {
  [key: string]: string | number;
};

type CalendarValuePiece = Date | null;

export type CalendarValue =
  | CalendarValuePiece
  | [CalendarValuePiece, CalendarValuePiece];

// <================= FORM VALUES BEGINS =================>
export interface SignupFormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  country: string;
  countryCode: string;
  password: string;
  password_checks?: PasswordChecks;
  referralCode?: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface verifyEmailValues {
  email: string;
  token: string;
}

export interface ResendVerifyEmailTokenValues {
  email: string;
}
export interface ResetPasswordEmailValues {
  email: string;
}

export interface VerifyPhoneNumberTokenValues {
  phoneNumber: string;
  token: string;
}

export interface SendPhoneNumberTokenValues {
  phoneNumber: string;
}

export interface VerifyOtpValues {
  token: string;
}

export interface SetNewPasswordValues {
  email: string;
  token: string;
  password?: string;
  confirmPassword: string;
  password_checks?: PasswordChecks;
}

export interface ChangePasswordValues {
  currentPassword: string;
  password: string;
  confirmPassword: string;
  password_checks?: PasswordChecks;
}

export interface VerifyPhoneNumberValues {
  phoneNumber: string;
  countryCode: string;
  country: string;
}

export interface VerifyIdentityValues {
  day: string;
  month: string;
  year: string;
  bvn: string;
}

export interface WithdrawalAccountValues {
  bank?: BankProp | null;
  bankCode: string;
  accountNumber: string;
  accountName?: string;
}

export interface PersonalInformationOthersValues {
  guestName: string;
  guestEmail: string;
  guestPhoneNumber: string;
  country: string;
  countryCode: string;
  specialInstructions?: string;
  tripPurpose?: string;
  /*   userEmail: string;
  userPhoneNumber: string; */
  userCountry: string;
  userCountryCode: string;
  isForSelf: boolean;
}

export interface PersonalInformationMyselfValues {
  guestName: string;
  guestEmail: string;
  guestPhoneNumber: string;
  country: string;
  countryCode: string;
  secondaryPhoneNumber: string;
  secondaryCountry: string;
  secondaryCountryCode: string;
  isForSelf: boolean;
}

export interface ItineraryInformationValues {
  pickupLocation: string;
  startDate: Date | null;
  startTime: Date | null;
  dropoffLocation: string;
  endDate: Date | null;
  endTime: Date | null;
  areaOfUse: string;
  outskirtsLocation: string[];
  extraDetails: string;
  purposeOfRide: string;
}

export interface PickupsAndDropoffsValues {
  pickupLocation: string;
  pickupDate: string;
  pickupTime: string;
  dropoffLocation: string;
  dropoffDate: string;
  dropoffTime: string;
  areaOfUse: string;
  outskirtsLocation: string[];
  extraDetails: string;
  purposeOfRide: string;
}

export interface ProfileFormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  // email: string;
  country: string;
  countryCode: string;
  profileImage?: string;
}

export interface WithdrawalValues {
  amount: string | number;
}

// <================= FORM VALUES ENDS =================>

export type BankCodes = {
  bankId: string;
  baseUssdCode: string;
  code: string;
  name: string;
  nipBankCode: string;
  transferUssdTemplate: string;
  ussdTemplate: string;
};

export interface AssignNewDriver {
  vehicleId: string;
  // bookingId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface VehiclePhotos {
  frontView: string;
  backView: string;
  sideView1: string;
  sideView2: string;
  interior: string;
  other: string;
}
export interface AvailabilityAndPricingValues {
  advanceNoticeInDays: string;
  minTripDurationInDays: string;
  maxTripDurationInDays: string;
  // selfDrive: string;
  driverProvided: string;
  fuelProvided: string;
  dailyRate: string;
  extraHourRate: string;
  airportPickup: string;
  threeDaysDiscount: string;
  sevenDaysDiscount: string;
  thirtyDaysDiscount: string;
  outskirtsLocation: string[];
  outskirtsPrice: string;
}

export type VehiclePerksProp = {
  icon: ReactNode;
  name: string;
  id: string;
  status: boolean;
};

// <================= STATUS =================>
export enum BookingBadgeStatus {
  ACCEPTED = "ACCEPTED",
  PENDING = "PENDING",
  CANCELLED = "CANCELLED",
  APPROVED = "APPROVED",
  COMPLTETED = "COMPLETED",
}

export enum PaymentBadgeStatus {
  SUCCESSFUL = "successful",
  PENDING = "pending",
  FAILED = "failed",
  PAID = "paid",
  CANCELLED = "cancelled",
}

export enum VehicleStatus {
  DRAFT = "draft",
  PENDING = "pending",
  SUBMITTED = "submitted",
  ACTIVE = "active",
  BOOKED = "booked",
  MAINTENANCE = "maintenance",
  UNAVAILABLE = "unavailable",
  INACTIVE = "inactive",
}
export enum ListingStatus {
  REVIEW = "review",
  REJECTED = "rejected",
  APPROVED = "approved",
  ACCEPTED = "accepted",
  FEEDBACK = "feedback",
  SUSPENDED = "suspended",
}

export enum DriverStatus {
  ASSIGNED = "ASSIGNED",
  UNASSIGNED = "UNASSIGNED",
}

export const enum BookingType {
  SINGLE_DAY = "SINGLE_DAY",
  MULTI_DAY = "MULTI_DAY",
}

export enum TransactionType {
  CREDIT = "CREDIT",
  DEBIT = "DEBIT",
}

export enum TransactionStatus {
  SUCCESS = "SUCCESS",
  PENDING = "PENDING",
  FAILED = "FAILED",
}

export enum TransactionOrigin {
  WITHDRAWAL = "WITHDRAWAL",
  BOOKING = "BOOKING",
}

export enum NotificationType {
  BOOKING_REQUEST = "BOOKING_REQUEST",
  BOOKING_CONFIRMED = "BOOKING_CONFIRMED",
  BOOKING_CANCELED = "BOOKING_CANCELED",
  UPCOMING_BOOKING = "UPCOMING_BOOKING",
  GUEST_CHECK_IN = "GUEST_CHECK_IN",
  GUEST_CHECK_OUT = "GUEST_CHECK_OUT",
  VEHICLE_ACCEPTED = "VEHICLE_ACCEPTED",
  PAYMENT_RECEIVED = "PAYMENT_RECEIVED",
  SECURITY_ALERT = "SECURITY_ALERT",
  NEW_REVIEW = "NEW_REVIEW",
  SPECIAL_OFFER = "SPECIAL_OFFER",
}

// <================= USER/LISTING/BOOKING/VEHICLE =================>
type UserVerification = {
  id: string;
  phoneNumber: string;
  otpToken: string | null;
  bvnNumber: string | null;
  dob: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

type HostStats = {
  bookingsCompleted: number;
  canceledBookings: number;
  hostStats: {
    averageRating: number;
    topRatedVehicle: {
      make: string;
      model: string;
      color: string;
      totalEarnings: number;
      totalRides: number;
    };
    totalCompletedRides: number;
    totalEarnings: number;
    totalOnboardedVehicles: number;
    walletBalance: number;
  };
  numberOfCustomers: number;
  totalRevenue: number;
};

type UserStats = {
  averageRating: number;
  referralStats: {
    completedReferrals: number;
    pendingReferrals: number;
    referralBalance: number;
    totalReferrals: number;
  };
  topRatedVehicle: {
    make: string;
    model: string;
    color: string;
    totalEarnings: number;
    totalRides: number;
  };
  totalCompletedRides: 0;
  totalEarnings: 0;
  totalOnboardedVehicles: 0;
  walletBalance: 0;
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
  withdrawalAccountVerified: boolean;
  bvnVerified: boolean;
  bio: string | null;
  city: string | null;
  userRole: "HOST";
  businessLogo: string | null;
  businessName: string | null;
  businessAddress: string | null;
  businessPhoneNumber: string | null;
  businessEmail: string | null;
  createdAt: string;
  updatedAt: string;
  Verification: UserVerification;
  statistics?: HostStats;
  stats?: UserStats;
  referralBalance: number;
  referralCode: string;
};

export interface TripSettings {
  advanceNotice: string;
  maxTripDuration: string;
  provideDriver: boolean;
  fuelProvided: boolean;
}

export interface Rate {
  value: number;
  unit: string;
  currency: string;
}

export interface Discount {
  durationInDays: number;
  percentage: number;
}

export interface Pricing {
  dailyRate: Rate;
  extraHoursFee: number;
  // hourlyRate: Rate;
  airportPickupFee: number;
  discounts: Discount[];
}

export interface AvailabilityAndPricing {
  tripSettings: TripSettings;
  pricing: Pricing;
  outskirtsLocation?: string[];
  outskirtsPrice?: number;
}

// update this
export interface TopRatedVehicle {
  id: string;
}

export interface DashboardStatistics {
  totalEarnings: number;
  totalOnboardedVehicles: number;
  totalCompletedRides: number;
  walletBalance: number;
  // topRatedVehicle: null | TopRatedVehicle;
  topRatedVehicle: null | TopRatedVehicleType;
}

export interface BookingStatistics {
  totalBookings: number;
  pendingApprovals: number;
  rejectedBookings: number;
  approvedRequests: number;
  activeBookings: number;
  upcomingBookings: number;
}

export interface UserReferrals {
  referredUserName: string;
  referredUserEmail: string;
  createdAt: string;
  status: "PENDING" | "JOINED";
  id: string;
}

export interface BookingInformation {
  id: string;
  startDate: string;
  endDate: string;
  duration: number;
  bookingType: BookingType;
  amount: number;
  paymentStatus: TransactionStatus;
  paymentLink: string;
  paymentMethod: "BANK_TRANSFER" | "CARD" | "CASH";
  rentalAgreement: string | null;
  bookingStatus: BookingBadgeStatus;
  guestName: string;
  guestEmail: string;
  guestPhoneNumber: string;
  pickupLocation: string;
  dropoffLocation: string;
  emergencyContact: string;
  vehicle: VehicleInformation;
  vehicleId: string;
  user?: User;
  userId: string;
  createdAt: string;
  updatedAt: string;
  currencyCode: string;
  areaOfUse: string;
  isForSelf: boolean;
  outskirtsLocation: string[];
  purposeOfRide: string;
}
export interface VehicleInformation {
  availabilityAndPricing: any;
  availabilityAndPricing: any;
  availabilityAndPricing: any;
  availabilityAndPricing: any;
  id?: string;
  listingName: string;
  location?: string;
  address?: string;
  vehicleType: string;
  make: string;
  model: string;
  yearOfRelease: string;
  hasTracker: boolean;
  hasInsurance: boolean;
  licensePlateNumber: string;
  stateOfRegistration: string;
  vehicleDescription: string;
  features: string[];
  vehicleColor: string;
  numberOfSeats: number;
  VehicleImage: VehiclePhotos;
  tripSettings: TripSettings;
  pricing: Pricing;
  outskirtsLocation?: string[];
  outskirtsPrice?: number;
  status: ListingStatus;
  vehicleStatus: VehicleStatus;
  userId: string;
  user: User;
  createdAt: string;
  updatedAt: string;
  vehicleCurrency: string;
  statistics: {
    bookingsCompleted: number;
    canceledBookings: number;
    hostStats: {
      averageRating: number;
      topRatedVehicle: number;
      totalCompletedRides: number;
      totalEarnings: number;
      totalOnboardedVehicles: number;
      walletBalance: number;
    };
    numberOfCustomers: number;
    totalRevenue: number;
  };
}
export interface AssignedDriver {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  vehicleId: string;
  bookingId: string;
  assignmentDate: string;
  status: DriverStatus;
  createdAt: string;
  updatedAt: string;
}

export interface EarningsStatistics {
  bookingsCompleted: number;
  cancelledBookings: number;
  numberOfCustomers: number;
  totalRevenue: number;
}

export interface ListingInformation {
  id?: string;
  listingName: string;
  location?: string;
  address?: string;
  vehicleType: string;
  make: string;
  model: string;
  yearOfRelease: string;
  hasTracker: boolean;
  hasInsurance: boolean;
  licensePlateNumber: string;
  stateOfRegistration: string;
  vehicleDescription: string;
  features: string[];
  vehicleColor: string;
  numberOfSeats: number;
  outskirtsLocation?: string[];
  outskirtsPrice?: number;
  status: ListingStatus;
  userId: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  unavailableFrom: string;
  unavailableUntil: string;
  vehicleStatus: VehicleStatus;
  VehicleImage: VehiclePhotos;
  pricing: Pricing;
  tripSettings: TripSettings;
  user: User;
  AssignedDriver: AssignedDriver[];
  Booking: BookingInformation[];
  statistics: EarningsStatistics;
}

export interface BookingDetailsInformation {
  id: string;
  startDate: string;
  endDate: string;
  duration: number;
  // bookingType: string;
  amount: number;
  // paymentStatus: string;
  // paymentMethod: string;
  // rentalAgreement: string | null;
  // bookingStatus: string;
  guestName: string;
  guestEmail: string;
  guestPhoneNumber: string;
  pickupLocation: string;
  dropoffLocation: string;
  emergencyContact: string;
  vehicleId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  // vehicle: Vehicle;
  // travelCompanions: TravelCompanion[];
}

export type Transaction = {
  id: string;
  transactionId: string;
  apiTransactionReference: string | null;
  date: string;
  time: string;
  amount: number;
  currencyCode: string;
  type: TransactionType;
  status: TransactionStatus;
  origin: TransactionOrigin;
  userId: string;
  bookingId: string | null;
  createdAt: string;
  updatedAt: string;
};

export type WalletBalance = {
  id: string;
  userId: string;
  walletBalance: number;
  // otpExpires: null;
  locked: boolean;
  // createdAt: string;
  // updatedAt: string;
};

export type Review = {
  id: string;
  rating: number;
  message: string;
  userId: string;
  bookingId: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  Reply?: ReviewReply[];
};

export type ReviewReply = {
  id: string;
  message: string;
  userId: string;
  reviewId: string;
  createdAt: string;
  updatedAt: string;
  user: User;
};

export type Notification = {
  id: string;
  title: string;
  message: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  isRead: boolean;
  trxReference: null;
  transaction: null;
  notificationType: NotificationType;
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

export type TransactionTableRow = {
  transactionId: string;
  date: string;
  bookingId: string;
  type: string;
  vehicle: string;
  purpose: string;
  amount: string;
  status: string;
  actions: string;
};
