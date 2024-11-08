import cn from "classnames";

import { useAppSelector } from "@/lib/hooks";
import ViewAsCustomer from "@/components/VehicleBooking/VehicleSummary/ViewAsCustomer";

type Props = {
  steps: string[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
};

export default function VehicleSummary({
  steps,
  currentStep,
  setCurrentStep,
}: Props) {
  const { vehicle } = useAppSelector((state) => state.vehicleOnboarding);

  return (
    <div className="space-y-11">
      <ViewAsCustomer vehicle={vehicle} />
    </div>
  );
}

const SectionTitle = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => (
  <h6
    className={cn("text-grey-700 text-xl 3xl:text-h6 !font-medium", className)}
  >
    {text}
  </h6>
);

const PricingTitle = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => (
  <p className={cn("text-xs md:text-base 3xl:text-xl", className)}>{text}</p>
);

const PricingDescription = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => (
  <p className={cn("text-sm md:text-xl 3xl:text-h6 !font-medium", className)}>
    {text}
  </p>
);
