import { Form, Formik } from "formik";
import { getCountryCallingCode } from "react-phone-number-input";
import { verifyPhoneNumberValues } from "@/utils/initialValues";
import { verifyPhoneNumberSchema } from "@/utils/validationSchema";
import Button from "@repo/ui/button";
import PhoneNumberAndCountryField from "@repo/ui/phoneNumberAndCountryField";
import usePhoneNumberVerification from "../hooks/usePhoneNumberVerification";
import { replaceCharactersWithString } from "@/utils/functions";

type Props = {};

export default function VerifyPhoneNumber({}: Props) {
  const { sendPhoneNumberToken } = usePhoneNumberVerification();
  return (
    <Formik
      initialValues={verifyPhoneNumberValues}
      onSubmit={async (values, { setSubmitting }) => {
        console.log(values);
        sendPhoneNumberToken.mutate({ phoneNumber: values.phoneNumber });
        setSubmitting(false);
      }}
      validationSchema={verifyPhoneNumberSchema}
      enableReinitialize={true}
      validateOnChange={true}
      validateOnBlur={true}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          isValid,
          handleBlur,
          setFieldValue,
          setFieldTouched,
          isSubmitting,
        } = props;

        return (
          <Form className="space-y-6 max-w-[375px]">
            <PhoneNumberAndCountryField
              inputName="phoneNumber"
              selectName="country"
              inputId="phoneNumber"
              selectId="country"
              label="Phone Number"
              inputPlaceholder="Enter phone number"
              selectPlaceholder="+234"
              inputValue={values.phoneNumber}
              selectValue={values.country}
              inputOnChange={(event) => {
                const number = replaceCharactersWithString(event.target.value);
                setFieldTouched("phoneNumber", true);
                setFieldValue("phoneNumber", number);
              }}
              selectOnChange={(value: string) => {
                const countryCode = `+${getCountryCallingCode(value as any)}`;
                setFieldValue("country", value);
                setFieldValue("countryCode", countryCode);
              }}
              inputOnBlur={handleBlur}
              selectOnBlur={handleBlur}
              // inputClassname
              selectClassname="!w-[170px]"
              inputError={
                errors.phoneNumber && touched.phoneNumber
                  ? errors.phoneNumber
                  : ""
              }
              selectError={
                errors.country && touched.country ? errors.country : ""
              }
            />

            <Button
              variant="filled"
              color="primary"
              type="submit"
              loading={isSubmitting || sendPhoneNumberToken.isPending}
              disabled={
                isSubmitting || sendPhoneNumberToken.isPending || !isValid
              }
            >
              Verify phone number
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}
