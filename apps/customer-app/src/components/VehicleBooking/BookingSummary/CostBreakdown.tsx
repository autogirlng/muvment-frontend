import { HorizontalDivider } from "@repo/ui/divider";
import Button from "@repo/ui/button";
import cn from "classnames";
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
import { VehicleInformation } from "@/utils/types";
import { standardServiceFeeInPercentage } from "@/utils/constants";
import useHandleBooking from "../hooks/useHandleBooking";
import { useSearchParams } from "next/navigation";

type Props = { vehicle: VehicleInformation | null; type: "guest" | "user" };

const CostBreakdown = ({ vehicle, type }: Props) => {
  const searchParams = useSearchParams();

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
  const numberOfDays = calculateNumberOfDays(endDate, startDate);

  const totalCostWithoutServiceFee = calculateTotalCostWithoutServiceFee(
    endDate,
    startDate,
    dailyRate
  );
  const serviceFee = calculateServiceFee(
    totalCostWithoutServiceFee,
    standardServiceFeeInPercentage
  );
  const subTotal = calculateSubTotal(
    dailyRate,
    hostDiscounts,
    endDate,
    startDate
  );

  const { saveBooking, proceedToPayment } = useHandleBooking({
    vehicleId: vehicle?.id ?? "",
    type,
  });

  const saveBookingHandler = () => {
    const {
      secondaryCountryCode,
      secondaryCountry,
      userCountry,
      userCountryCode,
      ...personalInformationValues
    } = personalInformation;

    const {
      // startDate,
      // endDate,
      startTime,
      endTime,
      ...itineraryInformationValues
    } = itineraryInformation;

    console.log(itineraryInformation);

    saveBooking.mutate({
      ...personalInformationValues,
      ...itineraryInformationValues,
      // startDate: itineraryInformation.startDate,
      // endDate: itineraryInformation.endDate,
      amount: parseInt(subTotal),
      currencyCode: currencyCode,
      bookingType,
      duration: parseInt(numberOfDays),
      redirectUrl: `${process.env.NEXT_PUBLIC_VERCEL_URL}/vehicle/payment/draft`,
    });
  };
  const proceedToPaymentHandler = () => {
    const {
      secondaryCountryCode,
      secondaryCountry,
      userCountry,
      userCountryCode,
      ...personalInformationValues
    } = personalInformation;

    const {
      // startDate,
      // endDate,
      startTime,
      endTime,
      ...itineraryInformationValues
    } = itineraryInformation;

    const amount = priceData?.totalPrice
      ? parseFloat(priceData?.totalPrice)
      : parseInt(subTotal);

    proceedToPayment.mutate({
      ...personalInformationValues,
      ...itineraryInformationValues,
      // startDate: itineraryInformation.startDate,
      // endDate: itineraryInformation.endDate,
      amount: amount,
      currencyCode: currencyCode,
      bookingType,
      duration: parseInt(numberOfDays),
      redirectUrl: `${process.env.NEXT_PUBLIC_VERCEL_URL}/vehicle/payment/success`,
    });
  };

  return (
    <div className="space-y-7 border border-grey-200 rounded-3xl md:max-w-[400px] px-6 py-8">
      <h6 className="text-base md:text-xl 3xl:text-h6">Cost Breakdown</h6>
      <Prices
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
        title={`Discount (-${
          priceData?.breakdown?.discountPercentage ||
          hostDiscounts.find((d) => parseInt(numberOfDays) <= d.durationInDays)
            ?.percentage ||
          0
        }%)`}
        price={`-${currencyCode} ${
          formatNumberWithCommas(priceData?.breakdown?.discountAmount) ||
          formatNumberWithCommas(
            calculateDiscount(
              totalCostWithoutServiceFee,
              hostDiscounts,
              parseInt(numberOfDays)
            )
          )
        }`}
      />

      <HorizontalDivider variant="light" />

      <Prices
        title="Total"
        price={`${currencyCode} ${formatNumberWithCommas(priceData.totalPrice)}`}
        isTotalCost
      />

      <HorizontalDivider variant="light" />
      <p className="text-primary-500 ext-sm md:text-base 3xl:text-xl">
        Learn more about our free cancellation
      </p>
      <Button
        variant="outlined"
        rounded="full"
        fullWidth
        onClick={saveBookingHandler}
        loading={saveBooking.isPending}
        disabled={saveBooking.isPending}
      >
        Save Booking
      </Button>
      <Button
        color="primary"
        rounded="full"
        fullWidth
        onClick={proceedToPaymentHandler}
        loading={proceedToPayment.isPending}
        disabled={proceedToPayment.isPending}
      >
        Book Now
      </Button>
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
