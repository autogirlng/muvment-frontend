import Button from "@repo/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

function Hero({}: Props) {
  return (
    <section className="pt-[150px] 3xl:pt-[266px] pb-[65px] 3xl:pb-[85px]">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-[70px] items-center">
          <div className="max-w-[500px] 3xl:max-w-[696px] space-y-6">
            <h1 className="text-h3 sm:text-h2 3xl:text-h1 text-black">
              Start Earning With Muvment Today
            </h1>
            <p className="text-sm sm:text-base 3xl:text-h6 text-grey-500">
              Join our community of successful hosts and experience a new way to
              earn extra income effortlessly.
            </p>
            <div className="flex  flex-col xs:flex-row gap-6 items-center">
              <Link href="/signup">
                <Button color="primary" variant="filled" radius="lg">
                  Sign Up
                </Button>
              </Link>
              <Link href="/#calculator">
                <Button color="transparent" variant="outlined" radius="lg">
                  Calculate earnings
                </Button>
              </Link>
            </div>
          </div>
          <div className="">
            <Image
              src="/images/landing/hero.png"
              alt=""
              width={720}
              height={1080}
              className="h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
