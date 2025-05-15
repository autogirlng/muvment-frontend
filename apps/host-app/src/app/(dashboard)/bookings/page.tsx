"use client";

import DashboardSectionTitle from "@/components/DashboardSectionTitle";
import Icons from "@repo/ui/icons";
import dynamic from "next/dynamic";

// Dynamically import components that may use window
const Bookings = dynamic(() => import("@/components/BookingsAnalytics"), {
  ssr: false,
});
const BookingsStats = dynamic(
  () => import("@/components/BookingsAnalytics/BookingsStats"),
  { ssr: false }
);

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
