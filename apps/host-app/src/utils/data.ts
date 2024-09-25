import Icons from "@repo/ui/icons";
import {
  AccountSetupTask,
  BookingTableRow,
  TopRatedVehicleType,
  TransactionTableRow,
} from "./types";

export const dashboardNavItems = [
  {
    icon: Icons.ic_dashboard,
    name: "Dashboard",
    link: "/dashboard",
  },
  {
    icon: Icons.ic_ticket,
    name: "Bookings",
    link: "/bookings",
  },
  {
    icon: Icons.ic_car,
    name: "Listings",
    link: "/listings",
  },
  {
    icon: Icons.ic_wallet,
    name: "Wallet",
    link: "/wallet",
  },
  {
    icon: Icons.ic_support,
    name: "Support",
    link: "/support",
  },
];

export const popupNavItems = [
  {
    icon: Icons.ic_user_account,
    name: "My account",
    link: "/dashboard",
  },
  {
    icon: Icons.ic_setting,
    name: "Settings",
    link: "/dashboard",
  },
  {
    icon: Icons.ic_help_circle,
    name: "About Us",
    link: "/dashboard",
  },
  {
    icon: Icons.ic_logout,
    name: "Log out",
    link: "/dashboard",
  },
];

export const popupNavItemsforNoUser = [
  {
    icon: Icons.ic_host,
    name: "Become a host",
    link: "/signup",
  },
  {
    icon: Icons.ic_login,
    name: "Login",
    link: "/login",
  },
  {
    icon: Icons.ic_help_circle,
    name: "About Us",
    link: "/dashboard",
  },
];

export const completeAccountSetupTasks: AccountSetupTask[] = [
  {
    icon: Icons.ic_lock,
    title: "Verify Phone Number",
    link: "/account-setup/verify-number",
    linkText: "Start Verification",
    isCompleted: false,
    taskId: "phoneVerified",
  },
  // {
  //   icon: Icons.ic_lock,
  //   title: "Verify your identity",
  //   link: "/account-setup/verify-identity",
  //   linkText: "Start Verification",
  //   isCompleted: false,
  //   taskId: "bvnVerified",
  // },
  {
    icon: Icons.ic_lock,
    title: "Setup Withdrawal Account",
    link: "/account-setup/withdrawal-account",
    linkText: "Get Started",
    isCompleted: false,
    taskId: "withdrawalAccountVerified",
  },
];

const currentYear = new Date().getFullYear();
export const yearOfReleaseOptions = Array.from(
  { length: currentYear - 2010 + 1 },
  (_, index) => ({
    value: (2010 + index).toString(),
    option: (2010 + index).toString(),
  })
);

// add type
export const vehicleTypesOptions = [
  { value: "Sedan", option: "Sedan" },
  { value: "SUV", option: "SUV" },
  { value: "Truck", option: "Truck" },
  { value: "Sports Car", option: "Sports Car" },
  { value: "Pickup", option: "Pickup" },
  { value: "Bus", option: "Bus" },
  { value: "Luxury Vehicle", option: "Luxury Vehicle" },
];

// add type
export const vehicleMakesOptions = [
  { value: "Toyota", option: "Toyota" },
  { value: "Ford", option: "Ford" },
  { value: "Honda", option: "Honda" },
  { value: "Chevrolet", option: "Chevrolet" },
  { value: "Nissan", option: "Nissan" },
  { value: "BMW", option: "BMW" },
  { value: "Mercedes-Benz", option: "Mercedes-Benz" },
];

// add type
export const vehicleModelsOptions = [
  { value: "Tucson", option: "Tucson" },
  { value: "Santa Fe", option: "Santa Fe" },
  { value: "Palisade", option: "Palisade" },
  { value: "Kona", option: "Kona" },
  { value: "Venue", option: "Venue" },
  { value: "Ioniq Electric", option: "Ioniq Electric" },
  { value: "Veloster N", option: "Veloster N" },
];

