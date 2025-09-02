"use client";

import {
  useState,
  useRef,
  useEffect,
  FC,
  Dispatch,
  SetStateAction,
  useMemo,
} from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Search } from "lucide-react";
import { DatePicker } from "@repo/ui/calendar";

import { useLocationSearch } from "../SearchBooking/useLocationSearch";
import LocationDropdown from "../SearchBooking/LocationDropdown";
import { bookingTypeOptions, vehicleTypeArray } from "@/utils/data";

type Value = Date | null;

type CustomDropdownProps = {
  label: string;
  options: string[];
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  columnClasses: string;
};

const CustomDropdown: FC<CustomDropdownProps> = ({
  label,
  options,
  value,
  onChange,
  columnClasses,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const formatDisplayValue = (rawValue: string): string => {
    const mappings: { [key: string]: string } = {
      AN_HOUR: "1 Hour",
      THREE_HOURS: "3 Hours",
      SIX_HOURS: "6 Hours",
      TWELVE_HOURS: "12 Hours",
      AIRPORT_PICKUP: "Airport Transfers",
      SedanElectric: "Sedan (Electric)",
      SUVElectric: "SUV (Electric)",
      MidsizeSUV: "Mid size SUV",
    };
    return mappings[rawValue] || rawValue;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  const labelClasses =
    "block text-xs font-medium text-[#98A2B3] whitespace-nowrap";
  const inputDisplayClasses =
    "w-full text-left bg-transparent border-none focus:ring-0 p-0 mt-1 font-semibold text-[#98A2B3] placeholder-gray-500 text-xs sm:text-sm cursor-pointer";
  const columnPadding = "ml-2 p-4 lg:py-2 lg:px-1 border-[#98A2B3]";

  return (
    <div
      ref={dropdownRef}
      className={`relative w-full ${columnPadding} ${columnClasses}`}
    >
      <label className={labelClasses}>{label}</label>
      <div className="relative mt-1">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-between ${inputDisplayClasses}`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span>{formatDisplayValue(value)}</span>
          <ChevronDown
            size={20}
            className={`transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div
            className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-lg origin-top-right"
            role="listbox"
          >
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className="block w-full text-left px-4 py-2 text-sm text-[#98A2B3] hover:bg-gray-100 rounded-md"
                role="option"
                aria-selected={value === option}
              >
                {formatDisplayValue(option)}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const BookingSearchBar = () => {
  const router = useRouter();
  const [bookingType, setBookingType] = useState<string>("TWELVE_HOURS");
  const [location, setLocation] = useState<string>("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [fromDate, setFromDate] = useState<Value>(new Date());
  const [untilDate, setUntilDate] = useState<Value>(new Date());
  const [type, setType] = useState<string>("SUVElectric");
  const [openPicker, setOpenPicker] = useState<"from" | "until" | null>(null);

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

  const locationWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        locationWrapperRef.current &&
        !locationWrapperRef.current.contains(event.target as Node)
      ) {
        setShowLocationDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowLocationDropdown]);

  const formatDateDisplay = (date: Value) => {
    if (!date) return "Select Date";
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  const handleSearch = () => {
    const formatDate = (date: Value) => {
      if (!date) return "";
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const searchData = {
      bookingType,
      location,
      latitude: latitude ? String(latitude) : "",
      longitude: longitude ? String(longitude) : "",
      fromDate: formatDate(fromDate),
      untilDate: formatDate(untilDate),
     type,
    };

    const queryParams = new URLSearchParams();
    Object.entries(searchData).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value);
      }
    });
    router.push(`/explore/results?${queryParams.toString()}`);
  };

  const labelClasses =
    "block text-xs font-medium text-[#98A2B3] whitespace-nowrap";
  const inputClasses =
    "w-full bg-transparent border-none focus:ring-0 p-0 mt-1 font-semibold text-[#98A2B3] placeholder-gray-500 text-xs sm:text-xs";
  const inputDisplayClasses =
    "w-full text-left bg-transparent border-none focus:ring-0 p-0 font-semibold text-[#98A2B3] placeholder-gray-500 text-xs sm:text-sm cursor-pointer";
  const columnPadding = "p-4 lg:py-2 lg:px-5 border-[#98A2B3]";
 


  const getFilteredCategories = (type: string) => {
    const hourlyElectricOnly = ["AN_HOUR", "THREE_HOURS", "SIX_HOURS"];
    if (hourlyElectricOnly.includes(type)) {
      return ["SUVElectric", "SedanElectric"];
    }
    return vehicleTypeArray;
  };

  const filteredCategoryOptions = useMemo(
    () => getFilteredCategories(bookingType),
    [bookingType]
  );

  useEffect(() => {
    if (!filteredCategoryOptions.includes(type)) {
      setType(filteredCategoryOptions[0]);
    }
  }, [filteredCategoryOptions, type]);

  // Ensure untilDate is never before fromDate
  useEffect(() => {
    if (fromDate && untilDate && untilDate < fromDate) {
      setUntilDate(fromDate);
    }
  }, [fromDate, untilDate]);

  return (
    <div className="w-full max-w-5xl mx-auto bg-white shadow-lg rounded-2xl lg:rounded-[25px] flex flex-col lg:flex-row items-center p-2 text-left">
      <div className="w-full flex flex-col lg:flex-row flex-1 items-center divide-y divide-gray-200 lg:divide-y-0 lg:divide-x">
        <CustomDropdown
          label="Booking Type"
          options={bookingTypeOptions}
          value={bookingType}
          onChange={setBookingType}
          columnClasses="lg:w-[175px] lg:flex-shrink-0"
        />

        <div
          ref={locationWrapperRef}
          className={`relative w-full ${columnPadding} lg:w-auto lg:flex-1 lg:min-w-[220px]`}
        >
          <label htmlFor="location" className={labelClasses}>
            Where
          </label>
          <div className="relative flex items-center">
            <input
              type="text"
              id="location"
              value={location}
              onFocus={handleSearchInputFocus}
              onChange={(e) => {
                setLocation(e.target.value);
                setLatitude(null);
                setLongitude(null);
                handleSearchInputChange(e.target.value);
              }}
              placeholder="Search by city, airport, address"
              className={`${inputClasses} outline-none`}
              autoComplete="off"
            />
          </div>
          <LocationDropdown
            isOpen={showLocationDropdown}
            suggestions={locationSuggestions}
            isLoading={isLoadingPlaces}
            error={searchError}
            onLocationSelect={async (selected) => {
              const place = await handleLocationSelect(selected);
              if (place) {
                setLocation(place.name);
                setLatitude(place.lat);
                setLongitude(place.lng);
              }
            }}
            dropdownRef={locationWrapperRef}
          />
        </div>

        <div
          className={`w-full ${columnPadding} lg:w-[160px] lg:flex-shrink-0`}
        >
          <label className={labelClasses}>From</label>
          <DatePicker
            value={fromDate}
            onChange={(val) => setFromDate(val as Value)}
            isOpen={openPicker === "from"}
            handleIsOpen={(open) => setOpenPicker(open ? "from" : null)}
          >
            <div
              className={`flex items-center justify-between mt-1 ${inputDisplayClasses}`}
            >
              <span>{formatDateDisplay(fromDate)}</span>
              <ChevronDown size={20} />
            </div>
          </DatePicker>
        </div>
        <div
          className={`w-full ${columnPadding} lg:w-[160px] lg:flex-shrink-0`}
        >
          <label className={labelClasses}>Until</label>
          <DatePicker
            value={untilDate}
            onChange={(val) => {
              // Ensure untilDate is not before fromDate
              if (val && fromDate && val < fromDate) {
                setUntilDate(fromDate);
              } else {
                setUntilDate(val as Value);
              }
            }}
            isOpen={openPicker === "until"}
            handleIsOpen={(open) => setOpenPicker(open ? "until" : null)}
            minDate={fromDate}
            disabled={!fromDate}
          >
            <div
              className={`flex items-center justify-between mt-1 ${inputDisplayClasses} ${!fromDate ? "cursor-not-allowed opacity-60" : ""}`}
            >
              <span>{formatDateDisplay(untilDate)}</span>
              <ChevronDown size={20} />
            </div>
          </DatePicker>
        </div>
        <CustomDropdown
          label="Category"
          options={filteredCategoryOptions}
          value={type}
          onChange={setType}
          columnClasses="lg:w-[130px] lg:flex-shrink-0"
        />
      </div>

      <button
        type="button"
        onClick={handleSearch}
        className="bg-primary-500 hover:bg-primary-600 transition-colors text-white rounded-full p-3 flex items-center justify-center w-full lg:w-auto mt-4 lg:mt-0 lg:ml-2"
        aria-label="Search"
      >
        <Search size={24} className="lg:hidden mr-2" />
        <span className="lg:hidden font-semibold">Search</span>
        <Search size={24} className="hidden lg:block" />
      </button>
    </div>
  );
};

export default BookingSearchBar;
