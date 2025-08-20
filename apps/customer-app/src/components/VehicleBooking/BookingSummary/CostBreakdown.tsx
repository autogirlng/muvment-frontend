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
import { BookingInformation, TripDetails, VehicleInformation } from "@/utils/types";
import { standardServiceFeeInPercentage } from "@/utils/constants";
import useHandleBooking from "../hooks/useHandleBooking";
import { useSearchParams } from "next/navigation";
import { BlurredDialog } from "@repo/ui/dialog";
import { useHttp } from "@/hooks/useHttp";
import { BookingSummaryPricing } from "@/utils/types";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { transactionData } from "@/utils/data";

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
    setUserTrips(trips)
    let isOutskirt = false;
    for (let trip of trips) {
      if (trip.bookingType) {
        bookingTypes.push(trip.bookingType)
      }
      if (trip.outskirtLocations && trip.outskirtLocations.length >= 1) {
        isOutskirt = true
      }
    }



    const bookingPrice = await http.post<BookingSummaryPricing>("/api/bookings/calculate-price",
      {
        vehicleId: vehicle?.id,
        bookingTypes,
        isExtension: false,
        isOutskirt
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
      ...personalInformationValues
    } = personalInformation;

    const bookings: any[] = []


    userTrips && userTrips?.map((trip) => {
      const date = new Date(trip.tripStartDate || '')
      const startDate = format(date, "yyyy-MM-dd")
      const time = new Date(trip.tripStartTime || '')
      const startTime = time.toISOString().split("T")[1]

      const booking = {
        vehicleId: vehicle?.id,
        currencyCode: bookingPriceSummary?.currency || "NGN",
        countryCode: userCountryCode || "+234",
        country: userCountry || "NG",
        startDate: `${startDate}T${startTime}`,
        endDate: `${date.toISOString().split("T")[0]}T23:59:59.000Z`,
        duration: 1,
        bookingType: trip.bookingType,
        amount: bookingPriceSummary?.breakdown.bookingTypeBreakdown[`${trip.bookingType}`],
        secondaryPhoneNumber: personalInformationValues.secondaryPhoneNumber,
        isForSelf: personalInformationValues.isForSelf,
        specialInstructions: "",
        guestName: personalInformationValues.guestName,
        guestEmail: personalInformationValues.guestEmail,
        guestPhoneNumber: personalInformationValues.guestPhoneNumber,
        pickupLocation: trip.pickupLocation || '',
        dropoffLocation: trip.dropoffLocation || '',
        outskirtsLocation: trip.outskirtLocations || [],
        areaOfUse: trip.areaOfUse || '',
        extraDetails: "",
        purposeOfRide: "",
        tripPurpose: "",
        emergencyContact: "",
        paymentMethod: "CARD",
        travelCompanions: [

        ],
        redirectUrl: `${process.env.NEXT_PUBLIC_VERCEL_URL}/vehicle/payment/success`
      }
      bookings.push(booking)
    })

    try {
      const transaction = await http.post("/api/bookings/create-multiple",
        {
          bookings: bookings,
          currencyCode: bookingPriceSummary?.currency || "NGN",
          totalAmount: Number(bookingPriceSummary?.totalPrice),
          redirectUrl: `${process.env.NEXT_PUBLIC_VERCEL_URL}/vehicle/payment/success`,
          paymentMethod: "CARD"
        })
      // @ts-ignore
      router.push(transaction.checkoutUrl)
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    fetchBookingPriceSummary()
  }, [])

  return (
    <>
      <div className="space-y-7 border border-grey-200 rounded-3xl md:max-w-[400px] px-6 py-8">
        <h6 className="text-base md:text-xl 3xl:text-h6">Cost Breakdown</h6>
        {
          bookingPriceSummary && <section className="space-y-7">

            <Prices
              title="Outskirt Fee"
              price={`${bookingPriceSummary?.currency} ${formatNumberWithCommas(bookingPriceSummary?.breakdown.outskirtFee || '')}`}
            />
            <Prices
              title="Extra hours"
              price="Billed as you go"
              priceColor="text-grey-400"
            />
            <Prices
              title="Total Cost"
              price={`${bookingPriceSummary?.currency} ${formatNumberWithCommas(bookingPriceSummary?.totalPrice || '')}`}
            />
          </section>}
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

        <HorizontalDivider variant="light" />

        {/* <Prices
          title="Total"
          price={`${currencyCode} ${formatNumberWithCommas(priceData.totalPrice)}`}
          isTotalCost
        /> */}

        <HorizontalDivider variant="light" />

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
