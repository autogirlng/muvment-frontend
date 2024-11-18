import Link from "next/link";
import { format } from "date-fns";
import { BookingBadgeStatus, BookingInformation } from "@/utils/types";
import { Popup } from "@repo/ui/popup";
import MoreButton from "@repo/ui/moreButton";
import TableCell from "@repo/ui/tableCell";
import DeclineTrip from "@/components/BookingsAnalytics/Details/modals/DeclineTrip";
import AcceptTrip from "@/components/BookingsAnalytics/Details/modals/AcceptTrip";
import { BookingTableBadge } from "@repo/ui/badge";
import { useState } from "react";

const BookingDesktopRow = ({ items }: { items: BookingInformation }) => {
  const [openDeclineModal, setOpenDeclineModal] = useState<boolean>(false);
  const handleDeclineModal = () => {
    setOpenDeclineModal(!openDeclineModal);
  };

  const [openAcceptModal, setOpenAcceptModal] = useState<boolean>(false);
  const handleAcceptModal = () => {
    setOpenAcceptModal(!openAcceptModal);
  };

  return (
    <tr>
      <TableCell
        content={items?.guestName}
        className="!text-grey-900 !font-medium"
      />
      <TableCell content={items?.id} />
      <TableCell content={items?.bookingType} />
      <TableCell content={`${items?.duration} days`} />
      <TableCell content={items?.vehicle} />
      <TableCell
        content={
          items?.startDate
            ? format(new Date(items?.startDate), "MMM d ,yyyy")
            : ""
        }
      />
      <TableCell
        content={
          items?.endDate ? format(new Date(items?.endDate), "MMM d ,yyyy") : ""
        }
      />
      <TableCell
        content={items?.bookingStatus}
        isBadge
        badge={<BookingTableBadge status={items?.bookingStatus} />}
      />
      <TableCell content={`${items?.currencyCode} ${items?.amount}`} />
      <td>
        <Popup
          trigger={<MoreButton />}
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
                          isLoading={false}
                          handleAction={() => {}}
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
                          isLoading={false}
                          handleAction={() => {}}
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
      </td>
    </tr>
  );
};

export default BookingDesktopRow;
