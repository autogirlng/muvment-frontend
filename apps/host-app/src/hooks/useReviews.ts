"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/lib/hooks";
import { useHttp } from "@/hooks/useHttp";
import { ErrorResponse, Review, ReviewReply, User } from "@/utils/types";
import { useState } from "react";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { handleErrors } from "@/utils/functions";

type ReviewsDataType = {
  data: Review[];
  totalCount: number;
};

export default function useReviews({
  currentPage = 1,
  pageLimit = 10,
}: {
  currentPage: number;
  pageLimit: number;
}) {
  const http = useHttp();
  const { user } = useAppSelector((state) => state.user);
  const [reviewDetailData, setReviewDetailData] = useState<Review | null>(null);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["getReviews", user?.id, currentPage],

    queryFn: () =>
      http.get<ReviewsDataType>(
        `/api/reviews/findoneuser/${"66e08242e11152f08a5569c9"}?page=${currentPage}&limit=${pageLimit}`
      ),
    enabled: !!user?.id,
    retry: false,
  });

  const openReviewDetail = (review: Review) => {
    setReviewDetailData(review);
  };

  const closeReviewDetail = () => {
    setReviewDetailData(null);
  };

  const replyAReview = useMutation({
    mutationFn: (values: { message: string }) =>
      http.post<ReviewReply>("/api/reviews/reply", {
        ...values,
        reviewId: reviewDetailData?.id,
      }),

    onSuccess: (data) => {
      console.log("You have replied to a review", data);
      reviewDetailData?.Reply?.push({ ...data, user: user as User });
      toast.success("Reply Sent");
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      handleErrors(error, "Reply Sent");
    },
  });

  return {
    reviews: data?.data || [],
    totalCount: data?.totalCount || 0,
    isError,
    isLoading,

    reviewDetailData,
    openReviewDetail,
    closeReviewDetail,
    replyAReview,
  };
}
