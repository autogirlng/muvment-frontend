"use client";

import DashboardSectionTitle from "@/components/DashboardSectionTitle";
import ListingCard from "@/components/Listings/ListingCard";
import Icons from "@repo/ui/icons";

const listings = [
  {
    image: "/images/listing/vehicle_image.png",
    name: "Hyundai Tuscon 2018",
    price: "NGN 20,000/day",
    status: "approved",
    extras: [
      { name: "Fuel Included", icon: Icons.ic_fuel_station },
      { name: "Driver Available", icon: Icons.ic_driver_provided },
    ],
    vehicleDetails: [
      { make: "Hyundai" },
      { colour: "White" },
      { seatingCapacity: 4 },
      { location: "Lagos" },
      { "vehicle type": "Sedan" },
    ],
  },
  {
    image: "/images/listing/vehicle_image.png",
    name: "Hyundai Tuscon 2018",
    price: "NGN 20,000/day",
    status: "pending",
    extras: [
      { name: "Fuel Included", icon: Icons.ic_fuel_station },
      { name: "Driver Available", icon: Icons.ic_driver_provided },
    ],
    vehicleDetails: [
      { make: "Hyundai" },
      { colour: "White" },
      { seatingCapacity: 4 },
      { location: "Lagos" },
      { "vehicle type": "Sedan" },
    ],
  },
  {
    image: "/images/listing/vehicle_image.png",
    name: "Hyundai Tuscon 2018",
    price: "NGN 20,000/day",
    status: "draft",
    extras: [
      { name: "Fuel Included", icon: Icons.ic_fuel_station },
      { name: "Driver Available", icon: Icons.ic_driver_provided },
    ],
    vehicleDetails: [
      { make: "Hyundai" },
      { colour: "White" },
      { seatingCapacity: 4 },
      { location: "Lagos" },
      { "vehicle type": "Sedan" },
    ],
  },
  {
    image: "/images/listing/vehicle_image.png",
    name: "Hyundai Tuscon 2018",
    price: "NGN 20,000/day",
    status: "rejected",
    extras: [
      { name: "Fuel Included", icon: Icons.ic_fuel_station },
      { name: "Driver Available", icon: Icons.ic_driver_provided },
    ],
    vehicleDetails: [
      { make: "Hyundai" },
      { colour: "White" },
      { seatingCapacity: 4 },
      { location: "Lagos" },
      { "vehicle type": "Sedan" },
    ],
  },
];

export default function ListingsPage() {
  // get listings
  
  return (
    <main className="space-y-6 py-[56px]">
      <DashboardSectionTitle icon={Icons.ic_car} title="Listings" />
      {/* search bar and filter */}

      {listings.map((listing, index) => (
        <ListingCard key={index} listing={listing} />
      ))}
    </main>
  );
}
