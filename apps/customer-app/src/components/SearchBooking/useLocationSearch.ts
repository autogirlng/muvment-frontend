import { useState, useRef, useEffect, useCallback } from "react";
import { PlacePrediction } from "./types";
import { GoogleMapsService } from "./googleMapsService";
import {
  DEFAULT_LOCATION_SUGGESTIONS,
  GOOGLE_MAPS_DEBOUNCE_DELAY,
} from "./constants";

export const useLocationSearch = () => {
  const [showLocationDropdown, setShowLocationDropdown] =
    useState<boolean>(false);
  const [locationSuggestions, setLocationSuggestions] = useState<
    PlacePrediction[]
  >(DEFAULT_LOCATION_SUGGESTIONS);
  const [isLoadingPlaces, setIsLoadingPlaces] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string>("");

  const googleMapsService = useRef<GoogleMapsService>(new GoogleMapsService());
  const debounceTimeout = useRef<NodeJS.Timeout>();

  // Initialize Google Maps service
  useEffect(() => {
    const initializeService = async () => {
      try {
        await googleMapsService.current.initialize();
      } catch (error) {
        console.error("Failed to initialize Google Maps service:", error);
        setSearchError("Location search is currently unavailable.");
      }
    };

    initializeService();
  }, []);

  // Debounced Google Places search
  const searchGooglePlaces = useCallback(async (query: string) => {
    if (!query.trim()) {
      setLocationSuggestions(DEFAULT_LOCATION_SUGGESTIONS);
      return;
    }

    setIsLoadingPlaces(true);
    setSearchError("");

    try {
      const suggestions = await googleMapsService.current.searchPlaces(query);
      setLocationSuggestions(suggestions);
    } catch (error) {
      setSearchError("Location search is currently unavailable.");
      console.error("Location search error:", error);

      // Fallback to filtered default suggestions
      const filteredDefaults = DEFAULT_LOCATION_SUGGESTIONS.filter((location) =>
        location.name.toLowerCase().includes(query.toLowerCase())
      );
      setLocationSuggestions(filteredDefaults);
    } finally {
      setIsLoadingPlaces(false);
    }
  }, []);

  // Debounced search effect
  const debouncedSearch = useCallback(
    (searchValue: string) => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      if (searchValue.trim() === "") {
        setLocationSuggestions(DEFAULT_LOCATION_SUGGESTIONS);
        setIsLoadingPlaces(false);
        return;
      }

      debounceTimeout.current = setTimeout(() => {
        searchGooglePlaces(searchValue);
      }, GOOGLE_MAPS_DEBOUNCE_DELAY);
    },
    [searchGooglePlaces]
  );

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  const handleLocationSelect = useCallback((location: PlacePrediction) => {
    setShowLocationDropdown(false);
    setSearchError("");
    return location.name;
  }, []);

  const handleSearchInputFocus = useCallback(() => {
    setShowLocationDropdown(true);
  }, []);

  const handleSearchInputChange = useCallback(
    (value: string) => {
      if (!showLocationDropdown) {
        setShowLocationDropdown(true);
      }
      setSearchError("");
      debouncedSearch(value);
    },
    [showLocationDropdown, debouncedSearch]
  );

  return {
    showLocationDropdown,
    setShowLocationDropdown,
    locationSuggestions,
    isLoadingPlaces,
    searchError,
    handleLocationSelect,
    handleSearchInputFocus,
    handleSearchInputChange,
  };
};
