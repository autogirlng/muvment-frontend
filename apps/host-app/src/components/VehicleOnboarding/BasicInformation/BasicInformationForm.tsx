import React from "react";
import { Formik, Form } from "formik";
import InputField from "@repo/ui/inputField";
import SelectInput from "@repo/ui/select";
import { basicVehicleInformationSchema } from "@/utils/validationSchema";
import {
  cities,
  vehicleMakes,
  vehicleModels,
  vehicleTypes,
} from "@/utils/data";
import { StepperNavigation } from "@repo/ui/stepper";
import { basicVehicleInformationValues } from "@/utils/initialValues";
import FormRow from "../FormRow";

const currentYear = new Date().getFullYear();
const yearOfRelease = Array.from(
  { length: currentYear - 2010 + 1 },
  (_, index) => ({
    value: (2010 + index).toString(),
    option: (2010 + index).toString(),
  })
);

const BasicVehicleInformationForm = ({
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
      initialValues={basicVehicleInformationValues}
      validationSchema={basicVehicleInformationSchema}
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
              name="vehicleName"
              id="vehicleName"
              type="text"
              label="Vehicle Listing Name"
              placeholder="Enter vehicle listing name"
              value={values.vehicleName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                errors.vehicleName && touched.vehicleName
                  ? errors.vehicleName
                  : ""
              }
              info
              tooltipTitle=""
              tooltipDescription=""
            />

            <SelectInput
              id="city"
              label="What city is your vehicle located?"
              placeholder="Select location"
              variant="outlined"
              options={cities}
              value={values.city}
              onChange={(value: string) => {
                setFieldTouched("city", true);
                setFieldValue("city", value);
              }}
              error={errors.city && touched.city ? errors.city : ""}
              info
              tooltipTitle=""
              tooltipDescription=""
            />
          </FormRow>

          {/* google map address */}
          <InputField
            name="address"
            id="address"
            type="text"
            label="Address"
            placeholder="Enter address"
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.address && touched.address ? errors.address : ""}
            info
            tooltipTitle=""
            tooltipDescription=""
          />

          <FormRow>
            <SelectInput
              id="vehicleType"
              label="Vehicle Type"
              placeholder="Select vehicle type"
              variant="outlined"
              options={vehicleTypes}
              value={values.vehicleType}
              onChange={(value: string) => {
                setFieldTouched("vehicleType", true);
                setFieldValue("vehicleType", value);
              }}
              error={
                errors.vehicleType && touched.vehicleType
                  ? errors.vehicleType
                  : ""
              }
              info
              tooltipTitle=""
              tooltipDescription=""
            />

            <SelectInput
              id="vehicleMake"
              label="Vehicle Make"
              placeholder="Select vehicle make"
              variant="outlined"
              options={vehicleMakes}
              value={values.vehicleMake}
              onChange={(value: string) => {
                setFieldTouched("vehicleMake", true);
                setFieldValue("vehicleMake", value);
              }}
              error={
                errors.vehicleMake && touched.vehicleMake
                  ? errors.vehicleMake
                  : ""
              }
              info
              tooltipTitle=""
              tooltipDescription=""
            />
          </FormRow>

          <FormRow>
            <SelectInput
              id="vehicleModel"
              label="Vehicle Model"
              placeholder="Select vehicle model"
              variant="outlined"
              options={vehicleModels}
              value={values.vehicleModel}
              onChange={(value: string) => {
                setFieldTouched("vehicleModel", true);
                setFieldValue("vehicleModel", value);
              }}
              error={
                errors.vehicleModel && touched.vehicleModel
                  ? errors.vehicleModel
                  : ""
              }
              info
              tooltipTitle=""
              tooltipDescription=""
            />

            <SelectInput
              id="year"
              label="Year of Release"
              placeholder="Select year of release"
              variant="outlined"
              options={yearOfRelease}
              value={values.year}
              onChange={(value: string) => {
                setFieldTouched("year", true);
                setFieldValue("year", value);
              }}
              error={errors.year && touched.year ? errors.year : ""}
              info
              tooltipTitle=""
              tooltipDescription=""
            />
          </FormRow>

          <FormRow>
            <SelectInput
              id="insurance"
              label="Does your vehicle have insurance?"
              placeholder="Select an option"
              variant="outlined"
              options={[
                { value: "yes", option: "Yes" },
                { value: "no", option: "No" },
              ]}
              value={values.insurance}
              onChange={(value: string) => {
                setFieldTouched("insurance", true);
                setFieldValue("insurance", value);
              }}
              error={
                errors.insurance && touched.insurance ? errors.insurance : ""
              }
              info
              tooltipTitle=""
              tooltipDescription=""
            />

            <SelectInput
              id="tracker"
              label="Does your vehicle have a tracker?"
              placeholder="Select an option"
              variant="outlined"
              options={[
                { value: "yes", option: "Yes" },
                { value: "no", option: "No" },
              ]}
              value={values.tracker}
              onChange={(value: string) => {
                setFieldTouched("tracker", true);
                setFieldValue("tracker", value);
              }}
              error={errors.tracker && touched.tracker ? errors.tracker : ""}
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

export default BasicVehicleInformationForm;
