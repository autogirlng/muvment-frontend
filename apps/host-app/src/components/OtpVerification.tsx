"use client";

import Image from "next/image";
import OtpField from "@repo/ui/otpField";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import AuthPageHeader from "./Header/AuthPageHeader";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/utils/types";

type Props = {
  verifyOtp: () => void;
  isVerifyOtpLoading: boolean;
  resendOtp: () => void;
  isResendOtpLoading: boolean;
  setOtp: Dispatch<SetStateAction<string>>;
  otp: string;
  error: AxiosError<ErrorResponse> | null;
};

const OtpVerification = ({
  verifyOtp,
  isVerifyOtpLoading,
  resendOtp,
  isResendOtpLoading,
  setOtp,
  otp,
  error,
}: Props) => {
  const handleChange = (otp: string) => setOtp(otp);

  const [minutes, setMinutes] = useState<number>(4);
  const [seconds, setSeconds] = useState<number>(59);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) setSeconds(seconds - 1);

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  useEffect(() => {
    if (otp.length === 5) {
      verifyOtp();
    }
  }, [otp]);

  return (
    <div className="space-y-8">
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

      <OtpField
        name="otp"
        id="otp"
        type="otp"
        label="Enter OTP"
        placeholder=""
        value={otp}
        onChange={handleChange}
        error={
          error?.response?.data?.ERR_CODE === "INCORRECT_OTP" ||
          error?.response?.data?.ERR_CODE === "OTP_NOT_FOUND"
            ? "Incorrect pin, please check and try again"
            : ""
        }
        disabled={isVerifyOtpLoading}
      />
      {minutes > 0 || seconds > 0 ? (
        <p className="text-grey-500 text-sm 3xl:text-base">
          Resend Code in{" "}
          {minutes > 1
            ? `${minutes}mins ${seconds}s`
            : minutes > 0
              ? `${minutes}min ${seconds}s`
              : `${seconds}s`}
        </p>
      ) : (
        <button
          className="text-sm 3xl:text-base text-primary-500"
          onClick={() => {
            resendOtp();
            setMinutes(4);
            setSeconds(59);
          }}
          disabled={isResendOtpLoading}
        >
          {isResendOtpLoading || isVerifyOtpLoading
            ? "Loading..."
            : "Resend Code"}
        </button>
      )}
    </div>
  );
};

export default OtpVerification;
