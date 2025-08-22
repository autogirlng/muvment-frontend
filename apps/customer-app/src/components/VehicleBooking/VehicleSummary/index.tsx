import cn from "classnames";
import Link from "next/link";
import { formatNumberWithCommas } from "@/utils/functions";
import {
  MappedInformation,
  VehicleInformation,
  VehiclePerksProp,
  BookingSummaryPricing,
  TripDetails,
  Trips
} from "@/utils/types";
import React, { ReactNode, useState, useEffect } from "react";
import Button from "@repo/ui/button";
import VehicleDetails from "./VehicleDetails";
import { useRouter } from "next/navigation";
import { TripPerDaySelect } from "./TripPerDaySelect";
import { useHttp } from "@/hooks/useHttp";
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
  // const { user } = useAppSelector((state) => state.user);
  const { user } = useAppSelector((state) => state.user);
  // const [openBookRideModal, setBookRideModal] = useState<boolean>(false);
  const { setTrips, trips, deleteTrip, onChangeTrip, addTrip, bookingPriceBreakdown, isTripFormsComplete } = useItineraryForm(vehicle)

  useEffect(() => {
    sessionStorage.removeItem("trips")
    setTrips([{ id: "trip-0", tripDetails: {} }])
  }, [])
  const [openBookRideModal, setBookRideModal] = useState<boolean>(false);
  const handleOpenBookRideModal = () => setBookRideModal(true);

  console.log(bookingPriceBreakdown)
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

              {trips.map((key, index) => {
                return <TripPerDaySelect key={key.id}
                  day={`${index + 1}`}
                  id={key.id}
                  vehicle={vehicle}
                  deleteMethod={deleteTrip}
                  disabled={false}
                  onChangeTrip={onChangeTrip} />
              })}

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
                    <span>NGN {bookingPriceBreakdown.totalPrice - bookingPriceBreakdown.breakdown.discountAmount || 0}</span>
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
                      <span>Discount -{bookingPriceBreakdown.breakdown.discountPercentage}%</span>
                      <span>-NGN {bookingPriceBreakdown.breakdown.discountAmount}</span>
                    </div>
                  }
                </div>
                <div className="w-full text-sm flex justify-between mt-4">
                  <span>Total</span>
                  <span className="font-bold">NGN {bookingPriceBreakdown.totalPrice}</span>
                </div>
              </div>
            }

            <Button
              color="primary"
              fullWidth
              disabled={
                !isTripFormsComplete
              }
              onClick={() => router.push(`/vehicle/booking/${vehicle?.id}`)}
            >
              Book Now
            </Button>
          </div>

          <div className="divide-y divide-grey-200 text-grey-800">
          </div>
        </div>
      </div>

      {/* only show if user is not signed in */}
      {/* {(
        <BlurredDialog
          open={openBookRideModal}
          onOpenChange={handleOpenBookRideModal}
          trigger={<button className="hidden" />}
          title={<p>Bookdd Ride</p>}
          content={
            <BookRideModal
              id={vehicle?.id || ""}
              bookingType={'values.bookingType'}
              startDate={null}
              startTime={null}
              endDate={null}
              endTime={null}
              pickupLocation={null}
            />
          }
          width="max-w-[556px]"
        />
      )} */}
      {/* {!user && (
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
      )} */}

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
        href={`/vehicle/booking/guest/${id}${bookingType ||
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


{/*
  import cn from "classnames";
import Link from "next/link";
import { formatNumberWithCommas, useFetchUrlParams } from "@/utils/functions";
import {
  CalendarValue,
  MappedInformation,
  VehicleInformation,
  VehiclePerksProp,
} from "@/utils/types";
import { ReactNode, useState, useMemo, useEffect, useRef } from "react";
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
import {
  addDays,
  differenceInDays,
  differenceInMinutes,
  addMinutes,
} from "date-fns";
import Icons from "@repo/ui/icons";
import { combineDateTime } from "@/utils/combineDateTime";

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

interface PlacePrediction {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

interface GoogleMapsLocationInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

// Google Maps Location Input Component
const GoogleMapsLocationInput: React.FC<GoogleMapsLocationInputProps> = ({
  value,
  onChange,
  placeholder = "Enter location",
}) => {
  const [predictions, setPredictions] = useState<PlacePrediction[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiLoaded, setApiLoaded] = useState(false);
  const autocompleteServiceRef =
    useRef<google.maps.places.AutocompleteService | null>(null);
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(
    null
  );
  const debounceRef = useRef<NodeJS.Timeout>();

  // Initialize Google Maps services
  useEffect(() => {
    const initServices = () => {
      if (window.google?.maps?.places) {
        try {
          autocompleteServiceRef.current =
            new window.google.maps.places.AutocompleteService();
          // Create a dummy div for PlacesService
          const dummyDiv = document.createElement("div");
          placesServiceRef.current =
            new window.google.maps.places.PlacesService(dummyDiv);
          setApiLoaded(true);
        } catch (error) {
          console.error("Error initializing Google Maps services:", error);
          setApiLoaded(false);
        }
      }
    };

    // Check if Google Maps is already loaded
    if (window.google?.maps?.places) {
      initServices();
    } else {
      // Load Google Maps script if not already loaded
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.onload = () => {
        if (window.google?.maps?.places) {
          initServices();
        } else {
          console.error("Google Maps API failed to load");
          setApiLoaded(false);
        }
      };
      script.onerror = () => {
        console.error("Error loading Google Maps script");
        setApiLoaded(false);
      };
      document.head.appendChild(script);
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  // Handle input changes and fetch predictions
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    onChange(inputValue);

    if (!apiLoaded) {
      console.error("Google Maps API not loaded");
      return;
    }

    // Clear previous debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (inputValue.length > 0) {
      setIsLoading(true);
      // Debounce the API call
      debounceRef.current = setTimeout(() => {
        fetchPredictions(inputValue);
      }, 300);
    } else {
      setPredictions([]);
      setShowDropdown(false);
    }
  };

  const fetchPredictions = (input: string) => {
    if (!autocompleteServiceRef.current) {
      console.error("Autocomplete service not initialized");
      setIsLoading(false);
      return;
    }

    const request = {
      input,
      componentRestrictions: { country: "ng" },
      types: ["establishment", "geocode"],
    };

    autocompleteServiceRef.current.getPlacePredictions(
      request,
      (results, status) => {
        setIsLoading(false);
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          results
        ) {
          setPredictions(results);
          setShowDropdown(true);
        } else {
          setPredictions([]);
          setShowDropdown(false);
        }
      }
    );
  };

  const handlePlaceSelect = (prediction: PlacePrediction) => {
    if (!placesServiceRef.current) {
      console.error("Places service not initialized");
      return;
    }

    const request = {
      placeId: prediction.place_id,
      fields: ["name", "formatted_address"],
    };

    placesServiceRef.current.getDetails(request, (place, status) => {
      if (
        status === window.google.maps.places.PlacesServiceStatus.OK &&
        place
      ) {
        const selectedAddress =
          place.name || place.formatted_address || prediction.description;
        onChange(selectedAddress);
        setShowDropdown(false);
        setPredictions([]);
      }
    });
  };

  const handleBlur = () => {
    // Delay hiding dropdown to allow for selection
    setTimeout(() => {
      setShowDropdown(false);
    }, 200);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        name="pickupLocation"
        value={value}
        onChange={handleInputChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className="w-full rounded-[18px] p-4 text-left text-sm h-[56px] outline-none bg-white text-grey-900 border border-grey-300 hover:border-primary-500 focus:border-primary-500 focus:shadow-[0_0_0_4px_#1E93FF1A] placeholder:text-grey-400"
        autoComplete="off"
      />

      {showDropdown && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {isLoading ? (
            <div className="px-4 py-3 text-gray-500 text-center">
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-4 w-4 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Searching...
              </div>
            </div>
          ) : predictions.length > 0 ? (
            predictions.map((prediction) => (
              <div
                key={prediction.place_id}
                className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                onClick={() => handlePlaceSelect(prediction)}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      {prediction.structured_formatting.main_text}
                    </div>
                    <div className="text-sm text-gray-500">
                      {prediction.structured_formatting.secondary_text}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-gray-500 text-center">
              No locations found
            </div>
          )}
        </div>
      )}
    </div>
  );
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
    bookingType: bookingType || "SINGLE_DAY",
    startDate: startDate ? new Date(startDate) : null,
    startTime: startTime ? new Date(startTime) : null,
    endDate: endDate ? new Date(endDate) : null,
    endTime: endTime ? new Date(endTime) : null,
    pickupLocation: "",
  });

  // Check if vehicle is luxury
  const isLuxuryVehicle = vehicle?.vehicleType === "Luxury";

  const { minEndDate, maxEndDate, endDateMinimum } = useMemo(() => {
    if (!values.startDate) {
      return { minEndDate: null, maxEndDate: null, endDateMinimum: null };
    }

    if (isLuxuryVehicle) {
      // For luxury vehicles, end date must be same as start date
      return {
        minEndDate: values.startDate,
        maxEndDate: values.startDate,
        endDateMinimum: values.startDate,
      };
    }

    // Original logic for non-luxury vehicles
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

    const minEndDate = values.startDate;
    const maxEndDate = addDays(values.startDate, maxDays - 1);
    const endDateMinimum = values.startDate;

    return { minEndDate, maxEndDate, endDateMinimum };
  }, [
    values.startDate,
    vehicle?.tripSettings?.maxTripDuration,
    isLuxuryVehicle,
  ]);

  // Separate memo for luxury vehicle time validation
  const { maxEndDateTime } = useMemo(() => {
    if (!isLuxuryVehicle || !values.startDate || !values.startTime) {
      return { maxEndDateTime: null };
    }

    // For luxury vehicles, max 6 hours from start time
    const maxEndDateTime = addMinutes(values.startTime, 6 * 60);
    return { maxEndDateTime };
  }, [isLuxuryVehicle, values.startTime]);

  const validateDateRange = (
    startDate: Date | null,
    endDate: Date | null,
    startTime: Date | null,
    endTime: Date | null
  ) => {
    if (!startDate || !endDate) return true;

    if (isLuxuryVehicle) {
      // For luxury vehicles, check if end time is within 6 hours of start time
      // Also ensure it's the same day
      const isSameDay = startDate.toDateString() === endDate.toDateString();
      if (!isSameDay) return false;

      if (!startTime || !endTime) return true;

      // Calculate total minutes between start and end time
      const startDateTime = new Date(startDate);
      startDateTime.setHours(
        startTime.getHours(),
        startTime.getMinutes(),
        0,
        0
      );

      const endDateTime = new Date(endDate);
      endDateTime.setHours(endTime.getHours(), endTime.getMinutes(), 0, 0);

      const totalMinutes = differenceInMinutes(endDateTime, startDateTime);
      return totalMinutes > 0 && totalMinutes <= 6 * 60; // Max 6 hours
    }

    // Original validation logic for non-luxury vehicles
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
        if (isLuxuryVehicle) {
          // For luxury vehicles, automatically set end date to same day
          newValues.endDate = value;

          // Reset end time if it's no longer valid
          if (prev.startTime && prev.endTime) {
            const startDateTime = new Date(value);
            startDateTime.setHours(
              prev.startTime.getHours(),
              prev.startTime.getMinutes(),
              0,
              0
            );

            const maxEndDateTime = addMinutes(startDateTime, 6 * 60);
            const currentEndDateTime = new Date(value);
            currentEndDateTime.setHours(
              prev.endTime.getHours(),
              prev.endTime.getMinutes(),
              0,
              0
            );

            if (currentEndDateTime > maxEndDateTime) {
              newValues.endTime = maxEndDateTime;
            }
          }
        } else {
          // For non-luxury vehicles, adjust end date if needed
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
      }

      // Handle start time changes for luxury vehicles
      if (name === "startTime" && value instanceof Date && isLuxuryVehicle) {
        if (prev.startDate && prev.endTime) {
          const startDateTime = new Date(prev.startDate);
          startDateTime.setHours(value.getHours(), value.getMinutes(), 0, 0);

          const endDateTime = new Date(prev.startDate);
          endDateTime.setHours(
            prev.endTime.getHours(),
            prev.endTime.getMinutes(),
            0,
            0
          );

          // If end time is more than 6 hours after new start time, adjust it
          if (differenceInMinutes(endDateTime, startDateTime) > 6 * 60) {
            newValues.endTime = addMinutes(startDateTime, 6 * 60);
          }
        }
      }

      // Handle end time changes for luxury vehicles
      if (name === "endTime" && value instanceof Date && isLuxuryVehicle) {
        if (prev.startDate && prev.startTime) {
          const startDateTime = new Date(prev.startDate);
          startDateTime.setHours(
            prev.startTime.getHours(),
            prev.startTime.getMinutes(),
            0,
            0
          );

          const endDateTime = new Date(prev.startDate);
          endDateTime.setHours(value.getHours(), value.getMinutes(), 0, 0);

          // Ensure end time is not more than 6 hours after start time
          const maxEndDateTime = addMinutes(startDateTime, 6 * 60);
          if (endDateTime > maxEndDateTime) {
            newValues.endTime = maxEndDateTime;
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

  const isDateRangeValid = validateDateRange(
    values.startDate,
    values.endDate,
    values.startTime,
    values.endTime
  );

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
      <div className="w-full md:min-w-[350px] md:w-1/2 md:border md:border-grey-200 md:rounded-[42px]">
        <div className="space-y-11 md:py-8 md:px-6 divide-y divide-grey-200 text-grey-800 !font-medium text-base 3xl:text-xl">
          <div className="space-y-11">
            <div className="space-y-6">
              <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 xs:gap-4">
                <PricingDescription
                  text={`NGN ${formatNumberWithCommas(
                    vehicle?.pricing?.dailyRate?.value || 0
                  )}${isLuxuryVehicle ? "/6hrs" : "/day"}`}
                  className="text-sm sm:text-base"
                />
                <div className="py-2 px-3 bg-grey-75 rounded-[60px] flex items-center gap-2 text-xs sm:text-sm 3xl:text-base !font-medium w-full xs:w-auto justify-between xs:justify-normal">
                  <p className="text-grey-400 whitespace-nowrap">Total</p>
                  <p className="text-grey-700 whitespace-nowrap">
                    {isPriceLoading ? (
                      <span className="inline-flex items-center gap-1">
                        Calculating...
                      </span>
                    ) : priceData ? (
                      `NGN ${formatNumberWithCommas(priceData.totalPrice)}`
                    ) : (
                      `NGN ${formatNumberWithCommas(
                        (vehicle?.pricing?.dailyRate?.value || 0) * 1
                      )}`
                    )}
                  </p>
                </div>
              </div>

              {!isLuxuryVehicle && (
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
              )}

              {isLuxuryVehicle && (
                <div className="bg-primary-50 border border-primary-500 rounded-lg p-3">
                  <p className="text-sm text-primary-700 font-medium">
                    🌟 Electric Vehicle - Maximum 6 hours booking
                  </p>
                </div>
              )}
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
                minDate={values.startDate || new Date()}
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
                !isDateRangeValid
                  ? isLuxuryVehicle
                    ? "Trip duration cannot exceed 6 hours"
                    : "Invalid date range selected"
                  : undefined
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
                disabled={isLuxuryVehicle} // Disable date picker for luxury vehicles since it's same day
              />
              <TimeInput
                name="endTime"
                value={values.endTime}
                onChange={(date: Date) => handleValueChange("endTime", date)}
                timeType="end"
              />
            </InputSection>

            <InputSection title="Pick up and Drop-off location">
              <GoogleMapsLocationInput
                value={values.pickupLocation}
                onChange={(value: string) =>
                  handleValueChange("pickupLocation", value)
                }
                placeholder="Enter location"
              />
            </InputSection>

            <Button
              color="primary"
              fullWidth
              disabled={
                (!isLuxuryVehicle && !values.bookingType) ||
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
                  bookingType: isLuxuryVehicle
                    ? "SINGLE_DAY"
                    : values.bookingType,
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
                <PricingTitle
                  text={isLuxuryVehicle ? "6 Hours" : "Daily (12 hrs)"}
                />
                <PricingDescription
                  text={`NGN ${formatNumberWithCommas(
                    vehicle?.pricing?.dailyRate?.value || 0
                  )}${isLuxuryVehicle ? "/6hrs" : "/day"}`}
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
                text={
                  isLuxuryVehicle
                    ? "Min: 1 hour | Max: 6 hours"
                    : `Min: 1 day | Max: ${vehicle?.tripSettings?.maxTripDuration}`
                }
              />
            </div>
            {vehicle?.pricing?.discounts &&
              vehicle?.pricing?.discounts?.length > 0 &&
              !isLuxuryVehicle && (
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

      {!user && (
        <BlurredDialog
          open={openBookRideModal}
          onOpenChange={handleOpenBookRideModal}
          trigger={<button className="hidden" />}
          title={<p>Book Ride</p>}
          content={
            <BookRideModal
              id={vehicle?.id || ""}
              bookingType={isLuxuryVehicle ? "SINGLE_DAY" : values.bookingType}
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
  const { startDateTime, endDateTime } = combineDateTime(
    startDate || "",
    startTime || "",
    endDate || "",
    endTime || ""
  );

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
                startDate && `startDate=${startDateTime}`,
                endDate && `endDate=${endDateTime}`,
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

  */}