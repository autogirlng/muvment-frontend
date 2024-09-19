"use client";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/api";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { handleErrors } from "@/utils/functions";
import { BasicVehicleInformationValues, ErrorResponse } from "@/utils/types";
import {
  setVehicleOnboardingCurrentStep,
  updateVehicleInformation,
} from "@/lib/features/vehicleOnboardingSlice";
import { useRouter } from "next/navigation";

export default function useBasicInformationForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { currentStep, vehicle } = useAppSelector(
    (state) => state.vehicleOnboarding
  );

  const setCurrentStep = (step: number) =>
    dispatch(setVehicleOnboardingCurrentStep(step));

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
      api.put("/api/vehicle-onboarding/step1", {
        ...values,
        hasTracker: values.hasTracker === "yes" ? true : false,
        hasInsurance: values.hasInsurance === "yes" ? true : false,
        ...(vehicle?.id && { id: vehicle.id }),
      }),

    onSuccess: (data) => {
      console.log("Vehicle Onboarding Step 1 Saved", data.data);
      dispatch(updateVehicleInformation({ ...vehicle, ...data.data }));
      //       router.push("/listings");
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors("Vehicle Onboarding Step 1", error),
  });

  const submitStep1 = useMutation({
    mutationFn: (values: BasicVehicleInformationValues) =>
      api.put("/api/vehicle-onboarding/step1", {
        ...values,
        hasTracker: values.hasTracker === "yes" ? true : false,
        hasInsurance: values.hasInsurance === "yes" ? true : false,
        ...(vehicle?.id && { id: vehicle.id }),
      }),

    onSuccess: (data) => {
      console.log("Vehicle Onboarding Step 1 Submitted", data.data);
      dispatch(updateVehicleInformation({ ...vehicle, ...data.data }));
      setCurrentStep(currentStep + 1);
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors("Vehicle Onboarding Step 1", error),
  });

  return {
    currentStep,
    setCurrentStep,
    submitStep1,
    saveStep1,
    vehicle,
    initialValues,
  };
}
