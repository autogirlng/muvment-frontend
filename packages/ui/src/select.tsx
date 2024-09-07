import React, { LegacyRef, ReactNode } from "react";

import * as Select from "@radix-ui/react-select";
import cn from "classnames";

type OptionProps = {
  value: string;
  option: string;
};

type SelectInputProps = {
  className?: string;
  defaultValue?: string;
  id: string;
  label?: string;
  placeholder?: string;
  variant?: "outlined" | "filled";
  options: OptionProps[];
  onChange?: (value: string) => void;
  value?: string;
  error?: string;
};

const SelectInput = ({
  className,
  defaultValue,
  id,
  label,
  placeholder,
  variant,
  options,
  value,
  onChange,
  error,
}: SelectInputProps) => {
  return (
    <div className="w-full space-y-2">
      {label && (
        <p
          className={cn(
            "text-base 3xl:text-xl",
            variant === "filled" ? "text-white" : "text-grey-900"
          )}
        >
          {label}
        </p>
      )}
      <Select.Root
        defaultValue={defaultValue}
        value={value}
        onValueChange={onChange}
      >
        <Select.Trigger
          className={cn(
            "flex items-center justify-between w-full rounded-[18px] p-4 text-sm h-[56px] gap-[5px] outline-none data-[placeholder]:text-grey-400",
            variant === "filled"
              ? "bg-grey-800 text-grey-400 border-none"
              : "bg-white text-grey-900 border border-grey-300 hover:border-primary-500 focus:border-primary-500 focus:shadow-[0_0_0_4px_#1E93FF1A]",
            className
          )}
          aria-label={id}
        >
          <Select.Value placeholder={placeholder || ""} />
          <Select.Icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill={variant === "filled" ? "#FFFFFF" : "#000000"}
              viewBox="0 0 256 256"
            >
              <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
            </svg>
          </Select.Icon>
        </Select.Trigger>
        <Select.Content
          position="popper"
          sideOffset={10}
          className={cn(
            "overflow-hidden rounded-3xl",
            variant === "filled"
              ? "bg-grey-800 text-grey-400 border-none"
              : "bg-white border border-grey-300 shadow-[0px_4px_6px_-2px_#10192808,0px_16px_24px_-4px_#10192814]"
          )}
        >
          <Select.Viewport className="px-6 py-[14px]">
            <Select.Group className="space-y-3">
              {options.map((option: OptionProps) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.option}
                </SelectItem>
              ))}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Root>
      {error && <p className="text-error-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

type SelectItemProps = {
  className?: string;
  children: ReactNode;
  value: string;
};

const SelectItem = React.forwardRef(
  (
    { children, className, ...props }: SelectItemProps,
    forwardedRef: LegacyRef<HTMLDivElement>
  ) => {
    return (
      <Select.Item
        className={cn(
          "text-xs 3xl:text-sm flex items-center py-2 h-4 relative select-none data-[disabled]:text-grey-400 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:text-primary-500",
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
      </Select.Item>
    );
  }
);

export default SelectInput;
