import React from "react";
import ActivityCard from "@/components/ActivityCard";
import TopRatedVehicle from "@/components/AccountActivity/TopRatedVehicle";
import { TopRatedVehicleType } from "@/utils/types";
import DashboardSectionTitle from "../DashboardSectionTitle";
import { topRatedVehicle } from "@/utils/data";
import Icons from "@repo/ui/icons";

type Props = {};

export default function AccountActivity({}: Props) {
  return (
    <div className="space-y-6 2xl:space-y-8">
      <DashboardSectionTitle
        icon={Icons.ic_activity}
        title="Account Activity"
      />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <div className="grid grid-cols-2 gap-x-5 gap-y-[18px]">
          <ActivityCard
            primary
            title="Total Earnings"
            value="-"
            modalTitle="Show Graph"
            modalName="graph"
            modalIcon={Icons.ic_chart}
          />
          <ActivityCard title="Total onboarded vehicles" value="-" />
          <ActivityCard
            title="Total Completed Rides"
            value="-"
            //      modalTitle="Show Reviews"
            //      modalName="review"
            //      modalIcon={Icons.ic_star_square}
          />
          <ActivityCard title="Total Wallet Balance" value="-" />
        </div>
        <TopRatedVehicle topRatedVehicle={null} />
      </div>
    </div>
  );
}
