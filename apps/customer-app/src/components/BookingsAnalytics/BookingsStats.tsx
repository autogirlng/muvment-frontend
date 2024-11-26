import ActivityCard from "@repo/ui/activityCard";

type Props = {};

const bookingStats = {
  totalBookings: "200",
  pendingApprovals: "200",
  rejectedBookings: "200",
  approvedRequests: "200",
};

export default function BookingsStats({}: Props) {
  return (
    <div className="flex gap-1.5 overflow-auto">
      <ActivityCard
        primary
        title="Total Bookings"
        value={`${bookingStats?.totalBookings || `-`}`}
        isLoading={false}
        className="min-w-[180px] w-full"
      />
      <ActivityCard
        title="Pending Approvals"
        value={`${bookingStats?.pendingApprovals || `-`}`}
        isLoading={false}
        className="min-w-[180px] w-full"
      />
      <ActivityCard
        title="Rejected Bookings"
        value={`${bookingStats?.rejectedBookings || `-`}`}
        isLoading={false}
        className="min-w-[180px] w-full"
      />
      <ActivityCard
        title="Approved Requests"
        value={`${bookingStats?.approvedRequests || `-`}`}
        isLoading={false}
        className="min-w-[180px] w-full"
      />
    </div>
  );
}
