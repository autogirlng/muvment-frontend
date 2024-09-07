"use client";

import { Form, Formik } from "formik";
import Button from "@repo/ui/button";
import InputField from "@repo/ui/inputField";
import { resetPasswordEmailValidationSchema } from "@/utils/validationSchema";
import { resetPasswordEmailInitialValues } from "@/utils/initialValues";
import BackLink from "@/components/BackLink";
import AuthPageHeader from "@/components/Header/AuthPageHeader";

export default function ForgotPasswordPage() {
  return (
    <div className="space-y-8">
      <BackLink backLink="/login" />
      <AuthPageHeader
        title="Reset password"
        description="Enter your email, and we'll send you instructions to regain
          access"
      />

      <Formik
        initialValues={resetPasswordEmailInitialValues}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(values);
        }}
        validationSchema={resetPasswordEmailValidationSchema}
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
            isSubmitting,
          } = props;

          return (
            <Form className="space-y-6">
              <InputField
                name="email"
                id="email"
                type="email"
                label="Email"
                placeholder="Enter email address"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email && touched.email ? errors.email : ""}
              />

              <Button fullWidth variant="filled" color="primary" type="submit">
                Reset Password
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
