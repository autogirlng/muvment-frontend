"use client";

import { transactionData, transactionFilters } from "@/utils/data";
import DashboardSectionTitle from "@/components/DashboardSectionTitle";
import TransactionTable from "@/components/Wallet/TransactionTable";
import Button from "@repo/ui/button";
import FilterBy from "@repo/ui/filter";
import { BlurredDialog } from "@repo/ui/dialog";
import { useState } from "react";
import Withdraw from "@/components/Wallet/Withdraw";
import useWallet from "@/components/Wallet/hooks/useWallet";
import Pagination from "@repo/ui/pagination";
import { FullPageSpinner } from "@repo/ui/spinner";
import { useAppSelector } from "@/lib/hooks";
import EmptyState from "@/components/EmptyState";
import Image from "next/image";
import VerifyOtp from "@/components/Wallet/VerifyOtp";

export default function WalletPage() {
  const { transactions, totalItemsCount } = useAppSelector(
    (state) => state.transactions
  );

  const {
    isError,
    error,
    isLoading,

    currentPage,
    setCurrentPage,
    pageLimit,

    withdrawFunds,
    sendOtp,
    verifyOtp,
    amount,
    setAmount,
    otp,
    setOtp,

    openWithdrawModal,
    handleWithdrawModal,
    openVerifyOtpModal,
    handleVerifyOtpModal,
  } = useWallet();

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
        <BlurredDialog
          open={openWithdrawModal}
          onOpenChange={handleWithdrawModal}
          trigger={
            <Button
              variant="filled"
              color="primary"
              className="!py-3 3xl:!py-4 !px-5 3xl:!px-6 !text-base 3xl:!text-xl"
            >
              Withdraw Funds
            </Button>
          }
          content={
            <Withdraw
              amount={amount}
              setAmount={setAmount}
              handleWithdrawal={() => sendOtp.mutate()}
              handleModal={handleWithdrawModal}
              isLoading={false}
            />
          }
          width="max-w-[750px] 3xl:max-w-[950px]"
        />
      </div>
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
          totalCount={totalItemsCount}
          pageLimit={pageLimit}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      <BlurredDialog
        title={
          <Image src="/icons/mailbox.png" alt="" width={140} height={93} />
        }
        open={openVerifyOtpModal}
        onOpenChange={handleVerifyOtpModal}
        trigger={<button />}
        content={
          <VerifyOtp
            handleVerifyOtp={() => verifyOtp.mutate(otp)}
            handleModal={handleWithdrawModal}
            isLoading={sendOtp.isPending}
            otp={otp}
            setOtp={setOtp}
            handleResendOtp={() => sendOtp.mutate()}
          />
        }
        width="max-w-[750px] 3xl:max-w-[950px]"
      />
    </main>
  );
}
