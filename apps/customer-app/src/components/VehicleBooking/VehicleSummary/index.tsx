import cn from "classnames";
import Link from "next/link";
import { formatNumberWithCommas, useFetchUrlParams } from "@/utils/functions";
import {
  CalendarValue,
  MappedInformation,
  VehicleInformation,
  VehiclePerksProp,
} from "@/utils/types";
import { ReactNode, useState } from "react";
import SelectInput from "@repo/ui/select";
import Button from "@repo/ui/button";
import { BlurredDialog } from "@repo/ui/dialog";
import VehicleDetails from "./VehicleDetails";
import DateInput from "../DateInput";
import TimeInput from "../TimeInput";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import useHandleBooking from "../hooks/useHandleBooking";

type Props = {
  vehicle: VehicleInformation | null;
  perks: VehiclePerksProp[];
  vehicleDetails: MappedInformation[];
  vehicleImages: string[];
};

type InitialValuesProps = {
  bookingType: "SINGLE_DAY" | "MULTI_DAY" | string;
  // pickupLocation: string;
  startDate: Date | null;
  startTime: Date | null;
  endDate: Date | null;
  endTime: Date | null;
};

export default function VehicleSummary({
  vehicle,
  perks,
  vehicleDetails,
  vehicleImages,
}: Props) {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);
  const [openBookRideModal, setBookRideModal] = useState<boolean>(false);
  const { bookingType, startDate, startTime, endDate, endTime } =
    useFetchUrlParams();
  const [values, setValues] = useState<InitialValuesProps>({
    bookingType: bookingType || "",
    startDate: startDate ? new Date(startDate) : null,
    startTime: startTime ? new Date(startTime) : null,
    endDate: endDate ? new Date(endDate) : null,
    endTime: endTime ? new Date(endTime) : null,
  });

  const handleOpenBookRideModal = () => setBookRideModal(!openBookRideModal);
  const handleValueChange = (name: string, value: string | Date | null) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { checkVehicleAvailability, vehicleAvailableError } = useHandleBooking({
    vehicleId: vehicle?.id || "",
    isSuccessFunction: handleOpenBookRideModal,
  });

  return (
    <VehicleDetails
      vehicle={vehicle}
      vehicleDetails={vehicleDetails}
      perks={perks}
      vehicleImages={vehicleImages}
    >
      {/* pricing */}
      <div className="w-full md:min-w-[350px] md:w-1/2 md:border md:border-grey-200 md:rounded-[42px]">
        <div className="space-y-11 md:py-8 md:px-6 divide-y divide-grey-200 text-grey-800 !font-medium text-base 3xl:text-xl">
          <div className="space-y-11">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <PricingDescription
                  text={`NGN ${formatNumberWithCommas(
                    vehicle?.pricing?.dailyRate?.value || 0
                  )}/day`}
                />
                <div className="py-2 px-3 bg-grey-75 rounded-[60px] flex items-center gap-2 text-sm 3xl:text-base !font-medium">
                  <p className="text-grey-400">Total</p>
                  <p className="text-grey-700">{`NGN ${formatNumberWithCommas(
                    (vehicle?.pricing?.dailyRate?.value || 0) * 1
                  )}`}</p>
                </div>
              </div>

              <InputSection title="Booking Type">
                <SelectInput
                  id="bookingType"
                  placeholder="Select"
                  variant="outlined"
                  options={[
                    { option: "Daily Rental", value: "SINGLE_DAY" },
                    { option: "Monthly Rental", value: "MULTI_DAY" },
                  ]}
                  value={values.bookingType}
                  onChange={(value: string) => {
                    handleValueChange("bookingType", value);
                  }}
                />
              </InputSection>
            </div>

            {/* {startDate && startTime && ( */}
            <InputSection
              title="Trip Start"
              textColor="blue"
              error={vehicleAvailableError}
            >
              <DateInput
                name="startDate"
                value={values.startDate}
                onChange={(value: CalendarValue) =>
                  handleValueChange("startDate", value as Date | null)
                }
              />
              <TimeInput
                name="startTime"
                value={values.startTime}
                onChange={(date: Date) => handleValueChange("startTime", date)}
              />
            </InputSection>

            {/* )} */}
            {/* {endDate && endTime && ( */}
            <InputSection title="Trip End" textColor="blue">
              <DateInput
                name="endDate"
                value={values.endDate}
                onChange={(value: CalendarValue) =>
                  handleValueChange("endDate", value as Date | null)
                }
              />
              <TimeInput
                name="endTime"
                value={values.endTime}
                onChange={(date: Date) => handleValueChange("endTime", date)}
              />
            </InputSection>
            {/* )} */}

            <Button
              color="primary"
              fullWidth
              disabled={
                !values.bookingType ||
                !values.startDate ||
                !values.startTime ||
                !values.endDate ||
                !values.endTime||
                checkVehicleAvailability.isPending
              }
              loading={checkVehicleAvailability.isPending}
              onClick={() => {
                console.log("Form values:", values);

                checkVehicleAvailability.mutate({
                  bookingType: values.bookingType,
                  startDate: values.startDate?.toISOString() ?? "",
                  startTime: values.startTime?.toISOString() ?? "",
                  endDate: values.endDate?.toISOString() ?? "",
                  endTime: values.endTime?.toISOString() ?? "",
                });
              }}
            >
              Book Now
            </Button>
          </div>

          <div className="divide-y divide-grey-200 text-grey-800">
            <div className="py-[22px]">
              <div className="pr-6">
                <PricingTitle text="Advance notice" />
                <PricingDescription
                  text={vehicle?.tripSettings.advanceNotice ?? ""}
                />
              </div>
            </div>
            <div className="py-[22px] flex divide-x divide-grey-200">
              <div className="pr-6">
                <PricingTitle text="Daily (12 hrs)" />
                <PricingDescription
                  text={`NGN ${formatNumberWithCommas(
                    vehicle?.pricing?.dailyRate?.value || 0
                  )}/day`}
                />
              </div>
              <div className="pl-6">
                <PricingTitle text="Extra Hours" />
                <PricingDescription
                  text={`NGN ${formatNumberWithCommas(
                    vehicle?.pricing?.extraHoursFee || 0
                  )}/hr`}
                />
              </div>
            </div>
            <div className="py-[22px]">
              <PricingTitle text="Trip Duration" />
              <PricingDescription
                text={`Min: 1 day | Max: ${vehicle?.tripSettings?.maxTripDuration}`}
              />
            </div>
            {vehicle?.pricing?.discounts &&
              vehicle?.pricing?.discounts?.length > 0 && (
                <div className="py-[22px] space-y-2">
                  <PricingTitle text="Discounts" />
                  {vehicle.pricing.discounts.map((discount, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-2 bg-grey-75 border border-grey-300 p-2 rounded-lg text-sm md:text-xl md:text-h6"
                    >
                      <p>{discount?.durationInDays}+ days</p>
                      <p className="text-success-500">
                        {discount.percentage || 0}% off
                      </p>
                    </div>
                  ))}
                </div>
              )}
            {vehicle?.pricing?.airportPickupFee && (
              <div className="py-[22px]">
                <PricingTitle text="Airport Pickups & dropoffs" />
                <PricingDescription
                  text={`NGN ${formatNumberWithCommas(
                    vehicle?.pricing?.airportPickupFee || 0
                  )}/hr`}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* only show if user is not signed in */}
      {!user && (
        <BlurredDialog
          open={openBookRideModal}
          onOpenChange={handleOpenBookRideModal}
          trigger={<button className="hidden" />}
          title={<p>Book Ride</p>}
          content={
            <BookRideModal
              id={vehicle?.id || ""}
              bookingType={values.bookingType}
              startDate={values.startDate?.toISOString() ?? null}
              startTime={values.startTime?.toISOString() ?? null}
              endDate={values.endDate?.toISOString() ?? null}
              endTime={values.endTime?.toISOString() ?? null}
            />
          }
          width="max-w-[556px]"
        />
      )}
    </VehicleDetails>
  );
}

