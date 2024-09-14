import Icons from "@repo/ui/icons";
import React from "react";

type Props = {};

type benefitProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const benefits: benefitProps[] = [
  {
    title: "Earn Extra Income",
    description:
      "Discover the financial benefits of sharing your car. It's more than just extra money; it's financial freedom at your fingertips.",
    icon: Icons.ic_folder_library,
  },
  {
    title: "Flexible Scheduling",
    description:
      "Your time, your rules. You have the flexibility to decide when your car is available for rent. Set your availability and let our system handle the rest.",
    icon: Icons.ic_renewable_energy,
  },
  {
    title: "Simple Onboarding",
    description:
      "Getting started with Muvment is easy. With our intuitive platform, you’ll be up and running in no time. No complicated paperwork—just a straightforward path to extra income.",
    icon: Icons.ic_bend_tool,
  },
];

function Benefits({}: Props) {
  return (
    <section className="px-5 sm:px-9 3xl:px-[61px] py-[120px] md:py-[92px] md:pb-[200px]">
      <div className="space-y-8 sm:space-y-[60px] text-black max-w-[1345px] mx-auto">
        <h1 className="text-h4 sm:text-h3 3xl:text-4xl text-center">
          Benefits
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 3xl:gap-10 w-fit mx-auto">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="max-w-[423px] w-full space-y-5 sm:space-y-6 border border-grey-200 rounded-[32px] px-8 py-6"
            >
              <h2 className="h-[72px] w-[72px] flex items-center justify-center rounded-full bg-primary-50 text-primary-500">
                {item.icon}
              </h2>

              <h3 className="text-xl sm:text-h5 3xl:text-h4 !font-medium">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm 3xl:text-base !font-normal text-grey-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Benefits;
