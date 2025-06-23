import React from "react";
import { DatePicker } from "@repo/ui/calendar";
import Icons from "@repo/ui/icons";
import TimePicker from "@/components/TimePicker";
import { format, isBefore, isSameDay, addMinutes } from "date-fns";

interface DateTimePickerColumnProps {
  title: string;
  dateValue: Date | null;
  timeValue: Date | null;
  onDateChange: (value: Date | null) => void;
  onTimeChange: (value: Date) => void;
  isCalendarOpen: boolean;
  onCalendarOpenChange: (open: boolean) => void;
  timePickerName: string;
  // Validation props
  isEndDateTime?: boolean;
  startDate?: Date | null;
  startTime?: Date | null;
  minEndTime?: number; // minimum minutes gap between start and end
}

const DateTimePickerColumn: React.FC<DateTimePickerColumnProps> = ({
  title,
  dateValue,
  timeValue,
  onDateChange,
  onTimeChange,
  isCalendarOpen,
  onCalendarOpenChange,
  timePickerName,
  isEndDateTime = false,
  startDate,
  startTime,
  minEndTime = 30, // default 30 minutes minimum gap
}) => {
  // Helper function to combine date and time
  const combineDateTime = (
    date: Date | null,
    time: Date | null
  ): Date | null => {
    if (!date || !time) return null;

    const combined = new Date(date);
    combined.setHours(time.getHours(), time.getMinutes(), 0, 0);
    return combined;
  };

  // Validation function
  const isValidEndDateTime = (
    endDate: Date | null,
    endTime: Date | null
  ): boolean => {
    if (!isEndDateTime || !startDate || !startTime || !endDate || !endTime) {
      return true; // No validation needed
    }

    const startDateTime = combineDateTime(startDate, startTime);
    const endDateTime = combineDateTime(endDate, endTime);

    if (!startDateTime || !endDateTime) return true;

    // End date/time must be after start date/time plus minimum gap
    const minEndDateTime = addMinutes(startDateTime, minEndTime);
    return !isBefore(endDateTime, minEndDateTime);
  };

  // Get minimum date for end date picker
  const getMinDate = (): Date | null => {
    if (!isEndDateTime || !startDate) return null;
    return startDate;
  };

  // Handle date change with validation
  // Accepts the Value type from DatePicker and converts to Date | null
  const handleDateChange = (value: any) => {
    // Value could be Date, null, or [ValuePiece, ValuePiece] depending on DatePicker implementation
    let newDate: Date | null = null;
    if (value instanceof Date) {
      newDate = value;
    } else if (Array.isArray(value) && value[0] instanceof Date) {
      newDate = value[0];
    } else {
      newDate = null;
    }

    if (isEndDateTime && newDate && startDate && startTime && timeValue) {
      // If selecting end date, check if current time is still valid
      if (!isValidEndDateTime(newDate, timeValue)) {
        // Auto-adjust end time to be valid
        const startDateTime = combineDateTime(startDate, startTime);
        if (startDateTime) {
          const minEndDateTime = addMinutes(startDateTime, minEndTime);

          // If same day, set time to minimum valid time
          if (isSameDay(newDate, startDate)) {
            const adjustedTime = new Date();
            adjustedTime.setHours(
              minEndDateTime.getHours(),
              minEndDateTime.getMinutes(),
              0,
              0
            );
            onTimeChange(adjustedTime);
          }
        }
      }
    }

    onDateChange(newDate);
  };

  // Handle time change with validation
  const handleTimeChange = (newTime: Date) => {
    if (isEndDateTime && dateValue && !isValidEndDateTime(dateValue, newTime)) {
      // If invalid, don't update - you might want to show an error instead
      return;
    }

    onTimeChange(newTime);
  };

  // Check if current selection is invalid
  const isCurrentSelectionInvalid = !isValidEndDateTime(dateValue, timeValue);

  // Determine if time picker should be disabled
  const isTimePickerDisabled = () => {
    if (!isEndDateTime || !startDate || !startTime || !dateValue) {
      return false;
    }

    // If end date is before start date, disable time picker
    return isBefore(dateValue, startDate);
  };

  // Get the appropriate time type for TimePicker
  const getTimeType = () => {
    if (isEndDateTime) {
      return "end" as const;
    }
    return "start" as const;
  };

  return (
    <Column title={title}>
      <div className="flex items-center justify-between gap-1">
        <DatePicker
          value={dateValue}
          onChange={handleDateChange}
          isOpen={isCalendarOpen}
          handleIsOpen={onCalendarOpenChange}
          minDate={getMinDate()}
        >
          <div className="text-black text-xs xl:text-sm flex items-center gap-0.5">
            {dateValue ? (
              <span
                className={`${isCurrentSelectionInvalid ? "text-red-500" : "text-grey-800"}`}
              >
                {format(new Date(dateValue), "dd/MM/yyyy")}
              </span>
            ) : (
              <span className="text-grey-400">
                {format(new Date(), "dd/MM/yyyy")}
              </span>
            )}
            <div
              className={`transition-transform duration-200 ${
                isCalendarOpen ? "rotate-180" : ""
              }`}
            >
              {Icons.ic_chevron_down}
            </div>
          </div>
        </DatePicker>

        <div className="text-black text-xs xl:text-sm">
          <TimePicker
            name={timePickerName}
            value={timeValue}
            onChange={handleTimeChange}
            timeType={getTimeType()}
            disabled={isTimePickerDisabled()}
            className={isCurrentSelectionInvalid ? "text-red-500" : ""}
          />
        </div>
      </div>

      {/* Validation Error Message */}
      {isCurrentSelectionInvalid && (
        <div className="mt-1 text-xs text-red-500">
          End date/time must be at least {minEndTime} minutes after start
          date/time
        </div>
      )}
    </Column>
  );
};

// Reusable Column component
const Column: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <div className="w-full py-3 md:py-0 md:pl-3 md:pr-5">
    <p className="text-grey-400 text-xs xl:text-sm">{title}</p>
    {children}
  </div>
);

export default DateTimePickerColumn;
export { Column };
