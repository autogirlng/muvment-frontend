import { useEffect } from "react";
import { Form, Formik } from "formik";
import { withdrawalAccountValues } from "@/utils/initialValues";
import { withdrawalAccountSchema } from "@/utils/validationSchema";
import { BankProp } from "@/utils/types";
import Button from "@repo/ui/button";
import InputField from "@repo/ui/inputField";
import SelectSearchInput from "@repo/ui/searchSelectInput";
import Icons from "@repo/ui/icons";
import useSetupWithdrawalAccount from "../hooks/useSetupWithdrawalAccount";

type Props = {};

export default function SetupWithdrawalAccount({}: Props) {
  const {
    credentialsError,
    accountDetails,
    bankCodes,
    isLoading,
    validateBankAccount,
    setCredentialsError,
    loading,
    setLoading,
  } = useSetupWithdrawalAccount();

  return (
    <Formik
      initialValues={withdrawalAccountValues}
      onSubmit={async (values, { setSubmitting }) => {
        console.log(values);
        setLoading(true);
        setCredentialsError(false);
        validateBankAccount.mutate(values);
        setSubmitting(false);
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
          handleBlur,
          handleChange,
          setFieldValue,
          setFieldTouched,
          isSubmitting,
        } = props;

        return (
          <Form className="space-y-6 max-w-[375px]">
            <SelectSearchInput
              placeholder="Select Bank"
              variant="outlined"
              label="Bank"
              id="bank"
              banks={bankCodes}
              isLoading={isLoading}
              value={values.bank}
              onChange={(bank: BankProp) => {
                setFieldTouched("bank", true);
                setFieldValue("bank", bank);
                setFieldValue("bankCode", bank?.code);
              }}
              error={errors.bankCode && touched.bankCode ? errors.bankCode : ""}
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

              {credentialsError && (
                <p className="text-base md:text-lg 2xl:text-h6 text-error-500">
                  Invalid credentials
                </p>
              )}
              {accountDetails.accountName && (
                <p className="flex items-center gap-2 text-base md:text-lg 2xl:text-h6 text-success-600">
                  {Icons.ic_check_circle}{" "}
                  <span>{accountDetails.accountName}</span>
                </p>
              )}
            </div>

            <Button
              variant="filled"
              color="primary"
              type="submit"
              loading={isSubmitting || loading}
              disabled={isSubmitting || loading || !isValid}
            >
              Add Bank
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}
