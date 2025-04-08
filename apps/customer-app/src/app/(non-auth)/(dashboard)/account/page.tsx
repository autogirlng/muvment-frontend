"use client";

import ProfileInformation from "@/components/Account/ProfileInformation";
import Referrals from "@/components/Account/Referrals";
import Security from "@/components/Account/Security";
import AppTabs from "@repo/ui/tabs";
import NotificationSettings from "@/components/Account/NotificationSettings";
import AboutUs from "@/components/Account/AboutUs";

const tabs = [
  {
    name: "Profile",
    value: "tab1",
    content: <ProfileInformation />,
  },
  {
    name: "Account Security",
    value: "tab2",
    content: <Security />,
  },

  {
    name: "About Us",
    value: "tab3",
    content: <AboutUs />,
  },
  {
    name: "Notifications",
    value: "tab4",
    content: <NotificationSettings />,
  },
  {
    name: "Referrals",
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
