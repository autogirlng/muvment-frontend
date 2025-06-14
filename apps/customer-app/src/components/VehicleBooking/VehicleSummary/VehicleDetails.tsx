import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Image from "next/image";
import cn from "classnames";
import Link from "next/link";
import Chip from "@repo/ui/chip";
import Icons from "@repo/ui/icons";
import {
  addSpaceBeforeUppercase,
  getInitialsFromName,
  keyAndValueInAChip,
} from "@/utils/functions";
import {
  MappedInformation,
  VehicleInformation,
  VehiclePerksProp,
} from "@/utils/types";
import { ReactNode, useState, useRef } from "react";
import { DotDivider, VerticalDivider } from "@repo/ui/divider";
import { AvatarImage } from "@repo/ui/avatar";
import useFetchReviews from "../hooks/useFetchReviews";
import useFavorites from "./hooks/useFavorites";
import ReviewCard from "@/components/ReviewCard";
import { FullPageSpinner } from "@repo/ui/spinner";
import EmptyState from "@/components/EmptyState";
import { BlurredDialog } from "@repo/ui/dialog";
import LoginModal from "@/components/LoginModal";

type Props = {
  vehicle: VehicleInformation | null;
  perks: VehiclePerksProp[];
  vehicleDetails: MappedInformation[];
  vehicleImages: string[];
  children?: ReactNode;
};

