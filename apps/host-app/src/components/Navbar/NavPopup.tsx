import { popupNavItems } from "@/utils/data";
import React from "react";
import MobileNavItem from "./MobileNavItem";
import { AvatarImage } from "@repo/ui/avatar";
import { getInitialsFromName } from "@/utils/functions";
import { useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import { HorizontalDivider } from "@repo/ui/divider";

type Props = { handleClick?: () => void };

export default function NavPopup({ handleClick }: Props) {
  const { user } = useAppSelector((state) => state.user);

  return (
    <div className="space-y-3">
      {user && (
        <>
          <AvatarImage
            image="/images/top_header_avatar.png"
            initials={getInitialsFromName(user.firstName, user.lastName)}
            size="!w-11 !h-11"
          />
          <div className="space-y-1">
            <p className="text-sm">
              {user.firstName} {user.lastName}
            </p>
            <Link href="/profile" className="text-xs text-primary-500">
              View profile
            </Link>
          </div>
        </>
      )}

      <HorizontalDivider variant="light" />

      <ul className="list-none space-y-3">
        {popupNavItems.map((item, index) => (
          <MobileNavItem
            handleClick={handleClick}
            key={index}
            icon={item.icon}
            name={item.name}
            link={item.link}
            className="!py-[6px]"
          />
        ))}
      </ul>
    </div>
  );
}
