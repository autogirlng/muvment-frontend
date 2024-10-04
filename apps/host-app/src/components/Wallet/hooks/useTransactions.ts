"use client";

import { useQuery } from "@tanstack/react-query";
import { Transaction } from "@/utils/types";
import { useAppSelector } from "@/lib/hooks";
import { useHttp } from "@/hooks/useHttp";

type TransactionDataType = {
  data: Transaction[];
  totalCount: number;
};

export default function useTransactions({
  currentPage = 1,
  pageLimit = 10,
}: {
  currentPage: number;
  pageLimit: number;
}) {
  const http = useHttp();

  const { user } = useAppSelector((state) => state.user);

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["getTransactions", currentPage],

    queryFn: () =>
      http.get<TransactionDataType>(
        `/api/transactions?page=${currentPage}&limit=${pageLimit}`
      ),
    enabled: !!user?.id,
  });

  return {
    transactions: data?.data ?? [],
    totalCount: data?.totalCount ?? 0,
    isError,
    error,
    isLoading,
  };
}
