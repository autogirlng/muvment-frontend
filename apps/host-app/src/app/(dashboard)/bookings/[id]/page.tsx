"use client";

import { useRouter } from "next/navigation";
import { forwardRef, ReactNode, useEffect, useState } from "react";

import { FullPageSpinner } from "@repo/ui/spinner";
import useBookingActions from "@/components/BookingsAnalytics/hooks/useBookingActions";
import BackLink from "@/components/BackLink";
import Link from "next/link";
import Chip from "@repo/ui/chip";
import { keyAndValueInAChip } from "@/utils/functions";
import Icons from "@repo/ui/icons";
import { BookingBadge, TransactionBadge } from "@repo/ui/badge";
import { BookingBadgeStatus, TransactionBadgeStatus } from "@/utils/types";
import { format } from "date-fns";
import cn from "classnames";
import { Popup } from "@repo/ui/popup";
import { BlurredDialog } from "@repo/ui/dialog";
import Image from "next/image";
import DeclineTrip from "@/components/BookingsAnalytics/Details/modals/DeclineTrip";
import ReportTrip from "@/components/BookingsAnalytics/Details/modals/ReportTrip";
import MoreButton from "@repo/ui/moreButton";

type MappedInformation = {
  [key: string]: string | number;
};

export default function ListingsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { getBookingById, bookingDetail } = useBookingActions();
  const [vehicleDetails, setVehicleDetails] = useState<MappedInformation[]>([]);
  const [bookingDates, setBookingDates] = useState<MappedInformation[]>([]);
  const [contactInformation, setContactInformation] = useState<
    MappedInformation[]
  >([]);

  const [openDeclineModal, setOpenDeclineModal] = useState(false);

  const handleDeclineModal = () => {
    setOpenDeclineModal(!openDeclineModal);
  };

  const [openReportModal, setOpenReportModal] = useState(false);

  const handleReportModal = () => {
    setOpenReportModal(!openReportModal);
  };

  useEffect(() => {
    if (!params.id) {
      router.push("/bookings");
    } else {
      getBookingById.mutate(params.id);
    }
  }, [params.id]);

  useEffect(() => {
    if (bookingDetail) {
      // booking information
      const mappedBookingDates: MappedInformation[] = [
        {
          startDate: bookingDetail?.startDate
            ? `${format(new Date(bookingDetail?.startDate), "do MMM yyyy")} | ${format(new Date(bookingDetail?.startDate), "k:mm 	b")}`
            : "N/A",
        },
        {
          endDate: bookingDetail?.endDate
            ? `${format(new Date(bookingDetail?.endDate), "do MMM yyyy")} | ${format(new Date(bookingDetail?.endDate), "k:mm 	b")}`
            : "N/A",
        },
        { duration: `${bookingDetail?.duration} days` || "N/A" },
      ];
      setBookingDates(mappedBookingDates);

      // contact information
      const mappedContactInformation: MappedInformation[] = [
        { email: bookingDetail?.guestEmail || "N/A" },
        { phone: bookingDetail?.guestPhoneNumber || "N/A" },
        { pickupLocation: bookingDetail?.pickupLocation || "N/A" },
        { dropoffLocation: bookingDetail?.dropoffLocation || "N/A" },
      ];
      setContactInformation(mappedContactInformation);

      // vehicle details
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

  if (getBookingById.isPending) {
    return <FullPageSpinner />;
  }

  if (getBookingById.isError) {
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
            chipData={bookingDates}
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
                  <TransactionBadge
                    status={
                      bookingDetail?.paymentStatus.toLocaleLowerCase() as TransactionBadgeStatus
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
                  id={params.id}
                  openDeclineModal={openDeclineModal}
                  handleDeclineModal={handleDeclineModal}
                  openReportModal={openReportModal}
                  handleReportModal={handleReportModal}
                  bookingStatus={
                    bookingDetail?.bookingStatus as BookingBadgeStatus
                  }
                />
              }
            />
          </div>
          <div className="hidden lg:block">
            <BookingActions
              id={params.id}
              openDeclineModal={openDeclineModal}
              handleDeclineModal={handleDeclineModal}
              openReportModal={openReportModal}
              handleReportModal={handleReportModal}
              bookingStatus={bookingDetail?.bookingStatus as BookingBadgeStatus}
            />
          </div>
        </div>
        {/* guest info */}
        <BookingInfoCards
          title="GUEST INFORMATION"
          chipTitle="Contact Information"
          chipData={contactInformation}
          nameTitle="Guest Name"
          nameValue={bookingDetail?.guestName || ""}
        />

        {/* vehicle info */}
        <BookingInfoCards
          title="VEHICLE INFORMATION"
          chipTitle="Vehicle Details"
          chipData={vehicleDetails}
          nameTitle="Vehicle Requested"
          nameValue={bookingDetail?.vehicle?.listingName || ""}
          link={`/listings/${bookingDetail?.vehicleId}`}
          linkText="View Vehicle"
        />
      </div>
    </main>
  );
}

type BookingInfoCardsProps = {
  title: string;
  chipTitle: string;
  chipData: MappedInformation[];
  nameTitle: string;
  nameValue: string;
  link?: string;
  linkText?: string;
  copyText?: string;
  children?: ReactNode;
  status?: BookingBadgeStatus;
};

const BookingInfoCards = ({
  title,
  chipData,
  chipTitle,
  nameTitle,
  nameValue,
  link,
  linkText,
  copyText,
  children,
  status,
}: BookingInfoCardsProps) => {
  return (
    <div className="space-y-6 border-b border-dashed border-grey-300 pb-8">
      <p className="text-grey-700 text-sm 3xl:text-base uppercase !font-semibold">
        {title}
      </p>
      <div className="space-y-8">
        <div className="space-y-2">
          <p className="text-grey-500 text-sm 3xl:text-base">{nameTitle}</p>
          <h5 className="text-h6 3xl:text-h5 !font-bold text-black flex gap-2">
            <span> {nameValue}</span>
            {link && (
              <span className="text-xl 3xl:text-h6 !font-medium text-primary-500">
                <Link href={link}>{linkText}</Link>
              </span>
            )}
            {copyText && <span>{Icons.ic_copy}</span>}
          </h5>
          {status && (
            <BookingBadge
              status={status.toLocaleLowerCase() as BookingBadgeStatus}
            />
          )}
        </div>
        <div className="space-y-2">
          <p className="text-grey-500 text-sm 3xl:text-base">{chipTitle}</p>
          <div className="flex flex-wrap gap-3">
            {chipData?.map((detail, index) => {
              const [key, value] = Object.entries(detail)[0];
              return (
                <Chip
                  key={index}
                  text={keyAndValueInAChip(key, value)}
                  variant="filled"
                  radius="sm"
                  color="light"
                />
              );
            })}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

type BookingActionsProps = {
  id: string;
  openDeclineModal: boolean;
  handleDeclineModal: () => void;
  openReportModal: boolean;
  handleReportModal: () => void;
  bookingStatus: BookingBadgeStatus;
};

const BookingActions = ({
  id,
  openDeclineModal,
  handleDeclineModal,
  openReportModal,
  handleReportModal,
  bookingStatus,
}: BookingActionsProps) => {
  const status = bookingStatus?.toLocaleLowerCase();
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-1">
      <>
        <ActionButton
          color="bg-success-500 disabled:!text-success-500 disabled:!bg-success-50"
          text={status === BookingBadgeStatus.APPROVED ? "Accepted" : "Accept"}
          icon={Icons.ic_done_circle}
          disabled={status === BookingBadgeStatus.APPROVED ? true : false}
        />
        <BlurredDialog
          open={openDeclineModal}
          onOpenChange={handleDeclineModal}
          title={
            <Image
              src="/icons/warning.png"
              alt=""
              width={56}
              height={56}
              className="w-10 md:w-[50px] h-10 md:h-[50px]"
            />
          }
          trigger={
            <ActionButton
              color=" bg-error-900"
              text="Decline"
              icon={Icons.ic_cancel_circle}
            />
          }
          content={<DeclineTrip handleModal={handleDeclineModal} id={id} />}
        />
      </>

      <BlurredDialog
        open={openReportModal}
        onOpenChange={handleReportModal}
        title={
          <Image
            src="/icons/warning.png"
            alt=""
            width={56}
            height={56}
            className="w-10 md:w-[50px] h-10 md:h-[50px]"
          />
        }
        trigger={
          <ActionButton
            color="bg-grey-700"
            text="Report"
            icon={Icons.ic_info}
          />
        }
        content={<ReportTrip handleModal={handleReportModal} id={id} />}
      />
    </div>
  );
};

type ActionButtonProps = {
  icon?: ReactNode;
  color: string;
  text: string;
  onClick?: () => void;
  disabled?: boolean;
};

const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ icon, color, text, onClick, disabled = false }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "px-4 py-2 text-white rounded-[33px] text-sm 3xl:text-base !font-semibold flex items-center gap-2 w-full lg:w-fit",
          color
        )}
        onClick={onClick}
        disabled={disabled}
      >
        {icon} <span>{text}</span>
      </button>
    );
  }
);
ActionButton.displayName = "ActionButton";
