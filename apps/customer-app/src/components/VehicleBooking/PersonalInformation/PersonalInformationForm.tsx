import { useState } from "react";
import PersonalInformationFormMyself from "./PersonalInformationFormMyself";
import PersonalInformationFormOthers from "./PersonalInformationFormOthers";

type Props = {
  steps: string[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
};

const PersonalInformationForm = ({
  steps,
  currentStep,
  setCurrentStep,
}: Props) => {
  const [whoBookedRide, setWhoBookedRide] = useState<"myself" | "others">(
    "myself"
  );
  return (
    <div className="max-w-[730px] w-full space-y-8">
      <div>
        <h6 className="!font-bold text-base md:text-xl 3xl:text-h6">
          Who is this ride for?
        </h6>
        {/* radio buttons for myself and others */}
      </div>
      {/* <PersonalInformationFormMyself
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      /> */}
      <PersonalInformationFormOthers
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    </div>
  );
};

export default PersonalInformationForm;
