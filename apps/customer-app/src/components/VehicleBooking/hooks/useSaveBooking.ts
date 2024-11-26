"use client";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { handleErrors } from "@/utils/functions";
import { ErrorResponse } from "@/utils/types";
import { useHttp } from "@/hooks/useHttp";
import { useRouter } from "next/navigation";

export default function useSaveBooking({ vehicleId }: { vehicleId: string }) {
  const http = useHttp();
  const router = useRouter();

  const saveBooking = useMutation({
    mutationFn: (values) =>
      http.post(`/api/bookings/guest-booking/${vehicleId}`, values),

    onSuccess: (data) => {
      console.log("Vehicle booking saved!", data);
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors(error, "Vehicle booking"),
  });

  const proceedToPayment = useMutation({
    mutationFn: (values) =>
      http.post(`/api/bookings/guest-booking/${vehicleId}`, values),

    onSuccess: (data) => {
      console.log("Vehicle booking saved!", data);
      router.push(`/vehicle/payment/${vehicleId}`);
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors(error, "Vehicle booking"),
  });

  return {
    saveBooking,
    proceedToPayment,
  };
}
