import LandingPageSectionHeader from "@/components/Header/LandingPageSectionHeader";
import cn from "classnames";
import React from "react";

type Props = {};

type stepProps = {
  title: string;
  description: string;
};

const steps: stepProps[] = [
  {
    title: "Sign Up",
    description:
      "Our simple sign-up process gets you started in no time. Create your account and join other hosts to start a business for free.",
  },
  {
    title: "List Your Vehicle",
    description:
      "Adding your vehicle to the platform is straightforward. Follow our easy steps to provide all vehicle and driver details, set your availability schedule, and get your car ready for rental.",
  },
  {
    title: "Start earning",
    description:
      "Get paid promptly and securely. Track your earnings and withdraw your funds with ease, directly from your personal wallet.",
  },
];

function Steps({}: Props) {
  return (
    <section className="py-[120px] md:py-[200px]">
      <div className="space-y-8 md:space-y-[141px] max-w-[914px] mx-auto px-5 md:px-0">
        <LandingPageSectionHeader
          className="text-primary-900 text-center"
          title=" Start earning in a few minutes"
        />
        <div className="flex flex-col gap-3 md:gap-0 items-center">
          {steps.map((step, index) => (
            <div
              key={index}
              className="md:h-[400px] 3xl:h-[600px] last:md:h-0 relative"
            >
              <div className="h-full w-[5px] bg-grey-400 mx-auto" />
              <div
                className={cn(
                  "md:absolute md:-top-[80px]",
                  (index + 1) % 2 === 0 ? "right-10" : "left-10"
                )}
              >
                <div
                  className={cn(
                    "py-[35px] px-8 md:px-[43px] bg-grey-50 rounded-3xl w-full md:w-[330px] lg:w-[419px] text-primary-900 relative space-y-[10px] after:md:absolute after:md:top-[70px] after:md:content-[''] after:md:h-[30px] after:md:w-[30px] after:md:bg-grey-400 after:md:rounded-full",
                    (index + 1) % 2 === 0
                      ? "after:-right-[52px]"
                      : "after:-left-[52px]"
                  )}
                >
                  <p className="text-sm 3xl:text-base text-grey-400 uppercase">
                    Step {index + 1}
                  </p>
                  <h4 className="text-h5 3xl:text-h4">{step.title}</h4>
                  <p className="text-xs md:text-sm">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Steps;
