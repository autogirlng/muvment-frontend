import { Formik, Form } from "formik";
import { StepperNavigation } from "@repo/ui/stepper";
import InputField from "@repo/ui/inputField";
import { personalInformationSchema } from "@/utils/validationSchema";
import { PersonalInformationMyselfValues } from "@/utils/types";
import PhoneNumberAndCountryField from "@repo/ui/phoneNumberAndCountryField";
import { replaceCharactersWithString } from "@/utils/functions";
import { getCountryCallingCode } from "react-phone-number-input";
import { useState } from "react";

type Props = {
  steps: string[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
};

const initialValues: PersonalInformationMyselfValues = {
  fullName: "",
  email: "",
  primaryPhoneNumber: "",
  primaryCountry: "NG",
  primaryCountryCode: "+234",
  secondaryPhoneNumber: "",
  secondaryCountry: "NG",
  secondaryCountryCode: "+234",
};

const PersonalInformationFormMyself = ({
  steps,
  currentStep,
  setCurrentStep,
}: Props) => {
  const [showSecondaryPhoneNumber, setShowSecondaryPhoneNumber] =
    useState<boolean>(false);
  return (
    <Formik
      initialValues={initialValues}
      //       validationSchema={personalInformationSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log("Form values:", values);
        setCurrentStep(currentStep + 1);
        setSubmitting(false);
      }}
      enableReinitialize={true}
      validateOnChange={true}
      validateOnBlur={true}
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
        <Form className="max-w-[800px] w-full space-y-8">
          <InputField
            name="fullName"
            id="fullName"
            type="text"
            label="Full name"
            placeholder="Enter your full name"
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.fullName && touched.fullName ? errors.fullName : ""}
          />

          <InputField
            name="email"
            id="email"
            type="text"
            label="Email Address"
            placeholder="Enter your email address"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email && touched.email ? errors.email : ""}
          />

          <PhoneNumberAndCountryField
            inputName="primaryPhoneNumber"
            selectName="primaryCountry"
            inputId="primaryPhoneNumber"
            selectId="primaryCountry"
            label="Phone number- primary"
            inputPlaceholder="Enter phone number"
            selectPlaceholder="+234"
            inputValue={values.primaryPhoneNumber}
            selectValue={values.primaryCountry}
            inputOnChange={(event) => {
              const number = replaceCharactersWithString(event.target.value);
              setFieldTouched("primaryPhoneNumber", true);
              setFieldValue("primaryPhoneNumber", number);
            }}
            selectOnChange={(value: string) => {
              const countryCode = `+${getCountryCallingCode(value as any)}`;
              setFieldValue("primaryCountry", value);
              setFieldValue("primaryCountryCode", countryCode);
            }}
            inputOnBlur={handleBlur}
            selectOnBlur={handleBlur}
            // inputClassname
            selectClassname="!w-[130px]"
            inputError={
              errors.primaryPhoneNumber && touched.primaryPhoneNumber
                ? errors.primaryPhoneNumber
                : ""
            }
            selectError={
              errors.primaryCountry && touched.primaryCountry
                ? errors.primaryCountry
                : ""
            }
          />
          {showSecondaryPhoneNumber && (
            <PhoneNumberAndCountryField
              inputName="secondaryPhoneNumber"
              selectName="secondaryCountry"
              inputId="secondaryPhoneNumber"
              selectId="secondaryCountry"
              label="Phone number- Secondary (optional)"
              inputPlaceholder="Enter phone number"
              selectPlaceholder="+234"
              inputValue={values.secondaryPhoneNumber}
              selectValue={values.secondaryCountry}
              inputOnChange={(event) => {
                const number = replaceCharactersWithString(event.target.value);
                setFieldTouched("secondaryPhoneNumber, true");
                setFieldValue("secondaryPhoneNumber", number);
              }}
              selectOnChange={(value: string) => {
                const countryCode = `+${getCountryCallingCode(value as any)}`;
                setFieldValue("secondaryCountry", value);
                setFieldValue("secondaryCountryCode", countryCode);
              }}
              inputOnBlur={handleBlur}
              selectOnBlur={handleBlur}
              // inputClassname
              selectClassname="!w-[130px]"
              inputError={
                errors.secondaryPhoneNumber && touched.secondaryPhoneNumber
                  ? errors.secondaryPhoneNumber
                  : ""
              }
              selectError={
                errors.secondaryCountry && touched.secondaryCountry
                  ? errors.secondaryCountry
                  : ""
              }
              info
              tooltipTitle=""
              tooltipDescription=""
            />
          )}
          <button
            className="text-sm md:text-base 3xl:text-xl text-primary-500"
            onClick={() =>
              setShowSecondaryPhoneNumber(!showSecondaryPhoneNumber)
            }
          >
            {showSecondaryPhoneNumber
              ? "Hide secondary phone number"
              : "Add secondary phone number"}
          </button>

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

export default PersonalInformationFormMyself;
