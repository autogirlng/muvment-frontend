'use client'
import Benefits from "@/components/LandingPageComponents/Benefits";
import Calculator from "@/components/LandingPageComponents/Calculator";
import Footer from "@/components/LandingPageComponents/Footer";
import Hero from "@/components/LandingPageComponents/Hero";
import JoinUs from "@/components/LandingPageComponents/JoinUs";
import Overview from "@/components/LandingPageComponents/Overview";
import Steps from "@/components/LandingPageComponents/Steps";
import VehicleOptions from "@/components/LandingPageComponents/VehicleOptions";
import VehiclePackages from "@/components/LandingPageComponents/VehiclePackages";

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <Benefits />
      <JoinUs />
      <Steps />
      <VehicleOptions />
      <Calculator />
      <VehiclePackages />
      <Overview />
      <Footer />
    </main>
  );
}
