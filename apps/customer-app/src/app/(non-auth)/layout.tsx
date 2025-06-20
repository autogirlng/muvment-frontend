"use client";

import { ReactNode, useEffect } from "react";
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

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
