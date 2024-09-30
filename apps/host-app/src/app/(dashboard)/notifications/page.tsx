"use client";

import useNotifications from "@/components/Notifications/useNotifications";
import Notifications from "@/components/Notifications";
import Pagination from "@repo/ui/pagination";

export default function ListingsPage() {
  const {
    notifications,
    isError,
    isLoading,

    currentPage,
    setCurrentPage,
    pageLimit,
    totalItemsCount,
    totalUnread,
  } = useNotifications({ pageLimit: 20 });

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
        totalCount={totalItemsCount}
        pageLimit={pageLimit}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </main>
  );
}
