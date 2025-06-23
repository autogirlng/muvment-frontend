"use client";

import { useQuery } from "@tanstack/react-query";
import { VehicleInformation } from "@/utils/types";
import { useHttp } from "@/hooks/useHttp";

type ExploreDataType = {
  data: VehicleInformation[];
  totalCount: number;
};

export default function useExploreListings({
  currentPage = 1,
  pageLimit = 10,
  filters = {},
  type = "all",
  search = "",
  fromDate = "",
  untilDate = "",
  location = "",
  categoryType = "",
}: {
  currentPage: number;
  pageLimit: number;
  filters?: Record<string, string[] | number[]>;
  type: "top-rated" | "all" | "search" | "category";
  search?: string;
  fromDate?: string;
  untilDate?: string;
  location?: string;
  categoryType?: string;
}) {
  const http = useHttp();

  const buildUrl = () => {
    const baseParams = `limit=${pageLimit}`;

    switch (type) {
      case "all":
        return `/api/listings?${baseParams}`;

      case "search":
        const searchFilters = handleFilterQuery({
          filters,
          search,
          fromDate,
          untilDate,
        });
        console.log("Search query:", searchFilters);
        return `/api/listings?${baseParams}&${searchFilters}`;

      case "category":
        // Category uses a different endpoint structure
        const categoryParams = `vehicleType=${encodeURIComponent(categoryType || "")}&page=${currentPage}&limit=${pageLimit}`;
        return `/api/customer/vehicles/type?${categoryParams}`;

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
        return `/api/listings?${baseParams}`;
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
      categoryType,
      type,
    ],

    queryFn: async () => http.get<ExploreDataType>(buildUrl()),

    retry: false,
  });

  return {
    listings: data?.data || [],
    totalCount: data?.totalCount || 0,
    isError,
    error,
    isLoading,
    isSuccess,
  };
}

// Alternative approach: Format dates before encoding or use URLSearchParams selectively
export const handleFilterQuery = ({
  filters = {},
  month,
  year,
  search,
  startDate,
  endDate,
  fromDate,
  untilDate,
  location,
}: {
  filters?: Record<string, string[] | number[]>;
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

    // If you want just the date part (YYYY-MM-DD)
    // return dateString.split('T')[0];

    // If you want to keep the full ISO string but avoid encoding issues,
    // you can return it as-is and handle encoding manually later
    return dateString;
  };

  // Handle filters object
  Object.entries(filters).forEach(([key, values]) => {
    if (key === "price") {
      filterQuery.append("minPrice", values[0].toString());
      filterQuery.append("maxPrice", values[1].toString());
    } else if (key === "vehicle") {
      values.forEach((value) => {
        filterQuery.append("vehicleId", value.toString());
      });
    } else if (key === "yearOfRelease") {
      values.forEach((value) => {
        filterQuery.append("yearOfRelease", value.toString());
      });
    } else if (key === "type") {
      values.forEach((value) => {
        filterQuery.append("type", value.toString());
      });
    } else if (key === "make") {
      values.forEach((value) => {
        filterQuery.append("make", value.toString());
      });
    } else if (key === "status") {
      values.forEach((value) => {
        filterQuery.append("status", value.toString());
      });
    } else if (key === "features") {
      values.forEach((value) => {
        filterQuery.append("features", value.toString());
      });
    } else if (key === "numberOfSeats") {
      values.forEach((value) => {
        filterQuery.append("numberOfSeats", value.toString());
      });
    } else {
      // Handle other filter keys
      values.forEach((value) => {
        filterQuery.append(key, value.toString());
      });
    }
  });

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
