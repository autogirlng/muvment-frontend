import { useEffect, useState } from "react";
import { FullPageSpinner } from "@repo/ui/spinner";
import Pagination from "@repo/ui/pagination";
import BookingAnalyticsTable from "@/components/BookingsAnalytics//Table";
import useBookings from "@/components/BookingsAnalytics/hooks/useBookings";

type Props = { search?: string; filters?: Record<string, string[]> };

export default function BookingHistory({ search, filters }: Props) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageLimit = 10;

  const { bookings, totalCount, isError, isLoading } = useBookings({
    currentPage,
    pageLimit,
    search,
    filters,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filters]);

  return (
    <div className="space-y-4">
      {isLoading ? (
        <FullPageSpinner />
      ) : isError ? (
        <p>something went wrong</p>
      ) : (
        <BookingAnalyticsTable
          items={bookings}
          emptyStateTitle="No Bookings"
          emptyStateMessage="Your Bookings Will Appear Here"
        />
      )}

      <Pagination
        currentPage={currentPage}
        totalCount={totalCount}
        pageLimit={pageLimit}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
