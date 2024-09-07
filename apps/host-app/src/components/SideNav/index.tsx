import React from "react";
import NavItem from "@/components/SideNav/NavItem";
import Icons from "@repo/ui/icons";
import Image from "next/image";

type Props = {};

const navItems = [
  {
    icon: Icons.ic_dashboard,
    name: "Dashboard",
    link: "/dashboard",
  },
  {
    icon: Icons.ic_ticket,
    name: "Bookings",
    link: "/bookings",
  },
  {
    icon: Icons.ic_car,
    name: "Listings",
    link: "/listings",
  },
  {
    icon: Icons.ic_wallet,
    name: "Wallet",
    link: "/wallet",
  },
  {
    icon: Icons.ic_support,
    name: "Support",
    link: "/support",
  },
];

export default function SideNav({}: Props) {
  return (
    <div className="bg-white pt-8 pb-6 hidden md:block fixed left-0 top-0 md:w-[252px] 2xl:w-[272px] h-screen border-r border-grey-300 shadow-[12px_4px_100px_0_#00000012]">
      <div className="space-y-3 px-2 w-full">
        <div className="ml-4 pb-5">
          <Image
            className=""
            src="/images/logo.png"
            alt=""
            width={114}
            height={40}
          />
        </div>
        <ul className="list-none space-y-3">
          {navItems.map((item, index) => (
            <NavItem
              key={index}
              icon={item.icon}
              name={item.name}
              link={item.link}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
