"use client";

import { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useAppSelector } from "@/lib/hooks";
import { FullPageSpinner } from "@repo/ui/spinner";
import TopHeader from "@/components/Navbar/TopHeader";
import useUser from "@/hooks/useUser";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoading, user } = useAppSelector((state) => state.user);
  const { getUser } = useUser();

  useEffect(() => {
    if (user) {
      if (
        pathname.includes("/account") ||
        pathname.includes("/notifications")
      ) {
        return;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, pathname]);

  if (isLoading || getUser.isLoading) {
    return <FullPageSpinner />;
  }

  return (
    <main className="">
      <div className="w-full">
        <TopHeader />
        <div className="px-4 md:px-6 2xl:px-8">{children}</div>
      </div>
    </main>
  );
}
