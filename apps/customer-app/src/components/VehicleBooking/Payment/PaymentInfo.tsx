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

const VehiclePaymentInfo = ({}: {}) => {
  //   const { vehicle, perks, vehicleDetails, vehicleImages, isError, isLoading } =
  //     useFetchVehicleById({
  //       id: params?.id,
  //     });

  //   if (isLoading) {
  //     return <FullPageSpinner />;
  //   }

  //   if (isError) {
  //     return <div>Something went wrong</div>;
  //   }

  return (
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
  );
};

export default VehiclePaymentInfo;
