"use client";
import cn from "classnames";
import BackLink from "@/components/BackLink";
import Itinerary from "@/components/VehicleBooking/Itinerary";
import BookingSummary from "@/components/VehicleBooking/BookingSummary";
import PersonalInformation from "@/components/VehicleBooking/PersonalInformation";
import PickupsAndDropoffs from "@/components/VehicleBooking/PickupsAndDropoffs";
import VehicleSummary from "@/components/VehicleBooking/VehicleSummary";
import { Stepper } from "@repo/ui/stepper";
import { useState } from "react";
import VehiclePayment from "@/components/VehicleBooking/Payment";

const steps = [
  "Personal Information",
  "Itinerary",
  "Pick-Up & Drop-offs",
  "Booking Summary",
];

export default function VehicleBookingPage() {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const handleCurrentStep = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <main className="pb-[188px] pt-[52px] md:pt-16 px-8 lg:px-[52px]">
      <div
        className={cn(
          "mx-auto space-y-8 md:space-y-[52px]",
          currentStep === 4
            ? "max-w-[1020px] 3xl:max-w-[1120px]"
            : "max-w-[1492px]"
        )}
      >
        <div className="space-y-8">
          <BackLink backLink="/" />
          <h2 className="text-h5 md:text-h3 3xl:text-4xl text-black">
            {currentStep === 4 ? "Summary" : "Book Ride"}
          </h2>
        </div>
        <Stepper steps={steps} currentStep={currentStep}>
          {currentStep === 0 && (
            <PersonalInformation
              steps={steps}
              currentStep={currentStep}
              setCurrentStep={handleCurrentStep}
            />
          )}
          {currentStep === 1 && (
            <Itinerary
              steps={steps}
              currentStep={currentStep}
              setCurrentStep={handleCurrentStep}
            />
          )}
          {currentStep === 2 && (
            <PickupsAndDropoffs
              steps={steps}
              currentStep={currentStep}
              setCurrentStep={handleCurrentStep}
            />
          )}
          {currentStep === 3 && (
            <BookingSummary
              steps={steps}
              currentStep={currentStep}
              setCurrentStep={handleCurrentStep}
            />
          )}
        </Stepper>
      </div>
    </main>
  );
}
