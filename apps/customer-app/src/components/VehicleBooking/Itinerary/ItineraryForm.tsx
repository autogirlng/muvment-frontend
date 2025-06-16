import { Formik, Form } from "formik";
import { GroupCheckBox } from "@repo/ui/checkbox";
import { StepperNavigation } from "@repo/ui/stepper";
import { outskirtsLocationOptions } from "@/utils/data";
import { CalendarValue, ItineraryInformationValues } from "@/utils/types";
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
import { useMemo } from "react";

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

  return (
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
          <InputField
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
          </FormRow>

          <InputField
            name="dropoffLocation"
            id="dropoffLocation"
            type="text"
            label="Drop-off location"
            placeholder="Enter the drop-off location"
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
            options={[{ option: "All Areas", value: "All Areas" }]}
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
              {outskirtsLocationOptions.map((feature) => (
                <GroupCheckBox
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
              ))}
            </div>
          </div>

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

          <StepperNavigation
            steps={steps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            handleSaveDraft={() => {}}
            isSaveDraftloading={false}
            isNextLoading={isSubmitting}
            disableNextButton={!isValid || isSubmitting}
          />
        </Form>
      )}
    </Formik>
  );
};

export default ItineraryForm;
