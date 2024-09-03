"use client";
import React, { ReactNode } from "react";
import cn from "classnames";

type InputFieldProps = {
  name: string;
  id: string;
  type?: string;
  label?: string;
  placeholder: string;
  variant?: "outlined" | "filled";
  icon?: ReactNode;
  value?: string | any;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  toggleShowPassword?: () => void;
  [key: string]: any;
};

const InputField = ({
  id,
  label,
  placeholder,
  variant,
  type,
  icon,
  error,
  toggleShowPassword,
  ...rest
}: InputFieldProps) => (
  <div className="w-full space-y-1">
    {label && (
      <label
        htmlFor={id}
        className={cn(
          "text-sm block font-medium",
          variant === "filled" ? "text-white" : "text-grey-900"
        )}
      >
        {label}
      </label>
    )}
    <div className="relative">
      <input
        type={type || "text"}
        id={id}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-[18px] p-4 pr-8 text-sm h-[56px] gap-[5px] outline-none data-[placeholder]:text-grey-400",
          error
            ? "border border-error-500 focus:border-error-500"
            : variant === "filled"
              ? "bg-grey-800 text-grey-400 border-none"
              : "bg-white text-grey-900 border border-grey-300 hover:border-primary-500 focus:border-primary-500 focus:shadow-[0_0_0_4px_#1E93FF1A]"
        )}
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        {...rest}
      />
      {id === "password" && (
        <div
          className="absolute right-3 bottom-[19px] fill-grey-500 cursor-pointer"
          onClick={toggleShowPassword}
        >
          {icon}
        </div>
      )}
    </div>
    {error && <p className="text-error-500 text-sm mt-2">{error}</p>}
  </div>
);

export default InputField;
