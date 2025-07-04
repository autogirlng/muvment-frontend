"use client";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { deleteBookingInformation, handleErrors } from "@/utils/functions";
import { BookingInformation, ErrorResponse } from "@/utils/types";
import { useHttp } from "@/hooks/useHttp";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import { useState } from "react";
import { combineDateTime } from "@/utils/combineDateTime";

type VehicleAvailabilityCheck = {
  vehicleId: string;
  isAvailable: boolean;
  startDate: string;
  endDate: string;
};

type BookingResponse = {
  apiKey: string;
  booking: BookingInformation;
  checkoutUrl: string;
  enabledPaymentMethod: string[];
  merchantName: string;
  metaData: { transactionId: string };
  paymentReference: string;
  transactionReference: string;
};

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

  const [vehicleAvailableError, setVehicleAvailableError] =
    useState<string>("");

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
      http.post<BookingResponse>(
        `/api/bookings/${type === "guest" ? "guest-booking" : "create"}/${vehicleId}`,
        values
      ),

    onSuccess: (data) => {
      console.log("Vehicle booking paid!", data);
      router.push(`/vehicle/payment/${vehicleId}/${data?.booking?.id}`);
      localStorage.setItem("bookingId", JSON.stringify(data?.booking?.id));
      localStorage.setItem("vehicleId", JSON.stringify(vehicleId));
      deleteBookingInformation(vehicleId);
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
      pickupLocation,
    }: {
      bookingType: string;
      startDate: string;
      startTime: string;
      endDate: string;
      endTime: string;
      pickupLocation: string;
    }) =>
      http.get<VehicleAvailabilityCheck>(
        `/api/bookings/check-availability?vehicleId=${vehicleId}${
          startDate || endDate
            ? `&${[
                startDate && `startDate=${startDate}`,
                endDate && `endDate=${endDate}`,
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
        pickupLocation: values.pickupLocation,
      };
    },

    onSuccess: (data, _values, context) => {
      console.log("Vehicle is available!", data);

      const { startDateTime, endDateTime } = combineDateTime(
        context.startDate,
        context.startTime,
        context.endDate,
        context.endTime
      );

      if (data?.isAvailable) {
        if (user) {
          router.push(
            `/vehicle/booking/${vehicleId || ""}${
              context.bookingType ||
              context.startDate ||
              context.startTime ||
              context.endDate ||
              context.endTime ||
              context.pickupLocation
                ? `?${[
                    startDateTime && `startDate=${startDateTime}`,
                    endDateTime && `endDate=${endDateTime}`,
                    context.bookingType && `bookingType=${context.bookingType}`,
                    context.pickupLocation &&
                      `pickupLocation=${encodeURIComponent(context.pickupLocation)}`,
                  ]
                    .filter(Boolean)
                    .join("&")}`
                : ""
            }`
          );
        } else {
          isSuccessFunction && isSuccessFunction();
        }
      } else {
        setVehicleAvailableError(
          "This vehicle is not available for the time and date you selected. "
        );
      }
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors(error, "Vehicle available"),
  });

  return {
    saveBooking,
    proceedToPayment,
    checkVehicleAvailability,
    vehicleAvailableError,
  };
}
