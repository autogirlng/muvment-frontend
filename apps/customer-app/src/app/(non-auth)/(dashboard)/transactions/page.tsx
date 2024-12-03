"use client";
import { useState } from "react";
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
  // const transactions = [
  //   {
  //     id: "66ff0e5a5a5291885fbf1392",
  //     transactionId: "TXN-2024-10-77ddfccf-6638",
  //     apiTransactionReference: null,
  //     date: "2024-10-03T21:36:26.138Z",
  //     time: "9:36:26 PM",
  //     amount: 20,
  //     type: "DEBIT",
  //     status: "FAILED",
  //     origin: "WITHDRAWAL",
  //     userId: "66ddb4b8e45560fe9d34df42",
  //     bookingId: null,
  //     currencyCode: "NGN",
  //     createdAt: "2024-10-03T21:36:26.140Z",
  //     updatedAt: "2024-10-03T21:36:29.177Z",
  //   },
  //   {
  //     id: "66fab4c8cf2556cec45b1c49",
  //     transactionId: "TXN-2024-09-aa1925b2-bbd1",
  //     apiTransactionReference: null,
  //     date: "2024-09-30T14:25:11.905Z",
  //     time: "2:25:11 PM",
  //     amount: 100,
  //     type: "DEBIT",
  //     status: "FAILED",
  //     origin: "WITHDRAWAL",
  //     userId: "66ddb4b8e45560fe9d34df42",
  //     bookingId: null,
  //     currencyCode: "NGN",
  //     createdAt: "2024-09-30T14:25:12.233Z",
  //     updatedAt: "2024-09-30T14:25:15.716Z",
  //   },
  //   {
  //     id: "66f79ea036502229e2c136bf",
  //     transactionId: "TXN-2024-09-e1529c1d-5039",
  //     apiTransactionReference: null,
  //     date: "2024-09-28T06:13:52.993Z",
  //     time: "7:13:52 AM",
  //     amount: 850,
  //     type: "DEBIT",
  //     status: "FAILED",
  //     origin: "WITHDRAWAL",
  //     userId: "66ddb4b8e45560fe9d34df42",
  //     bookingId: null,
  //     currencyCode: "NGN",
  //     createdAt: "2024-09-28T06:13:52.994Z",
  //     updatedAt: "2024-09-28T06:13:57.229Z",
  //   },
  //   {
  //     id: "66f79dfe19b4549fcc169d94",
  //     transactionId: "TXN-2024-09-39b2765e-b394",
  //     apiTransactionReference: null,
  //     date: "2024-09-28T06:11:10.960Z",
  //     time: "7:11:10 AM",
  //     amount: 850,
  //     type: "DEBIT",
  //     status: "FAILED",
  //     origin: "WITHDRAWAL",
  //     userId: "66ddb4b8e45560fe9d34df42",
  //     bookingId: null,
  //     currencyCode: "NGN",
  //     createdAt: "2024-09-28T06:11:10.963Z",
  //     updatedAt: "2024-09-28T06:11:14.914Z",
  //   },
  //   {
  //     id: "66f79a029cb583b06ff9d511",
  //     transactionId: "TXN-2024-09-44645b7f-1f35",
  //     apiTransactionReference: null,
  //     date: "2024-09-28T05:54:10.847Z",
  //     time: "6:54:10 AM",
  //     amount: 850,
  //     type: "DEBIT",
  //     status: "FAILED",
  //     origin: "WITHDRAWAL",
  //     userId: "66ddb4b8e45560fe9d34df42",
  //     bookingId: null,
  //     currencyCode: "NGN",
  //     createdAt: "2024-09-28T05:54:10.850Z",
  //     updatedAt: "2024-09-28T05:54:15.320Z",
  //   },
  //   {
  //     id: "66f6eff9eab47242778065fd",
  //     transactionId: "TXN-2024-09-6db43f3b-bce3",
  //     apiTransactionReference: null,
  //     date: "2024-09-27T17:48:41.569Z",
  //     time: "6:48:41 PM",
  //     amount: 850,
  //     type: "DEBIT",
  //     status: "FAILED",
  //     origin: "WITHDRAWAL",
  //     userId: "66ddb4b8e45560fe9d34df42",
  //     bookingId: null,
  //     currencyCode: null,
  //     createdAt: "2024-09-27T17:48:41.571Z",
  //     updatedAt: "2024-09-27T17:48:45.332Z",
  //   },
  //   {
  //     id: "66f6efafeab47242778065fc",
  //     transactionId: "TXN-2024-09-af479c1d-68d4",
  //     apiTransactionReference: null,
  //     date: "2024-09-27T17:47:27.431Z",
  //     time: "6:47:27 PM",
  //     amount: 850,
  //     type: "DEBIT",
  //     status: "FAILED",
  //     origin: "WITHDRAWAL",
  //     userId: "66ddb4b8e45560fe9d34df42",
  //     bookingId: null,
  //     currencyCode: null,
  //     createdAt: "2024-09-27T17:47:27.433Z",
  //     updatedAt: "2024-09-27T17:47:29.680Z",
  //   },
  //   {
  //     id: "66f1c4c1af9ffe3046e34aa4",
  //     transactionId: "15916b21-4b4c-4bd0-b500-90a5922b1186",
  //     apiTransactionReference: null,
  //     date: "2024-09-23T19:42:57.284Z",
  //     time: "8:42:57 PM",
  //     amount: 850,
  //     type: "DEBIT",
  //     status: "FAILED",
  //     origin: "WITHDRAWAL",
  //     userId: "66ddb4b8e45560fe9d34df42",
  //     bookingId: null,
  //     currencyCode: null,
  //     createdAt: "2024-09-23T19:42:57.287Z",
  //     updatedAt: "2024-09-23T19:42:59.965Z",
  //   },
  // ] as Transaction[];

  const { transactions, totalCount, isError, isLoading } = useTransactions({
    currentPage,
    pageLimit,
    filters,
  });
  const { bookingStats, isLoading: loadingBookingStats } = useBookingStats();

  const handleFilterChange = (selectedFilters: Record<string, string[]>) => {
    setFilters(selectedFilters);
    setCurrentPage(1);
  };

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
