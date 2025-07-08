"use client";

import { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useAppSelector } from "@/lib/hooks";
import { FullPageSpinner } from "@repo/ui/spinner";
import useUser from "@/hooks/useUser";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { isLoading } = useAppSelector((state) => state.user);
  const { getUser } = useUser();
  const pathname = usePathname();

  if (
    (isLoading || getUser.isLoading) &&
    !pathname.includes("/explore") &&
    !pathname.includes("/vehicle")
  ) {
    return <FullPageSpinner />;
  }

  return <main className={inter.className}>{children}</main>;
}
