"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAppSelector } from "@/lib/hooks";
import { VehicleInformation } from "@/utils/types";
import { useHttp } from "./useHttp";

type ListingDataType = {
  data: VehicleInformation[];
  totalCount: number;
};

export default function useListings({
  currentPage = 1,
  pageLimit = 10,
}: {
  currentPage: number;
  pageLimit: number;
}) {
  const http = useHttp();

  const { user } = useAppSelector((state) => state.user);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["getListings", user?.id, currentPage],

    queryFn: () =>
      http.get<ListingDataType>(
        `/api/listings/host/${user?.id}?page=${currentPage}&limit=${pageLimit}`
      ),
    enabled: !!user?.id,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return {
    listings: data?.data || [],
    totalCount: data?.totalCount || 0,
    isError,
    isLoading,
  };
}
