import { useEffect, useState } from "react";
import Pagination from "@repo/ui/pagination";
import BookingAnalyticsTable from "@/components/BookingsAnalytics//Table";
import useBookings from "./hooks/useBookings";
import { FullPageSpinner } from "@repo/ui/spinner";

type Props = { filters?: Record<string, string[]> };

export default function BookingHistory({ filters }: Props) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageLimit = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const { bookings, totalCount, isError, isLoading } = useBookings({
    currentPage,
    pageLimit,
    filters,
  });

  if (isLoading) {
    return <FullPageSpinner className="!min-h-[300px]" />;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

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
