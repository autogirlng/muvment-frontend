import cn from "classnames";
import { ReactNode } from "react";
import { FullPageDialog } from "@repo/ui/dialog";
import EarningsModal from "./Modal/EarningsModal";

type Props = {
  primary?: boolean;
  title: string;
  value: string;
  modalTitle?: string;
  modalName?: string;
  modalIcon?: ReactNode;
};

export default function ActivityCard({
  primary,
  title,
  value,
  modalTitle,
  modalName,
  modalIcon,
}: Props) {
  return (
    <div
      className={cn(
        "rounded-xl px-4 py-6 space-y-4",

        primary && value !== "-"
          ? "bg-primary-500 border border-grey-200 text-white"
          : "bg-white border border-grey-200 text-grey-500"
      )}
    >
      <div className="flex justify-between gap-2 text-xs 2xl:text-sm">
        <p>{title}</p>
        {modalTitle && (
          // move this to the earnings modal component
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
      <h2
        className={cn(
          "text-h3 2xl:text-4xl",
          primary && value === "-"
            ? "text-primary-500"
            : primary && value !== "-"
              ? "text-white"
              : "text-black"
        )}
      >
        {value}
      </h2>
    </div>
  );
}
