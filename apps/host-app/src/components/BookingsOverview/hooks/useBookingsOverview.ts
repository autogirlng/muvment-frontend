"use client";

import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/lib/hooks";
import { useHttp } from "../../../hooks/useHttp";
import { BookingInformation } from "@/utils/types";

type BookingsDataType = {
  data: BookingInformation[];
  totalCount: number;
};

export default function useBookingsOverview() {
  const http = useHttp();
  const { user } = useAppSelector((state) => state.user);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["getBookingsOverview", user?.id],

    queryFn: async () =>
      http.get<BookingsDataType>(
        `/api/bookings/host/${user?.id}?page=${1}&limit=${10}`
      ),

    enabled: !!user?.id,
  });

  return {
    bookings: data?.data || [],
    isError,
    isLoading,
  };
}
