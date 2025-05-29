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

const FavouriteVehicleComponent = ({
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
}: Props) => (
  <div
    className={cn(
      "w-full border border-grey-200 rounded-[20px] bg-white shadow-sm",
      isDisplayList && showAllFilters
        ? "flex flex-col xl:flex-row xl:pr-4 xl:h-[230px]"
        : isDisplayList
          ? "flex flex-col md:flex-row pr-4 md:h-[230px]"
          : ""
    )}
  >
    <div
      className={cn(
        "w-full relative",
        isDisplayList && showAllFilters
          ? "xl:w-[300px]"
          : isDisplayList
            ? "md:w-[300px]"
            : ""
      )}
    >
      <div className="absolute top-3 left-3 z-10 text-grey-700 bg-white/90 backdrop-blur-sm py-1.5 px-3 rounded-full flex items-center gap-1 text-xs font-medium shadow-sm">
        <span className="*:!w-3 *:!h-3">{Icons.ic_location_filled}</span>
        <span className="uppercase tracking-wider">{location}</span>
      </div>

      <div className="absolute bottom-3 left-3 z-10 bg-black/60 text-white px-2 py-1 rounded-full text-xs font-medium">
        1/{vehicleImages.length}
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
              src={image ?? "/images/vehices/sedan.png"}
              alt=""
              width={328}
              height={233}
              className={cn(
                "w-full h-[182px] md:h-[230px] object-cover",
                isDisplayList && showAllFilters
                  ? "rounded-t-[20px] xl:rounded-tr-none xl:rounded-s-[20px]"
                  : isDisplayList
                    ? "rounded-t-[20px] md:rounded-tr-none md:rounded-s-[20px]"
                    : "rounded-t-[20px]"
              )}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    <div
      className={cn(
        "w-full",
        isDisplayList && showAllFilters
          ? "py-6 xl:py-0 px-4 xl:px-0 space-y-3 xl:space-y-0 xl:w-[calc(100%-300px)] flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4"
          : isDisplayList
            ? "md:w-[calc(100%-300px)] flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-6 md:py-0 px-4 md:px-0"
            : "py-6 px-4 3xl:px-8 space-y-3"
      )}
    >
      <div
        className={cn(
          "text-grey-600 text-base md:text-xl 3xl:text-h6",
          isDisplayList && showAllFilters
            ? "xl:px-5 xl:min-w-[230px] 2xl:min-w-fit space-y-3"
            : isDisplayList
              ? "md:px-5 3xl:px-10 md:py-6 space-y-3"
              : "space-y-3"
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
          <h5 className="text-grey-800 text-lg md:text-xl 3xl:text-h5 !font-semibold mb-1">
            {name}
          </h5>
        </Link>
        <div
          className={cn(isDisplayList ? "flex items-start gap-6" : "space-y-3")}
        >
          <div>
            <p className="text-sm text-grey-500 mb-1">Daily</p>
            <p className="text-base md:text-lg !font-semibold text-grey-800">
              {currency} {formatNumberWithCommas(dailyPrice)}
            </p>
          </div>
          <div>
            <p className="text-sm text-grey-500 mb-1">Extra hours</p>
            <p className="text-base md:text-lg !font-semibold text-grey-800">
              {currency} {extraHoursFee}
            </p>
          </div>
        </div>
        <p className="text-sm text-grey-600">{type}</p>
      </div>

      {isDisplayList && (
        <VerticalDivider
          className={cn(
            "h-16 mx-4",
            showAllFilters ? "hidden xl:block" : "hidden md:block"
          )}
        />
      )}

      {isDisplayList && (
        <div
          className={cn(
            "flex flex-wrap gap-2 max-w-[320px]",
            showAllFilters ? "xl:max-w-[320px]" : "xl:max-w-[320px]"
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
                  className="!px-3 !py-1.5 !text-xs !text-grey-700 !bg-grey-50 border border-grey-200 !font-medium"
                />
              );
            }
          })}
        </div>
      )}

      {isDisplayList && (
        <VerticalDivider
          className={cn(
            "h-16 mx-4",
            showAllFilters ? "hidden xl:block" : "hidden md:block"
          )}
        />
      )}

      <div className="flex justify-center items-center flex-1 max-w-[80px]">
        <div
          className="bg-blue-50 text-blue-600 h-10 w-10 min-w-[2.5rem] rounded-full flex items-center justify-center transition-colors"
          style={{ cursor: "pointer" }}
        >
          {Icons.ic_whishlist}
        </div>
      </div>
    </div>
  </div>
);

export default FavouriteVehicleComponent;
