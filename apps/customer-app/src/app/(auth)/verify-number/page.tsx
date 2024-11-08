"use client";

import { useRouter, useSearchParams } from "next/navigation";
import OtpVerification from "@/components/OtpVerification";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import AuthPageHeader from "@/components/Header/AuthPageHeader";
import Image from "next/image";

export default function VerifyEmailPage() {
  const router = useRouter();
  const phoneNumberParams = useSearchParams();
  const phoneNumber = phoneNumberParams.get("phoneNumber");
  const countryCode = phoneNumberParams.get("countryCode");
  const country = phoneNumberParams.get("country");

  if (!phoneNumber && !countryCode && !country) {
    router.push("/signup");
  }

  const { verifyNumberOnSignup, resendVerifyNumberToken } = useAuth();
  const [otp, setOtp] = useState<string>("");

  return (
    <OtpVerification
      verifyOtp={() => {
        verifyNumberOnSignup.mutate({
          phoneNumber: phoneNumber as string,
          token: otp,
        });
      }}
      isVerifyOtpLoading={verifyNumberOnSignup.isPending}
      isResendOtpLoading={resendVerifyNumberToken.isPending}
      resendOtp={() => {
        resendVerifyNumberToken.mutate({ phoneNumber: phoneNumber as string });
      }}
      otp={otp}
      setOtp={setOtp}
      // error={verifyNumberOnSignup.error}
      error={null}
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
        description={`We sent you an OTP to ${phoneNumber}.`}
      />
    </OtpVerification>
  );
}
