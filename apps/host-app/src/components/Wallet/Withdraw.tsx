import { Form, Formik } from "formik";
import Button from "@repo/ui/button";
import InputField from "@repo/ui/inputField";
import { verifyIdentityValues, withdrawalValues } from "@/utils/initialValues";
import {
  verifyIdentitySchema,
  withdrawalSchema,
} from "@/utils/validationSchema";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { parse } from "path";

type Props = {
  handleModal: (open: boolean) => void;
  handleWithdrawal: (amount: number) => void;
  isLoading: boolean;
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
};

const Withdraw = ({
  handleModal,
  handleWithdrawal,
  isLoading,
  amount,
  setAmount,
}: Props) => {
  return (
    <Formik
      initialValues={withdrawalValues}
      onSubmit={async (values, { setSubmitting }) => {
        console.log(values);
        handleWithdrawal(amount);
      }}
      validationSchema={withdrawalSchema}
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
            <h6 className="text-base sm:text-xl 3xl:text-h6 !font-semibold text-grey-800">
              Withdraw Funds
            </h6>
            <p className="text-xs sm:text-sm 3xl:text-base text-grey-500">
              Please note, a minimum balance of 20,000 NGN is required to
              initiate a withdrawal.
            </p>
            <InputField
              name="amount"
              id="amount"
              type="amount"
              label="Withdrawal Amount"
              placeholder="Enter amount to withdraw"
              value={values.amount}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                handleChange(event);
                setAmount(parseInt(event.target.value));
              }}
              onBlur={handleBlur}
              error={errors.amount && touched.amount ? errors.amount : ""}
            />

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                fullWidth
                variant="filled"
                color="white"
                className="!py-4 !bg-grey-90 !text-grey-700"
                onClick={() => handleModal(false)}
              >
                Cancel
              </Button>

              <Button
                fullWidth
                variant="filled"
                color="primary"
                type="submit"
                className="!py-4"
                loading={isLoading}
                disabled={isLoading}
                //    onClick={() => handleDelete()}
              >
                Continue
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Withdraw;
