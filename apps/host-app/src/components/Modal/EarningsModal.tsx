import DashboardSectionTitle from "../DashboardSectionTitle";
import Icons from "@repo/ui/icons";
import Chart from "react-apexcharts";

type Props = {};

export default function EarningsModal({}: Props) {
  const state = {
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
        categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
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
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70],
      },
    ],
  };
  return (
    <div className="space-y-11">
      <div className="flex justify-between items-center">
        <DashboardSectionTitle
          icon={Icons.ic_chart_lines}
          title="Visual Representation Of Earnings"
        />
        {/* filter here */}
      </div>
      <Chart
        options={state.options}
        series={state.series}
        type="bar"
        height="350"
      />
    </div>
  );
}
