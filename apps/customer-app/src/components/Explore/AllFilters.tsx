"use client";

import cn from "classnames";
import Icons from "@repo/ui/icons";
import {
  ChipFilterWithoutPopup,
  RangeFilterWithoutPopup,
  SearchFilterWithoutPopup,
} from "./Filter";
import {
  vehicleFeaturesOptions,
  vehicleMakeArray,
  vehicleTypeArray,
  yearsFilterArray,
} from "@/utils/data";
import { Dispatch, SetStateAction } from "react";
import { HorizontalDivider } from "@repo/ui/divider";

type Props = {
  filters: {
    minPrice: number;
    maxPrice: number;
    type: string[];
    make: string[];
    yearOfRelease: string[];
    numberOfSeats: string[];
    features: string[];
  };
  handleFilterChange: (filterName: string, value: string | number[] | number) => void;
  setShowAllFilters: Dispatch<SetStateAction<boolean>>;
  clearAllFilters: () => void;
  clearIndividualFilter: (filterName: string, value: string) => void;
};

export default function AllFilters({
  handleFilterChange,
  setShowAllFilters,
  filters,
  clearAllFilters,
  clearIndividualFilter,
}: Props) {
  return (
    <div
      className={cn(
        "space-y-10 flex-col fixed z-[999] left-0 top-[113px] h-full w-full lg:w-[300px] 2xl:w-[500px] bg-grey-50 py-8 px-6 2xl:px-16 !mt-0 !pb-[200px] overflow-auto"
      )}
    >
      <button
        onClick={() => setShowAllFilters(false)}
        className="ml-auto p-1 flex items-center gap-1 text-grey-800 text-xs 2xl:text-sm !font-semibold"
      >
        {Icons.ic_chevron_left} <span>Hide filters</span>
      </button>

      <div className="flex items-center justify-between">
        <h5>Filters</h5>
        <button
          onClick={clearAllFilters}
          className="bg-red-50 border border-red-300 rounded-lg px-3 py-2 flex items-center gap-2 text-red-600 text-xs 3xl:text-sm !font-semibold hover:bg-red-100 transition-colors"
        >
          {Icons.ic_close_circle}
          <span>Clear all</span>
        </button>
      </div>

      <HorizontalDivider className="!bg-grey-300" />

      <RangeFilterWithoutPopup
        name="Price Range"
        filterName="price"
        onChange={(filterName, value) => {
          // Convert the price array to minPrice and maxPrice
          if (Array.isArray(value) && value.length === 2) {
            handleFilterChange("minPrice", value[0]);
            handleFilterChange("maxPrice", value[1]);
          }
        }}
        selectedItems={[filters.minPrice, filters.maxPrice]}
      />

      <HorizontalDivider className="!bg-grey-300" />

      <ChipFilterWithoutPopup
        name="Vehicle type"
        list={vehicleTypeArray}
        filterName="type"
        onChange={handleFilterChange}
        selectedItems={filters.type}
        onClearIndividual={clearIndividualFilter}
      />

      <HorizontalDivider className="!bg-grey-300" />

      <SearchFilterWithoutPopup
        name="Vehicle Make"
        list={vehicleMakeArray}
        filterName="make"
        onChange={handleFilterChange}
        selectedItems={filters.make}
        onClearIndividual={clearIndividualFilter}
      />

      <HorizontalDivider className="!bg-grey-300" />

      <ChipFilterWithoutPopup
        name="Vehicle Year"
        list={yearsFilterArray}
        filterName="yearOfRelease"
        onChange={handleFilterChange}
        selectedItems={filters.yearOfRelease}
        onClearIndividual={clearIndividualFilter}
      />

      <HorizontalDivider className="!bg-grey-300" />

      <ChipFilterWithoutPopup
        name="Number Of Seats"
        list={[
          "2 seater",
          "3 seater",
          "4 seater",
          "5 seater",
          "6 seater",
          "7+ seater",
        ]}
        filterName="numberOfSeats"
        onChange={handleFilterChange}
        selectedItems={filters.numberOfSeats}
        onClearIndividual={clearIndividualFilter}
      />

      <HorizontalDivider className="!bg-grey-300" />

      <ChipFilterWithoutPopup
        name="Vehicle Features"
        list={vehicleFeaturesOptions}
        filterName="features"
        onChange={handleFilterChange}
        selectedItems={filters.features}
        onClearIndividual={clearIndividualFilter}
      />
    </div>
  );
}
