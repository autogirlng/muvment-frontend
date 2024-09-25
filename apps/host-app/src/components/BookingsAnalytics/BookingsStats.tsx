import React from "react";
import ActivityCard from "../ActivityCard";
import useBookingStats from "./hooks/useBookingStats";

type Props = {};

export default function BookingsStats({}: Props) {
  const { bookingStats, isLoading } = useBookingStats();
  return (
    <div className="flex gap-[6px] overflow-auto">
      <ActivityCard
        primary
        title="Total Bookings"
        value={`${bookingStats?.totalBookings || `-`}`}
        isLoading={isLoading}
        className="min-w-[180px] w-full"
      />
      <ActivityCard
        title="Pending Approvals"
        value={`${bookingStats?.pendingApprovals || `-`}`}
        isLoading={isLoading}
        className="min-w-[180px] w-full"
      />
      <ActivityCard
        title="Rejected Bookings"
        value={`${bookingStats?.rejectedBookings || `-`}`}
        isLoading={isLoading}
        className="min-w-[180px] w-full"
      />
      <ActivityCard
        title="Approved Requests"
        value={`${bookingStats?.approvedRequests || `-`}`}
        isLoading={isLoading}
        className="min-w-[180px] w-full"
      />
    </div>
  );
}
