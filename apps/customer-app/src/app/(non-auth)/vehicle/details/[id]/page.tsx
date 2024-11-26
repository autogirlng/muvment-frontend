"use client";

import VehicleDetails from "@/components/VehicleBooking/VehicleSummary";
import useFetchVehicleById from "@/components/VehicleBooking/hooks/useFetchVehicleById";
import { FullPageSpinner } from "@repo/ui/spinner";
import { useEffect } from "react";

export default function VehicleDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  // TODO: if no id go to home
  const { vehicle, perks, vehicleDetails, vehicleImages, isError, isLoading } =
    useFetchVehicleById({
      id: params?.id,
    });

  useEffect(() => {
    console.log("vehicle", vehicle);
  }, [vehicle]);

  if (isLoading) {
    return <FullPageSpinner />;
  }

  return (
    <main className="overflow-x-hidden">
      <div className="max-w-[990px] mx-auto px-4">
        <VehicleDetails
          vehicle={vehicle ?? null}
          perks={perks}
          vehicleDetails={vehicleDetails}
          vehicleImages={vehicleImages}
        />
      </div>
    </main>
  );
}
