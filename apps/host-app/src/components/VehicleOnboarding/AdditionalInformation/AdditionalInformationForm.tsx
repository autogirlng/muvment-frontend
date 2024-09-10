import React from "react";
import { Formik, Form } from "formik";
import InputField from "@repo/ui/inputField";
import TextArea from "@repo/ui/textarea";
import SelectInput from "@repo/ui/select";
import { addtionalVehicleInformationSchema } from "@/utils/validationSchema";
import { vehicleColors, vehicleFeatures } from "@/utils/data";
import { StepperNavigation } from "@repo/ui/stepper";
import { additionalVehicleInformationValues } from "@/utils/initialValues";
import CheckBox from "@repo/ui/checkbox";
import FormRow from "../FormRow";

const AdditionalInformationForm = ({
  currentStep,
  setCurrentStep,
  steps,
}: {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  steps: string[];
}) => {
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

          {/* text area*/}
          <TextArea
            name="vehicleDescription"
            id="vehicleDescription"
            type="text"
            label="Vehicle Description"
            placeholder={`E.g 2015 Toyota Camry with good fuel efficiency, spacious interior, and
advanced safety features. Perfect for city driving and long trips. Includes GPS,
Bluetooth connectivity, and a sunroof.`}
            value={values.vehicleDescription}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              errors.vehicleDescription && touched.vehicleDescription
                ? errors.vehicleDescription
                : ""
            }
            info
            tooltipTitle=""
            tooltipDescription=""
          />
          {/* vehicle features */}
          <div className="space-y-3">
            <label
              htmlFor="vehicleFeatures"
              className="text-sm block font-medium text-nowrap text-grey-900"
            >
              Vehicle Features
            </label>
            <div className="grid grid-cols-3 gap-x-[50px] gap-y-3 max-w-[686px]">
              {vehicleFeatures.map((feature) => (
                <CheckBox
                  key={feature}
                  feature={feature}
                  checkedValues={values.vehicleFeatures}
                  onChange={(feature: string, isChecked: boolean) => {
                    if (isChecked) {
                      const newValues = [...values.vehicleFeatures, feature];
                      setFieldValue("vehicleFeatures", newValues);
                    } else {
                      const newValues = values.vehicleFeatures.filter(
                        (value) => value !== feature
                      );
                      setFieldValue("vehicleFeatures", newValues);
                    }
                  }}
                />
              ))}
            </div>
          </div>

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

export default AdditionalInformationForm;
