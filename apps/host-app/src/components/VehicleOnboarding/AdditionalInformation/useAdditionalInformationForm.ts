"use client";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { handleErrors } from "@/utils/functions";
import {
  AdditionalVehicleInformationValues,
  ErrorResponse,
  VehicleInformation,
} from "@/utils/types";
import { updateVehicleInformation } from "@/lib/features/vehicleOnboardingSlice";
import { useRouter } from "next/navigation";
import { useHttp } from "@/hooks/useHttp";

export default function useAdditionalInformationForm({
  currentStep,
  setCurrentStep,
}: {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}) {
  const http = useHttp();

  const router = useRouter();
  const dispatch = useAppDispatch();

  const { vehicle } = useAppSelector((state) => state.vehicleOnboarding);

  const initialValues: AdditionalVehicleInformationValues = {
    licensePlateNumber: vehicle?.licensePlateNumber || "",
    stateOfRegistration: vehicle?.stateOfRegistration || "",
    vehicleDescription: vehicle?.vehicleDescription || "",
    features: vehicle?.features || [],
    vehicleColor: vehicle?.vehicleColor || "",
    numberOfSeats: `${vehicle?.numberOfSeats || ""}`,
  };

  const saveStep2 = useMutation({
    mutationFn: (values: AdditionalVehicleInformationValues) =>
      http.put<VehicleInformation>(
        `/api/vehicle-onboarding/step2/${vehicle?.id}`,
        {
          ...values,
          numberOfSeats: parseInt(values.numberOfSeats),
        }
      ),

    onSuccess: (data) => {
      console.log("Vehicle Onboarding Step 2 Saved", data);
      dispatch(
        updateVehicleInformation(
          // @ts-ignore
          { ...vehicle, ...data }
        )
      );
      router.push("/listings");
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors(error, "Vehicle Onboarding Step 2"),
  });

  const submitStep2 = useMutation({
    mutationFn: (values: AdditionalVehicleInformationValues) =>
      http.put<VehicleInformation>(
        `/api/vehicle-onboarding/step2/${vehicle?.id}`,
        {
          ...values,
          numberOfSeats: parseInt(values.numberOfSeats),
        }
      ),

    onSuccess: (data) => {
      console.log("Vehicle Onboarding Step 2 Submitted", data);
      dispatch(
        updateVehicleInformation(
          // @ts-ignore
          { ...vehicle, ...data }
        )
      );
      setCurrentStep(currentStep + 1);
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors(error, "Vehicle Onboarding Step 2"),
  });

  return {
    submitStep2,
    saveStep2,
    vehicle,
    initialValues,
  };
}
