import ActivityCard from "@repo/ui/activityCard";
import useBookingStats from "./hooks/useBookingStats";

type Props = {};

export default function BookingsStats({}: Props) {
  const { bookingStats, isLoading } = useBookingStats();

  return (
    <div className="flex gap-1.5 overflow-auto">
      <ActivityCard
        title="Total Bookings"
        value={`${bookingStats?.totalBookings || `-`}`}
        isLoading={isLoading}
        className="min-w-[180px] w-full"
      />
      <ActivityCard
        title="Active Bookings"
        value={`${bookingStats?.activeBookings || `-`}`}
        isLoading={isLoading}
        className="min-w-[180px] w-full"
      />
      <ActivityCard
        title="Upcoming Bookings"
        value={`${bookingStats?.upcomingBookings || `-`}`}
        isLoading={isLoading}
        className="min-w-[180px] w-full"
      />
    </div>
  );
}
