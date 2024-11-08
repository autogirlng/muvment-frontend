"use client";

import ProfileInformation from "@/components/Account/ProfileInformation";
import Legal from "@/components/Account/Legal";
import Referrals from "@/components/Account/Referrals";
import Security from "@/components/Account/Security";
import AppTabs from "@repo/ui/tabs";
import NotificationSettings from "@/components/Account/NotificationSettings";

const tabs = [
  {
    name: "Profile",
    value: "tab1",
    content: <ProfileInformation />,
  },
  {
    name: "Security",
    value: "tab2",
    content: <Security />,
  },

  {
    name: "About Us",
    value: "tab3",
    content: <Legal />,
  },
  {
    name: "Notifications",
    value: "tab4",
    content: <NotificationSettings />,
  },
  {
    name: "Rental Availability",
    value: "tab5",
    content: <Referrals />,
  },
];

export default function AccountPage() {
  return (
    <main className="py-[56px] md:space-y-11 text-grey-700">
      <h5 className="text-h5 md:text-h3 3xl:text-4xl !font-bold">Settings</h5>
      <AppTabs label="account page tabs" tabs={tabs} />
    </main>
  );
}

const Label = ({ label }: { label: string }) => (
  <p className="text-sm block font-medium text-nowrap text-grey-900">{label}</p>
);