// add type
export const vehicleColorsOptions = [
  { value: "Red", option: "Red" },
  { value: "Black", option: "Black" },
  { value: "White", option: "White" },
  { value: "Silver", option: "Silver" },
  { value: "Gold", option: "Gold" },
];

export const vehicleFeaturesOptions: string[] = [
  "AllWheelDrive",
  "AndroidAuto",
  "AppleCarPlay",
  "AuxInput",
  "BackupCamera",
  "BikeRack",
  "BlindSpotWarning",
  "Bluetooth",
  "ChildSeat",
  "Convertible",
  "Gps",
  "HeatedSeats",
  "KeylessEntry",
  "PetFriendly",
  "SkiRack",
  "UsbCharger",
  "Sunroof",
  "TollPass",
  "UsbInput",
  "WheelchairAccessible",
];

// add type
export const citiesOptions = [
  { value: "Abuja", option: "Abuja" },
  { value: "Accra", option: "Accra" },
  { value: "Benin", option: "Benin City" },
  { value: "Enugu", option: "Enugu" },
  { value: "Lagos", option: "Lagos" },
  { value: "Port Harcourt", option: "Port Harcourt" },
];

// add type
export const photoViewOptions = [
  {
    label: "Front View",
    name: "frontView",
    image: "/images/onboarding/front_view.png",
    size: "w-[50px] 3xl:w-[75px]",
  },
  {
    label: "Back View",
    name: "backView",
    image: "/images/onboarding/back_view.png",
    size: "w-[50px] 3xl:w-[75px]",
  },
  {
    label: "Side View 1",
    name: "sideView1",
    image: "/images/onboarding/side_view_1.png",
    size: "w-[120px] 3xl:w-[160px]",
  },
  {
    label: "Side View 2",
    name: "sideView2",
    image: "/images/onboarding/side_view_2.png",
    size: "w-[120px] 3xl:w-[160px]",
  },
  {
    label: "Interior Image",
    name: "interior",
    image: "/images/onboarding/interior_view.png",
    size: "w-[50px] 3xl:w-[75px]",
  },
  {
    label: "Other Image",
    name: "other",
    image: "/images/onboarding/other_view.png",
    size: "w-[120px] 3xl:w-[160px]",
  },
];

export const outskirtsLocationOptions: string[] = [
  "Ikorodu",
  "Badagry",
  "Epe",
  "Ibeju-Lekki",
  "Ojo",
  "Alimosho",
  "Agege",
  "Ajah",
  "Agbara",
  "Sango",
  "Ijede",
  "Ikotun",
  "Egbeda",
];

export const monthsFilter: string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const photoUploadTips = [
  {
    title: "Take Photos From Different Angles",
    description:
      "Show all sides of your car - front, back, sides, and at an angle. Try to take photos during the day when there’s plenty of light, but avoid direct sunlight that can cause harsh shadows.",
  },
  {
    title: "Capture the Car's Condition",
    description:
      "Make sure your photos reflect the current condition of your car. Honesty builds trust with potential renters. If there are any minor dings or scratches, include a photo so there are no surprises.",
  },

  {
    title: "Mind the Weather",
    description:
      "Avoid taking photos on rainy or gloomy days. Sunshine makes everything look better. If the weather isn’t cooperating, wait for a better day to take your pictures.",
  },
  {
    title: "Clean Your Car Before the Photoshoot",
    description:
      "A clean car looks more inviting. Take the time to wash and vacuum your car before taking photos. This makes a big difference in how your car is perceived.",
  },
  {
    title: "Show Off the Interior and Exterior",
    description:
      "Renters want to see both the inside and outside of your car. Make sure to include shots of the dashboard, seats, trunk space, and any cool features like a sunroof or navigation system.",
  },
  {
    title: "Highlight Unique Features",
    description:
      "Got a great sound system or custom rims? Make sure to capture these unique features in your photos. They can make your car more appealing to potential renters.View detailed guidelines.",
  },
];

export const bookingOverviewTableHeadItems: string[] = [
  "Vehicle",
  "Guest Name",
  "Booking ID",
  "Booking Type",
  "Duration",
  "Start Date",
  "End Date",
  "Status",
  "Price",
  "Actions",
];

