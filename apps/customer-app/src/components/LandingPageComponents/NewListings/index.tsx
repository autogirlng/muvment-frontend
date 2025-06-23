import useListings, { Vehicle } from "@/components/Explore/hooks/useListings";
import LandingPageSectionHeader from "@/components/Header/LandingPageSectionHeader";
import Icons from "@repo/ui/icons";
import { FullPageSpinner } from "@repo/ui/spinner";
import useFavorites from "@/components/Explore/hooks/useFavorites";
import { BlurredDialog } from "@repo/ui/dialog";
import LoginModal from "@/components/LoginModal";
import cn from "classnames";
import Image from "next/image";
import React, { useState } from "react";

type Props = {};

function NewListings({}: Props) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { listings, isError, isLoading } = useListings({
    page: 1,
    limit: 2,
  });

  const { isVehicleFavorited } = useFavorites();

  // Function to get the primary vehicle image
  const getVehicleImage = (vehicle: Vehicle) => {
    if (vehicle?.VehicleImage?.frontView) {
      return vehicle.VehicleImage.frontView;
    }
    // Fallback to other images if frontView is not available
    if (vehicle?.VehicleImage?.sideView1) {
      return vehicle.VehicleImage.sideView1;
    }
    if (vehicle?.VehicleImage?.interior) {
      return vehicle.VehicleImage.interior;
    }
    // Final fallback to placeholder
    return "/images/vehicles/3.png";
  };

  return (
    <section className="bg-grey-800 py-10 lg:pt-16 xl:pt-20 3xl:pt-[133px] lg:pb-[100px] xl:pb-[130px] 3xl:pb-[186px] px-2 sm:px-10 md:px-16 3xl:px-[110px]">
      <div className="max-w-[1700px] mx-auto flex flex-col lg:flex-row justify-between gap-7 lg:gap-5 xl:gap-8">
        <div className="flex flex-col items-center lg:items-start space-y-5 text-white text-center lg:text-left">
          {Icons.ic_star_double}
          <h1 className="text-h5 md:text-h2 3xl:text-h1 max-w-[860px]">
            Find New Listings
          </h1>
          <p className="hidden lg:block text-base md:text-xl 3xl:text-h6 !font-normal max-w-[480px]">
            Whether you&apos;re an individual looking to earn extra income or a
            business wanting to manage and expand your fleet, our platform
            caters to all. Join 100+ hosts who are maximizing their
            vehicle&apos;s potential.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          {isLoading ? (
            <FullPageSpinner className="!min-h-[300px]" />
          ) : listings.length > 0 ? (
            <>
              {listings.map((vehicle, index) => (
                <VehicleCard
                  key={vehicle.id || index}
                  vehicleId={vehicle?.id ?? ""}
                  name={vehicle?.listingName || "Premium Vehicle"}
                  type={vehicle?.vehicleType || "Luxury"}
                  dailyPrice={vehicle?.pricing?.dailyRate?.value || 0}
                  currency={
                    vehicle?.pricing?.dailyRate?.currency ||
                    vehicle?.vehicleCurrency ||
                    "NGN"
                  }
                  vehicleImage={getVehicleImage(vehicle)}
                  isFavorited={isVehicleFavorited(vehicle?.id ?? "")}
                  onShowLoginModal={() => setShowLoginModal(true)}
                />
              ))}
            </>
          ) : (
            <p>no new listings yet...</p>
          )}
        </div>
      </div>

      {/* Login Modal */}
      <BlurredDialog
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
        trigger={<button className="hidden" />}
        title={<p></p>}
        content={<LoginModal />}
        width="max-w-[556px]"
      />
    </section>
  );
}

export default NewListings;

const VehicleCard = ({
  vehicleId,
  vehicleImage,
  name,
  type,
  dailyPrice,
  currency,
  isFavorited,
  onShowLoginModal,
}: {
  vehicleId: string;
  vehicleImage: string;
  name: string;
  type: string;
  dailyPrice: number;
  currency: string;
  isFavorited?: boolean;
  onShowLoginModal: () => void;
}) => {
  const { toggleFavorite, isUpdatingFavorites } = useFavorites();

  // Handle like/unlike action
  const handleLikeClick = async () => {
    const result = await toggleFavorite(vehicleId);

    if (result.requiresLogin) {
      onShowLoginModal();
    }
  };

  // Format currency display
  const formatPrice = (price: number, curr: string) => {
    if (curr === "NGN") {
      return `₦${price.toLocaleString()}`;
    }
    return `${curr} ${price.toLocaleString()}`;
  };

  return (
    <div className="max-w-[450px] bg-grey-900 rounded-[54px] space-y-10 p-6 3xl:p-8">
      <div className="w-full relative">
        <Image
          src={vehicleImage}
          alt={`${name} vehicle`}
          width={377}
          height={261}
          className="w-full h-[230px] 3xl:h-[261px] rounded-[27px] object-cover"
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            const target = e.target as HTMLImageElement;
            target.src = "/images/vehicles/3.png";
          }}
        />
        <button
          onClick={handleLikeClick}
          disabled={isUpdatingFavorites}
          className={cn(
            "absolute top-3 right-3 z-10 h-10 w-10 rounded-full flex items-center justify-center transition-all duration-200",
            isFavorited
              ? "bg-red-50 text-red-500"
              : "bg-grey-90 text-grey-600 hover:bg-grey-100",
            isUpdatingFavorites && "opacity-50 cursor-not-allowed"
          )}
        >
          {isUpdatingFavorites ? (
            <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
          ) : (
            <span
              className={cn(
                "transition-all duration-200",
                isFavorited && "text-red-500"
              )}
            >
              {isFavorited
                ? Icons.ic_whishlist_red || Icons.ic_whishlist
                : Icons.ic_whishlist}
            </span>
          )}
        </button>
      </div>
      <div className="w-full text-white space-y-4 text-base md:text-xl 3xl:text-h6">
        <h5 className="text-h5 md:text-h4 3xl:text-h3 !font-semibold">
          {name}
        </h5>
        <p>{formatPrice(dailyPrice, currency)}/day</p>
        <p>{type}</p>
      </div>
    </div>
  );
};
