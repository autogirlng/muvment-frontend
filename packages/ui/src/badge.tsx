import cn from "classnames";

type BookingBadgeProps = {
  status: "accepted" | "pending" | "canceled";
};

export const BookingBadge = ({ status }: BookingBadgeProps) => {
  const badgeColor =
    status === "accepted"
      ? "bg-success-500"
      : status === "canceled"
        ? "bg-error-900"
        : "bg-warning-400";

  return (
    <div
      className={cn(
        "px-3 py-[2px] text-sm font-medium capitalize text-white rounded-xl",
        badgeColor
      )}
    >
      {status}
    </div>
  );
};

type ListingBadgeProps = {
  status: "draft" | "approved" | "pending" | "rejected";
};

export const ListingBadge = ({ status }: ListingBadgeProps) => {
  const badgeColor =
    status === "approved"
      ? "bg-success-100 text-success-600"
      : status === "pending"
        ? "bg-warning-75 text-warning-500"
        : status === "rejected"
          ? "bg-error-100 text-error-600"
          : "bg-grey-300 text-grey-500";

  return (
    <div
      className={cn(
        "px-6 py-2 text-sm 3xl:text-base font-medium capitalize rounded-[121px]",
        badgeColor
      )}
    >
      {status}
    </div>
  );
};

type TransactionBadgeProps = {
  status: "successful" | "pending" | "failed";
};

export const TransactionBadge = ({ status }: TransactionBadgeProps) => {
  const badgeColor =
    status === "successful"
      ? "bg-success-500"
      : status === "failed"
        ? "bg-error-800"
        : "bg-warning-500";

  return (
    <div
      className={cn(
        "px-3 py-[2px] text-sm font-medium capitalize text-white rounded-xl w-fit",
        badgeColor
      )}
    >
      {status}
    </div>
  );
};
