"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setListings } from "@/lib/features/listingsSlice";
import { useRouter } from "next/navigation";
import { handleErrors } from "@/utils/functions";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/utils/types";

export default function useListings() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageLimit = 10;

  const { data, isError, error, isLoading, isSuccess } = useQuery({
    queryKey: ["getListings", user?.id, currentPage],

    queryFn: () =>
      api.get(
        `/api/listings/host/${user?.id}?page=${currentPage}&limit=${pageLimit}`
      ),
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (isSuccess) {
      console.log("LIsting data fetched successfully", data.data);
      dispatch(
        setListings({
          listings: data?.data?.data,
          // pageLimit: data?.data?.limit,
          // pageNumber: data?.data?.page,
          totalItemsCount: data?.data?.totalCount,
          totalPagesCount: data?.data?.totalPages,
          listingDetail: null,
        })
      );
    }

    if (isError) {
      handleErrors(
        "Error fetching listings",
        error as AxiosError<ErrorResponse>
      );
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
