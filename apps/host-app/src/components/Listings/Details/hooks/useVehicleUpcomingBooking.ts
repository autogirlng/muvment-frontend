"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAppSelector } from "@/lib/hooks";
import { BookingInformation, ErrorResponse } from "@/utils/types";
import { handleErrors } from "@/utils/functions";
import { AxiosError } from "axios";

export default function useVehicleUpcomingBooking(id:string) {
  const { user } = useAppSelector((state) => state.user);

  const [upcomingBookings, setUpcomingBookings] = useState<
    BookingInformation[]
  >([]);

  const { data, isError, error, isLoading, isSuccess } = useQuery({
    queryKey: ["getUpcomingBookings", user?.id],

    queryFn: () =>
      api.get(`/api/bookings/upcoming/${id}?page=1&limit=10`),
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (isSuccess) {
      console.log("bookings fetched successfully", data.data);
      setUpcomingBookings(data?.data?.data);
    }

    if (isError) {
      handleErrors(
        "Error fetching bookings",
        error as AxiosError<ErrorResponse>
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess]);

  return {
    upcomingBookings,
    isError,
    error,
    isLoading,
  };
}
