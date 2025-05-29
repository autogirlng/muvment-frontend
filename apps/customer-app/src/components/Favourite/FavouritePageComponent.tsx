"use client";

import React, { useState } from "react";
import useFavoriteVehicles from "./hooks/useFavoriteVehicles";
import FavouriteVehicleComponent from "./FavouriteVehicleComponent";
import { formatNumberWithCommas } from "@/utils/functions";
import GetStartedWithFavorites from "./GetStartedWithFavorites";
import { FullPageSpinner } from "@repo/ui/spinner";
import ExploreVehicleCard from "../Explore/VehicleCard";
import FavoritesHeader from "./FavoritesHeader";
import Icons from "@repo/ui/icons";
import { useAppSelector } from "@/lib/hooks";
import cn from "classnames";

const FavouritePageComponent: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDisplayList, setIsDisplayList] = useState(true);
  const pageLimit = 10;

  const { favoriteVehicles, meta, isLoading, isError, error } =
    useFavoriteVehicles({
      currentPage,
      pageLimit,
    });

  // Default placeholder images
  const placeholderImages = [
    "/images/vehicles/1.png",
    "/images/vehicles/2.png",
    "/images/vehicles/3.png",
  ];

  // Function to get valid image URLs from vehicle data
  const getVehicleImages = (vehicle: any) => {
    if (!vehicle?.VehicleImage) return placeholderImages;

    const images = [
      vehicle.VehicleImage.frontView,
      vehicle.VehicleImage.backView,
      vehicle.VehicleImage.sideView1,
      vehicle.VehicleImage.sideView2,
      vehicle.VehicleImage.interior,
      vehicle.VehicleImage.other,
    ].filter(Boolean); // Remove any undefined/null values

    return images.length > 0 ? images : placeholderImages;
  };

  // Transform vehicle data to match ExploreVehicleCard props
  const transformVehicleData = (favoriteVehicle: any) => {
    const { vehicle } = favoriteVehicle;
    console.log("Vehicle data:", vehicle);

    return {
      vehicleId: vehicle.id,
      vehicleImages: getVehicleImages(vehicle),
      name: vehicle.listingName || "Premium Vehicle",
      type: vehicle.vehicleType || "Luxury",
      location: vehicle.location || "City",
      dailyPrice: vehicle.pricing?.dailyRate?.value || 0,
      extraHoursFee: vehicle.pricing?.extraHoursFee || 0,
      currency:
        vehicle.vehicleCurrency ||
        vehicle.pricing?.dailyRate?.currency ||
        "NGN",
      vehicleDetails: [
        {
          driverAvailable: vehicle.tripSettings?.provideDriver ? "Yes" : "No",
          icon: Icons.ic_driver,
        },
        {
          fuelAvailable: vehicle.tripSettings?.fuelProvided ? "Yes" : "No",
          icon: Icons.ic_fuel,
        },
        {
          seats: vehicle.numberOfSeats?.toString() || "4",
          icon: Icons.ic_seat,
        },
      ] as Array<{ [key: string]: string | JSX.Element }>,
    };
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <FullPageSpinner />;
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-grey-800 mb-6">Favourites</h1>
        <div className="flex justify-center items-center h-64">
          <div className="text-red-600">
            Error loading favourites: {error?.message || "Something went wrong"}
          </div>
        </div>
      </div>
    );
  }

  if (favoriteVehicles.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <FavoritesHeader
          userName={user?.firstName || "User"}
          favoriteCount={0}
          isDisplayList={isDisplayList}
          setIsDisplayList={setIsDisplayList}
        />
        <GetStartedWithFavorites />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <FavoritesHeader
        userName={user?.firstName || "User"}
        favoriteCount={meta.total}
        isDisplayList={isDisplayList}
        setIsDisplayList={setIsDisplayList}
      />

      <div
        className={cn(
          isDisplayList
            ? "space-y-6"
            : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        )}
      >
        {favoriteVehicles.map((favoriteVehicle) => {
          const vehicleData = transformVehicleData(favoriteVehicle);
          return (
            <ExploreVehicleCard
              key={vehicleData.vehicleId}
              vehicleId={vehicleData.vehicleId}
              name={vehicleData.name}
              type={vehicleData.type}
              location={vehicleData.location}
              dailyPrice={vehicleData.dailyPrice}
              currency={vehicleData.currency}
              extraHoursFee={vehicleData.extraHoursFee}
              vehicleImages={vehicleData.vehicleImages}
              vehicleDetails={vehicleData.vehicleDetails}
              showAllFilters={false}
              isDisplayList={isDisplayList}
            />
          );
        })}
      </div>

      {/* Pagination */}
      {meta.totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-grey-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-grey-50 transition-colors"
          >
            Previous
          </button>

          <div className="flex space-x-1">
            {Array.from({ length: Math.min(meta.totalPages, 5) }, (_, i) => {
              let page;
              if (meta.totalPages <= 5) {
                page = i + 1;
              } else if (currentPage <= 3) {
                page = i + 1;
              } else if (currentPage >= meta.totalPages - 2) {
                page = meta.totalPages - 4 + i;
              } else {
                page = currentPage - 2 + i;
              }
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    currentPage === page
                      ? "bg-primary-500 text-white"
                      : "border border-grey-200 hover:bg-grey-50 text-grey-700"
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === meta.totalPages}
            className="px-4 py-2 border border-grey-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-grey-50 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default FavouritePageComponent;
