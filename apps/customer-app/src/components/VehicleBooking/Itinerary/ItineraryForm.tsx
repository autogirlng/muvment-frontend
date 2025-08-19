import { Formik, Form } from "formik";
import { GroupCheckBox } from "@repo/ui/checkbox";
import { StepperNavigation } from "@repo/ui/stepper";
import { outskirtsLocationOptions } from "@/utils/data";
import { CalendarValue, ItineraryInformationValues, TripDetails } from "@/utils/types";
import InputField from "@repo/ui/inputField";
import TextArea from "@repo/ui/textarea";
import SelectInput from "@repo/ui/select";
import FormRow from "../../FormRow";
import DateInput from "../DateInput";
import TimeInput from "../TimeInput";
import {
  getExistingBookingInformation,
  saveAndUpdateBookingInformation,
} from "@/utils/functions";
import { itineraryInformationSchema } from "@/utils/validationSchema";
import { useSearchParams } from "next/navigation";
import { useMemo, useRef, useEffect, useState } from "react";
import { TripPerDaySelect } from "../VehicleSummary/TripPerDaySelect";
import { useItineraryForm } from "@/hooks/useItineraryForm";
import { useQuery } from "@tanstack/react-query";
import useFetchVehicleById from "../hooks/useFetchVehicleById";

