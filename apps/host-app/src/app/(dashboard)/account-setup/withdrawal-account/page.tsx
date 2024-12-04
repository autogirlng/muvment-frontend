"use client";

import SetupWithdrawalAccount from "@/components/AccountSetupTasks/SetupWithdrawalAccount";
import DashboardInnerPage from "@/components/DashboardInnerPage";

export default function WithdrawalAccountSetupPage() {
  return (
    <DashboardInnerPage
      isInnerPage
      title="Setup Withdrawal Account"
      description="Please complete the form below to verify your identity and ensure the security of your account"
      backLink="/account-setup"
    >
      <SetupWithdrawalAccount />
    </DashboardInnerPage>
  );
}
