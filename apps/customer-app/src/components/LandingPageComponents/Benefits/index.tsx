import Icons from "@repo/ui/icons";
import WhatWeOffer from "@repo/ui/whatWeOffer";
import { ReactNode } from "react";

type Props = {};

type benefitProps = {
  title: string;
  description: string;
  icon: ReactNode;
};

const benefits: benefitProps[] = [
  {
    title: "Wide Selection Of Vehicles",
    description:
      "Whether you need a compact car for city driving, a spacious SUV for a family trip, or a luxury car for a special occasion, Muvment has you covered.",
    icon: Icons.ic_folder_library,
  },
  {
    title: "Affordable Pricing",
    description:
      "We offer competitive rates and transparent pricing, with no hidden fees. Enjoy the best value for your money.",
    icon: Icons.ic_renewable_energy,
  },
  {
    title: "Flexible Rental Periods",
    description:
      "Rent by the hour, day, week, or month. Whatever your needs, we have a rental plan that fits.",
    icon: Icons.ic_bend_tool,
  },
];

function Benefits({}: Props) {
  return (
    <WhatWeOffer
      list={benefits}
      title="Delivering Premium Car Rental Experiences"
      className="!pt-[55px] !pb-[74px] md:!py-[92px] md:!pb-[200px]"
    />
  );
}

export default Benefits;
