"use client";

import { useState } from "react";
import useNotifications from "@/components/Notifications/useNotifications";
import Notifications from "@/components/Notifications";
import Pagination from "@repo/ui/pagination";

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

  return (
    <main className="py-[56px] space-y-10">
      <h2 className="text-h3 3xl:text-4xl text-grey-700 !font-bold">
        Notifications
      </h2>
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
