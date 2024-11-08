import PersonalInformationForm from "@/components/VehicleBooking/PersonalInformation/PersonalInformationForm";
import VehicleInformationCard from "../VehicleCard";

type Props = {
  steps: string[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
};

const PersonalInformation = ({ steps, currentStep, setCurrentStep }: Props) => {
  return (
    <div className="flex justify-between flex-col-reverse md:flex-row gap-8">
      <PersonalInformationForm
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
      <VehicleInformationCard />
    </div>
  );
};

export default PersonalInformation;
