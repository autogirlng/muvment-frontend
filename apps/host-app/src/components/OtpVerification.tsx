"use client";

import Image from "next/image";
import OtpField from "@repo/ui/otpField";
import { useState } from "react";

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
      <div className="space-y-3">
        <h1 className="text-h1 font-medium text-black">
          We’ve sent a mail your way
        </h1>
        <p className="text-base text-grey-500">
          We sent you an OTP to verify your email. If you can’t find it please
          check your spam first before resending the code.
        </p>
      </div>

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
