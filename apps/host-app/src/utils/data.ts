import { BookingOverviewTableRow, TopRatedVehicleType } from "./types";

export const vehicleTypes = [
  { value: "Sedan", option: "Sedan" },
  { value: "SUV", option: "SUV" },
  { value: "Truck", option: "Truck" },
  { value: "Sports Car", option: "Sports Car" },
  { value: "Pickup", option: "Pickup" },
  { value: "Bus", option: "Bus" },
  { value: "Luxury Vehicle", option: "Luxury Vehicle" },
];

export const vehicleMakes = [
  { value: "Toyota", option: "Toyota" },
  { value: "Ford", option: "Ford" },
  { value: "Honda", option: "Honda" },
  { value: "Chevrolet", option: "Chevrolet" },
  { value: "Nissan", option: "Nissan" },
  { value: "BMW", option: "BMW" },
  { value: "Mercedes-Benz", option: "Mercedes-Benz" },
];

export const vehicleModels = [
  { value: "Tucson", option: "Tucson" },
  { value: "Santa Fe", option: "Santa Fe" },
  { value: "Palisade", option: "Palisade" },
  { value: "Kona", option: "Kona" },
  { value: "Venue", option: "Venue" },
  { value: "Ioniq Electric", option: "Ioniq Electric" },
  { value: "Veloster N", option: "Veloster N" },
];

export const vehicleColors = [
  { value: "Red", option: "Red" },
  { value: "Black", option: "Black" },
  { value: "White", option: "White" },
  { value: "Silver", option: "Silver" },
  { value: "Gold", option: "Gold" },
];

export const vehicleFeatures = [
  "All wheel drive",
  "Android auto",
  "Apple car play",
  "Aux Input",
  "Backup camera",
  "Bike rack",
  "Blind spot warning",
  "Bluetooth",
  "Child seat",
  "Convertible",
  "GPS",
  "Heated seats",
  "Keyless entry",
  "Pet friendly",
  "Ski rack",
  "USB Charger",
  "Sunroof",
  "Toll pass",
  "USB input",
  "Wheelchair accessible",
];

export const cities = [
  { value: "Lagos", option: "Lagos" },
  { value: "Accra", option: "Accra" },
  { value: "Abuja", option: "Abuja" },
  { value: "Port Harcourt", option: "Port Harcourt" },
];

export const monthsFilter = [
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

export const tableHeadItems = [
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
      { label: "Canceled", value: "canceled" },
      { label: "Rejected", value: "rejected" },
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

export const bookingOverviewTableItems: BookingOverviewTableRow[] = [
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
