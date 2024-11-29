"use client";

import BackLink from "@/components/BackLink";
import VehicleDetails from "@/components/VehicleBooking/VehicleSummary";
import useFetchVehicleById from "@/components/VehicleBooking/hooks/useFetchVehicleById";
import Icons from "@repo/ui/icons";
import { FullPageSpinner } from "@repo/ui/spinner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function VehicleDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();

  const { vehicle, perks, vehicleDetails, vehicleImages, isError, isLoading } =
    useFetchVehicleById({
      id: params?.id,
    });

  useEffect(() => {
    console.log("vehicle", vehicle);
  }, [vehicle]);

  useEffect(() => {
    if (!params.id) {
      router.back();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  if (isLoading) {
    return <FullPageSpinner />;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <main className="overflow-x-hidden">
      <div className="max-w-[990px] mx-auto px-4 py-10 md:py-20 space-y-5">
        <div
          onClick={() => router.back()}
          className="w-fit flex items-center gap-0.5 text-black cursor-pointer"
        >
          {Icons.ic_chevron_left}
          <p className="text-sm 2xl:text-base font-medium">Back</p>
        </div>
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
