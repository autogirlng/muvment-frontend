import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Button from "@repo/ui/button";
import Image from "next/image";
import BackLink from "@/components/BackLink";
import Link from "next/link";
import {
  calculateNumberOfDays,
  formatNumberWithCommas,
  getExistingBookingInformation,
} from "@/utils/functions";
import {
  PaymentBadgeStatus,
  TransactionStatus,
  VehicleInformation,
} from "@/utils/types";
import { format } from "date-fns";
import { FullPageSpinner } from "@repo/ui/spinner";
import useFetchVehicleById from "../hooks/useFetchVehicleById";
import useGetBookingById from "@/components/BookingsAnalytics/hooks/useGetBookingById";
import { useEffect } from "react";

const VehiclePayment = ({
  vehicleId,
  bookingId,
}: {
  vehicleId: string;
  bookingId: string;
}) => {
  const { vehicleImages, isLoading: isLoadingVehicle } = useFetchVehicleById({
    id: vehicleId,
  });

  const {
    bookingDetail,
    bookingDates,
    // isError,
    isLoading: isLoadingBooking,
  } = useGetBookingById({
    id: bookingId,
  });

  useEffect(() => {
    console.log("bookingDetail", bookingDetail);
    console.log("VehicleId", vehicleId);
  }, [bookingDetail]);

  return (
    <div className="flex justify-between flex-col-reverse md:flex-row text-grey-800">
      {/* Single back button at the top */}
      <div className="fixed top-4 left-4 z-50 md:absolute md:top-6 md:left-6">
        <BackLink
          backLink={`/vehicle/booking/${vehicleId}`}
          className="text-black flex bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition-all duration-200 md:bg-transparent md:shadow-none md:p-0"
        />
      </div>

      {/* vehicle summary - increased width for more room */}
      <div className="w-full md:w-1/2 bg-grey-50 space-y-6 sm:space-y-8 py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {isLoadingVehicle ? (
          <FullPageSpinner className="!min-h-[300px]" />
        ) : (
          <>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold mt-8 md:mt-0">
              {bookingDetail?.vehicle?.listingName}
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
                      alt={`Vehicle image ${index + 1}`}
                      width={632}
                      height={325}
                      className="w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 2xl:h-96 rounded-2xl sm:rounded-3xl lg:rounded-[42px] object-cover"
                      priority={index === 0}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* car preview */}
              <div className="flex items-center gap-1 sm:gap-2 md:gap-3 overflow-hidden pb-2">
                {vehicleImages.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    width={152}
                    height={90}
                    className="flex-shrink-0 w-16 h-10 sm:w-20 sm:h-12 md:w-24 md:h-14 lg:w-28 lg:h-16 xl:w-32 xl:h-20 rounded-lg sm:rounded-xl md:rounded-[18px] object-cover hover:opacity-75 transition-opacity duration-200 cursor-pointer"
                  />
                ))}
              </div>

              <div className="bg-white py-4 sm:py-5 md:py-6 px-4 sm:px-6 md:px-7 rounded-xl sm:rounded-2xl md:rounded-[22px] space-y-4 sm:space-y-5 md:space-y-6 shadow-sm">
                <div className="flex items-center gap-3 justify-between">
                  <p className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                    Duration
                  </p>
                  <button className="text-grey-700 font-medium border-2 border-grey-700 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base hover:bg-grey-50 transition-colors duration-200">
                    Edit Dates
                  </button>
                </div>
                <div>
                  <p className="bg-grey-900 text-white w-fit px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm md:text-base lg:text-lg">
                    {bookingDetail?.duration}
                  </p>
                </div>
                <div className="space-y-3 text-xs sm:text-sm md:text-base lg:text-lg">
                  <div className="flex items-center gap-3 justify-between">
                    <p className="text-grey-600">Start</p>
                    <p className="font-medium text-right">
                      {bookingDetail?.startDate
                        ? `${format(new Date(bookingDetail?.startDate), "do MMM yyyy")} | ${format(new Date(bookingDetail?.startDate), "h:mma")}`
                        : "N/A"}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 justify-between">
                    <p className="text-grey-600">Stop</p>
                    <p className="font-medium text-right">
                      {bookingDetail?.endDate
                        ? `${format(new Date(bookingDetail?.endDate), "do MMM yyyy")} | ${format(new Date(bookingDetail?.endDate), "h:mma")}`
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* payment summary - adjusted width */}
      <div className="w-full md:w-1/2 text-center py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 px-4 sm:px-6 md:px-8 lg:px-12">
        {isLoadingBooking ? (
          <FullPageSpinner className="!min-h-[300px]" />
        ) : bookingDetail?.paymentStatus !== TransactionStatus.SUCCESS ? (
          <div className="h-full flex flex-col items-center justify-center gap-12 sm:gap-16">
            <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto space-y-6">
              <div className="space-y-3">
                <h2 className="text-grey-700 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
                  This Is The Last Step
                </h2>
                <p className="text-grey-500 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                  pay to confirm booking
                </p>
              </div>
              <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">
                Pay {bookingDetail?.currencyCode}{" "}
                {formatNumberWithCommas(bookingDetail?.amount || 0)}
              </h4>
              <Link
                className="block"
                href={bookingDetail?.paymentLink || ""}
                target="_blank"
              >
                <Button
                  fullWidth
                  variant="filled"
                  color="primary"
                  radius="lg"
                  className="h-12 sm:h-14 text-base sm:text-lg font-semibold hover:shadow-lg transition-shadow duration-200"
                >
                  Proceed to Payment
                </Button>
              </Link>
            </div>
            <p className="text-grey-500 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed max-w-xs sm:max-w-sm md:max-w-md mx-auto">
              You can cancel this ride on or before 48hrs to the trip{" "}
              <Link href="/" className="text-primary-500 hover:underline">
                View policy
              </Link>
            </p>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center gap-12 sm:gap-16">
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto space-y-6">
              <Image
                src="/icons/success_confetti.png"
                alt="Success"
                className="mx-auto"
                height={80}
                width={80}
              />
              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
                  Congratulations!
                </h2>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-grey-500">
                  ride booked
                </p>
              </div>
              <Button
                variant="outlined"
                rounded="full"
                fullWidth
                className="h-12 sm:h-14 text-base sm:text-lg font-semibold hover:bg-grey-50 transition-colors duration-200"
                // onClick={saveBookingHandler}
                // loading={saveBooking.isPending}
                // disabled={saveBooking.isPending}
              >
                Cancel Booking
              </Button>
              <Link href="/bookings" className="block">
                <Button
                  color="primary"
                  rounded="full"
                  fullWidth
                  className="h-12 sm:h-14 text-base sm:text-lg font-semibold hover:shadow-lg transition-shadow duration-200"
                >
                  Manage my bookings
                </Button>
              </Link>
            </div>
            <p className="text-grey-500 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed max-w-xs sm:max-w-sm md:max-w-md mx-auto">
              You can cancel this ride on or before 48hrs to the trip{" "}
              <Link href="/" className="text-primary-500 hover:underline">
                View policy
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehiclePayment;
