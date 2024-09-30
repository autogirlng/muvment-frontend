"use client";

import Bookings from "@/components/BookingsAnalytics";
import BookingsStats from "@/components/BookingsAnalytics/BookingsStats";
import DashboardSectionTitle from "@/components/DashboardSectionTitle";
import Icons from "@repo/ui/icons";

export default function BookingsPage() {
  return (
    <main className="py-8 2xl:py-11">
      <div className="space-y-10">
        <DashboardSectionTitle
          title="Booking Analytics"
          icon={Icons.ic_activity}
        />
        <BookingsStats />
      </div>
      <Bookings />
    </main>
  );
}
