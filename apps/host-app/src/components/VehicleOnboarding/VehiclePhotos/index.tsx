import VehiclePhotosForm from "./VehiclePhotosForm";
import VehiclePhotosTips from "./VehiclePhotosTips";

type Props = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  steps: string[];
};

const VehiclePhotos = ({ currentStep, setCurrentStep, steps }: Props) => {
  return (
    <div className="space-y-[52px]">
      <VehiclePhotosTips/>
      <VehiclePhotosForm
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        steps={steps}
      />
    </div>
  );
};

export default VehiclePhotos;
