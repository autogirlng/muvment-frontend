import React from "react";

type Props = {};

type benefitProps = {
  title: string;
  description: string;
};

const benefits: benefitProps[] = [
  {
    title: "Start Earning With Muvment Today",
    description:
      "Join our community of successful hosts and experience a new way to earn extra income effortlessly.",
  },
  {
    title: "Flexible Scheduling",
    description:
      "Your time, your rules. You have the flexibility to decide when your car is available for rent. Set your availability and let our system handle the rest.",
  },
  {
    title: "Simple Onboarding",
    description:
      "Getting started with Muvment is easy. With our intuitive platform, you’ll be up and running in no time. No complicated paperwork—just a straightforward path to extra income.",
  },
];

function Benefits({}: Props) {
  return (
    <div className="px-[61px] -mb-12 relative z-10">
      <div className="py-[144px] px-[132px] bg-grey-900 rounded-[123px]">
        <div className="space-y-[72px] text-white max-w-[1532px] mx-auto">
          <h1 className="text-4xl">Benefits</h1>
          <div className="grid grid-cols-3 gap-[130px]">
            {benefits.map((item, index) => (
              <div key={index} className="max-w-[423px] space-y-3">
                <h2 className="text-4xl">{index + 1}</h2>

                <h3 className="text-h3">{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Benefits;
