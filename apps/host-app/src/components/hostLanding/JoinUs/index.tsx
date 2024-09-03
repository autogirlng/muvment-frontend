import Button from "@repo/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

function JoinUs({}: Props) {
  return (
    <div className="flex gap-[117px] bg-primary-500 relative">
      <div className="container mx-auto">
        <div className="max-w-[860px] pt-[355px] pb-[411px] space-y-[11px] text-white">
          <h1 className="text-h1">
            No experience needed to join the Muvment platform
          </h1>
          <p>
            Whether you’re an individual looking to earn extra income or a
            business wanting to manage and expand your fleet, our platform
            caters to all. Join 100+ hosts who are maximizing their vehicle’s
            potential.
          </p>
          <br />
          <Link href="/signup">
            <Button color="white" variant="filled" radius="lg">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
      <div className="absolute top-0 right-0 h-full ">
        <Image
          src="/images/join_us.png"
          alt=""
          width={720}
          height={1080}
          className="h-full"
        />
      </div>
    </div>
  );
}

export default JoinUs;
