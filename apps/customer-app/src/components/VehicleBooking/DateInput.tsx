import { CalendarValue } from "@/utils/types";
import { DatePicker } from "@repo/ui/calendar";
import cn from "classnames";
import { format } from "date-fns";
import { useState } from "react";

const DateInput = ({
  onChange,
  value,
  error,
  label,
  name,
  minDate,
  maxDate,
  blockPastDates = false,
}: {
  name: string;
  onChange: (value: CalendarValue) => void;
  value: Date | null;
  error?: string;
  label?: string;
  minDate?: Date | null;
  maxDate?: Date | null;
  blockPastDates?: boolean;
}) => {
  const [pickupDateIsOpen, setPickupDateIsOpen] = useState<boolean>(false);

  // If blockPastDates is true, use the later of today or minDate
  const today = new Date();
  const effectiveMinDate = blockPastDates
    ? minDate && minDate > today
      ? minDate
      : today
    : minDate;

  return (
    <DatePicker
      value={value}
      onChange={onChange}
      isOpen={pickupDateIsOpen}
      handleIsOpen={(open: boolean) => setPickupDateIsOpen(open)}
      buttonClass="w-full"
      showMinDate={!!effectiveMinDate}
      minDate={effectiveMinDate}
      maxDate={maxDate}
    >
      {label && (
        <label
          htmlFor={name}
          className={cn(
            "label text-left text-sm block font-medium text-nowrap"
          )}
        >
          <span> {label}</span>
        </label>
      )}
      <div
        className={cn(
          "w-full rounded-[18px] p-4 text-left text-sm h-[56px] gap-[5px] outline-none data-[placeholder]:text-grey-400 disabled:bg-grey-100 disabled:text-grey-400 disabled:border-grey-300",
          error
            ? "border border-error-500 focus:border-error-500"
            : "bg-white text-grey-900 border border-grey-300 hover:border-primary-500 focus:border-primary-500 focus:shadow-[0_0_0_4px_#1E93FF1A]"
        )}
      >
        {value ? (
          <span className="text-grey-800">
            {format(new Date(value), "dd/MM/yyyy")}
          </span>
        ) : (
          <span className="text-grey-400">
            {format(new Date(), "dd/MM/yyyy")}
          </span>
        )}
      </div>
      {error && (
        <p className="text-error-500 text-sm mt-2 text-left">{error}</p>
      )}
    </DatePicker>
  );
};

export default DateInput;
