import { useEffect, useState } from "react";
import Pagination from "@repo/ui/pagination";
import BookingAnalyticsTable from "@/components/BookingsAnalytics//Table";
import { bookingOverviewTableItems } from "@/utils/data";

type Props = { filters?: Record<string, string[]> };

export default function BookingHistory({ filters }: Props) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageLimit = 10;
  const totalCount = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  return (
    <div className="space-y-4">
      <BookingAnalyticsTable
        items={bookingOverviewTableItems}
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