// Your combineDateTime function - preserves local timezone
function combineDateTime(
  startDate: Date,
  startTime: Date,
  endDate: Date,
  endTime: Date
): { startDateTime: string; endDateTime: string } {
  // Helper function to combine date and time while preserving local values
  const combine = (dateObj: Date, timeObj: Date): string => {
    // Get local date parts
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");

    // Get local time parts
    const hours = String(timeObj.getHours()).padStart(2, "0");
    const minutes = String(timeObj.getMinutes()).padStart(2, "0");
    const seconds = String(timeObj.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  return {
    startDateTime: combine(startDate, startTime),
    endDateTime: combine(endDate, endTime),
  };
}

// Helper function to parse URL date parameters
function parseDateFromUrl(dateString: string | null): {
  date: Date | null;
  time: Date | null;
} {
  if (!dateString) {
    return { date: null, time: null };
  }

  try {
    const parsedDate = new Date(dateString);

    // Create separate Date objects for date and time
    const dateOnly = new Date(
      parsedDate.getFullYear(),
      parsedDate.getMonth(),
      parsedDate.getDate()
    );
    const timeOnly = new Date();
    timeOnly.setHours(
      parsedDate.getHours(),
      parsedDate.getMinutes(),
      parsedDate.getSeconds(),
      0
    );

    return { date: dateOnly, time: timeOnly };
  } catch (error) {
    console.error("Error parsing date from URL:", error);
    return { date: null, time: null };
  }
}

// Google Maps Places Autocomplete Input Component
interface GoogleMapsInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  error: string;
  placeholder?: string;
  label?: string;
}

interface PlacePrediction {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

const GoogleMapsInput: React.FC<GoogleMapsInputProps> = ({
  value,
  onChange,
  onBlur,
  error,
  placeholder = "Enter the drop-off location",
  label = "Drop-off location",
}) => {
  const [predictions, setPredictions] = useState<PlacePrediction[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const autocompleteServiceRef =
    useRef<google.maps.places.AutocompleteService | null>(null);
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(
    null
  );
  const debounceRef = useRef<NodeJS.Timeout>();

  // Initialize Google Maps services
  useEffect(() => {
    const initServices = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        autocompleteServiceRef.current =
          new window.google.maps.places.AutocompleteService();
        // Create a dummy div for PlacesService
        const dummyDiv = document.createElement("div");
        placesServiceRef.current = new window.google.maps.places.PlacesService(
          dummyDiv
        );
      }
    };

    // Check if Google Maps is already loaded
    if (window.google) {
      initServices();
    } else {
      // Load Google Maps script if not already loaded
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.onload = initServices;
      document.head.appendChild(script);
    }
  }, []);

  // Handle input changes and fetch predictions
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    onChange(event);

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
    if (!autocompleteServiceRef.current) return;

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
    if (!placesServiceRef.current) return;

    const request = {
      placeId: prediction.place_id,
      fields: ["formatted_address", "name"],
    };

    placesServiceRef.current.getDetails(request, (place, status) => {
      if (
        status === window.google.maps.places.PlacesServiceStatus.OK &&
        place
      ) {
        const selectedAddress =
          place.name || place.formatted_address || prediction.description;

        // Create a synthetic event
        const syntheticEvent = {
          target: {
            name: "dropoffLocation",
            value: selectedAddress,
          },
        } as React.ChangeEvent<HTMLInputElement>;

        onChange(syntheticEvent);
        setShowDropdown(false);
        setPredictions([]);
      }
    });
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    // Delay hiding dropdown to allow for selection
    setTimeout(() => {
      setShowDropdown(false);
    }, 200);
    onBlur(event);
  };

  return (
    <div className="relative">
      <InputField
        name="dropoffLocation"
        id="dropoffLocation"
        type="text"
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        onBlur={handleBlur}
        error={error}
        autoComplete="off"
      />

      {/* Premium Dropdown */}
      {showDropdown && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl max-h-72 overflow-y-auto transition-all duration-200">
          {isLoading ? (
            <div className="flex items-center justify-center px-6 py-6 text-gray-500">
              <svg
                className="animate-spin h-5 w-5 text-primary-600 mr-3"
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
              <span className="text-base font-medium">Searching...</span>
            </div>
          ) : predictions.length > 0 ? (
            predictions.map((prediction, idx) => (
              <div
                key={prediction.place_id}
                className={`flex items-start gap-3 px-6 py-4 cursor-pointer transition-colors duration-150 ${idx === 0 ? "rounded-t-xl" : ""
                  } ${idx === predictions.length - 1 ? "rounded-b-xl" : ""
                  } hover:bg-primary-50 active:bg-primary-100 border-b border-gray-100 last:border-b-0`}
                onClick={() => handlePlaceSelect(prediction)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handlePlaceSelect(prediction);
                  }
                }}
                aria-label={`Select ${prediction.description}`}
              >
                <div className="flex-shrink-0 mt-1">
                  <svg
                    className="h-5 w-5 text-primary-500"
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
                <div className="flex-1 min-w-0">
                  <div className="text-base font-semibold text-gray-900 truncate">
                    {prediction.structured_formatting.main_text}
                  </div>
                  <div className="text-sm text-gray-500 truncate">
                    {prediction.structured_formatting.secondary_text}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-6 text-gray-400 text-center text-base font-medium">
              <svg
                className="mx-auto mb-2 h-6 w-6 text-gray-300"
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
              No locations found
            </div>
          )}
        </div>
      )}
    </div>
  );
};
const baseInitialValues: ItineraryInformationValues = {
  pickupLocation: "",
  startDate: null,
  startTime: null,
  dropoffLocation: "",
  endDate: null,
  endTime: null,
  areaOfUse: "",
  outskirtsLocation: [],
  extraDetails: "",
  purposeOfRide: "",
};

