import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, ReactNode } from "react";
import { hostAppUrl, popupNavItemsforNoUser } from "@/utils/data";
import { getInitialsFromName } from "@/utils/functions";
import { User } from "@/utils/types";
import { AvatarInitials } from "@repo/ui/avatar";
import { Popup } from "@repo/ui/popup";
import Icons from "@repo/ui/icons";
import NavPopup from "@/components/Navbar/NavPopup";
import MobileNavItem from "@/components/Navbar/MobileNavItem";

type Props = {
  user: User | null;
  children?: ReactNode;
  explorePage?: boolean;
};

export default function DesktopNav({ user, children, explorePage }: Props) {
  const [userToken, setUserToken] = useState<string>("");
  const [sticky, setSticky] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (!explorePage) setSticky(window.scrollY > 600);
    });
  }, [explorePage]);

  useEffect(() => {
    const user_token = window.localStorage.getItem("user_token");
    setUserToken(user_token || "");
  }, []);

  return (
    <header
      className={cn(
        "hidden md:flex justify-between items-center fixed top-0 left-0 z-[999] w-full px-20 py-5",
        explorePage || sticky
          ? "bg-white border-b border-grey-200"
          : "bg-[#F9FAFB59] backdrop-blur-xl"
      )}
    >
      <Image
        className=""
        src={`/images/logo/${explorePage || sticky ? "nav_logo" : "logo_white"}.png`}
        alt=""
        width={114}
        height={40}
      />
      {children}
      <nav className="flex items-center gap-4">
        <Link
          className={cn(
            "text-base 3xl:text-xl",
            explorePage || sticky ? "text-grey-700" : "text-white"
          )}
          target="_blank"
          href={hostAppUrl}
        >
          Become a host
        </Link>
        <div
          className={cn(
            "h-6 w-px",
            explorePage || sticky ? "bg-grey-700" : "bg-white"
          )}
        />

        <Popup
          trigger={
            <button className="bg-white border border-grey-300 rounded-[33px] p-1 pr-2 flex items-center gap-2">
              <AvatarInitials
                initials={
                  user
                    ? getInitialsFromName(user?.firstName, user?.lastName)
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
              {userToken ? (
                <NavPopup user={user ?? null} />
              ) : (
                popupNavItemsforNoUser.map((item, index) => (
                  <MobileNavItem
                    key={index}
                    icon={item.icon}
                    name={item.name}
                    link={item.link}
                    className="!py-1.5"
                  />
                ))
              )}
            </ul>
          }
        />
      </nav>
    </header>
  );
}
