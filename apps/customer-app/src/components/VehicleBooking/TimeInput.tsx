import cn from "classnames";
import TimePicker from "@/components/TimePicker";

const TimeInput = ({
  onChange,
  value,
  error,
  name,
  label,
  ...rest
}: {
  onChange: (value: Date) => void;
  value: Date | null;
  error?: string;
  label?: string;
  name: string;
  [key: string]: any;
}) => {
  return (
    <div className="w-full">
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
        <TimePicker
          name={name}
          value={value}
          onChange={onChange}
          width="w-full"
          showArrow={false}
        />
      </div>
      {error && (
        <p className="text-error-500 text-sm mt-2 text-left">{error}</p>
      )}
    </div>
  );
};

export default TimeInput;
