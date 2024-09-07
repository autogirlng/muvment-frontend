import React from "react";
import Button from "@repo/ui/button";

type Props = {};

function Footer({}: Props) {
  return (
    <div className="py-10 px-5 sm:px-8">
      <div className="bg-footer-overlay bg-no-repeat bg-cover bg-primary-500 h-[600px] sm:h-[800px] 3xl:h-[965px] rounded-[100px] sm:rounded-[177px] px-5">
        <div className="h-full w-full flex flex-col gap-9 items-center justify-center text-white text-center">
          <h1 className="text-h3 sm:text-h2 3xl:text-h1 max-w-[900px]">
            If you travel frequently, why let your car sit{" "}
            <span className="text-warning-300">idle?</span>
          </h1>
          <p className="text-h5 sm:text-h3 3xl:text-4xl">
            Rent it out and earn extra income while you’re away.
          </p>
          <Button color="white" variant="filled" radius="lg">
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Footer;
