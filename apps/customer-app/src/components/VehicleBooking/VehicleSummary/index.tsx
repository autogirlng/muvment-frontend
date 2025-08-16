"use client";

import cn from "classnames";
import Link from "next/link";
import { formatNumberWithCommas, useFetchUrlParams } from "@/utils/functions";
import {
  CalendarValue,
  MappedInformation,
  VehicleInformation,
  VehiclePerksProp,
} from "@/utils/types";
import { ReactNode, useState, useMemo, useEffect, useRef, useCallback } from "react";
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

interface Day {
  id: number;
  dayNumber: number;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  dropOffLocation: string;
  bookingType?: string;
  areaOfUse?: string;
}

type InitialValuesProps = {
  bookingType: "SINGLE_DAY" | "MULTI_DAY" | string;
  startDate: Date | null;
  endDate: Date | null;
  pickupLocation: string;
  areaOfUse?: string;
  days?: Day[];
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

  useEffect(() => {
    const initServices = () => {
      if (window.google?.maps?.places) {
        try {
          autocompleteServiceRef.current =
            new window.google.maps.places.AutocompleteService();
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

    if (window.google?.maps?.places) {
      initServices();
    } else {
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    onChange(inputValue);

    if (!apiLoaded) {
      console.error("Google Maps API not loaded");
      return;
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (inputValue.length > 0) {
      setIsLoading(true);
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
        className="w-full rounded-[18px] p-3 text-left text-sm h-[44px] outline-none bg-white text-grey-900 border border-grey-300 hover:border-primary-500 focus:border-primary-500 focus:shadow-[0_0_0_4px_#1E93FF1A] placeholder:text-grey-400"
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
  const { bookingType, startDate, endDate } = useFetchUrlParams();
  
  // Initialize with a default day if none exist
  const [values, setValues] = useState<InitialValuesProps>({
    bookingType: bookingType || "SINGLE_DAY",
    startDate: startDate ? new Date(startDate) : null,
    endDate: endDate ? new Date(endDate) : null,
    pickupLocation: "",
    days: [{
      id: 1,
      dayNumber: 1,
      startDate: "",
      endDate: "",
      pickupLocation: "",
      dropOffLocation: "",
      bookingType: "",
      areaOfUse: "",
    }],
  });
  
  const [showCostBreakdown, setShowCostBreakdown] = useState(false);
  const [priceCalculationRequested, setPriceCalculationRequested] = useState(false);
  const [customPriceData, setCustomPriceData] = useState<any>(null);
  const [customPriceLoading, setCustomPriceLoading] = useState(false);
  const [customPriceError, setCustomPriceError] = useState<string | null>(null);

  const isLuxuryVehicle = vehicle?.vehicleType === "Luxury";

  // Store the current API request data for the price calculation
  const [currentApiRequest, setCurrentApiRequest] = useState<any>(null);

  // Helper function to format API request data
  const formatPriceRequestData = (day: Day) => {
    // Ensure bookingType is valid
    const allowedBookingTypes = ["AN_HOUR", "THREE_HOURS", "SIX_HOURS", "TWELVE_HOURS", "AIRPORT_PICKUP"];

    if (!day.bookingType || !allowedBookingTypes.includes(day.bookingType)) {
      throw new Error(`Invalid bookingType: ${day.bookingType}`);
    }

    return {
      vehicleId: vehicle?.id,
      bookingTypes: [day.bookingType],
    };
  };

  // Custom price calculation function that properly formats the API request
  const calculatePriceWithCorrectFormat = async (day: Day) => {
    try {
      const apiData = formatPriceRequestData(day);
      console.log("Making API request with data:", apiData);
      console.log("API URL:", process.env.NEXT_PUBLIC_API_URL); // Debug log

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/bookings/calculate-price`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();
      return data; // Return the API response data instead of just setting state
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error calculating price:", error);
        setCustomPriceError(error.message);
      } else {
        console.error("Unknown error calculating price:", error);
        setCustomPriceError("An unknown error occurred.");
      }
      return null;
    } finally {
      setCustomPriceLoading(false);
    }
  };

  const { minEndDate, maxEndDate, endDateMinimum } = useMemo(() => {
    if (!values.startDate) {
      return { minEndDate: null, maxEndDate: null, endDateMinimum: null };
    }

    if (isLuxuryVehicle) {
      return {
        minEndDate: values.startDate,
        maxEndDate: values.startDate,
        endDateMinimum: values.startDate,
      };
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

    const minEndDate = values.startDate;
    const maxEndDate = addDays(values.startDate, maxDays - 1);
    const endDateMinimum = values.startDate;

    return { minEndDate, maxEndDate, endDateMinimum };
  }, [
    values.startDate,
    vehicle?.tripSettings?.maxTripDuration,
    isLuxuryVehicle,
  ]);

  const validateDateRange = (
    startDate: Date | null,
    endDate: Date | null
  ) => {
    if (!startDate || !endDate) return true;

    if (isLuxuryVehicle) {
      const isSameDay = startDate.toDateString() === endDate.toDateString();
      return isSameDay;
    }

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
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { checkVehicleAvailability, vehicleAvailableError } = useHandleBooking({
    vehicleId: vehicle?.id || "",
    isSuccessFunction: handleOpenBookRideModal,
  });

  const {
    priceData,
    calculatePrice,
    isLoading: isPriceLoading,
    error: priceError,
    isError: isPriceError,
  } = useCalculatePrice(vehicle?.id || "");

  console.log("useCalculatePrice hook initialized with vehicleId:", vehicle?.id);

  // Check if dates are valid and complete
  const isValidDateTimeString = (dateStr: string) => {
    if (!dateStr || dateStr.trim() === "") return false;
    const date = new Date(dateStr);
    return !isNaN(date.getTime());
  };

  // Custom price calculation effect - only when price calculation is explicitly requested
  useEffect(() => {
    if (!priceCalculationRequested) return;
    
    const performPriceCalculation = async () => {
      if (values.days && values.days.length > 0) {
        const firstDay = values.days[0];

        if (firstDay.startDate && firstDay.endDate) {
          if (isValidDateTimeString(firstDay.startDate) && isValidDateTimeString(firstDay.endDate)) {
            const startDate = new Date(firstDay.startDate);
            const endDate = new Date(firstDay.endDate);
            
            setCustomPriceLoading(true);
            setCustomPriceError(null);
            
            try {
              const data = await calculatePriceWithCorrectFormat(firstDay);
              if (data) {
                setCustomPriceData(data);
                setShowCostBreakdown(true);
                setCustomPriceError(null);
                console.log("Price calculation completed:", data);
              } else {
                setCustomPriceError("Failed to calculate price");
                setShowCostBreakdown(false);
              }
            } catch (error) {
              const errorMessage = error instanceof Error ? error.message : 'Failed to calculate price';
              setCustomPriceError(errorMessage);
              setShowCostBreakdown(false);
              console.error("Price calculation failed:", errorMessage);
            } finally {
              setCustomPriceLoading(false);
            }
          } else {
            console.log("Invalid date format provided:", {
              startDate: firstDay.startDate,
              endDate: firstDay.endDate,
            });
            setCustomPriceError("Invalid date format provided");
          }
        } else {
          console.log("Missing required dates:", {
            startDate: firstDay.startDate,
            endDate: firstDay.endDate,
          });
          setCustomPriceError("Start Date and End Date are required");
        }
      }
      setPriceCalculationRequested(false); // Reset the flag
    };
    
    performPriceCalculation();
  }, [priceCalculationRequested, values.days, vehicle?.id]);

  const handleCalculateCost = () => {
    console.log("handleCalculateCost called with values:", values);

    if (!values.days || values.days.length === 0) {
      console.error("No days added for calculation");
      alert("Please add at least one trip day with booking details.");
      return;
    }

    const firstDay = values.days[0];

    // Debugging logs for startDate and endDate
    console.log("Debug - First day startDate:", firstDay.startDate);
    console.log("Debug - First day endDate:", firstDay.endDate);

    // Validate all required fields
    const missingFields = [];
    if (!firstDay.bookingType) missingFields.push("Booking Type");
    if (!firstDay.startDate || !isValidDateTimeString(firstDay.startDate)) missingFields.push("Start Date");
    if (!firstDay.endDate || !isValidDateTimeString(firstDay.endDate)) missingFields.push("End Date");
    if (!firstDay.pickupLocation || firstDay.pickupLocation.trim() === "") missingFields.push("Pickup Location");
    if (!firstDay.dropOffLocation || firstDay.dropOffLocation.trim() === "") missingFields.push("Drop-off Location");
    if (!firstDay.areaOfUse) missingFields.push("Area of Use");
    
    if (missingFields.length > 0) {
      console.error("Missing required fields:", missingFields);
      alert(`Please fill in all required fields: ${missingFields.join(", ")}`);
      return;
    }

    // Reset previous custom price data
    setCustomPriceData(null);
    setCustomPriceError(null);
    setShowCostBreakdown(false);

    // Proceed with cost calculation
    setPriceCalculationRequested(true);
  };

  useEffect(() => {
    if (priceData) {
      console.log("Received price data:", priceData);
    }
  }, [priceData]);

  useEffect(() => {
    if (isPriceError) {
      console.error("Price calculation error:", priceError);
    }
  }, [isPriceError, priceError]);

  const handleAddDay = () => {
    const newDay: Day = {
      id: Date.now(),
      dayNumber: (values.days?.length || 0) + 1,
      bookingType: "SINGLE_DAY",
      startDate: "",
      endDate: "",
      pickupLocation: "",
      dropOffLocation: "",
      areaOfUse: "",
    };

    setValues((prev) => ({
      ...prev,
      days: [...(prev.days || []), newDay],
    }));
  };

  const handleUpdateDay = useCallback((id: number, field: keyof Day, value: string) => {
    console.log(`Updating day ${id}, field ${field}, value:`, value);
    setValues((prev) => {
      const updatedDays = prev.days?.map((day) =>
        day.id === id ? { ...day, [field]: value } : day
      ) || [];
      
      const updatedDay = updatedDays.find(d => d.id === id);
      console.log(`Updated day ${id}:`, updatedDay);
      
      return {
        ...prev,
        days: updatedDays,
      };
    });
  }, []);

  const handleDeleteDay = (id: number) => {
    setValues((prev) => {
      const updatedDays = prev.days?.filter((day) => day.id !== id) || [];
      return {
        ...prev,
        days: updatedDays.map((day, index) => ({
          ...day,
          dayNumber: index + 1,
        })),
      };
    });
  };

  const renderCostBreakdown = () => {
    // Use custom price data instead of the hook's price data
    const currentPriceData = customPriceData || priceData;
    const currentLoading = customPriceLoading || isPriceLoading;
    const currentError = customPriceError || (isPriceError ? priceError?.message : null);

    console.log("Rendering cost breakdown with custom price data:", currentPriceData);

    if (!currentPriceData || !currentPriceData.totalPrice) {
      return (
        <div className="space-y-2">
          <p className="text-gray-500">No pricing data available.</p>
          {currentLoading && <p className="text-gray-500">Calculating prices...</p>}
          {currentError && (
            <p className="text-error-500">
              Error: {currentError || "Failed to calculate price"}
            </p>
          )}
        </div>
      );
    }

    const { breakdown } = currentPriceData;
    
    // Mapping for booking type labels
    const bookingTypeLabels: { [key: string]: string } = {
      'AN_HOUR': '1 Hour',
      'THREE_HOURS': '3 Hours',
      'SIX_HOURS': '6 Hours',
      'TWELVE_HOURS': '12 Hours',
      'AIRPORT_PICKUP': 'Airport Pickup'
    };

    return (
      <div className="space-y-4">
        {/* Total */}
        <div className="flex justify-between text-base text-grey-700">
          <span>Total:</span>
          <span>NGN {formatNumberWithCommas(currentPriceData.breakdown.originalPrice)}</span>
        </div>
 {/* Booking Details */}
        <div className="mt-4 p-3 bg-grey-50 rounded-lg space-y-2 text-sm text-grey-700">
          <div className="flex justify-between">
            <span>Service Type:</span>
            <span>Extra Hours</span>
          </div>
          <div className="flex justify-between">
            <span>Area of Use:</span>
            <span>
              {(() => {
                const areaOfUse = values.days?.[0]?.areaOfUse;
                switch (areaOfUse) {
                  case 'ISLAND_CENTRAL':
                    return 'Island Central';
                  case 'MAINLAND_CENTRAL':
                    return 'Mainland Central';
                  case 'MAINLAND':
                    return 'Mainland';
                  case 'ISLAND':
                    return 'Island';
                  default:
                    return '-';
                }
              })()}
            </span>
          </div>
        </div>
        {/* Extra Fees */}
        {currentPriceData.breakdown.extensionFee > 0 && (
          <div className="flex justify-between text-base text-grey-700">
            <span>Extra Hours Fee:</span>
            <span>+ NGN {formatNumberWithCommas(currentPriceData.breakdown.extensionFee)}</span>
          </div>
        )}
        
        {/* Area of Use Fee */}
        {currentPriceData.breakdown.isOutskirt && (
          <div className="flex justify-between text-base text-grey-700">
            <span>Area of Use Fee:</span>
            <span>+ NGN {formatNumberWithCommas(currentPriceData.breakdown.outskirtFee)}</span>
          </div>
        )}

        {/* Discount if applicable */}
        {currentPriceData.breakdown.discountAmount > 0 && (
          <div className="flex justify-between text-base text-success-600">
            <span>Discount ({currentPriceData.breakdown.discountPercentage}% off):</span>
            <span>- NGN {formatNumberWithCommas(currentPriceData.breakdown.discountAmount)}</span>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-grey-200 my-2"></div>

        {/* Final Total */}
        <div className="flex justify-between text-lg font-bold text-grey-900">
          <span>Final Total:</span>
          <span>NGN {formatNumberWithCommas(currentPriceData.totalPrice)}</span>
        </div>
      </div>
    );
  };

  const handleBooking = () => {
    if (!values.days || values.days.length === 0) {
      alert("No booking details available.");
      return;
    }

    const firstDay = values.days[0];
    
    // Construct URL parameters
    const params = new URLSearchParams({
      pickupLocation: firstDay.pickupLocation,
      startDate: firstDay.startDate,
      endDate: firstDay.endDate,
      areaOfUse: firstDay.areaOfUse || '',
      dropoffLocation: firstDay.dropOffLocation,
      vehicleId: vehicle?.id || ''
    });

    // Navigate to itinerary page with the parameters
    router.push(`/vehicle/booking/itinerary?${params.toString()}`);
  };

  // Define missing variables
  const isBookingComplete = true; // Replace with actual logic if needed
  const bookingStartDate = new Date().toISOString(); // Convert Date to string
  const bookingEndDate = new Date().toISOString(); // Convert Date to string
  const bookingPickupLocation = "Default Location"; // Replace with actual logic if needed

  // Remove or define setTestDates if necessary
  const setTestDates = () => {
    console.log("Test dates set");
  };

  return (
    <VehicleDetails
      vehicle={vehicle}
      vehicleDetails={vehicleDetails}
      perks={perks}
      vehicleImages={vehicleImages}
    >
      <div className="w-full md:min-w-[350px] md:w-1/2 md:border md:border-grey-200 md:rounded-[42px]">
        <div className="space-y-11 md:py-8 md:px-6 divide-y divide-grey-200 text-grey-800 !font-medium text-base 3xl:text-xl">
          <div className="divide-y divide-grey-200 text-grey-800">
            <h3 className="text-lg font-bold mb-4">Trip Rules & Pricing</h3>
            <div className="py-[22px]">
              <div className="pr-6">
                <PricingTitle text="Advance notice" />
                <PricingDescription text={vehicle?.tripSettings.advanceNotice ?? ""} />
              </div>
            </div>
            <div className="py-[22px] flex divide-x divide-grey-200">
              <div className="pr-6">
                <PricingTitle text={isLuxuryVehicle ? "6 Hours" : "Daily (12 hrs)"} />
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
                      className="flex items-center justify-between gap-2 bg-grey-75 border border-grey-300 p-2 rounded-lg text-sm md:text-xl"
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

          <div className="pt-6 space-y-6">
            <h3 className="text-xl font-bold text-grey-900">Add Booking Details</h3>
            <TripDetailsManager 
              days={values.days || []}
              onAddDay={handleAddDay}
              onUpdateDay={handleUpdateDay}
              onDeleteDay={handleDeleteDay}
            />
          </div>

          <div className="pt-6 space-y-4">
            <h3 className="text-xl font-bold text-grey-900">Cost Breakdown</h3> 
            {!showCostBreakdown ? (
              <Button
                className="w-full text-lg h-14 bg-[#1C86EE] text-white hover:bg-[#1C86EE] focus:outline-none focus:ring-2 focus:ring-[#1E90FF] focus:ring-offset-2"
                variant="filled"
                onClick={handleCalculateCost}
                disabled={customPriceLoading || isPriceLoading}
              >
                {customPriceLoading || isPriceLoading ? "Calculating..." : "Calculate"}
              </Button>
            ) : (
              <div className="space-y-2">
                {renderCostBreakdown()}
                <Button
                  className="w-full text-sm h-10 bg-gray-100 text-[gray] hover:text-[darkgray] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 mt-2 p-5"
                  variant="filled"
                  onClick={() => {
                    setShowCostBreakdown(false);
                    setPriceCalculationRequested(false);
                    setCustomPriceData(null);
                    setCustomPriceError(null);
                  }}
                >
                  Recalculate
                </Button>
              </div>
            )}
            {(customPriceError || (isPriceError && priceError)) && (
              <p className="text-error-500 text-sm">
                {customPriceError || priceError?.message || "Failed to calculate price"}
              </p>
            )}
          </div>

          <div className="pt-6">
            <Button
              className={`w-full text-lg h-14 ${!showCostBreakdown || customPriceLoading || isPriceLoading || !isBookingComplete
                ? 'bg-[grey] text-white cursor-not-allowed'
                : 'bg-[#1C86EE] text-white hover:bg-[#1C86EE]'} focus:outline-none focus:ring-2 focus:ring-[#1E90FF] focus:ring-offset-2`}
              variant="filled"
              onClick={handleBooking}
              disabled={!showCostBreakdown || customPriceLoading || isPriceLoading || !isBookingComplete}
            >
              Book Now
            </Button>
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
              startDate={bookingStartDate}
              endDate={bookingEndDate}
              pickupLocation={bookingPickupLocation}
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
  endDate,
  pickupLocation,
}: {
  id: string;
  bookingType: string;
  startDate: string | null;
  endDate: string | null;
  pickupLocation: string | null;
}) => {
  const { startDateTime, endDateTime } = combineDateTime(
    startDate || "",
    "",
    endDate || "",
    ""
  );

  return (
    <div className="space-y-4">
      <Link
        href={`/vehicle/booking/guest/${id}${
          bookingType ||
          startDate ||
          endDate ||
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

const TripDetailsManager = ({
  days,
  onAddDay,
  onUpdateDay,
  onDeleteDay,
}: {
  days: Day[];
  onAddDay: () => void;
  onUpdateDay: (id: number, field: keyof Day, value: string) => void;
  onDeleteDay: (id: number) => void;
}) => {
  return (
    <div className="space-y-4">
      {days.map((day) => (
        <DayCard
          key={day.id}
          day={day}
          onUpdate={onUpdateDay}
          onDelete={onDeleteDay}
        />
      ))}
      <button
        onClick={onAddDay}
        className="w-full py-3 px-4 text-primary-500 font-semibold rounded-xl hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-200 ease-in-out flex items-center justify-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        Add Trip
      </button>
    </div>
  );
};

const DayCard = ({
  day,
  onUpdate,
  onDelete,
}: {
  day: Day;
  onUpdate: (id: number, field: keyof Day, value: string) => void;
  onDelete: (id: number) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDateChange = (field: 'startDate' | 'endDate', value: string) => {
    console.log(`Date input changed for day ${day.id}, field ${field}:`, value);
    onUpdate(day.id, field, value);
  };

  const handleLocationChange = (field: 'pickupLocation' | 'dropOffLocation', value: string) => {
    console.log(`Location changed for day ${day.id}, field ${field}:`, value);
    onUpdate(day.id, field, value);
  };

  const handleSelectChange = (field: 'bookingType' | 'areaOfUse', value: string) => {
    console.log(`Select changed for day ${day.id}, field ${field}:`, value);
    onUpdate(day.id, field, value);
  };

  // Helper function to format date for display
  const formatDateForDisplay = (dateStr: string) => {
    if (!dateStr || dateStr.trim() === "") return "";
    try {
      return new Date(dateStr).toLocaleDateString();
    } catch {
      return "";
    }
  };

  return (
    <div className="bg-white border border-grey-200 rounded-xl shadow-sm overflow-hidden">
      <div
        className="flex justify-between items-center py-2 px-4 cursor-pointer bg-grey-50 hover:bg-grey-100 transition duration-150 ease-in-out"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <span className="text-base text-grey-900">Day{day.dayNumber}</span>
          <span className="text-sm text-grey-600">
            {day.startDate && day.startDate.trim() !== "" && day.endDate && day.endDate.trim() !== "" 
              ? `(${formatDateForDisplay(day.startDate)} - ${formatDateForDisplay(day.endDate)})`
              : "(Choose date)"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {isExpanded ? Icons.ic_chevron_up : Icons.ic_chevron_down}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(day.id);
            }}
            className="p-2 rounded-full hover:bg-error-100 text-error-500 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-error-500 focus:ring-offset-2"
            aria-label="Delete Day"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 space-y-4 border-t border-grey-100">
          {/* Booking Type */}
          <InputSection title="Booking Type *">
            <select
              value={day.bookingType}
              onChange={(e) => handleSelectChange('bookingType', e.target.value)}
              className="w-full rounded-[18px] p-3 text-left text-sm h-[44px] outline-none bg-white text-grey-900 border border-grey-300 hover:border-primary-500 focus:border-primary-500 focus:shadow-[0_0_0_4px_#1E93FF1A]"
              required
            >
              <option value="">Select Booking Type</option>
              <option value="AN_HOUR">1 hour</option>
              <option value="THREE_HOURS">3 hours</option>
              <option value="SIX_HOURS">6 hours</option>
              <option value="TWELVE_HOURS">12 hours</option>
              <option value="AIRPORT_PICKUP">Airport transfers</option>
            </select>
          </InputSection>

          {/* Date Inputs */}
          <div className="space-y-4">
            <InputSection title="Start Date *">
              <input
                type="date"
                className="w-full rounded-[18px] p-3 text-left text-sm h-[44px] outline-none bg-white text-grey-900 border border-grey-300 hover:border-primary-500 focus:border-primary-500 focus:shadow-[0_0_0_4px_#1E93FF1A]"
                value={day.startDate || ""}
                onChange={(e) => handleDateChange('startDate', e.target.value)}
              />
            </InputSection>
            <InputSection title="End Date *">
              <input
                type="date"
                className="w-full rounded-[18px] p-3 text-left text-sm h-[44px] outline-none bg-white text-grey-900 border border-grey-300 hover:border-primary-500 focus:border-primary-500 focus:shadow-[0_0_0_4px_#1E93FF1A]"
                value={day.endDate || ""}
                onChange={(e) => handleDateChange('endDate', e.target.value)}
              />
            </InputSection>
          </div>

          {/* Location Inputs */}
          <div className="space-y-4">
            <InputSection title="Pickup Location *">
              <GoogleMapsLocationInput
                value={day.pickupLocation}
                onChange={(value) => handleLocationChange('pickupLocation', value)}
                placeholder="Enter pickup location"
              />
            </InputSection>
            
            <InputSection title="Drop-off Location *">
              <GoogleMapsLocationInput
                value={day.dropOffLocation}
                onChange={(value) => handleLocationChange('dropOffLocation', value)}
                placeholder="Enter drop-off location"
              />
            </InputSection>
          </div>

          {/* Area of Use */}
          <InputSection title="Area of Use *">
            <select
              value={day.areaOfUse || ""}
              onChange={(e) => handleSelectChange('areaOfUse', e.target.value)}
              className="w-full rounded-[18px] p-3 text-left text-sm h-[44px] outline-none bg-white text-grey-900 border border-grey-300 hover:border-primary-500 focus:border-primary-500 focus:shadow-[0_0_0_4px_#1E93FF1A]"
              required
            >
              <option value="">Select Area of Use</option>
              <option value="MAINLAND_CENTRAL">Mainland Central</option>
              <option value="ISLAND_CENTRAL">Island Central</option>
            </select>
          </InputSection>
        </div>
      )}
    </div>
  );
};