const ItineraryForm = ({
  steps,
  currentStep,
  setCurrentStep,
  vehicleId,
}: {
  steps: string[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
  vehicleId: string;
}) => {
  const searchParams = useSearchParams();



  // Get URL parameters
  const startDateParam = searchParams.get("startDate");
  const endDateParam = searchParams.get("endDate");
  const pickupLocationParam = searchParams.get("pickupLocation");

  // Parse dates from URL parameters
  const { date: startDate, time: startTime } = parseDateFromUrl(startDateParam);
  const { date: endDate, time: endTime } = parseDateFromUrl(endDateParam);

  // Check if dates are from URL (to determine if fields should be disabled)
  const hasUrlDates = startDateParam && endDateParam;

  // Create initial values with URL parameters
  const initialValues = useMemo(() => {
    const existingValues = getExistingBookingInformation(
      baseInitialValues,
      vehicleId,
      "itineraryInformation"
    );

    return {
      ...existingValues,
      // Override with URL parameters if they exist
      ...(startDate && { startDate }),
      ...(startTime && { startTime }),
      ...(endDate && { endDate }),
      ...(endTime && { endTime }),
      ...(pickupLocationParam && { pickupLocation: pickupLocationParam }),
    };
  }, [vehicleId, startDate, startTime, endDate, endTime, pickupLocationParam]);


  const { trips, setTrips, deleteTrip, onChangeTrip, addTrip, bookingPriceBreakdown, isTripFormsComplete } = useItineraryForm(null)


  // const initialValues = {
  //   "pickupLocation": "ddd",
  //   "startDate": "2025-08-01T00:30:00",
  //   "startTime": "2025-08-17T23:30:00.000Z",
  //   "dropoffLocation": "f",
  //   "endDate": "2025-08-07T00:30:00",
  //   "endTime": "2025-08-17T23:30:00.000Z",
  //   "areaOfUse": "Mainland Central",
  //   "outskirtsLocation": [
  //     "Badagry"
  //   ],
  //   "extraDetails": "",
  //   "purposeOfRide": ""
  // }


  // const initialValues = {
  //   pickupLocation: trips[0]?.pickupLocation || "",
  //   startDate: "2025-08-01T00:30:00",
  //   startTime: "2025-08-17T23:30:00.000Z",
  //   dropoffLocation: trips[0]?.dropoffLocation || "",
  //   endDate: "2025-08-07T00:30:00",
  //   endTime: "2025-08-17T23:30:00.000Z",
  //   areaOfUse: "Mainland Central",
  //   outskirtsLocation: [
  //     "Badagry"
  //   ],
  //   extraDetails: "",
  //   purposeOfRide: ""
  // }

  // console.log(trips)

  useEffect(() => {
    const trips = JSON.parse(sessionStorage.getItem('trips') || '[]');
    setTrips(trips)
  }, [])

  const { vehicle } = useFetchVehicleById({ id: vehicleId })

  return (
    <>


      <Formik
        initialValues={initialValues}
        validationSchema={itineraryInformationSchema}
        onSubmit={(values, { setSubmitting }) => {
          // Combine date and time fields before saving - now using Date objects directly
          const { startDateTime, endDateTime } = combineDateTime(
            values.startDate as Date,
            values.startTime as Date,
            values.endDate as Date,
            values.endTime as Date
          );

          // Create updated values with combined datetime
          const updatedValues = {
            ...values,
            startDate: startDateTime,
            endDate: endDateTime,
          };

          saveAndUpdateBookingInformation(
            updatedValues,
            vehicleId,
            "itineraryInformation"
          );
          setCurrentStep(currentStep + 1);

          setSubmitting(false);
        }}
      >
        {({
          values,
          touched,
          errors,
          isValid,
          dirty,
          handleBlur,
          handleChange,
          setFieldTouched,
          setFieldValue,
          isSubmitting,
        }) => (
          <Form className="max-w-[500px] w-full space-y-8">
            <h6 className="!font-bold text-base md:text-xl 3xl:text-h6">
              Daily Rental
            </h6>
            <h6 className="!font-bold text-base md:text-md ">Add Booking Details</h6>

            {trips?.map((trip, index) => {
              return <TripPerDaySelect key={trip.id}
                day={`${index + 1}`}
                disabled={true}
                vehicle={vehicle}
                id={trip.id || ''}
                deleteMethod={deleteTrip}
                page="booking-vehicle"
                onChangeTrip={onChangeTrip} initialValues={trip} />
            })}
            {/* <InputField
              name="pickupLocation"
              id="pickupLocation"
              type="text"
              label="Pickup location"
              placeholder="Enter your pickup location"
              value={values.pickupLocation}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={!!pickupLocationParam}
              error={
                errors.pickupLocation && touched.pickupLocation
                  ? String(errors.pickupLocation)
                  : ""
              }
            />

            <FormRow>
              <DateInput
                label="Pickup date"
                name="startDate"
                value={values.startDate}
                onChange={(value: CalendarValue) =>
                  setFieldValue("startDate", value as Date | null)
                }
                disabled={!!hasUrlDates}
                error={
                  errors.startDate && touched.startDate
                    ? String(errors.startDate)
                    : ""
                }
              />
              <TimeInput
                label="Pickup time"
                name="startTime"
                value={values.startTime}
                onChange={(date: Date) => setFieldValue("startTime", date)}
                onBlur={handleBlur}
                disabled={!!hasUrlDates}
                error={
                  errors.startTime && touched.startTime
                    ? String(errors.startTime)
                    : ""
                }
              />
            </FormRow> */}

            {/* Google Maps Autocomplete Drop-off Location */}
            {/* <GoogleMapsInput
              value={values.dropoffLocation}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                errors.dropoffLocation && touched.dropoffLocation
                  ? String(errors.dropoffLocation)
                  : ""
              }
            />

            <FormRow>
              <DateInput
                label="Drop-off date"
                name="endDate"
                value={values.endDate}
                onChange={(value: CalendarValue) =>
                  setFieldValue("endDate", value as Date | null)
                }
                disabled={!!hasUrlDates}
                error={
                  errors.endDate && touched.endDate ? String(errors.endDate) : ""
                }
              />
              <TimeInput
                label="Drop-off time"
                name="endTime"
                value={values.endTime}
                onChange={(date: Date) => setFieldValue("endTime", date)}
                onBlur={handleBlur}
                disabled={!!hasUrlDates}
                error={
                  errors.endTime && touched.endTime ? String(errors.endTime) : ""
                }
              />
            </FormRow>

            <SelectInput
              id="areaOfUse"
              label="Area of use"
              placeholder="Select"
              variant="outlined"
              options={[
                { option: "All Areas", value: "All Areas" },
                { option: "Mainland Central", value: "Mainland Central" },
                { option: "Island Central", value: "Island Central" },
                {
                  option: "Mainland and Island Central",
                  value: "Mainland and Island Central",
                },
              ]}
              value={values.areaOfUse}
              onChange={(value: string) => {
                setFieldTouched("areaOfUse", true);
                setFieldValue("areaOfUse", value);
              }}
              error={
                errors.areaOfUse && touched.areaOfUse
                  ? String(errors.areaOfUse)
                  : ""
              }
            />

            <div className="space-y-3">
              <label
                htmlFor="features"
                className="text-sm block font-medium text-black"
              >
                Outskirt locations
              </label>
              <p className="text-sm text-grey-600">
                Stops here will incur an additional cost of N6,500 set by the host
                of your vehicle
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-8">
                {outskirtsLocationOptions.map((feature) => {
                  console.log(values?.outskirtsLocation)
                  return <GroupCheckBox
                    key={feature}
                    feature={feature}
                    checkedValues={values?.outskirtsLocation}
                    onChange={(feature: string, isChecked: boolean) => {
                      if (isChecked) {
                        const newValues = [...values.outskirtsLocation, feature];
                        setFieldValue("outskirtsLocation", newValues);
                      } else {
                        const newValues = values.outskirtsLocation.filter(
                          (value: string) => value !== feature
                        );
                        setFieldValue("outskirtsLocation", newValues);
                      }
                    }}
                  />
                })}
              </div>
            </div> */}

            <TextArea
              name="extraDetails"
              id="extraDetails"
              type="text"
              label="Extra details(optional)"
              placeholder={`Add extra trip details you would like to share`}
              value={values.extraDetails}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                errors.extraDetails && touched.extraDetails
                  ? String(errors.extraDetails)
                  : ""
              }
            />

            <TextArea
              name="purposeOfRide"
              id="purposeOfRide"
              type="text"
              label="Purpose of ride(optional)"
              placeholder={`Add your purpose of ride`}
              value={values.purposeOfRide}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                errors.purposeOfRide && touched.purposeOfRide
                  ? String(errors.purposeOfRide)
                  : ""
              }
            />

            {/* <button onClick={() => setCurrentStep(2)}>next</button> */}
            <StepperNavigation
              steps={steps}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              handleSaveDraft={() => { }}
              isSaveDraftloading={false}
              isNextLoading={isSubmitting}
              disableNextButton={!isValid || isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ItineraryForm;
