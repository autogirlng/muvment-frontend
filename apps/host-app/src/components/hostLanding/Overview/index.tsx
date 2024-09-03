import Image from "next/image";
import React from "react";
import cn from "classnames";

type Props = {};

type featureProps = {
  title: string;
  description: string;
};

const features: featureProps[] = [
  {
    title: "Fleet Expansion Opportunities",
    description:
      "Grow your business with ease. Our platform supports multiple vehicle listings, helping you expand your fleet and increase your earnings.",
  },
  {
    title: "On-Demand Support",
    description:
      "Get help when you need it. Our on-demand support ensures you have assistance at your fingertips for any issues or questions.",
  },
  {
    title: "Booking Management",
    description:
      "Stay organized and efficient. Our comprehensive booking management tools allow you to track and manage all your rentals in one place.",
  },
  {
    title: "Instant Revenue Earnings",
    description:
      "Start earning immediately. Our platform enables you to see your earnings in real-time, giving you instant access to your hard-earned money.",
  },
];

function Overview({}: Props) {
  return (
    <div className="pt-[312px] pb-[481px]">
      <div className="flex flex-col justify-center items-center gap-[77px]">
        <h1 className="text-h1 text-primary-900 text-center">
          An all-in-one platform with...
        </h1>
        <div className="relative">
          <div className="relative">
            <Image
              src="/images/dashboard.png"
              alt="dashboard"
              width={719}
              height={404}
            />
            <div className="absolute right-16 top-0">
              <Image
                src="/images/stars.png"
                alt="stars"
                width={88}
                height={84}
              />
            </div>
          </div>
          {features.map((feature, index) => (
            <div
              key={index}
              className={cn(
                "absolute border border-grey-100 rounded-3xl p-10 backdrop-blur w-[574px] space-y-[22px]",
                index === 0 && "bottom-[137px] right-[608px]",
                index === 1 && "bottom-[137px] left-[608px]",
                index === 2 && "top-[375px] right-[405px]",
                index === 3 && "top-[375px] left-[405px]"
              )}
            >
              <h3 className="text-h3">{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Overview;
