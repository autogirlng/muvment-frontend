import { ChangeEvent, useState, useRef, useEffect, useCallback } from "react";
import { CalendarValue } from "@/utils/types";
import { DatePicker } from "@repo/ui/calendar";
import Button from "@repo/ui/button";
import Icons from "@repo/ui/icons";
import SearchInput from "@repo/ui/searchInput";
import TimePicker from "@/components/TimePicker";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { FullPageSpinner } from "@repo/ui/spinner";

type Props = {
  searchValue: string;
  setSearchValue: (value: string) => void;
  fromDateValue: Date | null;
  setFromDateValue: (value: Date | null) => void;
  fromTimeValue: Date | null;
  setFromTimeValue: (value: Date) => void;
  untilDateValue: Date | null;
  setUntilDateValue: (value: Date | null) => void;
  untilTimeValue: Date | null;
  setUntilTimeValue: (value: Date) => void;
};

// Types for Google Places API
interface GooglePlace {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
  types: string[];
}

interface PlacePrediction {
  id: string;
  name: string;
  description: string;
  type: "google" | "recent" | "popular";
  icon: string;
}

// Recent/Popular locations (fallback/default options)
const defaultLocationSuggestions = [
  {
    id: "anywhere",
    name: "Anywhere",
    description: "Search everywhere",
    type: "popular" as const,
    icon: "location",
  },
  {
    id: "recent-1",
    name: "Yaba, Mainland, Lagos",
    description: "Recent search",
    type: "recent" as const,
    icon: "clock",
  },
  {
    id: "recent-2",
    name: "Victoria Island, Island, Lagos",
    description: "Recent search",
    type: "recent" as const,
    icon: "clock",
  },
  {
    id: "popular-1",
    name: "Ugbowo, Benin City, Edo State",
    description: "Popular location",
    type: "popular" as const,
    icon: "home",
  },
];

// Global flag to track if Google Maps is being loaded
let isGoogleMapsLoading = false;
let googleMapsLoadPromise: Promise<void> | null = null;

