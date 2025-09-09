import { HorizontalDivider } from "@repo/ui/divider";
import Button from "@repo/ui/button";
import cn from "classnames";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import {
  formatNumberWithCommas,
  getExistingBookingInformation,
} from "@/utils/functions";
import {
  TransactionBookingResponse,
  CreateNewBookingAuthenticated,
  CreateNewBookingUnauthenticated,
  TripDetails,
  CostBreakdownProps,
  PaymentGateway
} from "@/utils/types";

import { useHttp } from "@/hooks/useHttp";
import { BookingSummaryPricing } from "@/utils/types";
import { format, addHours } from "date-fns";
import { useRouter } from "next/navigation";
import { Spinner } from "@repo/ui/spinner";
import { BookingCostBreakdown } from "../VehicleSummary/BookingCostBreakdown";
import { useItineraryForm } from "@/hooks/useItineraryForm";
import { evaluateEndAndStartDate } from "@/utils/functions";



const CostBreakdown = ({ vehicle, type }: CostBreakdownProps) => {
  const personalInformation = getExistingBookingInformation(
    {},
    vehicle?.id ?? "",
    "personalInformation"
  );
  const http = useHttp()
  const [bookingPriceSummary, setBookingPriceSummary] = useState<BookingSummaryPricing>()
  const [userTrips, setUserTrips] = useState<TripDetails[]>()
  const router = useRouter()
  const { user } = useAppSelector((state) => state.user);
  const [loadingCreatingBooking, setLoadingCreatingBooking] = useState<boolean>(false);
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



  const fetchBookingPriceSummary = async () => {
    const bookingTypes: string[] = [];
    const trips: TripDetails[] = JSON.parse(sessionStorage.getItem("trips") || "[]");
    const outskirtTripIDs = new Set()
    const extremeLocationsIDs = new Set();

    setUserTrips(trips)
    let isOutskirt = false;
    for (let trip of trips) {
      const areaOfUse = trip.areaOfUse?.split("_");
      if (trip.bookingType) {
        bookingTypes.push(trip.bookingType)
      }
      if ((trip.outskirtLocations && trip.outskirtLocations.length >= 1) || (areaOfUse && areaOfUse[areaOfUse?.length - 1] === "OUTSKIRT")) {
        outskirtTripIDs.add(trip.id);
        isOutskirt = true
      }
      if ((trip.extremeLocations && trip.extremeLocations.length >= 1) || (areaOfUse && areaOfUse[areaOfUse?.length - 2] === "EXTREME")) {
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


  const handlePaymentUnauthenticated = async (gateway: PaymentGateway) => {
    setLoadingCreatingBooking(true);
    const bookings: CreateNewBookingUnauthenticated[] = []
    userTrips && userTrips?.map((trip) => {
      const { startDateTime, endDateTime } = evaluateEndAndStartDate(trip);

      let booking: CreateNewBookingUnauthenticated = {
        vehicleId: vehicle?.id || '',
        startDate: startDateTime,
        endDate: endDateTime,
        bookingType: trip?.bookingType!,
        specialInstructions: specialInstructions || "",
        pickupLocation: trip.pickupLocation || '',
        dropoffLocation: trip.dropoffLocation || '',
        outskirtsLocation: trip.outskirtLocations || [],
        areaOfUse: trip.areaOfUse || '',
        extraDetails: trip.extraDetails || '',
        purposeOfRide: trip.purposeOfRide || "",
        tripPurpose: tripPurpose || "",
        emergencyContact: "",
        travelCompanions: [

        ],
        extremeAreasLocation: trip.extremeLocations || [],

      }
      bookings.push(booking)
    })

    try {

      const transaction = await http.post<TransactionBookingResponse>("/api/bookings/guest-booking-multiple",
        {
          guestName: guestName || "",
          guestEmail: guestEmail || "",
          guestPhoneNumber: guestPhoneNumber || "",
          countryCode: userCountryCode || "+234",
          country: userCountry || "NG",
          bookings: bookings,
          currencyCode: bookingPriceSummary?.currency || "NGN",
          totalAmount: Number(bookingPriceSummary?.totalPrice),
          redirectUrl: `${process.env.NEXT_PUBLIC_VERCEL_URL}/vehicle/payment/success`,
          paymentMethod: "CARD",
          paymentGateway: gateway || PaymentGateway.MONNIFY
        })
      sessionStorage.setItem("bookingGroupID", transaction.bookings[0].bookingGroupId)
      sessionStorage.setItem("vehicleID", vehicle?.id || '')

      router.push(transaction.checkoutUrl)
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingCreatingBooking(false)
    }

  }


  const handlePaymentAuthenticated = async (gateway: PaymentGateway) => {
    setLoadingCreatingBooking(true);

    const bookings: CreateNewBookingAuthenticated[] = []
    userTrips && userTrips?.map((trip) => {
      const { startDateTime, endDateTime } = evaluateEndAndStartDate(trip);

      const tripCost = bookingPriceSummary?.breakdown.bookingTypeBreakdown[`${trip.bookingType}`];
      let booking: CreateNewBookingAuthenticated = {
        vehicleId: vehicle?.id || '',
        currencyCode: bookingPriceSummary?.currency || "NGN",
        countryCode: userCountryCode || "+234",
        country: userCountry || "NG",
        startDate: startDateTime,
        endDate: endDateTime,
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
        extremeAreasLocation: trip.extremeLocations || [],

      }
      bookings.push(booking)
    })


    try {


      const transaction = await http.post<TransactionBookingResponse>("/api/bookings/create-multiple",
        {
          bookings: bookings,
          currencyCode: bookingPriceSummary?.currency || "NGN",
          totalAmount: Number(bookingPriceSummary?.totalPrice),
          redirectUrl: `${process.env.NEXT_PUBLIC_VERCEL_URL}/vehicle/payment/success`,
          paymentMethod: "CARD",
          paymentGateway: gateway || PaymentGateway.MONNIFY
        })
      sessionStorage.setItem("bookingGroupID", transaction.bookings[0].bookingGroupId)
      sessionStorage.setItem("vehicleID", vehicle?.id || '')
      router.push(transaction.checkoutUrl)
    } catch (error) {
      console.log(error)
    }
    finally {
      setLoadingCreatingBooking(false)
    }

  }

  useEffect(() => {
    fetchBookingPriceSummary()
  }, [])

  return (
    <>
      <div className="w-full space-y-7 border border-grey-200 rounded-3xl md:max-w-[400px] px-6 py-8">
        <h6 className="text-base md:text-xl 3xl:text-h6">Cost Breakdown</h6>
        {
          bookingPriceSummary ?

            <BookingCostBreakdown bookingPriceBreakdown={bookingPriceSummary} vehicle={vehicle} trips={userTrips} /> :
            <div className="flex items-center justify-center h-full w-full">
              <Spinner />
            </div>
        }

        {/* <Button
          color="primary"
          rounded="full"
          fullWidth
          onClick={user ? () => handlePaymentAuthenticated(PaymentGateway.PAYSTACK) : () => handlePaymentUnauthenticated(PaymentGateway.PAYSTACK)}
          loading={loadingCreatingBooking}
          disabled={!bookingPriceSummary}
        >
          Book Now(Paystack)
        </Button> */}

        <Button
          color="primary"
          rounded="full"
          fullWidth
          onClick={user ? () => handlePaymentAuthenticated(PaymentGateway.MONNIFY) : () => handlePaymentUnauthenticated(PaymentGateway.MONNIFY)}
          loading={loadingCreatingBooking}
          disabled={!bookingPriceSummary}
        >
          Book Now(Monnify)
        </Button>
      </div>
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
