"use client";

import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/lib/hooks";
import { DashboardStatistics } from "@/utils/types";
import { useHttp } from "./useHttp";

export default function useDashboardStats() {
  const http = useHttp();
  const { user } = useAppSelector((state) => state.user);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["getDashboardStats", user?.id],
    queryFn: () => http.get<DashboardStatistics>("/api/statistics/hostAccount"),
    enabled: !!user?.id,
    retry: false,
  });

  return {
    isError,
    isLoading,

    dashboardStats: data,
  };
}
