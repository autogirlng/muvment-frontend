"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/utils/types";
import { useHttp } from "@/hooks/useHttp";
import DesktopNav from "@/components/Navbar/DesktopNav";
import MobileNav from "@/components/Navbar/MobileNav";

export default function NavigationWrapper() {
  const pathname = usePathname();
  const http = useHttp();
  const [userToken, setUserToken] = useState<string>("");

  // Determine if current page is explore page
  const isExplorePage = pathname.startsWith("/explore");

  useEffect(() => {
    const user_token = window.localStorage.getItem("user_token");
    setUserToken(user_token || "");
  }, []);

  // Fetch user data
  const {
    data: user,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["getUser"],
    queryFn: () => http.get<User>(`/api/user`),
    enabled: !!userToken,
    retry: false,
  });

  return (
    <>
      <DesktopNav user={user ?? null} explorePage={isExplorePage} />
      <MobileNav user={user ?? null} />
    </>
  );
}
