"use client";

import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/lib/hooks";
import { BookingStatistics } from "@/utils/types";
import { useHttp } from "@/hooks/useHttp";

export default function useBookingStats() {
  const http = useHttp();
  const { user } = useAppSelector((state) => state.user);

  const { data, isError, error, isLoading, isSuccess } = useQuery({
    queryKey: ["getBookingStats", user?.id],
    queryFn: async () =>
      http.get<BookingStatistics>("/api/statistics/hostBookings"),
    enabled: !!user?.id,
  });

  return {
    isError,
    error,
    isLoading,
    isSuccess,

    bookingStats: data,
  };
}
