"use client";

import Link from "next/link";
import { Form, Formik } from "formik";
import { signUpFormInitialValues } from "@/utils/initialValues";
import { signupFormValidationSchema } from "@/utils/validationSchema";
import Button from "@repo/ui/button";
import InputField from "@repo/ui/inputField";
import PhoneNumberField from "@repo/ui/phoneNumberField";
import PasswordChecks from "@/components/PasswordChecks";
import AuthPageHeader from "@/components/Header/AuthPageHeader";

export default function SignupPage() {
  return (
    <div className="space-y-10">
      <AuthPageHeader
        title="Become A Host"
        description=" Generate Extra Income with Your Vehicle"
      />

      <Formik
        initialValues={signUpFormInitialValues}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(values);
        }}
        validationSchema={signupFormValidationSchema}
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
            <Form className="space-y-6">
              <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-6">
                <InputField
                  name="first_name"
                  id="first_name"
                  type="first_name"
                  label="First name"
                  placeholder="Enter first name"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    errors.first_name && touched.first_name
                      ? errors.first_name
                      : ""
                  }
                />
                <InputField
                  name="last_name"
                  id="last_name"
                  type="last_name"
                  label="Last name"
                  placeholder="Enter last name"
                  value={values.last_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    errors.last_name && touched.last_name
                      ? errors.last_name
                      : ""
                  }
                />
              </div>
              <PhoneNumberField
                name="phoneNumber"
                id="phoneNumber"
                type="phoneNumber"
                label="Phone Number"
                placeholder="Enter phone number"
                value={values.phoneNumber}
                onChange={(number: any) => {
                  setFieldTouched("phoneNumber", true);
                  setFieldValue("phoneNumber", number);
                }}
                onBlur={handleBlur}
                errors={
                  errors.phoneNumber && touched.phoneNumber
                    ? errors.phoneNumber
                    : ""
                }
              />
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
              <PasswordChecks
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
                values={values}
                error={
                  errors.password && touched.password ? errors.password : ""
                }
              />

              <p className="text-grey-500 text-sm 2xl:text-base">
                Already a host?{" "}
                <Link href="/login" className="text-primary-500">
                  Sign In
                </Link>
              </p>

              <Button fullWidth variant="filled" color="primary" type="submit">
                Sign Up
              </Button>
            </Form>
          );
        }}
      </Formik>
      <p className="!mt-[74px] text-center text-sm text-grey-500">
        By signing up you agree to Muvment&apos;s{" "}
        <Link href="/" className="text-black underline">
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link href="/" className="text-black underline">
          Terms of Service
        </Link>
      </p>
    </div>
  );
}
