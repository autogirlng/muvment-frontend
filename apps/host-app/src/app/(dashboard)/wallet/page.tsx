"use client";
import { useState } from "react";
import { transactionFilters } from "@/utils/data";
import { FullPageSpinner } from "@repo/ui/spinner";
import FilterBy from "@repo/ui/filter";
import Pagination from "@repo/ui/pagination";
import EmptyState from "@/components/EmptyState";
import useTransactions from "@/components/Wallet/hooks/useTransactions";
import WalletBalance from "@/components/Wallet/WalletBalance";
import DashboardSectionTitle from "@/components/DashboardSectionTitle";
import TransactionTable from "@/components/Wallet/TransactionTable";

export default function WalletPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageLimit = 10;

  const { transactions, totalCount, isError, isLoading } = useTransactions({
    currentPage,
    pageLimit,
  });

  const handleFilterChange = (selectedFilters: Record<string, string[]>) => {
    console.log("Selected filters:", selectedFilters);
  };
  return (
    <main className="py-11 space-y-11">
      <WalletBalance />
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-">
          <DashboardSectionTitle title="Transaction History" />
          <FilterBy
            categories={transactionFilters}
            onChange={handleFilterChange}
          />
        </div>
        {isLoading ? (
          <FullPageSpinner />
        ) : isError ? (
          <p>something went wrong</p>
        ) : transactions.length === 0 ? (
          <EmptyState
            title="No Transaction History"
            image="/icons/empty_trnx_state.png"
            imageSize="w-[182px] 3xl:w-[265px]"
          />
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
