"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Button from "@repo/ui/button";
import Image from "next/image";
import BackLink from "@/components/BackLink";
import Link from "next/link";
import { formatNumberWithCommas } from "@/utils/functions";
import { TransactionStatus } from "@/utils/types";
import { format } from "date-fns";
import { FullPageSpinner } from "@repo/ui/spinner";
import useFetchVehicleById from "@/components/VehicleBooking/hooks/useFetchVehicleById";
import useGetBookingById from "@/components/BookingsAnalytics/hooks/useGetBookingById";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useHttp } from "@/hooks/useHttp";
import { ReactNode } from "react";
import { toTitleCase } from "@/utils/functions";
import Icons from "@repo/ui/icons";

import cn from "classnames";

const TripInfoWrapper = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="bg-white rounded-3xl py-4 px-7 space-y-5">
      <p className="text-sm md:text-base 3xl:text-xl text-grey-800 !font-semibold">
        {title}
      </p>
      <div className="space-y-8">{children}</div>
    </div>
  );
};

const DurationDetails = ({
  date,
  time,
  icon,
  iconColor,
  title,
}: {
  date: Date;
  time: Date;
  icon: ReactNode;
  iconColor: string;
  title: string;
}) => {
  return (
    <div className="flex items-center justify-between gap-2">
      <p className="flex items-center gap-1.5">
        <span className={cn("*:w-5 *:h-5", iconColor)}>{icon}</span>
        <span>{title}</span>
      </p>
      <p>
        {format(new Date(date), "do MMM yyyy")} |{" "}
        {format(new Date(time), "hh:mma")}
      </p>
    </div>
  );
};
export interface BookingInformation {
  id: string;
  startDate: string;
  endDate: string;
  duration: number;
  bookingType: "TWELVE_HOURS" | "AN_HOUR" | "DAILY" | string; // extend as needed
  amount: number;
  paymentStatus: "PENDING" | "PAID" | "FAILED" | string;
  paymentMethod: "CARD" | "BANK_TRANSFER" | "CASH" | string;
  rentalAgreement: string | null;
  bookingStatus: "PENDING" | "CONFIRMED" | "CANCELLED" | string;
  isForSelf: boolean;
  guestName: string;
  guestEmail: string;
  guestPhoneNumber: string;
  pickupLocation: string;
  dropoffLocation: string;
  emergencyContact: string;
  userEmail: string | null;
  userPhoneNumber: string | null;
  userCountry: string | null;
  countryCode: string | null;
  specialInstructions: string;
  paymentLink: string;
  outskirtsLocation: string[];
  extremeAreasLocation: string[];
  areaOfUse: string;
  extraDetails: string;
  purposeOfRide: string;
  tripPurpose: string;
  secondaryPhoneNumber: string | null;
  currencyCode: string;
  vehicleId: string;
  userId: string;
  hostId: string;
  numberOfExtraHours: number;
  version: number;
  createdAt: string;
  updatedAt: string;
  bookingGroupId: string;
  vehicle: Vehicle;
  user: User;
}

export interface Vehicle {
  pricing: VehiclePricing;
  tripSettings: TripSettings;
  id: string;
  listingName: string;
  location: string;
  address: string;
  vehicleType: string;
  make: string;
  model: string;
  yearOfRelease: string;
  hasTracker: boolean;
  hasInsurance: boolean;
  licensePlateNumber: string;
  vehicleColor: string;
  stateOfRegistration: string;
  vehicleDescription: string;
  numberOfSeats: number;
  longitude: number | null;
  latitude: number | null;
  status: string;
  vehicleStatus: string;
  rejectionReason: string | null;
  userId: string;
  vehicleCurrency: string;
  isActive: boolean;
  areYouVehicleOwner: boolean;
  vehicleIdentifier: string;
  isReserved: boolean;
  reservationExpiresAt: string;
  unavailableFrom: string | null;
  unavailableUntil: string | null;
  features: string[];
  outskirtsLocation: string[];
  outskirtsPrice: number | null;
  extremeAreasLocation: string[];
  extremeAreaPrice: number | null;
  isTopRate: boolean;
  createdAt: string;
  updatedAt: string;
  VehicleImage: VehicleImage;
}

