"use client";

import VerifyIdentity from "@/components/AccountSetupTasks/VerifyIdentity";
import DashboardInnerPage from "@/components/DashboardInnerPage";

export default function VerifyIdentityPage() {
  return (
    <DashboardInnerPage
      isInnerPage
      title="Verify Your Identity"
      description="Please complete the form below to verify your identity and ensure the security of your account"
      backLink="/account-setup"
    >
      <VerifyIdentity />
    </DashboardInnerPage>
  );
}
