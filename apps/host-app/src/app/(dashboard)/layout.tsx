"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import SideNav from "@/components/SideNav";
import TopHeader from "@/components/TopHeader";
import useAuth from "@/hooks/useAuth";
import FullPageSpinner from "@repo/ui/spinner";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isLoading } = useAppSelector((state) => state.user);
  const { getUser, user_token } = useAuth();

  useEffect(() => {
    if (!user_token) {
      router.push("/login");
    }
  }, [user_token, router]);

  if (isLoading || getUser.isLoading) {
    return <FullPageSpinner />;
  }
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
