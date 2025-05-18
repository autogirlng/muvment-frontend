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
<<<<<<< HEAD
      {/* <VehicleInformationCard /> */}
=======
      {/* <VehicleInformationCard  /> */}
>>>>>>> d9f2352492730eeff72d585e92a144a72be36d72
    </div>
  );
};

export default PickupsAndDropoffs;