// Function to load Google Maps script only once
const loadGoogleMapsScript = (): Promise<void> => {
  // If already loaded, resolve immediately
  if (window.google && window.google.maps && window.google.maps.places) {
    return Promise.resolve();
  }

  // If already loading, return the existing promise
  if (googleMapsLoadPromise) {
    return googleMapsLoadPromise;
  }

  // Check if script is already in the DOM
  const existingScript = document.querySelector(
    'script[src*="maps.googleapis.com"]'
  );
  if (existingScript) {
    // Wait for the existing script to load
    googleMapsLoadPromise = new Promise((resolve, reject) => {
      if (window.google && window.google.maps && window.google.maps.places) {
        resolve();
      } else {
        existingScript.addEventListener("load", () => resolve());
        existingScript.addEventListener("error", reject);
      }
    });
    return googleMapsLoadPromise;
  }

  // Create new script
  googleMapsLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      isGoogleMapsLoading = false;
      resolve();
    };

    script.onerror = () => {
      isGoogleMapsLoading = false;
      googleMapsLoadPromise = null;
      reject(new Error("Failed to load Google Maps script"));
    };

    isGoogleMapsLoading = true;
    document.head.appendChild(script);
  });

  return googleMapsLoadPromise;
};

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
}: Props) {
  const router = useRouter();
  const [fromCalendarIsOpen, setFromCalendarIsOpen] = useState<boolean>(false);
  const [untilCalendarIsOpen, setUntilCalendarIsOpen] =
    useState<boolean>(false);
  const [showLocationDropdown, setShowLocationDropdown] =
    useState<boolean>(false);
  const [locationSuggestions, setLocationSuggestions] = useState<
    PlacePrediction[]
  >(defaultLocationSuggestions);
  const [isLoadingPlaces, setIsLoadingPlaces] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string>("");

  const locationDropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLDivElement>(null);
  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>(null);
  const debounceTimeout = useRef<NodeJS.Timeout>();

  // Initialize Google Places Autocomplete Service
  useEffect(() => {
    const initializeGoogleMaps = async () => {
      try {
        await loadGoogleMapsScript();

        if (
          window.google &&
          window.google.maps &&
          window.google.maps.places &&
          !autocompleteService.current
        ) {
          autocompleteService.current =
            new window.google.maps.places.AutocompleteService();
        }
      } catch (error) {
        console.error("Failed to load Google Maps:", error);
        setSearchError("Location search is currently unavailable.");
      }
    };

    initializeGoogleMaps();
  }, []);

  // Debounced Google Places search
  const searchGooglePlaces = useCallback(async (query: string) => {
    if (!autocompleteService.current || !query.trim()) {
      setLocationSuggestions(defaultLocationSuggestions);
      return;
    }

    setIsLoadingPlaces(true);
    setSearchError("");

    try {
      const request = {
        input: query,
        types: ["geocode", "establishment"],
        componentRestrictions: { country: "ng" }, // Restrict to Nigeria - adjust as needed
      };

      autocompleteService.current.getPlacePredictions(
        request,
        (predictions, status) => {
          setIsLoadingPlaces(false);

          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            const googlePlaces: PlacePrediction[] = predictions
              .slice(0, 5)
              .map((prediction, index) => ({
                id: prediction.place_id || `google-${index}`,
                name: prediction.structured_formatting.main_text,
                description: prediction.description,
                type: "google" as const,
                icon: "location",
              }));

            // Combine Google results with default suggestions
            const filteredDefaults = defaultLocationSuggestions.filter(
              (location) =>
                location.name.toLowerCase().includes(query.toLowerCase())
            );

            setLocationSuggestions([...googlePlaces, ...filteredDefaults]);
          } else if (
            status ===
            window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS
          ) {
            // Show filtered default results when no Google results
            const filteredDefaults = defaultLocationSuggestions.filter(
              (location) =>
                location.name.toLowerCase().includes(query.toLowerCase())
            );
            setLocationSuggestions(filteredDefaults);
          } else {
            setSearchError("Unable to search locations. Please try again.");
            setLocationSuggestions(defaultLocationSuggestions);
          }
        }
      );
    } catch (error) {
      setIsLoadingPlaces(false);
      setSearchError("Location search is currently unavailable.");
      console.error("Google Places API error:", error);

      // Fallback to filtered default suggestions
      const filteredDefaults = defaultLocationSuggestions.filter((location) =>
        location.name.toLowerCase().includes(query.toLowerCase())
      );
      setLocationSuggestions(filteredDefaults);
    }
  }, []);

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
  }, []);

  // Debounced search effect
  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (searchValue.trim() === "") {
      setLocationSuggestions(defaultLocationSuggestions);
      setIsLoadingPlaces(false);
      return;
    }

    debounceTimeout.current = setTimeout(() => {
      searchGooglePlaces(searchValue);
    }, 300); // 300ms debounce

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [searchValue, searchGooglePlaces]);

  const handleLocationSelect = (location: PlacePrediction) => {
    setSearchValue(location.name);
    setShowLocationDropdown(false);
    setSearchError("");
  };

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    if (!showLocationDropdown) {
      setShowLocationDropdown(true);
    }
    setSearchError("");
  };

  const handleSearchInputFocus = () => {
    setShowLocationDropdown(true);
  };

  const getLocationIcon = (iconType: string, locationType: string) => {
    if (locationType === "google") {
      return Icons.ic_location || "📍";
    }

    switch (iconType) {
      case "location":
        return Icons.ic_location || "📍";
      case "clock":
        return Icons.ic_lock || "🕐";
      case "home":
        return "🏠";
      default:
        return Icons.ic_location || "📍";
    }
  };

  return (
    <div className="bg-white text-left md:h-[72px] w-full rounded-3xl p-4 flex flex-col md:flex-row items-center gap-3">
      <div className="w-full flex flex-col md:flex-row items-center divide-y md:divide-y-0 md:divide-x divide-grey-200">
        <Column title="Where">
          <div className="relative" ref={searchInputRef}>
            <SearchInput
              name="search"
              placeholder="Search by city, airport, address"
              inputClass="!border-none !pl-0 !h-5 !p-2 !text-xs xl:!text-sm align-top"
              className="!h-5 min-w-[177px] xl:min-w-[205px]"
              value={searchValue}
              onChange={handleSearchInputChange}
              onFocus={handleSearchInputFocus}
            />

            {/* Location Dropdown */}
            {showLocationDropdown && (
              <div
                ref={locationDropdownRef}
                className="absolute top-full left-0 mt-5 w-full min-w-[280px] md:min-w-[320px] bg-white border border-grey-200 rounded-2xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] z-50 max-h-[320px] overflow-hidden"
              >
                <div
                  className="max-h-[300px] overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-grey-300 scrollbar-track-grey-100 hover:scrollbar-thumb-grey-400"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "#d1d5db #f3f4f6",
                  }}
                >
                  {/* Loading State */}
                  {isLoadingPlaces && (
                    <div className="flex items-center justify-center py-4">
                      <div className="flex items-center gap-2 text-grey-500">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-grey-300 border-t-primary-500"></div>
                        <span className="text-sm">Searching locations...</span>
                      </div>
                    </div>
                  )}

                  {/* Error State */}
                  {searchError && !isLoadingPlaces && (
                    <div className="px-4 py-3 border-b border-grey-100">
                      <div className="flex items-center gap-2 text-red-500">
                        <span className="text-sm">⚠️</span>
                        <span className="text-sm">{searchError}</span>
                      </div>
                    </div>
                  )}

                  {/* Location Results */}
                  {!isLoadingPlaces && locationSuggestions.length > 0
                    ? locationSuggestions.map((location) => (
                        <div
                          key={location.id}
                          onClick={() => handleLocationSelect(location)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-grey-50 cursor-pointer transition-colors duration-150 ease-in-out"
                        >
                          <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-grey-500">
                            {getLocationIcon(location.icon, location.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-grey-900 truncate">
                              {location.name}
                            </p>
                            {location.description !== location.name && (
                              <p className="text-xs text-grey-500 truncate">
                                {location.description}
                              </p>
                            )}
                          </div>
                          {location.type === "google" && (
                            <div className="text-xs text-grey-400 bg-grey-100 px-2 py-1 rounded">
                              Maps
                            </div>
                          )}
                        </div>
                      ))
                    : !isLoadingPlaces && (
                        <div className="px-4 py-6 text-center">
                          <p className="text-sm text-grey-500">
                            No locations found
                          </p>
                          <p className="text-xs text-grey-400 mt-1">
                            Try adjusting your search terms
                          </p>
                        </div>
                      )}
                </div>
              </div>
            )}
          </div>
        </Column>

        <Column title="From">
          <div className="flex items-center justify-between gap-1">
            <DatePicker
              value={fromDateValue}
              onChange={(value: CalendarValue) =>
                setFromDateValue(value as Date | null)
              }
              isOpen={fromCalendarIsOpen}
              handleIsOpen={(open: boolean) => setFromCalendarIsOpen(open)}
            >
              <div className="text-black text-xs xl:text-sm flex items-center gap-0.5">
                {fromDateValue ? (
                  <span className="text-grey-800">
                    {format(new Date(fromDateValue), "dd/MM/yyyy")}
                  </span>
                ) : (
                  <span className="text-grey-400">
                    {format(new Date(), "dd/MM/yyyy")}
                  </span>
                )}
                <div
                  className={`transition-transform duration-200 ${fromCalendarIsOpen ? "rotate-180" : ""}`}
                >
                  {Icons.ic_chevron_down}
                </div>
              </div>
            </DatePicker>
            <div className="text-black text-xs xl:text-sm">
              <TimePicker
                name="fromTimeValue"
                value={fromTimeValue}
                onChange={(date: Date) => setFromTimeValue(date)}
              />
            </div>
          </div>
        </Column>

        <Column title="Until">
          <div className="flex items-center justify-between gap-1">
            <DatePicker
              value={untilDateValue}
              onChange={(value: CalendarValue) =>
                setUntilDateValue(value as Date | null)
              }
              isOpen={untilCalendarIsOpen}
              handleIsOpen={(open: boolean) => setUntilCalendarIsOpen(open)}
            >
              <div className="text-black text-xs xl:text-sm flex items-center gap-0.5">
                {untilDateValue ? (
                  <span className="text-grey-800">
                    {format(new Date(untilDateValue), "dd/MM/yyyy")}
                  </span>
                ) : (
                  <span className="text-grey-400">
                    {format(new Date(), "dd/MM/yyyy")}
                  </span>
                )}
                <div
                  className={`transition-transform duration-200 ${untilCalendarIsOpen ? "rotate-180" : ""}`}
                >
                  {Icons.ic_chevron_down}
                </div>
              </div>
            </DatePicker>
            <div className="text-black text-xs xl:text-sm">
              <TimePicker
                name="untilTimeValue"
                value={untilTimeValue}
                onChange={(date: Date) => setUntilTimeValue(date)}
              />
            </div>
          </div>
        </Column>
      </div>

      <Button
        variant="filled"
        color="primary"
        className="!p-3 3xl:!p-[18px] !w-full md:!w-fit"
        onClick={() => {
          console.log(
            searchValue,
            fromDateValue,
            untilDateValue,
            fromTimeValue,
            untilTimeValue
          );

          router.push(
            `/explore?search=${encodeURIComponent(searchValue)}` +
              `&fromDate=${fromDateValue ? fromDateValue.toISOString() : ""}` +
              `&fromTime=${fromTimeValue ? fromTimeValue.toISOString() : ""}` +
              `&untilDate=${untilDateValue ? untilDateValue.toISOString() : ""}` +
              `&untilTime=${untilTimeValue ? untilTimeValue.toISOString() : ""}`
          );
        }}
      >
        <span className="hidden md:block">{Icons.ic_search}</span>
        <span className="block md:hidden">Search for cars</span>
      </Button>
    </div>
  );
}

export default SearchBookings;

const Column = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="w-full py-3 md:py-0 md:pl-3 md:pr-5">
    <p className="text-grey-400 text-xs xl:text-sm">{title}</p>
    {children}
  </div>
);
