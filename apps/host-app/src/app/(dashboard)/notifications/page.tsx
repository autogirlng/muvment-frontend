"use client";

import { useState } from "react";
import useNotifications from "@/components/Notifications/useNotifications";
import Notifications from "@/components/Notifications";
import Pagination from "@repo/ui/pagination";
import DateRangeCalendar from "@repo/ui/calendar";
import { CalendarValue } from "@/utils/types";

export default function NotificationsPage() {
  const pageLimit = 20;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const {
    notifications,
    isError,
    isLoading,

    totalCount,
    // unreadCount,
  } = useNotifications({ pageLimit, currentPage });
  const [value, onChange] = useState<CalendarValue>(null);

  return (
    <main className="py-[56px] space-y-10">
      <div className="flex justify-between items-center gap-3">
        <h2 className="text-h3 3xl:text-4xl text-grey-700 !font-bold">
          Notifications
        </h2>
        <DateRangeCalendar
          title="Select Date Range"
          selectRange={true}
          value={value}
          onChange={onChange}
        />
      </div>
      <Notifications
        notifications={notifications}
        isError={isError}
        isLoading={isLoading}
        isDivider
      />
      <Pagination
        currentPage={currentPage}
        totalCount={totalCount}
        pageLimit={pageLimit}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </main>
  );
}
