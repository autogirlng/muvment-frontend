import { TipsPopup } from "@repo/ui/popup";
import Tips from "@/components/VehicleOnboarding//Tips";
import AvailabilityAndPricingForm from "./AvailabilityAndPricingForm";
import AvailabilityAndPricingTips from "./AvailabilityAndPricingTips";

type Props = {
  steps: string[];
};

export default function AvailabilityAndPricing({ steps }: Props) {
  return (
    <div className="flex justify-between flex-col-reverse md:flex-row gap-8">
      <AvailabilityAndPricingForm steps={steps} />
      <DesktopTips />
      <MobileTips />
    </div>
  );
}

const DesktopTips = () => (
  <div className="hidden md:block">
    <Tips>
      <AvailabilityAndPricingTips />
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
          <AvailabilityAndPricingTips />
        </Tips>
      }
    />
  </div>
);
