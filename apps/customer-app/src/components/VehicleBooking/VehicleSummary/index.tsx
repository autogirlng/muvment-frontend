import cn from "classnames";
import Link from "next/link";
import { formatNumberWithCommas } from "@/utils/functions";
import {
  MappedInformation,
  VehicleInformation,
  VehiclePerksProp
} from "@/utils/types";
import React, { useState, useEffect } from "react";
import Button from "@repo/ui/button";
import VehicleDetails from "./VehicleDetails";
import { useRouter } from "next/navigation";
import { TripPerDaySelect } from "./TripPerDaySelect";
import { toTitleCase } from "@/utils/functions";
import { useItineraryForm } from "@/hooks/useItineraryForm";
import { BlurredDialog } from "@repo/ui/dialog";
import { useAppSelector } from "@/lib/hooks";


type Props = {
  vehicle: VehicleInformation | null;
  perks: VehiclePerksProp[];
  vehicleDetails: MappedInformation[];
  vehicleImages: string[];
};

// type InitialValuesProps = {
//   bookingType: "SINGLE_DAY" | "MULTI_DAY" | string;
//   startDate: Date | null;
//   startTime: Date | null;
//   endDate: Date | null;
//   endTime: Date | null;
//   pickupLocation: string;
// };
// For the nested 'breakdown' object


export default function VehicleSummary({
  vehicle,
  perks,
  vehicleDetails,
  vehicleImages,
}: Props) {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);
  const { setTrips, trips, deleteTrip, onChangeTrip, addTrip, bookingPriceBreakdown, isTripFormsComplete } = useItineraryForm(vehicle)

  useEffect(() => {
    sessionStorage.removeItem("trips")
    setTrips([{ id: "trip-0", tripDetails: {} }])
  }, [])
  const [openBookRideModal, setBookRideModal] = useState<boolean>(false);
  const handleOpenBookRideModal = () => setBookRideModal(!openBookRideModal);

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

            <div className="space-y-6 ">
              <h1 className="font-bold text-[#1d2739]">Trip Rules & Pricing</h1>

              <div className="py-[5px]">
                <div className="pr-6">
                  <PricingTitle text="Advance notice" />
                  <PricingDescription
                    text={vehicle?.tripSettings.advanceNotice ?? ""}
                  />
                </div>
              </div>
              <div className=" flex divide-x divide-grey-200">
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
              <div className="py-[5px]">
                <PricingTitle text="Trip Duration" />
                <PricingDescription
                  text={`Min: 1 day | Max: ${vehicle?.tripSettings?.maxTripDuration}`}
                />
              </div>

              {vehicle?.pricing?.discounts &&
                vehicle?.pricing?.discounts?.length > 0 && (
                  <div className="py-[5px] space-y-2">
                    <PricingTitle text="Discounts" />
                    {vehicle.pricing.discounts.map((discount, index) => (
                      <div
                        key={index}
                        className="flex items-center text-sm justify-between gap-2 bg-grey-75 border border-grey-300 px-3 py-2 rounded-lg  "
                      >
                        <p>{discount?.durationInDays} days</p>
                        <p className="text-success-500">
                          {discount.percentage || 0}% off
                        </p>
                      </div>
                    ))}
                  </div>
                )}


            </div>

            <div>
              <h1 className="font-bold text-[17px]">Add Booking Details</h1>
              <p className="text-sm my-4">Trip per day</p>

              {
                trips.map((key, index) => {
                  return <TripPerDaySelect key={key.id}
                    day={`${index + 1}`}
                    id={key.id}
                    vehicle={vehicle}
                    deleteMethod={deleteTrip}
                    disabled={false}
                    onChangeTrip={onChangeTrip} />
                })
              }
              <div className="text-center">
                <button onClick={() => addTrip(`trip-${trips.length}`)} className="text-[#0673ff] mt-3 border-0 bg-white">+ Add Trip</button>
              </div>
            </div>
            {
              bookingPriceBreakdown && <div className="rounded-2xl p-5 m-0 border border-grey-200">
                <h2 className="font-bold">Cost Breakdown</h2>
                <div className="border-b border-grey-200 pb-4">

                  <div className="w-full text-sm flex justify-between mt-3">
                    <span>Total Cost</span>
                    <span>{bookingPriceBreakdown.currency || 'NGN'} {bookingPriceBreakdown.totalPrice - bookingPriceBreakdown.breakdown.discountAmount || 0}</span>
                  </div>
                  <div className="w-full  text-sm flex justify-between mt-4">
                    <span>Extra Hours</span>
                    <span>Billed as you go</span>
                  </div>
                  <div className="w-full  text-sm flex justify-between mt-4">
                    <span>Outskirt Price</span>
                    <span> {bookingPriceBreakdown.currency || 'NGN'} {bookingPriceBreakdown.breakdown.outskirtFee || 0}</span>
                  </div>
                  {<div className="w-full  text-sm flex justify-between mt-4">
                    <span>Area of Use</span>
                    <span style={{ textTransform: "capitalize" }}>
                      {trips.map((trip) => {
                        const areaOfUse = toTitleCase(trip.tripDetails?.areaOfUse || '')
                        const state = toTitleCase(areaOfUse?.split("_")[0] || '')
                        const area1 = toTitleCase(toTitleCase(areaOfUse?.split("_")[1] || ''))
                        let area2 = toTitleCase(areaOfUse?.split("_")[2] || '')

                        return <>{state} {area1} {area2}<br /> </>
                      })}
                    </span>
                  </div>}

                  {
                    bookingPriceBreakdown.breakdown.discountAmount > 0 &&
                    <div className="w-full text-sm flex justify-between mt-4">
                      <span>Discount - {bookingPriceBreakdown.breakdown.discountPercentage}%</span>
                      <span>-{bookingPriceBreakdown.currency || 'NGN'} {bookingPriceBreakdown.breakdown.discountAmount}</span>
                    </div>
                  }
                </div>
                <div className="w-full text-sm flex justify-between mt-4">
                  <span>Total</span>
                  <span className="font-bold">{bookingPriceBreakdown.currency || 'NGN'} {bookingPriceBreakdown.totalPrice}</span>
                </div>
              </div>
            }


            {user ? <Button
              color="primary"
              fullWidth
              disabled={
                !isTripFormsComplete
              }
              onClick={() => router.push(`/vehicle/booking/${vehicle?.id}`)}
            >
              Book Ride
            </Button> : <BlurredDialog
              open={openBookRideModal}
              onOpenChange={handleOpenBookRideModal}
              trigger={
                <Button
                  color="primary"
                  fullWidth
                  disabled={
                    !isTripFormsComplete
                  }
                >
                  Book Ride
                </Button>
              }
              title={<p className="text-lg font-semibold">Book Ride</p>}
              content={
                <BookRideModal vehicleId={vehicle?.id || ""} />
              }
              width="max-w-[556px]"
            />}

          </div>

        </div>
      </div>

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


const BookRideModal = ({ vehicleId }: { vehicleId: string }) => {
  return (
    <div className="space-y-4">
      <Link
        href={`/vehicle/booking/${vehicleId}`}
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

