import useListings, { Vehicle } from "@/components/Explore/hooks/useListings";
import Icons from "@repo/ui/icons";
import { FullPageSpinner } from "@repo/ui/spinner";
import useFavorites from "@/components/Explore/hooks/useFavorites";
import { BlurredDialog } from "@repo/ui/dialog";
import LoginModal from "@/components/LoginModal";
import cn from "classnames";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";

type Props = {};

function NewListings({}: Props) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { listings, isLoading } = useListings({
    page: 1,
    limit: 8,
  });
  const { isVehicleFavorited } = useFavorites();

  const getVehicleImage = (vehicle: Vehicle) => {
    if (vehicle?.VehicleImage?.frontView) return vehicle.VehicleImage.frontView;
    if (vehicle?.VehicleImage?.sideView1) return vehicle.VehicleImage.sideView1;
    if (vehicle?.VehicleImage?.interior) return vehicle.VehicleImage.interior;
    return "/images/vehicles/3.png";
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = 2;
  const totalPages = Math.ceil(listings.length / cardsPerView);
  const vehicleSliceStart = currentIndex * cardsPerView;
  const vehicleSliceEnd = vehicleSliceStart + cardsPerView;
  const currentVehicles = listings.slice(vehicleSliceStart, vehicleSliceEnd);

  return (
    <section className="bg-[#1A2333] py-10 md:py-[150px] px-4 sm:px-10 md:px-16 flex flex-col items-center relative overflow-hidden">
      <div className="max-w-[1600px] w-full flex flex-col lg:flex-row justify-between gap-10 lg:gap-6 items-center">
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

        {/* Right Section */}
        {/* Right Section */}
        <div className="relative flex items-center w-full lg:w-auto">
          {isLoading ? (
            <FullPageSpinner className="!min-h-[300px]" />
          ) : listings.length > 0 ? (
            <>
              {/* Mobile: horizontal scroll */}
              <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-2 lg:hidden scrollbar-hide">
                {listings.map((vehicle, index) => (
                  <div key={vehicle.id || index} className="snap-start">
                    <Link href={`/vehicle/details/${vehicle.id}`}>
                      <VehicleCard
                        vehicleId={vehicle?.id ?? ""}
                        name={vehicle?.listingName || "Premium Vehicle"}
                        type={vehicle?.vehicleType || "SUV"}
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
                    </Link>
                  </div>
                ))}
              </div>

              {/* Desktop: paginated with dots */}
              <div className="hidden lg:flex relative items-center">
                <div className="flex flex-row gap-6">
                  {currentVehicles.map((vehicle, index) => (
                    <Link
                      key={vehicle.id || index}
                      href={`/vehicle/details/${vehicle.id}`}
                    >
                      <VehicleCard
                        vehicleId={vehicle?.id ?? ""}
                        name={vehicle?.listingName || "Premium Vehicle"}
                        type={vehicle?.vehicleType || "SUV"}
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
                    </Link>
                  ))}
                </div>

                {/* Pagination Dots */}
                {totalPages > 1 && (
                  <div className="absolute -right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i}
                        type="button"
                        aria-label={`Go to page ${i + 1}`}
                        onClick={() => setCurrentIndex(i)}
                        className={cn(
                          "w-3 h-3 rounded-full transition-all border-none outline-none",
                          currentIndex === i
                            ? "bg-white"
                            : "bg-white/40 hover:bg-white/60"
                        )}
                      />
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <p className="text-white text-center pt-16">
              No new listings yet...
            </p>
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

  const handleLikeClick = async () => {
    const result = await toggleFavorite(vehicleId);
    if (result.requiresLogin) onShowLoginModal();
  };

  const formatPrice = (price: number, curr: string) => {
    if (curr === "NGN") return `NGN ${price.toLocaleString()}`;
    return `${curr} ${price.toLocaleString()}`;
  };

  return (
    <div className="w-[280px] sm:w-[340px] md:w-[380px] lg:w-[420px] bg-[#252F43] rounded-2xl p-3 sm:p-4 space-y-3 sm:space-y-4 flex-shrink-0 relative shadow-lg">
      <div className="relative w-full h-[160px] sm:h-[190px] md:h-[210px] lg:h-[240px] rounded-xl overflow-hidden">
        <Image
          src={vehicleImage}
          alt={`${name} vehicle`}
          width={420}
          height={240}
          className="w-full h-full object-cover"
        />
        <button
          onClick={handleLikeClick}
          disabled={isUpdatingFavorites}
          className={cn(
            "absolute top-2 sm:top-3 right-2 sm:right-3 z-10 h-8 sm:h-9 w-8 sm:w-9 rounded-full flex items-center justify-center bg-white/70 hover:bg-white",
            isUpdatingFavorites && "opacity-50 cursor-not-allowed"
          )}
        >
          <span className="text-lg sm:text-xl">
            {isFavorited
              ? Icons.ic_whishlist_red || Icons.ic_whishlist
              : Icons.ic_whishlist}
          </span>
        </button>
      </div>
      <div className="text-white space-y-1 sm:space-y-2">
        <h5 className="text-base sm:text-lg md:text-xl font-semibold">
          {name}
        </h5>
        <p className="text-sm sm:text-base">
          {formatPrice(dailyPrice, currency)}/day
        </p>
        <p className="text-xs sm:text-sm opacity-70">{type}</p>
      </div>
    </div>
  );
};
