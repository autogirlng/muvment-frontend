"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { VehicleInformation } from "@/utils/types";
import { updateVehicleInformation } from "@/lib/features/vehicleOnboardingSlice";
import { useHttp } from "./useHttp";

export default function useVehicleOnboarding() {
  const dispatch = useAppDispatch();
  const routeParams = useSearchParams();
  const vehicleId = routeParams.get("id");

  const http = useHttp();

  const { user } = useAppSelector((state) => state.user);

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["getVehicleById"],
    queryFn: () =>
      http.get<VehicleInformation>(`/api/vehicle-onboarding/${vehicleId}`),
    enabled: !!user?.id && !!vehicleId,
  });
  useEffect(() => {
    if (isSuccess) {
      console.log("Get Vehicle Information By Id", data);
      dispatch(updateVehicleInformation(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);
  return {
    data,
    isError,
    isLoading,
  };
}
