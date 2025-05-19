import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { useEffect, useRef, useState } from "react";
import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import Icons from "@repo/ui/icons";
import LandingPageSectionHeader from "@/components/Header/LandingPageSectionHeader";
import useExploreListings from "@/components/Explore/hooks/useExploreListings";
import { FullPageSpinner } from "@repo/ui/spinner";

type Props = {};

// Default placeholder images if no vehicle images are available
const placeholderImages = [
  "/images/vehicles/1.png",
  "/images/vehicles/2.png",
  "/images/vehicles/3.png",
];

function TopVehicles({}: Props) {
  const swiperRef = useRef<SwiperRef>(null);

  const handleMouseEnter = () => {
    swiperRef.current?.swiper?.autoplay?.stop();
  };

  const handleMouseLeave = () => {
    swiperRef.current?.swiper?.autoplay?.start();
  };

  const { listings, isError, isLoading } = useExploreListings({
    currentPage: 1,
    pageLimit: 5,
    type: "top-rated",
  });

  // Function to get valid image URLs from vehicle data
  const getVehicleImages = (vehicle: any) => {
    if (!vehicle?.VehicleImage) return placeholderImages;

    const images = [
      vehicle.VehicleImage.frontView,
      vehicle.VehicleImage.backView,
      vehicle.VehicleImage.sideView1,
      vehicle.VehicleImage.sideView2,
      vehicle.VehicleImage.interior,
      vehicle.VehicleImage.other,
    ].filter(Boolean); // Remove any undefined/null values

    return images.length > 0 ? images : placeholderImages;
  };

  return (
    <section className="pt-[98px] md:pt-0 md:pb-[200px]">
      <div className="container !flex items-center justify-between">
        <div className="space-y-5 text-center md:text-left">
          <span className="*:mx-auto md:*:mx-0 *:w-10 md:*:w-20">
            {Icons.ic_top_rated_vehicle}
          </span>
          <LandingPageSectionHeader title="Top-rated vehicles" />
          <p className="text-grey-700 text-sm md:text-xl 3xl:text-h6 !font-normal">
            Our most popular choices offer the perfect balance of luxury,
            reliability, and comfort for your trip
          </p>
        </div>
        <Link
          href="/explore/top-rated-vehicles"
          className="hidden md:flex items-center gap-2 text-grey-500 text-xl md:text-h6 3xl:text-5 !font-bold"
        >
          <span>See All</span>
          {Icons.ic_chevron_right}
        </Link>
      </div>
      <div className="px-2 sm:px-10 md:px-16 3xl:px-[110px]">
        {isLoading ? (
          <FullPageSpinner className="!min-h-[300px]" />
        ) : listings.length > 0 ? (
          <div onMouseOver={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Swiper
              ref={swiperRef}
              slidesPerView={"auto"}
              modules={[Pagination, Autoplay]}
              spaceBetween={20}
              pagination={{
                type: "bullets",
                clickable: true,
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                0: {
                  spaceBetween: 4,
                },
                600: {
                  spaceBetween: 20,
                },
              }}
              loop={true}
              className="hero-vehicle-swiper !py-8"
            >
              {listings.map((vehicle, index) => (
                <SwiperSlide key={vehicle.id || index} className="!w-auto py-5">
                  <Vehicle
                    vehicleId={vehicle?.id ?? ""}
                    name={vehicle?.listingName || "Premium Vehicle"}
                    type={vehicle?.vehicleType || "Luxury"}
                    location={vehicle?.location || "City"}
                    dailyPrice={vehicle?.pricing?.dailyRate?.value || 0}
                    currency={vehicle?.pricing?.dailyRate?.currency || "NGN"}
                    vehicleImages={getVehicleImages(vehicle)}
                    showShadow={index === 0}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          // Fallback when no listings are available
          <div className="flex justify-center">
            <Vehicle
              vehicleId=""
              name="Premium Vehicle"
              type="Luxury"
              location="City"
              dailyPrice={0}
              currency="NGN"
              vehicleImages={placeholderImages}
              showShadow={true}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default TopVehicles;

// Vehicle component with proper image handling
const Vehicle = ({
  vehicleId,
  vehicleImages,
  name,
  type,
  location,
  dailyPrice,
  currency,
  showShadow,
}: {
  vehicleId: string;
  vehicleImages: string[];
  name: string;
  type: string;
  location: string;
  dailyPrice: number;
  currency: string;
  showShadow?: boolean;
}) => {
  // Fallback for empty image array
  const imagesToDisplay =
    vehicleImages.length > 0 ? vehicleImages : placeholderImages;

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row w-[348px] md:w-[700px] 3xl:w-[800px] border border-grey-200 rounded-[42px]",
        showShadow && "shadow-[0px_4px_25.4px_0px_#0000001A]"
      )}
    >
      <div className="w-full max-w-[348px] relative">
        <div className="absolute top-3 left-3 z-10 text-grey-800 bg-white py-1 px-3 rounded-3xl flex items-center gap-0.5">
          <span className="*:!w-3 *:!h-3">{Icons.ic_location_filled}</span>
          <span className="uppercase text-xs 3xl:text-sm !font-semibold tracking-wider">
            {location}
          </span>
        </div>
        <Swiper
          pagination={{
            type: "fraction",
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="hero-vehicle-swiper"
        >
          {imagesToDisplay.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-[182px] md:h-[230px]">
                <Image
                  src={image}
                  alt={`${name} - ${index + 1}`}
                  fill
                  className="rounded-t-3xl md:rounded-tr-none md:rounded-s-3xl object-cover"
                  sizes="(max-width: 768px) 100vw, 348px"
                  priority={index === 0}
                  onError={(e) => {
                    // Fallback to placeholder if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.src =
                      placeholderImages[index % placeholderImages.length];
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="w-full min-w-[350px] px-5 3xl:px-10 py-8 text-grey-600 space-y-4 text-base md:text-xl 3xl:text-h6">
        <div className="flex items-center justify-between gap-2">
          <h5 className="text-grey-800 text-xl md:text-h6 3xl:text-h5 !font-semibold">
            {name}
          </h5>
          <div className="bg-grey-90 text-grey-600 h-10 w-10 rounded-full flex items-center justify-center">
            {Icons.ic_whishlist}
          </div>
        </div>
        <p>
          {currency} {dailyPrice.toLocaleString()}/day
        </p>
        <p>{type}</p>
        <Link
          href={`/vehicle/details/${vehicleId}`}
          className="text-grey-800 text-sm w-fit ml-auto flex items-center gap-1"
        >
          <span>Open Front Door</span>
          <span className="*:!w-4 *:!h-4">{Icons.ic_chevron_right}</span>
        </Link>
      </div>
    </div>
  );
};
