import { Formik, Form } from "formik";
import { GroupCheckBox } from "@repo/ui/checkbox";
import { StepperNavigation } from "@repo/ui/stepper";
import { addtionalVehicleInformationSchema } from "@/utils/validationSchema";
import { outskirtsLocationOptions } from "@/utils/data";
import InputField from "@repo/ui/inputField";
import TextArea from "@repo/ui/textarea";
import SelectInput from "@repo/ui/select";
import { ItineraryInformationValues } from "@/utils/types";

const initialValues: ItineraryInformationValues = {
  pickupLocation: "",
  dropoffLocation: "",
  areaOfUse: "",
  outskirtsLocation: [],
  extraDetails: "",
  purposeOfRide: "",
};

const ItineraryForm = ({
  steps,
  currentStep,
  setCurrentStep,
}: {
  steps: string[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
}) => {
  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={addtionalVehicleInformationSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log("Form values:", values);
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
                ? errors.pickupLocation
                : ""
            }
          />

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
                ? errors.dropoffLocation
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
                  checkedValues={values.outskirtsLocation}
                  onChange={(feature: string, isChecked: boolean) => {
                    if (isChecked) {
                      const newValues = [...values.outskirtsLocation, feature];
                      setFieldValue("outskirtsLocation", newValues);
                    } else {
                      const newValues = values.outskirtsLocation.filter(
                        (value) => value !== feature
                      );
                      setFieldValue("outskirtsLocation", newValues);
                    }
                  }}
                />
              ))}
            </div>
          </div>

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
              errors.areaOfUse && touched.areaOfUse ? errors.areaOfUse : ""
            }
          />

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
                ? errors.extraDetails
                : ""
            }
          />

          <SelectInput
            id="purposeOfRide"
            label="Purpose of ride(optional)"
            placeholder="Select"
            variant="outlined"
            options={[{ option: "All Areas", value: "All Areas" }]}
            value={values.purposeOfRide}
            onChange={(value: string) => {
              setFieldTouched("purposeOfRide", true);
              setFieldValue("purposeOfRide", value);
            }}
            error={
              errors.purposeOfRide && touched.purposeOfRide
                ? errors.purposeOfRide
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
