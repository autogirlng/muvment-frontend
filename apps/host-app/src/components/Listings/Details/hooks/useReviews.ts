"use client";

import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/lib/hooks";
import { useHttp } from "@/hooks/useHttp";
import { Review } from "@/utils/types";

type ReviewsDataType = {
  data: Review[];
  totalCount: number;
};

export default function useReviews({
  id,
  currentPage,
  pageLimit,
}: {
  id: string;
  currentPage: number;
  pageLimit: number;
}) {
  const http = useHttp();

  const { user } = useAppSelector((state) => state.user);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["getVehicleReviews", user?.id, id],

    queryFn: () =>
      http.get<ReviewsDataType>(`/api/reviews/${id}?page=1&limit=10`),
    enabled: !!user?.id && !!id,
  });

  return {
    vehicleReviews: data?.data || [],
    totalCount: data?.totalCount || 0,
    isError,
    isLoading,
  };
}
