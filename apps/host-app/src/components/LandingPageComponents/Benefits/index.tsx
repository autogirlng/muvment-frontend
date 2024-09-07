import React from "react";

type Props = {};

type benefitProps = {
  title: string;
  description: string;
};

const benefits: benefitProps[] = [
  {
    title: "Earn Extra Income",
    description:
      "Discover the financial benefits of sharing your car. It's more than just extra money; it's financial freedom at your fingertips.",
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
    <section className="px-5 sm:px-9 3xl:px-[61px] -mb-12 relative z-10">
      <div className="py-16 sm:py-24 3xl:py-[144px] px-10 sm:px-20 3xl:px-[132px] bg-grey-900 rounded-[65px] sm:rounded-[100px] 3xl:rounded-[123px]">
        <div className="space-y-11 3xl:space-y-[72px] text-white max-w-[1532px] mx-auto">
          <h1 className="text-h4 sm:text-h3 3xl:text-4xl">Benefits</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-14 3xl:gap-[130px]">
            {benefits.map((item, index) => (
              <div key={index} className="max-w-[423px] space-y-3">
                <h2 className="text-h5 sm:text-h4 2xl:text-h3 3xl:text-4xl !font-bold">
                  {index + 1}
                </h2>

                <h3 className="text-xl sm:text-h6 2xl:text-h4 3xl:text-h3 !font-medium">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base 3xl:text-h6 !font-normal">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Benefits;
