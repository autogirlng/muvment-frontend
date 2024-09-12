"use client";

import { useRouter, useSearchParams } from "next/navigation";
import OtpVerification from "@/components/OtpVerification";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";

export default function VerifyEmailPage() {
  const router = useRouter();
  const emailParams = useSearchParams();
  const email = emailParams.get("email");

  if (!email) {
    router.push("/signup");
  }

  const { verifyEmailOnSignup, resendVerifyEmailToken } = useAuth();
  const [otp, setOtp] = useState<string>("");

  return (
    <OtpVerification
      verifyOtp={() => {
        verifyEmailOnSignup.mutate({ email: email as string, token: otp });
      }}
      isVerifyOtpLoading={verifyEmailOnSignup.isPending}
      isResendOtpLoading={resendVerifyEmailToken.isPending}
      resendOtp={() => {
        resendVerifyEmailToken.mutate({ email: email as string });
      }}
      otp={otp}
      setOtp={setOtp}
      error={verifyEmailOnSignup.error}
    />
  );
}
