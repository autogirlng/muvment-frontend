import React from "react";
import ActivityCard from "@repo/ui/activityCard";
import DashboardSectionTitle from "@/components/DashboardSectionTitle";
import Icons from "@repo/ui/icons";

type Props = {};

export default function AccountActivity({}: Props) {
  const dashboardStats = {
    totalEarnings: "200",
    totalOnboardedVehicles: "200",
    totalCompletedRides: "200",
    walletBalance: "200",
  };

  return (
    <div className="space-y-6 2xl:space-y-8">
      <DashboardSectionTitle
        icon={Icons.ic_activity}
        title="Account Activity"
      />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-[18px]">
          <ActivityCard
            primary
            title="Total Earnings"
            value={`${dashboardStats?.totalEarnings || "-"}`}
            isLoading={false}
          />
          <ActivityCard
            title="Total onboarded vehicles"
            value={`${dashboardStats?.totalOnboardedVehicles || "-"}`}
            isLoading={false}
          />
          <ActivityCard
            title="Total Completed Rides"
            value={`${dashboardStats?.totalOnboardedVehicles || "-"}`}
            isLoading={false}
          />
          <ActivityCard
            title="Total Wallet Balance"
            value={`${dashboardStats?.walletBalance || "-"}`}
            isLoading={false}
          />
        </div>
      </div>
    </div>
  );
}
