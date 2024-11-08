import BookingSummaryForm from "./BookingSummaryForm";

type Props = {
  steps: string[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
};

export default function BookingSummary({
  steps,
  setCurrentStep,
  currentStep,
}: Props) {
  return (
    <div className="flex justify-between flex-col-reverse md:flex-row gap-8">
      <BookingSummaryForm
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    </div>
  );
}
