import { api } from "@/lib/api";
import { setBookings, updateBookingsData } from "@/lib/features/bookingsSlice";
import { useAppDispatch } from "@/lib/hooks";
import { handleErrors } from "@/utils/functions";
import {
  BookingInformation,
  ErrorResponse,
  MappedInformation,
} from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function useBookingActions({ id }: { id?: string }) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [bookingDetail, setBookingDetail] = useState<null | BookingInformation>(
    null
  );
  const [vehicleDetails, setVehicleDetails] = useState<MappedInformation[]>([]);
  const [bookingDates, setBookingDates] = useState<MappedInformation[]>([]);
  const [contactInformation, setContactInformation] = useState<
    MappedInformation[]
  >([]);

  // =============== fetch booking by id =============== //
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

  useEffect(() => {
    if (bookingDetail) {
      // =============== set booking information =============== //
      const mappedBookingDates: MappedInformation[] = [
        {
          startDate: bookingDetail?.startDate
            ? `${format(new Date(bookingDetail?.startDate), "do MMM yyyy")} | ${format(new Date(bookingDetail?.startDate), "h:mma")}`
            : "N/A",
        },
        {
          endDate: bookingDetail?.endDate
            ? `${format(new Date(bookingDetail?.endDate), "do MMM yyyy")} | ${format(new Date(bookingDetail?.endDate), "h:mma")}`
            : "N/A",
        },
        { duration: `${bookingDetail?.duration} days` || "N/A" },
      ];
      setBookingDates(mappedBookingDates);

      // =============== set contact information =============== //
      const mappedContactInformation: MappedInformation[] = [
        { email: bookingDetail?.guestEmail || "N/A" },
        { phone: bookingDetail?.guestPhoneNumber || "N/A" },
        { pickupLocation: bookingDetail?.pickupLocation || "N/A" },
        { dropoffLocation: bookingDetail?.dropoffLocation || "N/A" },
      ];
      setContactInformation(mappedContactInformation);

      // =============== set vehicle details =============== //
      const mappedVehicleDetails: MappedInformation[] = [
        { make: bookingDetail?.vehicle?.make || "N/A" },
        { model: bookingDetail?.vehicle?.model || "N/A" },
        { year: bookingDetail?.vehicle?.yearOfRelease || "N/A" },
        { colour: bookingDetail?.vehicle?.vehicleColor || "N/A" },
        { seatingCapacity: bookingDetail?.vehicle?.numberOfSeats || "N/A" },
      ];
      setVehicleDetails(mappedVehicleDetails);
    }
  }, [bookingDetail]);

  // =============== decline a booking =============== //
  const [openDeclineModal, setOpenDeclineModal] = useState<boolean>(false);
  const handleDeclineModal = () => {
    setOpenDeclineModal(!openDeclineModal);
  };
  const declineBooking = useMutation({
    mutationFn: () =>
      api.put(`/api/bookings/updateStatus/${id}`, {
        status: "CANCELLED",
      }),

    onSuccess: (data) => {
      console.log("Decline Bookings successful", data.data);
      setBookingDetail({
        ...bookingDetail,
        ...data.data,
      });

      dispatch(updateBookingsData(data.data));
      toast.error("Trip Declined Successfully");
      setOpenDeclineModal(false);
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors("Decline Listing", error),
  });

  // =============== report a booking =============== //
  const [report, setReport] = useState<string>("");
  const [openReportModal, setOpenReportModal] = useState<boolean>(false);
  const handleReportModal = () => {
    setOpenReportModal(!openReportModal);
  };
  const reportBooking = useMutation({
    mutationFn: (values: { message: string }) =>
      api.post(`/api/report-trip/booking`, { ...values, bookingId: id }),

    onSuccess: (data) => {
      console.log("Report Bookings successful", data.data);
      setBookingDetail({
        ...bookingDetail,
        ...data.data,
      });
      dispatch(updateBookingsData(data.data));
      toast.success("Trip Reported Successfully");
      setOpenReportModal(false);
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors("Report Bookings", error),
  });

  // =============== accept a booking =============== //
  const [openAcceptModal, setOpenAcceptModal] = useState<boolean>(false);
  const handleAcceptModal = () => {
    setOpenAcceptModal(!openReportModal);
  };
  const acceptBooking = useMutation({
    mutationFn: () =>
      api.put(`/api/bookings/updateStatus/${id}`, {
        status: "APPROVED",
      }),

    onSuccess: (data) => {
      console.log("Accept Bookings successful", data.data);
      setBookingDetail({
        ...bookingDetail,
        ...data.data,
      });

      dispatch(updateBookingsData(data.data));
      toast.success("Trip Accepted Successfully");
      setOpenAcceptModal(false);
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors("Accept Listing", error),
  });

  return {
    getBookingById,
    bookingDetail,
    declineBooking,
    acceptBooking,
    reportBooking,

    vehicleDetails,
    setVehicleDetails,
    bookingDates,
    setBookingDates,
    contactInformation,
    setContactInformation,

    openReportModal,
    handleReportModal,
    report,
    setReport,

    openAcceptModal,
    handleAcceptModal,

    openDeclineModal,
    handleDeclineModal,
  };
}
