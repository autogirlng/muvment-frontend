"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import DashboardInnerPage from "@/components/DashboardInnerPage";
import OtpVerification from "@/components/OtpVerification";
import useAccountSetup from "@/hooks/useAccountSetup";

export default function VerifyNumberOtpPage() {
  const [otp, setOtp] = useState<string>("");
  const { user, verifyPhoneNumberToken, resendVerifyPhoneToken } =
    useAccountSetup();

  const { phoneNumberToVerify } = useAppSelector((state) => state.accountSetup);

  const router = useRouter();

  const [slicedPhoneNumber, setSlicedPhoneNumber] = useState<string>("");
  const [hiddenNumber, setHiddenNumber] = useState<string>("");

  useEffect(() => {
    if (!phoneNumberToVerify) {
      router.push("/account-setup/verify-number");
    }
    if (user && phoneNumberToVerify) {
      const phoneNumberToShow = phoneNumberToVerify.slice(
        0,
        user?.countryCode.length + 3
      );
      setSlicedPhoneNumber(phoneNumberToShow);
      setHiddenNumber("*".repeat(phoneNumberToShow.length));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, phoneNumberToVerify]);

  return (
    <DashboardInnerPage
      isInnerPage
      title="Verify Phone Number"
      // add **** depending on lengthOfHiddenNumber after ${slicedPhoneNumber.slice()} below
      description={`We’ve sent an OTP code via SMS to ${slicedPhoneNumber.slice()}${hiddenNumber} to verify it’s you.`}
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
