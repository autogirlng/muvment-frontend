"use client";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { api } from "@/lib/api";
import { updateUserData } from "@/lib/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  setAccountDetails,
  setPhoneNumberToVerify,
  setWithdrawalAccountSetupOtp,
} from "@/lib/features/accountSetupSlice";
import { handleErrors } from "@/utils/functions";
import {
  BankProp,
  ErrorResponse,
  SendPhoneNumberTokenValues,
  VerifyOtpValues,
  VerifyPhoneNumberTokenValues,
  WithdrawalAccountValues,
} from "@/utils/types";

export default function useAccountSetup() {
  const { user } = useAppSelector((state) => state.user);
  const { accountDetails, withdrawalAccountSetupOtp } = useAppSelector(
    (state) => state.accountSetup
  );

  const [bankCodes, setBankCodes] = useState<BankProp[]>([]);
  const [credentialsError, setCredentialsError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const sendPhoneNumberToken = useMutation({
    mutationFn: (values: SendPhoneNumberTokenValues) =>
      api.post("/api/account-setup/sendOtp", values),

    onMutate: (values) => {
      return { phoneNumber: values.phoneNumber };
    },

    onSuccess: (data, _values, context) => {
      console.log("Verify Phone Number successful", data);
      dispatch(setPhoneNumberToVerify(context?.phoneNumber));
      router.push(`/account-setup/verify-number/otp`);
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors("Verify Phone Number", error),
  });

  const resendVerifyPhoneToken = useMutation({
    mutationFn: (values: SendPhoneNumberTokenValues) =>
      api.post("/api/account-setup/sendOtp", values),

    onSuccess: (data) => {
      console.log("Resend Token successful", data);
      toast.success("Token sent successfully");
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors("Resend Verify Phone Token", error),
  });

  const verifyPhoneNumberToken = useMutation({
    mutationFn: (values: VerifyPhoneNumberTokenValues) =>
      api.post("/api/account-setup/verifyOtp", values),

    onSuccess: (data) => {
      console.log("Phone Number Verified Successfully", data);
      toast.success("Phone Number Verified Successfully");
      dispatch(updateUserData({ phoneVerified: true }));
      router.push("/dashboard");
      dispatch(setPhoneNumberToVerify(""));
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors("Verify phone number", error),
  });

  const getAllBankCodes = useMutation({
    mutationFn: () => api.get("/api/withdrawal-account/bankCodes"),

    onSuccess: (data) => {
      console.log("All Bank Codes Fetched Successfully", data.data);
      setBankCodes(data.data);
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors("Error fetching bank codes", error),
  });

  const validateBankAccount = useMutation({
    mutationFn: (values: WithdrawalAccountValues) =>
      api.get(
        `/api/withdrawal-account/validateBank?accountNumber=${values.accountNumber}&bankCode=${values.bankCode}`
      ),

    onSuccess: (data) => {
      console.log("Bank Account Verified Successfully", data.data);
      dispatch(setAccountDetails(data.data));
      sendBankAccountOtp.mutate();
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      setLoading(false);
      setCredentialsError(true);
      handleErrors("Verify Bank Account", error);
    },
  });

  const sendBankAccountOtp = useMutation({
    mutationFn: () => api.get("/api/withdrawal-account/send-otp"),

    onSuccess: (data) => {
      setLoading(false);
      console.log("Bank Account Otp Sent Successfully", data.data);
      router.push(`/account-setup/withdrawal-account/otp`);
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      setLoading(false);
      handleErrors("Send Bank Account Otp", error);
    },
  });

  const verifyBankAccountOtp = useMutation({
    mutationFn: (values: VerifyOtpValues) =>
      api.post("/api/withdrawal-account/verify-otp", values),

    onMutate: (values) => {
      return { token: values.token };
    },
    onSuccess: (data, _values, context) => {
      console.log("Bank Account Otp Verified", data.data);
      dispatch(setWithdrawalAccountSetupOtp(context.token));
      addBankAccount.mutate(accountDetails);
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      setLoading(false);
      handleErrors("Verify Bank Account Otp", error);
    },
  });

  const addBankAccount = useMutation({
    mutationFn: (values: WithdrawalAccountValues) =>
      api.post("/api/withdrawal-account/addWithdrawalAccount", {
        ...values,
        country: user?.country,
        token: withdrawalAccountSetupOtp,
      }),

    onSuccess: (data) => {
      console.log(accountDetails, withdrawalAccountSetupOtp);

      dispatch(
        setAccountDetails({
          accountNumber: "",
          bankCode: "",
          accountName: "",
        })
      );
      dispatch(setWithdrawalAccountSetupOtp(""));
      setLoading(false);
      console.log("Withdrawal Account Added Successfully", data.data);
      toast.success("Withdrawal Account Added Successfully");
      dispatch(updateUserData({ withdrawalAccountVerified: true }));
      router.push(`/account-setup`);
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      {
        setLoading(false);
        handleErrors("Add Withdrawal Account", error);
      }
    },
  });

  return {
    sendPhoneNumberToken,
    resendVerifyPhoneToken,
    verifyPhoneNumberToken,
    validateBankAccount,
    bankCodes,
    getAllBankCodes,
    accountDetails,
    credentialsError,
    setCredentialsError,
    sendBankAccountOtp,
    verifyBankAccountOtp,
    addBankAccount,
    loading,
    setLoading,
    user,
  };
}
