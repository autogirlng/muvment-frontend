import React from "react";
import Link from "next/link";
import Image from "next/image";

import { favouriteIcon } from "@repo/assets";
import Icons from "@repo/ui/icons";

const GetStartedWithFavorites: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-12">
      {/* Heart Icon */}
      <div className="mb-8">
        <Image
          src={favouriteIcon}
          alt="Heart ICON"
          width={80}
          height={80}
          className="object-contain"
        />
      </div>

      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-grey-800 mb-6 text-center">
        Get Started With Favorites
      </h2>

      {/* Description */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-8 text-grey-600 text-center max-w-lg mx-auto px-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-sm sm:text-base">Tap the</span>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-grey-100 rounded-full flex items-center justify-center flex-shrink-0 transition-colors hover:bg-grey-200">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-grey-400 w-4 h-4 sm:w-5 sm:h-5"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
        </div>
        <span className="text-sm sm:text-base leading-relaxed">
          icon to save vehicles to your favorites
        </span>
      </div>

      {/* Explore Vehicles Button */}
      <Link href="/explore">
        <button className="bg-primary-500 hover:bg-blue-600 active:bg-blue-700 text-white px-6 py-3 sm:px-8 sm:py-3.5 rounded-full font-medium text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2 min-w-[160px] sm:min-w-[180px] shadow-sm hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          {React.cloneElement(Icons.ic_search, { className: "w-5 h-5" })}
          <span>Explore Vehicles</span>
        </button>
      </Link>
    </div>
  );
};

export default GetStartedWithFavorites;
