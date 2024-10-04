"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAppSelector } from "@/lib/hooks";
import { useHttp } from "../../../hooks/useHttp";
import { BookingInformation } from "@/utils/types";

type BookingsDataType = {
  data: BookingInformation[];
  totalCount: number;
};

export default function useBookings({
  currentPage = 1,
  pageLimit = 10,
}: {
  currentPage: number;
  pageLimit: number;
}) {
  const http = useHttp();
  const { user } = useAppSelector((state) => state.user);

  const { data, isError, error, isLoading, isSuccess } = useQuery({
    queryKey: ["getBookings", user?.id, currentPage],

    queryFn: async () =>
      http.get<BookingsDataType>(
        `/api/bookings/host/${user?.id}?page=${currentPage}&limit=${pageLimit}`
      ),

    enabled: !!user?.id,
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
