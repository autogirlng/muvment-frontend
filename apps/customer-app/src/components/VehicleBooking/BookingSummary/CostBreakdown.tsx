import { HorizontalDivider } from "@repo/ui/divider";
import Button from "@repo/ui/button";
import cn from "classnames";
import { useEffect, useState } from "react";
import {
  calculateDiscount,
  calculateNumberOfDays,
  calculateServiceFee,
  calculateSubTotal,
  calculateTotalCostWithoutServiceFee,
  formatNumberWithCommas,
  getExistingBookingInformation,
  useFetchUrlParams,
} from "@/utils/functions";
import { BookingInformation, BookingType, TransactionStatus, TripDetails, VehicleInformation, User } from "@/utils/types";
import { standardServiceFeeInPercentage } from "@/utils/constants";
import useHandleBooking from "../hooks/useHandleBooking";
import { useSearchParams } from "next/navigation";
import { BlurredDialog } from "@repo/ui/dialog";
import { useHttp } from "@/hooks/useHttp";
import { BookingSummaryPricing } from "@/utils/types";
import { format, addHours } from "date-fns";
import { useRouter } from "next/navigation";
import { transactionData } from "@/utils/data";
import { NewBookingType } from "@/utils/types";
import { Spinner } from "@repo/ui/spinner";
import { Tiro_Devanagari_Hindi } from "next/font/google";

interface CreateNewBooking {
  vehicleId: string;
  currencyCode: string;
  countryCode: string;
  country: string;
  startDate: string; // ISO date string
  endDate: string;   // ISO date string
  duration: number;
  bookingType: NewBookingType;
  amount: number;
  secondaryPhoneNumber: string;
  isForSelf: boolean;
  specialInstructions: string;
  guestName: string;
  guestEmail: string;
  guestPhoneNumber: string;
  pickupLocation: string;
  dropoffLocation: string;
  outskirtsLocation: string[];
  extremeAreasLocation: string[];
  areaOfUse: string;
  extraDetails: string;
  purposeOfRide: string;
  tripPurpose: string;
  emergencyContact: string;
  paymentMethod: "BANK_TRANSFER" | "CARD" | "CASH";
  travelCompanions: { name: string; phoneNumber: string; }[];
  redirectUrl: string;
}

// ----- Root Response -----
export interface CheckoutResponse {
  transactionReference: string;
  paymentReference: string;
  merchantName: string;
  apiKey: string;
  redirectUrl: string;
  enabledPaymentMethod: string[];
  checkoutUrl: string;
  metaData: TransactionMetaData;
  bookings: Booking[];
}

// ----- MetaData -----
export interface TransactionMetaData {
  transactionId: string;
  bookingIds: string;
  isMultipleBookings: string; // could also be boolean if backend returns real boolean
}

// ----- Booking -----
export interface Booking {
  id: string;
  startDate: string; // ISO datetime
  endDate: string;   // ISO datetime
  duration: number;
  bookingType: string; // e.g. "AN_HOUR"
  amount: number;
  paymentStatus: string;
  paymentMethod: string;
  rentalAgreement: string | null;
  bookingStatus: string;
  isForSelf: boolean;
  guestName: string;
  guestEmail: string;
  guestPhoneNumber: string;
  pickupLocation: string;
  dropoffLocation: string;
  emergencyContact: string;
  userEmail: string | null;
  userPhoneNumber: string | null;
  userCountry: string;
  countryCode: string;
  specialInstructions: string;
  paymentLink: string | null;
  outskirtsLocation: string[];
  extremeAreasLocation: string[];
  areaOfUse: string;
  extraDetails: string;
  purposeOfRide: string;
  tripPurpose: string;
  secondaryPhoneNumber: string;
  currencyCode: string;
  vehicleId: string;
  userId: string;
  hostId: string;
  numberOfExtraHours: number;
  version: number;
  createdAt: string;
  updatedAt: string;
  bookingGroupId: string;
  travelCompanions: TravelCompanion[];
  vehicle: VehicleInformation;
}

// ----- Travel Companion -----
export interface TravelCompanion {
  name?: string;
  phoneNumber?: string;
}


