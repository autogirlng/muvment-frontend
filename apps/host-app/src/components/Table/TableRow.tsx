import TableRowCell from "./TableRowCell";
import { BookingOverviewTableRow } from "@/utils/types";
import Icons from "@repo/ui/icons";

const TableRow = ({ items }: { items: BookingOverviewTableRow }) => {
  return (
    <tr>
      <TableRowCell content={items?.vehicle} />
      <TableRowCell content={items?.guestName} className="text-grey-900" />
      <TableRowCell content={items?.bookingId} />
      <TableRowCell content={items?.bookingType} />
      <TableRowCell content={items?.duration} />
      <TableRowCell content={items?.startDate} />
      <TableRowCell content={items?.endDate} />
      <TableRowCell content={items?.status} isBadge />
      <TableRowCell content={items?.price} />
      <td>
        <div className="border border-grey-200 bg-white text-black rounded-lg p-2 w-fit mx-auto">
          {Icons.ic_more}
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
