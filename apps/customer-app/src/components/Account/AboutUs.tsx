import Icons from "@repo/ui/icons";
import Link from "next/link";
import React from "react";

type Props = {};

const aboutUsLink = [
  {
    title: "Privacy Policy",
    href: "/",
  },
  {
    title: "Terms of Service",
    href: "/",
  },
  {
    title: "How it works",
    href: "/",
  },
  {
    title: "Company Information",
    href: "/",
  },
  // {
  //   title: "Socials",
  //   href: "/",
  // },
];

const socials = [
  { icon: Icons.ic_twitter, link: "/" },
  { icon: Icons.ic_instagram, link: "/" },
];

export default function AboutUs({}: Props) {
  return (
    <div className="space-y-[60px] text-base md:text-xl 3xl:text-h6">
      <h6 className="!font-semibold text-grey-700">About us</h6>
      <div className="space-y-3 text-black">
        {aboutUsLink.map((link, index) => (
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
        <div className="bg-white rounded-xl py-6 px-7 space-y-11">
          <p className="!font-medium">Socials</p>
          <div className="flex items-center gap-3">
            {socials.map((social, index) => (
              <Link
                key={index}
                href={social.link}
                className="!font-medium flex items-center justify-center w-[72px] h-[72px] rounded-full bg-primary-50 text-primary-500"
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
