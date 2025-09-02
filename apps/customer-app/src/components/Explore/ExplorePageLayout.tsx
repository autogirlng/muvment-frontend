"use client";

import cn from "classnames";
import { useEffect, useState, useMemo } from "react";
import { FullPageSpinner } from "@repo/ui/spinner";
import Icons from "@repo/ui/icons";
import Pagination from "@repo/ui/pagination";
import ExploreVehicleCard from "./VehicleCard";
import useExploreListings from "./hooks/useExploreListings";
import useFavorites from "./hooks/useFavorites";
import EmptyState from "../EmptyState";
import MainFilters from "./MainFilters";
import AllFilters from "./AllFilters";
// import SearchBookings from "../SearchBookings";
import DesktopNav from "../Navbar/DesktopNav";
import MobileNav from "../Navbar/MobileNav";
import BackLink from "@/components/BackLink";
import { useAppSelector } from "@/lib/hooks";
import SearchBookings from "../SearchBooking/SearchBookings";
import NavBookingSearchBar from "../searchbar-component/NavBookingSearchBar";

// Default placeholder images
const placeholderImages = [
  "/images/vehicles/1.png",
  "/images/vehicles/2.png",
  "/images/vehicles/3.png",
];

type Props = {
  title?: string;
  icon?: JSX.Element;
  type: "top-rated" | "all" | "search" | "category";
  location?: string;
  search?: string;
  fromDate?: string;
  fromTime?: string;
  untilDate?: string;
  untilTime?: string;
};

type FilterState = {
  minPrice: number;
  maxPrice: number;
  type: string[];
  make: string[];
  yearOfRelease: string[];
  numberOfSeats: string[];
  features: string[];
  [key: string]: any;
};

