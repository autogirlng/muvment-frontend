import { useState } from "react";

import BookingHistory from "@/components/BookingsAnalytics/BookingHistory";
import FilterBy from "@repo/ui/filter";
import { bookingFilters } from "@/utils/data";

type Props = {};

export default function Bookings({}: Props) {
  const [filters, setFilters] = useState<Record<string, string[]>>({});

  const handleFilterChange = (selectedFilters: Record<string, string[]>) =>
    setFilters(selectedFilters);

  return (
    <div className="space-y-6 pt-[50px]">
      <div className="flex items-center justify-between gap-3">
        <p className="text-base 3xl:text-xl text-grey-700 !font-medium">
          Booking History
        </p>
        <FilterBy categories={bookingFilters} onChange={handleFilterChange} />
      </div>
      <BookingHistory filters={filters} />
    </div>
  );
}
