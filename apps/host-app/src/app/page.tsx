"use client";
import Benefits from "@/components/LandingPageComponents/Benefits";
import Calculator from "@/components/LandingPageComponents/Calculator";
import Footer from "@/components/LandingPageComponents/Footer";
import Hero from "@/components/LandingPageComponents/Hero";
import JoinUs from "@/components/LandingPageComponents/JoinUs";
import Overview from "@/components/LandingPageComponents/Overview";
import Steps from "@/components/LandingPageComponents/Steps";
import VehicleOptions from "@/components/LandingPageComponents/VehicleOptions";
import VehiclePackages from "@/components/LandingPageComponents/VehiclePackages";
import GetStarted from "@/components/LandingPageComponents/GetStarted";
import MobileNav from "@/components/Navbar/MobileNav";
import { useEffect, useState } from "react";
import DesktopNav from "@/components/Navbar/DesktopNav";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/utils/types";
import { useHttp } from "@/hooks/useHttp";

export default function HomePage() {
  const http = useHttp();
  const [userToken, setUserToken] = useState<string>("");

  useEffect(() => {
    const user_token = window.localStorage.getItem("user_token");
    setUserToken(user_token || "");
  }, []);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["getUser"],
    queryFn: () => http.get<User>(`/api/user`),
    enabled: !!userToken,
    retry: false,
  });

  return (
    <main className="overflow-x-hidden">
      <DesktopNav user={data ?? null} userToken={userToken} />
      <MobileNav user={data ?? null} userToken={userToken} />
      <Hero />
      <Benefits />
      <JoinUs />
      <Steps />
      <VehicleOptions />
      <Calculator />
      <VehiclePackages />
      <Overview />
      <GetStarted />
      <Footer />
    </main>
  );
}
