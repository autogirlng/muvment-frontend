import LandingPageSectionHeader from "@/components/Header/LandingPageSectionHeader";
import Image from "next/image";

type Props = {};

type optionProps = {
  type: string;
  image: string;
};

const vehicles: optionProps[] = [
  {
    image: "/images/vehicles/sedan.png",
    type: "Sedan",
  },
  {
    image: "/images/vehicles/suv.png",
    type: "SUV",
  },
  {
    image: "/images/vehicles/truck.png",
    type: "Truck",
  },
  {
    image: "/images/vehicles/bus.png",
    type: "Bus",
  },
];

function VehicleCategories({}: Props) {
  return (
    <section className="py-[98px] md:pt-0 md:pb-[200px]">
      <div className="container space-y-[70px] md:space-y-[110px]">
        <LandingPageSectionHeader
          className="text-primary-900"
          title="Vehicle Categories"
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-11">
          {vehicles.map((option, index) => (
            <div key={index} className="flex flex-col items-center gap-[6px]">
              <Image
                src={option.image}
                alt=""
                width={230}
                height={155}
                className="h-[155px] w-[200px] md:w-[230px] 3xl:w-[270px] object-contain"
              />
              <p className="text-base md:text-h6 !font-semibold">
                {option.type}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default VehicleCategories;
