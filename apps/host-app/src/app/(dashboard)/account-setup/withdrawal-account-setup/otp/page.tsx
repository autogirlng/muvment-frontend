"use client";

import OtpVerification from "@/components/AccountSetupTasks/OtpVerification";
import DashboardInnerPage from "@/components/DashboardInnerPage";

export default function WithdrawalAccountSetupOtpPage() {
  return (
    <DashboardInnerPage
      isInnerPage
      title="Setup Withdrawal Account"
      description="We’ve sent an OTP code to your email to verify it’s you."
      backLink="/account-setup/withdrawal-account-setup"
    >
      <OtpVerification />
    </DashboardInnerPage>
  );
}
