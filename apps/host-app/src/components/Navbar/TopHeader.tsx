import React from "react";
import Icons from "@repo/ui/icons";
import { useAppSelector } from "@/lib/hooks";
import { AvatarImage } from "@repo/ui/avatar";
import { getInitialsFromName } from "@/utils/functions";
import { Popup } from "@repo/ui/popup";
import NavPopup from "./NavPopup";

type Props = {};

const IconWrapper = ({ icon }: any) => {
  return (
    <div className="w-10 h-10 flex items-center justify-center border border-grey-300 bg-grey-100 rounded-full text-grey-700 fill-grey-700">
      {icon}
    </div>
  );
};

export default function TopHeader({}: Props) {
  const { user } = useAppSelector((state) => state.user);

  return (
    <div className="hidden md:flex w-full md:px-6 2xl:px-8 py-5 items-center justify-between bg-white border-b border-grey-300 shadow-[0_4px_100px_0_#00000012]">
      <h6 className="text-base 2xl:text-h6 text-black">
        Hello, {user?.firstName}
      </h6>
      <div className="flex items-center gap-3">
        <IconWrapper icon={Icons.ic_notification} />
        <IconWrapper icon={Icons.ic_setting} />

        <Popup
          trigger={
            <button className="flex items-center gap-1 text-grey-600">
              <AvatarImage
                image="/images/top_header_avatar.png"
                initials={
                  user && getInitialsFromName(user.firstName, user.lastName)
                }
              />
              <span className="*:!w-[14px] *:!h-[14px]">
                {Icons.ic_chevron_down}
              </span>
            </button>
          }
          content={<NavPopup />}
        ></Popup>
      </div>
    </div>
  );
}
