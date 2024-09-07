import React from "react";
import { Form, Formik } from "formik";
import Button from "@repo/ui/button";
import InputField from "@repo/ui/inputField";
import SelectInput from "@repo/ui/select";
import { withdrawalAccountValues } from "@/utils/initialValues";
import { withdrawalAccountSchema } from "@/utils/validationSchema";
import Icons from "@repo/ui/icons";

type Props = {};

export default function SetupWithdrawalAccount({}: Props) {
  const [credentialsError, setCredentialsError] =
    React.useState<boolean>(false);
  const [accountName, setAccountName] = React.useState<string>("");

  return (
    <Formik
      initialValues={withdrawalAccountValues}
      onSubmit={async (values, { setSubmitting }) => {
        console.log(values);
      }}
      validationSchema={withdrawalAccountSchema}
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
            <SelectInput
              placeholder="Select Bank"
              variant="outlined"
              label="Bank"
              id="bank"
              options={[{ value: "access", option: "Access Bank" }]}
              value={values.bank}
              onChange={(value: string) => {
                setFieldTouched("bank", true);
                setFieldValue("bank", value);
              }}
              error={errors.bank && touched.bank ? errors.bank : ""}
            />
            <div className="space-y-4">
              <InputField
                name="accountNumber"
                id="accountNumber"
                type="accountNumber"
                label="Account Number"
                placeholder="Enter Account Number"
                value={values.accountNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  errors.accountNumber && touched.accountNumber
                    ? errors.accountNumber
                    : ""
                }
              />

              {/* add loader here */}
              {credentialsError && (
                <p className="text-base md:text-lg 2xl:text-h6 text-error-500">
                  Invalid credentials
                </p>
              )}
              {accountName && (
                <p className="flex items-center gap-2 text-base md:text-lg 2xl:text-h6 text-success-600">
                  {Icons.ic_check} <span>Mamudu Jeffrey</span>
                </p>
              )}
            </div>

            <Button variant="filled" color="primary" type="submit">
              Add Bank
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}
