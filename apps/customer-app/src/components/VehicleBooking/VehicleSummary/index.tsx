import cn from "classnames";
import Link from "next/link";
import { formatNumberWithCommas, evaluateEndAndStartDate } from "@/utils/functions";
import {
  MappedInformation,
  VehicleInformation,
  VehiclePerksProp,
  VehicleChecks,
  VehicleCheckResponse
} from "@/utils/types";
import React, { useState, useEffect } from "react";
import Button from "@repo/ui/button";
import VehicleDetails from "./VehicleDetails";
import { useRouter } from "next/navigation";
import { TripPerDaySelect } from "./TripPerDaySelect";
import { useItineraryForm } from "@/hooks/useItineraryForm";
import { BlurredDialog } from "@repo/ui/dialog";
import { useAppSelector } from "@/lib/hooks";
import { BookingCostBreakdown } from "./BookingCostBreakdown";
import { useHttp } from "@/hooks/useHttp";

import { toast } from "react-toastify";



type Props = {
  vehicle: VehicleInformation | null;
  perks: VehiclePerksProp[];
  vehicleDetails: MappedInformation[];
  vehicleImages: string[];
};


export default function VehicleSummary({
  vehicle,
  perks,
  vehicleDetails,
  vehicleImages,
}: Props) {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);
  const {
    setTrips,
    trips,
    deleteTrip,
    onChangeTrip,
    addTrip,
    toggleOpen,
    openTripIds,
    bookingPriceBreakdown,
    isTripFormsComplete
  } = useItineraryForm(vehicle)

  useEffect(() => {
    sessionStorage.removeItem("trips")
    setTrips([{ id: "trip-0", tripDetails: {} }])
  }, [])
  const [openBookRideModal, setBookRideModal] = useState<boolean>(false);
  const handleOpenBookRideModal = () => setBookRideModal(!openBookRideModal);

  const [loadingBooking, setLoadingBookings] = useState<boolean>(false)
  const http = useHttp();


  const handleNext = async () => {
    setLoadingBookings(true)


    const vehicleChecks: VehicleChecks[] = [];

    for (let trip of trips) {
      const tripDetails = trip.tripDetails
      if (tripDetails) {
        const { startDateTime, endDateTime } = evaluateEndAndStartDate(tripDetails)
        vehicleChecks.push({ vehicleId: vehicle?.id || "", startDate: startDateTime, endDate: endDateTime })
      }
    }

    try {
      const vehicleCheckResponse = await http.post<VehicleCheckResponse>("/api/bookings/check-multiple-availability", {
        vehicleChecks
      })
      if (!vehicleCheckResponse.tripAvailable) {
        let trips: number[] = [];
        for (let i = 0; i < vehicleCheckResponse.vehicleAvailability.length; i++) {
          if (!vehicleCheckResponse.vehicleAvailability[i].isAvailable) {
            trips.push(i + 1)
          }
        }
        toast.error(`Trip ${trips.join(",")} are not available for specified time. Please modify`)

      } else {
        router.push(`/vehicle/booking/${vehicle?.id}`)
      }


    } catch (error) {
      console.log(error)
    }
    finally {
      setLoadingBookings(false)
    }

  }


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
                    )}/trip`}
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
                    onChangeTrip={onChangeTrip}
                    isCollapsed={!openTripIds.has(key.id)}
                    toggleOpen={() => toggleOpen(key.id)}
                  />
                })
              }
              <div className="text-center">
                <button onClick={() => addTrip(`trip-${trips.length}`)} className="text-[#0673ff] mt-3 border-0 bg-white">+ Add Trip</button>
              </div>
            </div>
            {
              bookingPriceBreakdown && <BookingCostBreakdown bookingPriceBreakdown={bookingPriceBreakdown} vehicle={vehicle} trips={trips} />
            }


            {user ? <Button
              color="primary"
              fullWidth
              loading={loadingBooking}
              disabled={
                !isTripFormsComplete
              }
              onClick={handleNext}
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
                  loading={loadingBooking}
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

