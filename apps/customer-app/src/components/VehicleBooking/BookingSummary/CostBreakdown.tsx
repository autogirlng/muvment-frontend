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

type Props = { vehicle: VehicleInformation | null; type: "guest" | "user" };

const CostBreakdown = ({ vehicle, type }: Props) => {
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

  const currencyCode = vehicle?.vehicleCurrency;
  const dailyRate = vehicle?.pricing?.dailyRate?.value ?? 0;
  const hostDiscounts = vehicle?.pricing?.discounts ?? [];
  const endDate = new Date(itineraryInformation?.endDate);
  const startDate = new Date(itineraryInformation?.startDate);

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

  return (
    <div className="space-y-7 border border-grey-200 rounded-3xl md:max-w-[400px] px-6 py-8">
      <h6 className="text-base md:text-xl 3xl:text-h6">Cost Breakdown</h6>
      <Prices
        title="Total Cost"
        price={`${currencyCode} ${formatNumberWithCommas(totalCostWithoutServiceFee)}`}
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
          hostDiscounts.find((d) => parseInt(numberOfDays) <= d.durationInDays)
            ?.percentage || 0
        }%)`}
        price={`-${currencyCode} ${formatNumberWithCommas(
          calculateDiscount(
            totalCostWithoutServiceFee,
            hostDiscounts,
            parseInt(numberOfDays)
          )
        )}`}
      />

      <HorizontalDivider variant="light" />

      <Prices title="Total" price={`${currencyCode} ${subTotal}`} isTotalCost />

      <HorizontalDivider variant="light" />
      <p className="text-primary-500 ext-sm md:text-base 3xl:text-xl">
        Learn more about our free cancellation
      </p>
      <Button
        variant="outlined"
        rounded="full"
        fullWidth
        onClick={() => {
          const {
            secondaryCountryCode,
            secondaryCountry,
            userCountry,
            userCountryCode,
            ...personalInformationValues
          } = personalInformation;

          const {
            startDate,
            endDate,
            startTime,
            endTime,
            ...itineraryInformationValues
          } = itineraryInformation;

          saveBooking.mutate({
            ...personalInformationValues,
            ...itineraryInformationValues,
            startDate: itineraryInformation.startTime,
            endDate: itineraryInformation.endTime,
            amount: parseInt(subTotal),
            currencyCode: currencyCode,
            bookingType,
            duration: parseInt(numberOfDays),
          });
        }}
        loading={saveBooking.isPending}
        disabled={saveBooking.isPending}
      >
        Save Booking
      </Button>
      <Button
        color="primary"
        rounded="full"
        fullWidth
        onClick={() => {
          const {
            secondaryCountryCode,
            secondaryCountry,
            userCountry,
            userCountryCode,
            ...personalInformationValues
          } = personalInformation;

          const {
            startDate,
            endDate,
            startTime,
            endTime,
            ...itineraryInformationValues
          } = itineraryInformation;

          proceedToPayment.mutate({
            ...personalInformationValues,
            ...itineraryInformationValues,
            startDate: itineraryInformation.startTime,
            endDate: itineraryInformation.endTime,
            amount: parseInt(subTotal),
            currencyCode: currencyCode,
          });
        }}
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
