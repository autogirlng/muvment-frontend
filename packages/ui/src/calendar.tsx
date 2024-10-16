import Icons from "@repo/ui/icons";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";
import Button from "@repo/ui/button";
import { Popup } from "@repo/ui/popup";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const DateRangeCalendar = ({
  title,
  selectRange,
  value,
  onChange,
}: {
  title: string;
  selectRange: boolean;
  value: Value;
  onChange: (value: Value) => void;
}) => {
  const clearAll = () => {
    onChange(null);
  };

  return (
    <Popup
      className="w-[280px] sm:w-[380px]"
      trigger={<button>{Icons.ic_calendar}</button>}
      content={
        <>
          <div className="flex justify-between items-center mb-3">
            <p className="text-sm 3xl:text-base font-semibold text-grey-700">
              {title}
            </p>
            <button
              onClick={clearAll}
              className="text-xs 3xl:text-sm text-primary-500 flex items-center gap-1 *:w-4 *:h-4 *:ml-1"
            >
              Clear all {Icons.ic_cancel_circle}
            </button>
          </div>
          <Calendar
            onChange={onChange}
            value={value}
            selectRange={selectRange}
            next2Label={null}
            prev2Label={null}
            className="!border-none !w-full !text-black !text-xs"
            nextLabel={Icons.ic_chevron_right}
            prevLabel={Icons.ic_chevron_left}
          />
          <div className="flex justify-between gap-4 mt-8">
            <Button fullWidth>back</Button>
            <Button color="primary" varian="filled" fullWidth>
              done
            </Button>
          </div>
        </>
      }
    />
  );
};

export default DateRangeCalendar;
