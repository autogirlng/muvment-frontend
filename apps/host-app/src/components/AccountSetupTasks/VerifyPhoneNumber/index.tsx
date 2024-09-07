import { Form, Formik } from "formik";
import { verifyPhoneNumberValues } from "@/utils/initialValues";
import { verifyPhoneNumberSchema } from "@/utils/validationSchema";
import Button from "@repo/ui/button";
import PhoneNumberField from "@repo/ui/phoneNumberField";

type Props = {};

export default function VerifyPhoneNumber({}: Props) {
  return (
    <Formik
      initialValues={verifyPhoneNumberValues}
      onSubmit={async (values, { setSubmitting }) => {
        console.log(values);
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
          dirty,
          handleBlur,
          handleChange,
          setFieldValue,
          setFieldTouched,
          isSubmitting,
        } = props;

        return (
          <Form className="space-y-6 max-w-[375px]">
            <PhoneNumberField
              name="phoneNumber"
              id="phoneNumber"
              type="phoneNumber"
              label="Phone Number"
              placeholder="Enter phone number"
              value={values.phoneNumber}
              onChange={(number: number) => {
                setFieldTouched("phoneNumber", true);
                setFieldValue("phoneNumber", number);
              }}
              onBlur={handleBlur}
              error={
                errors.phoneNumber && touched.phoneNumber
                  ? errors.phoneNumber
                  : ""
              }
            />

            <Button variant="filled" color="primary" type="submit">
              Verify phone number
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}
