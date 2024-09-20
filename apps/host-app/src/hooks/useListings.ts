"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { api } from "@/lib/api";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { handleErrors } from "@/utils/functions";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/utils/types";
import {
  setListings,
  updateListingByIdData,
} from "@/lib/features/listingsSlice";

export default function useListings() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const getListings = useQuery({
    queryKey: ["getListings"],
    queryFn: () => api.get(`/api/listings/host/${user?.id}?page=1&limit=10`),
  });

  useEffect(() => {
    if (getListings.isSuccess) {
      console.log("LIsting data fetched successfully", getListings.data.data);
      dispatch(
        setListings({
          listings: getListings.data?.data?.data,
          pageLimit: getListings.data?.data?.limit,
          pageNumber: getListings.data?.data?.page,
          totalItemsCount: getListings.data?.data?.totalCount,
          totalPagesCount: getListings.data?.data?.totalPages,
        })
      );
    }

    if (getListings.isError) {
      console.log("Error fetching listings", getListings.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getListings.isError, getListings.isSuccess]);

  const getListingById = useMutation({
    mutationFn: (id: string) => api.get(`/api/listings/details/${id}`),

    onSuccess: (data) => {
      console.log("Get Listing details By Id", data.data);
      dispatch(updateListingByIdData(data.data));
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors("Get Listing details By Id", error),
  });

  return {
    getListings,
    getListingById,
  };
}
