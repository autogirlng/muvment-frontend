// Updated Bookings.tsx
import { useState, useEffect } from "react";
import BookingHistory from "@/components/BookingsAnalytics/BookingHistory";
import BookingCalendar from "@/components/BookingsAnalytics/BookingCalendar";
import FilterBy from "@repo/ui/filter";
import { bookingFilters } from "@/utils/data";
import Icons from "@repo/ui/icons";

type Props = {};

export default function Bookings({}: Props) {
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [viewMode, setViewMode] = useState<"table" | "calendar">("table");
  const [isMobile, setIsMobile] = useState(false);

  const handleFilterChange = (selectedFilters: Record<string, string[]>) =>
    setFilters(selectedFilters);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Force table view on mobile
  useEffect(() => {
    if (isMobile && viewMode === "calendar") {
      setViewMode("table");
    }
  }, [isMobile, viewMode]);

  return (
    <div className="space-y-6 pt-[50px]">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <p className="text-base 3xl:text-xl text-grey-700 !font-medium">
          Booking History
        </p>

        <div className="flex items-center gap-3">
          {/* View Toggle Buttons */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode("table")}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors mx-2 ${
                viewMode === "table"
                  ? "bg-[#0673FF] text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 border-[#D0D5DD] border"
              }`}
            >
              {Icons.ic_note_list}
            </button>
            <button
              onClick={() => !isMobile && setViewMode("calendar")}
              disabled={isMobile}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === "calendar" && !isMobile
                  ? "bg-[#0673FF] text-white shadow-sm"
                  : isMobile
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-600 hover:text-gray-900 border-[#D0D5DD] border"
              }`}
              title={
                isMobile
                  ? "Calendar view not available on mobile"
                  : "Calendar view"
              }
            >
              {Icons.ic_calendar}
            </button>
          </div>

          <FilterBy categories={bookingFilters} onChange={handleFilterChange} />
        </div>
      </div>

      {/* Mobile notification */}
      {isMobile && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-800">
            Calendar view is not available on mobile devices. Use table view for
            the best experience.
          </p>
        </div>
      )}

      {/* Content based on view mode */}
      {viewMode === "table" ? (
        <BookingHistory filters={filters} />
      ) : (
        <BookingCalendar filters={filters} />
      )}
    </div>
  );
}
