import React, { ChangeEvent, useEffect, useState } from "react";
import InputField from "@repo/ui/inputField";

type DiscountRowProps = {
  title: string;
  dailyRateValue?: string;
  percentageLabel: string;
  percentageName: string;
  percentagePlaceholder: string;
  rateUnit: string;
  serviceFeeName: string;
  rateValue: string;
  errors: any;
  touched: any;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
};

const DiscountRow = ({
  title,
  dailyRateValue,
  percentageLabel,
  percentageName,
  percentagePlaceholder,
  rateUnit,
  serviceFeeName,
  rateValue,
  errors,
  touched,
  handleChange,
  handleBlur,
}: DiscountRowProps) => {
  const [whatYouWillReceive, setWhatYouWillReceive] = useState<number>(0);

  const calculateDiscount = (dailyRateValue: string, rateValue: string) => {
    const valueInPercentage = parseInt(rateValue);
    const dailyRate = parseInt(dailyRateValue);
    const discountValue = (valueInPercentage / 100) * dailyRate;
    return dailyRate - discountValue;
  };

  useEffect(() => {
    if (dailyRateValue) {
      if (dailyRateValue === "" || rateValue === "") {
        setWhatYouWillReceive(0);
      } else {
        const value = calculateDiscount(dailyRateValue, rateValue);
        setWhatYouWillReceive(value);
      }
    }
  }, [dailyRateValue, rateValue]);

  return (
    <div className="flex flex-col md:flex-row flex-wrap gap-6 md:items-center justify-between w-full pb-10 sm:pb-5 md:pb-0">
      <p className="text-sm font-semibold text-nowrap min-w-[200px] text-grey-600">
        {title}
      </p>
      <div className="flex flex-col sm:flex-row sm:items-center flex-wrap gap-8">
        <div className="flex items-center gap-2">
          <InputField
            name={percentageName}
            id={percentageName}
            type="text"
            label={percentageLabel}
            placeholder={percentagePlaceholder}
            value={rateValue}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              errors[percentageName] && touched[percentageName]
                ? errors[percentageName]
                : ""
            }
            inputClass="text-right"
            className="sm:w-[150px] md:w-[180px]"
          />
          <p className="text-sm text-nowrap mt-5">/day</p>
        </div>
        <div className="flex items-center gap-2">
          <InputField
            name={serviceFeeName}
            id={serviceFeeName}
            type="text"
            label="You'll receive"
            placeholder="NGN0"
            value={`NGN${whatYouWillReceive}`}
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

export default DiscountRow;
