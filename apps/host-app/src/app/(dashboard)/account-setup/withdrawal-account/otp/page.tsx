"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import OtpVerification from "@/components/OtpVerification";
import DashboardInnerPage from "@/components/DashboardInnerPage";
import useSetupWithdrawalAccount from "@/components/AccountSetupTasks/hooks/useSetupWithdrawalAccount";

export default function WithdrawalAccountSetupOtpPage() {
  const router = useRouter();

  const {
    accountDetails,
    verifyBankAccountOtp,
    sendBankAccountOtp,
    loading,
    setLoading,
  } = useSetupWithdrawalAccount();

  useEffect(() => {
    if (!accountDetails.accountName) {
      router.push("/account-setup/withdrawal-account");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountDetails]);

  const [otp, setOtp] = useState<string>("");

  return (
    <DashboardInnerPage
      isInnerPage
      title="Setup Withdrawal Account"
      description="We’ve sent an OTP code to your email to verify it’s you."
      backLink="/account-setup/withdrawal-account"
    >
      <OtpVerification
        verifyOtp={() => {
          setLoading(true);
          verifyBankAccountOtp.mutate({
            token: otp,
          });
        }}
        isVerifyOtpLoading={verifyBankAccountOtp.isPending || loading}
        isResendOtpLoading={sendBankAccountOtp.isPending}
        resendOtp={() => {
          sendBankAccountOtp.mutate();
        }}
        otp={otp}
        setOtp={setOtp}
        error={verifyBankAccountOtp.error}
      />
    </DashboardInnerPage>
  );
}
