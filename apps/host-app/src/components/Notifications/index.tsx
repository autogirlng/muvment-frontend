import React, { Fragment, useState } from "react";
import { CalendarValue, Notification, NotificationType } from "@/utils/types";
import { FullPageSpinner } from "@repo/ui/spinner";
import Icons from "@repo/ui/icons";
import { formatRelative } from "date-fns";
import { HorizontalDivider } from "@repo/ui/divider";
import DateRangeCalendar from "@repo/ui/calendar";
import cn from "classnames";

type Props = {
  isError: boolean;
  isLoading: boolean;
  notifications: Notification[];
  isDivider?: boolean;
};

export default function Notifications({
  notifications,
  isLoading,
  isError,
  isDivider = false,
}: Props) {
  if (isLoading) {
    return <FullPageSpinner className="min-h-[480px]" />;
  }
  if (isError) {
    return <p>Something went wrong</p>;
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case NotificationType.BOOKING_REQUEST:
        return Icons.ic_booking_request;
      case NotificationType.BOOKING_CONFIRMED:
        return Icons.ic_booking_confirmed;
      case NotificationType.BOOKING_CANCELED:
        return Icons.ic_booking_canceled;
      case NotificationType.UPCOMING_BOOKING:
        return Icons.ic_upcoming_booking;
      case NotificationType.GUEST_CHECK_IN:
        return Icons.ic_info;
      case NotificationType.GUEST_CHECK_OUT:
        return Icons.ic_info;
      case NotificationType.VEHICLE_ACCEPTED:
        return Icons.ic_info;
      case NotificationType.PAYMENT_RECEIVED:
        return Icons.ic_payment_received;
      case NotificationType.SECURITY_ALERT:
        return Icons.ic_lock;
      case NotificationType.NEW_REVIEW:
        return Icons.ic_info;
      case NotificationType.SPECIAL_OFFER:
        return Icons.ic_upcoming_booking;
      default:
        return Icons.ic_lock;
    }
  };

  const getNotificationIconColor = (type: string) => {
    switch (type) {
      case "BOOKING_REQUEST":
        return "text-primary-600";
      case NotificationType.BOOKING_CONFIRMED:
        return "text-success-600";
      case NotificationType.BOOKING_CANCELED:
        return "text-error-900";
      case NotificationType.UPCOMING_BOOKING:
        return "text-warning-400";
      case NotificationType.GUEST_CHECK_IN:
        return "text-grey-700";
      case NotificationType.GUEST_CHECK_OUT:
        return "text-grey-700";
      case NotificationType.VEHICLE_ACCEPTED:
        return "text-success-600";
      case NotificationType.PAYMENT_RECEIVED:
        return "text-success-600";
      case NotificationType.SECURITY_ALERT:
        return "text-error-900";
      case NotificationType.NEW_REVIEW:
        return "text-warning-400";
      case NotificationType.SPECIAL_OFFER:
        return "text-warning-400";
      default:
        return "text-grey-700";
    }
  };

  const getNotificationBgColor = (type: string) => {
    switch (type) {
      case "BOOKING_REQUEST":
        return "bg-primary-75";
      case NotificationType.BOOKING_CONFIRMED:
        return "bg-success-75";
      case NotificationType.BOOKING_CANCELED:
        return "bg-error-100";
      case NotificationType.UPCOMING_BOOKING:
        return "bg-warning-75";
      case NotificationType.GUEST_CHECK_IN:
        return "bg-grey-90";
      case NotificationType.GUEST_CHECK_OUT:
        return "bg-grey-90";
      case NotificationType.VEHICLE_ACCEPTED:
        return "bg-success-75";
      case NotificationType.PAYMENT_RECEIVED:
        return "bg-success-75";
      case NotificationType.SECURITY_ALERT:
        return "bg-error-100";
      case NotificationType.NEW_REVIEW:
        return "bg-warning-75";
      case NotificationType.SPECIAL_OFFER:
        return "bg-warning-75";
      default:
        return "bg-grey-90";
    }
  };

  return (
    <div className="space-y-7">
      {notifications.map((item, index) => (
        <Fragment key={index}>
          <div key={index} className="flex items-center gap-3">
            <div
              className={cn(
                "w-[52px] h-[52px] rounded-full flex items-center justify-center *:!w-6 *:!h-6 ",
                getNotificationBgColor(item.notificationType),
                getNotificationIconColor(item.notificationType)
              )}
            >
              {getNotificationIcon(item.notificationType)}
            </div>
            <div className="space-y-2">
              <p className="text-base 3xl:text-xl text-grey-900 !font-medium">
                {item.title}
              </p>
              <p className="text-xs 3xl:text-sm text-grey-600">
                {item.message}
              </p>
              <p className="text-xs 3xl:text-sm text-grey-400">
                {item.createdAt
                  ? `${formatRelative(item?.createdAt, new Date())} `
                  : "-"}
              </p>
            </div>
          </div>
          {isDivider && <HorizontalDivider variant="dark" />}
        </Fragment>
      ))}
    </div>
  );
}
