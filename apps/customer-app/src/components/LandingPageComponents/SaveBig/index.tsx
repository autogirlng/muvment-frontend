import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import { Pagination, Autoplay, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { useRef } from "react";
import cn from "classnames";
import Image from "next/image";
import Icons from "@repo/ui/icons";
import LandingPageSectionHeader from "@/components/Header/LandingPageSectionHeader";

type Props = {};

function SaveBig({}: Props) {
  const swiperRef = useRef<SwiperRef>(null);

  const handleMouseEnter = () => {
    swiperRef.current?.swiper?.autoplay?.stop();
  };

  const handleMouseLeave = () => {
    swiperRef.current?.swiper?.autoplay?.start();
  };

  return (
    <section className="py-[98px] md:pb-[200px]">
      <div className="container">
        <div className="space-y-5">
          <LandingPageSectionHeader
            coloredTitle="Save"
            title="Big On Your Next Rental"
            description=" Monthly getaway or long-term rental? Get the best rates on premium vehicles with our exclusive deals."
            className="text-center"
          />
        </div>
      </div>
      <div className="px-2 sm:px-10 md:px-16 3xl:px-[110px]">
        <div onMouseOver={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Swiper
            slidesPerView={"auto"}
            modules={[Pagination, Autoplay, Keyboard]}
            spaceBetween={20}
            pagination={{
              type: "bullets",
              clickable: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            keyboard={{ enabled: true }}
            breakpoints={{
              0: {
                spaceBetween: 4,
              },
              600: {
                spaceBetween: 20,
              },
            }}
            loop={true}
            className="hero-vehicle-swiper !py-8"
            onInit={(swiper) => {
              swiper.autoplay.start(); // Ensure autoplay starts when swiper is initialized
            }}
            ref={swiperRef}
          >
            <SwiperSlide className="!w-auto py-5">
              <Vehicle vehicleImage={"/images/vehicles/3.png"} showShadow />
            </SwiperSlide>
            <SwiperSlide className="!w-auto py-5">
              <Vehicle vehicleImage={"/images/vehicles/3.png"} />
            </SwiperSlide>
            <SwiperSlide className="!w-auto py-5">
              <Vehicle vehicleImage={"/images/vehicles/3.png"} />
            </SwiperSlide>
            <SwiperSlide className="!w-auto py-5">
              <Vehicle vehicleImage={"/images/vehicles/3.png"} />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default SaveBig;

const Vehicle = ({
  vehicleImage,
  showShadow,
}: {
  vehicleImage: string;
  showShadow?: boolean;
}) => (
  <div
    className={cn(
      "flex flex-col md:flex-row w-[348px] md:w-[700px] 3xl:w-[800px] border border-grey-200 rounded-[42px]",
      showShadow && "first:shadow-[0px_4px_25.4px_0px_#0000001A]"
    )}
  >
    <div className="w-full min-w-[348px] max-w-[348px] relative">
      <div className="absolute top-3 left-3 z-10 text-grey-800 bg-white py-1 px-3 rounded-3xl flex items-center gap-0.5">
        <span className="*:!w-3 *:!h-3">{Icons.ic_location_filled}</span>
        <span className="uppercase text-xs 3xl:text-sm !font-semibold tracking-wider">
          LAGOS
        </span>
      </div>
      <Image
        src={vehicleImage}
        alt=""
        width={348}
        height={233}
        className="w-full h-[182px] md:h-[230px] rounded-t-3xl md:rounded-tr-none md:rounded-s-3xl object-cover"
      />
    </div>
    <div className="w-full min-w-[350px] px-5 3xl:px-10 py-6 text-grey-600 space-y-4 text-base md:text-xl 3xl:text-h6">
      <div className="flex items-center justify-between gap-2">
        <h5 className="text-grey-800 text-xl md:text-h6 3xl:text-h5 !font-semibold">
          Toyota Corolla 2015
        </h5>
        <div className="bg-grey-90 text-grey-600 h-10 w-10 rounded-full flex items-center justify-center">
          {Icons.ic_whishlist}
        </div>
      </div>
      <div className="flex items-center divide-x divide-grey-200 space-x-3">
        <div>
          <p className="text-sm 3xl:text-base">Monthly</p>
          <p className="text-sm md:text-base 3xl:text-xl !font-semibold">
            NGN 420,000
          </p>
        </div>
        <div className="pl-3">
          <p className="text-sm 3xl:text-base">Daily</p>
          <p className="text-sm md:text-base 3xl:text-xl !font-semibold">
            NGN 420,000
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <p>Sedan</p>
        <p className="bg-success-75 text-success-600 rounded-lg px-3 py-px text-sm 3xl:text-base">
          Save ₦270,000
        </p>
      </div>
      <p className="text-grey-800 text-sm w-fit ml-auto flex items-center gap-1">
        <span>Open Front Door</span>
        <span className="*:!w-4 *:!h-4">{Icons.ic_chevron_right}</span>
      </p>
    </div>
  </div>
);
