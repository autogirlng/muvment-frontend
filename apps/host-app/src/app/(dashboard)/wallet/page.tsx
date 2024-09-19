"use client";

import { transactionData, transactionFilters } from "@/utils/data";
import DashboardSectionTitle from "@/components/DashboardSectionTitle";
import TransactionTable from "@/components/TransactionTable";
import Button from "@repo/ui/button";
import FilterBy from "@repo/ui/filter";

export default function WalletPage() {
  const handleFilterChange = (selectedFilters: Record<string, string[]>) => {
    console.log("Selected filters:", selectedFilters);
  };
  return (
    <main className="py-11 space-y-11">
      <div className="flex items-center justify-between bg-grey-75 rounded-3xl py-11 px-14">
        <div className="space-y-6">
          <p className="uppercase text-xs !font-semibold">BALANCE</p>
          <h1 className="text-primary-900 text-h2 3xl:text-h1 !font-bold">
            NGN 490,000
          </h1>
        </div>
        <Button
          variant="filled"
          color="primary"
          className="py-3 3xl:py-4 px-4 3xl:px-6"
        >
          Withdraw Funds
        </Button>
      </div>
      <div className="">
        <div className="flex items-center justify-between">
          <DashboardSectionTitle title="Transaction History" />
          <FilterBy
            categories={transactionFilters}
            onChange={handleFilterChange}
          />
        </div>
        <TransactionTable items={transactionData} />
      </div>
    </main>
  );
}
