import { api } from "@/lib/api";
import { updateListingByIdData } from "@/lib/features/listingsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { handleErrors } from "@/utils/functions";
import { AssignNewDriver, ErrorResponse } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function useAssignDriver(handleModal: (open: boolean) => void) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { listingById } = useAppSelector((state) => state.listings);

  const assignNewDriver = useMutation({
    mutationFn: (values: AssignNewDriver) => api.post("/api/drivers", values),

    onSuccess: (data) => {
      console.log("Assign New Driver successful", data.data);
      dispatch(
        updateListingByIdData({
          ...listingById,
          AssignedDriver: [...(listingById?.AssignedDriver || []), data.data],
        })
      );
      handleModal(false);
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors("Assign New Driver", error),
  });

  return { assignNewDriver, vehicleId: listingById?.id || "" };
}
