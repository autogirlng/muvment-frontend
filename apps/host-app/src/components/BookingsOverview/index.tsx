import React from "react";
import Icons from "@repo/ui/icons";
import SelectInput from "@repo/ui/select";
import FilterBy from "@repo/ui/filter";
import Table from "@/components/BookingsOverview/BookingTable";
import DashboardSectionTitle from "@/components/DashboardSectionTitle";
import {
  bookingOverviewFilters,
  bookingOverviewTableItems,
  monthsFilter,
} from "@/utils/data";

type Props = {};

export default function BookingsOverview({}: Props) {
  const handleFilterChange = (selectedFilters: Record<string, string[]>) => {
    console.log("Selected filters:", selectedFilters);
  };
  return (
    <div className="space-y-8">
      <DashboardSectionTitle icon={Icons.ic_ticket} title="Bookings" />
      {[].length > 0 && (
        <div className="flex justify-between gap-2">
          <div className="flex gap-2 justify-between items-center w-full">
            <div className="flex gap-2">
              <div className="divide-x divide-grey-300 border border-grey-300 rounded-lg w-fit h-fit flex">
                {monthsFilter.map((month) => (
                  <button
                    className="py-1.5 3xl:py-2 px-3 3xl:px-7 text-grey-600 text-xs 3xl:text-sm"
                    key={month}
                  >
                    {month}
                  </button>
                ))}
              </div>
              <div className="w-[82px]">
                <SelectInput
                  defaultValue={"2024"}
                  variant="outlined"
                  id="year"
                  className="border border-grey-300 rounded-lg !text-xs 3xl:!text-sm font-medium !text-grey-600 !py-2 !px-3 !h-8 3xl:!h-[2.3rem]"
                  options={[
                    { value: "2024", option: "2024" },
                    { value: "2023", option: "2024" },
                    { value: "2022", option: "2024" },
                    { value: "2021", option: "2024" },
                  ]}
                />
              </div>
            </div>

            <FilterBy
              categories={bookingOverviewFilters}
              onChange={handleFilterChange}
            />
          </div>
          {/* <div className="w-[106px]">
          <SelectInput
            variant="outlined"
            id="filter"
            options={[
             
            ]}
          />
        </div> */}
        </div>
      )}
      <Table items={[]} emptyStateMessage="Your Bookings Will Appear Here" />
    </div>
  );
}
