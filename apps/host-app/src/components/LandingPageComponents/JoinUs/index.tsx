import LandingPageSectionHeader from "@/components/Header/LandingPageSectionHeader";
import Button from "@repo/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

function JoinUs({}: Props) {
  return (
    <section className="flex gap-[117px] bg-primary-500 relative">
      <div className="container mx-auto z-[1]">
        <LandingPageSectionHeader
          className="lg:max-w-[565px] 2xl:max-w-[750px] pt-[183px] 2xl:pt-[355px] pb-[281px] 2xl:pb-[411px] text-white"
          title=" No experience needed to join the Muvment platform"
          description=" Whether you’re an individual looking to earn extra income or a business wanting to manage and expand your fleet, our platform caters to all. Join 100+ hosts who are maximizing their vehicle’s potential."
        >
          <br />
          <Link href="/signup">
            <Button color="white" variant="filled" radius="lg">
              Sign Up
            </Button>
          </Link>
        </LandingPageSectionHeader>
      </div>
      <div className="absolute top-0 right-0 hidden lg:block lg:w-[44%] 2xl:w-[47%] 3xl:w-1/2 h-full">
        <Image
          src="/images/landing/join_us.png"
          alt=""
          width={720}
          height={1080}
          className="h-full ml-auto object-cover"
        />
      </div>
    </section>
  );
}

export default JoinUs;
