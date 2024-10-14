import Icons from "@repo/ui/icons";
import Link from "next/link";
import React from "react";

type Props = {};

const legalLinks = [
  {
    title: "Terms of Service",
    href: "/",
  },
  {
    title: "Privacy Policy",
    href: "/",
  },
  {
    title: "Rental Agreement",
    href: "/",
  },
];

export default function Legal({}: Props) {
  return (
    <div className="space-y-[60px] text-base md:text-xl 3xl:text-h6">
      <h6 className="!font-semibold text-grey-700">Legal</h6>
      <div className="space-y-3 text-black">
        {legalLinks.map((link, index) => (
          <div
            key={index}
            className="bg-white rounded-xl py-6 px-7 flex items-center gap-2"
          >
            <Link href={link.href} className="!font-medium">
              {link.title}
            </Link>
            {Icons.ic_chevron_right}
          </div>
        ))}
      </div>
    </div>
  );
}
