import React from "react";
import AdditionalInformationForm from "./AdditionalInformationForm";
import AdditionalInformationTips from "./AdditionalInformationTips";

const AdditionalInformation = ({
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
      <AdditionalInformationForm
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
      <AdditionalInformationTips />
    </div>
  );
};

export default AdditionalInformation;
