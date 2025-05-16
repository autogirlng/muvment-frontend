import { useState } from "react";
import PickupsAndDropoffsForm from "@/components/VehicleBooking/PickupsAndDropoffs/PickupsAndDropoffsForm";
import VehicleInformationCard from "../VehicleCard";

type Props = {
  steps: string[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
};

const PickupsAndDropoffs = ({ steps, currentStep, setCurrentStep }: Props) => {
  return (
    <div className="space-y-[52px]">
      <PickupsAndDropoffsForm
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
      {/* <VehicleInformationCard  /> */}
    </div>
  );
};

export default PickupsAndDropoffs;
