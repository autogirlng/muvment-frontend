import FilterBy from "@repo/ui/filter";
import DashboardSectionTitle from "../DashboardSectionTitle";
import Icons from "@repo/ui/icons";
import Chart from "react-apexcharts";
import useEarnings from "@/hooks/useEarnings";
import SelectInput from "@repo/ui/select";
import { EarningPeriod } from "@/utils/types";
import { useState, useMemo } from "react";
import { FullPageSpinner } from "@repo/ui/spinner";
import { earningFilters } from "@/utils/data";
import { format } from "date-fns";

export default function EarningsModal() {
  const [period, setSelectPeriod] = useState<EarningPeriod>(EarningPeriod.WEEK);
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [dateRange, setDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });

  const { chartData, totalEarnings, periodStart, periodEnd, isLoading } =
    useEarnings({
      period,
      filters,
      startDate: dateRange.startDate?.toISOString(),
      endDate: dateRange.endDate?.toISOString(),
    });

  const chartState = useMemo(
    () => ({
      options: {
        chart: {
          fontFamily: "inherit",
          foreColor: "#667185",
          id: "basic-bar",
          toolbar: {
            show: false,
          },
        },
        colors: ["#005EFF"],
        dataLabels: {
          enabled: false,
        },
        grid: {
          borderColor: "#F0F2F5",
          strokeDashArray: 4,
        },
        xaxis: {
          categories: chartData.categories,
        },
        plotOptions: {
          bar: {
            colors: {
              backgroundBarColors: [],
              backgroundBarOpacity: 1,
              backgroundBarRadius: 10,
            },
          },
        },
      },
      series: [
        {
          name: "Earnings",
          data: chartData.amounts,
        },
      ],
    }),
    [chartData]
  );

  return (
    <div className="space-y-11">
      <div className="flex justify-between items-center">
        <DashboardSectionTitle
          icon={Icons.ic_chart_lines}
          title="Visual Representation Of Earnings"
        />
        <div className="flex items-center !h-8 space-x-2 justify-between">
          <div className="w-[100px]">
            <SelectInput
              defaultValue={period}
              variant="outlined"
              id="period"
              className="border border-grey-300 rounded-lg !text-xs 3xl:!text-sm font-medium !text-grey-600"
              options={[
                { value: EarningPeriod.WEEK, option: "This Week" },
                { value: EarningPeriod.MONTH, option: "This Month" },
                { value: EarningPeriod.QUARTER, option: "This Year" },
                { value: EarningPeriod.ALL_TIME, option: "All Time" },
              ]}
              onChange={(value) => setSelectPeriod(value as EarningPeriod)}
            />
          </div>
          <FilterBy
            categories={earningFilters}
            onChange={(selectedFilters, newDateRange) => {
              setFilters(selectedFilters);
              if (newDateRange) {
                setDateRange(newDateRange);
              }
            }}
            dateEnabled={true}
          />
        </div>
      </div>

      {isLoading ? (
        <FullPageSpinner />
      ) : (
        <div className="space-y-4">
          {/* <div className="flex justify-between items-center text-grey-700">
            <span className="font-semibold">
              Total Earnings: ${totalEarnings.toLocaleString()}
            </span>
            {periodStart && periodEnd && (
              <span className="text-sm">
                {format(periodStart, "MMM d, yyyy")} -{" "}
                {format(periodEnd, "MMM d, yyyy")}
              </span>
            )}
          </div> */}
          <Chart
            options={chartState.options}
            series={chartState.series}
            type="bar"
            height="300"
          />
        </div>
      )}
    </div>
  );
}
