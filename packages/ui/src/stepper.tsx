import { ReactNode } from "react";
import Icons from "@repo/ui/icons";
import cn from "classnames";

export const Stepper = ({
  steps,
  children,
  currentStep,
}: {
  steps: string[];
  children: ReactNode;
  currentStep: number;
}) => {
  return (
    <>
      <div className="flex justify-between items-center gap-2">
        {steps.map((step, index) => (
          <>
            <div
              className="flex items-center justify-between gap-6"
              key={index}
            >
              <div
                className={`flex items-center justify-center w-8 sm:w-10 h-8 sm:h-10 rounded-full border-grey-500 border-[1.5px] text-xs ${
                  currentStep > index
                    ? "bg-primary-500 text-white"
                    : currentStep === index
                      ? "bg-grey-500 text-white"
                      : "text-grey-500"
                }`}
              >
                {index + 1}
              </div>
              <p className="font-medium text-base 3xl:text-xl text-grey-500 hidden md:block">
                {step}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div className="text-black">{Icons.ic_chevron_right}</div>
            )}
          </>
        ))}
      </div>

      {/* ========== content here ========== */}
      {children}
      {/* ========== content here ========== */}
    </>
  );
};

export const StepperNavigation = ({
  steps,
  currentStep,
  setCurrentStep,
  // saveDraft,
}: {
  steps: string[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
  // saveDraft: () => void;
}) => {
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  return (
    <div className="fixed bottom-0 left-0 w-full bg-grey-50 py-6 px-8 lg:px-[52px]">
      <div className="flex justify-between">
        {currentStep > 0 && (
          <StepperButton
            onClick={handleBack}
            disabled={currentStep === 0}
            className="border-2 border-grey-600 text-grey-600"
            type="button"
          >
            {Icons.ic_chevron_left} <span>Previous</span>
          </StepperButton>
        )}
        <div className="flex items-center gap-3 justify-end w-full">
          <StepperButton
            // onClick={saveDraft}
            className="border-2 border-grey-600 text-grey-600"
            type="submit"
          >
            <span>Save Draft</span>
          </StepperButton>
          <StepperButton
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            className="px-6 3xl:!px-8 bg-primary-500 text-white disabled:bg-grey-300"
            type="button"
          >
            <span>Next</span> {Icons.ic_chevron_right}
          </StepperButton>
        </div>
      </div>
    </div>
  );
};

const StepperButton = ({
  children,
  onClick,
  className,
  ...rest
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  [key: string]: any;
}) => (
  <button
    {...rest}
    className={cn(
      "py-3 3xl:py-4 px-4 3xl:px-6 rounded-[43px] flex items-center gap-1 3xl:gap-2 text-sm 3xl:text-base font-semibold",
      className
    )}
    onClick={onClick}
  >
    {children}
  </button>
);
