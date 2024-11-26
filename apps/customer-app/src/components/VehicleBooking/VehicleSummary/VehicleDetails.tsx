import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Image from "next/image";
import cn from "classnames";
import Link from "next/link";
import Chip from "@repo/ui/chip";
import Icons from "@repo/ui/icons";
import {
  addSpaceBeforeUppercase,
  getInitialsFromName,
  keyAndValueInAChip,
} from "@/utils/functions";
import {
  MappedInformation,
  VehicleInformation,
  VehiclePerksProp,
} from "@/utils/types";
import { ReactNode, useState } from "react";
import { DotDivider, VerticalDivider } from "@repo/ui/divider";
import { AvatarImage } from "@repo/ui/avatar";
import useFetchReviews from "../hooks/useFetchReviews";
import ReviewCard from "@/components/ReviewCard";
import { FullPageSpinner } from "@repo/ui/spinner";
import EmptyState from "@/components/EmptyState";

type Props = {
  vehicle: VehicleInformation | null;
  perks: VehiclePerksProp[];
  vehicleDetails: MappedInformation[];
  vehicleImages: string[];
  children?: ReactNode;
};

export default function VehicleDetails({
  vehicle,
  perks,
  vehicleDetails,
  vehicleImages,
  children,
}: Props) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageLimit = 10;

  const { reviews, totalCount, isError, isLoading } = useFetchReviews({
    id: vehicle?.userId ?? "",
    currentPage,
    pageLimit,
  });
  return (
    <div className="space-y-11">
      <div className="space-y-6 md:space-y-8">
        {/* name of car */}
        <h2 className="text-h5 md:text-h3 3xl:text-4xl">
          {vehicle?.listingName}
        </h2>

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
                width={1120}
                height={460}
                className="w-full h-[218px] md:h-[460px] rounded-[42px] object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

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

      <div className="flex flex-col md:flex-row items-start gap-10">
        <div className="w-full space-y-10">
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
                <Link
                  href="/"
                  className="block w-full text-primary-500 text-base 3xl:text-xl"
                >
                  Learn more about our free cancellation
                </Link>
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
              <div className="flex items-center gap-3">
                <SectionTitle text="Outskirt Locations" />
                <DotDivider />
                <p className="text-sm md:text-base !font-medium text-primary-500 ">
                  {vehicle?.outskirtsPrice}/hr
                </p>
              </div>
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
          {/* host details */}
          <div className="space-y-5 w-full">
            <SectionTitle text="Host Details" />
            <div className="space-y-2 bg-grey-75 py-6 px-8 rounded-3xl">
              <div className="flex items-center justify-between border border-grey-300 rounded-[74px] p-2 pr-4 ">
                <div className="flex items-center gap-2">
                  <AvatarImage
                    image={vehicle?.user?.profileImage || ""}
                    initials={
                      getInitialsFromName(
                        vehicle?.user?.firstName ?? "",
                        vehicle?.user?.lastName ?? ""
                      ) || Icons.ic_user
                    }
                    size="!w-[70px] !h-[70px]"
                  />
                  <HostInformation
                    title="Host Name"
                    value={`${vehicle?.user?.firstName} ${vehicle?.user?.lastName}`}
                  />
                </div>
                <VerticalDivider className="!h-14" />

                <HostInformation
                  title="Rating"
                  value={`${vehicle?.statistics?.hostStats?.averageRating ?? 0}`}
                />
                <VerticalDivider className="!h-14" />

                <HostInformation
                  title="No of Completed Rides"
                  value={`${vehicle?.statistics?.hostStats?.totalCompletedRides ?? 0}`}
                />
              </div>
              {isLoading ? (
                <FullPageSpinner className="!min-h-[300px]" />
              ) : reviews.length > 0 ? (
                <div className={cn("py-6")}>
                  {reviews.map((review, index) => (
                    <ReviewCard
                      key={index}
                      review={review}
                      bgColor="bg-white"
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No Reviews Yet"
                  message="Reviews Will Appear Here"
                  image="/icons/empty_review_state.png"
                  imageSize="w-[182px] 3xl:w-[265px]"
                  noBg
                />
              )}
            </div>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}

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

const PricingDescription = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => (
  <p
    className={cn("text-xs md:text-sm 3xl:text-base !font-semibold", className)}
  >
    {text}
  </p>
);

const HostInformation = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => {
  return (
    <div className="space-y-1">
      <p className="text-xs md:text-sm">{title}</p>
      <PricingDescription text={value} />
    </div>
  );
};
