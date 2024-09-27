import TableCell from "../TableCell";
import { BookingInformation } from "@/utils/types";
import MoreButton from "@repo/ui/moreButton";

const BookingRow = ({ items }: { items: BookingInformation }) => {
  return (
    <tr>
      <TableCell content={items?.vehicle?.listingName} />
      <TableCell content={items?.guestName} className="text-grey-900" />
      <TableCell content={items?.id} />
      <TableCell content={items?.bookingType} />
      <TableCell content={`${items?.duration} days`} />
      <TableCell content={items?.startDate} />
      <TableCell content={items?.endDate} />
      <TableCell content={items?.bookingStatus} isBadge type="booking" />
      <TableCell content={`${items?.currencyCode} ${items?.amount}`} />
      <td>
        <MoreButton />
      </td>
    </tr>
  );
};

export default BookingRow;
