import { Formik, Form } from "formik";
import { StepperNavigation } from "@repo/ui/stepper";
import InputField from "@repo/ui/inputField";
import { personalInformationSchema } from "@/utils/validationSchema";
import { PersonalInformationOthersValues } from "@/utils/types";
import PhoneNumberAndCountryField from "@repo/ui/phoneNumberAndCountryField";
import { replaceCharactersWithString } from "@/utils/functions";
import { getCountryCallingCode } from "react-phone-number-input";
import { useState } from "react";
import FormRow from "../FormRow";
import TextArea from "@repo/ui/textarea";
import SelectInput from "@repo/ui/select";

type Props = {
  steps: string[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
};

const initialValues: PersonalInformationOthersValues = {
  recipientsFullName: "",
  recipientsEmail: "",
  recipientsPhoneNumber: "",
  recipientsCountry: "NG",
  recipientsCountryCode: "+234",
  specialInstructions: "",
  tripPurpose: "",
  userEmail: "",
  userPhoneNumber: "",
  userCountry: "NG",
  userCountryCode: "+234",
};

const PersonalInformationFormOthers = ({
  steps,
  currentStep,
  setCurrentStep,
}: Props) => {
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
          <FormRow>
            <InputField
              name="recipientsFullName"
              id="recipientsFullName"
              type="text"
              label="Recipient’s full name"
              placeholder="Enter recipient’s full name"
              value={values.recipientsFullName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                errors.recipientsFullName && touched.recipientsFullName
                  ? errors.recipientsFullName
                  : ""
              }
            />
            <PhoneNumberAndCountryField
              inputName="recipientsPhoneNumber"
              selectName="recipientsCountry"
              inputId="recipientsPhoneNumber"
              selectId="recipientsCountry"
              label="Recipient’s phone number"
              inputPlaceholder="Enter recipient’s phone number"
              selectPlaceholder="+234"
              inputValue={values.recipientsPhoneNumber}
              selectValue={values.recipientsCountry}
              inputOnChange={(event) => {
                const number = replaceCharactersWithString(event.target.value);
                setFieldTouched("recipientsPhoneNumber", true);
                setFieldValue("recipientsPhoneNumber", number);
              }}
              selectOnChange={(value: string) => {
                const countryCode = `+${getCountryCallingCode(value as any)}`;
                setFieldValue("recipientsCountry", value);
                setFieldValue("recipientsCountryCode", countryCode);
              }}
              inputOnBlur={handleBlur}
              selectOnBlur={handleBlur}
              // inputClassname
              selectClassname="!w-[130px]"
              inputError={
                errors.recipientsPhoneNumber && touched.recipientsPhoneNumber
                  ? errors.recipientsPhoneNumber
                  : ""
              }
              selectError={
                errors.recipientsCountry && touched.recipientsCountry
                  ? errors.recipientsCountry
                  : ""
              }
            />
          </FormRow>
          <InputField
            name="recipientsEmail"
            id="recipientsEmail"
            type="text"
            label="Recipient’s email"
            placeholder="Enter recipient’s email"
            value={values.recipientsEmail}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              errors.recipientsEmail && touched.recipientsEmail
                ? errors.recipientsEmail
                : ""
            }
            info
            tooltipTitle=""
            tooltipDescription=""
          />

          <TextArea
            name="specialInstructions"
            id="specialInstructions"
            type="text"
            label="Special Instructions(optional)"
            placeholder={`e.g I would appreciate a full tank before pickup ready for me to start my trip with 
thank you.`}
            value={values.specialInstructions}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              errors.specialInstructions && touched.specialInstructions
                ? errors.specialInstructions
                : ""
            }
            info
            tooltipTitle=""
            tooltipDescription=""
          />

          <SelectInput
            id="tripPurpose"
            label="Trip Purpose(optional)"
            placeholder="Select a purpose for this trip"
            variant="outlined"
            options={[{ option: "Black", value: "Black" }]}
            value={values.tripPurpose}
            onChange={(value: string) => {
              setFieldTouched("tripPurpose", true);
              setFieldValue("tripPurpose", value);
            }}
            error={
              errors.tripPurpose && touched.tripPurpose
                ? errors.tripPurpose
                : ""
            }
            info
            tooltipTitle=""
            tooltipDescription=""
          />

          <FormRow>
            <InputField
              name="userEmail"
              id="userEmail"
              type="text"
              label="Your email"
              placeholder="Enter your email"
              value={values.userEmail}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                errors.userEmail && touched.userEmail ? errors.userEmail : ""
              }
              info
              tooltipTitle=""
              tooltipDescription=""
            />
            <PhoneNumberAndCountryField
              inputName="userPhoneNumber"
              selectName="secondaryCountry"
              inputId="userPhoneNumber"
              selectId="secondaryCountry"
              label="Your phone number"
              inputPlaceholder="Enter your phone number"
              selectPlaceholder="+234"
              inputValue={values.userPhoneNumber}
              selectValue={values.userCountry}
              inputOnChange={(event) => {
                const number = replaceCharactersWithString(event.target.value);
                setFieldTouched("userPhoneNumber", true);
                setFieldValue("userPhoneNumber", number);
              }}
              selectOnChange={(value: string) => {
                const countryCode = `+${getCountryCallingCode(value as any)}`;
                setFieldValue("userCountry", value);
                setFieldValue("userCountryCode", countryCode);
              }}
              inputOnBlur={handleBlur}
              selectOnBlur={handleBlur}
              // inputClassname
              selectClassname="!w-[130px]"
              inputError={
                errors.userPhoneNumber && touched.userPhoneNumber
                  ? errors.userPhoneNumber
                  : ""
              }
              selectError={
                errors.userCountry && touched.userCountry
                  ? errors.userCountry
                  : ""
              }
              info
              tooltipTitle=""
              tooltipDescription=""
            />
          </FormRow>

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

export default PersonalInformationFormOthers;
