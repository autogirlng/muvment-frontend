"use client";

import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { api } from "@/lib/api";
import { ErrorResponse, Review } from "@/utils/types";
import { handleErrors } from "@/utils/functions";

export default function useReviews(id: string) {
  const { user } = useAppSelector((state) => state.user);

  const pageLimit = 10;
  const [totalItemsCount, setTotalItemsCount] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [vehicleReviews, setVehicleReviews] = useState<Review[]>([]);

  const { data, isError, error, isLoading, isSuccess } = useQuery({
    queryKey: ["getVehicleReviews", user?.id, id],

    queryFn: () => api.get(`/api/reviews/${id}?page=1&limit=10`),
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (isSuccess) {
      console.log("reviews fetched successfully", data.data);
      setVehicleReviews(data?.data?.data);
      setTotalItemsCount(data?.data?.totalCount);
    }

    if (isError) {
      handleErrors(
        "Error fetching reviews",
        error as AxiosError<ErrorResponse>
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess]);

  return {
    vehicleReviews,
    isError,
    error,
    isLoading,

    currentPage,
    setCurrentPage,
    pageLimit,
    totalItemsCount,
  };
}
