import HowItWorks from "@repo/ui/howItWorks";

type stepProps = {
  title: string;
  description: string;
  button?: string;
};

const steps: stepProps[] = [
  {
    title: "Choose your vehicle",
    description:
      "Browse our wide selection of vehicles to find the one that fits your needs",
  },
  {
    title: "Book online",
    description:
      "Use our easy online booking system to reserve your vehicle in minutes.",
  },
  {
    title: "Enjoy your ride",
    description:
      "Meet the driver at your specified pickup location and start your journey.",
    // button: "Find good deals",
  },
];

function Steps() {
  return <HowItWorks title="How It Works" steps={steps} />;
}

export default Steps;
