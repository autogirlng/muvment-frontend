import cn from "classnames";
import Icons from "@repo/ui/icons";

type SearchInputProps = {
  name: string;
  variant?: "outlined" | "filled";
  disabled?: boolean;
  inputClass?: string;
  className?: string;
  value?: string | any;
  placeholder?: string;
  [key: string]: any;
};

const SearchInput = ({
  value,
  disabled = false,
  variant,
  name,
  inputClass,
  className,
  placeholder,
  ...rest
}: SearchInputProps) => (
  <div className={cn("relative max-w-[375px]", className)}>
    <div className="absolute left-3 bottom-[14px] text-grey-500 cursor-pointer">
      {Icons.ic_search}
    </div>
    <input
      value={value}
      name={name}
      type="text"
      id="search"
      placeholder={placeholder}
      className={cn(
        "pl-9 w-full rounded-[18px] p-4 text-sm h-12 gap-[5px] outline-none data-[placeholder]:text-grey-400 disabled:bg-grey-100 disabled:text-grey-400 disabled:border-grey-300",
        inputClass,
        variant === "filled"
          ? "bg-grey-800 text-grey-400 border-none"
          : "bg-white text-grey-900 border border-grey-300 hover:border-primary-500 focus:border-primary-500 focus:shadow-[0_0_0_4px_#1E93FF1A]"
      )}
      disabled={disabled}
      {...rest}
    />
  </div>
);

export default SearchInput;
