"use client";

import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/lib/hooks";
import { Notification } from "@/utils/types";
import { useHttp } from "@/hooks/useHttp";

type NotificationDataType = {
  data: Notification[];
  totalCount: number;
  unreadCount: number;
};

export default function useNotifications({
  currentPage,
  pageLimit,
}: {
  currentPage: number;
  pageLimit: number;
}) {
  const http = useHttp();

  const { user } = useAppSelector((state) => state.user);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["getNotifications"],

    queryFn: () =>
      http.get<NotificationDataType>(
        `/api/notifications?page=${currentPage}&limit=${pageLimit}`
      ),
    enabled: !!user?.id,
  });

  return {
    notifications: data?.data ?? [],
    totalCount: data?.totalCount ?? 0,
    totalUnread: data?.unreadCount ?? 0,
    isError,
    isLoading,
  };
}