// ----- Pricing -----
export interface Pricing {
  dailyRate: Rate;
  extraHoursFee: number;
  airportPickupFee: number;
  hourlyRate: Rate | null;
  discounts: Discount[];
}

export interface Rate {
  value: number;
  currency: string | null;
  unit: string;
}

export interface Discount {
  durationInDays: number;
  percentage: number;
}

// ----- Trip Settings -----
export interface TripSettings {
  advanceNotice: string;
  maxTripDuration: string;
  provideDriver: boolean;
  fuelProvided: boolean;
}


type Props = { vehicle: VehicleInformation | null; type: "guest" | "user" };

const CostBreakdown = ({ vehicle, type }: Props) => {
  const searchParams = useSearchParams();
  const [openCancellationModal, setOpenCancellationModal] = useState(false);

  // Get startDate and endDate from URL params
  const urlStartDate = searchParams.get("startDate");
  const urlEndDate = searchParams.get("endDate");

  const itineraryInformation = getExistingBookingInformation(
    {},
    vehicle?.id ?? "",
    "itineraryInformation"
  );
  const personalInformation = getExistingBookingInformation(
    {},
    vehicle?.id ?? "",
    "personalInformation"
  );

  const { bookingType } = useFetchUrlParams();

  const priceDataString = localStorage.getItem("priceData");
  const priceData = priceDataString ? JSON.parse(priceDataString) : null;

  const currencyCode = vehicle?.vehicleCurrency;
  const dailyRate = vehicle?.pricing?.dailyRate?.value ?? 0;
  const hostDiscounts = vehicle?.pricing?.discounts ?? [];
  const startDate = urlStartDate
    ? new Date(urlStartDate)
    : new Date(itineraryInformation?.startDate);
  const endDate = urlEndDate
    ? new Date(urlEndDate)
    : new Date(itineraryInformation?.endDate);

  // Calculate number of days
  // const numberOfDays = calculateNumberOfDays(endDate, startDate);

  // const totalCostWithoutServiceFee = calculateTotalCostWithoutServiceFee(
  //   endDate,
  //   startDate,
  //   dailyRate
  // );
  // const serviceFee = calculateServiceFee(
  //   totalCostWithoutServiceFee,
  //   standardServiceFeeInPercentage
  // );
  // const subTotal = calculateSubTotal(
  //   dailyRate,
  //   hostDiscounts,
  //   endDate,
  //   startDate
  // );

  // const { saveBooking, proceedToPayment } = useHandleBooking({
  //   vehicleId: vehicle?.id ?? "",
  //   type,
  // });

  // const handleOpenCancellationModal = () => {
  //   setOpenCancellationModal(!openCancellationModal);
  // };

  // const saveBookingHandler = () => {
  //   const {
  //     secondaryCountryCode,
  //     secondaryCountry,
  //     userCountry,
  //     userCountryCode,
  //     ...personalInformationValues
  //   } = personalInformation;

  //   const {
  //     // startDate,
  //     // endDate,
  //     startTime,
  //     endTime,
  //     ...itineraryInformationValues
  //   } = itineraryInformation;


  //   const amount = priceData?.totalPrice
  //     ? parseFloat(priceData?.totalPrice)
  //     : parseInt(subTotal);

  //   saveBooking.mutate({
  //     ...personalInformationValues,
  //     ...itineraryInformationValues,
  //     // startDate: itineraryInformation.startDate,
  //     // endDate: itineraryInformation.endDate,
  //     amount: amount,
  //     currencyCode: currencyCode,
  //     bookingType,
  //     duration: parseInt(numberOfDays),
  //     redirectUrl: `${process.env.NEXT_PUBLIC_VERCEL_URL}/vehicle/payment/draft`,
  //   });
  // };

  // const proceedToPaymentHandler = () => {
  //   const {
  //     secondaryCountryCode,
  //     secondaryCountry,
  //     userCountry,
  //     userCountryCode,
  //     ...personalInformationValues
  //   } = personalInformation;

  //   let {
  //     // startDate,
  //     // endDate,
  //     startTime,
  //     endTime,
  //     ...itineraryInformationValues
  //   } = itineraryInformation;

  //   const amount = priceData?.totalPrice
  //     ? parseFloat(priceData?.totalPrice)
  //     : parseInt(subTotal);

  //   // console.log({
  //   proceedToPayment.mutate({
  //     ...personalInformationValues,
  //     ...itineraryInformationValues,
  //     startDate:
  //       itineraryInformation.startDate &&
  //         !itineraryInformation.startDate.endsWith("Z")
  //         ? itineraryInformation.startDate + "Z"
  //         : itineraryInformation.startDate,
  //     endDate:
  //       itineraryInformation.endDate &&
  //         !itineraryInformation.endDate.endsWith("Z")
  //         ? itineraryInformation.endDate + "Z"
  //         : itineraryInformation.endDate,
  //     amount: amount,
  //     currencyCode: currencyCode,
  //     bookingType,
  //     duration: parseInt(numberOfDays),
  //     redirectUrl: `${process.env.NEXT_PUBLIC_VERCEL_URL}/vehicle/payment/success`,
  //   });
  // };
  const http = useHttp()
  const [bookingPriceSummary, setBookingPriceSummary] = useState<BookingSummaryPricing>()
  const [userTrips, setUserTrips] = useState<TripDetails[]>()
  const router = useRouter()


  const fetchBookingPriceSummary = async () => {
    const bookingTypes: string[] = [];
    const trips: TripDetails[] = JSON.parse(sessionStorage.getItem("trips") || "[]");
    const outskirtTripIDs = new Set()
    const extremeLocationsIDs = new Set();

    setUserTrips(trips)
    let isOutskirt = false;
    for (let trip of trips) {
      if (trip.bookingType) {
        bookingTypes.push(trip.bookingType)
      }
      if (trip.outskirtLocations && trip.outskirtLocations.length >= 1) {
        outskirtTripIDs.add(trip.id);
        isOutskirt = true
      }
      if (trip.extremeLocations && trip.extremeLocations.length >= 1) {
        extremeLocationsIDs.add(trip.id)
      }
    }

    const bookingPrice = await http.post<BookingSummaryPricing>("/api/bookings/calculate-price",
      {
        vehicleId: vehicle?.id,
        bookingTypes,
        isExtension: false,
        isOutskirt,
        numberOfOutskirts: outskirtTripIDs.size,
        isExtremeArea: extremeLocationsIDs.size > 0,
        numberOfExtremeAreas: extremeLocationsIDs.size
      }
    );
    setBookingPriceSummary(bookingPrice)
  }

  const handlePayment = async () => {
    const {
      secondaryCountryCode,
      secondaryCountry,
      userCountry,
      userCountryCode,
      country,
      guestEmail,
      guestName,
      guestPhoneNumber,
      isForSelf,
      secondaryPhoneNumber,
      tripPurpose,
      specialInstructions,
      ...personalInformationValues
    } = personalInformation;


    const bookings: CreateNewBooking[] = []


    userTrips && userTrips?.map((trip) => {

      const date = new Date(trip.tripStartDate || '')
      const startDate = format(date, "yyyy-MM-dd")
      const time = new Date(trip.tripStartTime || '')
      const startTime = time.toISOString().split("T")[1]

      const startDateTime = new Date(`${startDate}T${startTime}`)

      let endDateTime: Date;


      switch (trip.bookingType) {
        case "AN_HOUR":
          endDateTime = addHours(startDateTime, 1);
          break;
        case "THREE_HOURS":
          endDateTime = addHours(startDateTime, 3);
          break;
        case "SIX_HOURS":
          endDateTime = addHours(startDateTime, 6);
          break;
        case "TWELVE_HOURS":
          endDateTime = addHours(startDateTime, 12);
          break;
        case "AIRPORT_PICKUP":
          endDateTime = addHours(startDateTime, 3);
          break;
        default:
          endDateTime = time;
      }


      const tripCost = bookingPriceSummary?.breakdown.bookingTypeBreakdown[`${trip.bookingType}`];
      const booking: CreateNewBooking = {
        vehicleId: vehicle?.id || '',
        currencyCode: bookingPriceSummary?.currency || "NGN",
        countryCode: userCountryCode || "+234",
        country: userCountry || "NG",
        startDate: startDateTime.toISOString(),
        endDate: endDateTime.toISOString(),
        duration: 1,
        bookingType: trip?.bookingType!,
        amount: tripCost || 0,
        secondaryPhoneNumber: secondaryPhoneNumber || "",
        isForSelf,
        specialInstructions: specialInstructions || "",
        guestName: guestName || "",
        guestEmail: guestEmail || "",
        guestPhoneNumber: guestPhoneNumber || "",
        pickupLocation: trip.pickupLocation || '',
        dropoffLocation: trip.dropoffLocation || '',
        outskirtsLocation: trip.outskirtLocations || [],
        areaOfUse: trip.areaOfUse || '',
        extraDetails: trip.extraDetails || '',
        purposeOfRide: trip.purposeOfRide || "",
        tripPurpose: tripPurpose || "",
        emergencyContact: "",
        paymentMethod: "CARD",
        travelCompanions: [

        ],
        redirectUrl: `${process.env.NEXT_PUBLIC_VERCEL_URL}/vehicle/payment/success`,
        extremeAreasLocation: trip.extremeLocations || []

      }
      bookings.push(booking)
    })


    try {

      const transaction = await http.post<CheckoutResponse>("/api/bookings/create-multiple",
        {
          bookings: bookings,
          currencyCode: bookingPriceSummary?.currency || "NGN",
          totalAmount: Number(bookingPriceSummary?.totalPrice),
          redirectUrl: `${process.env.NEXT_PUBLIC_VERCEL_URL}/vehicle/payment/success`,
          paymentMethod: "CARD"
        })

      router.push(transaction.checkoutUrl)
    } catch (error) {
      console.log(error)
    }

  }

  console.log(bookingPriceSummary)
  useEffect(() => {
    fetchBookingPriceSummary()
  }, [])

  return (
    <>
      <div className="w-full space-y-7 border border-grey-200 rounded-3xl md:max-w-[400px] px-6 py-8">
        <h6 className="text-base md:text-xl 3xl:text-h6">Cost Breakdown</h6>


        {
          bookingPriceSummary ?
            <section className="space-y-7">

              {
                (bookingPriceSummary?.breakdown?.extremeAreaFee ?? 0) > 0 && (
                  <Prices
                    title="Outskirt Fee"
                    price={`${bookingPriceSummary.currency} ${formatNumberWithCommas(bookingPriceSummary.breakdown!.extremeAreaFee)}`}
                  />
                )
              }
              {
                (bookingPriceSummary?.breakdown?.outskirtFee ?? 0) > 0 && (
                  <Prices
                    title="Outskirt Fee"
                    price={`${bookingPriceSummary.currency} ${formatNumberWithCommas(bookingPriceSummary.breakdown!.outskirtFee)}`}
                  />
                )
              }

              <Prices
                title="Extra hours"
                price="Billed as you go"
                priceColor="text-grey-400"
              />
              <HorizontalDivider variant="light" />
              <Prices
                title="Total Cost"
                price={`${bookingPriceSummary?.currency} ${formatNumberWithCommas(bookingPriceSummary?.totalPrice || '')}`}
              />
            </section> :
            <div className="flex items-center justify-center h-full w-full">
              <Spinner />
            </div>
        }
        {/* <Prices
          title="Total Cost"
          price={`${currencyCode} ${priceData?.totalPrice ? formatNumberWithCommas(priceData.totalPrice) : formatNumberWithCommas(totalCostWithoutServiceFee)}`}
        />
        <Prices
          title="Extra hours"
          price="Billed as you go"
          priceColor="text-grey-400"
        />
        <Prices
          title={`Service Charge (${standardServiceFeeInPercentage * 100}%)`}
          price={`${currencyCode} ${formatNumberWithCommas(serviceFee)}`}
        />

        <Prices
          title={`Discount (-${priceData?.breakdown?.discountPercentage ||
            hostDiscounts.find(
              (d) => parseInt(numberOfDays) <= d.durationInDays
            )?.percentage ||
            0
            }%)`}
          price={`-${currencyCode} ${formatNumberWithCommas(priceData?.breakdown?.discountAmount) ||
            formatNumberWithCommas(
              calculateDiscount(
                totalCostWithoutServiceFee,
                hostDiscounts,
                parseInt(numberOfDays)
              )
            )
            }`}
        /> */}

        {/* <HorizontalDivider variant="light" /> */}

        {/* <Prices
          title="Total"
          price={`${currencyCode} ${formatNumberWithCommas(priceData.totalPrice)}`}
          isTotalCost
        /> */}

        {/* <HorizontalDivider variant="light" /> */}

        {/* <button
          onClick={handleOpenCancellationModal}
          className="text-primary-500 text-sm md:text-base 3xl:text-xl hover:underline cursor-pointer bg-transparent border-none p-0"
        >
          Learn more about our free cancellation
        </button> */}

        {/* <Button
          variant="outlined"
          rounded="full"
          fullWidth
          onClick={saveBookingHandler}
          loading={saveBooking.isPending}
          disabled={saveBooking.isPending}
        >
          Save Booking
        </Button> */}
        <Button
          color="primary"
          rounded="full"
          fullWidth
          onClick={handlePayment}
        // loading={proceedToPayment.isPending}
        // disabled={proceedToPayment.isPending}
        >
          Book Now
        </Button>

        {/* <Button
          color="primary"
          rounded="full"
          fullWidth
          onClick={() => { }}
        // loading={proceedToPayment.isPending}
        // disabled={proceedToPayment.isPending}
        >
          Book Now
        </Button> */}

        {/* <Button
          color="primary"
          rounded="full"
          fullWidth
          onClick={proceedToPaymentHandler}
          loading={proceedToPayment.isPending}
          disabled={proceedToPayment.isPending}
        >
          Book Now
        </Button> */}
      </div>

      {/* Cancellation Policy Modal */}
      {/* <BlurredDialog
        open={openCancellationModal}
        onOpenChange={handleOpenCancellationModal}
        trigger={<button className="hidden" />}
        title={
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-red-500"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <p className="text-xl font-semibold text-gray-900">
              Cancellation Policy
            </p>
          </div>
        }
        content={<CancellationPolicyModal />}
      /> */}
    </>
  );
};

