import Link from "next/link";
import { format } from "date-fns";
import { ReactNode } from "react";
import {
  BookingBadgeStatus,
  BookingInformation,
  TransactionStatus,
} from "@/utils/types";
import { Popup } from "@repo/ui/popup";
import { BookingTableBadge, TransactionBadge } from "@repo/ui/badge";
import MoreButton from "@repo/ui/moreButton";
import DeclineTrip from "@/components/BookingsAnalytics/Details/modals/DeclineTrip";
import AcceptTrip from "@/components/BookingsAnalytics/Details/modals/AcceptTrip";
import useBookingActions from "@/components/BookingsAnalytics/hooks/useBookingActions";

const TableCell = ({
  title,
  content,
  isBadge,
  type,
}: {
  title: string;
  content: string | ReactNode;
  isBadge?: boolean;
  type?: "transaction" | "booking";
}) => (
  <div className="text-sm w-full flex gap-5 items-center justify-between">
    <span className="text-grey-700 w-1/2">{title}</span>
    <span className="font-semibold text-grey-700 w-1/2 break-all">
      {isBadge ? (
        type === "transaction" ? (
          <TransactionBadge status={content as TransactionStatus} />
        ) : (
          <BookingTableBadge status={content as BookingBadgeStatus} />
        )
      ) : (
        content
      )}
    </span>
  </div>
);

const BookingMobileRow = ({ items }: { items: BookingInformation }) => {
  const {
    openAcceptModal,
    handleAcceptModal,
    acceptBooking,

    openDeclineModal,
    handleDeclineModal,
    declineBooking,
  } = useBookingActions({ id: items.id });
  return (
    <div className="space-y-3 pt-5 pb-3 border-b border-grey-300">
      <Popup
        trigger={<MoreButton className="!mx-0 !ml-auto" />}
        content={
          <>
            <p className="!text-xs 3xl:!text-base !font-semibold">Actions</p>
            <ul className="space-y-2 *:py-2">
              {items.bookingStatus !== BookingBadgeStatus.APPROVED &&
                items.bookingStatus !== BookingBadgeStatus.ACCEPTED && (
                  <>
                    <li>
                      <DeclineTrip
                        openModal={openDeclineModal}
                        handleModal={() => handleDeclineModal()}
                        isLoading={declineBooking.isPending}
                        handleAction={() => declineBooking.mutate()}
                        trigger={
                          <button className="!text-xs 3xl:!text-base ">
                            Decline Trip
                          </button>
                        }
                      />
                    </li>
                    <li>
                      <AcceptTrip
                        openModal={openAcceptModal}
                        handleModal={() => handleAcceptModal()}
                        isLoading={acceptBooking.isPending}
                        handleAction={() => acceptBooking.mutate()}
                        trigger={
                          <button className="!text-xs 3xl:!text-base ">
                            Accept Trip
                          </button>
                        }
                      />
                    </li>
                  </>
                )}
              <li>
                <Link
                  href={`/bookings/${items?.id}`}
                  className="!text-xs 3xl:!text-base"
                >
                  View Booking Details
                </Link>
              </li>
            </ul>
          </>
        }
      />
      <TableCell title="Guest Name" content={items?.guestName} />
      <TableCell title="Booking ID" content={items?.id} />
      <TableCell title="Booking Type" content={items?.bookingType} />
      <TableCell title="Duration" content={`${items?.duration} days`} />
      <TableCell title="Vehicle" content={items?.vehicle?.listingName} />
      <TableCell
        title="Start Date"
        content={
          items?.startDate
            ? format(new Date(items?.startDate), "MMM d ,yyyy")
            : ""
        }
      />
      <TableCell
        title="End Date"
        content={
          items?.endDate ? format(new Date(items?.endDate), "MMM d ,yyyy") : ""
        }
      />

      <TableCell
        title="Status"
        content={items?.bookingStatus}
        isBadge
        type="booking"
      />
      <TableCell
        title="Price"
        content={`${items?.currencyCode} ${items?.amount}`}
      />
    </div>
  );
};

export default BookingMobileRow;
