"use client";

import VerifyPhoneNumber from "@/components/AccountSetupTasks/VerifyPhoneNumber";
import DashboardInnerPage from "@/components/DashboardInnerPage";

export default function VerifyNumberPage() {
  return (
    <DashboardInnerPage
      isInnerPage
      title="Verify Phone Number"
      description="Please complete the form below to verify your identity and ensure the security of your account"
      backLink="/account-setup"
    >
      <VerifyPhoneNumber />
    </DashboardInnerPage>
  );
}
