"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAppSelector } from "@/lib/hooks";
import { DashboardStatistics, ErrorResponse } from "@/utils/types";
import { handleErrors } from "@/utils/functions";
import { AxiosError } from "axios";

export default function useDashboardStats() {
  const { user } = useAppSelector((state) => state.user);

  const [dashboardStats, setDashboardStats] =
    useState<DashboardStatistics | null>(null);

  const { data, isError, error, isLoading, isSuccess } = useQuery({
    queryKey: ["getDashboardStats", user?.id],
    queryFn: () => api.get("/api/statistics/hostAccount"),
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (isSuccess) {
      console.log("dashboard stats fetched successfully", data.data);
      setDashboardStats(data.data);
    }

    if (isError) {
      handleErrors(
        "Error fetching dashboard stats",
        error as AxiosError<ErrorResponse>
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess]);

  return {
    isError,
    error,
    isLoading,
    isSuccess,

    dashboardStats,
  };
}
