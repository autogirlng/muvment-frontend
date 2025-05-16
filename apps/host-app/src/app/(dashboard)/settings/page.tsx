"use client";

import BankAccount from "@/components/Account/BankAccount";
import Legal from "@/components/Account/Legal";
import RentalAgreement from "@/components/Account/RentalAgreement";
import Security from "@/components/Account/Security";
import { useAppSelector } from "@/lib/hooks";
import AppTabs from "@repo/ui/tabs";

const tabs = [
  {
    name: "Security",
    value: "tab1",
    content: <Security />,
  },
  {
    name: "Bank Account",
    value: "tab2",
    content: <BankAccount />,
  },
  {
    name: "Legal",
    value: "tab3",
    content: <Legal />,
  },
  {
    name: "Rental Availability",
    value: "tab4",
    content: <RentalAgreement />,
  },
];

export default function AccountPage() {
  const { user } = useAppSelector((state) => state.user);

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
