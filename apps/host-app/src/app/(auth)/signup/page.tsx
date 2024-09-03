"use client";

import cn from "classnames";
import Link from "next/link";
import { Form, Formik } from "formik";
import { EyeSlash, Eye, CheckCircle } from "@phosphor-icons/react";
import {
  isDigitValid,
  isLengthValid,
  isLowerCaseValid,
  isSpaceValid,
  isSpecialCharacterValid,
  isUpperCaseValid,
} from "@/utils/functions";
import { passwordChecks } from "@/utils/constants";
import { signUpFormInitialValues } from "@/utils/initialValues";
import { signupFormValidationSchema } from "@/utils/validationSchema";
import Button from "@repo/ui/button";
import InputField from "@repo/ui/inputField";
import PhoneNumberField from "@repo/ui/phoneNumberField";
import usePasswordValidation from "@/hooks/usePasswordValidation";
import PasswordChecks from "@/components/PasswordChecks";

export default function SignupPage() {
  const { isPasswordHidden, toggleHiddenPassword } = usePasswordValidation();

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <h1 className="text-h1 font-medium text-black">Become A Host</h1>
        <p className="text-base text-grey-500">
          Generate Extra Income with Your Vehicle
        </p>
      </div>

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
            isSubmitting,
          } = props;

          return (
            <Form className="space-y-6">
              <div className="flex gap-6">
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
                name="phone_number"
                id="phone_number"
                type="phone_number"
                label="Phone Number"
                placeholder="Enter phone number"
                value={values.phone_number}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  errors.phone_number && touched.phone_number
                    ? errors.phone_number
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

              <p className="text-grey-500 text-base">
                Already a host?{" "}
                <Link href="/login" className="text-base text-primary-500">
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
