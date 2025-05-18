import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Button from "@repo/ui/button";
import Image from "next/image";
<<<<<<< HEAD
=======
import BackLink from "@/components/BackLink";
>>>>>>> d9f2352492730eeff72d585e92a144a72be36d72
import Link from "next/link";
import BackLink from "@/components/BackLink";
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
  }, [bookingDetail]);

  return (
    <div className="flex justify-between flex-col-reverse md:flex-row text-grey-800">
      {/* vehicle summary */}
      <div className="w-full md:w-1/2 3xl:w-5/12 bg-grey-50 space-y-8 py-12 md:py-16 px-4 md:px-8 lg:px-12">
        <BackLink
          backLink={`/vehicle/booking/${vehicleId}`}
          className="text-black hidden md:flex"
        />

        {isLoadingVehicle ? (
          <FullPageSpinner className="!min-h-[300px]" />
        ) : (
          <>
            <h2 className="text-h5 md:text-h3 3xl:text-4xl">
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
                    {bookingDetail?.duration}
                  </p>
                </div>
                <div className="space-y-3 text-xs md:text-sm 3xl:text-base">
                  <div className="flex items-center gap-3 justify-between">
                    <p>Start</p>
                    <p>
                      {bookingDetail?.startDate
                        ? `${format(new Date(bookingDetail?.startDate), "do MMM yyyy")} | ${format(new Date(bookingDetail?.startDate), "h:mma")}`
                        : "N/A"}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 justify-between">
                    <p>Stop</p>
                    <p>
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

      {/* payment summary */}
      <div className="w-full md:w-1/2 3xl:w-7/12 text-center py-16 md:py-[120px] 3xl:py-[200px] px-4 md:px-8 lg:px-12">
        {isLoadingBooking ? (
          <FullPageSpinner className="!min-h-[300px]" />
        ) : bookingDetail?.paymentStatus !== TransactionStatus.SUCCESS ? (
          <>
            <BackLink
              backLink={`/vehicle/booking/${vehicleId}`}
              className="text-black flex md:hidden"
            />

            <div className="h-full flex flex-col  items-center justify-center md:justify-between md:mt-10 gap-16">
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
                  >
                    Proceed to Payment
                  </Button>
                </Link>
              </div>
              <p className="text-grey-500 text-sm md:text-base 3xl:text-xl">
                You can cancel this ride on or before 48hrs to the trip{" "}
                <Link href="/" className="text-primary-500 hover:underline">
                  View policy
                </Link>
              </p>
            </div>
          </>
        ) : (
          <>
            <BackLink
              backLink={`/vehicle/booking/${vehicleId}`}
              className="text-black flex md:hidden"
            />

            <div className="h-full flex flex-col items-center justify-cente md:mt-10 gap-16">
              <div className="w-full max-w-[560px] mx-auto space-y-6">
                <Image
                  src="/icons/success_confetti.png"
                  alt=""
                  className="mx-auto"
                  height={100}
                  width={100}
                />
                <div className="space-y-3">
                  <h2 className=" text-h5 md:text-h3 3xl:text-4xl">
                    Congratulations!
                  </h2>
                  <p className="text-base md:text-xl 3xl:text-h6 !font-normal text-grey-500">
                    ride booked
                  </p>
                </div>
                <Button
                  variant="outlined"
                  rounded="full"
                  fullWidth
                  // onClick={saveBookingHandler}
                  // loading={saveBooking.isPending}
                  // disabled={saveBooking.isPending}
                >
                  Cancel Booking
                </Button>
                <Link href="/bookings" className="block">
                  <Button color="primary" rounded="full" fullWidth>
                    Manage my bookings
                  </Button>
                </Link>
              </div>
              <p className="text-grey-500 text-sm md:text-base 3xl:text-xl">
                You can cancel this ride on or before 48hrs to the trip{" "}
                <Link href="/" className="text-primary-500 hover:underline">
                  View policy
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default VehiclePayment;
