import { api } from "@/lib/api";
import { updateListingByIdData } from "@/lib/features/listingsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { handleErrors } from "@/utils/functions";
import { ErrorResponse } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useFetchDrivers(id: string) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleModal = (value: boolean) => setOpenModal(value);

  const { listingById } = useAppSelector((state) => state.listings);

  const getAssignedDrivers = useMutation({
    mutationFn: () => api.get(`/api/drivers/vehicle/${listingById?.id}`),

    onSuccess: (data) => {
      console.log("Assign New Driver successful", data.data);
      dispatch(
        updateListingByIdData({
          ...listingById,
          AssignedDriver: data.data,
        })
      );
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors("Assign New Driver", error),
  });

  useEffect(() => {
    if (id) {
      getAssignedDrivers.mutate();
    }
  }, [id]);

  return { getAssignedDrivers, openModal, handleModal, listingById };
}