const PricingTitle = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => (
  <p className={cn("text-xs md:text-sm 3xl:text-base", className)}>{text}</p>
);

const PricingDescription = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => (
  <p
    className={cn("text-xs md:text-sm 3xl:text-base !font-semibold", className)}
  >
    {text}
  </p>
);

const InputSection = ({
  title,
  children,
  textColor = "black",
  error,
}: {
  title: string;
  children: ReactNode;
  textColor?: "black" | "blue";
  error?: string;
}) => {
  return (
    <div className="space-y-3">
      <p
        className={cn(
          "text-sm 3xl:text-base",
          textColor === "blue" ? "text-primary-500" : "text-black"
        )}
      >
        {title}
      </p>
      <div className="flex items-center gap-3">{children}</div>
      {error && <p className="text-error-500 ">{error}</p>}
    </div>
  );
};

const BookRideModal = ({
  id,
  bookingType,
  startDate,
  startTime,
  endDate,
  endTime,
}: {
  id: string;
  bookingType: string;
  startDate: string | null;
  startTime: string | null;
  endDate: string | null;
  endTime: string | null;
}) => {
  return (
    <div className="space-y-4">
      <Link
        href={`/vehicle/booking/guest/${id}${
          bookingType || startDate || startTime || endDate || endTime
            ? `?${[
                startDate && `startDate=${startDate}`,
                startTime && `startTime=${startTime}`,
                endDate && `endDate=${endDate}`,
                endTime && `endTime=${endTime}`,
                bookingType && `bookingType=${bookingType}`,
              ]
                .filter(Boolean)
                .join("&")}`
            : ""
        }`}
        className="block"
      >
        <Button className="!bg-grey-90 !text-grey-700" fullWidth>
          Continue as guest
        </Button>
      </Link>
      <Link href="/login" className="block">
        <Button color="primary" fullWidth>
          Sign In
        </Button>
      </Link>
    </div>
  );
};
