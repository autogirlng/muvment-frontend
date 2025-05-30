// mockUseBookings.ts - Temporary hook for testing
// Replace your real useBookings import with this during testing

import { useState, useEffect } from "react";
import { mockBookingTestData } from "../testData";

export default function useMockUseBookings({
  currentPage = 1,
  pageLimit = 10,
  filters = {},
}: {
  currentPage: number;
  pageLimit: number;
  filters?: Record<string, string[]>;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Simulate API loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 second loading simulation

    return () => clearTimeout(timer);
  }, [currentPage, filters]);

  // Filter bookings based on provided filters
  const filterBookings = (
    bookings: any[],
    filters: Record<string, string[]>
  ) => {
    if (!filters || Object.keys(filters).length === 0) return bookings;

    return bookings.filter((booking) => {
      return Object.entries(filters).every(([filterKey, filterValues]) => {
        if (filterValues.length === 0) return true;

        switch (filterKey) {
          case "bookingType":
            return filterValues.includes(booking.bookingType);
          case "bookingStatus":
            return filterValues.includes(booking.bookingStatus);
          case "paymentStatus":
            return filterValues.includes(booking.paymentStatus);
          case "vehicleType":
            return filterValues.includes(booking.vehicle?.vehicleType);
          default:
            return true;
        }
      });
    });
  };

  const filteredBookings = filterBookings(mockBookingTestData.data, filters);

  // Simulate pagination
  const startIndex = (currentPage - 1) * pageLimit;
  const endIndex =
    pageLimit === 1000 ? filteredBookings.length : startIndex + pageLimit;
  const paginatedBookings = filteredBookings.slice(startIndex, endIndex);

  return {
    bookings: paginatedBookings,
    totalCount: filteredBookings.length,
    isError,
    isLoading,
    isSuccess: !isLoading && !isError,
  };
}

// Alternative: Quick test function to replace your API call
export const getTestBookings = async () => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    data: mockBookingTestData.data,
    totalCount: mockBookingTestData.totalCount,
    page: mockBookingTestData.page,
    limit: mockBookingTestData.limit,
    totalPages: mockBookingTestData.totalPages,
  };
};
