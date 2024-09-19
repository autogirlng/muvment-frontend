import TableCell from "../TableCell";
import { BookingOverviewTableRow } from "@/utils/types";
import Icons from "@repo/ui/icons";

const BookingRow = ({ items }: { items: BookingOverviewTableRow }) => {
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
        <div className="border border-grey-200 bg-white text-black rounded-lg p-2 w-fit mx-auto">
          {Icons.ic_more}
        </div>
      </td>
    </tr>
  );
};

export default BookingRow;