const CancellationPolicyModal = () => {
  return (
    <div className="space-y-6 py-4">
      {/* 72+ Hours Before Trip */}
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900 text-base">
          72+ Hours Before Trip?
        </h3>
        <p className="text-gray-600 text-sm">
          Get a full refund — no penalties.
        </p>
      </div>

      {/* 48-72 Hours Before Trip */}
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900 text-base">
          48-72 Hours Before Trip?
        </h3>
        <p className="text-gray-600 text-sm">
          You&apos;ll receive a 50% refund or booking credit. Refunds are
          processed within
        </p>
      </div>

      {/* Less Than 48 hours */}
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900 text-base">
          Less Than 48 hours?
        </h3>
        <p className="text-gray-600 text-sm">
          Cancellations are non-refundable.
        </p>
      </div>

      {/* December Bookings */}
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900 text-base">
          December Bookings
        </h3>
        <p className="text-gray-600 text-sm">
          All December bookings are non-cancellable and non-refundable. Please
        </p>
      </div>

      {/* Vehicle Issues */}
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900 text-base">
          Vehicle Issues
        </h3>
        <p className="text-gray-600 text-sm">
          If the vehicle is faulty, report it within 1 hour of pickup for a
          refund.
        </p>
      </div>

      {/* How To Cancel */}
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900 text-base">How To Cancel</h3>
        <p className="text-gray-600 text-sm">
          Log in to your account, go to Bookings, select the trip, and follow
          the steps to
        </p>
      </div>

      {/* Action Button */}
      <div className="pt-4">
        <Button
          color="primary"
          rounded="full"
          fullWidth
          className="bg-blue-600 hover:bg-blue-700"
        >
          Okay, Got it 👍
        </Button>
      </div>
    </div>
  );
};

export default CostBreakdown;

const Prices = ({
  title,
  price,
  priceColor,
  isTotalCost,
}: {
  title: string;
  price: string;
  priceColor?: string;
  isTotalCost?: boolean;
}) => {
  return (
    <div className="flex items-center justify-between text-grey-800 text-sm 3xl:text-base !font-medium">
      <p className="">{title}</p>
      <p
        className={cn(
          priceColor,
          isTotalCost && "text-base 3xl:text-xl !font-semibold"
        )}
      >
        {price}
      </p>
    </div>
  );
};
