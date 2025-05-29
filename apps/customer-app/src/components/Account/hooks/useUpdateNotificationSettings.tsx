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
  emailNotifications: boolean;
  smsNotifications: boolean;
}

interface NotificationSettingsResponse extends NotificationSettings {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface MutationPayload extends NotificationSettings {
  type: "emailNotifications" | "smsNotifications";
}

interface LoadingStates {
  emailNotifications: boolean;
  smsNotifications: boolean;
}

export default function useUpdateNotificationSettings() {
  const http = useHttp();
  const { user } = useAppSelector((state) => state.user);
  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings>({
      emailNotifications: false,
      smsNotifications: false,
    });

  const [loadingStates, setLoadingStates] = useState<LoadingStates>({
    emailNotifications: false,
    smsNotifications: false,
  });

  // Fetch user settings
  const { data, isError, error, isLoading, isSuccess } = useQuery({
    queryKey: ["getNotificationSettings"],
    queryFn: () => http.get<NotificationSettingsResponse>(`/api/settings/user`),
    enabled: !!user?.id,
    retry: false,
  });

  useEffect(() => {
    if (isSuccess && data) {
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
  }, [isError, isSuccess, data]);

  const updateNotificationSettings = useMutation({
    mutationFn: (values: MutationPayload) => {
      const { type, ...payload } = values;
      return http.put<NotificationSettingsResponse>("/api/settings", payload);
    },

    onMutate: (variables) => {
      // Set loading state for specific notification type
      setLoadingStates((prev) => ({
        ...prev,
        [variables.type]: true,
      }));
    },

    onSuccess: (data, variables) => {
      console.log("Notification settings updated Successfully", data);
      const { id, userId, updatedAt, createdAt, ...settings } = data;
      setNotificationSettings(settings);

      // Clear loading state for specific notification type
      setLoadingStates((prev) => ({
        ...prev,
        [variables.type]: false,
      }));

      toast.success("Notification settings updated successfully");
    },

    onError: (error: AxiosError<ErrorResponse>, variables) => {
      // Clear loading state for specific notification type
      setLoadingStates((prev) => ({
        ...prev,
        [variables.type]: false,
      }));

      handleErrors(error, "update Notification settings");
    },
  });

  return {
    notificationSettings,
    setNotificationSettings,
    isError,
    error,
    isLoading,
    loadingStates,
    updateNotificationSettings,
  };
}
