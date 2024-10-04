import React from "react";
import useWallet from "./hooks/useWallet";
import WithDrawFunds from "./WithDrawFunds";
import { Spinner } from "@repo/ui/spinner";

type Props = {};

export default function WalletBalance({}: Props) {
  const { wallteBalance, isError, isLoading } = useWallet();
  return (
    <div className="flex items-center justify-between bg-grey-75 rounded-3xl py-11 px-14">
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        //   retry button instead
        <p>something went wrong</p>
      ) : (
        <>
          <div className="space-y-6">
            <p className="uppercase text-xs !font-semibold">BALANCE</p>
            <h1 className="text-primary-900 text-h2 3xl:text-h1 !font-bold">
              NGN {`${wallteBalance?.walletBalance ?? "-"}`}
            </h1>
          </div>
          <WithDrawFunds />
        </>
      )}
    </div>
  );
}
