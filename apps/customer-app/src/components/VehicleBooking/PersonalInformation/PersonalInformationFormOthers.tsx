import { Formik, Form, useFormikContext } from "formik"; // Import useFormikContext
import { StepperNavigation } from "@repo/ui/stepper";
import InputField from "@repo/ui/inputField";
import { personalInformationOthersSchema } from "@/utils/validationSchema";
import { PersonalInformationOthersValues } from "@/utils/types";
import PhoneNumberAndCountryField from "@repo/ui/phoneNumberAndCountryField";
import {
  getExistingBookingInformation,
  replaceCharactersWithString,
  saveAndUpdateBookingInformation,
} from "@/utils/functions";
import { getCountryCallingCode } from "react-phone-number-input";
import FormRow from "../../FormRow";
import TextArea from "@repo/ui/textarea";
import SelectInput from "@repo/ui/select";
import { tripPurposeOptions } from "@/utils/data";
import { useAppSelector } from "@/lib/hooks";
import { useEffect } from "react"; // Import useEffect for the inner component

type Props = {
  steps: string[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
  vehicleId: string;
  type: "user" | "guest";
  isOthers: boolean; // This prop is controlled from outside
};

const initialValues: PersonalInformationOthersValues = {
  guestName: "",
  guestEmail: "",
  guestPhoneNumber: "",
  country: "NG",
  countryCode: "+234",
  specialInstructions: "",
  tripPurpose: "",

  userEmail: "",
  userPhoneNumber: "",
  userCountry: "NG",
  userCountryCode: "+234",
  isForSelf: false, // Initial value, will be managed by `isOthers` prop
};

const PersonalInformationFormOthers = ({
  steps,
  currentStep,
  setCurrentStep,
  vehicleId,
  type,
  isOthers, // Passed to the inner component
}: Props) => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <Formik
      initialValues={getExistingBookingInformation(
        initialValues,
        vehicleId,
        "personalInformation",
        type === "user" && user ? { ...user } : undefined
      )}
      validationSchema={personalInformationOthersSchema}
      onSubmit={(values, { setSubmitting }) => {
        saveAndUpdateBookingInformation(
          values,
          vehicleId,
          "personalInformation"
        );
        setCurrentStep(currentStep + 1);
        setSubmitting(false);
      }}
      enableReinitialize={true} // Keep this true if initial values might change externally
      validateOnChange={true}
      validateOnBlur={true}
    >
      {/* Render the inner component, passing necessary props */}
      <PersonalInformationFormInner
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        isOthers={isOthers} // Pass isOthers down
      />
    </Formik>
  );
};

interface PersonalInformationFormInnerProps {
  steps: string[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
  isOthers: boolean; // Prop received from the parent Formik component
}

// This new component contains the actual form fields and logic using Formik context
const PersonalInformationFormInner = ({
  steps,
  currentStep,
  setCurrentStep,
  isOthers,
}: PersonalInformationFormInnerProps) => {
  // Access Formik state and helpers using useFormikContext
  const {
    values,
    touched,
    errors,
    isValid,
    handleBlur,
    handleChange,
    setFieldTouched,
    setFieldValue,
    isSubmitting,
  } = useFormikContext<PersonalInformationOthersValues>(); // Ensure correct type is passed

  // THIS IS THE CORRECTED USE OF useEffect, now at the top-level of a functional component
  useEffect(() => {
    // If 'isOthers' changes to true, clear the guest fields and set isForSelf to false
    if (isOthers) {
      setFieldValue("guestName", "");
      setFieldValue("guestEmail", "");
      setFieldValue("guestPhoneNumber", "");
      setFieldValue("isForSelf", false); // Booking for someone else, so not for self
    } else {
      // If 'isOthers' changes to false, set isForSelf to true
      setFieldValue("isForSelf", true); // Booking for self
    }
  }, [isOthers, setFieldValue]); // Depend only on 'isOthers' and setFieldValue

  return (
    <Form className="max-w-[800px] w-full space-y-8">
      {/* Conditionally render guest fields based on the `isOthers` prop */}
      {isOthers && ( // Show these fields if isOthers is true (meaning for someone else)
        <>
          <FormRow>
            <InputField
              name="guestName"
              id="guestName"
              type="text"
              label="Recipient’s full name"
              placeholder="Enter recipient’s full name"
              value={values.guestName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                errors.guestName && touched.guestName
                  ? String(errors.guestName)
                  : ""
              }
            />
            <PhoneNumberAndCountryField
              inputName="guestPhoneNumber"
              selectName="country"
              inputId="guestPhoneNumber"
              selectId="country"
              label="Recipient’s phone number"
              inputPlaceholder="Enter recipient’s phone number"
              selectPlaceholder="+234"
              inputValue={values.guestPhoneNumber}
              selectValue={values.country}
              inputOnChange={(event) => {
                const number = replaceCharactersWithString(event.target.value);
                setFieldTouched("guestPhoneNumber", true);
                setFieldValue("guestPhoneNumber", number);
              }}
              selectOnChange={(value: string) => {
                const countryCode = `+${getCountryCallingCode(value as any)}`;
                setFieldValue("country", value);
                setFieldValue("countryCode", countryCode);
                setFieldValue("userCountry", value);
                setFieldValue("userCountryCode", countryCode);
              }}
              inputOnBlur={handleBlur}
              selectOnBlur={handleBlur}
              selectClassname="!w-[130px]"
              inputError={
                errors.guestPhoneNumber && touched.guestPhoneNumber
                  ? String(errors.guestPhoneNumber)
                  : ""
              }
              selectError={
                errors.country && touched.country ? String(errors.country) : ""
              }
            />
          </FormRow>
          <InputField
            name="guestEmail"
            id="guestEmail"
            type="text"
            label="Recipient’s email"
            placeholder="Enter recipient’s email"
            value={values.guestEmail}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              errors.guestEmail && touched.guestEmail
                ? String(errors.guestEmail)
                : ""
            }
            info
            tooltipTitle=""
            tooltipDescription=""
          />
        </>
      )}

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
            ? String(errors.specialInstructions)
            : ""
        }
        info
        tooltipTitle=""
        tooltipDescription=""
      />

      <SelectInput
        id="tripPurpose"
        label="Trip Purpose"
        placeholder="Select a purpose for this trip"
        variant="outlined"
        options={tripPurposeOptions}
        value={values.tripPurpose}
        onChange={(value: string) => {
          setFieldTouched("tripPurpose", true);
          setFieldValue("tripPurpose", value);
        }}
        error={
          errors.tripPurpose && touched.tripPurpose
            ? String(errors.tripPurpose)
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
            errors.userEmail && touched.userEmail
              ? String(errors.userEmail)
              : ""
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
          selectDisabled
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
          selectClassname="!w-[130px]"
          inputError={
            errors.userPhoneNumber && touched.userPhoneNumber
              ? String(errors.userPhoneNumber)
              : ""
          }
          selectError={
            errors.userCountry && touched.userCountry
              ? String(errors.userCountry)
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
  );
};

export default PersonalInformationFormOthers;
