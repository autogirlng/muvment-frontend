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
import BookingSearchBar from "@/components/searchbar-component/SearchBar";
import NavBookingSearchBar from "@/components/searchbar-component/NavBookingSearchBar";
import { useAppSelector } from "@/lib/hooks";

// --- Updated Interfaces to match the new API response ---

interface VehicleImage {
  id: string;
  frontView: string;
  backView: string;
  sideView1: string;
  sideView2: string;
  interior: string;
  other: string;
  vehicleId: string;
  createdAt: string;
  updatedAt: string;
}

interface Discount {
  durationInDays: number;
  percentage: number;
}

interface DailyRate {
  value: number;
  currency: string | null;
  unit: string;
}

interface Pricing {
  dailyRate: DailyRate;
  extraHoursFee: number;
  airportPickupFee: number;
  hourlyRate: number | null;
  discounts: Discount[];
}

interface TripSettings {
  advanceNotice: string;
  maxTripDuration: string;
  provideDriver: boolean;
  fuelProvided: boolean;
}

export interface Vehicle {
  id: string;
  pricing: Pricing;
  tripSettings: TripSettings;
  listingName: string;
  location: string;
  address: string;
  vehicleType: string;
  make: string;
  model: string;
  yearOfRelease: string;
  hasTracker: boolean;
  hasInsurance: boolean;
  licensePlateNumber: string;
  vehicleColor: string;
  stateOfRegistration: string;
  vehicleDescription: string;
  numberOfSeats: number;
  longitude: number | null;
  latitude: number | null;
  status: string;
  vehicleStatus: string;
  rejectionReason: string | null;
  userId: string;
  vehicleCurrency: string;
  isActive: boolean;
  areYouVehicleOwner: boolean;
  vehicleIdentifier: string;
  isReserved: boolean;
  reservationExpiresAt: string;
  unavailableFrom: string | null;
  unavailableUntil: string | null;
  features: string[];
  outskirtsLocation: string[];
  outskirtsPrice: number | null;
  extremeAreasLocation: string[];
  extremeAreaPrice: number | null;
  isTopRate: boolean;
  createdAt: string;
  updatedAt: string;
  VehicleImage: VehicleImage;
}

interface ApiResponse {
  data: Vehicle[];
  page: number;
  limit: number;
  totalPages: number;
  totalCount: number;
}

// --- Updated fetchRides function ---

const fetchRides = async (
  // Note: Added 'number' to the type to properly handle values like minPrice/maxPrice
  params: Record<string, string | null | string[] | number>
): Promise<ApiResponse> => {
  const BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://dev-muvment.up.railway.app";
  // Always use the single, smart endpoint
  const endpoint = `${BASE_URL}/api/customer/find-ride`;
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    // Skip any parameters that are null, undefined, or empty arrays
    if (
      value === null ||
      value === undefined ||
      (Array.isArray(value) && value.length === 0)
    ) {
      return;
    }

    // If the value is an array, append each item separately
    if (Array.isArray(value)) {
      value.forEach((v) => queryParams.append(key, v));
    } else {
      // Otherwise, just append the single value
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

  const fromDate = searchParams.get("fromDate");
  const untilDate = searchParams.get("untilDate");
  const bookingType = searchParams.get("bookingType");
  const category = searchParams.get("category");
  const search = searchParams.get("location");
  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");
  const price = searchParams.getAll("price");
  const type = searchParams.getAll("type");
  const make = searchParams.getAll("make");
  const yearOfRelease = searchParams.getAll("yearOfRelease");
  const numberOfSeats = searchParams.getAll("numberOfSeats");
  const features = searchParams.getAll("features");

  const queryKeyParams = {
    fromDate,
    untilDate,
    bookingType,
    category,
    search,
    latitude,
    longitude,
    price,
    type,
    make,
    yearOfRelease,
    numberOfSeats,
    features,
  };

  const {
    data: apiResponse,
    isLoading,
    isError,
  } = useQuery<ApiResponse>({
    queryKey: ["rides", queryKeyParams],
    queryFn: () => fetchRides(queryKeyParams),
    staleTime: 500,
  });

  const listings = apiResponse?.data ?? [];
  const totalCount = apiResponse?.totalCount ?? 0;

  const [isDisplayList, setIsDisplayList] = useState<boolean>(true);
  const [showAllFilters, setShowAllFilters] = useState<boolean>(false);

  const filters = {
    minPrice: Number(price[0] ?? 0),
    maxPrice: Number(price[1] ?? 10000000),
    type,
    make,
    yearOfRelease,
    numberOfSeats,
    features,
  };

  useEffect(() => {}, [user]);

  const handleFilterChange = useCallback(
    (filterName: string, value: string | number | number[]) => {
      const currentParams = new URLSearchParams(
        Array.from(searchParams.entries())
      );

      if (Array.isArray(value)) {
        currentParams.delete(filterName);
        value.forEach((v) => currentParams.append(filterName, String(v)));
      } else {
        const allValues = currentParams.getAll(filterName);
        if (allValues.includes(String(value))) {
          const newValues = allValues.filter((v) => v !== String(value));
          currentParams.delete(filterName);
          newValues.forEach((v) => currentParams.append(filterName, v));
        } else {
          currentParams.append(filterName, String(value));
        }
      }
      router.push(`${pathname}?${currentParams.toString()}`);
    },
    [searchParams, pathname, router]
  );

  const clearAllFilters = useCallback(() => {
    const currentParams = new URLSearchParams();
    // Keep only essential params like dates and location
    if (fromDate) currentParams.set("fromDate", fromDate);
    if (untilDate) currentParams.set("untilDate", untilDate);
    if (bookingType) currentParams.set("bookingType", bookingType);
    if (category) currentParams.set("category", category);
    if (search) currentParams.set("location", search);
    if (latitude) currentParams.set("latitude", latitude);
    if (longitude) currentParams.set("longitude", longitude);
    router.push(`${pathname}?${currentParams.toString()}`);
  }, [
    fromDate,
    untilDate,
    bookingType,
    category,
    search,
    latitude,
    longitude,
    pathname,
    router,
  ]);

  const clearIndividualFilter = useCallback(
    (filterName: string, value: string) => {
      const currentParams = new URLSearchParams(
        Array.from(searchParams.entries())
      );
      const allValues = currentParams.getAll(filterName);
      const newValues = allValues.filter((v) => v !== value);
      currentParams.delete(filterName);
      newValues.forEach((v) => currentParams.append(filterName, v));
      router.push(`${pathname}?${currentParams.toString()}`);
    },
    [searchParams, pathname, router]
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
