import Button from "@repo/ui/button";
import Image from "next/image";
import React from "react";

type Props = {};

type optionProps = {
  type: string;
  image: string;
};

const vehicles: optionProps[] = [
  {
    image: "/images/vehicles/sedan.png",
    type: "Sedan",
  },
  {
    image: "/images/vehicles/sedan.png",
    type: "SUV",
  },
  {
    image: "/images/vehicles/sedan.png",
    type: "Truck",
  },
  {
    image: "/images/vehicles/sedan.png",
    type: "Bus",
  },
];

function VehicleOptions({}: Props) {
  return (
    <div className="px-5">
      <div className="pt-[97px] pb-[155px] bg-grey-75 rounded-[97px]">
        <div className="space-y-[114px]">
          <div className="max-w-[860px] mx-auto space-y-[11px] text-primary-900 text-center ">
            <h1 className="text-h1 text-center">No limitations</h1>
            <p>
              Anyone with a reliable car can turn their vehicle into a
              money-making asset. Whether you have a sedan, SUV, bus, or truck,
              there's a demand for your vehicle.
            </p>
            <br />
            <Button variant="filled" color="primary" radius="md">
              Get Started
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-x-[165px] gap-y-[93px] max-w-[746px] mx-auto">
            {vehicles.map((option, index) => (
              <div key={index} className="flex flex-col items-center gap-[6px]">
                <Image
                  src={option.image}
                  alt=""
                  width={290}
                  height={138}
                  // className="w-[60px] object-cover"
                />
                <p className="font-semibold">{option.type}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehicleOptions;
