"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/lib/hooks";
import { useHttp } from "@/hooks/useHttp";
import {
  EarningPeriod,
  ErrorResponse,
  Review,
  ReviewReply,
  User,
} from "@/utils/types";
import { useState } from "react";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { handleErrors, handleFilterQuery } from "@/utils/functions";
import React from "react";

export type DayEarning = {
  day: string;
  amount: number;
};

export type MonthEarning = {
  month: string;
  amount: number;
};

export type EarningsResponse = {
  earnings: DayEarning[] | MonthEarning[];
  totalEarnings: number;
  periodStart: string;
  periodEnd: string;
};

// useEarnings.ts
export default function useEarnings({
  period = EarningPeriod.WEEK,
  filters = {},
  startDate,
  endDate,
}: {
  period: EarningPeriod;
  filters?: Record<string, string[]>;
  startDate?: string;
  endDate?: string;
}) {
  const http = useHttp();
  const { user } = useAppSelector((state) => state.user);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["getEarnings", user?.id, period, filters, startDate, endDate],
    queryFn: () =>
      http.get(
        `/api/host/earnings/?
       ${handleFilterQuery({
         filters,
         startDate,
         endDate,
       })}`
      ),
    enabled: !!user?.id,
    retry: false,
  });

  // Format chart data based on period
  const chartData = React.useMemo(() => {
    if (!data)
      return {
        categories: [],
        amounts: [],
      };

    const earnings = data.earnings;

    if (period === EarningPeriod.MONTH) {
      return {
        categories: (earnings as MonthEarning[]).map((e) => e.month),
        amounts: (earnings as MonthEarning[]).map((e) => e.amount),
      };
    }

    return {
      categories: (earnings as DayEarning[]).map((e) => e.day),
      amounts: (earnings as DayEarning[]).map((e) => e.amount),
    };
  }, [data, period]);

  return {
    earnings: data?.earnings || [],
    totalEarnings: data?.totalEarnings || 0,
    periodStart: data?.periodStart,
    periodEnd: data?.periodEnd,
    chartData,
    isError,
    isLoading,
  };
}
