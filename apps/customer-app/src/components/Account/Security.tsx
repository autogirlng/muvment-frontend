import Button from "@repo/ui/button";
import Link from "next/link";
import React from "react";

type Props = {};

export default function Security({}: Props) {
  return (
    <div className="space-y-[60px] text-base md:text-xl 3xl:text-h6">
      <h6 className="!font-bold text-grey-700">LOGIN & SECURITY</h6>
      <div className="flex items-center justify-between gap-3">
        <h6 className="!font-semibold text-black">Password</h6>
        <Link href="/account/change-password">
          <Button className="!text-grey-600 !bg-grey-90 !py-3 !px-5">
            Change Password
          </Button>
        </Link>
      </div>
    </div>
  );
}
