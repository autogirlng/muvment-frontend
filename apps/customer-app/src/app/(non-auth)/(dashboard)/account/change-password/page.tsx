"use client";

import ChangePassword from "@/components/Account/ChangePassword";
import BackLink from "@/components/BackLink";

export default function ChangePasswordPage() {
  return (
    <div className="space-y-10 2xl:space-y-[52px] py-8 2xl:py-11">
      <div className="space-y-3 2xl:space-y-5">
        <BackLink backLink="/account" />
        <h2 className="text-grey-700 text-h4 2xl:text-4xl font-bold">
          Change Password
        </h2>
      </div>

      <ChangePassword />
    </div>
  );
}
