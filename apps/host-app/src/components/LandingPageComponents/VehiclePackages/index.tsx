import LandingPageSectionHeader from "@/components/Header/LandingPageSectionHeader";
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
    <div className="pt-24 3xl:pt-[107px] pb-[150] 3xl:pb-[216px]">
      <div className="space-y-[100px] 3xl:space-y-[157px] container">
        <LandingPageSectionHeader
          className="text-h1 text-primary-900 text-center max-w-[860px] mx-auto"
          title=" Here is a plan and package for every vehicle owner"
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-grey-400 gap-6 mx-auto max-w-[336px] sm:max-w-full">
          {packages.map((item, index) => (
            <div key={index} className="content-center">
              <div className="max-w-[336px] mx-auto">
                <div className="mt-6 sm:mt-0 sm:ml-3 space-y-[22px]">
                  <div className="flex space-x-2">
                    {Array.from({ length: index + 1 }, (_, num) => {
                      console.log(_, num);
                      return (
                        <Image
                          key={num}
                          src={`/images/landing/polygon${num + 1}.png`}
                          alt=""
                          width={60}
                          height={60}
                          className="w-9 3xl:w-[60px] object-cover"
                        />
                      );
                    })}
                  </div>

                  <h3 className="text-h4 3xl:text-h3 !font-bold">
                    {item.title}
                  </h3>
                  <p className="text-base 3xl:text-h6">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VehiclePackages;
