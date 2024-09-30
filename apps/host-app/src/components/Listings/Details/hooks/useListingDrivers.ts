import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useAppSelector } from "@/lib/hooks";
import { handleErrors } from "@/utils/functions";
import { AssignNewDriver, ErrorResponse } from "@/utils/types";

export default function useListingDrivers(id: string) {
  const { user } = useAppSelector((state) => state.user);

  const [drivers, setDrivers] = useState<AssignNewDriver[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleModal = (value: boolean) => setOpenModal(value);

  const { data, isError, error, isLoading, isSuccess } = useQuery({
    queryKey: ["getAssignedDrivers", user?.id, id],

    queryFn: () => api.get(`/api/drivers/vehicle/${id}`),
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (isSuccess) {
      console.log("Get Drivers successful", data.data);
      setDrivers(data.data);
    }

    if (isError) {
      handleErrors("Get Drivers", error as AxiosError<ErrorResponse>);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess]);

  const assignNewDriver = useMutation({
    mutationFn: (values: AssignNewDriver) => api.post("/api/drivers", values),

    onSuccess: (data) => {
      console.log("Assign New Driver successful", data.data);
      const newDrivers = drivers;
      newDrivers.push(data.data);
      setDrivers(newDrivers);
      handleModal(false);
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors("Assign New Driver", error),
  });

  return {
    isLoading,
    openModal,
    handleModal,
    assignNewDriver,
    drivers,
  };
}
