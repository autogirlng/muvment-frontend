"use client";

import SideNav from "@/components/SideNav";
import TopHeader from "@/components/TopHeader";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <main className="">
      <SideNav />
      <div className="w-full md:w-[calc(100%-250px)] 2xl:w-[calc(100%-272px)] ml-0 md:ml-[250px] 2xl:ml-[272px]">
        <TopHeader />
        <div className="px-4 md:px-6 2xl:px-8">{children}</div>
      </div>
    </main>
  );
}
