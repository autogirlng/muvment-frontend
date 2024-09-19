"use client";

import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { handleErrors } from "@/utils/functions";
import { ErrorResponse } from "@/utils/types";
import {
  setVehicleOnboardingCurrentStep,
  updateVehicleInformation,
} from "@/lib/features/vehicleOnboardingSlice";

export default function useVehicleOnboarding() {
  const dispatch = useAppDispatch();
  const routeParams = useSearchParams();
  const vehicleId = routeParams.get("id");

  const { currentStep } = useAppSelector((state) => state.vehicleOnboarding);

  const setCurrentStep = (step: number) =>
    dispatch(setVehicleOnboardingCurrentStep(step));

  const getVehicleById = useMutation({
    mutationFn: (id: string) => api.get(`/api/vehicle-onboarding/${id}`),

    onSuccess: (data) => {
      console.log("Get Vehicle Information By Id", data.data);
      dispatch(updateVehicleInformation(data.data));
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors("Get Vehicle Information By Id", error),
  });

  useEffect(() => {
    if (vehicleId) {
      getVehicleById.mutate(vehicleId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicleId]);

  return {
    currentStep,
    setCurrentStep,
    loading: getVehicleById.isPending,
  };
}
