"use client";

import { ReactNode } from "react";
import TopHeader from "@/components/Navbar/TopHeader";
import MobileNav from "@/components/Navbar/MobileNav";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <main className="">
      <div className="block md:hidden">
        <MobileNav user={null} />
      </div>
      <div className="w-full">
        <TopHeader />
        <div className="px-4 md:px-6 2xl:px-8">{children}</div>
      </div>
    </main>
  );
}
