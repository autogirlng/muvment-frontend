import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import cn from "classnames";

type Props = {
  link: string;
  name: string;
  icon: ReactNode;
  handleClick?: () => void;
  className?: string;
};

export default function MobileNavItem({
  link,
  name,
  icon,
  handleClick,
  className,
}: Props) {
  const pathname = usePathname();
  return (
    <li>
      <Link
        onClick={handleClick}
        href={link}
        className={cn(
          "flex items-center gap-3 py-3",
          pathname.includes(link) ? "text-primary-500 " : "text-black",
          className
        )}
      >
        <span className="*:!w-5 *:!h-5">{icon}</span>
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
