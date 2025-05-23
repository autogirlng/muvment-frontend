"use client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { handleErrors } from "@/utils/functions";
import {
  DocumentVehicleInformationValues,
  ErrorResponse,
  // VehicleInformation,
} from "@/utils/types";
import { updateVehicleInformation } from "@/lib/features/vehicleOnboardingSlice";
import { useRouter } from "next/navigation";
import { useHttp } from "@/hooks/useHttp";

export default function useDocumentInformationForm({
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

  console.log(vehicle?.VehicleDocument);
  const initialValues: DocumentVehicleInformationValues = {
    authorizationLetter: vehicle?.VehicleDocument?.authorizationLetter ?? "",
    insuranceCertificate: vehicle?.VehicleDocument?.insuranceCertificate ?? "",
    maintenanceHistory: vehicle?.VehicleDocument?.maintenanceHistory ?? "",
    proofOfOwnership: vehicle?.VehicleDocument?.proofOfOwnership ?? "",
    vehicleInspectionReport:
      vehicle?.VehicleDocument?.vehicleInspectionReport ?? "",
    vehicleRegistration: vehicle?.VehicleDocument?.vehicleRegistration ?? "",
  };

  const saveStep5 = useMutation({
    mutationFn: (formData: FormData) => {
      // Expecting FormData
      return http.put(`/api/vehicle-onboarding/step5/${vehicle?.id}`, formData);
    },
    onSuccess: (data) => {
      console.log("Vehicle Onboarding Step 5 Saved", data);
      dispatch(
        updateVehicleInformation(
          // @ts-ignore
          { ...vehicle, document: data }
        )
      );
    },
    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors(error, "Vehicle Onboarding Step 5 Save"),
  });

  const submitStep5 = useMutation({
    mutationFn: (formData: FormData) => {
      // Expecting FormData
      return http.put(`/api/vehicle-onboarding/step5/${vehicle?.id}`, formData);
    },
    onSuccess: (data) => {
      console.log("Vehicle Onboarding Step 5 Submitted", data);
      dispatch(
        updateVehicleInformation(
          // @ts-ignore
          { ...vehicle, document: data }
        )
      );
      setCurrentStep(currentStep + 1);
    },
    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors(error, "Vehicle Onboarding Step 5 Submit"),
  });

  return {
    submitStep5,
    saveStep5,
    vehicle,
    initialValues,
  };
}
