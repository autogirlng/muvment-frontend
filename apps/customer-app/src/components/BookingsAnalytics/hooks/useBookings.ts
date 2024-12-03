"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAppSelector } from "@/lib/hooks";
import { useHttp } from "../../../hooks/useHttp";
import { BookingInformation } from "@/utils/types";
import { handleFilterQuery } from "@/utils/functions";

type BookingsDataType = {
  data: BookingInformation[];
  totalCount: number;
};

export default function useBookings({
  currentPage = 1,
  pageLimit = 10,
  search = "",
  filters = {},
}: {
  currentPage: number;
  pageLimit: number;
  search?: string;
  filters?: Record<string, string[]>;
}) {
  const http = useHttp();
  const { user } = useAppSelector((state) => state.user);

  const { data, isError, error, isLoading, isSuccess } = useQuery({
    queryKey: ["getBookings", user?.id, currentPage, search, filters],

    queryFn: async () =>
      http.get<BookingsDataType>(
        `/api/bookings/user?page=${currentPage}&limit=${pageLimit}`
      ),

    enabled: !!user?.id,
    retry: false,
  });

  return {
    bookings: data?.data || [],
    totalCount: data?.totalCount || 0,
    isError,
    error,
    isLoading,
    isSuccess,
  };
}
