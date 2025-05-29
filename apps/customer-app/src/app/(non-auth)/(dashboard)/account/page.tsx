"use client";

import ProfileInformation from "@/components/Account/ProfileInformation";
import Referrals from "@/components/Account/Referrals";
import Security from "@/components/Account/Security";
import AppTabs from "@/components/Account/AccountAppTab";
import NotificationSettings from "@/components/Account/NotificationSettings";
import AboutUs from "@/components/Account/AboutUs";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CaretDown } from "@phosphor-icons/react";

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
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const getInitialTab = () => {
    return tabParam === "referrals" ? "tab5" : "tab1";
  };

  const [activeTab, setActiveTab] = useState(getInitialTab());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (tabParam === "referrals") {
      setActiveTab("tab5");
    }
  }, [tabParam]);

  const currentTab = tabs.find((tab) => tab.value === activeTab);

  const handleTabChange = (tabValue: string) => {
    setActiveTab(tabValue);
    setIsDropdownOpen(false);
  };

  return (
    <main className="py-8 md:py-[56px] px-4 md:px-0 md:space-y-11 text-grey-700">
      <h5 className="text-xl md:text-h5 lg:text-h3 3xl:text-4xl !font-bold mb-6 md:mb-0">
        Settings
      </h5>

      {/* Desktop Tabs - Hidden on mobile */}
      <div className="hidden md:block">
        <AppTabs
          label="account page tabs"
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </div>

      {/* Mobile Layout - Visible only on mobile */}
      <div className="block md:hidden space-y-6">
        {/* Mobile Dropdown Selector */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full bg-white border border-grey-200 rounded-xl px-4 py-3 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            style={{ marginBottom: 60 }}
          >
            <span className="text-base font-medium text-grey-900">
              {currentTab?.name}
            </span>
            <CaretDown
              size={20}
              className={`text-grey-500 transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-grey-200 rounded-xl shadow-lg z-50 overflow-hidden">
              {tabs.map((tab, index) => (
                <button
                  key={tab.value}
                  onClick={() => handleTabChange(tab.value)}
                  className={`w-full px-4 py-3 text-left hover:bg-grey-50 transition-colors duration-150 ${
                    activeTab === tab.value
                      ? "bg-primary-50 text-primary-600 border-l-4 border-primary-500"
                      : "text-grey-700"
                  } ${index !== tabs.length - 1 ? "border-b border-grey-100" : ""}`}
                >
                  <span className="text-base font-medium">{tab.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Mobile Content */}
        <div className="min-h-[400px]">{currentTab?.content}</div>
      </div>

      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </main>
  );
}
