'use client';

import { useQuery } from "@tanstack/react-query";
import { useHttp } from "@/hooks/useHttp";
import { BookingInformation } from "@/utils/types";

export default function useExtendBooking({ id }: { id?: string }) {
  const http = useHttp();

  const {
    data: booking,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["getBookingById", id],
    queryFn: async () => http.get<BookingInformation>(`/api/bookings/getSingle/${id}`),
    enabled: !!id,
    retry: false,
  });

  return {
    booking,
    isError,
    isLoading,
  };
}
