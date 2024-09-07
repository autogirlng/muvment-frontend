
import cn from "classnames";

type BadgeProps = {
  status: "accepted" | "pending" | "canceled";
};

const Badge = ({ status }: BadgeProps) => {
  const badgeColor =
    status === "accepted"
      ? "bg-success-500"
      : status === "canceled"
        ? "bg-error-900"
        : "bg-warning-400";

  return (
    <div
      className={cn("px-3 py-[2px] text-sm font-medium capitalize text-white rounded-xl", badgeColor)}
    >
      {status}
    </div>
  );
};
export default Badge;
