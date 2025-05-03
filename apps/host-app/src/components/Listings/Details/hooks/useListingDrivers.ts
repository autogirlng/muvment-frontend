import { AxiosError } from "axios";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "@/lib/hooks";
import { handleErrors } from "@/utils/functions";
import { AssignNewDriver, ErrorResponse } from "@/utils/types";
import { useHttp } from "@/hooks/useHttp";

export default function useListingDrivers(id: string) {
  const http = useHttp();
  const queryClient = useQueryClient();

  const { user } = useAppSelector((state) => state.user);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleModal = (value: boolean) => setOpenModal(value);

  const {
    data: drivers,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["getAssignedDrivers", user?.id, id],

    queryFn: () => http.get<AssignNewDriver[]>(`/api/drivers/vehicle/${id}`),
    enabled: !!user?.id && !!id,
    retry: false,
  });

  const assignNewDriver = useMutation({
    mutationFn: (values: AssignNewDriver) =>
      http.post<AssignNewDriver>("/api/drivers", values),

    onSuccess: (data) => {
      console.log("Assign New Driver successful", data);

      const newDrivers = drivers;
      newDrivers ? newDrivers.push(data as AssignNewDriver) : data;
      queryClient.setQueryData(
        ["getAssignedDrivers", user?.id, id],
        () => newDrivers
      );

      handleModal(false);
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors(error, "Assign New Driver"),
  });

  return {
    isError,
    isLoading,
    openModal,
    handleModal,
    assignNewDriver,
    drivers,
  };
}
