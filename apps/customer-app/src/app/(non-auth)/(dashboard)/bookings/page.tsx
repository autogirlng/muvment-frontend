"use client";

import Bookings from "@/components/BookingsAnalytics";
import BookingsStats from "@/components/BookingsAnalytics/BookingsStats";
import DashboardSectionTitle from "@/components/DashboardSectionTitle";
import Icons from "@repo/ui/icons";
import { useRouter } from "next/navigation";
import React from "react";

export default function BookingsPage() {
  const router = useRouter();

  return (
    <main className="py-8 2xl:py-11">
      <div className="space-y-10">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <DashboardSectionTitle title="My Bookings" />
          <button
            onClick={() => router.push("/explore")}
            className="bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white px-6 py-3 sm:px-3 sm:py-3.5 rounded-full font-medium text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2 min-w-[160px] sm:min-w-[180px] shadow-sm hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {React.cloneElement(Icons.ic_add, { className: "w-5 h-5" })}
            <span>New Booking</span>
          </button>
        </div>
        <BookingsStats />
      </div>
      <Bookings />
    </main>
  );
}
