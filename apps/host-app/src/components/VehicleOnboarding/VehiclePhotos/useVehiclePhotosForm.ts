"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/api";
import { handleErrors } from "@/utils/functions";
import { photoViewOptions } from "@/utils/data";
import { ErrorResponse, VehiclePhotos } from "@/utils/types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  setVehicleOnboardingCurrentStep,
  updateVehicleInformation,
} from "@/lib/features/vehicleOnboardingSlice";

export default function useVehiclePhotosForm(
  setPhotoTipIndex: Dispatch<SetStateAction<number>>
) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { currentStep, vehicle } = useAppSelector(
    (state) => state.vehicleOnboarding
  );

  const setCurrentStep = (step: number) =>
    dispatch(setVehicleOnboardingCurrentStep(step));

  const appendFormData = (values: VehiclePhotos) => {
    const formData = new FormData();
    photoViewOptions.forEach((item) => {
      formData.append(item.name, values[item.name as keyof VehiclePhotos]);
    });
    return formData;
  };

  const initialValues: VehiclePhotos = {
    frontView: vehicle?.VehicleImage?.frontView || "",
    backView: vehicle?.VehicleImage?.backView || "",
    sideView1: vehicle?.VehicleImage?.sideView1 || "",
    sideView2: vehicle?.VehicleImage?.sideView2 || "",
    interior: vehicle?.VehicleImage?.interior || "",
    other: vehicle?.VehicleImage?.other || "",
  };

  const [photoViews, setPhotoViews] = useState(
    photoViewOptions.map((view) => ({
      ...view,
      disabled:
        view.name === "frontView"
          ? false
          : !initialValues[view.name as keyof VehiclePhotos] ||
            initialValues[view.name as keyof VehiclePhotos] === "",
    }))
  );

  const saveStep3 = useMutation({
    mutationFn: (values: FormData) =>
      api.put(`/api/vehicle-onboarding/step3/${vehicle?.id}`, values),

    onSuccess: (data) => {
      console.log("Vehicle Onboarding Step 3 Saved", data.data);
      dispatch(
        // @ts-ignore
        updateVehicleInformation({ ...vehicle, VehicleImage: data.data })
      );
      //       router.push("/listings");
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors("Vehicle Onboarding Step 3", error),
  });

  const submitStep3 = useMutation({
    mutationFn: (values: FormData) =>
      api.put(`/api/vehicle-onboarding/step3/${vehicle?.id}`, values),

    onSuccess: (data) => {
      console.log("Vehicle Onboarding Step 3 Submitted", data.data);
      dispatch(
        // @ts-ignore
        updateVehicleInformation({ ...vehicle, VehicleImage: data.data })
      );
      setCurrentStep(currentStep + 1);
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors("Vehicle Onboarding Step 3", error),
  });

  return {
    initialValues,
    currentStep,
    photoViews,
    setPhotoViews,
    setCurrentStep,
    submitStep3,
    saveStep3,
    vehicle,
    appendFormData,
    photoViewOptions,
  };
}
