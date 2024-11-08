import { Formik, Form } from "formik";
import { StepperNavigation } from "@repo/ui/stepper";
import Collapse from "@repo/ui/collapsible";
import Icons from "@repo/ui/icons";
import FormRow from "@/components/VehicleBooking/BookingSummary/FormRow";
import { availabilityAndPricingSchema } from "@/utils/validationSchema";
import { useState } from "react";
import { AvailabilityAndPricingValues } from "@/utils/types";
import { useRouter } from "next/navigation";

type Props = {
  steps: string[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
};

const initialValues: AvailabilityAndPricingValues = {
  advanceNoticeInDays: "",
  minTripDurationInDays: "1 day",
  maxTripDurationInDays: "",
  driverProvided: "no",
  fuelProvided: "no",
  dailyRate: "",
  extraHourRate: "",
  airportPickup: "",
  threeDaysDiscount: "",
  sevenDaysDiscount: "",
  thirtyDaysDiscount: "",
  outskirtsLocation: [],
  outskirtsPrice: "",
};

const BookingSummaryForm = ({ steps, setCurrentStep, currentStep }: Props) => {
  const router = useRouter();

  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={availabilityAndPricingSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log("Form values:", values);
        router.push("/vehicle/payment/1");

        setSubmitting(false);
      }}
    >
      {({
        values,
        touched,
        errors,
        isValid,
        dirty,
        handleBlur,
        handleChange,
        setFieldTouched,
        setFieldValue,
        isSubmitting,
      }) => (
        <Form className="w-full md:w-[calc(100%-250px)] space-y-[72px]">
          <div className="max-w-[800px] w-full space-y-[72px]"></div>

          <div className="space-y-8">
            <Collapse
              title={
                <p className="text-h6 3xl:text-h5 font-medium text-black">
                  Vehicle Details
                </p>
              }
              closeText={Icons.ic_chevron_up}
              openText={Icons.ic_chevron_down}
            >
              <div>collapse</div>
            </Collapse>
          </div>

          <StepperNavigation
            steps={steps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            handleSaveDraft={() => {}}
            isSaveDraftloading={false}
            isNextLoading={isSubmitting}
            disableNextButton={!isValid || isSubmitting}
          />
        </Form>
      )}
    </Formik>
  );
};

export default BookingSummaryForm;
