"use client";

import { useQuery } from "@tanstack/react-query";
import { VehicleInformation } from "@/utils/types";
import { handleFilterQuery } from "@/utils/functions";
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
  fromTime = "",
  untilTime = "",
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
  fromTime?: string;
  untilTime?: string;
  location?: string;
  categoryType?: string;
}) {
  const http = useHttp();

  const buildUrl = () => {
    const baseParams = `page=${currentPage}&limit=${pageLimit}`;

    switch (type) {
      case "search":
        return `/api/listings?${baseParams}&${handleFilterQuery({
          filters,
          search,
          fromDate,
          untilDate,
          fromTime,
          untilTime,
        })}`;

      case "top-rated":
        return `/api/listings/top-rated?${baseParams}&${handleFilterQuery({
          filters,
        })}`;

      case "category":
        // For category type, add the vehicle type to the URL
        const categoryParams = categoryType
          ? `type=${encodeURIComponent(categoryType)}`
          : "";
        const filterQuery = handleFilterQuery({ filters, location });

        // Combine all query parameters properly
        const allParams = [baseParams, categoryParams]
          .filter(Boolean)
          .join("&");

        // console.log("Category URL:", `/api/listings?${allParams}`);

        return `/api/listings?${allParams}`;

      default: // "all"
        return `/api/listings?${baseParams}`;

      /* 
        return `/api/listings?${baseParams}&${handleFilterQuery({
          filters,
          location,
        })}`;
        */
    }
  };

  const { data, isError, error, isLoading, isSuccess } = useQuery({
    queryKey: [
      "getListings",
      currentPage,
      JSON.stringify(filters),
      search,
      fromDate,
      untilDate,
      fromTime,
      untilTime,
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
