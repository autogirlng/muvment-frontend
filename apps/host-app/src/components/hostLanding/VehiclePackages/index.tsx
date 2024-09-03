import Image from "next/image";
import React from "react";

type Props = {};

type packageProps = {
  title: string;
  description: string;
};

const packages: packageProps[] = [
  {
    title: "Airport Pickups",
    description:
      "Optimize your vehicle’s earning potential with Airport pickup services. This option is perfect for hosts looking for a high-return but low-maintenance service.",
  },
  {
    title: " Single Day Trips",
    description:
      "Rent out your vehicle for 12 hours, complete with a driver, and enjoy income from just one booking.",
  },
  {
    title: "Multiple Day Trips",
    description:
      "Benefit from extended rental with long-term bookings, allowing you to earn more from a single vehicle over several days - including monthly extensions.",
  },
];

function VehiclePackages({}: Props) {
  return (
    <div className="pt-[107px] pb-[216px]">
      <div className="space-y-[157px] max-w-[1510px] mx-auto">
        <h1 className="text-h1 text-primary-900 text-center max-w-[860px] mx-auto">
          Here is a plan and package for every vehicle owner
        </h1>
        <div className="grid grid-cols-3 divide-x divide-grey-400">
          {packages.map((item, index) => (
            <div key={index} className="content-center">
              <div className="max-w-[336px] mx-auto space-y-[22px]">
                <div className="flex space-x-2">
                  {Array.from({ length: index + 1 }, (_, num) => {
                    console.log(_, num);
                    return (
                      <Image
                        key={num}
                        src={`/images/polygon${num + 1}.png`}
                        alt=""
                        width={100}
                        height={100}
                        className="w-[60px] object-cover"
                      />
                    );
                  })}
                </div>

                <h3 className="text-h3">{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VehiclePackages;
