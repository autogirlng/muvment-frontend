"use client";

import { useQuery } from "@tanstack/react-query";
import { useHttp } from "@/hooks//useHttp";
import { useAppSelector } from "@/lib/hooks";
import { VehicleInformation } from "@/utils/types";
import { handleFilterQuery } from "@/utils/functions";

type ListingDataType = {
  data: VehicleInformation[];
  totalCount: number;
};

export default function useListings({
  currentPage = 1,
  pageLimit = 10,
  filters = {},
  search = "",
}: {
  currentPage: number;
  pageLimit: number;
  filters?: Record<string, string[]>;
  search?: string;
}) {
  const http = useHttp();
  const { user } = useAppSelector((state) => state.user);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["getListings", user?.id, currentPage, filters, search],

    queryFn: () =>
      http.get<ListingDataType>(
        `/api/listings/host/${user?.id}?page=${currentPage}&limit=${pageLimit}&${handleFilterQuery({ filters, search })}`
      ),
    enabled: !!user?.id,
    retry: false,
  });

  return {
    listings: data?.data || [],
    totalCount: data?.totalCount || 0,
    isError,
    isLoading,
  };
}
