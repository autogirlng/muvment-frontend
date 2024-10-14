import React, { Fragment } from "react";
import { Notification } from "@/utils/types";
import { FullPageSpinner } from "@repo/ui/spinner";
import Icons from "@repo/ui/icons";
import { formatRelative } from "date-fns";
import { HorizontalDivider } from "@repo/ui/divider";

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
      case "success":
        return Icons.ic_activity;
      case "error":
        return Icons.ic_activity;
      case "warning":
        return Icons.ic_activity;
      case "info":
        return Icons.ic_info;
      default:
        return Icons.ic_info;
    }
  };
  
  return (
    <div className="space-y-7">
      {notifications.map((item, index) => (
        <Fragment key={index}>
          <div key={index} className="flex items-center gap-3">
            <div className="w-[52px] h-[52px] rounded-full bg-grey-90 text-grey-700 flex items-center justify-center *:!w-6 *:!h-6 ">
              {Icons.ic_lock}
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
