import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import { Navigation, Autoplay, Keyboard, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import LandingPageSectionHeader from "@/components/Header/LandingPageSectionHeader";
import Icons from "@repo/ui/icons";

type Props = {};

type optionProps = {
  type: string;
  image: string;
};

const vehicles: optionProps[] = [
  { image: "/images/vehicles/sedan.png", type: "Sedan" },
  { image: "/images/vehicles/suv.png", type: "SUV" },
  { image: "/images/vehicles/suv.png", type: "SUVElectric" },
  { image: "/images/vehicles/suv.png", type: "SedanElectric" },
  { image: "/images/vehicles/suv.png", type: "MidsizeSUV" },
  { image: "/images/vehicles/truck.png", type: "Truck" },
  { image: "/images/vehicles/bus.png", type: "Bus" },
];

function VehicleCategories({}: Props) {
  const swiperRef = useRef<SwiperRef>(null);

  const formatVehicleType = (type: string) => {
    switch (type) {
      case "SUVElectric":
        return "SUV (Electric)";
      case "SedanElectric":
        return "Sedan (Electric)";
      case "MidsizeSUV":
        return "Mid-size SUV";
      default:
        return type;
    }
  };

  return (
    <section
      id="vehicle-categories"
      className="py-[58px] md:pt-[100px] md:pb-[150px] my-0"
    >
      <div className="container space-y-[70px] md:space-y-[110px]">
        <div className="container !flex items-center justify-between">
          <LandingPageSectionHeader
            className="text-primary-900"
            title="Vehicle Categories"
          />
        </div>

        <div className="relative">
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Autoplay, Keyboard, Pagination]}
            slidesPerView={"auto"}
            spaceBetween={30}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            keyboard={{ enabled: true }}
            pagination={{ clickable: true }}
            navigation={{
              nextEl: ".vehicle-categories-next",
              prevEl: ".vehicle-categories-prev",
            }}
            className="vehicle-categories-swiper !pb-16"
          >
            {vehicles.map((option, index) => (
              <SwiperSlide key={index} className="!w-auto">
                <Link href={`/explore/categories?type=${option.type}`}>
                  <div className="flex flex-col items-center gap-1.5 group">
                    <Image
                      src={option.image}
                      alt={formatVehicleType(option.type)}
                      width={230}
                      height={155}
                      className="h-[155px] w-[200px] md:w-[230px] 3xl:w-[270px] object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                    <p className="text-base md:text-h6 !font-semibold group-hover:text-blue-600 transition-colors">
                      {formatVehicleType(option.type)}
                    </p>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="hidden md:block">
            <button
              aria-label="Previous slide"
              className="vehicle-categories-prev absolute top-1/2 -translate-y-1/2 left-0 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white/70 backdrop-blur-sm shadow-lg transition-all duration-300 hover:bg-white hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-6 h-6 text-gray-800"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button
              aria-label="Next slide"
              className="vehicle-categories-next absolute top-1/2 -translate-y-1/2 right-0 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white/70 backdrop-blur-sm shadow-lg transition-all duration-300 hover:bg-white hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-6 h-6 text-gray-800"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VehicleCategories;
