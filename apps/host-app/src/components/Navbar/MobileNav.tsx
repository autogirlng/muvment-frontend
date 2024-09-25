import { AvatarImage } from "@repo/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

export default function MobileNav({}: Props) {
  return (
    <div className="bg-white px-8 py-14">
      <div className="space-y-6">
        <AvatarImage
          image="/images/top_header_avatar.png"
          initials="MJ"
          size="w-20 h-20"
        />
        <div className="space-y-1">
          <p>Mamudu Jeffrey</p>
          <Link href="/dashboard">View profile</Link>
        </div>
      </div>
    </div>
  );
}
