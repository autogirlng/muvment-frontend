import BookingAnalyticsTable from "./Table";
import Pagination from "@repo/ui/pagination";
import { FullPageSpinner } from "@repo/ui/spinner";
import { useState } from "react";
import useUpcomingBookings from "./hooks/useUpcomingBookings";

type Props = {};

export default function UpcomingBookings({}: Props) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageLimit = 10;

  const { upcomingBookings, totalCount, isError, isLoading } =
    useUpcomingBookings({
      currentPage,
      pageLimit,
    });

  return (
    <div>
      {isLoading ? (
        <FullPageSpinner />
      ) : isError ? (
        <p>something went wrong</p>
      ) : (
        <BookingAnalyticsTable
          items={upcomingBookings || []}
          emptyStateTitle="No Upcoming Bookings"
          emptyStateMessage="Your Upcoming Bookings Will Appear Here"
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
