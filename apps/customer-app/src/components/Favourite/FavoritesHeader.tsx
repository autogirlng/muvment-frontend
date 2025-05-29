import React from "react";
import Icons from "@repo/ui/icons";
import cn from "classnames";
import BackLink from "../BackLink";

type Props = {
  userName?: string;
  favoriteCount: number;
  isDisplayList: boolean;
  setIsDisplayList: (value: boolean) => void;
  onBackClick?: () => void;
};

const FavoritesHeader: React.FC<Props> = ({
  userName = "User",
  favoriteCount,
  isDisplayList,
  setIsDisplayList,
  onBackClick,
}) => {
  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      // Default back navigation
      window.history.back();
    }
  };

  return (
    <>
      <BackLink backLink="/" className="mt-5" />
      <div className="flex items-center justify-between w-full mb-6 md:mb-8 mt-5">
        {/* Left side - Back button and title */}

        {/* Center - Title with heart icon */}
        <div className="flex items-center space-x-2 flex-1 justify-center md:justify-start md:ml-6">
          <span className="*:w-6 *:h-6 md:*:w-7 md:*:h-7 text-blue-500">
            {Icons.ic_whishlist}
          </span>
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-grey-800">
            {userName}&apos;s Favorites ({favoriteCount})
          </h1>
        </div>

        {/* Right side - View toggle buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsDisplayList(true)}
            className={cn(
              "*:h-4 md:*:h-5 *:w-4 md:*:w-5 p-2 md:p-2.5 rounded-xl transition-all",
              isDisplayList
                ? "bg-[#0673FF] text-white shadow-md"
                : "border border-grey-300 text-grey-700 hover:bg-grey-50"
            )}
            aria-label="List view"
          >
            {Icons.ic_note_list}
          </button>
          <button
            onClick={() => setIsDisplayList(false)}
            className={cn(
              "*:h-4 md:*:h-5 *:w-4 md:*:w-5 p-2 md:p-2.5 rounded-xl transition-all",
              !isDisplayList
                ? "bg-[#0673FF] text-white shadow-md"
                : "border border-grey-300 text-grey-700 hover:bg-grey-50"
            )}
            aria-label="Grid view"
          >
            {Icons.ic_dashboard_square}
          </button>
        </div>
      </div>
    </>
  );
};

export default FavoritesHeader;
