import BookingAnalyticsTable from "./Table";
import Pagination from "@repo/ui/pagination";
import { useState } from "react";
import { bookingOverviewTableItems } from "@/utils/data";

type Props = {};

export default function UpcomingBookings({}: Props) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageLimit = 10;
  const totalCount = 10;

  return (
    <div>
      <BookingAnalyticsTable
        items={bookingOverviewTableItems || []}
        emptyStateTitle="No Upcoming Bookings"
        emptyStateMessage="Your Upcoming Bookings Will Appear Here"
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
