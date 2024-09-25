import TableCell from "../TableCell";
import { BookingTableRow } from "@/utils/types";
import MoreButton from "@repo/ui/moreButton";

const BookingRow = ({ items }: { items: BookingTableRow }) => {
  return (
    <tr>
      <TableCell content={items?.vehicle} />
      <TableCell content={items?.guestName} className="text-grey-900" />
      <TableCell content={items?.bookingId} />
      <TableCell content={items?.bookingType} />
      <TableCell content={items?.duration} />
      <TableCell content={items?.startDate} />
      <TableCell content={items?.endDate} />
      <TableCell content={items?.status} isBadge type="booking" />
      <TableCell content={items?.price} />
      <td>
        <MoreButton />
      </td>
    </tr>
  );
};

export default BookingRow;
