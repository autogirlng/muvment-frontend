"use client";

import Image from "next/image";
import OtpField from "@repo/ui/otpField";
import { useState } from "react";
import AuthPageHeader from "./Header/AuthPageHeader";

type Props = {};

const OtpVerification = ({}: Props) => {
  const [otp, setOtp] = useState<string>("");

  const handleChange = (otp: string) => setOtp(otp);

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
        error={""}
      />
      <p className="text-grey-500 text-base">Resend Code in 34s</p>
    </div>
  );
};

export default OtpVerification;
