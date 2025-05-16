"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { PaymentBadge } from "@repo/ui/badge";
import { Popup } from "@repo/ui/popup";
import { FullPageSpinner } from "@repo/ui/spinner";
import MoreButton from "@repo/ui/moreButton";
import BackLink from "@/components/BackLink";
import useBookingActions from "@/components/BookingsAnalytics/hooks/useBookingActions";
import BookingInfoCards from "@/components/BookingsAnalytics/Details/BookingInfoCards";
import BookingActions from "@/components/BookingsAnalytics/Details/BookingActions";
import {
  BookingBadgeStatus,
  MappedInformation,
  PaymentBadgeStatus,
} from "@/utils/types";
import useGetBookingById from "@/components/BookingsAnalytics/hooks/useGetBookingById";

export default function BookingDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();

  const {
    isError,
    isLoading,
    bookingDetail,
    vehicleDetails,
    bookingDates,
    contactInformation,
  } = useGetBookingById({ id: params.id });

  const {
    openReportModal,
    handleReportModal,
    reportBooking,
    report,
    setReport,

    openAcceptModal,
    handleAcceptModal,
    acceptBooking,

    openDeclineModal,
    handleDeclineModal,
    declineBooking,
  } = useBookingActions({ id: params.id });

  useEffect(() => {
    if (!params.id) {
      router.push("/bookings");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  if (isLoading) {
    return <FullPageSpinner />;
  }

  if (isError) {
    return <p>something went wrong </p>;
  }

  return (
    <main className="py-14 space-y-[46px]">
      <BackLink backLink="/bookings" />
      <div className="space-y-14">
        {/* booking info */}
        <div className="flex items-start justify-between">
          <BookingInfoCards
            title="BOOKING INFORMATION"
            chipTitle="Booking Dates"
            chipData={bookingDates as MappedInformation[]}
            nameTitle="Booking ID"
            nameValue={bookingDetail?.id || ""}
            copyText={bookingDetail?.id || ""}
            status={bookingDetail?.bookingStatus}
          >
            <div className="flex items-center gap-8">
              <div className="space-y-2">
                <p className="text-grey-500 text-sm 3xl:text-base">Amount</p>
                <p className="text-primary-500 text-4xl 3xl:text-h2">
                  {`${bookingDetail?.currencyCode} ${bookingDetail?.amount}`}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-grey-500 text-sm 3xl:text-base">
                  Payment Status
                </p>
                <p className="text-primary-500 text-4xl 3xl:text-h2">
                  <PaymentBadge
                    status={
                      bookingDetail?.paymentStatus.toLocaleLowerCase() as PaymentBadgeStatus
                    }
                  />
                </p>
              </div>
            </div>
          </BookingInfoCards>
          <div className="block lg:hidden">
            <Popup
              className="!w-[150px]"
              trigger={<MoreButton />}
              content={
                <BookingActions
                  bookingStatus={
                    bookingDetail?.bookingStatus as BookingBadgeStatus
                  }
                  openReportModal={openReportModal}
                  handleReportModal={handleReportModal}
                  handleReportTrip={() =>
                    reportBooking.mutate({ message: report })
                  }
                  setReport={setReport}
                  isLoadingReportTrip={reportBooking.isPending}
                  handleAcceptTrip={() => acceptBooking.mutate()}
                  openAcceptModal={openAcceptModal}
                  handleAcceptModal={handleAcceptModal}
                  isLoadingAcceptTrip={acceptBooking.isPending}
                  openDeclineModal={openDeclineModal}
                  handleDeclineModal={handleDeclineModal}
                  handleDeclineTrip={() => declineBooking.mutate()}
                  isLoadingDeclineTrip={declineBooking.isPending}
                />
              }
            />
          </div>
          <div className="hidden lg:block">
            <BookingActions
              bookingStatus={bookingDetail?.bookingStatus as BookingBadgeStatus}
              openReportModal={openReportModal}
              handleReportModal={handleReportModal}
              handleReportTrip={() => reportBooking.mutate({ message: report })}
              setReport={setReport}
              isLoadingReportTrip={reportBooking.isPending}
              handleAcceptTrip={() => acceptBooking.mutate()}
              openAcceptModal={openAcceptModal}
              handleAcceptModal={handleAcceptModal}
              isLoadingAcceptTrip={acceptBooking.isPending}
              openDeclineModal={openDeclineModal}
              handleDeclineModal={handleDeclineModal}
              handleDeclineTrip={() => declineBooking.mutate()}
              isLoadingDeclineTrip={declineBooking.isPending}
            />
          </div>
        </div>
        {/* guest info */}
        <BookingInfoCards
          title="GUEST INFORMATION"
          chipTitle="Contact Information"
          chipData={contactInformation as MappedInformation[]}
          nameTitle="Guest Name"
          nameValue={bookingDetail?.guestName || ""}
        />

        {/* vehicle info */}
        <BookingInfoCards
          title="VEHICLE INFORMATION"
          chipTitle="Vehicle Details"
          chipData={vehicleDetails as MappedInformation[]}
          nameTitle="Vehicle Requested"
          nameValue={bookingDetail?.vehicle?.listingName || ""}
          link={`/listings/${bookingDetail?.vehicleId}`}
          linkText="View Vehicle"
        />
      </div>
    </main>
  );
}
