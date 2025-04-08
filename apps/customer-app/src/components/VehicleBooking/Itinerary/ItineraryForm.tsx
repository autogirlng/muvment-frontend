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

const initialValues: ItineraryInformationValues = {
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
  return (
    <Formik
      initialValues={getExistingBookingInformation(
        initialValues,
        vehicleId,
        "itineraryInformation"
      )}
      validationSchema={itineraryInformationSchema}
      onSubmit={(values, { setSubmitting }) => {
        saveAndUpdateBookingInformation(
          values,
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
