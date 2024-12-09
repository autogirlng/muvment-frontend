import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Button from "@repo/ui/button";
import Image from "next/image";
import Link from "next/link";
import BackLink from "@/components/BackLink";
import {
  calculateNumberOfDays,
  getExistingBookingInformation,
} from "@/utils/functions";
import { VehicleInformation } from "@/utils/types";
import { format } from "date-fns";
import { FullPageSpinner } from "@repo/ui/spinner";
import useFetchVehicleById from "../hooks/useFetchVehicleById";

const VehiclePaymentInfo = ({ vehicleId }: { vehicleId: string }) => {
  const { vehicle, perks, vehicleDetails, vehicleImages, isError, isLoading } =
    useFetchVehicleById({
      id: vehicleId,
    });

  if (isLoading) {
    return <FullPageSpinner />;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }
  const itineraryInformation = getExistingBookingInformation(
    {},
    vehicle?.id ?? "",
    "itineraryInformation"
  );
  const personalInformation = getExistingBookingInformation(
    {},
    vehicle?.id ?? "",
    "personalInformation"
  );

  const endDate = new Date(itineraryInformation?.endDate);
  const startDate = new Date(itineraryInformation?.startDate);
  const endTime = new Date(itineraryInformation?.endTime);
  const startTime = new Date(itineraryInformation?.startTime);
  const numberOfDays = calculateNumberOfDays(endDate, startDate);

  return (
    <div className="flex justify-between flex-col md:flex-row text-grey-800">
      {/* vehicle summary */}
      <div className="w-full md:w-1/2 3xl:w-5/12 bg-grey-50 space-y-8 py-12 md:py-16 px-4 md:px-8 lg:px-12">
        {/* name of car */}
        <BackLink backLink="/" />

        <h2 className="text-h5 md:text-h3 3xl:text-4xl">
          {vehicle?.listingName}
        </h2>

        <div className="space-y-6 md:space-y-8">
          {/* slider */}
          <Swiper
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
                  alt=""
                  width={632}
                  height={325}
                  className="w-full h-[218px] md:h-[325px] rounded-[42px] object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* car preview */}
          <div className="flex items-center gap-1 md:gap-3">
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

          <div className="bg-white py-4 px-7 rounded-[22px] space-y-6">
            <div className="flex items-center gap-3 justify-between">
              <p className="!font-semibold text-sm md:text-base 3xl:text-xl">
                Duration
              </p>
              <button className="text-grey-700 !font-medium border-2 border-grey-700 rounded-[44px] px-3 py-1.5 text-xs md:text-sm 3xl:text-base">
                Edit Dates
              </button>
            </div>
            <div>
              <p className="bg-grey-900 text-white w-fit px-4 py-0.5 rounded-3xl text-xs md:text-sm 3xl:text-base">
                {numberOfDays}
              </p>
            </div>
            <div className="space-y-3 text-xs md:text-sm 3xl:text-base">
              <div className="flex items-center gap-3 justify-between">
                <p>Start</p>
                <p>
                  {format(new Date(startDate), "do MMM yyyy")} |{" "}
                  {format(new Date(startTime), "hh:mma")}
                </p>
              </div>
              <div className="flex items-center gap-3 justify-between">
                <p>Stop</p>
                <p>
                  {" "}
                  {format(new Date(endDate), "do MMM yyyy")} |{" "}
                  {format(new Date(endTime), "hh:mma")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* payment summary */}
      <div className="w-full md:w-1/2 3xl:w-7/12 text-center py-16 md:py-[120px] 3xl:py-[200px] px-4 md:px-8 lg:px-12">
        <div className="h-full flex flex-col items-center justify-between gap-16">
          <div className="max-w-[360px] mx-auto space-y-6">
            <div className="space-y-3">
              <h2 className="text-grey-700 text-h4 md:text-h3 3xl:text-4xl !font-bold">
                This Is The Last Step
              </h2>
              <p className="text-grey-500 text-base md:text-xl 3xl:text-h6 !font-normal">
                pay to confirm booking
              </p>
            </div>
            <h4 className="text-h6 md:text-h5 3xl:text-h4 !font-bold">
              Pay NGN 76,000
            </h4>
            <Button fullWidth variant="filled" color="primary" radius="lg">
              Proceed to Payment
            </Button>
          </div>
          <p className="text-grey-500 text-sm md:text-base 3xl:text-xl">
            You can cancel this ride on or before 48hrs to the trip{" "}
            <Link href="/" className="text-primary-500 hover:underline">
              View policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VehiclePaymentInfo;
