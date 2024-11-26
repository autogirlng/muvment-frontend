"use client";

import { useQuery } from "@tanstack/react-query";
import { useHttp } from "@/hooks/useHttp";
import { Review } from "@/utils/types";

type ReviewsDataType = {
  data: Review[];
  totalCount: number;
};

export default function useFetchReviews({
  id,
  currentPage = 1,
  pageLimit = 10,
}: {
  id: string;
  currentPage: number;
  pageLimit: number;
}) {
  const http = useHttp();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["getReviews", id, currentPage],

    queryFn: () =>
      http.get<ReviewsDataType>(
        `/api/reviews/findoneuser/${id}?page=${currentPage}&limit=${pageLimit}`
      ),
    enabled: !!id,
    retry: false,
  });

  return {
    reviews: data?.data || [],
    totalCount: data?.totalCount || 0,
    isError,
    isLoading,
  };
}
