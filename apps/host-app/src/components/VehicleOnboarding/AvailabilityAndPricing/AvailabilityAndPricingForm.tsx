import React from "react";
import { Formik, Form } from "formik";
import InputField from "@repo/ui/inputField";
import SelectInput from "@repo/ui/select";
import { addtionalVehicleInformationSchema } from "@/utils/validationSchema";
import { vehicleColors, vehicleFeatures } from "@/utils/data";
import { StepperNavigation } from "@repo/ui/stepper";
import { additionalVehicleInformationValues } from "@/utils/initialValues";
import CheckBox from "@repo/ui/checkbox";
import FormRow from "../FormRow";
type Props = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  steps: string[];
};

const AvailabilityAndPricingForm = ({
  currentStep,
  setCurrentStep,
  steps,
}: Props) => {
  return (
    <Formik
      initialValues={additionalVehicleInformationValues}
      validationSchema={addtionalVehicleInformationSchema}
      onSubmit={(values) => {
        console.log("Form values:", values);
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
        <Form className="max-w-[800px] w-full space-y-8">
          <FormRow>
            <InputField
              name="licensePlateNumber"
              id="licensePlateNumber"
              type="text"
              label="License Plate Number"
              placeholder="E.g AB124-CDE"
              value={values.licensePlateNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                errors.licensePlateNumber && touched.licensePlateNumber
                  ? errors.licensePlateNumber
                  : ""
              }
              info
              tooltipTitle=""
              tooltipDescription=""
            />

            <InputField
              name="stateOfRegistration"
              id="stateOfRegistration"
              type="text"
              label="State Of Registration"
              placeholder="Enter state of reg"
              value={values.stateOfRegistration}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                errors.stateOfRegistration && touched.stateOfRegistration
                  ? errors.stateOfRegistration
                  : ""
              }
              info
              tooltipTitle=""
              tooltipDescription=""
            />
          </FormRow>

          <FormRow>
            <SelectInput
              id="vehicleColor"
              label="Vehicle Color"
              placeholder="Select vehicle color"
              variant="outlined"
              options={vehicleColors}
              value={values.vehicleColor}
              onChange={(value: string) => {
                setFieldTouched("vehicleColor", true);
                setFieldValue("vehicleColor", value);
              }}
              error={
                errors.vehicleColor && touched.vehicleColor
                  ? errors.vehicleColor
                  : ""
              }
              info
              tooltipTitle=""
              tooltipDescription=""
            />

            <InputField
              name="numberOfSeats"
              id="numberOfSeats"
              type="text"
              label="Number of seats"
              placeholder="Enter number of seats"
              value={values.numberOfSeats}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                errors.numberOfSeats && touched.numberOfSeats
                  ? errors.numberOfSeats
                  : ""
              }
              info
              tooltipTitle=""
              tooltipDescription=""
            />
          </FormRow>

          <StepperNavigation
            steps={steps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            //      saveDraft={() => {}}
          />
        </Form>
      )}
    </Formik>
  );
};

export default AvailabilityAndPricingForm;
