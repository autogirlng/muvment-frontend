"use client";
import React, { ChangeEvent, ReactNode } from "react";
import cn from "classnames";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "flag-icons/css/flag-icons.min.css";

type PhoneNumberFieldProps = {
  name: string;
  id: string;
  label?: string;
  placeholder: string;
  variant?: "outlined" | "filled";
  value?: string | any;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  // onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onChange: any;
  [key: string]: any;
};

const PhoneNumberField = ({
  id,
  label,
  placeholder,
  variant,
  error,
  onChange,
  ...rest
}: PhoneNumberFieldProps) => (
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
    <PhoneInput
      countrySelectProps={{
        renderCountryFlag: (country: string) => (
          <span className={`fi fi-${country.toLowerCase()} fis`}></span>
        ),
      }}
      numberInputProps={{
        className: cn(
          "w-full rounded-[18px] p-4 pr-8 text-sm h-[56px] gap-[5px] outline-none data-[placeholder]:text-grey-400",
          error
            ? "border border-error-500 focus:border-error-500"
            : variant === "filled"
              ? "bg-grey-800 text-grey-400 border-none"
              : "bg-white text-grey-900 border border-grey-300 hover:border-primary-500 focus:border-primary-500 focus:shadow-[0_0_0_4px_#1E93FF1A]"
        ),
      }}
      placeholder={placeholder}
      onChange={onChange}
      international
      defaultCountry="NG"
      // flags={flags}
      // disabled={disabled ? true : false}
      {...rest}
    />
    {error && <p className="text-error-500 text-sm mt-2">{error}</p>}
  </div>
);

export default PhoneNumberField;
