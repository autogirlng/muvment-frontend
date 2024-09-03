import SelectInput from "@repo/ui/select";
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
    <div className="pt-[210px] pb-[191px]">
      <div className="space-y-[141px] max-w-[870px] mx-auto">
        <div className=" space-y-[11px] text-primary-900 text-center ">
          <h1 className="text-h1">Start earning in a few minutes</h1>
          <p>
            Whether you’re an individual looking to earn extra income or a
            business wanting to manage and expand your fleet, our platform
            caters to all. Join 100+ hosts who are maximizing their vehicle’s
            potential.
          </p>
        </div>
        <div className="flex flex-col items-center">
          {steps.map((step, index) => (
            <div key={index} className="h-[600px] last:h-0 relative">
              <div className="h-full w-[5px] bg-grey-400 mx-auto" />
              <div
                className={cn(
                  "absolute  -top-[80px]",
                  (index + 1) % 2 === 0 ? "right-10" : "left-10"
                )}
              >
                <div
                  className={cn(
                    "py-[35px] px-[43px] bg-grey-50 rounded-3xl w-[419px] text-primary-900 relative after:absolute after:top-[70px] after:content-[''] after:h-[30px] after:w-[30px] after:bg-grey-400 after:rounded-full",
                    (index + 1) % 2 === 0
                      ? "after:-right-[52px]"
                      : "after:-left-[52px]"
                  )}
                >
                  <p className="text-base text-grey-400 uppercase">
                    Step {index + 1}
                  </p>
                  <h4 className="text-h4">{step.title}</h4>
                  <p className="text-sm">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Steps;
