"use client";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { handleErrors, handleFilterQuery } from "@/utils/functions";
import { ErrorResponse } from "@/utils/types";
import { useHttp } from "@/hooks/useHttp";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";

export default function useHandleBooking({
  vehicleId,
  type,
  isSuccessFunction,
}: {
  vehicleId: string;
  type?: "guest" | "user";
  isSuccessFunction?: () => void;
}) {
  const http = useHttp();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);

  const saveBooking = useMutation({
    mutationFn: (values) =>
      http.post(
        `/api/bookings/${type === "guest" ? "guest-booking" : "create"}/${vehicleId}`,
        values
      ),

    onSuccess: (data) => {
      console.log("Vehicle booking saved!", data);
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors(error, "Vehicle booking"),
  });

  const proceedToPayment = useMutation({
    mutationFn: (values) =>
      http.post(
        `/api/bookings/${type === "guest" ? "guest-booking" : "create"}/${vehicleId}`,
        values
      ),

    onSuccess: (data) => {
      console.log("Vehicle booking saved!", data);
      router.push(`/vehicle/payment/${vehicleId}`);
      // delete booking from local storage after payment
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors(error, "Vehicle booking"),
  });

  const checkVehicleAvailability = useMutation({
    mutationFn: ({
      bookingType,
      startDate,
      startTime,
      endDate,
      endTime,
    }: {
      bookingType: string;
      startDate: string;
      startTime: string;
      endDate: string;
      endTime: string;
    }) =>
      http.get(
        `/api/bookings/check-availability?vehicleId=${vehicleId} ${
          startDate || endDate
            ? `&${[
                startDate && `startDate=${startTime}`,
                endDate && `endDate=${endTime}`,
              ]
                .filter(Boolean)
                .join("&")}`
            : ""
        }`
      ),

    onMutate: (values) => {
      return {
        bookingType: values.bookingType,
        startDate: values.startDate,
        startTime: values.startTime,
        endDate: values.endDate,
        endTime: values.endTime,
      };
    },

    onSuccess: (data, _values, context) => {
      console.log("Vehicle is available!", data);

      if (user) {
        router.push(
          `/vehicle/booking/${vehicleId || ""}${
            context.bookingType ||
            context.startDate ||
            context.startTime ||
            context.endDate ||
            context.endTime
              ? `?${[
                  context.startDate && `startDate=${context.startDate}`,
                  context.startTime && `startTime=${context.startTime}`,
                  context.endDate && `endDate=${context.endDate}`,
                  context.endTime && `endTime=${context.endTime}`,
                  context.bookingType && `bookingType=${context.bookingType}`,
                ]
                  .filter(Boolean)
                  .join("&")}`
              : ""
          }`
        );
      } else {
        isSuccessFunction && isSuccessFunction();
      }
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors(error, "Vehicle available"),
  });

  return {
    saveBooking,
    proceedToPayment,
    checkVehicleAvailability,
  };
}