export const bookingAnalyticsTableHeadItems: string[] = [
  "Guest Name",
  "Booking ID",
  "Booking Type",
  "Duration",
  "Vehicle",
  "Start Date",
  "End Date",
  "Status",
  "Price",
  "Actions",
];

export const transactionTableHeadItems: string[] = [
  "Transaction ID",
  "Date",
  "Booking ID",
  "Type",
  "Vehicle",
  "Purpose",
  "Amount",
  "Status",
  "Actions",
];

// add type
export const bookingOverviewFilters = [
  {
    title: "Vehicle",
    options: [
      { label: "Hyundai Tuscon 2018", value: "hyundai-tuscon" },
      { label: "Toyota Camry 2017", value: "toyota-camry" },
    ],
  },
  {
    title: "Booking Type",
    options: [
      { label: "Daily rides", value: "daily" },
      { label: "Interstate rides", value: "interstate" },
      { label: "Weekly rides", value: "weekly" },
      { label: "Monthly rides", value: "monthly" },
      { label: "Airport pickups", value: "airport" },
    ],
  },
];

// add type
export const bookingFilters = [
  {
    title: "Booking Type",
    options: [
      { label: "Daily rides", value: "daily" },
      { label: "Interstate rides", value: "interstate" },
      { label: "Weekly rides", value: "weekly" },
      { label: "Monthly rides", value: "monthly" },
      { label: "Airport pickups", value: "airport" },
    ],
  },
  {
    title: "Vehicle",
    options: [
      { label: "Hyundai Tuscon 2018", value: "hyundai-tuscon" },
      { label: "Toyota Camry 2017", value: "toyota-camry" },
    ],
  },
  {
    title: "Date",
    options: [
      { label: "Start date", value: "start-date" },
      { label: "End date", value: "end-date" },
      { label: "Date range", value: "date-range" },
    ],
  },
  {
    title: "Status",
    options: [
      { label: "Active", value: "active" },
      { label: "Pending", value: "pending" },
      { label: "Completed", value: "completed" },
      { label: "Cancelled", value: "cancelled" },
      { label: "Rejected", value: "rejected" },
    ],
  },
];

// add type
export const transactionFilters = [
  {
    title: "Type",
    options: [
      { label: "Credit", value: "Credit" },
      { label: "Debit", value: "debit" },
    ],
  },
  {
    title: "Status",
    options: [
      { label: "Successful", value: "successful" },
      { label: "Pending", value: "pending" },
      { label: "Failed", value: "failed" },
    ],
  },
  {
    title: "Purpose",
    options: [
      { label: "Rental", value: "rental" },
      { label: "Refund", value: "refund" },
      { label: "Withdrawal", value: "withdrawal" },
    ],
  },
];

// =================== mock data ===================//
export const topRatedVehicle: TopRatedVehicleType = {
  make: "Hyundai",
  model: "Tuscon",
  year: "2018",
  colour: "Black",
  seatingCapacity: "4",
  totalRides: "440",
  totalEarnings: "$330,000",
};

