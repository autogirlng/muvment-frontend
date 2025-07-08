import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Image from "next/image";
import cn from "classnames";
import Link from "next/link";
import { useState } from "react";
import Chip from "@repo/ui/chip";
import Icons from "@repo/ui/icons";
import Button from "@repo/ui/button";
import {
  addSpaceBeforeUppercase,
  formatNumberWithCommas,
  keyAndValueInAChip,
} from "@/utils/functions";
import useVehicleSummary from "@/components/VehicleOnboarding/VehicleSummary/useVehicleSummary";
import { VehicleInformation } from "@/utils/types";
import { BlurredDialog } from "@repo/ui/dialog";

type Props = { vehicle: VehicleInformation | null };

export default function ViewAsCustomer({ vehicle }: Props) {
  const { perks, vehicleDetails, vehicleImages } = useVehicleSummary({
    vehicle,
  });

  const [openCancellationModal, setOpenCancellationModal] = useState(false);

  const handleOpenCancellationModal = () => {
    setOpenCancellationModal(!openCancellationModal);
  };

  return (
    <>
      <div className="space-y-11">
        <div className="space-y-6 md:space-y-8">
          {/* slider */}
          <Swiper
            pagination={{
              type: "fraction",
            }}
            navigation={true}
            modules={[Pagination, Navigation, Autoplay]}
            autoplay={{
              delay: 5000,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            className="vehicle-summary-swiper"
          >
            {vehicleImages.map((image, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={image}
                  alt=""
                  width={1120}
                  height={460}
                  className="w-full h-[218px] md:h-[460px] rounded-[42px] object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* name of car */}
          <h2 className="text-h5 md:text-h3 3xl:text-4xl">
            {vehicle?.listingName}
          </h2>

          {/* car preview */}
          <div className="flex items-center gap-1 md:gap-7 3xl:gap-[41px]">
            {vehicleImages.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt=""
                width={152}
                height={90}
                className="w-full h-[44px] sm:h-[90px] rounded-lg sm:rounded-[18px] object-cover"
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

        <div className="flex flex-col md:flex-row items-start gap-10 ">
          <div className="w-full md:w-[62%] space-y-10">
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
                <button
                  onClick={handleOpenCancellationModal}
                  className="block w-full text-primary-500 text-base 3xl:text-xl hover:underline cursor-pointer bg-transparent border-none p-0 text-left"
                >
                  Learn more about our free cancellation
                </button>
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
              <SectionTitle text="Outskirt Locations" />
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

          {/* pricing */}
          <div className="w-full md:w-[38%] md:border md:border-grey-200 md:rounded-[42px]">
            <div className="md:p-8 divide-y divide-grey-200 text-grey-800 !font-medium text-base 3xl:text-xl">
              <h4 className="text-h5 3xl:text-h4 !font-medium pb-[22px]">
                Pricing
              </h4>
              <div className="py-[22px] flex divide-x divide-grey-200">
                <div className="pr-6">
                  <PricingTitle text="Daily (12 hrs)" />
                  <PricingDescription
                    text={`NGN ${formatNumberWithCommas(vehicle?.pricing?.dailyRate?.value || "")}/day`}
                  />
                </div>
                <div className="pl-6">
                  <PricingTitle text="Extra Hours" />
                  <PricingDescription
                    text={`NGN ${formatNumberWithCommas(vehicle?.pricing?.extraHoursFee || "")}/hr`}
                  />
                </div>
              </div>
              <div className="py-[22px]">
                <PricingTitle text="Trip Duration" />
                <PricingDescription
                  text={`Min: 1 day | Max: ${vehicle?.tripSettings?.maxTripDuration}`}
                />
              </div>
              {vehicle?.pricing?.discounts &&
                vehicle?.pricing?.discounts?.length > 0 && (
                  <div className="py-[22px] space-y-2">
                    <PricingTitle text="Discounts" />
                    {vehicle.pricing.discounts.map((discount, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between gap-2 max-w-[150px] md:max-w-[210px] bg-grey-75 border border-grey-300 p-2 rounded-lg text-sm md:text-xl md:text-h6"
                      >
                        <p>{discount?.durationInDays}+ days</p>
                        <p className="text-success-500">
                          {discount.percentage || 0}% off
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              {vehicle?.pricing?.airportPickupFee && (
                <div className="py-[22px]">
                  <PricingTitle text="Airport Pickups & dropoffs" />
                  <PricingDescription
                    text={`NGN ${formatNumberWithCommas(vehicle?.pricing?.airportPickupFee || "")}/hr`}
                  />
                </div>
              )}
            </div>
          </div>
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
}

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

const PricingTitle = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => (
  <p className={cn("text-xs md:text-base 3xl:text-xl", className)}>{text}</p>
);

const PricingDescription = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => (
  <p className={cn("text-sm md:text-xl 3xl:text-h6 !font-medium", className)}>
    {text}
  </p>
);
