"use client";

import { useRouter, useSearchParams } from "next/navigation";
import OtpVerification from "@/components/OtpVerification";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import Image from "next/image";
import AuthPageHeader from "@/components/Header/AuthPageHeader";

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
    >
      <Image
        src="/icons/mailbox.png"
        alt=""
        className="w-[200px] h-[134px]"
        width={200}
        height={134}
      />
      <AuthPageHeader
        title="We’ve sent a mail your way"
        description="We sent you an OTP to verify your email. If you can’t find it please
          check your spam first before resending the code."
      />
    </OtpVerification>
  );
}
