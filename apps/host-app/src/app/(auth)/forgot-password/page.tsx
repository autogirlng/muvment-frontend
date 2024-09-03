"use client";

import { Form, Formik } from "formik";
import Link from "next/link";
import Button from "@repo/ui/button";
import InputField from "@repo/ui/inputField";
import { CaretLeft } from "@phosphor-icons/react";
import { resetPasswordEmailValidationSchema } from "@/utils/validationSchema";
import { resetPasswordEmailInitialValues } from "@/utils/initialValues";

export default function ForgotPasswordPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-0.5 text-primary-500 fill-primary-500">
        <CaretLeft size={18} fill="inherit" />
        <Link href="/login" className="text-base font-medium">
          Back
        </Link>
      </div>
      <div className="space-y-3">
        <h1 className="text-h1 font-medium text-black">Reset password</h1>
        <p className="text-base text-grey-500">
          Enter your email, and we&apos;ll send you instructions to regain
          access
        </p>
      </div>

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