export const bookingOverviewTableItems: BookingTableRow[] = [
  {
    vehicle: "Toyota Camry 2021",
    guestName: "Chioma Nwosu",
    bookingId: "BKG-1234-AB56",
    bookingType: "Instant",
    duration: "Leading text",
    startDate: "Apr 12, 2023",
    endDate: "Apr 12, 2023",
    status: "Accepted",
    price: "NGN 100,000",
    actions: "Leading text",
  },
  {
    vehicle: "Honda Civic 2019",
    guestName: "Oluwaseun Ojo",
    bookingId: "BKG-4567-GH12",
    bookingType: "Leading text",
    duration: "1 day",
    startDate: "Apr 12, 2023",
    endDate: "Leading text",
    status: "Accepted",
    price: "Leading text",
    actions: "Leading text",
  },
  {
    vehicle: "Mercedes-Benz C-Class 2019",
    guestName: "Chukwuemeka Okeke",
    bookingId: "BKG-4567-GH12",
    bookingType: "Pick-up & drop-off",
    duration: "3 days",
    startDate: "Apr 11, 2023",
    endDate: "Leading text",
    status: "Accepted",
    price: "NGN 20,000",
    actions: "Leading text",
  },
  {
    vehicle: "Subaru Outback 2020",
    guestName: "Chigozie Nnamani",
    bookingId: "BKG-5678-IJ34",
    bookingType: "Long term",
    duration: "1 week",
    startDate: "Apr 11, 2023",
    endDate: "Leading text",
    status: "Accepted",
    price: "NGN 14,000",
    actions: "Leading text",
  },
  {
    vehicle: "Toyota Camry 2021",
    guestName: "Ezinne Chukwu",
    bookingId: "BKG-8901-MN78",
    bookingType: "Long term",
    duration: "Leading text",
    startDate: "Apr 10, 2023",
    endDate: "Apr 10, 2023",
    status: "Accepted",
    price: "NGN 30,000",
    actions: "Leading text",
  },
  {
    vehicle: "Mercedes-Benz C-Class 2019",
    guestName: "Oluchi Eze",
    bookingId: "BKG-0123-QR12",
    bookingType: "Instant",
    duration: "Leading text",
    startDate: "Apr 09, 2023",
    endDate: "Apr 09, 2023",
    status: "Accepted",
    price: "NGN 16,000",
    actions: "Leading text",
  },
  {
    vehicle: "Toyota Camry 2021",
    guestName: "Chika Ibe",
    bookingId: "BKG-3456-EF90",
    bookingType: "Instant",
    duration: "1 day",
    startDate: "Apr 09, 2023",
    endDate: "Leading text",
    status: "Accepted",
    price: "NGN 42,000",
    actions: "Leading text",
  },
  {
    vehicle: "Toyota Camry 2021",
    guestName: "Nnamdi Kalu",
    bookingId: "BKG-4567-GH12",
    bookingType: "Pick-up & drop-off",
    duration: "Leading text",
    startDate: "Apr 08, 2023",
    endDate: "Leading text",
    status: "Accepted",
    price: "NGN 65,000",
    actions: "Leading text",
  },
  {
    vehicle: "Toyota Camry 2021",
    guestName: "Obinna Anozie",
    bookingId: "BKG-6789-KL56",
    bookingType: "Leading text",
    duration: "3 days",
    startDate: "Apr 07, 2023",
    endDate: "Apr 07, 2023",
    status: "Accepted",
    price: "NGN 70,000",
    actions: "Leading text",
  },
  {
    vehicle: "Mercedes-Benz C-Class 2019",
    guestName: "Adebayo Olatunji",
    bookingId: "BKG-3851-ZW76",
    bookingType: "Instant",
    duration: "2 days",
    startDate: "Apr 06, 2023",
    endDate: "Leading text",
    status: "Accepted",
    price: "NGN 50,000",
    actions: "Leading text",
  },
];

export const transactionData: TransactionTableRow[] = [
  {
    transactionId: "TXN-2023-01-1234",
    date: "Apr 12, 2023 | 09:32AM",
    bookingId: "BKG-1234-AB56",
    type: "Credit",
    vehicle: "Toyota Camry 2021",
    purpose: "Rental",
    amount: "NGN 100,000",
    status: "Successful",
    actions: "",
  },
  {
    transactionId: "TXN-2023-01-1234",
    date: "Apr 12, 2023 | 09:32AM",
    bookingId: "BKG-1234-AB56",
    type: "Debit",
    vehicle: "Toyota Camry 2021",
    purpose: "Rental",
    amount: "NGN 100,000",
    status: "Pending",
    actions: "",
  },
  {
    transactionId: "TXN-2023-01-1234",
    date: "Apr 12, 2023 | 09:32AM",
    bookingId: "BKG-1234-AB56",
    type: "Payout",
    vehicle: "Toyota Camry 2021",
    purpose: "Rental",
    amount: "NGN 100,000",
    status: "Failed",
    actions: "",
  },
];
