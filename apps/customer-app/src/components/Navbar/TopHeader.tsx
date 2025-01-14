import Link from "next/link";
import Icons from "@repo/ui/icons";
import { AvatarInitials } from "@repo/ui/avatar";
import { Popup } from "@repo/ui/popup";
import { useAppSelector } from "@/lib/hooks";
import { getInitialsFromName } from "@/utils/functions";
import NavPopup from "@/components/Navbar/NavPopup";
import Image from "next/image";
import { nav_logo } from "@repo/assets";

type Props = {};

export default function TopHeader({}: Props) {
  const { user } = useAppSelector((state) => state.user);

  return (
    <div className="hidden md:flex w-full md:px-6 2xl:px-8 py-5 items-center justify-between bg-white border-b border-grey-300 shadow-[0_4px_100px_0_#00000012]">
      <Link href="/" className="block">
        <Image className="" src={nav_logo} alt="" width={114} height={40} />
      </Link>
      <nav className="flex items-center gap-4">
        <Link className="text-base 3xl:text-xl text-grey-700" href="/">
          Become a host
        </Link>
        <div className="h-6 w-px bg-white" />

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
            <ul className="list-none">{<NavPopup user={user ?? null} />}</ul>
          }
        />
      </nav>
    </div>
  );
}
