import { GroupCheckBox } from "@repo/ui/checkbox";
import { useState } from "react";
import useUpdateRentalAvailability from "./hooks/useUpdateRentalAvailability";
import { daysOfTheWeek } from "@/utils/data";
import Button from "@repo/ui/button";
import { FullPageSpinner } from "@repo/ui/spinner";

type Props = {};

export default function RentalAgreement({}: Props) {
  const {
    rentalAvalabilityDays,
    setRentalAvalabilityDays,
    isError,
    error,
    isLoading,

    updateRentalAvailability,
  } = useUpdateRentalAvailability();

  return (
    <div className="space-y-8 text-base md:text-xl 3xl:text-h6 text-grey-700">
      <h6 className="!font-semibold">Rental Availability</h6>
      <p className="!font-medium">
        You are going to provide rides on the following days
      </p>
      <div className="space-y-3 text-black">
        {isLoading ? (
          <FullPageSpinner className="min-h-[300px]" />
        ) : (
          daysOfTheWeek.map((day, index) => (
            <div
              key={index}
              className="bg-white rounded-xl py-6 px-7 flex items-center gap-2"
            >
              <GroupCheckBox
                key={day}
                feature={day}
                checkedValues={rentalAvalabilityDays}
                onChange={(feature: string, isChecked: boolean) => {
                  if (isChecked) {
                    const newValues = [...rentalAvalabilityDays, feature];
                    setRentalAvalabilityDays(newValues);
                  } else {
                    const newValues = rentalAvalabilityDays.filter(
                      (value) => value !== feature
                    );
                    setRentalAvalabilityDays(newValues);
                  }
                }}
              />
            </div>
          ))
        )}
        <Button
          variant="filled"
          color="primary"
          className="!py-3 !px-5 !text-sm"
          onClick={() => updateRentalAvailability.mutate(rentalAvalabilityDays)}
          loading={updateRentalAvailability.isPending}
        >
          Update
        </Button>
      </div>
    </div>
  );
}
