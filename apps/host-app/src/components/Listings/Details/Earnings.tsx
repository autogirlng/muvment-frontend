import ActivityCard from "@/components/ActivityCard";
import { EarningsStatistics } from "@/utils/types";
import React from "react";

type Props = { statistics: EarningsStatistics | null | undefined };

export default function ListingDetailsEarnings({ statistics }: Props) {
  return (
    <div className="space-y-7">
      <p className="text-base 3xl:text-xl text-grey-700 font-medium">
        Earnings
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[6px]">
        <ActivityCard
          primary
          title="Revenue Generated"
          value={`${statistics?.totalRevenue || "-"}`}
        />
        <ActivityCard
          title="Number Of Customers"
          value={`${statistics?.numberOfCustomers || "-"}`}
        />
        <ActivityCard
          title="Bookings Completed"
          value={`${statistics?.bookingsCompleted || "-"}`}
        />
        <ActivityCard
          title="Canceled Bookings"
          value={`${statistics?.canceledBookings || "-"}`}
        />
      </div>
    </div>
  );
}
