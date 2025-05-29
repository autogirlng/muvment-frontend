import { ReactNode } from "react";
import AppSwitch from "@repo/ui/switch";
import useUpdateNotificationSettings from "./hooks/useUpdateNotificationSettings";
import { FullPageSpinner, Spinner } from "@repo/ui/spinner";

type Props = {};

export default function NotificationSettings({}: Props) {
  const {
    isError,
    isLoading,
    notificationSettings,
    updateNotificationSettings,
    loadingStates,
  } = useUpdateNotificationSettings();

  return (
    <div className="space-y-[60px] text-base md:text-xl 3xl:text-h6">
      <h6 className="!font-semibold text-grey-700">Notification Settings</h6>
      {isLoading ? (
        <FullPageSpinner className="!min-h-[300px]" />
      ) : isError ? (
        <p>Something went wrong</p>
      ) : (
        <div className="space-y-3 text-black">
          <NotificationSettingsWrapper
            title="Email Notifications"
            description="Do you want receive notifications via emails?"
            loading={loadingStates.emailNotifications}
          >
            <AppSwitch
              id="emailNotifications"
              name="emailNotifications"
              value={notificationSettings.emailNotifications}
              disabled={loadingStates.emailNotifications}
              onChange={(checked) => {
                updateNotificationSettings.mutate({
                  type: "emailNotifications",
                  emailNotifications: checked,
                  smsNotifications: notificationSettings.smsNotifications,
                });
              }}
            />
          </NotificationSettingsWrapper>
          <NotificationSettingsWrapper
            title="SMS Notifications"
            description="Do you want receive notifications via SMS?"
            loading={loadingStates.smsNotifications}
          >
            <AppSwitch
              id="smsNotifications"
              name="smsNotifications"
              value={notificationSettings.smsNotifications}
              disabled={loadingStates.smsNotifications}
              onChange={(checked) => {
                updateNotificationSettings.mutate({
                  type: "smsNotifications",
                  emailNotifications: notificationSettings.emailNotifications,
                  smsNotifications: checked,
                });
              }}
            />
          </NotificationSettingsWrapper>
        </div>
      )}
    </div>
  );
}

const NotificationSettingsWrapper = ({
  children,
  title,
  description,
  loading,
}: {
  children: ReactNode;
  title: string;
  description: string;
  loading: boolean;
}) => (
  <div className="bg-white rounded-xl py-6 px-7 flex justify-between items-center">
    <div className="space-y-2">
      <p className="!font-medium">{title}</p>
      <p className="text-sm">{description}</p>
    </div>
    {loading ? <Spinner /> : children}
  </div>
);
