import Link from "next/link";
import { format } from "date-fns";
import { BookingBadgeStatus, BookingInformation } from "@/utils/types";
import { Popup } from "@repo/ui/popup";
import MoreButton from "@repo/ui/moreButton";
import TableCell from "@repo/ui/tableCell";
import { BookingTableBadge } from "@repo/ui/badge";
import { useState } from "react";
import Icons from "@repo/ui/icons";

const BookingDesktopRow = ({ items }: { items: BookingInformation }) => {
  return (
    <tr>
      <TableCell content={items?.id} />
      <TableCell
        content={items?.bookingStatus}
        isBadge
        badge={<BookingTableBadge status={items?.bookingStatus} />}
      />
      <TableCell
        content={
          items?.startDate
            ? format(new Date(items?.startDate), "MMM d ,yyyy")
            : ""
        }
      />
      <TableCell content={items?.bookingType} />
      <TableCell content={`${items?.duration} days`} />
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

      <TableCell content={`${items?.currencyCode} ${items?.amount}`} />
      <td>
        <Popup
          trigger={
            <button
              className={
                "block border border-grey-200 bg-white text-black rounded-lg p-2 w-fit mx-auto"
              }
            >
              {Icons.ic_more}
            </button>
          }
          content={
            <>
              <p className="!text-xs 3xl:!text-base !font-semibold">Actions</p>
              <ul className="space-y-2 *:py-2">
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
