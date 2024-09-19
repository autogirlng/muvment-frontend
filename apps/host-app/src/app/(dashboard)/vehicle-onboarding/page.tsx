"use client";
import cn from "classnames";
import BackLink from "@/components/BackLink";
import AdditionalInformation from "@/components/VehicleOnboarding/AdditionalInformation";
import AvailabilityAndPricing from "@/components/VehicleOnboarding/AvailabilityAndPricing";
import BasicVehicleInformation from "@/components/VehicleOnboarding/BasicInformation";
import VehiclePhotos from "@/components/VehicleOnboarding/VehiclePhotos";
import VehicleSummary from "@/components/VehicleOnboarding/VehicleSummary";
import { Stepper } from "@repo/ui/stepper";
import useVehicleOnboarding from "../../../hooks/useVehicleOnboarding";
import { FullPageSpinner } from "@repo/ui/spinner";

const steps = [
  "Basic Vehicle Information",
  "Additional Vehicle Information",
  "Photos",
  "Availability and Pricing",
];

export default function VehicleOnboardingPage() {
  const { currentStep, setCurrentStep, loading } = useVehicleOnboarding();

  if (loading) {
    return <FullPageSpinner />;
  }

  return (
    <main className="pb-[188px] pt-[52px] md:pt-16 px-8 lg:px-[52px] min-h-screen">
      <div
        className={cn(
          "mx-auto space-y-8 md:space-y-[52px]",
          currentStep === 4
            ? "max-w-[1020px] 3xl:max-w-[1120px]"
            : "max-w-[1492px]"
        )}
      >
        <div className="space-y-8">
          <BackLink backLink="/dashboard" />
          <h2 className="text-h5 md:text-h3 3xl:text-4xl text-black">
            {currentStep === 4 ? "Summary" : "Vehicle Onboarding"}
          </h2>
        </div>
        <Stepper steps={steps} currentStep={currentStep}>
          {currentStep === 0 && <BasicVehicleInformation steps={steps} />}
          {currentStep === 1 && <AdditionalInformation steps={steps} />}
          {currentStep === 2 && <VehiclePhotos steps={steps} />}
          {currentStep === 3 && <AvailabilityAndPricing steps={steps} />}
          {currentStep === 4 && <VehicleSummary steps={steps} />}
        </Stepper>
      </div>
    </main>
  );
}
