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
import Button from "@repo/ui/button";
import { BlurredDialog } from "@repo/ui/dialog";

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
  const [openCancellationModal, setOpenCancellationModal] = useState(false);

  const handleOpenCancellationModal = () => {
    setOpenCancellationModal(!openCancellationModal);
  };

  useEffect(() => {
    const storedPriceData = localStorage.getItem("priceData");
    if (storedPriceData) {
      setPriceData(JSON.parse(storedPriceData));
    }
  }, []);

  return (
    <>
      <div className="space-y-8 border border-grey-200 rounded-3xl max-w-[400px] px-6 py-8">
        {/* name of car */}
        <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 xs:gap-4">
          <div className="space-y-1 xs:space-y-2">
            <h6 className="text-sm sm:text-base md:text-xl 3xl:text-h6 font-medium">
              {vehicle?.listingName}
            </h6>
            <p className="text-xs sm:text-sm md:text-sm 3xl:text-base text-black">
              {`NGN ${formatNumberWithCommas(vehicle?.pricing?.dailyRate?.value || 0)}/day`}
            </p>
          </div>
          <GreyWrap>
            <Link
              href=""
              className="!text-grey-700 hover:underline text-xs sm:text-sm"
            >
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
          className="vehicle-summary-swiper"
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "24px",
            overflow: "hidden",
          }}
        >
          {vehicleImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-[212px]">
                <Image
                  src={image}
                  alt={`Vehicle image ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0} // Prioritize loading the first image
                />
              </div>
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
          <button
            onClick={handleOpenCancellationModal}
            className="text-primary-500 hover:underline cursor-pointer bg-transparent border-none p-0"
          >
            Learn more about our free cancellation
          </button>
        </div>
      </div>

      {/* Cancellation Policy Modal */}
      <BlurredDialog
        open={openCancellationModal}
        onOpenChange={handleOpenCancellationModal}
        trigger={<button className="hidden" />}
        title={
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-red-500"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <p className="text-xl font-semibold text-gray-900">
              Cancellation Policy
            </p>
          </div>
        }
        content={<CancellationPolicyModal />}
      />
    </>
  );
};

const CancellationPolicyModal = () => {
  return (
    <div className="space-y-6 py-4">
      {/* 72+ Hours Before Trip */}
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900 text-base">
          72+ Hours Before Trip?
        </h3>
        <p className="text-gray-600 text-sm">
          Get a full refund — no penalties.
        </p>
      </div>

      {/* 48-72 Hours Before Trip */}
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900 text-base">
          48-72 Hours Before Trip?
        </h3>
        <p className="text-gray-600 text-sm">
          You&apos;ll receive a 50% refund or booking credit. Refunds are
          processed within
        </p>
      </div>

      {/* Less Than 48 hours */}
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900 text-base">
          Less Than 48 hours?
        </h3>
        <p className="text-gray-600 text-sm">
          Cancellations are non-refundable.
        </p>
      </div>

      {/* December Bookings */}
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900 text-base">
          December Bookings
        </h3>
        <p className="text-gray-600 text-sm">
          All December bookings are non-cancellable and non-refundable. Please
        </p>
      </div>

      {/* Vehicle Issues */}
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900 text-base">
          Vehicle Issues
        </h3>
        <p className="text-gray-600 text-sm">
          If the vehicle is faulty, report it within 1 hour of pickup for a
          refund.
        </p>
      </div>

      {/* How To Cancel */}
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900 text-base">How To Cancel</h3>
        <p className="text-gray-600 text-sm">
          Log in to your account, go to Bookings, select the trip, and follow
          the steps to
        </p>
      </div>

      {/* Action Button */}
      <div className="pt-4">
        <Button
          color="primary"
          rounded="full"
          fullWidth
          className="bg-blue-600 hover:bg-blue-700"
        >
          Okay, Got it 👍
        </Button>
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
