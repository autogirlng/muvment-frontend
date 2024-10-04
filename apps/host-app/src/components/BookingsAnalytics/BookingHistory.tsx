import BookingAnalyticsTable from "./Table";
import Pagination from "@repo/ui/pagination";
import { FullPageSpinner } from "@repo/ui/spinner";
import { useState } from "react";
import useBookings from "./hooks/useBookings";

type Props = {};

export default function BookingHistory({}: Props) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageLimit = 10;

  const { bookings, totalCount, isError, isLoading } = useBookings({
    currentPage,
    pageLimit,
  });

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
