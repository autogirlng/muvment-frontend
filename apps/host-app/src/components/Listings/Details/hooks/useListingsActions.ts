import { api } from "@/lib/api";
import { updateListings } from "@/lib/features/listingsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { handleErrors } from "@/utils/functions";
import {
  ErrorResponse,
  ListingInformation,
  VehicleStatus,
} from "@/utils/types";
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

  const { listings } = useAppSelector((state) => state.listings);

  const [listingDetail, setListingDetail] = useState<ListingInformation | null>(
    null
  );

  const getListingById = useMutation({
    mutationFn: (id: string) => api.get(`/api/listings/details/${id}`),

    onSuccess: (data) => {
      console.log("Get Listing details By Id", {
        ...data.data.vehicle,
        statistics: data.data.statistics,
      });
      setListingDetail({
        ...data.data.vehicle,
        statistics: data.data.statistics,
      });
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      handleErrors("Get Listing details By Id", error);
      router.push("/listings");
    },
  });

  const deactivateListing = useMutation({
    mutationFn: () => api.put(`/api/listings/deactivate/${id}`),

    onSuccess: (data) => {
      console.log("Deactivate Listing successful", data.data);
      setListingDetail({
        ...listingDetail,
        ...data.data,
      });

      //     filter the listing to remove it from from listings

      handleModal && handleModal(false);
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors("Deactivate Listing", error),
  });

  const moveListingToDraft = useMutation({
    mutationFn: () => api.put(`/api/listings/draft/${id}`),

    onSuccess: (data) => {
      console.log("Move Listing to Draft successful", data.data);
      // dispatch(
      setListingDetail({
        ...listingDetail,
        ...data.data,
      });
      // );

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
    mutationFn: () => api.delete(`/api/listings/${id}`),

    onSuccess: (data) => {
      console.log("Delete Listing successful", data.data);
      setListingDetail(null);

      const updatedListings = listings.filter((listing) => listing.id !== id);
      dispatch(updateListings(updatedListings));

      router.push("/listings");
      handleModal && handleModal(false);
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors("Delete Listing", error),
  });

  const updateListingStatus = useMutation({
    mutationFn: (value) => api.put(`/api/listings/status/${id}`, value),

    onSuccess: (data) => {
      console.log("Update Listing status successful", data.data);
      // dispatch(
      setListingDetail({
        ...listingDetail,
        ...data.data,
      });
      // );

      //     filter the listing to remove it from from listings

      handleModal && handleModal(false);
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors("Update Listing status", error),
  });

  return {
    getListingById,
    deactivateListing,
    deleteListing,
    moveListingToDraft,
    updateListingStatus,
    listingDetail,
  };
}
