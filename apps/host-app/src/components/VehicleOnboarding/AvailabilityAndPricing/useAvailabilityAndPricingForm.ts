"use client";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/api";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { handleErrors } from "@/utils/functions";
import {
  AvailabilityAndPricing,
  AvailabilityAndPricingValues,
  ErrorResponse,
} from "@/utils/types";
import {
  setVehicleOnboardingCurrentStep,
  updateVehicleInformation,
} from "@/lib/features/vehicleOnboardingSlice";
import { useState } from "react";

export default function useAvailabilityAndPricingForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showOuskirts, setShowOuskirts] = useState<boolean>(false);

  const { currentStep, vehicle } = useAppSelector(
    (state) => state.vehicleOnboarding
  );

  const setCurrentStep = (step: number) =>
    dispatch(setVehicleOnboardingCurrentStep(step));

  const initialValues: AvailabilityAndPricingValues = {
    advanceNoticeInDays: vehicle?.tripSettings?.advanceNotice || "",
    minTripDurationInDays: "1 day",
    maxTripDurationInDays: vehicle?.tripSettings?.maxTripDuration || "",
    // selfDrive: "",

    driverProvided:
      vehicle?.tripSettings?.provideDriver === undefined ||
      vehicle?.tripSettings?.provideDriver === null
        ? ""
        : vehicle?.tripSettings?.provideDriver
          ? "yes"
          : "no",

    fuelProvided:
      vehicle?.tripSettings?.fuelProvided === undefined ||
      vehicle?.tripSettings?.fuelProvided === null
        ? ""
        : vehicle?.tripSettings?.fuelProvided
          ? "yes"
          : "no",
    dailyRate: `${vehicle?.pricing?.dailyRate?.value || ""}`,
    extraHourRate: `${vehicle?.pricing?.extraHoursFee || ""}`,
    airportPickup: `${vehicle?.pricing?.airportPickupFee || ""}`,
    threeDaysDiscount: `${vehicle?.pricing?.discounts[0]?.percentage || ""}`,
    sevenDaysDiscount: `${vehicle?.pricing?.discounts[1]?.percentage || ""}`,
    thirtyDaysDiscount: `${vehicle?.pricing?.discounts[2]?.percentage || ""}`,
    outskirtsLocation: vehicle?.outskirtsLocation || [],
    outskirtsPrice: `${vehicle?.outskirtsPrice || ""}`,
  };

  const mapValuesToApiPayload = (values: AvailabilityAndPricingValues) => {
    return {
      tripSettings: {
        advanceNotice: values.advanceNoticeInDays,
        maxTripDuration: values.maxTripDurationInDays,
        provideDriver: values.driverProvided === "yes",
        fuelProvided: values.fuelProvided === "yes",
      },
      pricing: {
        dailyRate: {
          value: parseFloat(values.dailyRate),
          unit: "NGN_KM",
        },
        extraHoursFee: parseFloat(values.extraHourRate),
        airportPickupFee: parseFloat(values.airportPickup),
        discounts: [
          {
            durationInDays: 3,
            percentage: parseFloat(values.threeDaysDiscount),
          },
          {
            durationInDays: 7,
            percentage: parseFloat(values.sevenDaysDiscount),
          },
          {
            durationInDays: 30,
            percentage: parseFloat(values.thirtyDaysDiscount),
          },
        ],
      },

      outskirtsLocation: values.outskirtsLocation,
      outskirtsPrice: parseFloat(values.outskirtsPrice),
    };
  };

  const saveStep4 = useMutation({
    mutationFn: (values: AvailabilityAndPricing) =>
      api.put(`/api/vehicle-onboarding/step4/${vehicle?.id}`, values, {}),

    onSuccess: (data) => {
      console.log("Vehicle Onboarding Step 4 Saved", data.data);
      dispatch(updateVehicleInformation({ ...vehicle, ...data.data }));
      //       router.push("/listings");
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors("Vehicle Onboarding Step 4", error),
  });
  const submitStep4 = useMutation({
    mutationFn: (values: AvailabilityAndPricing) =>
      api.put(`/api/vehicle-onboarding/step4/${vehicle?.id}`, values),

    onSuccess: (data) => {
      console.log("Vehicle Onboarding Step 4 Submitted", data.data);
      dispatch(updateVehicleInformation({ ...vehicle, ...data.data }));
      setCurrentStep(currentStep + 1);
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors("Vehicle Onboarding Step 4", error),
  });

  return {
    currentStep,
    setCurrentStep,
    submitStep4,
    saveStep4,
    vehicle,
    mapValuesToApiPayload,
    initialValues,
    showOuskirts,
    setShowOuskirts,
  };
}
