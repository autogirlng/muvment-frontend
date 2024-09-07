"use client";

import OtpField from "@repo/ui/otpField";
import { useState } from "react";

type Props = {};

const OtpVerification = ({}: Props) => {
  const [otp, setOtp] = useState<string>("");

  const handleChange = (otp: string) => setOtp(otp);

  return (
    <div className="space-y-8">
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
