import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Image from "next/image";
import Icons from "@repo/ui/icons";
import { VerticalDivider } from "@repo/ui/divider";
import Chip from "@repo/ui/chip";
import { formatNumberWithCommas, keyAndValueInAChip } from "@/utils/functions";
import cn from "classnames";
import Link from "next/link";
import useFavorites from "./hooks/useFavorites";
import { useState } from "react";
import { BlurredDialog } from "@repo/ui/dialog";
import LoginModal from "../LoginModal";

type Props = {
  vehicleId: string;
  showAllFilters: boolean;
  isDisplayList: boolean;
  vehicleImages: string[];
  vehicleDetails: { [key: string]: string | JSX.Element }[];
  name: string;
  type: string;
  location: string;
  dailyPrice: number;
  extraHoursFee: number;
  currency: string;
  fromDate?: string;
  untilDate?: string;
  fromTime?: string;
  untilTime?: string;
};

const ExploreVehicleCard = ({
  vehicleId,
  showAllFilters,
  isDisplayList,
  vehicleImages,
  name,
  type,
  location,
  dailyPrice,
  extraHoursFee,
  currency,
  vehicleDetails,
  fromDate,
  untilDate,
  fromTime,
  untilTime,
}: Props) => {
  const {
    isVehicleFavorited,
    toggleFavorite,
    isUpdatingFavorites,
    isUserLoggedIn,
  } = useFavorites();

  const [showLoginModal, setShowLoginModal] = useState(false);

  const isFavorited = isVehicleFavorited(vehicleId);

  const handleFavoriteToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const result = await toggleFavorite(vehicleId);

      if (result.requiresLogin) {
        setShowLoginModal(true);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <>
      <div
        className={cn(
          "w-full border border-grey-200 rounded-[42px] overflow-hidden",
          isDisplayList && showAllFilters
            ? "flex flex-col xl:flex-row xl:h-[230px]"
            : isDisplayList
              ? "flex flex-col md:flex-row md:h-[230px]"
              : ""
        )}
      >
        <div
          className={cn(
            "w-full relative",
            isDisplayList && showAllFilters
              ? "xl:w-[350px] xl:flex-shrink-0"
              : isDisplayList
                ? "md:w-[350px] md:flex-shrink-0"
                : ""
          )}
        >
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
            className="hero-vehicle-swiper w-full"
            watchSlidesProgress={true}
          >
            {vehicleImages.map((image, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={image ?? "/images/vehices/sedan.png"}
                  alt={`${name} - Image ${index + 1}`}
                  width={700}
                  height={460}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 350px"
                  quality={85}
                  priority={index === 0}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  className={cn(
                    "w-full h-[200px] sm:h-[220px] md:h-[240px] lg:h-[230px] object-cover transition-transform duration-300 hover:scale-105",
                    isDisplayList && showAllFilters
                      ? "rounded-t-[42px] xl:rounded-t-none xl:rounded-tr-none xl:rounded-l-[42px] xl:h-[230px]"
                      : isDisplayList
                        ? "rounded-t-[42px] md:rounded-t-none md:rounded-tr-none md:rounded-l-[42px] md:h-[230px]"
                        : "rounded-t-[42px]"
                  )}
                  style={{
                    objectPosition: "center center",
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div
          className={cn(
            "w-full",
            isDisplayList && showAllFilters
              ? "py-6 xl:py-0 px-4 xl:px-0 space-y-3 xl:space-y-0 xl:w-[calc(100%-350px)] flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4"
              : isDisplayList
                ? "md:w-[calc(100%-350px)] flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-6 md:py-0 px-4 md:px-0"
                : "py-6 px-4 3xl:px-8 space-y-3"
          )}
        >
          <Link
            href={`/vehicle/details/${vehicleId}${
              fromDate || fromTime || untilDate || untilTime
                ? // || bookingType
                  `?${[
                    fromDate && `startDate=${fromDate}`,
                    fromTime && `startTime=${fromTime}`,
                    untilDate && `endDate=${untilDate}`,
                    untilTime && `endTime=${untilTime}`,
                    // bookingType && `bookingType=${bookingType}`,
                  ]
                    .filter(Boolean)
                    .join("&")}`
                : ""
            }`}
          >
            <div
              className={cn(
                "text-grey-600 text-base md:text-xl 3xl:text-h6",
                isDisplayList && showAllFilters
                  ? "xl:px-5 xl:min-w-[230px] 2xl:min-w-fit space-y-4"
                  : isDisplayList
                    ? "md:px-5 3xl:px-10 md:py-8 space-y-4"
                    : "space-y-3"
              )}
            >
              <div className="flex flex-row items-center gap-2 flex-wrap">
                <h5 className="text-grey-800 text-xl md:text-h6 3xl:text-h5 !font-semibold">
                  {name}
                </h5>
                {(type === "SUVElectric" || type === "SedanElectric") && (
                  <span className="inline-block px-2 py-0.5 rounded-full bg-success-500 text-xs md:text-sm 3xl:text-sm text-white font-sm relative -top-3">
                    EV
                  </span>
                )}
              </div>

              <div
                className={cn(
                  isDisplayList
                    ? "flex items-center divide-x divide-grey-200 gap-2 sm:gap-4"
                    : "flex flex-col gap-1",
                  showAllFilters && "2xl:divide-x 2xl:divide-grey-200"
                )}
              >
                <div className={isDisplayList ? "pr-2 sm:pr-4" : ""}>
                  {isDisplayList && (
                    <p className="text-xs sm:text-sm lg:text-base text-grey-500 font-medium">
                      Daily
                    </p>
                  )}
                  <p className="text-base sm:text-lg lg:text-xl 3xl:text-2xl font-bold text-grey-800 whitespace-nowrap">
                    {currency} {formatNumberWithCommas(dailyPrice)}
                    {!isDisplayList && (
                      <span className="ml-1 text-xs sm:text-sm text-grey-500 font-normal">
                        /day
                      </span>
                    )}
                  </p>
                </div>
                <div className={isDisplayList ? "pl-2 sm:pl-4" : ""}>
                  {isDisplayList && (
                    <p className="text-xs sm:text-sm lg:text-base text-grey-500 font-medium">
                      Extra Hours
                    </p>
                  )}
                  <p className="text-base sm:text-lg lg:text-xl 3xl:text-2xl font-bold text-grey-800 whitespace-nowrap">
                    {currency} {formatNumberWithCommas(extraHoursFee)}
                    {!isDisplayList && (
                      <span className="ml-1 text-xs sm:text-sm text-grey-500 font-normal">
                        /extra hour
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <p
                className={cn(
                  "text-xs md:text-sm 3xl:text-base text-grey-500 font-bold mt-1",
                  "truncate max-w-[120px] md:max-w-[180px] 3xl:max-w-[220px]"
                )}
                title={
                  type === "SUVElectric" || type === "SedanElectric"
                    ? "Electric Vehicle"
                    : type
                }
              >
                {type === "SUVElectric" || type === "SedanElectric"
                  ? "Electric Vehicle"
                  : type}
              </p>
            </div>
          </Link>

          {isDisplayList && (
            <VerticalDivider
              className={showAllFilters ? "hidden xl:block" : "hidden md:block"}
            />
          )}
          <Link
            href={`/vehicle/details/${vehicleId}${
              fromDate || fromTime || untilDate || untilTime
                ? // || bookingType
                  `?${[
                    fromDate && `startDate=${fromDate}`,
                    fromTime && `startTime=${fromTime}`,
                    untilDate && `endDate=${untilDate}`,
                    untilTime && `endTime=${untilTime}`,
                    // bookingType && `bookingType=${bookingType}`,
                  ]
                    .filter(Boolean)
                    .join("&")}`
                : ""
            }`}
          >
            {isDisplayList && (
              <div
                className={cn(
                  "flex flex-wrap gap-3 3xl:max-w-[400px]",
                  showAllFilters ? "xl:max-w-[365px]" : "xl:max-w-[365px]"
                )}
              >
                {vehicleDetails?.map((detail, index) => {
                  const [key, value] = Object.entries(detail)[0];
                  if (key !== "icon") {
                    return (
                      <Chip
                        icon={detail.icon}
                        key={index}
                        text={keyAndValueInAChip(key, value as string)}
                        variant="filled"
                        radius="sm"
                        color="lighter"
                        className="!px-2 !text-grey-900 !bg-grey-75 border border-grey-200"
                      />
                    );
                  }
                })}
              </div>
            )}
          </Link>

          {isDisplayList && (
            <VerticalDivider
              className={showAllFilters ? "hidden xl:block" : "hidden md:block"}
            />
          )}

          <button
            onClick={handleFavoriteToggle}
            disabled={isUpdatingFavorites}
            className={cn(
              "h-10 w-10 min-w-[2.5rem] rounded-full flex items-center justify-center transition-all duration-200",
              {
                "bg-[#D6EDFF] text-[#0673FF] hover:bg-[#D6EDFF]":
                  isFavorited && isUserLoggedIn,
                "bg-grey-90 text-grey-600 hover:bg-grey-100":
                  !isFavorited || !isUserLoggedIn,
                "opacity-50 cursor-not-allowed": isUpdatingFavorites,
              }
            )}
            style={{ marginRight: 50 }}
            aria-label={
              isFavorited ? "Remove from favorites" : "Add to favorites"
            }
          >
            {isUpdatingFavorites ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
            ) : isFavorited && isUserLoggedIn ? (
              Icons.ic_whishlist_red
            ) : (
              Icons.ic_whishlist
            )}
          </button>
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
};

export default ExploreVehicleCard;
