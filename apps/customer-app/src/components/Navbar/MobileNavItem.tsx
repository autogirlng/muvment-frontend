import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import cn from "classnames";
import useLogout from "@/components/Navbar/useLogout";

type Props = {
  link?: string;
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
  const { logoutUser } = useLogout();

  return (
    <li>
      {name === "Log out" ? (
        <button onClick={() => logoutUser()} className="w-full text-left">
          <NavItem icon={icon} name={name} />
        </button>
      ) : (
        link && (
          <Link
            onClick={handleClick ? handleClick : () => {}}
            href={link}
            className={cn(className)}
          >
            <NavItem icon={icon} name={name} link={link} />
          </Link>
        )
      )}
    </li>
  );
}

const NavItem = ({ link, name, icon }: Props) => {
  const pathname = usePathname();
  const isActive = link && pathname.includes(link);

  return (
    <p
      className={cn(
        "flex items-center gap-3 py-3 text-sm 2xl:text-base transition-colors duration-200",
        isActive
          ? "text-primary-500"
          : name === "Log out"
            ? "text-black hover:text-error-500"
            : "text-black hover:text-primary-500"
      )}
    >
      <span
        className={cn(
          "*:!w-5 *:!h-5 transition-colors duration-200",
          isActive
            ? "text-primary-500"
            : name === "Log out"
              ? "text-black group-hover:text-error-500"
              : "text-black"
        )}
      >
        {icon}
      </span>
      <span>{name}</span>
    </p>
  );
};
