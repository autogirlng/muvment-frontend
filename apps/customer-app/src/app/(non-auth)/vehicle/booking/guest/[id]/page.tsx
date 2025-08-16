"use client";
import cn from "classnames";
import BackLink from "@/components/BackLink";
import Itinerary from "@/components/VehicleBooking/Itinerary";
import BookingSummary from "@/components/VehicleBooking/BookingSummary";
import PersonalInformation from "@/components/VehicleBooking/PersonalInformation";
import PickupsAndDropoffs from "@/components/VehicleBooking/PickupsAndDropoffs";
import { Stepper } from "@repo/ui/stepper";
import { useEffect, useState } from "react";
import useFetchVehicleById from "@/components/VehicleBooking/hooks/useFetchVehicleById";
import { FullPageSpinner } from "@repo/ui/spinner";
import { useFetchUrlParams } from "@/utils/functions";
import { useRouter } from "next/navigation";

const steps = ["Personal Information", "Itinerary", "Booking Summary"];

export default function VehicleBookingPage({
  params,
}: { 
  params: { id: string };
}) {
  const router = useRouter();

  const { vehicle, perks, vehicleDetails, vehicleImages, isError, isLoading } =
    useFetchVehicleById({
      id: params?.id,
    });

  const [currentStep, setCurrentStep] = useState<number>(0);

  const handleCurrentStep = (step: number) => {
    setCurrentStep(step);
  };

  useEffect(() => {
    if (!params.id) {
      router.back();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  if (isLoading) {
    return <FullPageSpinner />;
  }

  return (
    <main className="pb-[188px] pt-[52px] md:pt-16 px-8 lg:px-[52px]">
      <div
        className={cn(
          "mx-auto space-y-8 md:space-y-[52px]",
          currentStep === 3
            ? "max-w-[1020px] 3xl:max-w-[1120px]"
            : "max-w-[1492px]"
        )}
      >
        <div className="space-y-8">
          <BackLink backLink="/explore" />
          <h2 className="text-h5 md:text-h3 3xl:text-4xl text-black">
            {currentStep === 3 ? "Summary" : "Book Ride"}
          </h2>
        </div>
        <Stepper steps={steps} currentStep={currentStep}>
          {currentStep === 0 && (
            <PersonalInformation
              steps={steps}
              currentStep={currentStep}
              setCurrentStep={handleCurrentStep}
              vehicle={vehicle ?? null}
              vehicleImages={vehicleImages}
              type="guest"
            />
          )}
          {currentStep === 1 && (
            <Itinerary
              steps={steps}
              currentStep={currentStep}
              setCurrentStep={handleCurrentStep}
              vehicle={vehicle ?? null}
              vehicleImages={vehicleImages}
            />
          )}

          {currentStep === 2 && (
            <BookingSummary
              vehicle={vehicle ?? null}
              vehicleImages={vehicleImages}
              perks={perks}
              vehicleDetails={vehicleDetails}
              type="guest"
            />
          )}
        </Stepper>
      </div>
    </main>
  );
}
