import React from "react";
import Icons from "@repo/ui/icons";
import UserAvatar from "@/components/Avatar";

type Props = {};

const IconWrapper = ({ icon }: any) => {
  return (
    <div className="w-10 h-10 flex items-center justify-center border border-grey-300 bg-grey-100 rounded-full text-grey-700 fill-grey-700">
      {icon}
    </div>
  );
};

export default function TopHeader({}: Props) {
  return (
    <div className="w-full px-4 md:px-6 2xl:px-8 py-5 flex items-center justify-between bg-white border-b border-grey-300 shadow-[0_4px_100px_0_#00000012]">
      <h6 className="text-base 2xl:text-h6 text-black">Hello, Jeffrey</h6>
      <div className="flex items-center gap-3">
        <IconWrapper icon={Icons.ic_notification} />
        <IconWrapper icon={Icons.ic_setting} />
        <UserAvatar />
      </div>
    </div>
  );
}
