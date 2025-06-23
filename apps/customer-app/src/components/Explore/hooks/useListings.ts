import { useState, useEffect } from "react";

interface PricingDiscount {
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
  discounts: PricingDiscount[];
}

interface TripSettings {
  advanceNotice: string;
  maxTripDuration: string;
  provideDriver: boolean;
  fuelProvided: boolean;
}

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

interface ReportVehicle {
  id: string;
  reason: string;
  description: string;
  vehicleId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface UserStatistics {
  totalEarnings: number;
  totalOnboardedVehicles: number;
  totalCompletedRides: number;
  walletBalance: number;
  averageRating: number;
  topRatedVehicle: {
    make: string;
    model: string;
    color: string;
    totalRides: number;
    totalEarnings: number;
  };
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  country: string;
  countryCode: string;
  userRole: string;
  isActive: boolean;
  phoneVerified: boolean;
  bvnVerified: boolean;
  withdrawalAccountVerified: boolean;
  city: string | null;
  cities: string[];
  isBusiness: boolean;
  businessName: string | null;
  businessAddress: string | null;
  businessPhoneNumber: string | null;
  businessEmail: string | null;
  referralCode: string;
  referralBalance: number;
  createdAt: string;
  updatedAt: string;
  statistics: UserStatistics;
}

interface Vehicle {
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
  vehicleCurrency: string;
  isActive: boolean;
  areYouVehicleOwner: boolean;
  isReserved: boolean;
  reservationExpiresAt: string;
  unavailableFrom: string | null;
  unavailableUntil: string | null;
  features: string[];
  outskirtsLocation: string[];
  outskirtsPrice: number | null;
  createdAt: string;
  updatedAt: string;
  pricing: Pricing;
  tripSettings: TripSettings;
  VehicleImage: VehicleImage;
  ReportVehicle: ReportVehicle[];
  user: User;
}

interface ListingsResponse {
  data: Vehicle[];
  page: number;
  limit: number;
  totalPages: number;
  totalCount: number;
}

interface UseListingsOptions {
  page?: number;
  limit?: number;
  baseUrl?: string;
}

interface UseListingsReturn {
  listings: Vehicle[];
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  page: number;
  limit: number;
  totalPages: number;
  totalCount: number;
  refetch: () => Promise<void>;
}

const useListings = ({
  page = 1,
  limit = 5,
  baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
}: UseListingsOptions = {}): UseListingsReturn => {
  const [listings, setListings] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    limit: 5,
    totalPages: 1,
    totalCount: 0,
  });

  const fetchListings = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      setError(null);

      const url = `${baseUrl}/api/listings?page=${page}&limit=${limit}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ListingsResponse = await response.json();

      setListings(data.data || []);
      setPageInfo({
        page: data.page,
        limit: data.limit,
        totalPages: data.totalPages,
        totalCount: data.totalCount,
      });
    } catch (err) {
      setIsError(true);
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching listings"
      );
      setListings([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [page, limit, baseUrl]);

  return {
    listings,
    isLoading,
    isError,
    error,
    page: pageInfo.page,
    limit: pageInfo.limit,
    totalPages: pageInfo.totalPages,
    totalCount: pageInfo.totalCount,
    refetch: fetchListings,
  };
};

export default useListings;

export type {
  Vehicle,
  ListingsResponse,
  UseListingsOptions,
  UseListingsReturn,
};