export interface VehiclePricing {
  dailyRate: {
    value: number;
    currency: string | null;
    unit: string;
  };
  extraHoursFee: number;
  airportPickupFee: number;
  hourlyRate: number | null;
  discounts: Discount[];
  bookingTypePrices: any[]; // refine if needed
}

export interface Discount {
  durationInDays: number;
  percentage: number;
}

export interface TripSettings {
  advanceNotice: string;
  maxTripDuration: string;
  provideDriver: boolean;
  fuelProvided: boolean;
}

export interface VehicleImage {
  id: string;
  frontView: string;
  backView: string;
  sideView1: string;
  sideView2: string;
  interior: string;
  other: string;
  vehicleId: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: string | null;
  profileImage: string | null;
  countryCode: string;
  country: string;
  emailConfirmed: boolean;
  otp: string | null;
  passwordOtp: string | null;
  phoneNumber: string;
  isActive: boolean;
  phoneVerified: boolean;
  bvnVerified: boolean;
  withdrawalAccountVerified: boolean;
  bio: string | null;
  city: string | null;
  cities: string[];
  userRole: "CUSTOMER" | "ADMIN" | string;
  isBusiness: boolean;
  businessLogo: string | null;
  businessName: string | null;
  businessAddress: string | null;
  businessPhoneNumber: string | null;
  businessEmail: string | null;
  createdAt: string;
  updatedAt: string;
  referralCode: string;
  referredBy: string | null;
  referralBalance: number;
  onBoardedBy: string | null;
  mouDocument: string | null;
  lastLogin: string | null;
  isDeleted: boolean;
  blockedReason: string | null;
  teamId: string | null;
}


