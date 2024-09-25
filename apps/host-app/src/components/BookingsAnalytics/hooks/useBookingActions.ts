import { api } from "@/lib/api";
import {
  setBookingDetail,
  updateBookingDetailData,
} from "@/lib/features/bookingsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { handleErrors } from "@/utils/functions";
import { ErrorResponse, MappedInformation } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function useBookingActions(
  handleModal?: (open: boolean) => void,
  id?: string
) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { bookingDetail } = useAppSelector((state) => state.bookings);

  const [openReportModal, setOpenReportModal] = useState<boolean>(false);

  const [vehicleDetails, setVehicleDetails] = useState<MappedInformation[]>([]);
  const [bookingDates, setBookingDates] = useState<MappedInformation[]>([]);
  const [contactInformation, setContactInformation] = useState<
    MappedInformation[]
  >([]);

  const handleReportModal = () => {
    setOpenReportModal(!openReportModal);
  };

  const getBookingById = useMutation({
    mutationFn: (id: string) => api.get(`/api/bookings/${id}`),

    onSuccess: (data) => {
      console.log("Get Bookings details By Id", data.data);
      dispatch(setBookingDetail(data.data));
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      handleErrors("Get Bookings details By Id", error);
      router.push("/bookings");
    },
  });

  const declineBooking = useMutation({
    mutationFn: () =>
      api.put(`/api/bookings/updateStatus/${id}`, {
        status: "CANCELLED",
      }),

    onSuccess: (data) => {
      console.log("Decline Bookings successful", data.data);
      dispatch(
        updateBookingDetailData({
          ...bookingDetail,
          ...data.data,
        })
      );
      toast.error("Trip Declined Successfully");

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
      dispatch(
        updateBookingDetailData({
          ...bookingDetail,
          ...data.data,
        })
      );

      handleModal && handleModal(false);
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors("Report Bookings", error),
  });

  const acceptBooking = useMutation({
    mutationFn: () =>
      api.put(`/api/bookings/updateStatus/${id}`, {
        status: "APPROVED",
      }),

    onSuccess: (data) => {
      console.log("Accept Bookings successful", data.data);
      dispatch(
        updateBookingDetailData({
          ...bookingDetail,
          ...data.data,
        })
      );
      toast.success("Trip Accepted Successfully");

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

    vehicleDetails,
    setVehicleDetails,
    bookingDates,
    setBookingDates,
    contactInformation,
    setContactInformation,

    openReportModal,
    handleReportModal,
  };
}
