import Benefits from "@/components/hostLanding/Benefits";
import Calculator from "@/components/hostLanding/Calculator";
import Footer from "@/components/hostLanding/Footer";
import Hero from "@/components/hostLanding/Hero";
import JoinUs from "@/components/hostLanding/JoinUs";
import Overview from "@/components/hostLanding/Overview";
import Steps from "@/components/hostLanding/Steps";
import VehicleOptions from "@/components/hostLanding/VehicleOptions";
import VehiclePackages from "@/components/hostLanding/VehiclePackages";

export default function Home() {
  return (
    <main className="">
      <Hero/>
      <Benefits/>
      <JoinUs />
      <Steps />
      <VehicleOptions />
      <VehiclePackages />
      <Calculator />
      <Overview />
      <Footer />
    </main>
  );
}
