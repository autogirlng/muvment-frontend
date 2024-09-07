import Icons from "@repo/ui/icons";
import { bookingOverviewTableItems, monthsFilter } from "@/utils/data";
import SelectInput from "@repo/ui/select";
import React from "react";
import Table from "../Table";
import DashboardSectionTitle from "../DashboardSectionTitle";

type Props = {};

export default function BookingsOverview({}: Props) {
  return (
    <div className="space-y-8">
      <DashboardSectionTitle icon={Icons.ic_ticket} title="Bookings" />
      {[].length > 0 && (
        <div className="flex justify-between gap-2">
          <div className="flex gap-2">
            <div className="divide-x divide-grey-300 border border-grey-300 rounded-lg w-fit h-fit">
              {monthsFilter.map((month) => (
                <button
                  className="py-1.5 2xl:py-2.5 px-4 2xl:px-[30px] text-grey-600 text-base 2xl:text-h6"
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
                className="border border-grey-300 rounded-lg text-sm font-medium !text-grey-600 h-5 2xl:h-11"
                options={[
                  { value: "2024", option: "2024" },
                  { value: "2023", option: "2024" },
                  { value: "2022", option: "2024" },
                  { value: "2021", option: "2024" },
                ]}
              />
            </div>
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
