import React, { useEffect, useState } from "react";
import {
  calculateRateGuestsWillSee,
  calculateServiceFee,
} from "@/utils/functions";
import { standardServiceFeeInPercentage } from "@/utils/constants";
import InputField from "@repo/ui/inputField";
import Tooltip from "@repo/ui/tooltip";

import {
  formatNumberWithCommas,
  isPercentageField,
  stripNonNumeric,
} from "@/utils/formatters";

type PricingRowProps = {
  optional?: boolean;
  title: string;
  rateLabel: string;
  rateName: string;
  ratePlaceholder: string;
  rateUnit: string;
  serviceFeeName: string;
  guestWillSeeName: string;
  rateValue: string;
  errors: any;
  touched: any;
  tooltipDescription?: string;
  tooltipTitle?: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
};

const PricingRow = ({
  optional,
  title,
  rateLabel,
  rateName,
  ratePlaceholder,
  rateUnit,
  serviceFeeName,
  guestWillSeeName,
  rateValue,
  errors,
  touched,
  tooltipDescription = "",
  tooltipTitle = "",
  handleChange,
  handleBlur,
}: PricingRowProps) => {
  const [serviceFee, setServiceFee] = useState<number>(0);
  const [guestWillSee, setGuestWillSee] = useState<number>(0);

  const handleFormattedNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    let cleaned = stripNonNumeric(value);

    if (isPercentageField(name)) {
      // Limit to 100% max if needed
      if (Number(cleaned) > 100) cleaned = "100";
      e.target.value = cleaned ? `${cleaned}%` : "";
    } else {
      e.target.value = formatNumberWithCommas(cleaned);
    }

    handleChange(e);
  };

  useEffect(() => {
    const unformatted = stripNonNumeric(rateValue.replace(/%/g, ""));
    const value = parseFloat(unformatted);

    if (rateValue === "" || isNaN(value)) {
      setServiceFee(0);
      setGuestWillSee(0);
    } else {
      const calculatedFee = calculateServiceFee(
        value,
        standardServiceFeeInPercentage
      );
      setServiceFee(calculatedFee);
      setGuestWillSee(calculateRateGuestsWillSee(value, calculatedFee));
    }
  }, [rateValue]);

  return (
    <div className="flex flex-col md:flex-row flex-wrap lg:flex-nowrap gap-6 md:items-center justify-between w-full pb-10 sm:pb-5 md:pb-0">
      <p className=" text-sm  text-nowrap min-w-[200px] text-grey-600">
        <span className="label font-semibold flex justify-between items-center gap-1 text-sm">
          {title}
          {tooltipDescription && (
            <Tooltip
              title={tooltipTitle || ""}
              description={tooltipDescription || ""}
            />
          )}
        </span>
        {optional && (
          <>
            <br /> (optional)
          </>
        )}
      </p>
      <div className="flex flex-col sm:flex-row sm:items-center flex-wrap lg:flex-nowrap gap-8">
        <div className="flex items-center gap-2">
          <InputField
            name={rateName}
            id={rateName}
            type="text"
            label={rateLabel}
            placeholder={ratePlaceholder}
            value={rateValue}
            onChange={handleFormattedNumberChange} // 👈 use custom handler
            onBlur={handleBlur}
            error={
              errors[rateName] && touched[rateName] ? errors[rateName] : ""
            }
            inputClass="text-right"
            className="sm:w-[150px] md:w-[180px]"
          />
          <p className="text-sm text-nowrap mt-5">{rateUnit}</p>
        </div>
        <div className="flex items-center gap-2">
          <InputField
            name={serviceFeeName}
            id={serviceFeeName}
            type="text"
            label="Service fee"
            placeholder="+NGN0"
            value={`+NGN${formatNumberWithCommas(serviceFee.toFixed(2))}`}
            inputClass="text-right"
            className="sm:w-[150px] md:w-[180px]"
            disabled
          />
          <p className="text-sm text-nowrap mt-5">{rateUnit} </p>
        </div>
        <div className="flex items-center gap-2">
          <InputField
            name={guestWillSeeName}
            id={guestWillSeeName}
            type="text"
            label="Guests will see"
            placeholder="NGN0"
            value={`NGN${formatNumberWithCommas(guestWillSee.toFixed(2))}`}
            inputClass="text-right"
            className="sm:w-[150px] md:w-[180px]"
            disabled
          />
          <p className="text-sm text-nowrap mt-5">{rateUnit} </p>
        </div>
      </div>
    </div>
  );
};

export default PricingRow;
