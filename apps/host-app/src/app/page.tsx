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
import NavBar from "@/components/LandingPageComponents/NavBar";
import GetStarted from "@/components/LandingPageComponents/GetStarted";
import MobileNav from "@/components/Navbar/MobileNav";

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <NavBar />
      <MobileNav/>
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
