import useExploreListings from "@/components/Explore/hooks/useExploreListings";
import LandingPageSectionHeader from "@/components/Header/LandingPageSectionHeader";
import Icons from "@repo/ui/icons";
import { FullPageSpinner } from "@repo/ui/spinner";
import cn from "classnames";
import Image from "next/image";
import React from "react";

type Props = {};

function NewListings({}: Props) {
  const { listings, isError, isLoading } = useExploreListings({
    currentPage: 1,
    pageLimit: 5,
    type: "all",
  });

  return (
    <section className="bg-grey-800 py-10 lg:pt-16 xl:pt-20 3xl:pt-[133px] lg:pb-[100px] xl:pb-[130px] 3xl:pb-[186px] px-2 sm:px-10 md:px-16 3xl:px-[110px]">
      <div className="max-w-[1700px] mx-auto flex flex-col lg:flex-row justify-between gap-7 lg:gap-5 xl:gap-8">
        <div className="flex flex-col items-center lg:items-start space-y-5 text-white text-center lg:text-left">
          {Icons.ic_star_double}
          <h1 className="text-h5 md:text-h2 3xl:text-h1 max-w-[860px]">
            Find New Listings
          </h1>
          <p className="hidden lg:block text-base md:text-xl 3xl:text-h6 !font-normal max-w-[480px]">
            Whether you’re an individual looking to earn extra income or a
            business wanting to manage and expand your fleet, our platform
            caters to all. Join 100+ hosts who are maximizing their vehicle’s
            potential.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          {isLoading ? (
            <FullPageSpinner className="!min-h-[300px]" />
          ) : listings.length > 0 ? (
            <>
              {listings.map((vehicle,index) => (
                <Vehicle
                  key={index}
                  vehicleId={vehicle?.id ?? ""}
                  name={vehicle?.listingName}
                  type={vehicle?.vehicleType}
                  dailyPrice={vehicle?.pricing?.dailyRate?.value}
                  currency={vehicle?.pricing?.dailyRate?.currency}
                  // vehicleImage={vehicle?.VehicleImage?.frontView }
                  vehicleImage="/images/vehicles/3.png"
                />
              ))}
            </>
          ) : (
            <p>no new listings yet...</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default NewListings;

const Vehicle = ({
  vehicleId,
  vehicleImage,
  name,
  type,
  dailyPrice,
  currency,
}: {
  vehicleId: string;
  vehicleImage: string;
  name: string;
  type: string;
  dailyPrice: number;
  currency: string;
}) => (
  <div className="max-w-[450px] bg-grey-900 rounded-[54px] space-y-10 p-6 3xl:p-8">
    <div className="w-full relative">
      <Image
        src={vehicleImage}
        alt=""
        width={377}
        height={261}
        className="w-full h-[230px] 3xl:h-[261px] rounded-[27px] object-cover"
      />
      <div className="absolute top-3 right-3 z-10 bg-grey-90 text-grey-600 h-10 w-10 rounded-full flex items-center justify-center">
        {Icons.ic_whishlist}
      </div>
    </div>
    <div className="w-full text-white space-y-4 text-base md:text-xl 3xl:text-h6">
      <h5 className="text-h5 md:text-h4 3xl:text-h3 !font-semibold">{name}</h5>
      <p>
        {currency} {dailyPrice}/day
      </p>
      <p>{type}</p>
    </div>
  </div>
);
