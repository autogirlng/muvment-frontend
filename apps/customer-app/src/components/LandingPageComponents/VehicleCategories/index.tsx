import LandingPageSectionHeader from "@/components/Header/LandingPageSectionHeader";
import Icons from "@repo/ui/icons";
import Image from "next/image";
import Link from "next/link";

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
    <section
      id="vehicle-categories"
      className="py-[58px] md:pt-[100px] md:pb-[200px] my-0"
    >
      <div className="container space-y-[70px] md:space-y-[110px]">
        <div className="container !flex items-center justify-between">
          <LandingPageSectionHeader
            className="text-primary-900"
            title="Vehicle Categories"
          />
          {/* <Link
            href="/explore/categories"
            className="hidden md:flex items-center gap-2 text-grey-500 text-xl md:text-h6 3xl:text-5 !font-bold"
          >
            <span>See All</span>
            {Icons.ic_chevron_right}
          </Link> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-11">
          {vehicles.map((option, index) => (
            <div key={index} className="flex flex-col items-center gap-1.5">
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
