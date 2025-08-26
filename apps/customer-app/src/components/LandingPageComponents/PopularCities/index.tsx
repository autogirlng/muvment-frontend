import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
// 1. Import Navigation module and its CSS
import { Pagination, Autoplay, Keyboard, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"; // <-- Added navigation CSS

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
    link: "/explore/cities/lagos",
    image: "/images/landing/1.jpg",
  },
  {
    name: "Accra",
    description:
      "Discover the vibrant pulse of Accra with Muvment's premium rentals",
    link: "/explore/cities/accra",
    image: "/images/landing/2.jpg",
  },
  {
    name: "Port-Harcourt",
    description:
      "Enjoy the scenic beauty of Port Harcourt with our well-maintained vehicles",
    link: "/explore/cities/port-harcourt",
    image: "/images/landing/3.jpg",
  },
  {
    name: "Abuja",
    description: "Explore the capital city of Abuja with our reliable rentals",
    link: "/explore/cities/abuja",
    image: "/images/landing/4.jpg",
  },
  {
    name: "Benin",
    description:
      "Enjoy a great travel experience in the culturally rich city of Benin",
    link: "/explore/cities/benin",
    image: "/images/landing/5.jpg",
  },
  {
    name: "Enugu",
    description:
      "Experience the charm of Enugu with Muvment's top-notch rental cars",
    link: "/explore/cities/enugu",
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
    <section
      id="popular-cities"
      className="pt-[98px] md:pt-0 md:pb-[20px] mb-0"
    >
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

      {/* 2. Added relative positioning to this container to position arrows */}
      <div
        className="px-5 sm:px-10 md:px-16 3xl:px-[110px] pb-16 md:pb-24 relative"
        onMouseOver={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Swiper
          onInit={(swiper) => {
            swiper.autoplay.start();
          }}
          slidesPerView={"auto"}
          // 3. Add Navigation to the Swiper modules
          modules={[Pagination, Autoplay, Keyboard, Navigation]}
          ref={swiperRef}
          spaceBetween={20}
          pagination={{
            type: "bullets",
            clickable: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          keyboard={{ enabled: true }}
          // 4. Configure Swiper to use our custom arrow buttons
          navigation={{
            nextEl: ".popular-cities-next",
            prevEl: ".popular-cities-prev",
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

        {/* 5. Add modern navigation arrows (visible on desktop only) */}
        <div className="hidden md:block">
          {/* Left Arrow */}
          <button
            aria-label="Previous slide"
            className="popular-cities-prev absolute top-1/2 -translate-y-1/2 left-4 3xl:left-12 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-white/70 backdrop-blur-sm shadow-lg transition-all duration-300 hover:bg-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
          {/* Right Arrow */}
          <button
            aria-label="Next slide"
            className="popular-cities-next absolute top-1/2 -translate-y-1/2 right-4 3xl:right-12 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-white/70 backdrop-blur-sm shadow-lg transition-all duration-300 hover:bg-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
  <div className="relative w-[240px] md:w-[385px] h-[240px] md:h-[363px] group cursor-pointer select-none">
    {/* Base card with consistent height */}
    <div className="relative w-full h-full rounded-[62px] overflow-hidden transition-all duration-300 ease-out group-hover:scale-105 group-hover:shadow-2xl">
      {/* Overlay that becomes more transparent on hover */}
      <div className="bg-[#00000066] group-hover:bg-[#00000044] absolute inset-0 z-10 w-full h-full transition-all duration-300 ease-out" />

      {/* Image with subtle zoom effect */}
      <Image
        src={image}
        alt={`${name} city`}
        width={385}
        height={363}
        className="rounded-[62px] object-cover object-center h-full w-full transition-transform duration-700 ease-out group-hover:scale-110"
      />

      {/* Content overlay */}
      <div className="text-white absolute inset-0 z-20 p-6 md:p-11 flex flex-col justify-end">
        {/* Always visible title */}
        <h6 className="text-base md:text-xl 3xl:text-h6 !font-bold mb-2 transition-all duration-300 ease-out">
          {name}
        </h6>

        {/* Description with smooth fade-in */}
        <div className="overflow-hidden">
          <p className="text-xs 3xl:text-sm transition-all duration-300 ease-out transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 mb-3 leading-relaxed">
            {description}
          </p>
        </div>

        {/* CTA Link with slide-up animation */}
        <div className="overflow-hidden">
          <Link
            href={link}
            className="inline-flex items-center text-sm md:text-base 3xl:text-xl !font-medium transition-all duration-300 ease-out transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent rounded-md px-2 py-1 -mx-2 -my-1"
            tabIndex={0}
          >
            Explore City
            <svg
              className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>

    {/* Invisible expanded area to prevent layout shift */}
    <div className="absolute -inset-4 pointer-events-none" />
  </div>
);
