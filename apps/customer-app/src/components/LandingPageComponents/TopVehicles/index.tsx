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

const vehicleImages = [
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

  useEffect(() => {
    console.log("listings", listings);
  }, [listings]);

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
                <SwiperSlide key={index} className="!w-auto py-5">
                  <Vehicle
                    vehicleId={vehicle?.id ?? ""}
                    name={vehicle?.listingName}
                    type={vehicle?.vehicleType}
                    location={vehicle.location ?? ""}
                    dailyPrice={vehicle?.pricing?.dailyRate?.value}
                    currency={vehicle?.pricing?.dailyRate?.currency}
                    vehicleImages={[
                      vehicle?.VehicleImage?.frontView,
                      vehicle?.VehicleImage?.backView,
                      vehicle?.VehicleImage?.sideView1,
                      vehicle?.VehicleImage?.sideView2,
                      vehicle?.VehicleImage?.interior,
                      vehicle?.VehicleImage?.other,
                    ]}
                    showShadow={index === 0}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <div className="text-center my-20">no top rated vehicles yet...</div>
        )}
      </div>
    </section>
  );
}

export default TopVehicles;

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
}) => (
  <div
    className={cn(
      "flex flex-col md:flex-row w-[348px] md:w-[700px] 3xl:w-[800px] border border-grey-200 rounded-[42px]",
      showShadow && "first:shadow-[0px_4px_25.4px_0px_#0000001A]"
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
        {vehicleImages.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              src={image}
              alt=""
              width={348}
              height={233}
              className="w-full h-[182px] md:h-[230px] rounded-t-3xl md:rounded-tr-none md:rounded-s-3xl object-cover"
            />
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
        {currency} {dailyPrice}/day
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
