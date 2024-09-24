import DashboardSectionTitle from "@/components/DashboardSectionTitle";
import EmptyState from "@/components/EmptyState";
import Icons from "@repo/ui/icons";
import React from "react";

type Props = {};

export default function ListingDetailsUpcomingBookings({}: Props) {
  return (
    <div className="hidden lg:block bg-grey-50 w-full max-w-[320px] 3xl:max-w-[500px] absolute right-0 top-[86px] min-h-screen h-auto px-4 py-[86px]">
      <DashboardSectionTitle icon={Icons.ic_ticket} title="Upcoming Bookings" />
      <EmptyState
        image="/icons/empty_state.png"
        title="No upcoming bookings"
        imageSize=""
      />
    </div>
  );
}
