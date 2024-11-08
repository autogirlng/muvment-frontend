"use client";
import Benefits from "@/components/LandingPageComponents/Benefits";
import NewListings from "@/components/LandingPageComponents/NewListings";
import Footer from "@/components/LandingPageComponents/Footer";
import Hero from "@/components/LandingPageComponents/Hero";
import TopVehicles from "@/components/LandingPageComponents/TopVehicles";
import Steps from "@/components/LandingPageComponents/Steps";
import VehicleCategories from "@/components/LandingPageComponents/VehicleCategories";
import MobileNav from "@/components/Navbar/MobileNav";
import { useEffect, useState } from "react";
import DesktopNav from "@/components/Navbar/DesktopNav";
import PopularCities from "@/components/LandingPageComponents/PopularCities";
import SaveBig from "@/components/LandingPageComponents/SaveBig";
import FAQ from "@/components/LandingPageComponents/FAQ";
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
      <TopVehicles />
      <PopularCities />
      <VehicleCategories />
      <NewListings />
      <SaveBig />
      <Steps />
      <FAQ />
      <Footer />
    </main>
  );
}