const SuccessPaymentComponent = () => {
  const [vehicleId, setVehicleId] = useState<string>("");
  const [bookingId, setBookingId] = useState<string>("");
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const http = useHttp()

  useEffect(() => {
    const storedVehicleId = sessionStorage.getItem("vehicleID");
    const storedBookingId = sessionStorage.getItem("bookingGroupID");
    const userLoggedInVal = localStorage.getItem("user_token");

    if (userLoggedInVal) {
      setUserLoggedIn(true);
    }

    if (storedVehicleId) {
      try {
        // If the value was stored as JSON string
        const cleanVehicleId = JSON.parse(storedVehicleId);
        setVehicleId(cleanVehicleId);
      } catch {
        // Fallback if not valid JSON
        setVehicleId(storedVehicleId.replace(/['"]/g, ""));
      }
    }

    if (storedBookingId) {
      try {
        const cleanBookingId = JSON.parse(storedBookingId);
        setBookingId(cleanBookingId);
      } catch {
        setBookingId(storedBookingId.replace(/['"]/g, ""));
      }
    }

    localStorage.removeItem("priceData");
  }, []);

  const { vehicleImages, isLoading: isLoadingVehicle } = useFetchVehicleById({
    id: vehicleId,
  });

  // const { bookingDetail, isLoading: isLoadingBooking } = useGetBookingById({
  //   id: bookingId,
  // });

  const { data, isError, isLoading } = useQuery({
    queryKey: ["getBookingById", bookingId],

    queryFn: async () =>
      await http.get<BookingInformation[]>(`/api/bookings/group/${bookingId}`),
    enabled: !!bookingId,
    retry: false

  });



  console.log(vehicleId)
  console.log(bookingId)
  //Show loading state while getting IDs from localStorage
  if (!vehicleId || !bookingId) {
    return <FullPageSpinner className="!min-h-screen" />;
  }

  return (
    <div className="flex justify-between flex-col-reverse md:flex-row text-grey-800">
      {/* Single back button at the top */}
      <div className="fixed top-4 left-4 z-50 md:absolute md:top-6 md:left-6">
        <BackLink
          backLink={`/vehicle/booking/${vehicleId}`}
          className="text-black flex bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition-all duration-200 md:bg-transparent md:shadow-none md:p-0"
        />
      </div>

      {/* vehicle summary - increased width for more room */}
      <div className="w-full md:w-1/2 bg-grey-50 space-y-6 sm:space-y-8 py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {isLoadingVehicle ? (
          <FullPageSpinner className="!min-h-[300px]" />
        ) : (
          <>
            <div className="space-y-4 mt-8 md:mt-0">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold leading-tight">
                {data && data[0]?.vehicle?.listingName}
              </h2>
            </div>

            <div className="space-y-6 md:space-y-8">
              {/* slider */}
              <div className="w-full">
                <Swiper
                  pagination={{
                    type: "fraction",
                  }}
                  navigation={true}
                  modules={[Pagination, Navigation]}
                  className="vehicle-summary-swiper w-full"
                  breakpoints={{
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 10,
                    },
                    640: {
                      slidesPerView: 1,
                      spaceBetween: 15,
                    },
                    768: {
                      slidesPerView: 1,
                      spaceBetween: 20,
                    },
                  }}
                >
                  {vehicleImages.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div className="w-full aspect-[16/9] sm:aspect-[2/1] lg:aspect-[632/325]">
                        <Image
                          src={image}
                          alt={`Vehicle image ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                          className="rounded-2xl sm:rounded-3xl lg:rounded-[42px] object-cover"
                          priority={index === 0}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* car preview */}
              <div className="flex items-center gap-1 sm:gap-2 md:gap-3 overflow-hidden pb-2">
                {vehicleImages.slice(0, 4).map((image, index) => (
                  <div key={index} className="flex-shrink-0 relative">
                    <div className="w-16 h-10 sm:w-20 sm:h-12 md:w-24 md:h-14 lg:w-28 lg:h-16 xl:w-32 xl:h-20">
                      <Image
                        src={image}
                        alt={`Vehicle thumbnail ${index + 1}`}
                        fill
                        sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, (max-width: 1024px) 96px, 152px"
                        className="rounded-lg sm:rounded-xl lg:rounded-[18px] object-cover hover:opacity-75 transition-opacity duration-200 cursor-pointer"
                      />
                    </div>
                  </div>
                ))}
                {vehicleImages.length > 4 && (
                  <div className="flex-shrink-0 w-16 h-10 sm:w-20 sm:h-12 md:w-24 md:h-14 lg:w-28 lg:h-16 xl:w-32 xl:h-20 bg-grey-200 rounded-lg sm:rounded-xl lg:rounded-[18px] flex items-center justify-center">
                    <span className="text-xs sm:text-sm text-grey-600 font-medium">
                      +{vehicleImages.length - 4}
                    </span>
                  </div>
                )}
              </div>




              {
                data?.map((bookingInfo, index) => (
                  <div key={bookingInfo.id} className="bg-white py-4 sm:py-5 md:py-6 px-4 sm:px-6 md:px-7 rounded-xl sm:rounded-2xl md:rounded-[22px] space-y-4 sm:space-y-5 md:space-y-6 shadow-sm">
                    <p>Trip {index + 1}</p>
                    <div className="space-y-3 text-xs sm:text-sm md:text-base lg:text-lg">
                      <div className="flex items-center gap-3 justify-between">
                        <div className="flex items-center gap-3 justify-between flex-wrap">
                          <p className="text-sm md:text-base 3xl:text-xl text-grey-800 !font-semibold">
                            Booking Type
                          </p>
                        </div>
                        <div>
                          <p className="bg-grey-900 text-white py-0.5 px-4 rounded-3xl w-fit text-xs md:text-sm 3xl:text-base">
                            {toTitleCase(bookingInfo.bookingType.split("_")[0] + ` ${bookingInfo.bookingType.split("_")[1]}`)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 text-xs sm:text-sm md:text-base lg:text-lg">
                      <div className="flex items-center gap-3 justify-between">
                        <p className="flex items-center gap-1.5">
                          <span className={cn("*:w-5 *:h-5", "text-primary-500")}>{Icons.ic_flag}</span>
                          <span>Start</span>
                        </p>
                        <p>
                          {format(new Date(bookingInfo.startDate), "do MMM yyyy")} |{" "}
                          {format(new Date(bookingInfo.startDate), "hh:mma")}
                        </p>
                      </div>

                    </div>
                  </div>
                ))
              }
            </div>
          </>
        )}
      </div>

      {/* payment summary - adjusted width */}
      <div className="w-full md:w-1/2 text-center py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 px-4 sm:px-6 md:px-8 lg:px-12">
        {isLoading && data ? (
          <FullPageSpinner className="!min-h-[300px]" />
        ) : data && data[0]?.paymentStatus === TransactionStatus.SUCCESS ? (
          <div className="h-full flex flex-col items-center justify-center gap-12 sm:gap-16">
            <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto space-y-6">
              <div className="space-y-3">
                <h2 className="text-grey-700 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
                  This Is The Last Step
                </h2>
                <p className="text-grey-500 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                  pay to confirm booking
                </p>
              </div>
              <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">
                Pay {data[0]?.currencyCode}{" "}
                {formatNumberWithCommas(data[0]?.amount || 0)}
              </h4>
              <Link
                className="block w-full"
                href={data[0]?.paymentLink || ""}
                target="_blank"
              >
                <Button
                  fullWidth
                  variant="filled"
                  color="primary"
                  radius="lg"
                  className="h-12 sm:h-14 text-base sm:text-lg font-semibold hover:shadow-lg transition-shadow duration-200"
                >
                  Proceed to Payment
                </Button>
              </Link>
            </div>
            <p className="text-grey-500 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed max-w-xs sm:max-w-sm md:max-w-md mx-auto">
              You can cancel this ride on or before 48hrs to the trip{" "}
              <Link
                href="/"
                className="text-primary-500 hover:underline font-medium"
              >
                View policy
              </Link>
            </p>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center gap-12 sm:gap-16">
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto space-y-6">
              <div className="flex justify-center mb-6">
                <Image
                  src="/icons/success_confetti.png"
                  alt="Success"
                  height={80}
                  width={80}
                  className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-[100px] xl:h-[100px]"
                />
              </div>
              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-grey-800 leading-tight">
                  Congratulations!
                </h2>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-normal text-grey-500">
                  ride booked successfully
                </p>
              </div>
              <div className="space-y-3 sm:space-y-4">
                {/* <Button
                  variant="outlined"
                  rounded="full"
                  fullWidth
                  className="h-12 sm:h-14 text-base sm:text-lg font-semibold transition-colors duration-200 hover:text-primary-500"
                  onClick={() => {
                    localStorage.removeItem("vehicleId");
                    localStorage.removeItem("bookingId");
                    localStorage.removeItem("bookingInformation");
                  }}
                >
                  Cancel Booking
                </Button> */}
                <Link
                  href={
                    userLoggedIn
                      ? "/bookings"
                      : `/vehicle/guest-booking/${bookingId}`
                  }
                  className="block w-full"
                >
                  <Button
                    color="primary"
                    rounded="full"
                    fullWidth
                    className="h-12 sm:h-14 text-base sm:text-lg font-semibold hover:shadow-lg transition-shadow duration-200"
                    onClick={() => {
                      localStorage.removeItem("vehicleId");
                      localStorage.removeItem("bookingId");
                      localStorage.removeItem("bookingInformation");
                    }}
                  >
                    {userLoggedIn
                      ? "Manage my bookings"
                      : "View Booking Details"}
                  </Button>
                </Link>
              </div>
            </div>
            {/* <p className="text-grey-500 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed max-w-xs sm:max-w-sm md:max-w-md mx-auto">
              You can cancel this ride on or before 48hrs to the trip{" "}
              <Link
                href="/privacy-policy"
                className="text-primary-500 hover:underline font-medium"
              >
                View policy
              </Link>
            </p> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default SuccessPaymentComponent;
