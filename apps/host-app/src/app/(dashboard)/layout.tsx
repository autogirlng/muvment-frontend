"use client";

import { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useAppSelector } from "@/lib/hooks";
import { FullPageSpinner } from "@repo/ui/spinner";
import SideNav from "@/components/Navbar/SideNav";
import TopHeader from "@/components/Navbar/TopHeader";
import useUser from "@/hooks/useUser";
import MobileNav from "@/components/Navbar/MobileNav";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoading, user } = useAppSelector((state) => state.user);
  const { getUser } = useUser();

  useEffect(() => {
    console.log(user);

    if (user) {
      if (
        pathname.includes("/account-setup") ||
        pathname.includes("/notifications") ||
        pathname.includes("/profile") ||
        pathname.includes("/settings")
      ) {
        return;
      }
      if (
        pathname !== "/dashboard" &&
        (!user?.phoneVerified || !user?.withdrawalAccountVerified)
      ) {
        router.push("/account-setup");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, pathname]);

  if (isLoading || getUser.isLoading) {
    return <FullPageSpinner />;
  }

  return (
    <main className="">
      {pathname.includes("/vehicle-onboarding") ? (
        children
      ) : (
        <>
          <MobileNav />
          <SideNav />
          <div className="w-full md:w-[calc(100%-250px)] 2xl:w-[calc(100%-272px)] ml-0 md:ml-[250px] 2xl:ml-[272px]">
            <TopHeader />
            <div className="px-4 md:px-6 2xl:px-8">{children}</div>
          </div>
        </>
      )}
    </main>
  );
}
