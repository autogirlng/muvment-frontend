import cn from "classnames";
import { Fragment } from "react";
import { Notification } from "@/utils/types";
import { FullPageSpinner } from "@repo/ui/spinner";
import { formatRelative } from "date-fns";
import { HorizontalDivider } from "@repo/ui/divider";
import {
  getNotificationBgColor,
  getNotificationIcon,
  getNotificationIconColor,
} from "@/utils/functions";
import { parseISO, format, isToday, isYesterday } from "date-fns";
type Props = {
  isError: boolean;
  isLoading: boolean;
  notifications: Notification[];
  isDivider?: boolean;
};

function groupNotificationsByDay(notifications: Notification[]) {
  return notifications.reduce<Record<string, Notification[]>>(
    (grouped, notification) => {
      const dayKey = formatNotificationDate(notification.createdAt);

      if (!grouped[dayKey]) {
        grouped[dayKey] = [];
      }

      grouped[dayKey].push(notification);
      return grouped;
    },
    {}
  );
}

function formatNotificationDate(dateStr: string) {
  const date = parseISO(dateStr);

  if (isToday(date)) {
    return "Today";
  }

  if (isYesterday(date)) {
    return "Yesterday";
  }

  return format(date, "do MMM");
}

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

  const groupedNotifications = groupNotificationsByDay(notifications);

  return (
    <div className="space-y-8">
      {Object.keys(groupedNotifications).map((day) => (
        <div key={day} className="space-y-9">
          <h3 className="text-xl">{day}</h3>
          <div className="space-y-4">
            {groupedNotifications[day].map((item, index) => (
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
        </div>
      ))}
    </div>
  );
}
