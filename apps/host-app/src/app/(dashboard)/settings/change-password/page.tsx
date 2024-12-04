"use client";

import DashboardInnerPage from "@/components/DashboardInnerPage";
import ChangePassword from "@/components/Account/ChangePassword";

export default function ChangePasswordPage() {
  return (
    <DashboardInnerPage isInnerPage title="Change Password" backLink="/settings">
      <ChangePassword />
    </DashboardInnerPage>
  );
}
