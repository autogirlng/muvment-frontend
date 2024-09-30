import useBookings from "@/hooks/useBookings";
import BookingAnalyticsTable from "./Table";
import Pagination from "@repo/ui/pagination";
import { FullPageSpinner } from "@repo/ui/spinner";
import { useAppSelector } from "@/lib/hooks";

type Props = {};

export default function BookingHistory({}: Props) {
  const { bookings, totalItemsCount } = useAppSelector(
    (state) => state.bookings
  );

  const { isError, isLoading, currentPage, setCurrentPage, pageLimit } =
    useBookings();

  return (
    <div className="space-y-4">
      {isLoading ? (
        <FullPageSpinner />
      ) : isError ? (
        <p>something went wrong</p>
      ) : (
        <BookingAnalyticsTable
          items={bookings || []}
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
