import cn from "classnames";
import "react-phone-number-input/style.css";
import "flag-icons/css/flag-icons.min.css";

import {
  getCountries,
  getCountryCallingCode,
} from "react-phone-number-input/input";
import SelectInput from "@repo/ui/select";

type SelectCountryProps = {
  name: string;
  id: string;
  label?: string;
  placeholder: string;
  variant?: "outlined" | "filled";
  value?: string | any;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  onChange: (value: string) => void;
  [key: string]: any;
};

const allowedCountries = ["NG", "GH"];

const SelectCountry = ({
  label,
  id,
  variant,
  value,
  onChange,
  labels,
  error,
  className,
  ...rest
}: SelectCountryProps) => {
  const countryOptions = getCountries()
    .filter((country) => allowedCountries.includes(country))
    .map((country) => ({
      value: country,
      option: `+${getCountryCallingCode(country)}`,
      // option: `${labels[country]} (+${getCountryCallingCode(country)})`,
      flag: `fi fi-${country.toLowerCase()}`,
    }));
  return (
    <div className={cn("w-full space-y-1", className, error && "-mb-[28px]")}>
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
      <SelectInput
        defaultValue="+234"
        variant="outlined"
        id="bank"
        options={countryOptions}
        value={value}
        onChange={(value) => onChange(value)}
        error={error}
        {...rest}
      />
    </div>
  );
};

export default SelectCountry;