export default function ExplorePageLayout({
  title,
  icon,
  type,
  location,
  search,
  fromDate,
  fromTime,
  untilDate,
  untilTime,
}: Props) {
  const { user } = useAppSelector((state) => state.user);
  const { favoriteVehicleIds } = useFavorites();
  const pageLimit = 10;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isDisplayList, setIsDisplayList] = useState<boolean>(true);
  const [showAllFilters, setShowAllFilters] = useState<boolean>(false);

  const [filters, setFilters] = useState<FilterState>({
    minPrice: 0,
    maxPrice: 10000000,
    type: [],
    make: [],
    yearOfRelease: [],
    numberOfSeats: [],
    features: [],
  });

  const [searchValue, setSearchValue] = useState<string>(search || "");
  const [fromDateValue, setFromDateValue] = useState<Date | null>(
    fromDate ? new Date(fromDate) : null
  );
  const [fromTimeValue, setFromTimeValue] = useState<Date | null>(
    fromTime ? new Date(fromTime) : null
  );
  const [untilDateValue, setUntilDateValue] = useState<Date | null>(
    untilDate ? new Date(untilDate) : null
  );
  const [untilTimeValue, setUntilTimeValue] = useState<Date | null>(
    untilTime ? new Date(untilTime) : null
  );

  const { listings, totalCount, totalPages, page, limit, isError, isLoading } = useExploreListings({
    currentPage,
    pageLimit,
    filters,
    type,
    search: searchValue,
    fromDate: fromDateValue?.toISOString(),
    untilDate: untilDateValue?.toISOString(),
    location,
  });

  console.log("Listings:", listings);
  console.log("Total Count:", totalCount);

  // Fetch user's favorite vehicles
  useEffect(() => {
    // The useFavorites hook automatically handles fetching favorites
    // No need for manual API calls here
  }, [user]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Create a dependency key that changes when filters change to force refetch
  const filterKey = useMemo(() => JSON.stringify({
    ...filters,
    search: searchValue,
    fromDate: fromDateValue?.toISOString(),
    untilDate: untilDateValue?.toISOString(),
    location,
  }), [filters, searchValue, fromDateValue, untilDateValue, location]);

    const handleFilterChange = (filterName: string, value: string | number[] | number) => {
    setFilters((prev) => {
      if (filterName === "minPrice" || filterName === "maxPrice") {
        return {
          ...prev,
          [filterName]: value as number,
        };
      } else {
        return {
          ...prev,
          [filterName]:
            Array.isArray(prev[filterName as keyof typeof prev])
              ? (prev[filterName as keyof typeof prev] as any[]).includes(
                  value
                )
                ? (prev[filterName as keyof typeof prev] as any[]).filter(
                    (item) => item !== value
                )
                : [
                    ...(prev[filterName as keyof typeof prev] as any[]),
                    value,
                  ]
              : value,
        };
      }
    });
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setCurrentPage(1); // Reset page to 1 when search value changes
  };

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

  return (
    <div>
      <DesktopNav user={user} explorePage>
        <div className="max-w-[1024px]">
          <NavBookingSearchBar />
        </div>
      </DesktopNav>
      <MobileNav user={user}></MobileNav>
      <div className="pb-14 pt-10 md:pt-44 px-8">
        <div
          className={cn(
            "space-y-8 mx-auto",
            showAllFilters
              ? "lg:w-[102%] 3xl:w-[103%] max-w-[1650px] 3xl:max-w-[1700px]"
              : "w-full max-w-[1400px]"
          )}
        >
          <div
            className={cn(
              "space-y-4 md:space-y-8",
              showAllFilters && "md:ml-[290px] 2xl:ml-[480px] mr-2"
            )}
          >
            <BackLink backLink="/" />
            {type !== "search" && (
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center space-x-2">
                  <span className="*:h-8 md:*:h-10 text-primary-500">
                    {icon}
                  </span>
                  <h1 className="text-base md:text-h5 3xl:text-h4 !font-bold">
                    {title}
                  </h1>
                </div>
                <div className="hidden md:block space-x-2">
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

            <div className="max-w-md">
              <input
                type="text"
                name="vehicleSearch"
                placeholder="Search vehicles..."
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full px-4 py-2 border border-grey-300 rounded-lg focus:outline-none focus:border-primary-500"
              />
            </div>

            <div className="flex items-center justify-between gap-3">
              <h5 className="text-sm md:text-h5 3xl:text-h5">
                {totalCount}+ vehicles available
              </h5>
              <button
                onClick={() => setShowAllFilters(true)}
                className="md:hidden bg-white border border-grey-300 rounded-lg p-2 flex items-center gap-2 text-grey-500"
              >
                {Icons.ic_filter}
              </button>
            </div>
          </div>

          {showAllFilters ? (
            <AllFilters
              filters={filters}
              handleFilterChange={handleFilterChange}
              setShowAllFilters={setShowAllFilters}
              clearAllFilters={() => {
                setFilters({
                  minPrice: 0,
                  maxPrice: 10000000,
                  type: [],
                  make: [],
                  yearOfRelease: [],
                  numberOfSeats: [],
                  features: [],
                });
              }}
              clearIndividualFilter={(filterName: string, value: string) => {
                setFilters((prev) => {
                  const newFilters = { ...prev };
                  if (Array.isArray(newFilters[filterName])) {
                    newFilters[filterName] = (newFilters[filterName] as string[]).filter(item => item !== value);
                  }
                  return newFilters;
                });
              }}
            />
          ) : (
            <MainFilters
              filters={filters}
              handleFilterChange={handleFilterChange}
              setShowAllFilters={setShowAllFilters}
              clearAllFilters={() => {
                setFilters({
                  minPrice: 0,
                  maxPrice: 10000000,
                  type: [],
                  make: [],
                  yearOfRelease: [],
                  numberOfSeats: [],
                  features: [],
                });
              }}
              clearIndividualFilter={(filterName: string, value: string) => {
                setFilters((prev) => {
                  const newFilters = { ...prev };
                  if (Array.isArray(newFilters[filterName])) {
                    newFilters[filterName] = (newFilters[filterName] as string[]).filter(item => item !== value);
                  }
                  return newFilters;
                });
              }}
            />
          )}
          <div
            className={cn(
              "space-y-8",
              showAllFilters && "md:ml-[290px] 2xl:ml-[480px] mr-2"
            )}
          >
            {isLoading ? (
              <FullPageSpinner />
            ) : isError ? (
              <p>Something went wrong</p>
            ) : listings.length > 0 ? (
              <>
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
                      vehicleId={vehicle?.id ?? ""}
                      fromDate={fromDateValue?.toISOString()}
                      untilDate={untilDateValue?.toISOString()}
                      fromTime={fromTimeValue?.toISOString()}
                      untilTime={untilTimeValue?.toISOString()}
                      showAllFilters={showAllFilters}
                      isDisplayList={isDisplayList}
                      name={vehicle?.listingName || "Premium Vehicle"}
                      type={vehicle?.vehicleType || "Luxury"}
                      location={vehicle.location || "City"}
                      dailyPrice={vehicle?.pricing?.dailyRate?.value || 0}
                      currency={vehicle?.pricing?.dailyRate?.currency || "NGN"}
                      extraHoursFee={vehicle?.pricing?.extraHoursFee}
                      vehicleImages={getVehicleImages(vehicle)}
                      vehicleDetails={
                        [
                          {
                            driverAvailable: vehicle?.tripSettings?.provideDriver
                              ? "Yes"
                              : "No",
                            icon: Icons.ic_driver,
                          },
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

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8">
                    <Pagination
                      currentPage={currentPage}
                      totalCount={totalCount}
                      pageLimit={pageLimit}
                      onPageChange={setCurrentPage}
                      siblingCount={1}
                    />
                  </div>
                )}
              </>
            ) : (
              <EmptyState
                title="No Listings Found"
                image="/icons/empty_booking_state.png"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
