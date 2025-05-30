"use client";

import Link from "next/link";
import { Form, Formik } from "formik";
import { getCountryCallingCode } from "react-phone-number-input";
import { signUpFormInitialValues } from "@/utils/initialValues";
import { signupFormValidationSchema } from "@/utils/validationSchema";
import * as Yup from "yup";
import useAuth from "@/hooks/useAuth";
import Button from "@repo/ui/button";
import InputField from "@repo/ui/inputField";
import PasswordChecks from "@/components/PasswordChecks";
import AuthPageHeader from "@/components/Header/AuthPageHeader";
import PhoneNumberAndCountryField from "@repo/ui/phoneNumberAndCountryField";
import { replaceCharactersWithString } from "@/utils/functions";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignupComponent() {
  const { signupMutation } = useAuth();
  const searchParams = useSearchParams();
  const [initialValues, setInitialValues] = useState(signUpFormInitialValues);

  // Get the referral code from URL params
  useEffect(() => {
    const codeParam = searchParams.get("code");
    if (codeParam) {
      setInitialValues({
        ...signUpFormInitialValues,
        referralCode: codeParam,
      });
    }
  }, [searchParams]);

  // Custom validation schema that accepts 10-digit phone numbers
  const customValidationSchema = signupFormValidationSchema.shape({
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
  });

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any,
    setFieldTouched: any
  ) => {
    const rawNumber = replaceCharactersWithString(event.target.value);

    // Auto-remove leading 0 if present and limit to 10 digits
    let formattedNumber = rawNumber;

    if (rawNumber.startsWith("0") && rawNumber.length === 11) {
      // Remove leading 0 for 11-digit numbers starting with 0
      formattedNumber = rawNumber.substring(1);
    } else {
      // Limit to 10 digits maximum
      formattedNumber = rawNumber.slice(0, 10);
    }

    setFieldTouched("phoneNumber", true);
    setFieldValue("phoneNumber", formattedNumber);
  };

  const getPhoneNumberPlaceholder = (country: string) => {
    return "Enter 10-digit phone number";
  };

  const getPhoneNumberHelper = (phoneNumber: string) => {
    if (phoneNumber.length === 0) {
      return "Enter your 10-digit phone number";
    }
    if (phoneNumber.length < 10) {
      return `${10 - phoneNumber.length} more digits needed`;
    }
    if (phoneNumber.length === 10) {
      return "Perfect! Your number is ready";
    }
    return "";
  };

  return (
    <div className="space-y-10">
      <AuthPageHeader
        title="Sign Up"
        description="Fuel your next adventure with a ride from Muvment."
      />

      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(values);

          const { password_checks, ...submissionValues } = values;
          signupMutation.mutate(submissionValues);
          setSubmitting(false);
        }}
        validationSchema={customValidationSchema}
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
            <Form className="space-y-6" autoComplete="off">
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
              <div>
                <PhoneNumberAndCountryField
                  inputName="phoneNumber"
                  selectName="country"
                  inputId="phoneNumber"
                  selectId="country"
                  label="Phone Number"
                  inputPlaceholder={getPhoneNumberPlaceholder(values.country)}
                  selectPlaceholder="+234"
                  inputValue={values.phoneNumber}
                  selectValue={values.country}
                  inputOnChange={(event) =>
                    handlePhoneNumberChange(
                      event,
                      setFieldValue,
                      setFieldTouched
                    )
                  }
                  selectOnChange={(value: string) => {
                    const countryCode = `+${getCountryCallingCode(value as any)}`;
                    setFieldValue("country", value);
                    setFieldValue("countryCode", countryCode);
                    // Clear phone number when country changes to avoid format confusion
                    setFieldValue("phoneNumber", "");
                  }}
                  inputOnBlur={handleBlur}
                  selectOnBlur={handleBlur}
                  selectClassname="!w-[130px]"
                  inputError={
                    errors.phoneNumber && touched.phoneNumber
                      ? errors.phoneNumber
                      : ""
                  }
                  selectError={
                    errors.country && touched.country ? errors.country : ""
                  }
                />
                {/* Helper text for better UX */}
                {values.phoneNumber && !errors.phoneNumber && (
                  <p className="text-xs text-grey-500 mt-1 ml-1">
                    {getPhoneNumberHelper(values.phoneNumber)}
                  </p>
                )}
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

              <InputField
                name="referralCode"
                id="referralCode"
                type="text"
                label="Referral code"
                placeholder="Enter referral code"
                value={values.referralCode}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  errors.referralCode && touched.referralCode
                    ? errors.referralCode
                    : ""
                }
              />

              <p className="text-grey-500 text-sm 2xl:text-base">
                Already a user?{" "}
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
        <Link href="/privacy-policy" className="text-black underline">
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link href="/terms-of-service" className="text-black underline">
          Terms of Service
        </Link>
      </p>
    </div>
  );
}
