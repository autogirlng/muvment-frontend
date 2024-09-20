"use client";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/api";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { handleErrors } from "@/utils/functions";
import {
  AdditionalVehicleInformationValues,
  ErrorResponse,
} from "@/utils/types";
import {
  setVehicleOnboardingCurrentStep,
  updateVehicleInformation,
} from "@/lib/features/vehicleOnboardingSlice";
import { useRouter } from "next/navigation";

export default function useAdditionalInformationForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { currentStep, vehicle } = useAppSelector(
    (state) => state.vehicleOnboarding
  );

  const setCurrentStep = (step: number) =>
    dispatch(setVehicleOnboardingCurrentStep(step));

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
      api.put(`/api/vehicle-onboarding/step2/${vehicle?.id}`, {
        ...values,
        numberOfSeats: parseInt(values.numberOfSeats),
      }),

    onSuccess: (data) => {
      console.log("Vehicle Onboarding Step 2 Saved", data.data);
      dispatch(updateVehicleInformation({ ...vehicle, ...data.data }));
      //       router.push("/listings");
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors("Vehicle Onboarding Step 2", error),
  });
  
  const submitStep2 = useMutation({
    mutationFn: (values: AdditionalVehicleInformationValues) =>
      api.put(`/api/vehicle-onboarding/step2/${vehicle?.id}`, {
        ...values,
        numberOfSeats: parseInt(values.numberOfSeats),
      }),

    onSuccess: (data) => {
      console.log("Vehicle Onboarding Step 2 Submitted", data.data);
      dispatch(updateVehicleInformation({ ...vehicle, ...data.data }));
      setCurrentStep(currentStep + 1);
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors("Vehicle Onboarding Step 2", error),
  });

  return {
    currentStep,
    setCurrentStep,
    submitStep2,
    saveStep2,
    vehicle,
    initialValues,
  };
}
