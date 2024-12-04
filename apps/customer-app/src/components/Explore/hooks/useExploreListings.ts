"use client";

import { useQuery } from "@tanstack/react-query";
import { VehicleInformation } from "@/utils/types";
import { handleFilterQuery } from "@/utils/functions";
import { useHttp } from "@/hooks/useHttp";

type ExploreDataType = {
  data: VehicleInformation[];
  totalCount: number;
};

export default function useExploreListings({
  currentPage = 1,
  pageLimit = 10,
  filters = {},
  type = "all",
  search = "",
  fromDate = "",
  untilDate = "",
  fromTime = "",
  untilTime = "",
  location = "",
}: {
  currentPage: number;
  pageLimit: number;
  filters?: Record<string, string[] | number[]>;
  type: "top-rated" | "all" | "search";
  search?: string;
  fromDate?: string;
  untilDate?: string;
  fromTime?: string;
  untilTime?: string;
  location?: string;
}) {
  const http = useHttp();

  const { data, isError, error, isLoading, isSuccess } = useQuery({
    queryKey: [
      "getListings",
      currentPage,
      JSON.stringify(filters),
      search,
      fromDate,
      untilDate,
      fromTime,
      untilTime,
      location,
    ],

    queryFn: async () =>
      http.get<ExploreDataType>(
        type === "search"
          ? `/api/listings?page=${currentPage}&limit=${pageLimit}&${handleFilterQuery(
              { filters, search, fromDate, untilDate, fromTime, untilTime }
            )}`
          : type === "top-rated"
            ? `/api/listings/top-rated?page=${currentPage}&limit=${pageLimit}&${handleFilterQuery({ filters })}`
            : `/api/listings?page=${currentPage}&limit=${pageLimit}&${handleFilterQuery({ filters, location })}`
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
