import React from 'react'
import AvailabilityAndPricingForm from './AvailabilityAndPricingForm';
import AvailabilityAndPricingTips from './AvailabilityAndPricingTips';

type Props = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  steps: string[];
};

export default function AvailabilityAndPricing({ currentStep, setCurrentStep, steps }: Props) {
  return (
    <div className="flex justify-between flex-col-reverse md:flex-row gap-8">
      <AvailabilityAndPricingForm
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
      <AvailabilityAndPricingTips />
    </div>
  );
}