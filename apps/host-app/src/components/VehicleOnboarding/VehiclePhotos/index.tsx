import React from "react";
import { Formik, Form } from "formik";
import { addtionalVehicleInformationSchema } from "@/utils/validationSchema";
import { StepperNavigation } from "@repo/ui/stepper";
import { additionalVehicleInformationValues } from "@/utils/initialValues";

type Props = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  steps: string[];
};

const VehiclePhotos = ({ currentStep, setCurrentStep, steps }: Props) => {
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

export default VehiclePhotos;
