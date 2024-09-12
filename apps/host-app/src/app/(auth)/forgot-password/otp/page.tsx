"use client";

import { useRouter, useSearchParams } from "next/navigation";
import OtpVerification from "@/components/OtpVerification";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const emailParams = useSearchParams();
  const email = emailParams.get("email");

  if (!email) {
    router.push("/forgot-password");
  }

  const { verifyEmailOnForgotPassword, resendVerifyEmailToken } = useAuth();
  const [otp, setOtp] = useState<string>("");

  return (
    <OtpVerification
      verifyOtp={() => {
        verifyEmailOnForgotPassword.mutate({
          email: email as string,
          token: otp,
        });
      }}
      isVerifyOtpLoading={verifyEmailOnForgotPassword.isPending}
      isResendOtpLoading={resendVerifyEmailToken.isPending}
      resendOtp={() => {
        resendVerifyEmailToken.mutate({ email: email as string });
      }}
      otp={otp}
      setOtp={setOtp}
      error={verifyEmailOnForgotPassword.error}
    />
  );
}
