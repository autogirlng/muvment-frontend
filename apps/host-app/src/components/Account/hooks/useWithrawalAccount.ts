"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAppSelector } from "@/lib/hooks";
import { ErrorResponse } from "@/utils/types";
import { handleErrors } from "@/utils/functions";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface WithdrawalAccount {
  id: string;
  bankCode: string;
  bankName: string;
  country: string;
  accountNumber: string;
  accountName: string;
  userId: string;
  otpToken: null;
  otpExpiry: null;
  createdAt: string;
  updatedAt: string;
}

export default function useWithrawalAccount() {
  const { user } = useAppSelector((state) => state.user);

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [withdrawalAccountDetails, setWithdrawalAccountDetails] =
    useState<WithdrawalAccount | null>(null);

  const handleOpenDeleteModal = () => setOpenDeleteModal(!openDeleteModal);

  const { data, isError, error, isLoading, isSuccess } = useQuery({
    queryKey: ["getAccountDetails", user?.id],

    queryFn: () => api.get(`/api/withdrawal-account`),
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (isSuccess) {
      console.log("withdrawal account details fetched successfully", data.data);
      setWithdrawalAccountDetails(data?.data);
    }

    if (isError) {
      handleErrors(
        "Error fetching withdrawal account details",
        error as AxiosError<ErrorResponse>
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess]);

  const deleteBankAccount = useMutation({
    mutationFn: () => api.delete("/api/withdrawal-account"),

    onSuccess: (data) => {
      console.log("Withdrawal Account deleted Successfully", data.data);

      setWithdrawalAccountDetails(null);
      toast.success("Account deleted successfully ");
      //       dispatch(updateUserData({ withdrawalAccountVerified: true }));
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      handleErrors("deleted Withdrawal Account", error);
    },
  });

  return {
    withdrawalAccountDetails,
    isError,
    error,
    isLoading,

    deleteBankAccount,
    openDeleteModal,
    handleOpenDeleteModal,
  };
}
