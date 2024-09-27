import cn from "classnames";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input/input";
import en from "react-phone-number-input/locale/en";
import SelectCountry from "@repo/ui/selectCountry";

type PhoneNumberAndCountryFieldProps = {
  inputName: string;
  selectName: string;

  inputId: string;
  selectId: string;

  label?: string;

  inputPlaceholder: string;
  selectPlaceholder: string;

  inputValue: string | any;
  selectValue: string | any;

  inputOnChange: (value: any) => void;
  selectOnChange: (value: any) => void;

  inputOnBlur: (value: any) => void;
  selectOnBlur: (value: any) => void;

  inputClassname?: string;
  selectClassname?: string;

  inputError?: string;
  selectError?: string;

  inputDisabled?: boolean;
  selectDisabled?: boolean;

  variant?: "outlined" | "filled";
};

const PhoneNumberAndCountryField = ({
  inputName,
  selectName,
  inputId,
  selectId,
  label,
  inputPlaceholder,
  selectPlaceholder,
  inputValue,
  selectValue,
  inputOnChange,
  selectOnChange,
  inputOnBlur,
  selectOnBlur,
  inputClassname,
  selectClassname,
  inputError,
  selectError,
  inputDisabled = false,
  selectDisabled = false,

  variant,
}: PhoneNumberAndCountryFieldProps) => (
  <div
    className={cn(
      "flex gap-1 items-end",
      selectError || (inputError && "pb-5")
    )}
  >
    <SelectCountry
      labels={en}
      name={selectName}
      id={selectId}
      type="text"
      label={label}
      placeholder={selectPlaceholder}
      value={selectValue}
      onChange={selectOnChange}
      error={selectError}
      className={selectClassname}
      onBlur={selectOnBlur}
      disabled={selectDisabled}
    />
    <div className={cn("w-full space-y-1", inputError && "-mb-[25px]")}>
      <PhoneInput
        name={inputName}
        id={inputId}
        type="text"
        className={cn(
          "w-full rounded-[18px] p-4 pr-8 text-sm h-[56px] gap-[5px] outline-none data-[placeholder]:text-grey-400 disabled:bg-grey-100 disabled:text-grey-400 disabled:border-grey-300",
          inputError
            ? "border border-error-500 focus:border-error-500"
            : variant === "filled"
              ? "bg-grey-800 text-grey-400 border-none"
              : "bg-white text-grey-900 border border-grey-300 hover:border-primary-500 focus:border-primary-500 focus:shadow-[0_0_0_4px_#1E93FF1A]",
          inputClassname
        )}
        placeholder={inputPlaceholder}
        onChange={inputOnChange}
        value={inputValue}
        onBlur={inputOnBlur}
        disabled={inputDisabled}
      />
      {inputError && (
        <p className="text-error-500 text-sm mt-2">{inputError}</p>
      )}
    </div>
  </div>
);

export default PhoneNumberAndCountryField;
