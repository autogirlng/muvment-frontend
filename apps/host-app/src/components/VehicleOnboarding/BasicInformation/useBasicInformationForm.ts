"use client";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { handleErrors } from "@/utils/functions";
import { BasicVehicleInformationValues, ErrorResponse, VehicleInformation } from "@/utils/types";
import { updateVehicleInformation } from "@/lib/features/vehicleOnboardingSlice";
import { useRouter } from "next/navigation";
import { useHttp } from "@/hooks/useHttp";

export default function useBasicInformationForm({
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

  const initialValues: BasicVehicleInformationValues = {
    listingName: vehicle?.listingName || "",
    location: vehicle?.location || "",
    address: vehicle?.address || "",
    vehicleType: vehicle?.vehicleType || "",
    make: vehicle?.make || "",
    model: vehicle?.model || "",
    yearOfRelease: vehicle?.yearOfRelease || "",

    hasInsurance:
      vehicle?.hasInsurance === undefined || vehicle?.hasInsurance === null
        ? ""
        : vehicle?.hasInsurance
          ? "yes"
          : "no",
    hasTracker:
      vehicle?.hasTracker === undefined || vehicle?.hasTracker === null
        ? ""
        : vehicle?.hasTracker
          ? "yes"
          : "no",
  };

  const saveStep1 = useMutation({
    mutationFn: (values: BasicVehicleInformationValues) =>
      http.put<VehicleInformation>("/api/vehicle-onboarding/step1", {
        ...values,
        hasTracker: values.hasTracker === "yes" ? true : false,
        hasInsurance: values.hasInsurance === "yes" ? true : false,
        ...(vehicle?.id && { id: vehicle.id }),
      }),

    onSuccess: (data) => {
      console.log("Vehicle Onboarding Step 1 Saved", data);
      dispatch(updateVehicleInformation({ ...vehicle, ...data }));
      router.push("/listings");
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors(error, "Vehicle Onboarding Step 1"),
  });

  const submitStep1 = useMutation({
    mutationFn: (values: BasicVehicleInformationValues) =>
      http.put<VehicleInformation>("/api/vehicle-onboarding/step1", {
        ...values,
        hasTracker: values.hasTracker === "yes" ? true : false,
        hasInsurance: values.hasInsurance === "yes" ? true : false,
        ...(vehicle?.id && { id: vehicle.id }),
      }),

    onSuccess: (data) => {
      console.log("Vehicle Onboarding Step 1 Submitted", data);
      dispatch(updateVehicleInformation({ ...vehicle, ...data }));
      setCurrentStep(currentStep + 1);
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors(error, "Vehicle Onboarding Step 1"),
  });

  return {
    submitStep1,
    saveStep1,
    vehicle,
    initialValues,
  };
}
