import { TransactionTableRow } from "@/utils/types";
import Icons from "@repo/ui/icons";
import TableCell from "@/components/TableCell";
import MoreButton from "@repo/ui/moreButton";

const TransactionRow = ({ items }: { items: TransactionTableRow }) => {
  return (
    <tr>
      <TableCell
        content={items?.transactionId}
        className="text-grey-900 !font-semibold"
      />
      <TableCell content={items?.date} className="text-grey-900" />
      <TableCell content={items?.bookingId} className="text-primary-500" />
      <TableCell
        content={items?.type}
        icon={
          items.type === "Credit"
            ? Icons.ic_credit
            : items.type === "Debit"
              ? Icons.ic_debit
              : items.type === "Payout"
                ? Icons.ic_payout
                : ""
        }
      />
      <TableCell content={items?.vehicle} />
      <TableCell content={items?.purpose} />
      <TableCell content={items?.amount} />
      <TableCell content={items?.status} isBadge type="transaction" />
      <td>
        <MoreButton />
      </td>
    </tr>
  );
};

export default TransactionRow;
