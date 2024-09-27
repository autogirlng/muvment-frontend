import BookingAnalyticsTable from "./Table";
import Pagination from "@repo/ui/pagination";
import { FullPageSpinner } from "@repo/ui/spinner";
import { useAppSelector } from "@/lib/hooks";
import useUpcomingBookings from "@/hooks/useUpcomingBookings";
import { useEffect } from "react";

type Props = {};

export default function UpcomingBookings({}: Props) {
  const { upcomingBookings, totalItemsCount } = useAppSelector(
    (state) => state.bookings
  );

  const { isError, error, isLoading, currentPage, setCurrentPage, pageLimit } =
    useUpcomingBookings();

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
        totalCount={totalItemsCount}
        pageLimit={pageLimit}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
