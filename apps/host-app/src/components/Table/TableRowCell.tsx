import { BadgeStatus } from "@/utils/types";
import Badge from "@repo/ui/badge";

const TableRowCell = ({
  content,
  className,
  isBadge,
}: {
  content: string;
  className?: string;
  isBadge?: boolean;
}) => (
  <td
    className={`px-6 py-[26px] whitespace-nowrap w-full text-sm text-grey-700 ${
      className ?? ""
    }`}
  >
    {isBadge ? <Badge status={content.toLocaleLowerCase() as BadgeStatus} /> : content}
  </td>
);

export default TableRowCell;