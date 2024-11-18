import VehicleInformationCard from "../VehicleCard";
import ItineraryForm from "./ItineraryForm";

const Itinerary = ({
  steps,
  currentStep,
  setCurrentStep,
}: {
  steps: string[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
}) => {
  return (
    <div className="flex justify-between flex-col-reverse md:flex-row gap-8">
      <ItineraryForm
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
      <VehicleInformationCard />
    </div>
  );
};

export default Itinerary;
