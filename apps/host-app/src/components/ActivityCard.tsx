import cn from "classnames";
import { ReactNode } from "react";
import { Spinner } from "@repo/ui/spinner";
import { FullPageDialog } from "@repo/ui/dialog";
import EarningsModal from "@/components/Modal/EarningsModal";

type Props = {
  primary?: boolean;
  title: string;
  value: string;
  modalTitle?: string;
  modalName?: string;
  modalIcon?: ReactNode;
  isLoading?: boolean;
  className?: string;
};

export default function ActivityCard({
  primary,
  title,
  value,
  modalTitle,
  modalName,
  modalIcon,
  isLoading,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "rounded-xl px-4 py-6 space-y-4",

        primary && value !== "-"
          ? "bg-primary-500 border border-grey-200 text-white"
          : "bg-white border border-grey-200 text-grey-500",
        className
      )}
    >
      <div className="flex justify-between gap-2 text-xs 2xl:text-sm">
        <p>{title}</p>
        {modalTitle && (
          <FullPageDialog
            title="Earnings"
            trigger={
              <button className="flex items-center gap-2 ">
                {modalIcon}
                <span>{modalTitle}</span>
              </button>
            }
            content={<EarningsModal />}
          />
        )}
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <h2
          className={cn(
            "text-h3 2xl:text-4xl",
            primary && value !== "-" ? "text-white" : "text-black"
          )}
        >
          {value}
        </h2>
      )}
    </div>
  );
}
