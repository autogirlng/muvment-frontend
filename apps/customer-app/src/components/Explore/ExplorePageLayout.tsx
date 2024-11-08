"use client";

import BackLink from "@/components/BackLink";
import { useEffect, useRef, useState } from "react";
import { ChipFilter, RangeFilter, SearchFilter } from "./Filter";
import {
  vehicleMakeArray,
  vehicleTypeArray,
  yearsFilterArray,
} from "@/utils/data";
import ExploreVehicleCard from "./VehicleCard";
import Icons from "@repo/ui/icons";
type Props = {
  title: string;
  icon: JSX.Element;
  total: number;
  //   items: {}[]
  //   price filter
  //   vehicle type filter
  //   make filter
  //   years filter
  //   seats filter
  //   fuel filter
};

const vehicleImages = [
  "/images/vehicles/1.png",
  "/images/vehicles/2.png",
  "/images/vehicles/3.png",
];

export default function ExplorePageLayout({ title, icon, total }: Props) {
  return (
    <div className="space-y-8 max-w-[1400px] mx-auto">
      <BackLink backLink="/" />
      <div className="flex items-center space-x-2">
        <span className="*:h-4 md:*:h-10 text-primary-500">{icon}</span>
        <h1 className="text-base md:text-h5 3xl:text-h4 !font-bold">{title}</h1>
      </div>
      <h5 className="text-sm md:text-h5 3xl:text-h5">
        {total}+ vehicles available
      </h5>

      <div className="flex items-center gap-[14px] ">
        <RangeFilter name="Daily price" list={["SUV"]} />
        <ChipFilter name="Vehicle type" list={vehicleTypeArray} />
        <SearchFilter name="Make" list={vehicleMakeArray} />
        <ChipFilter name="Years" list={yearsFilterArray} />
        <ChipFilter
          name="Seats"
          list={[
            "2 seater",
            "3 seater",
            "4 seater",
            "5 seater",
            "6 seater",
            "7+ seater",
          ]}
        />
        <ChipFilter name="Fuel type" list={["Petrol", "Hybrid", "Electric"]} />
      </div>

      <ExploreVehicleCard
        vehicleImages={vehicleImages}
        vehicleDetails={
          [
            {
              driverAvailable: "Yes",
              icon: Icons.ic_driver,
            },
            {
              transmission: "Manual",
              icon: Icons.ic_transmission,
            },
            {
              fuelAvailable: "Yes",
              icon: Icons.ic_fuel,
            },
            {
              seats: "4",
              icon: Icons.ic_seat,
            },
          ] as Array<{ [key: string]: string | JSX.Element }>
        }
      />
      <ExploreVehicleCard
        vehicleImages={vehicleImages}
        vehicleDetails={
          [
            {
              driverAvailable: "Yes",
              icon: Icons.ic_driver,
            },
            {
              transmission: "Manual",
              icon: Icons.ic_transmission,
            },
            {
              fuelAvailable: "Yes",
              icon: Icons.ic_fuel,
            },
            {
              seats: "4",
              icon: Icons.ic_seat,
            },
          ] as Array<{ [key: string]: string | JSX.Element }>
        }
      />
    </div>
  );
}
