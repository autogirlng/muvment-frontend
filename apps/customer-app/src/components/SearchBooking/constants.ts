import { PlacePrediction } from "./types";

export const DEFAULT_LOCATION_SUGGESTIONS: PlacePrediction[] = [
  {
    id: "anywhere",
    name: "Anywhere",
    description: "Search everywhere",
    type: "popular",
    icon: "location",
  },
  {
    id: "recent-1",
    name: "Yaba, Mainland, Lagos",
    description: "Recent search",
    type: "recent",
    icon: "clock",
  },
  {
    id: "recent-2",
    name: "Victoria Island, Island, Lagos",
    description: "Recent search",
    type: "recent",
    icon: "clock",
  },
  {
    id: "popular-1",
    name: "Ugbowo, Benin City, Edo State",
    description: "Popular location",
    type: "popular",
    icon: "home",
  },
];

export const GOOGLE_MAPS_DEBOUNCE_DELAY = 300;
export const MAX_GOOGLE_PLACES_RESULTS = 5;
export const GOOGLE_PLACES_COUNTRY_RESTRICTION = "ng";
