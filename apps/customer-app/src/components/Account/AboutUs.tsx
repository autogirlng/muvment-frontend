import React from "react";
import Icons from "@repo/ui/icons";
import Link from "next/link";

type Props = {};

const socials = [
  { icon: Icons.ic_twitter, link: "https://twitter.com/autogirlng" },
  { icon: Icons.ic_instagram, link: "https://www.instagram.com/autogirlng" },
  { icon: Icons.ic_facebook, link: "https://web.facebook.com/autogirlng" },
  {
    icon: Icons.ic_linkedin,
    link: "https://www.linkedin.com/company/autogirl",
  },
  { icon: Icons.ic_tiktok, link: "https://www.tiktok.com/@autogirl.ng" },
];

export default function AboutUs({}: Props) {
  const aboutUsLink = [
    {
      title: "Privacy Policy",
      href: "/privacy-policy",
      isExternal: false,
    },
    {
      title: "Terms of Service",
      href: "/terms-of-service",
      isExternal: false,
    },
  ];

  return (
    <div className="space-y-[60px] text-base md:text-xl 3xl:text-h6">
      <h6 className="!font-semibold text-grey-700">About us</h6>
      <div className="space-y-3 text-black">
        {aboutUsLink.map((link, index) => (
          <div
            key={index}
            className="bg-white rounded-xl py-6 px-7 flex items-center gap-2 hover:shadow-md transition-shadow duration-200"
          >
            <Link
              href={link.href}
              className="!font-medium flex-1 hover:text-primary-500 transition-colors duration-200"
            >
              {link.title}
            </Link>
            <span className="text-grey-400 transition-colors duration-200">
              {Icons.ic_chevron_right}
            </span>
          </div>
        ))}
        <div className="bg-white rounded-xl py-6 px-7 space-y-11">
          <p className="!font-medium">Socials</p>
          <div className="flex items-center gap-3">
            {socials.map((social, index) => (
              <Link
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="!font-medium flex items-center justify-center w-[72px] h-[72px] rounded-full bg-primary-50 text-primary-500 hover:bg-primary-100 hover:scale-105 transition-all duration-200"
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
