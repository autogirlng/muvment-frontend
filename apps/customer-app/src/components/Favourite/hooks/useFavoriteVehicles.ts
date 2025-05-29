"use client";

import { useQuery } from "@tanstack/react-query";
import { useHttp } from "@/hooks/useHttp";

// Types based on your API response
type VehicleImage = {
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
};

type Vehicle = {
  pricing: {
    dailyRate: {
      value: number;
      unit: string;
    };
    extraHoursFee: number;
    airportPickupFee: number | null;
    hourlyRate: number | null;
    discounts: Array<{
      durationInDays: number;
      percentage: number;
    }>;
  };
  tripSettings: {
    advanceNotice: string;
    maxTripDuration: string;
    provideDriver: boolean;
    fuelProvided: boolean;
  };
  id: string;
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
  status: string;
  vehicleStatus: string;
  userId: string;
  isActive: boolean;
  isReserved: boolean;
  reservationExpiresAt: string | null;
  unavailableFrom: string | null;
  unavailableUntil: string | null;
  features: string[];
  outskirtsLocation: string[];
  outskirtsPrice: number;
  createdAt: string;
  updatedAt: string;
  VehicleImage: VehicleImage;
};

type FavoriteVehicle = {
  id: string;
  userId: string;
  vehicleId: string;
  createdAt: string;
  updatedAt: string;
  vehicle: Vehicle;
};

type FavoriteVehiclesResponse = {
  data: FavoriteVehicle[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export default function useFavoriteVehicles({
  currentPage = 1,
  pageLimit = 10,
}: {
  currentPage?: number;
  pageLimit?: number;
} = {}) {
  const http = useHttp();

  const { data, isError, error, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["getFavoriteVehicles", currentPage, pageLimit],

    queryFn: async () =>
      http.get<FavoriteVehiclesResponse>(
        `/api/favorites?page=${currentPage}&limit=${pageLimit}`
      ),

    retry: false,
  });

  return {
    favoriteVehicles: data?.data || [],
    meta: data?.meta || { total: 0, page: 1, limit: 10, totalPages: 0 },
    totalCount: data?.meta?.total || 0,
    isError,
    error,
    isLoading,
    isSuccess,
    refetch,
  };
}
