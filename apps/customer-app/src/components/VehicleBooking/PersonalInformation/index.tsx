import PersonalInformationForm from "@/components/VehicleBooking/PersonalInformation/PersonalInformationForm";
import VehicleInformationCard from "../VehicleCard";
import { VehicleInformation } from "@/utils/types";

type Props = {
  steps: string[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
  vehicle: VehicleInformation | null;
  vehicleImages: string[];
  type: "user" | "guest";
};

const PersonalInformation = ({
  steps,
  currentStep,
  setCurrentStep,
  vehicle,
  vehicleImages,
  type,
}: Props) => {
  return (
    <div className="flex justify-between flex-col md:flex-row items-start gap-8">
      <PersonalInformationForm
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        vehicleId={vehicle?.id ?? ""}
        type={type}
      />
      <VehicleInformationCard vehicle={vehicle} vehicleImages={vehicleImages} />
    </div>
  );
};

export default PersonalInformation;
