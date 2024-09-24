import { api } from "@/lib/api";
import {
  updateListingByIdData,
  updateListings,
} from "@/lib/features/listingsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { handleErrors } from "@/utils/functions";
import { ErrorResponse, VehicleStatus } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function useListingsActions(
  handleModal?: (open: boolean) => void,
  id?: string
) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { listingById, listings } = useAppSelector((state) => state.listings);

  const deactivateListing = useMutation({
    mutationFn: () => api.put(`/api/listings/deactivate/${listingById?.id}`),

    onSuccess: (data) => {
      console.log("Deactivate Listing successful", data.data);
      dispatch(
        updateListingByIdData({
          ...listingById,
          ...data.data,
        })
      );

      //     filter the listing to remove it from from listings

      handleModal && handleModal(false);
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors("Deactivate Listing", error),
  });

  const moveListingToDraft = useMutation({
    mutationFn: () => api.put(`/api/listings/draft/${listingById?.id}`),

    onSuccess: (data) => {
      console.log("Move Listing to Draft successful", data.data);
      dispatch(
        updateListingByIdData({
          ...listingById,
          ...data.data,
        })
      );

      //     update listing array
      const listingIndex = listings.findIndex((listing) => listing.id === id);
      if (listingIndex !== -1) {
        const updatedListings = [...listings];

        updatedListings[listingIndex] = {
          ...updatedListings[listingIndex],
          vehicleStatus: VehicleStatus.DRAFT,
        };

        console.log(updatedListings);

        dispatch(updateListings(updatedListings));
      }

      handleModal && handleModal(false);
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors("Move Listing to Draft", error),
  });

  const deleteListing = useMutation({
    mutationFn: () => api.delete(`/api/listings/${listingById?.id}`),

    onSuccess: (data) => {
      console.log("Delete Listing successful", data.data);
      dispatch(updateListingByIdData({}));

      const updatedListings = listings.filter((listing) => listing.id !== id);
      dispatch(updateListings(updatedListings));

      router.push("/listings");
      handleModal && handleModal(false);
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors("Delete Listing", error),
  });

  const updateListingStatus = useMutation({
    mutationFn: (value) =>
      api.put(`/api/listings/status/${listingById?.id}`, value),

    onSuccess: (data) => {
      console.log("Update Listing status successful", data.data);
      dispatch(
        updateListingByIdData({
          ...listingById,
          ...data.data,
        })
      );

      //     filter the listing to remove it from from listings

      handleModal && handleModal(false);
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors("Update Listing status", error),
  });

  return {
    deactivateListing,
    deleteListing,
    moveListingToDraft,
    updateListingStatus,
  };
}
