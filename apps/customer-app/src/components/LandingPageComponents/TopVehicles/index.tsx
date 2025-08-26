import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
// The Navigation module is already imported, which is great.
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
import { FullPageSpinner } from "@repo/ui/spinner";
import useListings, { Vehicle } from "@/components/Explore/hooks/useListings";
import useFavorites from "@/components/Explore/hooks/useFavorites";
import { useHttp } from "@/hooks/useHttp";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BlurredDialog } from "@repo/ui/dialog";
import LoginModal from "@/components/LoginModal";

type Props = {};

// Default placeholder images if no vehicle images are available
const placeholderImages = [
  "/images/vehicles/1.png",
  "/images/vehicles/2.png",
  "/images/vehicles/3.png",
];

function TopVehicles({}: Props) {
  const swiperRef = useRef<SwiperRef>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleMouseEnter = () => {
    swiperRef.current?.swiper?.autoplay?.stop();
  };

  const handleMouseLeave = () => {
    swiperRef.current?.swiper?.autoplay?.start();
  };

  // Use the custom hook instead of useExploreListings
  const { listings, isError, isLoading, error, refetch } = useListings({
    page: 1,
    limit: 5,
  });

  // Get favorites using the new hook
  const { isVehicleFavorited } = useFavorites();

  // Function to get valid image URLs from vehicle data
  const getVehicleImages = (vehicle: Vehicle) => {
    if (!vehicle?.VehicleImage) return placeholderImages;

    const images = [
      vehicle.VehicleImage.frontView,
      vehicle.VehicleImage.backView,
      vehicle.VehicleImage.sideView1,
      vehicle.VehicleImage.sideView2,
      vehicle.VehicleImage.interior,
      vehicle.VehicleImage.other,
    ].filter(Boolean);

    return images.length > 0 ? images : placeholderImages;
  };

  // Check if vehicle is in favorites using the hook function
  const checkIfFavorited = (vehicleId: string) => {
    return isVehicleFavorited(vehicleId);
  };

  // Handle error state
  if (isError) {
    return (
      <section className="pt-[58px] md:pt-0 md:pb-[50px]">
        <div className="container text-center">
          <p className="text-red-500 mb-4">Failed to load vehicles: {error}</p>
          <button
            onClick={refetch}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-[58px] md:pt-0 md:pb-[50px]">
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
          // 1. Add `relative` class to this wrapper for positioning the arrows
          <div
            className="relative"
            onMouseOver={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Swiper
              ref={swiperRef}
              slidesPerView={"auto"}
              // 2. Add Navigation module
              modules={[Pagination, Autoplay, Navigation]}
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
              // 3. Configure navigation to use custom arrow classes
              navigation={{
                nextEl: ".top-vehicles-next",
                prevEl: ".top-vehicles-prev",
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
                  <VehicleCard
                    vehicleId={vehicle?.id ?? ""}
                    name={vehicle?.listingName || "Premium Vehicle"}
                    type={vehicle?.vehicleType || "Luxury"}
                    location={vehicle?.location || "City"}
                    dailyPrice={vehicle?.pricing?.dailyRate?.value || 0}
                    currency={
                      vehicle?.pricing?.dailyRate?.currency ||
                      vehicle?.vehicleCurrency ||
                      "NGN"
                    }
                    vehicleImages={getVehicleImages(vehicle)}
                    showShadow={index === 0}
                    isFavorited={checkIfFavorited(vehicle.id)}
                    onShowLoginModal={() => setShowLoginModal(true)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* 4. Add the arrow buttons (visible on desktop only) */}
            <div className="hidden md:block">
              <button
                aria-label="Previous vehicle"
                className="top-vehicles-prev absolute top-1/2 -translate-y-1/2 left-0 3xl:left-8 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-white/70 backdrop-blur-sm shadow-lg transition-all duration-300 hover:bg-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
                aria-label="Next vehicle"
                className="top-vehicles-next absolute top-1/2 -translate-y-1/2 right-0 3xl:right-8 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-white/70 backdrop-blur-sm shadow-lg transition-all duration-300 hover:bg-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
        ) : (
          <div className="text-center py-10">
            <p className="text-grey-600 text-lg mb-4">
              No vehicles available at the moment
            </p>
            <button
              onClick={refetch}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Refresh
            </button>
          </div>
        )}
      </div>

      {/* Login Modal */}
      <BlurredDialog
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
        trigger={<button className="hidden" />}
        title={<p></p>}
        content={<LoginModal />}
        width="max-w-[556px]"
      />
    </section>
  );
}

export default TopVehicles;

// Vehicle component with like functionality (No changes needed here)
const VehicleCard = ({
  vehicleId,
  vehicleImages,
  name,
  type,
  location,
  dailyPrice,
  currency,
  showShadow,
  isFavorited,
  onShowLoginModal,
}: {
  vehicleId: string;
  vehicleImages: string[];
  name: string;
  type: string;
  location: string;
  dailyPrice: number;
  currency: string;
  showShadow?: boolean;
  isFavorited?: boolean;
  onShowLoginModal: () => void;
}) => {
  const { toggleFavorite, isUpdatingFavorites, isUserLoggedIn } =
    useFavorites();

  // Handle like/unlike action
  const handleLikeClick = async () => {
    const result = await toggleFavorite(vehicleId);

    if (result.requiresLogin) {
      onShowLoginModal();
    }
  };

  // Fallback for empty image array
  const imagesToDisplay =
    vehicleImages.length > 0 ? vehicleImages : placeholderImages;

  // Format currency display
  const formatPrice = (price: number, curr: string) => {
    if (curr === "NGN") {
      return `₦${price.toLocaleString()}`;
    }
    return `${curr} ${price.toLocaleString()}`;
  };

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
          <button
            onClick={handleLikeClick}
            disabled={isUpdatingFavorites}
            className={cn(
              "h-10 w-10 rounded-full flex items-center justify-center transition-all duration-200",
              isFavorited
                ? "bg-red-50 text-red-500"
                : "bg-grey-90 text-grey-600 hover:bg-grey-100",
              isUpdatingFavorites && "opacity-50 cursor-not-allowed"
            )}
          >
            {isUpdatingFavorites ? (
              <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
            ) : (
              <span
                className={cn(
                  "transition-all duration-200",
                  isFavorited && "text-red-500"
                )}
              >
                {isFavorited
                  ? Icons.ic_whishlist_red || Icons.ic_whishlist
                  : Icons.ic_whishlist}
              </span>
            )}
          </button>
        </div>
        <p>{formatPrice(dailyPrice, currency)}/day</p>
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
