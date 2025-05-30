// BookingCalendar.tsx - Updated with new header design and status-based colors
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import useBookings from "./hooks/useBookings";
// import mockUseBookings from "./hooks/mockUseBookings";
import { FullPageSpinner } from "@repo/ui/spinner";

type Props = {
  filters?: Record<string, string[]>;
};

// Updated booking interface based on your API response
interface Booking {
  id: string;
  startDate: string;
  endDate: string;
  duration: number;
  bookingType: "SINGLE_DAY" | "MULTI_DAY";
  amount: number;
  paymentStatus: string;
  paymentMethod: string;
  bookingStatus: string;
  guestName: string;
  guestEmail: string;
  guestPhoneNumber: string;
  pickupLocation: string;
  dropoffLocation: string;
  currencyCode: string;
  vehicleId: string;
  userId: string;
  hostId?: string; // Made optional for compatibility
  createdAt: string;
  updatedAt: string;
  vehicle: {
    id?: string;
    listingName: string;
    location?: string;
    vehicleType: string;
    make: string;
    model: string;
    yearOfRelease: string;
    vehicleColor: string;
    numberOfSeats: number;
    // ... other vehicle properties
  };
}

// Booking status colors matching your system
const getStatusColor = (status: string) => {
  switch (status.toUpperCase()) {
    case "CONFIRMED":
      return "bg-[#D9FFDE] text-black";
    case "COMPLETED":
      return "bg-primary-100 text-primary-800";
    case "APPROVED":
      return "bg-[#FFE0E0] text-emerald-800";
    case "PENDING":
      return "bg-[#FEF6E7] text-orange-800";
    case "CANCELLED":
      return "bg-red-100 text-red-800";
    case "REFUND":
      return "bg-yellow-100 text-yellow-800";
    case "ACCEPTED":
      return "bg-[#D9FFDE] text-green-800";
    case "DRIVER_ASSIGNED":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-[#D0D5DD] text-gray-800";
  }
};

// Day background colors based on booking status
const getDayBackgroundColor = (bookings: Booking[]) => {
  if (bookings.length === 0) return "";

  // Get the most important status (priority order)
  const statusPriority = {
    CONFIRMED: 1,
    APPROVED: 2,
    ACCEPTED: 3,
    DRIVER_ASSIGNED: 4,
    COMPLETED: 5,
    PENDING: 6,
    CANCELLED: 7,
    REFUND: 8,
  };

  const sortedBookings = bookings.sort((a, b) => {
    const priorityA =
      statusPriority[
        a.bookingStatus.toUpperCase() as keyof typeof statusPriority
      ] || 9;
    const priorityB =
      statusPriority[
        b.bookingStatus.toUpperCase() as keyof typeof statusPriority
      ] || 9;
    return priorityA - priorityB;
  });

  const primaryStatus = sortedBookings[0].bookingStatus.toUpperCase();

  switch (primaryStatus) {
    case "CONFIRMED":
    case "APPROVED":
    case "ACCEPTED":
      return "bg-[#D9FFDE]"; // Green for confirmed/approved bookings
    case "COMPLETED":
      return "bg-primary-200"; // Blue for completed
    case "DRIVER_ASSIGNED":
      return "bg-purple-200"; // Purple for driver assigned
    case "PENDING":
      return "bg-yellow-200"; // Yellow/orange for pending
    case "CANCELLED":
      return "bg-red-200"; // Red for cancelled
    case "REFUND":
      return "bg-[#FEF6E7]"; // Orange for refund
    default:
      return "bg-[#D0D5DD]"; // Gray for others
  }
};

// Payment status colors
const getPaymentStatusColor = (status: string) => {
  switch (status.toUpperCase()) {
    case "PAID":
    case "COMPLETED":
      return "bg-[#D9FFDE] text-green-800";
    case "PENDING":
      return "bg-yellow-100 text-yellow-800";
    case "FAILED":
      return "bg-red-100 text-red-800";
    case "REFUNDED":
      return "bg-primary-100 text-primary-800";
    default:
      return "bg-[#D0D5DD] text-gray-800";
  }
};

export default function BookingCalendar({ filters }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  // Use your existing booking hook with increased limit for calendar view
  const { bookings, isError, isLoading } = useBookings({
    currentPage: 1,
    pageLimit: 1000, // Get all bookings for calendar view
    filters,
  });

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const fullMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: number) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const getBookingsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    return bookings.filter((booking) => {
      if (!booking.startDate || !booking.endDate) return false;

      // Convert API dates to comparable format (YYYY-MM-DD)
      const startDate = new Date(booking.startDate).toISOString().split("T")[0];
      const endDate = new Date(booking.endDate).toISOString().split("T")[0];

      return startDate <= dateStr && endDate >= dateStr;
    });
  };

  const formatBookingTime = (booking: {
    startDate: string;
    endDate: string;
    duration: number;
  }) => {
    const startTime = new Date(booking.startDate);
    const endTime = new Date(booking.endDate);

    // Check if it's the same day
    if (startTime.toDateString() === endTime.toDateString()) {
      return `${format(startTime, "h:mm a")}-${format(endTime, "h:mm a")}`;
    }

    // Multi-day booking
    if (booking.duration > 1) {
      return "All day";
    }

    return `${format(startTime, "h:mm a")}-${format(endTime, "h:mm a")}`;
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="h-20 md:h-24 lg:h-28 border border-gray-200 bg-gray-50"
        ></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayBookings = getBookingsForDate(day);
      const hasBookings = dayBookings.length > 0;
      const dayBgColor = getDayBackgroundColor(dayBookings);
      const isToday =
        new Date().toDateString() ===
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          day
        ).toDateString();

      days.push(
        <div
          key={day}
          className={`h-20 md:h-24 lg:h-28 border-[0.5px] border-[#aaa] p-1 md:p-2 relative cursor-pointer hover:opacity-80 transition-opacity ${
            hasBookings ? dayBgColor : ""
          } ${isToday ? "bg-primary-500" : ""}`}
          onClick={() => setSelectedDate(selectedDate === day ? null : day)}
        >
          <div className="flex justify-between items-start">
            <span
              className={`text-sm font-medium ${
                isToday ? "text-white font-bold" : ""
              }`}
            >
              {day}
            </span>
          </div>

          {hasBookings && (
            <div className="mt-1 space-y-1">
              {dayBookings.slice(0, 2).map((booking, index) => (
                <div
                  key={`${booking.id}-${index}`}
                  className={`text-xs px-1 py-0.5 rounded truncate ${getStatusColor(booking.bookingStatus)}`}
                  title={`${booking.id} - ${booking.bookingStatus} - ${booking.vehicle?.listingName}`}
                >
                  {formatBookingTime(booking)}
                </div>
              ))}
              {dayBookings.length > 2 && (
                <div className="text-xs text-gray-500 font-medium">
                  +{dayBookings.length - 2} more
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  if (isLoading) {
    return <FullPageSpinner className="!min-h-[400px]" />;
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">
          Something went wrong loading the calendar
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border-[0.5px] border-[#667185]">
      {/* New Header Design matching the image */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {/* Left section - Navigation and current month/year */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h2 className="text-base font-medium text-gray-700 min-w-[120px] text-center">
              {fullMonths[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button
              onClick={() => navigateMonth(1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center section - Month selector tabs */}
        <div className="hidden lg:flex items-center space-x-1 bg-gray-100 p-1">
          <table className="border border-[#D0D5DD]">
            <thead>
              {months.map((month, index) => (
                <th
                  key={month}
                  className={`px-1 ${
                    index === currentDate.getMonth()
                      ? "bg-[#0673FF] text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white"
                  }`}
                  onClick={() => {
                    const newDate = new Date(currentDate);
                    newDate.setMonth(index);
                    setCurrentDate(newDate);
                  }}
                >
                  <button className={`px-4 py-2.5 text-sm font-medium`}>
                    {month}
                  </button>
                </th>
              ))}
            </thead>
          </table>
        </div>

        {/* Right section - Filter and year selector */}
        <div className="flex items-center space-x-3">
          <div className="lg:hidden">
            <select
              value={currentDate.getMonth()}
              onChange={(e) => {
                const newDate = new Date(currentDate);
                newDate.setMonth(parseInt(e.target.value));
                setCurrentDate(newDate);
              }}
              className="text-sm border border-gray-300 rounded px-2 py-1"
            >
              {months.map((month, index) => (
                <option key={month} value={index}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <select
            value={currentDate.getFullYear()}
            onChange={(e) => {
              const newDate = new Date(currentDate);
              newDate.setFullYear(parseInt(e.target.value));
              setCurrentDate(newDate);
            }}
            className="text-sm border border-[#D0D5DD] rounded px-5 py-2"
          >
            {Array.from(
              { length: 10 },
              (_, i) => new Date().getFullYear() - 5 + i
            ).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-4">
        {/* Days of week header */}
        <div className="grid grid-cols-7 mb-2">
          {[
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ].map((day) => (
            <div
              key={day}
              className="p-2 text-center text-sm font-medium text-gray-600"
            >
              <span className="hidden md:inline">{day}</span>
              <span className="md:hidden">{day.slice(0, 3)}</span>
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-0">{renderCalendarDays()}</div>
      </div>

      {/* Selected date details */}
      {selectedDate && (
        <div className="border-t border-gray-200 p-4">
          <h3 className="font-medium text-gray-900 mb-3">
            Bookings for {months[currentDate.getMonth()]} {selectedDate},{" "}
            {currentDate.getFullYear()}
          </h3>
          <div className="space-y-3">
            {getBookingsForDate(selectedDate).map((booking) => (
              <div key={booking.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-sm">{booking.id}</p>
                    <p className="text-xs text-gray-600">
                      {booking.vehicle?.listingName}
                    </p>
                    <p className="text-xs text-gray-600">{booking.guestName}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.bookingStatus)}`}
                    >
                      {booking.bookingStatus}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="text-gray-600">Duration</p>
                    <p className="font-medium">
                      {booking.duration} day{booking.duration !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Amount</p>
                    <p className="font-medium">
                      {booking.currencyCode} {booking.amount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Payment</p>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(booking.paymentStatus)}`}
                    >
                      {booking.paymentStatus}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-600">Type</p>
                    <p className="font-medium">
                      {booking.bookingType.replace("_", " ")}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="grid grid-cols-1 gap-2 text-xs">
                    <div>
                      <p className="text-gray-600">Pickup</p>
                      <p className="font-medium">{booking.pickupLocation}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Dropoff</p>
                      <p className="font-medium">{booking.dropoffLocation}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {getBookingsForDate(selectedDate).length === 0 && (
              <p className="text-gray-500 text-sm">No bookings for this date</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
