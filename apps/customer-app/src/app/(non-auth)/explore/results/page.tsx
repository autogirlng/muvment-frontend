"use client";

import cn from "classnames";
import { Suspense, useState, useCallback, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { FullPageSpinner } from "@repo/ui/spinner";
import Icons from "@repo/ui/icons";
import ExploreVehicleCard from "@/components/Explore/VehicleCard";
import EmptyState from "@/components/EmptyState";
import MainFilters from "@/components/Explore/MainFilters";
import AllFilters from "@/components/Explore/AllFilters";
import DesktopNav from "@/components/Navbar/DesktopNav";
import MobileNav from "@/components/Navbar/MobileNav";
import BackLink from "@/components/BackLink";
import NavBookingSearchBar from "@/components/searchbar-component/NavBookingSearchBar";
import { useAppSelector } from "@/lib/hooks";

interface VehicleImage {
  frontView: string;
  backView: string;
  sideView1: string;
  sideView2: string;
  interior: string;
  other: string;
}
interface Pricing {
  dailyRate: {
    value: number;
    currency: string | null;
  };
  extraHoursFee: number;
}
interface TripSettings {
  provideDriver: boolean;
  fuelProvided: boolean;
}
export interface Vehicle {
  id: string;
  listingName: string;
  location: string;
  vehicleType: string;
  numberOfSeats: number;
  VehicleImage: VehicleImage;
  pricing: Pricing;
  tripSettings: TripSettings;
}
interface ApiResponse {
  data: Vehicle[];
  page: number;
  limit: number;
  totalPages: number;
  totalCount: number;
}

const fetchRides = async (
  params: Record<string, string | null | string[] | number>
): Promise<ApiResponse> => {
  const BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://dev-muvment.up.railway.app";
  const endpoint = `${BASE_URL}/api/customer/find-ride`;
  const queryParams = new URLSearchParams();

  // Loop through all provided parameters
  Object.entries(params).forEach(([key, value]) => {
    // Skip any parameters that are null or undefined
    if (value === null || value === undefined) {
      return;
    }

    // If the value is an array, append each item separately.
    // This is the correct way to handle multi-select filters.
    if (Array.isArray(value)) {
      value.forEach((v) => queryParams.append(key, v));
    } else {
      // Otherwise, just append the single value.
      queryParams.append(key, String(value));
    }
  });

  const response = await fetch(`${endpoint}?${queryParams.toString()}`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const placeholderImages = [
  "/images/vehicles/1.png",
  "/images/vehicles/2.png",
  "/images/vehicles/3.png",
];

export default function ExplorePage() {
  return (
    <Suspense fallback={<FullPageSpinner />}>
      <ExplorePageLayout />
    </Suspense>
  );
}

function ExplorePageLayout() {
  const { user } = useAppSelector((state) => state.user);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isDisplayList, setIsDisplayList] = useState<boolean>(true);
  const [showAllFilters, setShowAllFilters] = useState<boolean>(false);

  type FilterState = {
    minPrice: number;
    maxPrice: number;
    type: string[];
    make: string[];
    yearOfRelease: string[];
    numberOfSeats: string[];
    features: string[];
    [key: string]: any; // Add this index signature
  };

  const initializeFiltersFromUrl = useCallback(() => {
    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");

    const minPrice = minPriceParam ? parseInt(minPriceParam) : 0;
    const maxPrice = maxPriceParam ? parseInt(maxPriceParam) : 10000000;

    const type = searchParams.getAll("type");
    const make = searchParams.getAll("make");
    const yearOfRelease = searchParams.getAll("yearOfRelease");
    const numberOfSeats = searchParams.getAll("numberOfSeats");
    const features = searchParams.getAll("features");

    return {
      minPrice: isNaN(minPrice) ? 0 : minPrice,
      maxPrice: isNaN(maxPrice) ? 10000000 : maxPrice,
      type,
      make,
      yearOfRelease,
      numberOfSeats,
      features,
    };
  }, [searchParams]);

  const [filters, setFilters] = useState<FilterState>(initializeFiltersFromUrl);

  useEffect(() => {
    setFilters(initializeFiltersFromUrl());
  }, [searchParams, initializeFiltersFromUrl]);

  const fromDate = searchParams.get("fromDate");
  const untilDate = searchParams.get("untilDate");
  const bookingType = searchParams.get("bookingType");
  const type = searchParams.get("type");
  const search = searchParams.get("location");
  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");

  const queryKeyParams = {
    ...filters,
    fromDate,
    untilDate,
    bookingType,
    type,
    search,
    latitude,
    longitude,
  };

  const {
    data: apiResponse,
    isLoading,
    isError,
  } = useQuery<ApiResponse>({
    queryKey: [
      "rides",
      {
        ...queryKeyParams,
        minPrice: String(queryKeyParams.minPrice),
        maxPrice: String(queryKeyParams.maxPrice),
      },
    ],
    queryFn: () =>
      fetchRides({
        ...queryKeyParams,
        minPrice: String(queryKeyParams.minPrice),
        maxPrice: String(queryKeyParams.maxPrice),
      }),
    staleTime: 500,
  });

  const listings = apiResponse?.data ?? [];
  const totalCount = apiResponse?.totalCount ?? 0;

  const clearAllFilters = useCallback(() => {
    const currentParams = new URLSearchParams(searchParams.toString());

    // Clear all filter params from URL
    currentParams.delete("minPrice");
    currentParams.delete("maxPrice");
    currentParams.delete("type");
    currentParams.delete("make");
    currentParams.delete("yearOfRelease");
    currentParams.delete("numberOfSeats");
    currentParams.delete("features");

    setFilters({
      minPrice: 0,
      maxPrice: 10000000,
      type: [],
      make: [],
      yearOfRelease: [],
      numberOfSeats: [],
      features: [],
    });

    // Update URL
    router.push(`${pathname}?${currentParams.toString()}`);
  }, [searchParams, pathname, router]);

  const clearIndividualFilter = useCallback(
    (filterName: string, value: string) => {
      const currentParams = new URLSearchParams(searchParams.toString());
      const newFilters: FilterState = { ...filters };

      // Remove the specific value from the filter
      if (Array.isArray(newFilters[filterName])) {
        newFilters[filterName] = (newFilters[filterName] as string[]).filter(
          (item) => item !== value
        );
      }

      // Update URL params
      const allValues = currentParams.getAll(filterName);
      const newValues = allValues.filter((v) => v !== value);
      currentParams.delete(filterName);
      newValues.forEach((v) => currentParams.append(filterName, v));

      setFilters(newFilters);
      router.push(`${pathname}?${currentParams.toString()}`);
    },
    [filters, searchParams, pathname, router]
  );

  const handleFilterChange = useCallback(
    (filterName: string, value: string | number[] | number) => {
      const currentParams = new URLSearchParams(searchParams.toString());
      const newFilters: FilterState = { ...filters };

      if (filterName === "minPrice" || filterName === "maxPrice") {
        const numericValue =
          typeof value === "number" ? value : parseInt(String(value));
        const validValue = isNaN(numericValue)
          ? filterName === "minPrice"
            ? 0
            : 10000000
          : numericValue;
        newFilters[filterName] = validValue;
        currentParams.set(filterName, String(validValue));
      } else {
        const allValues = currentParams.getAll(filterName);
        if (allValues.includes(value as string)) {
          const newValues = allValues.filter((v) => v !== value);
          currentParams.delete(filterName);
          newValues.forEach((v) => currentParams.append(filterName, v));
          newFilters[filterName] = newValues;
        } else {
          currentParams.append(filterName, value as string);
          newFilters[filterName] = [
            ...(newFilters[filterName] || []),
            value as string,
          ];
        }
      }

      setFilters(newFilters);
      router.push(`${pathname}?${currentParams.toString()}`);
    },
    [filters, searchParams, pathname, router]
  );

  const getVehicleImages = (vehicle: Vehicle) => {
    if (!vehicle.VehicleImage) return placeholderImages;
    const { frontView, backView, sideView1, sideView2, interior, other } =
      vehicle.VehicleImage;
    const images = [
      frontView,
      backView,
      sideView1,
      sideView2,
      interior,
      other,
    ].filter(Boolean);
    return images.length > 0 ? images : placeholderImages;
  };

  return (
    <div>
      <DesktopNav user={user} explorePage>
        <NavBookingSearchBar />
      </DesktopNav>
      <MobileNav user={user} />

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
            <div className="flex items-center justify-between gap-3">
              <h1 className="text-base md:text-h5 3xl:text-h4 !font-bold">
                Explore Vehicles
              </h1>
            </div>
            <div className="flex items-center justify-between gap-3">
              <h5 className="text-sm md:text-h5 3xl:text-h5">
                {isLoading
                  ? "Searching..."
                  : `${totalCount}+ vehicles available`}
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
              clearAllFilters={clearAllFilters}
              clearIndividualFilter={clearIndividualFilter}
            />
          ) : (
            <MainFilters
              filters={filters}
              handleFilterChange={handleFilterChange}
              setShowAllFilters={setShowAllFilters}
              clearAllFilters={clearAllFilters}
              clearIndividualFilter={clearIndividualFilter}
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
              <EmptyState
                title="Something went wrong"
                image="/icons/empty_booking_state.png"
              />
            ) : listings.length > 0 ? (
              <div
                className={cn(
                  isDisplayList
                    ? "flex flex-col gap-8"
                    : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
                )}
              >
                {listings.map((vehicle: Vehicle) => (
                  <ExploreVehicleCard
                    key={vehicle.id}
                    vehicleId={vehicle.id}
                    fromDate={fromDate ?? undefined}
                    untilDate={untilDate ?? undefined}
                    showAllFilters={showAllFilters}
                    isDisplayList={isDisplayList}
                    name={vehicle.listingName}
                    type={vehicle.vehicleType}
                    location={vehicle.location}
                    dailyPrice={vehicle.pricing.dailyRate.value}
                    currency={vehicle.pricing.dailyRate.currency ?? "NGN"}
                    extraHoursFee={vehicle.pricing.extraHoursFee}
                    vehicleImages={getVehicleImages(vehicle)}
                    vehicleDetails={[
                      {
                        driverAvailable: vehicle.tripSettings.provideDriver
                          ? "Yes"
                          : "No",
                        icon: Icons.ic_driver ?? <></>,
                      },
                      {
                        fuelAvailable: vehicle.tripSettings.fuelProvided
                          ? "Yes"
                          : "No",
                        icon: Icons.ic_fuel ?? <></>,
                      },
                      {
                        seats: vehicle.numberOfSeats.toString(),
                        icon: Icons.ic_seat ?? <></>,
                      },
                    ]}
                  />
                ))}
              </div>
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
