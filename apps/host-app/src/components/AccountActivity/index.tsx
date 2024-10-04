import React from "react";
import ActivityCard from "@/components/ActivityCard";
import TopRatedVehicle from "@/components/AccountActivity/TopRatedVehicle";
import { TopRatedVehicleType } from "@/utils/types";
import DashboardSectionTitle from "@/components/DashboardSectionTitle";
import { topRatedVehicle } from "@/utils/data";
import Icons from "@repo/ui/icons";
import useDashboardStats from "@/hooks/useHostStats";

type Props = {};

export default function AccountActivity({}: Props) {
  const {
    isError,
    isLoading,
    dashboardStats,
  } = useDashboardStats();

  return (
    <div className="space-y-6 2xl:space-y-8">
      <DashboardSectionTitle
        icon={Icons.ic_activity}
        title="Account Activity"
      />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-[18px]">
          <ActivityCard
            primary
            title="Total Earnings"
            value={`${dashboardStats?.totalEarnings || "-"}`}
            modalTitle={dashboardStats?.totalEarnings ? "Show Graph" : ""}
            modalName="graph"
            modalIcon={Icons.ic_chart}
            isLoading={isLoading}
          />
          <ActivityCard
            title="Total onboarded vehicles"
            value={`${dashboardStats?.totalOnboardedVehicles || "-"}`}
            isLoading={isLoading}
          />
          <ActivityCard
            title="Total Completed Rides"
            value={`${dashboardStats?.totalOnboardedVehicles || "-"}`}
            modalTitle={
              dashboardStats?.totalCompletedRides ? "Show Reviews" : ""
            }
            modalName="review"
            modalIcon={Icons.ic_star_square}
            isLoading={isLoading}
          />
          <ActivityCard
            title="Total Wallet Balance"
            value={`${dashboardStats?.walletBalance || "-"}`}
            isLoading={isLoading}
          />
        </div>
        <TopRatedVehicle
          topRatedVehicle={dashboardStats?.topRatedVehicle || null}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
