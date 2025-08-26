import React from "react";
import Image from "next/image";
import Link from "next/link";
import Icons from "@repo/ui/icons";
import { Leaf } from "lucide-react";

export default function RideSection() {
  return (
    <div className="w-full bg-grey-50 px-2 sm:px-4 md:px-8 py-8 mb-[60px] pb-[85px]">
      {/* Icon and Header Row */}
      <div className="flex flex-col lg:flex-col items-center lg:items-start mb-6 max-w-6xl mx-auto px-0 w-full gap-2 lg:gap-4">
        <div className="w-10 h-10 bg-green-900 rounded-xl flex items-center justify-center mb-2 lg:mb-4 lg:ml-1">
          <Leaf
            className="w-10 h-10 md:w-12 md:h-12 lg:w-12 lg:h-12 rotate-180"
            stroke="#4ade80"
          />
        </div>
        <div className="flex-1 w-full">
          <h2 className="text-h5 md:text-h3 3xl:text-4xl font-semibold text-black-900 leading-tight mb-1 text-center lg:text-left">
            Looking for a Ride for as low as 1 hour?
          </h2>
          <p className="text-xs md:text-sm text-grey-500 text-center lg:text-left">
            Enjoy the flexibility of renting our electric cars for as little as
            1 hour or up to a full day.
          </p>
        </div>
      </div>
      {/* Main Content Card */}
      <div className="bg-[#fcecec] rounded-3xl p-4 sm:p-6 md:p-10 max-w-6xl mx-auto shadow-lg w-full">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-60 w-full">
          {/* Left Section - Description and Button */}
          <div className="flex-1 w-full max-w-full md:max-w-md">
            <div className="relative flex-shrink-0 mb-12">
              <div className="flex flex-col xs:flex-row gap-4 items-center justify-center">
                <div className="relative w-37 h-40 xs:w-39 xs:h-48 sm:w-42 sm:h-52 rounded-3xl overflow-hidden shadow-lg z-30 bg-orange-200 flex items-center justify-center transform -rotate-12 translate-y-2 translate-x-1">
                  <Image
                    src="/images/landing/10.png"
                    alt="Electric Car"
                    width={190}
                    height={190}
                    sizes="(max-width: 640px) 148px, (max-width: 768px) 168px, 168px"
                    className="object-cover scale-150 transition-transform duration-300 ease-in-out"
                  />
                </div>
                <div className="relative w-37 h-40 xs:w-39 xs:h-48 sm:w-42 sm:h-52 rounded-3xl overflow-hidden shadow-lg z-20 bg-orange-300 flex items-center justify-center transform -rotate-12 translate-y-2 translate-x-1 -ml-12 sm:-ml-16">
                  <Image
                    src="/images/landing/9.png"
                    alt="EV Interior"
                    width={190}
                    height={190}
                    sizes="(max-width: 640px) 148px, (max-width: 768px) 168px, 168px"
                    className="object-cover scale-150 transition-transform duration-300 ease-in-out"
                  />
                </div>
                <div className="relative w-37 h-40 xs:w-39 xs:h-48 sm:w-42 sm:h-52 rounded-3xl overflow-hidden shadow-lg z-10 bg-orange-400 flex items-center justify-center transform -rotate-12 translate-y-2 translate-x-1 -ml-12 sm:-ml-16">
                  <Image
                    src="/images/landing/8.png"
                    alt="Charging"
                    width={190}
                    height={190}
                    sizes="(max-width: 640px) 148px, (max-width: 768px) 168px, 168px"
                    className="object-cover scale-150 transition-transform duration-300 ease-in-out"
                  />
                </div>
              </div>
            </div>
            <p className="text-grey-700 mb-12 md:mb-13 text-sm text-center md:text-left">
              Whether you&apos;re commuting to work, heading to the airport,
              attending a meeting, or simply curious, our exceptional
              chauffeur-driven electric vehicle service is designed to impress.
            </p>
            <div className="flex justify-center md:justify-start">
              <Link
                href="/explore/results?category=SUVElectric"
                passHref
                legacyBehavior
              >
                <a className="bg-primary-500 text-white font-semibold py-3 px-6 rounded-xl hover:bg-primary-600 transition-colors w-full xs:w-auto hover:text-white text-center block">
                  Explore Electric Cars
                </a>
              </Link>
            </div>
          </div>
          {/* Right Section - Feature List */}
          <div className="flex-1 flex flex-col gap-4 max-w-full md:max-w-sm w-full">
            <div className="bg-primary-900 text-white p-4 rounded-full flex items-center gap-4 text-sm">
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-500 mr-2">
                {Icons.ic_folder_library}
              </span>
              <span>No fuel stops</span>
            </div>
            <div className="bg-primary-900 text-white p-4 rounded-full flex items-center gap-4 text-sm">
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-500 mr-2">
                {Icons.ic_renewable_energy}
              </span>
              <span>Whisper-quiet engine</span>
            </div>
            <div className="bg-primary-900 text-white p-4 rounded-full flex items-center gap-4 text-sm">
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-500 mr-2">
                {Icons.ic_bend_tool}
              </span>
              <span>Charged and ready to go</span>
            </div>
            <div className="bg-primary-900 text-white p-4 rounded-full flex items-center gap-4 text-sm">
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-500 mr-2">
                {Icons.ic_bend_tool}
              </span>
              <span>Perfect for short trips</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
