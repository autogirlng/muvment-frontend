"use client";

import OtpVerification from "@/components/AccountSetupTasks/OtpVerification";
import DashboardInnerPage from "@/components/DashboardInnerPage";

export default function VerifyNumberOtpPage() {
  return (
    <DashboardInnerPage
      isInnerPage
      title="Verify Phone Number"
      description="We’ve sent an OTP code via SMS to 0903******* to verify it’s you."
      backLink="/account-setup/verify-number"
    >
      <OtpVerification />
    </DashboardInnerPage>
  );
}
