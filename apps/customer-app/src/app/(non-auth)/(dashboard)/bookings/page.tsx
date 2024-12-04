"use client";

import Bookings from "@/components/BookingsAnalytics";
import BookingsStats from "@/components/BookingsAnalytics/BookingsStats";
import DashboardSectionTitle from "@/components/DashboardSectionTitle";

export default function BookingsPage() {
  return (
    <main className="py-8 2xl:py-11">
      <div className="space-y-10">
        <DashboardSectionTitle title="My Bookings" />
        <BookingsStats />
      </div>
      <Bookings />
    </main>
  );
}
