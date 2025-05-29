"use client";

import { Form, Formik } from "formik";
import { EyeSlash, Eye } from "@phosphor-icons/react";
import Link from "next/link";
import Button from "@repo/ui/button";
import InputField from "@repo/ui/inputField";
import usePasswordValidation from "@/hooks/usePasswordValidation";
import { loginFormValidationSchema } from "@/utils/validationSchema";
import { loginFormInitialValues } from "@/utils/initialValues";
import AuthPageHeader from "@/components/Header/AuthPageHeader";
import useAuth from "@/hooks/useAuth";
import * as Yup from "yup";

export default function LoginPage() {
  const { isPasswordHidden, toggleHiddenPassword } = usePasswordValidation();

  const { loginMutation } = useAuth();

  // Custom validation schema with proper email and password validation
  const customValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const getEmailHelper = (email: string, error: string, touched: boolean) => {
    if (!email || !touched) return "";
    if (error) return "";
    if (validateEmail(email)) {
      return "✓ Valid email address";
    }
    return "Please enter a valid email address";
  };

  const getPasswordHelper = (
    password: string,
    error: string,
    touched: boolean
  ) => {
    if (!password || !touched) return "";
    if (error) return "";
    if (password.length >= 6) {
      return "✓ Password looks good";
    }
    return "Password must be at least 6 characters";
  };

  const isFormValid = (values: any, errors: any) => {
    const hasValidEmail = values.email && validateEmail(values.email);
    const hasValidPassword = values.password && values.password.length >= 6;
    const hasNoErrors = Object.keys(errors).length === 0;

    return hasValidEmail && hasValidPassword && hasNoErrors;
  };

  return (
    <div className="space-y-8">
      <AuthPageHeader
        title="Welcome back"
        description="Log in to pick up where you left off."
      />

      <Formik
        initialValues={loginFormInitialValues}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          loginMutation.mutate(values);
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
            isSubmitting,
          } = props;

          const formIsValid = isFormValid(values, errors);

          return (
            <Form className="space-y-6">
              <div>
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
                {/* Email helper text */}
                {values.email && !errors.email && (
                  <p
                    className={`text-xs mt-1 ml-1 ${
                      validateEmail(values.email)
                        ? "text-green-600"
                        : "text-amber-600"
                    }`}
                  >
                    {getEmailHelper(
                      values.email ?? "",
                      errors.email ?? "",
                      touched.email ?? false
                    )}
                  </p>
                )}
              </div>

              <div>
                <InputField
                  name="password"
                  id="password"
                  type={isPasswordHidden ? "password" : "text"}
                  label="Password"
                  placeholder="Enter password"
                  icon={
                    isPasswordHidden ? (
                      <Eye size={20} fill="inherit" />
                    ) : (
                      <EyeSlash size={20} fill="inherit" />
                    )
                  }
                  value={values.password}
                  toggleShowPassword={toggleHiddenPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    errors.password && touched.password ? errors.password : ""
                  }
                />
                {/* Password helper text */}
                {values.password && !errors.password && (
                  <p
                    className={`text-xs mt-1 ml-1 ${
                      values.password.length >= 6
                        ? "text-green-600"
                        : "text-amber-600"
                    }`}
                  >
                    {getPasswordHelper(
                      values.password ?? "",
                      errors.password ?? "",
                      touched.password ?? false
                    )}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between text-sm 2xl:text-base">
                <p className="text-grey-500">
                  Not a user?{" "}
                  <Link href="/signup" className="text-primary-500">
                    Sign Up
                  </Link>
                </p>
                <Link href="/forgot-password" className="text-primary-500">
                  Forgot password?
                </Link>
              </div>

              <Button
                fullWidth
                variant="filled"
                color="primary"
                type="submit"
                loading={isSubmitting || loginMutation.isPending}
                disabled={
                  isSubmitting ||
                  loginMutation.isPending ||
                  !formIsValid ||
                  !values.email ||
                  !values.password
                }
              >
                Sign In
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
