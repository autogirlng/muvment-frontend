import { BookingBadgeStatus, TransactionBadgeStatus } from "@/utils/types";
import { BookingBadge, TransactionBadge } from "@repo/ui/badge";
import { ReactNode } from "react";

type Props = {
  content: string;
  className?: string;
  isBadge?: boolean;
  type?: "transaction" | "booking";
  icon?: ReactNode;
};

const TableCell = ({ content, className, isBadge, type, icon }: Props) => (
  <td
    className={`px-6 py-[26px] whitespace-nowrap w-full text-sm text-grey-700 ${
      className ?? ""
    }`}
  >
    {icon ? (
      <div className="flex items-center gap-3">
        {icon}
        <span>{content}</span>
      </div>
    ) : isBadge ? (
      type === "transaction" ? (
        <TransactionBadge
          status={content.toLocaleLowerCase() as TransactionBadgeStatus}
        />
      ) : (
        <BookingBadge
          status={content.toLocaleLowerCase() as BookingBadgeStatus}
        />
      )
    ) : (
      content
    )}
  </td>
);

export default TableCell;
