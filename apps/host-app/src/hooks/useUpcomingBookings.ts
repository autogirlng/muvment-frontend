"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setUpcomingBookings } from "@/lib/features/bookingsSlice";

export default function useUpcomingBookings() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageLimit = 10;

  const { data, isError, error, isLoading, isSuccess } = useQuery({
    queryKey: ["getUpcomingBookings", user?.id, currentPage],

    queryFn: () =>
      api.get(
        `/api/bookings/upcoming/${user?.id}?page=${currentPage}&limit=${pageLimit}`
      ),
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (isSuccess) {
      console.log("bookings fetched successfully", data.data);
      dispatch(
        setUpcomingBookings({
          upcomingBookings: data?.data?.data,
          // pageLimit: data?.data?.limit,
          // pageNumber: data?.data?.page,
          totalItemsCount: data?.data?.totalCount,
          totalPagesCount: data?.data?.totalPages,
        })
      );
    }

    if (isError) {
      console.log("Error fetching bookings", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess]);

  return {
    data,
    isError,
    error,
    isLoading,
    isSuccess,

    currentPage,
    setCurrentPage,
    pageLimit,
  };
}
