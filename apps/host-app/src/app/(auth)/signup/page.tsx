"use client";

import cn from "classnames";
import en from "react-phone-number-input/locale/en";
import Link from "next/link";
import { Form, Formik } from "formik";
import { getCountryCallingCode } from "react-phone-number-input";
import { signUpFormInitialValues } from "@/utils/initialValues";
import { signupFormValidationSchema } from "@/utils/validationSchema";
import useAuth from "@/hooks/useAuth";
import Button from "@repo/ui/button";
import InputField from "@repo/ui/inputField";
import SelectCountry from "@repo/ui/selectCountry";
import PhoneNumberField from "@repo/ui/phoneNumberField";
import PasswordChecks from "@/components/PasswordChecks";
import AuthPageHeader from "@/components/Header/AuthPageHeader";

export default function SignupPage() {
  const { signupMutation } = useAuth();

  return (
    <div className="space-y-10">
      <AuthPageHeader
        title="Become A Host"
        description=" Generate Extra Income with Your Vehicle"
      />

      <Formik
        initialValues={signUpFormInitialValues}
        onSubmit={async (values, { setSubmitting }) => {
          const { password_checks, ...submissionValues } = values;
          signupMutation.mutate(submissionValues);
          setSubmitting(false);
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
                  name="firstName"
                  id="firstName"
                  type="text"
                  label="First name"
                  placeholder="Enter first name"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    errors.firstName && touched.firstName
                      ? errors.firstName
                      : ""
                  }
                />
                <InputField
                  name="lastName"
                  id="lastName"
                  type="text"
                  label="Last name"
                  placeholder="Enter last name"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    errors.lastName && touched.lastName ? errors.lastName : ""
                  }
                />
              </div>
              <div
                className={cn(
                  "flex gap-1 items-end",
                  errors.country || (errors.phoneNumber && "pb-5")
                )}
              >
                <SelectCountry
                  labels={en}
                  name="country"
                  id="country"
                  type="text"
                  label="Phone Number"
                  placeholder="+234"
                  value={values.country}
                  onChange={(value: string) => {
                    const countryCode = `+${getCountryCallingCode(value as any)}`;
                    // setFieldTouched("country", true);
                    setFieldValue("country", value);
                    setFieldValue("countryCode", countryCode);
                    setFieldValue("phoneNumber", countryCode);
                  }}
                  onBlur={handleBlur}
                  error={
                    errors.country && touched.country ? errors.country : ""
                  }
                  className="!w-[150px]"
                />
                <PhoneNumberField
                  name="phoneNumber"
                  id="phoneNumber"
                  type="text"
                  placeholder="Enter phone number"
                  value={values.phoneNumber}
                  onChange={(number: any) => {
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
              </div>

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

              <Button
                fullWidth
                variant="filled"
                color="primary"
                type="submit"
                loading={isSubmitting || signupMutation.isPending}
                disabled={
                  isSubmitting ||
                  signupMutation.isPending ||
                  !isValid ||
                  !values.password_checks?.digit ||
                  !values.password_checks?.length ||
                  !values.password_checks?.lowercase_letters ||
                  !values.password_checks?.no_space ||
                  !values.password_checks?.special_character ||
                  !values.password_checks?.uppercase_letters
                }
              >
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
