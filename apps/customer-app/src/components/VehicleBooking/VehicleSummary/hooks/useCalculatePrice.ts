import { useMutation } from "@tanstack/react-query";
import { useState, useCallback } from "react";

type CalculatePricePayload = {
  startDate: string;
  endDate: string;
  vehicleId: string;
};

type PriceBreakdown = {
  fullDays: number;
  remainingHours: number;
  dailyRate: number;
  extraHoursFee: number;
  hourlyRate: number;
  airportPickupFee: number;
  dailyPrice: number;
  overtimePrice: number;
  discountAmount: number;
  discountPercentage: number;
};

type CalculatePriceResponse = {
  totalPrice: number;
  breakdown: PriceBreakdown;
  currency: string;
  unit: string;
};

const useCalculatePrice = (vehicleId: string) => {
  const [priceData, setPriceData] = useState<CalculatePriceResponse | null>(
    null
  );

  const calculatePriceMutation = useMutation({
    mutationFn: async (
      payload: CalculatePricePayload
    ): Promise<CalculatePriceResponse> => {
      const token = localStorage.getItem("user_token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/calculate-price`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to calculate price");
      }

      return response.json();
    },
    onSuccess: (data) => {
      setPriceData(data);
    },
    onError: (error) => {
      console.error("Price calculation error:", error);
      setPriceData(null);
    },
  });

  const calculatePrice = useCallback(
    (startDate: Date | null, endDate: Date | null) => {
      if (!startDate || !endDate || !vehicleId) {
        setPriceData(null);
        return;
      }

      const payload: CalculatePricePayload = {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        vehicleId,
      };

      calculatePriceMutation.mutate(payload);
    },
    [vehicleId, calculatePriceMutation]
  );

  // Auto-calculate when dates change
  const autoCalculatePrice = useCallback(
    (
      startDate: Date | null,
      startTime: Date | null,
      endDate: Date | null,
      endTime: Date | null
    ) => {
      if (!startDate || !startTime || !endDate || !endTime || !vehicleId) {
        setPriceData(null);
        return;
      }

      // Combine date and time
      const combinedStartDate = new Date(startDate);
      combinedStartDate.setHours(
        startTime.getHours(),
        startTime.getMinutes(),
        0,
        0
      );

      const combinedEndDate = new Date(endDate);
      combinedEndDate.setHours(endTime.getHours(), endTime.getMinutes(), 0, 0);

      const payload: CalculatePricePayload = {
        startDate: combinedStartDate.toISOString(),
        endDate: combinedEndDate.toISOString(),
        vehicleId,
      };

      calculatePriceMutation.mutate(payload);
    },
    [vehicleId, calculatePriceMutation]
  );

  return {
    priceData,
    calculatePrice,
    autoCalculatePrice,
    isLoading: calculatePriceMutation.isPending,
    error: calculatePriceMutation.error,
    isError: calculatePriceMutation.isError,
  };
};

export default useCalculatePrice;
