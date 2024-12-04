"use client";

import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/lib/hooks";
import { useHttp } from "../../../hooks/useHttp";
import { UserReferrals } from "@/utils/types";
import { handleFilterQuery } from "@/utils/functions";

type ReferralsDataType = {
  data: UserReferrals[];
  meta: { total: number };
};

export default function useFetchReferrals({
  currentPage = 1,
  pageLimit = 10,
  filters = {},
}: {
  currentPage: number;
  pageLimit: number;
  filters?: Record<string, string[]>;
}) {
  const http = useHttp();
  const { user } = useAppSelector((state) => state.user);

  const { data, isError, error, isLoading, isSuccess } = useQuery({
    queryKey: ["getReferrals", user?.id, currentPage, filters],
    queryFn: async () =>
      http.get<ReferralsDataType>(
        `/api/referrals?page=${currentPage}&limit=${pageLimit}&${handleFilterQuery({ filters })}`
      ),
    enabled: !!user?.id,
    retry: false,
  });

  return {
    referrals: data?.data || [],
    totalCount: data?.meta.total || 0,
    isError,
    error,
    isLoading,
    isSuccess,
  };
}
