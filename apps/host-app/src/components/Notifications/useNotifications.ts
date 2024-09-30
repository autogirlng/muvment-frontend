"use client";

import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { api } from "@/lib/api";
import { ErrorResponse, Notification } from "@/utils/types";
import { handleErrors } from "@/utils/functions";

export default function useNotifications({ pageLimit }: { pageLimit: number }) {
  const { user } = useAppSelector((state) => state.user);

  const [totalItemsCount, setTotalItemsCount] = useState<number>(20);
  const [totalUnread, setTotalUnread] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const { data, isError, error, isLoading, isSuccess } = useQuery({
    queryKey: ["getNotifications", user?.id],

    queryFn: () => api.get(`/api/notifications?page=1&limit=10`),
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (isSuccess) {
      console.log("notifications fetched successfully", data.data);
      setNotifications(data?.data?.data);
      setTotalItemsCount(data?.data?.totalCount);
      setTotalUnread(data?.data?.unreadCount);
    }

    if (isError) {
      handleErrors(
        "Error fetching notifications",
        error as AxiosError<ErrorResponse>
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess]);

  return {
    notifications,
    isError,
    error,
    isLoading,

    currentPage,
    setCurrentPage,
    pageLimit,
    totalItemsCount,
    totalUnread,
  };
}
