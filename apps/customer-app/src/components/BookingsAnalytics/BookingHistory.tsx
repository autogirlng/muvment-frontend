// Updated BookingHistory.tsx
import { useEffect, useState } from "react";
import Pagination from "@repo/ui/pagination";
import BookingAnalyticsTable from "@/components/BookingsAnalytics/Table";
import BookingCalendar from "@/components/BookingsAnalytics/BookingCalendar";
import useBookings from "./hooks/useBookings";
import { FullPageSpinner } from "@repo/ui/spinner";

type Props = {
  filters?: Record<string, string[]>;
  viewMode?: "table" | "calendar";
};

export default function BookingHistory({ filters, viewMode = "table" }: Props) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageLimit = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const { bookings, totalCount, isError, isLoading } = useBookings({
    currentPage,
    pageLimit: viewMode === "calendar" ? 1000 : pageLimit, // Get more bookings for calendar view
    filters,
  });

  if (isLoading) {
    return <FullPageSpinner className="!min-h-[300px]" />;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  // Render calendar view
  if (viewMode === "calendar") {
    return <BookingCalendar filters={filters} />;
  }

  // Render table view
  return (
    <div className="space-y-4">
      <BookingAnalyticsTable
        items={bookings}
        emptyStateTitle="No Bookings"
        emptyStateMessage="Your Bookings Will Appear Here"
      />

      <Pagination
        currentPage={currentPage}
        totalCount={totalCount}
        pageLimit={pageLimit}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
