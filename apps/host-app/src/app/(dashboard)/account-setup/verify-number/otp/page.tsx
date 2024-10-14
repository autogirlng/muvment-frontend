"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import DashboardInnerPage from "@/components/DashboardInnerPage";
import OtpVerification from "@/components/OtpVerification";
import usePhoneNumberVerification from "@/components/AccountSetupTasks/hooks/usePhoneNumberVerification";

export default function VerifyNumberOtpPage() {
  const [otp, setOtp] = useState<string>("");
  const { user, verifyPhoneNumberToken, resendVerifyPhoneToken } =
    usePhoneNumberVerification();

  const { phoneNumberToVerify } = useAppSelector((state) => state.accountSetup);

  const router = useRouter();

  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState<string>("");

  useEffect(() => {
    if (!phoneNumberToVerify) {
      router.push("/account-setup/verify-number");
    }
    if (user && phoneNumberToVerify) {
      const firstPart = phoneNumberToVerify.slice(0, 3);
      const lastPart = phoneNumberToVerify.slice(-3);
      const middlePart = "*".repeat(phoneNumberToVerify.length - 6);
      setFormattedPhoneNumber(`${firstPart}${middlePart}${lastPart}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, phoneNumberToVerify]);

  return (
    <DashboardInnerPage
      isInnerPage
      title="Verify Phone Number"
      description={`We’ve sent an OTP code via SMS to ${formattedPhoneNumber} to verify it’s you.`}
      backLink="/account-setup/verify-number"
    >
      <OtpVerification
        numInputs={6}
        verifyOtp={() => {
          verifyPhoneNumberToken.mutate({
            phoneNumber: phoneNumberToVerify as string,
            token: otp,
          });
        }}
        isVerifyOtpLoading={verifyPhoneNumberToken.isPending}
        isResendOtpLoading={resendVerifyPhoneToken.isPending}
        resendOtp={() => {
          resendVerifyPhoneToken.mutate({
            phoneNumber: phoneNumberToVerify as string,
          });
        }}
        otp={otp}
        setOtp={setOtp}
        error={verifyPhoneNumberToken.error}
      />
    </DashboardInnerPage>
  );
}
