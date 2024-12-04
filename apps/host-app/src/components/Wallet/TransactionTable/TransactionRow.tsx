import { format } from "date-fns";
import { Transaction, TransactionType } from "@/utils/types";
import { Popup } from "@repo/ui/popup";
import MoreButton from "@repo/ui/moreButton";
import Icons from "@repo/ui/icons";
import TableCell from "@/components/TableCell";

const TransactionRow = ({ items }: { items: Transaction }) => {
  return (
    <tr>
      <TableCell
        content={items?.transactionId}
        className="text-grey-900 !font-semibold w-fit"
      />
      <TableCell
        content={
          items?.date
            ? `${format(new Date(items?.date), "MMM d, yyyy")} | ${format(new Date(items?.date), "hh:mma")}`
            : "-"
        }
        className="text-grey-900"
      />
      <TableCell
        content={items?.bookingId || "-"}
        className="text-primary-500"
      />
      <TableCell
        content={items?.type.toLocaleLowerCase()}
        icon={
          items.type === TransactionType.CREDIT
            ? Icons.ic_credit
            : items.type === TransactionType.DEBIT
              ? Icons.ic_debit
              : // : items.type === "Payout"
                //   ? Icons.ic_payout
                ""
        }
        className="capitalize"
      />
      <TableCell content={"-"} />
      <TableCell
        content={items?.origin.toLocaleLowerCase()}
        className="capitalize"
      />
      <TableCell content={`${items.currencyCode} ${items?.amount}`} />
      <TableCell content={items?.status} isBadge type="transaction" />
      <td>
        <Popup
          trigger={<MoreButton />}
          content={
            <>
              <p className="!text-xs 3xl:!text-base !font-semibold">Actions</p>
              <ul className="space-y-2 *:py-2">
                <li className="!text-xs 3xl:!text-base">
                  Download transaction reciept
                </li>
              </ul>
            </>
          }
        />
      </td>
    </tr>
  );
};

export default TransactionRow;
