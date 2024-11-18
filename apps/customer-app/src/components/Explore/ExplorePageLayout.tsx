"use client";

import BackLink from "@/components/BackLink";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChipFilter, RangeFilter, SearchFilter } from "./Filter";
import {
  vehicleMakeArray,
  vehicleTypeArray,
  yearsFilterArray,
} from "@/utils/data";
import ExploreVehicleCard from "./VehicleCard";
import Icons from "@repo/ui/icons";
import useExploreListings from "./hooks/useExploreListings";
import { FullPageSpinner } from "@repo/ui/spinner";
import cn from "classnames";
import EmptyState from "../EmptyState";
import MainFilters from "./MainFilters";
import AllFilters from "./AllFilters";
import { debounce } from "@/utils/functions";

type Props = {
  title: string;
  icon: JSX.Element;
  type: "top-rated" | "all" | "search";
};

export default function ExplorePageLayout({ title, icon, type }: Props) {
  const [showAllFilters, setShowAllFilters] = useState<boolean>(false);
  const [isDisplayList, setIsDisplayList] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageLimit = 10;
  const [filters, setFilters] = useState<{
    price: number[];
    type: string[];
    make: string[];
    yearOfRelease: string[];
    numberOfSeats: string[];
  }>({
    price: [0, 100000],
    type: [],
    make: [],
    yearOfRelease: [],
    numberOfSeats: [],
  });

  const { listings, totalCount, isError, isLoading } = useExploreListings({
    currentPage,
    pageLimit,
    filters,
    type,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const handleFilterChange = (filterName: string, value: string | number[]) => {
    const processedValue =
      filterName === "numberOfSeats"
        ? (value as string).split(" ")[0].replace("+", "")
        : value;

    setFilters((prev) => ({
      ...prev,
      [filterName]:
        filterName === "price"
          ? value
          : Array.isArray(prev[filterName as keyof typeof prev])
            ? (prev[filterName as keyof typeof prev] as any[]).includes(
                processedValue
              )
              ? (prev[filterName as keyof typeof prev] as any[]).filter(
                  (item) => item !== processedValue
                )
              : [
                  ...(prev[filterName as keyof typeof prev] as any[]),
                  processedValue,
                ]
            : processedValue,
    }));
  };

  return (
    <div
      className={cn(
        "space-y-8 mx-auto",
        showAllFilters
          ? "lg:w-[104%] 2xl:w-[103%] max-w-[1650px] 2xl:max-w-[1700px]"
          : "w-full max-w-[1400px]"
      )}
    >
      <div
        className={cn(
          "space-y-8",
          showAllFilters && "md:ml-[260px] 2xl:ml-[480px] mr-2"
        )}
      >
        <BackLink backLink="/" />
        {type !== "search" && (
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <span className="*:h-4 md:*:h-10 text-primary-500">{icon}</span>
              <h1 className="text-base md:text-h5 3xl:text-h4 !font-bold">
                {title}
              </h1>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => setIsDisplayList(true)}
                className={cn(
                  "*:h-4 3xl:*:h-6 *:w-4 3xl:*:w-6 p-2 rounded-xl",
                  isDisplayList
                    ? "bg-primary-500 text-white"
                    : "border border-grey-300 text-grey-700"
                )}
              >
                {Icons.ic_note_list}
              </button>
              <button
                onClick={() => setIsDisplayList(false)}
                className={cn(
                  "*:h-4 3xl:*:h-6 *:w-4 3xl:*:w-6 p-2 rounded-xl",
                  !isDisplayList
                    ? "bg-primary-500 text-white"
                    : "border border-grey-300 text-grey-700"
                )}
              >
                {Icons.ic_dashboard_square}
              </button>
            </div>
          </div>
        )}
        <h5 className="text-sm md:text-h5 3xl:text-h5">
          {totalCount}+ vehicles available
        </h5>
      </div>

      {showAllFilters ? (
        <AllFilters
          filters={filters}
          handleFilterChange={handleFilterChange}
          setShowAllFilters={setShowAllFilters}
        />
      ) : (
        <MainFilters
          filters={filters}
          handleFilterChange={handleFilterChange}
          setShowAllFilters={setShowAllFilters}
        />
      )}
      <div
        className={cn(
          "space-y-8",
          showAllFilters && "md:ml-[260px] 2xl:ml-[480px] mr-2"
        )}
      >
        {isLoading ? (
          <FullPageSpinner />
        ) : isError ? (
          <p>something went wrong</p>
        ) : listings.length > 0 ? (
          <div
            className={cn(
              isDisplayList
                ? "flex flex-col gap-8"
                : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
            )}
          >
            {listings.map((vehicle, index) => (
              <ExploreVehicleCard
                key={index}
                showAllFilters={showAllFilters}
                isDisplayList={isDisplayList}
                name={vehicle?.listingName}
                type={vehicle?.vehicleType}
                location={vehicle.location ?? ""}
                dailyPrice={vehicle?.pricing?.dailyRate?.value}
                currency={vehicle?.pricing?.dailyRate?.unit}
                extraHoursFee={vehicle?.pricing?.extraHoursFee}
                vehicleImages={[
                  vehicle?.VehicleImage?.frontView,
                  vehicle?.VehicleImage?.backView,
                  vehicle?.VehicleImage?.sideView1,
                  vehicle?.VehicleImage?.sideView2,
                  vehicle?.VehicleImage?.interior,
                  vehicle?.VehicleImage?.other,
                ]}
                vehicleDetails={
                  [
                    {
                      driverAvailable: vehicle?.tripSettings?.provideDriver
                        ? "Yes"
                        : "No",
                      icon: Icons.ic_driver,
                    },
                    // {
                    //   transmission: "Manual",
                    //   icon: Icons.ic_transmission,
                    // },
                    {
                      fuelAvailable: vehicle?.tripSettings?.fuelProvided
                        ? "Yes"
                        : "No",
                      icon: Icons.ic_fuel,
                    },
                    {
                      seats: vehicle?.numberOfSeats?.toString(),
                      icon: Icons.ic_seat,
                    },
                  ] as Array<{ [key: string]: string | JSX.Element }>
                }
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Listing"
            image="/icons/empty_booking_state.png"
          />
        )}
      </div>
    </div>
  );
}
