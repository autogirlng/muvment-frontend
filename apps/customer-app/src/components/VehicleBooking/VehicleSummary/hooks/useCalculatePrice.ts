import { useMutation } from "@tanstack/react-query";
import { useState, useCallback } from "react";

type CalculatePricePayload = {
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
        `${process.env.NEXT_PUBLIC_API_URL}api/bookings/calculate-price`,
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
        vehicleId,
      };

      calculatePriceMutation.mutate(payload);
    },
    [vehicleId, calculatePriceMutation]
  );

  return {
    priceData,
    calculatePrice,
    isLoading: calculatePriceMutation.isPending,
    error: calculatePriceMutation.error,
    isError: calculatePriceMutation.isError,
  };
};

export default useCalculatePrice;