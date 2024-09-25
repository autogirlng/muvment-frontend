import { api } from "@/lib/api";
import { useAppSelector } from "@/lib/hooks";
import { handleErrors } from "@/utils/functions";
import { BookingInformation, ErrorResponse } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function useBookingActions(
  handleModal?: (open: boolean) => void,
  id?: string
) {
  const router = useRouter();

  const { bookings } = useAppSelector((state) => state.bookings);

  const [bookingDetail, setBookingDetail] = useState<BookingInformation | null>(null);

  const getBookingById = useMutation({
    mutationFn: (id: string) => api.get(`/api/bookings/${id}`),

    onSuccess: (data) => {
      console.log("Get Bookings details By Id", data.data);
      setBookingDetail(data.data);
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      handleErrors("Get Bookings details By Id", error);
      router.push("/bookings");
    },
  });

  const declineBooking = useMutation({
    mutationFn: () => api.put(`/api/.../${id}`),

    onSuccess: (data) => {
      console.log("Decline Bookings successful", data.data);
      setBookingDetail({
        ...bookingDetail,
        ...data.data,
      });

      //     filter the Bookings to remove it from from listings

      handleModal && handleModal(false);
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors("Decline Listing", error),
  });

  const reportBooking = useMutation({
    mutationFn: () => api.put(`/api/listings/draft/${id}`),

    onSuccess: (data) => {
      console.log("Report Bookings successful", data.data);
      setBookingDetail({
        ...bookingDetail,
        ...data.data,
      });

      handleModal && handleModal(false);
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors("Report Bookings", error),
  });

  const acceptBooking = useMutation({
    mutationFn: () => api.delete(`/api/.../${id}`),

    onSuccess: (data) => {
      console.log("Accept Bookings successful", data.data);
      setBookingDetail(null);

      router.push("/bookings");
      handleModal && handleModal(false);
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors("Accept Listing", error),
  });

  return {
    getBookingById,
    bookingDetail,
    declineBooking,
    acceptBooking,
  };
}
