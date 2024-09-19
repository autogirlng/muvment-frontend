import { TipsPopup } from "@repo/ui/popup";
import Tips from "@/components/VehicleOnboarding//Tips";
import BasicVehicleInformationForm from "@/components/VehicleOnboarding/BasicInformation/BasicInformationForm";
import BasicInformationTips from "@/components/VehicleOnboarding/BasicInformation/BasicInformationTips";

type Props = {
  steps: string[];
};

const BasicVehicleInformation = ({ steps }: Props) => {
  return (
    <div className="flex justify-between flex-col-reverse md:flex-row gap-8">
      <BasicVehicleInformationForm steps={steps} />
      <DesktopTips />
      <MobileTips />
    </div>
  );
};

const DesktopTips = () => (
  <div className="hidden md:block">
    <Tips>
      <BasicInformationTips />
    </Tips>
  </div>
);

const MobileTips = () => (
  <div className="block md:hidden">
    <TipsPopup
      trigger={
        <button className="w-full">
          <Tips />
        </button>
      }
      content={
        <Tips>
          <BasicInformationTips />
        </Tips>
      }
    />
  </div>
);

export default BasicVehicleInformation;
