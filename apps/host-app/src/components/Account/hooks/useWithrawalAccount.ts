"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { ErrorResponse } from "@/utils/types";
import { handleErrors } from "@/utils/functions";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useHttp } from "@/hooks/useHttp";

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
  const http = useHttp();
  const queryClient = useQueryClient();

  const { user } = useAppSelector((state) => state.user);

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const handleOpenDeleteModal = () => setOpenDeleteModal(!openDeleteModal);

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["getAccountDetails"],

    queryFn: () => http.get<WithdrawalAccount>(`/api/withdrawal-account`),
    enabled: !!user?.id,
    retry: 1,
  });

  const deleteBankAccount = useMutation({
    mutationFn: () => http.delete("/api/withdrawal-account"),

    onSuccess: (data) => {
      console.log("Withdrawal Account deleted Successfully", data);

      queryClient.invalidateQueries({
        queryKey: ["getAccountDetails"],
      });

      toast.success("Account deleted successfully ");
      handleOpenDeleteModal();
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      handleErrors(error, "deleted Withdrawal Account");
    },
  });

  return {
    withdrawalAccountDetails: isError ? null : data,
    isError,
    error,
    isLoading,

    deleteBankAccount,
    openDeleteModal,
    handleOpenDeleteModal,
  };
}
