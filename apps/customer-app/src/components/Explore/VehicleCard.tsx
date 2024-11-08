import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Image from "next/image";
import Icons from "@repo/ui/icons";
import { VerticalDivider } from "@repo/ui/divider";
import Chip from "@repo/ui/chip";
import { keyAndValueInAChip } from "@/utils/functions";

type Props = {
  vehicleImages: string[];
  vehicleDetails: {  [key: string]: string | JSX.Element }[];
};

const ExploreVehicleCard = ({ vehicleImages, vehicleDetails }: Props) => (
  <div className="flex flex-col md:flex-row w-full border border-grey-200 rounded-[42px] pr-4">
    <div className="w-full w-full md:w-[350px] relative">
      <div className="absolute top-3 left-3 z-10 text-grey-800 bg-white py-1 px-3 rounded-3xl flex items-center gap-0.5">
        <span className="*:!w-3 *:!h-3">{Icons.ic_location_filled}</span>
        <span className="uppercase text-xs 3xl:text-sm !font-semibold tracking-wider">
          LAGOS
        </span>
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
              src={image}
              alt=""
              width={348}
              height={233}
              className="w-full h-[182px] md:h-[230px] rounded-t-3xl md:rounded-tr-none md:rounded-s-3xl object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    <div className="w-full md:w-[calc(100%-350px)] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="px-5 3xl:px-10 py-8 text-grey-600 space-y-4 text-base md:text-xl 3xl:text-h6">
        <h5 className="text-grey-800 text-xl md:text-h6 3xl:text-h5 !font-semibold">
          Toyota Corolla 2015
        </h5>
        <div className="flex items-center divide-x divide-grey-200 space-x-3">
          <div>
            <p className="text-sm 3xl:text-base">Daily</p>
            <p className="text-sm md:text-base 3xl:text-xl !font-semibold">
              NGN 420,000
            </p>
          </div>
          <div className="pl-3">
            <p className="text-sm 3xl:text-base">Extra Hours</p>
            <p className="text-sm md:text-base 3xl:text-xl !font-semibold">
              NGN 420,000
            </p>
          </div>
        </div>
        <p>Sedan</p>
      </div>
      <VerticalDivider className="hidden md:block" />

      <div className="flex flex-wrap gap-3 md:max-w-[365px] 3xl:max-w-[400px]">
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

      <VerticalDivider className="hidden md:block" />

      <div className="bg-grey-90 text-grey-600 h-10 w-10 rounded-full flex items-center justify-center">
        {Icons.ic_whishlist}
      </div>
    </div>
  </div>
);

export default ExploreVehicleCard;
