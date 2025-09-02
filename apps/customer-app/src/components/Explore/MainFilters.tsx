"use client";

import Icons from "@repo/ui/icons";
import { ChipFilter, RangeFilter, SearchFilter } from "./Filter";
import {
  vehicleMakeArray,
  vehicleTypeArray,
  yearsFilterArray,
  vehicleFeaturesOptions,
} from "@/utils/data";
import { Dispatch, SetStateAction } from "react";

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

export default function MainFilters({
  handleFilterChange,
  setShowAllFilters,
  filters,
  clearAllFilters,
  clearIndividualFilter,
}: Props) {

  return (
    <div className="hidden md:flex items-center gap-[14px]">
      <RangeFilter
        name="Daily price"
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
      <ChipFilter
        name="Vehicle type"
        list={vehicleTypeArray}
        filterName="type"
        onChange={handleFilterChange}
        selectedItems={filters.type}
        onClearIndividual={clearIndividualFilter}
      />
      <SearchFilter
        name="Make"
        list={vehicleMakeArray}
        filterName="make"
        onChange={handleFilterChange}
        selectedItems={filters.make}
        onClearIndividual={clearIndividualFilter}
      />
      <ChipFilter
        name="Years"
        list={yearsFilterArray}
        filterName="yearOfRelease"
        onChange={handleFilterChange}
        selectedItems={filters.yearOfRelease}
        onClearIndividual={clearIndividualFilter}
      />
      <ChipFilter
        name="Seats"
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
      <ChipFilter
        name="Features"
        list={vehicleFeaturesOptions}
        filterName="features"
        onChange={handleFilterChange}
        selectedItems={filters.features}
        onClearIndividual={clearIndividualFilter}
      />
      {/* <ChipFilter name="Fuel type" list={["Petrol", "Hybrid", "Electric"]} onChange={handleFilterChange} /> */}
      
      {/* Clear All Filters Button */}
      {(filters.type.length > 0 || 
        filters.make.length > 0 || 
        filters.yearOfRelease.length > 0 || 
        filters.numberOfSeats.length > 0 || 
        filters.features.length > 0 ||
        filters.minPrice !== 0 || 
        filters.maxPrice !== 10000000) && (
        <button
          onClick={clearAllFilters}
          className="bg-red-50 border border-red-300 rounded-lg px-3 py-1 flex items-center gap-2 text-red-600 text-xs 3xl:text-sm !font-semibold hover:bg-red-100 transition-colors"
        >
          {Icons.ic_close_circle}
          <span className="hidden md:block">Clear all</span>
        </button>
      )}
      <button
        onClick={() => setShowAllFilters(true)}
        className="bg-white border border-grey-900 rounded-lg px-3 py-1 flex items-center gap-2 text-grey-900 text-xs 3xl:text-sm !font-semibold"
      >
        {Icons.ic_filter}
        <span className="hidden md:block">View all filters</span>
      </button>
    </div>
  );
}
