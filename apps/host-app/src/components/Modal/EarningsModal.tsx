import DashboardSectionTitle from "../DashboardSectionTitle";
import Icons from "@repo/ui/icons";

type Props = {};

export default function EarningsModal({}: Props) {
  return (
    <div className="space-y-11">
      <div className="flex justify-between items-center">
        <DashboardSectionTitle
          icon={Icons.ic_chart_lines}
          title="Visual Representation Of Earnings"
        />
        {/* filter here */}
      </div>
    </div>
  );
}
