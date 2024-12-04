"use client";
import { useCallback, useState } from "react";
import { transactionFilters } from "@/utils/data";
import FilterBy from "@repo/ui/filter";
import Pagination from "@repo/ui/pagination";
import DashboardSectionTitle from "@/components/DashboardSectionTitle";
import TransactionTable from "@/components/Payments/TransactionTable";
import ActivityCard from "@repo/ui/activityCard";
import useTransactions from "@/components/Payments/hooks/useTransactions";
import { FullPageSpinner } from "@repo/ui/spinner";
import useBookingStats from "@/components/BookingsAnalytics/hooks/useBookingStats";

export default function WalletPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const pageLimit = 10;

  const { transactions, totalCount, isError, isLoading } = useTransactions({
    currentPage,
    pageLimit,
    filters,
  });
  const { bookingStats, isLoading: loadingBookingStats } = useBookingStats();

  const handleFilterChange = useCallback(
    (selectedFilters: Record<string, string[]>) => {
      setFilters(selectedFilters);
      setCurrentPage(1);
    },
    []
  );

  return (
    <main className="py-11 space-y-8">
      <DashboardSectionTitle title="My Payments" />

      <ActivityCard
        title="Total Number Of Rides Booked"
        value={`${bookingStats?.totalBookings || `-`}`}
        isLoading={loadingBookingStats}
        className="min-w-[180px] w-full"
      />

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-">
          <p className="text-base 3xl:text-xl text-grey-700 !font-medium">
            Transaction History
          </p>
          <FilterBy
            categories={transactionFilters}
            onChange={handleFilterChange}
          />
        </div>

        {isLoading ? (
          <FullPageSpinner className="!min-h-[300px]" />
        ) : isError ? (
          <p>something went wrong</p>
        ) : (
          <TransactionTable items={transactions} />
        )}

        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={totalCount}
          pageLimit={pageLimit}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </main>
  );
}
