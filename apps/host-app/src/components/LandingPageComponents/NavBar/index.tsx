import MobileNavItem from "@/components/Navbar/MobileNavItem";
import { useAppSelector } from "@/lib/hooks";
import { popupNavItems, popupNavItemsforNoUser } from "@/utils/data";
import { getInitialsFromName } from "@/utils/functions";
import { AvatarInitials } from "@repo/ui/avatar";
import Icons from "@repo/ui/icons";
import { Popup } from "@repo/ui/popup";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import cn from "classnames";

type Props = { userToken: string };

export default function NavBar({ userToken }: Props) {
  const { user } = useAppSelector((state) => state.user);

  const [sticky, setSticky] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setSticky(window.scrollY > 600);
    });
  }, []);

  return (
    <header
      className={cn(
        "hidden md:flex justify-between items-center fixed top-0 left-0 z-[999] w-full px-20 py-5",
        sticky
          ? "bg-white border-b border-grey-200"
          : "bg-[#F9FAFB59] backdrop-blur-xl"
      )}
    >
      <Image
        className=""
        src="/images/logo/nav_logo.png"
        alt=""
        width={114}
        height={40}
      />
      <nav className="flex items-center gap-4">
        <Link
          className={cn(
            "text-base 3xl:text-xl",
            sticky ? "text-grey-700" : "text-white"
          )}
          href="/"
        >
          Book a ride
        </Link>
        <div className="h-6 w-px bg-white" />

        <Popup
          trigger={
            <button className="bg-white border border-grey-300 rounded-[33px] p-1 pr-2 flex items-center gap-2">
              <AvatarInitials
                initials={
                  user
                    ? getInitialsFromName(user.firstName, user.lastName)
                    : Icons.ic_user
                }
                size="!w-8 !h-8"
                color="!bg-primary-100 !text-primary-800 !text-[10px] !font-bold *:!w-5 *!h-5"
              />
              {Icons.ic_menu}
            </button>
          }
          content={
            <ul className="list-none">
              {userToken
                ? popupNavItems.map((item, index) => (
                    <MobileNavItem
                      key={index}
                      icon={item.icon}
                      name={item.name}
                      link={item.link}
                      className="!py-[6px]"
                    />
                  ))
                : popupNavItemsforNoUser.map((item, index) => (
                    <MobileNavItem
                      key={index}
                      icon={item.icon}
                      name={item.name}
                      link={item.link}
                      className="!py-[6px]"
                    />
                  ))}
            </ul>
          }
        />
      </nav>
    </header>
  );
}
