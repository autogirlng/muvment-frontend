import React from "react";
import BasicVehicleInformationForm from "./BasicInformationForm";
import BasicInformationTips from "./BasicInformationTips";

const BasicVehicleInformation = ({
  currentStep,
  setCurrentStep,
  steps,
}: {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  steps: string[];
}) => {
  return (
    <div className="flex justify-between flex-col-reverse md:flex-row gap-8">
      <BasicVehicleInformationForm
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
      <BasicInformationTips />
    </div>
  );
};

export default BasicVehicleInformation;
