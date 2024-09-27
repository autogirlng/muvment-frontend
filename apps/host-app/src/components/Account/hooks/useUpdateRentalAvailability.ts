"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAppSelector } from "@/lib/hooks";
import { ErrorResponse } from "@/utils/types";
import {
  handleErrors,
  mapRentalAvailabilityArrayToObject,
  mapRentalAvailabilityToArray,
} from "@/utils/functions";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface RentalAvailability {
  [key: string]: boolean;
}

export default function useUpdateRentalAvailability() {
  const { user } = useAppSelector((state) => state.user);

  const [rentalAvalabilityDays, setRentalAvalabilityDays] = useState<string[]>(
    []
  );

  const { data, isError, error, isLoading, isSuccess } = useQuery({
    queryKey: ["getRentalAvailability", user?.id],

    queryFn: () => api.get(`api/account-setup/rental/${user?.id}`),
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (isSuccess) {
      console.log("rental availability fetched successfully", data.data);
      const { id, userId, updatedAt, createdAt, ...days } = data.data;
      setRentalAvalabilityDays(mapRentalAvailabilityToArray(days));
    }

    if (isError) {
      handleErrors(
        "Error fetching rental availability",
        error as AxiosError<ErrorResponse>
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess]);

  const updateRentalAvailability = useMutation({
    mutationFn: (values: string[]) => {
      const newVlues: RentalAvailability =
        mapRentalAvailabilityArrayToObject(values);
      return api.put("/api/account-setup/rental", newVlues);
    },

    onSuccess: (data) => {
      console.log("rental availability updated Successfully", data.data);

      const { id, userId, updatedAt, createdAt, ...days } = data.data;
      setRentalAvalabilityDays(mapRentalAvailabilityToArray(days));
      toast.success("Rental availability updated successfully ");
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      handleErrors("update rental availability", error);
    },
  });

  return {
    rentalAvalabilityDays,
    setRentalAvalabilityDays,
    isError,
    error,
    isLoading,

    updateRentalAvailability,
  };
}
