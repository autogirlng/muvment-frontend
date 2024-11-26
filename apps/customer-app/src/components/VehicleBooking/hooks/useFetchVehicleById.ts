"use client";

import { useQuery } from "@tanstack/react-query";
import {
  MappedInformation,
  VehicleInformation,
  VehiclePerksProp,
} from "@/utils/types";
import { useHttp } from "@/hooks/useHttp";
import { useEffect, useState } from "react";
import Icons from "@repo/ui/icons";

const vehicleSummaryPerks: VehiclePerksProp[] = [
  {
    icon: Icons.ic_driver_provided,
    name: "Driver Provided",
    id: "provideDriver",
    status: false,
  },
  {
    icon: Icons.ic_fuel_station,
    name: "20 ltrs Fuel Included",
    id: "fuelProvided",
    status: false,
  },
  {
    icon: Icons.ic_remove_calendar,
    name: "Free Cancellation",
    id: "freeCancelation",
    status: true,
  },
  // {
  //   icon: Icons.ic_self_drive,
  //   name: "Self Drive",
  //   id: "selfDrive",
  //   status: false,
  // },
  {
    icon: Icons.ic_checkmark_badge,
    name: "Vehicle insured",
    id: "hasInsurance",
    status: false,
  },
  {
    icon: Icons.ic_car_tracker,
    name: "Tracker Enabled",
    id: "hasTracker",
    status: false,
  },
];

export default function useFetchVehicleById({ id }: { id: string }) {
  const http = useHttp();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["getVehicleById", id],
    queryFn: () => http.get<VehicleInformation>(`/api/listings/details/${id}`),
    enabled: !!id,
    retry: false,
  });

  const [perks, setPerks] = useState<VehiclePerksProp[]>(vehicleSummaryPerks);
  const [vehicleDetails, setVehicleDetails] = useState<MappedInformation[]>([]);
  const [vehicleImages, setVehicleImages] = useState<string[]>([]);

  useEffect(() => {
    const vehicle = data;
    if (vehicle) {
      setPerks((prevPerks) =>
        prevPerks.map((perk) => {
          switch (perk.id) {
            case "provideDriver":
              return {
                ...perk,
                status: vehicle?.tripSettings?.provideDriver || false,
              };
            case "fuelProvided":
              return {
                ...perk,
                status: vehicle?.tripSettings?.fuelProvided || false,
              };
            case "hasInsurance":
              return {
                ...perk,
                status: vehicle?.hasInsurance || false,
              };
            case "hasTracker":
              return {
                ...perk,
                status: vehicle?.hasTracker || false,
              };
            default:
              return perk;
          }
        })
      );
      const mappedVehicleDetails: MappedInformation[] = [
        { make: vehicle?.make || "N/A" },
        { model: vehicle?.model || "N/A" },
        { year: vehicle?.yearOfRelease || "N/A" },
        { colour: vehicle?.vehicleColor || "N/A" },
        { city: vehicle?.location || "N/A" },
        { vehicleType: vehicle?.vehicleType || "N/A" },
        { seatingCapacity: vehicle?.numberOfSeats || "N/A" },
      ];

      setVehicleDetails(mappedVehicleDetails);

      const mappedVehicleImages = [
        vehicle?.VehicleImage?.frontView,
        vehicle?.VehicleImage?.backView,
        vehicle?.VehicleImage?.sideView1,
        vehicle?.VehicleImage?.sideView2,
        vehicle?.VehicleImage?.interior,
        vehicle?.VehicleImage?.other,
      ];
      setVehicleImages(mappedVehicleImages);
    }
  }, [data]);

  return {
    isError,
    isLoading,

    vehicle: data,
    perks,
    vehicleDetails,
    vehicleImages,
  };
}
