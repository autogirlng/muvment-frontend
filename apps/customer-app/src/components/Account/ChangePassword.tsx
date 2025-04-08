import { Form, Formik } from "formik";
import { changePasswordInitialValues } from "@/utils/initialValues";
import { changePasswordValidationSchema } from "@/utils/validationSchema";
import PasswordChecks from "@/components/PasswordChecks";
import Button from "@repo/ui/button";
import InputField from "@repo/ui/inputField";
import usePasswordValidation from "@/hooks/usePasswordValidation";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { useState } from "react";
import useChangePassword from "./hooks/useChangePassword";

export default function ChangePassword() {
  const {
    isPasswordHidden,
    toggleHiddenPassword,
    isCurrentPasswordHidden,
    toggleCurrentHiddenPassword,
  } = usePasswordValidation();

  const { changePassword } = useChangePassword();
  const [showChecks, setShowChecks] = useState(true);

  return (
    <Formik
      initialValues={changePasswordInitialValues}
      onSubmit={async (values, { setSubmitting }) => {
        console.log(values);

        const { password_checks, ...submissionValues } = values;
        changePassword.mutate(submissionValues);

        setSubmitting(false);
        setShowChecks(false);
      }}
      validationSchema={changePasswordValidationSchema}
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
          <Form className="space-y-6 max-w-[400px]">
            <InputField
              name="currentPassword"
              id="currentPassword"
              type={isCurrentPasswordHidden ? "password" : "text"}
              label="Current Password"
              placeholder="Enter current password"
              value={values.currentPassword}
              icon={
                isCurrentPasswordHidden ? (
                  <Eye size={20} fill="inherit" />
                ) : (
                  <EyeSlash size={20} fill="inherit" />
                )
              }
              onChange={handleChange}
              onBlur={handleBlur}
              toggleShowPassword={toggleCurrentHiddenPassword}
              error={
                errors.currentPassword && touched.currentPassword
                  ? errors.currentPassword
                  : ""
              }
            />

            <PasswordChecks
              label="New Password"
              placeholder="Enter new password"
              handleChange={handleChange}
              handleBlur={handleBlur}
              setFieldValue={setFieldValue}
              values={values}
              error={errors.password && touched.password ? errors.password : ""}
              showChecks={showChecks}
            >
              <InputField
                name="confirmPassword"
                id="confirmPassword"
                type={isPasswordHidden ? "password" : "text"}
                label="Confirm Password"
                placeholder="re-enter new password"
                value={values.confirmPassword}
                icon={
                  isPasswordHidden ? (
                    <Eye size={20} fill="inherit" />
                  ) : (
                    <EyeSlash size={20} fill="inherit" />
                  )
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                  setShowChecks(true);
                }}
                onBlur={handleBlur}
                toggleShowPassword={toggleHiddenPassword}
                error={
                  errors.confirmPassword && touched.confirmPassword
                    ? errors.confirmPassword
                    : ""
                }
              />
            </PasswordChecks>

            <Button
              fullWidth
              variant="filled"
              color="primary"
              type="submit"
              loading={isSubmitting}
              disabled={
                isSubmitting ||
                !isValid ||
                !values.password_checks?.digit ||
                !values.password_checks?.length ||
                !values.password_checks?.lowercase_letters ||
                !values.password_checks?.no_space ||
                !values.password_checks?.special_character ||
                !values.password_checks?.uppercase_letters
              }
            >
              Confirm password
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}
