import Button from "@repo/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import useWithrawalAccount from "./hooks/useWithrawalAccount";
import Icons from "@repo/ui/icons";
import { useAppSelector } from "@/lib/hooks";
import { FullPageSpinner } from "@repo/ui/spinner";
import DeleteBankAccount from "./DeleteBankAccount";
import { BlurredDialog } from "@repo/ui/dialog";

type Props = {};

export default function BankAccount({}: Props) {
  const { user } = useAppSelector((state) => state.user);
  const {
    withdrawalAccountDetails,
    isError,
    error,
    isLoading,
    deleteBankAccount,
    openDeleteModal,
    handleOpenDeleteModal,
  } = useWithrawalAccount();
  return (
    <div className="space-y-[60px]">
      {user?.withdrawalAccountVerified && isLoading ? (
        <FullPageSpinner className="!min-h-[400px]" />
      ) : withdrawalAccountDetails ? (
        <>
          <h6 className="text-base md:text-xl 3xl:text-h6 !font-semibold text-grey-700">
            Bank Account
          </h6>
          <div className="bg-grey-50 border border-grey-300 rounded-3xl p-6 text-black space-y-9 max-w-[400px]">
            <div className="flex items-start justify-between gap-2">
              <div className="w-[52px] h-[52px] bg-primary-75 rounded-full flex items-center justify-center text-primary-500 *:!w-5 *:!h-5">
                {Icons.ic_bank}
              </div>

              <BlurredDialog
                open={openDeleteModal}
                onOpenChange={handleOpenDeleteModal}
                trigger={
                  <button className="*:!w-7 *:!h-7 text-grey-900 hover:text-error-500">
                    {Icons.ic_delete}
                  </button>
                }
                content={
                  <DeleteBankAccount
                    handleModal={handleOpenDeleteModal}
                    handleDelete={() => deleteBankAccount.mutate()}
                    isLoading={deleteBankAccount.isPending}
                  />
                }
              />
            </div>
            <div className="space-y-3">
              <h3 className="text-h5 md:text-h4 3xl:text-h5 !font-bold">
                {withdrawalAccountDetails.accountNumber}
              </h3>
              <p className="text-sm 3xl:text-base !font-semibold">
                {withdrawalAccountDetails.bankName}
              </p>
              <p className="text-xs !font-medium">
                {withdrawalAccountDetails.accountName}
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-3 text-center">
          <Image
            src="/icons/empty_trnx_state.png"
            alt=""
            width={265}
            height={265}
          />

          <div className="space-y-3">
            <h6 className="text-base md:text-xl 3xl:text-h6 !font-semibold text-grey-700">
              Bank Account
            </h6>
            <p className="text-base 3xl:text-xl text-grey-600">
              Adding a bank account allows you to seamlessly collect payments
              from Muvment
            </p>
          </div>

          <Link href="/settings/add-bank-account" className="block">
            <Button color="primary" className="!py-3 !px-4 !text-sm">
              Update withdrawal details
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
