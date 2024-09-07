import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import cn from "classnames";

type Props = { link: string; name: string; icon: ReactNode };

export default function NavItem({ link, name, icon }: Props) {
  const pathname = usePathname();
  return (
    <li>
      <Link
        href={link}
        className={cn(
          "flex items-center gap-3 p-4 rounded-[18px]",
          pathname.includes(link)
            ? "text-primary-500 bg-primary-50"
            : "text-black"
        )}
      >
        {icon}
        <p
          className={cn(
            "text-sm 2xl:text-base",
            pathname.includes(link) ? "text-primary-500" : "text-grey-700"
          )}
        >
          {name}
        </p>
      </Link>
    </li>
  );
}
