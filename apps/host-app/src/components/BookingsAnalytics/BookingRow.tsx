import TableCell from "../TableCell";
import { BookingBadgeStatus, BookingInformation } from "@/utils/types";
import MoreButton from "@repo/ui/moreButton";
import { Popup } from "@repo/ui/popup";
import { format } from "date-fns";
import Link from "next/link";
import AcceptTrip from "./Details/modals/AcceptTrip";
import DeclineTrip from "./Details/modals/DeclineTrip";

const BookingRow = ({ items }: { items: BookingInformation }) => {
  return (
    <tr>
      <TableCell
        content={items?.guestName}
        className="!text-grey-900 !font-medium"
      />
      <TableCell content={items?.id} />
      <TableCell content={items?.bookingType} />
      <TableCell content={`${items?.duration} days`} />
      <TableCell content={items?.vehicle.listingName} />
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

      <TableCell content={items?.bookingStatus} isBadge type="booking" />
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
                          id={items.id}
                          trigger={
                            <button className="!text-xs 3xl:!text-base ">
                              Decline Trip
                            </button>
                          }
                        />
                      </li>
                      <li>
                        <AcceptTrip
                          id={items.id}
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

export default BookingRow;
