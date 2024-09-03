"use client";

import { Form, Formik } from "formik";
import Button from "@repo/ui/button";
import InputField from "@repo/ui/inputField";
import { setNewPasswordValidationSchema } from "@/utils/validationSchema";
import { setNewPasswordInitialValues } from "@/utils/initialValues";
import PasswordChecks from "@/components/PasswordChecks";

export default function ResetPasswordPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-h1 font-medium text-black">Set New Password</h1>
        <p className="text-base text-grey-500">
          Enter your new password below.
        </p>
      </div>

      <Formik
        initialValues={setNewPasswordInitialValues}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(values);
        }}
        validationSchema={setNewPasswordValidationSchema}
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
            isSubmitting,
          } = props;

          return (
            <Form className="space-y-6">
              <PasswordChecks
                label="New Password"
                placeholder="Enter new password"
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
                values={values}
                error={
                  errors.password && touched.password ? errors.password : ""
                }
              />
              <InputField
                name="confirm_password"
                id="confirm_password"
                type="confirm_password"
                label="Confirm Password"
                placeholder="Confirm Password"
                value={values.confirm_password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  errors.confirm_password && touched.confirm_password
                    ? errors.confirm_password
                    : ""
                }
              />

              <Button fullWidth variant="filled" color="primary" type="submit">
                Set Password
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
