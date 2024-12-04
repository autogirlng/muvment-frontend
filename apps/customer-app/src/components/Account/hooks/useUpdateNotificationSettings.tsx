"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { ErrorResponse } from "@/utils/types";
import { handleErrors } from "@/utils/functions";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useHttp } from "@/hooks/useHttp";

interface NotificationSettings {
  [key: string]: boolean;
}

export default function useUpdateNotificationSettings() {
  const http = useHttp();
  const { user } = useAppSelector((state) => state.user);
  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings>({
      emailNotifications: true,
      smsNotifications: true,
    });

  const { data, isError, error, isLoading, isSuccess } = useQuery({
    queryKey: ["getNotificationSettings"],
    queryFn: () => http.get<NotificationSettings>(`/api/settings/user`),
    enabled: !!user?.id,
    retry: false,
  });

  useEffect(() => {
    if (isSuccess) {
      console.log("notification settings fetched successfully", data);
      const { id, userId, updatedAt, createdAt, ...settings } = data;
      setNotificationSettings(settings);
    }

    if (isError) {
      handleErrors(
        error as AxiosError<ErrorResponse>,
        "Error fetching notification settings"
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess]);

  const updateNotificationSettings = useMutation({
    mutationFn: (values: NotificationSettings) => {
      return http.put<NotificationSettings>("/api/settings", values);
    },

    onSuccess: (data) => {
      console.log("Notification settings updated Successfully", data);
      const { id, userId, updatedAt, createdAt, ...settings } = data;
      setNotificationSettings(settings);
      toast.success("Notification settings updated successfully ");
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      handleErrors(error, "update Notification settings");
    },
  });

  return {
    notificationSettings,
    setNotificationSettings,
    isError,
    error,
    isLoading,

    updateNotificationSettings,
  };
}