export default function VehicleDetails({
  vehicle,
  perks,
  vehicleDetails,
  vehicleImages,
  children,
}: Props) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const pageLimit = 10;
  const swiperRef = useRef<SwiperRef>(null);

  const { reviews, totalCount, isError, isLoading } = useFetchReviews({
    id: vehicle?.userId ?? "",
    currentPage,
    pageLimit,
  });

  const {
    isVehicleFavorited,
    toggleFavorite,
    isUpdatingFavorites,
    isUserLoggedIn,
  } = useFavorites();

  const handleFavoriteToggle = async () => {
    if (!vehicle?.id || isUpdatingFavorites) return;

    try {
      const result = await toggleFavorite(vehicle.id);

      // If login is required, show the login modal
      if (result.requiresLogin) {
        setShowLoginModal(true);
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    const title = vehicle?.listingName || "Vehicle Details";
    const text = `Check out this vehicle: ${title}`;

    // Check if the Web Share API is supported
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
      } catch (error) {
        if ((error as { name?: string })?.name !== "AbortError") {
          console.error("Error sharing:", error);
          // Fallback to clipboard
          fallbackShare(url);
        }
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      fallbackShare(url);
    }
  };

  const fallbackShare = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      // You might want to show a toast notification here
      console.log("Link copied to clipboard");
    } catch (error) {
      console.error("Failed to copy link:", error);
      // Final fallback - select the URL text (though we can't easily do this without creating an input)
      alert(`Share this link: ${url}`);
    }
  };

  const handleThumbnailClick = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  const isFavorite = vehicle?.id ? isVehicleFavorited(vehicle.id) : false;

  return (
    <>
      <div className="space-y-11">
        <div className="space-y-6 md:space-y-8">
          {/* name of car */}
          <div className="flex items-center justify-between">
            <h2 className="text-h5 md:text-h3 3xl:text-4xl">
              {vehicle?.listingName}
            </h2>
            <div className="flex gap-3">
              <button
                onClick={handleFavoriteToggle}
                disabled={isUpdatingFavorites}
                className={cn(
                  "w-10 h-10 rounded-full hover:bg-primary-700 hover:text-white flex items-center justify-center transition-colors duration-200",
                  {
                    "bg-primary-100": isFavorite && isUserLoggedIn,
                    "bg-grey-100": !isFavorite || !isUserLoggedIn,
                    "opacity-50 cursor-not-allowed": isUpdatingFavorites,
                  }
                )}
                aria-label={
                  isFavorite ? "Remove from favorites" : "Add to favorites"
                }
              >
                {isUpdatingFavorites ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                ) : (
                  Icons.ic_whishlist
                )}
              </button>
              <button
                onClick={handleShare}
                className="w-10 h-10 bg-grey-100 rounded-full hover:bg-black hover:text-white flex items-center justify-center transition-colors duration-200"
              >
                {Icons.ic_share}
              </button>
              <div className="w-10 h-10 bg-grey-100 rounded-full flex items-center justify-center">
                {Icons.ic_warning}
              </div>
            </div>
          </div>

          {/* slider */}
          <Swiper
            ref={swiperRef}
            pagination={{
              type: "fraction",
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="vehicle-summary-swiper"
          >
            {vehicleImages.map((image, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={image}
                  alt={`Vehicle image ${index + 1}`}
                  width={1120}
                  height={460}
                  className="w-full h-[218px] md:h-[460px] rounded-[42px] object-cover"
                  priority={index === 0}
                  quality={95}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1120px"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* car preview */}
          <div className="flex items-center gap-1 md:gap-7 3xl:gap-[41px]">
            {vehicleImages.map((image, index) => (
              <Image
                onClick={() => handleThumbnailClick(index)}
                key={index}
                src={image}
                alt={`Vehicle thumbnail ${index + 1}`}
                width={152}
                height={90}
                className="w-full h-[44px] sm:h-[90px] rounded-lg sm:rounded-[18px] object-cover cursor-pointer hover:shadow-lg transition-shadow focus:outline-none"
                tabIndex={0}
                role="button"
                aria-label={`View image ${index + 1}`}
                quality={90}
                sizes="(max-width: 640px) 25vw, 152px"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleThumbnailClick(index);
                  }
                }}
              />
            ))}
          </div>
        </div>

        {/* advance notice */}
        <div className="bg-grey-75 p-3 flex gap-3 items-center rounded-[18px]">
          <div className="bg-warning-75 border border-warning-400 text-warning-400 h-[50px] w-[50px] flex justify-center items-center rounded-xl">
            {Icons.ic_notification}
          </div>
          <h6 className="text-grey-700 text-xs md:text-base 3xl:text-h6 !font-medium">
            {vehicle?.tripSettings.advanceNotice} advance notice required before
            booking
          </h6>
          <SectionTitle text="" />
        </div>

        <div className="flex flex-col md:flex-row items-start gap-10">
          <div className="w-full space-y-10">
            <div className="w-full space-y-10">
              {/* vehicle details */}
              <div className="space-y-5">
                <SectionTitle text="Vehicle Details" />
                <div className="flex flex-wrap gap-3">
                  {vehicleDetails.map((detail, index) => {
                    const [key, value] = Object.entries(detail)[0];
                    return (
                      <Chip
                        key={index}
                        text={keyAndValueInAChip(key, value)}
                        variant="filled"
                        radius="sm"
                        color="dark"
                      />
                    );
                  })}
                </div>
              </div>

              {/* vehicle description */}
              <div className="space-y-5">
                <SectionTitle text="Description" className="text-black" />
                <p className="text-xs md:text-base 3xl:text-xl max-w-[535px]">
                  {vehicle?.vehicleDescription}
                </p>
              </div>

              {/* vehicle perks */}
              <div className="space-y-5">
                <SectionTitle text="Perks" />
                <div className="flex flex-wrap gap-3">
                  {perks.map(
                    (perk, index) =>
                      perk.status && (
                        <Chip
                          key={index}
                          text={perk.name}
                          icon={perk.icon}
                          variant="outlined"
                          radius="md"
                          color="light"
                        />
                      )
                  )}
                  <Link
                    href="/"
                    className="block w-full text-primary-500 text-base 3xl:text-xl"
                  >
                    Learn more about our free cancellation
                  </Link>
                </div>
              </div>

              {/* vehicle features */}
              <div className="space-y-5">
                <SectionTitle text="Features" />
                <div className="flex flex-wrap gap-3">
                  {vehicle?.features.map((feature, index) => (
                    <Chip
                      key={index}
                      text={addSpaceBeforeUppercase(feature)}
                      variant="outlined"
                      radius="md"
                      color="light"
                    />
                  ))}
                </div>
              </div>

              {/* outskirt locations */}
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <SectionTitle text="Outskirt Locations" />
                  <DotDivider />
                  <p className="text-sm md:text-base !font-medium text-primary-500 ">
                    {vehicle?.outskirtsPrice}/hr
                  </p>
                </div>
                <div className="flex flex-wrap gap-y-8 gap-x-[18px]">
                  {vehicle?.outskirtsLocation?.map((location, index) => (
                    <p
                      key={index}
                      className="text-sm md:text-base 3xl:text-xl !font-medium text-black flex items-center gap-[14px] w-[170px]"
                    >
                      {Icons.ic_location}
                      <span>{location}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {children}
        </div>
      </div>

      <BlurredDialog
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
        trigger={<button className="hidden" />}
        title={<p></p>}
        content={<LoginModal />}
        width="max-w-[556px]"
      />
    </>
  );
}

const SectionTitle = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => (
  <h6
    className={cn("text-grey-700 text-xl 3xl:text-h6 !font-medium", className)}
  >
    {text}
  </h6>
);

const PricingDescription = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => (
  <p
    className={cn("text-xs md:text-sm 3xl:text-base !font-semibold", className)}
  >
    {text}
  </p>
);
