"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAppSelector } from "@/lib/hooks";
import { BookingInformation } from "@/utils/types";
import { useHttp } from "@/hooks/useHttp";

type UpcomingBookingsDataType = {
  data: BookingInformation[];
  totalCount: number;
};

export default function useUpcomingBookings({
  currentPage = 1,
  pageLimit = 10,
}: {
  currentPage: number;
  pageLimit: number;
}) {
  const http = useHttp();
  const { user } = useAppSelector((state) => state.user);

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["getUpcomingBookings", user?.id, currentPage],

    queryFn: async () =>
      http.get<UpcomingBookingsDataType>(
        `/api/bookings/host/upcoming/${user?.id}?page=${currentPage}&limit=${pageLimit}`
      ),
    enabled: !!user?.id,
    retry: false,
  });

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  return {
    upcomingBookings: data?.data || [],
    totalCount: data?.totalCount || 0,
    isError,
    isLoading,
    isSuccess,
  };
}
