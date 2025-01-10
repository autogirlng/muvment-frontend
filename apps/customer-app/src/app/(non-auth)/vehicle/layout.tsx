"use client";

import Image from "next/image";
import { ReactNode } from "react";
import { nav_logo } from "@repo/assets";

export default function VehicleBookingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="">
      <div className="flex justify-center items-center py-6 3xl:py-8 border-b border-grey-200">
        <Image className="" src={nav_logo} alt="" width={114} height={40} />
      </div>
      <div className="w-full min-h-screen">{children}</div>
    </main>
  );
}
