import React from "react";
import InputField from "@repo/ui/inputField";

type OutskirtRowProps = {
  rateName: string;
  rateUnit: string;
  regularFeeName: string;
  guestWillSeeName: string;
  rateValue: string;
  errors: any;
  touched: any;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
};

const OutskirtRow = ({
  rateName,
  rateUnit,
  regularFeeName,
  guestWillSeeName,
  rateValue,
  errors,
  touched,
  handleChange,
  handleBlur,
}: OutskirtRowProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center flex-wrap gap-8 pt-8">
      <div className="flex items-center gap-2">
        <InputField
          name={rateName}
          id={rateName}
          type="text"
          label="Extra charge"
          placeholder="+NGN0"
          value={rateValue}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors[rateName] && touched[rateName] ? errors[rateName] : ""}
          inputClass="text-right"
          className="sm:w-[150px] md:w-[180px]"
        />
        <p className="text-sm text-nowrap mt-5">{rateUnit}</p>
      </div>
      <div className="flex items-center gap-2">
        <InputField
          name={regularFeeName}
          id={regularFeeName}
          type="text"
          label="Your Regular fee"
          placeholder={`NGN${0}`}
          value={`NGN${0}`}
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
          placeholder={`NGN${0}`}
          value={`NGN${0}`}
          inputClass="text-right"
          className="sm:w-[150px] md:w-[180px]"
          disabled
        />
        <p className="text-sm text-nowrap mt-5">{rateUnit} </p>
      </div>
    </div>
  );
};

export default OutskirtRow;
