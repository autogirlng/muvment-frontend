import { api } from "@/lib/api";
import { handleErrors } from "@/utils/functions";
import { AssignNewDriver, ErrorResponse } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";

export default function useListingDrivers() {
  const [drivers, setDrivers] = useState<AssignNewDriver[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleModal = (value: boolean) => setOpenModal(value);

  const getAssignedDrivers = useMutation({
    mutationFn: (id: string) => api.get(`/api/drivers/vehicle/${id}`),

    onSuccess: (data) => {
      console.log("Get Drivers successful", data.data);
      setDrivers(data.data);
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors("Get Drivers", error),
  });

  const assignNewDriver = useMutation({
    mutationFn: (values: AssignNewDriver) => api.post("/api/drivers", values),

    onSuccess: (data) => {
      console.log("Assign New Driver successful", data.data);
      const newDrivers = drivers
      newDrivers.push(data.data)
      setDrivers(newDrivers);
      handleModal(false);
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors("Assign New Driver", error),
  });

  return {
    getAssignedDrivers,
    openModal,
    handleModal,
    assignNewDriver,
    drivers,
  };
}
