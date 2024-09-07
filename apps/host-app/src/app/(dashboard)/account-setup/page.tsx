"use client";

import AccountSetupTasks from "@/components/AccountSetupTasks";
import DashboardInnerPage from "@/components/DashboardInnerPage";

export default function AccountSetupPage() {
  return (
    <DashboardInnerPage
      title="Complete Account Setup"
      description="Get your account ready by following these steps to receive payments
          securely"
    >
      <AccountSetupTasks />
    </DashboardInnerPage>
  );
}
