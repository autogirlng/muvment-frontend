"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { ErrorResponse, WithdrawalValues } from "@/utils/types";
import { handleErrors } from "@/utils/functions";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { setTransactions } from "@/lib/features/transactionsSlice";

export default function useWallet() {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.user);

  const [otp, setOtp] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageLimit = 10;

  const { data, isError, error, isLoading, isSuccess } = useQuery({
    queryKey: ["getWalletDetails", user?.id, currentPage],

    queryFn: () =>
      api.get(`/api/transactions?page=${currentPage}&limit=${pageLimit}`),
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (isSuccess) {
      console.log("transaction details fetched successfully", data.data);
      dispatch(
        setTransactions({
          transactions: data?.data?.data,
          totalItemsCount: data?.data?.totalCount,
          totalPagesCount: data?.data?.totalPages,
        })
      );
    }

    if (isError) {
      handleErrors(
        "Error fetching transaction details",
        error as AxiosError<ErrorResponse>
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess]);

  const [openWithdrawModal, setOpenWithdrawalModal] = useState<boolean>(false);
  const [openVerifyOtpModal, setOpenVerifyOtp] = useState<boolean>(false);
  const handleVerifyOtpModal = () => {
    setOpenVerifyOtp(!openVerifyOtpModal);
  };
  const handleWithdrawModal = () => {
    setOpenWithdrawalModal(!openWithdrawModal);
  };

  const sendOtp = useMutation({
    mutationFn: () => api.get("/api/payment/send-otp"),

    onSuccess: (data) => {
      console.log("send withdrawal token Successful", data.data);
      toast.success("Otp has been sent to your mail");
      setOpenVerifyOtp(true);
      setOpenWithdrawalModal(false);
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      handleErrors("send withdrawal token", error);
    },
  });

  const verifyOtp = useMutation({
    mutationFn: (token: string) =>
      api.post("/api/payment/verify-otp", { token }),

    onMutate: (values) => {
      return { token: values };
    },

    onSuccess: (data, _values, context) => {
      console.log("verify withdrawal token Successful", data.data);
      withdrawFunds.mutate(context.token);
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      handleErrors("verify withdrawal token", error);
    },
  });

  const withdrawFunds = useMutation({
    mutationFn: (token: string) =>
      api.post("/api/payment/disburse", { token, amount }),

    onSuccess: (data) => {
      console.log("withdrawal Successfully", data.data);
      toast.success("Withdrawal Request Submitted successfully");
      setOpenVerifyOtp(false);
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      handleErrors("withdrawal", error);
      setOpenVerifyOtp(false);
    },
  });

  return {
    transactionDetails: data?.data?.data,
    isError,
    error,
    isLoading,

    currentPage,
    setCurrentPage,
    pageLimit,

    withdrawFunds,
    sendOtp,
    verifyOtp,
    amount,
    setAmount,
    otp,
    setOtp,

    openWithdrawModal,
    handleWithdrawModal,
    openVerifyOtpModal,
    handleVerifyOtpModal,
  };
}
