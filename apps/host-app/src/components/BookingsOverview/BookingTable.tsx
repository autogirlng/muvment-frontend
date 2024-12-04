import { bookingOverviewTableHeadItems } from "@/utils/data";
import { BookingInformation } from "@/utils/types";
import TableHead from "@/components/TableHead";
import EmptyState from "@/components/EmptyState";
import BookingRow from "@/components/BookingsOverview/BookingRow";

export default function BookingTable({
  items,
  emptyStateMessage,
}: {
  items: BookingInformation[];
  emptyStateMessage: string;
}) {
  return items.length > 0 ? (
    <div className="overflow-auto">
      <table className="w-full min-w-full divide-y divide-grey-200 border-t border-grey-200 bg-white md:mt-7">
        <TableHead tableHeadItems={bookingOverviewTableHeadItems} />
        <tbody className="divide-y divide-grey-200 ">
          {items?.map((item, index) => <BookingRow key={index} items={item} />)}
        </tbody>
      </table>
    </div>
  ) : (
    <EmptyState
      title="No Data Yet"
      message={emptyStateMessage}
      image="/icons/empty_booking_state.png"
    />
  );
}
