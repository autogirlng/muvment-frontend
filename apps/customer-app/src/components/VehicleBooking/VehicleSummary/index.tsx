import cn from "classnames";
import Link from "next/link";
import { formatNumberWithCommas, useFetchUrlParams } from "@/utils/functions";
import {
  CalendarValue,
  MappedInformation,
  VehicleInformation,
  VehiclePerksProp,
} from "@/utils/types";
import { ReactNode, useState, useMemo, useEffect } from "react";
import SelectInput from "@repo/ui/select";
import Button from "@repo/ui/button";
import { BlurredDialog } from "@repo/ui/dialog";
import VehicleDetails from "./VehicleDetails";
import DateInput from "../DateInput";
import TimeInput from "../TimeInput";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import useHandleBooking from "../hooks/useHandleBooking";
import useCalculatePrice from "./hooks/useCalculatePrice";
import { addDays, differenceInDays } from "date-fns";

type Props = {
  vehicle: VehicleInformation | null;
  perks: VehiclePerksProp[];
  vehicleDetails: MappedInformation[];
  vehicleImages: string[];
};

type InitialValuesProps = {
  bookingType: "SINGLE_DAY" | "MULTI_DAY" | string;
  startDate: Date | null;
  startTime: Date | null;
  endDate: Date | null;
  endTime: Date | null;
  pickupLocation: string;
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
    pickupLocation: "",
  });

  const minStartDate = useMemo(() => {
    const today = new Date();
    const advanceNoticeDays = parseInt(
      vehicle?.tripSettings?.advanceNotice?.replace(/\D/g, "") || "0"
    );
    return addDays(today, advanceNoticeDays);
  }, [vehicle?.tripSettings?.advanceNotice]);

  const { minEndDate, maxEndDate, endDateMinimum } = useMemo(() => {
    if (!values.startDate) {
      return { minEndDate: null, maxEndDate: null, endDateMinimum: null };
    }

    const maxTripDurationText =
      vehicle?.tripSettings?.maxTripDuration || "1 day";
    let maxDays = 1;

    if (maxTripDurationText.includes("week")) {
      const weeks = parseInt(maxTripDurationText.replace(/\D/g, "") || "1");
      maxDays = weeks * 7;
    } else if (maxTripDurationText.includes("day")) {
      maxDays = parseInt(maxTripDurationText.replace(/\D/g, "") || "1");
    } else if (maxTripDurationText.includes("month")) {
      const months = parseInt(maxTripDurationText.replace(/\D/g, "") || "1");
      maxDays = months * 30;
    } else {
      maxDays = parseInt(maxTripDurationText.replace(/\D/g, "") || "1");
    }

    const today = new Date();
    const minEndDate = values.startDate;
    const maxEndDate = addDays(values.startDate, maxDays - 1);
    const endDateMinimum = today;

    return { minEndDate, maxEndDate, endDateMinimum };
  }, [values.startDate, vehicle?.tripSettings?.maxTripDuration]);

  const validateDateRange = (startDate: Date | null, endDate: Date | null) => {
    if (!startDate || !endDate) return true;

    const daysDifference = differenceInDays(endDate, startDate);

    const maxTripDurationText =
      vehicle?.tripSettings?.maxTripDuration || "1 day";
    let maxDays = 1;

    if (maxTripDurationText.includes("week")) {
      const weeks = parseInt(maxTripDurationText.replace(/\D/g, "") || "1");
      maxDays = weeks * 7;
    } else if (maxTripDurationText.includes("day")) {
      maxDays = parseInt(maxTripDurationText.replace(/\D/g, "") || "1");
    } else if (maxTripDurationText.includes("month")) {
      const months = parseInt(maxTripDurationText.replace(/\D/g, "") || "1");
      maxDays = months * 30;
    } else {
      maxDays = parseInt(maxTripDurationText.replace(/\D/g, "") || "1");
    }

    return daysDifference >= 0 && daysDifference < maxDays;
  };

  const handleOpenBookRideModal = () => setBookRideModal(!openBookRideModal);

  const handleValueChange = (name: string, value: string | Date | null) => {
    setValues((prev) => {
      const newValues = {
        ...prev,
        [name]: value,
      };

      if (name === "startDate" && value instanceof Date) {
        if (prev.endDate) {
          const daysDifference = differenceInDays(prev.endDate, value);

          const maxTripDurationText =
            vehicle?.tripSettings?.maxTripDuration || "1 day";
          let maxDays = 1;

          if (maxTripDurationText.includes("week")) {
            const weeks = parseInt(
              maxTripDurationText.replace(/\D/g, "") || "1"
            );
            maxDays = weeks * 7;
          } else if (maxTripDurationText.includes("day")) {
            maxDays = parseInt(maxTripDurationText.replace(/\D/g, "") || "1");
          } else if (maxTripDurationText.includes("month")) {
            const months = parseInt(
              maxTripDurationText.replace(/\D/g, "") || "1"
            );
            maxDays = months * 30;
          } else {
            maxDays = parseInt(maxTripDurationText.replace(/\D/g, "") || "1");
          }

          if (daysDifference < 0) {
            newValues.endDate = value;
          } else if (daysDifference >= maxDays) {
            newValues.endDate = addDays(value, maxDays - 1);
          }
        }
      }

      return newValues;
    });
  };

  const { checkVehicleAvailability, vehicleAvailableError } = useHandleBooking({
    vehicleId: vehicle?.id || "",
    isSuccessFunction: handleOpenBookRideModal,
  });

  const {
    priceData,
    autoCalculatePrice,
    isLoading: isPriceLoading,
  } = useCalculatePrice(vehicle?.id || "");

  useEffect(() => {
    if (
      values.startDate &&
      values.startTime &&
      values.endDate &&
      values.endTime
    ) {
      autoCalculatePrice(
        values.startDate,
        values.startTime,
        values.endDate,
        values.endTime
      );
    }
  }, [values.startDate, values.startTime, values.endDate, values.endTime]);

  const isDateRangeValid = validateDateRange(values.startDate, values.endDate);

  useEffect(() => {
    if (
      values.startDate &&
      values.startTime &&
      values.endDate &&
      values.endTime
    ) {
      autoCalculatePrice(
        values.startDate,
        values.startTime,
        values.endDate,
        values.endTime
      );
    }
  }, [values.startDate, values.startTime, values.endDate, values.endTime]);

  useEffect(() => {
    if (priceData) {
      localStorage.setItem("priceData", JSON.stringify(priceData));
    }
  }, [priceData]);

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
                  <p className="text-grey-700">
                    {isPriceLoading
                      ? "Calculating..."
                      : priceData
                        ? `NGN ${formatNumberWithCommas(priceData.totalPrice)}`
                        : `NGN ${formatNumberWithCommas(
                            (vehicle?.pricing?.dailyRate?.value || 0) * 1
                          )}`}
                  </p>
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
                minDate={minStartDate}
              />
              <TimeInput
                name="startTime"
                value={values.startTime}
                onChange={(date: Date) => handleValueChange("startTime", date)}
                timeType="start"
              />
            </InputSection>

            <InputSection
              title="Trip End"
              textColor="blue"
              error={
                !isDateRangeValid ? "Invalid date range selected" : undefined
              }
            >
              <DateInput
                name="endDate"
                value={values.endDate}
                onChange={(value: CalendarValue) =>
                  handleValueChange("endDate", value as Date | null)
                }
                minDate={values.startDate || new Date()}
                maxDate={maxEndDate}
                blockPastDates={true}
              />
              <TimeInput
                name="endTime"
                value={values.endTime}
                onChange={(date: Date) => handleValueChange("endTime", date)}
                timeType="end"
              />
            </InputSection>

            <InputSection title="Pick up and Drop-off location">
              <input
                type="text"
                name="pickupLocation"
                value={values.pickupLocation}
                onChange={(e) =>
                  handleValueChange("pickupLocation", e.target.value)
                }
                placeholder="Enter location"
                className="w-full rounded-[18px] p-4 text-left text-sm h-[56px] outline-none bg-white text-grey-900 border border-grey-300 hover:border-primary-500 focus:border-primary-500 focus:shadow-[0_0_0_4px_#1E93FF1A] placeholder:text-grey-400"
              />
            </InputSection>

            <Button
              color="primary"
              fullWidth
              disabled={
                !values.bookingType ||
                !values.startDate ||
                !values.startTime ||
                !values.endDate ||
                !values.endTime ||
                !values.pickupLocation.trim() ||
                !isDateRangeValid ||
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
                  pickupLocation: values.pickupLocation,
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
              pickupLocation={values.pickupLocation || null}
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
  pickupLocation,
}: {
  id: string;
  bookingType: string;
  startDate: string | null;
  startTime: string | null;
  endDate: string | null;
  endTime: string | null;
  pickupLocation: string | null;
}) => {
  return (
    <div className="space-y-4">
      <Link
        href={`/vehicle/booking/guest/${id}${
          bookingType ||
          startDate ||
          startTime ||
          endDate ||
          endTime ||
          pickupLocation
            ? `?${[
                startDate && `startDate=${startDate}`,
                startTime && `startTime=${startTime}`,
                endDate && `endDate=${endDate}`,
                endTime && `endTime=${endTime}`,
                bookingType && `bookingType=${bookingType}`,
                pickupLocation &&
                  `pickupLocation=${encodeURIComponent(pickupLocation)}`,
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
