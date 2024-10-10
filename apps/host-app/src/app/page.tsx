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

export default function HomePage() {
  const [userToken, setUserToken] = useState<string>("");

  useEffect(() => {
    const user_token = window.localStorage.getItem("user_token");
    setUserToken(user_token || "");
  }, []);

  return (
    <main className="overflow-x-hidden">
      <DesktopNav userToken={userToken} />
      <MobileNav userToken={userToken} />
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
