"use client";

import SetupWithdrawalAccount from "@/components/AccountSetupTasks/SetupWithdrawalAccount";
import DashboardInnerPage from "@/components/DashboardInnerPage";

export default function AddBankAccountPage() {
  return (
    <DashboardInnerPage isInnerPage title="Add Account" backLink="/settings">
      <SetupWithdrawalAccount />
    </DashboardInnerPage>
  );
}
