"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { ErrorResponse } from "@/utils/types";
import {
  handleErrors,
  mapRentalAvailabilityArrayToObject,
  mapRentalAvailabilityToArray,
} from "@/utils/functions";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useHttp } from "@/hooks/useHttp";

interface RentalAvailability {
  [key: string]: boolean;
}

export default function useUpdateRentalAvailability() {
  const http = useHttp();

  const { user } = useAppSelector((state) => state.user);

  const [rentalAvalabilityDays, setRentalAvalabilityDays] = useState<string[]>(
    []
  );

  const { data, isError, error, isLoading, isSuccess } = useQuery({
    queryKey: ["getRentalAvailability", user?.id],

    queryFn: () =>
      http.get<RentalAvailability>(`api/account-setup/rental/${user?.id}`),
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (isSuccess) {
      console.log("rental availability fetched successfully", data);
      const { id, userId, updatedAt, createdAt, ...days } = data;
      setRentalAvalabilityDays(mapRentalAvailabilityToArray(days));
    }

    if (isError) {
      handleErrors(
        error as AxiosError<ErrorResponse>,
        "Error fetching rental availability"
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess]);

  const updateRentalAvailability = useMutation({
    mutationFn: (values: string[]) => {
      const newVlues: RentalAvailability =
        mapRentalAvailabilityArrayToObject(values);
      return http.put<RentalAvailability>(
        "/api/account-setup/rental",
        newVlues
      );
    },

    onSuccess: (data) => {
      console.log("rental availability updated Successfully", data);
      const { id, userId, updatedAt, createdAt, ...days } = data;
      setRentalAvalabilityDays(mapRentalAvailabilityToArray(days));
      toast.success("Rental availability updated successfully ");
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      handleErrors(error, "update rental availability");
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
