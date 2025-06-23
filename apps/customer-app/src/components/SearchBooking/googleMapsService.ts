// services/googleMapsService.ts

import { PlacePrediction } from "./types";
import {
  DEFAULT_LOCATION_SUGGESTIONS,
  MAX_GOOGLE_PLACES_RESULTS,
  GOOGLE_PLACES_COUNTRY_RESTRICTION,
} from "./constants";

// Global state management for Google Maps loading
let isGoogleMapsLoading = false;
let googleMapsLoadPromise: Promise<void> | null = null;

export class GoogleMapsService {
  private autocompleteService: google.maps.places.AutocompleteService | null =
    null;

  /**
   * Load Google Maps script only once
   */
  async loadGoogleMapsScript(): Promise<void> {
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
  }

  /**
   * Initialize Google Places Autocomplete Service
   */
  async initialize(): Promise<void> {
    try {
      await this.loadGoogleMapsScript();

      if (
        window.google &&
        window.google.maps &&
        window.google.maps.places &&
        !this.autocompleteService
      ) {
        this.autocompleteService =
          new window.google.maps.places.AutocompleteService();
      }
    } catch (error) {
      console.error("Failed to load Google Maps:", error);
      throw new Error("Location search is currently unavailable.");
    }
  }

  /**
   * Search for places using Google Places API
   */
  async searchPlaces(query: string): Promise<PlacePrediction[]> {
    if (!this.autocompleteService || !query.trim()) {
      return this.getFilteredDefaultSuggestions(query);
    }

    return new Promise((resolve) => {
      const request = {
        input: query,
        types: ["geocode", "establishment"],
        componentRestrictions: { country: GOOGLE_PLACES_COUNTRY_RESTRICTION },
      };

      this.autocompleteService!.getPlacePredictions(
        request,
        (predictions, status) => {
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            const googlePlaces: PlacePrediction[] = predictions
              .slice(0, MAX_GOOGLE_PLACES_RESULTS)
              .map((prediction, index) => ({
                id: prediction.place_id || `google-${index}`,
                name: prediction.structured_formatting.main_text,
                description: prediction.description,
                type: "google",
                icon: "location",
              }));

            // Combine Google results with filtered default suggestions
            const filteredDefaults = this.getFilteredDefaultSuggestions(query);
            resolve([...googlePlaces, ...filteredDefaults]);
          } else if (
            status ===
            window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS
          ) {
            // Show filtered default results when no Google results
            resolve(this.getFilteredDefaultSuggestions(query));
          } else {
            console.error("Google Places API error:", status);
            resolve(this.getFilteredDefaultSuggestions(query));
          }
        }
      );
    });
  }

  /**
   * Get filtered default suggestions based on query
   */
  private getFilteredDefaultSuggestions(query: string): PlacePrediction[] {
    if (!query.trim()) {
      return DEFAULT_LOCATION_SUGGESTIONS;
    }

    return DEFAULT_LOCATION_SUGGESTIONS.filter((location) =>
      location.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  /**
   * Check if the service is initialized
   */
  isInitialized(): boolean {
    return this.autocompleteService !== null;
  }
}
