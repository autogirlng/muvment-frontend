"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Button from "@repo/ui/button";
import Image from "next/image";
import BackLink from "@/components/BackLink";
import Link from "next/link";
import { formatNumberWithCommas } from "@/utils/functions";
import { TransactionStatus } from "@/utils/types";
import { format } from "date-fns";
import { FullPageSpinner } from "@repo/ui/spinner";
import useFetchVehicleById from "@/components/VehicleBooking/hooks/useFetchVehicleById";
import useGetBookingById from "@/components/BookingsAnalytics/hooks/useGetBookingById";
import { useEffect, useState } from "react";

const SuccessPaymentComponent = () => {
  const [vehicleId, setVehicleId] = useState<string>("");
  const [bookingId, setBookingId] = useState<string>("");

  useEffect(() => {
    const storedVehicleId = localStorage.getItem("vehicleId");
    const storedBookingId = localStorage.getItem("bookingId");

    if (storedVehicleId) {
      try {
        // If the value was stored as JSON string
        const cleanVehicleId = JSON.parse(storedVehicleId);
        setVehicleId(cleanVehicleId);
      } catch {
        // Fallback if not valid JSON
        setVehicleId(storedVehicleId.replace(/['"]/g, ""));
      }
    }

    if (storedBookingId) {
      try {
        const cleanBookingId = JSON.parse(storedBookingId);
        setBookingId(cleanBookingId);
      } catch {
        setBookingId(storedBookingId.replace(/['"]/g, ""));
      }
    }

    localStorage.removeItem("priceData");
  }, []);

  const { vehicleImages, isLoading: isLoadingVehicle } = useFetchVehicleById({
    id: vehicleId,
  });

  const { bookingDetail, isLoading: isLoadingBooking } = useGetBookingById({
    id: bookingId,
  });

  // Show loading state while getting IDs from localStorage
  if (!vehicleId || !bookingId) {
    return <FullPageSpinner className="!min-h-screen" />;
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row text-grey-800">
      {/* vehicle summary */}
      <div className="w-full lg:w-1/2 2xl:w-5/12 bg-grey-50 order-2 lg:order-1">
        <div className="h-full flex flex-col">
          <div className="flex-1 space-y-6 sm:space-y-8 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-12">
            <BackLink
              backLink={`/vehicle/booking/${vehicleId}`}
              className="text-black hidden lg:flex"
            />

            {isLoadingVehicle ? (
              <FullPageSpinner className="!min-h-[300px]" />
            ) : (
              <>
                <div className="space-y-4">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-h5 xl:text-h3 2xl:text-4xl font-bold leading-tight">
                    {bookingDetail?.vehicle?.listingName}
                  </h2>
                </div>

                <div className="space-y-6 sm:space-y-8">
                  {/* slider */}
                  <div className="w-full">
                    <Swiper
                      pagination={{
                        type: "fraction",
                      }}
                      navigation={true}
                      modules={[Pagination, Navigation]}
                      className="vehicle-summary-swiper w-full"
                      breakpoints={{
                        320: {
                          slidesPerView: 1,
                          spaceBetween: 10,
                        },
                        640: {
                          slidesPerView: 1,
                          spaceBetween: 15,
                        },
                        768: {
                          slidesPerView: 1,
                          spaceBetween: 20,
                        },
                      }}
                    >
                      {vehicleImages.map((image, index) => (
                        <SwiperSlide key={index}>
                          <div className="w-full aspect-[16/9] sm:aspect-[2/1] lg:aspect-[632/325]">
                            <Image
                              src={image}
                              alt={`Vehicle image ${index + 1}`}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                              className="rounded-[20px] sm:rounded-[30px] lg:rounded-[42px] object-cover"
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>

                  {/* car preview */}
                  <div className="flex items-center gap-1 sm:gap-2 md:gap-3 overflow-x-auto pb-2">
                    {vehicleImages.slice(0, 4).map((image, index) => (
                      <div key={index} className="flex-shrink-0 relative">
                        <div className="w-16 h-10 sm:w-20 sm:h-12 md:w-24 md:h-14 lg:w-32 lg:h-20 xl:w-[152px] xl:h-[90px]">
                          <Image
                            src={image}
                            alt={`Vehicle thumbnail ${index + 1}`}
                            fill
                            sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, (max-width: 1024px) 96px, 152px"
                            className="rounded-lg sm:rounded-xl lg:rounded-[18px] object-cover"
                          />
                        </div>
                      </div>
                    ))}
                    {vehicleImages.length > 4 && (
                      <div className="flex-shrink-0 w-16 h-10 sm:w-20 sm:h-12 md:w-24 md:h-14 lg:w-32 lg:h-20 xl:w-[152px] xl:h-[90px] bg-grey-200 rounded-lg sm:rounded-xl lg:rounded-[18px] flex items-center justify-center">
                        <span className="text-xs sm:text-sm text-grey-600 font-medium">
                          +{vehicleImages.length - 4}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="bg-white p-4 sm:p-6 lg:py-4 lg:px-7 rounded-[18px] sm:rounded-[22px] space-y-4 sm:space-y-6">
                    <div className="flex items-center gap-3 justify-between flex-wrap">
                      <p className="font-semibold text-sm sm:text-base lg:text-base xl:text-xl">
                        Duration
                      </p>
                      <button className="text-grey-700 font-medium border-2 border-grey-700 rounded-[44px] px-3 py-1.5 text-xs sm:text-sm xl:text-base hover:bg-grey-700 hover:text-white transition-colors duration-200 whitespace-nowrap">
                        Edit Dates
                      </button>
                    </div>
                    <div>
                      <p className="bg-grey-900 text-white w-fit px-3 sm:px-4 py-0.5 rounded-3xl text-xs sm:text-sm xl:text-base">
                        {bookingDetail?.duration}
                      </p>
                    </div>
                    <div className="space-y-3 text-xs sm:text-sm xl:text-base">
                      <div className="flex items-center gap-3 justify-between">
                        <p className="text-grey-600">Start</p>
                        <p className="text-right font-medium">
                          {bookingDetail?.startDate
                            ? `${format(new Date(bookingDetail?.startDate), "do MMM yyyy")} | ${format(new Date(bookingDetail?.startDate), "h:mma")}`
                            : "N/A"}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 justify-between">
                        <p className="text-grey-600">Stop</p>
                        <p className="text-right font-medium">
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
        </div>
      </div>

      {/* payment summary */}
      <div className="w-full lg:w-1/2 2xl:w-7/12 order-1 lg:order-2">
        <div className="min-h-[50vh] lg:min-h-screen flex flex-col">
          <div className="flex-1 text-center py-12 sm:py-16 lg:py-[120px] 2xl:py-[200px] px-4 sm:px-6 md:px-8 lg:px-12">
            {isLoadingBooking ? (
              <FullPageSpinner className="!min-h-[300px]" />
            ) : bookingDetail?.paymentStatus === TransactionStatus.SUCCESS ? (
              <>
                <BackLink
                  backLink={`/vehicle/booking/${vehicleId}`}
                  className="text-black flex lg:hidden mb-8"
                />

                <div className="h-full flex flex-col items-center justify-center lg:justify-between lg:mt-10 gap-8 sm:gap-12 lg:gap-16">
                  <div className="w-full max-w-[360px] mx-auto space-y-6 sm:space-y-8">
                    <div className="space-y-3 sm:space-y-4">
                      <h2 className="text-grey-700 text-2xl sm:text-3xl lg:text-h4 xl:text-h3 2xl:text-4xl font-bold leading-tight">
                        This Is The Last Step
                      </h2>
                      <p className="text-grey-500 text-base sm:text-lg lg:text-xl 2xl:text-h6 font-normal">
                        pay to confirm booking
                      </p>
                    </div>
                    <h4 className="text-lg sm:text-xl lg:text-h6 xl:text-h5 2xl:text-h4 font-bold text-grey-800">
                      Pay {bookingDetail?.currencyCode}{" "}
                      {formatNumberWithCommas(bookingDetail?.amount || 0)}
                    </h4>
                    <Link
                      className="block w-full"
                      href={bookingDetail?.paymentLink || ""}
                      target="_blank"
                    >
                      <Button
                        fullWidth
                        variant="filled"
                        color="primary"
                        radius="lg"
                        className="h-12 sm:h-14 text-base sm:text-lg font-semibold"
                      >
                        Proceed to Payment
                      </Button>
                    </Link>
                  </div>
                  <p className="text-grey-500 text-sm sm:text-base 2xl:text-xl max-w-md mx-auto leading-relaxed">
                    You can cancel this ride on or before 48hrs to the trip{" "}
                    <Link
                      href="/"
                      className="text-primary-500 hover:underline font-medium"
                    >
                      View policy
                    </Link>
                  </p>
                </div>
              </>
            ) : (
              <>
                <BackLink
                  backLink={`/vehicle/booking/${vehicleId}`}
                  className="text-black flex lg:hidden mb-8"
                />

                <div className="h-full flex flex-col items-center justify-center lg:mt-10 gap-8 sm:gap-12 lg:gap-16">
                  <div className="w-full max-w-[560px] mx-auto space-y-6 sm:space-y-8">
                    <div className="flex justify-center mb-6">
                      <Image
                        src="/icons/success_confetti.png"
                        alt="Success"
                        height={80}
                        width={80}
                        className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-[100px] xl:h-[100px]"
                      />
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                      <h2 className="text-2xl sm:text-3xl lg:text-h5 xl:text-h3 2xl:text-4xl font-bold text-grey-800 leading-tight">
                        Congratulations!
                      </h2>
                      <p className="text-base sm:text-lg lg:text-xl 2xl:text-h6 font-normal text-grey-500">
                        ride booked successfully
                      </p>
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                      <Button
                        variant="outlined"
                        rounded="full"
                        fullWidth
                        className="h-12 sm:h-14 text-base sm:text-lg font-semibold"
                        onClick={() => {
                          localStorage.removeItem("vehicleId");
                          localStorage.removeItem("bookingId");
                          localStorage.removeItem("bookingInformation");
                        }}
                        // onClick={saveBookingHandler}
                        // loading={saveBooking.isPending}
                        // disabled={saveBooking.isPending}
                      >
                        Cancel Booking
                      </Button>
                      <Link href="/bookings" className="block w-full">
                        <Button
                          color="primary"
                          rounded="full"
                          fullWidth
                          className="h-12 sm:h-14 text-base sm:text-lg font-semibold"
                          onClick={() => {
                            localStorage.removeItem("vehicleId");
                            localStorage.removeItem("bookingId");
                            localStorage.removeItem("bookingInformation");
                          }}
                        >
                          Manage my bookings
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <p className="text-grey-500 text-sm sm:text-base 2xl:text-xl max-w-md mx-auto leading-relaxed">
                    You can cancel this ride on or before 48hrs to the trip{" "}
                    <Link
                      href="/"
                      className="text-primary-500 hover:underline font-medium"
                    >
                      View policy
                    </Link>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPaymentComponent;
