"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAppSelector } from "@/lib/hooks";
import { BookingInformation, VehicleInformation } from "@/utils/types";
import { handleFilterQuery } from "@/utils/functions";
import { useHttp } from "@/hooks/useHttp";

type ExploreDataType = {
  data: VehicleInformation[];
  totalCount: number;
};

export default function useExploreListings({
  currentPage = 1,
  pageLimit = 10,
  search = "",
  filters = {},
  type = "all",
}: {
  currentPage: number;
  pageLimit: number;
  search?: string;
  filters?: Record<string, string[] | number[]>;
  type: "top-rated" | "all" | "search";
}) {
  const http = useHttp();

  const { data, isError, error, isLoading, isSuccess } = useQuery({
    queryKey: ["getListings", currentPage, JSON.stringify(filters)],

    queryFn: async () =>
      http.get<ExploreDataType>(
        type === "top-rated"
          ? `/api/listings/top-rated?page=${currentPage}&limit=${pageLimit}&${handleFilterQuery({ filters })}`
          : `/api/listings?page=${currentPage}&limit=${pageLimit}&${handleFilterQuery({ filters })}`
      ),

    retry: false,
  });

  return {
    listings: data?.data || [],
    totalCount: data?.totalCount || 0,
    isError,
    error,
    isLoading,
    isSuccess,
  };
}
