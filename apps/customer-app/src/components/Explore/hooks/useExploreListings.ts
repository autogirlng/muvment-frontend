"use client";

import { useQuery } from "@tanstack/react-query";
import { VehicleInformation } from "@/utils/types";
import { useHttp } from "@/hooks/useHttp";

type ExploreDataType = {
  data: VehicleInformation[];
  totalCount: number;
  totalPages: number;
  page: number;
  limit: number;
};

type FilterState = {
  minPrice: number;
  maxPrice: number;
  type: string[];
  make: string[];
  yearOfRelease: string[];
  numberOfSeats: string[];
  features: string[];
};

export default function useExploreListings({
  currentPage = 1,
  pageLimit = 10,
  filters = {
    minPrice: 0,
    maxPrice: 10000000,
    type: [],
    make: [],
    yearOfRelease: [],
    numberOfSeats: [],
    features: [],
  },
  type = "all",
  search = "",
  fromDate = "",
  untilDate = "",
  location = "",
}: {
  currentPage: number;
  pageLimit: number;
  filters?: FilterState;
  type: "top-rated" | "all" | "search" | "category";
  search?: string;
  fromDate?: string;
  untilDate?: string;
  location?: string;
}) {
  const http = useHttp();

  const buildUrl = () => {
    const baseParams = `page=${currentPage}&limit=${pageLimit}`;

    switch (type) {
      case "all":
        const allFilters = handleFilterQuery({
          filters,
          search,
          fromDate,
          untilDate,
          location,
        });
        return `/api/listings?${baseParams}&${allFilters}`;

      case "search":
        const searchFilters = handleFilterQuery({
          filters,
          search,
          fromDate,
          untilDate,
          location,
        });
        console.log("Search query:", searchFilters);
        return `/api/listings?${baseParams}&${searchFilters}`;

      case "category":
        // Category now uses the same endpoint as all, but with type filter
        const categoryFilters = handleFilterQuery({
          filters,
          search,
          fromDate,
          untilDate,
          location,
        });
        return `/api/listings?${baseParams}&${categoryFilters}`;

      case "top-rated":
        const topRatedFilters = handleFilterQuery({
          filters,
          search,
          fromDate,
          untilDate,
          location,
        });
        return `/api/listings/top-rated?${baseParams}&${topRatedFilters}`;

      default:
        const defaultFilters = handleFilterQuery({
          filters,
          search,
          fromDate,
          untilDate,
          location,
        });
        return `/api/listings?${baseParams}&${defaultFilters}`;
    }
  };

  const { data, isError, error, isLoading, isSuccess } = useQuery({
    queryKey: [
      "getListings",
      currentPage,
      pageLimit,
      JSON.stringify(filters),
      search,
      fromDate,
      untilDate,
      location,
      type,
    ],

    queryFn: async () => http.get<ExploreDataType>(buildUrl()),

    retry: false,
  });

  return {
    listings: data?.data || [],
    totalCount: data?.totalCount || 0,
    totalPages: data?.totalPages || 0,
    page: data?.page || 0,
    limit: data?.limit || 0,
    isError,
    error,
    isLoading,
    isSuccess,
  };
}

// Enhanced filter query handler to support all required parameters
export const handleFilterQuery = ({
  filters = {
    minPrice: 0,
    maxPrice: 10000000,
    type: [],
    make: [],
    yearOfRelease: [],
    numberOfSeats: [],
    features: [],
  },
  month,
  year,
  search,
  startDate,
  endDate,
  fromDate,
  untilDate,
  location,
}: {
  filters?: FilterState;
  month?: number;
  year?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
  fromDate?: string;
  untilDate?: string;
  fromTime?: string;
  untilTime?: string;
  location?: string;
}) => {
  const filterQuery = new URLSearchParams();

  // Helper function to format dates (removes time portion if not needed)
  const formatDate = (dateString: string) => {
    if (!dateString) return dateString;
    return dateString;
  };

  // Handle minPrice and maxPrice
  if (filters.minPrice !== undefined) {
    filterQuery.append("minPrice", filters.minPrice.toString());
  }
  if (filters.maxPrice !== undefined) {
    filterQuery.append("maxPrice", filters.maxPrice.toString());
  }

  // Handle type array
  if (filters.type && filters.type.length > 0) {
    filters.type.forEach((value) => {
      filterQuery.append("type", value.toString());
    });
  }

  // Handle make array
  if (filters.make && filters.make.length > 0) {
    filters.make.forEach((value) => {
      filterQuery.append("make", value.toString());
    });
  }

  // Handle yearOfRelease array
  if (filters.yearOfRelease && filters.yearOfRelease.length > 0) {
    filters.yearOfRelease.forEach((value) => {
      filterQuery.append("yearOfRelease", value.toString());
    });
  }

  // Handle numberOfSeats array
  if (filters.numberOfSeats && filters.numberOfSeats.length > 0) {
    filters.numberOfSeats.forEach((value) => {
      filterQuery.append("numberOfSeats", value.toString());
    });
  }

  // Handle features array
  if (filters.features && filters.features.length > 0) {
    filters.features.forEach((value) => {
      filterQuery.append("features", value.toString());
    });
  }

  // Handle individual parameters
  if (month) filterQuery.append("month", month.toString());
  if (year) filterQuery.append("year", year.toString());
  if (search) filterQuery.append("search", search.toString());
  if (startDate) filterQuery.append("startDate", formatDate(startDate));
  if (endDate) filterQuery.append("endDate", formatDate(endDate));
  if (fromDate) filterQuery.append("fromDate", formatDate(fromDate));
  if (untilDate) filterQuery.append("untilDate", formatDate(untilDate));
  if (location) filterQuery.append("location", location.toString());

  // Get the query string and manually decode date parameters if needed
  let queryString = filterQuery.toString();

  // If you want to decode the date parameters specifically:
  queryString = queryString
    .replace(/fromDate=([^&]*)/g, (match, dateValue) => {
      return `fromDate=${decodeURIComponent(dateValue)}`;
    })
    .replace(/untilDate=([^&]*)/g, (match, dateValue) => {
      return `untilDate=${decodeURIComponent(dateValue)}`;
    });

  return queryString;
};
