import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Image from "next/image";
import cn from "classnames";
import Link from "next/link";
import { formatNumberWithCommas, useFetchUrlParams } from "@/utils/functions";
import { VehicleInformation } from "@/utils/types";
import {
  DotDivider,
  HorizontalDivider,
  VerticalDivider,
} from "@repo/ui/divider";
import { format } from "date-fns";
import { ReactNode, useEffect, useState } from "react";

const VehicleInformationCard = ({
  vehicle,
  vehicleImages,
}: {
  vehicle: VehicleInformation | null;
  vehicleImages: string[];
}) => {
  const { bookingType, startDate, startTime, endDate, endTime } =
    useFetchUrlParams();

  const [priceData, setPriceData] = useState<any>(null);

  useEffect(() => {
    const storedPriceData = localStorage.getItem("priceData");
    if (storedPriceData) {
      setPriceData(JSON.parse(storedPriceData));
    }
  }, []);

  return (
    <div className="space-y-8 border border-grey-200 rounded-3xl max-w-[400px] px-6 py-8">
      {/* name of car */}
      <div className="flex items-center gap-2 justify-between">
        <div className="space-y-2">
          <h6 className="text-base md:text-xl 3xl:text-h6">
            {vehicle?.listingName}
          </h6>
          <p className="text-xs md:text-sm 3xl:text-base text-black">{`NGN ${formatNumberWithCommas(
            vehicle?.pricing?.dailyRate?.value || 0
          )}/day`}</p>
        </div>
        <GreyWrap>
          <Link href="" className="!text-grey-700 hover:underline">
            Preview listing
          </Link>
        </GreyWrap>
      </div>

      {/* slider */}
      <Swiper
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="vehicle-summary-swiper !z-[-1]"
      >
        {vehicleImages.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              src={image}
              alt=""
              width={431}
              height={212}
              className="w-full h-[212px] rounded-3xl object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex items-center justify-between">
        <p className="text-sm md:text-base 3xl:text-xl !font-semibold">
          Booking Summary
        </p>
        <GreyWrap>
          <p className="text-grey-400">Total</p>
          <p className="text-grey-700">
            {priceData?.totalPrice
              ? `NGN ${formatNumberWithCommas(priceData.totalPrice)}`
              : `NGN ${formatNumberWithCommas(
                  (vehicle?.pricing?.dailyRate?.value || 0) * 1
                )}`}
          </p>
        </GreyWrap>
      </div>

      {bookingType && (
        <BookingSummaryItems
          title="Booking Type"
          value={`${bookingType === "SINGLE_DAY" ? "Daily" : "Monthly"} rental`}
        />
      )}

      {startDate && startTime && (
        <>
          <HorizontalDivider variant="light" />
          <BookingSummaryItems
            title="Trip Start"
            date={`${format(new Date(startDate), "EEEE do MMMM yyyy")}`}
            time={`${format(new Date(startDate), "hh:mma")}`}
          />
        </>
      )}

      {endDate && endTime && (
        <>
          <HorizontalDivider variant="light" />
          <BookingSummaryItems
            title="Trip End"
            date={`${format(new Date(endDate), "EEEE do MMMM yyyy")}`}
            time={`${format(new Date(endTime), "hh:mma")}`}
          />
        </>
      )}

      <HorizontalDivider variant="light" />
      <div className="space-y-1 text-sm md:text-base 3xl:text-xl">
        <p className="text-grey-900 !font-semibold">
          Free cancellation until 15th Aug 2024
        </p>
        <p className="text-primary-500">
          Learn more about our free cancellation
        </p>
      </div>
    </div>
  );
};

export default VehicleInformationCard;

const BookingSummaryItems = ({
  title,
  value,
  date,
  time,
}: {
  title: string;
  value?: string;
  date?: string;
  time?: string;
}) => {
  return (
    <div className="space-y-1">
      <p className="text-xs md:text-sm 3xl:text-base text-grey-900">{title}</p>
      {(value || date || time) && (
        <p className="text-sm md:text-base 3xl:text-xl text-grey-700 flex items-center gap-2">
          {value
            ? value
            : date &&
              time && (
                <>
                  <span>{date}</span>
                  <VerticalDivider className="!h-4" />
                  <span>{time}</span>
                </>
              )}
        </p>
      )}
    </div>
  );
};

const GreyWrap = ({ children }: { children: ReactNode }) => {
  return (
    <div className="py-2 px-3 bg-grey-75 rounded-[60px] flex items-center gap-2 text-sm 3xl:text-base !font-medium">
      {children}
    </div>
  );
};
