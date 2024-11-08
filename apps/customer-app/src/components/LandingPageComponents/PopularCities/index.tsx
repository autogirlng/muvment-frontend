import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Icons from "@repo/ui/icons";
import LandingPageSectionHeader from "@/components/Header/LandingPageSectionHeader";

type Props = {};

const cities = [
  {
    name: "Lagos",
    description:
      "Experience the dynamic energy of Lagos with our top-rated vehicles",
    link: "/",
    image: "/images/landing/1.jpg",
  },
  {
    name: "Accra",
    description:
      "Discover the vibrant pulse of Accra with Muvment’s premium rentals",
    link: "/",
    image: "/images/landing/2.jpg",
  },
  {
    name: "Port-Harcourt",
    description:
      "Enjoy the scenic beauty of Port Harcourt with our well-maintained vehicles",
    link: "/",
    image: "/images/landing/3.jpg",
  },
  {
    name: "Abuja",
    description: "Explore the capital city of Abuja with our reliable rentals",
    link: "/",
    image: "/images/landing/4.jpg",
  },
  {
    name: "Benin",
    description:
      "Enjoy a great travel experience in the culturally rich city of Benin",
    link: "/",
    image: "/images/landing/5.jpg",
  },
  {
    name: "Enugu",
    description:
      "Experience the charm of Enugu with Muvment’s top-notch rental cars",
    link: "/",
    image: "/images/landing/6.jpg",
  },
];

function PopularCities({}: Props) {
  const swiperRef = useRef<SwiperRef>(null);

  const handleMouseEnter = () => {
    swiperRef.current?.swiper?.autoplay?.stop();
  };

  const handleMouseLeave = () => {
    swiperRef.current?.swiper?.autoplay?.start();
  };

  return (
    <section className="pt-[98px] md:pt-0 md:pb-[200px]">
      <div className="space-y-5 text-center md:text-left container">
        <span className="*:mx-auto md:*:mx-0 *:w-10 md:*:w-20">
          {Icons.ic_cities}
        </span>

        <LandingPageSectionHeader title="Explore Popular Cities" />

        <p className="text-grey-700 text-sm md:text-xl 3xl:text-h6 !font-normal">
          Find the ideal vehicle in these bustling cities and start your
          adventure in style
        </p>
      </div>
      <div className="px-5 sm:px-10 md:px-16 3xl:px-[110px]">
        <div onMouseOver={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Swiper
            slidesPerView={"auto"}
            modules={[Pagination, Autoplay]}
            ref={swiperRef}
            spaceBetween={20}
            pagination={{
              type: "bullets",
              clickable: true,
            }}
            autoplay={{
              delay: 5000,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              0: {
                spaceBetween: 12,
              },
              600: {
                spaceBetween: 20,
              },
            }}
            loop={true}
            className="popular-cities-swiper !py-8"
          >
            {cities.map((city, index) => (
              <SwiperSlide key={index} className="!w-auto py-5">
                <Cities
                  name={city.name}
                  image={city.image}
                  description={city.description}
                  link={city.link}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
export default PopularCities;

const Cities = ({
  name,
  image,
  description,
  link,
}: {
  name: string;
  image: string;
  description: string;
  link: string;
}) => (
  <div className="relative w-[240px] md:w-[385px] h-[240px] md:h-[363px] hover:h-[478px] group transition-all duration-150 ease-in">
    <div className="bg-[#00000066] absolute inset-0 z-0 w-full h-full rounded-[62px]" />
    <Image
      src={image}
      alt=""
      width={385}
      height={363}
      className="rounded-[62px] object-cover object-center h-full w-full"
    />
    <div className="text-white absolute bottom-11 left-11 w-full max-w-[275px] space-y-4">
      <h6 className="text-base md:text-xl 3xl:text-h6 !font-bold">{name}</h6>
      <p className="text-xs 3xl:text-sm hidden group-hover:block">
        {description}
      </p>
      <Link
        href={link}
        className="hidden group-hover:block text-sm md:text-base 3xl:text-xl !font-medium"
      >
        Explore City
      </Link>
    </div>
  </div>
);
