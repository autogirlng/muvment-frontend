import SelectInput from "@repo/ui/select";
import Image from "next/image";
import React from "react";

type Props = {};

function Calculator({}: Props) {
  return (
    <div
      id="calculator"
      className="bg-grey-900 bg-calculator-overlay bg-contain bg-no-repeat bg-left pt-16 xl:pt-20 3xl:pt-[133px] pb-[100px] xl:pb-[130px] 3xl:pb-[186px] px-5 sm:px-16 3xl:px-[110px]"
    >
      <div className="max-w-[1700px] mx-auto flex flex-col xl:flex-row gap-20 xl:gap-5 3xl:gap-[34px]">
        <div className="space-y-5 text-white">
          <h1 className="text-h3 sm:text-h2 3xl:text-h1 max-w-[860px]">
            Curious about your{" "}
            <span className="text-h2 sm:text-h1 3xl:text-[72px] leading-[72px] text-warning-400">
              30
            </span>{" "}
            days earnings as a Muvment host?
          </h1>
          <p className="max-w-[420px] 3xl:max-w-[640px] text-sm sm:text-base 3xl:text-h6">
            Calculate your potential earnings on the muvment platform with your
            operational specifics
          </p>
        </div>
        <div className="relative mx-auto w-full max-w-[650px] xl:w-[804px] px-5 sm:px-10 3xl:px-16 pt-10 sm:pt-[60px] 3xl:pt-[89px] pb-16 sm:pb-24 3xl:pb-[121px] bg-grey-900 border-2 border-primary-500 rounded-[90px] 3xl:rounded-[118px]">
          <div className="absolute top-[-85px] right-[-10px]">
            <Image
              src="/images/landing/money.png"
              alt="money"
              width={200}
              height={200}
              className="w-[150px] 3xl:w-[200px]"
            />
          </div>
          <p className="uppercase text-white text-center tracking-[9px] 3xl:tracking-[12px] text-sm sm:text-base 3xl:text-h6">
            Income Calculator
          </p>
          <div className="mt-20 3xl:mt-32 mb-[60px] 3xl:mb-[85px] text-white text-center space-y-4">
            <p className="text-sm sm:text-base 3xl:text-h6">
              Potential Earnings
            </p>
            <h1 className="text-h3 sm:text-h2 3xl:text-h1">NGN 0</h1>
          </div>
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-6">
              <SelectInput
                placeholder="Select city of operation"
                variant="filled"
                label="City of operation"
                id="food"
                options={[
                  { value: "lagos", option: "Lagos" },
                  { value: "abj", option: "Lagos" },
                  { value: "kogi", option: "Lagos" },
                  { value: "ogun", option: "Lagos" },
                ]}
              />
              <SelectInput
                placeholder="Select vehicle type"
                variant="filled"
                label="Vehicle type"
                id="food"
                options={[
                  { value: "lagos", option: "Lagos" },
                  { value: "abj", option: "Lagos" },
                  { value: "kogi", option: "Lagos" },
                  { value: "ogun", option: "Lagos" },
                ]}
              />
            </div>
            <SelectInput
              placeholder="Select availability"
              variant="filled"
              label="Availability"
              id="food"
              options={[
                { value: "lagos", option: "Lagos" },
                { value: "abj", option: "Lagos" },
                { value: "kogi", option: "Lagos" },
                { value: "ogun", option: "Lagos" },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
