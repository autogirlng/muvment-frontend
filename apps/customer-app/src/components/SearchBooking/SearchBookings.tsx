import React, { ChangeEvent, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@repo/ui/button";
import Icons from "@repo/ui/icons";
import SearchInput from "@repo/ui/searchInput";

// Local imports
import { SearchBookingsProps } from "./types";
import { useLocationSearch } from "./useLocationSearch";
import { buildSearchUrl } from "./locationUtils";
import LocationDropdown from "./LocationDropdown";
import DateTimePickerColumn, { Column } from "./DateTimePickerColumn";

function SearchBookings({
  searchValue,
  setSearchValue,
  fromDateValue,
  setFromDateValue,
  fromTimeValue,
  setFromTimeValue,
  untilDateValue,
  setUntilDateValue,
  untilTimeValue,
  setUntilTimeValue,
}: SearchBookingsProps) {
  const router = useRouter();
  const [fromCalendarIsOpen, setFromCalendarIsOpen] = useState<boolean>(false);
  const [untilCalendarIsOpen, setUntilCalendarIsOpen] =
    useState<boolean>(false);
  const [validationError, setValidationError] = useState<string>("");

  const locationDropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLDivElement>(null);

  const {
    showLocationDropdown,
    setShowLocationDropdown,
    locationSuggestions,
    isLoadingPlaces,
    searchError,
    handleLocationSelect,
    handleSearchInputFocus,
    handleSearchInputChange,
  } = useLocationSearch();

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        locationDropdownRef.current &&
        !locationDropdownRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowLocationDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowLocationDropdown]);

  // Validation effect - check if end date/time is at least 30 minutes after start
  useEffect(() => {
    if (fromDateValue && fromTimeValue && untilDateValue && untilTimeValue) {
      const startDateTime = new Date(fromDateValue);
      startDateTime.setHours(
        fromTimeValue.getHours(),
        fromTimeValue.getMinutes(),
        0,
        0
      );

      const endDateTime = new Date(untilDateValue);
      endDateTime.setHours(
        untilTimeValue.getHours(),
        untilTimeValue.getMinutes(),
        0,
        0
      );

      const timeDiffMinutes =
        (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60);

      if (timeDiffMinutes < 30) {
        setValidationError(
          "End date/time must be at least 30 minutes after start date/time"
        );
      } else if (endDateTime <= startDateTime) {
        setValidationError("End date/time must be after start date/time");
      } else {
        setValidationError("");
      }
    } else {
      setValidationError("");
    }
  }, [fromDateValue, fromTimeValue, untilDateValue, untilTimeValue]);

  // Handle search input changes
  const handleSearchInputChangeEvent = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSearchValue(value);
    handleSearchInputChange(value);
  };

  // Handle location selection
  const onLocationSelect = async (location: any) => {
    const selectedLocation = await handleLocationSelect(location);
    setSearchValue(selectedLocation.name);
  };

  // Enhanced date/time change handlers with auto-correction
  const handleFromDateChange = (date: Date | null) => {
    setFromDateValue(date);

    // If until date is before from date, auto-adjust until date
    if (date && untilDateValue && date > untilDateValue) {
      setUntilDateValue(date);
      // Also adjust time if same day
      if (
        date.toDateString() === untilDateValue.toDateString() &&
        fromTimeValue &&
        untilTimeValue
      ) {
        const fromDateTime = new Date(date);
        fromDateTime.setHours(
          fromTimeValue.getHours(),
          fromTimeValue.getMinutes(),
          0,
          0
        );

        const untilDateTime = new Date(date);
        untilDateTime.setHours(
          untilTimeValue.getHours(),
          untilTimeValue.getMinutes(),
          0,
          0
        );

        if (untilDateTime <= fromDateTime) {
          const newUntilTime = new Date(fromTimeValue);
          newUntilTime.setMinutes(newUntilTime.getMinutes() + 30);
          setUntilTimeValue(newUntilTime);
        }
      }
    }
  };

  const handleFromTimeChange = (time: Date) => {
    setFromTimeValue(time);

    // If same day and until time is before from time + 30 minutes, auto-adjust until time
    if (
      fromDateValue &&
      untilDateValue &&
      fromDateValue.toDateString() === untilDateValue.toDateString() &&
      untilTimeValue
    ) {
      const fromDateTime = new Date(fromDateValue);
      fromDateTime.setHours(time.getHours(), time.getMinutes(), 0, 0);

      const untilDateTime = new Date(untilDateValue);
      untilDateTime.setHours(
        untilTimeValue.getHours(),
        untilTimeValue.getMinutes(),
        0,
        0
      );

      // Check if end time is within 30 minutes of start time
      const timeDiff =
        (untilDateTime.getTime() - fromDateTime.getTime()) / (1000 * 60); // minutes

      if (timeDiff < 30) {
        // Add 30 minutes to from time
        const newUntilTime = new Date(time);
        newUntilTime.setMinutes(newUntilTime.getMinutes() + 30);
        setUntilTimeValue(newUntilTime);
      }
    }
  };

  // Check if search is valid
  const isSearchValid = () => {
    if (!searchValue.trim()) return false;
    if (!fromDateValue || !fromTimeValue || !untilDateValue || !untilTimeValue)
      return false;
    if (validationError) return false;
    return true;
  };

  // Handle search button click
  const handleSearchClick = () => {
    if (!isSearchValid()) {
      if (!searchValue.trim()) {
        setValidationError("Please enter a search location");
      } else if (
        !fromDateValue ||
        !fromTimeValue ||
        !untilDateValue ||
        !untilTimeValue
      ) {
        setValidationError("Please select both start and end date/time");
      }
      return;
    }

    console.log(
      searchValue,
      fromDateValue,
      untilDateValue,
      fromTimeValue,
      untilTimeValue
    );

    const searchUrl = buildSearchUrl(
      searchValue,
      fromDateValue,
      fromTimeValue,
      untilDateValue,
      untilTimeValue
    );

    router.push(searchUrl);
  };

  return (
    <div className="bg-white text-left md:h-[72px] w-full rounded-3xl p-4 flex flex-col md:flex-row items-center gap-3">
      <div className="w-full flex flex-col md:flex-row items-center divide-y md:divide-y-0 md:divide-x divide-grey-200">
        {/* Location Search Column */}
        <Column title="Where">
          <div className="relative" ref={searchInputRef}>
            <SearchInput
              name="search"
              placeholder="Search by city, airport, address"
              inputClass="!border-none !pl-0 !h-5 !p-2 !text-xs xl:!text-sm align-top"
              className="!h-5 min-w-[177px] xl:min-w-[205px]"
              value={searchValue}
              onChange={handleSearchInputChangeEvent}
              onFocus={handleSearchInputFocus}
            />

            <LocationDropdown
              isOpen={showLocationDropdown}
              suggestions={locationSuggestions}
              isLoading={isLoadingPlaces}
              error={searchError}
              onLocationSelect={onLocationSelect}
              dropdownRef={locationDropdownRef}
            />
          </div>
        </Column>

        {/* From Date/Time Column */}
        <DateTimePickerColumn
          title="From"
          dateValue={fromDateValue}
          timeValue={fromTimeValue}
          onDateChange={handleFromDateChange}
          onTimeChange={handleFromTimeChange}
          isCalendarOpen={fromCalendarIsOpen}
          onCalendarOpenChange={setFromCalendarIsOpen}
          timePickerName="fromTimeValue"
        />

        {/* Until Date/Time Column */}
        <DateTimePickerColumn
          title="Until"
          dateValue={untilDateValue}
          timeValue={untilTimeValue}
          onDateChange={setUntilDateValue}
          onTimeChange={setUntilTimeValue}
          isCalendarOpen={untilCalendarIsOpen}
          onCalendarOpenChange={setUntilCalendarIsOpen}
          timePickerName="untilTimeValue"
          isEndDateTime={true}
          startDate={fromDateValue}
          startTime={fromTimeValue}
          minEndTime={30} // 30 minutes minimum gap
        />
      </div>

      {/* Search Button */}
      <Button
        variant="filled"
        color="primary"
        className={`!p-3 3xl:!p-[18px] !w-full md:!w-fit ${
          !isSearchValid() ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleSearchClick}
      >
        <span className="hidden md:block">{Icons.ic_search}</span>
        <span className="block md:hidden">Search for cars</span>
      </Button>
    </div>
  );
}

export default SearchBookings;
