import Link from "next/link";
import { popupNavItems } from "@/utils/data";
import { getInitialsFromName } from "@/utils/functions";
import { HorizontalDivider } from "@repo/ui/divider";
import { AvatarImage } from "@repo/ui/avatar";
import MobileNavItem from "@/components/Navbar/MobileNavItem";
import { User } from "@/utils/types";

type Props = { handleClick?: () => void; user: User | null };

export default function NavPopup({ handleClick, user }: Props) {
  return (
    <div className="space-y-3">
      {user && (
        <>
          <AvatarImage
            image={user?.businessLogo ?? user?.profileImage ?? ""}
            initials={getInitialsFromName(user.firstName, user.lastName)}
            size="!w-11 !h-11"
          />
          <div className="space-y-1">
            <p className="text-sm">
              {user.businessName ?? `${user.firstName} ${user.lastName}`}
            </p>
            <Link href="/account" className="text-xs text-primary-500">
              View Account
            </Link>
          </div>
          <HorizontalDivider variant="light" />
        </>
      )}

      <ul className="list-none space-y-3">
        {popupNavItems.map((item, index) => (
          <MobileNavItem
            handleClick={handleClick}
            key={index}
            icon={item.icon}
            name={item.name}
            link={item.link}
            className="!py-1.5"
          />
        ))}
      </ul>
    </div>
  );
}
