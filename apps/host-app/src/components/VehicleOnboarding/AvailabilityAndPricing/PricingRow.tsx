import { ChangeEvent, useEffect, useState } from "react";
import { standardServiceFeeInPercentage } from "@/utils/constants";
import InputField from "@repo/ui/inputField";
import {
  calculateRateGuestsWillSee,
  calculateServiceFee,
} from "@/utils/functions";

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
  handleChange,
  handleBlur,
}: PricingRowProps) => {
  const [serviceFee, setServiceFee] = useState(0);
  const [guestWillSee, setGuestWillSee] = useState(0);

  useEffect(() => {
    const value = parseInt(rateValue);

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
      <p className="text-sm font-semibold text-nowrap min-w-[200px] text-grey-600">
        {title}
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
            onChange={handleChange}
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
            value={`+NGN${serviceFee}`}
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
            value={`NGN${guestWillSee}`}
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
