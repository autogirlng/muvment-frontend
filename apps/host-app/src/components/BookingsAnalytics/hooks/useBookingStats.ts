"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAppSelector } from "@/lib/hooks";
import { BookingStatistics } from "@/utils/types";

export default function useBookingStats() {
  const { user } = useAppSelector((state) => state.user);

  const [bookingStats, setBookingStats] = useState<BookingStatistics | null>(
    null
  );

  const { data, isError, error, isLoading, isSuccess } = useQuery({
    queryKey: ["getBookingStats", user?.id],

    queryFn: () => api.get("/api/statistics/hostBookings"),
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (isSuccess) {
      console.log("bookings stats fetched successfully", data.data);
      setBookingStats(data.data);
    }

    if (isError) {
      console.log("Error fetching bookings stats", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess]);

  return {
    isError,
    error,
    isLoading,
    isSuccess,

    bookingStats,
  };
}
