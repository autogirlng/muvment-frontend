import PersonalInformationForm from "@/components/VehicleBooking/PersonalInformation/PersonalInformationForm";
import VehicleInformationCard from "../VehicleCard";
import { VehicleInformation } from "@/utils/types";

type Props = {
  steps: string[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
  vehicle: VehicleInformation | null;
  vehicleImages: string[];
};

const PersonalInformation = ({
  steps,
  currentStep,
  setCurrentStep,
  vehicle,
  vehicleImages,
}: Props) => {
  return (
    <div className="flex justify-between flex-col md:flex-row items-start gap-8">
      <PersonalInformationForm
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        vehicleId={vehicle?.id ?? ""}
      />
      <VehicleInformationCard vehicle={vehicle} vehicleImages={vehicleImages} />
    </div>
  );
};

export default PersonalInformation;
